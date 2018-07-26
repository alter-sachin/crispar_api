'use strict';


module.exports = function(app){

	var controller = require('../controllers/order.controller');

	app.route('/api/order/list').get(controller.getOrdersList);
	app.route('/api/order').post(controller.addNewOrderTable);

	app.route('/api/order/:orderID').get(controller.getOrderByID);
	app.route('/api/order/:orderID').delete(controller.deleteOrder);
	app.route('/api/order/:orderID/updateStatus').put(controller.updateOrderStatus);
	
}