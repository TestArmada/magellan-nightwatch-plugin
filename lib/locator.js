var Locator = function (filename) {
  this.filename = filename;
};

Locator.prototype.toString = function () {
  return this.filename;
};

module.exports = Locator;