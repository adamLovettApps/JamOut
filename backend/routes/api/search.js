const express = require("express");
const fetch = require("node-fetch");
const Sequelize = require("sequelize");
const asyncHandler = require("express-async-handler");
const { Instrument, Genre, User } = require("../../db/models");
const key = process.env.GOOGLE_API_KEY;
const router = express.Router();

router.post('/', asyncHandler(async (req, res) => {

    let chosenInstruments = req.body.chosenInstruments[0]
    let chosenGenres = req.body.chosenGenres[0]

    const zip = req.body.zip;
    let radius = req.body.radius;
    if (radius !== 'any') {
        radius = parseInt(radius);
        radius *= 1609.34;
    } else {
        radius = 1000000000
    }
    let data = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?key=${key}&components=postal_code:${zip}`);
    let results = await data.json();
    let lng = results.results[0].geometry.location.lng;
    let lat = results.results[0].geometry.location.lat;
    let users = await User.findAll({
        attributes: {
            include: [[
                
                Sequelize.fn(
                    'ST_Distance',
                    Sequelize.col('location'),
                    Sequelize.fn('ST_MakePoint', lng, lat)
                ) ,

                'userdistance'
            
            ]]
        },

        include: [
            {
                model: Instrument,
                where: {
                    id: chosenInstruments
                }
            },
            {
                model: Genre, 
                where: {
                    id: chosenGenres
                }
            },
        ],
        where: 
            Sequelize.fn(
            'ST_DWithin',
            Sequelize.col('location'),
            Sequelize.fn('ST_MakePoint', lng, lat),
            radius
        ),
        order: Sequelize.literal('userdistance ASC')

    })

    users = users.map(User => User.dataValues)
    console.log("USERS", users, "LENGTH", users.length);
    for (i = 0; i < users.length; i++) {
        let instruments = await Instrument.findAll({
            include: [
                {
                    model: User,
                    where: {
                        id: users[i].id
                    }
                }
            ]
        });
        instruments = instruments.map(instrument => instrument.dataValues)
        users[i].Instruments = instruments;

        let genres = await Genre.findAll({
            include: [
                {
                    model: User,
                    where: {
                        id: users[i].id
                    }
                }
            ]
        });
        genres = genres.map(genre => genre.dataValues)
        users[i].Genres = genres;
        users[i].userdistance = Math.round(users[i].userdistance / 1609.34)
    }

    return res.json(users);
}));

module.exports = router;