'use strict';
var express = require('./express');
var config = require('../config');
var sequelizeDB = require('./sequelize');
var sequelize = sequelizeDB.sequelize;


module.exports.start = function() {
	
	//sequelize.drop();
	sequelize.sync().then(function(){

		var User = sequelizeDB.models.User;
		


		var app = express.init();

		app.listen(config.port , config.host , function(err){
			if(err){
				console.log(err);
			}else{
				console.log('Server is running at -');
				console.log(config.host+':'+config.port);
			}
		});
	}).catch(function(err){
		console.log(err);
	});

	

}