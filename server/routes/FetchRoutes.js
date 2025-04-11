const express = require('express');
const Zombie = require('../models/Zombie');
const ShopItem = require('../models/Items');
const { getHorrorMovies } = require("../controllers/moviecontrol");

const router = express.Router();
// GET /api/zombies
router.get('/zombies', async (req, res) => {
  try {
    const zombies = await Zombie.find();
    res.json(zombies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch zombies' });
  }
});

router.get("/items", async (req, res) => {
  console.log("fetch req dtected");
  const items = await ShopItem.find();
  res.json(items);
});

router.post("/movies", getHorrorMovies);

module.exports = router;
