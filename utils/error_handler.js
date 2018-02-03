'use strict';
const _ = require('lodash');
/**
 * Get the error message from error object
 */
exports.getErrorMessage = function (err) {
  var message = '';

  if(err.errors && _.isArray(err.errors)){
    _.each(err.errors , function(error){
      message = message + ' '+ error.message;
    });
  }else{
    message = err.message;
  }

  return message;
};
