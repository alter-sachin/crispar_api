'use strict';
const uuidv4 = require('uuid/v4');
const errorHandler = require('../utils/error_handler');
const _ = require('lodash');
var tableDB = require('../db_calls/table.db_call');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;




/* add new table*/
exports.addNewTable = function(req , res) {
	var tableObj = {};
	
	tableObj.table_number = req.body.table_number;
	tableObj.status = req.body.status;
	tableObj.id = uuidv4();

	tableDB.addNew(tableObj).then(function(data){
		res.json({
			status : 0,
			user : data,
			message : 'table added successfully'
		});
	}).catch(function(err){
		res.status(422).json({
			status : 1,
			message : errorHandler.getErrorMessage(err)
		});
	});

	
}