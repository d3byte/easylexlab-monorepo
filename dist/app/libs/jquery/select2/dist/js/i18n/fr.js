"use strict";

/*! Select2 4.0.0 | https://github.com/select2/select2/blob/master/LICENSE.md */

(function () {
  if (jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd) var e = jQuery.fn.select2.amd;return e.define("select2/i18n/fr", [], function () {
    return { inputTooLong: function inputTooLong(e) {
        var t = e.input.length - e.maximum,
            n = "Supprimez " + t + " caractère";return t !== 1 && (n += "s"), n;
      }, inputTooShort: function inputTooShort(e) {
        var t = e.minimum - e.input.length,
            n = "Saisissez " + t + " caractère";return t !== 1 && (n += "s"), n;
      }, loadingMore: function loadingMore() {
        return "Chargement de résultats supplémentaires…";
      }, maximumSelected: function maximumSelected(e) {
        var t = "Vous pouvez seulement sélectionner " + e.maximum + " élément";return e.maximum !== 1 && (t += "s"), t;
      }, noResults: function noResults() {
        return "Aucun résultat trouvé";
      }, searching: function searching() {
        return "Recherche en cours…";
      } };
  }), { define: e.define, require: e.require };
})();
//# sourceMappingURL=fr.js.map