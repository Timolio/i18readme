#!/usr/bin/env node
process.noDeprecation = true;

const args = process.argv.slice(2);
const command = args[0];

// ─── config subcommand ────────────────────────────────────────────────────────
if (command === 'config') {
  if (!args[1]) {
    // Interactive setup
    const { configInteractive } = require('../src/commands/config');
    configInteractive().catch(err => { console.error(`\nError: ${err.message}`); process.exit(1); });
  } else if (args[1] === 'show') {
    const { showConfig } = require('../src/config');
    showConfig();
    process.exit(0);
  } else if (args[1] === 'set') {
    const { setKey, setProvider } = require('../src/config');
    const providerIndex = args.indexOf('--provider');
    const keyIndex = args.indexOf('--key');
    const hasProvider = providerIndex !== -1 && args[providerIndex + 1];
    const hasKey = keyIndex !== -1 && args[keyIndex + 1];

    if (!hasProvider && !hasKey) {
      console.error('Error: i18r config set --provider <name> [--key <key>]');
      process.exit(1);
    }
    if (hasKey && !hasProvider) {
      console.error('Error: --provider is required when setting a key');
      process.exit(1);
    }
    if (hasKey) { setKey(args[providerIndex + 1], args[keyIndex + 1]); console.log('Key saved.'); }
    if (hasProvider && !hasKey) { setProvider(args[providerIndex + 1]); console.log(`Provider set to "${args[providerIndex + 1]}".`); }
    process.exit(0);
  } else {
    console.error(`Unknown config subcommand: ${args[1]}`);
    console.error('Usage: i18r config | i18r config show | i18r config set ...');
    process.exit(1);
  }
  return;
}

// ─── init ─────────────────────────────────────────────────────────────────────
if (command === 'init') {
  const { init } = require('../src/commands/init');
  init().catch(err => { console.error(`\nError: ${err.message}`); process.exit(1); });
  return;
}

// ─── sync ─────────────────────────────────────────────────────────────────────
if (command === 'sync') {
  const { sync } = require('../src/commands/sync');
  const forceIndex = args.indexOf('--force');
  const forceValue = forceIndex !== -1 ? args[forceIndex + 1] : null;
  const forceLangs = forceValue && !forceValue.startsWith('--')
    ? forceValue.split(',').map(l => l.trim()).filter(Boolean)
    : null;
  const force = forceIndex !== -1;
  const keyIndex = args.indexOf('--key');
  const flagKey = keyIndex !== -1 ? args[keyIndex + 1] : null;
  const providerIndex = args.indexOf('--provider');
  const flagProvider = providerIndex !== -1 ? args[providerIndex + 1] : null;
  const modelIndex = args.indexOf('--model');
  const flagModel = modelIndex !== -1 ? args[modelIndex + 1] : null;
  sync({ force, forceLangs, flagKey, flagProvider, flagModel }).catch(err => { console.error(`\nError: ${err.message}`); process.exit(1); });
  return;
}

// ─── status ───────────────────────────────────────────────────────────────────
if (command === 'status') {
  const { status } = require('../src/commands/status');
  try { status(); } catch (err) { console.error(`\nError: ${err.message}`); process.exit(1); }
  process.exit(0);
}

// ─── help / unknown command ───────────────────────────────────────────────────
if (command && !args.includes('--help') && !args.includes('-h')) {
  console.error(`Unknown command: ${command}`);
}

console.log(`
Usage:
  i18r init                                        Interactive project setup
  i18r sync                                        Translate missing/outdated READMEs
  i18r sync --force                                Retranslate everything
  i18r sync --force ru,de                          Retranslate specific languages only
  i18r sync --provider <p>                         Override provider for this run
  i18r sync --model <m>                            Override model for this run
  i18r status                                      Show translation status
  i18r config                                      Update provider, model, and API key
  i18r config show                                 Show current config
  i18r config set --provider <p> --key <k>         Save API key (non-interactive)
`);
process.exit(command ? 1 : 0);
