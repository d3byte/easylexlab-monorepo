"use strict";

/*! Select2 4.0.0 | https://github.com/select2/select2/blob/master/LICENSE.md */

(function () {
  if (jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd) var e = jQuery.fn.select2.amd;return e.define("select2/i18n/hu", [], function () {
    return { inputTooLong: function inputTooLong(e) {
        var t = e.input.length - e.maximum;return "Túl hosszú. " + t + " karakterrel több, mint kellene.";
      }, inputTooShort: function inputTooShort(e) {
        var t = e.minimum - e.input.length;return "Túl rövid. Még " + t + " karakter hiányzik.";
      }, loadingMore: function loadingMore() {
        return "Töltés…";
      }, maximumSelected: function maximumSelected(e) {
        return "Csak " + e.maximum + " elemet lehet kiválasztani.";
      }, noResults: function noResults() {
        return "Nincs találat.";
      }, searching: function searching() {
        return "Keresés…";
      } };
  }), { define: e.define, require: e.require };
})();
//# sourceMappingURL=hu.js.map