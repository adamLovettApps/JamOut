const express = require("express");
const asyncHandler = require("express-async-handler");
const { Op } = require('sequelize');
const { Conversation, User, Message } = require("../../db/models");
const conversation = require("../../db/models/conversation");

const router = express.Router();

router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    let conversations = await Conversation.findAll({
        where: {
            [Op.or]: [
                {UserId: id},
                {UserId2: id}
            ]
        },
        raw: true
    
    });

    for (let i = 0; i < conversations.length; i++) {
        let user1 = await User.findByPk(conversations[i].UserId, {
            raw: true
        });
        let user2 = await User.findByPk(conversations[i].UserId2, {
            raw: true
        });
        conversations[i]["user1"] = user1;
        conversations[i]["user2"] = user2;
    }

    return res.json(conversations);
}));

router.get('/messages/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    let conversation = await Conversation.findByPk(id, {
        include: [
            {
                model: Message, 
                include: {
                    model: User, as: "from"
                }
            }
        ]
    })

    let from = await User.findByPk(conversation.UserIdFrom, {
        raw: true
    });

    // for (let i = 0; i < conversation.Messages.length; i++) {
    //     console.log(conversation.dataValues.Messages[i].UserIdFrom, "FROM ID")
    //     let from = await User.findByPk(conversation.dataValues.Messages[i].UserIdFrom, {
    //         raw: true
    //     });
    //     console.log(from, "from");
    //     conversation.dataValues.Messages[i]["from"] = from;
    //     //  console.log(conversation.dataValues.Messages[i]);
    // }



    return res.json(conversation);
}));

module.exports = router;
