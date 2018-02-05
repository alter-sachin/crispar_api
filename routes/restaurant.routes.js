'use strict';


module.exports = function(app){

	var controller = require('../controllers/restaurant.controller');

	app.route('/api/restaurant').post(controller.addNewRestaurant);
	app.route('/api/restaurant/list').get(controller.getRestaurantsList);
	
	app.route('/api/restaurant/:restaurantID').get(controller.getRestaurantByID);
	app.route('/api/restaurant/:restaurantID').delete(controller.deleteRestaurant);
	app.route('/api/restaurant/:restaurantID').put(controller.updateRestaurant);


}