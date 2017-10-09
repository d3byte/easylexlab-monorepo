"use strict";

/*! Select2 4.0.0 | https://github.com/select2/select2/blob/master/LICENSE.md */

(function () {
  if (jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd) var e = jQuery.fn.select2.amd;return e.define("select2/i18n/vi", [], function () {
    return { inputTooLong: function inputTooLong(e) {
        var t = e.input.length - e.maximum,
            n = "Vui lòng nhập ít hơn " + t + " ký tự";return t != 1 && (n += "s"), n;
      }, inputTooShort: function inputTooShort(e) {
        var t = e.minimum - e.input.length,
            n = "Vui lòng nhập nhiều hơn " + t + ' ký tự"';return n;
      }, loadingMore: function loadingMore() {
        return "Đang lấy thêm kết quả…";
      }, maximumSelected: function maximumSelected(e) {
        var t = "Chỉ có thể chọn được " + e.maximum + " lựa chọn";return t;
      }, noResults: function noResults() {
        return "Không tìm thấy kết quả";
      }, searching: function searching() {
        return "Đang tìm…";
      } };
  }), { define: e.define, require: e.require };
})();
//# sourceMappingURL=vi.js.map