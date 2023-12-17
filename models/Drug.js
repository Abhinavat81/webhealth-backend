const mongoose = require('mongoose');

const drugSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  composition: [String],
  brand: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  reviews: {
    type: Number,
    min: 0,
    max: 5,
  },
  recommendedDosage: String,
  howToUse: String,
  specialInstructions: String,
  conditionsNotToUse: [String],
  classification: {
    type: String,
    enum: ['OTC', 'Prescription'],
    required: true,
  },
  status: {
    type: String,
    enum: ['Available', 'Not Available'],
    default: 'Available',
  },
});

const Drug = mongoose.model('Drug', drugSchema);

module.exports = Drug;
