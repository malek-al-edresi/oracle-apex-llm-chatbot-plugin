# Configuration Guide

After installing the Oracle APEX LLM Chatbot Plugin and creating the region on your page, you need to configure the backend process to handle messages.

## 1. Plugin Attributes

When you select the **LLM Chatbot** region in APEX Page Designer, you will see a specific attribute in the Property Editor:

### Language Style
- **Type**: Select List
- **Values**: `English` (Default) or `Arabic`
- **Description**: This attribute dynamically switches the UI layout. If set to English, the chat aligns LTR. If set to Arabic, the chat aligns RTL and all built-in UI text (like placeholders and loading indicators) are translated.

## 2. Setting up the APEX Process

The JavaScript frontend expects an Application Process or a Page AJAX Callback named exactly **`AI_CHAT_PROCESS`**.

### Creating the Process

1. Go to **Page Designer** for the page where your chatbot resides, or go to **Shared Components > Application Processes** (if you want the chatbot available globally).
2. Create a new process.
3. Set the **Name** to `AI_CHAT_PROCESS`.
4. Set the **Point** to `Ajax Callback`.
5. Enter PL/SQL code to handle the request.

### Example PL/SQL Boilerplate

The user's message is passed via the `apex_application.g_x01` variable.

```sql
declare
    l_user_message varchar2(4000);
    l_bot_reply    varchar2(4000);
begin
    -- 1. Get the user's message
    l_user_message := apex_application.g_x01;
    
    -- 2. Validate input
    if l_user_message is null then
        apex_json.open_object;
        apex_json.write('message', 'Please provide a message.');
        apex_json.close_object;
        return;
    end if;

    -- 3. Call your LLM / RAG API
    -- (This is where you integrate with your specific backend, e.g., OpenAI, OCI Generative AI, etc.)
    -- l_bot_reply := my_llm_package.get_response(p_prompt => l_user_message);
    
    -- For demonstration, a simple echo:
    l_bot_reply := 'You said: ' || l_user_message;

    -- 4. Return the response as JSON
    apex_json.open_object;
    apex_json.write('message', l_bot_reply);
    apex_json.close_object;
    
exception
    when others then
        apex_json.open_object;
        apex_json.write('message', 'An error occurred on the server.');
        apex_json.close_object;
end;
```

## 3. JavaScript and CSS Files

The plugin automatically references the following files (stored within the plugin's file repository):
- `#PLUGIN_FILES#css/chat_styles.css`
- `#PLUGIN_FILES#js/chat_script.js`

If you need to make extensive custom modifications to the CSS or JS, you can download these files from the plugin export, modify them, and re-upload them to your workspace, or host them on your web server and adjust the plugin definition's "File URLs".
