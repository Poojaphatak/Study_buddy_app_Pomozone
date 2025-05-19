const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const progressSchema = new Schema ({
    userId:
    {
        type: Schema.Types.ObjectId,
        ref:'User',
        required: true 

    },
    focusMins:{
        type:Number,
        default:0,

    },
    focusGoal:{
        type:Number,
        default:90,

    },

 date: {
    type: Date,
    default: null,
  }
});
module.exports = mongoose.model('Progress',progressSchema);