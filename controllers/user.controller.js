'use strict';
const uuidv4 = require('uuid/v4');
const errorHandler = require('../utils/error_handler');
const _ = require('lodash');
var userDB = require('../db_calls/user.db_call');
var restaurantDB = require('../db_calls/restaurant.db_call');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;




/* add new user*/
exports.addNewUser = function(req , res) {
	var userObj = {};
	userObj.username  = req.body.username ;
	userObj.password = req.body.password;
	userObj.id = uuidv4();

	userDB.addNew(userObj).then(function(data){
		res.json({
			status : 0,
			user : data,
			message : 'user added successfully'
		});
	}).catch(function(err){
		res.status(422).json({
			status : 1,
			message : errorHandler.getErrorMessage(err)
		});
	});

	
}

exports.updateUserWithRestaurant=function(req,res){

	var userId=req.body.userId;
	var restaurantId=req.body.restaurantId;
	var userModel;
	var restaurantModel;

	userDB.getByID(userId).then(function(user){
		userModel=user;

		return restaurantDB.getByID(restaurantId);
	}).then(function(restaurant){
		restaurantModel=restaurant;
		return restaurantModel.setUser(userModel);



	}).then(function(restaurantAfter){
		res.json({status : 0,
			restaurant : restaurantAfter,
			message : 'user updated successfully'

		})
	}).catch(function(err){
		res.status(422).json({
			status : 1,
			message : errorHandler.getErrorMessage(err)
		});

	})




}

exports.verifyAdmin=function(req,res){
    var userObj={};


	userObj.username=req.params.username;
	userObj.password=req.params.password;
	var userModel;
	var restaurantModel;

	userDB.getByUsername(userObj).then(function(user){
		userModel=user;
		var userNewObj=userModel.toJSON();


		return restaurantDB.getByUserId(userNewObj.id);
	}).then(function(restaurantAfter){
		res.json({status : 0,
			restaurant : restaurantAfter,
			message : 'user updated successfully'

		})
	}).catch(function(err){
		res.status(422).json({
			status : 1,
			message : errorHandler.getErrorMessage(err)
		});

	})




}





/* get user by id */
exports.getUserByID = function(req , res){
	var id = req.params.userID;

	userDB.getByID(id).then(function(user){
		res.json({
			status : 0,
			user : user
		});
	}).catch(function(err){
		res.status(422).json({
			status : 1,
			message : errorHandler.getErrorMessage(err)
		});
	});
}



/*delete user by id*/
exports.deleteUser = function(req , res){
	var id = req.params.userID;

	userDB.deleteByID(id).then(function(user){
		res.json({
			status : 0,
			message : 'user deleted successfully',
			user : user
		});
	}).catch(function(err){
		res.status(422).json({
			status : 1,
			message : errorHandler.getErrorMessage(err)
		});
	});
	
}


/*update user*/
exports.updateUser = function(req , res){
	var id = req.params.userID;
	var updateObj = {};
	req.body.name ? ( updateObj.name  = req.body.name ): '';
	req.body.facebookID ? ( updateObj.facebookID  = req.body.facebookID ): '';
	req.body.address ?( updateObj.address = req.body.address ): '';

	userDB.update(id , updateObj).then(function(user){
		res.json({
			status : 0,
			message : 'user updated successfully',
			user : user
		});
	}).catch(function(err){
		res.status(422).json({
			status : 1,
			message : errorHandler.getErrorMessage(err)
		});
	});
}


/* get list of all users*/
exports.getUsersList = function(req , res){
	var params = {
		start : req.query.start ? _.toNumber(req.query.start) : 0,
		limit : req.query.limit ? _.toNumber(req.query.limit) : 250,
		sortBy : req.query.sortBy ? req.query.sortBy : 'createdAt',
		order : req.query.order ? req.query.order : 'DESC'
	};
	userDB.getList(params).then(function(users){
		res.json({
			status : 0,
			users : users
		});
	}).catch(function(err){
		res.status(422).json({
			status : 1,
			message : errorHandler.getErrorMessage(err)
		});
	});
}



/*get list of orders of a particluar user*/
exports.getOrdersOfUser = function(req , res){
	var id = req.params.userID;
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
		]
	}
	
	userDB.getByID(id).then(function(user){
		return user.getOrders(query);
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