'use strict';
const uuidv4 = require('uuid/v4');
const errorHandler = require('../utils/error_handler');
const _ = require('lodash');
var tableDB = require('../db_calls/table.db_call');
var restaurantDB = require('../db_calls/restaurant.db_call');
var groupDB= require('../db_calls/group.db_call');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;




/* add new table*/
exports.addNewTable = function(req , res) {
	var tableObj = {};
	
	tableObj.table_number = req.body.tableNumber;
	tableObj.status = req.body.status;
	//tableObj.restaurantId=;
	tableObj.id = uuidv4();
	var restaurantModel;
	var tableModel;

	restaurantDB.getByID(req.body.restaurantId).then(function(restaurant){
		restaurantModel=restaurant;
		console.log(restaurantModel);
		return restaurantModel.getTables({where:{
			table_number: tableObj.table_number
		}})

		 

	}).then(function(tables){
		console.log(tables);
		if(tables.length==0){
			return tableDB.addNew(tableObj);

		}
		else{
			throw "Table already exist";
		}
		
	}).then(function(table){
		tableModel=table;
		return table.setRestaurant(restaurantModel);


	}).then(function(){
		var randomNumber=Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
		var groupObj={};
		groupObj.id =uuidv4();
		groupObj.token=randomNumber.toString();

		return groupDB.addNew(groupObj);

	}).then(function(groupModel){
		return tableModel.setGroup(groupModel)
	}).then(function(groupRespone){
		res.json({
			status : 0,
			user : tableModel,
			message : 'table added successfully'
		})



	}).catch(function(err){
		res.status(422).json({
			status : 1,
			message : err
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
	var accesstoken;
	tableDB.findByTableNumber(tableNumber,restaurantId).then(function(table){
		if(table==null){
			throw "No table exist";
		}
		tableModel=table;
		return tableModel.update({status:status})	
	}).then(function(){
		return tableModel.getGroup();
	}).then(function(group){
		var groupObj=group.toJSON();
		accesstoken=groupObj.token;
		res.json({table:tableModel.toJSON(),
			accesstoken:accesstoken})
		
	}).catch(function(err){
		res.status(422).json({
			status : 1,
			message : errorHandler.getErrorMessage(err)
		});


	})


}