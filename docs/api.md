# API Integration (LLM & RAG)

This guide provides examples on how to integrate the APEX Chatbot with external Large Language Models (LLMs) and implement Retrieval-Augmented Generation (RAG).

## Overview

The Oracle APEX backend needs to act as a middleware between the Chatbot UI and your LLM provider (e.g., OpenAI, Azure OpenAI, OCI Generative AI, or a custom internal model).

We recommend using the native `APEX_WEB_SERVICE` package to make REST API calls.

## Example: Integrating with OpenAI API

Below is an example of what your `AI_CHAT_PROCESS` AJAX callback might look like when calling the OpenAI API.

*Note: You must set up an APEX Web Credential for secure storage of your API key.*

```sql
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
```

## RAG Integration

Retrieval-Augmented Generation involves querying your database for context *before* calling the LLM.

1. **User asks a question:** "What is the policy for remote work?"
2. **Retrieve Context:** Perform an Oracle Text search or Oracle AI Vector Search against your knowledge base documents.
3. **Inject Context:** Append the retrieved text to the `system` or `user` prompt.
4. **Call LLM:** Send the combined prompt to the LLM.
5. **Return Answer:** Send the LLM's response back to the APEX Chatbot UI.

Using Oracle Database 23ai's native vector search makes this process highly efficient entirely within PL/SQL.
