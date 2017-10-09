"use strict";

/*! Select2 4.0.0 | https://github.com/select2/select2/blob/master/LICENSE.md */

(function () {
  if (jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd) var e = jQuery.fn.select2.amd;return e.define("select2/i18n/et", [], function () {
    return { inputTooLong: function inputTooLong(e) {
        var t = e.input.length - e.maximum,
            n = "Sisesta " + t + " täht";return t != 1 && (n += "e"), n += " vähem", n;
      }, inputTooShort: function inputTooShort(e) {
        var t = e.minimum - e.input.length,
            n = "Sisesta " + t + " täht";return t != 1 && (n += "e"), n += " rohkem", n;
      }, loadingMore: function loadingMore() {
        return "Laen tulemusi…";
      }, maximumSelected: function maximumSelected(e) {
        var t = "Saad vaid " + e.maximum + " tulemus";return e.maximum == 1 ? t += "e" : t += "t", t += " valida", t;
      }, noResults: function noResults() {
        return "Tulemused puuduvad";
      }, searching: function searching() {
        return "Otsin…";
      } };
  }), { define: e.define, require: e.require };
})();
//# sourceMappingURL=et.js.map