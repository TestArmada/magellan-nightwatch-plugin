/* eslint global-require: 0 */
"use strict";
var path = require("path");

module.exports = function (options, opts) {
  var _opts = {
    require: require
  };
  /* istanbul ignore else */
  if (opts && opts.require) {
    _opts.require = opts.require;
  }
  /*
  {
    rootPackage: pkg,
    // Let's also make a note that this isn't the working directory for the *build* (that's the
    // testRun.tempAssetPath property), but rather for the whole project.
    rootWorkingDirectory: process.cwd()
  }
  */
  // get exact selenium-server version
  var seleniumServerVersion;
  if (options.rootPackage.dependencies["selenium-server"]) {
    seleniumServerVersion = _opts.require(path.join(options.rootWorkingDirectory,
      "/node_modules/selenium-server/package.json")).version;
  }

  return {
    seleniumServerVersion: seleniumServerVersion,
    isChromedriverPresent: options.rootPackage.dependencies.chromedriver !== undefined,
    isPhantomjsPresent: options.rootPackage.dependencies.phantomjs !== undefined
  };
};
