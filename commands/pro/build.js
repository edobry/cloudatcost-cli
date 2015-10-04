var Command = require("ronin").Command,
    api = require("../../api.js");

module.exports = Command.extend({
    desc: "Shows CloudPRO resource availability",
    run: function () {
        api.pro_build({
            cpu: 1,
            ram: 1024,
            storage: 10,
            os: 75
        }, function(err, res) {
            if(err)
                throw err;

            console.log(JSON.stringify(res));
        });
    }
});
