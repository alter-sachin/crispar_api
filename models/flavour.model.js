'use strict';

module.exports = function(sequelize , DataTypes){

	const Flavour = sequelize.define('flavour', {

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
		}
	});

	Flavour.associate =  function(models){
		// Flavour.belongsToMany(models.Dish , { through: 'FlavourDishMap'});
		// models.Dish.belongsToMany(Flavour , { through: 'FlavourDishMap'});
		Flavour.belongsTo(models.Dish);
	}

	return Flavour;
}