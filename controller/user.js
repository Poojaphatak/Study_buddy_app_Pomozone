const User = require('../models/user');

exports.postregister = async (req,res,next)=>{
    const userName = req.body.username;
    const password=  req.body.password;
    User.findOne({username:userName}).then(user=>{
        if(user){
          return res.status(400).json({ message: 'Username already exists' });
        }
        else{
        const newuser = new User({
        username:userName,
        password:password,
        });

        return newuser.save().then(()=>{
           
            res.render('user/signin');
        })


        }
    })
 
};


exports.postLogin = async (req,res,next)=>{
     const userName = req.body.username;
    const password=  req.body.password;
   
    User.findOne({username:userName}).then(async user=>{
         const isMatch =await user.comparePassword(password);
        if(!user || (!isMatch)){
         return res.status(400).json({ message: 'username or password is incorrect' });
        
        }
        
        else{
            req.session.UserId = user._id;
            
           res.redirect('/spaces');
        }
    });


};

exports.getRegister = (req,res,next)=>{
    res.render('user/signup');
};

exports.getdashboard = async (req,res,next)=>{
    return User.findById(req.session.UserId).then(user=>{ 
        res.render('home/dashboard',{
            user:user,

    })
  
    });
 
}

exports.getSpaces = async (req,res,next)=>{
    res.render('home/spaces');
}