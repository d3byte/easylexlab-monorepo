"use strict";

define("echarts/chart/wordCloud", ["require", "./base", "zrender/shape/Text", "../layout/WordCloud", "../component/grid", "../component/dataRange", "../config", "../util/ecData", "zrender/tool/util", "zrender/tool/color", "../chart"], function (e) {
  function t(e, t, n, a, o) {
    i.call(this, e, t, n, a, o), this.refresh(a);
  }var i = e("./base"),
      n = e("zrender/shape/Text"),
      a = e("../layout/WordCloud");e("../component/grid"), e("../component/dataRange");var o = e("../config"),
      r = e("../util/ecData"),
      s = e("zrender/tool/util"),
      l = e("zrender/tool/color");return o.wordCloud = { zlevel: 0, z: 2, clickable: !0, center: ["50%", "50%"], size: ["40%", "40%"], textRotation: [0, 90], textPadding: 0, autoSize: { enable: !0, minSize: 12 }, itemStyle: { normal: { textStyle: { fontSize: function fontSize(e) {
            return e.value;
          } } } } }, t.prototype = { type: o.CHART_TYPE_WORDCLOUD, refresh: function refresh(e) {
      e && (this.option = e, this.series = e.series), this._init();
    }, _init: function _init() {
      var e = this.series;this.backupShapeList();for (var t = this.component.legend, i = 0; i < e.length; i++) {
        if (e[i].type === o.CHART_TYPE_WORDCLOUD) {
          e[i] = this.reformOption(e[i]);var n = e[i].name || "";if (this.selectedMap[n] = t ? t.isSelected(n) : !0, !this.selectedMap[n]) continue;this.buildMark(i), this._initSerie(e[i]);
        }
      }
    }, _initSerie: function _initSerie(e) {
      var t = e.itemStyle.normal.textStyle,
          i = [this.parsePercent(e.size[0], this.zr.getWidth()) || 200, this.parsePercent(e.size[1], this.zr.getHeight()) || 200],
          n = this.parseCenter(this.zr, e.center),
          o = { size: i, wordletype: { autoSizeCal: e.autoSize }, center: n, rotate: e.textRotation, padding: e.textPadding, font: t.fontFamily, fontSize: t.fontSize, fontWeight: t.fontWeight, fontStyle: t.fontStyle, text: function text(e) {
          return e.name;
        }, data: e.data },
          r = new a(o),
          s = this;r.end(function (e) {
        s._buildShapes(e);
      }), r.start();
    }, _buildShapes: function _buildShapes(e) {
      for (var t = e.length, i = 0; t > i; i++) {
        this._buildTextShape(e[i], 0, i);
      }this.addShapeList();
    }, _buildTextShape: function _buildTextShape(e, t, i) {
      var a = this.series,
          o = a[t],
          s = o.name || "",
          h = o.data[i],
          m = [h, o],
          V = this.component.legend,
          d = V ? V.getColor(s) : this.zr.getColor(t),
          U = this.deepMerge(m, "itemStyle.normal") || {},
          p = this.deepMerge(m, "itemStyle.emphasis") || {},
          c = this.getItemStyleColor(U.color, t, i, h) || d,
          u = this.getItemStyleColor(p.color, t, i, h) || ("string" == typeof c ? l.lift(c, -.2) : c),
          g = new n({ zlevel: o.zlevel, z: o.z, hoverable: !0, clickable: this.deepQuery(m, "clickable"), style: { x: 0, y: 0, text: e.text, color: c, textFont: [e.style, e.weight, e.size + "px", e.font].join(" "), textBaseline: "alphabetic", textAlign: "center" }, highlightStyle: { brushType: p.borderWidth ? "both" : "fill", color: u, lineWidth: p.borderWidth || 0, strokeColor: p.borderColor }, position: [e.x, e.y], rotation: [-e.rotate / 180 * Math.PI, 0, 0] });r.pack(g, o, t, h, i, h.name), this.shapeList.push(g);
    } }, s.inherits(t, i), e("../chart").define("wordCloud", t), t;
}), define("echarts/layout/WordCloud", ["require", "../layout/WordCloudRectZero", "zrender/tool/util"], function (e) {
  function t(e) {
    this._init(e);
  }var i = e("../layout/WordCloudRectZero"),
      n = e("zrender/tool/util");return t.prototype = { start: function start() {
      function e() {
        p.totalArea = r, d.autoSizeCal.enable && p._autoCalTextSize(m, r, a, o, d.autoSizeCal.minSize), V.timer && clearInterval(V.timer), V.timer = setInterval(t, 0), t();
      }function t() {
        for (var e, t = +new Date(), i = m.length; +new Date() - t < V.timeInterval && ++s < i && V.timer;) {
          e = m[s], e.x = U[0] >> 1, e.y = U[1] >> 1, p._cloudSprite(e, m, s), e.hasText && p._place(n, e, h) && (l.push(e), e.x -= U[0] >> 1, e.y -= U[1] >> 1);
        }s >= i && (p.stop(), p._fixTagPosition(l), V.endcallback(l));
      }var n = null,
          a = 0,
          o = 0,
          r = 0,
          s = -1,
          l = [],
          h = null,
          m = this.wordsdata,
          V = this.defaultOption,
          d = V.wordletype,
          U = V.size,
          p = this,
          c = new i({ type: d.type, width: U[0], height: U[1] });return c.calculate(function (t) {
        n = t.initarr, a = t.maxWit, o = t.maxHit, r = t.area, h = t.imgboard, e();
      }, this), this;
    }, _fixTagPosition: function _fixTagPosition(e) {
      for (var t = this.defaultOption.center, i = 0, n = e.length; n > i; i++) {
        e[i].x += t[0], e[i].y += t[1];
      }
    }, stop: function stop() {
      return this.defaultOption.timer && (clearInterval(this.defaultOption.timer), this.defaultOption.timer = null), this;
    }, end: function end(e) {
      return e && (this.defaultOption.endcallback = e), this;
    }, _init: function _init(e) {
      this.defaultOption = {}, this._initProperty(e), this._initMethod(e), this._initCanvas(), this._initData(e.data);
    }, _initData: function _initData(e) {
      var t = this,
          i = t.defaultOption;this.wordsdata = e.map(function (e, n) {
        return e.text = i.text.call(t, e, n), e.font = i.font.call(t, e, n), e.style = i.fontStyle.call(t, e, n), e.weight = i.fontWeight.call(t, e, n), e.rotate = i.rotate.call(t, e, n), e.size = ~~i.fontSize.call(t, e, n), e.padding = i.padding.call(t, e, n), e;
      }).sort(function (e, t) {
        return t.value - e.value;
      });
    }, _initMethod: function _initMethod(e) {
      function t(e) {
        return e.name;
      }function i() {
        return "sans-serif";
      }function n() {
        return "normal";
      }function a(e) {
        return e.value;
      }function o() {
        return 0;
      }function r(e) {
        return function () {
          return e[Math.round(Math.random() * (e.length - 1))];
        };
      }function s() {
        return 0;
      }function l(e) {
        var t = e[0] / e[1];return function (e) {
          return [t * (e *= .1) * Math.cos(e), e * Math.sin(e)];
        };
      }function h(e) {
        var t = 4,
            i = t * e[0] / e[1],
            n = 0,
            a = 0;return function (e) {
          var o = 0 > e ? -1 : 1;switch (Math.sqrt(1 + 4 * o * e) - o & 3) {case 0:
              n += i;break;case 1:
              a += t;break;case 2:
              n -= i;break;default:
              a -= t;}return [n, a];
        };
      }function m(e) {
        return "function" == typeof e ? e : function () {
          return e;
        };
      }var V = this.defaultOption;V.text = e.text ? m(e.text) : t, V.font = e.font ? m(e.font) : i, V.fontSize = e.fontSize ? m(e.fontSize) : a, V.fontStyle = e.fontStyle ? m(e.fontStyle) : n, V.fontWeight = e.fontWeight ? m(e.fontWeight) : n, V.rotate = e.rotate ? r(e.rotate) : o, V.padding = e.padding ? m(e.padding) : s, V.center = e.center, V.spiral = l, V.endcallback = function () {}, V.rectangularSpiral = h, V.archimedeanSpiral = l;
    }, _initProperty: function _initProperty(e) {
      var t = this.defaultOption;t.size = e.size || [256, 256], t.wordletype = e.wordletype, t.words = e.words || [], t.timeInterval = 1 / 0, t.timer = null, t.spirals = { archimedean: t.archimedeanSpiral, rectangular: t.rectangularSpiral }, n.merge(t, { size: [256, 256], wordletype: { type: "RECT", areaPresent: .058, autoSizeCal: { enable: !0, minSize: 12 } } });
    }, _initCanvas: function _initCanvas() {
      var e,
          t = Math.PI / 180,
          i = 64,
          n = 2048,
          a = 1;"undefined" != typeof document ? (e = document.createElement("canvas"), e.width = 1, e.height = 1, a = Math.sqrt(e.getContext("2d").getImageData(0, 0, 1, 1).data.length >> 2), e.width = (i << 5) / a, e.height = n / a) : e = new Canvas(i << 5, n);var o = e.getContext("2d");o.fillStyle = o.strokeStyle = "red", o.textAlign = "center", this.defaultOption.c = o, this.defaultOption.cw = i, this.defaultOption.ch = n, this.defaultOption.ratio = a, this.defaultOption.cloudRadians = t;
    }, _cloudSprite: function _cloudSprite(e, t, i) {
      if (!e.sprite) {
        var n = this.defaultOption.cw,
            a = this.defaultOption.ch,
            o = this.defaultOption.c,
            r = this.defaultOption.ratio,
            s = this.defaultOption.cloudRadians;o.clearRect(0, 0, (n << 5) / r, a / r);var l = 0,
            h = 0,
            m = 0,
            V = t.length;for (--i; ++i < V;) {
          e = t[i], o.save(), o.font = e.style + " " + e.weight + " " + ~~((e.size + 1) / r) + "px " + e.font;var d = o.measureText(e.text + "m").width * r,
              U = e.size << 1;if (e.rotate) {
            var p = Math.sin(e.rotate * s),
                c = Math.cos(e.rotate * s),
                u = d * c,
                g = d * p,
                y = U * c,
                b = U * p;d = Math.max(Math.abs(u + b), Math.abs(u - b)) + 31 >> 5 << 5, U = ~~Math.max(Math.abs(g + y), Math.abs(g - y));
          } else d = d + 31 >> 5 << 5;if (U > m && (m = U), l + d >= n << 5 && (l = 0, h += m, m = 0), h + U >= a) break;o.translate((l + (d >> 1)) / r, (h + (U >> 1)) / r), e.rotate && o.rotate(e.rotate * s), o.fillText(e.text, 0, 0), e.padding && (o.lineWidth = 2 * e.padding, o.strokeText(e.text, 0, 0)), o.restore(), e.width = d, e.height = U, e.xoff = l, e.yoff = h, e.x1 = d >> 1, e.y1 = U >> 1, e.x0 = -e.x1, e.y0 = -e.y1, e.hasText = !0, l += d;
        }for (var f = o.getImageData(0, 0, (n << 5) / r, a / r).data, k = []; --i >= 0;) {
          if (e = t[i], e.hasText) {
            for (var d = e.width, _ = d >> 5, U = e.y1 - e.y0, x = 0; U * _ > x; x++) {
              k[x] = 0;
            }if (l = e.xoff, null == l) return;h = e.yoff;for (var L = 0, W = -1, X = 0; U > X; X++) {
              for (var x = 0; d > x; x++) {
                var v = _ * X + (x >> 5),
                    w = f[(h + X) * (n << 5) + (l + x) << 2] ? 1 << 31 - x % 32 : 0;k[v] |= w, L |= w;
              }L ? W = X : (e.y0++, U--, X--, h++);
            }e.y1 = e.y0 + W, e.sprite = k.slice(0, (e.y1 - e.y0) * _);
          }
        }
      }
    }, _place: function _place(e, t, i) {
      function n(e, t, i) {
        i >>= 5;for (var n, a = e.sprite, o = e.width >> 5, r = e.x - (o << 4), s = 127 & r, l = 32 - s, h = e.y1 - e.y0, m = (e.y + e.y0) * i + (r >> 5), V = 0; h > V; V++) {
          n = 0;for (var d = 0; o >= d; d++) {
            if ((n << l | (o > d ? (n = a[V * o + d]) >>> s : 0)) & t[m + d]) return !0;
          }m += i;
        }return !1;
      }function a(e, t) {
        return t.row[e.y] && t.cloumn[e.x] && e.x >= t.row[e.y].start && e.x <= t.row[e.y].end && e.y >= t.cloumn[e.x].start && e.y <= t.cloumn[e.x].end;
      }for (var o, r, s, l = this.defaultOption.size, h = ([{ x: 0, y: 0 }, { x: l[0], y: l[1] }], t.x), m = t.y, V = Math.sqrt(l[0] * l[0] + l[1] * l[1]), d = this.defaultOption.spiral(l), U = Math.random() < .5 ? 1 : -1, p = -U; (o = d(p += U)) && (r = ~~o[0], s = ~~o[1], !(Math.min(r, s) > V));) {
        if (t.x = h + r, t.y = m + s, !(t.x + t.x0 < 0 || t.y + t.y0 < 0 || t.x + t.x1 > l[0] || t.y + t.y1 > l[1]) && !n(t, e, l[0]) && a(t, i)) {
          for (var c, u = t.sprite, g = t.width >> 5, y = l[0] >> 5, b = t.x - (g << 4), f = 127 & b, k = 32 - f, _ = t.y1 - t.y0, x = (t.y + t.y0) * y + (b >> 5), L = 0; _ > L; L++) {
            c = 0;for (var W = 0; g >= W; W++) {
              e[x + W] |= c << k | (g > W ? (c = u[L * g + W]) >>> f : 0);
            }x += y;
          }return delete t.sprite, !0;
        }
      }return !1;
    }, _autoCalTextSize: function _autoCalTextSize(e, t, i, n, a) {
      function o(e) {
        c.clearRect(0, 0, (U << 5) / u, p / u), c.save(), c.font = e.style + " " + e.weight + " " + ~~((e.size + 1) / u) + "px " + e.font;var t = c.measureText(e.text + "m").width * u,
            r = e.size << 1;t = t + 31 >> 5 << 5, c.restore(), e.aw = t, e.ah = r;var s, l, h;if (e.rotate) {
          var m = Math.sin(e.rotate * g),
              V = Math.cos(e.rotate * g),
              y = t * V,
              b = t * m,
              f = r * V,
              k = r * m;l = Math.max(Math.abs(y + k), Math.abs(y - k)) + 31 >> 5 << 5, h = ~~Math.max(Math.abs(b + f), Math.abs(b - f));
        }return e.size <= d || e.rotate && t * r <= e.area && i >= l && n >= h || t * r <= e.area && i >= t && n >= r ? void (e.area = t * r) : (s = e.rotate && l > i && h > n ? Math.min(i / l, n / h) : t > i || r > n ? Math.min(i / t, n / r) : Math.sqrt(e.area / (e.aw * e.ah)), e.size = ~~(s * e.size), e.size < a ? void (e.size = a) : o(e));
      }function r(e, t) {
        for (var i = e.length, n = 0; i--;) {
          n += t(e[i]);
        }return n;
      }for (var s, l, h = r(e, function (e) {
        return e.size;
      }), m = e.length, V = .25, d = a, U = this.defaultOption.cw, p = this.defaultOption.ch, c = this.defaultOption.c, u = this.defaultOption.ratio, g = this.defaultOption.cloudRadians; m--;) {
        s = e[m], l = s.size / h, s.areapre = V ? V > l ? l : V : l, s.area = t * s.areapre, s.totalarea = t, o(s);
      }
    } }, t;
}), define("echarts/component/dataRange", ["require", "./base", "zrender/shape/Text", "zrender/shape/Rectangle", "../util/shape/HandlePolygon", "../config", "zrender/tool/util", "zrender/tool/event", "zrender/tool/area", "zrender/tool/color", "../component"], function (e) {
  function t(e, t, n, a, o) {
    i.call(this, e, t, n, a, o);var s = this;s._ondrift = function (e, t) {
      return s.__ondrift(this, e, t);
    }, s._ondragend = function () {
      return s.__ondragend();
    }, s._dataRangeSelected = function (e) {
      return s.__dataRangeSelected(e);
    }, s._dispatchHoverLink = function (e) {
      return s.__dispatchHoverLink(e);
    }, s._onhoverlink = function (e) {
      return s.__onhoverlink(e);
    }, this._selectedMap = {}, this._range = {}, this.refresh(a), t.bind(r.EVENT.HOVER, this._onhoverlink);
  }var i = e("./base"),
      n = e("zrender/shape/Text"),
      a = e("zrender/shape/Rectangle"),
      o = e("../util/shape/HandlePolygon"),
      r = e("../config");r.dataRange = { zlevel: 0, z: 4, show: !0, orient: "vertical", x: "left", y: "bottom", backgroundColor: "rgba(0,0,0,0)", borderColor: "#ccc", borderWidth: 0, padding: 5, itemGap: 10, itemWidth: 20, itemHeight: 14, precision: 0, splitNumber: 5, splitList: null, calculable: !1, selectedMode: !0, hoverLink: !0, realtime: !0, color: ["#006edd", "#e0ffff"], textStyle: { color: "#333" } };var s = e("zrender/tool/util"),
      l = e("zrender/tool/event"),
      h = e("zrender/tool/area"),
      m = e("zrender/tool/color");return t.prototype = { type: r.COMPONENT_TYPE_DATARANGE, _textGap: 10, _buildShape: function _buildShape() {
      if (this._itemGroupLocation = this._getItemGroupLocation(), this._buildBackground(), this._isContinuity() ? this._buildGradient() : this._buildItem(), this.dataRangeOption.show) for (var e = 0, t = this.shapeList.length; t > e; e++) {
        this.zr.addShape(this.shapeList[e]);
      }this._syncShapeFromRange();
    }, _buildItem: function _buildItem() {
      var e,
          t,
          i,
          o,
          r = this._valueTextList,
          s = r.length,
          l = this.getFont(this.dataRangeOption.textStyle),
          m = this._itemGroupLocation.x,
          V = this._itemGroupLocation.y,
          d = this.dataRangeOption.itemWidth,
          U = this.dataRangeOption.itemHeight,
          p = this.dataRangeOption.itemGap,
          c = h.getTextHeight("国", l);"vertical" == this.dataRangeOption.orient && "right" == this.dataRangeOption.x && (m = this._itemGroupLocation.x + this._itemGroupLocation.width - d);var u = !0;this.dataRangeOption.text && (u = !1, this.dataRangeOption.text[0] && (i = this._getTextShape(m, V, this.dataRangeOption.text[0]), "horizontal" == this.dataRangeOption.orient ? m += h.getTextWidth(this.dataRangeOption.text[0], l) + this._textGap : (V += c + this._textGap, i.style.y += c / 2 + this._textGap, i.style.textBaseline = "bottom"), this.shapeList.push(new n(i))));for (var g = 0; s > g; g++) {
        e = r[g], o = this.getColorByIndex(g), t = this._getItemShape(m, V, d, U, this._selectedMap[g] ? o : "#ccc"), t._idx = g, t.onmousemove = this._dispatchHoverLink, this.dataRangeOption.selectedMode && (t.clickable = !0, t.onclick = this._dataRangeSelected), this.shapeList.push(new a(t)), u && (i = { zlevel: this.getZlevelBase(), z: this.getZBase(), style: { x: m + d + 5, y: V, color: this._selectedMap[g] ? this.dataRangeOption.textStyle.color : "#ccc", text: r[g], textFont: l, textBaseline: "top" }, highlightStyle: { brushType: "fill" } }, "vertical" == this.dataRangeOption.orient && "right" == this.dataRangeOption.x && (i.style.x -= d + 10, i.style.textAlign = "right"), i._idx = g, i.onmousemove = this._dispatchHoverLink, this.dataRangeOption.selectedMode && (i.clickable = !0, i.onclick = this._dataRangeSelected), this.shapeList.push(new n(i))), "horizontal" == this.dataRangeOption.orient ? m += d + (u ? 5 : 0) + (u ? h.getTextWidth(e, l) : 0) + p : V += U + p;
      }!u && this.dataRangeOption.text[1] && ("horizontal" == this.dataRangeOption.orient ? m = m - p + this._textGap : V = V - p + this._textGap, i = this._getTextShape(m, V, this.dataRangeOption.text[1]), "horizontal" != this.dataRangeOption.orient && (i.style.y -= 5, i.style.textBaseline = "top"), this.shapeList.push(new n(i)));
    }, _buildGradient: function _buildGradient() {
      var t,
          i,
          o = this.getFont(this.dataRangeOption.textStyle),
          r = this._itemGroupLocation.x,
          s = this._itemGroupLocation.y,
          l = this.dataRangeOption.itemWidth,
          m = this.dataRangeOption.itemHeight,
          V = h.getTextHeight("国", o),
          d = 10,
          U = !0;this.dataRangeOption.text && (U = !1, this.dataRangeOption.text[0] && (i = this._getTextShape(r, s, this.dataRangeOption.text[0]), "horizontal" == this.dataRangeOption.orient ? r += h.getTextWidth(this.dataRangeOption.text[0], o) + this._textGap : (s += V + this._textGap, i.style.y += V / 2 + this._textGap, i.style.textBaseline = "bottom"), this.shapeList.push(new n(i))));for (var p = e("zrender/tool/color"), c = 1 / (this.dataRangeOption.color.length - 1), u = [], g = 0, y = this.dataRangeOption.color.length; y > g; g++) {
        u.push([g * c, this.dataRangeOption.color[g]]);
      }"horizontal" == this.dataRangeOption.orient ? (t = { zlevel: this.getZlevelBase(), z: this.getZBase(), style: { x: r, y: s, width: l * d, height: m, color: p.getLinearGradient(r, s, r + l * d, s, u) }, hoverable: !1 }, r += l * d + this._textGap) : (t = { zlevel: this.getZlevelBase(), z: this.getZBase(), style: { x: r, y: s, width: l, height: m * d, color: p.getLinearGradient(r, s, r, s + m * d, u) }, hoverable: !1 }, s += m * d + this._textGap), this.shapeList.push(new a(t)), this._calculableLocation = t.style, this.dataRangeOption.calculable && (this._buildFiller(), this._bulidMask(), this._bulidHandle()), this._buildIndicator(), !U && this.dataRangeOption.text[1] && (i = this._getTextShape(r, s, this.dataRangeOption.text[1]), this.shapeList.push(new n(i)));
    }, _buildIndicator: function _buildIndicator() {
      var e,
          t,
          i = this._calculableLocation.x,
          n = this._calculableLocation.y,
          a = this._calculableLocation.width,
          r = this._calculableLocation.height,
          s = 5;"horizontal" == this.dataRangeOption.orient ? "bottom" != this.dataRangeOption.y ? (e = [[i, n + r], [i - s, n + r + s], [i + s, n + r + s]], t = "bottom") : (e = [[i, n], [i - s, n - s], [i + s, n - s]], t = "top") : "right" != this.dataRangeOption.x ? (e = [[i + a, n], [i + a + s, n - s], [i + a + s, n + s]], t = "right") : (e = [[i, n], [i - s, n - s], [i - s, n + s]], t = "left"), this._indicatorShape = { style: { pointList: e, color: "#fff", __rect: { x: Math.min(e[0][0], e[1][0]), y: Math.min(e[0][1], e[1][1]), width: s * ("horizontal" == this.dataRangeOption.orient ? 2 : 1), height: s * ("horizontal" == this.dataRangeOption.orient ? 1 : 2) } }, highlightStyle: { brushType: "fill", textPosition: t, textColor: this.dataRangeOption.textStyle.color }, hoverable: !1 }, this._indicatorShape = new o(this._indicatorShape);
    }, _buildFiller: function _buildFiller() {
      this._fillerShape = { zlevel: this.getZlevelBase(), z: this.getZBase() + 1, style: { x: this._calculableLocation.x, y: this._calculableLocation.y, width: this._calculableLocation.width, height: this._calculableLocation.height, color: "rgba(255,255,255,0)" }, highlightStyle: { strokeColor: "rgba(255,255,255,0.5)", lineWidth: 1 }, draggable: !0, ondrift: this._ondrift, ondragend: this._ondragend, onmousemove: this._dispatchHoverLink, _type: "filler" }, this._fillerShape = new a(this._fillerShape), this.shapeList.push(this._fillerShape);
    }, _bulidHandle: function _bulidHandle() {
      var e,
          t,
          i,
          n,
          a,
          r,
          s,
          l,
          m = this._calculableLocation.x,
          V = this._calculableLocation.y,
          d = this._calculableLocation.width,
          U = this._calculableLocation.height,
          p = this.getFont(this.dataRangeOption.textStyle),
          c = h.getTextHeight("国", p),
          u = Math.max(h.getTextWidth(this._textFormat(this.dataRangeOption.max), p), h.getTextWidth(this._textFormat(this.dataRangeOption.min), p)) + 2;"horizontal" == this.dataRangeOption.orient ? "bottom" != this.dataRangeOption.y ? (e = [[m, V], [m, V + U + c], [m - c, V + U + c], [m - 1, V + U], [m - 1, V]], t = m - u / 2 - c, i = V + U + c / 2 + 2, n = { x: m - u - c, y: V + U, width: u + c, height: c }, a = [[m + d, V], [m + d, V + U + c], [m + d + c, V + U + c], [m + d + 1, V + U], [m + d + 1, V]], r = m + d + u / 2 + c, s = i, l = { x: m + d, y: V + U, width: u + c, height: c }) : (e = [[m, V + U], [m, V - c], [m - c, V - c], [m - 1, V], [m - 1, V + U]], t = m - u / 2 - c, i = V - c / 2 - 2, n = { x: m - u - c, y: V - c, width: u + c, height: c }, a = [[m + d, V + U], [m + d, V - c], [m + d + c, V - c], [m + d + 1, V], [m + d + 1, V + U]], r = m + d + u / 2 + c, s = i, l = { x: m + d, y: V - c, width: u + c, height: c }) : (u += c, "right" != this.dataRangeOption.x ? (e = [[m, V], [m + d + c, V], [m + d + c, V - c], [m + d, V - 1], [m, V - 1]], t = m + d + u / 2 + c / 2, i = V - c / 2, n = { x: m + d, y: V - c, width: u + c, height: c }, a = [[m, V + U], [m + d + c, V + U], [m + d + c, V + c + U], [m + d, V + 1 + U], [m, V + U + 1]], r = t, s = V + U + c / 2, l = { x: m + d, y: V + U, width: u + c, height: c }) : (e = [[m + d, V], [m - c, V], [m - c, V - c], [m, V - 1], [m + d, V - 1]], t = m - u / 2 - c / 2, i = V - c / 2, n = { x: m - u - c, y: V - c, width: u + c, height: c }, a = [[m + d, V + U], [m - c, V + U], [m - c, V + c + U], [m, V + 1 + U], [m + d, V + U + 1]], r = t, s = V + U + c / 2, l = { x: m - u - c, y: V + U, width: u + c, height: c })), this._startShape = { style: { pointList: e, text: this._textFormat(this.dataRangeOption.max), textX: t, textY: i, textFont: p, color: this.getColor(this.dataRangeOption.max), rect: n, x: e[0][0], y: e[0][1], _x: e[0][0], _y: e[0][1] } }, this._startShape.highlightStyle = { strokeColor: this._startShape.style.color, lineWidth: 1 }, this._endShape = { style: { pointList: a, text: this._textFormat(this.dataRangeOption.min), textX: r, textY: s, textFont: p, color: this.getColor(this.dataRangeOption.min), rect: l, x: a[0][0], y: a[0][1], _x: a[0][0], _y: a[0][1] } }, this._endShape.highlightStyle = { strokeColor: this._endShape.style.color, lineWidth: 1 }, this._startShape.zlevel = this._endShape.zlevel = this.getZlevelBase(), this._startShape.z = this._endShape.z = this.getZBase() + 1, this._startShape.draggable = this._endShape.draggable = !0, this._startShape.ondrift = this._endShape.ondrift = this._ondrift, this._startShape.ondragend = this._endShape.ondragend = this._ondragend, this._startShape.style.textColor = this._endShape.style.textColor = this.dataRangeOption.textStyle.color, this._startShape.style.textAlign = this._endShape.style.textAlign = "center", this._startShape.style.textPosition = this._endShape.style.textPosition = "specific", this._startShape.style.textBaseline = this._endShape.style.textBaseline = "middle", this._startShape.style.width = this._endShape.style.width = 0, this._startShape.style.height = this._endShape.style.height = 0, this._startShape.style.textPosition = this._endShape.style.textPosition = "specific", this._startShape = new o(this._startShape), this._endShape = new o(this._endShape), this.shapeList.push(this._startShape), this.shapeList.push(this._endShape);
    }, _bulidMask: function _bulidMask() {
      var e = this._calculableLocation.x,
          t = this._calculableLocation.y,
          i = this._calculableLocation.width,
          n = this._calculableLocation.height;this._startMask = { zlevel: this.getZlevelBase(), z: this.getZBase() + 1, style: { x: e, y: t, width: "horizontal" == this.dataRangeOption.orient ? 0 : i, height: "horizontal" == this.dataRangeOption.orient ? n : 0, color: "#ccc" }, hoverable: !1 }, this._endMask = { zlevel: this.getZlevelBase(), z: this.getZBase() + 1, style: { x: "horizontal" == this.dataRangeOption.orient ? e + i : e, y: "horizontal" == this.dataRangeOption.orient ? t : t + n, width: "horizontal" == this.dataRangeOption.orient ? 0 : i, height: "horizontal" == this.dataRangeOption.orient ? n : 0, color: "#ccc" }, hoverable: !1 }, this._startMask = new a(this._startMask), this._endMask = new a(this._endMask), this.shapeList.push(this._startMask), this.shapeList.push(this._endMask);
    }, _buildBackground: function _buildBackground() {
      var e = this.reformCssArray(this.dataRangeOption.padding);this.shapeList.push(new a({ zlevel: this.getZlevelBase(), z: this.getZBase(), hoverable: !1, style: { x: this._itemGroupLocation.x - e[3], y: this._itemGroupLocation.y - e[0], width: this._itemGroupLocation.width + e[3] + e[1], height: this._itemGroupLocation.height + e[0] + e[2], brushType: 0 === this.dataRangeOption.borderWidth ? "fill" : "both", color: this.dataRangeOption.backgroundColor, strokeColor: this.dataRangeOption.borderColor, lineWidth: this.dataRangeOption.borderWidth } }));
    }, _getItemGroupLocation: function _getItemGroupLocation() {
      var e = this._valueTextList,
          t = e.length,
          i = this.dataRangeOption.itemGap,
          n = this.dataRangeOption.itemWidth,
          a = this.dataRangeOption.itemHeight,
          o = 0,
          r = 0,
          s = this.getFont(this.dataRangeOption.textStyle),
          l = h.getTextHeight("国", s),
          m = 10;if ("horizontal" == this.dataRangeOption.orient) {
        if (this.dataRangeOption.text || this._isContinuity()) o = (this._isContinuity() ? n * m + i : t * (n + i)) + (this.dataRangeOption.text && "undefined" != typeof this.dataRangeOption.text[0] ? h.getTextWidth(this.dataRangeOption.text[0], s) + this._textGap : 0) + (this.dataRangeOption.text && "undefined" != typeof this.dataRangeOption.text[1] ? h.getTextWidth(this.dataRangeOption.text[1], s) + this._textGap : 0);else {
          n += 5;for (var V = 0; t > V; V++) {
            o += n + h.getTextWidth(e[V], s) + i;
          }
        }o -= i, r = Math.max(l, a);
      } else {
        var d;if (this.dataRangeOption.text || this._isContinuity()) r = (this._isContinuity() ? a * m + i : t * (a + i)) + (this.dataRangeOption.text && "undefined" != typeof this.dataRangeOption.text[0] ? this._textGap + l : 0) + (this.dataRangeOption.text && "undefined" != typeof this.dataRangeOption.text[1] ? this._textGap + l : 0), d = Math.max(h.getTextWidth(this.dataRangeOption.text && this.dataRangeOption.text[0] || "", s), h.getTextWidth(this.dataRangeOption.text && this.dataRangeOption.text[1] || "", s)), o = Math.max(n, d);else {
          r = (a + i) * t, n += 5, d = 0;for (var V = 0; t > V; V++) {
            d = Math.max(d, h.getTextWidth(e[V], s));
          }o = n + d;
        }r -= i;
      }var U,
          p = this.reformCssArray(this.dataRangeOption.padding),
          c = this.zr.getWidth();switch (this.dataRangeOption.x) {case "center":
          U = Math.floor((c - o) / 2);break;case "left":
          U = p[3] + this.dataRangeOption.borderWidth;break;case "right":
          U = c - o - p[1] - this.dataRangeOption.borderWidth;break;default:
          U = this.parsePercent(this.dataRangeOption.x, c), U = isNaN(U) ? 0 : U;}var u,
          g = this.zr.getHeight();switch (this.dataRangeOption.y) {case "top":
          u = p[0] + this.dataRangeOption.borderWidth;break;case "bottom":
          u = g - r - p[2] - this.dataRangeOption.borderWidth;break;case "center":
          u = Math.floor((g - r) / 2);break;default:
          u = this.parsePercent(this.dataRangeOption.y, g), u = isNaN(u) ? 0 : u;}if (this.dataRangeOption.calculable) {
        var y = Math.max(h.getTextWidth(this.dataRangeOption.max, s), h.getTextWidth(this.dataRangeOption.min, s)) + l;"horizontal" == this.dataRangeOption.orient ? (y > U && (U = y), U + o + y > c && (U -= y)) : (l > u && (u = l), u + r + l > g && (u -= l));
      }return { x: U, y: u, width: o, height: r };
    }, _getTextShape: function _getTextShape(e, t, i) {
      return { zlevel: this.getZlevelBase(), z: this.getZBase(), style: { x: "horizontal" == this.dataRangeOption.orient ? e : this._itemGroupLocation.x + this._itemGroupLocation.width / 2, y: "horizontal" == this.dataRangeOption.orient ? this._itemGroupLocation.y + this._itemGroupLocation.height / 2 : t, color: this.dataRangeOption.textStyle.color, text: i, textFont: this.getFont(this.dataRangeOption.textStyle), textBaseline: "horizontal" == this.dataRangeOption.orient ? "middle" : "top", textAlign: "horizontal" == this.dataRangeOption.orient ? "left" : "center" }, hoverable: !1 };
    }, _getItemShape: function _getItemShape(e, t, i, n, a) {
      return { zlevel: this.getZlevelBase(), z: this.getZBase(), style: { x: e, y: t + 1, width: i, height: n - 2, color: a }, highlightStyle: { strokeColor: a, lineWidth: 1 } };
    }, __ondrift: function __ondrift(e, t, i) {
      var n = this._calculableLocation.x,
          a = this._calculableLocation.y,
          o = this._calculableLocation.width,
          r = this._calculableLocation.height;return "horizontal" == this.dataRangeOption.orient ? e.style.x + t <= n ? e.style.x = n : e.style.x + t + e.style.width >= n + o ? e.style.x = n + o - e.style.width : e.style.x += t : e.style.y + i <= a ? e.style.y = a : e.style.y + i + e.style.height >= a + r ? e.style.y = a + r - e.style.height : e.style.y += i, "filler" == e._type ? this._syncHandleShape() : this._syncFillerShape(e), this.dataRangeOption.realtime && this._dispatchDataRange(), !0;
    }, __ondragend: function __ondragend() {
      this.isDragend = !0;
    }, ondragend: function ondragend(e, t) {
      this.isDragend && e.target && (t.dragOut = !0, t.dragIn = !0, this.dataRangeOption.realtime || this._dispatchDataRange(), t.needRefresh = !1, this.isDragend = !1);
    }, _syncShapeFromRange: function _syncShapeFromRange() {
      var e = this.dataRangeOption.range || {},
          t = e.start,
          i = e.end;if (t > i && (t = [i, i = t][0]), this._range.end = null != t ? t : null != this._range.end ? this._range.end : 0, this._range.start = null != i ? i : null != this._range.start ? this._range.start : 100, 100 != this._range.start || 0 !== this._range.end) {
        if ("horizontal" == this.dataRangeOption.orient) {
          var n = this._fillerShape.style.width;this._fillerShape.style.x += n * (100 - this._range.start) / 100, this._fillerShape.style.width = n * (this._range.start - this._range.end) / 100;
        } else {
          var a = this._fillerShape.style.height;this._fillerShape.style.y += a * (100 - this._range.start) / 100, this._fillerShape.style.height = a * (this._range.start - this._range.end) / 100;
        }this.zr.modShape(this._fillerShape.id), this._syncHandleShape();
      }
    }, _syncHandleShape: function _syncHandleShape() {
      var e = this._calculableLocation.x,
          t = this._calculableLocation.y,
          i = this._calculableLocation.width,
          n = this._calculableLocation.height;"horizontal" == this.dataRangeOption.orient ? (this._startShape.style.x = this._fillerShape.style.x, this._startMask.style.width = this._startShape.style.x - e, this._endShape.style.x = this._fillerShape.style.x + this._fillerShape.style.width, this._endMask.style.x = this._endShape.style.x, this._endMask.style.width = e + i - this._endShape.style.x, this._range.start = Math.ceil(100 - (this._startShape.style.x - e) / i * 100), this._range.end = Math.floor(100 - (this._endShape.style.x - e) / i * 100)) : (this._startShape.style.y = this._fillerShape.style.y, this._startMask.style.height = this._startShape.style.y - t, this._endShape.style.y = this._fillerShape.style.y + this._fillerShape.style.height, this._endMask.style.y = this._endShape.style.y, this._endMask.style.height = t + n - this._endShape.style.y, this._range.start = Math.ceil(100 - (this._startShape.style.y - t) / n * 100), this._range.end = Math.floor(100 - (this._endShape.style.y - t) / n * 100)), this._syncShape();
    }, _syncFillerShape: function _syncFillerShape(e) {
      var t,
          i,
          n = this._calculableLocation.x,
          a = this._calculableLocation.y,
          o = this._calculableLocation.width,
          r = this._calculableLocation.height;"horizontal" == this.dataRangeOption.orient ? (t = this._startShape.style.x, i = this._endShape.style.x, e.id == this._startShape.id && t >= i ? (i = t, this._endShape.style.x = t) : e.id == this._endShape.id && t >= i && (t = i, this._startShape.style.x = t), this._fillerShape.style.x = t, this._fillerShape.style.width = i - t, this._startMask.style.width = t - n, this._endMask.style.x = i, this._endMask.style.width = n + o - i, this._range.start = Math.ceil(100 - (t - n) / o * 100), this._range.end = Math.floor(100 - (i - n) / o * 100)) : (t = this._startShape.style.y, i = this._endShape.style.y, e.id == this._startShape.id && t >= i ? (i = t, this._endShape.style.y = t) : e.id == this._endShape.id && t >= i && (t = i, this._startShape.style.y = t), this._fillerShape.style.y = t, this._fillerShape.style.height = i - t, this._startMask.style.height = t - a, this._endMask.style.y = i, this._endMask.style.height = a + r - i, this._range.start = Math.ceil(100 - (t - a) / r * 100), this._range.end = Math.floor(100 - (i - a) / r * 100)), this._syncShape();
    }, _syncShape: function _syncShape() {
      this._startShape.position = [this._startShape.style.x - this._startShape.style._x, this._startShape.style.y - this._startShape.style._y], this._startShape.style.text = this._textFormat(this._gap * this._range.start + this.dataRangeOption.min), this._startShape.style.color = this._startShape.highlightStyle.strokeColor = this.getColor(this._gap * this._range.start + this.dataRangeOption.min), this._endShape.position = [this._endShape.style.x - this._endShape.style._x, this._endShape.style.y - this._endShape.style._y], this._endShape.style.text = this._textFormat(this._gap * this._range.end + this.dataRangeOption.min), this._endShape.style.color = this._endShape.highlightStyle.strokeColor = this.getColor(this._gap * this._range.end + this.dataRangeOption.min), this.zr.modShape(this._startShape.id), this.zr.modShape(this._endShape.id), this.zr.modShape(this._startMask.id), this.zr.modShape(this._endMask.id), this.zr.modShape(this._fillerShape.id), this.zr.refreshNextFrame();
    }, _dispatchDataRange: function _dispatchDataRange() {
      this.messageCenter.dispatch(r.EVENT.DATA_RANGE, null, { range: { start: this._range.end, end: this._range.start } }, this.myChart);
    }, __dataRangeSelected: function __dataRangeSelected(e) {
      if ("single" === this.dataRangeOption.selectedMode) for (var t in this._selectedMap) {
        this._selectedMap[t] = !1;
      }var i = e.target._idx;this._selectedMap[i] = !this._selectedMap[i];var n, a;this._useCustomizedSplit() ? (n = this._splitList[i].max, a = this._splitList[i].min) : (n = (this._colorList.length - i) * this._gap + this.dataRangeOption.min, a = n - this._gap), this.messageCenter.dispatch(r.EVENT.DATA_RANGE_SELECTED, e.event, { selected: this._selectedMap, target: i, valueMax: n, valueMin: a }, this.myChart), this.messageCenter.dispatch(r.EVENT.REFRESH, null, null, this.myChart);
    }, __dispatchHoverLink: function __dispatchHoverLink(e) {
      var t, i;if (this.dataRangeOption.calculable) {
        var n,
            a = this.dataRangeOption.max - this.dataRangeOption.min;n = "horizontal" == this.dataRangeOption.orient ? (1 - (l.getX(e.event) - this._calculableLocation.x) / this._calculableLocation.width) * a : (1 - (l.getY(e.event) - this._calculableLocation.y) / this._calculableLocation.height) * a, t = n - .05 * a, i = n + .05 * a;
      } else if (this._useCustomizedSplit()) {
        var o = e.target._idx;i = this._splitList[o].max, t = this._splitList[o].min;
      } else {
        var o = e.target._idx;i = (this._colorList.length - o) * this._gap + this.dataRangeOption.min, t = i - this._gap;
      }this.messageCenter.dispatch(r.EVENT.DATA_RANGE_HOVERLINK, e.event, { valueMin: t, valueMax: i }, this.myChart);
    }, __onhoverlink: function __onhoverlink(e) {
      if (this.dataRangeOption.show && this.dataRangeOption.hoverLink && this._indicatorShape && e && null != e.seriesIndex && null != e.dataIndex) {
        var t = e.value;if ("" === t || isNaN(t)) return;t < this.dataRangeOption.min ? t = this.dataRangeOption.min : t > this.dataRangeOption.max && (t = this.dataRangeOption.max), this._indicatorShape.position = "horizontal" == this.dataRangeOption.orient ? [(this.dataRangeOption.max - t) / (this.dataRangeOption.max - this.dataRangeOption.min) * this._calculableLocation.width, 0] : [0, (this.dataRangeOption.max - t) / (this.dataRangeOption.max - this.dataRangeOption.min) * this._calculableLocation.height], this._indicatorShape.style.text = this._textFormat(e.value), this._indicatorShape.style.color = this.getColor(t), this.zr.addHoverShape(this._indicatorShape);
      }
    }, _textFormat: function _textFormat(e, t) {
      var i = this.dataRangeOption;if (e !== -Number.MAX_VALUE && (e = (+e).toFixed(i.precision)), null != t && t !== Number.MAX_VALUE && (t = (+t).toFixed(i.precision)), i.formatter) {
        if ("string" == typeof i.formatter) return i.formatter.replace("{value}", e === -Number.MAX_VALUE ? "min" : e).replace("{value2}", t === Number.MAX_VALUE ? "max" : t);if ("function" == typeof i.formatter) return i.formatter.call(this.myChart, e, t);
      }return null == t ? e : e === -Number.MAX_VALUE ? "< " + t : t === Number.MAX_VALUE ? "> " + e : e + " - " + t;
    }, _isContinuity: function _isContinuity() {
      var e = this.dataRangeOption;return !(e.splitList ? e.splitList.length > 0 : e.splitNumber > 0) || e.calculable;
    }, _useCustomizedSplit: function _useCustomizedSplit() {
      var e = this.dataRangeOption;return e.splitList && e.splitList.length > 0;
    }, _buildColorList: function _buildColorList(e) {
      if (this._colorList = m.getGradientColors(this.dataRangeOption.color, Math.max((e - this.dataRangeOption.color.length) / (this.dataRangeOption.color.length - 1), 0) + 1), this._colorList.length > e) {
        for (var t = this._colorList.length, i = [this._colorList[0]], n = t / (e - 1), a = 1; e - 1 > a; a++) {
          i.push(this._colorList[Math.floor(a * n)]);
        }i.push(this._colorList[t - 1]), this._colorList = i;
      }if (this._useCustomizedSplit()) for (var o = this._splitList, a = 0, t = o.length; t > a; a++) {
        o[a].color && (this._colorList[a] = o[a].color);
      }
    }, _buildGap: function _buildGap(e) {
      if (!this._useCustomizedSplit()) {
        var t = this.dataRangeOption.precision;for (this._gap = (this.dataRangeOption.max - this.dataRangeOption.min) / e; this._gap.toFixed(t) - 0 != this._gap && 5 > t;) {
          t++;
        }this.dataRangeOption.precision = t, this._gap = ((this.dataRangeOption.max - this.dataRangeOption.min) / e).toFixed(t) - 0;
      }
    }, _buildDataList: function _buildDataList(e) {
      for (var t = this._valueTextList = [], i = this.dataRangeOption, n = this._useCustomizedSplit(), a = 0; e > a; a++) {
        this._selectedMap[a] = !0;var o = "";if (n) {
          var r = this._splitList[e - 1 - a];o = null != r.label ? r.label : null != r.single ? this._textFormat(r.single) : this._textFormat(r.min, r.max);
        } else o = this._textFormat(a * this._gap + i.min, (a + 1) * this._gap + i.min);t.unshift(o);
      }
    }, _buildSplitList: function _buildSplitList() {
      if (this._useCustomizedSplit()) for (var e = this.dataRangeOption.splitList, t = this._splitList = [], i = 0, n = e.length; n > i; i++) {
        var a = e[i];if (!a || null == a.start && null == a.end) throw new Error("Empty item exists in splitList!");var o = { label: a.label, color: a.color };o.min = a.start, o.max = a.end, o.min > o.max && (o.min = [o.max, o.max = o.min][0]), o.min === o.max && (o.single = o.max), null == o.min && (o.min = -Number.MAX_VALUE), null == o.max && (o.max = Number.MAX_VALUE), t.push(o);
      }
    }, refresh: function refresh(e) {
      if (e) {
        this.option = e, this.option.dataRange = this.reformOption(this.option.dataRange);var t = this.dataRangeOption = this.option.dataRange;if (!this._useCustomizedSplit() && (null == t.min || null == t.max)) throw new Error("option.dataRange.min or option.dataRange.max has not been defined.");this.myChart.canvasSupported || (t.realtime = !1);var i = this._isContinuity() ? 100 : this._useCustomizedSplit() ? t.splitList.length : t.splitNumber;this._buildSplitList(), this._buildColorList(i), this._buildGap(i), this._buildDataList(i);
      }this.clear(), this._buildShape();
    }, getColor: function getColor(e) {
      if (isNaN(e)) return null;var t;if (this._useCustomizedSplit()) {
        for (var i = this._splitList, n = 0, a = i.length; a > n; n++) {
          if (i[n].min <= e && i[n].max >= e) {
            t = n;break;
          }
        }
      } else {
        if (this.dataRangeOption.min == this.dataRangeOption.max) return this._colorList[0];if (e < this.dataRangeOption.min ? e = this.dataRangeOption.min : e > this.dataRangeOption.max && (e = this.dataRangeOption.max), this.dataRangeOption.calculable && (e - (this._gap * this._range.start + this.dataRangeOption.min) > 5e-5 || e - (this._gap * this._range.end + this.dataRangeOption.min) < -5e-5)) return null;t = this._colorList.length - Math.ceil((e - this.dataRangeOption.min) / (this.dataRangeOption.max - this.dataRangeOption.min) * this._colorList.length), t == this._colorList.length && t--;
      }return this._selectedMap[t] ? this._colorList[t] : null;
    }, getColorByIndex: function getColorByIndex(e) {
      return e >= this._colorList.length ? e = this._colorList.length - 1 : 0 > e && (e = 0), this._colorList[e];
    }, onbeforDispose: function onbeforDispose() {
      this.messageCenter.unbind(r.EVENT.HOVER, this._onhoverlink);
    } }, s.inherits(t, i), e("../component").define("dataRange", t), t;
}), define("echarts/layout/WordCloudRectZero", ["require"], function () {
  function e(e) {
    this.defaultOption = { type: "RECT" }, this._init(e);
  }return e.prototype = { RECT: "_calculateRect", _init: function _init(e) {
      this._initOption(e), this._initCanvas();
    }, _initOption: function _initOption(e) {
      for (k in e) {
        this.defaultOption[k] = e[k];
      }
    }, _initCanvas: function _initCanvas() {
      var e = document.createElement("canvas");e.width = 1, e.height = 1;var t = Math.sqrt(e.getContext("2d").getImageData(0, 0, 1, 1).data.length >> 2);if (e.width = this.defaultOption.width, e.height = this.defaultOption.height, e.getContext) var i = e.getContext("2d");this.canvas = e, this.ctx = i, this.ratio = t;
    }, calculate: function calculate(e, t) {
      var i = this.defaultOption.type,
          n = this[i];this[n].call(this, e, t);
    }, _calculateReturn: function _calculateReturn(e, t, i) {
      t.call(i, e);
    }, _calculateRect: function _calculateRect(e, t) {
      var i = {},
          n = this.defaultOption.width >> 5 << 5,
          a = this.defaultOption.height;i.initarr = this._rectZeroArray(n * a), i.area = n * a, i.maxHit = a, i.maxWit = n, i.imgboard = this._rectBoard(n, a), this._calculateReturn(i, e, t);
    }, _rectBoard: function _rectBoard(e, t) {
      for (var i = [], n = 0; t > n; n++) {
        i.push({ y: n, start: 0, end: e });
      }for (var a = [], n = 0; e > n; n++) {
        a.push({ x: n, start: 0, end: t });
      }return { row: i, cloumn: a };
    }, _rectZeroArray: function _rectZeroArray(e) {
      for (var t = [], i = e, n = -1; ++n < i;) {
        t[n] = 0;
      }return t;
    } }, e;
}), define("echarts/util/shape/HandlePolygon", ["require", "zrender/shape/Base", "zrender/shape/Polygon", "zrender/tool/util"], function (e) {
  function t(e) {
    i.call(this, e);
  }var i = e("zrender/shape/Base"),
      n = e("zrender/shape/Polygon"),
      a = e("zrender/tool/util");return t.prototype = { type: "handle-polygon", buildPath: function buildPath(e, t) {
      n.prototype.buildPath(e, t);
    }, isCover: function isCover(e, t) {
      var i = this.transformCoordToLocal(e, t);e = i[0], t = i[1];var n = this.style.rect;return e >= n.x && e <= n.x + n.width && t >= n.y && t <= n.y + n.height ? !0 : !1;
    } }, a.inherits(t, i), t;
});
//# sourceMappingURL=wordCloud.js.map