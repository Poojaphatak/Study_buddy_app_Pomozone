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
    }
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // skip if password isn't changed
  try {
    const salt = await bcrypt.genSalt(12); // 12 rounds is standard
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.comparePassword=async function(candidatePassword){
   //const hashedPassword = await bcrypt.hash(candidatePassword,salt);
   return bcrypt.compare(candidatePassword,this.password);


}


module.exports = mongoose.model('User',userSchema);