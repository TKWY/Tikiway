const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const businessHoursSchema = new Schema({
  slotName: String,
  monday: {
    start: {
      type: Number,
      default: '00:00'
    },
    end: {
      type: Number,
      default: '00:00'
    }
  },
  tuesday: {
    start: {
      type: Number,
      default: '00:00'
    },
    end: {
      type: Number,
      default: '00:00'
    }
  },
  wednesday: {
    start: {
      type: Number,
      default: '00:00'
    },
    end: {
      type: Number,
      default: '00:00'
    }
  },
  thursday: {
    start: {
      type: Number,
      default: '00:00'
    },
    end: {
      type: Number,
      default: '00:00'
    }
  },
  friday: {
    start: {
      type: Number,
      default: '00:00'
    },
    end: {
      type: Number,
      default: '00:00'
    }
  },
  saturday: {
    start: {
      type: Number,
      default: '00:00'
    },
    end: {
      type: Number,
      default: '00:00'
    }
  },
  sunday: {
    start: {
      type: Number,
      default: '00:00'
    },
    end: {
      type: Number,
      default: '00:00'
    }
  }
})

const businessHours = mongoose.model('BusinessHours', businessHoursSchema);

module.exports = {
  businessHours,
  businessHoursSchema
};
