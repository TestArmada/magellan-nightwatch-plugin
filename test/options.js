/* eslint no-undef: 0, camelcase: 0, no-magic-numbers: 0 */
"use strict";
var chai = require("chai");
var expect = chai.expect;

var options = require("../lib/options");

describe("options", function () {
  describe("support seleniumServerVersion", function () {
    expect(options({
      rootPackage: {
        dependencies: {
          "selenium-server": "foo",
          chromedriver: 1,
          phantomjs: 20
        }
      },
      rootWorkingDirectory: "bar"
    }, {
      require: function () {
        return {
          version: 10
        };
      }
    })).to.eql({
      seleniumServerVersion: 10,
      isChromedriverPresent: true,
      isPhantomjsPresent: true
    });
  });

  describe("support without seleniumServerVersion", function () {
    var a = options({
      rootPackage: {
        dependencies: {
          chromedriver: 1,
          phantomjs: 20
        }
      },
      rootWorkingDirectory: "bar"
    }, {
      require: function () {
        return {
          version: 10
        };
      }
    });
    expect(a).to.eql({
      seleniumServerVersion: undefined,
      isChromedriverPresent: true,
      isPhantomjsPresent: true
    });
  });
});
