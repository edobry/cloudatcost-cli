var CatC = require("cloudatcost"),
    nconf = require("nconf");

module.exports = new CatC(nconf.get("key"), nconf.get("email"));
