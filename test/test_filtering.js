var chai = require("chai");
var expect = chai.expect;

var testFramework = require("../index");
testFramework.initialize({
  nightwatch_config: "./test_support/mock_nightwatch_config.json"
});

var getTests = testFramework.iterator;
var tagFilter = testFramework.filters.tag;

describe("nightwatch support", function () {

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