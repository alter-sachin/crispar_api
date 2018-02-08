'use strict';
const uuidv4 = require('uuid/v4');
const errorHandler = require('../utils/error_handler');
const _ = require('lodash');
var orderDB = require('../db_calls/order.db_call');
var userDB = require('../db_calls/user.db_call');
var dishDB = require('../db_calls/dish.db_call');
var orderItemDB = require('../db_calls/order_item.db_call');
var restaurantDB = require('../db_calls/restaurant.db_call');



function checkSingleItem(item,index){
	return new Promise(function(resolve,reject){
		if(!_.isNumber(item.count)){
			reject(new Error('count is not valid for item at index'+index));
		}else{
			dishDB.getByID(item.id).then(function(){
				resolve();
			}).catch(function(err){
				reject(new Error(err.message + " at index "+index));
			});
		}
	});
}

function checkOrderItems(items){
	var check = {
		notValid : true,
		error : ""
	}

	return new Promise(function(resolve,reject){
		var promiseMap = items.map(function(item , index){
			return checkSingleItem(item , index);
		});

		Promise.all(promiseMap).then(function(){
			resolve();
		}).catch(function(err){
			reject(err);
		})
	});

}


function validateOrderData(orderObj){
	var check;

	return new Promise(function(resolve,reject){
		
		if(!orderObj.items){
			return reject( new Error("order.items missing"));
		}else if(!_.isArray(orderObj.items)){
			return reject( new Error("order.items should be array"));
		}else{
			checkOrderItems(orderObj.items).then(function(){
				resolve();
			}).catch(function(err){
				reject(err);
			});
		}
	});
}


function addSingleOrderItem(item){
	var orderItemModel;
	var dishId = item.id;
	return new Promise(function(resolve,reject){
		orderItemDB.addNew(item).then(function(orderItem){
			orderItemModel = orderItem;
			return dishDB.getByID(dishId);
		}).then(function(dishModel){
			return orderItemModel.setDish(dishModel);
		}).then(function(){
			resolve(orderItemModel);
		}).catch(function(err){
			reject(err);
		})
	});
}


function addOrderItems(items){
	return new Promise(function(resolve,reject){
		var promiseMap = items.map(function(item){
			return addSingleOrderItem(item);
		});

		Promise.all(promiseMap).then(function(orderItemModels){
			resolve(orderItemModels);
		}).catch(function(err){
			reject(err);
		});
	});
}


/* add new order*/
exports.addNewOrder = function(req , res) {
	var userId = req.body.userId;
	var restaurantId = req.body.restaurantId;
	var order = req.body;
	var userModel , orderItemModels , orderModel,restaurantModel;
	
	userDB.getByID(userId).then(function(user){
		userModel = user;
		return restaurantDB.getByID(restaurantId);
	}).then(function(restaurant){
		restaurantModel = restaurant;
		return validateOrderData(order);
	}).then(function(){
		return addOrderItems(order.items);
	}).then(function(orderItems){
		orderItemModels = orderItems;
		return orderDB.addNew(order);
	}).then(function(order){
		orderModel = order;
		return orderModel.setUser(userModel);
	}).then(function(){
		return orderModel.setRestaurant(restaurantModel);
	}).then(function(){
		return orderModel.setOrderItems(orderItemModels);
	}).then(function(orderModel){
		res.json({
			status : 0,
			message : "order added successfully",
			order : orderModel
		});
	}).catch(function(err){
		res.status(422).json({
			status : 1,
			message : errorHandler.getErrorMessage(err)
		});
	});
	

	
}



/* get order by id */
exports.getOrderByID = function(req , res){
	var id = req.params.orderID;

	orderDB.getByIDCompleteDetails(id).then(function(order){
		res.json({
			status : 0,
			order : order
		});
	}).catch(function(err){
		res.status(422).json({
			status : 1,
			message : errorHandler.getErrorMessage(err)
		});
	});
}




/*delete order by id*/
exports.deleteOrder = function(req , res){
	var id = req.params.orderID;

	orderDB.deleteByID(id).then(function(order){
		res.json({
			status : 0,
			message : 'Order deleted successfully',
			order : order
		});
	}).catch(function(err){
		res.status(422).json({
			status : 1,
			message : errorHandler.getErrorMessage(err)
		});
	});
}

/*get all orders list */
exports.getOrdersList = function(req , res){
	var params = {
		start : req.query.start ? _.toNumber(req.query.start) : 0,
		limit : req.query.limit ? _.toNumber(req.query.limit) : 250,
		sortBy : req.query.sortBy ? req.query.sortBy : 'createdAt',
		order : req.query.order ? req.query.order : 'DESC'
	};

	orderDB.getList(params).then(function(orders){	
		res.json({
			status : 0,
			orders : orders
		});
	}).catch(function(err){
		res.status(422).json({
			status : 1,
			message : errorHandler.getErrorMessage(err)
		});
	});
}


/*update restaurant*/
exports.updateOrderStatus = function(req , res){
	var id = req.params.orderID;
	var updateObj = {
		status : req.body.status
	};

	orderDB.update(id , updateObj).then(function(order){
		res.json({
			status : 0,
			message : 'Order status updated successfully',
			order : order
		});
	}).catch(function(err){
		res.status(422).json({
			status : 1,
			message : errorHandler.getErrorMessage(err)
		});
	});
	
}


