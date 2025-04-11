const mongoose = require('mongoose');

const zombieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: '' // ya koi placeholder image
  },
  tips: {
    type: [String],
    required: true
  },
  danger: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  }
});

const Zombie = mongoose.model('Zombie', zombieSchema);

module.exports = Zombie;
