'use strict';

module.exports = function(sequelize , DataTypes){

	const Ingredient = sequelize.define('ingredient', {

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

	Ingredient.associate =  function(models){
		Ingredient.belongsToMany(models.Dish , { through: 'IngredientDishMap'});
		models.Dish.belongsToMany(Ingredient , { through: 'IngredientDishMap'});
	}

	return Ingredient;
}