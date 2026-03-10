const p = require('@clack/prompts');
const { getApiKey, setKey, setProvider } = require('../config');

async function configInteractive() {
  p.intro('Configuring i18readme');

  const provider = await p.select({
    message: 'AI provider',
    options: [
      { value: 'claude', label: 'Claude (Anthropic)', hint: 'recommended' },
      { value: 'openai', label: 'OpenAI' },
    ],
  });
  if (p.isCancel(provider)) { p.cancel('Cancelled.'); process.exit(0); }

  const existing = getApiKey(provider, null);
  const key = await p.password({
    message: `API key for ${provider}`,
    placeholder: existing ? '(leave blank to keep current)' : undefined,
    validate(value) {
      if (!value && !existing) return 'API key is required.';
    },
  });
  if (p.isCancel(key)) { p.cancel('Cancelled.'); process.exit(0); }

  setProvider(provider);
  if (key) setKey(provider, key);

  p.outro('Config saved · Run "i18r sync" to translate');
}

/**
 * Prompts for a missing API key during sync.
 * Returns the entered key (already saved if user chose to).
 */
async function promptMissingKey(provider) {
  p.log.warn(`No API key found for ${provider}.`);

  const key = await p.password({
    message: `Enter API key for ${provider}`,
    validate(value) {
      if (!value) return 'Required. Press Ctrl+C to cancel.';
    },
  });
  if (p.isCancel(key)) {
    p.cancel('Cancelled.');
    process.exit(0);
  }

  const save = await p.confirm({
    message: 'Save to ~/.i18readmerc?',
    initialValue: true,
  });
  if (p.isCancel(save)) { p.cancel('Cancelled.'); process.exit(0); }

  if (save) {
    setKey(provider, key);
    p.log.success('Key saved.');
  }

  return key;
}

module.exports = { configInteractive, promptMissingKey };
