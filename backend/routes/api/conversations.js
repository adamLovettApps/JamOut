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



    return res.json(conversation);
}));

router.get('/:UserId/:UserId2', asyncHandler(async (req, res) => {
    const UserId = parseInt(req.params.UserId);
    const UserId2 = parseInt(req.params.UserId2);
    let newConvo = false;
    let conversation = await Conversation.findOne({
        where: {
            [Op.or]: [
                {
                    [Op.and] : [
                        {
                            UserId: UserId
                        },
                        {
                            UserId2: UserId2
                        }
                    ]
                },
                {
                    [Op.and] : [
                        {
                            UserId: UserId2
                        },
                        {
                            UserId2: UserId
                        }
                    ]
                }
            
                
            ]
        }
    })
    if (conversation === null) {
        conversation = await Conversation.create({
            UserId: UserId,
            UserId2: UserId2,
            unreadUser1: false,
            unreadUser2: false,
            newConversationUser1: false,
            newConversationUser2: true,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        newConvo = true;
    }

    return res.json({id: conversation.id, newConvo});
}));

module.exports = router;
