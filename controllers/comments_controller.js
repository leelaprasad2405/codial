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


// module.exports.destroy = function(req, res){
//   Comment.findById(req.params.id, function(err, comment){
//     if(comment.user == req.user.id){
//       let postId = comment.post;
//       comment.remove();
//       Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}},function(err, post){
//         return res.redirect('back');
//       })
//     }else{
//       return res.redirect('back');
//     }
//   });
// }


module.exports.destroy = async function (req, res) {
  try {
    let comment = await Comment.findById(req.params.id);

    if (comment.user == req.user.id) {
      // await Like.deleteMany({ likeable: post._id, onMondel: 'Post' });
      // await Like.deleteMany({ _id: { $in: post.Comment } });
      await Comment.deleteMany({ post: req.params.id });

      // Instead of using req.flash, you can add a success message to the response locals
      res.locals.successMessage = 'Post and associated comments deleted';
      await comment.deleteOne();

      if (req.xhr) {
        return res.status(200).json({
          data: {
            comment: req.params.id,
          },
          message: 'Post deleted',
        });
      }
      return res.redirect('back');
    } else {
      return res.redirect('back');
    }
  } catch (err) {
    console.error(err);

    // Instead of using req.flash, you can add an error message to the response locals
    res.locals.errorMessage = 'Error deleting the post';

    return res.redirect('back');
  }
};
