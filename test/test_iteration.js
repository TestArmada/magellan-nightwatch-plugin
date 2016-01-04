var chai = require("chai");
var expect = chai.expect;

var testFramework = require("../index");
testFramework.initialize({
  nightwatch_config: "./test_support/mock_nightwatch_config.json"
});

var getTests = testFramework.iterator;
var tagFilter = testFramework.filters.tag;

describe("nightwatch support", function () {

  describe("test iterator", function () {

    it("finds tests", function () {
      var tests = getTests();
      expect(tests).to.have.length(3);
    });

  });

});