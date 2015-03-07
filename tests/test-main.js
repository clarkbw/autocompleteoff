/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

/*jshint esnext:true, node:true,
  globalstrict:true, nomen:false, newcap:true*/

'use strict';

var tabs = require('sdk/tabs');

var TEST_FILE = 'test-main.js';
var HTML_FILE = 'static/test-page.html';
var HTML_URI = module.uri.replace(TEST_FILE, HTML_FILE);

var main = require('main');

// shim in the resource URL to the include options
// this needs to be a regex as well so it's evaluated before the page-mod looks
// for http/ftp style urls
main.mod.include.add(new RegExp(HTML_URI));

exports.testOpenTab = function (assert, done) {
  tabs.on('ready', function onReady(tab) {
    assert.equal(tab.url, HTML_URI, 'tab url is not correct');
    tab.attach({
      // we use a timeout here to ensure that our page-mod could run before we report back results
      contentScript: 'window.setTimeout(function run() { ' +
                      'var elements = document.querySelectorAll("[autocomplete=off]");' +
                      'Array.prototype.forEach.call(elements, function(el, i){' +
                      ' console.log(i, el.id);' +
                      '});' +
                      'self.postMessage(document.querySelectorAll("[autocomplete=off]").length);' +
                      '}, 3 * 1000);',
      onMessage: function (message) {
        assert.equal(message, 1, 'should have only found 1 item with the autocomplete=off result');
        tab.close();
        done();
      }
    });
  });
  tabs.open(HTML_URI);
};

exports.testPref = function (assert) {
  assert.ok(require('sdk/preferences/service').get('signon.overrideAutocomplete'));
};

require('test').run(exports);
