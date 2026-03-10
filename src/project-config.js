const fs = require('fs');
const path = require('path');

const CONFIG_FILE = '.i18readme.json';

function getConfigPath(cwd = process.cwd()) {
  return path.join(cwd, CONFIG_FILE);
}

function readProjectConfig(cwd = process.cwd()) {
  const configPath = getConfigPath(cwd);
  if (!fs.existsSync(configPath)) return null;
  try {
    return JSON.parse(fs.readFileSync(configPath, 'utf8'));
  } catch {
    throw new Error(`Failed to parse ${configPath}. Check that it's valid JSON.`);
  }
}

function writeProjectConfig(config, cwd = process.cwd()) {
  const configPath = getConfigPath(cwd);
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2) + '\n', 'utf8');
}

function findReadmes(cwd = process.cwd()) {
  const results = [];

  function scan(dir) {
    let entries;
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      if (entry.name.startsWith('.') || entry.name === 'node_modules') continue;
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        scan(fullPath);
      } else if (/^readme\.md$/i.test(entry.name)) {
        results.push(path.relative(cwd, fullPath).replace(/\\/g, '/'));
      }
    }
  }

  scan(cwd);
  return results.sort();
}

function requireProjectConfig(cwd = process.cwd()) {
  const config = readProjectConfig(cwd);
  if (!config) {
    throw new Error(
      `No ${CONFIG_FILE} found in this directory.\n` +
      `Run "i18r init" to set up the project first.`
    );
  }
  return config;
}

module.exports = { readProjectConfig, writeProjectConfig, requireProjectConfig, findReadmes, CONFIG_FILE, getConfigPath };
