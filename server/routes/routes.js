// routes/index.js or routes.js
const express = require('express');
const router = express.Router();

const AuthRoutes = require('./authRoutes');
const FetchRoutes = require('./FetchRoutes');

// Mount actual routers
router.use('/auth', AuthRoutes);       // /api/auth
router.use('/fetch', FetchRoutes);  // /api/zombies

module.exports = router;
   