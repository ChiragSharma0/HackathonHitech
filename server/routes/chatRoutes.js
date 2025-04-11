const express = require('express');
const router = express.Router();

const { sendMessageToAI } = require('../controllers/chatController');

// Post API
router.post('/send', sendMessageToAI);

module.exports = router;
