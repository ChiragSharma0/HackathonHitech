// routes/index.js or routes.js
const express = require('express');
const router = express.Router();

const AuthRoutes = require('./authRoutes');
<<<<<<< HEAD
const ZombieRoutes = require('./zombieRoutes');

// Mount actual routers
router.use('/auth', AuthRoutes);       // /api/auth
router.use('/zombie', ZombieRoutes);  // /api/zombies
=======
const FetchRoutes = require('./FetchRoutes');

// Mount actual routers
router.use('/auth', AuthRoutes);       // /api/auth
router.use('/fetch', FetchRoutes);  // /api/zombies
>>>>>>> 18032e76acf6599d6261d9a67686a697659a4892

module.exports = router;
