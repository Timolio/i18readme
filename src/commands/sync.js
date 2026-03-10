const p = require('@clack/prompts');
const { requireProjectConfig } = require('../project-config');
const { run } = require('../index');
const { getApiKey, getProvider } = require('../config');
const { promptMissingKey } = require('./config');

async function sync({ force = false, flagKey = null, flagProvider = null } = {}) {
  const cwd = process.cwd();
  const config = requireProjectConfig(cwd);
  const { langs, dir = 'i18readme', readmes = ['README.md'] } = config;

  const provider = getProvider(flagProvider);
  if (!getApiKey(provider, flagKey)) {
    flagKey = await promptMissingKey(provider);
  }

  p.intro(`Syncing ${readmes.length > 1 ? `${readmes.length} READMEs` : readmes[0]} → [${langs.join(', ')}]`);

  for (const readmePath of readmes) {
    if (readmes.length > 1) p.log.step(readmePath);
    await run({ langs, readmePath, dirName: dir, shouldTranslate: true, force, provider, flagKey });
  }

  p.outro('Done');
}

module.exports = { sync };
