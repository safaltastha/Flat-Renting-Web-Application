'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('properties', 'photoUrls', {
      type: Sequelize.JSON,
      allowNull: true,
      defaultValue: [],
    });

    await queryInterface.addColumn('properties', 'videoUrls', {
      type: Sequelize.JSON,
      allowNull: true,
      defaultValue: [],
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('properties', 'photoUrls');
    await queryInterface.removeColumn('properties', 'videoUrls');
  }
};
