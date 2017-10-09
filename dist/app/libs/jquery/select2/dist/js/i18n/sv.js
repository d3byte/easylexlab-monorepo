"use strict";

/*! Select2 4.0.0 | https://github.com/select2/select2/blob/master/LICENSE.md */

(function () {
  if (jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd) var e = jQuery.fn.select2.amd;return e.define("select2/i18n/sv", [], function () {
    return { errorLoading: function errorLoading() {
        return "Resultat kunde inte laddas.";
      }, inputTooLong: function inputTooLong(e) {
        var t = e.input.length - e.maximum,
            n = "Vänligen sudda ut " + t + " tecken";return n;
      }, inputTooShort: function inputTooShort(e) {
        var t = e.minimum - e.input.length,
            n = "Vänligen skriv in " + t + " eller fler tecken";return n;
      }, loadingMore: function loadingMore() {
        return "Laddar fler resultat…";
      }, maximumSelected: function maximumSelected(e) {
        var t = "Du kan max välja " + e.maximum + " element";return t;
      }, noResults: function noResults() {
        return "Inga träffar";
      }, searching: function searching() {
        return "Söker…";
      } };
  }), { define: e.define, require: e.require };
})();
//# sourceMappingURL=sv.js.map