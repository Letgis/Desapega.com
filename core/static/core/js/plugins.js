!(function (t, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = e(require("@popperjs/core")))
    : "function" == typeof define && define.amd
    ? define(["@popperjs/core"], e)
    : ((t =
        "undefined" != typeof globalThis ? globalThis : t || self).bootstrap =
        e(t.Popper));
})(this, function (t) {
  "use strict";
  function e(t) {
    if (t && t.__esModule) return t;
    var e = Object.create(null);
    return (
      t &&
        Object.keys(t).forEach(function (s) {
          if ("default" !== s) {
            var i = Object.getOwnPropertyDescriptor(t, s);
            Object.defineProperty(
              e,
              s,
              i.get
                ? i
                : {
                    enumerable: !0,
                    get: function () {
                      return t[s];
                    },
                  }
            );
          }
        }),
      (e.default = t),
      Object.freeze(e)
    );
  }
  var s = e(t);
  const i = {
      find: (t, e = document.documentElement) =>
        [].concat(...Element.prototype.querySelectorAll.call(e, t)),
      findOne: (t, e = document.documentElement) =>
        Element.prototype.querySelector.call(e, t),
      children: (t, e) => [].concat(...t.children).filter((t) => t.matches(e)),
      parents(t, e) {
        const s = [];
        let i = t.parentNode;
        for (; i && i.nodeType === Node.ELEMENT_NODE && 3 !== i.nodeType; )
          i.matches(e) && s.push(i), (i = i.parentNode);
        return s;
      },
      prev(t, e) {
        let s = t.previousElementSibling;
        for (; s; ) {
          if (s.matches(e)) return [s];
          s = s.previousElementSibling;
        }
        return [];
      },
      next(t, e) {
        let s = t.nextElementSibling;
        for (; s; ) {
          if (s.matches(e)) return [s];
          s = s.nextElementSibling;
        }
        return [];
      },
    },
    n = (t) => {
      do {
        t += Math.floor(1e6 * Math.random());
      } while (document.getElementById(t));
      return t;
    },
    o = (t) => {
      let e = t.getAttribute("data-bs-target");
      if (!e || "#" === e) {
        let s = t.getAttribute("href");
        if (!s || (!s.includes("#") && !s.startsWith("."))) return null;
        s.includes("#") && !s.startsWith("#") && (s = "#" + s.split("#")[1]),
          (e = s && "#" !== s ? s.trim() : null);
      }
      return e;
    },
    r = (t) => {
      const e = o(t);
      return e && document.querySelector(e) ? e : null;
    },
    a = (t) => {
      const e = o(t);
      return e ? document.querySelector(e) : null;
    },
    l = (t) => {
      t.dispatchEvent(new Event("transitionend"));
    },
    c = (t) =>
      !(!t || "object" != typeof t) &&
      (void 0 !== t.jquery && (t = t[0]), void 0 !== t.nodeType),
    h = (t) =>
      c(t)
        ? t.jquery
          ? t[0]
          : t
        : "string" == typeof t && t.length > 0
        ? i.findOne(t)
        : null,
    d = (t, e, s) => {
      Object.keys(s).forEach((i) => {
        const n = s[i],
          o = e[i],
          r =
            o && c(o)
              ? "element"
              : null == (a = o)
              ? "" + a
              : {}.toString
                  .call(a)
                  .match(/\s([a-z]+)/i)[1]
                  .toLowerCase();
        var a;
        if (!new RegExp(n).test(r))
          throw new TypeError(
            `${t.toUpperCase()}: Option "${i}" provided type "${r}" but expected type "${n}".`
          );
      });
    },
    u = (t) =>
      !(!c(t) || 0 === t.getClientRects().length) &&
      "visible" === getComputedStyle(t).getPropertyValue("visibility"),
    g = (t) =>
      !t ||
      t.nodeType !== Node.ELEMENT_NODE ||
      !!t.classList.contains("disabled") ||
      (void 0 !== t.disabled
        ? t.disabled
        : t.hasAttribute("disabled") && "false" !== t.getAttribute("disabled")),
    p = (t) => {
      if (!document.documentElement.attachShadow) return null;
      if ("function" == typeof t.getRootNode) {
        const e = t.getRootNode();
        return e instanceof ShadowRoot ? e : null;
      }
      return t instanceof ShadowRoot
        ? t
        : t.parentNode
        ? p(t.parentNode)
        : null;
    },
    f = () => {},
    m = (t) => t.offsetHeight,
    _ = () => {
      const { jQuery: t } = window;
      return t && !document.body.hasAttribute("data-bs-no-jquery") ? t : null;
    },
    b = [],
    v = () => "rtl" === document.documentElement.dir,
    y = (t) => {
      var e;
      (e = () => {
        const e = _();
        if (e) {
          const s = t.NAME,
            i = e.fn[s];
          (e.fn[s] = t.jQueryInterface),
            (e.fn[s].Constructor = t),
            (e.fn[s].noConflict = () => ((e.fn[s] = i), t.jQueryInterface));
        }
      }),
        "loading" === document.readyState
          ? (b.length ||
              document.addEventListener("DOMContentLoaded", () => {
                b.forEach((t) => t());
              }),
            b.push(e))
          : e();
    },
    w = (t) => {
      "function" == typeof t && t();
    },
    E = (t, e, s = !0) => {
      if (!s) return void w(t);
      const i =
        ((t) => {
          if (!t) return 0;
          let { transitionDuration: e, transitionDelay: s } =
            window.getComputedStyle(t);
          const i = Number.parseFloat(e),
            n = Number.parseFloat(s);
          return i || n
            ? ((e = e.split(",")[0]),
              (s = s.split(",")[0]),
              1e3 * (Number.parseFloat(e) + Number.parseFloat(s)))
            : 0;
        })(e) + 5;
      let n = !1;
      const o = ({ target: s }) => {
        s === e && ((n = !0), e.removeEventListener("transitionend", o), w(t));
      };
      e.addEventListener("transitionend", o),
        setTimeout(() => {
          n || l(e);
        }, i);
    },
    A = (t, e, s, i) => {
      let n = t.indexOf(e);
      if (-1 === n) return t[!s && i ? t.length - 1 : 0];
      const o = t.length;
      return (
        (n += s ? 1 : -1),
        i && (n = (n + o) % o),
        t[Math.max(0, Math.min(n, o - 1))]
      );
    },
    T = /[^.]*(?=\..*)\.|.*/,
    C = /\..*/,
    k = /::\d+$/,
    L = {};
  let O = 1;
  const D = { mouseenter: "mouseover", mouseleave: "mouseout" },
    I = /^(mouseenter|mouseleave)/i,
    N = new Set([
      "click",
      "dblclick",
      "mouseup",
      "mousedown",
      "contextmenu",
      "mousewheel",
      "DOMMouseScroll",
      "mouseover",
      "mouseout",
      "mousemove",
      "selectstart",
      "selectend",
      "keydown",
      "keypress",
      "keyup",
      "orientationchange",
      "touchstart",
      "touchmove",
      "touchend",
      "touchcancel",
      "pointerdown",
      "pointermove",
      "pointerup",
      "pointerleave",
      "pointercancel",
      "gesturestart",
      "gesturechange",
      "gestureend",
      "focus",
      "blur",
      "change",
      "reset",
      "select",
      "submit",
      "focusin",
      "focusout",
      "load",
      "unload",
      "beforeunload",
      "resize",
      "move",
      "DOMContentLoaded",
      "readystatechange",
      "error",
      "abort",
      "scroll",
    ]);
  function S(t, e) {
    return (e && `${e}::${O++}`) || t.uidEvent || O++;
  }
  function x(t) {
    const e = S(t);
    return (t.uidEvent = e), (L[e] = L[e] || {}), L[e];
  }
  function M(t, e, s = null) {
    const i = Object.keys(t);
    for (let n = 0, o = i.length; n < o; n++) {
      const o = t[i[n]];
      if (o.originalHandler === e && o.delegationSelector === s) return o;
    }
    return null;
  }
  function P(t, e, s) {
    const i = "string" == typeof e,
      n = i ? s : e;
    let o = R(t);
    return N.has(o) || (o = t), [i, n, o];
  }
  function j(t, e, s, i, n) {
    if ("string" != typeof e || !t) return;
    if ((s || ((s = i), (i = null)), I.test(e))) {
      const t = (t) =>
        function (e) {
          if (
            !e.relatedTarget ||
            (e.relatedTarget !== e.delegateTarget &&
              !e.delegateTarget.contains(e.relatedTarget))
          )
            return t.call(this, e);
        };
      i ? (i = t(i)) : (s = t(s));
    }
    const [o, r, a] = P(e, s, i),
      l = x(t),
      c = l[a] || (l[a] = {}),
      h = M(c, r, o ? s : null);
    if (h) return void (h.oneOff = h.oneOff && n);
    const d = S(r, e.replace(T, "")),
      u = o
        ? (function (t, e, s) {
            return function i(n) {
              const o = t.querySelectorAll(e);
              for (let { target: r } = n; r && r !== this; r = r.parentNode)
                for (let a = o.length; a--; )
                  if (o[a] === r)
                    return (
                      (n.delegateTarget = r),
                      i.oneOff && B.off(t, n.type, e, s),
                      s.apply(r, [n])
                    );
              return null;
            };
          })(t, s, i)
        : (function (t, e) {
            return function s(i) {
              return (
                (i.delegateTarget = t),
                s.oneOff && B.off(t, i.type, e),
                e.apply(t, [i])
              );
            };
          })(t, s);
    (u.delegationSelector = o ? s : null),
      (u.originalHandler = r),
      (u.oneOff = n),
      (u.uidEvent = d),
      (c[d] = u),
      t.addEventListener(a, u, o);
  }
  function H(t, e, s, i, n) {
    const o = M(e[s], i, n);
    o && (t.removeEventListener(s, o, Boolean(n)), delete e[s][o.uidEvent]);
  }
  function R(t) {
    return (t = t.replace(C, "")), D[t] || t;
  }
  const B = {
      on(t, e, s, i) {
        j(t, e, s, i, !1);
      },
      one(t, e, s, i) {
        j(t, e, s, i, !0);
      },
      off(t, e, s, i) {
        if ("string" != typeof e || !t) return;
        const [n, o, r] = P(e, s, i),
          a = r !== e,
          l = x(t),
          c = e.startsWith(".");
        if (void 0 !== o) {
          if (!l || !l[r]) return;
          return void H(t, l, r, o, n ? s : null);
        }
        c &&
          Object.keys(l).forEach((s) => {
            !(function (t, e, s, i) {
              const n = e[s] || {};
              Object.keys(n).forEach((o) => {
                if (o.includes(i)) {
                  const i = n[o];
                  H(t, e, s, i.originalHandler, i.delegationSelector);
                }
              });
            })(t, l, s, e.slice(1));
          });
        const h = l[r] || {};
        Object.keys(h).forEach((s) => {
          const i = s.replace(k, "");
          if (!a || e.includes(i)) {
            const e = h[s];
            H(t, l, r, e.originalHandler, e.delegationSelector);
          }
        });
      },
      trigger(t, e, s) {
        if ("string" != typeof e || !t) return null;
        const i = _(),
          n = R(e),
          o = e !== n,
          r = N.has(n);
        let a,
          l = !0,
          c = !0,
          h = !1,
          d = null;
        return (
          o &&
            i &&
            ((a = i.Event(e, s)),
            i(t).trigger(a),
            (l = !a.isPropagationStopped()),
            (c = !a.isImmediatePropagationStopped()),
            (h = a.isDefaultPrevented())),
          r
            ? ((d = document.createEvent("HTMLEvents")), d.initEvent(n, l, !0))
            : (d = new CustomEvent(e, { bubbles: l, cancelable: !0 })),
          void 0 !== s &&
            Object.keys(s).forEach((t) => {
              Object.defineProperty(d, t, { get: () => s[t] });
            }),
          h && d.preventDefault(),
          c && t.dispatchEvent(d),
          d.defaultPrevented && void 0 !== a && a.preventDefault(),
          d
        );
      },
    },
    $ = new Map();
  var W = {
    set(t, e, s) {
      $.has(t) || $.set(t, new Map());
      const i = $.get(t);
      i.has(e) || 0 === i.size
        ? i.set(e, s)
        : console.error(
            `Bootstrap doesn't allow more than one instance per element. Bound instance: ${
              Array.from(i.keys())[0]
            }.`
          );
    },
    get: (t, e) => ($.has(t) && $.get(t).get(e)) || null,
    remove(t, e) {
      if (!$.has(t)) return;
      const s = $.get(t);
      s.delete(e), 0 === s.size && $.delete(t);
    },
  };
  class q {
    constructor(t) {
      (t = h(t)) &&
        ((this._element = t),
        W.set(this._element, this.constructor.DATA_KEY, this));
    }
    dispose() {
      W.remove(this._element, this.constructor.DATA_KEY),
        B.off(this._element, this.constructor.EVENT_KEY),
        Object.getOwnPropertyNames(this).forEach((t) => {
          this[t] = null;
        });
    }
    _queueCallback(t, e, s = !0) {
      E(t, e, s);
    }
    static getInstance(t) {
      return W.get(t, this.DATA_KEY);
    }
    static getOrCreateInstance(t, e = {}) {
      return (
        this.getInstance(t) || new this(t, "object" == typeof e ? e : null)
      );
    }
    static get VERSION() {
      return "5.0.2";
    }
    static get NAME() {
      throw new Error(
        'You have to implement the static method "NAME", for each component!'
      );
    }
    static get DATA_KEY() {
      return "bs." + this.NAME;
    }
    static get EVENT_KEY() {
      return "." + this.DATA_KEY;
    }
  }
  class z extends q {
    static get NAME() {
      return "alert";
    }
    close(t) {
      const e = t ? this._getRootElement(t) : this._element,
        s = this._triggerCloseEvent(e);
      null === s || s.defaultPrevented || this._removeElement(e);
    }
    _getRootElement(t) {
      return a(t) || t.closest(".alert");
    }
    _triggerCloseEvent(t) {
      return B.trigger(t, "close.bs.alert");
    }
    _removeElement(t) {
      t.classList.remove("show");
      const e = t.classList.contains("fade");
      this._queueCallback(() => this._destroyElement(t), t, e);
    }
    _destroyElement(t) {
      t.remove(), B.trigger(t, "closed.bs.alert");
    }
    static jQueryInterface(t) {
      return this.each(function () {
        const e = z.getOrCreateInstance(this);
        "close" === t && e[t](this);
      });
    }
    static handleDismiss(t) {
      return function (e) {
        e && e.preventDefault(), t.close(this);
      };
    }
  }
  B.on(
    document,
    "click.bs.alert.data-api",
    '[data-bs-dismiss="alert"]',
    z.handleDismiss(new z())
  ),
    y(z);
  class F extends q {
    static get NAME() {
      return "button";
    }
    toggle() {
      this._element.setAttribute(
        "aria-pressed",
        this._element.classList.toggle("active")
      );
    }
    static jQueryInterface(t) {
      return this.each(function () {
        const e = F.getOrCreateInstance(this);
        "toggle" === t && e[t]();
      });
    }
  }
  function U(t) {
    return (
      "true" === t ||
      ("false" !== t &&
        (t === Number(t).toString()
          ? Number(t)
          : "" === t || "null" === t
          ? null
          : t))
    );
  }
  function K(t) {
    return t.replace(/[A-Z]/g, (t) => "-" + t.toLowerCase());
  }
  B.on(
    document,
    "click.bs.button.data-api",
    '[data-bs-toggle="button"]',
    (t) => {
      t.preventDefault();
      const e = t.target.closest('[data-bs-toggle="button"]');
      F.getOrCreateInstance(e).toggle();
    }
  ),
    y(F);
  const V = {
      setDataAttribute(t, e, s) {
        t.setAttribute("data-bs-" + K(e), s);
      },
      removeDataAttribute(t, e) {
        t.removeAttribute("data-bs-" + K(e));
      },
      getDataAttributes(t) {
        if (!t) return {};
        const e = {};
        return (
          Object.keys(t.dataset)
            .filter((t) => t.startsWith("bs"))
            .forEach((s) => {
              let i = s.replace(/^bs/, "");
              (i = i.charAt(0).toLowerCase() + i.slice(1, i.length)),
                (e[i] = U(t.dataset[s]));
            }),
          e
        );
      },
      getDataAttribute: (t, e) => U(t.getAttribute("data-bs-" + K(e))),
      offset(t) {
        const e = t.getBoundingClientRect();
        return {
          top: e.top + document.body.scrollTop,
          left: e.left + document.body.scrollLeft,
        };
      },
      position: (t) => ({ top: t.offsetTop, left: t.offsetLeft }),
    },
    Q = {
      interval: 5e3,
      keyboard: !0,
      slide: !1,
      pause: "hover",
      wrap: !0,
      touch: !0,
    },
    X = {
      interval: "(number|boolean)",
      keyboard: "boolean",
      slide: "(boolean|string)",
      pause: "(string|boolean)",
      wrap: "boolean",
      touch: "boolean",
    },
    Y = "next",
    G = "prev",
    Z = "left",
    J = "right",
    tt = { ArrowLeft: J, ArrowRight: Z };
  class et extends q {
    constructor(t, e) {
      super(t),
        (this._items = null),
        (this._interval = null),
        (this._activeElement = null),
        (this._isPaused = !1),
        (this._isSliding = !1),
        (this.touchTimeout = null),
        (this.touchStartX = 0),
        (this.touchDeltaX = 0),
        (this._config = this._getConfig(e)),
        (this._indicatorsElement = i.findOne(
          ".carousel-indicators",
          this._element
        )),
        (this._touchSupported =
          "ontouchstart" in document.documentElement ||
          navigator.maxTouchPoints > 0),
        (this._pointerEvent = Boolean(window.PointerEvent)),
        this._addEventListeners();
    }
    static get Default() {
      return Q;
    }
    static get NAME() {
      return "carousel";
    }
    next() {
      this._slide(Y);
    }
    nextWhenVisible() {
      !document.hidden && u(this._element) && this.next();
    }
    prev() {
      this._slide(G);
    }
    pause(t) {
      t || (this._isPaused = !0),
        i.findOne(".carousel-item-next, .carousel-item-prev", this._element) &&
          (l(this._element), this.cycle(!0)),
        clearInterval(this._interval),
        (this._interval = null);
    }
    cycle(t) {
      t || (this._isPaused = !1),
        this._interval &&
          (clearInterval(this._interval), (this._interval = null)),
        this._config &&
          this._config.interval &&
          !this._isPaused &&
          (this._updateInterval(),
          (this._interval = setInterval(
            (document.visibilityState ? this.nextWhenVisible : this.next).bind(
              this
            ),
            this._config.interval
          )));
    }
    to(t) {
      this._activeElement = i.findOne(".active.carousel-item", this._element);
      const e = this._getItemIndex(this._activeElement);
      if (t > this._items.length - 1 || t < 0) return;
      if (this._isSliding)
        return void B.one(this._element, "slid.bs.carousel", () => this.to(t));
      if (e === t) return this.pause(), void this.cycle();
      const s = t > e ? Y : G;
      this._slide(s, this._items[t]);
    }
    _getConfig(t) {
      return (
        (t = {
          ...Q,
          ...V.getDataAttributes(this._element),
          ...("object" == typeof t ? t : {}),
        }),
        d("carousel", t, X),
        t
      );
    }
    _handleSwipe() {
      const t = Math.abs(this.touchDeltaX);
      if (t <= 40) return;
      const e = t / this.touchDeltaX;
      (this.touchDeltaX = 0), e && this._slide(e > 0 ? J : Z);
    }
    _addEventListeners() {
      this._config.keyboard &&
        B.on(this._element, "keydown.bs.carousel", (t) => this._keydown(t)),
        "hover" === this._config.pause &&
          (B.on(this._element, "mouseenter.bs.carousel", (t) => this.pause(t)),
          B.on(this._element, "mouseleave.bs.carousel", (t) => this.cycle(t))),
        this._config.touch &&
          this._touchSupported &&
          this._addTouchEventListeners();
    }
    _addTouchEventListeners() {
      const t = (t) => {
          !this._pointerEvent ||
          ("pen" !== t.pointerType && "touch" !== t.pointerType)
            ? this._pointerEvent || (this.touchStartX = t.touches[0].clientX)
            : (this.touchStartX = t.clientX);
        },
        e = (t) => {
          this.touchDeltaX =
            t.touches && t.touches.length > 1
              ? 0
              : t.touches[0].clientX - this.touchStartX;
        },
        s = (t) => {
          !this._pointerEvent ||
            ("pen" !== t.pointerType && "touch" !== t.pointerType) ||
            (this.touchDeltaX = t.clientX - this.touchStartX),
            this._handleSwipe(),
            "hover" === this._config.pause &&
              (this.pause(),
              this.touchTimeout && clearTimeout(this.touchTimeout),
              (this.touchTimeout = setTimeout(
                (t) => this.cycle(t),
                500 + this._config.interval
              )));
        };
      i.find(".carousel-item img", this._element).forEach((t) => {
        B.on(t, "dragstart.bs.carousel", (t) => t.preventDefault());
      }),
        this._pointerEvent
          ? (B.on(this._element, "pointerdown.bs.carousel", (e) => t(e)),
            B.on(this._element, "pointerup.bs.carousel", (t) => s(t)),
            this._element.classList.add("pointer-event"))
          : (B.on(this._element, "touchstart.bs.carousel", (e) => t(e)),
            B.on(this._element, "touchmove.bs.carousel", (t) => e(t)),
            B.on(this._element, "touchend.bs.carousel", (t) => s(t)));
    }
    _keydown(t) {
      if (/input|textarea/i.test(t.target.tagName)) return;
      const e = tt[t.key];
      e && (t.preventDefault(), this._slide(e));
    }
    _getItemIndex(t) {
      return (
        (this._items =
          t && t.parentNode ? i.find(".carousel-item", t.parentNode) : []),
        this._items.indexOf(t)
      );
    }
    _getItemByOrder(t, e) {
      const s = t === Y;
      return A(this._items, e, s, this._config.wrap);
    }
    _triggerSlideEvent(t, e) {
      const s = this._getItemIndex(t),
        n = this._getItemIndex(
          i.findOne(".active.carousel-item", this._element)
        );
      return B.trigger(this._element, "slide.bs.carousel", {
        relatedTarget: t,
        direction: e,
        from: n,
        to: s,
      });
    }
    _setActiveIndicatorElement(t) {
      if (this._indicatorsElement) {
        const e = i.findOne(".active", this._indicatorsElement);
        e.classList.remove("active"), e.removeAttribute("aria-current");
        const s = i.find("[data-bs-target]", this._indicatorsElement);
        for (let e = 0; e < s.length; e++)
          if (
            Number.parseInt(s[e].getAttribute("data-bs-slide-to"), 10) ===
            this._getItemIndex(t)
          ) {
            s[e].classList.add("active"),
              s[e].setAttribute("aria-current", "true");
            break;
          }
      }
    }
    _updateInterval() {
      const t =
        this._activeElement ||
        i.findOne(".active.carousel-item", this._element);
      if (!t) return;
      const e = Number.parseInt(t.getAttribute("data-bs-interval"), 10);
      e
        ? ((this._config.defaultInterval =
            this._config.defaultInterval || this._config.interval),
          (this._config.interval = e))
        : (this._config.interval =
            this._config.defaultInterval || this._config.interval);
    }
    _slide(t, e) {
      const s = this._directionToOrder(t),
        n = i.findOne(".active.carousel-item", this._element),
        o = this._getItemIndex(n),
        r = e || this._getItemByOrder(s, n),
        a = this._getItemIndex(r),
        l = Boolean(this._interval),
        c = s === Y,
        h = c ? "carousel-item-start" : "carousel-item-end",
        d = c ? "carousel-item-next" : "carousel-item-prev",
        u = this._orderToDirection(s);
      if (r && r.classList.contains("active"))
        return void (this._isSliding = !1);
      if (this._isSliding) return;
      if (this._triggerSlideEvent(r, u).defaultPrevented) return;
      if (!n || !r) return;
      (this._isSliding = !0),
        l && this.pause(),
        this._setActiveIndicatorElement(r),
        (this._activeElement = r);
      const g = () => {
        B.trigger(this._element, "slid.bs.carousel", {
          relatedTarget: r,
          direction: u,
          from: o,
          to: a,
        });
      };
      if (this._element.classList.contains("slide")) {
        r.classList.add(d), m(r), n.classList.add(h), r.classList.add(h);
        const t = () => {
          r.classList.remove(h, d),
            r.classList.add("active"),
            n.classList.remove("active", d, h),
            (this._isSliding = !1),
            setTimeout(g, 0);
        };
        this._queueCallback(t, n, !0);
      } else n.classList.remove("active"), r.classList.add("active"), (this._isSliding = !1), g();
      l && this.cycle();
    }
    _directionToOrder(t) {
      return [J, Z].includes(t)
        ? v()
          ? t === Z
            ? G
            : Y
          : t === Z
          ? Y
          : G
        : t;
    }
    _orderToDirection(t) {
      return [Y, G].includes(t)
        ? v()
          ? t === G
            ? Z
            : J
          : t === G
          ? J
          : Z
        : t;
    }
    static carouselInterface(t, e) {
      const s = et.getOrCreateInstance(t, e);
      let { _config: i } = s;
      "object" == typeof e && (i = { ...i, ...e });
      const n = "string" == typeof e ? e : i.slide;
      if ("number" == typeof e) s.to(e);
      else if ("string" == typeof n) {
        if (void 0 === s[n]) throw new TypeError(`No method named "${n}"`);
        s[n]();
      } else i.interval && i.ride && (s.pause(), s.cycle());
    }
    static jQueryInterface(t) {
      return this.each(function () {
        et.carouselInterface(this, t);
      });
    }
    static dataApiClickHandler(t) {
      const e = a(this);
      if (!e || !e.classList.contains("carousel")) return;
      const s = { ...V.getDataAttributes(e), ...V.getDataAttributes(this) },
        i = this.getAttribute("data-bs-slide-to");
      i && (s.interval = !1),
        et.carouselInterface(e, s),
        i && et.getInstance(e).to(i),
        t.preventDefault();
    }
  }
  B.on(
    document,
    "click.bs.carousel.data-api",
    "[data-bs-slide], [data-bs-slide-to]",
    et.dataApiClickHandler
  ),
    B.on(window, "load.bs.carousel.data-api", () => {
      const t = i.find('[data-bs-ride="carousel"]');
      for (let e = 0, s = t.length; e < s; e++)
        et.carouselInterface(t[e], et.getInstance(t[e]));
    }),
    y(et);
  const st = { toggle: !0, parent: "" },
    it = { toggle: "boolean", parent: "(string|element)" };
  class nt extends q {
    constructor(t, e) {
      super(t),
        (this._isTransitioning = !1),
        (this._config = this._getConfig(e)),
        (this._triggerArray = i.find(
          `[data-bs-toggle="collapse"][href="#${this._element.id}"],[data-bs-toggle="collapse"][data-bs-target="#${this._element.id}"]`
        ));
      const s = i.find('[data-bs-toggle="collapse"]');
      for (let t = 0, e = s.length; t < e; t++) {
        const e = s[t],
          n = r(e),
          o = i.find(n).filter((t) => t === this._element);
        null !== n &&
          o.length &&
          ((this._selector = n), this._triggerArray.push(e));
      }
      (this._parent = this._config.parent ? this._getParent() : null),
        this._config.parent ||
          this._addAriaAndCollapsedClass(this._element, this._triggerArray),
        this._config.toggle && this.toggle();
    }
    static get Default() {
      return st;
    }
    static get NAME() {
      return "collapse";
    }
    toggle() {
      this._element.classList.contains("show") ? this.hide() : this.show();
    }
    show() {
      if (this._isTransitioning || this._element.classList.contains("show"))
        return;
      let t, e;
      this._parent &&
        ((t = i
          .find(".show, .collapsing", this._parent)
          .filter((t) =>
            "string" == typeof this._config.parent
              ? t.getAttribute("data-bs-parent") === this._config.parent
              : t.classList.contains("collapse")
          )),
        0 === t.length && (t = null));
      const s = i.findOne(this._selector);
      if (t) {
        const i = t.find((t) => s !== t);
        if (((e = i ? nt.getInstance(i) : null), e && e._isTransitioning))
          return;
      }
      if (B.trigger(this._element, "show.bs.collapse").defaultPrevented) return;
      t &&
        t.forEach((t) => {
          s !== t && nt.collapseInterface(t, "hide"),
            e || W.set(t, "bs.collapse", null);
        });
      const n = this._getDimension();
      this._element.classList.remove("collapse"),
        this._element.classList.add("collapsing"),
        (this._element.style[n] = 0),
        this._triggerArray.length &&
          this._triggerArray.forEach((t) => {
            t.classList.remove("collapsed"),
              t.setAttribute("aria-expanded", !0);
          }),
        this.setTransitioning(!0);
      const o = "scroll" + (n[0].toUpperCase() + n.slice(1));
      this._queueCallback(
        () => {
          this._element.classList.remove("collapsing"),
            this._element.classList.add("collapse", "show"),
            (this._element.style[n] = ""),
            this.setTransitioning(!1),
            B.trigger(this._element, "shown.bs.collapse");
        },
        this._element,
        !0
      ),
        (this._element.style[n] = this._element[o] + "px");
    }
    hide() {
      if (this._isTransitioning || !this._element.classList.contains("show"))
        return;
      if (B.trigger(this._element, "hide.bs.collapse").defaultPrevented) return;
      const t = this._getDimension();
      (this._element.style[t] =
        this._element.getBoundingClientRect()[t] + "px"),
        m(this._element),
        this._element.classList.add("collapsing"),
        this._element.classList.remove("collapse", "show");
      const e = this._triggerArray.length;
      if (e > 0)
        for (let t = 0; t < e; t++) {
          const e = this._triggerArray[t],
            s = a(e);
          s &&
            !s.classList.contains("show") &&
            (e.classList.add("collapsed"), e.setAttribute("aria-expanded", !1));
        }
      this.setTransitioning(!0),
        (this._element.style[t] = ""),
        this._queueCallback(
          () => {
            this.setTransitioning(!1),
              this._element.classList.remove("collapsing"),
              this._element.classList.add("collapse"),
              B.trigger(this._element, "hidden.bs.collapse");
          },
          this._element,
          !0
        );
    }
    setTransitioning(t) {
      this._isTransitioning = t;
    }
    _getConfig(t) {
      return (
        ((t = { ...st, ...t }).toggle = Boolean(t.toggle)),
        d("collapse", t, it),
        t
      );
    }
    _getDimension() {
      return this._element.classList.contains("width") ? "width" : "height";
    }
    _getParent() {
      let { parent: t } = this._config;
      t = h(t);
      const e = `[data-bs-toggle="collapse"][data-bs-parent="${t}"]`;
      return (
        i.find(e, t).forEach((t) => {
          const e = a(t);
          this._addAriaAndCollapsedClass(e, [t]);
        }),
        t
      );
    }
    _addAriaAndCollapsedClass(t, e) {
      if (!t || !e.length) return;
      const s = t.classList.contains("show");
      e.forEach((t) => {
        s ? t.classList.remove("collapsed") : t.classList.add("collapsed"),
          t.setAttribute("aria-expanded", s);
      });
    }
    static collapseInterface(t, e) {
      let s = nt.getInstance(t);
      const i = {
        ...st,
        ...V.getDataAttributes(t),
        ...("object" == typeof e && e ? e : {}),
      };
      if (
        (!s &&
          i.toggle &&
          "string" == typeof e &&
          /show|hide/.test(e) &&
          (i.toggle = !1),
        s || (s = new nt(t, i)),
        "string" == typeof e)
      ) {
        if (void 0 === s[e]) throw new TypeError(`No method named "${e}"`);
        s[e]();
      }
    }
    static jQueryInterface(t) {
      return this.each(function () {
        nt.collapseInterface(this, t);
      });
    }
  }
  B.on(
    document,
    "click.bs.collapse.data-api",
    '[data-bs-toggle="collapse"]',
    function (t) {
      ("A" === t.target.tagName ||
        (t.delegateTarget && "A" === t.delegateTarget.tagName)) &&
        t.preventDefault();
      const e = V.getDataAttributes(this),
        s = r(this);
      i.find(s).forEach((t) => {
        const s = nt.getInstance(t);
        let i;
        s
          ? (null === s._parent &&
              "string" == typeof e.parent &&
              ((s._config.parent = e.parent), (s._parent = s._getParent())),
            (i = "toggle"))
          : (i = e),
          nt.collapseInterface(t, i);
      });
    }
  ),
    y(nt);
  const ot = new RegExp("ArrowUp|ArrowDown|Escape"),
    rt = v() ? "top-end" : "top-start",
    at = v() ? "top-start" : "top-end",
    lt = v() ? "bottom-end" : "bottom-start",
    ct = v() ? "bottom-start" : "bottom-end",
    ht = v() ? "left-start" : "right-start",
    dt = v() ? "right-start" : "left-start",
    ut = {
      offset: [0, 2],
      boundary: "clippingParents",
      reference: "toggle",
      display: "dynamic",
      popperConfig: null,
      autoClose: !0,
    },
    gt = {
      offset: "(array|string|function)",
      boundary: "(string|element)",
      reference: "(string|element|object)",
      display: "string",
      popperConfig: "(null|object|function)",
      autoClose: "(boolean|string)",
    };
  class pt extends q {
    constructor(t, e) {
      super(t),
        (this._popper = null),
        (this._config = this._getConfig(e)),
        (this._menu = this._getMenuElement()),
        (this._inNavbar = this._detectNavbar()),
        this._addEventListeners();
    }
    static get Default() {
      return ut;
    }
    static get DefaultType() {
      return gt;
    }
    static get NAME() {
      return "dropdown";
    }
    toggle() {
      g(this._element) ||
        (this._element.classList.contains("show") ? this.hide() : this.show());
    }
    show() {
      if (g(this._element) || this._menu.classList.contains("show")) return;
      const t = pt.getParentFromElement(this._element),
        e = { relatedTarget: this._element };
      if (!B.trigger(this._element, "show.bs.dropdown", e).defaultPrevented) {
        if (this._inNavbar) V.setDataAttribute(this._menu, "popper", "none");
        else {
          if (void 0 === s)
            throw new TypeError(
              "Bootstrap's dropdowns require Popper (https://popper.js.org)"
            );
          let e = this._element;
          "parent" === this._config.reference
            ? (e = t)
            : c(this._config.reference)
            ? (e = h(this._config.reference))
            : "object" == typeof this._config.reference &&
              (e = this._config.reference);
          const i = this._getPopperConfig(),
            n = i.modifiers.find(
              (t) => "applyStyles" === t.name && !1 === t.enabled
            );
          (this._popper = s.createPopper(e, this._menu, i)),
            n && V.setDataAttribute(this._menu, "popper", "static");
        }
        "ontouchstart" in document.documentElement &&
          !t.closest(".navbar-nav") &&
          []
            .concat(...document.body.children)
            .forEach((t) => B.on(t, "mouseover", f)),
          this._element.focus(),
          this._element.setAttribute("aria-expanded", !0),
          this._menu.classList.toggle("show"),
          this._element.classList.toggle("show"),
          B.trigger(this._element, "shown.bs.dropdown", e);
      }
    }
    hide() {
      if (g(this._element) || !this._menu.classList.contains("show")) return;
      const t = { relatedTarget: this._element };
      this._completeHide(t);
    }
    dispose() {
      this._popper && this._popper.destroy(), super.dispose();
    }
    update() {
      (this._inNavbar = this._detectNavbar()),
        this._popper && this._popper.update();
    }
    _addEventListeners() {
      B.on(this._element, "click.bs.dropdown", (t) => {
        t.preventDefault(), this.toggle();
      });
    }
    _completeHide(t) {
      B.trigger(this._element, "hide.bs.dropdown", t).defaultPrevented ||
        ("ontouchstart" in document.documentElement &&
          []
            .concat(...document.body.children)
            .forEach((t) => B.off(t, "mouseover", f)),
        this._popper && this._popper.destroy(),
        this._menu.classList.remove("show"),
        this._element.classList.remove("show"),
        this._element.setAttribute("aria-expanded", "false"),
        V.removeDataAttribute(this._menu, "popper"),
        B.trigger(this._element, "hidden.bs.dropdown", t));
    }
    _getConfig(t) {
      if (
        ((t = {
          ...this.constructor.Default,
          ...V.getDataAttributes(this._element),
          ...t,
        }),
        d("dropdown", t, this.constructor.DefaultType),
        "object" == typeof t.reference &&
          !c(t.reference) &&
          "function" != typeof t.reference.getBoundingClientRect)
      )
        throw new TypeError(
          "dropdown".toUpperCase() +
            ': Option "reference" provided type "object" without a required "getBoundingClientRect" method.'
        );
      return t;
    }
    _getMenuElement() {
      return i.next(this._element, ".dropdown-menu")[0];
    }
    _getPlacement() {
      const t = this._element.parentNode;
      if (t.classList.contains("dropend")) return ht;
      if (t.classList.contains("dropstart")) return dt;
      const e =
        "end" ===
        getComputedStyle(this._menu).getPropertyValue("--bs-position").trim();
      return t.classList.contains("dropup") ? (e ? at : rt) : e ? ct : lt;
    }
    _detectNavbar() {
      return null !== this._element.closest(".navbar");
    }
    _getOffset() {
      const { offset: t } = this._config;
      return "string" == typeof t
        ? t.split(",").map((t) => Number.parseInt(t, 10))
        : "function" == typeof t
        ? (e) => t(e, this._element)
        : t;
    }
    _getPopperConfig() {
      const t = {
        placement: this._getPlacement(),
        modifiers: [
          {
            name: "preventOverflow",
            options: { boundary: this._config.boundary },
          },
          { name: "offset", options: { offset: this._getOffset() } },
        ],
      };
      return (
        "static" === this._config.display &&
          (t.modifiers = [{ name: "applyStyles", enabled: !1 }]),
        {
          ...t,
          ...("function" == typeof this._config.popperConfig
            ? this._config.popperConfig(t)
            : this._config.popperConfig),
        }
      );
    }
    _selectMenuItem({ key: t, target: e }) {
      const s = i
        .find(
          ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",
          this._menu
        )
        .filter(u);
      s.length && A(s, e, "ArrowDown" === t, !s.includes(e)).focus();
    }
    static dropdownInterface(t, e) {
      const s = pt.getOrCreateInstance(t, e);
      if ("string" == typeof e) {
        if (void 0 === s[e]) throw new TypeError(`No method named "${e}"`);
        s[e]();
      }
    }
    static jQueryInterface(t) {
      return this.each(function () {
        pt.dropdownInterface(this, t);
      });
    }
    static clearMenus(t) {
      if (t && (2 === t.button || ("keyup" === t.type && "Tab" !== t.key)))
        return;
      const e = i.find('[data-bs-toggle="dropdown"]');
      for (let s = 0, i = e.length; s < i; s++) {
        const i = pt.getInstance(e[s]);
        if (!i || !1 === i._config.autoClose) continue;
        if (!i._element.classList.contains("show")) continue;
        const n = { relatedTarget: i._element };
        if (t) {
          const e = t.composedPath(),
            s = e.includes(i._menu);
          if (
            e.includes(i._element) ||
            ("inside" === i._config.autoClose && !s) ||
            ("outside" === i._config.autoClose && s)
          )
            continue;
          if (
            i._menu.contains(t.target) &&
            (("keyup" === t.type && "Tab" === t.key) ||
              /input|select|option|textarea|form/i.test(t.target.tagName))
          )
            continue;
          "click" === t.type && (n.clickEvent = t);
        }
        i._completeHide(n);
      }
    }
    static getParentFromElement(t) {
      return a(t) || t.parentNode;
    }
    static dataApiKeydownHandler(t) {
      if (
        /input|textarea/i.test(t.target.tagName)
          ? "Space" === t.key ||
            ("Escape" !== t.key &&
              (("ArrowDown" !== t.key && "ArrowUp" !== t.key) ||
                t.target.closest(".dropdown-menu")))
          : !ot.test(t.key)
      )
        return;
      const e = this.classList.contains("show");
      if (!e && "Escape" === t.key) return;
      if ((t.preventDefault(), t.stopPropagation(), g(this))) return;
      const s = () =>
        this.matches('[data-bs-toggle="dropdown"]')
          ? this
          : i.prev(this, '[data-bs-toggle="dropdown"]')[0];
      return "Escape" === t.key
        ? (s().focus(), void pt.clearMenus())
        : "ArrowUp" === t.key || "ArrowDown" === t.key
        ? (e || s().click(), void pt.getInstance(s())._selectMenuItem(t))
        : void ((e && "Space" !== t.key) || pt.clearMenus());
    }
  }
  B.on(
    document,
    "keydown.bs.dropdown.data-api",
    '[data-bs-toggle="dropdown"]',
    pt.dataApiKeydownHandler
  ),
    B.on(
      document,
      "keydown.bs.dropdown.data-api",
      ".dropdown-menu",
      pt.dataApiKeydownHandler
    ),
    B.on(document, "click.bs.dropdown.data-api", pt.clearMenus),
    B.on(document, "keyup.bs.dropdown.data-api", pt.clearMenus),
    B.on(
      document,
      "click.bs.dropdown.data-api",
      '[data-bs-toggle="dropdown"]',
      function (t) {
        t.preventDefault(), pt.dropdownInterface(this);
      }
    ),
    y(pt);
  class ft {
    constructor() {
      this._element = document.body;
    }
    getWidth() {
      const t = document.documentElement.clientWidth;
      return Math.abs(window.innerWidth - t);
    }
    hide() {
      const t = this.getWidth();
      this._disableOverFlow(),
        this._setElementAttributes(this._element, "paddingRight", (e) => e + t),
        this._setElementAttributes(
          ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
          "paddingRight",
          (e) => e + t
        ),
        this._setElementAttributes(".sticky-top", "marginRight", (e) => e - t);
    }
    _disableOverFlow() {
      this._saveInitialAttribute(this._element, "overflow"),
        (this._element.style.overflow = "hidden");
    }
    _setElementAttributes(t, e, s) {
      const i = this.getWidth();
      this._applyManipulationCallback(t, (t) => {
        if (t !== this._element && window.innerWidth > t.clientWidth + i)
          return;
        this._saveInitialAttribute(t, e);
        const n = window.getComputedStyle(t)[e];
        t.style[e] = s(Number.parseFloat(n)) + "px";
      });
    }
    reset() {
      this._resetElementAttributes(this._element, "overflow"),
        this._resetElementAttributes(this._element, "paddingRight"),
        this._resetElementAttributes(
          ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
          "paddingRight"
        ),
        this._resetElementAttributes(".sticky-top", "marginRight");
    }
    _saveInitialAttribute(t, e) {
      const s = t.style[e];
      s && V.setDataAttribute(t, e, s);
    }
    _resetElementAttributes(t, e) {
      this._applyManipulationCallback(t, (t) => {
        const s = V.getDataAttribute(t, e);
        void 0 === s
          ? t.style.removeProperty(e)
          : (V.removeDataAttribute(t, e), (t.style[e] = s));
      });
    }
    _applyManipulationCallback(t, e) {
      c(t) ? e(t) : i.find(t, this._element).forEach(e);
    }
    isOverflowing() {
      return this.getWidth() > 0;
    }
  }
  const mt = {
      isVisible: !0,
      isAnimated: !1,
      rootElement: "body",
      clickCallback: null,
    },
    _t = {
      isVisible: "boolean",
      isAnimated: "boolean",
      rootElement: "(element|string)",
      clickCallback: "(function|null)",
    };
  class bt {
    constructor(t) {
      (this._config = this._getConfig(t)),
        (this._isAppended = !1),
        (this._element = null);
    }
    show(t) {
      this._config.isVisible
        ? (this._append(),
          this._config.isAnimated && m(this._getElement()),
          this._getElement().classList.add("show"),
          this._emulateAnimation(() => {
            w(t);
          }))
        : w(t);
    }
    hide(t) {
      this._config.isVisible
        ? (this._getElement().classList.remove("show"),
          this._emulateAnimation(() => {
            this.dispose(), w(t);
          }))
        : w(t);
    }
    _getElement() {
      if (!this._element) {
        const t = document.createElement("div");
        (t.className = "modal-backdrop"),
          this._config.isAnimated && t.classList.add("fade"),
          (this._element = t);
      }
      return this._element;
    }
    _getConfig(t) {
      return (
        ((t = { ...mt, ...("object" == typeof t ? t : {}) }).rootElement = h(
          t.rootElement
        )),
        d("backdrop", t, _t),
        t
      );
    }
    _append() {
      this._isAppended ||
        (this._config.rootElement.appendChild(this._getElement()),
        B.on(this._getElement(), "mousedown.bs.backdrop", () => {
          w(this._config.clickCallback);
        }),
        (this._isAppended = !0));
    }
    dispose() {
      this._isAppended &&
        (B.off(this._element, "mousedown.bs.backdrop"),
        this._element.remove(),
        (this._isAppended = !1));
    }
    _emulateAnimation(t) {
      E(t, this._getElement(), this._config.isAnimated);
    }
  }
  const vt = { backdrop: !0, keyboard: !0, focus: !0 },
    yt = {
      backdrop: "(boolean|string)",
      keyboard: "boolean",
      focus: "boolean",
    };
  class wt extends q {
    constructor(t, e) {
      super(t),
        (this._config = this._getConfig(e)),
        (this._dialog = i.findOne(".modal-dialog", this._element)),
        (this._backdrop = this._initializeBackDrop()),
        (this._isShown = !1),
        (this._ignoreBackdropClick = !1),
        (this._isTransitioning = !1),
        (this._scrollBar = new ft());
    }
    static get Default() {
      return vt;
    }
    static get NAME() {
      return "modal";
    }
    toggle(t) {
      return this._isShown ? this.hide() : this.show(t);
    }
    show(t) {
      this._isShown ||
        this._isTransitioning ||
        B.trigger(this._element, "show.bs.modal", { relatedTarget: t })
          .defaultPrevented ||
        ((this._isShown = !0),
        this._isAnimated() && (this._isTransitioning = !0),
        this._scrollBar.hide(),
        document.body.classList.add("modal-open"),
        this._adjustDialog(),
        this._setEscapeEvent(),
        this._setResizeEvent(),
        B.on(
          this._element,
          "click.dismiss.bs.modal",
          '[data-bs-dismiss="modal"]',
          (t) => this.hide(t)
        ),
        B.on(this._dialog, "mousedown.dismiss.bs.modal", () => {
          B.one(this._element, "mouseup.dismiss.bs.modal", (t) => {
            t.target === this._element && (this._ignoreBackdropClick = !0);
          });
        }),
        this._showBackdrop(() => this._showElement(t)));
    }
    hide(t) {
      if (
        (t && ["A", "AREA"].includes(t.target.tagName) && t.preventDefault(),
        !this._isShown || this._isTransitioning)
      )
        return;
      if (B.trigger(this._element, "hide.bs.modal").defaultPrevented) return;
      this._isShown = !1;
      const e = this._isAnimated();
      e && (this._isTransitioning = !0),
        this._setEscapeEvent(),
        this._setResizeEvent(),
        B.off(document, "focusin.bs.modal"),
        this._element.classList.remove("show"),
        B.off(this._element, "click.dismiss.bs.modal"),
        B.off(this._dialog, "mousedown.dismiss.bs.modal"),
        this._queueCallback(() => this._hideModal(), this._element, e);
    }
    dispose() {
      [window, this._dialog].forEach((t) => B.off(t, ".bs.modal")),
        this._backdrop.dispose(),
        super.dispose(),
        B.off(document, "focusin.bs.modal");
    }
    handleUpdate() {
      this._adjustDialog();
    }
    _initializeBackDrop() {
      return new bt({
        isVisible: Boolean(this._config.backdrop),
        isAnimated: this._isAnimated(),
      });
    }
    _getConfig(t) {
      return (
        (t = {
          ...vt,
          ...V.getDataAttributes(this._element),
          ...("object" == typeof t ? t : {}),
        }),
        d("modal", t, yt),
        t
      );
    }
    _showElement(t) {
      const e = this._isAnimated(),
        s = i.findOne(".modal-body", this._dialog);
      (this._element.parentNode &&
        this._element.parentNode.nodeType === Node.ELEMENT_NODE) ||
        document.body.appendChild(this._element),
        (this._element.style.display = "block"),
        this._element.removeAttribute("aria-hidden"),
        this._element.setAttribute("aria-modal", !0),
        this._element.setAttribute("role", "dialog"),
        (this._element.scrollTop = 0),
        s && (s.scrollTop = 0),
        e && m(this._element),
        this._element.classList.add("show"),
        this._config.focus && this._enforceFocus(),
        this._queueCallback(
          () => {
            this._config.focus && this._element.focus(),
              (this._isTransitioning = !1),
              B.trigger(this._element, "shown.bs.modal", { relatedTarget: t });
          },
          this._dialog,
          e
        );
    }
    _enforceFocus() {
      B.off(document, "focusin.bs.modal"),
        B.on(document, "focusin.bs.modal", (t) => {
          document === t.target ||
            this._element === t.target ||
            this._element.contains(t.target) ||
            this._element.focus();
        });
    }
    _setEscapeEvent() {
      this._isShown
        ? B.on(this._element, "keydown.dismiss.bs.modal", (t) => {
            this._config.keyboard && "Escape" === t.key
              ? (t.preventDefault(), this.hide())
              : this._config.keyboard ||
                "Escape" !== t.key ||
                this._triggerBackdropTransition();
          })
        : B.off(this._element, "keydown.dismiss.bs.modal");
    }
    _setResizeEvent() {
      this._isShown
        ? B.on(window, "resize.bs.modal", () => this._adjustDialog())
        : B.off(window, "resize.bs.modal");
    }
    _hideModal() {
      (this._element.style.display = "none"),
        this._element.setAttribute("aria-hidden", !0),
        this._element.removeAttribute("aria-modal"),
        this._element.removeAttribute("role"),
        (this._isTransitioning = !1),
        this._backdrop.hide(() => {
          document.body.classList.remove("modal-open"),
            this._resetAdjustments(),
            this._scrollBar.reset(),
            B.trigger(this._element, "hidden.bs.modal");
        });
    }
    _showBackdrop(t) {
      B.on(this._element, "click.dismiss.bs.modal", (t) => {
        this._ignoreBackdropClick
          ? (this._ignoreBackdropClick = !1)
          : t.target === t.currentTarget &&
            (!0 === this._config.backdrop
              ? this.hide()
              : "static" === this._config.backdrop &&
                this._triggerBackdropTransition());
      }),
        this._backdrop.show(t);
    }
    _isAnimated() {
      return this._element.classList.contains("fade");
    }
    _triggerBackdropTransition() {
      if (B.trigger(this._element, "hidePrevented.bs.modal").defaultPrevented)
        return;
      const { classList: t, scrollHeight: e, style: s } = this._element,
        i = e > document.documentElement.clientHeight;
      (!i && "hidden" === s.overflowY) ||
        t.contains("modal-static") ||
        (i || (s.overflowY = "hidden"),
        t.add("modal-static"),
        this._queueCallback(() => {
          t.remove("modal-static"),
            i ||
              this._queueCallback(() => {
                s.overflowY = "";
              }, this._dialog);
        }, this._dialog),
        this._element.focus());
    }
    _adjustDialog() {
      const t =
          this._element.scrollHeight > document.documentElement.clientHeight,
        e = this._scrollBar.getWidth(),
        s = e > 0;
      ((!s && t && !v()) || (s && !t && v())) &&
        (this._element.style.paddingLeft = e + "px"),
        ((s && !t && !v()) || (!s && t && v())) &&
          (this._element.style.paddingRight = e + "px");
    }
    _resetAdjustments() {
      (this._element.style.paddingLeft = ""),
        (this._element.style.paddingRight = "");
    }
    static jQueryInterface(t, e) {
      return this.each(function () {
        const s = wt.getOrCreateInstance(this, t);
        if ("string" == typeof t) {
          if (void 0 === s[t]) throw new TypeError(`No method named "${t}"`);
          s[t](e);
        }
      });
    }
  }
  B.on(
    document,
    "click.bs.modal.data-api",
    '[data-bs-toggle="modal"]',
    function (t) {
      const e = a(this);
      ["A", "AREA"].includes(this.tagName) && t.preventDefault(),
        B.one(e, "show.bs.modal", (t) => {
          t.defaultPrevented ||
            B.one(e, "hidden.bs.modal", () => {
              u(this) && this.focus();
            });
        }),
        wt.getOrCreateInstance(e).toggle(this);
    }
  ),
    y(wt);
  const Et = { backdrop: !0, keyboard: !0, scroll: !1 },
    At = { backdrop: "boolean", keyboard: "boolean", scroll: "boolean" };
  class Tt extends q {
    constructor(t, e) {
      super(t),
        (this._config = this._getConfig(e)),
        (this._isShown = !1),
        (this._backdrop = this._initializeBackDrop()),
        this._addEventListeners();
    }
    static get NAME() {
      return "offcanvas";
    }
    static get Default() {
      return Et;
    }
    toggle(t) {
      return this._isShown ? this.hide() : this.show(t);
    }
    show(t) {
      this._isShown ||
        B.trigger(this._element, "show.bs.offcanvas", { relatedTarget: t })
          .defaultPrevented ||
        ((this._isShown = !0),
        (this._element.style.visibility = "visible"),
        this._backdrop.show(),
        this._config.scroll ||
          (new ft().hide(), this._enforceFocusOnElement(this._element)),
        this._element.removeAttribute("aria-hidden"),
        this._element.setAttribute("aria-modal", !0),
        this._element.setAttribute("role", "dialog"),
        this._element.classList.add("show"),
        this._queueCallback(
          () => {
            B.trigger(this._element, "shown.bs.offcanvas", {
              relatedTarget: t,
            });
          },
          this._element,
          !0
        ));
    }
    hide() {
      this._isShown &&
        (B.trigger(this._element, "hide.bs.offcanvas").defaultPrevented ||
          (B.off(document, "focusin.bs.offcanvas"),
          this._element.blur(),
          (this._isShown = !1),
          this._element.classList.remove("show"),
          this._backdrop.hide(),
          this._queueCallback(
            () => {
              this._element.setAttribute("aria-hidden", !0),
                this._element.removeAttribute("aria-modal"),
                this._element.removeAttribute("role"),
                (this._element.style.visibility = "hidden"),
                this._config.scroll || new ft().reset(),
                B.trigger(this._element, "hidden.bs.offcanvas");
            },
            this._element,
            !0
          )));
    }
    dispose() {
      this._backdrop.dispose(),
        super.dispose(),
        B.off(document, "focusin.bs.offcanvas");
    }
    _getConfig(t) {
      return (
        (t = {
          ...Et,
          ...V.getDataAttributes(this._element),
          ...("object" == typeof t ? t : {}),
        }),
        d("offcanvas", t, At),
        t
      );
    }
    _initializeBackDrop() {
      return new bt({
        isVisible: this._config.backdrop,
        isAnimated: !0,
        rootElement: this._element.parentNode,
        clickCallback: () => this.hide(),
      });
    }
    _enforceFocusOnElement(t) {
      B.off(document, "focusin.bs.offcanvas"),
        B.on(document, "focusin.bs.offcanvas", (e) => {
          document === e.target ||
            t === e.target ||
            t.contains(e.target) ||
            t.focus();
        }),
        t.focus();
    }
    _addEventListeners() {
      B.on(
        this._element,
        "click.dismiss.bs.offcanvas",
        '[data-bs-dismiss="offcanvas"]',
        () => this.hide()
      ),
        B.on(this._element, "keydown.dismiss.bs.offcanvas", (t) => {
          this._config.keyboard && "Escape" === t.key && this.hide();
        });
    }
    static jQueryInterface(t) {
      return this.each(function () {
        const e = Tt.getOrCreateInstance(this, t);
        if ("string" == typeof t) {
          if (void 0 === e[t] || t.startsWith("_") || "constructor" === t)
            throw new TypeError(`No method named "${t}"`);
          e[t](this);
        }
      });
    }
  }
  B.on(
    document,
    "click.bs.offcanvas.data-api",
    '[data-bs-toggle="offcanvas"]',
    function (t) {
      const e = a(this);
      if ((["A", "AREA"].includes(this.tagName) && t.preventDefault(), g(this)))
        return;
      B.one(e, "hidden.bs.offcanvas", () => {
        u(this) && this.focus();
      });
      const s = i.findOne(".offcanvas.show");
      s && s !== e && Tt.getInstance(s).hide(),
        Tt.getOrCreateInstance(e).toggle(this);
    }
  ),
    B.on(window, "load.bs.offcanvas.data-api", () =>
      i.find(".offcanvas.show").forEach((t) => Tt.getOrCreateInstance(t).show())
    ),
    y(Tt);
  const Ct = new Set([
      "background",
      "cite",
      "href",
      "itemtype",
      "longdesc",
      "poster",
      "src",
      "xlink:href",
    ]),
    kt = /^(?:(?:https?|mailto|ftp|tel|file):|[^#&/:?]*(?:[#/?]|$))/i,
    Lt =
      /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i,
    Ot = (t, e) => {
      const s = t.nodeName.toLowerCase();
      if (e.includes(s))
        return (
          !Ct.has(s) || Boolean(kt.test(t.nodeValue) || Lt.test(t.nodeValue))
        );
      const i = e.filter((t) => t instanceof RegExp);
      for (let t = 0, e = i.length; t < e; t++) if (i[t].test(s)) return !0;
      return !1;
    };
  function Dt(t, e, s) {
    if (!t.length) return t;
    if (s && "function" == typeof s) return s(t);
    const i = new window.DOMParser().parseFromString(t, "text/html"),
      n = Object.keys(e),
      o = [].concat(...i.body.querySelectorAll("*"));
    for (let t = 0, s = o.length; t < s; t++) {
      const s = o[t],
        i = s.nodeName.toLowerCase();
      if (!n.includes(i)) {
        s.remove();
        continue;
      }
      const r = [].concat(...s.attributes),
        a = [].concat(e["*"] || [], e[i] || []);
      r.forEach((t) => {
        Ot(t, a) || s.removeAttribute(t.nodeName);
      });
    }
    return i.body.innerHTML;
  }
  const It = new RegExp("(^|\\s)bs-tooltip\\S+", "g"),
    Nt = new Set(["sanitize", "allowList", "sanitizeFn"]),
    St = {
      animation: "boolean",
      template: "string",
      title: "(string|element|function)",
      trigger: "string",
      delay: "(number|object)",
      html: "boolean",
      selector: "(string|boolean)",
      placement: "(string|function)",
      offset: "(array|string|function)",
      container: "(string|element|boolean)",
      fallbackPlacements: "array",
      boundary: "(string|element)",
      customClass: "(string|function)",
      sanitize: "boolean",
      sanitizeFn: "(null|function)",
      allowList: "object",
      popperConfig: "(null|object|function)",
    },
    xt = {
      AUTO: "auto",
      TOP: "top",
      RIGHT: v() ? "left" : "right",
      BOTTOM: "bottom",
      LEFT: v() ? "right" : "left",
    },
    Mt = {
      animation: !0,
      template:
        '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
      trigger: "hover focus",
      title: "",
      delay: 0,
      html: !1,
      selector: !1,
      placement: "top",
      offset: [0, 0],
      container: !1,
      fallbackPlacements: ["top", "right", "bottom", "left"],
      boundary: "clippingParents",
      customClass: "",
      sanitize: !0,
      sanitizeFn: null,
      allowList: {
        "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
        a: ["target", "href", "title", "rel"],
        area: [],
        b: [],
        br: [],
        col: [],
        code: [],
        div: [],
        em: [],
        hr: [],
        h1: [],
        h2: [],
        h3: [],
        h4: [],
        h5: [],
        h6: [],
        i: [],
        img: ["src", "srcset", "alt", "title", "width", "height"],
        li: [],
        ol: [],
        p: [],
        pre: [],
        s: [],
        small: [],
        span: [],
        sub: [],
        sup: [],
        strong: [],
        u: [],
        ul: [],
      },
      popperConfig: null,
    },
    Pt = {
      HIDE: "hide.bs.tooltip",
      HIDDEN: "hidden.bs.tooltip",
      SHOW: "show.bs.tooltip",
      SHOWN: "shown.bs.tooltip",
      INSERTED: "inserted.bs.tooltip",
      CLICK: "click.bs.tooltip",
      FOCUSIN: "focusin.bs.tooltip",
      FOCUSOUT: "focusout.bs.tooltip",
      MOUSEENTER: "mouseenter.bs.tooltip",
      MOUSELEAVE: "mouseleave.bs.tooltip",
    };
  class jt extends q {
    constructor(t, e) {
      if (void 0 === s)
        throw new TypeError(
          "Bootstrap's tooltips require Popper (https://popper.js.org)"
        );
      super(t),
        (this._isEnabled = !0),
        (this._timeout = 0),
        (this._hoverState = ""),
        (this._activeTrigger = {}),
        (this._popper = null),
        (this._config = this._getConfig(e)),
        (this.tip = null),
        this._setListeners();
    }
    static get Default() {
      return Mt;
    }
    static get NAME() {
      return "tooltip";
    }
    static get Event() {
      return Pt;
    }
    static get DefaultType() {
      return St;
    }
    enable() {
      this._isEnabled = !0;
    }
    disable() {
      this._isEnabled = !1;
    }
    toggleEnabled() {
      this._isEnabled = !this._isEnabled;
    }
    toggle(t) {
      if (this._isEnabled)
        if (t) {
          const e = this._initializeOnDelegatedTarget(t);
          (e._activeTrigger.click = !e._activeTrigger.click),
            e._isWithActiveTrigger() ? e._enter(null, e) : e._leave(null, e);
        } else {
          if (this.getTipElement().classList.contains("show"))
            return void this._leave(null, this);
          this._enter(null, this);
        }
    }
    dispose() {
      clearTimeout(this._timeout),
        B.off(
          this._element.closest(".modal"),
          "hide.bs.modal",
          this._hideModalHandler
        ),
        this.tip && this.tip.remove(),
        this._popper && this._popper.destroy(),
        super.dispose();
    }
    show() {
      if ("none" === this._element.style.display)
        throw new Error("Please use show on visible elements");
      if (!this.isWithContent() || !this._isEnabled) return;
      const t = B.trigger(this._element, this.constructor.Event.SHOW),
        e = p(this._element),
        i =
          null === e
            ? this._element.ownerDocument.documentElement.contains(
                this._element
              )
            : e.contains(this._element);
      if (t.defaultPrevented || !i) return;
      const o = this.getTipElement(),
        r = n(this.constructor.NAME);
      o.setAttribute("id", r),
        this._element.setAttribute("aria-describedby", r),
        this.setContent(),
        this._config.animation && o.classList.add("fade");
      const a =
          "function" == typeof this._config.placement
            ? this._config.placement.call(this, o, this._element)
            : this._config.placement,
        l = this._getAttachment(a);
      this._addAttachmentClass(l);
      const { container: c } = this._config;
      W.set(o, this.constructor.DATA_KEY, this),
        this._element.ownerDocument.documentElement.contains(this.tip) ||
          (c.appendChild(o),
          B.trigger(this._element, this.constructor.Event.INSERTED)),
        this._popper
          ? this._popper.update()
          : (this._popper = s.createPopper(
              this._element,
              o,
              this._getPopperConfig(l)
            )),
        o.classList.add("show");
      const h =
        "function" == typeof this._config.customClass
          ? this._config.customClass()
          : this._config.customClass;
      h && o.classList.add(...h.split(" ")),
        "ontouchstart" in document.documentElement &&
          [].concat(...document.body.children).forEach((t) => {
            B.on(t, "mouseover", f);
          });
      const d = this.tip.classList.contains("fade");
      this._queueCallback(
        () => {
          const t = this._hoverState;
          (this._hoverState = null),
            B.trigger(this._element, this.constructor.Event.SHOWN),
            "out" === t && this._leave(null, this);
        },
        this.tip,
        d
      );
    }
    hide() {
      if (!this._popper) return;
      const t = this.getTipElement();
      if (
        B.trigger(this._element, this.constructor.Event.HIDE).defaultPrevented
      )
        return;
      t.classList.remove("show"),
        "ontouchstart" in document.documentElement &&
          []
            .concat(...document.body.children)
            .forEach((t) => B.off(t, "mouseover", f)),
        (this._activeTrigger.click = !1),
        (this._activeTrigger.focus = !1),
        (this._activeTrigger.hover = !1);
      const e = this.tip.classList.contains("fade");
      this._queueCallback(
        () => {
          this._isWithActiveTrigger() ||
            ("show" !== this._hoverState && t.remove(),
            this._cleanTipClass(),
            this._element.removeAttribute("aria-describedby"),
            B.trigger(this._element, this.constructor.Event.HIDDEN),
            this._popper && (this._popper.destroy(), (this._popper = null)));
        },
        this.tip,
        e
      ),
        (this._hoverState = "");
    }
    update() {
      null !== this._popper && this._popper.update();
    }
    isWithContent() {
      return Boolean(this.getTitle());
    }
    getTipElement() {
      if (this.tip) return this.tip;
      const t = document.createElement("div");
      return (
        (t.innerHTML = this._config.template),
        (this.tip = t.children[0]),
        this.tip
      );
    }
    setContent() {
      const t = this.getTipElement();
      this.setElementContent(i.findOne(".tooltip-inner", t), this.getTitle()),
        t.classList.remove("fade", "show");
    }
    setElementContent(t, e) {
      if (null !== t)
        return c(e)
          ? ((e = h(e)),
            void (this._config.html
              ? e.parentNode !== t && ((t.innerHTML = ""), t.appendChild(e))
              : (t.textContent = e.textContent)))
          : void (this._config.html
              ? (this._config.sanitize &&
                  (e = Dt(e, this._config.allowList, this._config.sanitizeFn)),
                (t.innerHTML = e))
              : (t.textContent = e));
    }
    getTitle() {
      let t = this._element.getAttribute("data-bs-original-title");
      return (
        t ||
          (t =
            "function" == typeof this._config.title
              ? this._config.title.call(this._element)
              : this._config.title),
        t
      );
    }
    updateAttachment(t) {
      return "right" === t ? "end" : "left" === t ? "start" : t;
    }
    _initializeOnDelegatedTarget(t, e) {
      const s = this.constructor.DATA_KEY;
      return (
        (e = e || W.get(t.delegateTarget, s)) ||
          ((e = new this.constructor(
            t.delegateTarget,
            this._getDelegateConfig()
          )),
          W.set(t.delegateTarget, s, e)),
        e
      );
    }
    _getOffset() {
      const { offset: t } = this._config;
      return "string" == typeof t
        ? t.split(",").map((t) => Number.parseInt(t, 10))
        : "function" == typeof t
        ? (e) => t(e, this._element)
        : t;
    }
    _getPopperConfig(t) {
      const e = {
        placement: t,
        modifiers: [
          {
            name: "flip",
            options: { fallbackPlacements: this._config.fallbackPlacements },
          },
          { name: "offset", options: { offset: this._getOffset() } },
          {
            name: "preventOverflow",
            options: { boundary: this._config.boundary },
          },
          {
            name: "arrow",
            options: { element: `.${this.constructor.NAME}-arrow` },
          },
          {
            name: "onChange",
            enabled: !0,
            phase: "afterWrite",
            fn: (t) => this._handlePopperPlacementChange(t),
          },
        ],
        onFirstUpdate: (t) => {
          t.options.placement !== t.placement &&
            this._handlePopperPlacementChange(t);
        },
      };
      return {
        ...e,
        ...("function" == typeof this._config.popperConfig
          ? this._config.popperConfig(e)
          : this._config.popperConfig),
      };
    }
    _addAttachmentClass(t) {
      this.getTipElement().classList.add(
        "bs-tooltip-" + this.updateAttachment(t)
      );
    }
    _getAttachment(t) {
      return xt[t.toUpperCase()];
    }
    _setListeners() {
      this._config.trigger.split(" ").forEach((t) => {
        if ("click" === t)
          B.on(
            this._element,
            this.constructor.Event.CLICK,
            this._config.selector,
            (t) => this.toggle(t)
          );
        else if ("manual" !== t) {
          const e =
              "hover" === t
                ? this.constructor.Event.MOUSEENTER
                : this.constructor.Event.FOCUSIN,
            s =
              "hover" === t
                ? this.constructor.Event.MOUSELEAVE
                : this.constructor.Event.FOCUSOUT;
          B.on(this._element, e, this._config.selector, (t) => this._enter(t)),
            B.on(this._element, s, this._config.selector, (t) =>
              this._leave(t)
            );
        }
      }),
        (this._hideModalHandler = () => {
          this._element && this.hide();
        }),
        B.on(
          this._element.closest(".modal"),
          "hide.bs.modal",
          this._hideModalHandler
        ),
        this._config.selector
          ? (this._config = {
              ...this._config,
              trigger: "manual",
              selector: "",
            })
          : this._fixTitle();
    }
    _fixTitle() {
      const t = this._element.getAttribute("title"),
        e = typeof this._element.getAttribute("data-bs-original-title");
      (t || "string" !== e) &&
        (this._element.setAttribute("data-bs-original-title", t || ""),
        !t ||
          this._element.getAttribute("aria-label") ||
          this._element.textContent ||
          this._element.setAttribute("aria-label", t),
        this._element.setAttribute("title", ""));
    }
    _enter(t, e) {
      (e = this._initializeOnDelegatedTarget(t, e)),
        t && (e._activeTrigger["focusin" === t.type ? "focus" : "hover"] = !0),
        e.getTipElement().classList.contains("show") || "show" === e._hoverState
          ? (e._hoverState = "show")
          : (clearTimeout(e._timeout),
            (e._hoverState = "show"),
            e._config.delay && e._config.delay.show
              ? (e._timeout = setTimeout(() => {
                  "show" === e._hoverState && e.show();
                }, e._config.delay.show))
              : e.show());
    }
    _leave(t, e) {
      (e = this._initializeOnDelegatedTarget(t, e)),
        t &&
          (e._activeTrigger["focusout" === t.type ? "focus" : "hover"] =
            e._element.contains(t.relatedTarget)),
        e._isWithActiveTrigger() ||
          (clearTimeout(e._timeout),
          (e._hoverState = "out"),
          e._config.delay && e._config.delay.hide
            ? (e._timeout = setTimeout(() => {
                "out" === e._hoverState && e.hide();
              }, e._config.delay.hide))
            : e.hide());
    }
    _isWithActiveTrigger() {
      for (const t in this._activeTrigger)
        if (this._activeTrigger[t]) return !0;
      return !1;
    }
    _getConfig(t) {
      const e = V.getDataAttributes(this._element);
      return (
        Object.keys(e).forEach((t) => {
          Nt.has(t) && delete e[t];
        }),
        ((t = {
          ...this.constructor.Default,
          ...e,
          ...("object" == typeof t && t ? t : {}),
        }).container = !1 === t.container ? document.body : h(t.container)),
        "number" == typeof t.delay &&
          (t.delay = { show: t.delay, hide: t.delay }),
        "number" == typeof t.title && (t.title = t.title.toString()),
        "number" == typeof t.content && (t.content = t.content.toString()),
        d("tooltip", t, this.constructor.DefaultType),
        t.sanitize && (t.template = Dt(t.template, t.allowList, t.sanitizeFn)),
        t
      );
    }
    _getDelegateConfig() {
      const t = {};
      if (this._config)
        for (const e in this._config)
          this.constructor.Default[e] !== this._config[e] &&
            (t[e] = this._config[e]);
      return t;
    }
    _cleanTipClass() {
      const t = this.getTipElement(),
        e = t.getAttribute("class").match(It);
      null !== e &&
        e.length > 0 &&
        e.map((t) => t.trim()).forEach((e) => t.classList.remove(e));
    }
    _handlePopperPlacementChange(t) {
      const { state: e } = t;
      e &&
        ((this.tip = e.elements.popper),
        this._cleanTipClass(),
        this._addAttachmentClass(this._getAttachment(e.placement)));
    }
    static jQueryInterface(t) {
      return this.each(function () {
        const e = jt.getOrCreateInstance(this, t);
        if ("string" == typeof t) {
          if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
          e[t]();
        }
      });
    }
  }
  y(jt);
  const Ht = new RegExp("(^|\\s)bs-popover\\S+", "g"),
    Rt = {
      ...jt.Default,
      placement: "right",
      offset: [0, 8],
      trigger: "click",
      content: "",
      template:
        '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
    },
    Bt = { ...jt.DefaultType, content: "(string|element|function)" },
    $t = {
      HIDE: "hide.bs.popover",
      HIDDEN: "hidden.bs.popover",
      SHOW: "show.bs.popover",
      SHOWN: "shown.bs.popover",
      INSERTED: "inserted.bs.popover",
      CLICK: "click.bs.popover",
      FOCUSIN: "focusin.bs.popover",
      FOCUSOUT: "focusout.bs.popover",
      MOUSEENTER: "mouseenter.bs.popover",
      MOUSELEAVE: "mouseleave.bs.popover",
    };
  class Wt extends jt {
    static get Default() {
      return Rt;
    }
    static get NAME() {
      return "popover";
    }
    static get Event() {
      return $t;
    }
    static get DefaultType() {
      return Bt;
    }
    isWithContent() {
      return this.getTitle() || this._getContent();
    }
    getTipElement() {
      return (
        this.tip ||
          ((this.tip = super.getTipElement()),
          this.getTitle() || i.findOne(".popover-header", this.tip).remove(),
          this._getContent() || i.findOne(".popover-body", this.tip).remove()),
        this.tip
      );
    }
    setContent() {
      const t = this.getTipElement();
      this.setElementContent(i.findOne(".popover-header", t), this.getTitle());
      let e = this._getContent();
      "function" == typeof e && (e = e.call(this._element)),
        this.setElementContent(i.findOne(".popover-body", t), e),
        t.classList.remove("fade", "show");
    }
    _addAttachmentClass(t) {
      this.getTipElement().classList.add(
        "bs-popover-" + this.updateAttachment(t)
      );
    }
    _getContent() {
      return (
        this._element.getAttribute("data-bs-content") || this._config.content
      );
    }
    _cleanTipClass() {
      const t = this.getTipElement(),
        e = t.getAttribute("class").match(Ht);
      null !== e &&
        e.length > 0 &&
        e.map((t) => t.trim()).forEach((e) => t.classList.remove(e));
    }
    static jQueryInterface(t) {
      return this.each(function () {
        const e = Wt.getOrCreateInstance(this, t);
        if ("string" == typeof t) {
          if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
          e[t]();
        }
      });
    }
  }
  y(Wt);
  const qt = { offset: 10, method: "auto", target: "" },
    zt = { offset: "number", method: "string", target: "(string|element)" };
  class Ft extends q {
    constructor(t, e) {
      super(t),
        (this._scrollElement =
          "BODY" === this._element.tagName ? window : this._element),
        (this._config = this._getConfig(e)),
        (this._selector = `${this._config.target} .nav-link, ${this._config.target} .list-group-item, ${this._config.target} .dropdown-item`),
        (this._offsets = []),
        (this._targets = []),
        (this._activeTarget = null),
        (this._scrollHeight = 0),
        B.on(this._scrollElement, "scroll.bs.scrollspy", () => this._process()),
        this.refresh(),
        this._process();
    }
    static get Default() {
      return qt;
    }
    static get NAME() {
      return "scrollspy";
    }
    refresh() {
      const t =
          this._scrollElement === this._scrollElement.window
            ? "offset"
            : "position",
        e = "auto" === this._config.method ? t : this._config.method,
        s = "position" === e ? this._getScrollTop() : 0;
      (this._offsets = []),
        (this._targets = []),
        (this._scrollHeight = this._getScrollHeight()),
        i
          .find(this._selector)
          .map((t) => {
            const n = r(t),
              o = n ? i.findOne(n) : null;
            if (o) {
              const t = o.getBoundingClientRect();
              if (t.width || t.height) return [V[e](o).top + s, n];
            }
            return null;
          })
          .filter((t) => t)
          .sort((t, e) => t[0] - e[0])
          .forEach((t) => {
            this._offsets.push(t[0]), this._targets.push(t[1]);
          });
    }
    dispose() {
      B.off(this._scrollElement, ".bs.scrollspy"), super.dispose();
    }
    _getConfig(t) {
      if (
        "string" !=
          typeof (t = {
            ...qt,
            ...V.getDataAttributes(this._element),
            ...("object" == typeof t && t ? t : {}),
          }).target &&
        c(t.target)
      ) {
        let { id: e } = t.target;
        e || ((e = n("scrollspy")), (t.target.id = e)), (t.target = "#" + e);
      }
      return d("scrollspy", t, zt), t;
    }
    _getScrollTop() {
      return this._scrollElement === window
        ? this._scrollElement.pageYOffset
        : this._scrollElement.scrollTop;
    }
    _getScrollHeight() {
      return (
        this._scrollElement.scrollHeight ||
        Math.max(
          document.body.scrollHeight,
          document.documentElement.scrollHeight
        )
      );
    }
    _getOffsetHeight() {
      return this._scrollElement === window
        ? window.innerHeight
        : this._scrollElement.getBoundingClientRect().height;
    }
    _process() {
      const t = this._getScrollTop() + this._config.offset,
        e = this._getScrollHeight(),
        s = this._config.offset + e - this._getOffsetHeight();
      if ((this._scrollHeight !== e && this.refresh(), t >= s)) {
        const t = this._targets[this._targets.length - 1];
        this._activeTarget !== t && this._activate(t);
      } else {
        if (this._activeTarget && t < this._offsets[0] && this._offsets[0] > 0)
          return (this._activeTarget = null), void this._clear();
        for (let e = this._offsets.length; e--; )
          this._activeTarget !== this._targets[e] &&
            t >= this._offsets[e] &&
            (void 0 === this._offsets[e + 1] || t < this._offsets[e + 1]) &&
            this._activate(this._targets[e]);
      }
    }
    _activate(t) {
      (this._activeTarget = t), this._clear();
      const e = this._selector
          .split(",")
          .map((e) => `${e}[data-bs-target="${t}"],${e}[href="${t}"]`),
        s = i.findOne(e.join(","));
      s.classList.contains("dropdown-item")
        ? (i
            .findOne(".dropdown-toggle", s.closest(".dropdown"))
            .classList.add("active"),
          s.classList.add("active"))
        : (s.classList.add("active"),
          i.parents(s, ".nav, .list-group").forEach((t) => {
            i
              .prev(t, ".nav-link, .list-group-item")
              .forEach((t) => t.classList.add("active")),
              i.prev(t, ".nav-item").forEach((t) => {
                i.children(t, ".nav-link").forEach((t) =>
                  t.classList.add("active")
                );
              });
          })),
        B.trigger(this._scrollElement, "activate.bs.scrollspy", {
          relatedTarget: t,
        });
    }
    _clear() {
      i.find(this._selector)
        .filter((t) => t.classList.contains("active"))
        .forEach((t) => t.classList.remove("active"));
    }
    static jQueryInterface(t) {
      return this.each(function () {
        const e = Ft.getOrCreateInstance(this, t);
        if ("string" == typeof t) {
          if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
          e[t]();
        }
      });
    }
  }
  B.on(window, "load.bs.scrollspy.data-api", () => {
    i.find('[data-bs-spy="scroll"]').forEach((t) => new Ft(t));
  }),
    y(Ft);
  class Ut extends q {
    static get NAME() {
      return "tab";
    }
    show() {
      if (
        this._element.parentNode &&
        this._element.parentNode.nodeType === Node.ELEMENT_NODE &&
        this._element.classList.contains("active")
      )
        return;
      let t;
      const e = a(this._element),
        s = this._element.closest(".nav, .list-group");
      if (s) {
        const e =
          "UL" === s.nodeName || "OL" === s.nodeName
            ? ":scope > li > .active"
            : ".active";
        (t = i.find(e, s)), (t = t[t.length - 1]);
      }
      const n = t
        ? B.trigger(t, "hide.bs.tab", { relatedTarget: this._element })
        : null;
      if (
        B.trigger(this._element, "show.bs.tab", { relatedTarget: t })
          .defaultPrevented ||
        (null !== n && n.defaultPrevented)
      )
        return;
      this._activate(this._element, s);
      const o = () => {
        B.trigger(t, "hidden.bs.tab", { relatedTarget: this._element }),
          B.trigger(this._element, "shown.bs.tab", { relatedTarget: t });
      };
      e ? this._activate(e, e.parentNode, o) : o();
    }
    _activate(t, e, s) {
      const n = (
          !e || ("UL" !== e.nodeName && "OL" !== e.nodeName)
            ? i.children(e, ".active")
            : i.find(":scope > li > .active", e)
        )[0],
        o = s && n && n.classList.contains("fade"),
        r = () => this._transitionComplete(t, n, s);
      n && o
        ? (n.classList.remove("show"), this._queueCallback(r, t, !0))
        : r();
    }
    _transitionComplete(t, e, s) {
      if (e) {
        e.classList.remove("active");
        const t = i.findOne(":scope > .dropdown-menu .active", e.parentNode);
        t && t.classList.remove("active"),
          "tab" === e.getAttribute("role") &&
            e.setAttribute("aria-selected", !1);
      }
      t.classList.add("active"),
        "tab" === t.getAttribute("role") && t.setAttribute("aria-selected", !0),
        m(t),
        t.classList.contains("fade") && t.classList.add("show");
      let n = t.parentNode;
      if (
        (n && "LI" === n.nodeName && (n = n.parentNode),
        n && n.classList.contains("dropdown-menu"))
      ) {
        const e = t.closest(".dropdown");
        e &&
          i
            .find(".dropdown-toggle", e)
            .forEach((t) => t.classList.add("active")),
          t.setAttribute("aria-expanded", !0);
      }
      s && s();
    }
    static jQueryInterface(t) {
      return this.each(function () {
        const e = Ut.getOrCreateInstance(this);
        if ("string" == typeof t) {
          if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
          e[t]();
        }
      });
    }
  }
  B.on(
    document,
    "click.bs.tab.data-api",
    '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]',
    function (t) {
      ["A", "AREA"].includes(this.tagName) && t.preventDefault(),
        g(this) || Ut.getOrCreateInstance(this).show();
    }
  ),
    y(Ut);
  const Kt = { animation: "boolean", autohide: "boolean", delay: "number" },
    Vt = { animation: !0, autohide: !0, delay: 5e3 };
  class Qt extends q {
    constructor(t, e) {
      super(t),
        (this._config = this._getConfig(e)),
        (this._timeout = null),
        (this._hasMouseInteraction = !1),
        (this._hasKeyboardInteraction = !1),
        this._setListeners();
    }
    static get DefaultType() {
      return Kt;
    }
    static get Default() {
      return Vt;
    }
    static get NAME() {
      return "toast";
    }
    show() {
      B.trigger(this._element, "show.bs.toast").defaultPrevented ||
        (this._clearTimeout(),
        this._config.animation && this._element.classList.add("fade"),
        this._element.classList.remove("hide"),
        m(this._element),
        this._element.classList.add("showing"),
        this._queueCallback(
          () => {
            this._element.classList.remove("showing"),
              this._element.classList.add("show"),
              B.trigger(this._element, "shown.bs.toast"),
              this._maybeScheduleHide();
          },
          this._element,
          this._config.animation
        ));
    }
    hide() {
      this._element.classList.contains("show") &&
        (B.trigger(this._element, "hide.bs.toast").defaultPrevented ||
          (this._element.classList.remove("show"),
          this._queueCallback(
            () => {
              this._element.classList.add("hide"),
                B.trigger(this._element, "hidden.bs.toast");
            },
            this._element,
            this._config.animation
          )));
    }
    dispose() {
      this._clearTimeout(),
        this._element.classList.contains("show") &&
          this._element.classList.remove("show"),
        super.dispose();
    }
    _getConfig(t) {
      return (
        (t = {
          ...Vt,
          ...V.getDataAttributes(this._element),
          ...("object" == typeof t && t ? t : {}),
        }),
        d("toast", t, this.constructor.DefaultType),
        t
      );
    }
    _maybeScheduleHide() {
      this._config.autohide &&
        (this._hasMouseInteraction ||
          this._hasKeyboardInteraction ||
          (this._timeout = setTimeout(() => {
            this.hide();
          }, this._config.delay)));
    }
    _onInteraction(t, e) {
      switch (t.type) {
        case "mouseover":
        case "mouseout":
          this._hasMouseInteraction = e;
          break;
        case "focusin":
        case "focusout":
          this._hasKeyboardInteraction = e;
      }
      if (e) return void this._clearTimeout();
      const s = t.relatedTarget;
      this._element === s ||
        this._element.contains(s) ||
        this._maybeScheduleHide();
    }
    _setListeners() {
      B.on(
        this._element,
        "click.dismiss.bs.toast",
        '[data-bs-dismiss="toast"]',
        () => this.hide()
      ),
        B.on(this._element, "mouseover.bs.toast", (t) =>
          this._onInteraction(t, !0)
        ),
        B.on(this._element, "mouseout.bs.toast", (t) =>
          this._onInteraction(t, !1)
        ),
        B.on(this._element, "focusin.bs.toast", (t) =>
          this._onInteraction(t, !0)
        ),
        B.on(this._element, "focusout.bs.toast", (t) =>
          this._onInteraction(t, !1)
        );
    }
    _clearTimeout() {
      clearTimeout(this._timeout), (this._timeout = null);
    }
    static jQueryInterface(t) {
      return this.each(function () {
        const e = Qt.getOrCreateInstance(this, t);
        if ("string" == typeof t) {
          if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
          e[t](this);
        }
      });
    }
  }
  return (
    y(Qt),
    {
      Alert: z,
      Button: F,
      Carousel: et,
      Collapse: nt,
      Dropdown: pt,
      Modal: wt,
      Offcanvas: Tt,
      Popover: Wt,
      ScrollSpy: Ft,
      Tab: Ut,
      Toast: Qt,
      Tooltip: jt,
    }
  );
});

/* AOS - Animate On Scroll Library */
!(function (e, t) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define([], t)
    : "object" == typeof exports
    ? (exports.AOS = t())
    : (e.AOS = t());
})(this, function () {
  return (function (e) {
    function t(o) {
      if (n[o]) return n[o].exports;
      var i = (n[o] = { exports: {}, id: o, loaded: !1 });
      return e[o].call(i.exports, i, i.exports, t), (i.loaded = !0), i.exports;
    }
    var n = {};
    return (t.m = e), (t.c = n), (t.p = "dist/"), t(0);
  })([
    function (e, t, n) {
      "use strict";
      function o(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var i =
          Object.assign ||
          function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var n = arguments[t];
              for (var o in n)
                Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
            }
            return e;
          },
        r = n(1),
        a = (o(r), n(6)),
        u = o(a),
        c = n(7),
        f = o(c),
        s = n(8),
        d = o(s),
        l = n(9),
        p = o(l),
        m = n(10),
        b = o(m),
        v = n(11),
        y = o(v),
        g = n(14),
        h = o(g),
        w = [],
        k = !1,
        x = {
          offset: 120,
          delay: 0,
          easing: "ease",
          duration: 400,
          disable: !1,
          once: !1,
          startEvent: "DOMContentLoaded",
          throttleDelay: 99,
          debounceDelay: 50,
          disableMutationObserver: !1,
        },
        j = function () {
          var e =
            arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
          if ((e && (k = !0), k))
            return (w = (0, y.default)(w, x)), (0, b.default)(w, x.once), w;
        },
        O = function () {
          (w = (0, h.default)()), j();
        },
        _ = function () {
          w.forEach(function (e, t) {
            e.node.removeAttribute("data-aos"),
              e.node.removeAttribute("data-aos-easing"),
              e.node.removeAttribute("data-aos-duration"),
              e.node.removeAttribute("data-aos-delay");
          });
        },
        S = function (e) {
          return (
            e === !0 ||
            ("mobile" === e && p.default.mobile()) ||
            ("phone" === e && p.default.phone()) ||
            ("tablet" === e && p.default.tablet()) ||
            ("function" == typeof e && e() === !0)
          );
        },
        z = function (e) {
          (x = i(x, e)), (w = (0, h.default)());
          var t = document.all && !window.atob;
          return S(x.disable) || t
            ? _()
            : (document
                .querySelector("body")
                .setAttribute("data-aos-easing", x.easing),
              document
                .querySelector("body")
                .setAttribute("data-aos-duration", x.duration),
              document
                .querySelector("body")
                .setAttribute("data-aos-delay", x.delay),
              "DOMContentLoaded" === x.startEvent &&
              ["complete", "interactive"].indexOf(document.readyState) > -1
                ? j(!0)
                : "load" === x.startEvent
                ? window.addEventListener(x.startEvent, function () {
                    j(!0);
                  })
                : document.addEventListener(x.startEvent, function () {
                    j(!0);
                  }),
              window.addEventListener(
                "resize",
                (0, f.default)(j, x.debounceDelay, !0)
              ),
              window.addEventListener(
                "orientationchange",
                (0, f.default)(j, x.debounceDelay, !0)
              ),
              window.addEventListener(
                "scroll",
                (0, u.default)(function () {
                  (0, b.default)(w, x.once);
                }, x.throttleDelay)
              ),
              x.disableMutationObserver || (0, d.default)("[data-aos]", O),
              w);
        };
      e.exports = { init: z, refresh: j, refreshHard: O };
    },
    function (e, t) {},
    ,
    ,
    ,
    ,
    function (e, t) {
      (function (t) {
        "use strict";
        function n(e, t, n) {
          function o(t) {
            var n = b,
              o = v;
            return (b = v = void 0), (k = t), (g = e.apply(o, n));
          }
          function r(e) {
            return (k = e), (h = setTimeout(s, t)), _ ? o(e) : g;
          }
          function a(e) {
            var n = e - w,
              o = e - k,
              i = t - n;
            return S ? j(i, y - o) : i;
          }
          function c(e) {
            var n = e - w,
              o = e - k;
            return void 0 === w || n >= t || n < 0 || (S && o >= y);
          }
          function s() {
            var e = O();
            return c(e) ? d(e) : void (h = setTimeout(s, a(e)));
          }
          function d(e) {
            return (h = void 0), z && b ? o(e) : ((b = v = void 0), g);
          }
          function l() {
            void 0 !== h && clearTimeout(h), (k = 0), (b = w = v = h = void 0);
          }
          function p() {
            return void 0 === h ? g : d(O());
          }
          function m() {
            var e = O(),
              n = c(e);
            if (((b = arguments), (v = this), (w = e), n)) {
              if (void 0 === h) return r(w);
              if (S) return (h = setTimeout(s, t)), o(w);
            }
            return void 0 === h && (h = setTimeout(s, t)), g;
          }
          var b,
            v,
            y,
            g,
            h,
            w,
            k = 0,
            _ = !1,
            S = !1,
            z = !0;
          if ("function" != typeof e) throw new TypeError(f);
          return (
            (t = u(t) || 0),
            i(n) &&
              ((_ = !!n.leading),
              (S = "maxWait" in n),
              (y = S ? x(u(n.maxWait) || 0, t) : y),
              (z = "trailing" in n ? !!n.trailing : z)),
            (m.cancel = l),
            (m.flush = p),
            m
          );
        }
        function o(e, t, o) {
          var r = !0,
            a = !0;
          if ("function" != typeof e) throw new TypeError(f);
          return (
            i(o) &&
              ((r = "leading" in o ? !!o.leading : r),
              (a = "trailing" in o ? !!o.trailing : a)),
            n(e, t, { leading: r, maxWait: t, trailing: a })
          );
        }
        function i(e) {
          var t = "undefined" == typeof e ? "undefined" : c(e);
          return !!e && ("object" == t || "function" == t);
        }
        function r(e) {
          return (
            !!e && "object" == ("undefined" == typeof e ? "undefined" : c(e))
          );
        }
        function a(e) {
          return (
            "symbol" == ("undefined" == typeof e ? "undefined" : c(e)) ||
            (r(e) && k.call(e) == d)
          );
        }
        function u(e) {
          if ("number" == typeof e) return e;
          if (a(e)) return s;
          if (i(e)) {
            var t = "function" == typeof e.valueOf ? e.valueOf() : e;
            e = i(t) ? t + "" : t;
          }
          if ("string" != typeof e) return 0 === e ? e : +e;
          e = e.replace(l, "");
          var n = m.test(e);
          return n || b.test(e) ? v(e.slice(2), n ? 2 : 8) : p.test(e) ? s : +e;
        }
        var c =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    "function" == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? "symbol"
                    : typeof e;
                },
          f = "Expected a function",
          s = NaN,
          d = "[object Symbol]",
          l = /^\s+|\s+$/g,
          p = /^[-+]0x[0-9a-f]+$/i,
          m = /^0b[01]+$/i,
          b = /^0o[0-7]+$/i,
          v = parseInt,
          y =
            "object" == ("undefined" == typeof t ? "undefined" : c(t)) &&
            t &&
            t.Object === Object &&
            t,
          g =
            "object" == ("undefined" == typeof self ? "undefined" : c(self)) &&
            self &&
            self.Object === Object &&
            self,
          h = y || g || Function("return this")(),
          w = Object.prototype,
          k = w.toString,
          x = Math.max,
          j = Math.min,
          O = function () {
            return h.Date.now();
          };
        e.exports = o;
      }).call(
        t,
        (function () {
          return this;
        })()
      );
    },
    function (e, t) {
      (function (t) {
        "use strict";
        function n(e, t, n) {
          function i(t) {
            var n = b,
              o = v;
            return (b = v = void 0), (O = t), (g = e.apply(o, n));
          }
          function r(e) {
            return (O = e), (h = setTimeout(s, t)), _ ? i(e) : g;
          }
          function u(e) {
            var n = e - w,
              o = e - O,
              i = t - n;
            return S ? x(i, y - o) : i;
          }
          function f(e) {
            var n = e - w,
              o = e - O;
            return void 0 === w || n >= t || n < 0 || (S && o >= y);
          }
          function s() {
            var e = j();
            return f(e) ? d(e) : void (h = setTimeout(s, u(e)));
          }
          function d(e) {
            return (h = void 0), z && b ? i(e) : ((b = v = void 0), g);
          }
          function l() {
            void 0 !== h && clearTimeout(h), (O = 0), (b = w = v = h = void 0);
          }
          function p() {
            return void 0 === h ? g : d(j());
          }
          function m() {
            var e = j(),
              n = f(e);
            if (((b = arguments), (v = this), (w = e), n)) {
              if (void 0 === h) return r(w);
              if (S) return (h = setTimeout(s, t)), i(w);
            }
            return void 0 === h && (h = setTimeout(s, t)), g;
          }
          var b,
            v,
            y,
            g,
            h,
            w,
            O = 0,
            _ = !1,
            S = !1,
            z = !0;
          if ("function" != typeof e) throw new TypeError(c);
          return (
            (t = a(t) || 0),
            o(n) &&
              ((_ = !!n.leading),
              (S = "maxWait" in n),
              (y = S ? k(a(n.maxWait) || 0, t) : y),
              (z = "trailing" in n ? !!n.trailing : z)),
            (m.cancel = l),
            (m.flush = p),
            m
          );
        }
        function o(e) {
          var t = "undefined" == typeof e ? "undefined" : u(e);
          return !!e && ("object" == t || "function" == t);
        }
        function i(e) {
          return (
            !!e && "object" == ("undefined" == typeof e ? "undefined" : u(e))
          );
        }
        function r(e) {
          return (
            "symbol" == ("undefined" == typeof e ? "undefined" : u(e)) ||
            (i(e) && w.call(e) == s)
          );
        }
        function a(e) {
          if ("number" == typeof e) return e;
          if (r(e)) return f;
          if (o(e)) {
            var t = "function" == typeof e.valueOf ? e.valueOf() : e;
            e = o(t) ? t + "" : t;
          }
          if ("string" != typeof e) return 0 === e ? e : +e;
          e = e.replace(d, "");
          var n = p.test(e);
          return n || m.test(e) ? b(e.slice(2), n ? 2 : 8) : l.test(e) ? f : +e;
        }
        var u =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    "function" == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? "symbol"
                    : typeof e;
                },
          c = "Expected a function",
          f = NaN,
          s = "[object Symbol]",
          d = /^\s+|\s+$/g,
          l = /^[-+]0x[0-9a-f]+$/i,
          p = /^0b[01]+$/i,
          m = /^0o[0-7]+$/i,
          b = parseInt,
          v =
            "object" == ("undefined" == typeof t ? "undefined" : u(t)) &&
            t &&
            t.Object === Object &&
            t,
          y =
            "object" == ("undefined" == typeof self ? "undefined" : u(self)) &&
            self &&
            self.Object === Object &&
            self,
          g = v || y || Function("return this")(),
          h = Object.prototype,
          w = h.toString,
          k = Math.max,
          x = Math.min,
          j = function () {
            return g.Date.now();
          };
        e.exports = n;
      }).call(
        t,
        (function () {
          return this;
        })()
      );
    },
    function (e, t) {
      "use strict";
      function n(e, t) {
        var n = window.document,
          r =
            window.MutationObserver ||
            window.WebKitMutationObserver ||
            window.MozMutationObserver,
          a = new r(o);
        (i = t),
          a.observe(n.documentElement, {
            childList: !0,
            subtree: !0,
            removedNodes: !0,
          });
      }
      function o(e) {
        e &&
          e.forEach(function (e) {
            var t = Array.prototype.slice.call(e.addedNodes),
              n = Array.prototype.slice.call(e.removedNodes),
              o = t.concat(n).filter(function (e) {
                return e.hasAttribute && e.hasAttribute("data-aos");
              }).length;
            o && i();
          });
      }
      Object.defineProperty(t, "__esModule", { value: !0 });
      var i = function () {};
      t.default = n;
    },
    function (e, t) {
      "use strict";
      function n(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      }
      function o() {
        return navigator.userAgent || navigator.vendor || window.opera || "";
      }
      Object.defineProperty(t, "__esModule", { value: !0 });
      var i = (function () {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var o = t[n];
              (o.enumerable = o.enumerable || !1),
                (o.configurable = !0),
                "value" in o && (o.writable = !0),
                Object.defineProperty(e, o.key, o);
            }
          }
          return function (t, n, o) {
            return n && e(t.prototype, n), o && e(t, o), t;
          };
        })(),
        r =
          /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i,
        a =
          /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,
        u =
          /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i,
        c =
          /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,
        f = (function () {
          function e() {
            n(this, e);
          }
          return (
            i(e, [
              {
                key: "phone",
                value: function () {
                  var e = o();
                  return !(!r.test(e) && !a.test(e.substr(0, 4)));
                },
              },
              {
                key: "mobile",
                value: function () {
                  var e = o();
                  return !(!u.test(e) && !c.test(e.substr(0, 4)));
                },
              },
              {
                key: "tablet",
                value: function () {
                  return this.mobile() && !this.phone();
                },
              },
            ]),
            e
          );
        })();
      t.default = new f();
    },
    function (e, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n = function (e, t, n) {
          var o = e.node.getAttribute("data-aos-once");
          t > e.position
            ? e.node.classList.add("aos-animate")
            : "undefined" != typeof o &&
              ("false" === o || (!n && "true" !== o)) &&
              e.node.classList.remove("aos-animate");
        },
        o = function (e, t) {
          var o = window.pageYOffset,
            i = window.innerHeight;
          e.forEach(function (e, r) {
            n(e, i + o, t);
          });
        };
      t.default = o;
    },
    function (e, t, n) {
      "use strict";
      function o(e) {
        return e && e.__esModule ? e : { default: e };
      }
      Object.defineProperty(t, "__esModule", { value: !0 });
      var i = n(12),
        r = o(i),
        a = function (e, t) {
          return (
            e.forEach(function (e, n) {
              e.node.classList.add("aos-init"),
                (e.position = (0, r.default)(e.node, t.offset));
            }),
            e
          );
        };
      t.default = a;
    },
    function (e, t, n) {
      "use strict";
      function o(e) {
        return e && e.__esModule ? e : { default: e };
      }
      Object.defineProperty(t, "__esModule", { value: !0 });
      var i = n(13),
        r = o(i),
        a = function (e, t) {
          var n = 0,
            o = 0,
            i = window.innerHeight,
            a = {
              offset: e.getAttribute("data-aos-offset"),
              anchor: e.getAttribute("data-aos-anchor"),
              anchorPlacement: e.getAttribute("data-aos-anchor-placement"),
            };
          switch (
            (a.offset && !isNaN(a.offset) && (o = parseInt(a.offset)),
            a.anchor &&
              document.querySelectorAll(a.anchor) &&
              (e = document.querySelectorAll(a.anchor)[0]),
            (n = (0, r.default)(e).top),
            a.anchorPlacement)
          ) {
            case "top-bottom":
              break;
            case "center-bottom":
              n += e.offsetHeight / 2;
              break;
            case "bottom-bottom":
              n += e.offsetHeight;
              break;
            case "top-center":
              n += i / 2;
              break;
            case "bottom-center":
              n += i / 2 + e.offsetHeight;
              break;
            case "center-center":
              n += i / 2 + e.offsetHeight / 2;
              break;
            case "top-top":
              n += i;
              break;
            case "bottom-top":
              n += e.offsetHeight + i;
              break;
            case "center-top":
              n += e.offsetHeight / 2 + i;
          }
          return a.anchorPlacement || a.offset || isNaN(t) || (o = t), n + o;
        };
      t.default = a;
    },
    function (e, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n = function (e) {
        for (
          var t = 0, n = 0;
          e && !isNaN(e.offsetLeft) && !isNaN(e.offsetTop);

        )
          (t += e.offsetLeft - ("BODY" != e.tagName ? e.scrollLeft : 0)),
            (n += e.offsetTop - ("BODY" != e.tagName ? e.scrollTop : 0)),
            (e = e.offsetParent);
        return { top: n, left: t };
      };
      t.default = n;
    },
    function (e, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n = function (e) {
        return (
          (e = e || document.querySelectorAll("[data-aos]")),
          Array.prototype.map.call(e, function (e) {
            return { node: e };
          })
        );
      };
      t.default = n;
    },
  ]);
});

