"use strict";

/*! Select2 4.0.0 | https://github.com/select2/select2/blob/master/LICENSE.md */

(function () {
  if (jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd) var e = jQuery.fn.select2.amd;return e.define("select2/i18n/ca", [], function () {
    return { errorLoading: function errorLoading() {
        return "La càrrega ha fallat";
      }, inputTooLong: function inputTooLong(e) {
        var t = e.input.length - e.maximum,
            n = "Si us plau, elimina " + t + " car";return t == 1 ? n += "àcter" : n += "àcters", n;
      }, inputTooShort: function inputTooShort(e) {
        var t = e.minimum - e.input.length,
            n = "Si us plau, introdueix " + t + " car";return t == 1 ? n += "àcter" : n += "àcters", n;
      }, loadingMore: function loadingMore() {
        return "Carregant més resultats…";
      }, maximumSelected: function maximumSelected(e) {
        var t = "Només es pot seleccionar " + e.maximum + " element";return e.maximum != 1 && (t += "s"), t;
      }, noResults: function noResults() {
        return "No s'han trobat resultats";
      }, searching: function searching() {
        return "Cercant…";
      } };
  }), { define: e.define, require: e.require };
})();
//# sourceMappingURL=ca.js.map