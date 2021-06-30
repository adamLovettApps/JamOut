'use strict';
const Sequelize = require('sequelize');
const faker = require("faker");
const bcrypt = require("bcryptjs");
const fetch = require("node-fetch");

require('dotenv').config();
const key = process.env.GOOGLE_API_KEY;

const getLocationLong = async (zip) => {
  let res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?key=${key}&components=postal_code:97403`);
  let results = await res.json();
  let lng = results[0].geometry.location.lng();
  return lng;
}

const getLocationLat = async (zip) => {
  let res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?key=${key}&components=postal_code:97403`);
  let results = await res.json();
  let lat = results[0].geometry.location.lat();
  return lat;
}

const location = { type: 'Point', coordinates: [0, 0]}
// const point = ST_PointFromText('POINT(-71.064544 42.28787)',4326)
module.exports = {
  up: async (queryInterface, Sequelize) => {
    let seeds = [];
    seeds.push({
        email: 'trentreznor@nin.com',
        username: 'T-Rez',
        hashedPassword: bcrypt.hashSync('password'),
        city: "Los Angeles",
        state: "California",
        zip: 90017,
        bio: "The greatest musician of all time.",
        location:  Sequelize.fn('ST_MakePoint', 34.0559 , -118.2447 ),
        profilePhoto: "https://jamout.s3.us-west-1.amazonaws.com/trent.jpeg",
        createdAt: new Date(),
        updatedAt: new Date()
      })
    
    return queryInterface.bulkInsert('users', seeds, {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('users', {
        username: { [Op.in]: ['T-Rez'] }
    }, {});
  }
};
