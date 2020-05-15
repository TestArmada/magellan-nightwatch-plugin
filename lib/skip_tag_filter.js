var logger = require("./logger"),
  _ = require("lodash"),
  isMatched = require("./is_matched");


module.exports = function (tests, tags) {
  // Tidy up tag input. If we have a comma-delimited list, tokenize and clean it up
  if (typeof tags === "string") {
    tags = tags.trim();

    if (tags.indexOf(",") > -1) {
      tags = tags.trim().split(",").map(function (tag) {
        return tag.trim();
      });
    } else {
      tags = [tags];
    }
  }

  // If tags are empty or malformed, ignore them
  if (!_.isArray(tags) || tags.length === 0) {
    logger.log("Nightwatch tag filter input tags are empty, returning all tests.");
    return tests;
  }

  logger.log("Using nightwatch skiptags filter with tags: " + tags);
  return tests.filter(function (test) {
    return !isMatched(tags, test.filename);
  });
};
