var path = require("path");
var logger = require("./logger");
var fs = require("fs");

module.exports = function(tests, filename) {
  logger.log("Using nightwatch test file filter: " + filename);
  var filename = JSON.parse(
    fs.readFileSync(path.resolve(filename.trim()), "utf8")
  );

  return tests.filter(function(test) {
    for (var i = 0; i < filename.length; i++) {
      if (
        path.resolve(test.filename.trim()) === path.resolve(filename[i].trim())
      ) {
        return true;
      }
    }
  });
};
