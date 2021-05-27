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

const businessHours = mongoose.model('BusinessHours', businessHoursSchema);

module.exports = {
  businessHours,
  businessHoursSchema
};