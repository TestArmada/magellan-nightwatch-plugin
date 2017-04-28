const path = require("path");
const _ = require("lodash");
const settings = require("./settings");
const logger = require("./logger");

module.exports = {
  getProfiles: function (browsers) {
    const configPath = settings.nightwatchConfigFilePath;
    /*eslint-disable global-require*/
    const nightwatchConfig = require(path.resolve(configPath));
    const configuredBrowsers = nightwatchConfig.test_settings;

    const returnBrowsers = [];

    _.forEach(browsers, (browser) => {
      if (configuredBrowsers[browser]) {
        const b = configuredBrowsers[browser];

        b.nightwatchEnv = browser;
        b.id = browser;

        returnBrowsers.push(b);
      }
    });

    return returnBrowsers;
  },

  getCapabilities: function (profile) {
    const configPath = settings.nightwatchConfigFilePath;
    /*eslint-disable global-require*/
    const nightwatchConfig = require(path.resolve(configPath));
    const configuredBrowsers = nightwatchConfig.test_settings;

    if (configuredBrowsers[profile]) {
      const b = configuredBrowsers[profile];

      b.nightwatchEnv = profile;
      b.id = profile;

      return b;
    } else {
      return new Error(`profile: ${profile} isn't found`);
    }
  },

  listBrowsers: function () {
    const configPath = settings.nightwatchConfigFilePath;
    /*eslint-disable global-require*/
    const nightwatchConfig = require(path.resolve(configPath));
    const configuredBrowsers = nightwatchConfig.test_settings;

    const OMIT_BROWSERS = ["default", "sauce"];
    const listedBrowsers = [];

    _.forEach(configuredBrowsers, (capabilities, browser) => {
      if (OMIT_BROWSERS.indexOf(browser) < 0) {
        logger.debug(`  browser:    ${browser}`);
        logger.debug(`  capabilities: ${JSON.stringify(capabilities)}`);
        listedBrowsers.push(browser);
      }
    });

    return listedBrowsers;
  }
};
