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
		},
		name:{
			type:DataTypes.STRING,
			allowNull:true
		},
		email:{
			type:DataTypes.STRING,
			allowNull:true

		},
		facebookId:{
			type:DataTypes.STRING,
			allowNull:true
		},
	    role : {
			type : DataTypes.ENUM,
			defaultValue  :"user",
			values: ['user', 'admin']
		}


	},{
		tableName: 'cibo_users'
	});

	User.associate = function(models){
		User.hasMany(models.Order);
		
	}

	return User;
}