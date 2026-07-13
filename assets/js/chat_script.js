/**
 * Initialises a chat region.
 * @param {HTMLElement} container - The container div with class 'ai-chat-container'.
 * @param {Object} options - Configuration object.
 * @param {string} options.lang - 'en' or 'ar'.
 * @param {Object} options.texts - Localized strings.
 */
function initAIChat(container, options) {
  if (!container) return;

  var lang = options.lang || 'en';
  var texts = options.texts || {};

  // Default texts if not provided
  var defaultTexts = {
    loading: '⏳ Thinking',
    error: '⚠️ An error occurred.',
    connError: '⚠️ Connection failed: ',
    noReply: 'No reply from server.'
  };
  for (var key in defaultTexts) {
    if (!texts[key]) texts[key] = defaultTexts[key];
  }

  var output = container.querySelector('.ai-chat-output');
  var input = container.querySelector('.ai-chat-input');
  var button = container.querySelector('.ai-chat-btn');

  if (!output || !input || !button) return;

  // ---------- State to prevent double submission ----------
  var isProcessing = false;
  var originalButtonText = button.textContent; // store original text

  // Clean markdown-like syntax
  function cleanMarkdown(text) {
    if (!text) return '';
    return text
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/__(.*?)__/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/_(.*?)_/g, '$1')
      .replace(/^#+\s*/gm, '')
      .replace(/^[\-\*]\s*/gm, '')
      .replace(/`(.*?)`/g, '$1')
      .trim();
  }

  // ---------- Reset button to original state ----------
  function resetButton() {
    isProcessing = false;
    button.disabled = false;
    button.textContent = originalButtonText;
    button.classList.remove('ai-chat-btn-loading');
  }

  // Send message function
  function sendMessage(event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    // Ignore if already processing
    if (isProcessing) return;

    var userMsg = input.value.trim();
    if (!userMsg) return;

    // ---------- Lock UI: تحويل الزر إلى دائرة حمراء ----------
    isProcessing = true;
    button.disabled = true;
    button.textContent = '';                // نزيل النص
    button.classList.add('ai-chat-btn-loading'); // يتحول إلى دائرة حمراء مع سبينر

    // Remove empty-state placeholder if present
    var emptyMsg = output.querySelector('.ai-chat-empty');
    if (emptyMsg) emptyMsg.remove();

    // Display user message
    var userDiv = document.createElement('div');
    userDiv.className = 'ai-msg-user';
    userDiv.style.whiteSpace = 'pre-wrap';
    userDiv.textContent = userMsg;
    output.appendChild(userDiv);
    input.value = '';

    // Show loading indicator with animated dots (inside chat area)
    var loadId = 'loading_' + Date.now();
    var loadDiv = document.createElement('div');
    loadDiv.id = loadId;
    loadDiv.className = 'ai-msg-loading';
    loadDiv.innerHTML = texts.loading;
    var dotSpan = document.createElement('span');
    dotSpan.style.cssText = 'display:inline-block;width:20px;text-align:left;';
    dotSpan.textContent = '...';
    loadDiv.appendChild(dotSpan);
    var dotCount = 0;
    var dotInterval = setInterval(function() {
      dotCount = (dotCount % 3) + 1;
      dotSpan.textContent = '.'.repeat(dotCount) + ' '.repeat(3 - dotCount);
    }, 400);
    loadDiv._dotInterval = dotInterval;
    output.appendChild(loadDiv);
    output.scrollTop = output.scrollHeight;

    // Call APEX server process
    apex.server.process('AI_CHAT_PROCESS', {
      x01: userMsg
    }, {
      dataType: 'json',
      cache: false,
      success: function(pData) {
        var loadElem = document.getElementById(loadId);
        if (loadElem) {
          if (loadElem._dotInterval) clearInterval(loadElem._dotInterval);
          loadElem.remove();
        }
        var reply = (pData && pData.message) ? pData.message : texts.noReply;
        var cleanReply = cleanMarkdown(reply);

        var botDiv = document.createElement('div');
        botDiv.className = 'ai-msg-bot';
        botDiv.style.whiteSpace = 'pre-wrap';
        botDiv.textContent = cleanReply;
        output.appendChild(botDiv);
        output.scrollTop = output.scrollHeight;

        // ---------- Re‑enable button ----------
        resetButton();
      },
      error: function(jqXHR, textStatus, errorThrown) {
        var loadElem = document.getElementById(loadId);
        if (loadElem) {
          if (loadElem._dotInterval) clearInterval(loadElem._dotInterval);
          loadElem.remove();
        }
        var errDiv = document.createElement('div');
        errDiv.className = 'ai-msg-error';
        errDiv.style.whiteSpace = 'pre-wrap';
        var statusText = jqXHR.status + ' ' + jqXHR.statusText;
        var errorMsg = texts.connError + (textStatus || 'unknown') + ' (status: ' + statusText + ')';
        errDiv.textContent = errorMsg;
        output.appendChild(errDiv);
        console.error('Error details:', {
          jqXHR: jqXHR,
          textStatus: textStatus,
          errorThrown: errorThrown
        });
        if (jqXHR.responseText) {
          console.error('Server response:', jqXHR.responseText);
        }
        output.scrollTop = output.scrollHeight;

        // ---------- Re‑enable button ----------
        resetButton();
      }
    });
  }

  // Attach event listeners
  button.addEventListener('click', sendMessage);
  input.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage(e);
    }
  });
}