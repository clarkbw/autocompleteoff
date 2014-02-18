/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

 /*jshint esnext:true, node:true, newcap:false */

 "use strict";

var mod = require("page-mod").PageMod({
  include: "*",
  attachTo: ["existing", "top", "frame"],
  contentScriptWhen : 'end',
  contentScriptFile: require('self').data.url('main.js')
});

require("sdk/preferences/service").set("signon.overrideAutocomplete", true);

// export this just for the tests, otherwise it can just run
exports.mod = mod;
