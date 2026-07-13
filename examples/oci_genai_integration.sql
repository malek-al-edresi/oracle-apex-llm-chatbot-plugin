declare
    l_user_message clob;
    l_payload      clob;
    l_response     clob;
    l_bot_reply    clob;
begin
    l_user_message := apex_application.g_x01;

    -- Construct payload for OCI Generative AI
    apex_json.initialize_clob_output;
    apex_json.open_object;
    apex_json.write('compartmentId', 'ocid1.compartment.oc1..aaaaa...');
    apex_json.write('servingMode', 'ON_DEMAND');
    apex_json.open_array('chatRequest');
    apex_json.open_object;
    apex_json.write('role', 'USER');
    apex_json.write('content', l_user_message);
    apex_json.close_object;
    apex_json.close_array;
    apex_json.close_object;
    l_payload := apex_json.get_clob_output;
    apex_json.free_output;

    -- Call OCI REST API
    apex_web_service.g_request_headers(1).name := 'Content-Type';
    apex_web_service.g_request_headers(1).value := 'application/json';

    l_response := apex_web_service.make_rest_request(
        p_url                  => 'https://inference.generativeai.<region>.oci.oraclecloud.com/20231130/actions/chat',
        p_http_method          => 'POST',
        p_body                 => l_payload,
        p_credential_static_id => 'OCI_GENAI_CRED'
    );

    -- Parse response (adjust path based on actual OCI response structure)
    apex_json.parse(l_response);
    l_bot_reply := apex_json.get_varchar2(p_path => 'chatResponse[%d].content', p0 => 1);

    apex_json.open_object;
    apex_json.write('message', l_bot_reply);
    apex_json.close_object;

exception
    when others then
        apex_json.open_object;
        apex_json.write('message', 'OCI AI service error: ' || sqlerrm);
        apex_json.close_object;
end;
