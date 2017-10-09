"use strict";

/*! Select2 4.0.0 | https://github.com/select2/select2/blob/master/LICENSE.md */

(function () {
  if (jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd) var e = jQuery.fn.select2.amd;return e.define("select2/i18n/fa", [], function () {
    return { errorLoading: function errorLoading() {
        return "امکان بارگذاری نتایج وجود ندارد.";
      }, inputTooLong: function inputTooLong(e) {
        var t = e.input.length - e.maximum,
            n = "لطفاً " + t + " کاراکتر را حذف نمایید";return n;
      }, inputTooShort: function inputTooShort(e) {
        var t = e.minimum - e.input.length,
            n = "لطفاً تعداد " + t + " کاراکتر یا بیشتر وارد نمایید";return n;
      }, loadingMore: function loadingMore() {
        return "در حال بارگذاری نتایج بیشتر...";
      }, maximumSelected: function maximumSelected(e) {
        var t = "شما تنها می‌توانید " + e.maximum + " آیتم را انتخاب نمایید";return t;
      }, noResults: function noResults() {
        return "هیچ نتیجه‌ای یافت نشد";
      }, searching: function searching() {
        return "در حال جستجو...";
      } };
  }), { define: e.define, require: e.require };
})();
//# sourceMappingURL=fa.js.map