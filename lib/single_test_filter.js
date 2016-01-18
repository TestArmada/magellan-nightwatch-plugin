var path = require("path");

// Filter by one exact relative filename match, eg:
// --test=path/to/exact/test/filename.js
module.exports = function(tests, filename) {
  console.log("Using nightwatch test filter: ", filename);

  return tests.filter(function(test) {
    if (path.resolve(test.filename.trim()) === path.resolve(filename.trim())) {
      return true;
    }
  });
};