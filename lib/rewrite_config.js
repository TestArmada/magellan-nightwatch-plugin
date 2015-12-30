var fs = require("fs");
var path = require("path");
var _ = require("lodash");

// throws file read/write exceptions, JSON parse exceptions
module.exports = function (sourceConfigPath, tempAssetPath, options) {
  var conf = require(path.resolve(sourceConfigPath));

  if (options.localSeleniumPort) {
    // Local-testing selenium port (non-sauce)
    // Tell nightwatch to both start and connect to a selenium server on port {seleniumPort}
    conf.selenium.port = options.localSeleniumPort;
    conf.test_settings.default.selenium_port = options.localSeleniumPort;
  }

  // Remote testing (sauce) selenium settings:
  /*
  "username": "",         
  "access_key": "",       
  "desiredCapabilities": {
    "browserName": "",    
    "platform": "",       
    "version": "",        
    "tunnel-identifier": "
  },
  */
  if (options.sauceSettings) {
    // Auth
    conf.test_settings.sauce.username = options.sauceSettings.username;
    conf.test_settings.sauce.access_key = options.sauceSettings.accessKey;

    if (!options.sauceBrowserSettings) {
      console.error("ERROR: Missing browser settings even though sauce cloud settings are active");
      throw new Error("invalid configuration");
    }

    conf.test_settings.sauce.desiredCapabilities = options.sauceBrowserSettings;

    if (options.sauceSettings.tunnelId) {
      conf.test_settings.sauce.desiredCapabilities["tunnel-identifier"] = options.sauceSettings.tunnelId;
    } else {
      // This property may exist, so blow it away
      delete conf.test_settings.sauce.desiredCapabilities["tunnel-identifier"];
    }
  }

  // Write all the above details to a temporary config file, then return the temporary filename
  var tempConfigPath = path.resolve(tempAssetPath + "/nightwatch.json");

  fs.writeFileSync(tempConfigPath, JSON.stringify(conf), "utf8");

  return tempConfigPath;
};