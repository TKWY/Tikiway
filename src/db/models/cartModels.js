const mongoose = require('mongoose');
const schema = mongoose.Schema;

const cartModel = new schema({
  customerId: {
    type: schema.Types.ObjectId,
    required: true,
    ref: "Customer"
  },
  dishes: [
    {
      dishId: {
        type: schema.Types.ObjectId,
        ref: "Dish",
        required: true
      },
      dishName: {
        type: String,
        required: true,
      },
      sideDishId: {
        type: schema.Types.ObjectId,
        ref: "SideDish",
        
        required: true
      },
      sideDishName: {
        type: String,
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        default: 1
      },
      restaurantId: {
        type: schema.Types.ObjectId,
        required: true,
        ref: "Restaurant"
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
})