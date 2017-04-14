module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE ===========================
    // =====================================

    app.get('/', function(req, res) {
        res.render('index.ejs', {
        	title: "NOYEL Cédric - Index"
        });
    });

    // =====================================
    // LOGIN ===============================
    // =====================================

    app.get('/login', function(req, res) {
        res.render('login.ejs', {
        	title: "NOYEL Cédric - Login",
        	message: req.flash('loginMessage')
        }); 
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile',
        failureRedirect : '/login',
        failureFlash : true
    }));
    
    // =====================================
    // SIGNUP ==============================
    // =====================================

    app.get('/signup', function(req, res) {
        res.render('signup.ejs', { 
        	title: "NOYEL Cédric - Sign Up",
        	message: req.flash('signupMessage')
        });
    });

	app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile',
        failureRedirect : '/signup',
        failureFlash : true
    }));

    // =====================================
    // PROFILE SECTION =====================
    // =====================================

    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
        	title: "NOYEL Cédric - Profile",
            user : req.user
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================

    app.get('/signout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}
