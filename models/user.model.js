'use strict';

module.exports = function(sequelize , DataTypes){

	const User = sequelize.define('user', {

		id : {
			type : DataTypes.UUID,
			primaryKey : true
		},
		username : {
			type: DataTypes.STRING,
			allowNull : false
		},
		password : {
			type : DataTypes.STRING
		}

	},{
		tableName: 'cibo_users'
	});

	User.associate = function(models){
		
	}

	return User;
}