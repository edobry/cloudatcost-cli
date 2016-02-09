var util = {};

util.resourceFormatter = function(resources, options) {
    var config = Object.assign({
        usedField: "used",
        totalField: "total",
        accessor: (resources, resource, stat) => resources[stat][resource.name.toLowerCase() + '_' + stat.toLowerCase()]
    }, options);

    return function(resource) {
        return resource.name + ": " + config.accessor(resources, resource, config.usedField) + '/' + config.accessor(resources, resource, config.totalField) + ' ' + resource.unit;
    };
};

module.exports = util;