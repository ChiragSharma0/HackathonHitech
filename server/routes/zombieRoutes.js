const express = require('express');
const Zombie = require('../models/zombieModel');
const router = express.Router();

// Fetch all zombies
router.get('/zombies', async (req, res) => {
  try {
    const zombies = await Zombie.find();
    res.json(zombies);
  } catch (err) {
    res.status(400).send('Error fetching zombies: ' + err);
  }
});

module.exports = router;
