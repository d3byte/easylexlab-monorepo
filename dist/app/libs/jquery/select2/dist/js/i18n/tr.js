"use strict";

/*! Select2 4.0.0 | https://github.com/select2/select2/blob/master/LICENSE.md */

(function () {
  if (jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd) var e = jQuery.fn.select2.amd;return e.define("select2/i18n/tr", [], function () {
    return { inputTooLong: function inputTooLong(e) {
        var t = e.input.length - e.maximum,
            n = t + " karakter daha girmelisiniz";return n;
      }, inputTooShort: function inputTooShort(e) {
        var t = e.minimum - e.input.length,
            n = "En az " + t + " karakter daha girmelisiniz";return n;
      }, loadingMore: function loadingMore() {
        return "Daha fazla…";
      }, maximumSelected: function maximumSelected(e) {
        var t = "Sadece " + e.maximum + " seçim yapabilirsiniz";return t;
      }, noResults: function noResults() {
        return "Sonuç bulunamadı";
      }, searching: function searching() {
        return "Aranıyor…";
      } };
  }), { define: e.define, require: e.require };
})();
//# sourceMappingURL=tr.js.map