var fs = require("fs");
var path = require("path");
var util = require("util");
var _ = require("lodash");
var logger = require("./logger");
var prependFile = require("prepend-file");

var SELEMIUM_VER_STR_TMPLT =
  "./node_modules/selenium-server/lib/runner/selenium-server-standalone-%s.jar";
var CHROMEDRIVER_LOCATION =
  "./node_modules/chromedriver/lib/chromedriver/chromedriver";
var PHANTOMJS_LOCATION = "./node_modules/phantomjs/bin/phantomjs";

var updateScreenShotSettings = function(settings, screenshotPath = "") {
  var updatedSettings = {
    screenshots: {
      enabled: true,
      on_failure: true,
      on_error: true,
      path: screenshotPath
    }
  };
  return Object.assign({}, settings, updatedSettings);
};

const setupScreenshotDir = async () => {
  // a global var set by Looper.
  const workspacePath = process.env.WORKSPACE || ".";
  const screenshotDir = "screenshots";
  const desiredPath = `${workspacePath}/${screenshotDir}`;
  try {
    fs.mkdirSync(desiredPath);
    return desiredPath;
  } catch (err) {
    console.log(
      `Error in creating Nightwatch Screenshot directory: ${err.toString()}`
    );
  }
};

// throws file read/write exceptions, JSON parse exceptions
module.exports = function(sourceConfigPath, tempAssetPath, options) {
  var currentPath = process.cwd();
  var conf = require(path.resolve(currentPath + "/" + sourceConfigPath));
  var newSourceConfigPath = path.basename(sourceConfigPath);

  if (options.syncBrowsers) {
    if (!conf.test_settings.default.globals) {
      conf.test_settings.default.globals = {};
    }
    conf.test_settings.default.globals.syncModeBrowserList = options.syncBrowsers.split(
      ","
    );
  }

  if (options.localSeleniumPort) {
    // Local-testing selenium port (non-sauce)
    // Tell nightwatch to both start and connect to a selenium server on port {seleniumPort}
    conf.selenium.port = options.localSeleniumPort;
    conf.test_settings.default.selenium_port = options.localSeleniumPort;

    if (options.localSeleniumVersion) {
      conf.selenium.server_path = util.format(
        SELEMIUM_VER_STR_TMPLT,
        options.localSeleniumVersion
      );
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
    if (
      !conf.test_settings.phantomjs.desiredCapabilities["phantomjs.binary.path"]
    ) {
      // don't overwrite user value
      conf.test_settings.phantomjs.desiredCapabilities[
        "phantomjs.binary.path"
      ] = PHANTOMJS_LOCATION;
    }
  }

  var screenshotPath = setupScreenshotDir();
  var newSettings = updateScreenShotSettings(
    conf.test_settings[options.executor],
    screenshotPath
  );

  conf.test_settings[options.executor] = newSettings;
  logger.log(
    `Updating Test Settings with Screenshot Config: ${JSON.stringify(
      newSettings
    )}`
  );

  var confClone = _.cloneDeep(conf);
  _.merge(
    confClone.test_settings[options.executor],
    options.executorCapabilities
  );
  // Write all the above details to a temporary config file, then return the temporary filename
  var tempConfigPath = path.resolve(tempAssetPath + "/" + newSourceConfigPath);
  fs.writeFileSync(tempConfigPath, JSON.stringify(confClone), "utf8");

  if (path.extname(tempConfigPath) === ".js") {
    try {
      prependFile.sync(tempConfigPath, "module.exports = ");
      logger.log(
        "Convert to .js format if the orginal nightwatch config is .js format."
      );
    } catch (err) {
      throw new Error(
        "Cannot convert nightwatch config to .js file: " + err.toString()
      );
    }
  }

  return tempConfigPath;
};
