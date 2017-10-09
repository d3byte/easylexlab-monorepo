"use strict";

/*! Select2 4.0.0 | https://github.com/select2/select2/blob/master/LICENSE.md */

(function () {
  if (jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd) var e = jQuery.fn.select2.amd;return e.define("select2/i18n/lt", [], function () {
    function e(e, t, n, r) {
      return e % 100 > 9 && e % 100 < 21 || e % 10 === 0 ? e % 10 > 1 ? n : r : t;
    }return { inputTooLong: function inputTooLong(t) {
        var n = t.input.length - t.maximum,
            r = "Pašalinkite " + n + " simbol";return r += e(n, "ių", "ius", "į"), r;
      }, inputTooShort: function inputTooShort(t) {
        var n = t.minimum - t.input.length,
            r = "Įrašykite dar " + n + " simbol";return r += e(n, "ių", "ius", "į"), r;
      }, loadingMore: function loadingMore() {
        return "Kraunama daugiau rezultatų…";
      }, maximumSelected: function maximumSelected(t) {
        var n = "Jūs galite pasirinkti tik " + t.maximum + " element";return n += e(t.maximum, "ų", "us", "ą"), n;
      }, noResults: function noResults() {
        return "Atitikmenų nerasta";
      }, searching: function searching() {
        return "Ieškoma…";
      } };
  }), { define: e.define, require: e.require };
})();
//# sourceMappingURL=lt.js.map