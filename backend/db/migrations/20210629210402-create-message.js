'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      conversationId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'conversations', key: 'id' }
      },
      userIdTo: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' }
      },
      userIdFrom: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' }
      },
      message: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('messages');
  }
};