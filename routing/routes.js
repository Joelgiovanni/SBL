const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
var jwt = require('jsonwebtoken');
const keys = require('../config/Keys');
const saltRounds = 12;
const mongoose = require('mongoose');

var ObjectId = mongoose.Types.ObjectId;

const registerDate = require('../helpers/DateStamp');

const User = require('../models/User');
const Post = require('../models/Post');
const Admin = require('../models/Admin');

//Validation for the login / register routes
const registerValidation = require('../validation/register');
const validateLogin = require('../validation/login');

// @route   POST
// @desc    Register a new user
// @access  Public
// URL: http://localhost:5000/auth/register
router.post('/register', (req, res) => {
  const { errors, isValid } = registerValidation(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  const name = req.body.name;
  const email = req.body.email;

  // Check to see if the email is registered yet
  User.findOne({ email }).then((user) => {
    if (user) {
      // If the user exists, send error message
      return res.status(400).json({
        email: 'Oops, That email is already registered with us!',
      });
    } else {
      bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: hash,
          memberSince: registerDate,
          membershipType: 'Expired',
          isAdmin: false,
        });
        newUser
          .save()
          .then(() =>
            res.json({
              success: true,
              message: `Welcome ${name}. Your new account has been created!`,
            })
          )
          .catch((err) => console.log(err));
      });
    }
  });
});

// @route   POST
// @desc    Register a new Amin
// @access  Public
// URL: http://localhost:5000/auth/admin1997stayaway
router.post('/admin1997stayaway', (req, res) => {
  const { errors, isValid } = registerValidation(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  const name = req.body.name;
  const email = req.body.email;

  // Check to see if the email is registered yet
  User.findOne({ email }).then((user) => {
    if (user) {
      // If the user exists, send error message
      return res.status(400).json({
        email: 'Oops, That email is already registered with us!',
      });
    } else {
      bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: hash,
          memberSince: registerDate,
          membershipType: 'Forever',
          isAdmin: true,
        });
        newUser
          .save()
          .then(() =>
            res.json({
              success: true,
              message: `Welcome ${name}. Your new account has been created!`,
            })
          )
          .catch((err) => console.log(err));
      });
    }
  });
});

// @route   POST
// @desc    Login user and set the JWT
// @access  Public
// URL: http://localhost:5000/auth/login
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLogin(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { email, password } = req.body;

  // Check to see if the user is registered
  User.findOne({ email }).then((user) => {
    if (!user) {
      return res
        .status(400)
        .json({ email: 'That email is not registered with us! ' });
    }

    // If user is found: Check that passwords match
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // The user has been matched
        // The following payload will contain whatever user data that we may want to send with the token
        const payload = {
          id: user.id,
          name: user.name,
          email: user.email,
          memberSince: user.memberSince,
          isAdmin: user.isAdmin,
          membershipType: user.membershipType,
        };

        // Sign token and send it
        jwt.sign(
          payload,
          keys.secretTokenKey,
          { expiresIn: 3600 }, // 1 hour expiration time. 3600 Seconds === 1 hour.
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token,
            });
          }
        );
      } else {
        return res.status(400).json({ password: 'Password is incorrect' });
      }
    });
  });
});

// @route   GET
// @desc    Use Token to retrieve current User
// @access  Private
// URL: http://localhost:5000/auth/current
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      memberSince: req.user.memberSince,
    });
  }
);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// Code below is for adding | viewing | deleting posts /////////////////////////////////////////

// @route   POST
// @desc    Create a new post
// @access  Private
// URL: http://localhost:5000/auth/newpost
router.post('/newPost', (req, res) => {
  const name = req.body.author;

  //Check to see if the Author aka User exists
  User.findOne({ name })
    .then((user) => {
      if (user) {
        const newPost = new Post({
          league: req.body.league,
          gameTitle: req.body.gameTitle,
          body: req.body.body,
          date: registerDate,
        });
        newPost.save().then(
          res.json({
            success: true,
            message: 'You have added a new post!',
          })
        );
      } else {
        // If the user does not exist , send error message
        return res.status(400).json({
          email: 'Oops, That user does not exist!',
        });
      }
    })
    .catch((err) => console.log(err));
});

// @route   GET
// @desc    Use user's name to fetch all posts by that user
// @access  Private
// URL: http://localhost:5000/auth/loadUserPosts
router.get('/loadPicks', (req, res) => {
  Post.find()
    .then((posts) => {
      // If the users posts are less than or equal to zero. the 'error' message will appear
      if (posts.length <= 0) {
        res.json({
          message: 'There is no posts yet!',
        });
      } else {
        res.json(posts);
      }
    })
    .catch((err) => console.log(err));
});

// @route   GET
// @desc    Use all users
// @access  Private
// URL: http://localhost:5000/auth/loadAllUsers
router.get('/loadAllUsers', (req, res) => {
  User.find({ isAdmin: 'false' })
    .then((users) => {
      // If the users posts are less than or equal to zero. the 'error' message will appear
      if (users.length <= 0) {
        res.json({
          message: 'There is no users yet!',
        });
      } else {
        res.json(users);
      }
    })
    .catch((err) => console.log(err));
});

// @route   DELETE
// @desc    Delete a individual post
// @access  Private
// URL: http://localhost:5000/auth/loadUserPosts
router.delete('/deletePost', (req, res) => {
  const id = req.query.id;

  Post.findByIdAndDelete(ObjectId(req.query.id))
    .then((post) => {
      if (post) {
        res.json({
          success: true,
          postDeleted: `${post.title}`,
          postAuthor: `${post.author}`,
        });
      } else {
        res.json({
          success: false,
          message: 'Unable to find that post',
        });
      }
    })
    .catch((err) => console.log(err));
});

// @route   POST
// @desc    Update a individual post
// @access  Private
// URL: http://localhost:5000/auth/updatePost
router.post('/updatePost', (req, res) => {
  const { id } = req.body;

  Post.findByIdAndUpdate(
    id,
    { $set: { body: req.body.newBody } },
    { new: true, useFindAndModify: false }
  )
    .then((updatedPost) => {
      if (updatedPost) {
        res.json(updatedPost);
      } else {
        res.json({ success: false });
      }
    })
    .catch((err) => console.log(err));
});

// @route   POST
// @desc    Update a subscription
// @access  Private
// URL: http://localhost:5000/auth/updateSub
router.post('/updateSub', (req, res) => {
  const { id } = req.body;

  User.findByIdAndUpdate(
    id,
    { $set: { membershipType: req.body.membershipType } },
    { new: true, useFindAndModify: false }
  )
    .then((updatedSub) => {
      if (updatedSub) {
        res.json(updatedSub);
      } else {
        res.json({ success: false });
      }
    })
    .catch((err) => console.log(err));
});

module.exports = router;
