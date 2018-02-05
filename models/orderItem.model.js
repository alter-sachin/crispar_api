'use strict';

module.exports = function(sequelize , DataTypes){

	const OrderItem = sequelize.define('orderItem', {

		id : {
			type : DataTypes.UUID,
			primaryKey : true
		}
	});

	OrderItem.associate = function(models){
		OrderItem.belongsTo(models.Dish);
		OrderItem.belongsTo(models.Order);
	}

	return OrderItem;
}