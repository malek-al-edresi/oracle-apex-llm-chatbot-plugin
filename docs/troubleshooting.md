# Troubleshooting

If you encounter issues using the Oracle APEX LLM Chatbot Plugin, please refer to the following common problems and solutions.

### Issue: "Could not get a reply from the server"
**Cause:** The APEX AJAX Process did not return the expected JSON structure.
**Solution:**
Ensure your `AI_CHAT_PROCESS` returns exactly:
```json
{
  "message": "The bot's response text"
}
```
If you print HTML or other debugging info (like `htp.p('test')`), it will break the JSON parser.

### Issue: "Connection failed: 404 Not Found"
**Cause:** The plugin cannot find the AJAX Callback process.
**Solution:**
Ensure you created an **Ajax Callback** process exactly named `AI_CHAT_PROCESS`. If it is a page-level process, it must be on the same page as the plugin. If it is an Application Process, ensure it is set to "Ajax Callback" scope.

### Issue: The Chat Container is collapsed (height is 0)
**Cause:** The plugin relies on its parent container having a defined height (it uses `height: 100%`).
**Solution:**
Ensure the APEX Region containing the plugin has a height set via CSS (e.g., `height: 600px;`) or is placed in a template that provides a defined height.

### Issue: Arabic alignment is wrong (LTR instead of RTL)
**Cause:** The plugin attribute is not set correctly.
**Solution:**
Edit the Region in Page Designer. Go to **Attributes** and ensure the **Language Style** is set to `Arabic`.

### Checking the Browser Console
If the UI is unresponsive, open your browser's Developer Tools (F12) and check the **Console** and **Network** tabs. The plugin logs detailed AJAX errors to the console.
