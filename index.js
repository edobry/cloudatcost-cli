#!/usr/bin/env node

var ronin = require("ronin"),
    nconf = require("nconf"),
    os = require("os"),
    path = require("path");

nconf.argv().env().file({ file: path.join(os.homedir(), ".cloudatcost") });

var app = ronin({
  path: __dirname,
  desc: "Cloud@Cost CLI tool"
});

app.run();
