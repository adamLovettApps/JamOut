const express = require('express');
const { check } = require('express-validator');
const asyncHandler = require('express-async-handler');
const Sequelize = require('sequelize')
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Userinstrument, Usergenre, Instrument, Genre, Song } = require('../../db/models');
const { singleMulterUpload, singlePublicFileUpload } = require('../../awsS3')
const fetch = require("node-fetch");
const router = express.Router();
require('dotenv').config();
const key = process.env.GOOGLE_API_KEY;

router.post(
    '/',
    singleMulterUpload("song"),
    asyncHandler(async (req, res) => {
        console.log(req.file);
        console.log("BODY", req.body);
        const id = parseInt(req.body.id);
        const title = req.body.title;
        const url = await singlePublicFileUpload(req.file);
        const song = await Song.create({
            UserId: id,
            title: title,
            url: url
        }

        )
        console.log("SONG!!!!", song)
        return res.json({
            song
        });
    })
);

router.delete('/:userId/:id', asyncHandler(async (req, res) => {

    const {userId, id} = req.params;

    await Song.destroy({
        where: {
            id: parseInt(id)
        }
    })

    const user = await User.findByPk(parseInt(userId), {
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

        res.send(user);
}));

module.exports = router;