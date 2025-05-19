module.exports = (req, res, next) => {
 
    if (req.session && req.session.UserId) {
        return next(); 
    }
    return res.redirect('/signIn'); 
};