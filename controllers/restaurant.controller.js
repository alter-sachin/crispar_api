'use strict';
const uuidv4 = require('uuid/v4');
const errorHandler = require('../utils/error_handler');
const _ = require('lodash');
var restaurantDB = require('../db_calls/restaurant.db_call');


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