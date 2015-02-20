# denalijs_report
a report in denalijs.io that uses javascript, angular.js, node.js, express.js, mysql.js and mysql

Summary: 

denalijs.io is business process management system developed for recruiting and consulting. It’s a web application developed using full-stack JavaScript technologies include angular.js, node.js, express.js and mysql.

The files in this repository are code snippets that I wrote to implement a report in denalijs. They follow the MVC-based application framework (express.js). As such, I implemented bootstrap css classes, angular.js view templates, ng controllers, node.js routes and modules, and mysql queries.

The code snippets are copyrighted to denalijs.io.

Description:

1.App.js specifies the urls and their corresponding controllers through angular modules ng-view and ng-route.

2.Reqlist_by_recruiters.html is the report template page which is implemented using bootstrap and angularjs.

3.Controllers.js contains controller of the report page. Through REST API it's able to get data from node server.

4.server.js defines the node.js/express.js routers that map client requests (URLs) to node.js services that we developed.

5.service_report.js is a sub router that for this specific report.

6.model_report.js is a node.js module that serves data from a mysql database for this report.
