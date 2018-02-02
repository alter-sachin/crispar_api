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
		},
		phoneNumbers : {
			type : DataTypes.TEXT
		}

	});

	Restaurant.associate = function(models){
		Restaurant.hasMany(models.Dish);
	}

	return Restaurant;
}
