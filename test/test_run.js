/* eslint no-undef: 0, camelcase: 0, no-magic-numbers: 0 */
"use strict";

var TestRun = require("../lib/test_run");

describe("TestRun", function () {

  it("should initialize", function () {
    var tr = new TestRun({
      locator: {
        filename: "bar"
      }
    }, {
      fs: {
        writeFileSync: function () {}
      }
    });
    tr.getCommand();
    tr.getEnvironment();
    tr.getArguments();
  });

  it("should support sauceSettings", function () {
    var tr = new TestRun({
      locator: {
        filename: "bar"
      },
      sauceBrowserSettings: {},
      sauceSettings: {}
    }, {
      fs: {
        writeFileSync: function () {}
      },
      rewriteNightwatchConfig: function () {}
    });
    tr.getCommand();
    tr.getEnvironment();
    tr.getArguments();
  });

  it("should support sauceSettings with tunnels", function () {
    var tr = new TestRun({
      locator: {
        filename: "bar"
      },
      sauceBrowserSettings: {},
      sauceSettings: {
        useTunnels: true
      }
    }, {
      fs: {
        writeFileSync: function () {}
      },
      rewriteNightwatchConfig: function () {}
    });
    tr.getCommand();
    tr.getEnvironment();
    tr.getArguments();
  });

  it("should support aggregateScreenshots", function () {
    var tr = new TestRun({
      locator: {
        filename: "bar"
      },
      sauceBrowserSettings: {},
      sauceSettings: {}
    }, {
      settings: {
        aggregateScreenshots: true,
        nightwatchConfigFilePath: "foo"
      },
      fs: {
        writeFileSync: function () {}
      },
      rewriteNightwatchConfig: function () {}
    });
    tr.getCommand();
    tr.getEnvironment();
    tr.getArguments();
  });

  it("should support debug", function () {
    var tr = new TestRun({
      locator: {
        filename: "bar"
      },
      sauceBrowserSettings: {},
      sauceSettings: {}
    }, {
      settings: {
        debug: true,
        nightwatchConfigFilePath: "foo"
      },
      fs: {
        writeFileSync: function () {}
      },
      rewriteNightwatchConfig: function () {}
    });
    tr.getCommand();
    tr.getEnvironment();
    tr.getArguments();
  });
});
