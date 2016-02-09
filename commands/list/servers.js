var Command = require("ronin").Command,
    api = require("../../api.js"),
    util = require("../../util.js"),
    constants = require("../../constants.js");

var formatServers = function(servers) {
    return servers.map(function(server) {
        var out = [];
        if(server.label)
            out.push(server.label + ' (' + server.servername + ')');
        else
            out.push(server.servername);
        
        if(server.hostname != "Not Assigned")
            out.push(server.hostname + ' (' + server.ip + ')');
        else
            out.push(server.ip);

        out.push("OS: " + server.template);

        out.push(server.cpu + " CPUs: " + server.cpuusage + "% in use");

        out.push("RAM: " + server.ramusage + '/' + server.ram + " GBs in use");

        out.push("Storage: " + server.hdusage + '/' + server.storage + " GBs in use");

        out.push("Status: " + server.status);

        return out;
    }).map((rows) => rows.join('\n'));
};

module.exports = Command.extend({
    desc: "Lists servers",
    run: function () {
        api.listServers(function(err, res) {
            if(err)
                throw err;

            console.log("Servers:");
            console.log();

            console.log(formatServers(res.data).join('\n\n'));
        });
    }
});
