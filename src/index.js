const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const p = require('@clack/prompts');
const { translate, stripLangBar } = require('./translate');
const { getLangName } = require('./languages');

function detectMainLang(readmePath) {
  const base = path.basename(readmePath, path.extname(readmePath));
  const match = base.match(/README\.(.+)/i);
  return match ? match[1].toLowerCase() : 'en';
}

function buildLangBar(allLangs, currentLang, mainReadmePath, mainLang) {
  return allLangs
    .map(lang => {
      const name = getLangName(lang);
      if (lang === currentLang) return `**${name}**`;
      if (lang === mainLang) return `[${name}](${mainReadmePath})`;
      return `[${name}](README.${lang}.md)`;
    })
    .join(' | ');
}

function hashContent(text) {
  return crypto.createHash('sha256').update(text).digest('hex').slice(0, 12);
}

function extractStoredHash(content) {
  const match = content.match(/<!-- i18readme -->\s*<!-- src-hash:([a-f0-9]+) -->/);
  return match ? match[1] : null;
}

/**
 * Injects the lang bar (and optionally a source hash) into content.
 * srcHash is stored in translated files only — never in the source README.
 */
function injectLangBar(content, bar, srcHash = null) {
  const marker = '<!-- i18readme -->';
  const hashLine = srcHash ? `<!-- src-hash:${srcHash} -->\n` : '';
  const block = `${marker}\n${hashLine}${bar}\n${marker}`;
  const re = /<!-- i18readme -->[\s\S]*?<!-- i18readme -->/;
  if (re.test(content)) return content.replace(re, block);
  return block + '\n\n' + content;
}

function isContentChanged(sourceHash, targetFile) {
  try {
    const stored = extractStoredHash(fs.readFileSync(targetFile, 'utf8'));
    return stored !== sourceHash;
  } catch {
    return true;
  }
}

async function run({
  langs,
  allLangs,
  readmePath,
  dirName,
  shouldTranslate = false,
  force = false,
  provider = 'claude',
  flagKey = null,
  model = null,
}) {
  allLangs = allLangs || langs;
  const cwd = process.cwd();
  const absReadme = path.resolve(cwd, readmePath);

  let mainContent = '';
  if (fs.existsSync(absReadme)) {
    mainContent = fs.readFileSync(absReadme, 'utf8');
  } else {
    p.log.warn(`${readmePath} not found — creating an empty one.`);
    fs.writeFileSync(absReadme, '', 'utf8');
  }

  // Hash the clean source content (no lang bar) — used to detect real changes.
  const sourceHash = hashContent(stripLangBar(mainContent).trim());

  const mainLang = detectMainLang(readmePath);
  allLangs = [mainLang, ...allLangs.filter(l => l !== mainLang)];
  const absDir = path.resolve(cwd, path.dirname(absReadme), dirName);

  if (!fs.existsSync(absDir)) {
    fs.mkdirSync(absDir, { recursive: true });
  }

  // Update main README lang bar (no hash stored here — it's the source)
  const mainToDir = path.relative(path.dirname(absReadme), absDir).replace(/\\/g, '/');
  const mainBar = allLangs
    .map(lang => {
      const name = getLangName(lang);
      if (lang === mainLang) return `**${name}**`;
      return `[${name}](${mainToDir}/README.${lang}.md)`;
    })
    .join(' | ');

  fs.writeFileSync(absReadme, injectLangBar(mainContent, mainBar), 'utf8');

  const mainFromDir = path.relative(absDir, absReadme).replace(/\\/g, '/');

  for (const lang of langs.filter(l => l !== mainLang)) {
    const filePath = path.join(absDir, `README.${lang}.md`);
    const langName = getLangName(lang);
    const bar = buildLangBar(allLangs, lang, mainFromDir, mainLang);

    if (shouldTranslate) {
      const needsTranslation = force || isContentChanged(sourceHash, filePath);

      if (!needsTranslation) {
        if (fs.existsSync(filePath)) {
          const existing = fs.readFileSync(filePath, 'utf8');
          // Preserve the stored hash when only updating the bar
          fs.writeFileSync(filePath, injectLangBar(existing, bar, sourceHash), 'utf8');
        }
        p.log.info(`${langName} — up to date`);
        continue;
      }

      const s = p.spinner();
      s.start(`Translating → ${langName}`);
      try {
        const translated = await translate(mainContent, langName, provider, flagKey, model);
        fs.writeFileSync(filePath, injectLangBar(translated, bar, sourceHash), 'utf8');
        s.stop(`${langName} — done`);
      } catch (err) {
        s.stop(`${langName} — failed`, 2);
        throw err;
      }
    } else {
      if (fs.existsSync(filePath)) {
        const existing = fs.readFileSync(filePath, 'utf8');
        fs.writeFileSync(filePath, injectLangBar(existing, bar, extractStoredHash(existing)), 'utf8');
        p.log.info(`Updated: ${path.relative(cwd, filePath)}`);
      } else {
        fs.writeFileSync(filePath, injectLangBar('', bar), 'utf8');
        p.log.success(`Created: ${path.relative(cwd, filePath)}`);
      }
    }
  }
}

module.exports = { run };
