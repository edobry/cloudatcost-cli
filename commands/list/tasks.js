var Command = require("ronin").Command,
    api = require("../../api.js"),
    util = require("../../util.js"),
    constants = require("../../constants.js");

var formatTasks = function(tasks) {
    return tasks.map(function(task) {
        var out = [];
        
        out.push("Action: " + task.action + ' ' + task.serverid);
        out.push("Status: " + task.status);
        out.push("Duration: " +
                 (parseInt(task.finishtime) -
                 parseInt(task.starttime)) + " ms");

        return out;
    }).map((rows) => rows.join('\n'));
};

module.exports = Command.extend({
    desc: "Lists tasks",
    run: function () {
        api.listTasks(function(err, res) {
            if(err)
                throw err;

            console.log("Tasks:");
            console.log();

            console.log(formatTasks(res.data).join('\n\n'));
        });
    }
});
