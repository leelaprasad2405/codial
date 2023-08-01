const Post = require('../models/post');
module.exports.home = function(req, res){
    // //return res.end('<h1>express is up for codial!</h1>');
    // console.log(req.cookies);  // here we are requesting the cookie from server where we had created a cookie as example in browser (user_id 11) (can be viewed on terminal)
    // res.cookie('user_id', 25);  // here we will get as the response on browser (can be viewed on browser)
    // Post.find({}, function(err, posts){
    //     return res.render('home', {
    //         title: "Codial | Home"
    //         posts: posts
    //     });
    
    // });

    // to populate the user of each post (small changes from above snip)
    // Post.find({}).populate('user').exec(function(err, posts){
    //     return res.render('home', {
    //         title: "Codial | Home",
    //         posts: posts
    //     });


    // });


   // from cg for above
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec()
    .then(posts => {
        return res.render('home', {
            title: "Codial | Home",
            posts: posts
        });
    })
    .catch(err => {
        console.log('Error:', err);
        return res.status(500).send('Internal Server Error');
    });




    // return res.render('home', {
    //     title: "Home"
    // });
}

//module.exports.actionName = function(req, res){}



// cookies values (tokens) are generally encrypted in real cases just for our understanding we had done created a understandable token
