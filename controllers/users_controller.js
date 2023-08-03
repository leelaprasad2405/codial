// const User = require('../models/user')

// module.exports.profile = function (req, res) {
//     // return res.end('<h1>User Profile </h1>'); // for home

//     // This is sending title value to user_profile.ejs file for home page
//     User.findById(req.params.id, function (err, user) {
//         return res.render('user_profile', {
//             title: "Profile",
//             profile_user: user
//         });
//     });

// }

const User = require('../models/user');

module.exports.profile = async function (req, res) {
    try {
        // This is sending title value to user_profile.ejs file for the home page
        const user = await User.findByIdAndUpdate(req.params.id).exec();

        if (!user) {
            // Handle the case when the user is not found
            return res.redirect('back');
        }

        return res.render('user_profile', {
            title: "Profile",
            profile_user: user
        });
    } catch (err) {
        console.log('Error in finding user', err);
        return res.redirect('back');
    }
};

// updating user details

// module.exports.update = function(req, res){
//     if(req.user.id == req.params.id){
//         User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
//             return res.redirect('back');
//         });
//     }else{
//         return res.status(401).send('Unauthorised');
//     }
// }

// in async/await
module.exports.update = async function(req, res) {
    try {
        const userId = req.params.id;
        const userData = req.body;

        // Check if the current user is the same user being updated
        if (req.user.id == userId) {
            // Find the user by ID and update the data
            let user = await User.findByIdAndUpdate(userId, userData, { new: true }).exec();
            
            // Handle the case when the user is not found
             if (!user) {
                 return res.redirect('back');
             }

            return res.redirect('back');
        } else {
            return res.status(401).send('Unauthorised');
        }
    } catch (err) {
        console.log('Error in updating user', err);
        return res.redirect('back');
    }
};

// //const User = require('../models/user');
// const fs = require('fs');
// //const path = require('path');

// module.exports.update = async function (req, res) {
//     if (req.user.id == req.params.id) {
//         try {
//             let user = await User.findById(req.params.id);

//             // Check if the user exists
//             if (!user) {
//                 return res.redirect('back');
//             }

//             // Update user fields with the values from req.body
//             user.name = req.body.name;
//             user.email = req.body.email;

//             // Handle the avatar update if a new file is uploaded
//             if (req.file) {
//                 if (user.avatar) {
//                     fs.unlinkSync(path.join(__dirname, '..', user.avatar));
//                 }
//                 user.avatar = User.avatarPath + '\\' + req.file.filename;
//             }

//             // Save the updated user
//             await user.save();

//             return res.redirect('back');
//         } catch (error) {
//             console.log('Error in updating user', error);
//             return res.redirect('back');
//         }
//     } else {
//         return res.status(401).send('Unauthorized');
//     }
// }




// render the sign up page
module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }

    return res.render('user_sign_up', {
        title: "codial | sign up"
    })
}

// render the sign in page
module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }

    return res.render('user_sign_in', {
        title: "codial | sign in"
    })
}

// get the sign up data  //by me
// module.exports.create = function(req,res){
//     // TODO later
//     if(req.body.password != req.body.confirm_password){
//         return res.redirect('back');
//     }

//     User.findOne({email: req.body.email}, function(err, user){
//         if(err){console.log('error in finding user in signing up'); return}

//         if(!user){
//             User.create(req.body, function(err, user){
//                 if(err){console.log('error in creating user while signing up'); return}

//                 return res.redirect('/users/sign-in')
//             })
//         }else{
//             return res.redirect('back');
//         }
//     });
// }

   // above code from cg

//const User = require('../models/user');

module.exports.create = async function(req, res) {
    // TODO later
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }

    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            await User.create(req.body);
            return res.redirect('/users/sign-in');
        } else {
            return res.redirect('back');
        }
    } catch (err) {
        console.log('error in finding/creating user while signing up', err);
        return res.redirect('back');
    }
};


   
// sign in and create a session for the user
module.exports.createSession = function(req,res){
    //TODO later
    req.flash('success', 'Logged in successfully');
    return res.redirect('/');
}

// module.exports.destroySession = function(req, res){
//     req.logout();
//     return res.redirect('/');
// }

// for above snippet from cg
module.exports.destroySession = function(req, res) {
    req.logout(function(err) {
        if (err) {
            console.log('Error while logging out', err);
            return res.redirect('/');
        }
        req.flash('success', 'you have logged out');
        return res.redirect('/');
    });
};
