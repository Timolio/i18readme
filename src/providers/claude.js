let Anthropic;
try {
  Anthropic = require('@anthropic-ai/sdk');
} catch {
  Anthropic = null;
}

const { SYSTEM_PROMPT, buildUserPrompt } = require('../prompt');

async function translate(text, targetLang, apiKey) {
  if (!Anthropic) {
    throw new Error(
      'Package @anthropic-ai/sdk is not installed.\n' +
      'Run: npm install @anthropic-ai/sdk'
    );
  }

  if (!apiKey) {
    throw new Error('No API key found for Claude.\nRun: i18r config');
  }

  const client = new Anthropic.default({ apiKey });

  const stream = client.messages.stream({
    model: 'claude-opus-4-6',
    max_tokens: 8192,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: buildUserPrompt(text, targetLang) }],
  });

  const response = await stream.finalMessage();
  return response.content.find(b => b.type === 'text')?.text ?? '';
}

module.exports = { translate };
