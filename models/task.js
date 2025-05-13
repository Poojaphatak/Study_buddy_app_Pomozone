const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    completed:
    {
       type:Boolean,
       default:false,
    },
     userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref:'User',
        }
})

module.exports = mongoose.model('Task',taskSchema);