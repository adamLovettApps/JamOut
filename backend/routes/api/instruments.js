const express = require("express");
const asyncHandler = require("express-async-handler");
const { Instrument, Userinstrument } = require("../../db/models");

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    const instruments = await Instrument.findAll({
        raw: true
    });

    return res.json(instruments);
}));

router.post('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const chosenInstruments = req.body[0];

    for (let i = 0; i < chosenInstruments.length; i++) {
        const userinstrumentBuild = Userinstrument.build({
            UserId: id,
            InstrumentId: chosenInstruments[i]
        })
        await userinstrumentBuild.save()
    }

    return res.json({});
}));



module.exports = router;