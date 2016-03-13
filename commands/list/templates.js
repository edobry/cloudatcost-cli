var Command = require("ronin").Command,
    api = require("../../api.js");

var range = function(start, end) {
    var out = [];
    for(var i = start; i <= end; i++)
        out.push(i);
    return out;
};

var repeat = function(x, times) {
    return range(1, times).map(function() { return x; }).join('');
};

var padTo = function(length) {
    return {
        with: function(char) {
            return function(str) {
                return str.length >= length
                    ? str
                    : str + repeat(char, length - str.length);
            };
        }
    };
};

var formatTemplates = function(templates) {
    return templates.map(function(template, i) {
        return template.ce_id + ": " + template.name;
    }).map(padTo(40).with(' ')).reduce(function(builder, template, i, arr) {
        var length = builder.rows[builder.next].push(template);

        if(length == 3) {
            builder.next++;
            builder.rows.push([]);
        };

        return i < arr.length-1
            ? builder
            : builder.rows;
    }, {
        next: 0,
        rows: [[]]
    }).map(function(row) {
        return row.join('\t');
    }).reduce(function(builder, row) {
        return builder + '\n' + row;
    });
};

module.exports = Command.extend({
    desc: "Lists templates",
    run: function () {
        api.listTemplates(function(err, res) {
            if(err)
                throw new Error(JSON.stringify(err));

            console.log("Templates:");
            console.log();

            console.log(formatTemplates(res.data));
        });
    }
});
