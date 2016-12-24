/* eslint no-undef: 0, camelcase: 0, no-magic-numbers: 0, no-empty: 0 */
"use strict";
var _ = require("lodash");

var rewriteConfig = require("../lib/rewrite_config");

var _conf = function (opts) {
  return _.merge({
    selenium: {
      port: 100,
      server_path: "a",
      cli_args: {},
      phantomjs: {
        desiredCapabilities: {
          browserName: "phantomjs"
        }
      }
    },
    test_settings: {
      default: {
        selenium_port: 900
      },
      sauce: {
        desiredCapabilities: {}
      }
    }
  }, opts);
};

var _opts = function (conf) {
  return {
    console: {
      error: function () {}
    },
    fs: {
      writeFileSync: function () {}
    },
    path: {
      resolve: function () { return "."; }
    },
    require: function () {
      return conf;
    }
  };
};

describe("rewriteConfig", function () {
  describe("support seleniumServerVersion", function () {
    rewriteConfig("a", "b", {}, _opts(_conf()));

    rewriteConfig("a", "b", {
      localSeleniumPort: true
    }, _opts(_conf()));
    rewriteConfig("a", "b", {
      localSeleniumPort: true,
      localSeleniumVersion: "a"
    }, _opts(_conf()));

    rewriteConfig("a", "b", {
      isChromedriverPresent: true
    }, _opts(_conf()));
    rewriteConfig("a", "b", {
      isChromedriverPresent: true
    }, _opts(_conf({
      selenium: {
        cli_args: null
      }
    })));
    rewriteConfig("a", "b", {
      isChromedriverPresent: true
    }, _opts(_conf({
      selenium: {
        cli_args: {"webdriver.chrome.driver": "bar"}
      }
    })));

    rewriteConfig("a", "b", {
      isPhantomjsPresent: true
    }, _opts(_conf()));

    rewriteConfig("a", "b", {
      isPhantomjsPresent: true
    }, _opts(_conf({
      test_settings: {
        phantomjs: {
          desiredCapabilities: {
            "phantomjs.binary.path": "bar"
          }
        }
      }
    })));

    rewriteConfig("a", "b", {
      sauceSettings: {
        username: "foo",
        accessKey: "bar"
      },
      sauceBrowserSettings: {}
    }, _opts(_conf()));

    rewriteConfig("a", "b", {
      sauceSettings: {
        username: "foo",
        accessKey: "bar",
        tunnelId: 22
      },
      sauceBrowserSettings: {}
    }, _opts(_conf()));

    rewriteConfig("a", "b", {
      sauceSettings: {
        username: "foo",
        accessKey: "bar",
        tunnelId: 22,
        sharedSauceParentAccount: "z"
      },
      sauceBrowserSettings: {}
    }, _opts(_conf()));

    try {
      rewriteConfig("a", "b", {
        sauceSettings: {
          username: "foo",
          accessKey: "bar",
          tunnelId: 22
        }
      }, _opts(_conf()));
    } catch (e) {
    }
  });
});
