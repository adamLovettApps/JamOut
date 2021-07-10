'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'Messages', // table name
        'unreadUser1', // new field name
        {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
      ),
      queryInterface.addColumn(
        'Messages', // table name
        'unreadUser2', // new field name
        {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
      ),
      queryInterface.addColumn(
        'Conversations', // table name
        'unreadUser1', // new field name
        {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
      ),
      queryInterface.addColumn(
        'Conversations', // table name
        'unreadUser2', // new field name
        {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
      ),
      
      
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Messages', 'unreadUser1'),
      queryInterface.removeColumn('Messages', 'unreadUser2'),
      queryInterface.removeColumn('Conversations', 'unreadUser1'),
      queryInterface.removeColumn('Conversations', 'unreadUser2'),
    ]);
  }
};