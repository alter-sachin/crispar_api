'use strict';


module.exports = function(app){

	var controller = require('../controllers/dish.controller');

	app.route('/api/dish').post(controller.addNewDish);
	app.route('/api/dish/list').get(controller.getDishList);

	app.route('/api/dish/:dishID').get(controller.getDishByID);
	app.route('/api/dish/:dishID').delete(controller.deleteDish);
	app.route('/api/dish/:dishID').put(controller.updateDish);

	app.route('/api/search/dish').get(controller.dishSearch);
}