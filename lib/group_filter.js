/* eslint no-magic-numbers: 0, no-extra-parens: 0 */
"use strict";
// Filter by "group", which really means filename prefix, i.e:
//
//  --group=test/groupname
//  --group=test/abc/xyz/Regression
//  --group=test/abc/xyz/Smoke
//
module.exports = function (tests, partialFilename, opts) {
  var options = {
    console: console
  };
  if (opts && opts.console) {
    options.console = opts.console;
  }
  options.console.log("Using group filter: ", partialFilename);

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
