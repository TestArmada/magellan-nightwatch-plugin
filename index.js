var tagFilter = require("./lib/tag_filter");

var plugin = {
  initialize: function (argv) {
    plugin.settings.initialize(argv);
  },
  iterator: require("./lib/get_tests"),
  filters: {
    tag: tagFilter,
    tags: tagFilter

    /*
    TODO

    group: groupFilter,
    test: singleTestFilter
    */
  },
  settings: require("./lib/settings"),
  TestRun: require("./lib/test_run")
};

module.exports = plugin;