// Filter by "group", which really means filename prefix, i.e:
//
//  --group=test/groupname
//  --group=test/abc/xyz/Regression
//  --group=test/abc/xyz/Smoke
//

var logger = require("./logger");

module.exports = function (tests, partialFilename) {
  logger.log("Using group filter: " + partialFilename);

  return tests.filter(function (f) {
    var pass = true;

    if (partialFilename) {
      if (typeof partialFilename === "string") {
        partialFilename = [partialFilename];
      }
      pass = partialFilename.some(function (pfn) {
        return f.filename.indexOf(pfn) > -1;
      });
    }

    return (f.filename.indexOf(".js") === f.filename.length - 3) && pass;
  });
};