const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const businessHoursSchema = new Schema({
  slotName: String,
  monday: {
    start: {
      type: String,
      default: 00
    }, 
    end: {
      type: String,
      default: 00
    }
  },
  tuesday: {
    start: {
      type: String,
      default: 00
    }, 
    end: {
      type: String,
      default: 00
    }
  },
  wednesday: {
    start: {
      type: String,
      default: 00
    }, 
    end: {
      type: String,
      default: 00
    }
  },
  thursday: {
    start: {
      type: String,
      default: 00
    }, 
    end: {
      type: String,
      default: 00
    }
  },
  friday: {
    start: {
      type: String,
      default: 00
    }, 
    end: {
      type: String,
      default: 00
    }
  },
  saturday: {
    start: {
      type: String,
      default: 00
    }, 
    end: {
      type: String,
      default: 00
    }
  },
  sunday: {
    start: {
      type: String,
      default: 00
    }, 
    end: {
      type: String,
      default: 00
    }
  }
})

const reviewsSchema = new Schema({
  orderId: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  writer: {
    type: String,
    required: true
  },
  comment: String,
  tags: [{
    label: String
  }],
  likes: [{
    clientId: String, 
    date: Date
  }],
  shares: [{
    clientId: String, 
    plateform: String, 
    date: Date
  }]
})

const restaurantSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  description:  {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 0
  },
  category: String,
  logo: {
    type: String,
    default: 'default'
  },
  businessHours: [businessHoursSchema],
  businessHoursExceptions: [{
    type: String,
    name: String,
    date: Date,
    businessHours: [businessHoursSchema]
  }],
  reviews: [reviewsSchema],
  address: {
    addressLine: String,
    lng: Number,
    lat: Number
  }
})

const Restaurant = mongoose.model('Restaurant', restaurantSchema);
module.exports = Restaurant