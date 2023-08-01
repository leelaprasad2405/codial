// const Post = require('../models/post');

// module.exports.create = function(req,res){
//     Post.create({
//         content: req.body.content,
//         user: req.user._id
//     }, function(err, post){
//         if(err){console.log('error in creating a post'); return;}
//         return res.redirect('back');
//     });
// }

// from cg
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(req, res) {
  try {
    let post = await Post.create({
      content: req.body.content,
      user: req.user._id
    });
    return res.redirect('back');
  } catch (err) {
    console.log('error in creating a post:', err);
    return res.status(500).send('Internal Server Error');
  }
}

// module.exports.destroy = function(req, res){
//   Post.findById(req.params.id, function(err, post){
//     // .id means converting the object id into string
//     if(post.user == req.user.id){
//       post.remove();
//       Comment.deleteMany({post: req.params.id}, function(err){
//         return res.redirect('back');
//       });
//     }else{
//       return res.redirect('back');
//     }
//   });
// }

module.exports.destroy = async function (req, res) {
  try {
    let post = await Post.findById(req.params.id);

    if (post.user == req.user.id) {
      // await Like.deleteMany({ likeable: post._id, onMondel: 'Post' });
      // await Like.deleteMany({ _id: { $in: post.Comment } });
      await Comment.deleteMany({ post: req.params.id });

      // Instead of using req.flash, you can add a success message to the response locals
      res.locals.successMessage = 'Post and associated comments deleted';
      await post.deleteOne();

      if (req.xhr) {
        return res.status(200).json({
          data: {
            post: req.params.id,
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
