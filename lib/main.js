
// If we can find a form field with a password input
// then lets turn off the autocomplete for that form
// other forms should be left alone

require("page-mod").PageMod({
  include: "*",
  contentScript: 'var forms = document.querySelectorAll("[autocomplete=off]");' +
                 'for (var i in forms) { ' +
                    'if (forms[i].querySelector("input[type=password]")) { ' +
                      'console.log(forms[i].querySelector("input[type=password]"));' +
                      'forms[i].removeAttribute("autocomplete");' +
                    ' } ' +
                 '}'
});
