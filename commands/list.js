var Command = require("ronin").Command;

module.exports = Command.extend({
    desc: "Lists servers, tasks, or templates",
    run: function () {
        console.log("List what?");
    }
});
