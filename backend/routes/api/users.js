const express = require('express');
const { check } = require('express-validator');
const asyncHandler = require('express-async-handler');
const Sequelize = require('sequelize')
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Userinstrument, Usergenre, Instrument, Genre, Song, Conversation, Message, Like } = require('../../db/models');
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

router.get('/:id', asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);
  const user = await User.findByPk(id, {
      include: [
          {
            model: Instrument,
          },
          {
                model: Genre
              },
          {
            model: Song
          }
        ],
      
    });

    res.json(user);
  })
);

router.put('/updateUser', asyncHandler(async(req, res) => {
  let {id, city, state, zip, bio, chosenInstruments, chosenGenres} = req.body;
  let data = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?key=${key}&components=postal_code:${zip}`);
  let results = await data.json();
  let lng = results.results[0].geometry.location.lng;
  let lat = results.results[0].geometry.location.lat;
  if (Array.isArray(chosenInstruments[0])) {
    chosenInstruments = chosenInstruments[0]
  };
  if (Array.isArray(chosenGenres[0])) {
    chosenGenres = chosenGenres[0]
  };

  await User.update(
    {
      city: city,
      state: state,
      zip: zip,
      bio: bio,
      lng: lng,
      lat: lat
    },
    {
      where: {
        id: id
      }
    }
  )
  await Userinstrument.destroy({
    where: {
      UserId: id
    }
  });

  await Usergenre.destroy({
    where: {
      UserId: id
    }
  });

  for (let i = 0; i < chosenInstruments.length; i++) {
        const userinstrumentBuild = Userinstrument.build({
            UserId: id,
            InstrumentId: parseInt(chosenInstruments[i])
        })
        await userinstrumentBuild.save()
    }

    for (let i = 0; i < chosenGenres.length; i++) {
        const userGenreBuild = Usergenre.build({
            UserId: id,
            GenreId: parseInt(chosenGenres[i])
        })
        await userGenreBuild.save()
    }

    const user = await User.findByPk(id, {
      include: [
          {
            model: Instrument,
          },
          {
                model: Genre
              },
          {
            model: Song
          }
        ],
      
    });



  // user.city = city;
  // user.state = state;
  // user.zip = zip;
  // user.bio = bio;
  // user.lng = lng;
  // user.lat = lat;
  // await user.save();

  res.send(user);
}));

router.delete('/:id', asyncHandler(async(req, res) => {
    const id = parseInt(req.params.id);
    await Userinstrument.destroy({
      where: {
        UserId: id
      }
    });

    await Usergenre.destroy({
      where: {
        UserId: id
      }
    });

    await Song.destroy({
      where: {
        UserId: id
      }
    });

    await Message.destroy({
      where: {
        UserIdTo: id
      }
    });

    await Message.destroy({
      where: {
        UserIdFrom: id
      }
    });

    await Conversation.destroy({
      where: {
        UserId: id
      }
    });

    await Conversation.destroy({
      where: {
        UserId2: id
      }
    });


    await User.destroy({
      where: {
        id: id
      }
    });

    res.send();
}));

router.get('/getFavorites/:userId', asyncHandler(async (req, res) => {
  const id = parseInt(req.params.userId);
  const likes = await Like.findAll(
    {
      where: {
        UserId: id
      },

    }
  )

  for (let i = 0; i < likes.length; i++) {
    const userInformation = await User.findByPk(likes[i].UserId2,
        {
          include: [
            {
              model: Instrument
            },
            {
              model: Genre
            }
          ]
        }
      );
    likes[i].dataValues = {
      ...likes[i].dataValues,
      userInformation: userInformation
    }
  }

  res.send(likes);
}));

router.post('/setFavorite/:userId/:userId2/:statusCode', asyncHandler(async (req, res) => {
  const userId = parseInt(req.params.userId);
  const userId2 = parseInt(req.params.userId2);
  const statusCode = parseInt(req.params.statusCode);

  if (statusCode === 1) {
    let like = Like.create({
      UserId: userId,
      UserId2: userId2,
      createdAt: new Date(),
      updatedAt: new Date()
    })

  } else {
    await Like.destroy({
    where: {
      UserId: userId,
      UserId2: userId2
    }
  });
  }
  
  const likes = await Like.findAll(
    {
      where: {
        UserId: userId
      }
    }
  )

  for (let i = 0; i < likes.length; i++) {
    const userInformation = await User.findByPk(likes[i].UserId2,
        {
          include: [
            {
              model: Instrument
            },
            {
              model: Genre
            }
          ]
        });
    likes[i].dataValues = {
      ...likes[i].dataValues,
      userInformation: userInformation
    }
  }

  res.send(likes);
}));

module.exports = router;
