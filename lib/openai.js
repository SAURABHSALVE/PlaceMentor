import OpenAI from 'openai'

if (!process.env.OPENAI_API_KEY) {
  console.warn('OPENAI_API_KEY environment variable is not set')
}

export const openaiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export const MODEL = 'gpt-4o-mini'