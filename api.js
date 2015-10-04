var CatC = require("node-catc"),
    config = require("./config.json");

module.exports = new CatC(config.api_key, config.email);