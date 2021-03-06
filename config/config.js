'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
  fs = require('fs'),
  glob = require('glob'),
  chalk = require('chalk'),
  path = require('path');



/**
 * Validate NODE_ENV existence
 */
var validateEnvironmentVariable = function () {
  var environmentFiles = glob.sync('./config/env/' + process.env.NODE_ENV + '.js');
  console.log();
  if (!environmentFiles.length) {
    if (process.env.NODE_ENV) {
      console.error(chalk.red('+ Error: No configuration file found for "' + process.env.NODE_ENV + '" environment using development instead'));
    } else {
      console.error(chalk.red('+ Error: NODE_ENV is not defined! Using default development environment'));
    }
    process.env.NODE_ENV = 'development';
  }

};


/**
 * Initialize global configuration
 */
var initConfig = function () {
  validateEnvironmentVariable();

  // Get the default config
  var defaultConfig = require(path.join(process.cwd(), 'config/env/default'));

  // Get the current config
  var environmentConfig = require(path.join(process.cwd(), 'config/env/', process.env.NODE_ENV)) || {};

  // Merge config files
  var config = _.merge(defaultConfig, environmentConfig);

  return config;
};

/**
 * Set configuration object
 */
module.exports = initConfig();
