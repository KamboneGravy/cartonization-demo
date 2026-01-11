(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // node_modules/binpackingjs/dist/BinPacking.min.js
  var require_BinPacking_min = __commonJS({
    "node_modules/binpackingjs/dist/BinPacking.min.js"(exports, module) {
      !(function(t, e) {
        "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define("BinPacking", [], e) : "object" == typeof exports ? exports.BinPacking = e() : t.BinPacking = e();
      })(exports, (function() {
        return (function() {
          var t = { 416: function(t2, e2, n2) {
            "use strict";
            function i2(t3, e3) {
              if (!(t3 instanceof e3)) throw new TypeError("Cannot call a class as a function");
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
              if ("function" != typeof e3 && null !== e3) throw new TypeError("Super expression must either be null or a function");
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
              return !e3 || "object" !== a(e3) && "function" != typeof e3 ? (function(t4) {
                if (void 0 === t4) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return t4;
              })(t3) : e3;
            }
            function f(t3) {
              return (f = Object.setPrototypeOf ? Object.getPrototypeOf : function(t4) {
                return t4.__proto__ || Object.getPrototypeOf(t4);
              })(t3);
            }
            var l = (function() {
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
            })();
            (0, u.Z)(l, "MAX_INT", Number.MAX_SAFE_INTEGER);
            var p = (function() {
              function t3() {
                (0, r.Z)(this, t3);
              }
              return (0, o.Z)(t3, [{ key: "findPositionForNewNode", value: function(t4, e3) {
                var n3 = this, i3 = new l(), r2 = t4.width, o2 = t4.height;
                return e3.forEach((function(e4) {
                  n3.tryPlaceRectIn(e4, t4, r2, o2, i3), t4.constrainRotation || n3.tryPlaceRectIn(e4, t4, o2, r2, i3);
                })), i3;
              } }, { key: "tryPlaceRectIn", value: function(t4, e3, n3, i3, r2) {
                if (t4.width >= n3 && t4.height >= i3) {
                  var o2 = this.calculateScore(t4, n3, i3);
                  o2 < r2 && (e3.x = t4.x, e3.y = t4.y, e3.width = n3, e3.height = i3, e3.packed = true, r2.assign(o2));
                }
              } }, { key: "calculateScore", value: function(t4, e3, n3) {
                throw "NotImplementedError";
              } }]), t3;
            })();
            var g = (function(t3) {
              c(u2, t3);
              var e3, n3, i3 = (e3 = u2, n3 = (function() {
                if ("undefined" == typeof Reflect || !Reflect.construct) return false;
                if (Reflect.construct.sham) return false;
                if ("function" == typeof Proxy) return true;
                try {
                  return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {
                  }))), true;
                } catch (t4) {
                  return false;
                }
              })(), function() {
                var t4, i4 = f(e3);
                if (n3) {
                  var r2 = f(this).constructor;
                  t4 = Reflect.construct(i4, arguments, r2);
                } else t4 = i4.apply(this, arguments);
                return h(this, t4);
              });
              function u2() {
                return (0, r.Z)(this, u2), i3.apply(this, arguments);
              }
              return (0, o.Z)(u2, [{ key: "calculateScore", value: function(t4, e4, n4) {
                var i4 = [Math.abs(t4.width - e4), Math.abs(t4.height - n4)].sort((function(t5, e5) {
                  return t5 - e5;
                }));
                return new l(i4[0], i4[1]);
              } }]), u2;
            })(p), y = (function() {
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
            })();
            function v(t3, e3) {
              var n3 = Object.keys(t3);
              if (Object.getOwnPropertySymbols) {
                var i3 = Object.getOwnPropertySymbols(t3);
                e3 && (i3 = i3.filter((function(e4) {
                  return Object.getOwnPropertyDescriptor(t3, e4).enumerable;
                }))), n3.push.apply(n3, i3);
              }
              return n3;
            }
            function d(t3) {
              for (var e3 = 1; e3 < arguments.length; e3++) {
                var n3 = null != arguments[e3] ? arguments[e3] : {};
                e3 % 2 ? v(Object(n3), true).forEach((function(e4) {
                  (0, u.Z)(t3, e4, n3[e4]);
                })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t3, Object.getOwnPropertyDescriptors(n3)) : v(Object(n3)).forEach((function(e4) {
                  Object.defineProperty(t3, e4, Object.getOwnPropertyDescriptor(n3, e4));
                }));
              }
              return t3;
            }
            var b = (function() {
              function t3(e3, n3, i3) {
                (0, r.Z)(this, t3), (0, u.Z)(this, "width", null), (0, u.Z)(this, "height", null), (0, u.Z)(this, "boxes", []), (0, u.Z)(this, "heuristic", null), (0, u.Z)(this, "freeRectangles", []), this.width = e3, this.height = n3, this.freeRectangles = [new w(e3, n3)], this.heuristic = i3 || new g();
              }
              return (0, o.Z)(t3, [{ key: "area", get: function() {
                return this.width * this.height;
              } }, { key: "efficiency", get: function() {
                var t4 = 0;
                return this.boxes.forEach((function(e3) {
                  t4 += e3.area;
                })), 100 * t4 / this.area;
              } }, { key: "label", get: function() {
                return "".concat(this.width, "x").concat(this.height, " ").concat(this.efficiency, "%");
              } }, { key: "insert", value: function(t4) {
                if (t4.packed) return false;
                if (this.heuristic.findPositionForNewNode(t4, this.freeRectangles), !t4.packed) return false;
                for (var e3 = this.freeRectangles.length, n3 = 0; n3 < e3; ) this.splitFreeNode(this.freeRectangles[n3], t4) ? (this.freeRectangles.splice(n3, 1), e3--) : n3++;
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
                  if (e3 === this.freeRectangles.length) break;
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
            })(), w = function t3(e3, n3) {
              (0, r.Z)(this, t3), (0, u.Z)(this, "x", 0), (0, u.Z)(this, "y", 0), (0, u.Z)(this, "width", null), (0, u.Z)(this, "height", null), this.width = e3, this.height = n3;
            };
            function m(t3, e3) {
              (null == e3 || e3 > t3.length) && (e3 = t3.length);
              for (var n3 = 0, i3 = new Array(e3); n3 < e3; n3++) i3[n3] = t3[n3];
              return i3;
            }
            var k = (function() {
              function t3(e3, n3) {
                (0, r.Z)(this, t3), (0, u.Z)(this, "bin", null), (0, u.Z)(this, "box", null), (0, u.Z)(this, "score", null), this.bin = e3, this.box = n3;
              }
              return (0, o.Z)(t3, [{ key: "calculate", value: function() {
                return this.score = this.bin.scoreFor(this.box), this.score;
              } }, { key: "fit", value: function() {
                return !this.score.isBlank();
              } }]), t3;
            })(), x = (function() {
              function t3(e3, n3) {
                var i3 = this;
                (0, r.Z)(this, t3), (0, u.Z)(this, "entries", []), e3.forEach((function(t4) {
                  i3.addBinEntries(t4, n3);
                }));
              }
              return (0, o.Z)(t3, [{ key: "debug", value: function() {
                n2(426), console.table(this.entries.map((function(t4) {
                  return { bin: t4.bin.label, box: t4.box.label, score: t4.score };
                })));
              } }, { key: "addBinEntries", value: function(t4, e3) {
                var n3 = this;
                e3.forEach((function(e4) {
                  var i3 = new k(t4, e4);
                  i3.calculate(), n3.entries.push(i3);
                }));
              } }, { key: "any", value: function() {
                return this.boxes.some((function(t4) {
                  return t4;
                }));
              } }, { key: "largestNotFitingBox", value: function() {
                var t4 = this;
                return this.entries.filter((function(t5) {
                  return t5.fit;
                })).map((function(t5) {
                  return t5.box;
                })), this.entries.forEach((function(e3) {
                  t4.fittingBoxes.contains(e3.box) && (t4.unfit = e3);
                })), !!null.box && null;
              } }, { key: "bestFit", value: function() {
                for (var t4 = null, e3 = 0; e3 < this.entries.length; e3++) {
                  var n3 = this.entries[e3];
                  n3.fit() && (null === t4 || n3.score < t4.score) && (t4 = n3);
                }
                return t4;
              } }, { key: "removeBox", value: function(t4) {
                this.entries = this.entries.filter((function(e3) {
                  return e3.box !== t4;
                }));
              } }, { key: "addBin", value: function(t4) {
                this.addBinEntries(t4, this.currentBoxes());
              } }, { key: "recalculateBin", value: function(t4) {
                this.entries.filter((function(e3) {
                  return e3.bin === t4;
                })).forEach((function(t5) {
                  return t5.calculate();
                }));
              } }, { key: "currentBoxes", value: function() {
                return (function(t5) {
                  if (Array.isArray(t5)) return m(t5);
                })(t4 = new Set(this.entries.map((function(t5) {
                  return t5.box;
                })))) || (function(t5) {
                  if ("undefined" != typeof Symbol && Symbol.iterator in Object(t5)) return Array.from(t5);
                })(t4) || (function(t5, e3) {
                  if (t5) {
                    if ("string" == typeof t5) return m(t5, e3);
                    var n3 = Object.prototype.toString.call(t5).slice(8, -1);
                    return "Object" === n3 && t5.constructor && (n3 = t5.constructor.name), "Map" === n3 || "Set" === n3 ? Array.from(t5) : "Arguments" === n3 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n3) ? m(t5, e3) : void 0;
                  }
                })(t4) || (function() {
                  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
                })();
                var t4;
              } }]), t3;
            })(), R = (function() {
              function t3(e3) {
                (0, r.Z)(this, t3), (0, u.Z)(this, "bins", []), (0, u.Z)(this, "unpackedBoxes", []), this.bins = e3;
              }
              return (0, o.Z)(t3, [{ key: "pack", value: function(t4) {
                var e3, n3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, i3 = [];
                if (0 === (t4 = t4.filter((function(t5) {
                  return !t5.packed;
                }))).length) return i3;
                for (var r2 = n3.limit || l.MAX_INT, o2 = new x(this.bins, t4); (e3 = o2.bestFit()) && (e3.bin.insert(e3.box), o2.removeBox(e3.box), o2.recalculateBin(e3.bin), i3.push(e3.box), !(i3.length >= r2)); ) ;
                return this.unpackedBoxes = t4.filter((function(t5) {
                  return !t5.packed;
                })), i3;
              } }]), t3;
            })();
            var Z = (function(t3) {
              c(u2, t3);
              var e3, n3, i3 = (e3 = u2, n3 = (function() {
                if ("undefined" == typeof Reflect || !Reflect.construct) return false;
                if (Reflect.construct.sham) return false;
                if ("function" == typeof Proxy) return true;
                try {
                  return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {
                  }))), true;
                } catch (t4) {
                  return false;
                }
              })(), function() {
                var t4, i4 = f(e3);
                if (n3) {
                  var r2 = f(this).constructor;
                  t4 = Reflect.construct(i4, arguments, r2);
                } else t4 = i4.apply(this, arguments);
                return h(this, t4);
              });
              function u2() {
                return (0, r.Z)(this, u2), i3.apply(this, arguments);
              }
              return (0, o.Z)(u2, [{ key: "calculateScore", value: function(t4, e4, n4) {
                var i4 = t4.width * t4.height - e4 * n4, r2 = Math.abs(t4.width - e4), o2 = Math.abs(t4.height - n4), u3 = Math.min(r2, o2);
                return new l(i4, u3);
              } }]), u2;
            })(p);
            var _ = (function(t3) {
              c(u2, t3);
              var e3, n3, i3 = (e3 = u2, n3 = (function() {
                if ("undefined" == typeof Reflect || !Reflect.construct) return false;
                if (Reflect.construct.sham) return false;
                if ("function" == typeof Proxy) return true;
                try {
                  return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {
                  }))), true;
                } catch (t4) {
                  return false;
                }
              })(), function() {
                var t4, i4 = f(e3);
                if (n3) {
                  var r2 = f(this).constructor;
                  t4 = Reflect.construct(i4, arguments, r2);
                } else t4 = i4.apply(this, arguments);
                return h(this, t4);
              });
              function u2() {
                return (0, r.Z)(this, u2), i3.apply(this, arguments);
              }
              return (0, o.Z)(u2, [{ key: "calculateScore", value: function(t4, e4, n4) {
                var i4 = [Math.abs(t4.width - e4), Math.abs(t4.height - n4)].sort((function(t5, e5) {
                  return t5 - e5;
                })).reverse();
                return new l(i4[0], i4[1]);
              } }]), u2;
            })(p);
            var O = (function(t3) {
              c(u2, t3);
              var e3, n3, i3 = (e3 = u2, n3 = (function() {
                if ("undefined" == typeof Reflect || !Reflect.construct) return false;
                if (Reflect.construct.sham) return false;
                if ("function" == typeof Proxy) return true;
                try {
                  return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {
                  }))), true;
                } catch (t4) {
                  return false;
                }
              })(), function() {
                var t4, i4 = f(e3);
                if (n3) {
                  var r2 = f(this).constructor;
                  t4 = Reflect.construct(i4, arguments, r2);
                } else t4 = i4.apply(this, arguments);
                return h(this, t4);
              });
              function u2() {
                return (0, r.Z)(this, u2), i3.apply(this, arguments);
              }
              return (0, o.Z)(u2, [{ key: "calculateScore", value: function(t4, e4, n4) {
                var i4 = t4.y + n4;
                return new l(i4, t4.x);
              } }]), u2;
            })(p);
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
              for (var e3 = arguments.length, n3 = new Array(e3 > 1 ? e3 - 1 : 0), i3 = 1; i3 < e3; i3++) n3[i3 - 1] = arguments[i3];
            }
            var c, a = (function() {
              var t3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "binpackingjs";
              return s.bind(void 0, t3);
            })("3D:"), h = (function() {
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
                return this.items.reduce((function(t4, e3) {
                  return t4 + e3.getWeight();
                }), 0);
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
                return Object.keys(e3).sort((function(t5, n4) {
                  return e3[n4] - e3[t5];
                })).map(Number);
              } }, { key: "putItem", value: function(t4, e3) {
                var n3 = this, i3 = false, r2 = this.getBestRotationOrder(t4);
                t4.position = e3;
                for (var o2 = 0; o2 < r2.length; o2++) {
                  t4.rotationType = r2[o2];
                  var u2 = t4.getDimension();
                  if (n3.getWidth() < e3[0] + u2[0] || n3.getHeight() < e3[1] + u2[1] || n3.getDepth() < e3[2] + u2[2]) i3 = false;
                  else {
                    i3 = true;
                    for (var s2 = 0; s2 < n3.items.length; s2++) if (n3.items[s2].intersect(t4)) {
                      i3 = false;
                      break;
                    }
                    i3 && n3.items.push(t4);
                  }
                  if (a("try to putItem", i3, "item", t4.toString(), "box", n3.toString()), i3) break;
                }
                return i3;
              } }, { key: "toString", value: function() {
                return "Bin:".concat(this.name, " (WxHxD = ").concat(this.getWidth(), "x").concat(this.getHeight(), "x").concat(this.getDepth(), ", MaxWg. = ").concat(this.getMaxWeight(), ")");
              } }]), t3;
            })(), f = [0, 0, 0], l = (c = {}, (0, o.Z)(c, 0, "RotationType_WHD (w,h,d)"), (0, o.Z)(c, 1, "RotationType_HWD (h,w,d)"), (0, o.Z)(c, 2, "RotationType_HDW (h,d,w)"), (0, o.Z)(c, 3, "RotationType_DHW (d,h,w)"), (0, o.Z)(c, 4, "RotationType_DWH (d,w,h)"), (0, o.Z)(c, 5, "RotationType_WDH (w,d,h)"), c), p = (function() {
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
            })(), g = function(t3, e3, n3, i3) {
              var r2, o2, u2, s2, c2, a2, h2, f2;
              return r2 = t3.getDimension(), o2 = e3.getDimension(), u2 = t3.position[n3] + r2[n3] / 2, s2 = t3.position[i3] + r2[i3] / 2, c2 = e3.position[n3] + o2[n3] / 2, a2 = e3.position[i3] + o2[i3] / 2, h2 = Math.max(u2, c2) - Math.min(u2, c2), f2 = Math.max(s2, a2) - Math.min(s2, a2), h2 < (r2[n3] + o2[n3]) / 2 && f2 < (r2[i3] + o2[i3]) / 2;
            }, y = (function() {
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
                  if (n3.weighItem(t4) && n3.putItem(t4, f)) return 1 === n3.items.length && n3.items[0] === t4 && (n3.items = []), n3;
                }
                return null;
              } }, { key: "getBiggerBinThan", value: function(t4) {
                for (var e3 = t4.getVolume(), n3 = 0; n3 < this.bins; n3++) {
                  var i3 = this.bins[n3];
                  if (i3.getVolume() > e3) return i3;
                }
                return null;
              } }, { key: "unfitItem", value: function() {
                0 !== this.items.length && (this.unfitItems.push(this.items[0]), this.items.splice(0, 1));
              } }, { key: "packToBin", value: function(t4, e3) {
                var n3 = null, i3 = [];
                if (!t4.weighItem(e3[0]) || !t4.putItem(e3[0], f)) {
                  var r2 = this.getBiggerBinThan(t4);
                  return r2 ? this.packToBin(r2, e3) : this.items;
                }
                for (var o2 = 1; o2 < this.items.length; o2++) {
                  var u2 = false, s2 = this.items[o2];
                  if (t4.weighItem(s2)) t: for (var c2 = 0; c2 < 3; c2++) for (var a2 = 0; a2 < t4.items.length; a2++) {
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
                    for (; null !== n3; ) if ((n3 = this.getBiggerBinThan(t4)) && (n3.items.push(s2), 0 === this.packToBin(n3, n3.items).length)) {
                      t4 = n3, u2 = true;
                      break;
                    }
                    u2 || i3.push(s2);
                  }
                }
                return i3;
              } }, { key: "pack", value: function() {
                for (this.bins.sort((function(t5, e3) {
                  return t5.getVolume() - e3.getVolume();
                })), this.items.sort((function(t5, e3) {
                  return e3.getVolume() - t5.getVolume();
                })); this.items.length > 0; ) {
                  var t4 = this.findFittedBin(this.items[0]);
                  null !== t4 ? this.items = this.packToBin(t4, this.items) : this.unfitItem();
                }
                return null;
              } }]), t3;
            })();
          }, 23: function(t2) {
            var e2 = (function() {
              "use strict";
              function t3(e4, i2, r, o) {
                "object" == typeof i2 && (r = i2.depth, o = i2.prototype, i2.filter, i2 = i2.circular);
                var u = [], s = [], c = "undefined" != typeof Buffer;
                return void 0 === i2 && (i2 = true), void 0 === r && (r = 1 / 0), (function e5(r2, a) {
                  if (null === r2) return null;
                  if (0 == a) return r2;
                  var h, f;
                  if ("object" != typeof r2) return r2;
                  if (t3.__isArray(r2)) h = [];
                  else if (t3.__isRegExp(r2)) h = new RegExp(r2.source, n2(r2)), r2.lastIndex && (h.lastIndex = r2.lastIndex);
                  else if (t3.__isDate(r2)) h = new Date(r2.getTime());
                  else {
                    if (c && Buffer.isBuffer(r2)) return h = Buffer.allocUnsafe ? Buffer.allocUnsafe(r2.length) : new Buffer(r2.length), r2.copy(h), h;
                    void 0 === o ? (f = Object.getPrototypeOf(r2), h = Object.create(f)) : (h = Object.create(o), f = o);
                  }
                  if (i2) {
                    var l = u.indexOf(r2);
                    if (-1 != l) return s[l];
                    u.push(r2), s.push(h);
                  }
                  for (var p in r2) {
                    var g;
                    f && (g = Object.getOwnPropertyDescriptor(f, p)), g && null == g.set || (h[p] = e5(r2[p], a - 1));
                  }
                  return h;
                })(e4, r);
              }
              function e3(t4) {
                return Object.prototype.toString.call(t4);
              }
              function n2(t4) {
                var e4 = "";
                return t4.global && (e4 += "g"), t4.ignoreCase && (e4 += "i"), t4.multiline && (e4 += "m"), e4;
              }
              return t3.clonePrototype = function(t4) {
                if (null === t4) return null;
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
            })();
            t2.exports && (t2.exports = e2);
          }, 426: function(t2, e2, n2) {
            !(function() {
              "use strict";
              !(function() {
                if ("undefined" == typeof console) throw new Error("Weird, console object is undefined");
                if ("function" != typeof console.table || console.table !== l) {
                  var e3 = function(t3, e4) {
                    return typeof e4 === t3;
                  }.bind(null, "string"), i2 = u.bind(null, e3), r = u.bind(null, Array.isArray), o = n2(185);
                  t2.exports.getTable = function() {
                    var t3 = Array.prototype.slice.call(arguments), e4 = "";
                    return 2 === t3.length && "string" == typeof t3[0] && Array.isArray(t3[1]) ? h(t3[0], t3[1]) : 2 === t3.length && i2(t3[0]) && r(t3[1]) ? c(t3[0], t3[1], true) : (t3.forEach((function(n3, i3) {
                      if ("string" == typeof n3) return e4 += n3, void (i3 !== t3.length - 1 && (e4 += "\n"));
                      Array.isArray(n3) ? e4 += s(n3) + "\n" : "object" == typeof n3 && (e4 += f(n3));
                    })), e4);
                  }, console.table = l;
                }
                function u(t3, e4) {
                  return Array.isArray(e4) && e4.every(t3);
                }
                function s(t3) {
                  var e4 = new o();
                  return t3.forEach((function(t4) {
                    "string" == typeof t4 || "number" == typeof t4 ? e4.cell("item", t4) : Object.keys(t4).forEach((function(n3) {
                      e4.cell(n3, t4[n3]);
                    })), e4.newRow();
                  })), e4.toString();
                }
                function c(t3, e4, n3) {
                  var i3 = new o();
                  e4.forEach((function(e5) {
                    e5.forEach((function(e6, n4) {
                      i3.cell(t3[n4], e6);
                    })), i3.newRow();
                  }));
                  var r2 = i3.toString();
                  return n3 ? r2 : console.log(r2);
                }
                function a(t3, e4) {
                  var n3 = s(e4), i3 = n3.indexOf("\n");
                  if (i3 > 0) {
                    t3.length > i3 && (i3 = t3.length), console.log(t3);
                    var r2, o2 = "";
                    for (r2 = 0; r2 < i3; r2 += 1) o2 += "-";
                    console.log(o2);
                  }
                  console.log(n3);
                }
                function h(t3, e4) {
                  var n3 = s(e4), i3 = n3.indexOf("\n"), r2 = "";
                  if (i3 > 0) {
                    t3.length > i3 && (i3 = t3.length), r2 += t3 + "\n";
                    var o2, u2 = "";
                    for (o2 = 0; o2 < i3; o2 += 1) u2 += "-";
                    r2 += u2 + "\n";
                  }
                  return r2 + n3;
                }
                function f(t3) {
                  return s((function(t4) {
                    return Object.keys(t4).map((function(e4) {
                      return { key: e4, value: t4[e4] };
                    }));
                  })(t3));
                }
                function l() {
                  var t3 = Array.prototype.slice.call(arguments);
                  return 2 === t3.length && "string" == typeof t3[0] && Array.isArray(t3[1]) ? a(t3[0], t3[1]) : 2 === t3.length && i2(t3[0]) && r(t3[1]) ? c(t3[0], t3[1]) : void t3.forEach((function(t4) {
                    if ("string" == typeof t4) return console.log(t4);
                    Array.isArray(t4) ? console.log(s(t4)) : "object" == typeof t4 && console.log(f(t4));
                  }));
                }
              })();
            })();
          }, 451: function(t2, e2, n2) {
            var i2 = n2(23);
            t2.exports = function(t3, e3) {
              return t3 = t3 || {}, Object.keys(e3).forEach((function(n3) {
                void 0 === t3[n3] && (t3[n3] = i2(e3[n3]));
              })), t3;
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
            function f(t3, e3) {
              for (var n3 in t3) "__printers" != n3 && e3(n3, t3[n3]);
            }
            function l(t3, e3) {
              return t3 === e3 ? 0 : void 0 === t3 ? 1 : void 0 === e3 ? -1 : null === t3 ? 1 : null === e3 ? -1 : t3 > e3 ? 1 : t3 < e3 ? -1 : l(String(t3), String(e3));
            }
            r.number = function(t3) {
              return function(e3, n3) {
                if (null == e3) return "";
                if ("number" != typeof e3) throw new Error(e3 + " is not a number");
                var i3 = null == t3 ? e3 + "" : e3.toFixed(t3);
                return c(i3, n3);
              };
            }, r.prototype.columns = function() {
              for (var t3 = {}, e3 = 0; e3 < 2; e3++) this.rows.forEach((function(e4) {
                var n3 = 0;
                f(e4, (function(e5) {
                  n3 = Math.max(n3, t3[e5] || 0), t3[e5] = n3, n3++;
                }));
              }));
              return Object.keys(t3).sort((function(e4, n3) {
                return t3[e4] - t3[n3];
              }));
            }, r.prototype.print = function() {
              var t3 = this.columns(), e3 = this.separator, n3 = {}, i3 = "";
              return this.rows.forEach((function(t4) {
                f(t4, (function(e4, i4) {
                  var r2 = t4.__printers[e4].call(t4, i4);
                  n3[e4] = Math.max(u(r2), n3[e4] || 0);
                }));
              })), this.rows.forEach((function(r2) {
                var o2 = "";
                t3.forEach((function(t4) {
                  var i4 = n3[t4], u2 = r2.hasOwnProperty(t4) ? "" + r2.__printers[t4].call(r2, r2[t4], i4) : "";
                  o2 += h(u2, i4) + e3;
                })), o2 = o2.slice(0, -e3.length), i3 += o2 + "\n";
              })), i3;
            }, r.prototype.toString = function() {
              var t3 = this.columns(), e3 = new r();
              return e3.separator = this.separator, t3.forEach((function(t4) {
                e3.cell(t4, t4);
              })), e3.newRow(), e3.pushDelimeter(t3), e3.rows = e3.rows.concat(this.rows), this.totals && this.rows.length && (e3.pushDelimeter(t3), this.forEachTotal(e3.cell.bind(e3)), e3.newRow()), e3.print();
            }, r.prototype.pushDelimeter = function(t3) {
              return (t3 = t3 || this.columns()).forEach((function(t4) {
                this.cell(t4, void 0, s("-"));
              }), this), this.newRow();
            }, r.prototype.forEachTotal = function(t3) {
              for (var e3 in this.totals) {
                var n3 = this.totals[e3], i3 = n3.init, r2 = this.rows.length;
                this.rows.forEach((function(t4, o2) {
                  i3 = n3.reduce.call(t4, i3, t4[e3], o2, r2);
                })), t3(e3, i3, n3.printer);
              }
            }, r.prototype.printTransposed = function(t3) {
              t3 = t3 || {};
              var e3 = new r();
              return e3.separator = t3.separator || this.separator, this.columns().forEach((function(n3) {
                e3.cell(0, n3, t3.namePrinter), this.rows.forEach((function(t4, i3) {
                  e3.cell(i3 + 1, t4[n3], t4.__printers[n3]);
                })), e3.newRow();
              }), this), e3.print();
            }, r.prototype.sort = function(t3) {
              if ("function" == typeof t3) return this.rows.sort(t3), this;
              var e3 = (Array.isArray(t3) ? t3 : this.columns()).map((function(t4) {
                var e4 = "asc", n3 = /(.*)\|\s*(asc|des)\s*$/.exec(t4);
                return n3 && (t4 = n3[1], e4 = n3[2]), function(n4, i3) {
                  return "asc" == e4 ? l(n4[t4], i3[t4]) : l(i3[t4], n4[t4]);
                };
              }));
              return this.sort((function(t4, n3) {
                for (var i3 = 0; i3 < e3.length; i3++) {
                  var r2 = e3[i3](t4, n3);
                  if (0 != r2) return r2;
                }
                return 0;
              }));
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
                for (var n4 in t4) if (t4.hasOwnProperty(n4)) {
                  var r2 = i3[n4] || {};
                  e4(r2.name || n4, t4[n4], r2.printer);
                }
              };
              var o2 = new r(), u2 = o2.cell.bind(o2);
              return Array.isArray(t3) ? (n3 = n3 || function(t4) {
                return t4.toString();
              }, t3.forEach((function(t4) {
                e3(t4, u2), o2.newRow();
              }))) : (n3 = n3 || function(t4) {
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
              if ("string" != typeof t3) return s(t3, e3);
              for (var n3 = 0, i3 = 0; i3 < t3.length; i3++) {
                var r2 = s(t3.charCodeAt(i3), e3);
                if (r2 < 0) return -1;
                n3 += r2;
              }
              return n3;
            }
            function s(t3, e3) {
              return 0 === t3 ? e3.nul : t3 < 32 || t3 >= 127 && t3 < 160 ? e3.control : (function(t4) {
                var e4, n3 = 0, i3 = r.length - 1;
                if (t4 < r[0][0] || t4 > r[i3][1]) return false;
                for (; i3 >= n3; ) if (e4 = Math.floor((n3 + i3) / 2), t4 > r[e4][1]) n3 = e4 + 1;
                else {
                  if (!(t4 < r[e4][0])) return true;
                  i3 = e4 - 1;
                }
                return false;
              })(t3) ? 0 : 1 + (t3 >= 4352 && (t3 <= 4447 || 9001 == t3 || 9002 == t3 || t3 >= 11904 && t3 <= 42191 && 12351 != t3 || t3 >= 44032 && t3 <= 55203 || t3 >= 63744 && t3 <= 64255 || t3 >= 65040 && t3 <= 65049 || t3 >= 65072 && t3 <= 65135 || t3 >= 65280 && t3 <= 65376 || t3 >= 65504 && t3 <= 65510 || t3 >= 131072 && t3 <= 196605 || t3 >= 196608 && t3 <= 262141));
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
            if (e[i2]) return e[i2].exports;
            var r = e[i2] = { exports: {} };
            return t[i2](r, r.exports, n), r.exports;
          }
          n.d = function(t2, e2) {
            for (var i2 in e2) n.o(e2, i2) && !n.o(t2, i2) && Object.defineProperty(t2, i2, { enumerable: true, get: e2[i2] });
          }, n.o = function(t2, e2) {
            return Object.prototype.hasOwnProperty.call(t2, e2);
          }, n.r = function(t2) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t2, "__esModule", { value: true });
          };
          var i = {};
          return (function() {
            "use strict";
            n.r(i), n.d(i, { BP2D: function() {
              return t2;
            }, BP3D: function() {
              return e2;
            } });
            var t2 = n(269), e2 = n(625);
          })(), i;
        })();
      }));
    }
  });

  // cartonization.js
  var { BP3D } = require_BinPacking_min();
  var { Item, Bin, Packer } = BP3D;
  var SCALE = 1e5;
  var CartonizationService = class {
    constructor(boxes = []) {
      this.boxInventory = boxes;
    }
    setBoxInventory(boxes) {
      this.boxInventory = boxes;
    }
    /**
     * Expand items with quantities into individual items for packing.
     * Normalize dimensions so smallest is always height - this encourages
     * flat packing while still allowing the library to rotate as needed.
     */
    expandItems(items) {
      const expanded = [];
      items.forEach((item) => {
        for (let i = 0; i < (item.quantity || 1); i++) {
          const dims = [
            Math.max(item.length || 1, 0.1),
            Math.max(item.width || 1, 0.1),
            Math.max(item.height || 1, 0.1)
          ].sort((a, b) => b - a);
          expanded.push({
            sku: item.sku || "unknown",
            // Normalized: length >= width >= height
            length: dims[0],
            width: dims[1],
            height: dims[2],
            weight: item.weight || 1,
            color: item.color,
            originalIndex: expanded.length
          });
        }
      });
      return expanded;
    }
    /**
     * Generate bin constraint strategies based on item dimensions.
     * Different constraints guide FFD to pack in different ways.
     */
    generateStrategies(items) {
      let maxL = 0, maxW = 0, maxH = 0;
      let sumL = 0, sumW = 0, sumH = 0;
      items.forEach((item) => {
        const dims = [item.length, item.width, item.height].sort((a, b) => b - a);
        maxL = Math.max(maxL, dims[0]);
        maxW = Math.max(maxW, dims[1]);
        maxH = Math.max(maxH, dims[2]);
        sumL += dims[0];
        sumW += dims[1];
        sumH += dims[2];
      });
      const avgL = sumL / items.length;
      const avgW = sumW / items.length;
      const avgH = sumH / items.length;
      return [
        { name: "unconstrained", dims: [200, 200, 200] },
        { name: "footprint_LW", dims: [maxL, maxW, 200] },
        { name: "footprint_LH", dims: [maxL, maxH, 200] },
        { name: "footprint_WH", dims: [maxW, maxH, 200] },
        { name: "wide_shallow", dims: [maxL * 2, maxW * 2, maxH * 3] },
        { name: "tall_narrow", dims: [maxL, maxH * 2, 200] },
        { name: "cube_ish", dims: [maxL * 1.5, maxL * 1.5, maxL * 1.5] },
        { name: "sum_based", dims: [sumL, maxW, maxH * 2] },
        { name: "avg_scaled", dims: [avgL * 2, avgW * 2, avgH * items.length] },
        { name: "flat_spread", dims: [sumL * 0.5, sumW * 0.5, maxH * 2] }
      ];
    }
    /**
     * Pack items into optimal box from inventory
     */
    packItems(items, paddingPerSide = 0) {
      if (!items || items.length === 0) {
        return { success: false, box: null, packedItems: [], totalWeight: 0, itemsVolume: 0 };
      }
      const expandedItems = this.expandItems(items);
      const totalWeight = expandedItems.reduce((sum, i) => sum + i.weight, 0);
      const totalVolume = expandedItems.reduce((sum, i) => sum + i.length * i.width * i.height, 0);
      const padding = paddingPerSide * 2;
      const allItemDims = expandedItems.map((i) => [i.length, i.width, i.height].sort((a, b) => b - a));
      const minDim1 = Math.max(...allItemDims.map((d) => d[0])) + padding;
      const minDim2 = Math.max(...allItemDims.map((d) => d[1])) + padding;
      const minDim3 = Math.max(...allItemDims.map((d) => d[2])) + padding;
      const validBoxes = this.boxInventory.filter((box) => {
        if (totalWeight > box.max_weight) return false;
        const boxDims = [box.length, box.width, box.height].sort((a, b) => b - a);
        const reqDims = [minDim1, minDim2, minDim3].sort((a, b) => b - a);
        return reqDims[0] <= boxDims[0] && reqDims[1] <= boxDims[1] && reqDims[2] <= boxDims[2];
      }).sort((a, b) => a.length * a.width * a.height - b.length * b.width * b.height);
      if (validBoxes.length === 0) {
        return this.createFallbackResult(expandedItems, totalWeight, totalVolume, paddingPerSide);
      }
      for (const candidateBox of validBoxes) {
        const result = this.tryPackInBin(
          expandedItems,
          candidateBox.length - padding,
          candidateBox.height - padding,
          candidateBox.width - padding
        );
        if (result && result.packedItems.length === expandedItems.length) {
          const adjustedItems = result.packedItems.map((item) => ({
            ...item,
            x: item.x + paddingPerSide,
            y: item.y + paddingPerSide,
            z: item.z + paddingPerSide
          }));
          return {
            success: true,
            algorithm: result.algorithm || "single_box",
            box: candidateBox,
            packedItems: adjustedItems,
            totalWeight: totalWeight + candidateBox.box_weight,
            itemsVolume: totalVolume,
            strategiesTried: result.strategiesTried,
            bestStrategy: result.bestStrategy
          };
        }
      }
      const largestBox = validBoxes[validBoxes.length - 1];
      const partialResult = this.tryPackInBin(
        expandedItems,
        largestBox.length - padding,
        largestBox.height - padding,
        largestBox.width - padding
      );
      if (partialResult) {
        const adjustedItems = partialResult.packedItems.map((item) => ({
          ...item,
          x: item.x + paddingPerSide,
          y: item.y + paddingPerSide,
          z: item.z + paddingPerSide
        }));
        return {
          success: false,
          algorithm: "single_box_partial",
          box: largestBox,
          packedItems: adjustedItems,
          totalWeight: totalWeight + largestBox.box_weight,
          itemsVolume: totalVolume,
          unpackedCount: expandedItems.length - partialResult.packedItems.length
        };
      }
      return this.createFallbackResult(expandedItems, totalWeight, totalVolume, paddingPerSide);
    }
    /**
     * Pack items into ideal (perfect-fit) box
     * Strategy: Use FFD in a large container, then measure actual bounding box
     */
    packItemsIdeal(items, paddingPerSide = 0) {
      if (!items || items.length === 0) {
        return { success: false, box: null, packedItems: [], totalWeight: 0, itemsVolume: 0 };
      }
      const expandedItems = this.expandItems(items);
      const totalWeight = expandedItems.reduce((sum, i) => sum + i.weight, 0);
      const totalVolume = expandedItems.reduce((sum, i) => sum + i.length * i.width * i.height, 0);
      const result = this.tryPackDirect(expandedItems, 200, 200, 200);
      if (!result || result.packedItems.length !== expandedItems.length) {
        return this.createFallbackResult(expandedItems, totalWeight, totalVolume, paddingPerSide);
      }
      const padding = paddingPerSide * 2;
      const idealBox = {
        name: "Ideal",
        length: Math.ceil(result.extentX + padding),
        width: Math.ceil(result.extentZ + padding),
        height: Math.ceil(result.extentY + padding),
        box_weight: 0.3,
        max_weight: 1e3
      };
      const adjustedItems = result.packedItems.map((item) => ({
        ...item,
        x: item.x + paddingPerSide,
        y: item.y + paddingPerSide,
        z: item.z + paddingPerSide
      }));
      const boxVol = result.extentX * result.extentY * result.extentZ;
      return {
        success: true,
        algorithm: "ffd_bounded",
        box: idealBox,
        packedItems: adjustedItems,
        totalWeight: totalWeight + 0.3,
        itemsVolume: totalVolume,
        efficiency: (totalVolume / boxVol * 100).toFixed(1) + "%"
      };
    }
    /**
     * Optimal stacking: arrange items in grid layers for realistic box shapes
     */
    optimalStackResult(items) {
      if (items.length === 0) return null;
      const flatItems = items.map((item) => {
        const dims = [item.length, item.width, item.height].sort((a, b) => b - a);
        return {
          ...item,
          flatL: dims[0],
          // Largest dimension
          flatW: dims[1],
          // Middle dimension  
          flatH: dims[2]
          // Smallest dimension (height when flat)
        };
      });
      flatItems.sort((a, b) => b.flatL * b.flatW - a.flatL * a.flatW);
      const totalVol = flatItems.reduce((sum, i) => sum + i.flatL * i.flatW * i.flatH, 0);
      const targetSide = Math.cbrt(totalVol * 1.3);
      const minL = Math.max(...flatItems.map((i) => i.flatL));
      const minW = Math.max(...flatItems.map((i) => i.flatW));
      let targetL = Math.max(minL, targetSide);
      let targetW = Math.max(minW, targetSide);
      const packedItems = [];
      const remaining = [...flatItems];
      let currentY = 0;
      while (remaining.length > 0) {
        const layer = this.packLayer(remaining, targetL, targetW, currentY);
        packedItems.push(...layer.placed);
        const placedSet = new Set(layer.placed.map((p) => p._index));
        const newRemaining = [];
        for (let i = 0; i < remaining.length; i++) {
          if (!placedSet.has(i)) {
            newRemaining.push(remaining[i]);
          }
        }
        remaining.length = 0;
        remaining.push(...newRemaining);
        currentY += layer.height;
      }
      let extentX = 0, extentY = 0, extentZ = 0;
      packedItems.forEach((item) => {
        extentX = Math.max(extentX, item.x + item.packedLength);
        extentY = Math.max(extentY, item.y + item.packedHeight);
        extentZ = Math.max(extentZ, item.z + item.packedWidth);
      });
      return {
        extentX,
        extentY,
        extentZ,
        packedItems,
        strategy: "grid_layers"
      };
    }
    /**
     * Pack a single layer with items using simple row-based approach
     */
    packLayer(items, maxL, maxW, startY) {
      const placed = [];
      let currentX = 0;
      let currentZ = 0;
      let rowMaxW = 0;
      let layerHeight = 0;
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (currentX + item.flatL <= maxL && currentZ + item.flatW <= maxW) {
          placed.push({
            sku: item.sku,
            color: item.color,
            x: currentX,
            y: startY,
            z: currentZ,
            packedLength: item.flatL,
            packedHeight: item.flatH,
            packedWidth: item.flatW,
            _index: i
          });
          currentX += item.flatL;
          rowMaxW = Math.max(rowMaxW, item.flatW);
          layerHeight = Math.max(layerHeight, item.flatH);
        } else if (currentZ + rowMaxW + item.flatW <= maxW && item.flatL <= maxL) {
          currentX = 0;
          currentZ += rowMaxW;
          rowMaxW = 0;
          placed.push({
            sku: item.sku,
            color: item.color,
            x: currentX,
            y: startY,
            z: currentZ,
            packedLength: item.flatL,
            packedHeight: item.flatH,
            packedWidth: item.flatW,
            _index: i
          });
          currentX += item.flatL;
          rowMaxW = Math.max(rowMaxW, item.flatW);
          layerHeight = Math.max(layerHeight, item.flatH);
        }
      }
      if (placed.length === 0 && items.length > 0) {
        const item = items[0];
        placed.push({
          sku: item.sku,
          color: item.color,
          x: 0,
          y: startY,
          z: 0,
          packedLength: item.flatL,
          packedHeight: item.flatH,
          packedWidth: item.flatW,
          _index: 0
        });
        layerHeight = item.flatH;
      }
      return { placed, height: layerHeight };
    }
    /**
     * Theoretical minimum: all items laid flat, using max footprint
     * This is the absolute smallest box possible (without nesting)
     */
    theoreticalMinimum(items) {
      let maxL = 0, maxW = 0, totalH = 0;
      items.forEach((item) => {
        const dims = [item.length, item.width, item.height].sort((a, b) => b - a);
        maxL = Math.max(maxL, dims[0]);
        maxW = Math.max(maxW, dims[1]);
        totalH += dims[2];
      });
      const sorted = [...items].sort((a, b) => {
        const aDims = [a.length, a.width, a.height].sort((x, y) => y - x);
        const bDims = [b.length, b.width, b.height].sort((x, y) => y - x);
        return bDims[0] * bDims[1] - aDims[0] * aDims[1];
      });
      let currentY = 0;
      const packedItems = sorted.map((item) => {
        const dims = [item.length, item.width, item.height].sort((a, b) => b - a);
        const sizeX = dims[0];
        const sizeZ = dims[1];
        const sizeY = dims[2];
        const result = {
          sku: item.sku,
          color: item.color,
          x: 0,
          // Flush to corner
          y: currentY,
          z: 0,
          // Flush to corner
          packedLength: sizeX,
          packedHeight: sizeY,
          packedWidth: sizeZ
        };
        currentY += sizeY;
        return result;
      });
      return {
        extentX: maxL,
        extentY: totalH,
        extentZ: maxW,
        packedItems
      };
    }
    /**
     * Nesting stack: place smaller items on top of larger items' footprints
     * Tries to minimize wasted vertical space
     */
    nestingStack(items) {
      const sorted = [...items].sort((a, b) => {
        const aDims = [a.length, a.width, a.height].sort((x, y) => y - x);
        const bDims = [b.length, b.width, b.height].sort((x, y) => y - x);
        return bDims[0] * bDims[1] - aDims[0] * aDims[1];
      });
      const itemDims = sorted.map((item) => {
        const dims = [item.length, item.width, item.height].sort((a, b) => b - a);
        return { item, sizeX: dims[0], sizeZ: dims[1], sizeY: dims[2] };
      });
      const maxL = Math.max(...itemDims.map((d) => d.sizeX));
      const maxW = Math.max(...itemDims.map((d) => d.sizeZ));
      const packedItems = [];
      const placed = /* @__PURE__ */ new Set();
      let currentY = 0;
      for (let i = 0; i < itemDims.length; i++) {
        if (placed.has(i)) continue;
        const base = itemDims[i];
        placed.add(i);
        packedItems.push({
          sku: base.item.sku,
          color: base.item.color,
          x: 0,
          y: currentY,
          z: 0,
          packedLength: base.sizeX,
          packedHeight: base.sizeY,
          packedWidth: base.sizeZ
        });
        let layerX = base.sizeX;
        let layerZ = 0;
        let layerMaxH = base.sizeY;
        let rowMaxZ = base.sizeZ;
        for (let j = i + 1; j < itemDims.length; j++) {
          if (placed.has(j)) continue;
          const other = itemDims[j];
          if (layerX + other.sizeX <= maxL && other.sizeZ <= rowMaxZ) {
            packedItems.push({
              sku: other.item.sku,
              color: other.item.color,
              x: layerX,
              y: currentY,
              z: layerZ,
              packedLength: other.sizeX,
              packedHeight: other.sizeY,
              packedWidth: other.sizeZ
            });
            layerX += other.sizeX;
            layerMaxH = Math.max(layerMaxH, other.sizeY);
            placed.add(j);
          } else if (other.sizeX <= maxL && layerZ + rowMaxZ + other.sizeZ <= maxW) {
            layerZ += rowMaxZ;
            rowMaxZ = other.sizeZ;
            layerX = other.sizeX;
            packedItems.push({
              sku: other.item.sku,
              color: other.item.color,
              x: 0,
              y: currentY,
              z: layerZ,
              packedLength: other.sizeX,
              packedHeight: other.sizeY,
              packedWidth: other.sizeZ
            });
            layerMaxH = Math.max(layerMaxH, other.sizeY);
            placed.add(j);
          }
        }
        currentY += layerMaxH;
      }
      let extentX = 0, extentY = 0, extentZ = 0;
      packedItems.forEach((item) => {
        extentX = Math.max(extentX, item.x + item.packedLength);
        extentY = Math.max(extentY, item.y + item.packedHeight);
        extentZ = Math.max(extentZ, item.z + item.packedWidth);
      });
      return { extentX, extentY, extentZ, packedItems };
    }
    /**
     * Stack all items flat (largest footprint down), vertically
     */
    stackFlat(items) {
      const sorted = [...items].sort(
        (a, b) => b.length * b.width - a.length * a.width
      );
      let maxL = 0, maxW = 0;
      sorted.forEach((item) => {
        const dims = [item.length, item.width, item.height].sort((a, b) => b - a);
        maxL = Math.max(maxL, dims[0]);
        maxW = Math.max(maxW, dims[1]);
      });
      let currentY = 0;
      const packedItems = sorted.map((item) => {
        const dims = [item.length, item.width, item.height].sort((a, b) => b - a);
        const sizeX = dims[0], sizeZ = dims[1], sizeY = dims[2];
        const result = {
          sku: item.sku,
          color: item.color,
          x: 0,
          y: currentY,
          z: 0,
          packedLength: sizeX,
          packedHeight: sizeY,
          packedWidth: sizeZ
        };
        currentY += sizeY;
        return result;
      });
      return {
        extentX: maxL,
        extentY: currentY,
        extentZ: maxW,
        packedItems
      };
    }
    /**
     * Stack items grouped by similar footprint
     */
    stackByFootprint(items) {
      const sorted = [...items].sort((a, b) => {
        const aFoot = Math.max(a.length, a.width) * Math.min(a.length, a.width);
        const bFoot = Math.max(b.length, b.width) * Math.min(b.length, b.width);
        return bFoot - aFoot;
      });
      return this.stackFlat(sorted);
    }
    /**
     * Arrange items in rows (side by side, then stack)
     */
    stackInRows(items) {
      const sorted = [...items].sort(
        (a, b) => b.length * b.width * b.height - a.length * a.width * a.height
      );
      const totalVol = items.reduce((sum, i) => sum + i.length * i.width * i.height, 0);
      const targetSide = Math.cbrt(totalVol * 1.2);
      let currentX = 0, currentY = 0, currentZ = 0;
      let rowMaxZ = 0, layerMaxY = 0;
      const packedItems = sorted.map((item) => {
        const dims = [item.length, item.width, item.height].sort((a, b) => b - a);
        const sizeX = dims[0], sizeZ = dims[1], sizeY = dims[2];
        if (currentX > 0 && currentX + sizeX > targetSide * 1.5) {
          currentX = 0;
          currentZ += rowMaxZ;
          rowMaxZ = 0;
        }
        if (currentZ + sizeZ > targetSide * 1.5) {
          currentX = 0;
          currentZ = 0;
          currentY += layerMaxY;
          layerMaxY = 0;
          rowMaxZ = 0;
        }
        const result = {
          sku: item.sku,
          color: item.color,
          x: currentX,
          y: currentY,
          z: currentZ,
          packedLength: sizeX,
          packedHeight: sizeY,
          packedWidth: sizeZ
        };
        currentX += sizeX;
        rowMaxZ = Math.max(rowMaxZ, sizeZ);
        layerMaxY = Math.max(layerMaxY, sizeY);
        return result;
      });
      let extentX = 0, extentY = 0, extentZ = 0;
      packedItems.forEach((item) => {
        extentX = Math.max(extentX, item.x + item.packedLength);
        extentY = Math.max(extentY, item.y + item.packedHeight);
        extentZ = Math.max(extentZ, item.z + item.packedWidth);
      });
      return { extentX, extentY, extentZ, packedItems };
    }
    /**
     * Check if dimensions have a reasonable aspect ratio.
     * Rejects "pencil boxes" and "pizza boxes".
     */
    hasReasonableAspectRatio(x, y, z, maxRatio = 4) {
      const dims = [x, y, z].sort((a, b) => b - a);
      return dims[0] / dims[2] <= maxRatio;
    }
    /**
     * Try packing with multiple bin constraint strategies.
     * Returns the result with smallest bounding volume that has reasonable proportions.
     */
    tryPackMultiStrategy(items) {
      const strategies = this.generateStrategies(items);
      let bestResult = null;
      let bestVolume = Infinity;
      let bestStrategy = null;
      for (const strategy of strategies) {
        const result = this.tryPackWithConstraint(items, strategy.dims);
        if (result && result.packedItems.length === items.length) {
          if (!this.hasReasonableAspectRatio(result.extentX, result.extentY, result.extentZ)) {
            continue;
          }
          const vol = result.extentX * result.extentY * result.extentZ;
          if (vol < bestVolume) {
            bestVolume = vol;
            bestResult = result;
            bestStrategy = strategy.name;
          }
        }
      }
      if (!bestResult) {
        const totalVol = items.reduce((sum, i) => sum + i.length * i.width * i.height, 0);
        const targetSide = Math.cbrt(totalVol * 1.5);
        const forcedStrategies = [
          { name: "forced_cube", dims: [targetSide * 1.5, targetSide * 1.5, targetSide * 1.5] },
          { name: "forced_cube_2x", dims: [targetSide * 2, targetSide * 2, targetSide * 2] },
          { name: "forced_cube_3x", dims: [targetSide * 3, targetSide * 3, targetSide * 3] }
        ];
        for (const strategy of forcedStrategies) {
          const result = this.tryPackWithConstraint(items, strategy.dims);
          if (result && result.packedItems.length === items.length) {
            if (this.hasReasonableAspectRatio(result.extentX, result.extentY, result.extentZ, 5)) {
              bestResult = result;
              bestStrategy = strategy.name;
              break;
            }
          }
        }
      }
      if (!bestResult) {
        bestResult = this.smartStackResult(items);
        bestStrategy = "smart_stack";
      }
      if (bestResult) {
        bestResult.algorithm = "multi_strategy";
        bestResult.strategiesTried = strategies.length;
        bestResult.bestStrategy = bestStrategy;
      }
      return bestResult;
    }
    /**
     * Smart stacking: arrange items in a grid pattern for reasonable box shape.
     * Targets roughly cubic output by calculating optimal grid dimensions.
     */
    smartStackResult(items) {
      const sorted = [...items].sort(
        (a, b) => b.length * b.width - a.length * a.width
      );
      const avgL = items.reduce((sum, i) => sum + i.length, 0) / items.length;
      const avgW = items.reduce((sum, i) => sum + i.width, 0) / items.length;
      const avgH = items.reduce((sum, i) => sum + i.height, 0) / items.length;
      const totalVol = items.reduce((sum, i) => sum + i.length * i.width * i.height, 0);
      const targetSide = Math.cbrt(totalVol * 1.3);
      const itemsPerRow = Math.max(1, Math.ceil(targetSide / avgL));
      const itemsPerLayer = Math.max(1, Math.ceil(targetSide / avgW));
      let gridX = 0, gridZ = 0, gridY = 0;
      let rowCount = 0, layerCount = 0;
      let currentRowMaxH = 0;
      let currentLayerMaxZ = 0;
      let currentX = 0;
      const packedItems = sorted.map((item, index) => {
        const dims = [item.length, item.width, item.height].sort((a, b) => b - a);
        const sizeX = dims[0], sizeZ = dims[1], sizeY = dims[2];
        const result = {
          sku: item.sku,
          color: item.color,
          x: currentX,
          y: gridY,
          z: gridZ,
          packedLength: sizeX,
          packedHeight: sizeY,
          packedWidth: sizeZ
        };
        currentX += sizeX;
        currentRowMaxH = Math.max(currentRowMaxH, sizeY);
        currentLayerMaxZ = Math.max(currentLayerMaxZ, sizeZ);
        rowCount++;
        if (rowCount >= itemsPerRow) {
          rowCount = 0;
          currentX = 0;
          gridZ += currentLayerMaxZ;
          currentLayerMaxZ = 0;
          layerCount++;
          if (layerCount >= itemsPerLayer) {
            layerCount = 0;
            gridZ = 0;
            gridY += currentRowMaxH;
            currentRowMaxH = 0;
          }
        }
        return result;
      });
      let extentX = 0, extentY = 0, extentZ = 0;
      packedItems.forEach((item) => {
        extentX = Math.max(extentX, item.x + item.packedLength);
        extentY = Math.max(extentY, item.y + item.packedHeight);
        extentZ = Math.max(extentZ, item.z + item.packedWidth);
      });
      return { extentX, extentY, extentZ, packedItems };
    }
    /**
     * Try packing items with a specific bin constraint.
     * The constraint guides FFD to arrange items differently.
     */
    tryPackWithConstraint(items, constraintDims) {
      const packer = new Packer();
      packer.addBin(new Bin("constrained", constraintDims[0], constraintDims[1], constraintDims[2], 1e4));
      const sortedItems = [...items].sort(
        (a, b) => b.length * b.width * b.height - a.length * a.width * a.height
      );
      sortedItems.forEach((item, i) => {
        const idx = item.originalIndex !== void 0 ? item.originalIndex : i;
        packer.addItem(new Item(
          `${item.sku}__${idx}`,
          item.length,
          item.height,
          item.width,
          item.weight
        ));
      });
      packer.pack();
      const packedBin = packer.bins[0];
      if (!packedBin || !packedBin.items || packedBin.items.length === 0) {
        return null;
      }
      const itemMap = /* @__PURE__ */ new Map();
      items.forEach((item, i) => {
        const idx = item.originalIndex !== void 0 ? item.originalIndex : i;
        itemMap.set(idx, item);
      });
      let extentX = 0, extentY = 0, extentZ = 0;
      const packedItems = packedBin.items.map((packedItem) => {
        const nameParts = packedItem.name.split("__");
        const originalIndex = parseInt(nameParts[nameParts.length - 1], 10);
        const originalItem = itemMap.get(originalIndex) || items[0];
        const dims = packedItem.getDimension();
        const sizeX = dims[0] / SCALE;
        const sizeY = dims[1] / SCALE;
        const sizeZ = dims[2] / SCALE;
        const posX = packedItem.position[0] / SCALE;
        const posY = packedItem.position[1] / SCALE;
        const posZ = packedItem.position[2] / SCALE;
        extentX = Math.max(extentX, posX + sizeX);
        extentY = Math.max(extentY, posY + sizeY);
        extentZ = Math.max(extentZ, posZ + sizeZ);
        return {
          sku: originalItem.sku,
          color: originalItem.color,
          x: posX,
          y: posY,
          z: posZ,
          packedLength: sizeX,
          packedHeight: sizeY,
          packedWidth: sizeZ
        };
      });
      return {
        extentX,
        extentY,
        extentZ,
        packedItems
      };
    }
    /**
     * Try packing items into a specific bin size.
     * Used by packItems() for inventory box testing.
     * Simple approach: just try direct FFD packing.
     */
    tryPackInBin(items, binX, binY, binZ) {
      const result = this.tryPackDirect(items, binX, binY, binZ);
      if (result && result.packedItems.length === items.length) {
        if (result.extentX <= binX && result.extentY <= binY && result.extentZ <= binZ) {
          result.algorithm = "direct";
          return result;
        }
      }
      return null;
    }
    /**
     * Direct packing attempt with exact bin dimensions
     */
    tryPackDirect(items, binX, binY, binZ) {
      const packer = new Packer();
      packer.addBin(new Bin("test", binX, binY, binZ, 1e4));
      const sortedItems = [...items].sort(
        (a, b) => b.length * b.width * b.height - a.length * a.width * a.height
      );
      sortedItems.forEach((item, i) => {
        const idx = item.originalIndex !== void 0 ? item.originalIndex : i;
        packer.addItem(new Item(
          `${item.sku}__${idx}`,
          item.length,
          item.height,
          item.width,
          item.weight
        ));
      });
      packer.pack();
      const packedBin = packer.bins[0];
      if (!packedBin || !packedBin.items || packedBin.items.length === 0) {
        return null;
      }
      const itemMap = /* @__PURE__ */ new Map();
      items.forEach((item, i) => {
        const idx = item.originalIndex !== void 0 ? item.originalIndex : i;
        itemMap.set(idx, item);
      });
      let extentX = 0, extentY = 0, extentZ = 0;
      const packedItems = packedBin.items.map((packedItem) => {
        const nameParts = packedItem.name.split("__");
        const originalIndex = parseInt(nameParts[nameParts.length - 1], 10);
        const originalItem = itemMap.get(originalIndex) || items[0];
        const dims = packedItem.getDimension();
        const sizeX = dims[0] / SCALE;
        const sizeY = dims[1] / SCALE;
        const sizeZ = dims[2] / SCALE;
        const posX = packedItem.position[0] / SCALE;
        const posY = packedItem.position[1] / SCALE;
        const posZ = packedItem.position[2] / SCALE;
        extentX = Math.max(extentX, posX + sizeX);
        extentY = Math.max(extentY, posY + sizeY);
        extentZ = Math.max(extentZ, posZ + sizeZ);
        return {
          sku: originalItem.sku,
          color: originalItem.color,
          x: posX,
          y: posY,
          z: posZ,
          packedLength: sizeX,
          packedHeight: sizeY,
          packedWidth: sizeZ
        };
      });
      return {
        extentX,
        extentY,
        extentZ,
        packedItems
      };
    }
    /**
     * Simple vertical stack fallback
     */
    simpleStackResult(items) {
      let maxX = 0, maxZ = 0, stackY = 0;
      const packedItems = items.map((item) => {
        const dims = [item.length, item.width, item.height].sort((a, b) => b - a);
        const sizeX = dims[0], sizeZ = dims[1], sizeY = dims[2];
        maxX = Math.max(maxX, sizeX);
        maxZ = Math.max(maxZ, sizeZ);
        const result = {
          sku: item.sku,
          color: item.color,
          x: 0,
          y: stackY,
          z: 0,
          packedLength: sizeX,
          packedHeight: sizeY,
          packedWidth: sizeZ
        };
        stackY += sizeY;
        return result;
      });
      return {
        extentX: maxX,
        extentY: stackY,
        extentZ: maxZ,
        packedItems
      };
    }
    /**
     * Fallback for oversized items - uses smart grid stacking
     */
    createFallbackResult(items, totalWeight, totalVolume, paddingPerSide) {
      const result = this.smartStackResult(items);
      const padding = paddingPerSide * 2;
      const box = {
        name: "Custom/Oversized",
        length: Math.ceil(result.extentX + padding),
        width: Math.ceil(result.extentZ + padding),
        height: Math.ceil(result.extentY + padding),
        box_weight: 1,
        max_weight: 1e3
      };
      const adjustedItems = result.packedItems.map((item) => ({
        ...item,
        x: item.x + paddingPerSide,
        y: item.y + paddingPerSide,
        z: item.z + paddingPerSide
      }));
      return {
        success: false,
        algorithm: "fallback",
        box,
        packedItems: adjustedItems,
        totalWeight: totalWeight + 1,
        itemsVolume: totalVolume
      };
    }
  };
  window.CartonizationService = CartonizationService;
})();
