declare
    l_user_message clob;
    l_payload      clob;
    l_response     clob;
    l_bot_reply    clob;
begin
    -- 1. Read user input
    l_user_message := apex_application.g_x01;
    
    -- 2. Construct JSON payload for OpenAI
    apex_json.initialize_clob_output;
    apex_json.open_object;
    apex_json.write('model', 'gpt-4');
    apex_json.open_array('messages');
    
    apex_json.open_object;
    apex_json.write('role', 'system');
    apex_json.write('content', 'You are a helpful APEX assistant.');
    apex_json.close_object;
    
    apex_json.open_object;
    apex_json.write('role', 'user');
    apex_json.write('content', l_user_message);
    apex_json.close_object;
    
    apex_json.close_array;
    apex_json.close_object;
    
    l_payload := apex_json.get_clob_output;
    apex_json.free_output;

    -- 3. Call REST API using APEX_WEB_SERVICE
    -- Assume 'OPENAI_CRED' is the static ID of your Web Credential
    apex_web_service.g_request_headers(1).name := 'Content-Type';
    apex_web_service.g_request_headers(1).value := 'application/json';
    
    l_response := apex_web_service.make_rest_request(
        p_url                  => 'https://api.openai.com/v1/chat/completions',
        p_http_method          => 'POST',
        p_body                 => l_payload,
        p_credential_static_id => 'OPENAI_CRED'
    );

    -- 4. Parse the response
    apex_json.parse(l_response);
    l_bot_reply := apex_json.get_varchar2(p_path => 'choices[%d].message.content', p0 => 1);
    
    -- 5. Return to the Chatbot UI
    apex_json.open_object;
    apex_json.write('message', l_bot_reply);
    apex_json.close_object;
    
exception
    when others then
        apex_json.open_object;
        apex_json.write('message', 'Failed to connect to the AI service. ' || sqlerrm);
        apex_json.close_object;
end;
