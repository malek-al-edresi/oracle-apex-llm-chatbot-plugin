# Frequently Asked Questions

---

### 1. Does this plugin include the LLM engine?

No. The plugin provides the front-end user interface and the necessary JavaScript integration. You must connect it to an LLM provider (like OpenAI, OCI Generative AI, Azure OpenAI, or Anthropic) via an APEX AJAX process (`AI_CHAT_PROCESS`). See the [API Integration Guide](api.md) for detailed examples.

---

### 2. Can I use Oracle Database 23ai Vector Search with this plugin?

Yes! The backend integration is purely PL/SQL. You can use Oracle 23ai Vector Search to retrieve context and pass it to your LLM API before sending the response back to the plugin. This enables a full RAG (Retrieval-Augmented Generation) workflow entirely within Oracle. See the [RAG Integration section](api.md#rag-integration) for code examples.

---

### 3. How do I change the size of the chatbot?

The chatbot uses Flexbox. By default, it fills its parent container with `flex: 1` and `height: 100%`. Ensure the parent APEX region or column has a defined height.

**Full viewport height:**
```css
.ai-chat-container { height: 100vh; max-height: 100vh; }
```

**Fixed height:**
```css
.ai-chat-container { height: 600px; }
```

Apply these via the page's **Inline CSS** property in Page Designer.

---

### 4. Can I add more languages?

The plugin natively supports English and Arabic. To add a new language, you must modify the PL/SQL render function in `region_type_plugin_chatbot_llm_rag.sql` to include the localized strings for your target language, and update the CSS logic if a specific text direction is needed.

---

### 5. Why do markdown characters (like `**` or `\_`) appear stripped?

By default, the plugin includes a JavaScript function that cleans raw markdown strings, converting them into plain text to ensure a safe, clean UI without requiring a heavy markdown parsing library. If you want full HTML rendering of markdown, you will need to modify `chat_script.js` to include a library like `marked.js` and render HTML instead of `textContent`.

---

### 6. What LLM providers are supported?

Any LLM provider with a REST API is supported. The plugin does not call the LLM directly — it sends the user's message to your APEX backend (`AI_CHAT_PROCESS`), and your PL/SQL code calls the LLM. Popular options include:

- OpenAI (GPT-4, GPT-4o)
- OCI Generative AI
- Azure OpenAI
- Anthropic (Claude)
- Google Gemini
- Self-hosted models (Ollama, vLLM, etc.)

---

### 7. Is this plugin free to use?

Yes. This plugin is open-source and licensed under [Apache 2.0](https://opensource.org/licenses/Apache-2.0). You are free to use, modify, and distribute it in both personal and commercial projects.

---

### 8. How do I update the plugin to a new version?

1. Download the latest release from the [Releases](https://github.com/malek-al-edresi/oracle-apex-llm-chatbot-plugin/releases) page.
2. In your APEX Workspace, go to **Shared Components > Plug-ins**.
3. Click **Import** and select the new `region_type_plugin_chatbot_llm_rag.sql` file.
4. APEX will detect the existing plugin and offer to update it.

---

### 9. Where can I get help?

- **Issues:** [GitHub Issues](https://github.com/malek-al-edresi/oracle-apex-llm-chatbot-plugin/issues)
- **Documentation:** [docs/](https://github.com/malek-al-edresi/oracle-apex-llm-chatbot-plugin/tree/main/docs)
- **Live Demo:** [LLM Chatbot Dome](https://oracleapex.com/ords/r/app_navification/llm-chatbot-dome/home)
