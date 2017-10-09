"use strict";

/*! Select2 4.0.0 | https://github.com/select2/select2/blob/master/LICENSE.md */

(function () {
  if (jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd) var e = jQuery.fn.select2.amd;return e.define("select2/i18n/az", [], function () {
    return { inputTooLong: function inputTooLong(e) {
        var t = e.input.length - e.maximum;return t + " simvol silin";
      }, inputTooShort: function inputTooShort(e) {
        var t = e.minimum - e.input.length;return t + " simvol daxil edin";
      }, loadingMore: function loadingMore() {
        return "Daha çox nəticə yüklənir…";
      }, maximumSelected: function maximumSelected(e) {
        return "Sadəcə " + e.maximum + " element seçə bilərsiniz";
      }, noResults: function noResults() {
        return "Nəticə tapılmadı";
      }, searching: function searching() {
        return "Axtarılır…";
      } };
  }), { define: e.define, require: e.require };
})();
//# sourceMappingURL=az.js.map