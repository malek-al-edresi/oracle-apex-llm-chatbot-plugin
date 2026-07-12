# Contributing to Oracle APEX LLM Chatbot Plugin

First off, thank you for considering contributing to this plugin! It's people like you that make the open-source community such a great place to learn, inspire, and create.

## Where do I go from here?

If you've noticed a bug or have a feature request, make sure to check our [Issues](https://github.com/malek-al-edresi/oracle-apex-llm-chatbot-plugin/issues) first to see if someone else has already opened one. If not, go ahead and open a new issue!

## Fork & create a branch

If this is something you think you can fix, then fork the repository and create a branch with a descriptive name.

A good branch name would be (where issue #325 is the ticket you're working on):

```sh
git checkout -b 325-fix-rtl-alignment
```

## Making Changes

- Ensure your modifications are well-documented.
- If you're modifying the PL/SQL logic, ensure the Oracle APEX plugin export SQL file is regenerated.
- If you're updating CSS/JS, make sure the minified versions are updated as well.

## Submitting a Pull Request

1. Push your branch to your fork.
2. Open a Pull Request from your branch against the `main` branch of this repository.
3. Provide a clear and descriptive PR title and description.
4. Link the PR to the relevant issue.

## Development Setup

1. Import the plugin SQL file (`plugin/region_type_plugin_chatbot_llm_rag.sql`) into your APEX workspace.
2. Modify the JS/CSS directly in APEX or externally, then re-upload them to the plugin.
3. Export the plugin and overwrite the SQL file in the `plugin/` directory before committing.

Thank you for contributing!
