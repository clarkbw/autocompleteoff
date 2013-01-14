
// If we can find a form field with a password input
// then lets turn off the autocomplete for that form
// other forms should be left alone

var mod = require("page-mod").PageMod({
  include: "*",
  attachTo: ["existing", "top", "frame"],
  contentScriptWhen : 'end',
  contentScriptFile: require('self').data.url('main.js')
});

// export this just for the tests, otherwise it can just run
exports.mod = mod;
