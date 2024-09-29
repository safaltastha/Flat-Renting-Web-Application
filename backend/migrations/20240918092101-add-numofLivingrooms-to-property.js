'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Properties', 'numofLivingrooms', {
      type: Sequelize.INTEGER, // Adjust the type if necessary
      allowNull: true, // Set to false if you want this column to be required
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Properties', 'numofLivingrooms');
  }
};
