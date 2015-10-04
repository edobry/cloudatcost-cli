var Command = require("ronin").Command,
    api = require("../../api.js");

module.exports = Command.extend({
    desc: "Lists servers",
    run: function () {
        api.listServers(function(err, res) {
            if(err)
                throw err;

            console.log("Servers:");
            console.log();

            //TODO: replace JSON.stringify
            console.log(JSON.stringify(res.data));
        });
    }
});
