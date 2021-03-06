'use strict';

module.exports = function(sequelize , DataTypes){

	const Restaurant = sequelize.define('restaurant', {

		id : {
			type : DataTypes.UUID,
			primaryKey : true
		},
		name : {
			type: DataTypes.STRING,
			allowNull : false
		},
		address: {
			type: DataTypes.TEXT,
			allowNull : false
		},
		phoneNumbers : {
			type : DataTypes.TEXT
		},
		latitude : {
			type : DataTypes.FLOAT,
			allowNull : false
		},
		longitude : {
			type : DataTypes.FLOAT,
			allowNull : false
		},
		introModel:{
			type : DataTypes.STRING,
			allowNull : false
		},
		introImage:{
			type : DataTypes.STRING,
			allowNull : false
		}

	});

	Restaurant.associate = function(models){
		Restaurant.hasMany(models.Dish);
		Restaurant.hasMany(models.Order);
		Restaurant.hasMany(models.Table);
		Restaurant.belongsTo(models.User);
	}

	return Restaurant;
}
