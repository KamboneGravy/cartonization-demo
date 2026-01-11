(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // node_modules/binpackingjs/dist/BinPacking.min.js
  var require_BinPacking_min = __commonJS({
    "node_modules/binpackingjs/dist/BinPacking.min.js"(exports, module) {
      !function(t, e) {
        "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define("BinPacking", [], e) : "object" == typeof exports ? exports.BinPacking = e() : t.BinPacking = e();
      }(exports, function() {
        return function() {
          var t = { 416: function(t2, e2, n2) {
            "use strict";
            function i2(t3, e3) {
              if (!(t3 instanceof e3))
                throw new TypeError("Cannot call a class as a function");
            }
            n2.d(e2, { Z: function() {
              return i2;
            } });
          }, 225: function(t2, e2, n2) {
            "use strict";
            function i2(t3, e3) {
              for (var n3 = 0; n3 < e3.length; n3++) {
                var i3 = e3[n3];
                i3.enumerable = i3.enumerable || false, i3.configurable = true, "value" in i3 && (i3.writable = true), Object.defineProperty(t3, i3.key, i3);
              }
            }
            function r(t3, e3, n3) {
              return e3 && i2(t3.prototype, e3), n3 && i2(t3, n3), t3;
            }
            n2.d(e2, { Z: function() {
              return r;
            } });
          }, 743: function(t2, e2, n2) {
            "use strict";
            function i2(t3, e3, n3) {
              return e3 in t3 ? Object.defineProperty(t3, e3, { value: n3, enumerable: true, configurable: true, writable: true }) : t3[e3] = n3, t3;
            }
            n2.d(e2, { Z: function() {
              return i2;
            } });
          }, 269: function(t2, e2, n2) {
            "use strict";
            n2.r(e2), n2.d(e2, { Bin: function() {
              return b;
            }, Box: function() {
              return y;
            }, Packer: function() {
              return R;
            }, heuristics: function() {
              return i2;
            } });
            var i2 = {};
            n2.r(i2), n2.d(i2, { BestAreaFit: function() {
              return Z;
            }, BestLongSideFit: function() {
              return _;
            }, BestShortSideFit: function() {
              return g;
            }, BottomLeft: function() {
              return O;
            } });
            var r = n2(416), o = n2(225), u = n2(743);
            function s(t3, e3) {
              return (s = Object.setPrototypeOf || function(t4, e4) {
                return t4.__proto__ = e4, t4;
              })(t3, e3);
            }
            function c(t3, e3) {
              if ("function" != typeof e3 && null !== e3)
                throw new TypeError("Super expression must either be null or a function");
              t3.prototype = Object.create(e3 && e3.prototype, { constructor: { value: t3, writable: true, configurable: true } }), e3 && s(t3, e3);
            }
            function a(t3) {
              return (a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t4) {
                return typeof t4;
              } : function(t4) {
                return t4 && "function" == typeof Symbol && t4.constructor === Symbol && t4 !== Symbol.prototype ? "symbol" : typeof t4;
              })(t3);
            }
            function h(t3, e3) {
              return !e3 || "object" !== a(e3) && "function" != typeof e3 ? function(t4) {
                if (void 0 === t4)
                  throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return t4;
              }(t3) : e3;
            }
            function f2(t3) {
              return (f2 = Object.setPrototypeOf ? Object.getPrototypeOf : function(t4) {
                return t4.__proto__ || Object.getPrototypeOf(t4);
              })(t3);
            }
            var l = function() {
              function t3(e3, n3) {
                (0, r.Z)(this, t3), (0, u.Z)(this, "score_1", t3.MAX_INT), (0, u.Z)(this, "score_2", t3.MAX_INT), void 0 !== e3 && (this.score_1 = e3), void 0 !== n3 && (this.score_2 = n3);
              }
              return (0, o.Z)(t3, [{ key: "valueOf", value: function() {
                return this.score_1 + this.score_2;
              } }, { key: "assign", value: function(t4) {
                this.score_1 = t4.score_1, this.score_2 = t4.score_2;
              } }, { key: "isBlank", value: function() {
                return this.score_1 === t3.MAX_INT;
              } }, { key: "decreaseBy", value: function(t4) {
                this.score_1 += t4, this.score_2 += t4;
              } }]), t3;
            }();
            (0, u.Z)(l, "MAX_INT", Number.MAX_SAFE_INTEGER);
            var p = function() {
              function t3() {
                (0, r.Z)(this, t3);
              }
              return (0, o.Z)(t3, [{ key: "findPositionForNewNode", value: function(t4, e3) {
                var n3 = this, i3 = new l(), r2 = t4.width, o2 = t4.height;
                return e3.forEach(function(e4) {
                  n3.tryPlaceRectIn(e4, t4, r2, o2, i3), t4.constrainRotation || n3.tryPlaceRectIn(e4, t4, o2, r2, i3);
                }), i3;
              } }, { key: "tryPlaceRectIn", value: function(t4, e3, n3, i3, r2) {
                if (t4.width >= n3 && t4.height >= i3) {
                  var o2 = this.calculateScore(t4, n3, i3);
                  o2 < r2 && (e3.x = t4.x, e3.y = t4.y, e3.width = n3, e3.height = i3, e3.packed = true, r2.assign(o2));
                }
              } }, { key: "calculateScore", value: function(t4, e3, n3) {
                throw "NotImplementedError";
              } }]), t3;
            }();
            var g = function(t3) {
              c(u2, t3);
              var e3, n3, i3 = (e3 = u2, n3 = function() {
                if ("undefined" == typeof Reflect || !Reflect.construct)
                  return false;
                if (Reflect.construct.sham)
                  return false;
                if ("function" == typeof Proxy)
                  return true;
                try {
                  return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
                  })), true;
                } catch (t4) {
                  return false;
                }
              }(), function() {
                var t4, i4 = f2(e3);
                if (n3) {
                  var r2 = f2(this).constructor;
                  t4 = Reflect.construct(i4, arguments, r2);
                } else
                  t4 = i4.apply(this, arguments);
                return h(this, t4);
              });
              function u2() {
                return (0, r.Z)(this, u2), i3.apply(this, arguments);
              }
              return (0, o.Z)(u2, [{ key: "calculateScore", value: function(t4, e4, n4) {
                var i4 = [Math.abs(t4.width - e4), Math.abs(t4.height - n4)].sort(function(t5, e5) {
                  return t5 - e5;
                });
                return new l(i4[0], i4[1]);
              } }]), u2;
            }(p), y = function() {
              function t3(e3, n3) {
                var i3 = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                (0, r.Z)(this, t3), (0, u.Z)(this, "width", null), (0, u.Z)(this, "height", null), (0, u.Z)(this, "constrainRotation", false), (0, u.Z)(this, "x", 0), (0, u.Z)(this, "y", 0), (0, u.Z)(this, "packed", false), this.width = e3, this.height = n3, this.constrainRotation = i3;
              }
              return (0, o.Z)(t3, [{ key: "rotate", value: function() {
                var t4 = this.width, e3 = this.height;
                this.width = e3, this.height = t4;
              } }, { key: "label", get: function() {
                return "".concat(this.width, "x").concat(this.height, " at [").concat(this.x, ",").concat(this.y, "]");
              } }, { key: "area", get: function() {
                return this.width * this.height;
              } }]), t3;
            }();
            function v(t3, e3) {
              var n3 = Object.keys(t3);
              if (Object.getOwnPropertySymbols) {
                var i3 = Object.getOwnPropertySymbols(t3);
                e3 && (i3 = i3.filter(function(e4) {
                  return Object.getOwnPropertyDescriptor(t3, e4).enumerable;
                })), n3.push.apply(n3, i3);
              }
              return n3;
            }
            function d(t3) {
              for (var e3 = 1; e3 < arguments.length; e3++) {
                var n3 = null != arguments[e3] ? arguments[e3] : {};
                e3 % 2 ? v(Object(n3), true).forEach(function(e4) {
                  (0, u.Z)(t3, e4, n3[e4]);
                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t3, Object.getOwnPropertyDescriptors(n3)) : v(Object(n3)).forEach(function(e4) {
                  Object.defineProperty(t3, e4, Object.getOwnPropertyDescriptor(n3, e4));
                });
              }
              return t3;
            }
            var b = function() {
              function t3(e3, n3, i3) {
                (0, r.Z)(this, t3), (0, u.Z)(this, "width", null), (0, u.Z)(this, "height", null), (0, u.Z)(this, "boxes", []), (0, u.Z)(this, "heuristic", null), (0, u.Z)(this, "freeRectangles", []), this.width = e3, this.height = n3, this.freeRectangles = [new w(e3, n3)], this.heuristic = i3 || new g();
              }
              return (0, o.Z)(t3, [{ key: "area", get: function() {
                return this.width * this.height;
              } }, { key: "efficiency", get: function() {
                var t4 = 0;
                return this.boxes.forEach(function(e3) {
                  t4 += e3.area;
                }), 100 * t4 / this.area;
              } }, { key: "label", get: function() {
                return "".concat(this.width, "x").concat(this.height, " ").concat(this.efficiency, "%");
              } }, { key: "insert", value: function(t4) {
                if (t4.packed)
                  return false;
                if (this.heuristic.findPositionForNewNode(t4, this.freeRectangles), !t4.packed)
                  return false;
                for (var e3 = this.freeRectangles.length, n3 = 0; n3 < e3; )
                  this.splitFreeNode(this.freeRectangles[n3], t4) ? (this.freeRectangles.splice(n3, 1), e3--) : n3++;
                return this.pruneFreeList(), this.boxes.push(t4), true;
              } }, { key: "scoreFor", value: function(t4) {
                var e3 = new y(t4.width, t4.height, t4.constrainRotation);
                return this.heuristic.findPositionForNewNode(e3, this.freeRectangles);
              } }, { key: "isLargerThan", value: function(t4) {
                return this.width >= t4.width && this.height >= t4.height || this.height >= t4.width && this.width >= t4.height;
              } }, { key: "splitFreeNode", value: function(t4, e3) {
                return !(e3.x >= t4.x + t4.width || e3.x + e3.width <= t4.x || e3.y >= t4.y + t4.height || e3.y + e3.height <= t4.y || (this.trySplitFreeNodeVertically(t4, e3), this.trySplitFreeNodeHorizontally(t4, e3), 0));
              } }, { key: "trySplitFreeNodeVertically", value: function(t4, e3) {
                e3.x < t4.x + t4.width && e3.x + e3.width > t4.x && (this.tryLeaveFreeSpaceAtTop(t4, e3), this.tryLeaveFreeSpaceAtBottom(t4, e3));
              } }, { key: "tryLeaveFreeSpaceAtTop", value: function(t4, e3) {
                if (e3.y > t4.y && e3.y < t4.y + t4.height) {
                  var n3 = d({}, t4);
                  n3.height = e3.y - n3.y, this.freeRectangles.push(n3);
                }
              } }, { key: "tryLeaveFreeSpaceAtBottom", value: function(t4, e3) {
                if (e3.y + e3.height < t4.y + t4.height) {
                  var n3 = d({}, t4);
                  n3.y = e3.y + e3.height, n3.height = t4.y + t4.height - (e3.y + e3.height), this.freeRectangles.push(n3);
                }
              } }, { key: "trySplitFreeNodeHorizontally", value: function(t4, e3) {
                e3.y < t4.y + t4.height && e3.y + e3.height > t4.y && (this.tryLeaveFreeSpaceOnLeft(t4, e3), this.tryLeaveFreeSpaceOnRight(t4, e3));
              } }, { key: "tryLeaveFreeSpaceOnLeft", value: function(t4, e3) {
                if (e3.x > t4.x && e3.x < t4.x + t4.width) {
                  var n3 = d({}, t4);
                  n3.width = e3.x - n3.x, this.freeRectangles.push(n3);
                }
              } }, { key: "tryLeaveFreeSpaceOnRight", value: function(t4, e3) {
                if (e3.x + e3.width < t4.x + t4.width) {
                  var n3 = d({}, t4);
                  n3.x = e3.x + e3.width, n3.width = t4.x + t4.width - (e3.x + e3.width), this.freeRectangles.push(n3);
                }
              } }, { key: "pruneFreeList", value: function() {
                for (var t4 = 0; t4 < this.freeRectangles.length; ) {
                  var e3 = t4 + 1;
                  if (e3 === this.freeRectangles.length)
                    break;
                  for (; e3 < this.freeRectangles.length; ) {
                    if (this.isContainedIn(this.freeRectangles[t4], this.freeRectangles[e3])) {
                      this.freeRectangles.splice(t4, 1), t4--;
                      break;
                    }
                    this.isContainedIn(this.freeRectangles[e3], this.freeRectangles[t4]) ? this.freeRectangles.splice(e3, 1) : e3++, t4++;
                  }
                }
              } }, { key: "isContainedIn", value: function(t4, e3) {
                return t4 && e3 && t4.x >= e3.x && t4.y >= e3.y && t4.x + t4.width <= e3.x + e3.width && t4.y + t4.height <= e3.y + e3.height;
              } }]), t3;
            }(), w = function t3(e3, n3) {
              (0, r.Z)(this, t3), (0, u.Z)(this, "x", 0), (0, u.Z)(this, "y", 0), (0, u.Z)(this, "width", null), (0, u.Z)(this, "height", null), this.width = e3, this.height = n3;
            };
            function m(t3, e3) {
              (null == e3 || e3 > t3.length) && (e3 = t3.length);
              for (var n3 = 0, i3 = new Array(e3); n3 < e3; n3++)
                i3[n3] = t3[n3];
              return i3;
            }
            var k = function() {
              function t3(e3, n3) {
                (0, r.Z)(this, t3), (0, u.Z)(this, "bin", null), (0, u.Z)(this, "box", null), (0, u.Z)(this, "score", null), this.bin = e3, this.box = n3;
              }
              return (0, o.Z)(t3, [{ key: "calculate", value: function() {
                return this.score = this.bin.scoreFor(this.box), this.score;
              } }, { key: "fit", value: function() {
                return !this.score.isBlank();
              } }]), t3;
            }(), x = function() {
              function t3(e3, n3) {
                var i3 = this;
                (0, r.Z)(this, t3), (0, u.Z)(this, "entries", []), e3.forEach(function(t4) {
                  i3.addBinEntries(t4, n3);
                });
              }
              return (0, o.Z)(t3, [{ key: "debug", value: function() {
                n2(426), console.table(this.entries.map(function(t4) {
                  return { bin: t4.bin.label, box: t4.box.label, score: t4.score };
                }));
              } }, { key: "addBinEntries", value: function(t4, e3) {
                var n3 = this;
                e3.forEach(function(e4) {
                  var i3 = new k(t4, e4);
                  i3.calculate(), n3.entries.push(i3);
                });
              } }, { key: "any", value: function() {
                return this.boxes.some(function(t4) {
                  return t4;
                });
              } }, { key: "largestNotFitingBox", value: function() {
                var t4 = this;
                return this.entries.filter(function(t5) {
                  return t5.fit;
                }).map(function(t5) {
                  return t5.box;
                }), this.entries.forEach(function(e3) {
                  t4.fittingBoxes.contains(e3.box) && (t4.unfit = e3);
                }), !!null.box && null;
              } }, { key: "bestFit", value: function() {
                for (var t4 = null, e3 = 0; e3 < this.entries.length; e3++) {
                  var n3 = this.entries[e3];
                  n3.fit() && (null === t4 || n3.score < t4.score) && (t4 = n3);
                }
                return t4;
              } }, { key: "removeBox", value: function(t4) {
                this.entries = this.entries.filter(function(e3) {
                  return e3.box !== t4;
                });
              } }, { key: "addBin", value: function(t4) {
                this.addBinEntries(t4, this.currentBoxes());
              } }, { key: "recalculateBin", value: function(t4) {
                this.entries.filter(function(e3) {
                  return e3.bin === t4;
                }).forEach(function(t5) {
                  return t5.calculate();
                });
              } }, { key: "currentBoxes", value: function() {
                return function(t5) {
                  if (Array.isArray(t5))
                    return m(t5);
                }(t4 = new Set(this.entries.map(function(t5) {
                  return t5.box;
                }))) || function(t5) {
                  if ("undefined" != typeof Symbol && Symbol.iterator in Object(t5))
                    return Array.from(t5);
                }(t4) || function(t5, e3) {
                  if (t5) {
                    if ("string" == typeof t5)
                      return m(t5, e3);
                    var n3 = Object.prototype.toString.call(t5).slice(8, -1);
                    return "Object" === n3 && t5.constructor && (n3 = t5.constructor.name), "Map" === n3 || "Set" === n3 ? Array.from(t5) : "Arguments" === n3 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n3) ? m(t5, e3) : void 0;
                  }
                }(t4) || function() {
                  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
                }();
                var t4;
              } }]), t3;
            }(), R = function() {
              function t3(e3) {
                (0, r.Z)(this, t3), (0, u.Z)(this, "bins", []), (0, u.Z)(this, "unpackedBoxes", []), this.bins = e3;
              }
              return (0, o.Z)(t3, [{ key: "pack", value: function(t4) {
                var e3, n3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, i3 = [];
                if (0 === (t4 = t4.filter(function(t5) {
                  return !t5.packed;
                })).length)
                  return i3;
                for (var r2 = n3.limit || l.MAX_INT, o2 = new x(this.bins, t4); (e3 = o2.bestFit()) && (e3.bin.insert(e3.box), o2.removeBox(e3.box), o2.recalculateBin(e3.bin), i3.push(e3.box), !(i3.length >= r2)); )
                  ;
                return this.unpackedBoxes = t4.filter(function(t5) {
                  return !t5.packed;
                }), i3;
              } }]), t3;
            }();
            var Z = function(t3) {
              c(u2, t3);
              var e3, n3, i3 = (e3 = u2, n3 = function() {
                if ("undefined" == typeof Reflect || !Reflect.construct)
                  return false;
                if (Reflect.construct.sham)
                  return false;
                if ("function" == typeof Proxy)
                  return true;
                try {
                  return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
                  })), true;
                } catch (t4) {
                  return false;
                }
              }(), function() {
                var t4, i4 = f2(e3);
                if (n3) {
                  var r2 = f2(this).constructor;
                  t4 = Reflect.construct(i4, arguments, r2);
                } else
                  t4 = i4.apply(this, arguments);
                return h(this, t4);
              });
              function u2() {
                return (0, r.Z)(this, u2), i3.apply(this, arguments);
              }
              return (0, o.Z)(u2, [{ key: "calculateScore", value: function(t4, e4, n4) {
                var i4 = t4.width * t4.height - e4 * n4, r2 = Math.abs(t4.width - e4), o2 = Math.abs(t4.height - n4), u3 = Math.min(r2, o2);
                return new l(i4, u3);
              } }]), u2;
            }(p);
            var _ = function(t3) {
              c(u2, t3);
              var e3, n3, i3 = (e3 = u2, n3 = function() {
                if ("undefined" == typeof Reflect || !Reflect.construct)
                  return false;
                if (Reflect.construct.sham)
                  return false;
                if ("function" == typeof Proxy)
                  return true;
                try {
                  return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
                  })), true;
                } catch (t4) {
                  return false;
                }
              }(), function() {
                var t4, i4 = f2(e3);
                if (n3) {
                  var r2 = f2(this).constructor;
                  t4 = Reflect.construct(i4, arguments, r2);
                } else
                  t4 = i4.apply(this, arguments);
                return h(this, t4);
              });
              function u2() {
                return (0, r.Z)(this, u2), i3.apply(this, arguments);
              }
              return (0, o.Z)(u2, [{ key: "calculateScore", value: function(t4, e4, n4) {
                var i4 = [Math.abs(t4.width - e4), Math.abs(t4.height - n4)].sort(function(t5, e5) {
                  return t5 - e5;
                }).reverse();
                return new l(i4[0], i4[1]);
              } }]), u2;
            }(p);
            var O = function(t3) {
              c(u2, t3);
              var e3, n3, i3 = (e3 = u2, n3 = function() {
                if ("undefined" == typeof Reflect || !Reflect.construct)
                  return false;
                if (Reflect.construct.sham)
                  return false;
                if ("function" == typeof Proxy)
                  return true;
                try {
                  return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
                  })), true;
                } catch (t4) {
                  return false;
                }
              }(), function() {
                var t4, i4 = f2(e3);
                if (n3) {
                  var r2 = f2(this).constructor;
                  t4 = Reflect.construct(i4, arguments, r2);
                } else
                  t4 = i4.apply(this, arguments);
                return h(this, t4);
              });
              function u2() {
                return (0, r.Z)(this, u2), i3.apply(this, arguments);
              }
              return (0, o.Z)(u2, [{ key: "calculateScore", value: function(t4, e4, n4) {
                var i4 = t4.y + n4;
                return new l(i4, t4.x);
              } }]), u2;
            }(p);
          }, 625: function(t2, e2, n2) {
            "use strict";
            n2.r(e2), n2.d(e2, { Bin: function() {
              return h;
            }, Item: function() {
              return p;
            }, Packer: function() {
              return y;
            } });
            var i2 = n2(416), r = n2(225), o = n2(743), u = function(t3) {
              return Math.round(t3 * Math.pow(10, 5));
            };
            function s(t3) {
              for (var e3 = arguments.length, n3 = new Array(e3 > 1 ? e3 - 1 : 0), i3 = 1; i3 < e3; i3++)
                n3[i3 - 1] = arguments[i3];
            }
            var c, a = function() {
              var t3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "binpackingjs";
              return s.bind(void 0, t3);
            }("3D:"), h = function() {
              function t3(e3, n3, r2, s2, c2) {
                (0, i2.Z)(this, t3), (0, o.Z)(this, "name", ""), (0, o.Z)(this, "width", 0), (0, o.Z)(this, "height", 0), (0, o.Z)(this, "depth", 0), (0, o.Z)(this, "maxWeight", 0), (0, o.Z)(this, "items", []), this.name = e3, this.width = u(n3), this.height = u(r2), this.depth = u(s2), this.maxWeight = u(c2);
              }
              return (0, r.Z)(t3, [{ key: "getName", value: function() {
                return this.name;
              } }, { key: "getWidth", value: function() {
                return this.width;
              } }, { key: "getHeight", value: function() {
                return this.height;
              } }, { key: "getDepth", value: function() {
                return this.depth;
              } }, { key: "getMaxWeight", value: function() {
                return this.maxWeight;
              } }, { key: "getItems", value: function() {
                return this.items;
              } }, { key: "getVolume", value: function() {
                return this.getWidth() * this.getHeight() * this.getDepth();
              } }, { key: "getPackedWeight", value: function() {
                return this.items.reduce(function(t4, e3) {
                  return t4 + e3.getWeight();
                }, 0);
              } }, { key: "weighItem", value: function(t4) {
                var e3 = this.getMaxWeight();
                return !e3 || t4.getWeight() + this.getPackedWeight() <= e3;
              } }, { key: "scoreRotation", value: function(t4, e3) {
                t4.rotationType = e3;
                var n3 = t4.getDimension();
                return this.getWidth() < n3[0] || this.getHeight() < n3[1] || this.getDepth() < n3[2] ? 0 : Math.pow(n3[0] / this.getWidth(), 2) + Math.pow(n3[1] / this.getHeight(), 2) + Math.pow(n3[2] / this.getDepth(), 2);
              } }, { key: "getBestRotationOrder", value: function(t4) {
                for (var e3 = {}, n3 = 0; n3 < t4.allowedRotation.length; n3++) {
                  var i3 = t4.allowedRotation[n3];
                  e3[i3] = this.scoreRotation(t4, i3);
                }
                return Object.keys(e3).sort(function(t5, n4) {
                  return e3[n4] - e3[t5];
                }).map(Number);
              } }, { key: "putItem", value: function(t4, e3) {
                var n3 = this, i3 = false, r2 = this.getBestRotationOrder(t4);
                t4.position = e3;
                for (var o2 = 0; o2 < r2.length; o2++) {
                  t4.rotationType = r2[o2];
                  var u2 = t4.getDimension();
                  if (n3.getWidth() < e3[0] + u2[0] || n3.getHeight() < e3[1] + u2[1] || n3.getDepth() < e3[2] + u2[2])
                    i3 = false;
                  else {
                    i3 = true;
                    for (var s2 = 0; s2 < n3.items.length; s2++)
                      if (n3.items[s2].intersect(t4)) {
                        i3 = false;
                        break;
                      }
                    i3 && n3.items.push(t4);
                  }
                  if (a("try to putItem", i3, "item", t4.toString(), "box", n3.toString()), i3)
                    break;
                }
                return i3;
              } }, { key: "toString", value: function() {
                return "Bin:".concat(this.name, " (WxHxD = ").concat(this.getWidth(), "x").concat(this.getHeight(), "x").concat(this.getDepth(), ", MaxWg. = ").concat(this.getMaxWeight(), ")");
              } }]), t3;
            }(), f2 = [0, 0, 0], l = (c = {}, (0, o.Z)(c, 0, "RotationType_WHD (w,h,d)"), (0, o.Z)(c, 1, "RotationType_HWD (h,w,d)"), (0, o.Z)(c, 2, "RotationType_HDW (h,d,w)"), (0, o.Z)(c, 3, "RotationType_DHW (d,h,w)"), (0, o.Z)(c, 4, "RotationType_DWH (d,w,h)"), (0, o.Z)(c, 5, "RotationType_WDH (w,d,h)"), c), p = function() {
              function t3(e3, n3, r2, s2, c2, a2) {
                (0, i2.Z)(this, t3), (0, o.Z)(this, "name", ""), (0, o.Z)(this, "width", 0), (0, o.Z)(this, "height", 0), (0, o.Z)(this, "depth", 0), (0, o.Z)(this, "weight", 0), (0, o.Z)(this, "allowedRotation", [0, 1, 2, 3, 4, 5]), (0, o.Z)(this, "rotationType", 0), (0, o.Z)(this, "position", []), this.name = e3, this.width = u(n3), this.height = u(r2), this.depth = u(s2), this.weight = u(c2), this.allowedRotation = a2 || this.allowedRotation;
              }
              return (0, r.Z)(t3, [{ key: "getWidth", value: function() {
                return this.width;
              } }, { key: "getHeight", value: function() {
                return this.height;
              } }, { key: "getDepth", value: function() {
                return this.depth;
              } }, { key: "getWeight", value: function() {
                return this.weight;
              } }, { key: "getRotationType", value: function() {
                return this.rotationType;
              } }, { key: "getAllowedRotation", value: function() {
                return this.allowedRotation;
              } }, { key: "getRotationTypeString", value: function() {
                return l[this.getRotationType()];
              } }, { key: "getDimension", value: function() {
                var t4;
                switch (this.rotationType) {
                  case 0:
                    t4 = [this.getWidth(), this.getHeight(), this.getDepth()];
                    break;
                  case 1:
                    t4 = [this.getHeight(), this.getWidth(), this.getDepth()];
                    break;
                  case 2:
                    t4 = [this.getHeight(), this.getDepth(), this.getWidth()];
                    break;
                  case 3:
                    t4 = [this.getDepth(), this.getHeight(), this.getWidth()];
                    break;
                  case 4:
                    t4 = [this.getDepth(), this.getWidth(), this.getHeight()];
                    break;
                  case 5:
                    t4 = [this.getWidth(), this.getDepth(), this.getHeight()];
                }
                return t4;
              } }, { key: "intersect", value: function(t4) {
                return g(this, t4, 0, 1) && g(this, t4, 1, 2) && g(this, t4, 0, 2);
              } }, { key: "getVolume", value: function() {
                return this.getWidth() * this.getHeight() * this.getDepth();
              } }, { key: "toString", value: function() {
                return "Item:".concat(this.name, " (").concat(this.getRotationTypeString(), " = ").concat(this.getDimension().join("x"), ", Wg. = ").concat(this.weight, ")");
              } }]), t3;
            }(), g = function(t3, e3, n3, i3) {
              var r2, o2, u2, s2, c2, a2, h2, f3;
              return r2 = t3.getDimension(), o2 = e3.getDimension(), u2 = t3.position[n3] + r2[n3] / 2, s2 = t3.position[i3] + r2[i3] / 2, c2 = e3.position[n3] + o2[n3] / 2, a2 = e3.position[i3] + o2[i3] / 2, h2 = Math.max(u2, c2) - Math.min(u2, c2), f3 = Math.max(s2, a2) - Math.min(s2, a2), h2 < (r2[n3] + o2[n3]) / 2 && f3 < (r2[i3] + o2[i3]) / 2;
            }, y = function() {
              function t3() {
                (0, i2.Z)(this, t3), (0, o.Z)(this, "bins", []), (0, o.Z)(this, "items", []), (0, o.Z)(this, "unfitItems", []);
              }
              return (0, r.Z)(t3, [{ key: "addBin", value: function(t4) {
                this.bins.push(t4);
              } }, { key: "addItem", value: function(t4) {
                this.items.push(t4);
              } }, { key: "findFittedBin", value: function(t4) {
                for (var e3 = 0; e3 < this.bins.length; e3++) {
                  var n3 = this.bins[e3];
                  if (n3.weighItem(t4) && n3.putItem(t4, f2))
                    return 1 === n3.items.length && n3.items[0] === t4 && (n3.items = []), n3;
                }
                return null;
              } }, { key: "getBiggerBinThan", value: function(t4) {
                for (var e3 = t4.getVolume(), n3 = 0; n3 < this.bins; n3++) {
                  var i3 = this.bins[n3];
                  if (i3.getVolume() > e3)
                    return i3;
                }
                return null;
              } }, { key: "unfitItem", value: function() {
                0 !== this.items.length && (this.unfitItems.push(this.items[0]), this.items.splice(0, 1));
              } }, { key: "packToBin", value: function(t4, e3) {
                var n3 = null, i3 = [];
                if (!t4.weighItem(e3[0]) || !t4.putItem(e3[0], f2)) {
                  var r2 = this.getBiggerBinThan(t4);
                  return r2 ? this.packToBin(r2, e3) : this.items;
                }
                for (var o2 = 1; o2 < this.items.length; o2++) {
                  var u2 = false, s2 = this.items[o2];
                  if (t4.weighItem(s2))
                    t:
                      for (var c2 = 0; c2 < 3; c2++)
                        for (var a2 = 0; a2 < t4.items.length; a2++) {
                          var h2 = void 0, l2 = t4.items[a2], p2 = l2.getDimension();
                          switch (c2) {
                            case 0:
                              h2 = [l2.position[0] + p2[0], l2.position[1], l2.position[2]];
                              break;
                            case 1:
                              h2 = [l2.position[0], l2.position[1] + p2[1], l2.position[2]];
                              break;
                            case 2:
                              h2 = [l2.position[0], l2.position[1], l2.position[2] + p2[2]];
                          }
                          if (t4.putItem(s2, h2)) {
                            u2 = true;
                            break t;
                          }
                        }
                  if (!u2) {
                    for (; null !== n3; )
                      if ((n3 = this.getBiggerBinThan(t4)) && (n3.items.push(s2), 0 === this.packToBin(n3, n3.items).length)) {
                        t4 = n3, u2 = true;
                        break;
                      }
                    u2 || i3.push(s2);
                  }
                }
                return i3;
              } }, { key: "pack", value: function() {
                for (this.bins.sort(function(t5, e3) {
                  return t5.getVolume() - e3.getVolume();
                }), this.items.sort(function(t5, e3) {
                  return e3.getVolume() - t5.getVolume();
                }); this.items.length > 0; ) {
                  var t4 = this.findFittedBin(this.items[0]);
                  null !== t4 ? this.items = this.packToBin(t4, this.items) : this.unfitItem();
                }
                return null;
              } }]), t3;
            }();
          }, 23: function(t2) {
            var e2 = function() {
              "use strict";
              function t3(e4, i2, r, o) {
                "object" == typeof i2 && (r = i2.depth, o = i2.prototype, i2.filter, i2 = i2.circular);
                var u = [], s = [], c = "undefined" != typeof Buffer;
                return void 0 === i2 && (i2 = true), void 0 === r && (r = 1 / 0), function e5(r2, a) {
                  if (null === r2)
                    return null;
                  if (0 == a)
                    return r2;
                  var h, f2;
                  if ("object" != typeof r2)
                    return r2;
                  if (t3.__isArray(r2))
                    h = [];
                  else if (t3.__isRegExp(r2))
                    h = new RegExp(r2.source, n2(r2)), r2.lastIndex && (h.lastIndex = r2.lastIndex);
                  else if (t3.__isDate(r2))
                    h = new Date(r2.getTime());
                  else {
                    if (c && Buffer.isBuffer(r2))
                      return h = Buffer.allocUnsafe ? Buffer.allocUnsafe(r2.length) : new Buffer(r2.length), r2.copy(h), h;
                    void 0 === o ? (f2 = Object.getPrototypeOf(r2), h = Object.create(f2)) : (h = Object.create(o), f2 = o);
                  }
                  if (i2) {
                    var l = u.indexOf(r2);
                    if (-1 != l)
                      return s[l];
                    u.push(r2), s.push(h);
                  }
                  for (var p in r2) {
                    var g;
                    f2 && (g = Object.getOwnPropertyDescriptor(f2, p)), g && null == g.set || (h[p] = e5(r2[p], a - 1));
                  }
                  return h;
                }(e4, r);
              }
              function e3(t4) {
                return Object.prototype.toString.call(t4);
              }
              function n2(t4) {
                var e4 = "";
                return t4.global && (e4 += "g"), t4.ignoreCase && (e4 += "i"), t4.multiline && (e4 += "m"), e4;
              }
              return t3.clonePrototype = function(t4) {
                if (null === t4)
                  return null;
                var e4 = function() {
                };
                return e4.prototype = t4, new e4();
              }, t3.__objToStr = e3, t3.__isDate = function(t4) {
                return "object" == typeof t4 && "[object Date]" === e3(t4);
              }, t3.__isArray = function(t4) {
                return "object" == typeof t4 && "[object Array]" === e3(t4);
              }, t3.__isRegExp = function(t4) {
                return "object" == typeof t4 && "[object RegExp]" === e3(t4);
              }, t3.__getRegExpFlags = n2, t3;
            }();
            t2.exports && (t2.exports = e2);
          }, 426: function(t2, e2, n2) {
            !function() {
              "use strict";
              !function() {
                if ("undefined" == typeof console)
                  throw new Error("Weird, console object is undefined");
                if ("function" != typeof console.table || console.table !== l) {
                  var e3 = function(t3, e4) {
                    return typeof e4 === t3;
                  }.bind(null, "string"), i2 = u.bind(null, e3), r = u.bind(null, Array.isArray), o = n2(185);
                  t2.exports.getTable = function() {
                    var t3 = Array.prototype.slice.call(arguments), e4 = "";
                    return 2 === t3.length && "string" == typeof t3[0] && Array.isArray(t3[1]) ? h(t3[0], t3[1]) : 2 === t3.length && i2(t3[0]) && r(t3[1]) ? c(t3[0], t3[1], true) : (t3.forEach(function(n3, i3) {
                      if ("string" == typeof n3)
                        return e4 += n3, void (i3 !== t3.length - 1 && (e4 += "\n"));
                      Array.isArray(n3) ? e4 += s(n3) + "\n" : "object" == typeof n3 && (e4 += f2(n3));
                    }), e4);
                  }, console.table = l;
                }
                function u(t3, e4) {
                  return Array.isArray(e4) && e4.every(t3);
                }
                function s(t3) {
                  var e4 = new o();
                  return t3.forEach(function(t4) {
                    "string" == typeof t4 || "number" == typeof t4 ? e4.cell("item", t4) : Object.keys(t4).forEach(function(n3) {
                      e4.cell(n3, t4[n3]);
                    }), e4.newRow();
                  }), e4.toString();
                }
                function c(t3, e4, n3) {
                  var i3 = new o();
                  e4.forEach(function(e5) {
                    e5.forEach(function(e6, n4) {
                      i3.cell(t3[n4], e6);
                    }), i3.newRow();
                  });
                  var r2 = i3.toString();
                  return n3 ? r2 : console.log(r2);
                }
                function a(t3, e4) {
                  var n3 = s(e4), i3 = n3.indexOf("\n");
                  if (i3 > 0) {
                    t3.length > i3 && (i3 = t3.length), console.log(t3);
                    var r2, o2 = "";
                    for (r2 = 0; r2 < i3; r2 += 1)
                      o2 += "-";
                    console.log(o2);
                  }
                  console.log(n3);
                }
                function h(t3, e4) {
                  var n3 = s(e4), i3 = n3.indexOf("\n"), r2 = "";
                  if (i3 > 0) {
                    t3.length > i3 && (i3 = t3.length), r2 += t3 + "\n";
                    var o2, u2 = "";
                    for (o2 = 0; o2 < i3; o2 += 1)
                      u2 += "-";
                    r2 += u2 + "\n";
                  }
                  return r2 + n3;
                }
                function f2(t3) {
                  return s(function(t4) {
                    return Object.keys(t4).map(function(e4) {
                      return { key: e4, value: t4[e4] };
                    });
                  }(t3));
                }
                function l() {
                  var t3 = Array.prototype.slice.call(arguments);
                  return 2 === t3.length && "string" == typeof t3[0] && Array.isArray(t3[1]) ? a(t3[0], t3[1]) : 2 === t3.length && i2(t3[0]) && r(t3[1]) ? c(t3[0], t3[1]) : void t3.forEach(function(t4) {
                    if ("string" == typeof t4)
                      return console.log(t4);
                    Array.isArray(t4) ? console.log(s(t4)) : "object" == typeof t4 && console.log(f2(t4));
                  });
                }
              }();
            }();
          }, 451: function(t2, e2, n2) {
            var i2 = n2(23);
            t2.exports = function(t3, e3) {
              return t3 = t3 || {}, Object.keys(e3).forEach(function(n3) {
                void 0 === t3[n3] && (t3[n3] = i2(e3[n3]));
              }), t3;
            };
          }, 185: function(t2, e2, n2) {
            var i2;
            try {
              i2 = n2(561);
            } catch (t3) {
            }
            function r() {
              this.rows = [], this.row = { __printers: {} };
            }
            function o(t3) {
              return void 0 === t3 ? "" : "" + t3;
            }
            function u(t3) {
              var e3 = t3.replace(/\u001b\[\d+m/g, "");
              return null == i2 ? e3.length : i2(e3);
            }
            function s(t3) {
              return function(e3, n3) {
                var i3 = o(e3), r2 = u(i3);
                return (n3 > r2 ? Array(n3 - r2 + 1).join(t3) : "") + i3;
              };
            }
            t2.exports = r, r.prototype.newRow = function() {
              return this.rows.push(this.row), this.row = { __printers: {} }, this;
            }, r.prototype.cell = function(t3, e3, n3) {
              return this.row[t3] = e3, this.row.__printers[t3] = n3 || o, this;
            }, r.prototype.separator = "  ", r.string = o, r.leftPadder = s;
            var c = r.padLeft = s(" ");
            function a(t3) {
              return function(e3, n3) {
                var i3 = o(e3), r2 = u(i3);
                return i3 + (n3 > r2 ? Array(n3 - r2 + 1).join(t3) : "");
              };
            }
            r.rightPadder = a;
            var h = a(" ");
            function f2(t3, e3) {
              for (var n3 in t3)
                "__printers" != n3 && e3(n3, t3[n3]);
            }
            function l(t3, e3) {
              return t3 === e3 ? 0 : void 0 === t3 ? 1 : void 0 === e3 ? -1 : null === t3 ? 1 : null === e3 ? -1 : t3 > e3 ? 1 : t3 < e3 ? -1 : l(String(t3), String(e3));
            }
            r.number = function(t3) {
              return function(e3, n3) {
                if (null == e3)
                  return "";
                if ("number" != typeof e3)
                  throw new Error(e3 + " is not a number");
                var i3 = null == t3 ? e3 + "" : e3.toFixed(t3);
                return c(i3, n3);
              };
            }, r.prototype.columns = function() {
              for (var t3 = {}, e3 = 0; e3 < 2; e3++)
                this.rows.forEach(function(e4) {
                  var n3 = 0;
                  f2(e4, function(e5) {
                    n3 = Math.max(n3, t3[e5] || 0), t3[e5] = n3, n3++;
                  });
                });
              return Object.keys(t3).sort(function(e4, n3) {
                return t3[e4] - t3[n3];
              });
            }, r.prototype.print = function() {
              var t3 = this.columns(), e3 = this.separator, n3 = {}, i3 = "";
              return this.rows.forEach(function(t4) {
                f2(t4, function(e4, i4) {
                  var r2 = t4.__printers[e4].call(t4, i4);
                  n3[e4] = Math.max(u(r2), n3[e4] || 0);
                });
              }), this.rows.forEach(function(r2) {
                var o2 = "";
                t3.forEach(function(t4) {
                  var i4 = n3[t4], u2 = r2.hasOwnProperty(t4) ? "" + r2.__printers[t4].call(r2, r2[t4], i4) : "";
                  o2 += h(u2, i4) + e3;
                }), o2 = o2.slice(0, -e3.length), i3 += o2 + "\n";
              }), i3;
            }, r.prototype.toString = function() {
              var t3 = this.columns(), e3 = new r();
              return e3.separator = this.separator, t3.forEach(function(t4) {
                e3.cell(t4, t4);
              }), e3.newRow(), e3.pushDelimeter(t3), e3.rows = e3.rows.concat(this.rows), this.totals && this.rows.length && (e3.pushDelimeter(t3), this.forEachTotal(e3.cell.bind(e3)), e3.newRow()), e3.print();
            }, r.prototype.pushDelimeter = function(t3) {
              return (t3 = t3 || this.columns()).forEach(function(t4) {
                this.cell(t4, void 0, s("-"));
              }, this), this.newRow();
            }, r.prototype.forEachTotal = function(t3) {
              for (var e3 in this.totals) {
                var n3 = this.totals[e3], i3 = n3.init, r2 = this.rows.length;
                this.rows.forEach(function(t4, o2) {
                  i3 = n3.reduce.call(t4, i3, t4[e3], o2, r2);
                }), t3(e3, i3, n3.printer);
              }
            }, r.prototype.printTransposed = function(t3) {
              t3 = t3 || {};
              var e3 = new r();
              return e3.separator = t3.separator || this.separator, this.columns().forEach(function(n3) {
                e3.cell(0, n3, t3.namePrinter), this.rows.forEach(function(t4, i3) {
                  e3.cell(i3 + 1, t4[n3], t4.__printers[n3]);
                }), e3.newRow();
              }, this), e3.print();
            }, r.prototype.sort = function(t3) {
              if ("function" == typeof t3)
                return this.rows.sort(t3), this;
              var e3 = (Array.isArray(t3) ? t3 : this.columns()).map(function(t4) {
                var e4 = "asc", n3 = /(.*)\|\s*(asc|des)\s*$/.exec(t4);
                return n3 && (t4 = n3[1], e4 = n3[2]), function(n4, i3) {
                  return "asc" == e4 ? l(n4[t4], i3[t4]) : l(i3[t4], n4[t4]);
                };
              });
              return this.sort(function(t4, n3) {
                for (var i3 = 0; i3 < e3.length; i3++) {
                  var r2 = e3[i3](t4, n3);
                  if (0 != r2)
                    return r2;
                }
                return 0;
              });
            }, r.prototype.total = function(t3, e3) {
              return e3 = e3 || {}, this.totals = this.totals || {}, this.totals[t3] = { reduce: e3.reduce || r.aggr.sum, printer: e3.printer || c, init: null == e3.init ? 0 : e3.init }, this;
            }, r.aggr = {}, r.aggr.printer = function(t3, e3) {
              return e3 = e3 || o, function(n3, i3) {
                return c(t3 + e3(n3), i3);
              };
            }, r.aggr.sum = function(t3, e3) {
              return t3 + e3;
            }, r.aggr.avg = function(t3, e3, n3, i3) {
              return t3 += e3, n3 + 1 == i3 ? t3 / i3 : t3;
            }, r.print = function(t3, e3, n3) {
              var i3 = e3 || {};
              e3 = "function" == typeof e3 ? e3 : function(t4, e4) {
                for (var n4 in t4)
                  if (t4.hasOwnProperty(n4)) {
                    var r2 = i3[n4] || {};
                    e4(r2.name || n4, t4[n4], r2.printer);
                  }
              };
              var o2 = new r(), u2 = o2.cell.bind(o2);
              return Array.isArray(t3) ? (n3 = n3 || function(t4) {
                return t4.toString();
              }, t3.forEach(function(t4) {
                e3(t4, u2), o2.newRow();
              })) : (n3 = n3 || function(t4) {
                return t4.printTransposed({ separator: " : " });
              }, e3(t3, u2), o2.newRow()), n3(o2);
            }, r.log = function(t3, e3, n3) {
              console.log(r.print(t3, e3, n3));
            }, r.prototype.log = function() {
              console.log(this.toString());
            };
          }, 653: function(t2) {
            t2.exports = [[768, 879], [1155, 1158], [1160, 1161], [1425, 1469], [1471, 1471], [1473, 1474], [1476, 1477], [1479, 1479], [1536, 1539], [1552, 1557], [1611, 1630], [1648, 1648], [1750, 1764], [1767, 1768], [1770, 1773], [1807, 1807], [1809, 1809], [1840, 1866], [1958, 1968], [2027, 2035], [2305, 2306], [2364, 2364], [2369, 2376], [2381, 2381], [2385, 2388], [2402, 2403], [2433, 2433], [2492, 2492], [2497, 2500], [2509, 2509], [2530, 2531], [2561, 2562], [2620, 2620], [2625, 2626], [2631, 2632], [2635, 2637], [2672, 2673], [2689, 2690], [2748, 2748], [2753, 2757], [2759, 2760], [2765, 2765], [2786, 2787], [2817, 2817], [2876, 2876], [2879, 2879], [2881, 2883], [2893, 2893], [2902, 2902], [2946, 2946], [3008, 3008], [3021, 3021], [3134, 3136], [3142, 3144], [3146, 3149], [3157, 3158], [3260, 3260], [3263, 3263], [3270, 3270], [3276, 3277], [3298, 3299], [3393, 3395], [3405, 3405], [3530, 3530], [3538, 3540], [3542, 3542], [3633, 3633], [3636, 3642], [3655, 3662], [3761, 3761], [3764, 3769], [3771, 3772], [3784, 3789], [3864, 3865], [3893, 3893], [3895, 3895], [3897, 3897], [3953, 3966], [3968, 3972], [3974, 3975], [3984, 3991], [3993, 4028], [4038, 4038], [4141, 4144], [4146, 4146], [4150, 4151], [4153, 4153], [4184, 4185], [4448, 4607], [4959, 4959], [5906, 5908], [5938, 5940], [5970, 5971], [6002, 6003], [6068, 6069], [6071, 6077], [6086, 6086], [6089, 6099], [6109, 6109], [6155, 6157], [6313, 6313], [6432, 6434], [6439, 6440], [6450, 6450], [6457, 6459], [6679, 6680], [6912, 6915], [6964, 6964], [6966, 6970], [6972, 6972], [6978, 6978], [7019, 7027], [7616, 7626], [7678, 7679], [8203, 8207], [8234, 8238], [8288, 8291], [8298, 8303], [8400, 8431], [12330, 12335], [12441, 12442], [43014, 43014], [43019, 43019], [43045, 43046], [64286, 64286], [65024, 65039], [65056, 65059], [65279, 65279], [65529, 65531], [68097, 68099], [68101, 68102], [68108, 68111], [68152, 68154], [68159, 68159], [119143, 119145], [119155, 119170], [119173, 119179], [119210, 119213], [119362, 119364], [917505, 917505], [917536, 917631], [917760, 917999]];
          }, 561: function(t2, e2, n2) {
            "use strict";
            var i2 = n2(451), r = n2(653), o = { nul: 0, control: 0 };
            function u(t3, e3) {
              if ("string" != typeof t3)
                return s(t3, e3);
              for (var n3 = 0, i3 = 0; i3 < t3.length; i3++) {
                var r2 = s(t3.charCodeAt(i3), e3);
                if (r2 < 0)
                  return -1;
                n3 += r2;
              }
              return n3;
            }
            function s(t3, e3) {
              return 0 === t3 ? e3.nul : t3 < 32 || t3 >= 127 && t3 < 160 ? e3.control : function(t4) {
                var e4, n3 = 0, i3 = r.length - 1;
                if (t4 < r[0][0] || t4 > r[i3][1])
                  return false;
                for (; i3 >= n3; )
                  if (e4 = Math.floor((n3 + i3) / 2), t4 > r[e4][1])
                    n3 = e4 + 1;
                  else {
                    if (!(t4 < r[e4][0]))
                      return true;
                    i3 = e4 - 1;
                  }
                return false;
              }(t3) ? 0 : 1 + (t3 >= 4352 && (t3 <= 4447 || 9001 == t3 || 9002 == t3 || t3 >= 11904 && t3 <= 42191 && 12351 != t3 || t3 >= 44032 && t3 <= 55203 || t3 >= 63744 && t3 <= 64255 || t3 >= 65040 && t3 <= 65049 || t3 >= 65072 && t3 <= 65135 || t3 >= 65280 && t3 <= 65376 || t3 >= 65504 && t3 <= 65510 || t3 >= 131072 && t3 <= 196605 || t3 >= 196608 && t3 <= 262141));
            }
            t2.exports = function(t3) {
              return u(t3, o);
            }, t2.exports.config = function(t3) {
              return t3 = i2(t3 || {}, o), function(e3) {
                return u(e3, t3);
              };
            };
          } }, e = {};
          function n(i2) {
            if (e[i2])
              return e[i2].exports;
            var r = e[i2] = { exports: {} };
            return t[i2](r, r.exports, n), r.exports;
          }
          n.d = function(t2, e2) {
            for (var i2 in e2)
              n.o(e2, i2) && !n.o(t2, i2) && Object.defineProperty(t2, i2, { enumerable: true, get: e2[i2] });
          }, n.o = function(t2, e2) {
            return Object.prototype.hasOwnProperty.call(t2, e2);
          }, n.r = function(t2) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t2, "__esModule", { value: true });
          };
          var i = {};
          return function() {
            "use strict";
            n.r(i), n.d(i, { BP2D: function() {
              return t2;
            }, BP3D: function() {
              return e2;
            } });
            var t2 = n(269), e2 = n(625);
          }(), i;
        }();
      });
    }
  });

  // node_modules/uuid/dist/max.js
  var max_default;
  var init_max = __esm({
    "node_modules/uuid/dist/max.js"() {
      max_default = "ffffffff-ffff-ffff-ffff-ffffffffffff";
    }
  });

  // node_modules/uuid/dist/nil.js
  var nil_default;
  var init_nil = __esm({
    "node_modules/uuid/dist/nil.js"() {
      nil_default = "00000000-0000-0000-0000-000000000000";
    }
  });

  // node_modules/uuid/dist/regex.js
  var regex_default;
  var init_regex = __esm({
    "node_modules/uuid/dist/regex.js"() {
      regex_default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/i;
    }
  });

  // node_modules/uuid/dist/validate.js
  function validate(uuid) {
    return typeof uuid === "string" && regex_default.test(uuid);
  }
  var validate_default;
  var init_validate = __esm({
    "node_modules/uuid/dist/validate.js"() {
      init_regex();
      validate_default = validate;
    }
  });

  // node_modules/uuid/dist/parse.js
  function parse(uuid) {
    if (!validate_default(uuid)) {
      throw TypeError("Invalid UUID");
    }
    let v;
    return Uint8Array.of((v = parseInt(uuid.slice(0, 8), 16)) >>> 24, v >>> 16 & 255, v >>> 8 & 255, v & 255, (v = parseInt(uuid.slice(9, 13), 16)) >>> 8, v & 255, (v = parseInt(uuid.slice(14, 18), 16)) >>> 8, v & 255, (v = parseInt(uuid.slice(19, 23), 16)) >>> 8, v & 255, (v = parseInt(uuid.slice(24, 36), 16)) / 1099511627776 & 255, v / 4294967296 & 255, v >>> 24 & 255, v >>> 16 & 255, v >>> 8 & 255, v & 255);
  }
  var parse_default;
  var init_parse = __esm({
    "node_modules/uuid/dist/parse.js"() {
      init_validate();
      parse_default = parse;
    }
  });

  // node_modules/uuid/dist/stringify.js
  function unsafeStringify(arr, offset = 0) {
    return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
  }
  function stringify(arr, offset = 0) {
    const uuid = unsafeStringify(arr, offset);
    if (!validate_default(uuid)) {
      throw TypeError("Stringified UUID is invalid");
    }
    return uuid;
  }
  var byteToHex, stringify_default;
  var init_stringify = __esm({
    "node_modules/uuid/dist/stringify.js"() {
      init_validate();
      byteToHex = [];
      for (let i = 0; i < 256; ++i) {
        byteToHex.push((i + 256).toString(16).slice(1));
      }
      stringify_default = stringify;
    }
  });

  // node_modules/uuid/dist/rng.js
  function rng() {
    if (!getRandomValues) {
      if (typeof crypto === "undefined" || !crypto.getRandomValues) {
        throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
      }
      getRandomValues = crypto.getRandomValues.bind(crypto);
    }
    return getRandomValues(rnds8);
  }
  var getRandomValues, rnds8;
  var init_rng = __esm({
    "node_modules/uuid/dist/rng.js"() {
      rnds8 = new Uint8Array(16);
    }
  });

  // node_modules/uuid/dist/v1.js
  function v1(options, buf, offset) {
    let bytes;
    const isV6 = options?._v6 ?? false;
    if (options) {
      const optionsKeys = Object.keys(options);
      if (optionsKeys.length === 1 && optionsKeys[0] === "_v6") {
        options = void 0;
      }
    }
    if (options) {
      bytes = v1Bytes(options.random ?? options.rng?.() ?? rng(), options.msecs, options.nsecs, options.clockseq, options.node, buf, offset);
    } else {
      const now = Date.now();
      const rnds = rng();
      updateV1State(_state, now, rnds);
      bytes = v1Bytes(rnds, _state.msecs, _state.nsecs, isV6 ? void 0 : _state.clockseq, isV6 ? void 0 : _state.node, buf, offset);
    }
    return buf ?? unsafeStringify(bytes);
  }
  function updateV1State(state, now, rnds) {
    state.msecs ??= -Infinity;
    state.nsecs ??= 0;
    if (now === state.msecs) {
      state.nsecs++;
      if (state.nsecs >= 1e4) {
        state.node = void 0;
        state.nsecs = 0;
      }
    } else if (now > state.msecs) {
      state.nsecs = 0;
    } else if (now < state.msecs) {
      state.node = void 0;
    }
    if (!state.node) {
      state.node = rnds.slice(10, 16);
      state.node[0] |= 1;
      state.clockseq = (rnds[8] << 8 | rnds[9]) & 16383;
    }
    state.msecs = now;
    return state;
  }
  function v1Bytes(rnds, msecs, nsecs, clockseq, node, buf, offset = 0) {
    if (rnds.length < 16) {
      throw new Error("Random bytes length must be >= 16");
    }
    if (!buf) {
      buf = new Uint8Array(16);
      offset = 0;
    } else {
      if (offset < 0 || offset + 16 > buf.length) {
        throw new RangeError(`UUID byte range ${offset}:${offset + 15} is out of buffer bounds`);
      }
    }
    msecs ??= Date.now();
    nsecs ??= 0;
    clockseq ??= (rnds[8] << 8 | rnds[9]) & 16383;
    node ??= rnds.slice(10, 16);
    msecs += 122192928e5;
    const tl = ((msecs & 268435455) * 1e4 + nsecs) % 4294967296;
    buf[offset++] = tl >>> 24 & 255;
    buf[offset++] = tl >>> 16 & 255;
    buf[offset++] = tl >>> 8 & 255;
    buf[offset++] = tl & 255;
    const tmh = msecs / 4294967296 * 1e4 & 268435455;
    buf[offset++] = tmh >>> 8 & 255;
    buf[offset++] = tmh & 255;
    buf[offset++] = tmh >>> 24 & 15 | 16;
    buf[offset++] = tmh >>> 16 & 255;
    buf[offset++] = clockseq >>> 8 | 128;
    buf[offset++] = clockseq & 255;
    for (let n = 0; n < 6; ++n) {
      buf[offset++] = node[n];
    }
    return buf;
  }
  var _state, v1_default;
  var init_v1 = __esm({
    "node_modules/uuid/dist/v1.js"() {
      init_rng();
      init_stringify();
      _state = {};
      v1_default = v1;
    }
  });

  // node_modules/uuid/dist/v1ToV6.js
  function v1ToV6(uuid) {
    const v1Bytes2 = typeof uuid === "string" ? parse_default(uuid) : uuid;
    const v6Bytes = _v1ToV6(v1Bytes2);
    return typeof uuid === "string" ? unsafeStringify(v6Bytes) : v6Bytes;
  }
  function _v1ToV6(v1Bytes2) {
    return Uint8Array.of((v1Bytes2[6] & 15) << 4 | v1Bytes2[7] >> 4 & 15, (v1Bytes2[7] & 15) << 4 | (v1Bytes2[4] & 240) >> 4, (v1Bytes2[4] & 15) << 4 | (v1Bytes2[5] & 240) >> 4, (v1Bytes2[5] & 15) << 4 | (v1Bytes2[0] & 240) >> 4, (v1Bytes2[0] & 15) << 4 | (v1Bytes2[1] & 240) >> 4, (v1Bytes2[1] & 15) << 4 | (v1Bytes2[2] & 240) >> 4, 96 | v1Bytes2[2] & 15, v1Bytes2[3], v1Bytes2[8], v1Bytes2[9], v1Bytes2[10], v1Bytes2[11], v1Bytes2[12], v1Bytes2[13], v1Bytes2[14], v1Bytes2[15]);
  }
  var init_v1ToV6 = __esm({
    "node_modules/uuid/dist/v1ToV6.js"() {
      init_parse();
      init_stringify();
    }
  });

  // node_modules/uuid/dist/md5.js
  function md5(bytes) {
    const words = uint8ToUint32(bytes);
    const md5Bytes = wordsToMd5(words, bytes.length * 8);
    return uint32ToUint8(md5Bytes);
  }
  function uint32ToUint8(input) {
    const bytes = new Uint8Array(input.length * 4);
    for (let i = 0; i < input.length * 4; i++) {
      bytes[i] = input[i >> 2] >>> i % 4 * 8 & 255;
    }
    return bytes;
  }
  function getOutputLength(inputLength8) {
    return (inputLength8 + 64 >>> 9 << 4) + 14 + 1;
  }
  function wordsToMd5(x, len) {
    const xpad = new Uint32Array(getOutputLength(len)).fill(0);
    xpad.set(x);
    xpad[len >> 5] |= 128 << len % 32;
    xpad[xpad.length - 1] = len;
    x = xpad;
    let a = 1732584193;
    let b = -271733879;
    let c = -1732584194;
    let d = 271733878;
    for (let i = 0; i < x.length; i += 16) {
      const olda = a;
      const oldb = b;
      const oldc = c;
      const oldd = d;
      a = md5ff(a, b, c, d, x[i], 7, -680876936);
      d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
      c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
      b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
      a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
      d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
      c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
      b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
      a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
      d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
      c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
      b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
      a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
      d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
      c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
      b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
      a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
      d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
      c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
      b = md5gg(b, c, d, a, x[i], 20, -373897302);
      a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
      d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
      c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
      b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
      a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
      d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
      c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
      b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
      a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
      d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
      c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
      b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
      a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
      d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
      c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
      b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
      a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
      d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
      c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
      b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
      a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
      d = md5hh(d, a, b, c, x[i], 11, -358537222);
      c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
      b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
      a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
      d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
      c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
      b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
      a = md5ii(a, b, c, d, x[i], 6, -198630844);
      d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
      c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
      b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
      a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
      d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
      c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
      b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
      a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
      d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
      c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
      b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
      a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
      d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
      c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
      b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
      a = safeAdd(a, olda);
      b = safeAdd(b, oldb);
      c = safeAdd(c, oldc);
      d = safeAdd(d, oldd);
    }
    return Uint32Array.of(a, b, c, d);
  }
  function uint8ToUint32(input) {
    if (input.length === 0) {
      return new Uint32Array();
    }
    const output = new Uint32Array(getOutputLength(input.length * 8)).fill(0);
    for (let i = 0; i < input.length; i++) {
      output[i >> 2] |= (input[i] & 255) << i % 4 * 8;
    }
    return output;
  }
  function safeAdd(x, y) {
    const lsw = (x & 65535) + (y & 65535);
    const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return msw << 16 | lsw & 65535;
  }
  function bitRotateLeft(num, cnt) {
    return num << cnt | num >>> 32 - cnt;
  }
  function md5cmn(q, a, b, x, s, t) {
    return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
  }
  function md5ff(a, b, c, d, x, s, t) {
    return md5cmn(b & c | ~b & d, a, b, x, s, t);
  }
  function md5gg(a, b, c, d, x, s, t) {
    return md5cmn(b & d | c & ~d, a, b, x, s, t);
  }
  function md5hh(a, b, c, d, x, s, t) {
    return md5cmn(b ^ c ^ d, a, b, x, s, t);
  }
  function md5ii(a, b, c, d, x, s, t) {
    return md5cmn(c ^ (b | ~d), a, b, x, s, t);
  }
  var md5_default;
  var init_md5 = __esm({
    "node_modules/uuid/dist/md5.js"() {
      md5_default = md5;
    }
  });

  // node_modules/uuid/dist/v35.js
  function stringToBytes(str) {
    str = unescape(encodeURIComponent(str));
    const bytes = new Uint8Array(str.length);
    for (let i = 0; i < str.length; ++i) {
      bytes[i] = str.charCodeAt(i);
    }
    return bytes;
  }
  function v35(version2, hash, value, namespace, buf, offset) {
    const valueBytes = typeof value === "string" ? stringToBytes(value) : value;
    const namespaceBytes = typeof namespace === "string" ? parse_default(namespace) : namespace;
    if (typeof namespace === "string") {
      namespace = parse_default(namespace);
    }
    if (namespace?.length !== 16) {
      throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
    }
    let bytes = new Uint8Array(16 + valueBytes.length);
    bytes.set(namespaceBytes);
    bytes.set(valueBytes, namespaceBytes.length);
    bytes = hash(bytes);
    bytes[6] = bytes[6] & 15 | version2;
    bytes[8] = bytes[8] & 63 | 128;
    if (buf) {
      offset = offset || 0;
      for (let i = 0; i < 16; ++i) {
        buf[offset + i] = bytes[i];
      }
      return buf;
    }
    return unsafeStringify(bytes);
  }
  var DNS, URL;
  var init_v35 = __esm({
    "node_modules/uuid/dist/v35.js"() {
      init_parse();
      init_stringify();
      DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
      URL = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
    }
  });

  // node_modules/uuid/dist/v3.js
  function v3(value, namespace, buf, offset) {
    return v35(48, md5_default, value, namespace, buf, offset);
  }
  var v3_default;
  var init_v3 = __esm({
    "node_modules/uuid/dist/v3.js"() {
      init_md5();
      init_v35();
      v3.DNS = DNS;
      v3.URL = URL;
      v3_default = v3;
    }
  });

  // node_modules/uuid/dist/native.js
  var randomUUID, native_default;
  var init_native = __esm({
    "node_modules/uuid/dist/native.js"() {
      randomUUID = typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
      native_default = { randomUUID };
    }
  });

  // node_modules/uuid/dist/v4.js
  function _v4(options, buf, offset) {
    options = options || {};
    const rnds = options.random ?? options.rng?.() ?? rng();
    if (rnds.length < 16) {
      throw new Error("Random bytes length must be >= 16");
    }
    rnds[6] = rnds[6] & 15 | 64;
    rnds[8] = rnds[8] & 63 | 128;
    if (buf) {
      offset = offset || 0;
      if (offset < 0 || offset + 16 > buf.length) {
        throw new RangeError(`UUID byte range ${offset}:${offset + 15} is out of buffer bounds`);
      }
      for (let i = 0; i < 16; ++i) {
        buf[offset + i] = rnds[i];
      }
      return buf;
    }
    return unsafeStringify(rnds);
  }
  function v4(options, buf, offset) {
    if (native_default.randomUUID && !buf && !options) {
      return native_default.randomUUID();
    }
    return _v4(options, buf, offset);
  }
  var v4_default;
  var init_v4 = __esm({
    "node_modules/uuid/dist/v4.js"() {
      init_native();
      init_rng();
      init_stringify();
      v4_default = v4;
    }
  });

  // node_modules/uuid/dist/sha1.js
  function f(s, x, y, z) {
    switch (s) {
      case 0:
        return x & y ^ ~x & z;
      case 1:
        return x ^ y ^ z;
      case 2:
        return x & y ^ x & z ^ y & z;
      case 3:
        return x ^ y ^ z;
    }
  }
  function ROTL(x, n) {
    return x << n | x >>> 32 - n;
  }
  function sha1(bytes) {
    const K = [1518500249, 1859775393, 2400959708, 3395469782];
    const H = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
    const newBytes = new Uint8Array(bytes.length + 1);
    newBytes.set(bytes);
    newBytes[bytes.length] = 128;
    bytes = newBytes;
    const l = bytes.length / 4 + 2;
    const N = Math.ceil(l / 16);
    const M = new Array(N);
    for (let i = 0; i < N; ++i) {
      const arr = new Uint32Array(16);
      for (let j = 0; j < 16; ++j) {
        arr[j] = bytes[i * 64 + j * 4] << 24 | bytes[i * 64 + j * 4 + 1] << 16 | bytes[i * 64 + j * 4 + 2] << 8 | bytes[i * 64 + j * 4 + 3];
      }
      M[i] = arr;
    }
    M[N - 1][14] = (bytes.length - 1) * 8 / Math.pow(2, 32);
    M[N - 1][14] = Math.floor(M[N - 1][14]);
    M[N - 1][15] = (bytes.length - 1) * 8 & 4294967295;
    for (let i = 0; i < N; ++i) {
      const W = new Uint32Array(80);
      for (let t = 0; t < 16; ++t) {
        W[t] = M[i][t];
      }
      for (let t = 16; t < 80; ++t) {
        W[t] = ROTL(W[t - 3] ^ W[t - 8] ^ W[t - 14] ^ W[t - 16], 1);
      }
      let a = H[0];
      let b = H[1];
      let c = H[2];
      let d = H[3];
      let e = H[4];
      for (let t = 0; t < 80; ++t) {
        const s = Math.floor(t / 20);
        const T = ROTL(a, 5) + f(s, b, c, d) + e + K[s] + W[t] >>> 0;
        e = d;
        d = c;
        c = ROTL(b, 30) >>> 0;
        b = a;
        a = T;
      }
      H[0] = H[0] + a >>> 0;
      H[1] = H[1] + b >>> 0;
      H[2] = H[2] + c >>> 0;
      H[3] = H[3] + d >>> 0;
      H[4] = H[4] + e >>> 0;
    }
    return Uint8Array.of(H[0] >> 24, H[0] >> 16, H[0] >> 8, H[0], H[1] >> 24, H[1] >> 16, H[1] >> 8, H[1], H[2] >> 24, H[2] >> 16, H[2] >> 8, H[2], H[3] >> 24, H[3] >> 16, H[3] >> 8, H[3], H[4] >> 24, H[4] >> 16, H[4] >> 8, H[4]);
  }
  var sha1_default;
  var init_sha1 = __esm({
    "node_modules/uuid/dist/sha1.js"() {
      sha1_default = sha1;
    }
  });

  // node_modules/uuid/dist/v5.js
  function v5(value, namespace, buf, offset) {
    return v35(80, sha1_default, value, namespace, buf, offset);
  }
  var v5_default;
  var init_v5 = __esm({
    "node_modules/uuid/dist/v5.js"() {
      init_sha1();
      init_v35();
      v5.DNS = DNS;
      v5.URL = URL;
      v5_default = v5;
    }
  });

  // node_modules/uuid/dist/v6.js
  function v6(options, buf, offset) {
    options ??= {};
    offset ??= 0;
    let bytes = v1_default({ ...options, _v6: true }, new Uint8Array(16));
    bytes = v1ToV6(bytes);
    if (buf) {
      for (let i = 0; i < 16; i++) {
        buf[offset + i] = bytes[i];
      }
      return buf;
    }
    return unsafeStringify(bytes);
  }
  var v6_default;
  var init_v6 = __esm({
    "node_modules/uuid/dist/v6.js"() {
      init_stringify();
      init_v1();
      init_v1ToV6();
      v6_default = v6;
    }
  });

  // node_modules/uuid/dist/v6ToV1.js
  function v6ToV1(uuid) {
    const v6Bytes = typeof uuid === "string" ? parse_default(uuid) : uuid;
    const v1Bytes2 = _v6ToV1(v6Bytes);
    return typeof uuid === "string" ? unsafeStringify(v1Bytes2) : v1Bytes2;
  }
  function _v6ToV1(v6Bytes) {
    return Uint8Array.of((v6Bytes[3] & 15) << 4 | v6Bytes[4] >> 4 & 15, (v6Bytes[4] & 15) << 4 | (v6Bytes[5] & 240) >> 4, (v6Bytes[5] & 15) << 4 | v6Bytes[6] & 15, v6Bytes[7], (v6Bytes[1] & 15) << 4 | (v6Bytes[2] & 240) >> 4, (v6Bytes[2] & 15) << 4 | (v6Bytes[3] & 240) >> 4, 16 | (v6Bytes[0] & 240) >> 4, (v6Bytes[0] & 15) << 4 | (v6Bytes[1] & 240) >> 4, v6Bytes[8], v6Bytes[9], v6Bytes[10], v6Bytes[11], v6Bytes[12], v6Bytes[13], v6Bytes[14], v6Bytes[15]);
  }
  var init_v6ToV1 = __esm({
    "node_modules/uuid/dist/v6ToV1.js"() {
      init_parse();
      init_stringify();
    }
  });

  // node_modules/uuid/dist/v7.js
  function v7(options, buf, offset) {
    let bytes;
    if (options) {
      bytes = v7Bytes(options.random ?? options.rng?.() ?? rng(), options.msecs, options.seq, buf, offset);
    } else {
      const now = Date.now();
      const rnds = rng();
      updateV7State(_state2, now, rnds);
      bytes = v7Bytes(rnds, _state2.msecs, _state2.seq, buf, offset);
    }
    return buf ?? unsafeStringify(bytes);
  }
  function updateV7State(state, now, rnds) {
    state.msecs ??= -Infinity;
    state.seq ??= 0;
    if (now > state.msecs) {
      state.seq = rnds[6] << 23 | rnds[7] << 16 | rnds[8] << 8 | rnds[9];
      state.msecs = now;
    } else {
      state.seq = state.seq + 1 | 0;
      if (state.seq === 0) {
        state.msecs++;
      }
    }
    return state;
  }
  function v7Bytes(rnds, msecs, seq, buf, offset = 0) {
    if (rnds.length < 16) {
      throw new Error("Random bytes length must be >= 16");
    }
    if (!buf) {
      buf = new Uint8Array(16);
      offset = 0;
    } else {
      if (offset < 0 || offset + 16 > buf.length) {
        throw new RangeError(`UUID byte range ${offset}:${offset + 15} is out of buffer bounds`);
      }
    }
    msecs ??= Date.now();
    seq ??= rnds[6] * 127 << 24 | rnds[7] << 16 | rnds[8] << 8 | rnds[9];
    buf[offset++] = msecs / 1099511627776 & 255;
    buf[offset++] = msecs / 4294967296 & 255;
    buf[offset++] = msecs / 16777216 & 255;
    buf[offset++] = msecs / 65536 & 255;
    buf[offset++] = msecs / 256 & 255;
    buf[offset++] = msecs & 255;
    buf[offset++] = 112 | seq >>> 28 & 15;
    buf[offset++] = seq >>> 20 & 255;
    buf[offset++] = 128 | seq >>> 14 & 63;
    buf[offset++] = seq >>> 6 & 255;
    buf[offset++] = seq << 2 & 255 | rnds[10] & 3;
    buf[offset++] = rnds[11];
    buf[offset++] = rnds[12];
    buf[offset++] = rnds[13];
    buf[offset++] = rnds[14];
    buf[offset++] = rnds[15];
    return buf;
  }
  var _state2, v7_default;
  var init_v7 = __esm({
    "node_modules/uuid/dist/v7.js"() {
      init_rng();
      init_stringify();
      _state2 = {};
      v7_default = v7;
    }
  });

  // node_modules/uuid/dist/version.js
  function version(uuid) {
    if (!validate_default(uuid)) {
      throw TypeError("Invalid UUID");
    }
    return parseInt(uuid.slice(14, 15), 16);
  }
  var version_default;
  var init_version = __esm({
    "node_modules/uuid/dist/version.js"() {
      init_validate();
      version_default = version;
    }
  });

  // node_modules/uuid/dist/index.js
  var dist_exports = {};
  __export(dist_exports, {
    MAX: () => max_default,
    NIL: () => nil_default,
    parse: () => parse_default,
    stringify: () => stringify_default,
    v1: () => v1_default,
    v1ToV6: () => v1ToV6,
    v3: () => v3_default,
    v4: () => v4_default,
    v5: () => v5_default,
    v6: () => v6_default,
    v6ToV1: () => v6ToV1,
    v7: () => v7_default,
    validate: () => validate_default,
    version: () => version_default
  });
  var init_dist = __esm({
    "node_modules/uuid/dist/index.js"() {
      init_max();
      init_nil();
      init_parse();
      init_stringify();
      init_v1();
      init_v1ToV6();
      init_v3();
      init_v4();
      init_v5();
      init_v6();
      init_v6ToV1();
      init_v7();
      init_validate();
      init_version();
    }
  });

  // node_modules/3d-bin-packing-ts/dist/index.js
  var require_dist = __commonJS({
    "node_modules/3d-bin-packing-ts/dist/index.js"(exports, module) {
      "use strict";
      var __defProp2 = Object.defineProperty;
      var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
      var __getOwnPropNames2 = Object.getOwnPropertyNames;
      var __hasOwnProp2 = Object.prototype.hasOwnProperty;
      var __export2 = (target, all) => {
        for (var name in all)
          __defProp2(target, name, { get: all[name], enumerable: true });
      };
      var __copyProps2 = (to, from, except, desc) => {
        if (from && typeof from === "object" || typeof from === "function") {
          for (let key of __getOwnPropNames2(from))
            if (!__hasOwnProp2.call(to, key) && key !== except)
              __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
        }
        return to;
      };
      var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
      var src_exports = {};
      __export2(src_exports, {
        AlgorithmPackingResult: () => AlgorithmPackingResult,
        Container: () => Container2,
        ContainerPackingResult: () => ContainerPackingResult,
        EB_AFIT: () => EB_AFIT,
        Item: () => Item,
        Layer: () => Layer,
        PackingAlgorithmType: () => PackingAlgorithmType,
        PackingService: () => PackingService2,
        ScrapPad: () => ScrapPad
      });
      module.exports = __toCommonJS2(src_exports);
      var import_uuid = (init_dist(), __toCommonJS(dist_exports));
      var PackingAlgorithmType = /* @__PURE__ */ ((PackingAlgorithmType2) => {
        PackingAlgorithmType2["EB_AFIT"] = "EB_AFIT";
        return PackingAlgorithmType2;
      })(PackingAlgorithmType || {});
      var Item = class {
        constructor(id, dim1, dim2, dim3, quantity) {
          this.id = id;
          this.dim1 = dim1;
          this.dim2 = dim2;
          this.dim3 = dim3;
          this.quantity = quantity;
          this.volume = dim1 * dim2 * dim3;
        }
        volume;
        isPacked = false;
        coordX = 0;
        coordY = 0;
        coordZ = 0;
        packDimX = 0;
        packDimY = 0;
        packDimZ = 0;
      };
      var Container2 = class {
        constructor(id, length, width, height) {
          this.id = id;
          this.length = length;
          this.width = width;
          this.height = height;
          this.volume = length * width * height;
        }
        volume;
      };
      var AlgorithmPackingResult = class {
        constructor(algorithm) {
          this.algorithm = algorithm;
        }
        packedItems = [];
        unpackedItems = [];
        isCompletePacked = false;
        packTimeMilliseconds = 0;
        percentContainerVolumePacked = 0;
        percentItemVolumePacked = 0;
      };
      var ContainerPackingResult = class {
        constructor(containerId) {
          this.containerId = containerId;
        }
        algorithmPackingResults = [];
      };
      var Layer = class {
        constructor(layerDim = 0, layerEval = 0) {
          this.layerDim = layerDim;
          this.layerEval = layerEval;
        }
      };
      var ScrapPad = class {
        cumX = 0;
        cumZ = 0;
        post = null;
        pre = null;
      };
      var EB_AFIT = class {
        itemsToPack = [];
        itemsPackedInOrder = [];
        layers = [];
        result;
        scrapfirst = new ScrapPad();
        smallestZ = new ScrapPad();
        trash = new ScrapPad();
        evened;
        hundredPercentPacked = false;
        layerDone;
        packing;
        packingBest = false;
        quit = false;
        bboxi = 0;
        bestIteration = 0;
        bestVariant = 0;
        boxi = 0;
        cboxi = 0;
        layerListLen = 0;
        packedItemCount = 0;
        x = 0;
        bbfx = 0;
        bbfy = 0;
        bbfz = 0;
        bboxx = 0;
        bboxy = 0;
        bboxz = 0;
        bfx = 0;
        bfy = 0;
        bfz = 0;
        boxx = 0;
        boxy = 0;
        boxz = 0;
        cboxx = 0;
        cboxy = 0;
        cboxz = 0;
        layerinlayer = 0;
        layerThickness = 0;
        lilz = 0;
        packedVolume = 0;
        packedy = 0;
        prelayer = 0;
        prepackedy = 0;
        preremainpy = 0;
        px = 0;
        py = 0;
        pz = 0;
        remainpy = 0;
        remainpz = 0;
        itemsToPackCount = 0;
        totalItemVolume = 0;
        totalContainerVolume = 0;
        run(container, items) {
          this.initialize(container, items);
          this.executeIterations(container);
          this.report(container);
          const result = new AlgorithmPackingResult(
            "EB_AFIT"
            /* EB_AFIT */
          );
          for (let i = 1; i <= this.itemsToPackCount; i++) {
            this.itemsToPack[i].quantity = 1;
            if (!this.itemsToPack[i].isPacked) {
              result.unpackedItems.push(this.itemsToPack[i]);
            } else {
              result.packedItems.push(this.itemsToPack[i]);
            }
          }
          if (result.unpackedItems.length === 0) {
            result.isCompletePacked = true;
          }
          return result;
        }
        analyzeBox(hmx, hy, hmy, hz, hmz, dim1, dim2, dim3) {
          if (dim1 <= hmx && dim2 <= hmy && dim3 <= hmz) {
            if (dim2 <= hy) {
              if (hy - dim2 < this.bfy) {
                this.boxx = dim1;
                this.boxy = dim2;
                this.boxz = dim3;
                this.bfx = hmx - dim1;
                this.bfy = hy - dim2;
                this.bfz = Math.abs(hz - dim3);
                this.boxi = this.x;
              } else if (hy - dim2 == this.bfy && hmx - dim1 < this.bfx) {
                this.boxx = dim1;
                this.boxy = dim2;
                this.boxz = dim3;
                this.bfx = hmx - dim1;
                this.bfy = hy - dim2;
                this.bfz = Math.abs(hz - dim3);
                this.boxi = this.x;
              } else if (hy - dim2 == this.bfy && hmx - dim1 == this.bfx && Math.abs(hz - dim3) < this.bfz) {
                this.boxx = dim1;
                this.boxy = dim2;
                this.boxz = dim3;
                this.bfx = hmx - dim1;
                this.bfy = hy - dim2;
                this.bfz = Math.abs(hz - dim3);
                this.boxi = this.x;
              }
            } else {
              if (dim2 - hy < this.bbfy) {
                this.bboxx = dim1;
                this.bboxy = dim2;
                this.bboxz = dim3;
                this.bbfx = hmx - dim1;
                this.bbfy = dim2 - hy;
                this.bbfz = Math.abs(hz - dim3);
                this.bboxi = this.x;
              } else if (dim2 - hy == this.bbfy && hmx - dim1 < this.bbfx) {
                this.bboxx = dim1;
                this.bboxy = dim2;
                this.bboxz = dim3;
                this.bbfx = hmx - dim1;
                this.bbfy = dim2 - hy;
                this.bbfz = Math.abs(hz - dim3);
                this.bboxi = this.x;
              } else if (dim2 - hy == this.bbfy && hmx - dim1 == this.bbfx && Math.abs(hz - dim3) < this.bbfz) {
                this.bboxx = dim1;
                this.bboxy = dim2;
                this.bboxz = dim3;
                this.bbfx = hmx - dim1;
                this.bbfy = dim2 - hy;
                this.bbfz = Math.abs(hz - dim3);
                this.bboxi = this.x;
              }
            }
          }
        }
        checkFound() {
          this.evened = false;
          if (this.boxi != 0) {
            this.cboxi = this.boxi;
            this.cboxx = this.boxx;
            this.cboxy = this.boxy;
            this.cboxz = this.boxz;
          } else {
            if (this.bboxi > 0 && (this.layerinlayer != 0 || this.smallestZ.pre == null && this.smallestZ.post == null)) {
              if (this.layerinlayer == 0) {
                this.prelayer = this.layerThickness;
                this.lilz = this.smallestZ.cumZ;
              }
              this.cboxi = this.bboxi;
              this.cboxx = this.bboxx;
              this.cboxy = this.bboxy;
              this.cboxz = this.bboxz;
              this.layerinlayer = this.layerinlayer + this.bboxy - this.layerThickness;
              this.layerThickness = this.bboxy;
            } else {
              if (this.smallestZ.pre == null && this.smallestZ.post == null) {
                this.layerDone = true;
              } else {
                this.evened = true;
                if (this.smallestZ.pre == null) {
                  this.trash = this.smallestZ.post;
                  this.smallestZ.cumX = this.smallestZ.post.cumX;
                  this.smallestZ.cumZ = this.smallestZ.post.cumZ;
                  this.smallestZ.post = this.smallestZ.post.post;
                  if (this.smallestZ.post != null) {
                    this.smallestZ.post.pre = this.smallestZ;
                  }
                } else if (this.smallestZ.post == null) {
                  this.smallestZ.pre.post = null;
                  this.smallestZ.pre.cumX = this.smallestZ.cumX;
                } else {
                  if (this.smallestZ.pre.cumZ == this.smallestZ.post.cumZ) {
                    this.smallestZ.pre.post = this.smallestZ.post.post;
                    if (this.smallestZ.post.post != null) {
                      this.smallestZ.post.post.pre = this.smallestZ.pre;
                    }
                    this.smallestZ.pre.cumX = this.smallestZ.post.cumX;
                  } else {
                    this.smallestZ.pre.post = this.smallestZ.post;
                    this.smallestZ.post.pre = this.smallestZ.pre;
                    if (this.smallestZ.pre.cumZ < this.smallestZ.post.cumZ) {
                      this.smallestZ.pre.cumX = this.smallestZ.cumX;
                    }
                  }
                }
              }
            }
          }
        }
        executeIterations(container) {
          let itelayer;
          let layersIndex;
          let bestVolume = 0;
          for (let containerOrientationVariant = 1; containerOrientationVariant <= 6 && !this.quit; containerOrientationVariant++) {
            switch (containerOrientationVariant) {
              case 1:
                this.px = container.length;
                this.py = container.height;
                this.pz = container.width;
                break;
              case 2:
                this.px = container.width;
                this.py = container.height;
                this.pz = container.length;
                break;
              case 3:
                this.px = container.width;
                this.py = container.length;
                this.pz = container.height;
                break;
              case 4:
                this.px = container.height;
                this.py = container.length;
                this.pz = container.width;
                break;
              case 5:
                this.px = container.length;
                this.py = container.width;
                this.pz = container.height;
                break;
              case 6:
                this.px = container.height;
                this.py = container.width;
                this.pz = container.length;
                break;
            }
            this.layers.push(new Layer(0, -1));
            this.listCanditLayers();
            this.layers.sort((a, b) => a.layerEval - b.layerEval);
            for (layersIndex = 1; layersIndex <= this.layerListLen && !this.quit; layersIndex++) {
              this.packedVolume = 0;
              this.packedy = 0;
              this.packing = true;
              this.layerThickness = this.layers[layersIndex].layerDim;
              itelayer = layersIndex;
              this.remainpy = this.py;
              this.remainpz = this.pz;
              this.packedItemCount = 0;
              for (this.x = 1; this.x <= this.itemsToPackCount; this.x++) {
                this.itemsToPack[this.x].isPacked = false;
              }
              do {
                this.layerinlayer = 0;
                this.layerDone = false;
                this.packLayer();
                this.packedy = this.packedy + this.layerThickness;
                this.remainpy = this.py - this.packedy;
                if (this.layerinlayer != 0 && !this.quit) {
                  this.prepackedy = this.packedy;
                  this.preremainpy = this.remainpy;
                  this.remainpy = this.layerThickness - this.prelayer;
                  this.packedy = this.packedy - this.layerThickness + this.prelayer;
                  this.remainpz = this.lilz;
                  this.layerThickness = this.layerinlayer;
                  this.layerDone = false;
                  this.packLayer();
                  this.packedy = this.prepackedy;
                  this.remainpy = this.preremainpy;
                  this.remainpz = this.pz;
                }
                this.findLayer(this.remainpy);
              } while (this.packing && !this.quit);
              if (this.packedVolume > bestVolume && !this.quit) {
                bestVolume = this.packedVolume;
                this.bestVariant = containerOrientationVariant;
                this.bestIteration = itelayer;
              }
              if (this.hundredPercentPacked)
                break;
            }
            if (this.hundredPercentPacked)
              break;
            if (container.length == container.height && container.height == container.width)
              containerOrientationVariant = 6;
            this.layers = [];
          }
        }
        findBox(hmx, hy, hmy, hz, hmz) {
          let y;
          this.bfx = 32767;
          this.bfy = 32767;
          this.bfz = 32767;
          this.bbfx = 32767;
          this.bbfy = 32767;
          this.bbfz = 32767;
          this.boxi = 0;
          this.bboxi = 0;
          for (y = 1; y <= this.itemsToPackCount; y = y + this.itemsToPack[y].quantity) {
            for (this.x = y; this.x < this.x + this.itemsToPack[y].quantity - 1; this.x++) {
              if (!this.itemsToPack[this.x].isPacked)
                break;
            }
            if (this.itemsToPack[this.x].isPacked)
              continue;
            if (this.x > this.itemsToPackCount)
              return;
            this.analyzeBox(
              hmx,
              hy,
              hmy,
              hz,
              hmz,
              this.itemsToPack[this.x].dim1,
              this.itemsToPack[this.x].dim2,
              this.itemsToPack[this.x].dim3
            );
            if (this.itemsToPack[this.x].dim1 == this.itemsToPack[this.x].dim3 && this.itemsToPack[this.x].dim3 == this.itemsToPack[this.x].dim2)
              continue;
            this.analyzeBox(
              hmx,
              hy,
              hmy,
              hz,
              hmz,
              this.itemsToPack[this.x].dim1,
              this.itemsToPack[this.x].dim3,
              this.itemsToPack[this.x].dim2
            );
            this.analyzeBox(
              hmx,
              hy,
              hmy,
              hz,
              hmz,
              this.itemsToPack[this.x].dim2,
              this.itemsToPack[this.x].dim1,
              this.itemsToPack[this.x].dim3
            );
            this.analyzeBox(
              hmx,
              hy,
              hmy,
              hz,
              hmz,
              this.itemsToPack[this.x].dim2,
              this.itemsToPack[this.x].dim3,
              this.itemsToPack[this.x].dim1
            );
            this.analyzeBox(
              hmx,
              hy,
              hmy,
              hz,
              hmz,
              this.itemsToPack[this.x].dim3,
              this.itemsToPack[this.x].dim1,
              this.itemsToPack[this.x].dim2
            );
            this.analyzeBox(
              hmx,
              hy,
              hmy,
              hz,
              hmz,
              this.itemsToPack[this.x].dim3,
              this.itemsToPack[this.x].dim2,
              this.itemsToPack[this.x].dim1
            );
          }
        }
        findLayer(thickness) {
          let exdim = 0;
          let dimdif;
          let dimen2 = 0;
          let dimen3 = 0;
          let y;
          let z;
          let layereval;
          let evaluation;
          this.layerThickness = 0;
          evaluation = 1e6;
          for (this.x = 1; this.x <= this.itemsToPackCount; this.x++) {
            if (this.itemsToPack[this.x].isPacked)
              continue;
            for (y = 1; y <= 3; y++) {
              switch (y) {
                case 1:
                  exdim = this.itemsToPack[this.x].dim1;
                  dimen2 = this.itemsToPack[this.x].dim2;
                  dimen3 = this.itemsToPack[this.x].dim3;
                  break;
                case 2:
                  exdim = this.itemsToPack[this.x].dim2;
                  dimen2 = this.itemsToPack[this.x].dim1;
                  dimen3 = this.itemsToPack[this.x].dim3;
                  break;
                case 3:
                  exdim = this.itemsToPack[this.x].dim3;
                  dimen2 = this.itemsToPack[this.x].dim1;
                  dimen3 = this.itemsToPack[this.x].dim2;
                  break;
              }
              layereval = 0;
              if (exdim <= thickness && (dimen2 <= this.px && dimen3 <= this.pz || dimen3 <= this.px && dimen2 <= this.pz)) {
                for (z = 1; z <= this.itemsToPackCount; z++) {
                  if (!(this.x == z) && !this.itemsToPack[z].isPacked) {
                    dimdif = Math.abs(exdim - this.itemsToPack[z].dim1);
                    if (Math.abs(exdim - this.itemsToPack[z].dim2) < dimdif) {
                      dimdif = Math.abs(exdim - this.itemsToPack[z].dim2);
                    }
                    if (Math.abs(exdim - this.itemsToPack[z].dim3) < dimdif) {
                      dimdif = Math.abs(exdim - this.itemsToPack[z].dim3);
                    }
                    layereval = layereval + dimdif;
                  }
                }
                if (layereval < evaluation) {
                  evaluation = layereval;
                  this.layerThickness = exdim;
                }
              }
            }
          }
          if (this.layerThickness == 0 || this.layerThickness > this.remainpy)
            this.packing = false;
        }
        findSmallestZ() {
          let scrapmemb = this.scrapfirst;
          this.smallestZ = scrapmemb;
          while (scrapmemb.post != null) {
            if (scrapmemb.post.cumZ < this.smallestZ.cumZ) {
              this.smallestZ = scrapmemb.post;
            }
            scrapmemb = scrapmemb.post;
          }
        }
        initialize(container, items) {
          this.itemsToPack = [];
          this.itemsPackedInOrder = [];
          this.result = new ContainerPackingResult(container.id);
          this.itemsToPack.push(new Item("init", 0, 0, 0, 0));
          this.layers = [];
          this.itemsToPackCount = 0;
          items.forEach((item) => {
            for (let i = 1; i <= item.quantity; i++) {
              const newItem = new Item(
                item.id,
                item.dim1,
                item.dim2,
                item.dim3,
                item.quantity
              );
              this.itemsToPack.push(newItem);
            }
            this.itemsToPackCount += item.quantity;
          });
          this.itemsToPack.push(new Item("init", 0, 0, 0, 0));
          this.totalContainerVolume = container.length * container.height * container.width;
          this.totalItemVolume = 0;
          for (this.x = 1; this.x <= this.itemsToPackCount; this.x++) {
            this.totalItemVolume = this.totalItemVolume + this.itemsToPack[this.x].volume;
          }
          this.scrapfirst = new ScrapPad();
          this.scrapfirst.pre = null;
          this.scrapfirst.post = null;
          this.packingBest = false;
          this.hundredPercentPacked = false;
          this.quit = false;
        }
        listCanditLayers() {
          let same;
          let exdim = 0;
          let dimdif;
          let dimen2 = 0;
          let dimen3 = 0;
          let y;
          let z;
          let k;
          let layereval;
          this.layerListLen = 0;
          for (this.x = 1; this.x <= this.itemsToPackCount; this.x++) {
            for (y = 1; y <= 3; y++) {
              switch (y) {
                case 1:
                  exdim = this.itemsToPack[this.x].dim1;
                  dimen2 = this.itemsToPack[this.x].dim2;
                  dimen3 = this.itemsToPack[this.x].dim3;
                  break;
                case 2:
                  exdim = this.itemsToPack[this.x].dim2;
                  dimen2 = this.itemsToPack[this.x].dim1;
                  dimen3 = this.itemsToPack[this.x].dim3;
                  break;
                case 3:
                  exdim = this.itemsToPack[this.x].dim3;
                  dimen2 = this.itemsToPack[this.x].dim1;
                  dimen3 = this.itemsToPack[this.x].dim2;
                  break;
              }
              if (exdim > this.py || (dimen2 > this.px || dimen3 > this.pz) && (dimen3 > this.px || dimen2 > this.pz))
                continue;
              same = false;
              for (k = 1; k <= this.layerListLen; k++) {
                if (exdim == this.layers[k].layerDim) {
                  same = true;
                  continue;
                }
              }
              if (same)
                continue;
              layereval = 0;
              for (z = 1; z <= this.itemsToPackCount; z++) {
                if (!(this.x == z)) {
                  dimdif = Math.abs(exdim - this.itemsToPack[z].dim1);
                  if (Math.abs(exdim - this.itemsToPack[z].dim2) < dimdif) {
                    dimdif = Math.abs(exdim - this.itemsToPack[z].dim2);
                  }
                  if (Math.abs(exdim - this.itemsToPack[z].dim3) < dimdif) {
                    dimdif = Math.abs(exdim - this.itemsToPack[z].dim3);
                  }
                  layereval = layereval + dimdif;
                }
              }
              this.layerListLen++;
              this.layers.push(new Layer());
              this.layers[this.layerListLen].layerEval = layereval;
              this.layers[this.layerListLen].layerDim = exdim;
            }
          }
        }
        outputBoxList() {
          let packCoordX = 0;
          let packCoordY = 0;
          let packCoordZ = 0;
          let packDimX = 0;
          let packDimY = 0;
          let packDimZ = 0;
          switch (this.bestVariant) {
            case 1:
              packCoordX = this.itemsToPack[this.cboxi].coordX;
              packCoordY = this.itemsToPack[this.cboxi].coordY;
              packCoordZ = this.itemsToPack[this.cboxi].coordZ;
              packDimX = this.itemsToPack[this.cboxi].packDimX;
              packDimY = this.itemsToPack[this.cboxi].packDimY;
              packDimZ = this.itemsToPack[this.cboxi].packDimZ;
              break;
            case 2:
              packCoordX = this.itemsToPack[this.cboxi].coordZ;
              packCoordY = this.itemsToPack[this.cboxi].coordY;
              packCoordZ = this.itemsToPack[this.cboxi].coordX;
              packDimX = this.itemsToPack[this.cboxi].packDimZ;
              packDimY = this.itemsToPack[this.cboxi].packDimY;
              packDimZ = this.itemsToPack[this.cboxi].packDimX;
              break;
            case 3:
              packCoordX = this.itemsToPack[this.cboxi].coordY;
              packCoordY = this.itemsToPack[this.cboxi].coordZ;
              packCoordZ = this.itemsToPack[this.cboxi].coordX;
              packDimX = this.itemsToPack[this.cboxi].packDimY;
              packDimY = this.itemsToPack[this.cboxi].packDimZ;
              packDimZ = this.itemsToPack[this.cboxi].packDimX;
              break;
            case 4:
              packCoordX = this.itemsToPack[this.cboxi].coordY;
              packCoordY = this.itemsToPack[this.cboxi].coordX;
              packCoordZ = this.itemsToPack[this.cboxi].coordZ;
              packDimX = this.itemsToPack[this.cboxi].packDimY;
              packDimY = this.itemsToPack[this.cboxi].packDimX;
              packDimZ = this.itemsToPack[this.cboxi].packDimZ;
              break;
            case 5:
              packCoordX = this.itemsToPack[this.cboxi].coordX;
              packCoordY = this.itemsToPack[this.cboxi].coordZ;
              packCoordZ = this.itemsToPack[this.cboxi].coordY;
              packDimX = this.itemsToPack[this.cboxi].packDimX;
              packDimY = this.itemsToPack[this.cboxi].packDimZ;
              packDimZ = this.itemsToPack[this.cboxi].packDimY;
              break;
            case 6:
              packCoordX = this.itemsToPack[this.cboxi].coordZ;
              packCoordY = this.itemsToPack[this.cboxi].coordX;
              packCoordZ = this.itemsToPack[this.cboxi].coordY;
              packDimX = this.itemsToPack[this.cboxi].packDimZ;
              packDimY = this.itemsToPack[this.cboxi].packDimX;
              packDimZ = this.itemsToPack[this.cboxi].packDimY;
              break;
          }
          this.itemsToPack[this.cboxi].coordX = packCoordX;
          this.itemsToPack[this.cboxi].coordY = packCoordY;
          this.itemsToPack[this.cboxi].coordZ = packCoordZ;
          this.itemsToPack[this.cboxi].packDimX = packDimX;
          this.itemsToPack[this.cboxi].packDimY = packDimY;
          this.itemsToPack[this.cboxi].packDimZ = packDimZ;
          this.itemsPackedInOrder.push(this.itemsToPack[this.cboxi]);
        }
        packLayer() {
          let lenx;
          let lenz;
          let lpz;
          if (this.layerThickness == 0) {
            this.packing = false;
            return;
          }
          this.scrapfirst.cumX = this.px;
          this.scrapfirst.cumZ = 0;
          for (; !this.quit; ) {
            this.findSmallestZ();
            if (this.smallestZ.pre == null && this.smallestZ.post == null) {
              lenx = this.smallestZ.cumX;
              lpz = this.remainpz - this.smallestZ.cumZ;
              this.findBox(lenx, this.layerThickness, this.remainpy, lpz, lpz);
              this.checkFound();
              if (this.layerDone)
                break;
              if (this.evened)
                continue;
              this.itemsToPack[this.cboxi].coordX = 0;
              this.itemsToPack[this.cboxi].coordY = this.packedy;
              this.itemsToPack[this.cboxi].coordZ = this.smallestZ.cumZ;
              if (this.cboxx == this.smallestZ.cumX) {
                this.smallestZ.cumZ = this.smallestZ.cumZ + this.cboxz;
              } else {
                this.smallestZ.post = new ScrapPad();
                this.smallestZ.post.post = null;
                this.smallestZ.post.pre = this.smallestZ;
                this.smallestZ.post.cumX = this.smallestZ.cumX;
                this.smallestZ.post.cumZ = this.smallestZ.cumZ;
                this.smallestZ.cumX = this.cboxx;
                this.smallestZ.cumZ = this.smallestZ.cumZ + this.cboxz;
              }
            } else if (this.smallestZ.pre == null) {
              lenx = this.smallestZ.cumX;
              lenz = this.smallestZ.post.cumZ - this.smallestZ.cumZ;
              lpz = this.remainpz - this.smallestZ.cumZ;
              this.findBox(lenx, this.layerThickness, this.remainpy, lenz, lpz);
              this.checkFound();
              if (this.layerDone)
                break;
              if (this.evened)
                continue;
              this.itemsToPack[this.cboxi].coordY = this.packedy;
              this.itemsToPack[this.cboxi].coordZ = this.smallestZ.cumZ;
              if (this.cboxx == this.smallestZ.cumX) {
                this.itemsToPack[this.cboxi].coordX = 0;
                if (this.smallestZ.cumZ + this.cboxz == this.smallestZ.post.cumZ) {
                  this.smallestZ.cumZ = this.smallestZ.post.cumZ;
                  this.smallestZ.cumX = this.smallestZ.post.cumX;
                  this.trash = this.smallestZ.post;
                  this.smallestZ.post = this.smallestZ.post.post;
                  if (this.smallestZ.post != null) {
                    this.smallestZ.post.pre = this.smallestZ;
                  }
                } else {
                  this.smallestZ.cumZ = this.smallestZ.cumZ + this.cboxz;
                }
              } else {
                this.itemsToPack[this.cboxi].coordX = this.smallestZ.cumX - this.cboxx;
                if (this.smallestZ.cumZ + this.cboxz == this.smallestZ.post.cumZ) {
                  this.smallestZ.cumX = this.smallestZ.cumX - this.cboxx;
                } else {
                  this.smallestZ.post.pre = new ScrapPad();
                  this.smallestZ.post.pre.post = this.smallestZ.post;
                  this.smallestZ.post.pre.pre = this.smallestZ;
                  this.smallestZ.post = this.smallestZ.post.pre;
                  this.smallestZ.post.cumX = this.smallestZ.cumX;
                  this.smallestZ.cumX = this.smallestZ.cumX - this.cboxx;
                  this.smallestZ.post.cumZ = this.smallestZ.cumZ + this.cboxz;
                }
              }
            } else if (this.smallestZ.post == null) {
              lenx = this.smallestZ.cumX - this.smallestZ.pre.cumX;
              lenz = this.smallestZ.pre.cumZ - this.smallestZ.cumZ;
              lpz = this.remainpz - this.smallestZ.cumZ;
              this.findBox(lenx, this.layerThickness, this.remainpy, lenz, lpz);
              this.checkFound();
              if (this.layerDone)
                break;
              if (this.evened)
                continue;
              this.itemsToPack[this.cboxi].coordY = this.packedy;
              this.itemsToPack[this.cboxi].coordZ = this.smallestZ.cumZ;
              this.itemsToPack[this.cboxi].coordX = this.smallestZ.pre.cumX;
              if (this.cboxx == this.smallestZ.cumX - this.smallestZ.pre.cumX) {
                if (this.smallestZ.cumZ + this.cboxz == this.smallestZ.pre.cumZ) {
                  this.smallestZ.pre.cumX = this.smallestZ.cumX;
                  this.smallestZ.pre.post = null;
                } else {
                  this.smallestZ.cumZ = this.smallestZ.cumZ + this.cboxz;
                }
              } else {
                if (this.smallestZ.cumZ + this.cboxz == this.smallestZ.pre.cumZ) {
                  this.smallestZ.pre.cumX = this.smallestZ.pre.cumX + this.cboxx;
                } else {
                  this.smallestZ.pre.post = new ScrapPad();
                  this.smallestZ.pre.post.pre = this.smallestZ.pre;
                  this.smallestZ.pre.post.post = this.smallestZ;
                  this.smallestZ.pre = this.smallestZ.pre.post;
                  this.smallestZ.pre.cumX = this.smallestZ.pre.pre.cumX + this.cboxx;
                  this.smallestZ.pre.cumZ = this.smallestZ.cumZ + this.cboxz;
                }
              }
            } else if (this.smallestZ.pre.cumZ == this.smallestZ.post.cumZ) {
              lenx = this.smallestZ.cumX - this.smallestZ.pre.cumX;
              lenz = this.smallestZ.pre.cumZ - this.smallestZ.cumZ;
              lpz = this.remainpz - this.smallestZ.cumZ;
              this.findBox(lenx, this.layerThickness, this.remainpy, lenz, lpz);
              this.checkFound();
              if (this.layerDone)
                break;
              if (this.evened)
                continue;
              this.itemsToPack[this.cboxi].coordY = this.packedy;
              this.itemsToPack[this.cboxi].coordZ = this.smallestZ.cumZ;
              if (this.cboxx == this.smallestZ.cumX - this.smallestZ.pre.cumX) {
                this.itemsToPack[this.cboxi].coordX = this.smallestZ.pre.cumX;
                if (this.smallestZ.cumZ + this.cboxz == this.smallestZ.post.cumZ) {
                  this.smallestZ.pre.cumX = this.smallestZ.post.cumX;
                  if (this.smallestZ.post.post != null) {
                    this.smallestZ.pre.post = this.smallestZ.post.post;
                    this.smallestZ.post.post.pre = this.smallestZ.pre;
                  } else {
                    this.smallestZ.pre.post = null;
                  }
                } else {
                  this.smallestZ.cumZ = this.smallestZ.cumZ + this.cboxz;
                }
              } else if (this.smallestZ.pre.cumX < this.px - this.smallestZ.cumX) {
                if (this.smallestZ.cumZ + this.cboxz == this.smallestZ.pre.cumZ) {
                  this.smallestZ.cumX = this.smallestZ.cumX - this.cboxx;
                  this.itemsToPack[this.cboxi].coordX = this.smallestZ.cumX;
                } else {
                  this.itemsToPack[this.cboxi].coordX = this.smallestZ.pre.cumX;
                  this.smallestZ.pre.post = new ScrapPad();
                  this.smallestZ.pre.post.pre = this.smallestZ.pre;
                  this.smallestZ.pre.post.post = this.smallestZ;
                  this.smallestZ.pre = this.smallestZ.pre.post;
                  this.smallestZ.pre.cumX = this.smallestZ.pre.pre.cumX + this.cboxx;
                  this.smallestZ.pre.cumZ = this.smallestZ.cumZ + this.cboxz;
                }
              } else {
                if (this.smallestZ.cumZ + this.cboxz == this.smallestZ.pre.cumZ) {
                  this.smallestZ.pre.cumX = this.smallestZ.pre.cumX + this.cboxx;
                  this.itemsToPack[this.cboxi].coordX = this.smallestZ.pre.cumX;
                } else {
                  this.itemsToPack[this.cboxi].coordX = this.smallestZ.cumX - this.cboxx;
                  this.smallestZ.post.pre = new ScrapPad();
                  this.smallestZ.post.pre.post = this.smallestZ.post;
                  this.smallestZ.post.pre.pre = this.smallestZ;
                  this.smallestZ.post = this.smallestZ.post.pre;
                  this.smallestZ.post.cumX = this.smallestZ.cumX;
                  this.smallestZ.post.cumZ = this.smallestZ.cumZ + this.cboxz;
                  this.smallestZ.cumX = this.smallestZ.cumX - this.cboxx;
                }
              }
            } else {
              lenx = this.smallestZ.cumX - this.smallestZ.pre.cumX;
              lenz = this.smallestZ.pre.cumZ - this.smallestZ.cumZ;
              lpz = this.remainpz - this.smallestZ.cumZ;
              this.findBox(lenx, this.layerThickness, this.remainpy, lenz, lpz);
              this.checkFound();
              if (this.layerDone)
                break;
              if (this.evened)
                continue;
              this.itemsToPack[this.cboxi].coordY = this.packedy;
              this.itemsToPack[this.cboxi].coordZ = this.smallestZ.cumZ;
              this.itemsToPack[this.cboxi].coordX = this.smallestZ.pre.cumX;
              if (this.cboxx == this.smallestZ.cumX - this.smallestZ.pre.cumX) {
                if (this.smallestZ.cumZ + this.cboxz == this.smallestZ.pre.cumZ) {
                  this.smallestZ.pre.cumX = this.smallestZ.cumX;
                  this.smallestZ.pre.post = this.smallestZ.post;
                  this.smallestZ.post.pre = this.smallestZ.pre;
                } else {
                  this.smallestZ.cumZ = this.smallestZ.cumZ + this.cboxz;
                }
              } else {
                if (this.smallestZ.cumZ + this.cboxz == this.smallestZ.pre.cumZ) {
                  this.smallestZ.pre.cumX = this.smallestZ.pre.cumX + this.cboxx;
                } else if (this.smallestZ.cumZ + this.cboxz == this.smallestZ.post.cumZ) {
                  this.itemsToPack[this.cboxi].coordX = this.smallestZ.cumX - this.cboxx;
                  this.smallestZ.cumX = this.smallestZ.cumX - this.cboxx;
                } else {
                  this.smallestZ.pre.post = new ScrapPad();
                  this.smallestZ.pre.post.pre = this.smallestZ.pre;
                  this.smallestZ.pre.post.post = this.smallestZ;
                  this.smallestZ.pre = this.smallestZ.pre.post;
                  this.smallestZ.pre.cumX = this.smallestZ.pre.pre.cumX + this.cboxx;
                  this.smallestZ.pre.cumZ = this.smallestZ.cumZ + this.cboxz;
                }
              }
            }
            this.volumeCheck();
          }
        }
        report(container) {
          this.quit = false;
          switch (this.bestVariant) {
            case 1:
              this.px = container.length;
              this.py = container.height;
              this.pz = container.width;
              break;
            case 2:
              this.px = container.width;
              this.py = container.height;
              this.pz = container.length;
              break;
            case 3:
              this.px = container.width;
              this.py = container.length;
              this.pz = container.height;
              break;
            case 4:
              this.px = container.height;
              this.py = container.length;
              this.pz = container.width;
              break;
            case 5:
              this.px = container.length;
              this.py = container.width;
              this.pz = container.height;
              break;
            case 6:
              this.px = container.height;
              this.py = container.width;
              this.pz = container.length;
              break;
          }
          this.packingBest = true;
          this.layers = [];
          this.layers.push(new Layer(0, -1));
          this.listCanditLayers();
          this.layers.sort((a, b) => a.layerEval - b.layerEval);
          this.packedVolume = 0;
          this.packedy = 0;
          this.packing = true;
          this.layerThickness = this.layers[this.bestIteration].layerDim;
          this.remainpy = this.py;
          this.remainpz = this.pz;
          for (this.x = 1; this.x <= this.itemsToPackCount; this.x++) {
            this.itemsToPack[this.x].isPacked = false;
          }
          do {
            this.layerinlayer = 0;
            this.layerDone = false;
            this.packLayer();
            this.packedy = this.packedy + this.layerThickness;
            this.remainpy = this.py - this.packedy;
            if (this.layerinlayer > 1e-4) {
              this.prepackedy = this.packedy;
              this.preremainpy = this.remainpy;
              this.remainpy = this.layerThickness - this.prelayer;
              this.packedy = this.packedy - this.layerThickness + this.prelayer;
              this.remainpz = this.lilz;
              this.layerThickness = this.layerinlayer;
              this.layerDone = false;
              this.packLayer();
              this.packedy = this.prepackedy;
              this.remainpy = this.preremainpy;
              this.remainpz = this.pz;
            }
            if (!this.quit) {
              this.findLayer(this.remainpy);
            }
          } while (this.packing && !this.quit);
        }
        volumeCheck() {
          this.itemsToPack[this.cboxi].isPacked = true;
          this.itemsToPack[this.cboxi].packDimX = this.cboxx;
          this.itemsToPack[this.cboxi].packDimY = this.cboxy;
          this.itemsToPack[this.cboxi].packDimZ = this.cboxz;
          this.packedVolume = this.packedVolume + this.itemsToPack[this.cboxi].volume;
          this.packedItemCount++;
          if (this.packingBest) {
            this.outputBoxList();
          } else if (this.packedVolume == this.totalContainerVolume || this.packedVolume == this.totalItemVolume) {
            this.packing = false;
            this.hundredPercentPacked = true;
          }
        }
      };
      var PackingService2 = class _PackingService {
        static pack(containers, itemsToPack, algorithmTypeIDs = [
          "EB_AFIT"
          /* EB_AFIT */
        ]) {
          const results = containers.map(
            (container) => this.packSingle(container, itemsToPack, algorithmTypeIDs)
          );
          return results;
        }
        static packSingle(container, itemsToPack, algorithmTypeIDs = [
          "EB_AFIT"
          /* EB_AFIT */
        ]) {
          const containerPackingResult = new ContainerPackingResult(container.id);
          algorithmTypeIDs.forEach((algorithmTypeID) => {
            const algorithm = _PackingService.getAlgorithmByID(algorithmTypeID);
            const items = [];
            itemsToPack.forEach((item) => {
              items.push(
                new Item(item.id, item.dim1, item.dim2, item.dim3, item.quantity)
              );
            });
            const startTime = Date.now();
            const algorithmResult = algorithm.run(container, items);
            const endTime = Date.now();
            algorithmResult.packTimeMilliseconds = endTime - startTime;
            const containerVolume = container.length * container.height * container.width;
            const itemVolumePacked = algorithmResult.packedItems.reduce(
              (acc, item) => acc + item.volume,
              0
            );
            const itemVolumeUnpacked = algorithmResult.unpackedItems.reduce(
              (acc, item) => acc + item.volume,
              0
            );
            algorithmResult.percentContainerVolumePacked = Math.round(itemVolumePacked / containerVolume * 100 * 100) / 100;
            algorithmResult.percentItemVolumePacked = Math.round(
              itemVolumePacked / (itemVolumePacked + itemVolumeUnpacked) * 100 * 100
            ) / 100;
            containerPackingResult.algorithmPackingResults.push(algorithmResult);
          });
          return containerPackingResult;
        }
        /**
         *
         * @param itemsToPack
         * @param algorithmTypeIDs
         *
         * Generate as many containers of the same dimensions as needed to pack all items.
         */
        static packIncremental(itemsToPack, containerDimensions, maxVolumePercentage = 100, idGenerator = import_uuid.v4) {
          const containers = [];
          const results = [];
          let remainingItems = itemsToPack;
          while (remainingItems.length > 0) {
            const containerId = idGenerator();
            const scaleFactor = Math.cbrt(maxVolumePercentage / 100);
            const container = new Container2(
              containerId,
              containerDimensions.length * scaleFactor,
              containerDimensions.height * scaleFactor,
              containerDimensions.width * scaleFactor
            );
            const result = this.packSingle(container, remainingItems);
            results.push(result);
            containers.push(container);
            remainingItems = result.algorithmPackingResults[0].unpackedItems;
          }
          const aggregatedResults = [];
          results.forEach((result, index) => {
            const itemQuantities = [];
            result.algorithmPackingResults[0].packedItems.forEach((item) => {
              const existingItem = itemQuantities.find((i) => i.itemId === item.id);
              if (existingItem) {
                existingItem.quantity++;
              } else {
                itemQuantities.push({ itemId: item.id, quantity: 1 });
              }
            });
            aggregatedResults.push({
              containerId: containers[index].id,
              itemQuantities
            });
          });
          return { containers, results, aggregatedResults };
        }
        static getAlgorithmByID(algorithmTypeID) {
          switch (algorithmTypeID) {
            case "EB_AFIT":
              return new EB_AFIT();
            default:
              throw new Error("Invalid algorithm type ID");
          }
        }
      };
    }
  });

  // browser-entry.js
  var { BP3D } = require_BinPacking_min();
  var { Container, Item: EBAFITItem, PackingService } = require_dist();
  var { Item: BPItem, Bin, Packer } = BP3D;
  var SCALE = 1e5;
  var CartonizationService = class {
    constructor(boxes = []) {
      this.boxInventory = boxes;
    }
    setBoxInventory(boxes) {
      this.boxInventory = boxes;
    }
    expandItems(items) {
      const expanded = [];
      let colorIndex = 0;
      const defaultColors = [
        4890367,
        4508808,
        16739179,
        16767293,
        7101671,
        52937,
        16611752,
        14774357,
        7649791,
        5631940
      ];
      items.forEach((item) => {
        const qty = item.quantity || 1;
        for (let i = 0; i < qty; i++) {
          const dims = [
            Math.max(item.length || 1, 0.1),
            Math.max(item.width || 1, 0.1),
            Math.max(item.height || 1, 0.1)
          ].sort((a, b) => b - a);
          expanded.push({
            sku: item.sku || "unknown",
            length: dims[0],
            width: dims[1],
            height: dims[2],
            weight: item.weight || 0.1,
            color: item.color || defaultColors[colorIndex % defaultColors.length],
            originalIndex: expanded.length
          });
        }
        colorIndex++;
      });
      return expanded;
    }
    calculateTotals(items) {
      return {
        weight: items.reduce((sum, i) => sum + i.weight, 0),
        volume: items.reduce((sum, i) => sum + i.length * i.width * i.height, 0)
      };
    }
    getValidBoxes(items, padding = 0) {
      const totals = this.calculateTotals(items);
      const pad2 = padding * 2;
      const allDims = items.map((i) => [i.length, i.width, i.height].sort((a, b) => b - a));
      const minDims = [
        Math.max(...allDims.map((d) => d[0])) + pad2,
        Math.max(...allDims.map((d) => d[1])) + pad2,
        Math.max(...allDims.map((d) => d[2])) + pad2
      ].sort((a, b) => b - a);
      return this.boxInventory.filter((box) => {
        if (totals.weight > box.max_weight)
          return false;
        const boxDims = [box.length, box.width, box.height].sort((a, b) => b - a);
        if (minDims[0] > boxDims[0] || minDims[1] > boxDims[1] || minDims[2] > boxDims[2]) {
          return false;
        }
        return true;
      }).sort((a, b) => a.length * a.width * a.height - b.length * b.width * b.height);
    }
    // FFD Algorithm
    packFFD(items, paddingPerSide = 0) {
      const startTime = performance.now();
      if (!items || items.length === 0) {
        return this.emptyResult("ffd", startTime);
      }
      const expandedItems = this.expandItems(items);
      const totals = this.calculateTotals(expandedItems);
      const validBoxes = this.getValidBoxes(expandedItems, paddingPerSide);
      if (validBoxes.length === 0) {
        return this.noBoxResult("ffd", expandedItems, totals, startTime);
      }
      for (const box of validBoxes) {
        const result = this.tryPackFFD(expandedItems, box, paddingPerSide);
        if (result && result.packedItems.length === expandedItems.length) {
          return this.buildResult("ffd", box, result, expandedItems, totals, paddingPerSide, startTime);
        }
      }
      const largestBox = validBoxes[validBoxes.length - 1];
      const partialResult = this.tryPackFFD(expandedItems, largestBox, paddingPerSide);
      return this.buildResult("ffd", largestBox, partialResult, expandedItems, totals, paddingPerSide, startTime, false);
    }
    tryPackFFD(items, box, padding) {
      const packer = new Packer();
      const innerL = box.length - padding * 2;
      const innerW = box.width - padding * 2;
      const innerH = box.height - padding * 2;
      packer.addBin(new Bin("box", innerL, innerH, innerW, box.max_weight || 1e3));
      const sorted = [...items].sort(
        (a, b) => b.length * b.width * b.height - a.length * a.width * a.height
      );
      sorted.forEach((item, i) => {
        packer.addItem(new BPItem(
          `${item.sku}__${item.originalIndex}`,
          item.length,
          item.height,
          item.width,
          item.weight
        ));
      });
      packer.pack();
      const packedBin = packer.bins[0];
      if (!packedBin || !packedBin.items) {
        return { packedItems: [], unpackedItems: items };
      }
      return this.extractBinpackingResults(packedBin, items, padding);
    }
    extractBinpackingResults(packedBin, originalItems, padding) {
      const itemMap = /* @__PURE__ */ new Map();
      originalItems.forEach((item) => itemMap.set(item.originalIndex, item));
      const packedItems = packedBin.items.map((packed) => {
        const nameParts = packed.name.split("__");
        const originalIndex = parseInt(nameParts[nameParts.length - 1], 10);
        const original = itemMap.get(originalIndex) || originalItems[0];
        const dims = packed.getDimension();
        return {
          sku: original.sku,
          color: original.color,
          x: packed.position[0] / SCALE + padding,
          y: packed.position[1] / SCALE + padding,
          z: packed.position[2] / SCALE + padding,
          packedLength: dims[0] / SCALE,
          packedHeight: dims[1] / SCALE,
          packedWidth: dims[2] / SCALE
        };
      });
      const packedIndices = new Set(packedBin.items.map((p) => {
        const parts = p.name.split("__");
        return parseInt(parts[parts.length - 1], 10);
      }));
      const unpackedItems = originalItems.filter((item) => !packedIndices.has(item.originalIndex));
      return { packedItems, unpackedItems };
    }
    // EB-AFIT Algorithm
    packEBAFIT(items, paddingPerSide = 0) {
      const startTime = performance.now();
      if (!items || items.length === 0) {
        return this.emptyResult("eb-afit", startTime);
      }
      const expandedItems = this.expandItems(items);
      const totals = this.calculateTotals(expandedItems);
      const validBoxes = this.getValidBoxes(expandedItems, paddingPerSide);
      if (validBoxes.length === 0) {
        return this.noBoxResult("eb-afit", expandedItems, totals, startTime);
      }
      for (const box of validBoxes) {
        const result = this.tryPackEBAFIT(expandedItems, box, paddingPerSide);
        if (result && result.packedItems.length === expandedItems.length) {
          return this.buildResult("eb-afit", box, result, expandedItems, totals, paddingPerSide, startTime);
        }
      }
      const largestBox = validBoxes[validBoxes.length - 1];
      const partialResult = this.tryPackEBAFIT(expandedItems, largestBox, paddingPerSide);
      return this.buildResult("eb-afit", largestBox, partialResult, expandedItems, totals, paddingPerSide, startTime, false);
    }
    tryPackEBAFIT(items, box, padding) {
      const innerL = box.length - padding * 2;
      const innerW = box.width - padding * 2;
      const innerH = box.height - padding * 2;
      const container = new Container("box", innerL, innerW, innerH);
      const ebafitItems = items.map(
        (item, i) => new EBAFITItem(`${item.sku}__${item.originalIndex}`, item.length, item.width, item.height, 1)
      );
      const result = PackingService.packSingle(container, ebafitItems);
      const packResult = result.algorithmPackingResults[0];
      if (!packResult) {
        return { packedItems: [], unpackedItems: items };
      }
      const itemMap = /* @__PURE__ */ new Map();
      items.forEach((item) => itemMap.set(item.originalIndex, item));
      const packedItems = packResult.packedItems.map((packed) => {
        const nameParts = packed.id.split("__");
        const originalIndex = parseInt(nameParts[nameParts.length - 1], 10);
        const original = itemMap.get(originalIndex) || items[0];
        return {
          sku: original.sku,
          color: original.color,
          x: packed.coordX + padding,
          y: packed.coordY + padding,
          z: packed.coordZ + padding,
          packedLength: packed.packDimX,
          packedHeight: packed.packDimY,
          packedWidth: packed.packDimZ
        };
      });
      const packedIds = new Set(packResult.packedItems.map((p) => {
        const parts = p.id.split("__");
        return parseInt(parts[parts.length - 1], 10);
      }));
      const unpackedItems = items.filter((item) => !packedIds.has(item.originalIndex));
      return { packedItems, unpackedItems };
    }
    // Multi-Pass FFD Algorithm
    packMultiPassFFD(items, paddingPerSide = 0) {
      const startTime = performance.now();
      if (!items || items.length === 0) {
        return this.emptyResult("multipass-ffd", startTime);
      }
      const expandedItems = this.expandItems(items);
      const totals = this.calculateTotals(expandedItems);
      const validBoxes = this.getValidBoxes(expandedItems, paddingPerSide);
      if (validBoxes.length === 0) {
        return this.noBoxResult("multipass-ffd", expandedItems, totals, startTime);
      }
      const orderings = [
        { name: "volume", sort: (a, b) => b.length * b.width * b.height - a.length * a.width * a.height },
        { name: "footprint", sort: (a, b) => b.length * b.width - a.length * a.width },
        { name: "height", sort: (a, b) => a.height - b.height },
        { name: "length", sort: (a, b) => b.length - a.length }
      ];
      let bestResult = null;
      let bestBox = null;
      let bestOrdering = null;
      for (const box of validBoxes) {
        for (const ordering of orderings) {
          const sortedItems = [...expandedItems].sort(ordering.sort);
          const result = this.tryPackFFDWithOrder(sortedItems, box, paddingPerSide);
          if (result && result.packedItems.length === expandedItems.length) {
            const finalResult2 = this.buildResult("multipass-ffd", box, result, expandedItems, totals, paddingPerSide, startTime);
            finalResult2.ordering = ordering.name;
            return finalResult2;
          }
          if (!bestResult || result.packedItems.length > bestResult.packedItems.length) {
            bestResult = result;
            bestBox = box;
            bestOrdering = ordering.name;
          }
        }
      }
      const finalResult = this.buildResult("multipass-ffd", bestBox, bestResult, expandedItems, totals, paddingPerSide, startTime, false);
      finalResult.ordering = bestOrdering;
      return finalResult;
    }
    tryPackFFDWithOrder(sortedItems, box, padding) {
      const packer = new Packer();
      const innerL = box.length - padding * 2;
      const innerW = box.width - padding * 2;
      const innerH = box.height - padding * 2;
      packer.addBin(new Bin("box", innerL, innerH, innerW, box.max_weight || 1e3));
      sortedItems.forEach((item, i) => {
        packer.addItem(new BPItem(
          `${item.sku}__${item.originalIndex}`,
          item.length,
          item.height,
          item.width,
          item.weight
        ));
      });
      packer.pack();
      const packedBin = packer.bins[0];
      if (!packedBin || !packedBin.items) {
        return { packedItems: [], unpackedItems: sortedItems };
      }
      return this.extractBinpackingResults(packedBin, sortedItems, padding);
    }
    // Result builders
    emptyResult(algorithm, startTime) {
      return {
        success: false,
        algorithm,
        box: null,
        packedItems: [],
        unpackedItems: [],
        totalWeight: 0,
        itemsVolume: 0,
        boxVolume: 0,
        efficiency: 0,
        executionTime: performance.now() - startTime
      };
    }
    noBoxResult(algorithm, items, totals, startTime) {
      return {
        success: false,
        algorithm,
        box: { name: "No suitable box", length: 0, width: 0, height: 0 },
        packedItems: [],
        unpackedItems: items,
        totalWeight: totals.weight,
        itemsVolume: totals.volume,
        boxVolume: 0,
        efficiency: 0,
        executionTime: performance.now() - startTime
      };
    }
    buildResult(algorithm, box, packResult, allItems, totals, padding, startTime, success = true) {
      const boxVolume = box.length * box.width * box.height;
      const efficiency = boxVolume > 0 ? totals.volume / boxVolume * 100 : 0;
      return {
        success: success && packResult.packedItems.length === allItems.length,
        algorithm,
        box: { ...box },
        packedItems: packResult.packedItems,
        unpackedItems: packResult.unpackedItems,
        totalWeight: totals.weight + (box.box_weight || 0),
        itemsVolume: totals.volume,
        boxVolume,
        efficiency: Math.round(efficiency * 10) / 10,
        executionTime: Math.round((performance.now() - startTime) * 100) / 100
      };
    }
    packAll(items, paddingPerSide = 0) {
      return {
        ffd: this.packFFD(items, paddingPerSide),
        ebafit: this.packEBAFIT(items, paddingPerSide),
        multipass: this.packMultiPassFFD(items, paddingPerSide)
      };
    }
  };
  window.CartonizationService = CartonizationService;
})();
