/* eslint no-undef: 0, camelcase: 0, no-magic-numbers: 0 */
"use strict";
var chai = require("chai");
var expect = chai.expect;

var settings = require("../lib/settings");

describe("settings", function () {
  describe("supports initialize", function () {
    settings.initialize({}, {}, {
      fs: {
        existsSync: function () {
          return true;
        }
      }
    });
    expect(settings.nightwatchConfigFilePath).to.eql("./nightwatch.json");
  });

  describe("supports conf/nightwatch", function () {
    settings.initialize({}, {}, {
      fs: {
        existsSync: function () {
          return false;
        }
      }
    });
    expect(settings.nightwatchConfigFilePath).to.eql("./conf/nightwatch.json");
  });

  describe("supports debug", function () {
    settings.initialize({
      debug: true
    }, {}, {
      fs: {
        existsSync: function () {
          return true;
        }
      }
    });
    expect(settings.debug).to.eql(true);
  });
});
