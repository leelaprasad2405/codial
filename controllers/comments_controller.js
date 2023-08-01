const Comment = require('../models/comment');
const Post = require('../models/post');

// const Comment = require('../models/comment');
// const Post = require('../models/post');

module.exports.create = async function (req, res) {
  try {
    const post = await Post.findById(req.body.post);
    if (post) {
      const comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      });

      post.comments.push(comment);
      await post.save();

      res.redirect('/');
    }
  } catch (err) {
    console.log('Error occurred:', err);
    // Handle the error appropriately, e.g., send an error response to the client.
    res.status(500).send('Internal Server Error');
  }
}


// module.exports.create = function(req,res){
//     Post.findById(req.body.post, function(err, post){
//         if(post){
//             Comment.create({
//                 content: req.body.content,
//                 post: req.body.post,
//                 user: req.user._id
//             }, function(err, comment){
//                 // handle error
//                 if(err){
//                     console.log('error occured');
//                 }
//                 post.comments.push(comment);
//                 post.save();

//                 res.redirect('/');
//             });
//         }
//     });
// }

