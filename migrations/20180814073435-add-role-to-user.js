'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   queryInterface.addColumn('cibo_users','role',{
      type : Sequelize.ENUM,
      defaultValue  :"user",
      values: ['user', 'admin']
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
