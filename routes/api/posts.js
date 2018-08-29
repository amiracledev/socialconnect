const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Post Model
const Post = require("../../models/Post");
//Profile Model
const Profile = require("../../models/Profile");

//Validation
const validatePostInput = require("../../validation/post");

//@routes   GET api/posts/test
//@desc     Tests post route
//@access   Public
router.get("/test", (req, res) => res.json({ msg: "Posts Works" }));

//@routes   GET api/posts
//@desc    Get post
//@access   Public

router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostsfound: "No posts found" }));
});

//@routes   GET api/posts/:id
//@desc    Get post by id
//@access   Public

router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({ nopostfound: "No post found with that ID" })
    );
});

//@routes   POST api/posts
//@desc     Create post
//@access   Private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    //validating
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });
    newPost.save().then(post => res.json(post));
  }
);

//@routes   Delete api/posts/:id
//@desc     Delete Post
//@access   Private

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          //Check for post owner
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized to delete" });
          }

          //Delete
          post.remove().then(() => res.json({ success: true }));
        })
        .catch(err =>
          res.status(404).json({
            postnotfound: "No post found"
          })
        );
    });
  }
);

//@routes   Delete api/posts/like/:id
//@desc     Like Post
//@access   Private

router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.fliter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyliked: "User already liked this post" });
          }
          //Add user id to likes array
          post.like.unshift({ user: req.user.id });
          post.save().then(post => res.json(post));
        })
        .catch(err =>
          res.status(404).json({
            postnotfound: "No post found"
          })
        );
    });
  }
);

//@routes   Delete api/posts/unlike/:id
//@desc     Unlike Post
//@access   Private

router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.fliter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ unliked: " You have not liked this post" });
          }
          //Get removed index
        const removedIndex = post.likes
        .map(item => item.user.toString())
        .indeOf(req.user.id)

        //Splice the array
        post.likes.splice(remove, 1);

        post.save().then(post => res.json(post))
        })
        .catch(err =>
          res.status(404).json({
            postnotfound: "No post found"
          })
        );
    });
  }
);

//@routes   POST api/posts/comment/:id
//@desc     Add Comment Post
//@access   Private

router.post('/comment/:id', passport.authenticate('jwt', {session: false}), (req, res) => {

  const { errors, isValid } = validatePostInput(req.body);

  //validating
  if (!isValid) {
    return res.status(400).json(errors);
  }

Post.findById(req.params.id)
.then((post) => {
  const newComment = {
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.avatar,
    user: req.user.id
  }

  //Add comments to array
  post.comments.unshift(newComment)

  //save

  post.save().then((posts) => res.json(post))
})
.catch((err) => res.status(404).json({postnotfound: "No post found"}))

})

//@routes   DELETE api/posts/comment/:id/:comment_id
//@desc     Remove comment from post
//@access   Private

router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', {session: false}), (req, res) => {

Post.findById(req.params.id)
.then((post) => {
//validate comment
if (post.comment.filter(comment => comment._id .toString() === req.params.comment_id).length === 0) {
return res.status(404).json({ commentnotexists: 'Comment does not exist'})
}
//Get remove remove index
const removeIndex = post.comments
.map(item => item._id.toString())
.indeOf(req.params.comment_id)

// splice comment out of array
post.comments.splice(removeIndex, 1)

//save it
post.save().then(post => res.json(post))
})
.catch((err) => res.status(404).json({postnotfound: "No post found"}))

})

module.exports = router;
