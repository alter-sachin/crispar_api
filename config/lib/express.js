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
var userRoute = require('../../routes/user.routes');
var dishRoutes = require('../../routes/dish.routes');
var orderRoutes = require('../../routes/order.routes');
var tableRoutes = require('../../routes/table.routes');


function initMiddleWares(app) {

  //init cors request
  app.use(cors());

  //init logger
  app.use(logger('dev'));

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());

  app.use((err, req, res, next) => {
    if (err) {
      console.log('Invalid Request data');
      res.json({
        status : 1,
        message : 'Invalid Request data'
      });
    } else {
      next();
    }
  });

}





function initRoutes(app){
  indexRoute(app);
  restaurantRoute(app);
  userRoute(app);
  dishRoutes(app);
  orderRoutes(app);
  tableRoutes(app);
}



module.exports.init = function() {

 var app = express();

 //checkDb();
 initMiddleWares(app);
 initRoutes(app);

 return app;
}