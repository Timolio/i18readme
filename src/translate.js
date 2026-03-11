const { getApiKey } = require('./config');

const PROVIDERS = {
  claude: () => require('./providers/claude'),
  openai: () => require('./providers/openai'),
};

const SUPPORTED = Object.keys(PROVIDERS).join(', ');

function stripLangBar(content) {
  return content.replace(/<!-- i18readme -->[\s\S]*?<!-- i18readme -->\n*/g, '');
}

/**
 * @param {string} text - source markdown (may include translaterato block)
 * @param {string} targetLang - language name used in the prompt
 * @param {string} providerName - 'claude' | 'openai'
 * @param {string|null} flagKey - key passed via --key CLI flag
 * @param {string|null} model - model override
 */
async function translate(text, targetLang, providerName = 'claude', flagKey = null, model = null) {
  const loader = PROVIDERS[providerName];
  if (!loader) {
    throw new Error(`Unknown provider "${providerName}". Supported: ${SUPPORTED}`);
  }

  const apiKey = getApiKey(providerName, flagKey);
  const { translate: providerTranslate } = loader();
  const cleanText = stripLangBar(text).trim();

  if (!cleanText) return '';

  return providerTranslate(cleanText, targetLang, apiKey, model || undefined);
}

module.exports = { translate };
