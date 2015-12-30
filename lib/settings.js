var fs = require("fs");

var settings = {
  nightwatchConfigFilePath: undefined,

  initialize: function (argv) {
    settings.nightwatchConfigFilePath = 
      argv.nightwatch_config
      || (fs.existsSync("./nightwatch.json") ? "./nightwatch.json" : "./conf/nightwatch.json");
  }
};

module.exports = settings;