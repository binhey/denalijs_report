'use strict';
//Main app

var mainApp = angular.module('mainApp', ['ngRoute',
    'ReportsControllers',
    // the others have been removed to protect copyright
    'textAngular'
]);

mainApp.config(['$httpProvider',
    function($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    }
]);

mainApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
                // the others have been removed to protect copyright
                when('/reports/reqlist_by_recruiters', {
                templateUrl: '/views/reports/reqlist_by_recruiters.html',
                controller: 'cm_reqlistbyrecruitersCtrl'
            }).
                otherwise({
                    redirectTo: '/dashboard'
                });
    }
]);