//--------------------------------
// - jQuery Easing
//--------------------------------
/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Copyright Â© 2008 George McGinley Smith
 * All rights reserved.
 *
 */
jQuery.easing.jswing = jQuery.easing.swing;
jQuery.extend(jQuery.easing, {
  def: "easeOutQuad",
  swing: function (e, f, a, h, g) {
    return jQuery.easing[jQuery.easing.def](e, f, a, h, g);
  },
  easeInQuad: function (e, f, a, h, g) {
    return h * (f /= g) * f + a;
  },
  easeOutQuad: function (e, f, a, h, g) {
    return -h * (f /= g) * (f - 2) + a;
  },
  easeInOutQuad: function (e, f, a, h, g) {
    if ((f /= g / 2) < 1) {
      return (h / 2) * f * f + a;
    }
    return (-h / 2) * (--f * (f - 2) - 1) + a;
  },
  easeInCubic: function (e, f, a, h, g) {
    return h * (f /= g) * f * f + a;
  },
  easeOutCubic: function (e, f, a, h, g) {
    return h * ((f = f / g - 1) * f * f + 1) + a;
  },
  easeInOutCubic: function (e, f, a, h, g) {
    if ((f /= g / 2) < 1) {
      return (h / 2) * f * f * f + a;
    }
    return (h / 2) * ((f -= 2) * f * f + 2) + a;
  },
  easeInQuart: function (e, f, a, h, g) {
    return h * (f /= g) * f * f * f + a;
  },
  easeOutQuart: function (e, f, a, h, g) {
    return -h * ((f = f / g - 1) * f * f * f - 1) + a;
  },
  easeInOutQuart: function (e, f, a, h, g) {
    if ((f /= g / 2) < 1) {
      return (h / 2) * f * f * f * f + a;
    }
    return (-h / 2) * ((f -= 2) * f * f * f - 2) + a;
  },
  easeInQuint: function (e, f, a, h, g) {
    return h * (f /= g) * f * f * f * f + a;
  },
  easeOutQuint: function (e, f, a, h, g) {
    return h * ((f = f / g - 1) * f * f * f * f + 1) + a;
  },
  easeInOutQuint: function (e, f, a, h, g) {
    if ((f /= g / 2) < 1) {
      return (h / 2) * f * f * f * f * f + a;
    }
    return (h / 2) * ((f -= 2) * f * f * f * f + 2) + a;
  },
  easeInSine: function (e, f, a, h, g) {
    return -h * Math.cos((f / g) * (Math.PI / 2)) + h + a;
  },
  easeOutSine: function (e, f, a, h, g) {
    return h * Math.sin((f / g) * (Math.PI / 2)) + a;
  },
  easeInOutSine: function (e, f, a, h, g) {
    return (-h / 2) * (Math.cos((Math.PI * f) / g) - 1) + a;
  },
  easeInExpo: function (e, f, a, h, g) {
    return f == 0 ? a : h * Math.pow(2, 10 * (f / g - 1)) + a;
  },
  easeOutExpo: function (e, f, a, h, g) {
    return f == g ? a + h : h * (-Math.pow(2, (-10 * f) / g) + 1) + a;
  },
  easeInOutExpo: function (e, f, a, h, g) {
    if (f == 0) {
      return a;
    }
    if (f == g) {
      return a + h;
    }
    if ((f /= g / 2) < 1) {
      return (h / 2) * Math.pow(2, 10 * (f - 1)) + a;
    }
    return (h / 2) * (-Math.pow(2, -10 * --f) + 2) + a;
  },
  easeInCirc: function (e, f, a, h, g) {
    return -h * (Math.sqrt(1 - (f /= g) * f) - 1) + a;
  },
  easeOutCirc: function (e, f, a, h, g) {
    return h * Math.sqrt(1 - (f = f / g - 1) * f) + a;
  },
  easeInOutCirc: function (e, f, a, h, g) {
    if ((f /= g / 2) < 1) {
      return (-h / 2) * (Math.sqrt(1 - f * f) - 1) + a;
    }
    return (h / 2) * (Math.sqrt(1 - (f -= 2) * f) + 1) + a;
  },
  easeInElastic: function (f, h, e, l, k) {
    var i = 1.70158;
    var j = 0;
    var g = l;
    if (h == 0) {
      return e;
    }
    if ((h /= k) == 1) {
      return e + l;
    }
    if (!j) {
      j = k * 0.3;
    }
    if (g < Math.abs(l)) {
      g = l;
      var i = j / 4;
    } else {
      var i = (j / (2 * Math.PI)) * Math.asin(l / g);
    }
    return (
      -(
        g *
        Math.pow(2, 10 * (h -= 1)) *
        Math.sin(((h * k - i) * (2 * Math.PI)) / j)
      ) + e
    );
  },
  easeOutElastic: function (f, h, e, l, k) {
    var i = 1.70158;
    var j = 0;
    var g = l;
    if (h == 0) {
      return e;
    }
    if ((h /= k) == 1) {
      return e + l;
    }
    if (!j) {
      j = k * 0.3;
    }
    if (g < Math.abs(l)) {
      g = l;
      var i = j / 4;
    } else {
      var i = (j / (2 * Math.PI)) * Math.asin(l / g);
    }
    return (
      g * Math.pow(2, -10 * h) * Math.sin(((h * k - i) * (2 * Math.PI)) / j) +
      l +
      e
    );
  },
  easeInOutElastic: function (f, h, e, l, k) {
    var i = 1.70158;
    var j = 0;
    var g = l;
    if (h == 0) {
      return e;
    }
    if ((h /= k / 2) == 2) {
      return e + l;
    }
    if (!j) {
      j = k * (0.3 * 1.5);
    }
    if (g < Math.abs(l)) {
      g = l;
      var i = j / 4;
    } else {
      var i = (j / (2 * Math.PI)) * Math.asin(l / g);
    }
    if (h < 1) {
      return (
        -0.5 *
          (g *
            Math.pow(2, 10 * (h -= 1)) *
            Math.sin(((h * k - i) * (2 * Math.PI)) / j)) +
        e
      );
    }
    return (
      g *
        Math.pow(2, -10 * (h -= 1)) *
        Math.sin(((h * k - i) * (2 * Math.PI)) / j) *
        0.5 +
      l +
      e
    );
  },
  easeInBack: function (e, f, a, i, h, g) {
    if (g == undefined) {
      g = 1.70158;
    }
    return i * (f /= h) * f * ((g + 1) * f - g) + a;
  },
  easeOutBack: function (e, f, a, i, h, g) {
    if (g == undefined) {
      g = 1.70158;
    }
    return i * ((f = f / h - 1) * f * ((g + 1) * f + g) + 1) + a;
  },
  easeInOutBack: function (e, f, a, i, h, g) {
    if (g == undefined) {
      g = 1.70158;
    }
    if ((f /= h / 2) < 1) {
      return (i / 2) * (f * f * (((g *= 1.525) + 1) * f - g)) + a;
    }
    return (i / 2) * ((f -= 2) * f * (((g *= 1.525) + 1) * f + g) + 2) + a;
  },
  easeInBounce: function (e, f, a, h, g) {
    return h - jQuery.easing.easeOutBounce(e, g - f, 0, h, g) + a;
  },
  easeOutBounce: function (e, f, a, h, g) {
    if ((f /= g) < 1 / 2.75) {
      return h * (7.5625 * f * f) + a;
    } else {
      if (f < 2 / 2.75) {
        return h * (7.5625 * (f -= 1.5 / 2.75) * f + 0.75) + a;
      } else {
        if (f < 2.5 / 2.75) {
          return h * (7.5625 * (f -= 2.25 / 2.75) * f + 0.9375) + a;
        } else {
          return h * (7.5625 * (f -= 2.625 / 2.75) * f + 0.984375) + a;
        }
      }
    }
  },
  easeInOutBounce: function (e, f, a, h, g) {
    if (f < g / 2) {
      return jQuery.easing.easeInBounce(e, f * 2, 0, h, g) * 0.5 + a;
    }
    return (
      jQuery.easing.easeOutBounce(e, f * 2 - g, 0, h, g) * 0.5 + h * 0.5 + a
    );
  },
});

