'use strict';


module.exports = function(app){

	var controller = require('../controllers/table.controller');

	app.route('/api/table').post(controller.addNewTable);
	
}