let OpenAI;
try {
  OpenAI = require('openai');
} catch {
  OpenAI = null;
}

const { SYSTEM_PROMPT, buildUserPrompt } = require('../prompt');

async function translate(text, targetLang, apiKey, model = 'gpt-4o-mini') {
  if (!OpenAI) {
    throw new Error(
      'Package openai is not installed.\n' +
      'Run: npm install openai'
    );
  }

  if (!apiKey) {
    throw new Error('No API key found for OpenAI.\nRun: i18r config');
  }

  const client = new OpenAI.default({ apiKey });

  const response = await client.chat.completions.create({
    model,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: buildUserPrompt(text, targetLang) },
    ],
  });

  return response.choices[0]?.message?.content ?? '';
}

module.exports = { translate };
