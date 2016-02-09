var Command = require("ronin").Command,
    api = require("../../api.js");

module.exports = Command.extend({
    desc: "Provisions an instance with CloudPRO",
    run: function () {
        api.pro_build({
            cpu: 1,
            ram: 1024,
            storage: 10,
            os: 75
        }, function(err, res) {
            console.log(err);
            // if(err)
            //     throw err;
            
            console.log(JSON.stringify(res));
        });
    }
});
