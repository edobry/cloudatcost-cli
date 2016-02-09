var Command = require("ronin").Command,
    api = require("../../api.js"),
    util = require("../../util.js"),
    constants = require("../../constants.js");

module.exports = Command.extend({
    desc: "Shows CloudPRO resource availability",
    run: function () {
        api.pro_resources(function(err, res) {
            if(err)
                throw err;

            console.log("CloudPRO Resource Usage");
            console.log();

            constants.resources.map(
                util.resourceFormatter(res.data)
            ).forEach((resource) => console.log(resource));
        });
    }
});
