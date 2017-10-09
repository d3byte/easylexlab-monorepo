"use strict";

/*! Select2 4.0.0 | https://github.com/select2/select2/blob/master/LICENSE.md */

(function () {
  if (jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd) var e = jQuery.fn.select2.amd;return e.define("select2/i18n/ro", [], function () {
    return { inputTooLong: function inputTooLong(e) {
        var t = e.input.length - e.maximum,
            n = "Vă rugăm să introduceți mai puțin de " + t;return n += " caracter", n !== 1 && (n += "e"), n;
      }, inputTooShort: function inputTooShort(e) {
        var t = e.minimum - e.input.length,
            n = "Vă rugăm să introduceți incă " + t;return n += " caracter", n !== 1 && (n += "e"), n;
      }, loadingMore: function loadingMore() {
        return "Se încarcă…";
      }, maximumSelected: function maximumSelected(e) {
        var t = "Aveți voie să selectați cel mult " + e.maximum;return t += " element", t !== 1 && (t += "e"), t;
      }, noResults: function noResults() {
        return "Nu a fost găsit nimic";
      }, searching: function searching() {
        return "Căutare…";
      } };
  }), { define: e.define, require: e.require };
})();
//# sourceMappingURL=ro.js.map