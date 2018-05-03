var fs = require("fs");
var path = require("path");
var util = require("util");
var _ = require("lodash");
var logger = require("./logger");

var SELEMIUM_VER_STR_TMPLT = "./node_modules/selenium-server/lib/runner/selenium-server-standalone-%s.jar"
var CHROMEDRIVER_LOCATION = "./node_modules/chromedriver/lib/chromedriver/chromedriver";
var PHANTOMJS_LOCATION = "./node_modules/phantomjs/bin/phantomjs";
// throws file read/write exceptions, JSON parse exceptions
module.exports = function (sourceConfigPath, tempAssetPath, options) {
  var conf = require(path.resolve(sourceConfigPath));

  if (options.syncBrowsers) {
    if (!conf.test_settings.default.globals) {
      conf.test_settings.default.globals = {};
    }
    conf.test_settings.default.globals.syncModeBrowserList = options.syncBrowsers.split(",");
  }

  if (options.localSeleniumPort) {
    // Local-testing selenium port (non-sauce)
    // Tell nightwatch to both start and connect to a selenium server on port {seleniumPort}
    conf.selenium.port = options.localSeleniumPort;
    conf.test_settings.default.selenium_port = options.localSeleniumPort;

    if (options.localSeleniumVersion) {
      conf.selenium.server_path = util.format(SELEMIUM_VER_STR_TMPLT, options.localSeleniumVersion);
    }
  }

  if (options.isChromedriverPresent) {
    // append chrome driver location if user specifies chromedriver in conf to use
    if (!conf.selenium.cli_args) {
      // create structure if not defined
      conf.selenium.cli_args = {};
    }

    if (!conf.selenium.cli_args["webdriver.chrome.driver"]) {
      // don't overwrite user value
      conf.selenium.cli_args["webdriver.chrome.driver"] = CHROMEDRIVER_LOCATION;
    }
  }

  if (options.isPhantomjsPresent) {
    // append phantomjs location if user specifies phantomjs in conf to use 
    if (!conf.test_settings.phantomjs) {
      // create structure if not defined
      conf.test_settings.phantomjs = {
        desiredCapabilities: {
          browserName: "phantomjs"
        }
      };
    }
    if (!conf.test_settings.phantomjs.desiredCapabilities["phantomjs.binary.path"]) {
      // don't overwrite user value
      conf.test_settings.phantomjs.desiredCapabilities["phantomjs.binary.path"] = PHANTOMJS_LOCATION;
    }
  }
  
  var test_settings = _.cloneDeep(conf.test_settings[options.executor]);
  conf.test_settings[options.executor]
    = _.merge(test_settings, options.executorCapabilities);
  // Write all the above details to a temporary config file, then return the temporary filename
  var tempConfigPath = path.resolve(tempAssetPath + "/nightwatch.json");

  fs.writeFileSync(tempConfigPath, JSON.stringify(conf), "utf8");

  return tempConfigPath;
};
