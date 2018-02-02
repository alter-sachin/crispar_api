'use strict';

module.exports = function(sequelize , DataTypes){

	const Dish = sequelize.define('dish', {

		id : {
			type : DataTypes.UUID
		},
		name : {
			type: DataTypes.STRING,
			allowNull : false
		},
		description: {
			type: DataTypes.TEXT,
		},
		category : {
			type : DataTypes.STRING
		},
		price : {
			type : DataTypes.FLOAT
		},
		modelLocation : {
			type : DataTypes.STRING
		},

	});
}