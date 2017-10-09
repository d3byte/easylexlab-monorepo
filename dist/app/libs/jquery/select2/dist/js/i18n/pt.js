"use strict";

/*! Select2 4.0.0 | https://github.com/select2/select2/blob/master/LICENSE.md */

(function () {
  if (jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd) var e = jQuery.fn.select2.amd;return e.define("select2/i18n/pt", [], function () {
    return { errorLoading: function errorLoading() {
        return "Os resultados não puderam ser carregados.";
      }, inputTooLong: function inputTooLong(e) {
        var t = e.input.length - e.maximum,
            n = "Por favor apague " + t + " ";return n += t != 1 ? "caracteres" : "carácter", n;
      }, inputTooShort: function inputTooShort(e) {
        var t = e.minimum - e.input.length,
            n = "Introduza " + t + " ou mais caracteres";return n;
      }, loadingMore: function loadingMore() {
        return "A carregar mais resultados…";
      }, maximumSelected: function maximumSelected(e) {
        var t = "Apenas pode seleccionar " + e.maximum + " ";return t += e.maximum != 1 ? "itens" : "item", t;
      }, noResults: function noResults() {
        return "Sem resultados";
      }, searching: function searching() {
        return "A procurar…";
      } };
  }), { define: e.define, require: e.require };
})();
//# sourceMappingURL=pt.js.map