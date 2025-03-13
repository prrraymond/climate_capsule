const mongoose = require('mongoose');

const PledgeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  pledges: [String],
  lastUpdate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Pledge', PledgeSchema);