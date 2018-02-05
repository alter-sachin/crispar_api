'use strict';
const uuidv4 = require('uuid/v4');
const errorHandler = require('../utils/error_handler');
const _ = require('lodash');
var userDB = require('../db_calls/user.db_call');





/* add new user*/
exports.addNewUser = function(req , res) {
	var userObj = {};
	userObj.name  = req.body.name ;
	userObj.address = req.body.address;
	userObj.facebookID = req.body.facebookID;
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



exports.getUsersList = function(req , res){

	userDB.getList().then(function(users){
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