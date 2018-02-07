'use strict';
const uuidv4 = require('uuid/v4');
const Sequelize = require('sequelize');
const errorHandler = require('../utils/error_handler');
const _ = require('lodash');
var restaurantDB = require('../db_calls/restaurant.db_call');
const Op = Sequelize.Op;


/*convert phone number from string to array*/
function parsePhoneNumberString(restaurant){
	restaurant.phoneNumbers = restaurant.phoneNumbers.split(',');
}


/* add new restaurant*/
exports.addNewRestaurant = function(req , res) {
	var restaurantObj = {};
	restaurantObj.name  = req.body.name ;
	restaurantObj.address = req.body.address;
	restaurantObj.phoneNumbers = req.body.phoneNumbers && _.isArray(req.body.phoneNumbers) ? req.body.phoneNumbers.join(',') : req.body.phoneNumbers;
	restaurantObj.id = uuidv4();
	restaurantObj.latitude = req.body.latitude;
	restaurantObj.longitude = req.body.longitude;

	restaurantDB.addNew(restaurantObj).then(function(data){
		parsePhoneNumberString(data);
		res.json({
			status : 0,
			restaurant : data,
			message : 'Restaurant added successfully'
		});
	}).catch(function(err){
		res.status(422).json({
			status : 1,
			message : errorHandler.getErrorMessage(err)
		});
	});

	
}

/* get restaurant by id */
exports.getRestaurantByID = function(req , res){
	var id = req.params.restaurantID;

	restaurantDB.getByID(id).then(function(restaurant){
		parsePhoneNumberString(restaurant);
		res.json({
			status : 0,
			restaurant : restaurant
		});
	}).catch(function(err){
		res.status(422).json({
			status : 1,
			message : errorHandler.getErrorMessage(err)
		});
	});
}



/*delete restaurant by id*/
exports.deleteRestaurant = function(req , res){
	var id = req.params.restaurantID;

	restaurantDB.deleteByID(id).then(function(restaurant){
		parsePhoneNumberString(restaurant);
		res.json({
			status : 0,
			message : 'Restaurant deleted successfully',
			restaurant : restaurant
		});
	}).catch(function(err){
		res.status(422).json({
			status : 1,
			message : errorHandler.getErrorMessage(err)
		});
	});
	
}


/*update restaurant*/
exports.updateRestaurant = function(req , res){
	var id = req.params.restaurantID;
	var updateObj = {};
	req.body.name ? ( updateObj.name  = req.body.name ): '';
	req.body.latitude ? ( updateObj.latitude  = req.body.latitude ): '';
	req.body.longitude ? ( updateObj.longitude  = req.body.longitude ): '';
	req.body.address ?( updateObj.address = req.body.address ): '';
	req.body.phoneNumbers ? (updateObj.phoneNumbers = _.isArray(req.body.phoneNumbers) ? req.body.join(',') : req.body.phoneNumbers ): '';

	restaurantDB.update(id , updateObj).then(function(restaurant){
		parsePhoneNumberString(restaurant);
		res.json({
			status : 0,
			message : 'Restaurant updated successfully',
			restaurant : restaurant
		});
	}).catch(function(err){
		res.status(422).json({
			status : 1,
			message : errorHandler.getErrorMessage(err)
		});
	});
}


exports.getRestaurantsList = function(req , res){

	restaurantDB.getList().then(function(restaurants){
		
		_.each(restaurants , function(restaurant){ 
			parsePhoneNumberString(restaurant);
		});

		res.json({
			status : 0,
			restaurants : restaurants
		});
	}).catch(function(err){
		res.status(422).json({
			status : 1,
			message : errorHandler.getErrorMessage(err)
		});
	});
}

/*get list of orders of a particluar restaurant*/
exports.getOrdersOfRestaurant = function(req , res){
	var id = req.params.restaurantID;
	var status = req.query.status ? req.query.status : '%%' ;
	var sortBy = req.query.sortBy ? req.query.sortBy : 'createdAt';
	var order = req.query.order ? req.query.order : 'DESC';
	
	var query = {
		where:{
			status: { 
				[Op.like] : status
			}
		},
		order : [
			[sortBy , order]
		]
	}
	
	restaurantDB.getByID(id).then(function(restaurant){
		return restaurant.getOrders(query);
	}).then(function(orderModels){
		res.json({
			status : 0,
			orders : orderModels
		});
	}).catch(function(err){
		res.status(422).json({
			status : 1,
			message : errorHandler.getErrorMessage(err)
		});
	});
}


function parseDishesByCategories(dishes){
	var categoryObj = {};
	_.each(dishes , function(dish){
		if(categoryObj[dish.category]){
			categoryObj[dish.category].dishes.push(dish);
		}else{
			categoryObj[dish.category] = {};
			categoryObj[dish.category].categoryName = dish.category;
			categoryObj[dish.category].dishes = [dish];
		}
	});
	return categoryObj;
}

/*get dishes*/
exports.getMenuOfRestaurant = function(req , res){
	var id = req.params.restaurantID;
	var restaurantModel;
	var restaurantObj = {};

	restaurantDB.getByID(id).then(function(restaurant){
		restaurantModel = restaurant;
		return restaurant.getDishes();
	}).then(function(dishes){
		restaurantObj.categories = parseDishesByCategories(dishes);
		_.extend(restaurantObj,restaurantModel.get({plain:true}));
		res.json({
			status : 0,
			restaurant : restaurantObj
		});
	}).catch(function(err){
		res.status(422).json({
			status : 1,
			message : errorHandler.getErrorMessage(err)
		});
	});
}