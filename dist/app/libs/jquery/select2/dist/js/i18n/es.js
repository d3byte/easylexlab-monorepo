"use strict";

/*! Select2 4.0.0 | https://github.com/select2/select2/blob/master/LICENSE.md */

(function () {
  if (jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd) var e = jQuery.fn.select2.amd;return e.define("select2/i18n/es", [], function () {
    return { errorLoading: function errorLoading() {
        return "La carga falló";
      }, inputTooLong: function inputTooLong(e) {
        var t = e.input.length - e.maximum,
            n = "Por favor, elimine " + t + " car";return t == 1 ? n += "ácter" : n += "acteres", n;
      }, inputTooShort: function inputTooShort(e) {
        var t = e.minimum - e.input.length,
            n = "Por favor, introduzca " + t + " car";return t == 1 ? n += "ácter" : n += "acteres", n;
      }, loadingMore: function loadingMore() {
        return "Cargando más resultados…";
      }, maximumSelected: function maximumSelected(e) {
        var t = "Sólo puede seleccionar " + e.maximum + " elemento";return e.maximum != 1 && (t += "s"), t;
      }, noResults: function noResults() {
        return "No se encontraron resultados";
      }, searching: function searching() {
        return "Buscando…";
      } };
  }), { define: e.define, require: e.require };
})();
//# sourceMappingURL=es.js.map