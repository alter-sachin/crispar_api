'use strict';
var express = require('./express');
var config = require('../config');
var sequelizeDB = require('./sequelize');

module.exports.start = function() {
	
	var app = express.init();
	
	app.listen(config.port , config.host , function(err){
		if(err){
			console.log(err);
		}else{
			console.log('Server is running at -');
			console.log(config.host+':'+config.port);
		}
	});

}