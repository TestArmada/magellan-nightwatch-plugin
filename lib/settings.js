var fs = require("fs");

var settings = {
  nightwatchConfigFilePath: undefined,
  debug: false,

  initialize: function (argv) {
    settings.debug = argv.debug;

    settings.nightwatchConfigFilePath =
      argv.nightwatch_config
      || (fs.existsSync("./nightwatch.json") ? "./nightwatch.json" : "./conf/nightwatch.json");
  }
};

module.exports = settings;