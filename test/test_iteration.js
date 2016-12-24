/* eslint no-undef: 0, camelcase: 0, no-magic-numbers: 0 */
"use strict";
var chai = require("chai");
var expect = chai.expect;

var testFramework = require("../index");
testFramework.initialize({
  nightwatch_config: "./test_support/mock_nightwatch_config.json"
});

var _opts = function () {
  return {
    console: {
      log: function () {}
    }
  };
};

var getTests = testFramework.iterator;

describe("nightwatch support", function () {

  describe("test iterator", function () {

    it("finds tests", function () {
      var tests = getTests(_opts());
      expect(tests).to.have.length(3);
    });

  });

});
