const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const walletSchema = new Schema({
  customerId: { 
    type: String,
    required: true
  },
  tikiCash: { 
    type: Number 
  },
  giftCards: [
    { 
      _id: String, 
      type: String
    }
  ]
})

const Wallet = mongoose.model('Wallet', walletSchema);
module.exports = Wallet;