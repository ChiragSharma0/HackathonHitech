const express = require('express');
const Zombie = require('../models/Zombie');
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

module.exports = router;
