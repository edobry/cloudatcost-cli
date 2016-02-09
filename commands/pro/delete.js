var Command = require("ronin").Command,
    api = require("../../api.js");

module.exports = Command.extend({
    desc: "Delete a CloudPRO instance",
    options: {
        server_id: {
            type: "string",
            aliases: ["sid"],
        },
    },
    run: function (sid) {
        if(!sid)
            throw new Error("sid is required")

        api.pro_delete({sid:sid}, function(err, res) {
            console.log(err);


            if(err)
                throw new Error(err);

            console.log(err);
            // if(err)
            //     throw err;

            console.log(JSON.stringify(res));
        });
    }
});
