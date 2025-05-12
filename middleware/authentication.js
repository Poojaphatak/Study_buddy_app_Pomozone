module.exports = (req, res, next) => {
    console.log('Kyyyyyyyyyyyy');
    if (req.session && req.session.UserId) {
        return next(); // User is authenticated, proceed to the next middleware or route handler
    }
    return res.redirect('/signIn'); // Redirect to login page if not authenticated
};