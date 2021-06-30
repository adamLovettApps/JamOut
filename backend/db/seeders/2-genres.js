'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      // Add altering commands here.
      // Return a promise to correctly handle asynchronicity.

      return queryInterface.bulkInsert('genres', [
        {
          genre: "Blues",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          genre: "Country",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          genre: "Dance",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          genre: "Electronic",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          genre: "Folk",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          genre: "Funk",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          genre: "Gospel",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          genre: "Harcore",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          genre: "Industrial",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          genre: "Jazz",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          genre: "Latin",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          genre: "Metal",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          genre: "Pop",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          genre: "Punk",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          genre: "R&B",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          genre: "Reggae",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          genre: "Rock",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          genre: "Ska",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          genre: "Soul",
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
    return queryInterface.bulkDelete('genres', {
          genre: { [Op.in]: ["Blues", "Country", "Dance", "Electronic", "Folk", "Funk", "Gospel",
                              "Hardcore", "Industrial", "Jazz", "Latin", "Metal", "Pop", "Punk",
                                "R&B", "Reggae", "Rock", "Ska", "Soul"] }
      }, {});
  }
};
