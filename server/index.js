import express from 'express';
import cors from 'cors';
import axios from 'axios';
import * as cheerio from 'cheerio';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Update CORS to allow your portfolio domain and local development
const allowedOrigins = [
  'http://localhost:5173',
  'https://gkhot27.github.io' // Replace with your actual GitHub Pages URL if different
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/api/summarize', async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    // 1. Scrape the website
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    const $ = cheerio.load(response.data);
    
    // Remove scripts and styles
    $('script, style').remove();
    
    // Get text content (limit to first 3000 chars to stay within LLM limits and for performance)
    const text = $('body').text().replace(/\s+/g, ' ').trim().slice(0, 3000);

    if (!text) {
      return res.status(400).json({ error: 'Could not extract text from the website' });
    }

    // 2. Summarize using OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that summarizes web content into exactly one concise sentence."
        },
        {
          role: "user",
          content: `Please summarize this web content in one sentence:\n\n${text}`
        }
      ],
      max_tokens: 100,
    });

    const summary = completion.choices[0].message.content;

    res.json({ summary });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to scrape or summarize the content. Make sure the URL is valid and accessible.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

