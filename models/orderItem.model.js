'use strict';

module.exports = function(sequelize , DataTypes){

	const OrderItem = sequelize.define('orderItem', {

		id : {
			type : DataTypes.UUID,
			primaryKey : true
		},
		count : {
			type : DataTypes.INTEGER,
			allowNull : false
		}
	});

	OrderItem.associate = function(models){
		OrderItem.belongsTo(models.Dish);
		OrderItem.belongsTo(models.Order);
	}

	return OrderItem;
}