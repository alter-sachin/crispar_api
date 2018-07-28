'use strict';


module.exports = function(app){

	var controller = require('../controllers/table.controller');

	app.route('/api/table').post(controller.addNewTable);
	app.route('/api/table/:tableNumber/:restaurantId/status').get(controller.getTableStatus);
	
}