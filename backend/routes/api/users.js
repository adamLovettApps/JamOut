const express = require('express');
const { check } = require('express-validator');
const asyncHandler = require('express-async-handler');
const Sequelize = require('sequelize')
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Userinstrument, Usergenre } = require('../../db/models');
const { singleMulterUpload, singlePublicFileUpload } = require('../../awsS3')
const fetch = require("node-fetch");
const router = express.Router();
require('dotenv').config();
const key = process.env.GOOGLE_API_KEY;

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username').not().isEmail().withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

// Sign up
router.post(
  '/',
  singleMulterUpload("image"),
  validateSignup,
  asyncHandler(async (req, res) => {
    const { email, password, username, city, state, bio, zip } = req.body;
    const profilephoto = await singlePublicFileUpload(req.file);
    let data = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?key=${key}&components=postal_code:${zip}`);

    let results = await data.json();
    let lng = results.results[0].geometry.location.lng;
    let lat = results.results[0].geometry.location.lat;
    const user = await User.signup({ email, username, password, profilephoto, city, bio, state, zip, lng, lat });
    
    await setTokenCookie(res, user);

    return res.json({
      user
    });
  })
);

module.exports = router;
