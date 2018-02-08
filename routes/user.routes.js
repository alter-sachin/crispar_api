'use strict';


module.exports = function(app){

	var controller = require('../controllers/user.controller');

	app.route('/api/user').post(controller.addNewUser);
	app.route('/api/user/list').get(controller.getUsersList);

	app.route('/api/user/:userID').get(controller.getUserByID);
	app.route('/api/user/:userID').delete(controller.deleteUser);
	app.route('/api/user/:userID').put(controller.updateUser);

	app.route('/api/user/:userID/orders').get(controller.getOrdersOfUser);
}