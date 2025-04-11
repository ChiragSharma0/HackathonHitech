const axios = require('axios');
require('dotenv').config();

const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);

// Helper function to fetch movie poster from OMDB
const getMoviePoster = async (title) => {
  try {
    const apiKey = process.env.OMDB_API_KEY;
    const response = await axios.get("https://www.omdbapi.com/", {
      params: {
        t: title,
        apikey: apiKey
      }
    });
    return response.data?.Poster || null;
  } catch (err) {
    console.warn(`❌ Poster not found for ${title}`);
    return null;
  }
};

exports.getHorrorMovies = async (req, res) => {
  try {
    const { mood, preferences } = req.body;

    if (!mood || !preferences) {
      return res.status(400).json({ error: 'Mood and preferences are required' });
    }

    const prompt = `
You are a haunted horror movie expert.

Suggest 5 dark and suspenseful horror movies based on the following:

Mood: "${mood}"
Preferences: "${preferences}"

Respond ONLY in this JSON format (array of 5 objects):
[
  {
    "title": "Movie Title",
    "description": "2-line chilling description"
  }
]
    `;

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    let movies = [];

    try {
      const jsonStart = responseText.indexOf("[");
      const jsonEnd = responseText.lastIndexOf("]");
      const jsonString = responseText.substring(jsonStart, jsonEnd + 1);
      movies = JSON.parse(jsonString);
    } catch (jsonErr) {
      console.warn('❗ Failed to parse JSON, using fallback movie list.', jsonErr.message);
      movies = [
        {
          title: "Whispers from the Attic",
          description: "A family moves into a Victorian house haunted by voices echoing from the past."
        },
        {
          title: "The Forgotten Cellar",
          description: "A group of teens uncovers a locked basement filled with cursed relics."
        },
        {
          title: "Sleep No More",
          description: "Anyone who dreams sees the same shadowy figure—and dies in their sleep."
        },
        {
          title: "Harvest Moon",
          description: "On the night of the blood moon, ancient woodland spirits begin to hunt again."
        },
        {
          title: "The Last Broadcast",
          description: "A haunted radio station plays the voice of a dead DJ who controls the town."
        }
      ];
    }

    // Fetch posters for each movie
    const movieResults = await Promise.all(
      movies.map(async (movie) => {
        const poster = await getMoviePoster(movie.title);
        return {
          ...movie,
          poster: poster || "https://via.placeholder.com/300x450?text=No+Poster+Found"
        };
      })
    );

    res.status(200).json({ recommendations: movieResults });

  } catch (error) {
    console.error('Error generating movie suggestions:', error.message);
    res.status(500).json({ error: 'Something went wrong', details: error.message });
  }
};