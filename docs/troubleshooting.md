# Troubleshooting

If you encounter issues using the Oracle APEX LLM Chatbot Plugin, please refer to the following common problems and solutions.

---

### Issue: "Could not get a reply from the server"

**Cause:** The APEX AJAX Process did not return the expected JSON structure.

**Solution:**
Ensure your `AI_CHAT_PROCESS` returns exactly:
```json
{
  "message": "The bot's response text"
}
```
If you print HTML or other debugging info (like `htp.p('test')` or `dbms_output.put_line()`), it will break the JSON parser.

---

### Issue: "Connection failed: 404 Not Found"

**Cause:** The plugin cannot find the AJAX Callback process.

**Solution:**
Ensure you created an **Ajax Callback** process exactly named `AI_CHAT_PROCESS`. If it is a page-level process, it must be on the same page as the plugin. If it is an Application Process, ensure it is set to "Ajax Callback" scope.

---

### Issue: The Chat Container is collapsed (height is 0)

**Cause:** The plugin relies on its parent container having a defined height (it uses `height: 100%`).

**Solution:**
Ensure the APEX Region containing the plugin has a height set via CSS:

```css
/* Option 1: Fixed height */
.ai-chat-container { height: 600px; }

/* Option 2: Full viewport height */
.ai-chat-container { height: 100vh; max-height: 100vh; }
```

You can apply this CSS via the page's **Inline CSS** property in Page Designer.

---

### Issue: Arabic alignment is wrong (LTR instead of RTL)

**Cause:** The plugin attribute is not set correctly.

**Solution:**
Edit the Region in Page Designer. Go to **Attributes** and ensure the **Language Style** is set to `Arabic`.

---

### Issue: LLM API returns an error or empty response

**Cause:** The REST API call failed due to authentication, network, or payload issues.

**Solution:**
1. Check your **Web Credential** is configured correctly in Shared Components.
2. Verify the API endpoint URL is reachable from your Oracle Database/APEX server.
3. Test the API call independently using `APEX_WEB_SERVICE` in a standalone PL/SQL block.
4. Check the browser **Network** tab (F12) to inspect the AJAX response body.

---

### Issue: Loading spinner does not appear on the Send button

**Cause:** Custom CSS on the page is interfering with the plugin's button styles.

**Solution:**
Ensure no page-level CSS is overriding `.ai-chat-btn-loading` or its `::after` pseudo-element. The spinner uses a CSS `@keyframes spin` animation. If your application has a conflicting `@keyframes spin` rule, rename one of them.

---

### Checking the Browser Console

If the UI is unresponsive, open your browser's Developer Tools (F12) and check the **Console** and **Network** tabs. The plugin logs detailed AJAX errors to the console.

### Still Having Issues?

If the troubleshooting steps above do not resolve your issue, please [open an issue](https://github.com/malek-al-edresi/oracle-apex-llm-chatbot-plugin/issues) on GitHub with:

- Your Oracle APEX version
- Your Oracle Database version
- Browser name and version
- Screenshots of the Console and Network tabs
- Your `AI_CHAT_PROCESS` PL/SQL code (redact API keys)
