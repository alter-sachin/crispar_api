'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
          'orders', // name of Target model
          'userId', // name of the key we're adding
          {
            type: Sequelize.UUID,
            references: {
              model: 'cibo_users', // name of Source model
              key: 'id',
            },
            onDelete: 'CASCADE'
          }
        );
    
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
