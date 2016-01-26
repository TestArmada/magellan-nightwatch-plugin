var path = require("path");

module.exports = function (pkg, root) {
  var options = {};
  // get exact selenium-server version
  var seleniumServerVersion;
  if (pkg.dependencies["selenium-server"]) {
    seleniumServerVersion = require(path.join(root, "/node_modules/selenium-server/package.json")).version;
  }

  return {
    seleniumServerVersion : seleniumServerVersion,
    isChromedriverPresent: pkg.dependencies["chromedriver"] !== undefined,
    isPhantomjsPresent: pkg.dependencies["phantomjs"] !== undefined
  };
};
