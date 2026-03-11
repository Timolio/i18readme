const p = require('@clack/prompts');
const { requireProjectConfig } = require('../project-config');
const { run } = require('../index');
const { getApiKey, getProvider, getModel } = require('../config');
const { promptMissingKey } = require('./config');

async function sync({ force = false, forceLangs = null, flagKey = null, flagProvider = null, flagModel = null } = {}) {
  const cwd = process.cwd();
  const config = requireProjectConfig(cwd);
  const { langs: configLangs, dir = 'i18readme', readmes = ['README.md'] } = config;

  if (forceLangs) {
    const invalid = forceLangs.filter(l => !configLangs.includes(l));
    if (invalid.length) {
      p.log.warn(`Not configured: ${invalid.join(', ')} · Configured: ${configLangs.join(', ')}`);
    }
    forceLangs = forceLangs.filter(l => configLangs.includes(l));
    if (!forceLangs.length) { process.exit(1); }
  }

  const provider = getProvider(flagProvider);
  const model = getModel(provider, flagModel);
  if (!getApiKey(provider, flagKey)) {
    flagKey = await promptMissingKey(provider);
  }

  const displayLangs = forceLangs || configLangs;
  p.intro(`Syncing ${readmes.length > 1 ? `${readmes.length} READMEs` : readmes[0]} → [${displayLangs.join(', ')}]`);

  for (const readmePath of readmes) {
    if (readmes.length > 1) p.log.step(readmePath);
    await run({ langs: forceLangs || configLangs, allLangs: configLangs, readmePath, dirName: dir, shouldTranslate: true, force, provider, flagKey, model });
  }

  p.outro('Done');
}

module.exports = { sync };
