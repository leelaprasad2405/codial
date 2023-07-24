const User = require('../models/user')

module.exports.profile = function(req, res){
    //res.end('<h1>User Profile!!!!</h1>');  // for home
    return res.render('user_profile',{
        title: "User Profile"
    });
}

// render the sign up page
module.exports.signUp = function(req, res){
    return res.render('user_sign_up', {
        title: "codial | sign up"
    })
}

// render the sign in page
module.exports.signIn = function(req, res){
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
}