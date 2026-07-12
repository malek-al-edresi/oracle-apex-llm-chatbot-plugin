# Frequently Asked Questions

### 1. Does this plugin include the LLM engine?
No. The plugin provides the front-end user interface and the necessary JavaScript integration. You must connect it to an LLM provider (like OpenAI, OCI, or Anthropic) via an APEX AJAX process (`AI_CHAT_PROCESS`).

### 2. Can I use Oracle Database 23ai Vector Search with this plugin?
Yes! The backend integration is purely PL/SQL. You can use Oracle 23ai Vector Search to retrieve context and pass it to your LLM API before sending the response back to the plugin.

### 3. How do I change the size of the chatbot?
The chatbot uses Flexbox. By default, it fills its parent container with `flex: 1` and `height: 100%`. Ensure the parent APEX region or column has a defined height. To make it full viewport height, you can use CSS:
```css
.ai-chat-container { height: 100vh; max-height: 100vh; }
```

### 4. Can I add more languages?
The plugin natively supports English and Arabic. To add a new language, you must modify the PL/SQL render function in `region_type_plugin_chatbot_llm_rag.sql` to include the localized strings for your target language, and update the CSS logic if a specific text direction is needed.

### 5. Why do markdown characters (like ** or \_) appear stripped?
By default, the plugin includes a JavaScript function that cleans raw markdown strings, converting them into plain text to ensure a safe, clean UI without requiring a heavy markdown parsing library. If you want full HTML rendering of markdown, you will need to modify `chat_script.js` to include a library like `marked.js` and render HTML instead of `textContent`.
