'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Instruments', [
        {
          instrument: "Acoustic Guitar",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          instrument: "Banjo",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          instrument: "Bass",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          instrument: "Cello",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          instrument: "Clarinet",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          instrument: "Classical Guitar",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          instrument: "Double Bass",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          instrument: "Drums",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          instrument: "Electric Bass",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          instrument: "Electric Guitar",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          instrument: "Flute",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          instrument: "Harmonica",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          instrument: "Harp",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          instrument: "Hurdy Gurdy",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          instrument: "Keyboard",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          instrument: "Mandolin",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          instrument: "Piano",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          instrument: "Saxophone",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          instrument: "Synthesizer",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          instrument: "Theramin",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          instrument: "Trombone",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          instrument: "Trumpet",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          instrument: "Ukulele",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          instrument: "Violin",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          instrument: "Vocals",
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
        instrument: { [Op.in]: ['Acoustic Guitar', 'Banjo', 'Bass', 'Cello', 'Clarinet',
                              "Classical Guitar", "Double Bass", "Drums", "Electric Bass", "Electric Guitar", "Flute",
                              "Harmonica", "Harp", "Hurdy Gurdy", "Keyboard", "Mandolin", "Piano",
                              "Saxophone", "Synthesizer", "Theramin", "Trombone", "Trumpet", "Ukulele",
                              "Violin", "Vocals"] }
    }, {});
  }
};
