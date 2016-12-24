/* eslint no-undef: 0, camelcase: 0, no-magic-numbers: 0 */
"use strict";

var tagFilter = require("../lib/tag_filter");

describe("tagFilter", function () {
  it("handle tag strings", function () {
    tagFilter([], "a");
    tagFilter([], "a,b,c");
  });

  it("handle tag arrays", function () {
    tagFilter([], []);
  });
});
