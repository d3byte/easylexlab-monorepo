"use strict";

/*! Select2 4.0.0 | https://github.com/select2/select2/blob/master/LICENSE.md */

(function () {
  if (jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd) var e = jQuery.fn.select2.amd;return e.define("select2/i18n/pl", [], function () {
    var e = ["znak", "znaki", "znaków"],
        t = ["element", "elementy", "elementów"],
        n = function n(t, _n) {
      if (t === 1) return _n[0];if (t > 1 && t <= 4) return _n[1];if (t >= 5) return _n[2];
    };return { errorLoading: function errorLoading() {
        return "Nie można załadować wyników.";
      }, inputTooLong: function inputTooLong(t) {
        var r = t.input.length - t.maximum;return "Usuń " + r + " " + n(r, e);
      }, inputTooShort: function inputTooShort(t) {
        var r = t.minimum - t.input.length;return "Podaj przynajmniej " + r + " " + n(r, e);
      }, loadingMore: function loadingMore() {
        return "Trwa ładowanie…";
      }, maximumSelected: function maximumSelected(e) {
        return "Możesz zaznaczyć tylko " + e.maximum + " " + n(e.maxiumum, t);
      }, noResults: function noResults() {
        return "Brak wyników";
      }, searching: function searching() {
        return "Trwa wyszukiwanie…";
      } };
  }), { define: e.define, require: e.require };
})();
//# sourceMappingURL=pl.js.map