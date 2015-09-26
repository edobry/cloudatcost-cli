var CatC = require("node-catc");
var config = require("./config.json");

var api = new CatC(config.api_key, config.email);

// api.listServers(function(err, res) {
//     if(err)
//         throw err;

//     console.log(JSON.stringify(res.data));
// });


api.pro_resources(function(err, res) {
    if(err)
        throw err;

    var resources = res.data;

    var formatResource = function(resource) {
        var formatStat = (stat) => resources[stat][resource.name.toLowerCase() + '_' + stat.toLowerCase()];
        return resource.name + ": " + formatStat("used") + '/' + formatStat("total") + ' ' + resource.unit;
    };

    console.log("CloudPRO Resource Usage");
    console.log();

    [{
        name: "CPU",
        unit: "vCPUs"
    }, {
        name: "RAM",
        unit: "MBs"
    }, {
        name: "Storage",
        unit: "GBs"
    }].map(formatResource).forEach((resource) => console.log(resource));
});
