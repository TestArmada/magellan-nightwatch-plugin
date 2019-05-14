var fs = require("fs");
var path  = require("path");
var settings = require("./settings");
var clc = require("cli-color");
var Locator = require("./locator");
var logger = require("./logger");

var filterFiles = function (files) {
  return files.filter(function (f) {
    return (f.indexOf(".js") === f.length - 3);
  }).map(function (f) {
    return f.trim();
  });
};

var filterFolders = function (folders) {
  return folders.filter(function (f) {
    return (f);
  });
};

module.exports = function () {
  var nightwatchConfigFilePath = settings.nightwatchConfigFilePath;
  var nightwatchConfig;

  try {
    nightwatchConfig = require(path.resolve(nightwatchConfigFilePath));
    logger.log("test iterator found nightwatch configuration at: " + nightwatchConfigFilePath);
  } catch (err) {
    throw new Error("Magellan-nightwatch test iterator cannot read nightwatch configuration: " + err.toString());
  }

  if (!nightwatchConfig.src_folders) {
    throw new Error("Magellan-nightwatch test iterator cannot find tests: src_folders in nightwatch configuration is missing");
  }

  if (nightwatchConfig.src_folders.length === 0) {
    throw new Error("Magellan-nightwatch test iterator cannot find tests: src_folders in nightwatch configuration is present, but empty");
  }

  var srcFolders = nightwatchConfig.src_folders;

  if (srcFolders.length > 0 && nightwatchConfig.check_subfolders) {
    var allFolders = [];
    srcFolders.forEach(function (folder) {
      var p = path.normalize(folder);
      var folders = fs.readdirSync(p);

      if (folders.length > 0) {
        var additionalFolders = filterFolders(folders.map(function (f) {
          if (f.indexOf(".") === -1) {
            if (nightwatchConfig.ignore_folders) {
              if (!nightwatchConfig.ignore_folders.includes(f)) {
                return path.normalize(folder) + "/" + f;
              }
            } else {
              return path.normalize(folder) + "/" + f;
            }
          }
        }));
        allFolders = allFolders.concat(additionalFolders);
      }
    });
    srcFolders = allFolders;
  }

  var allFiles = [];
  srcFolders.forEach(function (folder) {
    var p = path.normalize(folder);
    logger.log("Scanning " + p + " for test files ...");
    var files = fs.readdirSync(p);

    if (files.length > 0) {
      var additionalFiles = filterFiles(files.map(function (f) {
        return path.normalize(folder) + "/" + f;
      }));
      if (additionalFiles.length > 0 ) {
        logger.log(clc.green("Found " + additionalFiles.length + " test files in " + p));
      } else {
        logger.warn(clc.yellow("Found no test files in " + p));
      }
      allFiles = allFiles.concat(additionalFiles);
    }
  });

  return allFiles.map(function (filename) {
    return new Locator(filename);
  });
};