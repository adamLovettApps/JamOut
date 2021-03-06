const express = require("express");
const asyncHandler = require("express-async-handler");
const { Genre, Usergenre } = require("../../db/models");

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    const genres = await Genre.findAll({
        raw: true
    });

    return res.json(genres);
}));

router.post('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const chosenGenres = req.body[0];

    for (let i = 0; i < chosenGenres.length; i++) {
        const userGenreBuild = Usergenre.build({
            UserId: id,
            GenreId: chosenGenres[i]
        })
        await userGenreBuild.save()
    }

    return res.json({});
}));


module.exports = router;