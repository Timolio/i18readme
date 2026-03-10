const fs = require('fs');
const path = require('path');
const os = require('os');

const CONFIG_PATH = path.join(os.homedir(), '.i18readmerc');

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

module.exports = { getApiKey, getProvider, setKey, setProvider, showConfig, CONFIG_PATH };
