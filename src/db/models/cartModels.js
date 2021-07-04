const mongoose = require('mongoose');
const schema = mongoose.Schema;

const cartModel = new schema({
  customerId: {
    type: String,
  },
  dishes: [
    {
      dishId: {
        type: String,
        required: true
      },
      dishName: {
        type: String,
        required: true,
      },
      modifierId: {
        type: String,
        required: false
      },
      modifierName: {
        type: String,
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        default: 1
      },
      restaurantId: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        default: 0
      }
    }
  ],
  total: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const Cart = mongoose.model('Cart', cartModel);

module.exports = Cart;