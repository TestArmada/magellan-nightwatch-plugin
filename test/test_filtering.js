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

describe("nightwatch support", function () {

  describe("group test filter", function () {
    it("finds a bunch of tests with a group prefix", function () {
      var tests = getTests();
      var filteredTests = groupFilter(tests, "test_support/mock_nightwatch_tests");

      expect(filteredTests).to.have.length(3);
    });

    it("finds no tests with a group prefix that matches nothing", function () {
      var tests = getTests();
      var filteredTests = groupFilter(tests, "nonexistant/path");

      expect(filteredTests).to.have.length(0);
    });

  });


  describe("single test filter", function () {
    it("finds a single exact test", function () {
      var tests = getTests();
      var filteredTests = singleFilter(tests, "test_support/mock_nightwatch_tests/search_mobile.js");

      expect(filteredTests).to.have.length(1);
    });

    it("finds no test with exact single test filter if it one doesn't exist", function () {
      var tests = getTests();
      var filteredTests = singleFilter(tests, "test_support/mock_nightwatch_tests/doesntexist.js");

      expect(filteredTests).to.have.length(0);
    });

  });

  describe("tag filter", function () {

    it("finds tests with a tag filter", function () {
      var tests = getTests();
      var filteredTests = tagFilter(tests, ["search"]);

      expect(filteredTests).to.have.length(2);
    });

    it("finds fewer tests with a tag filter containing more matched tags", function () {
      var tests = getTests();
      var filteredTests = tagFilter(tests, ["search","mobile"]);

      expect(filteredTests).to.have.length(1);
    });

    it("finds no tests with an unmatched tag filter containing some matching tags", function () {
      var tests = getTests();
      var filteredTests = tagFilter(tests, ["search","mobile","abc123"]);

      expect(filteredTests).to.have.length(0);
    });

    it("finds no tests with an unmatched tag filter", function () {
      var tests = getTests();
      var filteredTests = tagFilter(tests, ["abc123"]);

      expect(filteredTests).to.have.length(0);
    });

  });

});