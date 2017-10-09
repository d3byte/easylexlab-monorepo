"use strict";

/*! Select2 4.0.0 | https://github.com/select2/select2/blob/master/LICENSE.md */

(function () {
  if (jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd) var e = jQuery.fn.select2.amd;return e.define("select2/i18n/da", [], function () {
    return { errorLoading: function errorLoading() {
        return "The results could not be loaded.";
      }, inputTooLong: function inputTooLong(e) {
        var t = e.input.length - e.maximum,
            n = "Angiv venligst " + t + " tegn mindre";return n;
      }, inputTooShort: function inputTooShort(e) {
        var t = e.minimum - e.input.length,
            n = "Angiv venligst " + t + " tegn mere";return n;
      }, loadingMore: function loadingMore() {
        return "Indlæser flere resultater…";
      }, maximumSelected: function maximumSelected(e) {
        var t = "Du kan kun vælge " + e.maximum + " emne";return e.maximum != 1 && (t += "r"), t;
      }, noResults: function noResults() {
        return "Ingen resultater fundet";
      }, searching: function searching() {
        return "Søger…";
      } };
  }), { define: e.define, require: e.require };
})();
//# sourceMappingURL=da.js.map