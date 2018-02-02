'use strict';

module.exports = function(sequelize , DataTypes){

	const Order = sequelize.define('order', {

		id : {
			type : DataTypes.UUID,
			primaryKey : true
		}
	});

	Order.associate = function(models){
		Order.belongsTo(models.User);
		Order.hasMany(models.OrderItem);
	}

	return Order;
}