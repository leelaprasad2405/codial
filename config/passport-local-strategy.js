// // we have installed passport and passport-local at terminal lets use it // passport library is used for not writing the repetitive code again

// const passport = require('passport');
// const User = require('../models/user');
// const LocalStrategy = require('passport-local').Strategy;

// passport.use(new LocalStrategy({
//     usernameField: 'email'
//     },
//     function(email,password,done){
//         // find a user and establish the identity
//         User.findOne({email: email}, function(err, user){
//             if(err){
//                 console.log('Error in finding user ---> passport');
//                 return done(err);
//             }
//             if(!user || user.password != password){
//                 console.log('Invalid username/password');
//                 return done(null, false);
//             }
//             return done(null, user);
//         });
//     }
// ));

// //serializing the user to decide which key is to be kept in the cookies
// passport.serializeUser(function(user, done){
//     done(null, user.id);
// });

// // deserializing the user from the key in the cookies
// passport.deserializeUser(function(id, done){
//     User.findById(id, function(err, user){
//         if(err){
//             console.log('Error in finding user ---> passport');
//             return done(err);
//         }
//         return done(null, user);
//     });
// });

// module.exports = passport;

// above code from cg
 const passport = require('passport');
 const User = require('../models/user');
 const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
}, function (req, email, password, done) {
    // find a user and establish the identity
    User.findOne({ email: email }).exec() // Use exec() without a callback
        .then(user => {
            if (!user || user.password !== password) {
                console.log('Invalid username/password');
                //req.flash('Invalid username/password', err);
                return done(null, false);
            }
            return done(null, user);
        })
        .catch(err => {
            console.log('Error in finding user ---> passport');
            //req.flash('error', err);
            return done(err);
        });
}));

// passport.use(new LocalStrategy({
//     usernameField: 'email',
//     passReqToCallback: true
// },
//     function (req, email, password, done) {
//         // find a user and establish the identity
//         User.findOne({ email: email })
//             .then(user => {
//                 if (!user || user.password !== password) {
//                     //console.log('Invalid username/password');
//                     req.flash('error', 'Invalid UserName / Password');
//                     return done(null, false);
//                 }
//                 return done(null, user);
//             })
//             .catch(err => {
//                 console.log('Error in finding user ---> passport');
//                 return done(err);
//             });
//     }
// ));

// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

// deserializing the user from the key in the cookies
passport.deserializeUser(function (id, done) {
    User.findById(id).exec() // Use exec() without a callback
        .then(user => {
            return done(null, user);
        })
        .catch(err => {
            console.log('Error in finding user ---> passport');
            return done(err);
        });
});

// check if the user is authenticated
passport.checkAuthentication = function(req, res, next){
    // if the user is signed in, then pass on the request to the next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }
    // if the user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }

    next();
}

module.exports = passport;
