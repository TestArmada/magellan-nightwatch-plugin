/* eslint no-undef: 0, camelcase: 0, no-magic-numbers: 0 */
"use strict";
var chai = require("chai");
var expect = chai.expect;

var Locator = require("../lib/locator");

describe("Locator", function () {
  it("should do toString", function () {
    var l = new Locator("A");
    expect(l.toString()).to.eql("A");
  });
});
