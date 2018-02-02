'use strict';


module.exports = function(app){

	var indexController = require('../controllers/index.controller');

	app.route('/').get(indexController.index);
}