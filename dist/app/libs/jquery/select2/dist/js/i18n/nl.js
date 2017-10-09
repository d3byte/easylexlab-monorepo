"use strict";

/*! Select2 4.0.0 | https://github.com/select2/select2/blob/master/LICENSE.md */

(function () {
  if (jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd) var e = jQuery.fn.select2.amd;return e.define("select2/i18n/nl", [], function () {
    return { errorLoading: function errorLoading() {
        return "De resultaten konden niet worden geladen.";
      }, inputTooLong: function inputTooLong(e) {
        var t = e.input.length - e.maximum,
            n = "Gelieve " + t + " karakters te verwijderen";return n;
      }, inputTooShort: function inputTooShort(e) {
        var t = e.minimum - e.input.length,
            n = "Gelieve " + t + " of meer karakters in te voeren";return n;
      }, loadingMore: function loadingMore() {
        return "Meer resultaten laden…";
      }, maximumSelected: function maximumSelected(e) {
        var t = "Er kunnen maar " + e.maximum + " item";return e.maximum != 1 && (t += "s"), t += " worden geselecteerd", t;
      }, noResults: function noResults() {
        return "Geen resultaten gevonden…";
      }, searching: function searching() {
        return "Zoeken…";
      } };
  }), { define: e.define, require: e.require };
})();
//# sourceMappingURL=nl.js.map