//--------------------------------
// - Smartresize
//--------------------------------
// smartresize
(function ($, sr) {
  // debouncing function from John Hann
  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
  var debounce = function (func, threshold, execAsap) {
    var timeout;

    return function debounced() {
      var obj = this,
        args = arguments;
      function delayed() {
        if (!execAsap) func.apply(obj, args);
        timeout = null;
      }

      if (timeout) clearTimeout(timeout);
      else if (execAsap) func.apply(obj, args);

      timeout = setTimeout(delayed, threshold || 100);
    };
  };
  // smartresize
  jQuery.fn[sr] = function (fn) {
    return fn ? this.bind("resize", debounce(fn)) : this.trigger(sr);
  };
})(jQuery, "smartresize");

//--------------------------------
// - SlickJS
//--------------------------------
/*
      _ _      _       _
  ___| (_) ___| | __  (_)___
 / __| | |/ __| |/ /  | / __|
 \__ \ | | (__|   < _ | \__ \
 |___/_|_|\___|_|\_(_)/ |___/
                    |__/

  Version: 1.6.0
   Author: Ken Wheeler
  Website: http://kenwheeler.github.io
     Docs: http://kenwheeler.github.io/slick
     Repo: http://github.com/kenwheeler/slick
   Issues: http://github.com/kenwheeler/slick/issues

  */
