// services/openaiService.js
const OpenAI = require('openai');
const dotenv = require('dotenv');

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
  baseURL: 'https://api.gptsapi.net/v1'
});

const generateImage = async (prompt) => {
  try {
    const response = await client.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });
    return response.data[0].url;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to generate image');
  }
};

module.exports = { generateImage };
