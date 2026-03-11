const p = require('@clack/prompts');
const { writeProjectConfig, findReadmes, CONFIG_FILE } = require('../project-config');
const { setKey, setProvider, setModel, PROVIDER_MODELS } = require('../config');
const { LANGUAGE_NAMES } = require('../languages');

async function init() {
  const cwd = process.cwd();

  p.intro('Setting up i18readme');

  // ─── Languages ────────────────────────────────────────────────────────────
  p.log.info('ISO 639-1 codes: https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes');
  const langs = await p.text({
    message: 'Languages to translate to',
    placeholder: 'ru, de, fr',
    validate(value) {
      const list = value.split(/[\s,]+/).map(l => l.trim().toLowerCase()).filter(Boolean);
      if (list.length === 0) return 'Enter at least one language code.';
      const unknown = list.filter(l => !LANGUAGE_NAMES[l]);
      if (unknown.length) {
        return `Unknown language codes: ${unknown.join(', ')}. Use ISO 639-1 codes (e.g. ru, de, fr, zh).`;
      }
    },
  });
  if (p.isCancel(langs)) { p.cancel('Cancelled.'); process.exit(0); }

  const langList = langs.split(/[\s,]+/).map(l => l.trim().toLowerCase()).filter(Boolean);
  const langNames = langList.map(l => LANGUAGE_NAMES[l]).join(', ');
  p.log.info(`Languages: ${langNames}`);

  // ─── Translations folder ──────────────────────────────────────────────────
  const dir = await p.text({
    message: 'Translations folder name',
    placeholder: 'i18readme',
    defaultValue: 'i18readme',
  });
  if (p.isCancel(dir)) { p.cancel('Cancelled.'); process.exit(0); }

  // ─── README files ─────────────────────────────────────────────────────────
  const found = findReadmes(cwd);
  let readmes;

  if (found.length <= 1) {
    readmes = found.length === 1 ? found : ['README.md'];
    p.log.info(`README: ${readmes.join(', ')}`);
  } else {
    const choice = await p.select({
      message: `Found ${found.length} README files — which to track?`,
      options: [
        { value: 'all', label: 'All of them' },
        { value: 'pick', label: 'Let me pick' },
      ],
    });
    if (p.isCancel(choice)) { p.cancel('Cancelled.'); process.exit(0); }

    if (choice === 'all') {
      readmes = found;
    } else {
      const picked = await p.multiselect({
        message: 'Select README files to track',
        options: found.map(f => ({ value: f, label: f })),
        required: true,
      });
      if (p.isCancel(picked)) { p.cancel('Cancelled.'); process.exit(0); }
      readmes = picked;
    }
  }

  // ─── Provider ─────────────────────────────────────────────────────────────
  const provider = await p.select({
    message: 'AI provider',
    options: [
      { value: 'claude', label: 'Claude (Anthropic)', hint: 'recommended' },
      { value: 'openai', label: 'OpenAI' },
    ],
  });
  if (p.isCancel(provider)) { p.cancel('Cancelled.'); process.exit(0); }

  // ─── Model ────────────────────────────────────────────────────────────────
  const model = await p.select({
    message: 'Model',
    options: PROVIDER_MODELS[provider],
  });
  if (p.isCancel(model)) { p.cancel('Cancelled.'); process.exit(0); }

  // ─── API key ──────────────────────────────────────────────────────────────
  const key = await p.password({
    message: `API key for ${provider}`,
    validate(value) {
      if (!value) return 'API key is required.';
    },
  });
  if (p.isCancel(key)) { p.cancel('Cancelled.'); process.exit(0); }

  // ─── Save ─────────────────────────────────────────────────────────────────
  writeProjectConfig({ langs: langList, dir, readmes }, cwd);
  setProvider(provider);
  setModel(provider, model);
  setKey(provider, key);

  p.outro(`Done · Run "i18r sync" to translate`);
}

module.exports = { init };