local = {
  next: "next",
  prev: "prev",
  of: "of",
};

!(function (a) {
  "use strict";
  "function" == typeof define && define.amd
    ? define(["jquery"], a)
    : "undefined" != typeof exports
    ? (module.exports = a(require("jquery")))
    : a(jQuery);
})(function (a) {
  "use strict";
  var b = window.Slick || {};
  (b = (function () {
    function c(c, d) {
      var f,
        e = this;
      (e.defaults = {
        accessibility: !0,
        adaptiveHeight: !1,
        appendArrows: a(c),
        appendDots: a(c),
        arrows: !0,
        asNavFor: null,
        prevArrow:
          '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
        nextArrow:
          '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
        autoplay: !1,
        autoplaySpeed: 3e3,
        centerMode: !1,
        centerPadding: "50px",
        cssEase: "ease",
        customPaging: function (b, c) {
          return a(
            '<button type="button" data-role="none" role="button" tabindex="0" />'
          ).text(c + 1);
        },
        dots: !1,
        dotsClass: "slick-dots",
        draggable: !0,
        easing: "linear",
        edgeFriction: 0.35,
        fade: !1,
        focusOnSelect: !1,
        infinite: !0,
        initialSlide: 0,
        lazyLoad: "ondemand",
        mobileFirst: !1,
        pauseOnHover: !0,
        pauseOnFocus: !0,
        pauseOnDotsHover: !1,
        respondTo: "window",
        responsive: null,
        rows: 1,
        rtl: !1,
        slide: "",
        slidesPerRow: 1,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 500,
        swipe: !0,
        swipeToSlide: !1,
        touchMove: !0,
        touchThreshold: 5,
        useCSS: !0,
        useTransform: !0,
        variableWidth: !1,
        vertical: !1,
        verticalSwiping: !1,
        waitForAnimate: !0,
        zIndex: 1e3,
      }),
        (e.initials = {
          animating: !1,
          dragging: !1,
          autoPlayTimer: null,
          currentDirection: 0,
          currentLeft: null,
          currentSlide: 0,
          direction: 1,
          $dots: null,
          listWidth: null,
          listHeight: null,
          loadIndex: 0,
          $nextArrow: null,
          $prevArrow: null,
          slideCount: null,
          slideWidth: null,
          $slideTrack: null,
          $slides: null,
          sliding: !1,
          slideOffset: 0,
          swipeLeft: null,
          $list: null,
          touchObject: {},
          transformsEnabled: !1,
          unslicked: !1,
        }),
        a.extend(e, e.initials),
        (e.activeBreakpoint = null),
        (e.animType = null),
        (e.animProp = null),
        (e.breakpoints = []),
        (e.breakpointSettings = []),
        (e.cssTransitions = !1),
        (e.focussed = !1),
        (e.interrupted = !1),
        (e.hidden = "hidden"),
        (e.paused = !0),
        (e.positionProp = null),
        (e.respondTo = null),
        (e.rowCount = 1),
        (e.shouldClick = !0),
        (e.$slider = a(c)),
        (e.$slidesCache = null),
        (e.transformType = null),
        (e.transitionType = null),
        (e.visibilityChange = "visibilitychange"),
        (e.windowWidth = 0),
        (e.windowTimer = null),
        (f = a(c).data("slick") || {}),
        (e.options = a.extend({}, e.defaults, d, f)),
        (e.currentSlide = e.options.initialSlide),
        (e.originalSettings = e.options),
        "undefined" != typeof document.mozHidden
          ? ((e.hidden = "mozHidden"),
            (e.visibilityChange = "mozvisibilitychange"))
          : "undefined" != typeof document.webkitHidden &&
            ((e.hidden = "webkitHidden"),
            (e.visibilityChange = "webkitvisibilitychange")),
        (e.autoPlay = a.proxy(e.autoPlay, e)),
        (e.autoPlayClear = a.proxy(e.autoPlayClear, e)),
        (e.autoPlayIterator = a.proxy(e.autoPlayIterator, e)),
        (e.changeSlide = a.proxy(e.changeSlide, e)),
        (e.clickHandler = a.proxy(e.clickHandler, e)),
        (e.selectHandler = a.proxy(e.selectHandler, e)),
        (e.setPosition = a.proxy(e.setPosition, e)),
        (e.swipeHandler = a.proxy(e.swipeHandler, e)),
        (e.dragHandler = a.proxy(e.dragHandler, e)),
        (e.keyHandler = a.proxy(e.keyHandler, e)),
        (e.instanceUid = b++),
        (e.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/),
        e.registerBreakpoints(),
        e.init(!0);
    }
    var b = 0;
    return c;
  })()),
    (b.prototype.activateADA = function () {
      var a = this;
      a.$slideTrack
        .find(".slick-active")
        .attr({ "aria-hidden": "false" })
        .find("a, input, button, select")
        .attr({ tabindex: "0" });
    }),
    (b.prototype.addSlide = b.prototype.slickAdd =
      function (b, c, d) {
        var e = this;
        if ("boolean" == typeof c) (d = c), (c = null);
        else if (0 > c || c >= e.slideCount) return !1;
        e.unload(),
          "number" == typeof c
            ? 0 === c && 0 === e.$slides.length
              ? a(b).appendTo(e.$slideTrack)
              : d
              ? a(b).insertBefore(e.$slides.eq(c))
              : a(b).insertAfter(e.$slides.eq(c))
            : d === !0
            ? a(b).prependTo(e.$slideTrack)
            : a(b).appendTo(e.$slideTrack),
          (e.$slides = e.$slideTrack.children(this.options.slide)),
          e.$slideTrack.children(this.options.slide).detach(),
          e.$slideTrack.append(e.$slides),
          e.$slides.each(function (b, c) {
            a(c).attr("data-slick-index", b);
          }),
          (e.$slidesCache = e.$slides),
          e.reinit();
      }),
    (b.prototype.animateHeight = function () {
      var a = this;
      if (
        1 === a.options.slidesToShow &&
        a.options.adaptiveHeight === !0 &&
        a.options.vertical === !1
      ) {
        var b = a.$slides.eq(a.currentSlide).outerHeight(!0);
        a.$list.animate({ height: b }, a.options.speed);
      }
    }),
    (b.prototype.animateSlide = function (b, c) {
      var d = {},
        e = this;
      e.animateHeight(),
        e.options.rtl === !0 && e.options.vertical === !1 && (b = -b),
        e.transformsEnabled === !1
          ? e.options.vertical === !1
            ? e.$slideTrack.animate(
                { left: b },
                e.options.speed,
                e.options.easing,
                c
              )
            : e.$slideTrack.animate(
                { top: b },
                e.options.speed,
                e.options.easing,
                c
              )
          : e.cssTransitions === !1
          ? (e.options.rtl === !0 && (e.currentLeft = -e.currentLeft),
            a({ animStart: e.currentLeft }).animate(
              { animStart: b },
              {
                duration: e.options.speed,
                easing: e.options.easing,
                step: function (a) {
                  (a = Math.ceil(a)),
                    e.options.vertical === !1
                      ? ((d[e.animType] = "translate(" + a + "px, 0px)"),
                        e.$slideTrack.css(d))
                      : ((d[e.animType] = "translate(0px," + a + "px)"),
                        e.$slideTrack.css(d));
                },
                complete: function () {
                  c && c.call();
                },
              }
            ))
          : (e.applyTransition(),
            (b = Math.ceil(b)),
            e.options.vertical === !1
              ? (d[e.animType] = "translate3d(" + b + "px, 0px, 0px)")
              : (d[e.animType] = "translate3d(0px," + b + "px, 0px)"),
            e.$slideTrack.css(d),
            c &&
              setTimeout(function () {
                e.disableTransition(), c.call();
              }, e.options.speed));
    }),
    (b.prototype.getNavTarget = function () {
      var b = this,
        c = b.options.asNavFor;
      return c && null !== c && (c = a(c).not(b.$slider)), c;
    }),
    (b.prototype.asNavFor = function (b) {
      var c = this,
        d = c.getNavTarget();
      null !== d &&
        "object" == typeof d &&
        d.each(function () {
          var c = a(this).slick("getSlick");
          c.unslicked || c.slideHandler(b, !0);
        });
    }),
    (b.prototype.applyTransition = function (a) {
      var b = this,
        c = {};
      b.options.fade === !1
        ? (c[b.transitionType] =
            b.transformType + " " + b.options.speed + "ms " + b.options.cssEase)
        : (c[b.transitionType] =
            "opacity " + b.options.speed + "ms " + b.options.cssEase),
        b.options.fade === !1 ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c);
    }),
    (b.prototype.autoPlay = function () {
      var a = this;
      a.autoPlayClear(),
        a.slideCount > a.options.slidesToShow &&
          (a.autoPlayTimer = setInterval(
            a.autoPlayIterator,
            a.options.autoplaySpeed
          ));
    }),
    (b.prototype.autoPlayClear = function () {
      var a = this;
      a.autoPlayTimer && clearInterval(a.autoPlayTimer);
    }),
    (b.prototype.autoPlayIterator = function () {
      var a = this,
        b = a.currentSlide + a.options.slidesToScroll;
      a.paused ||
        a.interrupted ||
        a.focussed ||
        (a.options.infinite === !1 &&
          (1 === a.direction && a.currentSlide + 1 === a.slideCount - 1
            ? (a.direction = 0)
            : 0 === a.direction &&
              ((b = a.currentSlide - a.options.slidesToScroll),
              a.currentSlide - 1 === 0 && (a.direction = 1))),
        a.slideHandler(b));
    }),
    (b.prototype.buildArrows = function () {
      var b = this;
      b.options.arrows === !0 &&
        ((b.$prevArrow = a(b.options.prevArrow).addClass("slick-arrow")),
        (b.$nextArrow = a(b.options.nextArrow).addClass("slick-arrow")),
        b.slideCount > b.options.slidesToShow
          ? (b.$prevArrow
              .removeClass("slick-hidden")
              .removeAttr("aria-hidden tabindex"),
            b.$nextArrow
              .removeClass("slick-hidden")
              .removeAttr("aria-hidden tabindex"),
            b.htmlExpr.test(b.options.prevArrow) &&
              b.$prevArrow.prependTo(b.options.appendArrows),
            b.htmlExpr.test(b.options.nextArrow) &&
              b.$nextArrow.appendTo(b.options.appendArrows),
            b.options.infinite !== !0 &&
              b.$prevArrow
                .addClass("slick-disabled")
                .attr("aria-disabled", "true"))
          : b.$prevArrow
              .add(b.$nextArrow)
              .addClass("slick-hidden")
              .attr({ "aria-disabled": "true", tabindex: "-1" }));
    }),
    (b.prototype.buildDots = function () {
      var c,
        d,
        b = this;
      if (b.options.dots === !0 && b.slideCount > b.options.slidesToShow) {
        for (
          b.$slider.addClass("slick-dotted"),
            d = a("<ul />").addClass(b.options.dotsClass),
            c = 0;
          c <= b.getDotCount();
          c += 1
        )
          d.append(a("<li />").append(b.options.customPaging.call(this, b, c)));
        (b.$dots = d.appendTo(b.options.appendDots)),
          b.$dots
            .find("li")
            .first()
            .addClass("slick-active")
            .attr("aria-hidden", "false");
      }
    }),
    (b.prototype.buildOut = function () {
      var b = this;
      (b.$slides = b.$slider
        .children(b.options.slide + ":not(.slick-cloned)")
        .addClass("slick-slide")),
        (b.slideCount = b.$slides.length),
        b.$slides.each(function (b, c) {
          a(c)
            .attr("data-slick-index", b)
            .data("originalStyling", a(c).attr("style") || "");
        }),
        b.$slider.addClass("slick-slider"),
        (b.$slideTrack =
          0 === b.slideCount
            ? a('<div class="slick-track"/>').appendTo(b.$slider)
            : b.$slides.wrapAll('<div class="slick-track"/>').parent()),
        (b.$list = b.$slideTrack
          .wrap('<div aria-live="polite" class="slick-list"/>')
          .parent()),
        b.$slideTrack.css("opacity", 0),
        (b.options.centerMode === !0 || b.options.swipeToSlide === !0) &&
          (b.options.slidesToScroll = 1),
        a("img[data-lazy]", b.$slider).not("[src]").addClass("slick-loading"),
        b.setupInfinite(),
        b.buildArrows(),
        b.buildDots(),
        b.updateDots(),
        b.setSlideClasses(
          "number" == typeof b.currentSlide ? b.currentSlide : 0
        ),
        b.options.draggable === !0 && b.$list.addClass("draggable");
    }),
    (b.prototype.buildRows = function () {
      var b,
        c,
        d,
        e,
        f,
        g,
        h,
        a = this;
      if (
        ((e = document.createDocumentFragment()),
        (g = a.$slider.children()),
        a.options.rows > 1)
      ) {
        for (
          h = a.options.slidesPerRow * a.options.rows,
            f = Math.ceil(g.length / h),
            b = 0;
          f > b;
          b++
        ) {
          var i = document.createElement("div");
          for (c = 0; c < a.options.rows; c++) {
            var j = document.createElement("div");
            for (d = 0; d < a.options.slidesPerRow; d++) {
              var k = b * h + (c * a.options.slidesPerRow + d);
              g.get(k) && j.appendChild(g.get(k));
            }
            i.appendChild(j);
          }
          e.appendChild(i);
        }
        a.$slider.empty().append(e),
          a.$slider
            .children()
            .children()
            .children()
            .css({
              width: 100 / a.options.slidesPerRow + "%",
              display: "inline-block",
            });
      }
    }),
    (b.prototype.checkResponsive = function (b, c) {
      var e,
        f,
        g,
        d = this,
        h = !1,
        i = d.$slider.width(),
        j = window.innerWidth || a(window).width();
      if (
        ("window" === d.respondTo
          ? (g = j)
          : "slider" === d.respondTo
          ? (g = i)
          : "min" === d.respondTo && (g = Math.min(j, i)),
        d.options.responsive &&
          d.options.responsive.length &&
          null !== d.options.responsive)
      ) {
        f = null;
        for (e in d.breakpoints)
          d.breakpoints.hasOwnProperty(e) &&
            (d.originalSettings.mobileFirst === !1
              ? g < d.breakpoints[e] && (f = d.breakpoints[e])
              : g > d.breakpoints[e] && (f = d.breakpoints[e]));
        null !== f
          ? null !== d.activeBreakpoint
            ? (f !== d.activeBreakpoint || c) &&
              ((d.activeBreakpoint = f),
              "unslick" === d.breakpointSettings[f]
                ? d.unslick(f)
                : ((d.options = a.extend(
                    {},
                    d.originalSettings,
                    d.breakpointSettings[f]
                  )),
                  b === !0 && (d.currentSlide = d.options.initialSlide),
                  d.refresh(b)),
              (h = f))
            : ((d.activeBreakpoint = f),
              "unslick" === d.breakpointSettings[f]
                ? d.unslick(f)
                : ((d.options = a.extend(
                    {},
                    d.originalSettings,
                    d.breakpointSettings[f]
                  )),
                  b === !0 && (d.currentSlide = d.options.initialSlide),
                  d.refresh(b)),
              (h = f))
          : null !== d.activeBreakpoint &&
            ((d.activeBreakpoint = null),
            (d.options = d.originalSettings),
            b === !0 && (d.currentSlide = d.options.initialSlide),
            d.refresh(b),
            (h = f)),
          b || h === !1 || d.$slider.trigger("breakpoint", [d, h]);
      }
    }),
    (b.prototype.changeSlide = function (b, c) {
      var f,
        g,
        h,
        d = this,
        e = a(b.currentTarget);
      switch (
        (e.is("a") && b.preventDefault(),
        e.is("li") || (e = e.closest("li")),
        (h = d.slideCount % d.options.slidesToScroll !== 0),
        (f = h
          ? 0
          : (d.slideCount - d.currentSlide) % d.options.slidesToScroll),
        b.data.message)
      ) {
        case "previous":
          (g = 0 === f ? d.options.slidesToScroll : d.options.slidesToShow - f),
            d.slideCount > d.options.slidesToShow &&
              d.slideHandler(d.currentSlide - g, !1, c);
          break;
        case "next":
          (g = 0 === f ? d.options.slidesToScroll : f),
            d.slideCount > d.options.slidesToShow &&
              d.slideHandler(d.currentSlide + g, !1, c);
          break;
        case "index":
          var i =
            0 === b.data.index
              ? 0
              : b.data.index || e.index() * d.options.slidesToScroll;
          d.slideHandler(d.checkNavigable(i), !1, c),
            e.children().trigger("focus");
          break;
        default:
          return;
      }
    }),
    (b.prototype.checkNavigable = function (a) {
      var c,
        d,
        b = this;
      if (((c = b.getNavigableIndexes()), (d = 0), a > c[c.length - 1]))
        a = c[c.length - 1];
      else
        for (var e in c) {
          if (a < c[e]) {
            a = d;
            break;
          }
          d = c[e];
        }
      return a;
    }),
    (b.prototype.cleanUpEvents = function () {
      var b = this;
      b.options.dots &&
        null !== b.$dots &&
        a("li", b.$dots)
          .off("click.slick", b.changeSlide)
          .off("mouseenter.slick", a.proxy(b.interrupt, b, !0))
          .off("mouseleave.slick", a.proxy(b.interrupt, b, !1)),
        b.$slider.off("focus.slick blur.slick"),
        b.options.arrows === !0 &&
          b.slideCount > b.options.slidesToShow &&
          (b.$prevArrow && b.$prevArrow.off("click.slick", b.changeSlide),
          b.$nextArrow && b.$nextArrow.off("click.slick", b.changeSlide)),
        b.$list.off("touchstart.slick mousedown.slick", b.swipeHandler),
        b.$list.off("touchmove.slick mousemove.slick", b.swipeHandler),
        b.$list.off("touchend.slick mouseup.slick", b.swipeHandler),
        b.$list.off("touchcancel.slick mouseleave.slick", b.swipeHandler),
        b.$list.off("click.slick", b.clickHandler),
        a(document).off(b.visibilityChange, b.visibility),
        b.cleanUpSlideEvents(),
        b.options.accessibility === !0 &&
          b.$list.off("keydown.slick", b.keyHandler),
        b.options.focusOnSelect === !0 &&
          a(b.$slideTrack).children().off("click.slick", b.selectHandler),
        a(window).off(
          "orientationchange.slick.slick-" + b.instanceUid,
          b.orientationChange
        ),
        a(window).off("resize.slick.slick-" + b.instanceUid, b.resize),
        a("[draggable!=true]", b.$slideTrack).off(
          "dragstart",
          b.preventDefault
        ),
        a(window).off("load.slick.slick-" + b.instanceUid, b.setPosition),
        a(document).off("ready.slick.slick-" + b.instanceUid, b.setPosition);
    }),
    (b.prototype.cleanUpSlideEvents = function () {
      var b = this;
      b.$list.off("mouseenter.slick", a.proxy(b.interrupt, b, !0)),
        b.$list.off("mouseleave.slick", a.proxy(b.interrupt, b, !1));
    }),
    (b.prototype.cleanUpRows = function () {
      var b,
        a = this;
      a.options.rows > 1 &&
        ((b = a.$slides.children().children()),
        b.removeAttr("style"),
        a.$slider.empty().append(b));
    }),
    (b.prototype.clickHandler = function (a) {
      var b = this;
      b.shouldClick === !1 &&
        (a.stopImmediatePropagation(), a.stopPropagation(), a.preventDefault());
    }),
    (b.prototype.destroy = function (b) {
      var c = this;
      c.autoPlayClear(),
        (c.touchObject = {}),
        c.cleanUpEvents(),
        a(".slick-cloned", c.$slider).detach(),
        c.$dots && c.$dots.remove(),
        c.$prevArrow &&
          c.$prevArrow.length &&
          (c.$prevArrow
            .removeClass("slick-disabled slick-arrow slick-hidden")
            .removeAttr("aria-hidden aria-disabled tabindex")
            .css("display", ""),
          c.htmlExpr.test(c.options.prevArrow) && c.$prevArrow.remove()),
        c.$nextArrow &&
          c.$nextArrow.length &&
          (c.$nextArrow
            .removeClass("slick-disabled slick-arrow slick-hidden")
            .removeAttr("aria-hidden aria-disabled tabindex")
            .css("display", ""),
          c.htmlExpr.test(c.options.nextArrow) && c.$nextArrow.remove()),
        c.$slides &&
          (c.$slides
            .removeClass(
              "slick-slide slick-active slick-center slick-visible slick-current"
            )
            .removeAttr("aria-hidden")
            .removeAttr("data-slick-index")
            .each(function () {
              a(this).attr("style", a(this).data("originalStyling"));
            }),
          c.$slideTrack.children(this.options.slide).detach(),
          c.$slideTrack.detach(),
          c.$list.detach(),
          c.$slider.append(c.$slides)),
        c.cleanUpRows(),
        c.$slider.removeClass("slick-slider"),
        c.$slider.removeClass("slick-initialized"),
        c.$slider.removeClass("slick-dotted"),
        (c.unslicked = !0),
        b || c.$slider.trigger("destroy", [c]);
    }),
    (b.prototype.disableTransition = function (a) {
      var b = this,
        c = {};
      (c[b.transitionType] = ""),
        b.options.fade === !1 ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c);
    }),
    (b.prototype.fadeSlide = function (a, b) {
      var c = this;
      c.cssTransitions === !1
        ? (c.$slides.eq(a).css({ zIndex: c.options.zIndex }),
          c.$slides
            .eq(a)
            .animate({ opacity: 1 }, c.options.speed, c.options.easing, b))
        : (c.applyTransition(a),
          c.$slides.eq(a).css({ opacity: 1, zIndex: c.options.zIndex }),
          b &&
            setTimeout(function () {
              c.disableTransition(a), b.call();
            }, c.options.speed));
    }),
    (b.prototype.fadeSlideOut = function (a) {
      var b = this;
      b.cssTransitions === !1
        ? b.$slides
            .eq(a)
            .animate(
              { opacity: 0, zIndex: b.options.zIndex - 2 },
              b.options.speed,
              b.options.easing
            )
        : (b.applyTransition(a),
          b.$slides.eq(a).css({ opacity: 0, zIndex: b.options.zIndex - 2 }));
    }),
    (b.prototype.filterSlides = b.prototype.slickFilter =
      function (a) {
        var b = this;
        null !== a &&
          ((b.$slidesCache = b.$slides),
          b.unload(),
          b.$slideTrack.children(this.options.slide).detach(),
          b.$slidesCache.filter(a).appendTo(b.$slideTrack),
          b.reinit());
      }),
    (b.prototype.focusHandler = function () {
      var b = this;
      b.$slider
        .off("focus.slick blur.slick")
        .on("focus.slick blur.slick", "*:not(.slick-arrow)", function (c) {
          c.stopImmediatePropagation();
          var d = a(this);
          setTimeout(function () {
            b.options.pauseOnFocus &&
              ((b.focussed = d.is(":focus")), b.autoPlay());
          }, 0);
        });
    }),
    (b.prototype.getCurrent = b.prototype.slickCurrentSlide =
      function () {
        var a = this;
        return a.currentSlide;
      }),
    (b.prototype.getDotCount = function () {
      var a = this,
        b = 0,
        c = 0,
        d = 0;
      if (a.options.infinite === !0)
        for (; b < a.slideCount; )
          ++d,
            (b = c + a.options.slidesToScroll),
            (c +=
              a.options.slidesToScroll <= a.options.slidesToShow
                ? a.options.slidesToScroll
                : a.options.slidesToShow);
      else if (a.options.centerMode === !0) d = a.slideCount;
      else if (a.options.asNavFor)
        for (; b < a.slideCount; )
          ++d,
            (b = c + a.options.slidesToScroll),
            (c +=
              a.options.slidesToScroll <= a.options.slidesToShow
                ? a.options.slidesToScroll
                : a.options.slidesToShow);
      else
        d =
          1 +
          Math.ceil(
            (a.slideCount - a.options.slidesToShow) / a.options.slidesToScroll
          );
      return d - 1;
    }),
    (b.prototype.getLeft = function (a) {
      var c,
        d,
        f,
        b = this,
        e = 0;
      return (
        (b.slideOffset = 0),
        (d = b.$slides.first().outerHeight(!0)),
        b.options.infinite === !0
          ? (b.slideCount > b.options.slidesToShow &&
              ((b.slideOffset = b.slideWidth * b.options.slidesToShow * -1),
              (e = d * b.options.slidesToShow * -1)),
            b.slideCount % b.options.slidesToScroll !== 0 &&
              a + b.options.slidesToScroll > b.slideCount &&
              b.slideCount > b.options.slidesToShow &&
              (a > b.slideCount
                ? ((b.slideOffset =
                    (b.options.slidesToShow - (a - b.slideCount)) *
                    b.slideWidth *
                    -1),
                  (e = (b.options.slidesToShow - (a - b.slideCount)) * d * -1))
                : ((b.slideOffset =
                    (b.slideCount % b.options.slidesToScroll) *
                    b.slideWidth *
                    -1),
                  (e = (b.slideCount % b.options.slidesToScroll) * d * -1))))
          : a + b.options.slidesToShow > b.slideCount &&
            ((b.slideOffset =
              (a + b.options.slidesToShow - b.slideCount) * b.slideWidth),
            (e = (a + b.options.slidesToShow - b.slideCount) * d)),
        b.slideCount <= b.options.slidesToShow &&
          ((b.slideOffset = 0), (e = 0)),
        b.options.centerMode === !0 && b.options.infinite === !0
          ? (b.slideOffset +=
              b.slideWidth * Math.floor(b.options.slidesToShow / 2) -
              b.slideWidth)
          : b.options.centerMode === !0 &&
            ((b.slideOffset = 0),
            (b.slideOffset +=
              b.slideWidth * Math.floor(b.options.slidesToShow / 2))),
        (c =
          b.options.vertical === !1
            ? a * b.slideWidth * -1 + b.slideOffset
            : a * d * -1 + e),
        b.options.variableWidth === !0 &&
          ((f =
            b.slideCount <= b.options.slidesToShow || b.options.infinite === !1
              ? b.$slideTrack.children(".slick-slide").eq(a)
              : b.$slideTrack
                  .children(".slick-slide")
                  .eq(a + b.options.slidesToShow)),
          (c =
            b.options.rtl === !0
              ? f[0]
                ? -1 * (b.$slideTrack.width() - f[0].offsetLeft - f.width())
                : 0
              : f[0]
              ? -1 * f[0].offsetLeft
              : 0),
          b.options.centerMode === !0 &&
            ((f =
              b.slideCount <= b.options.slidesToShow ||
              b.options.infinite === !1
                ? b.$slideTrack.children(".slick-slide").eq(a)
                : b.$slideTrack
                    .children(".slick-slide")
                    .eq(a + b.options.slidesToShow + 1)),
            (c =
              b.options.rtl === !0
                ? f[0]
                  ? -1 * (b.$slideTrack.width() - f[0].offsetLeft - f.width())
                  : 0
                : f[0]
                ? -1 * f[0].offsetLeft
                : 0),
            (c += (b.$list.width() - f.outerWidth()) / 2))),
        c
      );
    }),
    (b.prototype.getOption = b.prototype.slickGetOption =
      function (a) {
        var b = this;
        return b.options[a];
      }),
    (b.prototype.getNavigableIndexes = function () {
      var e,
        a = this,
        b = 0,
        c = 0,
        d = [];
      for (
        a.options.infinite === !1
          ? (e = a.slideCount)
          : ((b = -1 * a.options.slidesToScroll),
            (c = -1 * a.options.slidesToScroll),
            (e = 2 * a.slideCount));
        e > b;

      )
        d.push(b),
          (b = c + a.options.slidesToScroll),
          (c +=
            a.options.slidesToScroll <= a.options.slidesToShow
              ? a.options.slidesToScroll
              : a.options.slidesToShow);
      return d;
    }),
    (b.prototype.getSlick = function () {
      return this;
    }),
    (b.prototype.getSlideCount = function () {
      var c,
        d,
        e,
        b = this;
      return (
        (e =
          b.options.centerMode === !0
            ? b.slideWidth * Math.floor(b.options.slidesToShow / 2)
            : 0),
        b.options.swipeToSlide === !0
          ? (b.$slideTrack.find(".slick-slide").each(function (c, f) {
              return f.offsetLeft - e + a(f).outerWidth() / 2 > -1 * b.swipeLeft
                ? ((d = f), !1)
                : void 0;
            }),
            (c = Math.abs(a(d).attr("data-slick-index") - b.currentSlide) || 1))
          : b.options.slidesToScroll
      );
    }),
    (b.prototype.goTo = b.prototype.slickGoTo =
      function (a, b) {
        var c = this;
        c.changeSlide({ data: { message: "index", index: parseInt(a) } }, b);
      }),
    (b.prototype.init = function (b) {
      var c = this;
      a(c.$slider).hasClass("slick-initialized") ||
        (a(c.$slider).addClass("slick-initialized"),
        c.buildRows(),
        c.buildOut(),
        c.setProps(),
        c.startLoad(),
        c.loadSlider(),
        c.initializeEvents(),
        c.updateArrows(),
        c.updateDots(),
        c.checkResponsive(!0),
        c.focusHandler()),
        b && c.$slider.trigger("init", [c]),
        c.options.accessibility === !0 && c.initADA(),
        c.options.autoplay && ((c.paused = !1), c.autoPlay());
    }),
    (b.prototype.initADA = function () {
      var b = this;
      b.$slides
        .add(b.$slideTrack.find(".slick-cloned"))
        .attr({ "aria-hidden": "true", tabindex: "-1" })
        .find("a, input, button, select")
        .attr({ tabindex: "-1" }),
        b.$slideTrack.attr("role", "listbox"),
        b.$slides.not(b.$slideTrack.find(".slick-cloned")).each(function (c) {
          a(this).attr({
            role: "option",
            "aria-describedby": "slick-slide" + b.instanceUid + c,
          });
        }),
        null !== b.$dots &&
          b.$dots
            .attr("role", "tablist")
            .find("li")
            .each(function (c) {
              a(this).attr({
                role: "presentation",
                "aria-selected": "false",
                "aria-controls": "navigation" + b.instanceUid + c,
                id: "slick-slide" + b.instanceUid + c,
              });
            })
            .first()
            .attr("aria-selected", "true")
            .end()
            .find("button")
            .attr("role", "button")
            .end()
            .closest("div")
            .attr("role", "toolbar"),
        b.activateADA();
    }),
    (b.prototype.initArrowEvents = function () {
      var a = this;
      a.options.arrows === !0 &&
        a.slideCount > a.options.slidesToShow &&
        (a.$prevArrow
          .off("click.slick")
          .on("click.slick", { message: "previous" }, a.changeSlide),
        a.$nextArrow
          .off("click.slick")
          .on("click.slick", { message: "next" }, a.changeSlide));
    }),
    (b.prototype.initDotEvents = function () {
      var b = this;
      b.options.dots === !0 &&
        b.slideCount > b.options.slidesToShow &&
        a("li", b.$dots).on("click.slick", { message: "index" }, b.changeSlide),
        b.options.dots === !0 &&
          b.options.pauseOnDotsHover === !0 &&
          a("li", b.$dots)
            .on("mouseenter.slick", a.proxy(b.interrupt, b, !0))
            .on("mouseleave.slick", a.proxy(b.interrupt, b, !1));
    }),
    (b.prototype.initSlideEvents = function () {
      var b = this;
      b.options.pauseOnHover &&
        (b.$list.on("mouseenter.slick", a.proxy(b.interrupt, b, !0)),
        b.$list.on("mouseleave.slick", a.proxy(b.interrupt, b, !1)));
    }),
    (b.prototype.initializeEvents = function () {
      var b = this;
      b.initArrowEvents(),
        b.initDotEvents(),
        b.initSlideEvents(),
        b.$list.on(
          "touchstart.slick mousedown.slick",
          { action: "start" },
          b.swipeHandler
        ),
        b.$list.on(
          "touchmove.slick mousemove.slick",
          { action: "move" },
          b.swipeHandler
        ),
        b.$list.on(
          "touchend.slick mouseup.slick",
          { action: "end" },
          b.swipeHandler
        ),
        b.$list.on(
          "touchcancel.slick mouseleave.slick",
          { action: "end" },
          b.swipeHandler
        ),
        b.$list.on("click.slick", b.clickHandler),
        a(document).on(b.visibilityChange, a.proxy(b.visibility, b)),
        b.options.accessibility === !0 &&
          b.$list.on("keydown.slick", b.keyHandler),
        b.options.focusOnSelect === !0 &&
          a(b.$slideTrack).children().on("click.slick", b.selectHandler),
        a(window).on(
          "orientationchange.slick.slick-" + b.instanceUid,
          a.proxy(b.orientationChange, b)
        ),
        a(window).on(
          "resize.slick.slick-" + b.instanceUid,
          a.proxy(b.resize, b)
        ),
        a("[draggable!=true]", b.$slideTrack).on("dragstart", b.preventDefault),
        a(window).on("load.slick.slick-" + b.instanceUid, b.setPosition),
        a(document).on("ready.slick.slick-" + b.instanceUid, b.setPosition);
    }),
    (b.prototype.initUI = function () {
      var a = this;
      a.options.arrows === !0 &&
        a.slideCount > a.options.slidesToShow &&
        (a.$prevArrow.show(), a.$nextArrow.show()),
        a.options.dots === !0 &&
          a.slideCount > a.options.slidesToShow &&
          a.$dots.show();
    }),
    (b.prototype.keyHandler = function (a) {
      var b = this;
      a.target.tagName.match("TEXTAREA|INPUT|SELECT") ||
        (37 === a.keyCode && b.options.accessibility === !0
          ? b.changeSlide({
              data: { message: b.options.rtl === !0 ? "next" : "previous" },
            })
          : 39 === a.keyCode &&
            b.options.accessibility === !0 &&
            b.changeSlide({
              data: { message: b.options.rtl === !0 ? "previous" : "next" },
            }));
    }),
    (b.prototype.lazyLoad = function () {
      function g(c) {
        a("img[data-lazy]", c).each(function () {
          var c = a(this),
            d = a(this).attr("data-lazy"),
            e = document.createElement("img");
          (e.onload = function () {
            c.animate({ opacity: 0 }, 100, function () {
              c.attr("src", d).animate({ opacity: 1 }, 200, function () {
                c.removeAttr("data-lazy").removeClass("slick-loading");
              }),
                b.$slider.trigger("lazyLoaded", [b, c, d]);
            });
          }),
            (e.onerror = function () {
              c
                .removeAttr("data-lazy")
                .removeClass("slick-loading")
                .addClass("slick-lazyload-error"),
                b.$slider.trigger("lazyLoadError", [b, c, d]);
            }),
            (e.src = d);
        });
      }
      var c,
        d,
        e,
        f,
        b = this;
      b.options.centerMode === !0
        ? b.options.infinite === !0
          ? ((e = b.currentSlide + (b.options.slidesToShow / 2 + 1)),
            (f = e + b.options.slidesToShow + 2))
          : ((e = Math.max(
              0,
              b.currentSlide - (b.options.slidesToShow / 2 + 1)
            )),
            (f = 2 + (b.options.slidesToShow / 2 + 1) + b.currentSlide))
        : ((e = b.options.infinite
            ? b.options.slidesToShow + b.currentSlide
            : b.currentSlide),
          (f = Math.ceil(e + b.options.slidesToShow)),
          b.options.fade === !0 && (e > 0 && e--, f <= b.slideCount && f++)),
        (c = b.$slider.find(".slick-slide").slice(e, f)),
        g(c),
        b.slideCount <= b.options.slidesToShow
          ? ((d = b.$slider.find(".slick-slide")), g(d))
          : b.currentSlide >= b.slideCount - b.options.slidesToShow
          ? ((d = b.$slider
              .find(".slick-cloned")
              .slice(0, b.options.slidesToShow)),
            g(d))
          : 0 === b.currentSlide &&
            ((d = b.$slider
              .find(".slick-cloned")
              .slice(-1 * b.options.slidesToShow)),
            g(d));
    }),
    (b.prototype.loadSlider = function () {
      var a = this;
      a.setPosition(),
        a.$slideTrack.css({ opacity: 1 }),
        a.$slider.removeClass("slick-loading"),
        a.initUI(),
        "progressive" === a.options.lazyLoad && a.progressiveLazyLoad();
    }),
    (b.prototype.next = b.prototype.slickNext =
      function () {
        var a = this;
        a.changeSlide({ data: { message: "next" } });
      }),
    (b.prototype.orientationChange = function () {
      var a = this;
      a.checkResponsive(), a.setPosition();
    }),
    (b.prototype.pause = b.prototype.slickPause =
      function () {
        var a = this;
        a.autoPlayClear(), (a.paused = !0);
      }),
    (b.prototype.play = b.prototype.slickPlay =
      function () {
        var a = this;
        a.autoPlay(),
          (a.options.autoplay = !0),
          (a.paused = !1),
          (a.focussed = !1),
          (a.interrupted = !1);
      }),
    (b.prototype.postSlide = function (a) {
      var b = this;
      b.unslicked ||
        (b.$slider.trigger("afterChange", [b, a]),
        (b.animating = !1),
        b.setPosition(),
        (b.swipeLeft = null),
        b.options.autoplay && b.autoPlay(),
        b.options.accessibility === !0 && b.initADA());
    }),
    (b.prototype.prev = b.prototype.slickPrev =
      function () {
        var a = this;
        a.changeSlide({ data: { message: "previous" } });
      }),
    (b.prototype.preventDefault = function (a) {
      a.preventDefault();
    }),
    (b.prototype.progressiveLazyLoad = function (b) {
      b = b || 1;
      var e,
        f,
        g,
        c = this,
        d = a("img[data-lazy]", c.$slider);
      d.length
        ? ((e = d.first()),
          (f = e.attr("data-lazy")),
          (g = document.createElement("img")),
          (g.onload = function () {
            e
              .attr("src", f)
              .removeAttr("data-lazy")
              .removeClass("slick-loading"),
              c.options.adaptiveHeight === !0 && c.setPosition(),
              c.$slider.trigger("lazyLoaded", [c, e, f]),
              c.progressiveLazyLoad();
          }),
          (g.onerror = function () {
            3 > b
              ? setTimeout(function () {
                  c.progressiveLazyLoad(b + 1);
                }, 500)
              : (e
                  .removeAttr("data-lazy")
                  .removeClass("slick-loading")
                  .addClass("slick-lazyload-error"),
                c.$slider.trigger("lazyLoadError", [c, e, f]),
                c.progressiveLazyLoad());
          }),
          (g.src = f))
        : c.$slider.trigger("allImagesLoaded", [c]);
    }),
    (b.prototype.refresh = function (b) {
      var d,
        e,
        c = this;
      (e = c.slideCount - c.options.slidesToShow),
        !c.options.infinite && c.currentSlide > e && (c.currentSlide = e),
        c.slideCount <= c.options.slidesToShow && (c.currentSlide = 0),
        (d = c.currentSlide),
        c.destroy(!0),
        a.extend(c, c.initials, { currentSlide: d }),
        c.init(),
        b || c.changeSlide({ data: { message: "index", index: d } }, !1);
    }),
    (b.prototype.registerBreakpoints = function () {
      var c,
        d,
        e,
        b = this,
        f = b.options.responsive || null;
      if ("array" === a.type(f) && f.length) {
        b.respondTo = b.options.respondTo || "window";
        for (c in f)
          if (
            ((e = b.breakpoints.length - 1),
            (d = f[c].breakpoint),
            f.hasOwnProperty(c))
          ) {
            for (; e >= 0; )
              b.breakpoints[e] &&
                b.breakpoints[e] === d &&
                b.breakpoints.splice(e, 1),
                e--;
            b.breakpoints.push(d), (b.breakpointSettings[d] = f[c].settings);
          }
        b.breakpoints.sort(function (a, c) {
          return b.options.mobileFirst ? a - c : c - a;
        });
      }
    }),
    (b.prototype.reinit = function () {
      var b = this;
      (b.$slides = b.$slideTrack
        .children(b.options.slide)
        .addClass("slick-slide")),
        (b.slideCount = b.$slides.length),
        b.currentSlide >= b.slideCount &&
          0 !== b.currentSlide &&
          (b.currentSlide = b.currentSlide - b.options.slidesToScroll),
        b.slideCount <= b.options.slidesToShow && (b.currentSlide = 0),
        b.registerBreakpoints(),
        b.setProps(),
        b.setupInfinite(),
        b.buildArrows(),
        b.updateArrows(),
        b.initArrowEvents(),
        b.buildDots(),
        b.updateDots(),
        b.initDotEvents(),
        b.cleanUpSlideEvents(),
        b.initSlideEvents(),
        b.checkResponsive(!1, !0),
        b.options.focusOnSelect === !0 &&
          a(b.$slideTrack).children().on("click.slick", b.selectHandler),
        b.setSlideClasses(
          "number" == typeof b.currentSlide ? b.currentSlide : 0
        ),
        b.setPosition(),
        b.focusHandler(),
        (b.paused = !b.options.autoplay),
        b.autoPlay(),
        b.$slider.trigger("reInit", [b]);
    }),
    (b.prototype.resize = function () {
      var b = this;
      a(window).width() !== b.windowWidth &&
        (clearTimeout(b.windowDelay),
        (b.windowDelay = window.setTimeout(function () {
          (b.windowWidth = a(window).width()),
            b.checkResponsive(),
            b.unslicked || b.setPosition();
        }, 50)));
    }),
    (b.prototype.removeSlide = b.prototype.slickRemove =
      function (a, b, c) {
        var d = this;
        return (
          "boolean" == typeof a
            ? ((b = a), (a = b === !0 ? 0 : d.slideCount - 1))
            : (a = b === !0 ? --a : a),
          d.slideCount < 1 || 0 > a || a > d.slideCount - 1
            ? !1
            : (d.unload(),
              c === !0
                ? d.$slideTrack.children().remove()
                : d.$slideTrack.children(this.options.slide).eq(a).remove(),
              (d.$slides = d.$slideTrack.children(this.options.slide)),
              d.$slideTrack.children(this.options.slide).detach(),
              d.$slideTrack.append(d.$slides),
              (d.$slidesCache = d.$slides),
              void d.reinit())
        );
      }),
    (b.prototype.setCSS = function (a) {
      var d,
        e,
        b = this,
        c = {};
      b.options.rtl === !0 && (a = -a),
        (d = "left" == b.positionProp ? Math.ceil(a) + "px" : "0px"),
        (e = "top" == b.positionProp ? Math.ceil(a) + "px" : "0px"),
        (c[b.positionProp] = a),
        b.transformsEnabled === !1
          ? b.$slideTrack.css(c)
          : ((c = {}),
            b.cssTransitions === !1
              ? ((c[b.animType] = "translate(" + d + ", " + e + ")"),
                b.$slideTrack.css(c))
              : ((c[b.animType] = "translate3d(" + d + ", " + e + ", 0px)"),
                b.$slideTrack.css(c)));
    }),
    (b.prototype.setDimensions = function () {
      var a = this;
      a.options.vertical === !1
        ? a.options.centerMode === !0 &&
          a.$list.css({ padding: "0px " + a.options.centerPadding })
        : (a.$list.height(
            a.$slides.first().outerHeight(!0) * a.options.slidesToShow
          ),
          a.options.centerMode === !0 &&
            a.$list.css({ padding: a.options.centerPadding + " 0px" })),
        (a.listWidth = a.$list.width()),
        (a.listHeight = a.$list.height()),
        a.options.vertical === !1 && a.options.variableWidth === !1
          ? ((a.slideWidth = Math.ceil(a.listWidth / a.options.slidesToShow)),
            a.$slideTrack.width(
              Math.ceil(
                a.slideWidth * a.$slideTrack.children(".slick-slide").length
              )
            ))
          : a.options.variableWidth === !0
          ? a.$slideTrack.width(5e3 * a.slideCount)
          : ((a.slideWidth = Math.ceil(a.listWidth)),
            a.$slideTrack.height(
              Math.ceil(
                a.$slides.first().outerHeight(!0) *
                  a.$slideTrack.children(".slick-slide").length
              )
            ));
      var b = a.$slides.first().outerWidth(!0) - a.$slides.first().width();
      a.options.variableWidth === !1 &&
        a.$slideTrack.children(".slick-slide").width(a.slideWidth - b);
    }),
    (b.prototype.setFade = function () {
      var c,
        b = this;
      b.$slides.each(function (d, e) {
        (c = b.slideWidth * d * -1),
          b.options.rtl === !0
            ? a(e).css({
                position: "relative",
                right: c,
                top: 0,
                zIndex: b.options.zIndex - 2,
                opacity: 0,
              })
            : a(e).css({
                position: "relative",
                left: c,
                top: 0,
                zIndex: b.options.zIndex - 2,
                opacity: 0,
              });
      }),
        b.$slides
          .eq(b.currentSlide)
          .css({ zIndex: b.options.zIndex - 1, opacity: 1 });
    }),
    (b.prototype.setHeight = function () {
      var a = this;
      if (
        1 === a.options.slidesToShow &&
        a.options.adaptiveHeight === !0 &&
        a.options.vertical === !1
      ) {
        var b = a.$slides.eq(a.currentSlide).outerHeight(!0);
        a.$list.css("height", b);
      }
    }),
    (b.prototype.setOption = b.prototype.slickSetOption =
      function () {
        var c,
          d,
          e,
          f,
          h,
          b = this,
          g = !1;
        if (
          ("object" === a.type(arguments[0])
            ? ((e = arguments[0]), (g = arguments[1]), (h = "multiple"))
            : "string" === a.type(arguments[0]) &&
              ((e = arguments[0]),
              (f = arguments[1]),
              (g = arguments[2]),
              "responsive" === arguments[0] && "array" === a.type(arguments[1])
                ? (h = "responsive")
                : "undefined" != typeof arguments[1] && (h = "single")),
          "single" === h)
        )
          b.options[e] = f;
        else if ("multiple" === h)
          a.each(e, function (a, c) {
            b.options[a] = c;
          });
        else if ("responsive" === h)
          for (d in f)
            if ("array" !== a.type(b.options.responsive))
              b.options.responsive = [f[d]];
            else {
              for (c = b.options.responsive.length - 1; c >= 0; )
                b.options.responsive[c].breakpoint === f[d].breakpoint &&
                  b.options.responsive.splice(c, 1),
                  c--;
              b.options.responsive.push(f[d]);
            }
        g && (b.unload(), b.reinit());
      }),
    (b.prototype.setPosition = function () {
      var a = this;
      a.setDimensions(),
        a.setHeight(),
        a.options.fade === !1
          ? a.setCSS(a.getLeft(a.currentSlide))
          : a.setFade(),
        a.$slider.trigger("setPosition", [a]);
    }),
    (b.prototype.setProps = function () {
      var a = this,
        b = document.body.style;
      (a.positionProp = a.options.vertical === !0 ? "top" : "left"),
        "top" === a.positionProp
          ? a.$slider.addClass("slick-vertical")
          : a.$slider.removeClass("slick-vertical"),
        (void 0 !== b.WebkitTransition ||
          void 0 !== b.MozTransition ||
          void 0 !== b.msTransition) &&
          a.options.useCSS === !0 &&
          (a.cssTransitions = !0),
        a.options.fade &&
          ("number" == typeof a.options.zIndex
            ? a.options.zIndex < 3 && (a.options.zIndex = 3)
            : (a.options.zIndex = a.defaults.zIndex)),
        void 0 !== b.OTransform &&
          ((a.animType = "OTransform"),
          (a.transformType = "-o-transform"),
          (a.transitionType = "OTransition"),
          void 0 === b.perspectiveProperty &&
            void 0 === b.webkitPerspective &&
            (a.animType = !1)),
        void 0 !== b.MozTransform &&
          ((a.animType = "MozTransform"),
          (a.transformType = "-moz-transform"),
          (a.transitionType = "MozTransition"),
          void 0 === b.perspectiveProperty &&
            void 0 === b.MozPerspective &&
            (a.animType = !1)),
        void 0 !== b.webkitTransform &&
          ((a.animType = "webkitTransform"),
          (a.transformType = "-webkit-transform"),
          (a.transitionType = "webkitTransition"),
          void 0 === b.perspectiveProperty &&
            void 0 === b.webkitPerspective &&
            (a.animType = !1)),
        void 0 !== b.msTransform &&
          ((a.animType = "msTransform"),
          (a.transformType = "-ms-transform"),
          (a.transitionType = "msTransition"),
          void 0 === b.msTransform && (a.animType = !1)),
        void 0 !== b.transform &&
          a.animType !== !1 &&
          ((a.animType = "transform"),
          (a.transformType = "transform"),
          (a.transitionType = "transition")),
        (a.transformsEnabled =
          a.options.useTransform && null !== a.animType && a.animType !== !1);
    }),
    (b.prototype.setSlideClasses = function (a) {
      var c,
        d,
        e,
        f,
        b = this;
      (d = b.$slider
        .find(".slick-slide")
        .removeClass("slick-active slick-center slick-current")
        .attr("aria-hidden", "true")),
        b.$slides.eq(a).addClass("slick-current"),
        b.options.centerMode === !0
          ? ((c = Math.floor(b.options.slidesToShow / 2)),
            b.options.infinite === !0 &&
              (a >= c && a <= b.slideCount - 1 - c
                ? b.$slides
                    .slice(a - c, a + c + 1)
                    .addClass("slick-active")
                    .attr("aria-hidden", "false")
                : ((e = b.options.slidesToShow + a),
                  d
                    .slice(e - c + 1, e + c + 2)
                    .addClass("slick-active")
                    .attr("aria-hidden", "false")),
              0 === a
                ? d
                    .eq(d.length - 1 - b.options.slidesToShow)
                    .addClass("slick-center")
                : a === b.slideCount - 1 &&
                  d.eq(b.options.slidesToShow).addClass("slick-center")),
            b.$slides.eq(a).addClass("slick-center"))
          : a >= 0 && a <= b.slideCount - b.options.slidesToShow
          ? b.$slides
              .slice(a, a + b.options.slidesToShow)
              .addClass("slick-active")
              .attr("aria-hidden", "false")
          : d.length <= b.options.slidesToShow
          ? d.addClass("slick-active").attr("aria-hidden", "false")
          : ((f = b.slideCount % b.options.slidesToShow),
            (e = b.options.infinite === !0 ? b.options.slidesToShow + a : a),
            b.options.slidesToShow == b.options.slidesToScroll &&
            b.slideCount - a < b.options.slidesToShow
              ? d
                  .slice(e - (b.options.slidesToShow - f), e + f)
                  .addClass("slick-active")
                  .attr("aria-hidden", "false")
              : d
                  .slice(e, e + b.options.slidesToShow)
                  .addClass("slick-active")
                  .attr("aria-hidden", "false")),
        "ondemand" === b.options.lazyLoad && b.lazyLoad();
    }),
    (b.prototype.setupInfinite = function () {
      var c,
        d,
        e,
        b = this;
      if (
        (b.options.fade === !0 && (b.options.centerMode = !1),
        b.options.infinite === !0 &&
          b.options.fade === !1 &&
          ((d = null), b.slideCount > b.options.slidesToShow))
      ) {
        for (
          e =
            b.options.centerMode === !0
              ? b.options.slidesToShow + 1
              : b.options.slidesToShow,
            c = b.slideCount;
          c > b.slideCount - e;
          c -= 1
        )
          (d = c - 1),
            a(b.$slides[d])
              .clone(!0)
              .attr("id", "")
              .attr("data-slick-index", d - b.slideCount)
              .prependTo(b.$slideTrack)
              .addClass("slick-cloned");
        for (c = 0; e > c; c += 1)
          (d = c),
            a(b.$slides[d])
              .clone(!0)
              .attr("id", "")
              .attr("data-slick-index", d + b.slideCount)
              .appendTo(b.$slideTrack)
              .addClass("slick-cloned");
        b.$slideTrack
          .find(".slick-cloned")
          .find("[id]")
          .each(function () {
            a(this).attr("id", "");
          });
      }
    }),
    (b.prototype.interrupt = function (a) {
      var b = this;
      a || b.autoPlay(), (b.interrupted = a);
    }),
    (b.prototype.selectHandler = function (b) {
      var c = this,
        d = a(b.target).is(".slick-slide")
          ? a(b.target)
          : a(b.target).parents(".slick-slide"),
        e = parseInt(d.attr("data-slick-index"));
      return (
        e || (e = 0),
        c.slideCount <= c.options.slidesToShow
          ? (c.setSlideClasses(e), void c.asNavFor(e))
          : void c.slideHandler(e)
      );
    }),
    (b.prototype.slideHandler = function (a, b, c) {
      var d,
        e,
        f,
        g,
        j,
        h = null,
        i = this;
      return (
        (b = b || !1),
        (i.animating === !0 && i.options.waitForAnimate === !0) ||
        (i.options.fade === !0 && i.currentSlide === a) ||
        i.slideCount <= i.options.slidesToShow
          ? void 0
          : (b === !1 && i.asNavFor(a),
            (d = a),
            (h = i.getLeft(d)),
            (g = i.getLeft(i.currentSlide)),
            (i.currentLeft = null === i.swipeLeft ? g : i.swipeLeft),
            i.options.infinite === !1 &&
            i.options.centerMode === !1 &&
            (0 > a || a > i.getDotCount() * i.options.slidesToScroll)
              ? void (
                  i.options.fade === !1 &&
                  ((d = i.currentSlide),
                  c !== !0
                    ? i.animateSlide(g, function () {
                        i.postSlide(d);
                      })
                    : i.postSlide(d))
                )
              : i.options.infinite === !1 &&
                i.options.centerMode === !0 &&
                (0 > a || a > i.slideCount - i.options.slidesToScroll)
              ? void (
                  i.options.fade === !1 &&
                  ((d = i.currentSlide),
                  c !== !0
                    ? i.animateSlide(g, function () {
                        i.postSlide(d);
                      })
                    : i.postSlide(d))
                )
              : (i.options.autoplay && clearInterval(i.autoPlayTimer),
                (e =
                  0 > d
                    ? i.slideCount % i.options.slidesToScroll !== 0
                      ? i.slideCount - (i.slideCount % i.options.slidesToScroll)
                      : i.slideCount + d
                    : d >= i.slideCount
                    ? i.slideCount % i.options.slidesToScroll !== 0
                      ? 0
                      : d - i.slideCount
                    : d),
                (i.animating = !0),
                i.$slider.trigger("beforeChange", [i, i.currentSlide, e]),
                (f = i.currentSlide),
                (i.currentSlide = e),
                i.setSlideClasses(i.currentSlide),
                i.options.asNavFor &&
                  ((j = i.getNavTarget()),
                  (j = j.slick("getSlick")),
                  j.slideCount <= j.options.slidesToShow &&
                    j.setSlideClasses(i.currentSlide)),
                i.updateDots(),
                i.updateArrows(),
                i.options.fade === !0
                  ? (c !== !0
                      ? (i.fadeSlideOut(f),
                        i.fadeSlide(e, function () {
                          i.postSlide(e);
                        }))
                      : i.postSlide(e),
                    void i.animateHeight())
                  : void (c !== !0
                      ? i.animateSlide(h, function () {
                          i.postSlide(e);
                        })
                      : i.postSlide(e))))
      );
    }),
    (b.prototype.startLoad = function () {
      var a = this;
      a.options.arrows === !0 &&
        a.slideCount > a.options.slidesToShow &&
        (a.$prevArrow.hide(), a.$nextArrow.hide()),
        a.options.dots === !0 &&
          a.slideCount > a.options.slidesToShow &&
          a.$dots.hide(),
        a.$slider.addClass("slick-loading");
    }),
    (b.prototype.swipeDirection = function () {
      var a,
        b,
        c,
        d,
        e = this;
      return (
        (a = e.touchObject.startX - e.touchObject.curX),
        (b = e.touchObject.startY - e.touchObject.curY),
        (c = Math.atan2(b, a)),
        (d = Math.round((180 * c) / Math.PI)),
        0 > d && (d = 360 - Math.abs(d)),
        45 >= d && d >= 0
          ? e.options.rtl === !1
            ? "left"
            : "right"
          : 360 >= d && d >= 315
          ? e.options.rtl === !1
            ? "left"
            : "right"
          : d >= 135 && 225 >= d
          ? e.options.rtl === !1
            ? "right"
            : "left"
          : e.options.verticalSwiping === !0
          ? d >= 35 && 135 >= d
            ? "down"
            : "up"
          : "vertical"
      );
    }),
    (b.prototype.swipeEnd = function (a) {
      var c,
        d,
        b = this;
      if (
        ((b.dragging = !1),
        (b.interrupted = !1),
        (b.shouldClick = b.touchObject.swipeLength > 10 ? !1 : !0),
        void 0 === b.touchObject.curX)
      )
        return !1;
      if (
        (b.touchObject.edgeHit === !0 &&
          b.$slider.trigger("edge", [b, b.swipeDirection()]),
        b.touchObject.swipeLength >= b.touchObject.minSwipe)
      ) {
        switch ((d = b.swipeDirection())) {
          case "left":
          case "down":
            (c = b.options.swipeToSlide
              ? b.checkNavigable(b.currentSlide + b.getSlideCount())
              : b.currentSlide + b.getSlideCount()),
              (b.currentDirection = 0);
            break;
          case "right":
          case "up":
            (c = b.options.swipeToSlide
              ? b.checkNavigable(b.currentSlide - b.getSlideCount())
              : b.currentSlide - b.getSlideCount()),
              (b.currentDirection = 1);
        }
        "vertical" != d &&
          (b.slideHandler(c),
          (b.touchObject = {}),
          b.$slider.trigger("swipe", [b, d]));
      } else
        b.touchObject.startX !== b.touchObject.curX &&
          (b.slideHandler(b.currentSlide), (b.touchObject = {}));
    }),
    (b.prototype.swipeHandler = function (a) {
      var b = this;
      if (
        !(
          b.options.swipe === !1 ||
          ("ontouchend" in document && b.options.swipe === !1) ||
          (b.options.draggable === !1 && -1 !== a.type.indexOf("mouse"))
        )
      )
        switch (
          ((b.touchObject.fingerCount =
            a.originalEvent && void 0 !== a.originalEvent.touches
              ? a.originalEvent.touches.length
              : 1),
          (b.touchObject.minSwipe = b.listWidth / b.options.touchThreshold),
          b.options.verticalSwiping === !0 &&
            (b.touchObject.minSwipe = b.listHeight / b.options.touchThreshold),
          a.data.action)
        ) {
          case "start":
            b.swipeStart(a);
            break;
          case "move":
            b.swipeMove(a);
            break;
          case "end":
            b.swipeEnd(a);
        }
    }),
    (b.prototype.swipeMove = function (a) {
      var d,
        e,
        f,
        g,
        h,
        b = this;
      return (
        (h = void 0 !== a.originalEvent ? a.originalEvent.touches : null),
        !b.dragging || (h && 1 !== h.length)
          ? !1
          : ((d = b.getLeft(b.currentSlide)),
            (b.touchObject.curX = void 0 !== h ? h[0].pageX : a.clientX),
            (b.touchObject.curY = void 0 !== h ? h[0].pageY : a.clientY),
            (b.touchObject.swipeLength = Math.round(
              Math.sqrt(Math.pow(b.touchObject.curX - b.touchObject.startX, 2))
            )),
            b.options.verticalSwiping === !0 &&
              (b.touchObject.swipeLength = Math.round(
                Math.sqrt(
                  Math.pow(b.touchObject.curY - b.touchObject.startY, 2)
                )
              )),
            (e = b.swipeDirection()),
            "vertical" !== e
              ? (void 0 !== a.originalEvent &&
                  b.touchObject.swipeLength > 4 &&
                  a.preventDefault(),
                (g =
                  (b.options.rtl === !1 ? 1 : -1) *
                  (b.touchObject.curX > b.touchObject.startX ? 1 : -1)),
                b.options.verticalSwiping === !0 &&
                  (g = b.touchObject.curY > b.touchObject.startY ? 1 : -1),
                (f = b.touchObject.swipeLength),
                (b.touchObject.edgeHit = !1),
                b.options.infinite === !1 &&
                  ((0 === b.currentSlide && "right" === e) ||
                    (b.currentSlide >= b.getDotCount() && "left" === e)) &&
                  ((f = b.touchObject.swipeLength * b.options.edgeFriction),
                  (b.touchObject.edgeHit = !0)),
                b.options.vertical === !1
                  ? (b.swipeLeft = d + f * g)
                  : (b.swipeLeft =
                      d + f * (b.$list.height() / b.listWidth) * g),
                b.options.verticalSwiping === !0 && (b.swipeLeft = d + f * g),
                b.options.fade === !0 || b.options.touchMove === !1
                  ? !1
                  : b.animating === !0
                  ? ((b.swipeLeft = null), !1)
                  : void b.setCSS(b.swipeLeft))
              : void 0)
      );
    }),
    (b.prototype.swipeStart = function (a) {
      var c,
        b = this;
      return (
        (b.interrupted = !0),
        1 !== b.touchObject.fingerCount ||
        b.slideCount <= b.options.slidesToShow
          ? ((b.touchObject = {}), !1)
          : (void 0 !== a.originalEvent &&
              void 0 !== a.originalEvent.touches &&
              (c = a.originalEvent.touches[0]),
            (b.touchObject.startX = b.touchObject.curX =
              void 0 !== c ? c.pageX : a.clientX),
            (b.touchObject.startY = b.touchObject.curY =
              void 0 !== c ? c.pageY : a.clientY),
            void (b.dragging = !0))
      );
    }),
    (b.prototype.unfilterSlides = b.prototype.slickUnfilter =
      function () {
        var a = this;
        null !== a.$slidesCache &&
          (a.unload(),
          a.$slideTrack.children(this.options.slide).detach(),
          a.$slidesCache.appendTo(a.$slideTrack),
          a.reinit());
      }),
    (b.prototype.unload = function () {
      var b = this;
      a(".slick-cloned", b.$slider).remove(),
        b.$dots && b.$dots.remove(),
        b.$prevArrow &&
          b.htmlExpr.test(b.options.prevArrow) &&
          b.$prevArrow.remove(),
        b.$nextArrow &&
          b.htmlExpr.test(b.options.nextArrow) &&
          b.$nextArrow.remove(),
        b.$slides
          .removeClass("slick-slide slick-active slick-visible slick-current")
          .attr("aria-hidden", "true")
          .css("width", "");
    }),
    (b.prototype.unslick = function (a) {
      var b = this;
      b.$slider.trigger("unslick", [b, a]), b.destroy();
    }),
    (b.prototype.updateArrows = function () {
      var b,
        a = this;
      (b = Math.floor(a.options.slidesToShow / 2)),
        a.options.arrows === !0 &&
          a.slideCount > a.options.slidesToShow &&
          !a.options.infinite &&
          (a.$prevArrow
            .removeClass("slick-disabled")
            .attr("aria-disabled", "false"),
          a.$nextArrow
            .removeClass("slick-disabled")
            .attr("aria-disabled", "false"),
          0 === a.currentSlide
            ? (a.$prevArrow
                .addClass("slick-disabled")
                .attr("aria-disabled", "true"),
              a.$nextArrow
                .removeClass("slick-disabled")
                .attr("aria-disabled", "false"))
            : a.currentSlide >= a.slideCount - a.options.slidesToShow &&
              a.options.centerMode === !1
            ? (a.$nextArrow
                .addClass("slick-disabled")
                .attr("aria-disabled", "true"),
              a.$prevArrow
                .removeClass("slick-disabled")
                .attr("aria-disabled", "false"))
            : a.currentSlide >= a.slideCount - 1 &&
              a.options.centerMode === !0 &&
              (a.$nextArrow
                .addClass("slick-disabled")
                .attr("aria-disabled", "true"),
              a.$prevArrow
                .removeClass("slick-disabled")
                .attr("aria-disabled", "false")));
    }),
    (b.prototype.updateDots = function () {
      var a = this;
      null !== a.$dots &&
        (a.$dots
          .find("li")
          .removeClass("slick-active")
          .attr("aria-hidden", "true"),
        a.$dots
          .find("li")
          .eq(Math.floor(a.currentSlide / a.options.slidesToScroll))
          .addClass("slick-active")
          .attr("aria-hidden", "false"));
    }),
    (b.prototype.visibility = function () {
      var a = this;
      a.options.autoplay &&
        (document[a.hidden] ? (a.interrupted = !0) : (a.interrupted = !1));
    }),
    (a.fn.slick = function () {
      var f,
        g,
        a = this,
        c = arguments[0],
        d = Array.prototype.slice.call(arguments, 1),
        e = a.length;
      for (f = 0; e > f; f++)
        if (
          ("object" == typeof c || "undefined" == typeof c
            ? (a[f].slick = new b(a[f], c))
            : (g = a[f].slick[c].apply(a[f].slick, d)),
          "undefined" != typeof g)
        )
          return g;
      return a;
    });
});

