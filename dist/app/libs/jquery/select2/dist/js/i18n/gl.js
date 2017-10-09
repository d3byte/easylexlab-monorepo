"use strict";

/*! Select2 4.0.0 | https://github.com/select2/select2/blob/master/LICENSE.md */

(function () {
  if (jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd) var e = jQuery.fn.select2.amd;return e.define("select2/i18n/gl", [], function () {
    return { inputTooLong: function inputTooLong(e) {
        var t = e.input.length - e.maximum,
            n = "Engada ";return t === 1 ? n += "un carácter" : n += t + " caracteres", n;
      }, inputTooShort: function inputTooShort(e) {
        var t = e.minimum - e.input.length,
            n = "Elimine ";return t === 1 ? n += "un carácter" : n += t + " caracteres", n;
      }, loadingMore: function loadingMore() {
        return "Cargando máis resultados…";
      }, maximumSelected: function maximumSelected(e) {
        var t = "Só pode ";return e.maximum === 1 ? t += "un elemento" : t += e.maximum + " elementos", t;
      }, noResults: function noResults() {
        return "Non se atoparon resultados";
      }, searching: function searching() {
        return "Buscando…";
      } };
  }), { define: e.define, require: e.require };
})();
//# sourceMappingURL=gl.js.map