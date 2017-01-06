var fs = require("fs");

var settings = {
  nightwatchConfigFilePath: undefined,
  debug: false,
  seleniumServerVersion: undefined,
  isChromedriverPresent: undefined,
  isPhantomjsPresent: undefined,

  initialize: function (argv, options) {
    /*
        options contains
        {
            seleniumServerVersion: selenium-server version defined in root/package.json,
            isChromedriverPresent: chromedriver version defined in root/package.json
            isPhantomjsPresent: phantomjs version defined in root/package.json
        }
    */
    settings.debug = argv.debug;
    settings.syncBrowsers = argv.sync_browsers;

    settings.nightwatchConfigFilePath =
      argv.nightwatch_config
      || (fs.existsSync("./nightwatch.json") ? "./nightwatch.json" : "./conf/nightwatch.json");

    if (options) {
      settings.seleniumServerVersion = options.seleniumServerVersion;
      settings.isChromedriverPresent = options.isChromedriverPresent;
      settings.isPhantomjsPresent = options.isPhantomjsPresent;
    }
  }
};

module.exports = settings;