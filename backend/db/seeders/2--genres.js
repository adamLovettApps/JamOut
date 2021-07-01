'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      // Add altering commands here.
      // Return a promise to correctly handle asynchronicity.

      return queryInterface.bulkInsert('Genres', [
        {
          name: "Blues",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Country",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Dance",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Electronic",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Folk",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Funk",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Gospel",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Hardcore",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Industrial",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Jazz",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Latin",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Metal",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Pop",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Punk",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "R&B",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Reggae",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Rock",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Ska",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Soul",
          createdAt: new Date(),
          updatedAt: new Date()
        }
    ], {});
    
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Genres', {
          name: { [Op.in]: ["Blues", "Country", "Dance", "Electronic", "Folk", "Funk", "Gospel",
                              "Hardcore", "Industrial", "Jazz", "Latin", "Metal", "Pop", "Punk",
                                "R&B", "Reggae", "Rock", "Ska", "Soul"] }
      }, {});
  }
};
