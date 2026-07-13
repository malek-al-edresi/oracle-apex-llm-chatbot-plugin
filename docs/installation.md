# Installation Guide

This guide walks you through the steps required to install the **Oracle APEX LLM Chatbot Plugin** into your APEX environment.

> **Plugin Internal Name:** `COM.MALEKALSOFT.CHATBOT.LLM.RAG`

## Prerequisites

- **Oracle APEX**: Version 24.1 or higher.
- **Oracle Database**: 19c, 21c, or 23ai (any version supported by your APEX release).
- **Workspace Access**: You need developer access to the APEX Workspace where the application resides.
- **Browser**: Chrome, Firefox, Safari, or Edge (latest versions).

## Step 1: Download the Plugin

1. Go to the [Releases](https://github.com/malek-al-edresi/oracle-apex-llm-chatbot-plugin/releases) page of the GitHub repository.
2. Download the source code archive (`.zip` or `.tar.gz`).
3. Extract the contents to your local machine.

Alternatively, clone the repository directly:

```sh
git clone https://github.com/malek-al-edresi/oracle-apex-llm-chatbot-plugin.git
```

## Step 2: Import into Oracle APEX

1. Log in to your Oracle APEX Workspace.
2. Navigate to your Application.
3. Go to **Shared Components**.
4. Under **Other Components**, click on **Plug-ins**.
5. Click the **Import >** button.
6. Browse and select the `plugin/region_type_plugin_chatbot_llm_rag.sql` file from the extracted folder.
7. Click **Next**, review the installation details, and click **Install Plug-in**.

## Step 3: Create a Region

Once the plugin is installed, you can add it to any page.

1. Open a page in Page Designer.
2. Right-click on a region position (e.g., Content Body) and select **Create Region**.
3. Set the **Title** to your preference (e.g., "AI Assistant").
4. Under the **Type** attribute, select **LLM Chatbot [Plug-In]**.
5. Save the page.

## Step 4: Configure the Plugin Attribute

1. Select the newly created region in Page Designer.
2. In the **Attributes** panel, set the **Language Style**:
   - `English` — LTR layout with English UI text (default).
   - `Arabic` — RTL layout with Arabic UI text.

## Step 5: Set Up the Backend Process

The plugin requires a backend AJAX Callback process named **`AI_CHAT_PROCESS`** to handle messages. See the [Configuration Guide](configuration.md) for detailed PL/SQL setup.

## Compatibility Matrix

| Oracle APEX Version | Oracle DB Version | Support Status    |
|---------------------|-------------------|-------------------|
| APEX 26.x           | 19c / 21c / 23ai  | ✅ Supported       |
| APEX 25.x           | 19c / 21c / 23ai  | ✅ Supported       |
| APEX 24.1, 24.2     | 19c / 21c / 23ai  | ✅ Supported       |
| APEX 23.x and below | —                 | ❌ Not Supported   |

## Next Steps

- [Configuration Guide](configuration.md) — Set up the `AI_CHAT_PROCESS` backend.
- [API Integration](api.md) — Connect to OpenAI, OCI Generative AI, or any LLM provider.
- [Troubleshooting](troubleshooting.md) — Common issues and solutions.
