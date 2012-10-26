const main = require("main");

exports.test_test_run = function(test) {
  test.pass("Unit test running!");
};

exports.test_id = function(test) {
  test.assert(require("self").id.length > 0);
};

exports.test_open_tab = function(test) {
  const tabs = require("tabs");
  tabs.open({
    url: require("self").data.url("test-page.html"),
    onReady: function(tab) {
      test.assertEqual(tab.document.querySelectorAll("[autocomplete=off]"), null);
      test.done();
    }
  });
  test.waitUntilDone(20000);
};
