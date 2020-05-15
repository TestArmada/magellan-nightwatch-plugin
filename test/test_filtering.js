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
var fileFilter = testFramework.filters.testFile;
var skipTagFilter = testFramework.filters.skiptag;

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

    it("finds two single exact tests", function () {
      var tests = getTests();
      var filteredTests = singleFilter(tests, ["test_support/mock_nightwatch_tests/search.js","test_support/mock_nightwatch_tests/search_mobile.js"]);

      expect(filteredTests).to.have.length(2);
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

  describe("skiptag filter", function () {
    it("skips tests with a skiptag filter", function () {
      var tests = getTests();
      var filteredTests = skipTagFilter(tests, ["wiki"]);

      expect(filteredTests).to.have.length(2);
    });

    it("skips no tests with an unmatched tag filter", function () {
      var tests = getTests();
      var filteredTests = skipTagFilter(tests, ["xyz000"]);

      expect(filteredTests).to.have.length(3);
    });

    it("skips tags in combination with a tag filter", function () {
      var tests = getTests();
      var filteredTests = tagFilter(tests, ["search"]);
      var skipTests = skipTagFilter(filteredTests, ["mobile"]);

      expect(filteredTests).to.have.length(2);
      expect(skipTests).to.have.length(1);
    })
  });

  describe("file test filter", function () {
    it("finds two single exact tests", function () {
      var tests = getTests();
      var filteredTests = fileFilter(tests, "test/tests.json");

      expect(filteredTests).to.have.length(2);
    });
  });

});