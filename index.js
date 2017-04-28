var tagFilter = require("./lib/tag_filter");
var groupFilter = require("./lib/group_filter");
var singleTestFilter = require("./lib/single_test_filter");

var plugin = {
  initialize: function (argv, options) {
    plugin.settings.initialize(argv, options);
  },
  iterator: require("./lib/get_tests"),
  filters: {
    tag: tagFilter,
    tags: tagFilter,
    group: groupFilter,
    test: singleTestFilter
  },
  settings: require("./lib/settings"),
  TestRun: require("./lib/test_run"),
  help: require("./lib/help"),
  getPluginOptions: require("./lib/options"),
  profile: require("./lib/profile")
};

module.exports = plugin;