'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Instruments', [
        {
          name: "Acoustic Guitar",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Banjo",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Bass",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Cello",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Clarinet",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Classical Guitar",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Double Bass",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Drums",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Electric Bass",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Electric Guitar",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Flute",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Harmonica",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Harp",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Hurdy Gurdy",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Keyboard",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Mandolin",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Piano",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Saxophone",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Synthesizer",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Theramin",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Trombone",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Trumpet",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Ukulele",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Violin",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Vocals",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        
          
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
  return queryInterface.bulkDelete('Instruments', {
            name: { [Op.in]: ['Acoustic Guitar', 'Banjo', 'Bass', 'Cello', 'Clarinet',
                              "Classical Guitar", "Double Bass", "Drums", "Electric Bass", "Electric Guitar", "Flute",
                              "Harmonica", "Harp", "Hurdy Gurdy", "Keyboard", "Mandolin", "Piano",
                              "Saxophone", "Synthesizer", "Theramin", "Trombone", "Trumpet", "Ukulele",
                              "Violin", "Vocals"] }
    }, {});
  }
};
