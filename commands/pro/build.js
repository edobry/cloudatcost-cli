var Command = require("ronin").Command,
    api = require("../../api.js");

module.exports = Command.extend({
    desc: "Provisions an instance with CloudPRO",
    options: {
        cpu: "string",
        ram: "string",
        storage: "string",
        os: "string",
    },
    run: function (cpu, ram, storage, os) {
        var specs = {
            cpu: cpu || 1,
            ram: ram || 1024,
            storage: storage || 10,
            os: os || 75
        };

        console.log("Building new server with:");
        console.log(Object.keys(specs).map(spec => spec + ": " + specs[spec]).join('\n'));

        api.pro_build(specs, function(err, res) {
            if(err)
                throw new Error(JSON.stringify(err));

            console.log("Server '" + res.servername + "'built successfully.");
        });
    }
});
