'use strict';

module.exports = function(sequelize , DataTypes){

	const Process = sequelize.define('process', {

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

	Process.associate =  function(models){
		// Process.belongsToMany(models.Dish , { through: 'ProcessDishMap'});
		// models.Dish.belongsToMany(Process , { through: 'ProcessDishMap'});
		Process.belongsTo(models.Dish);
	}

	return Process;
}