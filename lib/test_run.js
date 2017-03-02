/*
  Provide support for running a nightwatch.js test
*/
var Q = require("q");
var _ = require("lodash");
var path = require("path");

var settings = require("./settings");
var nightwatchConfigPath;
var rewriteNightwatchConfig = require("./rewrite_config");

var NightwatchTestrun = function (options) {
  _.extend(this, options);
  nightwatchConfigPath = path.normalize(settings.nightwatchConfigFilePath);
};

NightwatchTestrun.prototype.enableExecutor = function (executor) {
  this.providerSettings = executor.getNightwatchConfig(this.profile, executor.getConfig());
  this._createTemporaryConfigFile();
};

// clone a custom configuration just for this test run
NightwatchTestrun.prototype._createTemporaryConfigFile = function () {
  var nightwatchConfigOptions = {};
  nightwatchConfigOptions.executor = this.profile.nightwatchEnv;
  nightwatchConfigOptions.executorCapabilities = this.providerSettings;
  
  nightwatchConfigOptions.localSeleniumPort = this.seleniumPort;
  nightwatchConfigOptions.localSeleniumVersion = settings.seleniumServerVersion;
  nightwatchConfigOptions.isChromedriverPresent = settings.isChromedriverPresent;
  nightwatchConfigOptions.isPhantomjsPresent = settings.isPhantomjsPresent;
  nightwatchConfigOptions.syncBrowsers = settings.syncBrowsers;
  // throws exceptions
  this.configPath = rewriteNightwatchConfig(nightwatchConfigPath, this.tempAssetPath, nightwatchConfigOptions);
};

// return the command line path to the test framework binary
NightwatchTestrun.prototype.getCommand = function () {
  return "./node_modules/nightwatch/bin/nightwatch";
};

// return the environment
NightwatchTestrun.prototype.getEnvironment = function (env) {
  return _.extend({}, env);
};

NightwatchTestrun.prototype.getArguments = function () {
  var args = [
    "--mocking_port=" + this.mockingPort,
    // Nightwatch gets its sauce browser setting via a nightwatch configuration file
    // If we're not in sauce mode, we just pass in a browserId directly (i.e. phantomjs, chrome, firefox, etc)
    "--env=" + this.profile.nightwatchEnv,
    "--test=" + this.locator.filename,
    // NOTE: the --worker=1 argument tells magellan-nightwatch that it's in
    // "worker mode" and should send IPC messages back to magellan.
    "--worker=1",
    "--config=" + this.configPath
  ];

  if (settings.aggregateScreenshots) {
    args.push("--screenshot_path=" + this.tempAssetPath);
  }

  if (settings.debug) {
    args.push("--verbose");
  }

  return args;
};

module.exports = NightwatchTestrun;
