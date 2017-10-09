"use strict";

/*! Select2 4.0.0 | https://github.com/select2/select2/blob/master/LICENSE.md */

(function () {
  if (jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd) var e = jQuery.fn.select2.amd;return e.define("select2/i18n/sk", [], function () {
    var e = { 2: function _(e) {
        return e ? "dva" : "dve";
      }, 3: function _() {
        return "tri";
      }, 4: function _() {
        return "štyri";
      } };return { inputTooLong: function inputTooLong(t) {
        var n = t.input.length - t.maximum;return n == 1 ? "Prosím, zadajte o jeden znak menej" : n >= 2 && n <= 4 ? "Prosím, zadajte o " + e[n](!0) + " znaky menej" : "Prosím, zadajte o " + n + " znakov menej";
      }, inputTooShort: function inputTooShort(t) {
        var n = t.minimum - t.input.length;return n == 1 ? "Prosím, zadajte ešte jeden znak" : n <= 4 ? "Prosím, zadajte ešte ďalšie " + e[n](!0) + " znaky" : "Prosím, zadajte ešte ďalších " + n + " znakov";
      }, loadingMore: function loadingMore() {
        return "Loading more results…";
      }, maximumSelected: function maximumSelected(t) {
        return t.maximum == 1 ? "Môžete zvoliť len jednu položku" : t.maximum >= 2 && t.maximum <= 4 ? "Môžete zvoliť najviac " + e[t.maximum](!1) + " položky" : "Môžete zvoliť najviac " + t.maximum + " položiek";
      }, noResults: function noResults() {
        return "Nenašli sa žiadne položky";
      }, searching: function searching() {
        return "Vyhľadávanie…";
      } };
  }), { define: e.define, require: e.require };
})();
//# sourceMappingURL=sk.js.map