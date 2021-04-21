'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      email: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      picture: {
        type: Sequelize.STRING
      },
      password_hash: {
        type: Sequelize.STRING
      },
      created_at: {
        type: Sequelize.DATE
      },
      updated_at: {
        type: Sequelize.DATE
      }
    })
    await queryInterface.createTable('social_networks', {
      id: {
        type: Sequelize.STRING
      },
      user_id: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE
      },
      updated_at: {
        type: Sequelize.DATE
      }
    })
    await queryInterface.sequelize.query('CREATE UNIQUE INDEX CONCURRENTLY users_email_unique_index ON users(email);')
    await queryInterface.sequelize.query('CREATE TYPE user_roles AS ENUM (\'user\', \'admin\');')
    await queryInterface.sequelize.query('ALTER TABLE users ADD COLUMN role user_roles not null default \'user\';')

    await queryInterface.sequelize.query('CREATE TYPE social_network_type AS ENUM (\'fb\', \'google\');')
    await queryInterface.sequelize.query('ALTER TABLE social_networks ADD COLUMN type social_network_type;')
    await queryInterface.sequelize.query('ALTER TABLE social_networks ADD PRIMARY KEY (id, type);')
    await queryInterface.sequelize.query('CREATE UNIQUE INDEX CONCURRENTLY social_networks_user_id_index ON social_networks(user_id);')
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('social_networks')
    await queryInterface.dropTable('users')
    await queryInterface.sequelize.query('DROP TYPE social_network_type;')
    await queryInterface.sequelize.query('DROP TYPE user_roles;')
  }
}
