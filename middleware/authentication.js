module.exports = (req, res, next) => {
    console.log('Kyyyyyyyyyyyy');
    if (req.session && req.session.UserId) {
        return next(); 
    }
    return res.redirect('/signIn'); 
};