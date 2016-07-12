var Command = require("ronin").Command,
    api = require("../../api.js"),
    util = require("../../util.js"),
    constants = require("../../constants.js");

var annotatedValue = (primary, secondary) => `${primary} (${secondary})`;
var resourceUsage = (resource) => (used, total) =>`${used}/${total} ${resource}s in use`;
var gbUsage = resourceUsage("GB");
var ramUsage = server => gbUsage(server.ramusage, server.ram);
var hdUsage = server => gbUsage(server.hdusage, server.storage);

var serverView = (server, showPasswords) =>`
ID: ${server.id}
${server.label ? annotatedValue(server.label, server.servername) : server.servername }
${server.hostname != "Not Assigned" ? annotatedValue(server.hostname, server.ip) : server.ip }
OS: ${server.template}
Root password: ${showPasswords ? server.rootpass : ""}
${server.cpu} CPUs ${server.cpuusage}% in use
RAM: ${ramUsage(server)}
Storage: ${hdUsage(server)}
Status: ${server.status}`;

var formatServers = (showPasswords, servers) => servers.map(serverView).join('\n');

module.exports = Command.extend({
    desc: "Lists servers",
    options: { showPasswords: "boolean" },
    run: showPasswords =>
        api.listServers((err, res) => {
            if(err)
                throw err;

            console.log("Servers:");
            console.log();

            console.log(formatServers(showPasswords, res.data));
        })
});
