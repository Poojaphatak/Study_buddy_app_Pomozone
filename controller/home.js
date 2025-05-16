const User = require('../models/user');
exports.getFeedback = (req,res,next)=>{
    const userId = req.params.userId;
    res.render('home/feedback',{
        userId:userId,
        isThank:false,
    });
}

exports.postFeedback = async(req,res,next)=>{
    const userId = req.body.userId;
    const feedback = req.body.feedback;
    const updateuser =await User.findByIdAndUpdate(userId,{
        feedback:feedback
    },
    {
        new:true
    }

);
   return res.render('home/feedback',{
        isThank:true
    });
    
    
}