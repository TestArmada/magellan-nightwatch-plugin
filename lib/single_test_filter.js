var path = require("path");

// Filter by one exact relative filename match, eg:
// --test=path/to/exact/test/filename.js
module.exports = function(files, filename) {
  console.log("Using nightwatch test filter: ", filename);

  return files.filter(function(f) {
    if (path.resolve(f.trim()) === path.resolve(filename.trim())) {
      return true;
    }
  });
};