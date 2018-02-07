'use strict';

module.exports = function(sequelize , DataTypes){

	const Dish = sequelize.define('dish', {

		id : {
			type : DataTypes.UUID,
			primaryKey : true
		},
		name : {
			type: DataTypes.STRING,
			allowNull : false
		},
		description: {
			type: DataTypes.TEXT,
			allowNull : false
		},
		category : {
			type : DataTypes.STRING,
			allowNull : false
		},
		price : {
			type : DataTypes.FLOAT,
			allowNull : false
		},
		modelLocation : {
			type : DataTypes.STRING,
			allowNull : false
		},

	});

	Dish.associate = function(models){
		// Dish.hasMany(models.Ingredient);
		Dish.hasMany(models.Process , {onDelete : 'CASCADE'});
		Dish.hasMany(models.Flavour , {onDelete : 'CASCADE'});
		Dish.belongsTo(models.Restaurant);
		Dish.hasMany(models.OrderItem);
	}

	return Dish;
}