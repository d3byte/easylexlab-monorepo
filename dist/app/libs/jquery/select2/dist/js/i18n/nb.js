"use strict";

/*! Select2 4.0.0 | https://github.com/select2/select2/blob/master/LICENSE.md */

(function () {
  if (jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd) var e = jQuery.fn.select2.amd;return e.define("select2/i18n/nb", [], function () {
    return { inputTooLong: function inputTooLong(e) {
        var t = e.input.length - e.maximum;return "Vennligst fjern " + t + " tegn";
      }, inputTooShort: function inputTooShort(e) {
        var t = e.minimum - e.input.length,
            n = "Vennligst skriv inn ";return t > 1 ? n += " flere tegn" : n += " tegn til", n;
      }, loadingMore: function loadingMore() {
        return "Laster flere resultater…";
      }, maximumSelected: function maximumSelected(e) {
        return "Du kan velge maks " + e.maximum + " elementer";
      }, noResults: function noResults() {
        return "Ingen treff";
      }, searching: function searching() {
        return "Søker…";
      } };
  }), { define: e.define, require: e.require };
})();
//# sourceMappingURL=nb.js.map