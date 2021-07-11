const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { environment } = require('./config');
const { ValidationError } = require('sequelize');
const { port } = require('./config');
const {Conversation, Message} = require("./db/models")
const routes = require('./routes');
const isProduction = environment === 'production';

const http = require('http').createServer(app);
const io = require('socket.io')(http)

app.use(morgan('dev'));

app.use(cookieParser());
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(express.json({limit: '50mb'}));

// Security Middleware
if (!isProduction) {
  // enable cors only in development
  app.use(cors());
}
// helmet helps set a variety of headers to better secure your app
app.use(
  helmet({
    contentSecurityPolicy: false
  })
);

// Set the _csrf token and create req.csrfToken method
app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && 'Lax',
      httpOnly: true
    }
  })
);

app.use(routes); // Connect all the routes

// Catch unhandled requests and forward to error handler.
app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = 'Resource Not Found';
  err.errors = ["The requested resource couldn't be found."];
  err.status = 404;
  next(err);
});

// Process sequelize errors
app.use((err, _req, _res, next) => {
  // check if error is a Sequelize error:
  if (err instanceof ValidationError) {
    err.errors = err.errors.map((e) => e.message);
    err.title = 'Validation error';
  }
  next(err);
});

// Error formatter
app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    title: err.title || 'Server Error',
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack
  });
});

io.on('connection', async(socket) => {
  socket.on('join', async (conversationId) => {
      const conversation = await Conversation.findByPk(conversationId);
      socket.join(conversation.id, async () => {
      });
  });

  socket.on('new', async(conversationId) => {
    socket.on(conversationId, async({message, id, username}) => {
      let conversation = await Conversation.findByPk(conversationId);
      const toUser = conversation.dataValues.UserId === id ? conversation.dataValues.UserId2 : conversation.dataValues.UserId;
      let new1 = conversation.dataValues.UserId1 === toUser;
      let new2 = conversation.dataValues.UserId2 === toUser;
      conversation.newCoversationUser1  = new1;
      conversation.newCoversationUser2  = new2;
      const newMessage = await Message.create({
        ConversationId : conversation.dataValues.id,
        UserIdTo: toUser,
        UserIdFrom: id,
        text: message,
        fromUsername: username,
        unreadUser1: new1,
        unreadUser2: new2,
        createdAt: new Date(),
        updatedAt: new Date(),

      });
      if (conversation.dataValues.UserId === newMessage.UserIdTo) {
        const updated = await Conversation.update({
            unreadUser1: true,
            unreadUser2: false
          },
          {
            where: {
              id: conversationId
            }
        })
        
      } else {
        const updated = await Conversation.update({
            unreadUser1: false,
            unreadUser2: true
          },
          {
            where: {
              id: conversationId
            }
        })
      }
      await newMessage.save();
      await conversation.save();
      socket.to(conversationId).emit(conversationId, newMessage);
      socket.emit(conversationId, newMessage);
    })
  });

  socket.on('acceptincoming', async(conversationId) => {
    const updated = await Conversation.update({
        newConversationUser1: false,
        newConversationUser2: false
      },
      {
        where: {
          id: conversationId
        }
      })
    socket.on(conversationId, async({message, id, username}) => {
      let conversation = await Conversation.findByPk(conversationId);
      const toUser = conversation.dataValues.UserId === id ? conversation.dataValues.UserId2 : conversation.dataValues.UserId;
      let new1 = conversation.dataValues.UserId1 === toUser;
      let new2 = conversation.dataValues.UserId2 === toUser;
      conversation.update({
        newConversationUser1: false,
        newConversationUser2: false
      })
      await conversation.save();
      // conversation.newCoversationUser2  = false;
      const newMessage = await Message.create({
        ConversationId : conversation.dataValues.id,
        UserIdTo: toUser,
        UserIdFrom: id,
        text: message,
        fromUsername: username,
        unreadUser1: new1,
        unreadUser2: new2,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      if (conversation.dataValues.UserId === newMessage.UserIdTo) {
        const updated = await Conversation.update({
            unreadUser1: true,
            unreadUser2: false
          },
          {
            where: {
              id: conversationId
            }
        })
        
      } else {
        const updated = await Conversation.update({
            unreadUser1: false,
            unreadUser2: true
          },
          {
            where: {
              id: conversationId
            }
        })
      }
      await newMessage.save();
      await conversation.save();
      await Conversation.update({
        newConversationUser1: false,
        newConversationUser2: false
      },
      {
        where: {
          id: conversationId
        }
      })
      socket.to(conversationId).emit(conversationId, newMessage);
      socket.emit(conversationId, newMessage);
    })
  });

  const conversations = await Conversation.findAll();
  for (let i = 0; i < conversations.length; i++) {
    const updated = await Conversation.update({
        newConversationUser1: false,
        newConversationUser2: false
      },
      {
        where: {
          id: conversations[i].id
        }
      })

      conversations[i].newConversationUser1  = false;
      conversations[i].newConversationUser2  = false;
      await conversations[i].save();
    socket.on(conversations[i].id, async({message, id, username}) => {
      // const updated = await Conversation.update({
      //   newConversationUser1: false,
      //   newConversationUser2: false
      // },
      // {
      //   where: {
      //     id: conversations[i].id
      //   }
      // })
      let conversation = await Conversation.findByPk(conversations[i].id);
      const toUser = conversation.dataValues.UserId === id ? conversation.dataValues.UserId2 : conversation.dataValues.UserId;
      let new1 = conversation.dataValues.UserId1 === toUser;
      let new2 = conversation.dataValues.UserId2 === toUser;
      const newMessage = await Message.create({
        ConversationId : conversation.dataValues.id,
        UserIdTo: toUser,
        UserIdFrom: id,
        text: message,
        fromUsername: username,
        unreadUser1: new1,
        unreadUser2: new2,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      if (conversation.dataValues.UserId === newMessage.UserIdTo) {
        const updated = await Conversation.update({
            unreadUser1: true,
            unreadUser2: false
          },
          {
            where: {
              id: conversations[i].id
            }
        })
        
      } else {
        const updated = await Conversation.update({
            unreadUser1: false,
            unreadUser2: true
          },
          {
            where: {
              id: conversations[i].id
            }
        })
      }
      
      await newMessage.save();
      await conversation.save();
      socket.to(conversations[i].id).emit(conversations[i].id, newMessage);
      socket.emit(conversations[i].id, newMessage);
    })
  }
});




module.exports = {app, http, io };
