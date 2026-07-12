# Installation Guide

This guide walks you through the steps required to install the Oracle APEX LLM Chatbot Plugin into your APEX environment.

## Prerequisites

- **Oracle APEX**: Version 24.1 or higher.
- **Database**: Any Oracle Database version supported by your APEX version.
- **Workspace Access**: You need developer access to the APEX Workspace where the application resides.

## Step 1: Download the Plugin

1. Go to the [Releases](https://github.com/malek-al-edresi/oracle-apex-llm-chatbot-plugin/releases) page of the GitHub repository.
2. Download the source code archive (zip or tar.gz).
3. Extract the contents to your local machine.

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
4. Under the **Type** attribute, select **LLM Chatbot**.
5. Save the page.

## Next Steps

The plugin is now installed, but it requires backend logic to process the chat messages. Proceed to the [Configuration Guide](configuration.md) to set up the necessary AJAX processes.
