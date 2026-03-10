const LANGUAGE_NAMES = {
  af: 'Afrikaans', ar: 'العربية', az: 'Azərbaycan', be: 'Беларуская',
  bg: 'Български', bn: 'বাংলা', bs: 'Bosanski', ca: 'Català',
  cs: 'Čeština', cy: 'Cymraeg', da: 'Dansk', de: 'Deutsch',
  el: 'Ελληνικά', en: 'English', eo: 'Esperanto', es: 'Español',
  et: 'Eesti', eu: 'Euskara', fa: 'فارسی', fi: 'Suomi',
  fr: 'Français', ga: 'Gaeilge', gl: 'Galego', gu: 'ગુજરાતી',
  he: 'עברית', hi: 'हिन्दी', hr: 'Hrvatski', hu: 'Magyar',
  hy: 'Հայերեն', id: 'Bahasa Indonesia', is: 'Íslenska', it: 'Italiano',
  ja: '日本語', ka: 'ქართული', kk: 'Қазақша', km: 'ខ្មែរ',
  ko: '한국어', lt: 'Lietuvių', lv: 'Latviešu', mk: 'Македонски',
  ml: 'മലയാളം', mn: 'Монгол', mr: 'मराठी', ms: 'Bahasa Melayu',
  mt: 'Malti', my: 'မြန်မာ', nb: 'Norsk bokmål', ne: 'नेपाली',
  nl: 'Nederlands', pa: 'ਪੰਜਾਬੀ', pl: 'Polski', pt: 'Português',
  ro: 'Română', ru: 'Русский', sk: 'Slovenčina', sl: 'Slovenščina',
  sq: 'Shqip', sr: 'Српски', sv: 'Svenska', sw: 'Kiswahili',
  ta: 'தமிழ்', te: 'తెలుగు', th: 'ไทย', tl: 'Filipino',
  tr: 'Türkçe', uk: 'Українська', ur: 'اردو', uz: 'O\'zbek',
  vi: 'Tiếng Việt', zh: '中文', 'zh-tw': '繁體中文',
};

function getLangName(code) {
  return LANGUAGE_NAMES[code.toLowerCase()] || code.toUpperCase();
}

module.exports = { LANGUAGE_NAMES, getLangName };
