
// If we can find a form field with a password input
// then lets turn off the autocomplete for that form
// other forms should be left alone

var mod = require("page-mod").PageMod({
  include: "*",
  attachTo: ["existing", "top", "frame"],
  contentScriptWhen : 'ready',
  contentScript: 'var autos = document.querySelectorAll("[autocomplete=off]"), item;' +
                 'for (var i = 0; i < autos.length; i += 1) { ' +
                    'item = autos.item(i);' +
                    'if (item.nodeName === "INPUT" && ' +
                        'item.getAttribute("type") === "password") { ' +
                      'item.removeAttribute("autocomplete");' +
                    '} else if (item.nodeName === "FORM" && ' +
                               'item.querySelectorAll("input[type=password]").length > 0) { ' +
                      'item.removeAttribute("autocomplete"); ' +
                    '} ' +
                 '}'
});

// export this just for the tests, otherwise it can just run
exports.mod = mod;
