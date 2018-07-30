'use strict';
const db = require('../config/lib/sequelize');
const sequelize = db.sequelize;
const Order = db.models.Order;
const OrderItem = db.models.OrderItem;
const Item = db.models.Item;
const uuidv4 = require('uuid/v4');



/*get model instance from db*/
function findOrderByID(id){
	return new Promise(function(resolve , reject ){
		Order.findById(id).then(function(order){
			if(!order){
				return reject(new Error('No order found for id'));
			}
			resolve(order);
		}).catch(function(err){
			reject(err);
		});
	});
}



/*add new order row*/
exports.addNew = function(orderObj) {
	orderObj.id = uuidv4();
	return new Promise(function(resolve,reject){
		Order.create(orderObj).then(function(order){
			resolve(order);
		}).catch(function(err){
			reject(err);
		});
	});
}



/*find by id*/
exports.getByIDCompleteDetails = function(id){
 
	return new Promise(function(resolve,reject){
		
		Order.findById(id,
			{
          include: [
        {
          model: db.models.OrderItem,
          include: [
            
             db.models.Dish

            
          ]
        }
      ]
        }
		).then(function(order){
			if(!order){
				return reject(new Error('No order found for id'));
			}
			resolve(order);
		}).catch(function(err){
			reject(err);
		});

	});
}



/*find by id*/
exports.getByID = function(id){
 
	return new Promise(function(resolve,reject){
		
		findOrderByID(id).then(function(order){
			resolve(order);
		}).catch(function(err){
			reject(err);	
		});
	});
}

/*get list of restaurants*/
exports.getList = function(params){
	var query = {
		offset : params.start,
		limit : params.limit,
		order  : [
			[params.sortBy , params.order]
		],
		include : [OrderItem]
	}
	return new Promise(function(resolve,reject){
		Order.findAll(query).then(function(orders){
			resolve(orders)
		}).catch(function(err){
			reject(err);
		});
	});
}

/* delete by id */
exports.deleteByID = function(id){

	return new Promise(function(resolve,reject){

		findOrderByID(id).then(function(order){

			return order.destroy();

		}).then(function(order){
			resolve(order);
		}).catch(function(err){
			reject(err);	
		});
	});
}



exports.update = function(id , updateObj){

	return new Promise(function(resolve,reject){
		
		findOrderByID(id).then(function(order){
			return order.update(updateObj);
		}).then(function(order){
			resolve(order);
		}).catch(function(err){
			reject(err);	
		});
	});


}