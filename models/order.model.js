'use strict';

module.exports = function(sequelize , DataTypes){

	const Order = sequelize.define('order', {

		id : {
			type : DataTypes.UUID,
			primaryKey : true
		},
		status : {
			type : DataTypes.ENUM,
			defaultValue  :"registered",
			values: ['registered', 'processing','completed']
		}
	});

	Order.associate = function(models){
		Order.belongsTo(models.User);
		Order.belongsTo(models.Restaurant);
		Order.hasMany(models.OrderItem);
	}

	return Order;
}