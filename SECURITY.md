# Security Policy

## Supported Versions

The Oracle APEX LLM Chatbot Plugin is supported on the following Oracle APEX versions. We strongly recommend always running the latest patched release of your APEX version.

| Version | Supported          |
| ------- | ------------------ |
| >= 24.1 | :white_check_mark: |
| < 24.1  | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability within this project, please do not disclose it publicly. Instead, please report it via email to malek.m.edresi@gmail.com.

Please include the following information in your report:
- The type of vulnerability (e.g., XSS, SQLi, CSRF).
- Full details of the steps required to reproduce the vulnerability.
- Your Oracle APEX version, Database version, and Plugin version.
- Any suggested mitigations.

All security vulnerabilities will be promptly addressed.

## Security Best Practices
When using this plugin in production:
1. Ensure your REST Endpoints (for the LLM) are secured using APEX Web Credentials.
2. Never expose raw API keys in client-side code (the plugin calls APEX processes, which keeps keys securely on the backend).
3. Always validate and sanitize any dynamically generated LLM content on the backend before returning it to the user.
