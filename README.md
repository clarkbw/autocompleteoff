This is a Firefox add-on which allows Firefox to save all your passwords even if a website doesn't support that.  Essentially the add-on removes the `autocomplete=off` attribute from any forms or inputs which are designed for login while not affecting others.   

The add-on has been built with a recent version of the [mozilla-addon-sdk](https://github.com/mozilla/addon-sdk/).  The [test page](/clarkbw/autocompleteoff/blob/master/tests/static/test-page.html) shows what kind of forms or inputs will be affected, only the last input remains untouched.
