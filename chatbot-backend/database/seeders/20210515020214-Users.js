'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('Users', [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'jonh.doe@gmail.com',
        password: bcrypt.hashSync('password', 10),
        gender: 'male'
      },
      {
        firstName: 'Frodo',
        lastName: 'Baggins',
        email: 'frodo.baggins@lotr.com',
        password: bcrypt.hashSync('password', 10),
        gender: 'male'
      },
      {
        firstName: 'Samwise',
        lastName: 'Gamgee',
        email: 'samwise.gamgee@lotr.com',
        password: bcrypt.hashSync('password', 10),
        gender: 'male'
      },
      {
        firstName: 'Galadriel',
        lastName: 'Noldor',
        email: 'galadriel.noldor@elphic.com',
        password: bcrypt.hashSync('password', 10),
        gender: 'female'
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Users', null, {});
  }
};
