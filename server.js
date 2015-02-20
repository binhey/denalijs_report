'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var connection = require('express-myconnection');
//var underscore = require('underscore');
var config = require('./app-config.js');
var mysql = require('mysql');


// the others have been removed to protect copyright
var reportService = require('./services/services_reports');

var app = express();

app.use(favicon(__dirname + '/www/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(connection(mysql, config.mysqlconnection, 'pool'));

app.use(session({secret: 'Some secret', rolling: true, cookie:{maxAge:1800000}}));

// the others have been removed to protect copyright
app.use('/services/services_reports', reportService);

app.set('port', process.env.PORT || 8080);
console.log("start the server");
app.listen(app.get('port'));
