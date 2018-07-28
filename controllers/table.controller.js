'use strict';
const uuidv4 = require('uuid/v4');
const errorHandler = require('../utils/error_handler');
const _ = require('lodash');
var tableDB = require('../db_calls/table.db_call');
var restaurantDB = require('../db_calls/restaurant.db_call');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;




/* add new table*/
exports.addNewTable = function(req , res) {
	var tableObj = {};
	
	tableObj.table_number = req.body.table_number;
	tableObj.status = req.body.status;
	//tableObj.restaurantId=;
	tableObj.id = uuidv4();
	var restaurantModel;
	var tableModel;

	restaurantDB.getByID(req.body.restaurantId).then(function(restaurant){
		restaurantModel=restaurant;
		console.log(restaurantModel);
		return tableDB.addNew(tableObj);

	}).then(function(table){
		tableModel=table;
		return table.setRestaurant(restaurantModel);
	}).then(function(){
		res.json({
			status : 0,
			user : tableModel,
			message : 'table added successfully'
		})

	}).catch(function(err){
		res.status(422).json({
			status : 1,
			message : errorHandler.getErrorMessage(err)
		});

	})


/*
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
	*/

	
}

exports.getTableStatus=function(req,res){

	var tableNumber=req.params.tableNumber;
	var restaurantId=req.params.restaurantId;

	tableDB.findByTableNumber(tableNumber,restaurantId).then(function(table){

		var tableObj=table.toJSON();
		res.json({status:0,

			statusTable:tableObj.status}
			);


	}).catch(function(err){

		res.json({
			status:1,
			statusTable:null
		})
	})

}

exports.tableGroupToken = function(req , res) {
	var tableObj = {};
	
	tableObj.table_number = req.params.tableNumber;	
	var tableModel;
	tableDB.findByTableNumber(tableObj.table_number).then(function(table){
		if(table==null){
			throw "No table exist";
		}

		 tableModel=table;
		return tableModel.getGroup();		
	}).then(function(group){
		var mainString=JSON.stringify(group);
        var mainJson=JSON.parse(mainString);
        res.json({
			status:true,
			token:mainJson.token
		});



	}).catch(function(err){
		res.json({
			status:false,
			err:err
		})

			
			})

	
}

exports.updateTableStatus=function(req,res){
  var tableModel;
	var status=req.body.status;
	var tableNumber=req.body.tableNumber;
	var restaurantId=req.body.restaurantId;
	tableDB.findByTableNumber(tableNumber,restaurantId).then(function(table){
		if(table==null){
			throw "No table exist";
		}
		tableModel=table;
		return tableModel.update({status:status})	
	}).then(function(){
      return tableModel.getGroup();
	}).then(function(group){
		return group.destroy({ force: true });	
	}).then(function(){
		res.json(tableModel.toJSON())
	}).catch(function(err){
		res.status(422).json({
			status : 1,
			message : errorHandler.getErrorMessage(err)
		});


	})


}