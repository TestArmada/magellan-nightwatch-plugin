/* eslint no-undef: 0, camelcase: 0, no-magic-numbers: 0 */
"use strict";
var chai = require("chai");
var expect = chai.expect;

var testFramework = require("../index");
testFramework.initialize({
  nightwatch_config: "./test_support/mock_nightwatch_config.json"
});

var getTests = testFramework.iterator;
var tagFilter = testFramework.filters.tag;
var singleFilter = testFramework.filters.test;
var groupFilter = testFramework.filters.group;

var _opts = function () {
  return {
    console: {
      log: function () {}
    }
  };
};

describe("nightwatch support", function () {

  describe("group test filter", function () {
    it("finds a bunch of tests with a group prefix", function () {
      var tests = getTests(_opts());
      var filteredTests = groupFilter(tests, "test_support/mock_nightwatch_tests", _opts());

      expect(filteredTests).to.have.length(3);
    });

    it("finds no tests with a group prefix that matches nothing", function () {
      var tests = getTests(_opts());
      var filteredTests = groupFilter(tests, "nonexistant/path", _opts());

      expect(filteredTests).to.have.length(0);
    });

  });

  describe("single test filter", function () {
    it("finds a single exact test", function () {
      var tests = getTests(_opts());
      var filteredTests = singleFilter(tests,
        "test_support/mock_nightwatch_tests/search_mobile.js", _opts());

      expect(filteredTests).to.have.length(1);
    });

    it("finds no test with exact single test filter if it one doesn't exist", function () {
      var tests = getTests(_opts());
      var filteredTests = singleFilter(tests,
        "test_support/mock_nightwatch_tests/doesntexist.js", _opts());

      expect(filteredTests).to.have.length(0);
    });

  });

  describe("tag filter", function () {

    it("finds tests with a tag filter", function () {
      var tests = getTests(_opts());
      var filteredTests = tagFilter(tests, ["search"], _opts());

      expect(filteredTests).to.have.length(2);
    });

    it("finds fewer tests with a tag filter containing more matched tags", function () {
      var tests = getTests(_opts());
      var filteredTests = tagFilter(tests, ["search", "mobile"], _opts());

      expect(filteredTests).to.have.length(1);
    });

    it("finds no tests with an unmatched tag filter containing some matching tags", function () {
      var tests = getTests(_opts());
      var filteredTests = tagFilter(tests, ["search", "mobile", "abc123"], _opts());

      expect(filteredTests).to.have.length(0);
    });

    it("finds no tests with an unmatched tag filter", function () {
      var tests = getTests(_opts());
      var filteredTests = tagFilter(tests, ["abc123"], _opts());

      expect(filteredTests).to.have.length(0);
    });

  });
});
