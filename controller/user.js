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
     

    if (!user) {
    return res.status(401).json({ error: 'Invalid username or password.' });
    }
    console.log(password);
    const isMatch = await user.comparePassword(password);

    if(!isMatch){
       return res.status(401).json({ error: 'Invalid username or password.' });
    }
   
   

    req.session.UserId = user._id;
    // localStorage.setItem("userId", data.userId);
   res.json({ userId: user._id });
   // res.redirect('/spaces');

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
 

exports.getLogout = async (req,res,next)=>{
    req.session.destroy(err=>{
        if(err){
        res.redirect('/dashboard');

        }
        res.clearCookie('connect.sid');
        res.redirect('/');
    })


}

