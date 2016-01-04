var path = require("path");

// Filter by one exact relative filename match, eg:
// --test=path/to/exact/test/filename.js
module.exports = function(files, filename) {
  console.log("Using test filter: ", filename);

  return files.filter(function(f) {
    //
    // TODO: instead check if this is an instance of a Path object, not "mocha" substring check
    //
    if (settings.framework.indexOf("mocha") > -1) {
      if (f.path === filename) {
        return true;
      }
    } else {
      if (path.resolve(f.trim()) === path.resolve(filename.trim())) {
        return true;
      }
    }
  });
};