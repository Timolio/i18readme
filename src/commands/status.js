const fs = require('fs');
const path = require('path');
const p = require('@clack/prompts');
const { requireProjectConfig } = require('../project-config');
const { getLangName } = require('../languages');

function mtime(filePath) {
  try {
    return fs.statSync(filePath).mtimeMs;
  } catch {
    return null;
  }
}

function formatAge(ms) {
  const s = Math.floor((Date.now() - ms) / 1000);
  if (s < 60) return `${s}s ago`;
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}

function status() {
  const cwd = process.cwd();
  const config = requireProjectConfig(cwd);
  const { langs, dir = 'i18readme', readmes = ['README.md'] } = config;

  let allGood = true;

  for (const readmePath of readmes) {
    if (readmes.length > 1) p.log.step(readmePath);

    const absReadme = path.resolve(cwd, readmePath);
    const sourceMtime = mtime(absReadme);

    if (!sourceMtime) {
      p.log.error(`${readmePath} — source file not found`);
      continue;
    }

    const transDir = path.join(path.dirname(absReadme), dir);

    for (const lang of langs) {
      const name = getLangName(lang);
      const transFile = path.join(transDir, `README.${lang}.md`);
      const transMtime = mtime(transFile);

      if (!transMtime) {
        p.log.error(`${name} (${lang}) — missing`);
        allGood = false;
      } else if (sourceMtime > transMtime) {
        p.log.warn(`${name} (${lang}) — outdated · source updated ${formatAge(sourceMtime)}`);
        allGood = false;
      } else {
        p.log.success(`${name} (${lang}) — up to date`);
      }
    }
  }

  if (allGood) {
    p.outro('All translations are up to date.');
  } else {
    p.outro('Run "i18r sync" to update outdated or missing translations.');
  }
}

module.exports = { status };
