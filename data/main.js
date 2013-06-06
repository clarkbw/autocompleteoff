/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true,
  strict:true, undef:true, curly:true, browser:true, es5:true,
  indent:2, maxerr:50, devel:true, node:true, boss:true, white:true,
  globalstrict:true, nomen:false, newcap:true*/

/*global MutationObserver:true */

"use strict";

// manipulate the dom Node passed in
function scrub(item) {
  var subitems, j;
  // password inputs inside forms
  if (item.nodeName === "INPUT" && item.getAttribute("type") === "password") {
    item.removeAttribute("autocomplete");
    // look up the tree for the form that provided this password field
    while (item.parentNode) {
      item = item.parentNode;
      if (item.tagName === "FORM") {
        subitems = item.querySelectorAll("input[autocomplete=off]");
        for (j = 0; j < subitems.length; j += 1) {
          subitems[j].removeAttribute("autocomplete");
        }
        break; // escape the while loop
      }
    }
  // forms with password inputs in them
  } else if (item.nodeName === "FORM" && item.querySelectorAll("input[type=password]").length > 0) {
    item.removeAttribute("autocomplete");
    subitems = item.querySelectorAll("input[autocomplete=off]");
    for (j = 0; j < subitems.length; j += 1) {
      subitems[j].removeAttribute("autocomplete");
    }
  }
}
function go() {
  var autos = document.querySelectorAll("[autocomplete=off]"), item, i;
  //console.log("LENGTH", document.querySelectorAll("[autocomplete=off]").length);
  for (i = 0; i < autos.length; i += 1) {
    item = autos.item(i);
    scrub(item);
  }
  // create an observer instance for future changes
  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      var j;
      if (mutation.type === "childList" && mutation.addedNodes !== null) {
        for (j = 0; j < mutation.addedNodes.length; j += 1) {
          scrub(mutation.addedNodes.item(j));
        }
      } else if (mutation.type === "attributes") {
        scrub(mutation.target);
      }
    });
  });

  observer.observe(document.querySelector("body"),
                   { attributes: true, childList: true, characterData: true,
                     subtree : true, attributeFilter : ['autocomplete'] });

  // watch for the unload event and null out our stuff to prevent mem leaks
  window.addEventListener("unload", function ()  { observer.disconnect(); observer = null; });
}

// avoid blocking anything and
// wait 1/2 second before running
window.setTimeout(go, 500);
