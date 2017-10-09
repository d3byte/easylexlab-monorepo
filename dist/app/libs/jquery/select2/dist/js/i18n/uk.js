"use strict";

/*! Select2 4.0.0 | https://github.com/select2/select2/blob/master/LICENSE.md */

(function () {
  if (jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd) var e = jQuery.fn.select2.amd;return e.define("select2/i18n/uk", [], function () {
    function e(e, t, n, r) {
      return e % 100 > 10 && e % 100 < 15 ? r : e % 10 === 1 ? t : e % 10 > 1 && e % 10 < 5 ? n : r;
    }return { errorLoading: function errorLoading() {
        return "Неможливо завантажити результати";
      }, inputTooLong: function inputTooLong(t) {
        var n = t.input.length - t.maximum;return "Будь ласка, видаліть " + n + " " + e(t.maximum, "літеру", "літери", "літер");
      }, inputTooShort: function inputTooShort(e) {
        var t = e.minimum - e.input.length;return "Будь ласка, введіть " + t + " або більше літер";
      }, loadingMore: function loadingMore() {
        return "Завантаження інших результатів…";
      }, maximumSelected: function maximumSelected(t) {
        return "Ви можете вибрати лише " + t.maximum + " " + e(t.maximum, "пункт", "пункти", "пунктів");
      }, noResults: function noResults() {
        return "Нічого не знайдено";
      }, searching: function searching() {
        return "Пошук…";
      } };
  }), { define: e.define, require: e.require };
})();
//# sourceMappingURL=uk.js.map