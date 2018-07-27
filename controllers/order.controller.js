'use strict';
const uuidv4 = require('uuid/v4');
const errorHandler = require('../utils/error_handler');
const _ = require('lodash');
var orderDB = require('../db_calls/order.db_call');
var userDB = require('../db_calls/user.db_call');
var dishDB = require('../db_calls/dish.db_call');
var orderItemDB = require('../db_calls/order_item.db_call');
var restaurantDB = require('../db_calls/restaurant.db_call');
var tableDB=require('../db_calls/table.db_call');
var groupDB=require('../db_calls/group.db_call');



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

function validateTableStatus(tableModel){
	var accessToken;
	//var callerId=id;
	//console.log(id);
	return new Promise(function(resolve,reject){
		if(tableModel.status=="free"){
			tableModel.getGroup().then(function(group){
				if(group==null){
					var randomNumber=Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
					var groupObj={};
					groupObj.id =uuidv4();
					groupObj.token=randomNumber.toString();
					//groupObj.callerID=callerId;
					groupDB.addNew(groupObj).then(function(groupModel){
						return tableModel.setGroup(groupModel)

					}).then(function(groupRespone){
						var mainString=JSON.stringify(groupRespone);
						var mainJson=JSON.parse(mainString);
						var responseJson={};
						responseJson.status="free";
						responseJson.token=mainJson.token;
						resolve(responseJson);
					}).catch(function(err){
						reject(err);
					});

				}else{
					var mainString=JSON.stringify(group);
					var mainJson=JSON.parse(mainString);
					var responseJson={};
					
					responseJson.status="free";

					responseJson.token=mainJson.token;


					console.log(mainJson.token);

					
					
					resolve(responseJson);

				}
			}).catch(function(err){
				reject(err);
			})
		}else if(tableModel.status=="occupied"){
			tableModel.getGroup().then(function(group){
				var mainString=JSON.stringify(group);
				var mainJson=JSON.parse(mainString);
				var responseJson={};
				
				responseJson.status="occupied";
				responseJson.token=mainJson.token;
		

				resolve(responseJson);
			}).catch(function(err){
				reject(err);
			})

		}

		
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

exports.addNewOrderTable = function(req , res) {

        
         var body=JSON.parse(req.body.data);
          console.log(body.tableNumber);
	var tableNumber = body.tableNumber;
//	var restaurantId = req.body.restaurantId;
	var accessToken=body.accessToken;
	//var callerId=req.body.callerId;
	var reqbody=body;
//	var order = req.body;
	var tableModel;
	tableDB.findByTableNumber(tableNumber).then(function(table){
		if(table==null){
			throw "No table exist";
		}

		 tableModel=table;
		return validateTableStatus(tableModel);		
	}).then(function(response){
		if(response.status=="free" ){
			addOrder(reqbody,tableModel).then(function(order){
				tableModel.update({status:"occupied"}).then(() => {
				order.token=response.token;
				res.json(order);
				})
				
			});
			
		}else if(response.status=="occupied"){
			if(response.token==accessToken){
				addOrder(reqbody,tableModel).then(function(order){
				res.json(order);
			});
			}else{
				res.json({
			status : 1,
			message : "Token not Validated"
		      });

			}


		}
		

	}).catch(function(err){
		res.status(422).json({
			status : 1,
			message : err
		});
	})


	

	

	
}

function addOrder(body,table){

	var restaurantId = body.restaurantId;
	var order = body;
	var userModel , orderItemModels , orderModel,restaurantModel,tableModel1;
	tableModel1=table;
	//console.log(tableModel);
	return new Promise(function(resolve,reject){

	 restaurantDB.getByID(restaurantId).then(function(restaurant){
		restaurantModel = restaurant;
		return validateOrderData(order);
	}).then(function(){
		return addOrderItems(order.items);
	}).then(function(orderItems){
		orderItemModels = orderItems;
		return orderDB.addNew(order);
	}).then(function(order){
		orderModel = order;
		return orderModel.setTable(tableModel1);
	}).then(function(){
		return orderModel.setRestaurant(restaurantModel);
	}).then(function(){
		return orderModel.setOrderItems(orderItemModels);
	}).then(function(orderModel){
		console.log("here");
	
		var obj={
			status : 0,
			message : "order added successfully",
			order : orderModel
		}
		
		resolve(obj);
	}).catch(function(err){
		var obj={
			status : 1,
			message : "There is some error"
		}
		reject(obj);
	});
})
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


