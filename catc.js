var request = require('request');

/*
 * Cloud At Cost API wrapper.
 *
 * @param key The API key to access the C@C API with
 * @param login The email to allows to use C@C API
 */
function CatC(key, login) {
  this.version = 'v1';
  this.url = 'https://panel.cloudatcost.com/api/'+this.version+'/';
  if(!key) {
    throw new Error('You have to provide an API key for this to work.');
  }
  this.key = key;

  if(!login) {
    throw new Error('You have to provide a login email address');
  }
  this.login = login;
}

var toQS = params =>
    '?' + Object.keys(params)
            .map(param => param + '=' + params[param])
            .join('&');

CatC.prototype.execute = function(route, params, cb) {
    if(typeof params === "function")
        cb = params;

    //collect special fields
    var method = params.method || "GET";
    //filter special fields
    params = Object.keys(params)
        .filter(key => key != "method")
        .reduce((obj, key) => {
            obj[key] = params[key];
            return obj;
        }, {});

    //merge params with creds
    var creds = {
        key: this.key,
        login: this.login
    };
    params = Object.assign({}, creds, params);

    var methods = {
        GET: "qs",
        POST: "form"
    };

    var options = {
        uri: this.url + route + ".php",
        json: true,
        rejectUnauthorized: false,
        [methods[method]]: params,
        method
    };

    request(options, function(err, res, body) {
        if(res.statusCode === 200)
            cb({ status: res.statusCode }, body);
        else if(err) {
            console.log(err);
            cb({
                status: err.code && err.code === 'ENETUNREACH'
                    ? "down"
                    : err
            });
        }
        else
            console.log(res.statusCode, err, body);
    });
};


/*
 * List Servers
 * List all servers on the account
 *
 * @param cb Callback function to call after the request
 */
CatC.prototype.listServers = function(cb) {
  this.execute('listservers', cb);
};

/*
 * List Templates
 * List all templates available
 *
 * @param cb Callback function to call after the request
 */
CatC.prototype.listTemplates = function(cb) {
  this.execute('listtemplates', cb);
};

/*
 * List Tasks
 * List all tasks in operation
 *
 * @param cb Callback function to call after the request
 */
CatC.prototype.listTasks = function(cb) {
  this.execute('listtasks', cb);
};

/*
 * Power Operations
 * Activate server power operations
 *
 * @param sid Server ID
 * @param action Action to execute on the server (= poweron, poweroff, reset)
 * @param cb Callback function to call after the request
 */
CatC.prototype.powerOp = function(sid, action, cb) {
  this.execute('powerop', { method: 'POST', sid: sid, action: action }, cb);
};

/*
 * Console
 * Request URL for console access
 *
 * @param sid Server ID
 * @param cb Callback function to call after the request
 */
CatC.prototype.console = function(sid, cb) {
  this.execute('console', { method: 'POST', sid: sid }, cb);
};

/*
 * CloudPRO - Resources
 * Check CloudPRO resource availability
 *
 * @param cb Callback function to call after the request
 */
CatC.prototype.pro_resources = function(cb) {
  this.execute('cloudpro/resources', { method: 'GET' }, cb);
};

/*
 * CloudPRO - Build
 * Provisions an instance with CloudPRO
 *
 * @param cb Callback function to call after the request
 */
CatC.prototype.pro_build = function(specs, cb) {
  this.execute('cloudpro/build', Object.assign({ method: "POST" }, specs), cb);
};

/*
 * CloudPRO - Build
 * Deletes a CloudPRO instance
 *
 * @param cb Callback function to call after the request
 */
CatC.prototype.pro_delete = function(sid, cb) {
  this.execute('cloudpro/delete', { sid, method: "POST" }, cb);
};

module.exports = CatC;
