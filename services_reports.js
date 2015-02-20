'use strict';
var express = require('express');
var Reports = require('../models/model_reports.js');
var router = express.Router();


router.post('/report_cm_activitybyrecruiter', function(req, res, next) {
    Reports.report_cm_activitybyrecruiter(req, function(result) {
        res.send(result);
    });
});

router.post('/getRecruiterList', function(req, res, next) {
    Reports.getRecruiterList(req, function(result) {
        res.send(result);
    });
});

router.post('/getSalesList', function(req, res, next) {
    Reports.getSalesList(req, function(result) {
        res.send(result);
    });
});


module.exports = router;