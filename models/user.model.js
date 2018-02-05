'use strict';

module.exports = function(sequelize , DataTypes){

	const User = sequelize.define('user', {

		id : {
			type : DataTypes.UUID,
			primaryKey : true
		},
		name : {
			type: DataTypes.STRING,
			allowNull : false
		},
		facebookID : {
			type : DataTypes.STRING
		},
		address : {
			type : DataTypes.STRING
		}

	},{
		tableName: 'cibo_users'
	});

	User.associate = function(models){
		User.hasMany(models.Order);
	}

	return User;
}