/*!
 * HC-Sticky
 * =========
 * Version: 2.2.1
 * Author: Some Web Media
 * Author URL: http://somewebmedia.com
 * Plugin URL: https://github.com/somewebmedia/hc-sticky
 * Description: Cross-browser plugin that makes any element on your page visible while you scroll
 * License: MIT
 */
!(function (t, e) {
  "use strict";
  if ("object" == typeof module && "object" == typeof module.exports) {
    if (!t.document) throw new Error("HC-Sticky requires a browser to run.");
    module.exports = e(t);
  } else
    "function" == typeof define && define.amd
      ? define("hcSticky", [], e(t))
      : e(t);
})("undefined" != typeof window ? window : this, function (U) {
  "use strict";
  var Y = {
      top: 0,
      bottom: 0,
      bottomEnd: 0,
      innerTop: 0,
      innerSticker: null,
      stickyClass: "sticky",
      stickTo: null,
      followScroll: !0,
      responsive: null,
      mobileFirst: !1,
      onStart: null,
      onStop: null,
      onBeforeResize: null,
      onResize: null,
      resizeDebounce: 100,
      disable: !1,
      queries: null,
      queryFlow: "down",
    },
    $ = function (t, e, o) {
      console.log(
        "%c! HC Sticky:%c " +
          t +
          "%c " +
          o +
          " is now deprecated and will be removed. Use%c " +
          e +
          "%c instead.",
        "color: red",
        "color: darkviolet",
        "color: black",
        "color: darkviolet",
        "color: black"
      );
    },
    Q = U.document,
    X = function (n, f) {
      var o = this;
      if (("string" == typeof n && (n = Q.querySelector(n)), !n)) return !1;
      f.queries && $("queries", "responsive", "option"),
        f.queryFlow && $("queryFlow", "mobileFirst", "option");
      var p = {},
        d = X.Helpers,
        s = n.parentNode;
      "static" === d.getStyle(s, "position") && (s.style.position = "relative");
      var u = function () {
          var t =
            0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
          (d.isEmptyObject(t) && !d.isEmptyObject(p)) ||
            (p = Object.assign({}, Y, p, t));
        },
        t = function () {
          return p.disable;
        },
        e = function () {
          var t,
            e = p.responsive || p.queries;
          if (e) {
            var o = U.innerWidth;
            if (((t = f), (p = Object.assign({}, Y, t || {})).mobileFirst))
              for (var i in e) i <= o && !d.isEmptyObject(e[i]) && u(e[i]);
            else {
              var n = [];
              for (var s in e) {
                var r = {};
                (r[s] = e[s]), n.push(r);
              }
              for (var l = n.length - 1; 0 <= l; l--) {
                var a = n[l],
                  c = Object.keys(a)[0];
                o <= c && !d.isEmptyObject(a[c]) && u(a[c]);
              }
            }
          }
        },
        r = {
          css: {},
          position: null,
          stick: function () {
            var t =
              0 < arguments.length && void 0 !== arguments[0]
                ? arguments[0]
                : {};
            d.hasClass(n, p.stickyClass) ||
              (!1 === l.isAttached && l.attach(),
              (r.position = "fixed"),
              (n.style.position = "fixed"),
              (n.style.left = l.offsetLeft + "px"),
              (n.style.width = l.width),
              void 0 === t.bottom
                ? (n.style.bottom = "auto")
                : (n.style.bottom = t.bottom + "px"),
              void 0 === t.top
                ? (n.style.top = "auto")
                : (n.style.top = t.top + "px"),
              n.classList
                ? n.classList.add(p.stickyClass)
                : (n.className += " " + p.stickyClass),
              p.onStart && p.onStart.call(n, Object.assign({}, p)));
          },
          release: function () {
            var t =
              0 < arguments.length && void 0 !== arguments[0]
                ? arguments[0]
                : {};
            if (
              ((t.stop = t.stop || !1),
              !0 === t.stop ||
                "fixed" === r.position ||
                null === r.position ||
                !(
                  (void 0 === t.top && void 0 === t.bottom) ||
                  (void 0 !== t.top &&
                    (parseInt(d.getStyle(n, "top")) || 0) === t.top) ||
                  (void 0 !== t.bottom &&
                    (parseInt(d.getStyle(n, "bottom")) || 0) === t.bottom)
                ))
            ) {
              !0 === t.stop
                ? !0 === l.isAttached && l.detach()
                : !1 === l.isAttached && l.attach();
              var e = t.position || r.css.position;
              (r.position = e),
                (n.style.position = e),
                (n.style.left =
                  !0 === t.stop ? r.css.left : l.positionLeft + "px"),
                (n.style.width = "absolute" !== e ? r.css.width : l.width),
                void 0 === t.bottom
                  ? (n.style.bottom = !0 === t.stop ? "" : "auto")
                  : (n.style.bottom = t.bottom + "px"),
                void 0 === t.top
                  ? (n.style.top = !0 === t.stop ? "" : "auto")
                  : (n.style.top = t.top + "px"),
                n.classList
                  ? n.classList.remove(p.stickyClass)
                  : (n.className = n.className.replace(
                      new RegExp(
                        "(^|\\b)" +
                          p.stickyClass.split(" ").join("|") +
                          "(\\b|$)",
                        "gi"
                      ),
                      " "
                    )),
                p.onStop && p.onStop.call(n, Object.assign({}, p));
            }
          },
        },
        l = {
          el: Q.createElement("div"),
          offsetLeft: null,
          positionLeft: null,
          width: null,
          isAttached: !1,
          init: function () {
            for (var t in r.css) l.el.style[t] = r.css[t];
            l.el.style["z-index"] = "-1";
            var e = d.getStyle(n);
            (l.offsetLeft = d.offset(n).left - (parseInt(e.marginLeft) || 0)),
              (l.positionLeft = d.position(n).left),
              (l.width = d.getStyle(n, "width"));
          },
          attach: function () {
            s.insertBefore(l.el, n), (l.isAttached = !0);
          },
          detach: function () {
            (l.el = s.removeChild(l.el)), (l.isAttached = !1);
          },
        },
        a = void 0,
        c = void 0,
        g = void 0,
        m = void 0,
        h = void 0,
        v = void 0,
        y = void 0,
        b = void 0,
        S = void 0,
        w = void 0,
        k = void 0,
        E = void 0,
        x = void 0,
        L = void 0,
        T = void 0,
        j = void 0,
        O = void 0,
        C = void 0,
        i = function () {
          var t, e, o, i;
          (r.css =
            ((t = n),
            (e = d.getCascadedStyle(t)),
            (o = d.getStyle(t)),
            (i = {
              height: t.offsetHeight + "px",
              left: e.left,
              right: e.right,
              top: e.top,
              bottom: e.bottom,
              position: o.position,
              display: o.display,
              verticalAlign: o.verticalAlign,
              boxSizing: o.boxSizing,
              marginLeft: e.marginLeft,
              marginRight: e.marginRight,
              marginTop: e.marginTop,
              marginBottom: e.marginBottom,
              paddingLeft: e.paddingLeft,
              paddingRight: e.paddingRight,
            }),
            e.float && (i.float = e.float || "none"),
            e.cssFloat && (i.cssFloat = e.cssFloat || "none"),
            o.MozBoxSizing && (i.MozBoxSizing = o.MozBoxSizing),
            (i.width =
              "auto" !== e.width
                ? e.width
                : "border-box" === i.boxSizing ||
                  "border-box" === i.MozBoxSizing
                ? t.offsetWidth + "px"
                : o.width),
            i)),
            l.init(),
            (a = !(
              !p.stickTo ||
              !(
                "document" === p.stickTo ||
                (p.stickTo.nodeType && 9 === p.stickTo.nodeType) ||
                ("object" == typeof p.stickTo &&
                  p.stickTo instanceof
                    ("undefined" != typeof HTMLDocument
                      ? HTMLDocument
                      : Document))
              )
            )),
            (c = p.stickTo
              ? a
                ? Q
                : "string" == typeof p.stickTo
                ? Q.querySelector(p.stickTo)
                : p.stickTo
              : s),
            (T = (C = function () {
              var t =
                  n.offsetHeight +
                  (parseInt(r.css.marginTop) || 0) +
                  (parseInt(r.css.marginBottom) || 0),
                e = (T || 0) - t;
              return -1 <= e && e <= 1 ? T : t;
            })()),
            (m = (O = function () {
              return a
                ? Math.max(
                    Q.documentElement.clientHeight,
                    Q.body.scrollHeight,
                    Q.documentElement.scrollHeight,
                    Q.body.offsetHeight,
                    Q.documentElement.offsetHeight
                  )
                : c.offsetHeight;
            })()),
            (h = a ? 0 : d.offset(c).top),
            (v = p.stickTo ? (a ? 0 : d.offset(s).top) : h),
            (y = U.innerHeight),
            (j = n.offsetTop - (parseInt(r.css.marginTop) || 0)),
            (g = p.innerSticker
              ? "string" == typeof p.innerSticker
                ? Q.querySelector(p.innerSticker)
                : p.innerSticker
              : null),
            (b =
              isNaN(p.top) && -1 < p.top.indexOf("%")
                ? (parseFloat(p.top) / 100) * y
                : p.top),
            (S =
              isNaN(p.bottom) && -1 < p.bottom.indexOf("%")
                ? (parseFloat(p.bottom) / 100) * y
                : p.bottom),
            (w = g ? g.offsetTop : p.innerTop ? p.innerTop : 0),
            (k =
              isNaN(p.bottomEnd) && -1 < p.bottomEnd.indexOf("%")
                ? (parseFloat(p.bottomEnd) / 100) * y
                : p.bottomEnd),
            (E = h - b + w + j);
        },
        z = U.pageYOffset || Q.documentElement.scrollTop,
        N = 0,
        H = void 0,
        R = function () {
          (T = C()), (m = O()), (x = h + m - b - k), (L = y < T);
          var t = U.pageYOffset || Q.documentElement.scrollTop,
            e = Math.round(d.offset(n).top),
            o = e - t,
            i = void 0;
          (H = t < z ? "up" : "down"),
            (N = t - z),
            E < (z = t)
              ? x + b + (L ? S : 0) - (p.followScroll && L ? 0 : b) <=
                t +
                  T -
                  w -
                  (y - (E - w) < T - w && p.followScroll && 0 < (i = T - y - w)
                    ? i
                    : 0)
                ? r.release({
                    position: "absolute",
                    bottom: v + s.offsetHeight - x - b,
                  })
                : L && p.followScroll
                ? "down" === H
                  ? Math.floor(o + T + S) <= y
                    ? r.stick({ bottom: S })
                    : "fixed" === r.position &&
                      r.release({
                        position: "absolute",
                        top: e - b - E - N + w,
                      })
                  : Math.ceil(o + w) < 0 && "fixed" === r.position
                  ? r.release({ position: "absolute", top: e - b - E + w - N })
                  : t + b - w <= e && r.stick({ top: b - w })
                : r.stick({ top: b - w })
              : r.release({ stop: !0 });
        },
        A = !1,
        B = !1,
        I = function () {
          A && (d.event.unbind(U, "scroll", R), (A = !1));
        },
        q = function () {
          null !== n.offsetParent && "none" !== d.getStyle(n, "display")
            ? (i(),
              m <= T
                ? I()
                : (R(), A || (d.event.bind(U, "scroll", R), (A = !0))))
            : I();
        },
        F = function () {
          (n.style.position = ""),
            (n.style.left = ""),
            (n.style.top = ""),
            (n.style.bottom = ""),
            (n.style.width = ""),
            n.classList
              ? n.classList.remove(p.stickyClass)
              : (n.className = n.className.replace(
                  new RegExp(
                    "(^|\\b)" + p.stickyClass.split(" ").join("|") + "(\\b|$)",
                    "gi"
                  ),
                  " "
                )),
            (r.css = {}),
            !(r.position = null) === l.isAttached && l.detach();
        },
        M = function () {
          F(), e(), t() ? I() : q();
        },
        D = function () {
          p.onBeforeResize && p.onBeforeResize.call(n, Object.assign({}, p)),
            M(),
            p.onResize && p.onResize.call(n, Object.assign({}, p));
        },
        P = p.resizeDebounce ? d.debounce(D, p.resizeDebounce) : D,
        W = function () {
          B && (d.event.unbind(U, "resize", P), (B = !1)), I();
        },
        V = function () {
          B || (d.event.bind(U, "resize", P), (B = !0)), e(), t() ? I() : q();
        };
      (this.options = function (t) {
        return t ? p[t] : Object.assign({}, p);
      }),
        (this.refresh = M),
        (this.update = function (t) {
          u(t), (f = Object.assign({}, f, t || {})), M();
        }),
        (this.attach = V),
        (this.detach = W),
        (this.destroy = function () {
          W(), F();
        }),
        (this.triggerMethod = function (t, e) {
          "function" == typeof o[t] && o[t](e);
        }),
        (this.reinit = function () {
          $("reinit", "refresh", "method"), M();
        }),
        u(f),
        V(),
        d.event.bind(U, "load", M);
    };
  if (void 0 !== U.jQuery) {
    var i = U.jQuery,
      n = "hcSticky";
    i.fn.extend({
      hcSticky: function (e, o) {
        return this.length
          ? "options" === e
            ? i.data(this.get(0), n).options()
            : this.each(function () {
                var t = i.data(this, n);
                t
                  ? t.triggerMethod(e, o)
                  : ((t = new X(this, e)), i.data(this, n, t));
              })
          : this;
      },
    });
  }
  return (U.hcSticky = U.hcSticky || X), X;
}),
  (function (c) {
    "use strict";
    var t = c.hcSticky,
      f = c.document;
    "function" != typeof Object.assign &&
      Object.defineProperty(Object, "assign", {
        value: function (t, e) {
          if (null == t)
            throw new TypeError("Cannot convert undefined or null to object");
          for (var o = Object(t), i = 1; i < arguments.length; i++) {
            var n = arguments[i];
            if (null != n)
              for (var s in n)
                Object.prototype.hasOwnProperty.call(n, s) && (o[s] = n[s]);
          }
          return o;
        },
        writable: !0,
        configurable: !0,
      }),
      Array.prototype.forEach ||
        (Array.prototype.forEach = function (t) {
          var e, o;
          if (null == this) throw new TypeError("this is null or not defined");
          var i = Object(this),
            n = i.length >>> 0;
          if ("function" != typeof t)
            throw new TypeError(t + " is not a function");
          for (1 < arguments.length && (e = arguments[1]), o = 0; o < n; ) {
            var s;
            o in i && ((s = i[o]), t.call(e, s, o, i)), o++;
          }
        });
    var e = (function () {
        var t = f.documentElement,
          e = function () {};
        function i(t) {
          var e = c.event;
          return (e.target = e.target || e.srcElement || t), e;
        }
        t.addEventListener
          ? (e = function (t, e, o) {
              t.addEventListener(e, o, !1);
            })
          : t.attachEvent &&
            (e = function (e, t, o) {
              (e[t + o] = o.handleEvent
                ? function () {
                    var t = i(e);
                    o.handleEvent.call(o, t);
                  }
                : function () {
                    var t = i(e);
                    o.call(e, t);
                  }),
                e.attachEvent("on" + t, e[t + o]);
            });
        var o = function () {};
        return (
          t.removeEventListener
            ? (o = function (t, e, o) {
                t.removeEventListener(e, o, !1);
              })
            : t.detachEvent &&
              (o = function (e, o, i) {
                e.detachEvent("on" + o, e[o + i]);
                try {
                  delete e[o + i];
                } catch (t) {
                  e[o + i] = void 0;
                }
              }),
          { bind: e, unbind: o }
        );
      })(),
      r = function (t, e) {
        return c.getComputedStyle
          ? e
            ? f.defaultView.getComputedStyle(t, null).getPropertyValue(e)
            : f.defaultView.getComputedStyle(t, null)
          : t.currentStyle
          ? e
            ? t.currentStyle[
                e.replace(/-\w/g, function (t) {
                  return t.toUpperCase().replace("-", "");
                })
              ]
            : t.currentStyle
          : void 0;
      },
      l = function (t) {
        var e = t.getBoundingClientRect(),
          o = c.pageYOffset || f.documentElement.scrollTop,
          i = c.pageXOffset || f.documentElement.scrollLeft;
        return { top: e.top + o, left: e.left + i };
      };
    t.Helpers = {
      isEmptyObject: function (t) {
        for (var e in t) return !1;
        return !0;
      },
      debounce: function (i, n, s) {
        var r = void 0;
        return function () {
          var t = this,
            e = arguments,
            o = s && !r;
          clearTimeout(r),
            (r = setTimeout(function () {
              (r = null), s || i.apply(t, e);
            }, n)),
            o && i.apply(t, e);
        };
      },
      hasClass: function (t, e) {
        return t.classList
          ? t.classList.contains(e)
          : new RegExp("(^| )" + e + "( |$)", "gi").test(t.className);
      },
      offset: l,
      position: function (t) {
        var e = t.offsetParent,
          o = l(e),
          i = l(t),
          n = r(e),
          s = r(t);
        return (
          (o.top += parseInt(n.borderTopWidth) || 0),
          (o.left += parseInt(n.borderLeftWidth) || 0),
          {
            top: i.top - o.top - (parseInt(s.marginTop) || 0),
            left: i.left - o.left - (parseInt(s.marginLeft) || 0),
          }
        );
      },
      getStyle: r,
      getCascadedStyle: function (t) {
        var e = t.cloneNode(!0);
        (e.style.display = "none"),
          Array.prototype.slice
            .call(e.querySelectorAll('input[type="radio"]'))
            .forEach(function (t) {
              t.removeAttribute("name");
            }),
          t.parentNode.insertBefore(e, t.nextSibling);
        var o = void 0;
        e.currentStyle
          ? (o = e.currentStyle)
          : c.getComputedStyle && (o = f.defaultView.getComputedStyle(e, null));
        var i = {};
        for (var n in o)
          !isNaN(n) ||
            ("string" != typeof o[n] && "number" != typeof o[n]) ||
            (i[n] = o[n]);
        if (Object.keys(i).length < 3)
          for (var s in ((i = {}), o))
            isNaN(s) ||
              (i[
                o[s].replace(/-\w/g, function (t) {
                  return t.toUpperCase().replace("-", "");
                })
              ] = o.getPropertyValue(o[s]));
        if (
          (i.margin || "auto" !== i.marginLeft
            ? i.margin ||
              i.marginLeft !== i.marginRight ||
              i.marginLeft !== i.marginTop ||
              i.marginLeft !== i.marginBottom ||
              (i.margin = i.marginLeft)
            : (i.margin = "auto"),
          !i.margin && "0px" === i.marginLeft && "0px" === i.marginRight)
        ) {
          var r = t.offsetLeft - t.parentNode.offsetLeft,
            l = r - (parseInt(i.left) || 0) - (parseInt(i.right) || 0),
            a =
              t.parentNode.offsetWidth -
              t.offsetWidth -
              r -
              (parseInt(i.right) || 0) +
              (parseInt(i.left) || 0) -
              l;
          (0 !== a && 1 !== a) || (i.margin = "auto");
        }
        return e.parentNode.removeChild(e), (e = null), i;
      },
      event: e,
    };
  })(window);

