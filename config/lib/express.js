'use strict';

//dependencies
var express = require("express");
var path  = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
var logger = require('morgan');
var cookieParser = require('cookie-parser');

//routes
var indexRoute = require('../../routes/index.routes');
var restaurantRoute = require('../../routes/restaurant.routes');



function initMiddleWares(app) {
  
  //init cors request
  app.use(cors());

  //init logger
  app.use(logger('dev'));

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());

}





function initRoutes(app){
  indexRoute(app);
  restaurantRoute(app);

}



module.exports.init = function() {
 
 var app = express();

 //checkDb();
 initMiddleWares(app);
 initRoutes(app);

 return app;
}