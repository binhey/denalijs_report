'use strict';

var moment = require('moment');
function Reports() {}

Reports.prototype.report_cm_activitybyrecruiter = function(req, done) {
    /* SP input parameters
     IN  caller_sid INT,
     IN  caller_ip varchar(45),
     IN  tenant_id INT, -- can't be NULL
     IN  vendor_i varchar(128),
     IN  jobstatus_id INT
     */
    //console.log(req.body);

    var caller_sid = req.session.user.sid;
    var caller_ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
    var tenant_sid = req.session.user.tenant_sid;
    var recruiter = typeof req.body.recruiter !== 'undefined' && typeof req.body.recruiter.sid !== 'undefined' && req.body.recruiter.sid !== null ? parseInt(req.body.recruiter.sid) : null;
    var sales = typeof req.body.sales !== 'undefined' && typeof req.body.sales.sid !== 'undefined' && req.body.sales.sid !== null ? parseInt(req.body.sales.sid) : null;
    var begin_date = typeof req.body.begin_date !== 'undefined' && req.body.begin_date !== '' && req.body.begin_date !== null ? req.body.begin_date : null;
    var end_date = typeof req.body.end_date !== 'undefined' && req.body.end_date !== '' && req.body.end_date !== null ? req.body.end_date : null;

    if (begin_date !== null)
        begin_date = this.addQuotes(moment(begin_date).format('YYYY-MM-DD'));

    if (end_date !== null)
        end_date = this.addQuotes(moment(end_date).format('YYYY-MM-DD'));

    var querystr = "call report_dsales_activitybyrecruiters (" + caller_sid + ", '" + caller_ip + "', " + tenant_sid + ", " + recruiter + ", " + sales + ", NULL, " + begin_date + ", " + end_date + ");";
    console.log("run SP --- " + querystr);
    this.query(req, querystr, done);

};

Reports.prototype.getRecruiterList = function(req, done) {
    /* SP input parameters
     IN  caller_sid INT,
     IN  caller_ip varchar(45),
     IN  tenant_sid INT,
     IN  status_sid INT  -- if not used, pass NULL
     */
    var caller_sid = req.session.user.sid;
    var caller_ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
    var tenant_sid = req.session.user.tenant_sid;

    var querystr = "call person_getlistbyroles(" + caller_sid + ", '" + caller_ip + "', " + tenant_sid + ",1,'6')" ;
    console.log("run SP --- " + querystr);

    this.query(req, querystr, done);
};

Reports.prototype.getSalesList = function(req, done) {
    /* SP input parameters
     IN  caller_sid INT,
     IN  caller_ip varchar(45),
     IN  tenant_sid INT,
     IN  status_sid INT  -- if not used, pass NULL
     */
    var caller_sid = req.session.user.sid;
    var caller_ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
    var tenant_sid = req.session.user.tenant_sid;

    var querystr = "call person_getlistbyroles(" + caller_sid + ", '" + caller_ip + "', " + tenant_sid + ",1,'5')" ;
    console.log("run SP --- " + querystr);

    this.query(req, querystr, done);
};


Reports.prototype.query = function(req, query, done) {

    req.getConnection(function(err, connection) {

        if (err) {
            done({err: true, msg: 'database connect error'});
            return;
        }

        connection.query(query, function(error, result, fields) {
            //console.log(error);
            if (error || result[0][0].return_code == 1) {
                done({"msg": "DB error. Please check DB log."});
            } else {
                console.log(result[1]);
                done(result[1]);
            }

        });

    });
};

Reports.prototype.addQuotes = function(string) {
    return "'" + string + "'";
};

module.exports = new Reports();