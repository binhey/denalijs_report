'use strict';

var ReportsControllers = angular.module('ReportsControllers', []);

ReportsControllers.controller('cm_reqlistbyrecruitersCtrl', ['$q', '$scope', '$http', '$modal',
    function($q, $scope, $http, $modal) {
        $scope.reportData = [];
        $scope.no_result_found = false;
        $scope.searchKeys = {

            sales:{sid: null, name:null},
            recruiter:{sid: null, name: null},
            begin_date: null,
            end_date: null
        };
        $scope.RecruiterList = [{sid: null, name: null}];
        $scope.SalesList = [{sid:null, name:null}];

        $scope.init = function(done) {
            var promises = [];
            var getRecruiterList = $http.post('services/services_reports/getRecruiterList');
            promises.push(getRecruiterList);
            getRecruiterList.success(function(data) {
                $scope.RecruiterList[0] = {sid: null, name: "All Recruiters"};
                for (var j = 0; j < data.length; j++) {
                    $scope.RecruiterList[j + 1] = {sid: data[j].sid, name: data[j].name};
                }
                $scope.searchKeys.recruiter = $scope.RecruiterList[0];
            });

            // get Recruiter list
            var getSalesList = $http.post('services/services_reports/getSalesList');
            promises.push(getSalesList);
            getSalesList.success(function(data) {
                $scope.SalesList[0] = {sid: null, name: "All Sales"};
                for (var j = 0; j < data.length; j++) {
                    $scope.SalesList[j + 1] = {sid: data[j].sid, name: data[j].name};
                }
                $scope.searchKeys.sales = $scope.SalesList[1];

            });

            $q.all(promises).then(done);

        };

        $scope.search = function(searchKeys) {
            console.log(searchKeys);
            $scope.no_result_found = false;
            $http.post('/services/services_reports/report_cm_activitybyrecruiter', $scope.searchKeys).success(function(reportlist) {
                $scope.reportData = reportlist;
                if (reportlist.length < 1) {
                    $scope.no_result_found = true;
                }
            });
        };

        $scope.init(function() {
            $scope.search();
        });

    }
]);
