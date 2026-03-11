const fs = require('fs');
const path = require('path');
const os = require('os');

const CONFIG_PATH = path.join(os.homedir(), '.i18readmerc');

const DEFAULT_MODELS = {
  claude: 'claude-haiku-4-5-20251001',
  openai: 'gpt-4o-mini',
};

const PROVIDER_MODELS = {
  claude: [
    { value: 'claude-haiku-4-5-20251001', label: 'Haiku', hint: 'fast & cheap (default)' },
    { value: 'claude-sonnet-4-6', label: 'Sonnet', hint: 'balanced' },
    { value: 'claude-opus-4-6', label: 'Opus', hint: 'most capable' },
  ],
  openai: [
    { value: 'gpt-4o-mini', label: 'GPT-4o mini', hint: 'fast & cheap (default)' },
    { value: 'gpt-4o', label: 'GPT-4o', hint: 'more capable' },
  ],
};

function readConfig() {
  if (!fs.existsSync(CONFIG_PATH)) return {};
  try {
    return JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
  } catch {
    throw new Error(`Failed to parse ${CONFIG_PATH}. Check that it's valid JSON.`);
  }
}

function writeConfig(config) {
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2), 'utf8');
}

function getApiKey(provider, flagKey) {
  if (flagKey) return flagKey;
  const config = readConfig();
  return config[provider]?.key || null;
}

/**
 * Returns the configured provider, defaulting to 'claude'.
 * Can be overridden with --provider flag.
 */
function getProvider(flagProvider) {
  if (flagProvider) return flagProvider;
  const config = readConfig();
  return config.provider || 'claude';
}

function setKey(provider, key) {
  const config = readConfig();
  config[provider] = { ...config[provider], key };
  writeConfig(config);
}

function setProvider(provider) {
  const config = readConfig();
  config.provider = provider;
  writeConfig(config);
}

function getModel(provider, flagModel) {
  if (flagModel) return flagModel;
  const config = readConfig();
  return config[provider]?.model || DEFAULT_MODELS[provider] || 'claude-haiku-4-5-20251001';
}

function setModel(provider, model) {
  const config = readConfig();
  config[provider] = { ...config[provider], model };
  writeConfig(config);
}

function showConfig() {
  const p = require('@clack/prompts');
  const config = readConfig();

  if (Object.keys(config).length === 0) {
    p.log.warn(`No config found at ${CONFIG_PATH}`);
    p.log.info('Run: i18r config');
    return;
  }

  const activeProvider = config.provider || 'claude';
  const lines = [`provider  ${activeProvider}`];
  for (const [k, val] of Object.entries(config)) {
    if (k === 'provider') continue;
    const key = val.key || '';
    const masked = key ? key.slice(0, 8) + '...' + key.slice(-4) : '(not set)';
    lines.push(`${k.padEnd(8)}  ${masked}`);
  }

  p.note(lines.join('\n'), CONFIG_PATH);
}

module.exports = { getApiKey, getProvider, getModel, setKey, setProvider, setModel, showConfig, CONFIG_PATH, DEFAULT_MODELS, PROVIDER_MODELS };
