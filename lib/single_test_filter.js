var path = require("path");
var logger = require("./logger");

// Filter by one exact relative filename match, eg:
// --test=path/to/exact/test/filename.js
module.exports = function (tests, filename) {
  logger.log("Using nightwatch test filter: " + filename);

  return tests.filter(function (test) {
    if(filename instanceof Array){
      for(var i=0;i<filename.length;i++){
        if (path.resolve(test.filename.trim()) === path.resolve(filename[i].trim())) {
          return true;
        }
      }
    }else{
      if (path.resolve(test.filename.trim()) === path.resolve(filename.trim())) {
        return true;
      }
    }
  });
};