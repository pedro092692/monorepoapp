'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('secrets', 'title', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'secrete title',
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('secrets', 'title');
  }
};
