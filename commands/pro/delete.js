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

        console.log("Deleting server " + sid + "...");

        api.pro_delete(sid, function(err, res) {
            if(err)
                throw new Error(JSON.stringify(err));

            console.log(JSON.stringify(res));

            console.log("Deleted successfully.");
        });
    }
});
