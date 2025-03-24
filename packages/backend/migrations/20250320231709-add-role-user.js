'use strict';

/** @type {import('sequelize-cli').Migration} */
export const up = async (queryInterface, Sequelize) => {
  await queryInterface.addColumn('users', 'role', {
    type: Sequelize.ENUM("user", "admin", "other"),
    defaultValue: "user",
  });
};

export const down = async (queryInterface, Sequelize) => {
  // Add reverting commands here
  await queryInterface.removeColumn('users', 'role');
};
