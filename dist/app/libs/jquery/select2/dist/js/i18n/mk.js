"use strict";

/*! Select2 4.0.0 | https://github.com/select2/select2/blob/master/LICENSE.md */

(function () {
  if (jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd) var e = jQuery.fn.select2.amd;return e.define("select2/i18n/mk", [], function () {
    return { inputTooLong: function inputTooLong(e) {
        var t = e.input.length - e.maximum,
            n = "Ве молиме внесете " + e.maximum + " помалку карактер";return e.maximum !== 1 && (n += "и"), n;
      }, inputTooShort: function inputTooShort(e) {
        var t = e.minimum - e.input.length,
            n = "Ве молиме внесете уште " + e.maximum + " карактер";return e.maximum !== 1 && (n += "и"), n;
      }, loadingMore: function loadingMore() {
        return "Вчитување резултати…";
      }, maximumSelected: function maximumSelected(e) {
        var t = "Можете да изберете само " + e.maximum + " ставк";return e.maximum === 1 ? t += "а" : t += "и", t;
      }, noResults: function noResults() {
        return "Нема пронајдено совпаѓања";
      }, searching: function searching() {
        return "Пребарување…";
      } };
  }), { define: e.define, require: e.require };
})();
//# sourceMappingURL=mk.js.map