/*
 * slide-nav 1.0.1
 * ES6 Vanilla.js navigation plugin to simple use on one-page websites.
 * https://github.com/qmixi/slide-nav
 *
 * Copyright (C) 2017 - A project by Piotr Kumorek
 * Released under the MIT license.
 */

("use strict");
function _classCallCheck(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
var _createClass = (function () {
    function e(e, t) {
      for (var o = 0; o < t.length; o++) {
        var r = t[o];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(e, r.key, r);
      }
    }
    return function (t, o, r) {
      return o && e(t.prototype, o), r && e(t, r), t;
    };
  })(),
  SlideNav = (function () {
    function e(t) {
      if ((_classCallCheck(this, e), !t)) var t = {};
      (this.activeClass = t.activeClass || "active"),
        (this.toggleButtonSelector = t.toggleButtonSelector || !1),
        (this.toggleBoxSelector = t.toggleBoxSelector || !1),
        (this.speed = t.speed > 0 ? t.speed : 70),
        (this.hideAfterSelect = t.hideBoxAfterSelect || !0),
        (this.changeHash = t.changeHash || !1),
        (this.navBoxToggleClass = t.navBoxToggleClass || !1),
        this.init();
    }
    return (
      _createClass(e, [
        {
          key: "init",
          value: function () {
            (this.scrollDoc =
              document.scrollingElement || document.documentElement),
              this.getElements(),
              this.observe(),
              this.setActiveAnchor();
          },
        },
        {
          key: "getElements",
          value: function () {
            (this.toggleButton = document.querySelector(
              this.toggleButtonSelector
            )),
              this.toggleButton && (this.opened = !1),
              (this.toggleBoxes = document.querySelectorAll(
                this.toggleBoxSelector
              )),
              (this.navAnchors = document.querySelectorAll(
                'a:not([target="_blank"])'
              ));
          },
        },
        {
          key: "observe",
          value: function () {
            var e = this;
            window.addEventListener("click", function (t) {
              !e.opened ||
                e.isClosestElement(t.target, e.toggleButton) ||
                e.isBoxNavTarget(t.target) ||
                e.hideNavBox();
            }),
              this.toggleButton &&
                this.toggleButton.addEventListener("click", function (t) {
                  setTimeout(function () {
                    e.opened ? e.hideNavBox() : e.showNavBox();
                  });
                });
            var t = !0,
              o = !1,
              r = void 0;
            try {
              for (
                var n, l = this.navAnchors[Symbol.iterator]();
                !(t = (n = l.next()).done);
                t = !0
              ) {
                var i = n.value;
                i.addEventListener("click", function (t) {
                  t.preventDefault();
                  var o = e.getHash(t.currentTarget.href);
                  !e.goToSection(o) &&
                    t.currentTarget.href &&
                    e.goToUrl(t.currentTarget.href);
                });
              }
            } catch (e) {
              (o = !0), (r = e);
            } finally {
              try {
                !t && l.return && l.return();
              } finally {
                if (o) throw r;
              }
            }
            window.addEventListener("scroll", function () {
              e.setActiveAnchor();
            });
          },
        },
        {
          key: "setActiveAnchor",
          value: function () {
            var e = !0,
              t = !1,
              o = void 0;
            try {
              for (
                var r, n = this.navAnchors[Symbol.iterator]();
                !(e = (r = n.next()).done);
                e = !0
              ) {
                var l = r.value,
                  i = this.getHash(l.href),
                  s = this.getSection(i),
                  a = this.scrollDoc.scrollTop,
                  c = this.scrollDoc.scrollHeight;
                if (
                  s &&
                  ((s.offsetTop <= a && s.offsetTop + s.offsetHeight > a) ||
                    a + window.innerHeight == c)
                ) {
                  var u = !0,
                    h = !1,
                    v = void 0;
                  try {
                    for (
                      var f, g = this.navAnchors[Symbol.iterator]();
                      !(u = (f = g.next()).done);
                      u = !0
                    ) {
                      var d = f.value;
                      d.href != l.href && d.classList.remove("active");
                    }
                  } catch (e) {
                    (h = !0), (v = e);
                  } finally {
                    try {
                      !u && g.return && g.return();
                    } finally {
                      if (h) throw v;
                    }
                  }
                  l.classList.add("active");
                }
              }
            } catch (e) {
              (t = !0), (o = e);
            } finally {
              try {
                !e && n.return && n.return();
              } finally {
                if (t) throw o;
              }
            }
          },
        },
        {
          key: "goToSection",
          value: function (e) {
            var t = this.getSection(e);
            if (t) {
              var o = t.offsetTop;
              return (
                this.scrollTo(o, this.speed),
                this.hideAfterSelect && this.hideNavBox(),
                this.changeHash && history.pushState({}, null, "#" + e),
                !0
              );
            }
            return !1;
          },
        },
        {
          key: "scrollTo",
          value: function (e, t) {
            var o = this,
              r = e - this.scrollDoc.scrollTop,
              n = (r / t) * 1;
            t <= 0 ||
              setTimeout(function () {
                (o.scrollDoc.scrollTop = o.scrollDoc.scrollTop + n),
                  o.scrollDoc.scrollTop != e && o.scrollTo(e, t - 1);
              }, 1);
          },
        },
        {
          key: "goToUrl",
          value: function (e) {
            return (window.location = e);
          },
        },
        {
          key: "getSection",
          value: function (e) {
            if (e) {
              var t = "#" + e;
              return document.querySelector(t);
            }
            return !1;
          },
        },
        {
          key: "getHash",
          value: function (e) {
            return e.split("#")[1];
          },
        },
        {
          key: "isBoxNavTarget",
          value: function (e) {
            var t = !1,
              o = !0,
              r = !1,
              n = void 0;
            try {
              for (
                var l, i = this.toggleBoxes[Symbol.iterator]();
                !(o = (l = i.next()).done);
                o = !0
              ) {
                var s = l.value;
                this.isClosestElement(e, s) && (t = !0);
              }
            } catch (e) {
              (r = !0), (n = e);
            } finally {
              try {
                !o && i.return && i.return();
              } finally {
                if (r) throw n;
              }
            }
            return t;
          },
        },
        {
          key: "isClosestElement",
          value: function (e, t) {
            for (; t != e; ) if (((e = e.parentNode), !e)) return !1;
            return !0;
          },
        },
        {
          key: "hideNavBox",
          value: function () {
            var e = !0,
              t = !1,
              o = void 0;
            try {
              for (
                var r, n = this.toggleBoxes[Symbol.iterator]();
                !(e = (r = n.next()).done);
                e = !0
              ) {
                var l = r.value;
                this.navBoxToggleClass
                  ? l.classList.remove(this.navBoxToggleClass)
                  : (l.style.display = "none");
              }
            } catch (e) {
              (t = !0), (o = e);
            } finally {
              try {
                !e && n.return && n.return();
              } finally {
                if (t) throw o;
              }
            }
            this.opened = !1;
          },
        },
        {
          key: "showNavBox",
          value: function () {
            var e = !0,
              t = !1,
              o = void 0;
            try {
              for (
                var r, n = this.toggleBoxes[Symbol.iterator]();
                !(e = (r = n.next()).done);
                e = !0
              ) {
                var l = r.value;
                this.navBoxToggleClass
                  ? l.classList.add(this.navBoxToggleClass)
                  : (l.style.display = "block");
              }
            } catch (e) {
              (t = !0), (o = e);
            } finally {
              try {
                !e && n.return && n.return();
              } finally {
                if (t) throw o;
              }
            }
            this.opened = !0;
          },
        },
      ]),
      e
    );
  })();

/* Stellar Nav - jQuery Menu */
!(function (u) {
  u.fn.stellarNav = function (n, r, h) {
    (nav = u(this)), (r = u(window).width());
    var f = u.extend(
      {
        theme: "plain",
        breakpoint: 768,
        menuLabel: "Menu",
        sticky: !1,
        position: "static",
        openingSpeed: 250,
        closingDelay: 250,
        showArrows: !0,
        phoneBtn: "",
        phoneLabel: "Call Us",
        locationBtn: "",
        locationLabel: "Location",
        closeBtn: !1,
        closeLabel: "Close",
        mobileMode: !1,
        scrollbarFix: !1,
      },
      n
    );
    return this.each(function () {
      if (
        (("light" != f.theme && "dark" != f.theme) || nav.addClass(f.theme),
        f.breakpoint && (h = f.breakpoint),
        f.menuLabel ? (menuLabel = f.menuLabel) : (menuLabel = ""),
        f.phoneLabel ? (phoneLabel = f.phoneLabel) : (phoneLabel = ""),
        f.locationLabel
          ? (locationLabel = f.locationLabel)
          : (locationLabel = ""),
        f.closeLabel ? (closeLabel = f.closeLabel) : (closeLabel = ""),
        f.phoneBtn && f.locationBtn)
      )
        var n = "third";
      else if (f.phoneBtn || f.locationBtn) n = "half";
      else n = "full";
      if (
        ("right" == f.position || "left" == f.position
          ? nav.prepend(
              '<a href="#" class="menu-toggle"><span class="bars"><span></span><span></span><span></span></span> ' +
                menuLabel +
                "</a>"
            )
          : nav.prepend(
              '<a href="#" class="menu-toggle ' +
                n +
                '"><span class="bars"><span></span><span></span><span></span></span> ' +
                menuLabel +
                "</a>"
            ),
        f.phoneBtn && "right" != f.position && "left" != f.position)
      ) {
        var e =
          '<a href="tel:' +
          f.phoneBtn +
          '" class="call-btn-mobile ' +
          n +
          '"><svg id="icon-phone"></svg> <span>' +
          phoneLabel +
          "</span></a>";
        nav.find("a.menu-toggle").after(e);
      }
      if (f.locationBtn && "right" != f.position && "left" != f.position) {
        e =
          '<a href="' +
          f.locationBtn +
          '" class="location-btn-mobile ' +
          n +
          '" target="_blank"><svg id="icon-location"></svg> <span>' +
          locationLabel +
          "</span></a>";
        nav.find("a.menu-toggle").after(e);
      }
      if (
        (f.sticky &&
          ((navPos = nav.offset().top),
          h <= r &&
            u(window).on("scroll", function () {
              u(window).scrollTop() > navPos
                ? nav.addClass("fixed")
                : nav.removeClass("fixed");
            })),
        "top" == f.position && nav.addClass("top"),
        "left" == f.position || "right" == f.position)
      ) {
        var i =
            '<a href="#" class="close-menu ' +
            n +
            '"><span class="icon-close"></span>' +
            closeLabel +
            "</a>",
          s =
            '<a href="tel:' +
            f.phoneBtn +
            '" class="call-btn-mobile ' +
            n +
            '"><svg id="icon-phone"></svg></a>',
          t =
            '<a href="' +
            f.locationBtn +
            '" class="location-btn-mobile ' +
            n +
            '" target="_blank"><svg id="icon-location"></svg></i></a>';
        nav.find("ul:first").prepend(i),
          f.locationBtn && nav.find("ul:first").prepend(t),
          f.phoneBtn && nav.find("ul:first").prepend(s);
      }
      "right" == f.position && nav.addClass("right"),
        "left" == f.position && nav.addClass("left"),
        f.showArrows || nav.addClass("hide-arrows"),
        f.closeBtn &&
          "right" != f.position &&
          "left" != f.position &&
          nav
            .find("ul:first")
            .append(
              '<li><a href="#" class="close-menu"><span class="icon-close"></span> ' +
                closeLabel +
                "</a></li>"
            ),
        f.scrollbarFix && u("body").addClass("stellarnav-noscroll-x");
      var a = document.getElementById("icon-phone");
      if (a) {
        a.setAttribute("viewBox", "0 0 480 480");
        var l = document.createElementNS("http://www.w3.org/2000/svg", "path");
        l.setAttribute(
          "d",
          "M340.273,275.083l-53.755-53.761c-10.707-10.664-28.438-10.34-39.518,0.744l-27.082,27.076 c-1.711-0.943-3.482-1.928-5.344-2.973c-17.102-9.476-40.509-22.464-65.14-47.113c-24.704-24.701-37.704-48.144-47.209-65.257     c-1.003-1.813-1.964-3.561-2.913-5.221l18.176-18.149l8.936-8.947c11.097-11.1,11.403-28.826,0.721-39.521L73.39,8.194 C62.708-2.486,44.969-2.162,33.872,8.938l-15.15,15.237l0.414,0.411c-5.08,6.482-9.325,13.958-12.484,22.02     C3.74,54.28,1.927,61.603,1.098,68.941C-6,127.785,20.89,181.564,93.866,254.541c100.875,100.868,182.167,93.248,185.674,92.876 c7.638-0.913,14.958-2.738,22.397-5.627c7.992-3.122,15.463-7.361,21.941-12.43l0.331,0.294l15.348-15.029     C350.631,303.527,350.95,285.795,340.273,275.083z"
        ),
          a.appendChild(l);
      }
      var o = document.getElementById("icon-location");
      if (o) {
        o.setAttribute("viewBox", "0 0 480 480");
        var d = document.createElementNS("http://www.w3.org/2000/svg", "path");
        d.setAttribute(
          "d",
          "M322.621,42.825C294.073,14.272,259.619,0,219.268,0c-40.353,0-74.803,14.275-103.353,42.825 c-28.549,28.549-42.825,63-42.825,103.353c0,20.749,3.14,37.782,9.419,51.106l104.21,220.986   c2.856,6.276,7.283,11.225,13.278,14.838c5.996,3.617,12.419,5.428,19.273,5.428c6.852,0,13.278-1.811,19.273-5.428 c5.996-3.613,10.513-8.562,13.559-14.838l103.918-220.986c6.282-13.324,9.424-30.358,9.424-51.106 C365.449,105.825,351.176,71.378,322.621,42.825z M270.942,197.855c-14.273,14.272-31.497,21.411-51.674,21.411 s-37.401-7.139-51.678-21.411c-14.275-14.277-21.414-31.501-21.414-51.678c0-20.175,7.139-37.402,21.414-51.675 c14.277-14.275,31.504-21.414,51.678-21.414c20.177,0,37.401,7.139,51.674,21.414c14.274,14.272,21.413,31.5,21.413,51.675 C292.355,166.352,285.217,183.575,270.942,197.855z"
        ),
          o.appendChild(d);
      }
      u(".menu-toggle, .stellarnav-open").on("click", function (n) {
        n.preventDefault(),
          "left" == f.position || "right" == f.position
            ? (nav.find("ul:first").stop(!0, !0).fadeToggle(f.openingSpeed),
              nav.toggleClass("active"),
              nav.hasClass("active") &&
                nav.hasClass("mobile") &&
                u(document).on("click", function (n) {
                  nav.hasClass("mobile") &&
                    (u(n.target).closest(nav).length ||
                      (nav
                        .find("ul:first")
                        .stop(!0, !0)
                        .fadeOut(f.openingSpeed),
                      nav.removeClass("active")));
                }))
            : (nav.find("ul:first").stop(!0, !0).slideToggle(f.openingSpeed),
              nav.toggleClass("active"));
      }),
        u(".close-menu, .stellarnav-close").on("click", function () {
          nav.removeClass("active"),
            "left" == f.position || "right" == f.position
              ? nav.find("ul:first").stop(!0, !0).fadeToggle(f.openingSpeed)
              : nav
                  .find("ul:first")
                  .stop(!0, !0)
                  .slideUp(f.openingSpeed)
                  .toggleClass("active");
        }),
        nav.find("li a").each(function () {
          0 < u(this).next().length &&
            u(this)
              .parent("li")
              .addClass("has-sub")
              .append(
                '<a class="dd-toggle" href="#"><span class="icon-plus"></span></a>'
              );
        }),
        nav.find("li .dd-toggle").on("click", function (n) {
          n.preventDefault(),
            u(this)
              .parent("li")
              .children("ul")
              .stop(!0, !0)
              .slideToggle(f.openingSpeed),
            u(this).parent("li").toggleClass("open");
        });
      var c = function () {
        nav.find("li").off("mouseenter"), nav.find("li").off("mouseleave");
      };
      parentItems = nav.find("> ul > li");
      function p() {
        window.innerWidth <= h || f.mobileMode
          ? (c(),
            nav.addClass("mobile"),
            nav.removeClass("desktop"),
            !nav.hasClass("active") &&
              nav.find("ul:first").is(":visible") &&
              nav.find("ul:first").hide(),
            nav.find("li.mega").each(function () {
              u(this).find("ul").first().removeAttr("style"),
                u(this).find("ul").first().children().removeAttr("style");
            }))
          : (nav.addClass("desktop"),
            nav.removeClass("mobile"),
            nav.hasClass("active") && nav.removeClass("active"),
            !nav.hasClass("active") &&
              nav.find("ul:first").is(":hidden") &&
              nav.find("ul:first").show(),
            u("li.open").removeClass("open").find("ul:visible").hide(),
            c(),
            u(parentItems).each(function () {
              u(this).hasClass("mega")
                ? (u(this).on("mouseenter", function () {
                    u(this)
                      .find("ul")
                      .first()
                      .stop(!0, !0)
                      .slideDown(f.openingSpeed);
                  }),
                  u(this).on("mouseleave", function () {
                    u(this)
                      .find("ul")
                      .first()
                      .stop(!0, !0)
                      .slideUp(f.openingSpeed);
                  }))
                : (u(this).on("mouseenter", function () {
                    u(this)
                      .children("ul")
                      .stop(!0, !0)
                      .slideDown(f.openingSpeed);
                  }),
                  u(this).on("mouseleave", function () {
                    u(this)
                      .children("ul")
                      .stop(!0, !0)
                      .delay(f.closingDelay)
                      .slideUp(f.openingSpeed);
                  }),
                  u(this)
                    .find("li.has-sub")
                    .on("mouseenter", function () {
                      u(this)
                        .children("ul")
                        .stop(!0, !0)
                        .slideDown(f.openingSpeed);
                    }),
                  u(this)
                    .find("li.has-sub")
                    .on("mouseleave", function () {
                      u(this)
                        .children("ul")
                        .stop(!0, !0)
                        .delay(f.closingDelay)
                        .slideUp(f.openingSpeed);
                    }));
            }),
            (navWidth = 0),
            u(parentItems).each(function () {
              (navWidth += u(this)[0].getBoundingClientRect().width),
                (navWidth = Math.round(navWidth)),
                u(this).hasClass("mega") &&
                  (u(this)
                    .find("ul")
                    .first()
                    .css({ left: 0, right: 0, margin: "0px auto" }),
                  (numCols = u(this).attr("data-columns")),
                  2 == numCols
                    ? u(this).find("li.has-sub").width("50%")
                    : 3 == numCols
                    ? u(this).find("ul").first().children().width("33.33%")
                    : 4 == numCols
                    ? u(this).find("ul").first().children().width("25%")
                    : 5 == numCols
                    ? u(this).find("ul").first().children().width("20%")
                    : 6 == numCols
                    ? u(this).find("ul").first().children().width("16.66%")
                    : 7 == numCols
                    ? u(this).find("ul").first().children().width("14.28%")
                    : 8 == numCols
                    ? u(this).find("ul").first().children().width("12.5%")
                    : u(this).find("ul").first().children().width("25%"));
            }),
            parentItems.hasClass("mega") &&
              nav.find("li.mega > ul").css({ "max-width": navWidth }));
      }
      p(),
        u(window).on("resize", function () {
          p();
        });
    });
  };
})(jQuery);

/* Chocolat-1.0.4 */
/* jQuery plugin for lightbox */
!(function () {
  "use strict";
  let e = void 0;
  function t(e, t) {
    return new Promise((s) => {
      const i = () => {
        t.removeEventListener("transitionend", i), s();
      };
      t.addEventListener("transitionend", i);
      const l = t.getAttribute("class"),
        n = t.getAttribute("style");
      e(),
        l === t.getAttribute("class") && n === t.getAttribute("style") && i(),
        0 === parseFloat(getComputedStyle(t).transitionDuration) && i();
    });
  }
  function s({ src: e, srcset: t, sizes: s }) {
    const i = new Image();
    return (
      (i.src = e),
      t && (i.srcset = t),
      s && (i.sizes = s),
      "decode" in i
        ? new Promise((e, t) => {
            i.decode()
              .then(() => {
                e(i);
              })
              .catch(() => {
                t(i);
              });
          })
        : new Promise((e, t) => {
            (i.onload = e(i)), (i.onerror = t(i));
          })
    );
  }
  function i(e) {
    let t, s;
    const {
        imgHeight: i,
        imgWidth: l,
        containerHeight: n,
        containerWidth: a,
        canvasWidth: o,
        canvasHeight: c,
        imageSize: h,
      } = e,
      r = i / l;
    return (
      "cover" == h
        ? r < n / a
          ? (s = (t = n) / r)
          : (t = (s = a) * r)
        : "native" == h
        ? ((t = i), (s = l))
        : (r > c / o ? (s = (t = c) / r) : (t = (s = o) * r),
          "scale-down" === h && (s >= l || t >= i) && ((s = l), (t = i))),
      { height: t, width: s }
    );
  }
  function l(e) {
    return e.requestFullscreen
      ? e.requestFullscreen()
      : e.webkitRequestFullscreen
      ? e.webkitRequestFullscreen()
      : e.msRequestFullscreen
      ? e.msRequestFullscreen()
      : Promise.reject();
  }
  function n() {
    return document.exitFullscreen
      ? document.exitFullscreen()
      : document.webkitExitFullscreen
      ? document.webkitExitFullscreen()
      : document.msExitFullscreen
      ? document.msExitFullscreen()
      : Promise.reject();
  }
  const a = {
    container: document.body,
    className: void 0,
    imageSize: "scale-down",
    fullScreen: !1,
    loop: !1,
    linkImages: !0,
    setIndex: 0,
    firstImageIndex: 0,
    lastImageIndex: !1,
    currentImageIndex: void 0,
    allowZoom: !0,
    closeOnBackgroundClick: !0,
    setTitle: function () {
      return "";
    },
    description: function () {
      return this.images[this.settings.currentImageIndex].title;
    },
    pagination: function () {
      const e = this.settings.lastImageIndex + 1;
      return this.settings.currentImageIndex + 1 + "/" + e;
    },
    afterInitialize() {},
    afterMarkup() {},
    afterImageLoad() {},
    afterClose() {},
    zoomedPaddingX: function (e, t) {
      return 0;
    },
    zoomedPaddingY: function (e, t) {
      return 0;
    },
  };
  class o {
    constructor(e, t) {
      (this.settings = t),
        (this.elems = {}),
        (this.images = []),
        (this.events = []),
        (this.state = {
          fullScreenOpen: !1,
          initialZoomState: null,
          initialized: !1,
          timer: !1,
          visible: !1,
        }),
        (this._cssClasses = [
          "chocolat-open",
          "chocolat-in-container",
          "chocolat-cover",
          "chocolat-zoomable",
          "chocolat-zoomed",
          "chocolat-zooming-in",
          "chocolat-zooming-out",
        ]),
        NodeList.prototype.isPrototypeOf(e) ||
        HTMLCollection.prototype.isPrototypeOf(e)
          ? e.forEach((e, t) => {
              this.images.push({
                title: e.getAttribute("title"),
                src: e.getAttribute("href"),
                srcset: e.getAttribute("data-srcset"),
                sizes: e.getAttribute("data-sizes"),
              }),
                this.off(e, "click.chocolat"),
                this.on(e, "click.chocolat", (e) => {
                  this.init(t), e.preventDefault();
                });
            })
          : (this.images = e),
        this.settings.container instanceof Element ||
        this.settings.container instanceof HTMLElement
          ? (this.elems.container = this.settings.container)
          : (this.elems.container = document.body),
        (this.api = {
          open: (e) => ((e = parseInt(e) || 0), this.init(e)),
          close: () => this.close(),
          next: () => this.change(1),
          prev: () => this.change(-1),
          goto: (e) => this.open(e),
          current: () => this.settings.currentImageIndex,
          position: () => this.position(this.elems.img),
          destroy: () => this.destroy(),
          set: (e, t) => ((this.settings[e] = t), t),
          get: (e) => this.settings[e],
          getElem: (e) => this.elems[e],
        });
    }
    init(e) {
      return (
        this.state.initialized ||
          (this.markup(),
          this.attachListeners(),
          (this.settings.lastImageIndex = this.images.length - 1),
          (this.state.initialized = !0)),
        this.settings.afterInitialize.call(this),
        this.load(e)
      );
    }
    load(e) {
      if (
        (this.state.visible ||
          ((this.state.visible = !0),
          setTimeout(() => {
            this.elems.overlay.classList.add("chocolat-visible"),
              this.elems.wrapper.classList.add("chocolat-visible");
          }, 0),
          this.elems.container.classList.add("chocolat-open")),
        this.settings.fullScreen && l(this.elems.wrapper),
        this.settings.currentImageIndex === e)
      )
        return Promise.resolve();
      let i,
        n,
        a = setTimeout(() => {
          this.elems.loader.classList.add("chocolat-visible");
        }, 1e3),
        o = setTimeout(() => {
          (o = void 0),
            (i = t(() => {
              this.elems.imageCanvas.classList.remove("chocolat-visible");
            }, this.elems.imageCanvas));
        }, 80);
      return s(this.images[e])
        .then((e) => ((n = e), o ? (clearTimeout(o), Promise.resolve()) : i))
        .then(() => {
          const t = e + 1;
          return (
            null != this.images[t] && s(this.images[t]),
            (this.settings.currentImageIndex = e),
            (this.elems.description.textContent =
              this.settings.description.call(this)),
            (this.elems.pagination.textContent =
              this.settings.pagination.call(this)),
            this.arrows(),
            this.position(n).then(
              () => (
                this.elems.loader.classList.remove("chocolat-visible"),
                clearTimeout(a),
                this.appear(n)
              )
            )
          );
        })
        .then(() => {
          this.elems.container.classList.toggle(
            "chocolat-zoomable",
            this.zoomable(n, this.elems.wrapper)
          ),
            this.settings.afterImageLoad.call(this);
        });
    }
    position({ naturalHeight: e, naturalWidth: s }) {
      const l = {
          imgHeight: e,
          imgWidth: s,
          containerHeight: this.elems.container.clientHeight,
          containerWidth: this.elems.container.clientWidth,
          canvasWidth: this.elems.imageCanvas.clientWidth,
          canvasHeight: this.elems.imageCanvas.clientHeight,
          imageSize: this.settings.imageSize,
        },
        { width: n, height: a } = i(l);
      return t(() => {
        Object.assign(this.elems.imageWrapper.style, {
          width: n + "px",
          height: a + "px",
        });
      }, this.elems.imageWrapper);
    }
    appear(e) {
      return (
        this.elems.imageWrapper.removeChild(this.elems.img),
        (this.elems.img = e),
        this.elems.img.setAttribute("class", "chocolat-img"),
        this.elems.imageWrapper.appendChild(this.elems.img),
        t(() => {
          this.elems.imageCanvas.classList.add("chocolat-visible");
        }, this.elems.imageCanvas)
      );
    }
    change(e) {
      if (!this.state.visible) return;
      if (!this.settings.linkImages) return;
      this.zoomOut();
      const t = this.settings.currentImageIndex + parseInt(e);
      if (t > this.settings.lastImageIndex) {
        if (this.settings.loop) return this.load(this.settings.firstImageIndex);
      } else {
        if (!(t < this.settings.firstImageIndex)) return this.load(t);
        if (this.settings.loop) return this.load(this.settings.lastImageIndex);
      }
    }
    arrows() {
      this.settings.loop
        ? (this.elems.left.classList.add("active"),
          this.elems.right.classList.add("active"))
        : this.settings.linkImages
        ? (this.elems.right.classList.toggle(
            "active",
            this.settings.currentImageIndex !== this.settings.lastImageIndex
          ),
          this.elems.left.classList.toggle(
            "active",
            this.settings.currentImageIndex !== this.settings.firstImageIndex
          ))
        : (this.elems.left.classList.remove("active"),
          this.elems.right.classList.remove("active"));
    }
    close() {
      if (this.state.fullScreenOpen) return void n();
      this.state.visible = !1;
      const e = t(() => {
          this.elems.overlay.classList.remove("chocolat-visible");
        }, this.elems.overlay),
        s = t(() => {
          this.elems.wrapper.classList.remove("chocolat-visible");
        }, this.elems.wrapper);
      return Promise.all([e, s]).then(() => {
        this.elems.container.classList.remove("chocolat-open"),
          this.settings.afterClose.call(this);
      });
    }
    destroy() {
      for (let e = this.events.length - 1; e >= 0; e--) {
        const { element: t, eventName: s } = this.events[e];
        this.off(t, s);
      }
      this.state.initialized &&
        (this.state.fullScreenOpen && n(),
        (this.settings.currentImageIndex = void 0),
        (this.state.visible = !1),
        (this.state.initialized = !1),
        this.elems.container.classList.remove(...this._cssClasses),
        this.elems.wrapper.parentNode.removeChild(this.elems.wrapper));
    }
    markup() {
      this.elems.container.classList.add(
        "chocolat-open",
        this.settings.className
      ),
        "cover" == this.settings.imageSize &&
          this.elems.container.classList.add("chocolat-cover"),
        this.elems.container !== document.body &&
          this.elems.container.classList.add("chocolat-in-container"),
        (this.elems.wrapper = document.createElement("div")),
        this.elems.wrapper.setAttribute(
          "id",
          "chocolat-content-" + this.settings.setIndex
        ),
        this.elems.wrapper.setAttribute("class", "chocolat-wrapper"),
        this.elems.container.appendChild(this.elems.wrapper),
        (this.elems.overlay = document.createElement("div")),
        this.elems.overlay.setAttribute("class", "chocolat-overlay"),
        this.elems.wrapper.appendChild(this.elems.overlay),
        (this.elems.loader = document.createElement("div")),
        this.elems.loader.setAttribute("class", "chocolat-loader"),
        this.elems.wrapper.appendChild(this.elems.loader),
        (this.elems.layout = document.createElement("div")),
        this.elems.layout.setAttribute("class", "chocolat-layout"),
        this.elems.wrapper.appendChild(this.elems.layout),
        (this.elems.top = document.createElement("div")),
        this.elems.top.setAttribute("class", "chocolat-top"),
        this.elems.layout.appendChild(this.elems.top),
        (this.elems.center = document.createElement("div")),
        this.elems.center.setAttribute("class", "chocolat-center"),
        this.elems.layout.appendChild(this.elems.center),
        (this.elems.left = document.createElement("div")),
        this.elems.left.setAttribute("class", "chocolat-left"),
        this.elems.center.appendChild(this.elems.left),
        (this.elems.imageCanvas = document.createElement("div")),
        this.elems.imageCanvas.setAttribute("class", "chocolat-image-canvas"),
        this.elems.center.appendChild(this.elems.imageCanvas),
        (this.elems.imageWrapper = document.createElement("div")),
        this.elems.imageWrapper.setAttribute("class", "chocolat-image-wrapper"),
        this.elems.imageCanvas.appendChild(this.elems.imageWrapper),
        (this.elems.img = document.createElement("img")),
        this.elems.img.setAttribute("class", "chocolat-img"),
        this.elems.imageWrapper.appendChild(this.elems.img),
        (this.elems.right = document.createElement("div")),
        this.elems.right.setAttribute("class", "chocolat-right"),
        this.elems.center.appendChild(this.elems.right),
        (this.elems.bottom = document.createElement("div")),
        this.elems.bottom.setAttribute("class", "chocolat-bottom"),
        this.elems.layout.appendChild(this.elems.bottom),
        (this.elems.close = document.createElement("span")),
        this.elems.close.setAttribute("class", "chocolat-close"),
        this.elems.top.appendChild(this.elems.close),
        (this.elems.description = document.createElement("span")),
        this.elems.description.setAttribute("class", "chocolat-description"),
        this.elems.bottom.appendChild(this.elems.description),
        (this.elems.pagination = document.createElement("span")),
        this.elems.pagination.setAttribute("class", "chocolat-pagination"),
        this.elems.bottom.appendChild(this.elems.pagination),
        (this.elems.setTitle = document.createElement("span")),
        this.elems.setTitle.setAttribute("class", "chocolat-set-title"),
        (this.elems.setTitle.textContent = this.settings.setTitle()),
        this.elems.bottom.appendChild(this.elems.setTitle),
        (this.elems.fullscreen = document.createElement("span")),
        this.elems.fullscreen.setAttribute("class", "chocolat-fullscreen"),
        this.elems.bottom.appendChild(this.elems.fullscreen),
        this.settings.afterMarkup.call(this);
    }
    attachListeners() {
      this.off(document, "keydown.chocolat"),
        this.on(document, "keydown.chocolat", (e) => {
          this.state.initialized &&
            (37 == e.keyCode
              ? this.change(-1)
              : 39 == e.keyCode
              ? this.change(1)
              : 27 == e.keyCode && this.close());
        });
      const t = this.elems.wrapper.querySelector(".chocolat-right");
      this.off(t, "click.chocolat"),
        this.on(t, "click.chocolat", () => {
          this.change(1);
        });
      const s = this.elems.wrapper.querySelector(".chocolat-left");
      this.off(s, "click.chocolat"),
        this.on(s, "click.chocolat", () => {
          this.change(-1);
        }),
        this.off(this.elems.close, "click.chocolat"),
        this.on(this.elems.close, "click.chocolat", this.close.bind(this)),
        this.off(this.elems.fullscreen, "click.chocolat"),
        this.on(this.elems.fullscreen, "click.chocolat", () => {
          this.state.fullScreenOpen ? n() : l(this.elems.wrapper);
        }),
        this.off(document, "fullscreenchange.chocolat"),
        this.on(document, "fullscreenchange.chocolat", () => {
          document.fullscreenElement ||
          document.webkitCurrentFullScreenElement ||
          document.webkitFullscreenElement
            ? (this.state.fullScreenOpen = !0)
            : (this.state.fullScreenOpen = !1);
        }),
        this.off(document, "webkitfullscreenchange.chocolat"),
        this.on(document, "webkitfullscreenchange.chocolat", () => {
          document.fullscreenElement ||
          document.webkitCurrentFullScreenElement ||
          document.webkitFullscreenElement
            ? (this.state.fullScreenOpen = !0)
            : (this.state.fullScreenOpen = !1);
        }),
        this.settings.closeOnBackgroundClick &&
          (this.off(this.elems.overlay, "click.chocolat"),
          this.on(this.elems.overlay, "click.chocolat", this.close.bind(this))),
        this.off(this.elems.wrapper, "click.chocolat"),
        this.on(this.elems.wrapper, "click.chocolat", () => {
          null !== this.state.initialZoomState &&
            this.state.visible &&
            (this.elems.container.classList.add("chocolat-zooming-out"),
            this.zoomOut().then(() => {
              this.elems.container.classList.remove("chocolat-zoomed"),
                this.elems.container.classList.remove("chocolat-zooming-out");
            }));
        }),
        this.off(this.elems.imageWrapper, "click.chocolat"),
        this.on(this.elems.imageWrapper, "click.chocolat", (e) => {
          null === this.state.initialZoomState &&
            this.elems.container.classList.contains("chocolat-zoomable") &&
            (e.stopPropagation(),
            this.elems.container.classList.add("chocolat-zooming-in"),
            this.zoomIn(e).then(() => {
              this.elems.container.classList.add("chocolat-zoomed"),
                this.elems.container.classList.remove("chocolat-zooming-in");
            }));
        }),
        this.on(this.elems.wrapper, "mousemove.chocolat", (e) => {
          if (null === this.state.initialZoomState || !this.state.visible)
            return;
          const t = this.elems.wrapper.getBoundingClientRect(),
            s = t.top + window.scrollY,
            i = t.left + window.scrollX,
            l = this.elems.wrapper.clientHeight,
            n = this.elems.wrapper.clientWidth,
            a = this.elems.img.width,
            o = this.elems.img.height,
            c = [e.pageX - n / 2 - i, e.pageY - l / 2 - s];
          let h = 0;
          if (a > n) {
            const e = this.settings.zoomedPaddingX(a, n);
            (h = c[0] / (n / 2)), (h *= (a - n) / 2 + e);
          }
          let r = 0;
          if (o > l) {
            const e = this.settings.zoomedPaddingY(o, l);
            (r = c[1] / (l / 2)), (r *= (o - l) / 2 + e);
          }
          (this.elems.img.style.marginLeft = -h + "px"),
            (this.elems.img.style.marginTop = -r + "px");
        }),
        this.on(window, "resize.chocolat", (t) => {
          this.state.initialized &&
            this.state.visible &&
            (function (t, s) {
              clearTimeout(e),
                (e = setTimeout(function () {
                  s();
                }, t));
            })(50, () => {
              const e = {
                  imgHeight: this.elems.img.naturalHeight,
                  imgWidth: this.elems.img.naturalWidth,
                  containerHeight: this.elems.wrapper.clientHeight,
                  containerWidth: this.elems.wrapper.clientWidth,
                  canvasWidth: this.elems.imageCanvas.clientWidth,
                  canvasHeight: this.elems.imageCanvas.clientHeight,
                  imageSize: this.settings.imageSize,
                },
                { width: t, height: s } = i(e);
              this.position(this.elems.img).then(() => {
                this.elems.container.classList.toggle(
                  "chocolat-zoomable",
                  this.zoomable(this.elems.img, this.elems.wrapper)
                );
              });
            });
        });
    }
    zoomable(e, t) {
      const s = t.clientWidth,
        i = t.clientHeight,
        l = !(
          !this.settings.allowZoom ||
          !(e.naturalWidth > s || e.naturalHeight > i)
        ),
        n = e.clientWidth > e.naturalWidth || e.clientHeight > e.naturalHeight;
      return l && !n;
    }
    zoomIn(e) {
      return (
        (this.state.initialZoomState = this.settings.imageSize),
        (this.settings.imageSize = "native"),
        this.position(this.elems.img)
      );
    }
    zoomOut(e) {
      return (
        (this.settings.imageSize =
          this.state.initialZoomState || this.settings.imageSize),
        (this.state.initialZoomState = null),
        (this.elems.img.style.margin = 0),
        this.position(this.elems.img)
      );
    }
    on(e, t, s) {
      const i = this.events.push({ element: e, eventName: t, cb: s });
      e.addEventListener(t.split(".")[0], this.events[i - 1].cb);
    }
    off(e, t) {
      const s = this.events.findIndex(
        (s) => s.element === e && s.eventName === t
      );
      this.events[s] &&
        (e.removeEventListener(t.split(".")[0], this.events[s].cb),
        this.events.splice(s, 1));
    }
  }
  const c = [];
  window.Chocolat = function (e, t) {
    const s = Object.assign({}, a, { images: [] }, t, { setIndex: c.length }),
      i = new o(e, s);
    return c.push(i), i;
  };
})();
