// routes/index.js or routes.js
const express = require('express');
const router = express.Router();

const AuthRoutes = require('./authRoutes');
const ZombieRoutes = require('./zombieRoutes');

// Mount actual routers
router.use('/auth', AuthRoutes);       // /api/auth
router.use('/zombie', ZombieRoutes);  // /api/zombies

module.exports = router;
