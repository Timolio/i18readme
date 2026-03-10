const fs = require('fs');
const path = require('path');
const p = require('@clack/prompts');
const { translate } = require('./translate');
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

function injectLangBar(content, bar) {
  const marker = '<!-- i18readme -->';
  const block = `${marker}\n${bar}\n${marker}`;
  const re = /<!-- i18readme -->[\s\S]*?<!-- i18readme -->/;
  if (re.test(content)) return content.replace(re, block);
  return block + '\n\n' + content;
}

function isOutdated(sourceFile, targetFile) {
  try {
    return fs.statSync(sourceFile).mtimeMs > fs.statSync(targetFile).mtimeMs;
  } catch {
    return true;
  }
}

async function run({
  langs,
  readmePath,
  dirName,
  shouldTranslate = false,
  force = false,
  provider = 'claude',
  flagKey = null,
}) {
  const cwd = process.cwd();
  const absReadme = path.resolve(cwd, readmePath);

  let mainContent = '';
  if (fs.existsSync(absReadme)) {
    mainContent = fs.readFileSync(absReadme, 'utf8');
  } else {
    p.log.warn(`${readmePath} not found — creating an empty one.`);
    fs.writeFileSync(absReadme, '', 'utf8');
  }

  const mainLang = detectMainLang(readmePath);
  const allLangs = [mainLang, ...langs.filter(l => l !== mainLang)];
  const absDir = path.resolve(cwd, path.dirname(absReadme), dirName);

  if (!fs.existsSync(absDir)) {
    fs.mkdirSync(absDir, { recursive: true });
  }

  // Update main README lang bar
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

  for (const lang of langs) {
    const filePath = path.join(absDir, `README.${lang}.md`);
    const langName = getLangName(lang);
    const bar = buildLangBar(allLangs, lang, mainFromDir, mainLang);

    if (shouldTranslate) {
      const needsTranslation = force || isOutdated(absReadme, filePath);

      if (!needsTranslation) {
        if (fs.existsSync(filePath)) {
          const existing = fs.readFileSync(filePath, 'utf8');
          fs.writeFileSync(filePath, injectLangBar(existing, bar), 'utf8');
        }
        p.log.info(`${langName} — up to date`);
        continue;
      }

      const s = p.spinner();
      s.start(`Translating → ${langName}`);
      try {
        const translated = await translate(mainContent, langName, provider, flagKey);
        fs.writeFileSync(filePath, injectLangBar(translated, bar), 'utf8');
        s.stop(`${langName} — done`);
      } catch (err) {
        s.stop(`${langName} — failed`, 2);
        throw err;
      }
    } else {
      if (fs.existsSync(filePath)) {
        const existing = fs.readFileSync(filePath, 'utf8');
        fs.writeFileSync(filePath, injectLangBar(existing, bar), 'utf8');
        p.log.info(`Updated: ${path.relative(cwd, filePath)}`);
      } else {
        fs.writeFileSync(filePath, injectLangBar('', bar), 'utf8');
        p.log.success(`Created: ${path.relative(cwd, filePath)}`);
      }
    }
  }
}

module.exports = { run };
