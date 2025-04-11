'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      username: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      birthdate: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      balance: {
        type: Sequelize.STRING(100),
        allowNull: false,
        defaultValue: '0',
      },
      created_at: {
        type: Sequelize.DATE(3),
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};
