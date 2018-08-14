'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
     queryInterface.addColumn('cibo_users','name',{
      type : Sequelize.STRING,
      allowNull:true
    })
    queryInterface.addColumn('cibo_users','email',{
      type : Sequelize.STRING,
      allowNull:true
    })
    queryInterface.addColumn('cibo_users','facebookId',{
      type : Sequelize.STRING,
      allowNull:true
    })
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
