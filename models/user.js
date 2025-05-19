const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
//const hashedPassword = await bcrypt.hash("hello123", 12);

const Schema = mongoose.Schema;

const userSchema = new Schema ({
    username: {
        type:String,
        required:true
    },
    
    password:{
        type:String,
        required:true,
    },
    feedback:{
      type:String,
    },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

    friendRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

    sentRequestList:[{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
  
  
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(12); 
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.comparePassword=async function(candidatePassword){
  
   return bcrypt.compare(candidatePassword,this.password);


}


module.exports = mongoose.model('User',userSchema);