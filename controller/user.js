const User = require('../models/user');

exports.postregister = async (req,res,next)=>{
    const userName = req.body.username;
    const password=  req.body.password;
    User.findOne({username:userName}).then(user=>{
        if(user){
           return res.render('user/signup', { error: 'Username already exists' });
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


exports.postLogin = async (req, res, next) => {
    const userName = req.body.username;
    const password = req.body.password;

    const user = await User.findOne({ username: userName });
     const isMatch = await user.comparePassword(password);

    if (!user || !isMatch) {
    return res.render('user/signin', { error: 'Invalid username or password.' });
    }
    console.log(password);
   
   

    req.session.UserId = user._id;
  //  res.json({ userId: user._id });
    res.redirect('/spaces');
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
    return User.findById(req.session.UserId).then(user=>{ 
        res.render('home/spaces',{
            user:user,

    })
})}
   