/* eslint no-invalid-this: 0 */
"use strict";
var Locator = function (filename) {
  this.filename = filename;
};

Locator.prototype.toString = function () {
  return this.filename;
};

module.exports = Locator;
