'use strict';


module.exports = function(app){

	var controller = require('../controllers/dishes.controller');

	app.route('/api/dish/:dishID').get(controller.getDishByID);
	app.route('/api/dish').post(controller.addNewDish);
	app.route('/api/dish/:dishID').delete(controller.deleteDish);
}