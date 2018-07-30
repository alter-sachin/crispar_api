'use strict';
const uuidv4 = require('uuid/v4');
const Sequelize = require('sequelize');
const errorHandler = require('../utils/error_handler');
const _ = require('lodash');
var restaurantDB = require('../db_calls/restaurant.db_call');
const db = require('../config/lib/sequelize');
const sequelize = db.sequelize;
const Restaurant = db.models.Restaurant;
const Op = Sequelize.Op;


/*convert phone number from string to array*/
function parsePhoneNumberString(restaurant){
	restaurant.phoneNumbers = restaurant.phoneNumbers.split(',');
}


/* add new restaurant*/
exports.addNewRestaurant = function(req , res) {
	var restaurantObj = {};
	console.log(req.body);
	restaurantObj.name  = req.body.name ;
	restaurantObj.address = req.body.address;
	restaurantObj.phoneNumbers = req.body.phoneNumbers && _.isArray(req.body.phoneNumbers) ? req.body.phoneNumbers.join(',') : req.body.phoneNumbers;
	restaurantObj.id = uuidv4();
	restaurantObj.latitude = req.body.latitude;
	restaurantObj.longitude = req.body.longitude;
	restaurantObj.introModel = req.body.introModel;
	restaurantObj.introImage = req.body.introImage;

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
	req.body.introImage ?( updateObj.introImage = req.body.introImage ): '';
	req.body.introModel ?( updateObj.introModel = req.body.introModel ): '';
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
	var params = {
		start : req.query.start ? _.toNumber(req.query.start) : 0,
		limit : req.query.limit ? _.toNumber(req.query.limit) : 250,
		sortBy : req.query.sortBy ? req.query.sortBy : 'createdAt',
		order : req.query.order ? req.query.order : 'DESC'
	};

	restaurantDB.getList(params).then(function(restaurants){
		
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
	var start = req.query.start ? _.toNumber(req.query.start) : 0;
	var limit = req.query.limit ? _.toNumber(req.query.limit) : 250;
	
	var query = {
		offset : start,
		limit : limit,
		where:{
			status: { 
				[Op.like] : status
			}
		},
		order : [
			[sortBy , order]
		],
		include: [
        {
          model: db.models.OrderItem,
          include: [
            
             db.models.Dish

            
          ]
        },{model: db.models.Table}
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





function convertObjectToArray(categoryObj){
	var categoryArray = [];
	_.each(categoryObj , function(category){
		categoryArray.push(category);
	});
	return categoryArray;
}

function parseDishesByCategories(dishes){
	var categoryObj = {};
	var categoryArray ;
	_.each(dishes , function(dish){
		if(categoryObj[dish.category]){

			categoryObj[dish.category].dishes.push(dish);
		}else{
			categoryObj[dish.category] = {};
			categoryObj[dish.category].categoryName = dish.category;
			categoryObj[dish.category].dishes = [dish];
		}
	});
	categoryArray = convertObjectToArray(categoryObj);
	return categoryArray;
}

/*get dishes*/
exports.getMenuOfRestaurant = function(req , res){
	var id = req.params.restaurantID;
	var restaurantModel;
	var restaurantObj = {};

	restaurantDB.getByID(id).then(function(restaurant){
		
		parsePhoneNumberString(restaurant);
		
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

exports.getMenuOfRestaurantAashish = function(req , res){
	var id = req.params.restaurantID;
	var restaurantModel;
	var restaurantObj = {};
	var restaurantMain={}
     Restaurant.findById(id,{
      include: [
        {
          model: db.models.Dish,
          include: [
            
             db.models.Ingredient,db.models.Process,db.models.Flavour

            
          ]
        }
      ]
    }).then(function(restaurant){
    	restaurantMain=restaurant.toJSON();
    	restaurantMain.dishes=null;
    
    	restaurantObj.categories = parseDishesByCategories(restaurant.dishes);
    	_.extend(restaurantObj,restaurantMain);

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


exports.locationSearch = function(req , res){
	var params = {
		start : req.query.start ? _.toNumber(req.query.start) : 0,
		limit : req.query.limit ? _.toNumber(req.query.limit) : 250,
		sortBy : req.query.sortBy ? req.query.sortBy : 'createdAt',
		order : req.query.order ? req.query.order : 'DESC',
		latitude : req.query.latitude ? _.toNumber(req.query.latitude)  : 0,
		longitude : req.query.longitude ? _.toNumber(req.query.longitude) : 0,
		range : req.query.range ? _toNumber(req.query.range) : 0.1
	};

	restaurantDB.locationSearch(params).then(function(restaurants){
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