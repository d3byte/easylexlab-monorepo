"use strict";

/*! Select2 4.0.0 | https://github.com/select2/select2/blob/master/LICENSE.md */

(function () {
  if (jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd) var e = jQuery.fn.select2.amd;return e.define("select2/i18n/fi", [], function () {
    return { inputTooLong: function inputTooLong(e) {
        var t = e.input.length - e.maximum;return "Ole hyvä ja anna " + t + " merkkiä vähemmän";
      }, inputTooShort: function inputTooShort(e) {
        var t = e.minimum - e.input.length;return "Ole hyvä ja anna " + t + " merkkiä lisää";
      }, loadingMore: function loadingMore() {
        return "Ladataan lisää tuloksia…";
      }, maximumSelected: function maximumSelected(e) {
        return "Voit valita ainoastaan " + e.maximum + " kpl";
      }, noResults: function noResults() {
        return "Ei tuloksia";
      }, searching: function searching() {} };
  }), { define: e.define, require: e.require };
})();
//# sourceMappingURL=fi.js.map