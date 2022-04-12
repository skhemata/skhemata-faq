/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function __decorate(decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t = window.ShadowRoot && (void 0 === window.ShadyCSS || window.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype,
      e = Symbol();

class s {
  constructor(t, s) {
    if (s !== e) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t;
  }

  get styleSheet() {
    return t && void 0 === this.t && (this.t = new CSSStyleSheet(), this.t.replaceSync(this.cssText)), this.t;
  }

  toString() {
    return this.cssText;
  }

}

const n = new Map(),
      o = t => {
  let o = n.get(t);
  return void 0 === o && n.set(t, o = new s(t, e)), o;
},
      r = t => o("string" == typeof t ? t : t + ""),
      i = (t, ...e) => {
  const n = 1 === t.length ? t[0] : e.reduce((e, n, o) => e + (t => {
    if (t instanceof s) return t.cssText;
    if ("number" == typeof t) return t;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + t[o + 1], t[0]);
  return o(n);
},
      S = (e, s) => {
  t ? e.adoptedStyleSheets = s.map(t => t instanceof CSSStyleSheet ? t : t.styleSheet) : s.forEach(t => {
    const s = document.createElement("style");
    s.textContent = t.cssText, e.appendChild(s);
  });
},
      u = t ? t => t : t => t instanceof CSSStyleSheet ? (t => {
  let e = "";

  for (const s of t.cssRules) e += s.cssText;

  return r(e);
})(t) : t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

var s$1, e$1, h, r$1;

const o$1 = {
  toAttribute(t, i) {
    switch (i) {
      case Boolean:
        t = t ? "" : null;
        break;

      case Object:
      case Array:
        t = null == t ? t : JSON.stringify(t);
    }

    return t;
  },

  fromAttribute(t, i) {
    let s = t;

    switch (i) {
      case Boolean:
        s = null !== t;
        break;

      case Number:
        s = null === t ? null : Number(t);
        break;

      case Object:
      case Array:
        try {
          s = JSON.parse(t);
        } catch (t) {
          s = null;
        }

    }

    return s;
  }

},
      n$1 = (t, i) => i !== t && (i == i || t == t),
      l = {
  attribute: !0,
  type: String,
  converter: o$1,
  reflect: !1,
  hasChanged: n$1
};

class a extends HTMLElement {
  constructor() {
    super(), this.Πi = new Map(), this.Πo = void 0, this.Πl = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this.Πh = null, this.u();
  }

  static addInitializer(t) {
    var i;
    null !== (i = this.v) && void 0 !== i || (this.v = []), this.v.push(t);
  }

  static get observedAttributes() {
    this.finalize();
    const t = [];
    return this.elementProperties.forEach((i, s) => {
      const e = this.Πp(s, i);
      void 0 !== e && (this.Πm.set(e, s), t.push(e));
    }), t;
  }

  static createProperty(t, i = l) {
    if (i.state && (i.attribute = !1), this.finalize(), this.elementProperties.set(t, i), !i.noAccessor && !this.prototype.hasOwnProperty(t)) {
      const s = "symbol" == typeof t ? Symbol() : "__" + t,
            e = this.getPropertyDescriptor(t, s, i);
      void 0 !== e && Object.defineProperty(this.prototype, t, e);
    }
  }

  static getPropertyDescriptor(t, i, s) {
    return {
      get() {
        return this[i];
      },

      set(e) {
        const h = this[t];
        this[i] = e, this.requestUpdate(t, h, s);
      },

      configurable: !0,
      enumerable: !0
    };
  }

  static getPropertyOptions(t) {
    return this.elementProperties.get(t) || l;
  }

  static finalize() {
    if (this.hasOwnProperty("finalized")) return !1;
    this.finalized = !0;
    const t = Object.getPrototypeOf(this);

    if (t.finalize(), this.elementProperties = new Map(t.elementProperties), this.Πm = new Map(), this.hasOwnProperty("properties")) {
      const t = this.properties,
            i = [...Object.getOwnPropertyNames(t), ...Object.getOwnPropertySymbols(t)];

      for (const s of i) this.createProperty(s, t[s]);
    }

    return this.elementStyles = this.finalizeStyles(this.styles), !0;
  }

  static finalizeStyles(i) {
    const s = [];

    if (Array.isArray(i)) {
      const e = new Set(i.flat(1 / 0).reverse());

      for (const i of e) s.unshift(u(i));
    } else void 0 !== i && s.push(u(i));

    return s;
  }

  static Πp(t, i) {
    const s = i.attribute;
    return !1 === s ? void 0 : "string" == typeof s ? s : "string" == typeof t ? t.toLowerCase() : void 0;
  }

  u() {
    var t;
    this.Πg = new Promise(t => this.enableUpdating = t), this.L = new Map(), this.Π_(), this.requestUpdate(), null === (t = this.constructor.v) || void 0 === t || t.forEach(t => t(this));
  }

  addController(t) {
    var i, s;
    (null !== (i = this.ΠU) && void 0 !== i ? i : this.ΠU = []).push(t), void 0 !== this.renderRoot && this.isConnected && (null === (s = t.hostConnected) || void 0 === s || s.call(t));
  }

  removeController(t) {
    var i;
    null === (i = this.ΠU) || void 0 === i || i.splice(this.ΠU.indexOf(t) >>> 0, 1);
  }

  Π_() {
    this.constructor.elementProperties.forEach((t, i) => {
      this.hasOwnProperty(i) && (this.Πi.set(i, this[i]), delete this[i]);
    });
  }

  createRenderRoot() {
    var t;
    const s = null !== (t = this.shadowRoot) && void 0 !== t ? t : this.attachShadow(this.constructor.shadowRootOptions);
    return S(s, this.constructor.elementStyles), s;
  }

  connectedCallback() {
    var t;
    void 0 === this.renderRoot && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), null === (t = this.ΠU) || void 0 === t || t.forEach(t => {
      var i;
      return null === (i = t.hostConnected) || void 0 === i ? void 0 : i.call(t);
    }), this.Πl && (this.Πl(), this.Πo = this.Πl = void 0);
  }

  enableUpdating(t) {}

  disconnectedCallback() {
    var t;
    null === (t = this.ΠU) || void 0 === t || t.forEach(t => {
      var i;
      return null === (i = t.hostDisconnected) || void 0 === i ? void 0 : i.call(t);
    }), this.Πo = new Promise(t => this.Πl = t);
  }

  attributeChangedCallback(t, i, s) {
    this.K(t, s);
  }

  Πj(t, i, s = l) {
    var e, h;
    const r = this.constructor.Πp(t, s);

    if (void 0 !== r && !0 === s.reflect) {
      const n = (null !== (h = null === (e = s.converter) || void 0 === e ? void 0 : e.toAttribute) && void 0 !== h ? h : o$1.toAttribute)(i, s.type);
      this.Πh = t, null == n ? this.removeAttribute(r) : this.setAttribute(r, n), this.Πh = null;
    }
  }

  K(t, i) {
    var s, e, h;
    const r = this.constructor,
          n = r.Πm.get(t);

    if (void 0 !== n && this.Πh !== n) {
      const t = r.getPropertyOptions(n),
            l = t.converter,
            a = null !== (h = null !== (e = null === (s = l) || void 0 === s ? void 0 : s.fromAttribute) && void 0 !== e ? e : "function" == typeof l ? l : null) && void 0 !== h ? h : o$1.fromAttribute;
      this.Πh = n, this[n] = a(i, t.type), this.Πh = null;
    }
  }

  requestUpdate(t, i, s) {
    let e = !0;
    void 0 !== t && (((s = s || this.constructor.getPropertyOptions(t)).hasChanged || n$1)(this[t], i) ? (this.L.has(t) || this.L.set(t, i), !0 === s.reflect && this.Πh !== t && (void 0 === this.Πk && (this.Πk = new Map()), this.Πk.set(t, s))) : e = !1), !this.isUpdatePending && e && (this.Πg = this.Πq());
  }

  async Πq() {
    this.isUpdatePending = !0;

    try {
      for (await this.Πg; this.Πo;) await this.Πo;
    } catch (t) {
      Promise.reject(t);
    }

    const t = this.performUpdate();
    return null != t && (await t), !this.isUpdatePending;
  }

  performUpdate() {
    var t;
    if (!this.isUpdatePending) return;
    this.hasUpdated, this.Πi && (this.Πi.forEach((t, i) => this[i] = t), this.Πi = void 0);
    let i = !1;
    const s = this.L;

    try {
      i = this.shouldUpdate(s), i ? (this.willUpdate(s), null === (t = this.ΠU) || void 0 === t || t.forEach(t => {
        var i;
        return null === (i = t.hostUpdate) || void 0 === i ? void 0 : i.call(t);
      }), this.update(s)) : this.Π$();
    } catch (t) {
      throw i = !1, this.Π$(), t;
    }

    i && this.E(s);
  }

  willUpdate(t) {}

  E(t) {
    var i;
    null === (i = this.ΠU) || void 0 === i || i.forEach(t => {
      var i;
      return null === (i = t.hostUpdated) || void 0 === i ? void 0 : i.call(t);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }

  Π$() {
    this.L = new Map(), this.isUpdatePending = !1;
  }

  get updateComplete() {
    return this.getUpdateComplete();
  }

  getUpdateComplete() {
    return this.Πg;
  }

  shouldUpdate(t) {
    return !0;
  }

  update(t) {
    void 0 !== this.Πk && (this.Πk.forEach((t, i) => this.Πj(i, this[i], t)), this.Πk = void 0), this.Π$();
  }

  updated(t) {}

  firstUpdated(t) {}

}

a.finalized = !0, a.elementProperties = new Map(), a.elementStyles = [], a.shadowRootOptions = {
  mode: "open"
}, null === (e$1 = (s$1 = globalThis).reactiveElementPlatformSupport) || void 0 === e$1 || e$1.call(s$1, {
  ReactiveElement: a
}), (null !== (h = (r$1 = globalThis).reactiveElementVersions) && void 0 !== h ? h : r$1.reactiveElementVersions = []).push("1.0.0-rc.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t$1, i$1, s$2, e$2;

const o$2 = globalThis.trustedTypes,
      l$1 = o$2 ? o$2.createPolicy("lit-html", {
  createHTML: t => t
}) : void 0,
      n$2 = `lit$${(Math.random() + "").slice(9)}$`,
      h$1 = "?" + n$2,
      r$2 = `<${h$1}>`,
      u$1 = document,
      c = (t = "") => u$1.createComment(t),
      d = t => null === t || "object" != typeof t && "function" != typeof t,
      v = Array.isArray,
      a$1 = t => {
  var i;
  return v(t) || "function" == typeof (null === (i = t) || void 0 === i ? void 0 : i[Symbol.iterator]);
},
      f = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
      _ = /-->/g,
      m = />/g,
      p = />|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,
      $ = /'/g,
      g = /"/g,
      y = /^(?:script|style|textarea)$/i,
      b = t => (i, ...s) => ({
  _$litType$: t,
  strings: i,
  values: s
}),
      T = b(1),
      w = Symbol.for("lit-noChange"),
      A = Symbol.for("lit-nothing"),
      P = new WeakMap(),
      V = (t, i, s) => {
  var e, o;
  const l = null !== (e = null == s ? void 0 : s.renderBefore) && void 0 !== e ? e : i;
  let n = l._$litPart$;

  if (void 0 === n) {
    const t = null !== (o = null == s ? void 0 : s.renderBefore) && void 0 !== o ? o : null;
    l._$litPart$ = n = new C(i.insertBefore(c(), t), t, void 0, s);
  }

  return n.I(t), n;
},
      E = u$1.createTreeWalker(u$1, 129, null, !1),
      M = (t, i) => {
  const s = t.length - 1,
        e = [];
  let o,
      h = 2 === i ? "<svg>" : "",
      u = f;

  for (let i = 0; i < s; i++) {
    const s = t[i];
    let l,
        c,
        d = -1,
        v = 0;

    for (; v < s.length && (u.lastIndex = v, c = u.exec(s), null !== c);) v = u.lastIndex, u === f ? "!--" === c[1] ? u = _ : void 0 !== c[1] ? u = m : void 0 !== c[2] ? (y.test(c[2]) && (o = RegExp("</" + c[2], "g")), u = p) : void 0 !== c[3] && (u = p) : u === p ? ">" === c[0] ? (u = null != o ? o : f, d = -1) : void 0 === c[1] ? d = -2 : (d = u.lastIndex - c[2].length, l = c[1], u = void 0 === c[3] ? p : '"' === c[3] ? g : $) : u === g || u === $ ? u = p : u === _ || u === m ? u = f : (u = p, o = void 0);

    const a = u === p && t[i + 1].startsWith("/>") ? " " : "";
    h += u === f ? s + r$2 : d >= 0 ? (e.push(l), s.slice(0, d) + "$lit$" + s.slice(d) + n$2 + a) : s + n$2 + (-2 === d ? (e.push(void 0), i) : a);
  }

  const c = h + (t[s] || "<?>") + (2 === i ? "</svg>" : "");
  return [void 0 !== l$1 ? l$1.createHTML(c) : c, e];
};

class N {
  constructor({
    strings: t,
    _$litType$: i
  }, s) {
    let e;
    this.parts = [];
    let l = 0,
        r = 0;
    const u = t.length - 1,
          d = this.parts,
          [v, a] = M(t, i);

    if (this.el = N.createElement(v, s), E.currentNode = this.el.content, 2 === i) {
      const t = this.el.content,
            i = t.firstChild;
      i.remove(), t.append(...i.childNodes);
    }

    for (; null !== (e = E.nextNode()) && d.length < u;) {
      if (1 === e.nodeType) {
        if (e.hasAttributes()) {
          const t = [];

          for (const i of e.getAttributeNames()) if (i.endsWith("$lit$") || i.startsWith(n$2)) {
            const s = a[r++];

            if (t.push(i), void 0 !== s) {
              const t = e.getAttribute(s.toLowerCase() + "$lit$").split(n$2),
                    i = /([.?@])?(.*)/.exec(s);
              d.push({
                type: 1,
                index: l,
                name: i[2],
                strings: t,
                ctor: "." === i[1] ? I : "?" === i[1] ? L : "@" === i[1] ? R : H
              });
            } else d.push({
              type: 6,
              index: l
            });
          }

          for (const i of t) e.removeAttribute(i);
        }

        if (y.test(e.tagName)) {
          const t = e.textContent.split(n$2),
                i = t.length - 1;

          if (i > 0) {
            e.textContent = o$2 ? o$2.emptyScript : "";

            for (let s = 0; s < i; s++) e.append(t[s], c()), E.nextNode(), d.push({
              type: 2,
              index: ++l
            });

            e.append(t[i], c());
          }
        }
      } else if (8 === e.nodeType) if (e.data === h$1) d.push({
        type: 2,
        index: l
      });else {
        let t = -1;

        for (; -1 !== (t = e.data.indexOf(n$2, t + 1));) d.push({
          type: 7,
          index: l
        }), t += n$2.length - 1;
      }

      l++;
    }
  }

  static createElement(t, i) {
    const s = u$1.createElement("template");
    return s.innerHTML = t, s;
  }

}

function S$1(t, i, s = t, e) {
  var o, l, n, h;
  if (i === w) return i;
  let r = void 0 !== e ? null === (o = s.Σi) || void 0 === o ? void 0 : o[e] : s.Σo;
  const u = d(i) ? void 0 : i._$litDirective$;
  return (null == r ? void 0 : r.constructor) !== u && (null === (l = null == r ? void 0 : r.O) || void 0 === l || l.call(r, !1), void 0 === u ? r = void 0 : (r = new u(t), r.T(t, s, e)), void 0 !== e ? (null !== (n = (h = s).Σi) && void 0 !== n ? n : h.Σi = [])[e] = r : s.Σo = r), void 0 !== r && (i = S$1(t, r.S(t, i.values), r, e)), i;
}

class k {
  constructor(t, i) {
    this.l = [], this.N = void 0, this.D = t, this.M = i;
  }

  u(t) {
    var i;
    const {
      el: {
        content: s
      },
      parts: e
    } = this.D,
          o = (null !== (i = null == t ? void 0 : t.creationScope) && void 0 !== i ? i : u$1).importNode(s, !0);
    E.currentNode = o;
    let l = E.nextNode(),
        n = 0,
        h = 0,
        r = e[0];

    for (; void 0 !== r;) {
      if (n === r.index) {
        let i;
        2 === r.type ? i = new C(l, l.nextSibling, this, t) : 1 === r.type ? i = new r.ctor(l, r.name, r.strings, this, t) : 6 === r.type && (i = new z(l, this, t)), this.l.push(i), r = e[++h];
      }

      n !== (null == r ? void 0 : r.index) && (l = E.nextNode(), n++);
    }

    return o;
  }

  v(t) {
    let i = 0;

    for (const s of this.l) void 0 !== s && (void 0 !== s.strings ? (s.I(t, s, i), i += s.strings.length - 2) : s.I(t[i])), i++;
  }

}

class C {
  constructor(t, i, s, e) {
    this.type = 2, this.N = void 0, this.A = t, this.B = i, this.M = s, this.options = e;
  }

  setConnected(t) {
    var i;
    null === (i = this.P) || void 0 === i || i.call(this, t);
  }

  get parentNode() {
    return this.A.parentNode;
  }

  get startNode() {
    return this.A;
  }

  get endNode() {
    return this.B;
  }

  I(t, i = this) {
    t = S$1(this, t, i), d(t) ? t === A || null == t || "" === t ? (this.H !== A && this.R(), this.H = A) : t !== this.H && t !== w && this.m(t) : void 0 !== t._$litType$ ? this._(t) : void 0 !== t.nodeType ? this.$(t) : a$1(t) ? this.g(t) : this.m(t);
  }

  k(t, i = this.B) {
    return this.A.parentNode.insertBefore(t, i);
  }

  $(t) {
    this.H !== t && (this.R(), this.H = this.k(t));
  }

  m(t) {
    const i = this.A.nextSibling;
    null !== i && 3 === i.nodeType && (null === this.B ? null === i.nextSibling : i === this.B.previousSibling) ? i.data = t : this.$(u$1.createTextNode(t)), this.H = t;
  }

  _(t) {
    var i;
    const {
      values: s,
      _$litType$: e
    } = t,
          o = "number" == typeof e ? this.C(t) : (void 0 === e.el && (e.el = N.createElement(e.h, this.options)), e);
    if ((null === (i = this.H) || void 0 === i ? void 0 : i.D) === o) this.H.v(s);else {
      const t = new k(o, this),
            i = t.u(this.options);
      t.v(s), this.$(i), this.H = t;
    }
  }

  C(t) {
    let i = P.get(t.strings);
    return void 0 === i && P.set(t.strings, i = new N(t)), i;
  }

  g(t) {
    v(this.H) || (this.H = [], this.R());
    const i = this.H;
    let s,
        e = 0;

    for (const o of t) e === i.length ? i.push(s = new C(this.k(c()), this.k(c()), this, this.options)) : s = i[e], s.I(o), e++;

    e < i.length && (this.R(s && s.B.nextSibling, e), i.length = e);
  }

  R(t = this.A.nextSibling, i) {
    var s;

    for (null === (s = this.P) || void 0 === s || s.call(this, !1, !0, i); t && t !== this.B;) {
      const i = t.nextSibling;
      t.remove(), t = i;
    }
  }

}

class H {
  constructor(t, i, s, e, o) {
    this.type = 1, this.H = A, this.N = void 0, this.V = void 0, this.element = t, this.name = i, this.M = e, this.options = o, s.length > 2 || "" !== s[0] || "" !== s[1] ? (this.H = Array(s.length - 1).fill(A), this.strings = s) : this.H = A;
  }

  get tagName() {
    return this.element.tagName;
  }

  I(t, i = this, s, e) {
    const o = this.strings;
    let l = !1;
    if (void 0 === o) t = S$1(this, t, i, 0), l = !d(t) || t !== this.H && t !== w, l && (this.H = t);else {
      const e = t;
      let n, h;

      for (t = o[0], n = 0; n < o.length - 1; n++) h = S$1(this, e[s + n], i, n), h === w && (h = this.H[n]), l || (l = !d(h) || h !== this.H[n]), h === A ? t = A : t !== A && (t += (null != h ? h : "") + o[n + 1]), this.H[n] = h;
    }
    l && !e && this.W(t);
  }

  W(t) {
    t === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, null != t ? t : "");
  }

}

class I extends H {
  constructor() {
    super(...arguments), this.type = 3;
  }

  W(t) {
    this.element[this.name] = t === A ? void 0 : t;
  }

}

class L extends H {
  constructor() {
    super(...arguments), this.type = 4;
  }

  W(t) {
    t && t !== A ? this.element.setAttribute(this.name, "") : this.element.removeAttribute(this.name);
  }

}

class R extends H {
  constructor() {
    super(...arguments), this.type = 5;
  }

  I(t, i = this) {
    var s;
    if ((t = null !== (s = S$1(this, t, i, 0)) && void 0 !== s ? s : A) === w) return;
    const e = this.H,
          o = t === A && e !== A || t.capture !== e.capture || t.once !== e.once || t.passive !== e.passive,
          l = t !== A && (e === A || o);
    o && this.element.removeEventListener(this.name, this, e), l && this.element.addEventListener(this.name, this, t), this.H = t;
  }

  handleEvent(t) {
    var i, s;
    "function" == typeof this.H ? this.H.call(null !== (s = null === (i = this.options) || void 0 === i ? void 0 : i.host) && void 0 !== s ? s : this.element, t) : this.H.handleEvent(t);
  }

}

class z {
  constructor(t, i, s) {
    this.element = t, this.type = 6, this.N = void 0, this.V = void 0, this.M = i, this.options = s;
  }

  I(t) {
    S$1(this, t);
  }

}
null === (i$1 = (t$1 = globalThis).litHtmlPlatformSupport) || void 0 === i$1 || i$1.call(t$1, N, C), (null !== (s$2 = (e$2 = globalThis).litHtmlVersions) && void 0 !== s$2 ? s$2 : e$2.litHtmlVersions = []).push("2.0.0-rc.3");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

var i$2, l$2, o$3, s$3, n$3, a$2;
(null !== (i$2 = (a$2 = globalThis).litElementVersions) && void 0 !== i$2 ? i$2 : a$2.litElementVersions = []).push("3.0.0-rc.2");

class h$2 extends a {
  constructor() {
    super(...arguments), this.renderOptions = {
      host: this
    }, this.Φt = void 0;
  }

  createRenderRoot() {
    var t, e;
    const r = super.createRenderRoot();
    return null !== (t = (e = this.renderOptions).renderBefore) && void 0 !== t || (e.renderBefore = r.firstChild), r;
  }

  update(t) {
    const r = this.render();
    super.update(t), this.Φt = V(r, this.renderRoot, this.renderOptions);
  }

  connectedCallback() {
    var t;
    super.connectedCallback(), null === (t = this.Φt) || void 0 === t || t.setConnected(!0);
  }

  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), null === (t = this.Φt) || void 0 === t || t.setConnected(!1);
  }

  render() {
    return w;
  }

}

h$2.finalized = !0, h$2._$litElement$ = !0, null === (o$3 = (l$2 = globalThis).litElementHydrateSupport) || void 0 === o$3 || o$3.call(l$2, {
  LitElement: h$2
}), null === (n$3 = (s$3 = globalThis).litElementPlatformSupport) || void 0 === n$3 || n$3.call(s$3, {
  LitElement: h$2
});

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const i$3 = (i, e) => "method" === e.kind && e.descriptor && !("value" in e.descriptor) ? { ...e,

  finisher(n) {
    n.createProperty(e.key, i);
  }

} : {
  kind: "field",
  key: Symbol(),
  placement: "own",
  descriptor: {},
  originalKey: e.key,

  initializer() {
    "function" == typeof e.initializer && (this[e.key] = e.initializer.call(this));
  },

  finisher(n) {
    n.createProperty(e.key, i);
  }

};

function e$3(e) {
  return (n, t) => void 0 !== t ? ((i, e, n) => {
    e.constructor.createProperty(n, i);
  })(e, n, t) : i$3(e, n);
}

(function () {

  function g(a) {
    var b = 0;
    return function () {
      return b < a.length ? {
        done: !1,
        value: a[b++]
      } : {
        done: !0
      };
    };
  }

  if (!ShadowRoot.prototype.createElement) {
    var h = window.HTMLElement,
        l = window.customElements.define,
        m = window.customElements.get,
        n = window.customElements,
        p = new WeakMap(),
        q = new WeakMap(),
        r = new WeakMap(),
        t = new WeakMap();

    window.CustomElementRegistry = function () {
      this.l = new Map();
      this.o = new Map();
      this.i = new Map();
      this.h = new Map();
    };

    window.CustomElementRegistry.prototype.define = function (a, b) {
      a = a.toLowerCase();
      if (void 0 !== this.j(a)) throw new DOMException("Failed to execute 'define' on 'CustomElementRegistry': the name \"" + a + '" has already been used with this registry');
      if (void 0 !== this.o.get(b)) throw new DOMException("Failed to execute 'define' on 'CustomElementRegistry': this constructor has already been used with this registry");
      var c = b.prototype.attributeChangedCallback,
          d = new Set(b.observedAttributes || []);
      u(b, d, c);
      c = {
        g: b,
        connectedCallback: b.prototype.connectedCallback,
        disconnectedCallback: b.prototype.disconnectedCallback,
        adoptedCallback: b.prototype.adoptedCallback,
        attributeChangedCallback: c,
        observedAttributes: d
      };
      this.l.set(a, c);
      this.o.set(b, c);
      d = m.call(n, a);
      d || (d = v(a), l.call(n, a, d));
      this === window.customElements && (r.set(b, c), c.s = d);

      if (d = this.h.get(a)) {
        this.h.delete(a);
        var e = "undefined" != typeof Symbol && Symbol.iterator && d[Symbol.iterator];
        d = e ? e.call(d) : {
          next: g(d)
        };

        for (e = d.next(); !e.done; e = d.next()) e = e.value, q.delete(e), w(e, c, !0);
      }

      c = this.i.get(a);
      void 0 !== c && (c.resolve(b), this.i.delete(a));
      return b;
    };

    window.CustomElementRegistry.prototype.upgrade = function () {
      x.push(this);
      n.upgrade.apply(n, arguments);
      x.pop();
    };

    window.CustomElementRegistry.prototype.get = function (a) {
      var b;
      return null == (b = this.l.get(a)) ? void 0 : b.g;
    };

    window.CustomElementRegistry.prototype.j = function (a) {
      return this.l.get(a);
    };

    window.CustomElementRegistry.prototype.whenDefined = function (a) {
      var b = this.j(a);
      if (void 0 !== b) return Promise.resolve(b.g);
      var c = this.i.get(a);
      void 0 === c && (c = {}, c.promise = new Promise(function (d) {
        return c.resolve = d;
      }), this.i.set(a, c));
      return c.promise;
    };

    window.CustomElementRegistry.prototype.m = function (a, b, c) {
      var d = this.h.get(b);
      d || this.h.set(b, d = new Set());
      c ? d.add(a) : d.delete(a);
    };

    var y;

    window.HTMLElement = function () {
      var a = y;
      if (a) return y = void 0, a;
      var b = r.get(this.constructor);
      if (!b) throw new TypeError("Illegal constructor (custom element class must be registered with global customElements registry to be newable)");
      a = Reflect.construct(h, [], b.s);
      Object.setPrototypeOf(a, this.constructor.prototype);
      p.set(a, b);
      return a;
    };

    window.HTMLElement.prototype = h.prototype;

    var v = function (a) {
      function b() {
        var c = Reflect.construct(h, [], this.constructor);
        Object.setPrototypeOf(c, HTMLElement.prototype);

        a: {
          var d = c.getRootNode();

          if (!(d === document || d instanceof ShadowRoot)) {
            d = x[x.length - 1];

            if (d instanceof CustomElementRegistry) {
              var e = d;
              break a;
            }

            d = d.getRootNode();
            d === document || d instanceof ShadowRoot || (d = (null == (e = t.get(d)) ? void 0 : e.getRootNode()) || document);
          }

          e = d.customElements;
        }

        e = e || window.customElements;
        (d = e.j(a)) ? w(c, d) : q.set(c, e);
        return c;
      }

      b.prototype.connectedCallback = function () {
        var c = p.get(this);
        c ? c.connectedCallback && c.connectedCallback.apply(this, arguments) : q.get(this).m(this, a, !0);
      };

      b.prototype.disconnectedCallback = function () {
        var c = p.get(this);
        c ? c.disconnectedCallback && c.disconnectedCallback.apply(this, arguments) : q.get(this).m(this, a, !1);
      };

      b.prototype.adoptedCallback = function () {
        var c, d;
        null == (c = p.get(this)) || null == (d = c.adoptedCallback) || d.apply(this, arguments);
      };

      return b;
    },
        u = function (a, b, c) {
      if (0 !== b.size && void 0 !== c) {
        var d = a.prototype.setAttribute;
        d && (a.prototype.setAttribute = function (f, k) {
          if (b.has(f)) {
            var C = this.getAttribute(f);
            d.call(this, f, k);
            c.call(this, f, C, k);
          } else d.call(this, f, k);
        });
        var e = a.prototype.removeAttribute;
        e && (a.prototype.removeAttribute = function (f) {
          if (b.has(f)) {
            var k = this.getAttribute(f);
            e.call(this, f);
            c.call(this, f, k, null);
          } else e.call(this, f);
        });
      }
    },
        z = function (a) {
      var b = Object.getPrototypeOf(a);
      if (b !== window.HTMLElement) return b === h ? Object.setPrototypeOf(a, window.HTMLElement) : z(b);
    },
        w = function (a, b, c) {
      c = void 0 === c ? !1 : c;
      Object.setPrototypeOf(a, b.g.prototype);
      p.set(a, b);
      y = a;

      try {
        new b.g();
      } catch (d) {
        z(b.g), new b.g();
      }

      b.observedAttributes.forEach(function (d) {
        a.hasAttribute(d) && b.attributeChangedCallback.call(a, d, null, a.getAttribute(d));
      });
      c && b.connectedCallback && a.isConnected && b.connectedCallback.call(a);
    },
        A = Element.prototype.attachShadow;

    Element.prototype.attachShadow = function (a) {
      var b = A.apply(this, arguments);
      a.customElements && (b.customElements = a.customElements);
      return b;
    };

    var x = [document],
        B = function (a, b, c) {
      var d = (c ? Object.getPrototypeOf(c) : a.prototype)[b];

      a.prototype[b] = function () {
        x.push(this);
        var e = d.apply(c || this, arguments);
        void 0 !== e && t.set(e, this);
        x.pop();
        return e;
      };
    };

    B(ShadowRoot, "createElement", document);
    B(ShadowRoot, "importNode", document);
    B(Element, "insertAdjacentHTML");

    var D = function (a) {
      var b = Object.getOwnPropertyDescriptor(a.prototype, "innerHTML");
      Object.defineProperty(a.prototype, "innerHTML", Object.assign({}, b, {
        set: function (c) {
          x.push(this);
          b.set.call(this, c);
          x.pop();
        }
      }));
    };

    D(Element);
    D(ShadowRoot);
    Object.defineProperty(window, "customElements", {
      value: new CustomElementRegistry(),
      configurable: !0,
      writable: !0
    });
  }
}).call(self);

const appliedClassMixins = new WeakMap();
/** Vefify if the Mixin was previously applyed
 * @private
 * @param {function} mixin      Mixin being applyed
 * @param {object} superClass   Class receiving the new mixin
 * @returns {boolean}
 */

function wasMixinPreviouslyApplied(mixin, superClass) {
  let klass = superClass;

  while (klass) {
    if (appliedClassMixins.get(klass) === mixin) {
      return true;
    }

    klass = Object.getPrototypeOf(klass);
  }

  return false;
}
/** Apply each mixin in the chain to make sure they are not applied more than once to the final class.
 * @export
 * @param {function} mixin      Mixin to be applyed
 * @returns {object}            Mixed class with mixin applied
 */


function dedupeMixin(mixin) {
  return superClass => {
    if (wasMixinPreviouslyApplied(mixin, superClass)) {
      return superClass;
    }

    const mixedClass = mixin(superClass);
    appliedClassMixins.set(mixedClass, mixin);
    return mixedClass;
  };
}

/**
 * @typedef {import('./types').RenderOptions} RenderOptions
 * @typedef {import('./types').ScopedElementsMixin} ScopedElementsMixin
 * @typedef {import('./types').ScopedElementsHost} ScopedElementsHost
 * @typedef {import('./types').ScopedElementsMap} ScopedElementsMap
 * @typedef {import('@lit/reactive-element').CSSResultFlatArray} CSSResultFlatArray
 */

/**
 * @template {import('./types').Constructor<HTMLElement>} T
 * @param {T} superclass
 * @return {T & import('./types').Constructor<ScopedElementsHost>}
 */

const ScopedElementsMixinImplementation = superclass =>
/** @type {ScopedElementsHost} */
class ScopedElementsHost extends superclass {
  /**
   * Obtains the scoped elements definitions map if specified.
   *
   * @returns {ScopedElementsMap}
   */
  static get scopedElements() {
    return {};
  }
  /**
   * Obtains the ShadowRoot options.
   *
   * @type {ShadowRootInit}
   */


  static get shadowRootOptions() {
    return this.__shadowRootOptions;
  }
  /**
   * Set the shadowRoot options.
   *
   * @param {ShadowRootInit} value
   */


  static set shadowRootOptions(value) {
    this.__shadowRootOptions = value;
  }
  /**
   * Obtains the element styles.
   *
   * @returns {CSSResultFlatArray}
   */


  static get elementStyles() {
    return this.__elementStyles;
  }

  static set elementStyles(styles) {
    this.__elementStyles = styles;
  } // either TS or ESLint will complain here
  // eslint-disable-next-line no-unused-vars


  constructor(..._args) {
    super();
    /** @type {RenderOptions} */

    this.renderOptions = this.renderOptions || undefined;
  }
  /**
   * Obtains the CustomElementRegistry associated to the ShadowRoot.
   *
   * @returns {CustomElementRegistry}
   */


  get registry() {
    // @ts-ignore
    return this.constructor.__registry;
  }
  /**
   * Set the CustomElementRegistry associated to the ShadowRoot
   *
   * @param {CustomElementRegistry} registry
   */


  set registry(registry) {
    // @ts-ignore
    this.constructor.__registry = registry;
  }
  /** @override */


  createRenderRoot() {
    const {
      scopedElements,
      shadowRootOptions,
      elementStyles
    } =
    /** @type {typeof ScopedElementsHost} */
    this.constructor;

    if (!this.registry) {
      this.registry = new CustomElementRegistry();
      Object.entries(scopedElements).forEach(([tagName, klass]) => this.registry.define(tagName, klass));
    }
    /** @type {ShadowRootInit} */


    const options = {
      mode: 'open',
      ...shadowRootOptions,
      customElements: this.registry
    };
    this.renderOptions.creationScope = this.attachShadow(options);
    if (this.renderOptions.creationScope instanceof ShadowRoot) S(this.renderOptions.creationScope, elementStyles);
    return this.renderOptions.creationScope;
  }
  /**
   * Defines a scoped element.
   *
   * @param {string} tagName
   * @param {typeof HTMLElement} klass
   */


  defineScopedElement(tagName, klass) {
    return this.registry.get(tagName) || this.registry.define(tagName, klass);
  }
  /**
   * @deprecated use the native el.tagName instead
   *
   * @param {string} tagName
   * @returns {string} the tag name
   */
  // eslint-disable-next-line class-methods-use-this


  getScopedTagName(tagName) {
    return tagName;
  }
  /**
   * @deprecated use the native el.tagName instead
   *
   * @param {string} tagName
   * @returns {string} the tag name
   */
  // eslint-disable-next-line class-methods-use-this


  static getScopedTagName(tagName) {
    return tagName;
  }

};

const ScopedElementsMixin = dedupeMixin(ScopedElementsMixinImplementation);

var RequestMethod;

(function (RequestMethod) {
  RequestMethod["POST"] = "post";
  RequestMethod["GET"] = "get";
  RequestMethod["PUT"] = "put";
  RequestMethod["DELETE"] = "delete";
})(RequestMethod || (RequestMethod = {}));

class APICall {
  /**
   *
   * @param apiUrl api url
   * @param authToken x-auth-token token
   */
  constructor(apiUrl, authToken) {
    this.apiUrl = '';
    this.authToken = '';
    this.apiUrl = apiUrl;
    this.authToken = authToken;
  }
  /**
   *
   * @param request APIRequest
   */


  send(request) {
    return new Promise((resolve, reject) => {
      const {
        requestMethod,
        endpoint,
        data,
        searchParams
      } = request;
      const options = {
        method: requestMethod,
        headers: {}
      };

      if (this.authToken) {
        options.headers['x-auth-token'] = this.authToken;
      }

      if (data) {
        options.headers['Content-Type'] = 'application/json';

        try {
          options.body = JSON.stringify(data);
        } catch (error) {
          reject(error);
        }
      }

      const url = new URL(`${this.apiUrl}/${endpoint}`);

      if (searchParams) {
        url.search = searchParams.toString();
      }

      fetch(url.toString(), options).then(res => res.json()).then(resData => {
        resolve(resData);
      }).catch(resolve);
    });
  }

}

class Campaign {
  constructor(data = {}, api) {
    this.data = {};
    this.images = [];
    this.data = data;
    this.id = data.id;
    this.api = api;
  }

  save(data) {
    return new Promise((resolve, reject) => {
      const request = {
        requestMethod: this.id ? RequestMethod.PUT : RequestMethod.POST,
        endpoint: this.id ? `campaign/${this.id}` : 'campaign',
        data
      };
      this.api.send(request).then(res => {
        this.data = res;
        resolve(res);
      }).catch(reject);
    });
  }

}

class Subscription {
  constructor(data = {}, api) {
    this.data = {};
    this.data = data;
    this.id = data.id;
    this.api = api;
  }
  /**
   *
   * @param stripe the stripe object to create the subscription with
   * @param cardToken token ID of tokenized card
   * @returns
   */


  async payWithStripe(stripe, cardToken) {
    const subscriptionData = {
      token: cardToken,
      email: this.data.email,
      first_name: this.data.first_name,
      last_name: this.data.last_name,
      street1: this.data.street1,
      mail_code: this.data.mail_code,
      city_id: this.data.city_id,
      subscription_plan_id: this.data.subscription_plan_id,
      portal_name: this.data.portal_name.trim().replace(/ /g, '_'),
      terms: this.data.terms,
      use_sca: 1,
      source: this.data.source,
      create_sample_data: this.data.create_sample_data,
      secure_site: 0,
      custom_domain: 'custom'
    };
    /*
    if (this.data.plan.addon) {
      subscriptionData.addon_domain = 1;
    } */

    const request = {
      requestMethod: RequestMethod.POST,
      endpoint: 'subscription',
      data: subscriptionData
    };
    return new Promise((resolve, reject) => {
      this.api.send(request).then(success => {
        if (success.sca_status === 'requies_action' || success.sca_status === 'requires_source_action') {
          stripe.confirmCardPayment(success.client_secret).then(pi => {
            if (pi.error) {
              reject(pi.error);
            } else {
              resolve(success);
            }
          }).catch(error => {
            reject(error);
          });
        } else {
          console.log('no auth, resolving');
          resolve(success);
        }
      }).catch(error => {
        reject(error);
      });
    });
  }

}

/**
 * constants
 */

const AUTH_TOKEN = 'skhemataToken';
var CampaignFileRegion;

(function (CampaignFileRegion) {
  CampaignFileRegion[CampaignFileRegion["header"] = 1] = "header";
  CampaignFileRegion[CampaignFileRegion["body"] = 2] = "body";
  CampaignFileRegion[CampaignFileRegion["thumbnail"] = 3] = "thumbnail";
  CampaignFileRegion[CampaignFileRegion["top_header"] = 5] = "top_header";
  CampaignFileRegion[CampaignFileRegion["thumbnail_video"] = 6] = "thumbnail_video";
})(CampaignFileRegion || (CampaignFileRegion = {}));

class Skhemata {
  /**
   *
   * @param apiUrl string
   * @param authToken string
   */
  constructor(apiUrl, authToken) {
    this.api = new APICall(apiUrl, authToken);
    window.addEventListener('skhemata-login', e => {
      this.api.authToken = e.detail.authToken;
    });
  }
  /**
   * initialize skhemata api object
   * @returns boolean of auth status
   */


  init() {
    const authToken = localStorage.getItem(AUTH_TOKEN) || undefined;
    return new Promise(resolve => {
      if (!authToken) {
        resolve(false);
      }

      this.authenticate({
        authToken
      }).then(() => resolve(true)).catch(() => resolve(false));
    });
  }
  /**
   * authenticate
   * @param auth auth info
   * @returns Promise with api response
   */


  authenticate(auth) {
    const {
      authToken,
      email,
      password
    } = auth;
    let data;

    if (email && password) {
      data = {
        email,
        password
      };
    }

    if (authToken) {
      this.api.authToken = authToken;
    }

    const request = {
      requestMethod: data ? RequestMethod.POST : RequestMethod.GET,
      endpoint: 'authenticate',
      data
    };
    return this.api.send(request).then(res => {
      this.api.authToken = res.authToken;
      localStorage.set(AUTH_TOKEN, this.api.authToken);
      window.dispatchEvent(new CustomEvent('skhemata-login', {
        detail: {
          authToken: this.api.authToken
        }
      }));
      return res;
    });
  }

  logout() {
    this.api.authToken = undefined;
    localStorage.removeItem(AUTH_TOKEN);
    window.dispatchEvent(new CustomEvent('skhemata-logout'));
  }
  /***************
  * Campaign *
  ***************/

  /**
   *
   * @param id ID of the campaign
   * @returns Promise<Campaign>
   */


  getCampaign(id) {
    const campaignRequest = {
      requestMethod: RequestMethod.GET,
      endpoint: `campaign/${id}`
    };
    const imageRequest = {
      requestMethod: RequestMethod.GET,
      endpoint: `campaign/${id}/resource/file`
    };
    let newCampaign;
    return this.api.send(campaignRequest).then(campaign => {
      newCampaign = new Campaign(campaign, this.api);
    }).then(() => this.api.send(imageRequest)).then(images => {
      newCampaign.images = images.filter(image => image.region_id === CampaignFileRegion.thumbnail);
      return newCampaign;
    });
  }
  /**
   *
   * @param data campaign data
   * @returns Promise<Campaign>
   */


  createCampaign(data) {
    const request = {
      requestMethod: RequestMethod.POST,
      endpoint: 'campaign',
      data
    };
    return this.api.send(request).then(campaign => new Campaign(campaign, this.api));
  }
  /**
   *  getCampaigns
   * @param params CampaignSearch object
   * @returns Promise with Array of Campaign objects or Error
   */


  getCampaigns(params) {
    const {
      sort,
      filter,
      page
    } = params;
    const searchParams = new URLSearchParams();

    if (sort) {
      searchParams.set('sort', JSON.stringify(sort));
    }

    if (sort) {
      searchParams.set('filter', JSON.stringify(filter));
    }

    if (page) {
      if (typeof page.page !== undefined) {
        searchParams.set('page', `${page.page}`);
      }

      if (typeof page.page_entries !== undefined) {
        searchParams.set('page_entries', `${page.page_entries}`);
      }
    }

    const request = {
      requestMethod: RequestMethod.GET,
      endpoint: 'campaign',
      searchParams
    };
    return this.api.send(request).then(res => res.map(campaign => new Campaign(campaign, this.api))).catch(() => new Error('Error'));
  }
  /***************
  * SUBSCRIPTION *
  ***************/

  /**
   *
   * @param data data to create the subscription
   * @returns Subscription object
   */


  createSubscription(data) {
    return new Subscription(data, this.api);
  }

}

/**
 *
 * This element is needed for bulma styling
 * Refer to documentation: https://bulma.io/documentation
 *
 **/
const Bulma = i`
/*! bulma.io v0.9.2 | MIT License | github.com/jgthms/bulma */
/* Bulma Utilities */
.button, .input, .textarea, .select select, .file-cta,
.file-name, .pagination-previous,
.pagination-next,
.pagination-link,
.pagination-ellipsis {
  -moz-appearance: none;
  -webkit-appearance: none;
  align-items: center;
  border: 1px solid transparent;
  border-radius: 4px;
  box-shadow: none;
  display: inline-flex;
  font-size: 1rem;
  height: 2.5em;
  justify-content: flex-start;
  line-height: 1.5;
  padding-bottom: calc(0.5em - 1px);
  padding-left: calc(0.75em - 1px);
  padding-right: calc(0.75em - 1px);
  padding-top: calc(0.5em - 1px);
  position: relative;
  vertical-align: top;
}

.button:focus, .input:focus, .textarea:focus, .select select:focus, .file-cta:focus,
.file-name:focus, .pagination-previous:focus,
.pagination-next:focus,
.pagination-link:focus,
.pagination-ellipsis:focus, .is-focused.button, .is-focused.input, .is-focused.textarea, .select select.is-focused, .is-focused.file-cta,
.is-focused.file-name, .is-focused.pagination-previous,
.is-focused.pagination-next,
.is-focused.pagination-link,
.is-focused.pagination-ellipsis, .button:active, .input:active, .textarea:active, .select select:active, .file-cta:active,
.file-name:active, .pagination-previous:active,
.pagination-next:active,
.pagination-link:active,
.pagination-ellipsis:active, .is-active.button, .is-active.input, .is-active.textarea, .select select.is-active, .is-active.file-cta,
.is-active.file-name, .is-active.pagination-previous,
.is-active.pagination-next,
.is-active.pagination-link,
.is-active.pagination-ellipsis {
  outline: none;
}

.button[disabled], .input[disabled], .textarea[disabled], .select select[disabled], .file-cta[disabled],
.file-name[disabled], .pagination-previous[disabled],
.pagination-next[disabled],
.pagination-link[disabled],
.pagination-ellipsis[disabled],
fieldset[disabled] .button,
fieldset[disabled] .input,
fieldset[disabled] .textarea,
fieldset[disabled] .select select,
.select fieldset[disabled] select,
fieldset[disabled] .file-cta,
fieldset[disabled] .file-name,
fieldset[disabled] .pagination-previous,
fieldset[disabled] .pagination-next,
fieldset[disabled] .pagination-link,
fieldset[disabled] .pagination-ellipsis {
  cursor: not-allowed;
}

.button, .file, .breadcrumb, .pagination-previous,
.pagination-next,
.pagination-link,
.pagination-ellipsis, .tabs, .is-unselectable {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.select:not(.is-multiple):not(.is-loading)::after, .navbar-link:not(.is-arrowless)::after {
  border: 3px solid transparent;
  border-radius: 2px;
  border-right: 0;
  border-top: 0;
  content: " ";
  display: block;
  height: 0.625em;
  margin-top: -0.4375em;
  pointer-events: none;
  position: absolute;
  top: 50%;
  transform: rotate(-45deg);
  transform-origin: center;
  width: 0.625em;
}

.box:not(:last-child), .content:not(:last-child), .notification:not(:last-child), .progress:not(:last-child), .table:not(:last-child), .table-container:not(:last-child), .title:not(:last-child),
.subtitle:not(:last-child), .block:not(:last-child), .highlight:not(:last-child), .breadcrumb:not(:last-child), .level:not(:last-child), .message:not(:last-child), .pagination:not(:last-child), .tabs:not(:last-child) {
  margin-bottom: 1.5rem;
}

.delete, .modal-close {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  background-color: rgba(10, 10, 10, 0.2);
  border: none;
  border-radius: 290486px;
  cursor: pointer;
  pointer-events: auto;
  display: inline-block;
  flex-grow: 0;
  flex-shrink: 0;
  font-size: 0;
  height: 20px;
  max-height: 20px;
  max-width: 20px;
  min-height: 20px;
  min-width: 20px;
  outline: none;
  position: relative;
  vertical-align: top;
  width: 20px;
}

.delete::before, .modal-close::before, .delete::after, .modal-close::after {
  background-color: white;
  content: "";
  display: block;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translateX(-50%) translateY(-50%) rotate(45deg);
  transform-origin: center center;
}

.delete::before, .modal-close::before {
  height: 2px;
  width: 50%;
}

.delete::after, .modal-close::after {
  height: 50%;
  width: 2px;
}

.delete:hover, .modal-close:hover, .delete:focus, .modal-close:focus {
  background-color: rgba(10, 10, 10, 0.3);
}

.delete:active, .modal-close:active {
  background-color: rgba(10, 10, 10, 0.4);
}

.is-small.delete, .is-small.modal-close {
  height: 16px;
  max-height: 16px;
  max-width: 16px;
  min-height: 16px;
  min-width: 16px;
  width: 16px;
}

.is-medium.delete, .is-medium.modal-close {
  height: 24px;
  max-height: 24px;
  max-width: 24px;
  min-height: 24px;
  min-width: 24px;
  width: 24px;
}

.is-large.delete, .is-large.modal-close {
  height: 32px;
  max-height: 32px;
  max-width: 32px;
  min-height: 32px;
  min-width: 32px;
  width: 32px;
}

.button.is-loading::after, .loader, .select.is-loading::after, .control.is-loading::after {
  -webkit-animation: spinAround 500ms infinite linear;
          animation: spinAround 500ms infinite linear;
  border: 2px solid #dbdbdb;
  border-radius: 290486px;
  border-right-color: transparent;
  border-top-color: transparent;
  content: "";
  display: block;
  height: 1em;
  position: relative;
  width: 1em;
}

.image.is-square img,
.image.is-square .has-ratio, .image.is-1by1 img,
.image.is-1by1 .has-ratio, .image.is-5by4 img,
.image.is-5by4 .has-ratio, .image.is-4by3 img,
.image.is-4by3 .has-ratio, .image.is-3by2 img,
.image.is-3by2 .has-ratio, .image.is-5by3 img,
.image.is-5by3 .has-ratio, .image.is-16by9 img,
.image.is-16by9 .has-ratio, .image.is-2by1 img,
.image.is-2by1 .has-ratio, .image.is-3by1 img,
.image.is-3by1 .has-ratio, .image.is-4by5 img,
.image.is-4by5 .has-ratio, .image.is-3by4 img,
.image.is-3by4 .has-ratio, .image.is-2by3 img,
.image.is-2by3 .has-ratio, .image.is-3by5 img,
.image.is-3by5 .has-ratio, .image.is-9by16 img,
.image.is-9by16 .has-ratio, .image.is-1by2 img,
.image.is-1by2 .has-ratio, .image.is-1by3 img,
.image.is-1by3 .has-ratio, .modal, .modal-background, .is-overlay, .hero-video {
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
}

/* Bulma Base */
/*! minireset.css v0.0.6 | MIT License | github.com/jgthms/minireset.css */
html,
body,
p,
ol,
ul,
li,
dl,
dt,
dd,
blockquote,
figure,
fieldset,
legend,
textarea,
pre,
iframe,
hr,
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
  padding: 0;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: 100%;
  font-weight: normal;
}

ul {
  list-style: none;
}

button,
input,
select,
textarea {
  margin: 0;
}

html {
  box-sizing: border-box;
}

*, *::before, *::after {
  box-sizing: inherit;
}

img,
video {
  height: auto;
  max-width: 100%;
}

iframe {
  border: 0;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

td,
th {
  padding: 0;
}

td:not([align]),
th:not([align]) {
  text-align: inherit;
}

html {
  background-color: white;
  font-size: 16px;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  min-width: 300px;
  overflow-x: hidden;
  overflow-y: scroll;
  text-rendering: optimizeLegibility;
  -webkit-text-size-adjust: 100%;
     -moz-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
          text-size-adjust: 100%;
}

article,
aside,
figure,
footer,
header,
hgroup,
section {
  display: block;
}

body,
button,
input,
optgroup,
select,
textarea {
  font-family: BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
}

code,
pre {
  -moz-osx-font-smoothing: auto;
  -webkit-font-smoothing: auto;
  font-family: monospace;
}

body {
  color: #4a4a4a;
  font-size: 1em;
  font-weight: 400;
  line-height: 1.5;
}

a {
  color: #3273dc;
  cursor: pointer;
  text-decoration: none;
}

a strong {
  color: currentColor;
}

a:hover {
  color: #363636;
}

code {
  background-color: whitesmoke;
  color: #da1039;
  font-size: 0.875em;
  font-weight: normal;
  padding: 0.25em 0.5em 0.25em;
}

hr {
  background-color: whitesmoke;
  border: none;
  display: block;
  height: 2px;
  margin: 1.5rem 0;
}

img {
  height: auto;
  max-width: 100%;
}

input[type="checkbox"],
input[type="radio"] {
  vertical-align: baseline;
}

small {
  font-size: 0.875em;
}

span {
  font-style: inherit;
  font-weight: inherit;
}

strong {
  color: #363636;
  font-weight: 700;
}

fieldset {
  border: none;
}

pre {
  -webkit-overflow-scrolling: touch;
  background-color: whitesmoke;
  color: #4a4a4a;
  font-size: 0.875em;
  overflow-x: auto;
  padding: 1.25rem 1.5rem;
  white-space: pre;
  word-wrap: normal;
}

pre code {
  background-color: transparent;
  color: currentColor;
  font-size: 1em;
  padding: 0;
}

table td,
table th {
  vertical-align: top;
}

table td:not([align]),
table th:not([align]) {
  text-align: inherit;
}

table th {
  color: #363636;
}

@-webkit-keyframes spinAround {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}

@keyframes spinAround {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}

/* Bulma Elements */
.box {
  background-color: white;
  border-radius: 6px;
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1), 0 0px 0 1px rgba(10, 10, 10, 0.02);
  color: #4a4a4a;
  display: block;
  padding: 1.25rem;
}

a.box:hover, a.box:focus {
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1), 0 0 0 1px #3273dc;
}

a.box:active {
  box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.2), 0 0 0 1px #3273dc;
}

.button {
  background-color: white;
  border-color: #dbdbdb;
  border-width: 1px;
  color: #363636;
  cursor: pointer;
  justify-content: center;
  padding-bottom: calc(0.5em - 1px);
  padding-left: 1em;
  padding-right: 1em;
  padding-top: calc(0.5em - 1px);
  text-align: center;
  white-space: nowrap;
}

.button strong {
  color: inherit;
}

.button .icon, .button .icon.is-small, .button .icon.is-medium, .button .icon.is-large {
  height: 1.5em;
  width: 1.5em;
}

.button .icon:first-child:not(:last-child) {
  margin-left: calc(-0.5em - 1px);
  margin-right: 0.25em;
}

.button .icon:last-child:not(:first-child) {
  margin-left: 0.25em;
  margin-right: calc(-0.5em - 1px);
}

.button .icon:first-child:last-child {
  margin-left: calc(-0.5em - 1px);
  margin-right: calc(-0.5em - 1px);
}

.button:hover, .button.is-hovered {
  border-color: #b5b5b5;
  color: #363636;
}

.button:focus, .button.is-focused {
  border-color: #3273dc;
  color: #363636;
}

.button:focus:not(:active), .button.is-focused:not(:active) {
  box-shadow: 0 0 0 0.125em rgba(50, 115, 220, 0.25);
}

.button:active, .button.is-active {
  border-color: #4a4a4a;
  color: #363636;
}

.button.is-text {
  background-color: transparent;
  border-color: transparent;
  color: #4a4a4a;
  text-decoration: underline;
}

.button.is-text:hover, .button.is-text.is-hovered, .button.is-text:focus, .button.is-text.is-focused {
  background-color: whitesmoke;
  color: #363636;
}

.button.is-text:active, .button.is-text.is-active {
  background-color: #e8e8e8;
  color: #363636;
}

.button.is-text[disabled],
fieldset[disabled] .button.is-text {
  background-color: transparent;
  border-color: transparent;
  box-shadow: none;
}

.button.is-ghost {
  background: none;
  border-color: transparent;
  color: #3273dc;
  text-decoration: none;
}

.button.is-ghost:hover, .button.is-ghost.is-hovered {
  color: #3273dc;
  text-decoration: underline;
}

.button.is-white {
  background-color: white;
  border-color: transparent;
  color: #0a0a0a;
}

.button.is-white:hover, .button.is-white.is-hovered {
  background-color: #f9f9f9;
  border-color: transparent;
  color: #0a0a0a;
}

.button.is-white:focus, .button.is-white.is-focused {
  border-color: transparent;
  color: #0a0a0a;
}

.button.is-white:focus:not(:active), .button.is-white.is-focused:not(:active) {
  box-shadow: 0 0 0 0.125em rgba(255, 255, 255, 0.25);
}

.button.is-white:active, .button.is-white.is-active {
  background-color: #f2f2f2;
  border-color: transparent;
  color: #0a0a0a;
}

.button.is-white[disabled],
fieldset[disabled] .button.is-white {
  background-color: white;
  border-color: transparent;
  box-shadow: none;
}

.button.is-white.is-inverted {
  background-color: #0a0a0a;
  color: white;
}

.button.is-white.is-inverted:hover, .button.is-white.is-inverted.is-hovered {
  background-color: black;
}

.button.is-white.is-inverted[disabled],
fieldset[disabled] .button.is-white.is-inverted {
  background-color: #0a0a0a;
  border-color: transparent;
  box-shadow: none;
  color: white;
}

.button.is-white.is-loading::after {
  border-color: transparent transparent #0a0a0a #0a0a0a !important;
}

.button.is-white.is-outlined {
  background-color: transparent;
  border-color: white;
  color: white;
}

.button.is-white.is-outlined:hover, .button.is-white.is-outlined.is-hovered, .button.is-white.is-outlined:focus, .button.is-white.is-outlined.is-focused {
  background-color: white;
  border-color: white;
  color: #0a0a0a;
}

.button.is-white.is-outlined.is-loading::after {
  border-color: transparent transparent white white !important;
}

.button.is-white.is-outlined.is-loading:hover::after, .button.is-white.is-outlined.is-loading.is-hovered::after, .button.is-white.is-outlined.is-loading:focus::after, .button.is-white.is-outlined.is-loading.is-focused::after {
  border-color: transparent transparent #0a0a0a #0a0a0a !important;
}

.button.is-white.is-outlined[disabled],
fieldset[disabled] .button.is-white.is-outlined {
  background-color: transparent;
  border-color: white;
  box-shadow: none;
  color: white;
}

.button.is-white.is-inverted.is-outlined {
  background-color: transparent;
  border-color: #0a0a0a;
  color: #0a0a0a;
}

.button.is-white.is-inverted.is-outlined:hover, .button.is-white.is-inverted.is-outlined.is-hovered, .button.is-white.is-inverted.is-outlined:focus, .button.is-white.is-inverted.is-outlined.is-focused {
  background-color: #0a0a0a;
  color: white;
}

.button.is-white.is-inverted.is-outlined.is-loading:hover::after, .button.is-white.is-inverted.is-outlined.is-loading.is-hovered::after, .button.is-white.is-inverted.is-outlined.is-loading:focus::after, .button.is-white.is-inverted.is-outlined.is-loading.is-focused::after {
  border-color: transparent transparent white white !important;
}

.button.is-white.is-inverted.is-outlined[disabled],
fieldset[disabled] .button.is-white.is-inverted.is-outlined {
  background-color: transparent;
  border-color: #0a0a0a;
  box-shadow: none;
  color: #0a0a0a;
}

.button.is-black {
  background-color: #0a0a0a;
  border-color: transparent;
  color: white;
}

.button.is-black:hover, .button.is-black.is-hovered {
  background-color: #040404;
  border-color: transparent;
  color: white;
}

.button.is-black:focus, .button.is-black.is-focused {
  border-color: transparent;
  color: white;
}

.button.is-black:focus:not(:active), .button.is-black.is-focused:not(:active) {
  box-shadow: 0 0 0 0.125em rgba(10, 10, 10, 0.25);
}

.button.is-black:active, .button.is-black.is-active {
  background-color: black;
  border-color: transparent;
  color: white;
}

.button.is-black[disabled],
fieldset[disabled] .button.is-black {
  background-color: #0a0a0a;
  border-color: transparent;
  box-shadow: none;
}

.button.is-black.is-inverted {
  background-color: white;
  color: #0a0a0a;
}

.button.is-black.is-inverted:hover, .button.is-black.is-inverted.is-hovered {
  background-color: #f2f2f2;
}

.button.is-black.is-inverted[disabled],
fieldset[disabled] .button.is-black.is-inverted {
  background-color: white;
  border-color: transparent;
  box-shadow: none;
  color: #0a0a0a;
}

.button.is-black.is-loading::after {
  border-color: transparent transparent white white !important;
}

.button.is-black.is-outlined {
  background-color: transparent;
  border-color: #0a0a0a;
  color: #0a0a0a;
}

.button.is-black.is-outlined:hover, .button.is-black.is-outlined.is-hovered, .button.is-black.is-outlined:focus, .button.is-black.is-outlined.is-focused {
  background-color: #0a0a0a;
  border-color: #0a0a0a;
  color: white;
}

.button.is-black.is-outlined.is-loading::after {
  border-color: transparent transparent #0a0a0a #0a0a0a !important;
}

.button.is-black.is-outlined.is-loading:hover::after, .button.is-black.is-outlined.is-loading.is-hovered::after, .button.is-black.is-outlined.is-loading:focus::after, .button.is-black.is-outlined.is-loading.is-focused::after {
  border-color: transparent transparent white white !important;
}

.button.is-black.is-outlined[disabled],
fieldset[disabled] .button.is-black.is-outlined {
  background-color: transparent;
  border-color: #0a0a0a;
  box-shadow: none;
  color: #0a0a0a;
}

.button.is-black.is-inverted.is-outlined {
  background-color: transparent;
  border-color: white;
  color: white;
}

.button.is-black.is-inverted.is-outlined:hover, .button.is-black.is-inverted.is-outlined.is-hovered, .button.is-black.is-inverted.is-outlined:focus, .button.is-black.is-inverted.is-outlined.is-focused {
  background-color: white;
  color: #0a0a0a;
}

.button.is-black.is-inverted.is-outlined.is-loading:hover::after, .button.is-black.is-inverted.is-outlined.is-loading.is-hovered::after, .button.is-black.is-inverted.is-outlined.is-loading:focus::after, .button.is-black.is-inverted.is-outlined.is-loading.is-focused::after {
  border-color: transparent transparent #0a0a0a #0a0a0a !important;
}

.button.is-black.is-inverted.is-outlined[disabled],
fieldset[disabled] .button.is-black.is-inverted.is-outlined {
  background-color: transparent;
  border-color: white;
  box-shadow: none;
  color: white;
}

.button.is-light {
  background-color: whitesmoke;
  border-color: transparent;
  color: rgba(0, 0, 0, 0.7);
}

.button.is-light:hover, .button.is-light.is-hovered {
  background-color: #eeeeee;
  border-color: transparent;
  color: rgba(0, 0, 0, 0.7);
}

.button.is-light:focus, .button.is-light.is-focused {
  border-color: transparent;
  color: rgba(0, 0, 0, 0.7);
}

.button.is-light:focus:not(:active), .button.is-light.is-focused:not(:active) {
  box-shadow: 0 0 0 0.125em rgba(245, 245, 245, 0.25);
}

.button.is-light:active, .button.is-light.is-active {
  background-color: #e8e8e8;
  border-color: transparent;
  color: rgba(0, 0, 0, 0.7);
}

.button.is-light[disabled],
fieldset[disabled] .button.is-light {
  background-color: whitesmoke;
  border-color: transparent;
  box-shadow: none;
}

.button.is-light.is-inverted {
  background-color: rgba(0, 0, 0, 0.7);
  color: whitesmoke;
}

.button.is-light.is-inverted:hover, .button.is-light.is-inverted.is-hovered {
  background-color: rgba(0, 0, 0, 0.7);
}

.button.is-light.is-inverted[disabled],
fieldset[disabled] .button.is-light.is-inverted {
  background-color: rgba(0, 0, 0, 0.7);
  border-color: transparent;
  box-shadow: none;
  color: whitesmoke;
}

.button.is-light.is-loading::after {
  border-color: transparent transparent rgba(0, 0, 0, 0.7) rgba(0, 0, 0, 0.7) !important;
}

.button.is-light.is-outlined {
  background-color: transparent;
  border-color: whitesmoke;
  color: whitesmoke;
}

.button.is-light.is-outlined:hover, .button.is-light.is-outlined.is-hovered, .button.is-light.is-outlined:focus, .button.is-light.is-outlined.is-focused {
  background-color: whitesmoke;
  border-color: whitesmoke;
  color: rgba(0, 0, 0, 0.7);
}

.button.is-light.is-outlined.is-loading::after {
  border-color: transparent transparent whitesmoke whitesmoke !important;
}

.button.is-light.is-outlined.is-loading:hover::after, .button.is-light.is-outlined.is-loading.is-hovered::after, .button.is-light.is-outlined.is-loading:focus::after, .button.is-light.is-outlined.is-loading.is-focused::after {
  border-color: transparent transparent rgba(0, 0, 0, 0.7) rgba(0, 0, 0, 0.7) !important;
}

.button.is-light.is-outlined[disabled],
fieldset[disabled] .button.is-light.is-outlined {
  background-color: transparent;
  border-color: whitesmoke;
  box-shadow: none;
  color: whitesmoke;
}

.button.is-light.is-inverted.is-outlined {
  background-color: transparent;
  border-color: rgba(0, 0, 0, 0.7);
  color: rgba(0, 0, 0, 0.7);
}

.button.is-light.is-inverted.is-outlined:hover, .button.is-light.is-inverted.is-outlined.is-hovered, .button.is-light.is-inverted.is-outlined:focus, .button.is-light.is-inverted.is-outlined.is-focused {
  background-color: rgba(0, 0, 0, 0.7);
  color: whitesmoke;
}

.button.is-light.is-inverted.is-outlined.is-loading:hover::after, .button.is-light.is-inverted.is-outlined.is-loading.is-hovered::after, .button.is-light.is-inverted.is-outlined.is-loading:focus::after, .button.is-light.is-inverted.is-outlined.is-loading.is-focused::after {
  border-color: transparent transparent whitesmoke whitesmoke !important;
}

.button.is-light.is-inverted.is-outlined[disabled],
fieldset[disabled] .button.is-light.is-inverted.is-outlined {
  background-color: transparent;
  border-color: rgba(0, 0, 0, 0.7);
  box-shadow: none;
  color: rgba(0, 0, 0, 0.7);
}

.button.is-dark {
  background-color: #363636;
  border-color: transparent;
  color: #fff;
}

.button.is-dark:hover, .button.is-dark.is-hovered {
  background-color: #2f2f2f;
  border-color: transparent;
  color: #fff;
}

.button.is-dark:focus, .button.is-dark.is-focused {
  border-color: transparent;
  color: #fff;
}

.button.is-dark:focus:not(:active), .button.is-dark.is-focused:not(:active) {
  box-shadow: 0 0 0 0.125em rgba(54, 54, 54, 0.25);
}

.button.is-dark:active, .button.is-dark.is-active {
  background-color: #292929;
  border-color: transparent;
  color: #fff;
}

.button.is-dark[disabled],
fieldset[disabled] .button.is-dark {
  background-color: #363636;
  border-color: transparent;
  box-shadow: none;
}

.button.is-dark.is-inverted {
  background-color: #fff;
  color: #363636;
}

.button.is-dark.is-inverted:hover, .button.is-dark.is-inverted.is-hovered {
  background-color: #f2f2f2;
}

.button.is-dark.is-inverted[disabled],
fieldset[disabled] .button.is-dark.is-inverted {
  background-color: #fff;
  border-color: transparent;
  box-shadow: none;
  color: #363636;
}

.button.is-dark.is-loading::after {
  border-color: transparent transparent #fff #fff !important;
}

.button.is-dark.is-outlined {
  background-color: transparent;
  border-color: #363636;
  color: #363636;
}

.button.is-dark.is-outlined:hover, .button.is-dark.is-outlined.is-hovered, .button.is-dark.is-outlined:focus, .button.is-dark.is-outlined.is-focused {
  background-color: #363636;
  border-color: #363636;
  color: #fff;
}

.button.is-dark.is-outlined.is-loading::after {
  border-color: transparent transparent #363636 #363636 !important;
}

.button.is-dark.is-outlined.is-loading:hover::after, .button.is-dark.is-outlined.is-loading.is-hovered::after, .button.is-dark.is-outlined.is-loading:focus::after, .button.is-dark.is-outlined.is-loading.is-focused::after {
  border-color: transparent transparent #fff #fff !important;
}

.button.is-dark.is-outlined[disabled],
fieldset[disabled] .button.is-dark.is-outlined {
  background-color: transparent;
  border-color: #363636;
  box-shadow: none;
  color: #363636;
}

.button.is-dark.is-inverted.is-outlined {
  background-color: transparent;
  border-color: #fff;
  color: #fff;
}

.button.is-dark.is-inverted.is-outlined:hover, .button.is-dark.is-inverted.is-outlined.is-hovered, .button.is-dark.is-inverted.is-outlined:focus, .button.is-dark.is-inverted.is-outlined.is-focused {
  background-color: #fff;
  color: #363636;
}

.button.is-dark.is-inverted.is-outlined.is-loading:hover::after, .button.is-dark.is-inverted.is-outlined.is-loading.is-hovered::after, .button.is-dark.is-inverted.is-outlined.is-loading:focus::after, .button.is-dark.is-inverted.is-outlined.is-loading.is-focused::after {
  border-color: transparent transparent #363636 #363636 !important;
}

.button.is-dark.is-inverted.is-outlined[disabled],
fieldset[disabled] .button.is-dark.is-inverted.is-outlined {
  background-color: transparent;
  border-color: #fff;
  box-shadow: none;
  color: #fff;
}

.button.is-primary {
  background-color: #00d1b2;
  border-color: transparent;
  color: #fff;
}

.button.is-primary:hover, .button.is-primary.is-hovered {
  background-color: #00c4a7;
  border-color: transparent;
  color: #fff;
}

.button.is-primary:focus, .button.is-primary.is-focused {
  border-color: transparent;
  color: #fff;
}

.button.is-primary:focus:not(:active), .button.is-primary.is-focused:not(:active) {
  box-shadow: 0 0 0 0.125em rgba(0, 209, 178, 0.25);
}

.button.is-primary:active, .button.is-primary.is-active {
  background-color: #00b89c;
  border-color: transparent;
  color: #fff;
}

.button.is-primary[disabled],
fieldset[disabled] .button.is-primary {
  background-color: #00d1b2;
  border-color: transparent;
  box-shadow: none;
}

.button.is-primary.is-inverted {
  background-color: #fff;
  color: #00d1b2;
}

.button.is-primary.is-inverted:hover, .button.is-primary.is-inverted.is-hovered {
  background-color: #f2f2f2;
}

.button.is-primary.is-inverted[disabled],
fieldset[disabled] .button.is-primary.is-inverted {
  background-color: #fff;
  border-color: transparent;
  box-shadow: none;
  color: #00d1b2;
}

.button.is-primary.is-loading::after {
  border-color: transparent transparent #fff #fff !important;
}

.button.is-primary.is-outlined {
  background-color: transparent;
  border-color: #00d1b2;
  color: #00d1b2;
}

.button.is-primary.is-outlined:hover, .button.is-primary.is-outlined.is-hovered, .button.is-primary.is-outlined:focus, .button.is-primary.is-outlined.is-focused {
  background-color: #00d1b2;
  border-color: #00d1b2;
  color: #fff;
}

.button.is-primary.is-outlined.is-loading::after {
  border-color: transparent transparent #00d1b2 #00d1b2 !important;
}

.button.is-primary.is-outlined.is-loading:hover::after, .button.is-primary.is-outlined.is-loading.is-hovered::after, .button.is-primary.is-outlined.is-loading:focus::after, .button.is-primary.is-outlined.is-loading.is-focused::after {
  border-color: transparent transparent #fff #fff !important;
}

.button.is-primary.is-outlined[disabled],
fieldset[disabled] .button.is-primary.is-outlined {
  background-color: transparent;
  border-color: #00d1b2;
  box-shadow: none;
  color: #00d1b2;
}

.button.is-primary.is-inverted.is-outlined {
  background-color: transparent;
  border-color: #fff;
  color: #fff;
}

.button.is-primary.is-inverted.is-outlined:hover, .button.is-primary.is-inverted.is-outlined.is-hovered, .button.is-primary.is-inverted.is-outlined:focus, .button.is-primary.is-inverted.is-outlined.is-focused {
  background-color: #fff;
  color: #00d1b2;
}

.button.is-primary.is-inverted.is-outlined.is-loading:hover::after, .button.is-primary.is-inverted.is-outlined.is-loading.is-hovered::after, .button.is-primary.is-inverted.is-outlined.is-loading:focus::after, .button.is-primary.is-inverted.is-outlined.is-loading.is-focused::after {
  border-color: transparent transparent #00d1b2 #00d1b2 !important;
}

.button.is-primary.is-inverted.is-outlined[disabled],
fieldset[disabled] .button.is-primary.is-inverted.is-outlined {
  background-color: transparent;
  border-color: #fff;
  box-shadow: none;
  color: #fff;
}

.button.is-primary.is-light {
  background-color: #ebfffc;
  color: #00947e;
}

.button.is-primary.is-light:hover, .button.is-primary.is-light.is-hovered {
  background-color: #defffa;
  border-color: transparent;
  color: #00947e;
}

.button.is-primary.is-light:active, .button.is-primary.is-light.is-active {
  background-color: #d1fff8;
  border-color: transparent;
  color: #00947e;
}

.button.is-link {
  background-color: #3273dc;
  border-color: transparent;
  color: #fff;
}

.button.is-link:hover, .button.is-link.is-hovered {
  background-color: #276cda;
  border-color: transparent;
  color: #fff;
}

.button.is-link:focus, .button.is-link.is-focused {
  border-color: transparent;
  color: #fff;
}

.button.is-link:focus:not(:active), .button.is-link.is-focused:not(:active) {
  box-shadow: 0 0 0 0.125em rgba(50, 115, 220, 0.25);
}

.button.is-link:active, .button.is-link.is-active {
  background-color: #2366d1;
  border-color: transparent;
  color: #fff;
}

.button.is-link[disabled],
fieldset[disabled] .button.is-link {
  background-color: #3273dc;
  border-color: transparent;
  box-shadow: none;
}

.button.is-link.is-inverted {
  background-color: #fff;
  color: #3273dc;
}

.button.is-link.is-inverted:hover, .button.is-link.is-inverted.is-hovered {
  background-color: #f2f2f2;
}

.button.is-link.is-inverted[disabled],
fieldset[disabled] .button.is-link.is-inverted {
  background-color: #fff;
  border-color: transparent;
  box-shadow: none;
  color: #3273dc;
}

.button.is-link.is-loading::after {
  border-color: transparent transparent #fff #fff !important;
}

.button.is-link.is-outlined {
  background-color: transparent;
  border-color: #3273dc;
  color: #3273dc;
}

.button.is-link.is-outlined:hover, .button.is-link.is-outlined.is-hovered, .button.is-link.is-outlined:focus, .button.is-link.is-outlined.is-focused {
  background-color: #3273dc;
  border-color: #3273dc;
  color: #fff;
}

.button.is-link.is-outlined.is-loading::after {
  border-color: transparent transparent #3273dc #3273dc !important;
}

.button.is-link.is-outlined.is-loading:hover::after, .button.is-link.is-outlined.is-loading.is-hovered::after, .button.is-link.is-outlined.is-loading:focus::after, .button.is-link.is-outlined.is-loading.is-focused::after {
  border-color: transparent transparent #fff #fff !important;
}

.button.is-link.is-outlined[disabled],
fieldset[disabled] .button.is-link.is-outlined {
  background-color: transparent;
  border-color: #3273dc;
  box-shadow: none;
  color: #3273dc;
}

.button.is-link.is-inverted.is-outlined {
  background-color: transparent;
  border-color: #fff;
  color: #fff;
}

.button.is-link.is-inverted.is-outlined:hover, .button.is-link.is-inverted.is-outlined.is-hovered, .button.is-link.is-inverted.is-outlined:focus, .button.is-link.is-inverted.is-outlined.is-focused {
  background-color: #fff;
  color: #3273dc;
}

.button.is-link.is-inverted.is-outlined.is-loading:hover::after, .button.is-link.is-inverted.is-outlined.is-loading.is-hovered::after, .button.is-link.is-inverted.is-outlined.is-loading:focus::after, .button.is-link.is-inverted.is-outlined.is-loading.is-focused::after {
  border-color: transparent transparent #3273dc #3273dc !important;
}

.button.is-link.is-inverted.is-outlined[disabled],
fieldset[disabled] .button.is-link.is-inverted.is-outlined {
  background-color: transparent;
  border-color: #fff;
  box-shadow: none;
  color: #fff;
}

.button.is-link.is-light {
  background-color: #eef3fc;
  color: #2160c4;
}

.button.is-link.is-light:hover, .button.is-link.is-light.is-hovered {
  background-color: #e3ecfa;
  border-color: transparent;
  color: #2160c4;
}

.button.is-link.is-light:active, .button.is-link.is-light.is-active {
  background-color: #d8e4f8;
  border-color: transparent;
  color: #2160c4;
}

.button.is-info {
  background-color: #3298dc;
  border-color: transparent;
  color: #fff;
}

.button.is-info:hover, .button.is-info.is-hovered {
  background-color: #2793da;
  border-color: transparent;
  color: #fff;
}

.button.is-info:focus, .button.is-info.is-focused {
  border-color: transparent;
  color: #fff;
}

.button.is-info:focus:not(:active), .button.is-info.is-focused:not(:active) {
  box-shadow: 0 0 0 0.125em rgba(50, 152, 220, 0.25);
}

.button.is-info:active, .button.is-info.is-active {
  background-color: #238cd1;
  border-color: transparent;
  color: #fff;
}

.button.is-info[disabled],
fieldset[disabled] .button.is-info {
  background-color: #3298dc;
  border-color: transparent;
  box-shadow: none;
}

.button.is-info.is-inverted {
  background-color: #fff;
  color: #3298dc;
}

.button.is-info.is-inverted:hover, .button.is-info.is-inverted.is-hovered {
  background-color: #f2f2f2;
}

.button.is-info.is-inverted[disabled],
fieldset[disabled] .button.is-info.is-inverted {
  background-color: #fff;
  border-color: transparent;
  box-shadow: none;
  color: #3298dc;
}

.button.is-info.is-loading::after {
  border-color: transparent transparent #fff #fff !important;
}

.button.is-info.is-outlined {
  background-color: transparent;
  border-color: #3298dc;
  color: #3298dc;
}

.button.is-info.is-outlined:hover, .button.is-info.is-outlined.is-hovered, .button.is-info.is-outlined:focus, .button.is-info.is-outlined.is-focused {
  background-color: #3298dc;
  border-color: #3298dc;
  color: #fff;
}

.button.is-info.is-outlined.is-loading::after {
  border-color: transparent transparent #3298dc #3298dc !important;
}

.button.is-info.is-outlined.is-loading:hover::after, .button.is-info.is-outlined.is-loading.is-hovered::after, .button.is-info.is-outlined.is-loading:focus::after, .button.is-info.is-outlined.is-loading.is-focused::after {
  border-color: transparent transparent #fff #fff !important;
}

.button.is-info.is-outlined[disabled],
fieldset[disabled] .button.is-info.is-outlined {
  background-color: transparent;
  border-color: #3298dc;
  box-shadow: none;
  color: #3298dc;
}

.button.is-info.is-inverted.is-outlined {
  background-color: transparent;
  border-color: #fff;
  color: #fff;
}

.button.is-info.is-inverted.is-outlined:hover, .button.is-info.is-inverted.is-outlined.is-hovered, .button.is-info.is-inverted.is-outlined:focus, .button.is-info.is-inverted.is-outlined.is-focused {
  background-color: #fff;
  color: #3298dc;
}

.button.is-info.is-inverted.is-outlined.is-loading:hover::after, .button.is-info.is-inverted.is-outlined.is-loading.is-hovered::after, .button.is-info.is-inverted.is-outlined.is-loading:focus::after, .button.is-info.is-inverted.is-outlined.is-loading.is-focused::after {
  border-color: transparent transparent #3298dc #3298dc !important;
}

.button.is-info.is-inverted.is-outlined[disabled],
fieldset[disabled] .button.is-info.is-inverted.is-outlined {
  background-color: transparent;
  border-color: #fff;
  box-shadow: none;
  color: #fff;
}

.button.is-info.is-light {
  background-color: #eef6fc;
  color: #1d72aa;
}

.button.is-info.is-light:hover, .button.is-info.is-light.is-hovered {
  background-color: #e3f1fa;
  border-color: transparent;
  color: #1d72aa;
}

.button.is-info.is-light:active, .button.is-info.is-light.is-active {
  background-color: #d8ebf8;
  border-color: transparent;
  color: #1d72aa;
}

.button.is-success {
  background-color: #48c774;
  border-color: transparent;
  color: #fff;
}

.button.is-success:hover, .button.is-success.is-hovered {
  background-color: #3ec46d;
  border-color: transparent;
  color: #fff;
}

.button.is-success:focus, .button.is-success.is-focused {
  border-color: transparent;
  color: #fff;
}

.button.is-success:focus:not(:active), .button.is-success.is-focused:not(:active) {
  box-shadow: 0 0 0 0.125em rgba(72, 199, 116, 0.25);
}

.button.is-success:active, .button.is-success.is-active {
  background-color: #3abb67;
  border-color: transparent;
  color: #fff;
}

.button.is-success[disabled],
fieldset[disabled] .button.is-success {
  background-color: #48c774;
  border-color: transparent;
  box-shadow: none;
}

.button.is-success.is-inverted {
  background-color: #fff;
  color: #48c774;
}

.button.is-success.is-inverted:hover, .button.is-success.is-inverted.is-hovered {
  background-color: #f2f2f2;
}

.button.is-success.is-inverted[disabled],
fieldset[disabled] .button.is-success.is-inverted {
  background-color: #fff;
  border-color: transparent;
  box-shadow: none;
  color: #48c774;
}

.button.is-success.is-loading::after {
  border-color: transparent transparent #fff #fff !important;
}

.button.is-success.is-outlined {
  background-color: transparent;
  border-color: #48c774;
  color: #48c774;
}

.button.is-success.is-outlined:hover, .button.is-success.is-outlined.is-hovered, .button.is-success.is-outlined:focus, .button.is-success.is-outlined.is-focused {
  background-color: #48c774;
  border-color: #48c774;
  color: #fff;
}

.button.is-success.is-outlined.is-loading::after {
  border-color: transparent transparent #48c774 #48c774 !important;
}

.button.is-success.is-outlined.is-loading:hover::after, .button.is-success.is-outlined.is-loading.is-hovered::after, .button.is-success.is-outlined.is-loading:focus::after, .button.is-success.is-outlined.is-loading.is-focused::after {
  border-color: transparent transparent #fff #fff !important;
}

.button.is-success.is-outlined[disabled],
fieldset[disabled] .button.is-success.is-outlined {
  background-color: transparent;
  border-color: #48c774;
  box-shadow: none;
  color: #48c774;
}

.button.is-success.is-inverted.is-outlined {
  background-color: transparent;
  border-color: #fff;
  color: #fff;
}

.button.is-success.is-inverted.is-outlined:hover, .button.is-success.is-inverted.is-outlined.is-hovered, .button.is-success.is-inverted.is-outlined:focus, .button.is-success.is-inverted.is-outlined.is-focused {
  background-color: #fff;
  color: #48c774;
}

.button.is-success.is-inverted.is-outlined.is-loading:hover::after, .button.is-success.is-inverted.is-outlined.is-loading.is-hovered::after, .button.is-success.is-inverted.is-outlined.is-loading:focus::after, .button.is-success.is-inverted.is-outlined.is-loading.is-focused::after {
  border-color: transparent transparent #48c774 #48c774 !important;
}

.button.is-success.is-inverted.is-outlined[disabled],
fieldset[disabled] .button.is-success.is-inverted.is-outlined {
  background-color: transparent;
  border-color: #fff;
  box-shadow: none;
  color: #fff;
}

.button.is-success.is-light {
  background-color: #effaf3;
  color: #257942;
}

.button.is-success.is-light:hover, .button.is-success.is-light.is-hovered {
  background-color: #e6f7ec;
  border-color: transparent;
  color: #257942;
}

.button.is-success.is-light:active, .button.is-success.is-light.is-active {
  background-color: #dcf4e4;
  border-color: transparent;
  color: #257942;
}

.button.is-warning {
  background-color: #ffdd57;
  border-color: transparent;
  color: rgba(0, 0, 0, 0.7);
}

.button.is-warning:hover, .button.is-warning.is-hovered {
  background-color: #ffdb4a;
  border-color: transparent;
  color: rgba(0, 0, 0, 0.7);
}

.button.is-warning:focus, .button.is-warning.is-focused {
  border-color: transparent;
  color: rgba(0, 0, 0, 0.7);
}

.button.is-warning:focus:not(:active), .button.is-warning.is-focused:not(:active) {
  box-shadow: 0 0 0 0.125em rgba(255, 221, 87, 0.25);
}

.button.is-warning:active, .button.is-warning.is-active {
  background-color: #ffd83d;
  border-color: transparent;
  color: rgba(0, 0, 0, 0.7);
}

.button.is-warning[disabled],
fieldset[disabled] .button.is-warning {
  background-color: #ffdd57;
  border-color: transparent;
  box-shadow: none;
}

.button.is-warning.is-inverted {
  background-color: rgba(0, 0, 0, 0.7);
  color: #ffdd57;
}

.button.is-warning.is-inverted:hover, .button.is-warning.is-inverted.is-hovered {
  background-color: rgba(0, 0, 0, 0.7);
}

.button.is-warning.is-inverted[disabled],
fieldset[disabled] .button.is-warning.is-inverted {
  background-color: rgba(0, 0, 0, 0.7);
  border-color: transparent;
  box-shadow: none;
  color: #ffdd57;
}

.button.is-warning.is-loading::after {
  border-color: transparent transparent rgba(0, 0, 0, 0.7) rgba(0, 0, 0, 0.7) !important;
}

.button.is-warning.is-outlined {
  background-color: transparent;
  border-color: #ffdd57;
  color: #ffdd57;
}

.button.is-warning.is-outlined:hover, .button.is-warning.is-outlined.is-hovered, .button.is-warning.is-outlined:focus, .button.is-warning.is-outlined.is-focused {
  background-color: #ffdd57;
  border-color: #ffdd57;
  color: rgba(0, 0, 0, 0.7);
}

.button.is-warning.is-outlined.is-loading::after {
  border-color: transparent transparent #ffdd57 #ffdd57 !important;
}

.button.is-warning.is-outlined.is-loading:hover::after, .button.is-warning.is-outlined.is-loading.is-hovered::after, .button.is-warning.is-outlined.is-loading:focus::after, .button.is-warning.is-outlined.is-loading.is-focused::after {
  border-color: transparent transparent rgba(0, 0, 0, 0.7) rgba(0, 0, 0, 0.7) !important;
}

.button.is-warning.is-outlined[disabled],
fieldset[disabled] .button.is-warning.is-outlined {
  background-color: transparent;
  border-color: #ffdd57;
  box-shadow: none;
  color: #ffdd57;
}

.button.is-warning.is-inverted.is-outlined {
  background-color: transparent;
  border-color: rgba(0, 0, 0, 0.7);
  color: rgba(0, 0, 0, 0.7);
}

.button.is-warning.is-inverted.is-outlined:hover, .button.is-warning.is-inverted.is-outlined.is-hovered, .button.is-warning.is-inverted.is-outlined:focus, .button.is-warning.is-inverted.is-outlined.is-focused {
  background-color: rgba(0, 0, 0, 0.7);
  color: #ffdd57;
}

.button.is-warning.is-inverted.is-outlined.is-loading:hover::after, .button.is-warning.is-inverted.is-outlined.is-loading.is-hovered::after, .button.is-warning.is-inverted.is-outlined.is-loading:focus::after, .button.is-warning.is-inverted.is-outlined.is-loading.is-focused::after {
  border-color: transparent transparent #ffdd57 #ffdd57 !important;
}

.button.is-warning.is-inverted.is-outlined[disabled],
fieldset[disabled] .button.is-warning.is-inverted.is-outlined {
  background-color: transparent;
  border-color: rgba(0, 0, 0, 0.7);
  box-shadow: none;
  color: rgba(0, 0, 0, 0.7);
}

.button.is-warning.is-light {
  background-color: #fffbeb;
  color: #947600;
}

.button.is-warning.is-light:hover, .button.is-warning.is-light.is-hovered {
  background-color: #fff8de;
  border-color: transparent;
  color: #947600;
}

.button.is-warning.is-light:active, .button.is-warning.is-light.is-active {
  background-color: #fff6d1;
  border-color: transparent;
  color: #947600;
}

.button.is-danger {
  background-color: #f14668;
  border-color: transparent;
  color: #fff;
}

.button.is-danger:hover, .button.is-danger.is-hovered {
  background-color: #f03a5f;
  border-color: transparent;
  color: #fff;
}

.button.is-danger:focus, .button.is-danger.is-focused {
  border-color: transparent;
  color: #fff;
}

.button.is-danger:focus:not(:active), .button.is-danger.is-focused:not(:active) {
  box-shadow: 0 0 0 0.125em rgba(241, 70, 104, 0.25);
}

.button.is-danger:active, .button.is-danger.is-active {
  background-color: #ef2e55;
  border-color: transparent;
  color: #fff;
}

.button.is-danger[disabled],
fieldset[disabled] .button.is-danger {
  background-color: #f14668;
  border-color: transparent;
  box-shadow: none;
}

.button.is-danger.is-inverted {
  background-color: #fff;
  color: #f14668;
}

.button.is-danger.is-inverted:hover, .button.is-danger.is-inverted.is-hovered {
  background-color: #f2f2f2;
}

.button.is-danger.is-inverted[disabled],
fieldset[disabled] .button.is-danger.is-inverted {
  background-color: #fff;
  border-color: transparent;
  box-shadow: none;
  color: #f14668;
}

.button.is-danger.is-loading::after {
  border-color: transparent transparent #fff #fff !important;
}

.button.is-danger.is-outlined {
  background-color: transparent;
  border-color: #f14668;
  color: #f14668;
}

.button.is-danger.is-outlined:hover, .button.is-danger.is-outlined.is-hovered, .button.is-danger.is-outlined:focus, .button.is-danger.is-outlined.is-focused {
  background-color: #f14668;
  border-color: #f14668;
  color: #fff;
}

.button.is-danger.is-outlined.is-loading::after {
  border-color: transparent transparent #f14668 #f14668 !important;
}

.button.is-danger.is-outlined.is-loading:hover::after, .button.is-danger.is-outlined.is-loading.is-hovered::after, .button.is-danger.is-outlined.is-loading:focus::after, .button.is-danger.is-outlined.is-loading.is-focused::after {
  border-color: transparent transparent #fff #fff !important;
}

.button.is-danger.is-outlined[disabled],
fieldset[disabled] .button.is-danger.is-outlined {
  background-color: transparent;
  border-color: #f14668;
  box-shadow: none;
  color: #f14668;
}

.button.is-danger.is-inverted.is-outlined {
  background-color: transparent;
  border-color: #fff;
  color: #fff;
}

.button.is-danger.is-inverted.is-outlined:hover, .button.is-danger.is-inverted.is-outlined.is-hovered, .button.is-danger.is-inverted.is-outlined:focus, .button.is-danger.is-inverted.is-outlined.is-focused {
  background-color: #fff;
  color: #f14668;
}

.button.is-danger.is-inverted.is-outlined.is-loading:hover::after, .button.is-danger.is-inverted.is-outlined.is-loading.is-hovered::after, .button.is-danger.is-inverted.is-outlined.is-loading:focus::after, .button.is-danger.is-inverted.is-outlined.is-loading.is-focused::after {
  border-color: transparent transparent #f14668 #f14668 !important;
}

.button.is-danger.is-inverted.is-outlined[disabled],
fieldset[disabled] .button.is-danger.is-inverted.is-outlined {
  background-color: transparent;
  border-color: #fff;
  box-shadow: none;
  color: #fff;
}

.button.is-danger.is-light {
  background-color: #feecf0;
  color: #cc0f35;
}

.button.is-danger.is-light:hover, .button.is-danger.is-light.is-hovered {
  background-color: #fde0e6;
  border-color: transparent;
  color: #cc0f35;
}

.button.is-danger.is-light:active, .button.is-danger.is-light.is-active {
  background-color: #fcd4dc;
  border-color: transparent;
  color: #cc0f35;
}

.button.is-small {
  font-size: 0.75rem;
}

.button.is-small:not(.is-rounded) {
  border-radius: 2px;
}

.button.is-normal {
  font-size: 1rem;
}

.button.is-medium {
  font-size: 1.25rem;
}

.button.is-large {
  font-size: 1.5rem;
}

.button[disabled],
fieldset[disabled] .button {
  background-color: white;
  border-color: #dbdbdb;
  box-shadow: none;
  opacity: 0.5;
}

.button.is-fullwidth {
  display: flex;
  width: 100%;
}

.button.is-loading {
  color: transparent !important;
  pointer-events: none;
}

.button.is-loading::after {
  position: absolute;
  left: calc(50% - (1em / 2));
  top: calc(50% - (1em / 2));
  position: absolute !important;
}

.button.is-static {
  background-color: whitesmoke;
  border-color: #dbdbdb;
  color: #7a7a7a;
  box-shadow: none;
  pointer-events: none;
}

.button.is-rounded {
  border-radius: 290486px;
  padding-left: calc(1em + 0.25em);
  padding-right: calc(1em + 0.25em);
}

.buttons {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.buttons .button {
  margin-bottom: 0.5rem;
}

.buttons .button:not(:last-child):not(.is-fullwidth) {
  margin-right: 0.5rem;
}

.buttons:last-child {
  margin-bottom: -0.5rem;
}

.buttons:not(:last-child) {
  margin-bottom: 1rem;
}

.buttons.are-small .button:not(.is-normal):not(.is-medium):not(.is-large) {
  font-size: 0.75rem;
}

.buttons.are-small .button:not(.is-normal):not(.is-medium):not(.is-large):not(.is-rounded) {
  border-radius: 2px;
}

.buttons.are-medium .button:not(.is-small):not(.is-normal):not(.is-large) {
  font-size: 1.25rem;
}

.buttons.are-large .button:not(.is-small):not(.is-normal):not(.is-medium) {
  font-size: 1.5rem;
}

.buttons.has-addons .button:not(:first-child) {
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
}

.buttons.has-addons .button:not(:last-child) {
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
  margin-right: -1px;
}

.buttons.has-addons .button:last-child {
  margin-right: 0;
}

.buttons.has-addons .button:hover, .buttons.has-addons .button.is-hovered {
  z-index: 2;
}

.buttons.has-addons .button:focus, .buttons.has-addons .button.is-focused, .buttons.has-addons .button:active, .buttons.has-addons .button.is-active, .buttons.has-addons .button.is-selected {
  z-index: 3;
}

.buttons.has-addons .button:focus:hover, .buttons.has-addons .button.is-focused:hover, .buttons.has-addons .button:active:hover, .buttons.has-addons .button.is-active:hover, .buttons.has-addons .button.is-selected:hover {
  z-index: 4;
}

.buttons.has-addons .button.is-expanded {
  flex-grow: 1;
  flex-shrink: 1;
}

.buttons.is-centered {
  justify-content: center;
}

.buttons.is-centered:not(.has-addons) .button:not(.is-fullwidth) {
  margin-left: 0.25rem;
  margin-right: 0.25rem;
}

.buttons.is-right {
  justify-content: flex-end;
}

.buttons.is-right:not(.has-addons) .button:not(.is-fullwidth) {
  margin-left: 0.25rem;
  margin-right: 0.25rem;
}

.container {
  flex-grow: 1;
  margin: 0 auto;
  position: relative;
  width: auto;
}

.container.is-fluid {
  max-width: none !important;
  padding-left: 32px;
  padding-right: 32px;
  width: 100%;
}

@media screen and (min-width: 1024px) {
  .container {
    max-width: 960px;
  }
}

@media screen and (max-width: 1215px) {
  .container.is-widescreen:not(.is-max-desktop) {
    max-width: 1152px;
  }
}

@media screen and (max-width: 1407px) {
  .container.is-fullhd:not(.is-max-desktop):not(.is-max-widescreen) {
    max-width: 1344px;
  }
}

@media screen and (min-width: 1216px) {
  .container:not(.is-max-desktop) {
    max-width: 1152px;
  }
}

@media screen and (min-width: 1408px) {
  .container:not(.is-max-desktop):not(.is-max-widescreen) {
    max-width: 1344px;
  }
}

.content li + li {
  margin-top: 0.25em;
}

.content p:not(:last-child),
.content dl:not(:last-child),
.content ol:not(:last-child),
.content ul:not(:last-child),
.content blockquote:not(:last-child),
.content pre:not(:last-child),
.content table:not(:last-child) {
  margin-bottom: 1em;
}

.content h1,
.content h2,
.content h3,
.content h4,
.content h5,
.content h6 {
  color: #363636;
  font-weight: 600;
  line-height: 1.125;
}

.content h1 {
  font-size: 2em;
  margin-bottom: 0.5em;
}

.content h1:not(:first-child) {
  margin-top: 1em;
}

.content h2 {
  font-size: 1.75em;
  margin-bottom: 0.5714em;
}

.content h2:not(:first-child) {
  margin-top: 1.1428em;
}

.content h3 {
  font-size: 1.5em;
  margin-bottom: 0.6666em;
}

.content h3:not(:first-child) {
  margin-top: 1.3333em;
}

.content h4 {
  font-size: 1.25em;
  margin-bottom: 0.8em;
}

.content h5 {
  font-size: 1.125em;
  margin-bottom: 0.8888em;
}

.content h6 {
  font-size: 1em;
  margin-bottom: 1em;
}

.content blockquote {
  background-color: whitesmoke;
  border-left: 5px solid #dbdbdb;
  padding: 1.25em 1.5em;
}

.content ol {
  list-style-position: outside;
  margin-left: 2em;
  margin-top: 1em;
}

.content ol:not([type]) {
  list-style-type: decimal;
}

.content ol:not([type]).is-lower-alpha {
  list-style-type: lower-alpha;
}

.content ol:not([type]).is-lower-roman {
  list-style-type: lower-roman;
}

.content ol:not([type]).is-upper-alpha {
  list-style-type: upper-alpha;
}

.content ol:not([type]).is-upper-roman {
  list-style-type: upper-roman;
}

.content ul {
  list-style: disc outside;
  margin-left: 2em;
  margin-top: 1em;
}

.content ul ul {
  list-style-type: circle;
  margin-top: 0.5em;
}

.content ul ul ul {
  list-style-type: square;
}

.content dd {
  margin-left: 2em;
}

.content figure {
  margin-left: 2em;
  margin-right: 2em;
  text-align: center;
}

.content figure:not(:first-child) {
  margin-top: 2em;
}

.content figure:not(:last-child) {
  margin-bottom: 2em;
}

.content figure img {
  display: inline-block;
}

.content figure figcaption {
  font-style: italic;
}

.content pre {
  -webkit-overflow-scrolling: touch;
  overflow-x: auto;
  padding: 1.25em 1.5em;
  white-space: pre;
  word-wrap: normal;
}

.content sup,
.content sub {
  font-size: 75%;
}

.content table {
  width: 100%;
}

.content table td,
.content table th {
  border: 1px solid #dbdbdb;
  border-width: 0 0 1px;
  padding: 0.5em 0.75em;
  vertical-align: top;
}

.content table th {
  color: #363636;
}

.content table th:not([align]) {
  text-align: inherit;
}

.content table thead td,
.content table thead th {
  border-width: 0 0 2px;
  color: #363636;
}

.content table tfoot td,
.content table tfoot th {
  border-width: 2px 0 0;
  color: #363636;
}

.content table tbody tr:last-child td,
.content table tbody tr:last-child th {
  border-bottom-width: 0;
}

.content .tabs li + li {
  margin-top: 0;
}

.content.is-small {
  font-size: 0.75rem;
}

.content.is-medium {
  font-size: 1.25rem;
}

.content.is-large {
  font-size: 1.5rem;
}

.icon {
  align-items: center;
  display: inline-flex;
  justify-content: center;
  height: 1.5rem;
  width: 1.5rem;
}

.icon.is-small {
  height: 1rem;
  width: 1rem;
}

.icon.is-medium {
  height: 2rem;
  width: 2rem;
}

.icon.is-large {
  height: 3rem;
  width: 3rem;
}

.icon-text {
  align-items: flex-start;
  color: inherit;
  display: inline-flex;
  flex-wrap: wrap;
  line-height: 1.5rem;
  vertical-align: top;
}

.icon-text .icon {
  flex-grow: 0;
  flex-shrink: 0;
}

.icon-text .icon:not(:last-child) {
  margin-right: 0.25em;
}

.icon-text .icon:not(:first-child) {
  margin-left: 0.25em;
}

div.icon-text {
  display: flex;
}

.image {
  display: block;
  position: relative;
}

.image img {
  display: block;
  height: auto;
  width: 100%;
}

.image img.is-rounded {
  border-radius: 290486px;
}

.image.is-fullwidth {
  width: 100%;
}

.image.is-square img,
.image.is-square .has-ratio, .image.is-1by1 img,
.image.is-1by1 .has-ratio, .image.is-5by4 img,
.image.is-5by4 .has-ratio, .image.is-4by3 img,
.image.is-4by3 .has-ratio, .image.is-3by2 img,
.image.is-3by2 .has-ratio, .image.is-5by3 img,
.image.is-5by3 .has-ratio, .image.is-16by9 img,
.image.is-16by9 .has-ratio, .image.is-2by1 img,
.image.is-2by1 .has-ratio, .image.is-3by1 img,
.image.is-3by1 .has-ratio, .image.is-4by5 img,
.image.is-4by5 .has-ratio, .image.is-3by4 img,
.image.is-3by4 .has-ratio, .image.is-2by3 img,
.image.is-2by3 .has-ratio, .image.is-3by5 img,
.image.is-3by5 .has-ratio, .image.is-9by16 img,
.image.is-9by16 .has-ratio, .image.is-1by2 img,
.image.is-1by2 .has-ratio, .image.is-1by3 img,
.image.is-1by3 .has-ratio {
  height: 100%;
  width: 100%;
}

.image.is-square, .image.is-1by1 {
  padding-top: 100%;
}

.image.is-5by4 {
  padding-top: 80%;
}

.image.is-4by3 {
  padding-top: 75%;
}

.image.is-3by2 {
  padding-top: 66.6666%;
}

.image.is-5by3 {
  padding-top: 60%;
}

.image.is-16by9 {
  padding-top: 56.25%;
}

.image.is-2by1 {
  padding-top: 50%;
}

.image.is-3by1 {
  padding-top: 33.3333%;
}

.image.is-4by5 {
  padding-top: 125%;
}

.image.is-3by4 {
  padding-top: 133.3333%;
}

.image.is-2by3 {
  padding-top: 150%;
}

.image.is-3by5 {
  padding-top: 166.6666%;
}

.image.is-9by16 {
  padding-top: 177.7777%;
}

.image.is-1by2 {
  padding-top: 200%;
}

.image.is-1by3 {
  padding-top: 300%;
}

.image.is-16x16 {
  height: 16px;
  width: 16px;
}

.image.is-24x24 {
  height: 24px;
  width: 24px;
}

.image.is-32x32 {
  height: 32px;
  width: 32px;
}

.image.is-48x48 {
  height: 48px;
  width: 48px;
}

.image.is-64x64 {
  height: 64px;
  width: 64px;
}

.image.is-96x96 {
  height: 96px;
  width: 96px;
}

.image.is-128x128 {
  height: 128px;
  width: 128px;
}

.notification {
  background-color: whitesmoke;
  border-radius: 4px;
  position: relative;
  padding: 1.25rem 2.5rem 1.25rem 1.5rem;
}

.notification a:not(.button):not(.dropdown-item) {
  color: currentColor;
  text-decoration: underline;
}

.notification strong {
  color: currentColor;
}

.notification code,
.notification pre {
  background: white;
}

.notification pre code {
  background: transparent;
}

.notification > .delete {
  right: 0.5rem;
  position: absolute;
  top: 0.5rem;
}

.notification .title,
.notification .subtitle,
.notification .content {
  color: currentColor;
}

.notification.is-white {
  background-color: white;
  color: #0a0a0a;
}

.notification.is-black {
  background-color: #0a0a0a;
  color: white;
}

.notification.is-light {
  background-color: whitesmoke;
  color: rgba(0, 0, 0, 0.7);
}

.notification.is-dark {
  background-color: #363636;
  color: #fff;
}

.notification.is-primary {
  background-color: #00d1b2;
  color: #fff;
}

.notification.is-primary.is-light {
  background-color: #ebfffc;
  color: #00947e;
}

.notification.is-link {
  background-color: #3273dc;
  color: #fff;
}

.notification.is-link.is-light {
  background-color: #eef3fc;
  color: #2160c4;
}

.notification.is-info {
  background-color: #3298dc;
  color: #fff;
}

.notification.is-info.is-light {
  background-color: #eef6fc;
  color: #1d72aa;
}

.notification.is-success {
  background-color: #48c774;
  color: #fff;
}

.notification.is-success.is-light {
  background-color: #effaf3;
  color: #257942;
}

.notification.is-warning {
  background-color: #ffdd57;
  color: rgba(0, 0, 0, 0.7);
}

.notification.is-warning.is-light {
  background-color: #fffbeb;
  color: #947600;
}

.notification.is-danger {
  background-color: #f14668;
  color: #fff;
}

.notification.is-danger.is-light {
  background-color: #feecf0;
  color: #cc0f35;
}

.progress {
  -moz-appearance: none;
  -webkit-appearance: none;
  border: none;
  border-radius: 290486px;
  display: block;
  height: 1rem;
  overflow: hidden;
  padding: 0;
  width: 100%;
}

.progress::-webkit-progress-bar {
  background-color: #ededed;
}

.progress::-webkit-progress-value {
  background-color: #4a4a4a;
}

.progress::-moz-progress-bar {
  background-color: #4a4a4a;
}

.progress::-ms-fill {
  background-color: #4a4a4a;
  border: none;
}

.progress.is-white::-webkit-progress-value {
  background-color: white;
}

.progress.is-white::-moz-progress-bar {
  background-color: white;
}

.progress.is-white::-ms-fill {
  background-color: white;
}

.progress.is-white:indeterminate {
  background-image: linear-gradient(to right, white 30%, #ededed 30%);
}

.progress.is-black::-webkit-progress-value {
  background-color: #0a0a0a;
}

.progress.is-black::-moz-progress-bar {
  background-color: #0a0a0a;
}

.progress.is-black::-ms-fill {
  background-color: #0a0a0a;
}

.progress.is-black:indeterminate {
  background-image: linear-gradient(to right, #0a0a0a 30%, #ededed 30%);
}

.progress.is-light::-webkit-progress-value {
  background-color: whitesmoke;
}

.progress.is-light::-moz-progress-bar {
  background-color: whitesmoke;
}

.progress.is-light::-ms-fill {
  background-color: whitesmoke;
}

.progress.is-light:indeterminate {
  background-image: linear-gradient(to right, whitesmoke 30%, #ededed 30%);
}

.progress.is-dark::-webkit-progress-value {
  background-color: #363636;
}

.progress.is-dark::-moz-progress-bar {
  background-color: #363636;
}

.progress.is-dark::-ms-fill {
  background-color: #363636;
}

.progress.is-dark:indeterminate {
  background-image: linear-gradient(to right, #363636 30%, #ededed 30%);
}

.progress.is-primary::-webkit-progress-value {
  background-color: #00d1b2;
}

.progress.is-primary::-moz-progress-bar {
  background-color: #00d1b2;
}

.progress.is-primary::-ms-fill {
  background-color: #00d1b2;
}

.progress.is-primary:indeterminate {
  background-image: linear-gradient(to right, #00d1b2 30%, #ededed 30%);
}

.progress.is-link::-webkit-progress-value {
  background-color: #3273dc;
}

.progress.is-link::-moz-progress-bar {
  background-color: #3273dc;
}

.progress.is-link::-ms-fill {
  background-color: #3273dc;
}

.progress.is-link:indeterminate {
  background-image: linear-gradient(to right, #3273dc 30%, #ededed 30%);
}

.progress.is-info::-webkit-progress-value {
  background-color: #3298dc;
}

.progress.is-info::-moz-progress-bar {
  background-color: #3298dc;
}

.progress.is-info::-ms-fill {
  background-color: #3298dc;
}

.progress.is-info:indeterminate {
  background-image: linear-gradient(to right, #3298dc 30%, #ededed 30%);
}

.progress.is-success::-webkit-progress-value {
  background-color: #48c774;
}

.progress.is-success::-moz-progress-bar {
  background-color: #48c774;
}

.progress.is-success::-ms-fill {
  background-color: #48c774;
}

.progress.is-success:indeterminate {
  background-image: linear-gradient(to right, #48c774 30%, #ededed 30%);
}

.progress.is-warning::-webkit-progress-value {
  background-color: #ffdd57;
}

.progress.is-warning::-moz-progress-bar {
  background-color: #ffdd57;
}

.progress.is-warning::-ms-fill {
  background-color: #ffdd57;
}

.progress.is-warning:indeterminate {
  background-image: linear-gradient(to right, #ffdd57 30%, #ededed 30%);
}

.progress.is-danger::-webkit-progress-value {
  background-color: #f14668;
}

.progress.is-danger::-moz-progress-bar {
  background-color: #f14668;
}

.progress.is-danger::-ms-fill {
  background-color: #f14668;
}

.progress.is-danger:indeterminate {
  background-image: linear-gradient(to right, #f14668 30%, #ededed 30%);
}

.progress:indeterminate {
  -webkit-animation-duration: 1.5s;
          animation-duration: 1.5s;
  -webkit-animation-iteration-count: infinite;
          animation-iteration-count: infinite;
  -webkit-animation-name: moveIndeterminate;
          animation-name: moveIndeterminate;
  -webkit-animation-timing-function: linear;
          animation-timing-function: linear;
  background-color: #ededed;
  background-image: linear-gradient(to right, #4a4a4a 30%, #ededed 30%);
  background-position: top left;
  background-repeat: no-repeat;
  background-size: 150% 150%;
}

.progress:indeterminate::-webkit-progress-bar {
  background-color: transparent;
}

.progress:indeterminate::-moz-progress-bar {
  background-color: transparent;
}

.progress:indeterminate::-ms-fill {
  animation-name: none;
}

.progress.is-small {
  height: 0.75rem;
}

.progress.is-medium {
  height: 1.25rem;
}

.progress.is-large {
  height: 1.5rem;
}

@-webkit-keyframes moveIndeterminate {
  from {
    background-position: 200% 0;
  }
  to {
    background-position: -200% 0;
  }
}

@keyframes moveIndeterminate {
  from {
    background-position: 200% 0;
  }
  to {
    background-position: -200% 0;
  }
}

.table {
  background-color: white;
  color: #363636;
}

.table td,
.table th {
  border: 1px solid #dbdbdb;
  border-width: 0 0 1px;
  padding: 0.5em 0.75em;
  vertical-align: top;
}

.table td.is-white,
.table th.is-white {
  background-color: white;
  border-color: white;
  color: #0a0a0a;
}

.table td.is-black,
.table th.is-black {
  background-color: #0a0a0a;
  border-color: #0a0a0a;
  color: white;
}

.table td.is-light,
.table th.is-light {
  background-color: whitesmoke;
  border-color: whitesmoke;
  color: rgba(0, 0, 0, 0.7);
}

.table td.is-dark,
.table th.is-dark {
  background-color: #363636;
  border-color: #363636;
  color: #fff;
}

.table td.is-primary,
.table th.is-primary {
  background-color: #00d1b2;
  border-color: #00d1b2;
  color: #fff;
}

.table td.is-link,
.table th.is-link {
  background-color: #3273dc;
  border-color: #3273dc;
  color: #fff;
}

.table td.is-info,
.table th.is-info {
  background-color: #3298dc;
  border-color: #3298dc;
  color: #fff;
}

.table td.is-success,
.table th.is-success {
  background-color: #48c774;
  border-color: #48c774;
  color: #fff;
}

.table td.is-warning,
.table th.is-warning {
  background-color: #ffdd57;
  border-color: #ffdd57;
  color: rgba(0, 0, 0, 0.7);
}

.table td.is-danger,
.table th.is-danger {
  background-color: #f14668;
  border-color: #f14668;
  color: #fff;
}

.table td.is-narrow,
.table th.is-narrow {
  white-space: nowrap;
  width: 1%;
}

.table td.is-selected,
.table th.is-selected {
  background-color: #00d1b2;
  color: #fff;
}

.table td.is-selected a,
.table td.is-selected strong,
.table th.is-selected a,
.table th.is-selected strong {
  color: currentColor;
}

.table td.is-vcentered,
.table th.is-vcentered {
  vertical-align: middle;
}

.table th {
  color: #363636;
}

.table th:not([align]) {
  text-align: inherit;
}

.table tr.is-selected {
  background-color: #00d1b2;
  color: #fff;
}

.table tr.is-selected a,
.table tr.is-selected strong {
  color: currentColor;
}

.table tr.is-selected td,
.table tr.is-selected th {
  border-color: #fff;
  color: currentColor;
}

.table thead {
  background-color: transparent;
}

.table thead td,
.table thead th {
  border-width: 0 0 2px;
  color: #363636;
}

.table tfoot {
  background-color: transparent;
}

.table tfoot td,
.table tfoot th {
  border-width: 2px 0 0;
  color: #363636;
}

.table tbody {
  background-color: transparent;
}

.table tbody tr:last-child td,
.table tbody tr:last-child th {
  border-bottom-width: 0;
}

.table.is-bordered td,
.table.is-bordered th {
  border-width: 1px;
}

.table.is-bordered tr:last-child td,
.table.is-bordered tr:last-child th {
  border-bottom-width: 1px;
}

.table.is-fullwidth {
  width: 100%;
}

.table.is-hoverable tbody tr:not(.is-selected):hover {
  background-color: #fafafa;
}

.table.is-hoverable.is-striped tbody tr:not(.is-selected):hover {
  background-color: #fafafa;
}

.table.is-hoverable.is-striped tbody tr:not(.is-selected):hover:nth-child(even) {
  background-color: whitesmoke;
}

.table.is-narrow td,
.table.is-narrow th {
  padding: 0.25em 0.5em;
}

.table.is-striped tbody tr:not(.is-selected):nth-child(even) {
  background-color: #fafafa;
}

.table-container {
  -webkit-overflow-scrolling: touch;
  overflow: auto;
  overflow-y: hidden;
  max-width: 100%;
}

.tags {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.tags .tag {
  margin-bottom: 0.5rem;
}

.tags .tag:not(:last-child) {
  margin-right: 0.5rem;
}

.tags:last-child {
  margin-bottom: -0.5rem;
}

.tags:not(:last-child) {
  margin-bottom: 1rem;
}

.tags.are-medium .tag:not(.is-normal):not(.is-large) {
  font-size: 1rem;
}

.tags.are-large .tag:not(.is-normal):not(.is-medium) {
  font-size: 1.25rem;
}

.tags.is-centered {
  justify-content: center;
}

.tags.is-centered .tag {
  margin-right: 0.25rem;
  margin-left: 0.25rem;
}

.tags.is-right {
  justify-content: flex-end;
}

.tags.is-right .tag:not(:first-child) {
  margin-left: 0.5rem;
}

.tags.is-right .tag:not(:last-child) {
  margin-right: 0;
}

.tags.has-addons .tag {
  margin-right: 0;
}

.tags.has-addons .tag:not(:first-child) {
  margin-left: 0;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.tags.has-addons .tag:not(:last-child) {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.tag:not(body) {
  align-items: center;
  background-color: whitesmoke;
  border-radius: 4px;
  color: #4a4a4a;
  display: inline-flex;
  font-size: 0.75rem;
  height: 2em;
  justify-content: center;
  line-height: 1.5;
  padding-left: 0.75em;
  padding-right: 0.75em;
  white-space: nowrap;
}

.tag:not(body) .delete {
  margin-left: 0.25rem;
  margin-right: -0.375rem;
}

.tag:not(body).is-white {
  background-color: white;
  color: #0a0a0a;
}

.tag:not(body).is-black {
  background-color: #0a0a0a;
  color: white;
}

.tag:not(body).is-light {
  background-color: whitesmoke;
  color: rgba(0, 0, 0, 0.7);
}

.tag:not(body).is-dark {
  background-color: #363636;
  color: #fff;
}

.tag:not(body).is-primary {
  background-color: #00d1b2;
  color: #fff;
}

.tag:not(body).is-primary.is-light {
  background-color: #ebfffc;
  color: #00947e;
}

.tag:not(body).is-link {
  background-color: #3273dc;
  color: #fff;
}

.tag:not(body).is-link.is-light {
  background-color: #eef3fc;
  color: #2160c4;
}

.tag:not(body).is-info {
  background-color: #3298dc;
  color: #fff;
}

.tag:not(body).is-info.is-light {
  background-color: #eef6fc;
  color: #1d72aa;
}

.tag:not(body).is-success {
  background-color: #48c774;
  color: #fff;
}

.tag:not(body).is-success.is-light {
  background-color: #effaf3;
  color: #257942;
}

.tag:not(body).is-warning {
  background-color: #ffdd57;
  color: rgba(0, 0, 0, 0.7);
}

.tag:not(body).is-warning.is-light {
  background-color: #fffbeb;
  color: #947600;
}

.tag:not(body).is-danger {
  background-color: #f14668;
  color: #fff;
}

.tag:not(body).is-danger.is-light {
  background-color: #feecf0;
  color: #cc0f35;
}

.tag:not(body).is-normal {
  font-size: 0.75rem;
}

.tag:not(body).is-medium {
  font-size: 1rem;
}

.tag:not(body).is-large {
  font-size: 1.25rem;
}

.tag:not(body) .icon:first-child:not(:last-child) {
  margin-left: -0.375em;
  margin-right: 0.1875em;
}

.tag:not(body) .icon:last-child:not(:first-child) {
  margin-left: 0.1875em;
  margin-right: -0.375em;
}

.tag:not(body) .icon:first-child:last-child {
  margin-left: -0.375em;
  margin-right: -0.375em;
}

.tag:not(body).is-delete {
  margin-left: 1px;
  padding: 0;
  position: relative;
  width: 2em;
}

.tag:not(body).is-delete::before, .tag:not(body).is-delete::after {
  background-color: currentColor;
  content: "";
  display: block;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translateX(-50%) translateY(-50%) rotate(45deg);
  transform-origin: center center;
}

.tag:not(body).is-delete::before {
  height: 1px;
  width: 50%;
}

.tag:not(body).is-delete::after {
  height: 50%;
  width: 1px;
}

.tag:not(body).is-delete:hover, .tag:not(body).is-delete:focus {
  background-color: #e8e8e8;
}

.tag:not(body).is-delete:active {
  background-color: #dbdbdb;
}

.tag:not(body).is-rounded {
  border-radius: 290486px;
}

a.tag:hover {
  text-decoration: underline;
}

.title,
.subtitle {
  word-break: break-word;
}

.title em,
.title span,
.subtitle em,
.subtitle span {
  font-weight: inherit;
}

.title sub,
.subtitle sub {
  font-size: 0.75em;
}

.title sup,
.subtitle sup {
  font-size: 0.75em;
}

.title .tag,
.subtitle .tag {
  vertical-align: middle;
}

.title {
  color: #363636;
  font-size: 2rem;
  font-weight: 600;
  line-height: 1.125;
}

.title strong {
  color: inherit;
  font-weight: inherit;
}

.title + .highlight {
  margin-top: -0.75rem;
}

.title:not(.is-spaced) + .subtitle {
  margin-top: -1.25rem;
}

.title.is-1 {
  font-size: 3rem;
}

.title.is-2 {
  font-size: 2.5rem;
}

.title.is-3 {
  font-size: 2rem;
}

.title.is-4 {
  font-size: 1.5rem;
}

.title.is-5 {
  font-size: 1.25rem;
}

.title.is-6 {
  font-size: 1rem;
}

.title.is-7 {
  font-size: 0.75rem;
}

.subtitle {
  color: #4a4a4a;
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 1.25;
}

.subtitle strong {
  color: #363636;
  font-weight: 600;
}

.subtitle:not(.is-spaced) + .title {
  margin-top: -1.25rem;
}

.subtitle.is-1 {
  font-size: 3rem;
}

.subtitle.is-2 {
  font-size: 2.5rem;
}

.subtitle.is-3 {
  font-size: 2rem;
}

.subtitle.is-4 {
  font-size: 1.5rem;
}

.subtitle.is-5 {
  font-size: 1.25rem;
}

.subtitle.is-6 {
  font-size: 1rem;
}

.subtitle.is-7 {
  font-size: 0.75rem;
}

.heading {
  display: block;
  font-size: 11px;
  letter-spacing: 1px;
  margin-bottom: 5px;
  text-transform: uppercase;
}

.highlight {
  font-weight: 400;
  max-width: 100%;
  overflow: hidden;
  padding: 0;
}

.highlight pre {
  overflow: auto;
  max-width: 100%;
}

.number {
  align-items: center;
  background-color: whitesmoke;
  border-radius: 290486px;
  display: inline-flex;
  font-size: 1.25rem;
  height: 2em;
  justify-content: center;
  margin-right: 1.5rem;
  min-width: 2.5em;
  padding: 0.25rem 0.5rem;
  text-align: center;
  vertical-align: top;
}

/* Bulma Form */
.input, .textarea, .select select {
  background-color: white;
  border-color: #dbdbdb;
  border-radius: 4px;
  color: #363636;
}

.input::-moz-placeholder, .textarea::-moz-placeholder, .select select::-moz-placeholder {
  color: rgba(54, 54, 54, 0.3);
}

.input::-webkit-input-placeholder, .textarea::-webkit-input-placeholder, .select select::-webkit-input-placeholder {
  color: rgba(54, 54, 54, 0.3);
}

.input:-moz-placeholder, .textarea:-moz-placeholder, .select select:-moz-placeholder {
  color: rgba(54, 54, 54, 0.3);
}

.input:-ms-input-placeholder, .textarea:-ms-input-placeholder, .select select:-ms-input-placeholder {
  color: rgba(54, 54, 54, 0.3);
}

.input:hover, .textarea:hover, .select select:hover, .is-hovered.input, .is-hovered.textarea, .select select.is-hovered {
  border-color: #b5b5b5;
}

.input:focus, .textarea:focus, .select select:focus, .is-focused.input, .is-focused.textarea, .select select.is-focused, .input:active, .textarea:active, .select select:active, .is-active.input, .is-active.textarea, .select select.is-active {
  border-color: #3273dc;
  box-shadow: 0 0 0 0.125em rgba(50, 115, 220, 0.25);
}

.input[disabled], .textarea[disabled], .select select[disabled],
fieldset[disabled] .input,
fieldset[disabled] .textarea,
fieldset[disabled] .select select,
.select fieldset[disabled] select {
  background-color: whitesmoke;
  border-color: whitesmoke;
  box-shadow: none;
  color: #7a7a7a;
}

.input[disabled]::-moz-placeholder, .textarea[disabled]::-moz-placeholder, .select select[disabled]::-moz-placeholder,
fieldset[disabled] .input::-moz-placeholder,
fieldset[disabled] .textarea::-moz-placeholder,
fieldset[disabled] .select select::-moz-placeholder,
.select fieldset[disabled] select::-moz-placeholder {
  color: rgba(122, 122, 122, 0.3);
}

.input[disabled]::-webkit-input-placeholder, .textarea[disabled]::-webkit-input-placeholder, .select select[disabled]::-webkit-input-placeholder,
fieldset[disabled] .input::-webkit-input-placeholder,
fieldset[disabled] .textarea::-webkit-input-placeholder,
fieldset[disabled] .select select::-webkit-input-placeholder,
.select fieldset[disabled] select::-webkit-input-placeholder {
  color: rgba(122, 122, 122, 0.3);
}

.input[disabled]:-moz-placeholder, .textarea[disabled]:-moz-placeholder, .select select[disabled]:-moz-placeholder,
fieldset[disabled] .input:-moz-placeholder,
fieldset[disabled] .textarea:-moz-placeholder,
fieldset[disabled] .select select:-moz-placeholder,
.select fieldset[disabled] select:-moz-placeholder {
  color: rgba(122, 122, 122, 0.3);
}

.input[disabled]:-ms-input-placeholder, .textarea[disabled]:-ms-input-placeholder, .select select[disabled]:-ms-input-placeholder,
fieldset[disabled] .input:-ms-input-placeholder,
fieldset[disabled] .textarea:-ms-input-placeholder,
fieldset[disabled] .select select:-ms-input-placeholder,
.select fieldset[disabled] select:-ms-input-placeholder {
  color: rgba(122, 122, 122, 0.3);
}

.input, .textarea {
  box-shadow: inset 0 0.0625em 0.125em rgba(10, 10, 10, 0.05);
  max-width: 100%;
  width: 100%;
}

.input[readonly], .textarea[readonly] {
  box-shadow: none;
}

.is-white.input, .is-white.textarea {
  border-color: white;
}

.is-white.input:focus, .is-white.textarea:focus, .is-white.is-focused.input, .is-white.is-focused.textarea, .is-white.input:active, .is-white.textarea:active, .is-white.is-active.input, .is-white.is-active.textarea {
  box-shadow: 0 0 0 0.125em rgba(255, 255, 255, 0.25);
}

.is-black.input, .is-black.textarea {
  border-color: #0a0a0a;
}

.is-black.input:focus, .is-black.textarea:focus, .is-black.is-focused.input, .is-black.is-focused.textarea, .is-black.input:active, .is-black.textarea:active, .is-black.is-active.input, .is-black.is-active.textarea {
  box-shadow: 0 0 0 0.125em rgba(10, 10, 10, 0.25);
}

.is-light.input, .is-light.textarea {
  border-color: whitesmoke;
}

.is-light.input:focus, .is-light.textarea:focus, .is-light.is-focused.input, .is-light.is-focused.textarea, .is-light.input:active, .is-light.textarea:active, .is-light.is-active.input, .is-light.is-active.textarea {
  box-shadow: 0 0 0 0.125em rgba(245, 245, 245, 0.25);
}

.is-dark.input, .is-dark.textarea {
  border-color: #363636;
}

.is-dark.input:focus, .is-dark.textarea:focus, .is-dark.is-focused.input, .is-dark.is-focused.textarea, .is-dark.input:active, .is-dark.textarea:active, .is-dark.is-active.input, .is-dark.is-active.textarea {
  box-shadow: 0 0 0 0.125em rgba(54, 54, 54, 0.25);
}

.is-primary.input, .is-primary.textarea {
  border-color: #00d1b2;
}

.is-primary.input:focus, .is-primary.textarea:focus, .is-primary.is-focused.input, .is-primary.is-focused.textarea, .is-primary.input:active, .is-primary.textarea:active, .is-primary.is-active.input, .is-primary.is-active.textarea {
  box-shadow: 0 0 0 0.125em rgba(0, 209, 178, 0.25);
}

.is-link.input, .is-link.textarea {
  border-color: #3273dc;
}

.is-link.input:focus, .is-link.textarea:focus, .is-link.is-focused.input, .is-link.is-focused.textarea, .is-link.input:active, .is-link.textarea:active, .is-link.is-active.input, .is-link.is-active.textarea {
  box-shadow: 0 0 0 0.125em rgba(50, 115, 220, 0.25);
}

.is-info.input, .is-info.textarea {
  border-color: #3298dc;
}

.is-info.input:focus, .is-info.textarea:focus, .is-info.is-focused.input, .is-info.is-focused.textarea, .is-info.input:active, .is-info.textarea:active, .is-info.is-active.input, .is-info.is-active.textarea {
  box-shadow: 0 0 0 0.125em rgba(50, 152, 220, 0.25);
}

.is-success.input, .is-success.textarea {
  border-color: #48c774;
}

.is-success.input:focus, .is-success.textarea:focus, .is-success.is-focused.input, .is-success.is-focused.textarea, .is-success.input:active, .is-success.textarea:active, .is-success.is-active.input, .is-success.is-active.textarea {
  box-shadow: 0 0 0 0.125em rgba(72, 199, 116, 0.25);
}

.is-warning.input, .is-warning.textarea {
  border-color: #ffdd57;
}

.is-warning.input:focus, .is-warning.textarea:focus, .is-warning.is-focused.input, .is-warning.is-focused.textarea, .is-warning.input:active, .is-warning.textarea:active, .is-warning.is-active.input, .is-warning.is-active.textarea {
  box-shadow: 0 0 0 0.125em rgba(255, 221, 87, 0.25);
}

.is-danger.input, .is-danger.textarea {
  border-color: #f14668;
}

.is-danger.input:focus, .is-danger.textarea:focus, .is-danger.is-focused.input, .is-danger.is-focused.textarea, .is-danger.input:active, .is-danger.textarea:active, .is-danger.is-active.input, .is-danger.is-active.textarea {
  box-shadow: 0 0 0 0.125em rgba(241, 70, 104, 0.25);
}

.is-small.input, .is-small.textarea {
  border-radius: 2px;
  font-size: 0.75rem;
}

.is-medium.input, .is-medium.textarea {
  font-size: 1.25rem;
}

.is-large.input, .is-large.textarea {
  font-size: 1.5rem;
}

.is-fullwidth.input, .is-fullwidth.textarea {
  display: block;
  width: 100%;
}

.is-inline.input, .is-inline.textarea {
  display: inline;
  width: auto;
}

.input.is-rounded {
  border-radius: 290486px;
  padding-left: calc(calc(0.75em - 1px) + 0.375em);
  padding-right: calc(calc(0.75em - 1px) + 0.375em);
}

.input.is-static {
  background-color: transparent;
  border-color: transparent;
  box-shadow: none;
  padding-left: 0;
  padding-right: 0;
}

.textarea {
  display: block;
  max-width: 100%;
  min-width: 100%;
  padding: calc(0.75em - 1px);
  resize: vertical;
}

.textarea:not([rows]) {
  max-height: 40em;
  min-height: 8em;
}

.textarea[rows] {
  height: initial;
}

.textarea.has-fixed-size {
  resize: none;
}

.checkbox, .radio {
  cursor: pointer;
  display: inline-block;
  line-height: 1.25;
  position: relative;
}

.checkbox input, .radio input {
  cursor: pointer;
}

.checkbox:hover, .radio:hover {
  color: #363636;
}

.checkbox[disabled], .radio[disabled],
fieldset[disabled] .checkbox,
fieldset[disabled] .radio,
.checkbox input[disabled],
.radio input[disabled] {
  color: #7a7a7a;
  cursor: not-allowed;
}

.radio + .radio {
  margin-left: 0.5em;
}

.select {
  display: inline-block;
  max-width: 100%;
  position: relative;
  vertical-align: top;
}

.select:not(.is-multiple) {
  height: 2.5em;
}

.select:not(.is-multiple):not(.is-loading)::after {
  border-color: #3273dc;
  right: 1.125em;
  z-index: 4;
}

.select.is-rounded select {
  border-radius: 290486px;
  padding-left: 1em;
}

.select select {
  cursor: pointer;
  display: block;
  font-size: 1em;
  max-width: 100%;
  outline: none;
}

.select select::-ms-expand {
  display: none;
}

.select select[disabled]:hover,
fieldset[disabled] .select select:hover {
  border-color: whitesmoke;
}

.select select:not([multiple]) {
  padding-right: 2.5em;
}

.select select[multiple] {
  height: auto;
  padding: 0;
}

.select select[multiple] option {
  padding: 0.5em 1em;
}

.select:not(.is-multiple):not(.is-loading):hover::after {
  border-color: #363636;
}

.select.is-white:not(:hover)::after {
  border-color: white;
}

.select.is-white select {
  border-color: white;
}

.select.is-white select:hover, .select.is-white select.is-hovered {
  border-color: #f2f2f2;
}

.select.is-white select:focus, .select.is-white select.is-focused, .select.is-white select:active, .select.is-white select.is-active {
  box-shadow: 0 0 0 0.125em rgba(255, 255, 255, 0.25);
}

.select.is-black:not(:hover)::after {
  border-color: #0a0a0a;
}

.select.is-black select {
  border-color: #0a0a0a;
}

.select.is-black select:hover, .select.is-black select.is-hovered {
  border-color: black;
}

.select.is-black select:focus, .select.is-black select.is-focused, .select.is-black select:active, .select.is-black select.is-active {
  box-shadow: 0 0 0 0.125em rgba(10, 10, 10, 0.25);
}

.select.is-light:not(:hover)::after {
  border-color: whitesmoke;
}

.select.is-light select {
  border-color: whitesmoke;
}

.select.is-light select:hover, .select.is-light select.is-hovered {
  border-color: #e8e8e8;
}

.select.is-light select:focus, .select.is-light select.is-focused, .select.is-light select:active, .select.is-light select.is-active {
  box-shadow: 0 0 0 0.125em rgba(245, 245, 245, 0.25);
}

.select.is-dark:not(:hover)::after {
  border-color: #363636;
}

.select.is-dark select {
  border-color: #363636;
}

.select.is-dark select:hover, .select.is-dark select.is-hovered {
  border-color: #292929;
}

.select.is-dark select:focus, .select.is-dark select.is-focused, .select.is-dark select:active, .select.is-dark select.is-active {
  box-shadow: 0 0 0 0.125em rgba(54, 54, 54, 0.25);
}

.select.is-primary:not(:hover)::after {
  border-color: #00d1b2;
}

.select.is-primary select {
  border-color: #00d1b2;
}

.select.is-primary select:hover, .select.is-primary select.is-hovered {
  border-color: #00b89c;
}

.select.is-primary select:focus, .select.is-primary select.is-focused, .select.is-primary select:active, .select.is-primary select.is-active {
  box-shadow: 0 0 0 0.125em rgba(0, 209, 178, 0.25);
}

.select.is-link:not(:hover)::after {
  border-color: #3273dc;
}

.select.is-link select {
  border-color: #3273dc;
}

.select.is-link select:hover, .select.is-link select.is-hovered {
  border-color: #2366d1;
}

.select.is-link select:focus, .select.is-link select.is-focused, .select.is-link select:active, .select.is-link select.is-active {
  box-shadow: 0 0 0 0.125em rgba(50, 115, 220, 0.25);
}

.select.is-info:not(:hover)::after {
  border-color: #3298dc;
}

.select.is-info select {
  border-color: #3298dc;
}

.select.is-info select:hover, .select.is-info select.is-hovered {
  border-color: #238cd1;
}

.select.is-info select:focus, .select.is-info select.is-focused, .select.is-info select:active, .select.is-info select.is-active {
  box-shadow: 0 0 0 0.125em rgba(50, 152, 220, 0.25);
}

.select.is-success:not(:hover)::after {
  border-color: #48c774;
}

.select.is-success select {
  border-color: #48c774;
}

.select.is-success select:hover, .select.is-success select.is-hovered {
  border-color: #3abb67;
}

.select.is-success select:focus, .select.is-success select.is-focused, .select.is-success select:active, .select.is-success select.is-active {
  box-shadow: 0 0 0 0.125em rgba(72, 199, 116, 0.25);
}

.select.is-warning:not(:hover)::after {
  border-color: #ffdd57;
}

.select.is-warning select {
  border-color: #ffdd57;
}

.select.is-warning select:hover, .select.is-warning select.is-hovered {
  border-color: #ffd83d;
}

.select.is-warning select:focus, .select.is-warning select.is-focused, .select.is-warning select:active, .select.is-warning select.is-active {
  box-shadow: 0 0 0 0.125em rgba(255, 221, 87, 0.25);
}

.select.is-danger:not(:hover)::after {
  border-color: #f14668;
}

.select.is-danger select {
  border-color: #f14668;
}

.select.is-danger select:hover, .select.is-danger select.is-hovered {
  border-color: #ef2e55;
}

.select.is-danger select:focus, .select.is-danger select.is-focused, .select.is-danger select:active, .select.is-danger select.is-active {
  box-shadow: 0 0 0 0.125em rgba(241, 70, 104, 0.25);
}

.select.is-small {
  border-radius: 2px;
  font-size: 0.75rem;
}

.select.is-medium {
  font-size: 1.25rem;
}

.select.is-large {
  font-size: 1.5rem;
}

.select.is-disabled::after {
  border-color: #7a7a7a;
}

.select.is-fullwidth {
  width: 100%;
}

.select.is-fullwidth select {
  width: 100%;
}

.select.is-loading::after {
  margin-top: 0;
  position: absolute;
  right: 0.625em;
  top: 0.625em;
  transform: none;
}

.select.is-loading.is-small:after {
  font-size: 0.75rem;
}

.select.is-loading.is-medium:after {
  font-size: 1.25rem;
}

.select.is-loading.is-large:after {
  font-size: 1.5rem;
}

.file {
  align-items: stretch;
  display: flex;
  justify-content: flex-start;
  position: relative;
}

.file.is-white .file-cta {
  background-color: white;
  border-color: transparent;
  color: #0a0a0a;
}

.file.is-white:hover .file-cta, .file.is-white.is-hovered .file-cta {
  background-color: #f9f9f9;
  border-color: transparent;
  color: #0a0a0a;
}

.file.is-white:focus .file-cta, .file.is-white.is-focused .file-cta {
  border-color: transparent;
  box-shadow: 0 0 0.5em rgba(255, 255, 255, 0.25);
  color: #0a0a0a;
}

.file.is-white:active .file-cta, .file.is-white.is-active .file-cta {
  background-color: #f2f2f2;
  border-color: transparent;
  color: #0a0a0a;
}

.file.is-black .file-cta {
  background-color: #0a0a0a;
  border-color: transparent;
  color: white;
}

.file.is-black:hover .file-cta, .file.is-black.is-hovered .file-cta {
  background-color: #040404;
  border-color: transparent;
  color: white;
}

.file.is-black:focus .file-cta, .file.is-black.is-focused .file-cta {
  border-color: transparent;
  box-shadow: 0 0 0.5em rgba(10, 10, 10, 0.25);
  color: white;
}

.file.is-black:active .file-cta, .file.is-black.is-active .file-cta {
  background-color: black;
  border-color: transparent;
  color: white;
}

.file.is-light .file-cta {
  background-color: whitesmoke;
  border-color: transparent;
  color: rgba(0, 0, 0, 0.7);
}

.file.is-light:hover .file-cta, .file.is-light.is-hovered .file-cta {
  background-color: #eeeeee;
  border-color: transparent;
  color: rgba(0, 0, 0, 0.7);
}

.file.is-light:focus .file-cta, .file.is-light.is-focused .file-cta {
  border-color: transparent;
  box-shadow: 0 0 0.5em rgba(245, 245, 245, 0.25);
  color: rgba(0, 0, 0, 0.7);
}

.file.is-light:active .file-cta, .file.is-light.is-active .file-cta {
  background-color: #e8e8e8;
  border-color: transparent;
  color: rgba(0, 0, 0, 0.7);
}

.file.is-dark .file-cta {
  background-color: #363636;
  border-color: transparent;
  color: #fff;
}

.file.is-dark:hover .file-cta, .file.is-dark.is-hovered .file-cta {
  background-color: #2f2f2f;
  border-color: transparent;
  color: #fff;
}

.file.is-dark:focus .file-cta, .file.is-dark.is-focused .file-cta {
  border-color: transparent;
  box-shadow: 0 0 0.5em rgba(54, 54, 54, 0.25);
  color: #fff;
}

.file.is-dark:active .file-cta, .file.is-dark.is-active .file-cta {
  background-color: #292929;
  border-color: transparent;
  color: #fff;
}

.file.is-primary .file-cta {
  background-color: #00d1b2;
  border-color: transparent;
  color: #fff;
}

.file.is-primary:hover .file-cta, .file.is-primary.is-hovered .file-cta {
  background-color: #00c4a7;
  border-color: transparent;
  color: #fff;
}

.file.is-primary:focus .file-cta, .file.is-primary.is-focused .file-cta {
  border-color: transparent;
  box-shadow: 0 0 0.5em rgba(0, 209, 178, 0.25);
  color: #fff;
}

.file.is-primary:active .file-cta, .file.is-primary.is-active .file-cta {
  background-color: #00b89c;
  border-color: transparent;
  color: #fff;
}

.file.is-link .file-cta {
  background-color: #3273dc;
  border-color: transparent;
  color: #fff;
}

.file.is-link:hover .file-cta, .file.is-link.is-hovered .file-cta {
  background-color: #276cda;
  border-color: transparent;
  color: #fff;
}

.file.is-link:focus .file-cta, .file.is-link.is-focused .file-cta {
  border-color: transparent;
  box-shadow: 0 0 0.5em rgba(50, 115, 220, 0.25);
  color: #fff;
}

.file.is-link:active .file-cta, .file.is-link.is-active .file-cta {
  background-color: #2366d1;
  border-color: transparent;
  color: #fff;
}

.file.is-info .file-cta {
  background-color: #3298dc;
  border-color: transparent;
  color: #fff;
}

.file.is-info:hover .file-cta, .file.is-info.is-hovered .file-cta {
  background-color: #2793da;
  border-color: transparent;
  color: #fff;
}

.file.is-info:focus .file-cta, .file.is-info.is-focused .file-cta {
  border-color: transparent;
  box-shadow: 0 0 0.5em rgba(50, 152, 220, 0.25);
  color: #fff;
}

.file.is-info:active .file-cta, .file.is-info.is-active .file-cta {
  background-color: #238cd1;
  border-color: transparent;
  color: #fff;
}

.file.is-success .file-cta {
  background-color: #48c774;
  border-color: transparent;
  color: #fff;
}

.file.is-success:hover .file-cta, .file.is-success.is-hovered .file-cta {
  background-color: #3ec46d;
  border-color: transparent;
  color: #fff;
}

.file.is-success:focus .file-cta, .file.is-success.is-focused .file-cta {
  border-color: transparent;
  box-shadow: 0 0 0.5em rgba(72, 199, 116, 0.25);
  color: #fff;
}

.file.is-success:active .file-cta, .file.is-success.is-active .file-cta {
  background-color: #3abb67;
  border-color: transparent;
  color: #fff;
}

.file.is-warning .file-cta {
  background-color: #ffdd57;
  border-color: transparent;
  color: rgba(0, 0, 0, 0.7);
}

.file.is-warning:hover .file-cta, .file.is-warning.is-hovered .file-cta {
  background-color: #ffdb4a;
  border-color: transparent;
  color: rgba(0, 0, 0, 0.7);
}

.file.is-warning:focus .file-cta, .file.is-warning.is-focused .file-cta {
  border-color: transparent;
  box-shadow: 0 0 0.5em rgba(255, 221, 87, 0.25);
  color: rgba(0, 0, 0, 0.7);
}

.file.is-warning:active .file-cta, .file.is-warning.is-active .file-cta {
  background-color: #ffd83d;
  border-color: transparent;
  color: rgba(0, 0, 0, 0.7);
}

.file.is-danger .file-cta {
  background-color: #f14668;
  border-color: transparent;
  color: #fff;
}

.file.is-danger:hover .file-cta, .file.is-danger.is-hovered .file-cta {
  background-color: #f03a5f;
  border-color: transparent;
  color: #fff;
}

.file.is-danger:focus .file-cta, .file.is-danger.is-focused .file-cta {
  border-color: transparent;
  box-shadow: 0 0 0.5em rgba(241, 70, 104, 0.25);
  color: #fff;
}

.file.is-danger:active .file-cta, .file.is-danger.is-active .file-cta {
  background-color: #ef2e55;
  border-color: transparent;
  color: #fff;
}

.file.is-small {
  font-size: 0.75rem;
}

.file.is-medium {
  font-size: 1.25rem;
}

.file.is-medium .file-icon .fa {
  font-size: 21px;
}

.file.is-large {
  font-size: 1.5rem;
}

.file.is-large .file-icon .fa {
  font-size: 28px;
}

.file.has-name .file-cta {
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
}

.file.has-name .file-name {
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
}

.file.has-name.is-empty .file-cta {
  border-radius: 4px;
}

.file.has-name.is-empty .file-name {
  display: none;
}

.file.is-boxed .file-label {
  flex-direction: column;
}

.file.is-boxed .file-cta {
  flex-direction: column;
  height: auto;
  padding: 1em 3em;
}

.file.is-boxed .file-name {
  border-width: 0 1px 1px;
}

.file.is-boxed .file-icon {
  height: 1.5em;
  width: 1.5em;
}

.file.is-boxed .file-icon .fa {
  font-size: 21px;
}

.file.is-boxed.is-small .file-icon .fa {
  font-size: 14px;
}

.file.is-boxed.is-medium .file-icon .fa {
  font-size: 28px;
}

.file.is-boxed.is-large .file-icon .fa {
  font-size: 35px;
}

.file.is-boxed.has-name .file-cta {
  border-radius: 4px 4px 0 0;
}

.file.is-boxed.has-name .file-name {
  border-radius: 0 0 4px 4px;
  border-width: 0 1px 1px;
}

.file.is-centered {
  justify-content: center;
}

.file.is-fullwidth .file-label {
  width: 100%;
}

.file.is-fullwidth .file-name {
  flex-grow: 1;
  max-width: none;
}

.file.is-right {
  justify-content: flex-end;
}

.file.is-right .file-cta {
  border-radius: 0 4px 4px 0;
}

.file.is-right .file-name {
  border-radius: 4px 0 0 4px;
  border-width: 1px 0 1px 1px;
  order: -1;
}

.file-label {
  align-items: stretch;
  display: flex;
  cursor: pointer;
  justify-content: flex-start;
  overflow: hidden;
  position: relative;
}

.file-label:hover .file-cta {
  background-color: #eeeeee;
  color: #363636;
}

.file-label:hover .file-name {
  border-color: #d5d5d5;
}

.file-label:active .file-cta {
  background-color: #e8e8e8;
  color: #363636;
}

.file-label:active .file-name {
  border-color: #cfcfcf;
}

.file-input {
  height: 100%;
  left: 0;
  opacity: 0;
  outline: none;
  position: absolute;
  top: 0;
  width: 100%;
}

.file-cta,
.file-name {
  border-color: #dbdbdb;
  border-radius: 4px;
  font-size: 1em;
  padding-left: 1em;
  padding-right: 1em;
  white-space: nowrap;
}

.file-cta {
  background-color: whitesmoke;
  color: #4a4a4a;
}

.file-name {
  border-color: #dbdbdb;
  border-style: solid;
  border-width: 1px 1px 1px 0;
  display: block;
  max-width: 16em;
  overflow: hidden;
  text-align: inherit;
  text-overflow: ellipsis;
}

.file-icon {
  align-items: center;
  display: flex;
  height: 1em;
  justify-content: center;
  margin-right: 0.5em;
  width: 1em;
}

.file-icon .fa {
  font-size: 14px;
}

.label {
  color: #363636;
  display: block;
  font-size: 1rem;
  font-weight: 700;
}

.label:not(:last-child) {
  margin-bottom: 0.5em;
}

.label.is-small {
  font-size: 0.75rem;
}

.label.is-medium {
  font-size: 1.25rem;
}

.label.is-large {
  font-size: 1.5rem;
}

.help {
  display: block;
  font-size: 0.75rem;
  margin-top: 0.25rem;
}

.help.is-white {
  color: white;
}

.help.is-black {
  color: #0a0a0a;
}

.help.is-light {
  color: whitesmoke;
}

.help.is-dark {
  color: #363636;
}

.help.is-primary {
  color: #00d1b2;
}

.help.is-link {
  color: #3273dc;
}

.help.is-info {
  color: #3298dc;
}

.help.is-success {
  color: #48c774;
}

.help.is-warning {
  color: #ffdd57;
}

.help.is-danger {
  color: #f14668;
}

.field:not(:last-child) {
  margin-bottom: 0.75rem;
}

.field.has-addons {
  display: flex;
  justify-content: flex-start;
}

.field.has-addons .control:not(:last-child) {
  margin-right: -1px;
}

.field.has-addons .control:not(:first-child):not(:last-child) .button,
.field.has-addons .control:not(:first-child):not(:last-child) .input,
.field.has-addons .control:not(:first-child):not(:last-child) .select select {
  border-radius: 0;
}

.field.has-addons .control:first-child:not(:only-child) .button,
.field.has-addons .control:first-child:not(:only-child) .input,
.field.has-addons .control:first-child:not(:only-child) .select select {
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
}

.field.has-addons .control:last-child:not(:only-child) .button,
.field.has-addons .control:last-child:not(:only-child) .input,
.field.has-addons .control:last-child:not(:only-child) .select select {
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
}

.field.has-addons .control .button:not([disabled]):hover, .field.has-addons .control .button:not([disabled]).is-hovered,
.field.has-addons .control .input:not([disabled]):hover,
.field.has-addons .control .input:not([disabled]).is-hovered,
.field.has-addons .control .select select:not([disabled]):hover,
.field.has-addons .control .select select:not([disabled]).is-hovered {
  z-index: 2;
}

.field.has-addons .control .button:not([disabled]):focus, .field.has-addons .control .button:not([disabled]).is-focused, .field.has-addons .control .button:not([disabled]):active, .field.has-addons .control .button:not([disabled]).is-active,
.field.has-addons .control .input:not([disabled]):focus,
.field.has-addons .control .input:not([disabled]).is-focused,
.field.has-addons .control .input:not([disabled]):active,
.field.has-addons .control .input:not([disabled]).is-active,
.field.has-addons .control .select select:not([disabled]):focus,
.field.has-addons .control .select select:not([disabled]).is-focused,
.field.has-addons .control .select select:not([disabled]):active,
.field.has-addons .control .select select:not([disabled]).is-active {
  z-index: 3;
}

.field.has-addons .control .button:not([disabled]):focus:hover, .field.has-addons .control .button:not([disabled]).is-focused:hover, .field.has-addons .control .button:not([disabled]):active:hover, .field.has-addons .control .button:not([disabled]).is-active:hover,
.field.has-addons .control .input:not([disabled]):focus:hover,
.field.has-addons .control .input:not([disabled]).is-focused:hover,
.field.has-addons .control .input:not([disabled]):active:hover,
.field.has-addons .control .input:not([disabled]).is-active:hover,
.field.has-addons .control .select select:not([disabled]):focus:hover,
.field.has-addons .control .select select:not([disabled]).is-focused:hover,
.field.has-addons .control .select select:not([disabled]):active:hover,
.field.has-addons .control .select select:not([disabled]).is-active:hover {
  z-index: 4;
}

.field.has-addons .control.is-expanded {
  flex-grow: 1;
  flex-shrink: 1;
}

.field.has-addons.has-addons-centered {
  justify-content: center;
}

.field.has-addons.has-addons-right {
  justify-content: flex-end;
}

.field.has-addons.has-addons-fullwidth .control {
  flex-grow: 1;
  flex-shrink: 0;
}

.field.is-grouped {
  display: flex;
  justify-content: flex-start;
}

.field.is-grouped > .control {
  flex-shrink: 0;
}

.field.is-grouped > .control:not(:last-child) {
  margin-bottom: 0;
  margin-right: 0.75rem;
}

.field.is-grouped > .control.is-expanded {
  flex-grow: 1;
  flex-shrink: 1;
}

.field.is-grouped.is-grouped-centered {
  justify-content: center;
}

.field.is-grouped.is-grouped-right {
  justify-content: flex-end;
}

.field.is-grouped.is-grouped-multiline {
  flex-wrap: wrap;
}

.field.is-grouped.is-grouped-multiline > .control:last-child, .field.is-grouped.is-grouped-multiline > .control:not(:last-child) {
  margin-bottom: 0.75rem;
}

.field.is-grouped.is-grouped-multiline:last-child {
  margin-bottom: -0.75rem;
}

.field.is-grouped.is-grouped-multiline:not(:last-child) {
  margin-bottom: 0;
}

@media screen and (min-width: 769px), print {
  .field.is-horizontal {
    display: flex;
  }
}

.field-label .label {
  font-size: inherit;
}

@media screen and (max-width: 768px) {
  .field-label {
    margin-bottom: 0.5rem;
  }
}

@media screen and (min-width: 769px), print {
  .field-label {
    flex-basis: 0;
    flex-grow: 1;
    flex-shrink: 0;
    margin-right: 1.5rem;
    text-align: right;
  }
  .field-label.is-small {
    font-size: 0.75rem;
    padding-top: 0.375em;
  }
  .field-label.is-normal {
    padding-top: 0.375em;
  }
  .field-label.is-medium {
    font-size: 1.25rem;
    padding-top: 0.375em;
  }
  .field-label.is-large {
    font-size: 1.5rem;
    padding-top: 0.375em;
  }
}

.field-body .field .field {
  margin-bottom: 0;
}

@media screen and (min-width: 769px), print {
  .field-body {
    display: flex;
    flex-basis: 0;
    flex-grow: 5;
    flex-shrink: 1;
  }
  .field-body .field {
    margin-bottom: 0;
  }
  .field-body > .field {
    flex-shrink: 1;
  }
  .field-body > .field:not(.is-narrow) {
    flex-grow: 1;
  }
  .field-body > .field:not(:last-child) {
    margin-right: 0.75rem;
  }
}

.control {
  box-sizing: border-box;
  clear: both;
  font-size: 1rem;
  position: relative;
  text-align: inherit;
}

.control.has-icons-left .input:focus ~ .icon,
.control.has-icons-left .select:focus ~ .icon, .control.has-icons-right .input:focus ~ .icon,
.control.has-icons-right .select:focus ~ .icon {
  color: #4a4a4a;
}

.control.has-icons-left .input.is-small ~ .icon,
.control.has-icons-left .select.is-small ~ .icon, .control.has-icons-right .input.is-small ~ .icon,
.control.has-icons-right .select.is-small ~ .icon {
  font-size: 0.75rem;
}

.control.has-icons-left .input.is-medium ~ .icon,
.control.has-icons-left .select.is-medium ~ .icon, .control.has-icons-right .input.is-medium ~ .icon,
.control.has-icons-right .select.is-medium ~ .icon {
  font-size: 1.25rem;
}

.control.has-icons-left .input.is-large ~ .icon,
.control.has-icons-left .select.is-large ~ .icon, .control.has-icons-right .input.is-large ~ .icon,
.control.has-icons-right .select.is-large ~ .icon {
  font-size: 1.5rem;
}

.control.has-icons-left .icon, .control.has-icons-right .icon {
  color: #dbdbdb;
  height: 2.5em;
  pointer-events: none;
  position: absolute;
  top: 0;
  width: 2.5em;
  z-index: 4;
}

.control.has-icons-left .input,
.control.has-icons-left .select select {
  padding-left: 2.5em;
}

.control.has-icons-left .icon.is-left {
  left: 0;
}

.control.has-icons-right .input,
.control.has-icons-right .select select {
  padding-right: 2.5em;
}

.control.has-icons-right .icon.is-right {
  right: 0;
}

.control.is-loading::after {
  position: absolute !important;
  right: 0.625em;
  top: 0.625em;
  z-index: 4;
}

.control.is-loading.is-small:after {
  font-size: 0.75rem;
}

.control.is-loading.is-medium:after {
  font-size: 1.25rem;
}

.control.is-loading.is-large:after {
  font-size: 1.5rem;
}

/* Bulma Components */
.breadcrumb {
  font-size: 1rem;
  white-space: nowrap;
}

.breadcrumb a {
  align-items: center;
  color: #3273dc;
  display: flex;
  justify-content: center;
  padding: 0 0.75em;
}

.breadcrumb a:hover {
  color: #363636;
}

.breadcrumb li {
  align-items: center;
  display: flex;
}

.breadcrumb li:first-child a {
  padding-left: 0;
}

.breadcrumb li.is-active a {
  color: #363636;
  cursor: default;
  pointer-events: none;
}

.breadcrumb li + li::before {
  color: #b5b5b5;
  content: "\\0002f";
}

.breadcrumb ul,
.breadcrumb ol {
  align-items: flex-start;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.breadcrumb .icon:first-child {
  margin-right: 0.5em;
}

.breadcrumb .icon:last-child {
  margin-left: 0.5em;
}

.breadcrumb.is-centered ol,
.breadcrumb.is-centered ul {
  justify-content: center;
}

.breadcrumb.is-right ol,
.breadcrumb.is-right ul {
  justify-content: flex-end;
}

.breadcrumb.is-small {
  font-size: 0.75rem;
}

.breadcrumb.is-medium {
  font-size: 1.25rem;
}

.breadcrumb.is-large {
  font-size: 1.5rem;
}

.breadcrumb.has-arrow-separator li + li::before {
  content: "\\02192";
}

.breadcrumb.has-bullet-separator li + li::before {
  content: "\\02022";
}

.breadcrumb.has-dot-separator li + li::before {
  content: "\\000b7";
}

.breadcrumb.has-succeeds-separator li + li::before {
  content: "\\0227B";
}

.card {
  background-color: white;
  border-radius: 0.25rem;
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1), 0 0px 0 1px rgba(10, 10, 10, 0.02);
  color: #4a4a4a;
  max-width: 100%;
  position: relative;
}

.card-header:first-child, .card-content:first-child, .card-footer:first-child {
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
}

.card-header:last-child, .card-content:last-child, .card-footer:last-child {
  border-bottom-left-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
}

.card-header {
  background-color: transparent;
  align-items: stretch;
  box-shadow: 0 0.125em 0.25em rgba(10, 10, 10, 0.1);
  display: flex;
}

.card-header-title {
  align-items: center;
  color: #363636;
  display: flex;
  flex-grow: 1;
  font-weight: 700;
  padding: 0.75rem 1rem;
}

.card-header-title.is-centered {
  justify-content: center;
}

.card-header-icon {
  align-items: center;
  cursor: pointer;
  display: flex;
  justify-content: center;
  padding: 0.75rem 1rem;
}

.card-image {
  display: block;
  position: relative;
}

.card-image:first-child img {
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
}

.card-image:last-child img {
  border-bottom-left-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
}

.card-content {
  background-color: transparent;
  padding: 1.5rem;
}

.card-footer {
  background-color: transparent;
  border-top: 1px solid #ededed;
  align-items: stretch;
  display: flex;
}

.card-footer-item {
  align-items: center;
  display: flex;
  flex-basis: 0;
  flex-grow: 1;
  flex-shrink: 0;
  justify-content: center;
  padding: 0.75rem;
}

.card-footer-item:not(:last-child) {
  border-right: 1px solid #ededed;
}

.card .media:not(:last-child) {
  margin-bottom: 1.5rem;
}

.dropdown {
  display: inline-flex;
  position: relative;
  vertical-align: top;
}

.dropdown.is-active .dropdown-menu, .dropdown.is-hoverable:hover .dropdown-menu {
  display: block;
}

.dropdown.is-right .dropdown-menu {
  left: auto;
  right: 0;
}

.dropdown.is-up .dropdown-menu {
  bottom: 100%;
  padding-bottom: 4px;
  padding-top: initial;
  top: auto;
}

.dropdown-menu {
  display: none;
  left: 0;
  min-width: 12rem;
  padding-top: 4px;
  position: absolute;
  top: 100%;
  z-index: 20;
}

.dropdown-content {
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1), 0 0px 0 1px rgba(10, 10, 10, 0.02);
  padding-bottom: 0.5rem;
  padding-top: 0.5rem;
}

.dropdown-item {
  color: #4a4a4a;
  display: block;
  font-size: 0.875rem;
  line-height: 1.5;
  padding: 0.375rem 1rem;
  position: relative;
}

a.dropdown-item,
button.dropdown-item {
  padding-right: 3rem;
  text-align: inherit;
  white-space: nowrap;
  width: 100%;
}

a.dropdown-item:hover,
button.dropdown-item:hover {
  background-color: whitesmoke;
  color: #0a0a0a;
}

a.dropdown-item.is-active,
button.dropdown-item.is-active {
  background-color: #3273dc;
  color: #fff;
}

.dropdown-divider {
  background-color: #ededed;
  border: none;
  display: block;
  height: 1px;
  margin: 0.5rem 0;
}

.level {
  align-items: center;
  justify-content: space-between;
}

.level code {
  border-radius: 4px;
}

.level img {
  display: inline-block;
  vertical-align: top;
}

.level.is-mobile {
  display: flex;
}

.level.is-mobile .level-left,
.level.is-mobile .level-right {
  display: flex;
}

.level.is-mobile .level-left + .level-right {
  margin-top: 0;
}

.level.is-mobile .level-item:not(:last-child) {
  margin-bottom: 0;
  margin-right: 0.75rem;
}

.level.is-mobile .level-item:not(.is-narrow) {
  flex-grow: 1;
}

@media screen and (min-width: 769px), print {
  .level {
    display: flex;
  }
  .level > .level-item:not(.is-narrow) {
    flex-grow: 1;
  }
}

.level-item {
  align-items: center;
  display: flex;
  flex-basis: auto;
  flex-grow: 0;
  flex-shrink: 0;
  justify-content: center;
}

.level-item .title,
.level-item .subtitle {
  margin-bottom: 0;
}

@media screen and (max-width: 768px) {
  .level-item:not(:last-child) {
    margin-bottom: 0.75rem;
  }
}

.level-left,
.level-right {
  flex-basis: auto;
  flex-grow: 0;
  flex-shrink: 0;
}

.level-left .level-item.is-flexible,
.level-right .level-item.is-flexible {
  flex-grow: 1;
}

@media screen and (min-width: 769px), print {
  .level-left .level-item:not(:last-child),
  .level-right .level-item:not(:last-child) {
    margin-right: 0.75rem;
  }
}

.level-left {
  align-items: center;
  justify-content: flex-start;
}

@media screen and (max-width: 768px) {
  .level-left + .level-right {
    margin-top: 1.5rem;
  }
}

@media screen and (min-width: 769px), print {
  .level-left {
    display: flex;
  }
}

.level-right {
  align-items: center;
  justify-content: flex-end;
}

@media screen and (min-width: 769px), print {
  .level-right {
    display: flex;
  }
}

.media {
  align-items: flex-start;
  display: flex;
  text-align: inherit;
}

.media .content:not(:last-child) {
  margin-bottom: 0.75rem;
}

.media .media {
  border-top: 1px solid rgba(219, 219, 219, 0.5);
  display: flex;
  padding-top: 0.75rem;
}

.media .media .content:not(:last-child),
.media .media .control:not(:last-child) {
  margin-bottom: 0.5rem;
}

.media .media .media {
  padding-top: 0.5rem;
}

.media .media .media + .media {
  margin-top: 0.5rem;
}

.media + .media {
  border-top: 1px solid rgba(219, 219, 219, 0.5);
  margin-top: 1rem;
  padding-top: 1rem;
}

.media.is-large + .media {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
}

.media-left,
.media-right {
  flex-basis: auto;
  flex-grow: 0;
  flex-shrink: 0;
}

.media-left {
  margin-right: 1rem;
}

.media-right {
  margin-left: 1rem;
}

.media-content {
  flex-basis: auto;
  flex-grow: 1;
  flex-shrink: 1;
  text-align: inherit;
}

@media screen and (max-width: 768px) {
  .media-content {
    overflow-x: auto;
  }
}

.menu {
  font-size: 1rem;
}

.menu.is-small {
  font-size: 0.75rem;
}

.menu.is-medium {
  font-size: 1.25rem;
}

.menu.is-large {
  font-size: 1.5rem;
}

.menu-list {
  line-height: 1.25;
}

.menu-list a {
  border-radius: 2px;
  color: #4a4a4a;
  display: block;
  padding: 0.5em 0.75em;
}

.menu-list a:hover {
  background-color: whitesmoke;
  color: #363636;
}

.menu-list a.is-active {
  background-color: #3273dc;
  color: #fff;
}

.menu-list li ul {
  border-left: 1px solid #dbdbdb;
  margin: 0.75em;
  padding-left: 0.75em;
}

.menu-label {
  color: #7a7a7a;
  font-size: 0.75em;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.menu-label:not(:first-child) {
  margin-top: 1em;
}

.menu-label:not(:last-child) {
  margin-bottom: 1em;
}

.message {
  background-color: whitesmoke;
  border-radius: 4px;
  font-size: 1rem;
}

.message strong {
  color: currentColor;
}

.message a:not(.button):not(.tag):not(.dropdown-item) {
  color: currentColor;
  text-decoration: underline;
}

.message.is-small {
  font-size: 0.75rem;
}

.message.is-medium {
  font-size: 1.25rem;
}

.message.is-large {
  font-size: 1.5rem;
}

.message.is-white {
  background-color: white;
}

.message.is-white .message-header {
  background-color: white;
  color: #0a0a0a;
}

.message.is-white .message-body {
  border-color: white;
}

.message.is-black {
  background-color: #fafafa;
}

.message.is-black .message-header {
  background-color: #0a0a0a;
  color: white;
}

.message.is-black .message-body {
  border-color: #0a0a0a;
}

.message.is-light {
  background-color: #fafafa;
}

.message.is-light .message-header {
  background-color: whitesmoke;
  color: rgba(0, 0, 0, 0.7);
}

.message.is-light .message-body {
  border-color: whitesmoke;
}

.message.is-dark {
  background-color: #fafafa;
}

.message.is-dark .message-header {
  background-color: #363636;
  color: #fff;
}

.message.is-dark .message-body {
  border-color: #363636;
}

.message.is-primary {
  background-color: #ebfffc;
}

.message.is-primary .message-header {
  background-color: #00d1b2;
  color: #fff;
}

.message.is-primary .message-body {
  border-color: #00d1b2;
  color: #00947e;
}

.message.is-link {
  background-color: #eef3fc;
}

.message.is-link .message-header {
  background-color: #3273dc;
  color: #fff;
}

.message.is-link .message-body {
  border-color: #3273dc;
  color: #2160c4;
}

.message.is-info {
  background-color: #eef6fc;
}

.message.is-info .message-header {
  background-color: #3298dc;
  color: #fff;
}

.message.is-info .message-body {
  border-color: #3298dc;
  color: #1d72aa;
}

.message.is-success {
  background-color: #effaf3;
}

.message.is-success .message-header {
  background-color: #48c774;
  color: #fff;
}

.message.is-success .message-body {
  border-color: #48c774;
  color: #257942;
}

.message.is-warning {
  background-color: #fffbeb;
}

.message.is-warning .message-header {
  background-color: #ffdd57;
  color: rgba(0, 0, 0, 0.7);
}

.message.is-warning .message-body {
  border-color: #ffdd57;
  color: #947600;
}

.message.is-danger {
  background-color: #feecf0;
}

.message.is-danger .message-header {
  background-color: #f14668;
  color: #fff;
}

.message.is-danger .message-body {
  border-color: #f14668;
  color: #cc0f35;
}

.message-header {
  align-items: center;
  background-color: #4a4a4a;
  border-radius: 4px 4px 0 0;
  color: #fff;
  display: flex;
  font-weight: 700;
  justify-content: space-between;
  line-height: 1.25;
  padding: 0.75em 1em;
  position: relative;
}

.message-header .delete {
  flex-grow: 0;
  flex-shrink: 0;
  margin-left: 0.75em;
}

.message-header + .message-body {
  border-width: 0;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.message-body {
  border-color: #dbdbdb;
  border-radius: 4px;
  border-style: solid;
  border-width: 0 0 0 4px;
  color: #4a4a4a;
  padding: 1.25em 1.5em;
}

.message-body code,
.message-body pre {
  background-color: white;
}

.message-body pre code {
  background-color: transparent;
}

.modal {
  align-items: center;
  display: none;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  position: fixed;
  z-index: 40;
}

.modal.is-active {
  display: flex;
}

.modal-background {
  background-color: rgba(10, 10, 10, 0.86);
}

.modal-content,
.modal-card {
  margin: 0 20px;
  max-height: calc(100vh - 160px);
  overflow: auto;
  position: relative;
  width: 100%;
}

@media screen and (min-width: 769px) {
  .modal-content,
  .modal-card {
    margin: 0 auto;
    max-height: calc(100vh - 40px);
    width: 640px;
  }
}

.modal-close {
  background: none;
  height: 40px;
  position: fixed;
  right: 20px;
  top: 20px;
  width: 40px;
}

.modal-card {
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 40px);
  overflow: hidden;
  -ms-overflow-y: visible;
}

.modal-card-head,
.modal-card-foot {
  align-items: center;
  background-color: whitesmoke;
  display: flex;
  flex-shrink: 0;
  justify-content: flex-start;
  padding: 20px;
  position: relative;
}

.modal-card-head {
  border-bottom: 1px solid #dbdbdb;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}

.modal-card-title {
  color: #363636;
  flex-grow: 1;
  flex-shrink: 0;
  font-size: 1.5rem;
  line-height: 1;
}

.modal-card-foot {
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  border-top: 1px solid #dbdbdb;
}

.modal-card-foot .button:not(:last-child) {
  margin-right: 0.5em;
}

.modal-card-body {
  -webkit-overflow-scrolling: touch;
  background-color: white;
  flex-grow: 1;
  flex-shrink: 1;
  overflow: auto;
  padding: 20px;
}

.navbar {
  background-color: white;
  min-height: 3.25rem;
  position: relative;
  z-index: 30;
}

.navbar.is-white {
  background-color: white;
  color: #0a0a0a;
}

.navbar.is-white .navbar-brand > .navbar-item,
.navbar.is-white .navbar-brand .navbar-link {
  color: #0a0a0a;
}

.navbar.is-white .navbar-brand > a.navbar-item:focus, .navbar.is-white .navbar-brand > a.navbar-item:hover, .navbar.is-white .navbar-brand > a.navbar-item.is-active,
.navbar.is-white .navbar-brand .navbar-link:focus,
.navbar.is-white .navbar-brand .navbar-link:hover,
.navbar.is-white .navbar-brand .navbar-link.is-active {
  background-color: #f2f2f2;
  color: #0a0a0a;
}

.navbar.is-white .navbar-brand .navbar-link::after {
  border-color: #0a0a0a;
}

.navbar.is-white .navbar-burger {
  color: #0a0a0a;
}

@media screen and (min-width: 1024px) {
  .navbar.is-white .navbar-start > .navbar-item,
  .navbar.is-white .navbar-start .navbar-link,
  .navbar.is-white .navbar-end > .navbar-item,
  .navbar.is-white .navbar-end .navbar-link {
    color: #0a0a0a;
  }
  .navbar.is-white .navbar-start > a.navbar-item:focus, .navbar.is-white .navbar-start > a.navbar-item:hover, .navbar.is-white .navbar-start > a.navbar-item.is-active,
  .navbar.is-white .navbar-start .navbar-link:focus,
  .navbar.is-white .navbar-start .navbar-link:hover,
  .navbar.is-white .navbar-start .navbar-link.is-active,
  .navbar.is-white .navbar-end > a.navbar-item:focus,
  .navbar.is-white .navbar-end > a.navbar-item:hover,
  .navbar.is-white .navbar-end > a.navbar-item.is-active,
  .navbar.is-white .navbar-end .navbar-link:focus,
  .navbar.is-white .navbar-end .navbar-link:hover,
  .navbar.is-white .navbar-end .navbar-link.is-active {
    background-color: #f2f2f2;
    color: #0a0a0a;
  }
  .navbar.is-white .navbar-start .navbar-link::after,
  .navbar.is-white .navbar-end .navbar-link::after {
    border-color: #0a0a0a;
  }
  .navbar.is-white .navbar-item.has-dropdown:focus .navbar-link,
  .navbar.is-white .navbar-item.has-dropdown:hover .navbar-link,
  .navbar.is-white .navbar-item.has-dropdown.is-active .navbar-link {
    background-color: #f2f2f2;
    color: #0a0a0a;
  }
  .navbar.is-white .navbar-dropdown a.navbar-item.is-active {
    background-color: white;
    color: #0a0a0a;
  }
}

.navbar.is-black {
  background-color: #0a0a0a;
  color: white;
}

.navbar.is-black .navbar-brand > .navbar-item,
.navbar.is-black .navbar-brand .navbar-link {
  color: white;
}

.navbar.is-black .navbar-brand > a.navbar-item:focus, .navbar.is-black .navbar-brand > a.navbar-item:hover, .navbar.is-black .navbar-brand > a.navbar-item.is-active,
.navbar.is-black .navbar-brand .navbar-link:focus,
.navbar.is-black .navbar-brand .navbar-link:hover,
.navbar.is-black .navbar-brand .navbar-link.is-active {
  background-color: black;
  color: white;
}

.navbar.is-black .navbar-brand .navbar-link::after {
  border-color: white;
}

.navbar.is-black .navbar-burger {
  color: white;
}

@media screen and (min-width: 1024px) {
  .navbar.is-black .navbar-start > .navbar-item,
  .navbar.is-black .navbar-start .navbar-link,
  .navbar.is-black .navbar-end > .navbar-item,
  .navbar.is-black .navbar-end .navbar-link {
    color: white;
  }
  .navbar.is-black .navbar-start > a.navbar-item:focus, .navbar.is-black .navbar-start > a.navbar-item:hover, .navbar.is-black .navbar-start > a.navbar-item.is-active,
  .navbar.is-black .navbar-start .navbar-link:focus,
  .navbar.is-black .navbar-start .navbar-link:hover,
  .navbar.is-black .navbar-start .navbar-link.is-active,
  .navbar.is-black .navbar-end > a.navbar-item:focus,
  .navbar.is-black .navbar-end > a.navbar-item:hover,
  .navbar.is-black .navbar-end > a.navbar-item.is-active,
  .navbar.is-black .navbar-end .navbar-link:focus,
  .navbar.is-black .navbar-end .navbar-link:hover,
  .navbar.is-black .navbar-end .navbar-link.is-active {
    background-color: black;
    color: white;
  }
  .navbar.is-black .navbar-start .navbar-link::after,
  .navbar.is-black .navbar-end .navbar-link::after {
    border-color: white;
  }
  .navbar.is-black .navbar-item.has-dropdown:focus .navbar-link,
  .navbar.is-black .navbar-item.has-dropdown:hover .navbar-link,
  .navbar.is-black .navbar-item.has-dropdown.is-active .navbar-link {
    background-color: black;
    color: white;
  }
  .navbar.is-black .navbar-dropdown a.navbar-item.is-active {
    background-color: #0a0a0a;
    color: white;
  }
}

.navbar.is-light {
  background-color: whitesmoke;
  color: rgba(0, 0, 0, 0.7);
}

.navbar.is-light .navbar-brand > .navbar-item,
.navbar.is-light .navbar-brand .navbar-link {
  color: rgba(0, 0, 0, 0.7);
}

.navbar.is-light .navbar-brand > a.navbar-item:focus, .navbar.is-light .navbar-brand > a.navbar-item:hover, .navbar.is-light .navbar-brand > a.navbar-item.is-active,
.navbar.is-light .navbar-brand .navbar-link:focus,
.navbar.is-light .navbar-brand .navbar-link:hover,
.navbar.is-light .navbar-brand .navbar-link.is-active {
  background-color: #e8e8e8;
  color: rgba(0, 0, 0, 0.7);
}

.navbar.is-light .navbar-brand .navbar-link::after {
  border-color: rgba(0, 0, 0, 0.7);
}

.navbar.is-light .navbar-burger {
  color: rgba(0, 0, 0, 0.7);
}

@media screen and (min-width: 1024px) {
  .navbar.is-light .navbar-start > .navbar-item,
  .navbar.is-light .navbar-start .navbar-link,
  .navbar.is-light .navbar-end > .navbar-item,
  .navbar.is-light .navbar-end .navbar-link {
    color: rgba(0, 0, 0, 0.7);
  }
  .navbar.is-light .navbar-start > a.navbar-item:focus, .navbar.is-light .navbar-start > a.navbar-item:hover, .navbar.is-light .navbar-start > a.navbar-item.is-active,
  .navbar.is-light .navbar-start .navbar-link:focus,
  .navbar.is-light .navbar-start .navbar-link:hover,
  .navbar.is-light .navbar-start .navbar-link.is-active,
  .navbar.is-light .navbar-end > a.navbar-item:focus,
  .navbar.is-light .navbar-end > a.navbar-item:hover,
  .navbar.is-light .navbar-end > a.navbar-item.is-active,
  .navbar.is-light .navbar-end .navbar-link:focus,
  .navbar.is-light .navbar-end .navbar-link:hover,
  .navbar.is-light .navbar-end .navbar-link.is-active {
    background-color: #e8e8e8;
    color: rgba(0, 0, 0, 0.7);
  }
  .navbar.is-light .navbar-start .navbar-link::after,
  .navbar.is-light .navbar-end .navbar-link::after {
    border-color: rgba(0, 0, 0, 0.7);
  }
  .navbar.is-light .navbar-item.has-dropdown:focus .navbar-link,
  .navbar.is-light .navbar-item.has-dropdown:hover .navbar-link,
  .navbar.is-light .navbar-item.has-dropdown.is-active .navbar-link {
    background-color: #e8e8e8;
    color: rgba(0, 0, 0, 0.7);
  }
  .navbar.is-light .navbar-dropdown a.navbar-item.is-active {
    background-color: whitesmoke;
    color: rgba(0, 0, 0, 0.7);
  }
}

.navbar.is-dark {
  background-color: #363636;
  color: #fff;
}

.navbar.is-dark .navbar-brand > .navbar-item,
.navbar.is-dark .navbar-brand .navbar-link {
  color: #fff;
}

.navbar.is-dark .navbar-brand > a.navbar-item:focus, .navbar.is-dark .navbar-brand > a.navbar-item:hover, .navbar.is-dark .navbar-brand > a.navbar-item.is-active,
.navbar.is-dark .navbar-brand .navbar-link:focus,
.navbar.is-dark .navbar-brand .navbar-link:hover,
.navbar.is-dark .navbar-brand .navbar-link.is-active {
  background-color: #292929;
  color: #fff;
}

.navbar.is-dark .navbar-brand .navbar-link::after {
  border-color: #fff;
}

.navbar.is-dark .navbar-burger {
  color: #fff;
}

@media screen and (min-width: 1024px) {
  .navbar.is-dark .navbar-start > .navbar-item,
  .navbar.is-dark .navbar-start .navbar-link,
  .navbar.is-dark .navbar-end > .navbar-item,
  .navbar.is-dark .navbar-end .navbar-link {
    color: #fff;
  }
  .navbar.is-dark .navbar-start > a.navbar-item:focus, .navbar.is-dark .navbar-start > a.navbar-item:hover, .navbar.is-dark .navbar-start > a.navbar-item.is-active,
  .navbar.is-dark .navbar-start .navbar-link:focus,
  .navbar.is-dark .navbar-start .navbar-link:hover,
  .navbar.is-dark .navbar-start .navbar-link.is-active,
  .navbar.is-dark .navbar-end > a.navbar-item:focus,
  .navbar.is-dark .navbar-end > a.navbar-item:hover,
  .navbar.is-dark .navbar-end > a.navbar-item.is-active,
  .navbar.is-dark .navbar-end .navbar-link:focus,
  .navbar.is-dark .navbar-end .navbar-link:hover,
  .navbar.is-dark .navbar-end .navbar-link.is-active {
    background-color: #292929;
    color: #fff;
  }
  .navbar.is-dark .navbar-start .navbar-link::after,
  .navbar.is-dark .navbar-end .navbar-link::after {
    border-color: #fff;
  }
  .navbar.is-dark .navbar-item.has-dropdown:focus .navbar-link,
  .navbar.is-dark .navbar-item.has-dropdown:hover .navbar-link,
  .navbar.is-dark .navbar-item.has-dropdown.is-active .navbar-link {
    background-color: #292929;
    color: #fff;
  }
  .navbar.is-dark .navbar-dropdown a.navbar-item.is-active {
    background-color: #363636;
    color: #fff;
  }
}

.navbar.is-primary {
  background-color: #00d1b2;
  color: #fff;
}

.navbar.is-primary .navbar-brand > .navbar-item,
.navbar.is-primary .navbar-brand .navbar-link {
  color: #fff;
}

.navbar.is-primary .navbar-brand > a.navbar-item:focus, .navbar.is-primary .navbar-brand > a.navbar-item:hover, .navbar.is-primary .navbar-brand > a.navbar-item.is-active,
.navbar.is-primary .navbar-brand .navbar-link:focus,
.navbar.is-primary .navbar-brand .navbar-link:hover,
.navbar.is-primary .navbar-brand .navbar-link.is-active {
  background-color: #00b89c;
  color: #fff;
}

.navbar.is-primary .navbar-brand .navbar-link::after {
  border-color: #fff;
}

.navbar.is-primary .navbar-burger {
  color: #fff;
}

@media screen and (min-width: 1024px) {
  .navbar.is-primary .navbar-start > .navbar-item,
  .navbar.is-primary .navbar-start .navbar-link,
  .navbar.is-primary .navbar-end > .navbar-item,
  .navbar.is-primary .navbar-end .navbar-link {
    color: #fff;
  }
  .navbar.is-primary .navbar-start > a.navbar-item:focus, .navbar.is-primary .navbar-start > a.navbar-item:hover, .navbar.is-primary .navbar-start > a.navbar-item.is-active,
  .navbar.is-primary .navbar-start .navbar-link:focus,
  .navbar.is-primary .navbar-start .navbar-link:hover,
  .navbar.is-primary .navbar-start .navbar-link.is-active,
  .navbar.is-primary .navbar-end > a.navbar-item:focus,
  .navbar.is-primary .navbar-end > a.navbar-item:hover,
  .navbar.is-primary .navbar-end > a.navbar-item.is-active,
  .navbar.is-primary .navbar-end .navbar-link:focus,
  .navbar.is-primary .navbar-end .navbar-link:hover,
  .navbar.is-primary .navbar-end .navbar-link.is-active {
    background-color: #00b89c;
    color: #fff;
  }
  .navbar.is-primary .navbar-start .navbar-link::after,
  .navbar.is-primary .navbar-end .navbar-link::after {
    border-color: #fff;
  }
  .navbar.is-primary .navbar-item.has-dropdown:focus .navbar-link,
  .navbar.is-primary .navbar-item.has-dropdown:hover .navbar-link,
  .navbar.is-primary .navbar-item.has-dropdown.is-active .navbar-link {
    background-color: #00b89c;
    color: #fff;
  }
  .navbar.is-primary .navbar-dropdown a.navbar-item.is-active {
    background-color: #00d1b2;
    color: #fff;
  }
}

.navbar.is-link {
  background-color: #3273dc;
  color: #fff;
}

.navbar.is-link .navbar-brand > .navbar-item,
.navbar.is-link .navbar-brand .navbar-link {
  color: #fff;
}

.navbar.is-link .navbar-brand > a.navbar-item:focus, .navbar.is-link .navbar-brand > a.navbar-item:hover, .navbar.is-link .navbar-brand > a.navbar-item.is-active,
.navbar.is-link .navbar-brand .navbar-link:focus,
.navbar.is-link .navbar-brand .navbar-link:hover,
.navbar.is-link .navbar-brand .navbar-link.is-active {
  background-color: #2366d1;
  color: #fff;
}

.navbar.is-link .navbar-brand .navbar-link::after {
  border-color: #fff;
}

.navbar.is-link .navbar-burger {
  color: #fff;
}

@media screen and (min-width: 1024px) {
  .navbar.is-link .navbar-start > .navbar-item,
  .navbar.is-link .navbar-start .navbar-link,
  .navbar.is-link .navbar-end > .navbar-item,
  .navbar.is-link .navbar-end .navbar-link {
    color: #fff;
  }
  .navbar.is-link .navbar-start > a.navbar-item:focus, .navbar.is-link .navbar-start > a.navbar-item:hover, .navbar.is-link .navbar-start > a.navbar-item.is-active,
  .navbar.is-link .navbar-start .navbar-link:focus,
  .navbar.is-link .navbar-start .navbar-link:hover,
  .navbar.is-link .navbar-start .navbar-link.is-active,
  .navbar.is-link .navbar-end > a.navbar-item:focus,
  .navbar.is-link .navbar-end > a.navbar-item:hover,
  .navbar.is-link .navbar-end > a.navbar-item.is-active,
  .navbar.is-link .navbar-end .navbar-link:focus,
  .navbar.is-link .navbar-end .navbar-link:hover,
  .navbar.is-link .navbar-end .navbar-link.is-active {
    background-color: #2366d1;
    color: #fff;
  }
  .navbar.is-link .navbar-start .navbar-link::after,
  .navbar.is-link .navbar-end .navbar-link::after {
    border-color: #fff;
  }
  .navbar.is-link .navbar-item.has-dropdown:focus .navbar-link,
  .navbar.is-link .navbar-item.has-dropdown:hover .navbar-link,
  .navbar.is-link .navbar-item.has-dropdown.is-active .navbar-link {
    background-color: #2366d1;
    color: #fff;
  }
  .navbar.is-link .navbar-dropdown a.navbar-item.is-active {
    background-color: #3273dc;
    color: #fff;
  }
}

.navbar.is-info {
  background-color: #3298dc;
  color: #fff;
}

.navbar.is-info .navbar-brand > .navbar-item,
.navbar.is-info .navbar-brand .navbar-link {
  color: #fff;
}

.navbar.is-info .navbar-brand > a.navbar-item:focus, .navbar.is-info .navbar-brand > a.navbar-item:hover, .navbar.is-info .navbar-brand > a.navbar-item.is-active,
.navbar.is-info .navbar-brand .navbar-link:focus,
.navbar.is-info .navbar-brand .navbar-link:hover,
.navbar.is-info .navbar-brand .navbar-link.is-active {
  background-color: #238cd1;
  color: #fff;
}

.navbar.is-info .navbar-brand .navbar-link::after {
  border-color: #fff;
}

.navbar.is-info .navbar-burger {
  color: #fff;
}

@media screen and (min-width: 1024px) {
  .navbar.is-info .navbar-start > .navbar-item,
  .navbar.is-info .navbar-start .navbar-link,
  .navbar.is-info .navbar-end > .navbar-item,
  .navbar.is-info .navbar-end .navbar-link {
    color: #fff;
  }
  .navbar.is-info .navbar-start > a.navbar-item:focus, .navbar.is-info .navbar-start > a.navbar-item:hover, .navbar.is-info .navbar-start > a.navbar-item.is-active,
  .navbar.is-info .navbar-start .navbar-link:focus,
  .navbar.is-info .navbar-start .navbar-link:hover,
  .navbar.is-info .navbar-start .navbar-link.is-active,
  .navbar.is-info .navbar-end > a.navbar-item:focus,
  .navbar.is-info .navbar-end > a.navbar-item:hover,
  .navbar.is-info .navbar-end > a.navbar-item.is-active,
  .navbar.is-info .navbar-end .navbar-link:focus,
  .navbar.is-info .navbar-end .navbar-link:hover,
  .navbar.is-info .navbar-end .navbar-link.is-active {
    background-color: #238cd1;
    color: #fff;
  }
  .navbar.is-info .navbar-start .navbar-link::after,
  .navbar.is-info .navbar-end .navbar-link::after {
    border-color: #fff;
  }
  .navbar.is-info .navbar-item.has-dropdown:focus .navbar-link,
  .navbar.is-info .navbar-item.has-dropdown:hover .navbar-link,
  .navbar.is-info .navbar-item.has-dropdown.is-active .navbar-link {
    background-color: #238cd1;
    color: #fff;
  }
  .navbar.is-info .navbar-dropdown a.navbar-item.is-active {
    background-color: #3298dc;
    color: #fff;
  }
}

.navbar.is-success {
  background-color: #48c774;
  color: #fff;
}

.navbar.is-success .navbar-brand > .navbar-item,
.navbar.is-success .navbar-brand .navbar-link {
  color: #fff;
}

.navbar.is-success .navbar-brand > a.navbar-item:focus, .navbar.is-success .navbar-brand > a.navbar-item:hover, .navbar.is-success .navbar-brand > a.navbar-item.is-active,
.navbar.is-success .navbar-brand .navbar-link:focus,
.navbar.is-success .navbar-brand .navbar-link:hover,
.navbar.is-success .navbar-brand .navbar-link.is-active {
  background-color: #3abb67;
  color: #fff;
}

.navbar.is-success .navbar-brand .navbar-link::after {
  border-color: #fff;
}

.navbar.is-success .navbar-burger {
  color: #fff;
}

@media screen and (min-width: 1024px) {
  .navbar.is-success .navbar-start > .navbar-item,
  .navbar.is-success .navbar-start .navbar-link,
  .navbar.is-success .navbar-end > .navbar-item,
  .navbar.is-success .navbar-end .navbar-link {
    color: #fff;
  }
  .navbar.is-success .navbar-start > a.navbar-item:focus, .navbar.is-success .navbar-start > a.navbar-item:hover, .navbar.is-success .navbar-start > a.navbar-item.is-active,
  .navbar.is-success .navbar-start .navbar-link:focus,
  .navbar.is-success .navbar-start .navbar-link:hover,
  .navbar.is-success .navbar-start .navbar-link.is-active,
  .navbar.is-success .navbar-end > a.navbar-item:focus,
  .navbar.is-success .navbar-end > a.navbar-item:hover,
  .navbar.is-success .navbar-end > a.navbar-item.is-active,
  .navbar.is-success .navbar-end .navbar-link:focus,
  .navbar.is-success .navbar-end .navbar-link:hover,
  .navbar.is-success .navbar-end .navbar-link.is-active {
    background-color: #3abb67;
    color: #fff;
  }
  .navbar.is-success .navbar-start .navbar-link::after,
  .navbar.is-success .navbar-end .navbar-link::after {
    border-color: #fff;
  }
  .navbar.is-success .navbar-item.has-dropdown:focus .navbar-link,
  .navbar.is-success .navbar-item.has-dropdown:hover .navbar-link,
  .navbar.is-success .navbar-item.has-dropdown.is-active .navbar-link {
    background-color: #3abb67;
    color: #fff;
  }
  .navbar.is-success .navbar-dropdown a.navbar-item.is-active {
    background-color: #48c774;
    color: #fff;
  }
}

.navbar.is-warning {
  background-color: #ffdd57;
  color: rgba(0, 0, 0, 0.7);
}

.navbar.is-warning .navbar-brand > .navbar-item,
.navbar.is-warning .navbar-brand .navbar-link {
  color: rgba(0, 0, 0, 0.7);
}

.navbar.is-warning .navbar-brand > a.navbar-item:focus, .navbar.is-warning .navbar-brand > a.navbar-item:hover, .navbar.is-warning .navbar-brand > a.navbar-item.is-active,
.navbar.is-warning .navbar-brand .navbar-link:focus,
.navbar.is-warning .navbar-brand .navbar-link:hover,
.navbar.is-warning .navbar-brand .navbar-link.is-active {
  background-color: #ffd83d;
  color: rgba(0, 0, 0, 0.7);
}

.navbar.is-warning .navbar-brand .navbar-link::after {
  border-color: rgba(0, 0, 0, 0.7);
}

.navbar.is-warning .navbar-burger {
  color: rgba(0, 0, 0, 0.7);
}

@media screen and (min-width: 1024px) {
  .navbar.is-warning .navbar-start > .navbar-item,
  .navbar.is-warning .navbar-start .navbar-link,
  .navbar.is-warning .navbar-end > .navbar-item,
  .navbar.is-warning .navbar-end .navbar-link {
    color: rgba(0, 0, 0, 0.7);
  }
  .navbar.is-warning .navbar-start > a.navbar-item:focus, .navbar.is-warning .navbar-start > a.navbar-item:hover, .navbar.is-warning .navbar-start > a.navbar-item.is-active,
  .navbar.is-warning .navbar-start .navbar-link:focus,
  .navbar.is-warning .navbar-start .navbar-link:hover,
  .navbar.is-warning .navbar-start .navbar-link.is-active,
  .navbar.is-warning .navbar-end > a.navbar-item:focus,
  .navbar.is-warning .navbar-end > a.navbar-item:hover,
  .navbar.is-warning .navbar-end > a.navbar-item.is-active,
  .navbar.is-warning .navbar-end .navbar-link:focus,
  .navbar.is-warning .navbar-end .navbar-link:hover,
  .navbar.is-warning .navbar-end .navbar-link.is-active {
    background-color: #ffd83d;
    color: rgba(0, 0, 0, 0.7);
  }
  .navbar.is-warning .navbar-start .navbar-link::after,
  .navbar.is-warning .navbar-end .navbar-link::after {
    border-color: rgba(0, 0, 0, 0.7);
  }
  .navbar.is-warning .navbar-item.has-dropdown:focus .navbar-link,
  .navbar.is-warning .navbar-item.has-dropdown:hover .navbar-link,
  .navbar.is-warning .navbar-item.has-dropdown.is-active .navbar-link {
    background-color: #ffd83d;
    color: rgba(0, 0, 0, 0.7);
  }
  .navbar.is-warning .navbar-dropdown a.navbar-item.is-active {
    background-color: #ffdd57;
    color: rgba(0, 0, 0, 0.7);
  }
}

.navbar.is-danger {
  background-color: #f14668;
  color: #fff;
}

.navbar.is-danger .navbar-brand > .navbar-item,
.navbar.is-danger .navbar-brand .navbar-link {
  color: #fff;
}

.navbar.is-danger .navbar-brand > a.navbar-item:focus, .navbar.is-danger .navbar-brand > a.navbar-item:hover, .navbar.is-danger .navbar-brand > a.navbar-item.is-active,
.navbar.is-danger .navbar-brand .navbar-link:focus,
.navbar.is-danger .navbar-brand .navbar-link:hover,
.navbar.is-danger .navbar-brand .navbar-link.is-active {
  background-color: #ef2e55;
  color: #fff;
}

.navbar.is-danger .navbar-brand .navbar-link::after {
  border-color: #fff;
}

.navbar.is-danger .navbar-burger {
  color: #fff;
}

@media screen and (min-width: 1024px) {
  .navbar.is-danger .navbar-start > .navbar-item,
  .navbar.is-danger .navbar-start .navbar-link,
  .navbar.is-danger .navbar-end > .navbar-item,
  .navbar.is-danger .navbar-end .navbar-link {
    color: #fff;
  }
  .navbar.is-danger .navbar-start > a.navbar-item:focus, .navbar.is-danger .navbar-start > a.navbar-item:hover, .navbar.is-danger .navbar-start > a.navbar-item.is-active,
  .navbar.is-danger .navbar-start .navbar-link:focus,
  .navbar.is-danger .navbar-start .navbar-link:hover,
  .navbar.is-danger .navbar-start .navbar-link.is-active,
  .navbar.is-danger .navbar-end > a.navbar-item:focus,
  .navbar.is-danger .navbar-end > a.navbar-item:hover,
  .navbar.is-danger .navbar-end > a.navbar-item.is-active,
  .navbar.is-danger .navbar-end .navbar-link:focus,
  .navbar.is-danger .navbar-end .navbar-link:hover,
  .navbar.is-danger .navbar-end .navbar-link.is-active {
    background-color: #ef2e55;
    color: #fff;
  }
  .navbar.is-danger .navbar-start .navbar-link::after,
  .navbar.is-danger .navbar-end .navbar-link::after {
    border-color: #fff;
  }
  .navbar.is-danger .navbar-item.has-dropdown:focus .navbar-link,
  .navbar.is-danger .navbar-item.has-dropdown:hover .navbar-link,
  .navbar.is-danger .navbar-item.has-dropdown.is-active .navbar-link {
    background-color: #ef2e55;
    color: #fff;
  }
  .navbar.is-danger .navbar-dropdown a.navbar-item.is-active {
    background-color: #f14668;
    color: #fff;
  }
}

.navbar > .container {
  align-items: stretch;
  display: flex;
  min-height: 3.25rem;
  width: 100%;
}

.navbar.has-shadow {
  box-shadow: 0 2px 0 0 whitesmoke;
}

.navbar.is-fixed-bottom, .navbar.is-fixed-top {
  left: 0;
  position: fixed;
  right: 0;
  z-index: 30;
}

.navbar.is-fixed-bottom {
  bottom: 0;
}

.navbar.is-fixed-bottom.has-shadow {
  box-shadow: 0 -2px 0 0 whitesmoke;
}

.navbar.is-fixed-top {
  top: 0;
}

html.has-navbar-fixed-top,
body.has-navbar-fixed-top {
  padding-top: 3.25rem;
}

html.has-navbar-fixed-bottom,
body.has-navbar-fixed-bottom {
  padding-bottom: 3.25rem;
}

.navbar-brand,
.navbar-tabs {
  align-items: stretch;
  display: flex;
  flex-shrink: 0;
  min-height: 3.25rem;
}

.navbar-brand a.navbar-item:focus, .navbar-brand a.navbar-item:hover {
  background-color: transparent;
}

.navbar-tabs {
  -webkit-overflow-scrolling: touch;
  max-width: 100vw;
  overflow-x: auto;
  overflow-y: hidden;
}

.navbar-burger {
  color: #4a4a4a;
  cursor: pointer;
  display: block;
  height: 3.25rem;
  position: relative;
  width: 3.25rem;
  margin-left: auto;
}

.navbar-burger span {
  background-color: currentColor;
  display: block;
  height: 1px;
  left: calc(50% - 8px);
  position: absolute;
  transform-origin: center;
  transition-duration: 86ms;
  transition-property: background-color, opacity, transform;
  transition-timing-function: ease-out;
  width: 16px;
}

.navbar-burger span:nth-child(1) {
  top: calc(50% - 6px);
}

.navbar-burger span:nth-child(2) {
  top: calc(50% - 1px);
}

.navbar-burger span:nth-child(3) {
  top: calc(50% + 4px);
}

.navbar-burger:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.navbar-burger.is-active span:nth-child(1) {
  transform: translateY(5px) rotate(45deg);
}

.navbar-burger.is-active span:nth-child(2) {
  opacity: 0;
}

.navbar-burger.is-active span:nth-child(3) {
  transform: translateY(-5px) rotate(-45deg);
}

.navbar-menu {
  display: none;
}

.navbar-item,
.navbar-link {
  color: #4a4a4a;
  display: block;
  line-height: 1.5;
  padding: 0.5rem 0.75rem;
  position: relative;
}

.navbar-item .icon:only-child,
.navbar-link .icon:only-child {
  margin-left: -0.25rem;
  margin-right: -0.25rem;
}

a.navbar-item,
.navbar-link {
  cursor: pointer;
}

a.navbar-item:focus, a.navbar-item:focus-within, a.navbar-item:hover, a.navbar-item.is-active,
.navbar-link:focus,
.navbar-link:focus-within,
.navbar-link:hover,
.navbar-link.is-active {
  background-color: #fafafa;
  color: #3273dc;
}

.navbar-item {
  flex-grow: 0;
  flex-shrink: 0;
}

.navbar-item img {
  max-height: 1.75rem;
}

.navbar-item.has-dropdown {
  padding: 0;
}

.navbar-item.is-expanded {
  flex-grow: 1;
  flex-shrink: 1;
}

.navbar-item.is-tab {
  border-bottom: 1px solid transparent;
  min-height: 3.25rem;
  padding-bottom: calc(0.5rem - 1px);
}

.navbar-item.is-tab:focus, .navbar-item.is-tab:hover {
  background-color: transparent;
  border-bottom-color: #3273dc;
}

.navbar-item.is-tab.is-active {
  background-color: transparent;
  border-bottom-color: #3273dc;
  border-bottom-style: solid;
  border-bottom-width: 3px;
  color: #3273dc;
  padding-bottom: calc(0.5rem - 3px);
}

.navbar-content {
  flex-grow: 1;
  flex-shrink: 1;
}

.navbar-link:not(.is-arrowless) {
  padding-right: 2.5em;
}

.navbar-link:not(.is-arrowless)::after {
  border-color: #3273dc;
  margin-top: -0.375em;
  right: 1.125em;
}

.navbar-dropdown {
  font-size: 0.875rem;
  padding-bottom: 0.5rem;
  padding-top: 0.5rem;
}

.navbar-dropdown .navbar-item {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

.navbar-divider {
  background-color: whitesmoke;
  border: none;
  display: none;
  height: 2px;
  margin: 0.5rem 0;
}

@media screen and (max-width: 1023px) {
  .navbar > .container {
    display: block;
  }
  .navbar-brand .navbar-item,
  .navbar-tabs .navbar-item {
    align-items: center;
    display: flex;
  }
  .navbar-link::after {
    display: none;
  }
  .navbar-menu {
    background-color: white;
    box-shadow: 0 8px 16px rgba(10, 10, 10, 0.1);
    padding: 0.5rem 0;
  }
  .navbar-menu.is-active {
    display: block;
  }
  .navbar.is-fixed-bottom-touch, .navbar.is-fixed-top-touch {
    left: 0;
    position: fixed;
    right: 0;
    z-index: 30;
  }
  .navbar.is-fixed-bottom-touch {
    bottom: 0;
  }
  .navbar.is-fixed-bottom-touch.has-shadow {
    box-shadow: 0 -2px 3px rgba(10, 10, 10, 0.1);
  }
  .navbar.is-fixed-top-touch {
    top: 0;
  }
  .navbar.is-fixed-top .navbar-menu, .navbar.is-fixed-top-touch .navbar-menu {
    -webkit-overflow-scrolling: touch;
    max-height: calc(100vh - 3.25rem);
    overflow: auto;
  }
  html.has-navbar-fixed-top-touch,
  body.has-navbar-fixed-top-touch {
    padding-top: 3.25rem;
  }
  html.has-navbar-fixed-bottom-touch,
  body.has-navbar-fixed-bottom-touch {
    padding-bottom: 3.25rem;
  }
}

@media screen and (min-width: 1024px) {
  .navbar,
  .navbar-menu,
  .navbar-start,
  .navbar-end {
    align-items: stretch;
    display: flex;
  }
  .navbar {
    min-height: 3.25rem;
  }
  .navbar.is-spaced {
    padding: 1rem 2rem;
  }
  .navbar.is-spaced .navbar-start,
  .navbar.is-spaced .navbar-end {
    align-items: center;
  }
  .navbar.is-spaced a.navbar-item,
  .navbar.is-spaced .navbar-link {
    border-radius: 4px;
  }
  .navbar.is-transparent a.navbar-item:focus, .navbar.is-transparent a.navbar-item:hover, .navbar.is-transparent a.navbar-item.is-active,
  .navbar.is-transparent .navbar-link:focus,
  .navbar.is-transparent .navbar-link:hover,
  .navbar.is-transparent .navbar-link.is-active {
    background-color: transparent !important;
  }
  .navbar.is-transparent .navbar-item.has-dropdown.is-active .navbar-link, .navbar.is-transparent .navbar-item.has-dropdown.is-hoverable:focus .navbar-link, .navbar.is-transparent .navbar-item.has-dropdown.is-hoverable:focus-within .navbar-link, .navbar.is-transparent .navbar-item.has-dropdown.is-hoverable:hover .navbar-link {
    background-color: transparent !important;
  }
  .navbar.is-transparent .navbar-dropdown a.navbar-item:focus, .navbar.is-transparent .navbar-dropdown a.navbar-item:hover {
    background-color: whitesmoke;
    color: #0a0a0a;
  }
  .navbar.is-transparent .navbar-dropdown a.navbar-item.is-active {
    background-color: whitesmoke;
    color: #3273dc;
  }
  .navbar-burger {
    display: none;
  }
  .navbar-item,
  .navbar-link {
    align-items: center;
    display: flex;
  }
  .navbar-item.has-dropdown {
    align-items: stretch;
  }
  .navbar-item.has-dropdown-up .navbar-link::after {
    transform: rotate(135deg) translate(0.25em, -0.25em);
  }
  .navbar-item.has-dropdown-up .navbar-dropdown {
    border-bottom: 2px solid #dbdbdb;
    border-radius: 6px 6px 0 0;
    border-top: none;
    bottom: 100%;
    box-shadow: 0 -8px 8px rgba(10, 10, 10, 0.1);
    top: auto;
  }
  .navbar-item.is-active .navbar-dropdown, .navbar-item.is-hoverable:focus .navbar-dropdown, .navbar-item.is-hoverable:focus-within .navbar-dropdown, .navbar-item.is-hoverable:hover .navbar-dropdown {
    display: block;
  }
  .navbar.is-spaced .navbar-item.is-active .navbar-dropdown, .navbar-item.is-active .navbar-dropdown.is-boxed, .navbar.is-spaced .navbar-item.is-hoverable:focus .navbar-dropdown, .navbar-item.is-hoverable:focus .navbar-dropdown.is-boxed, .navbar.is-spaced .navbar-item.is-hoverable:focus-within .navbar-dropdown, .navbar-item.is-hoverable:focus-within .navbar-dropdown.is-boxed, .navbar.is-spaced .navbar-item.is-hoverable:hover .navbar-dropdown, .navbar-item.is-hoverable:hover .navbar-dropdown.is-boxed {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
  }
  .navbar-menu {
    flex-grow: 1;
    flex-shrink: 0;
  }
  .navbar-start {
    justify-content: flex-start;
    margin-right: auto;
  }
  .navbar-end {
    justify-content: flex-end;
    margin-left: auto;
  }
  .navbar-dropdown {
    background-color: white;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    border-top: 2px solid #dbdbdb;
    box-shadow: 0 8px 8px rgba(10, 10, 10, 0.1);
    display: none;
    font-size: 0.875rem;
    left: 0;
    min-width: 100%;
    position: absolute;
    top: 100%;
    z-index: 20;
  }
  .navbar-dropdown .navbar-item {
    padding: 0.375rem 1rem;
    white-space: nowrap;
  }
  .navbar-dropdown a.navbar-item {
    padding-right: 3rem;
  }
  .navbar-dropdown a.navbar-item:focus, .navbar-dropdown a.navbar-item:hover {
    background-color: whitesmoke;
    color: #0a0a0a;
  }
  .navbar-dropdown a.navbar-item.is-active {
    background-color: whitesmoke;
    color: #3273dc;
  }
  .navbar.is-spaced .navbar-dropdown, .navbar-dropdown.is-boxed {
    border-radius: 6px;
    border-top: none;
    box-shadow: 0 8px 8px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
    display: block;
    opacity: 0;
    pointer-events: none;
    top: calc(100% + (-4px));
    transform: translateY(-5px);
    transition-duration: 86ms;
    transition-property: opacity, transform;
  }
  .navbar-dropdown.is-right {
    left: auto;
    right: 0;
  }
  .navbar-divider {
    display: block;
  }
  .navbar > .container .navbar-brand,
  .container > .navbar .navbar-brand {
    margin-left: -0.75rem;
  }
  .navbar > .container .navbar-menu,
  .container > .navbar .navbar-menu {
    margin-right: -0.75rem;
  }
  .navbar.is-fixed-bottom-desktop, .navbar.is-fixed-top-desktop {
    left: 0;
    position: fixed;
    right: 0;
    z-index: 30;
  }
  .navbar.is-fixed-bottom-desktop {
    bottom: 0;
  }
  .navbar.is-fixed-bottom-desktop.has-shadow {
    box-shadow: 0 -2px 3px rgba(10, 10, 10, 0.1);
  }
  .navbar.is-fixed-top-desktop {
    top: 0;
  }
  html.has-navbar-fixed-top-desktop,
  body.has-navbar-fixed-top-desktop {
    padding-top: 3.25rem;
  }
  html.has-navbar-fixed-bottom-desktop,
  body.has-navbar-fixed-bottom-desktop {
    padding-bottom: 3.25rem;
  }
  html.has-spaced-navbar-fixed-top,
  body.has-spaced-navbar-fixed-top {
    padding-top: 5.25rem;
  }
  html.has-spaced-navbar-fixed-bottom,
  body.has-spaced-navbar-fixed-bottom {
    padding-bottom: 5.25rem;
  }
  a.navbar-item.is-active,
  .navbar-link.is-active {
    color: #0a0a0a;
  }
  a.navbar-item.is-active:not(:focus):not(:hover),
  .navbar-link.is-active:not(:focus):not(:hover) {
    background-color: transparent;
  }
  .navbar-item.has-dropdown:focus .navbar-link, .navbar-item.has-dropdown:hover .navbar-link, .navbar-item.has-dropdown.is-active .navbar-link {
    background-color: #fafafa;
  }
}

.hero.is-fullheight-with-navbar {
  min-height: calc(100vh - 3.25rem);
}

.pagination {
  font-size: 1rem;
  margin: -0.25rem;
}

.pagination.is-small {
  font-size: 0.75rem;
}

.pagination.is-medium {
  font-size: 1.25rem;
}

.pagination.is-large {
  font-size: 1.5rem;
}

.pagination.is-rounded .pagination-previous,
.pagination.is-rounded .pagination-next {
  padding-left: 1em;
  padding-right: 1em;
  border-radius: 290486px;
}

.pagination.is-rounded .pagination-link {
  border-radius: 290486px;
}

.pagination,
.pagination-list {
  align-items: center;
  display: flex;
  justify-content: center;
  text-align: center;
}

.pagination-previous,
.pagination-next,
.pagination-link,
.pagination-ellipsis {
  font-size: 1em;
  justify-content: center;
  margin: 0.25rem;
  padding-left: 0.5em;
  padding-right: 0.5em;
  text-align: center;
}

.pagination-previous,
.pagination-next,
.pagination-link {
  border-color: #dbdbdb;
  color: #363636;
  min-width: 2.5em;
}

.pagination-previous:hover,
.pagination-next:hover,
.pagination-link:hover {
  border-color: #b5b5b5;
  color: #363636;
}

.pagination-previous:focus,
.pagination-next:focus,
.pagination-link:focus {
  border-color: #3273dc;
}

.pagination-previous:active,
.pagination-next:active,
.pagination-link:active {
  box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.2);
}

.pagination-previous[disabled],
.pagination-next[disabled],
.pagination-link[disabled] {
  background-color: #dbdbdb;
  border-color: #dbdbdb;
  box-shadow: none;
  color: #7a7a7a;
  opacity: 0.5;
}

.pagination-previous,
.pagination-next {
  padding-left: 0.75em;
  padding-right: 0.75em;
  white-space: nowrap;
}

.pagination-link.is-current {
  background-color: #3273dc;
  border-color: #3273dc;
  color: #fff;
}

.pagination-ellipsis {
  color: #b5b5b5;
  pointer-events: none;
}

.pagination-list {
  flex-wrap: wrap;
}

.pagination-list li {
  list-style: none;
}

@media screen and (max-width: 768px) {
  .pagination {
    flex-wrap: wrap;
  }
  .pagination-previous,
  .pagination-next {
    flex-grow: 1;
    flex-shrink: 1;
  }
  .pagination-list li {
    flex-grow: 1;
    flex-shrink: 1;
  }
}

@media screen and (min-width: 769px), print {
  .pagination-list {
    flex-grow: 1;
    flex-shrink: 1;
    justify-content: flex-start;
    order: 1;
  }
  .pagination-previous {
    order: 2;
  }
  .pagination-next {
    order: 3;
  }
  .pagination {
    justify-content: space-between;
  }
  .pagination.is-centered .pagination-previous {
    order: 1;
  }
  .pagination.is-centered .pagination-list {
    justify-content: center;
    order: 2;
  }
  .pagination.is-centered .pagination-next {
    order: 3;
  }
  .pagination.is-right .pagination-previous {
    order: 1;
  }
  .pagination.is-right .pagination-next {
    order: 2;
  }
  .pagination.is-right .pagination-list {
    justify-content: flex-end;
    order: 3;
  }
}

.panel {
  border-radius: 6px;
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1), 0 0px 0 1px rgba(10, 10, 10, 0.02);
  font-size: 1rem;
}

.panel:not(:last-child) {
  margin-bottom: 1.5rem;
}

.panel.is-white .panel-heading {
  background-color: white;
  color: #0a0a0a;
}

.panel.is-white .panel-tabs a.is-active {
  border-bottom-color: white;
}

.panel.is-white .panel-block.is-active .panel-icon {
  color: white;
}

.panel.is-black .panel-heading {
  background-color: #0a0a0a;
  color: white;
}

.panel.is-black .panel-tabs a.is-active {
  border-bottom-color: #0a0a0a;
}

.panel.is-black .panel-block.is-active .panel-icon {
  color: #0a0a0a;
}

.panel.is-light .panel-heading {
  background-color: whitesmoke;
  color: rgba(0, 0, 0, 0.7);
}

.panel.is-light .panel-tabs a.is-active {
  border-bottom-color: whitesmoke;
}

.panel.is-light .panel-block.is-active .panel-icon {
  color: whitesmoke;
}

.panel.is-dark .panel-heading {
  background-color: #363636;
  color: #fff;
}

.panel.is-dark .panel-tabs a.is-active {
  border-bottom-color: #363636;
}

.panel.is-dark .panel-block.is-active .panel-icon {
  color: #363636;
}

.panel.is-primary .panel-heading {
  background-color: #00d1b2;
  color: #fff;
}

.panel.is-primary .panel-tabs a.is-active {
  border-bottom-color: #00d1b2;
}

.panel.is-primary .panel-block.is-active .panel-icon {
  color: #00d1b2;
}

.panel.is-link .panel-heading {
  background-color: #3273dc;
  color: #fff;
}

.panel.is-link .panel-tabs a.is-active {
  border-bottom-color: #3273dc;
}

.panel.is-link .panel-block.is-active .panel-icon {
  color: #3273dc;
}

.panel.is-info .panel-heading {
  background-color: #3298dc;
  color: #fff;
}

.panel.is-info .panel-tabs a.is-active {
  border-bottom-color: #3298dc;
}

.panel.is-info .panel-block.is-active .panel-icon {
  color: #3298dc;
}

.panel.is-success .panel-heading {
  background-color: #48c774;
  color: #fff;
}

.panel.is-success .panel-tabs a.is-active {
  border-bottom-color: #48c774;
}

.panel.is-success .panel-block.is-active .panel-icon {
  color: #48c774;
}

.panel.is-warning .panel-heading {
  background-color: #ffdd57;
  color: rgba(0, 0, 0, 0.7);
}

.panel.is-warning .panel-tabs a.is-active {
  border-bottom-color: #ffdd57;
}

.panel.is-warning .panel-block.is-active .panel-icon {
  color: #ffdd57;
}

.panel.is-danger .panel-heading {
  background-color: #f14668;
  color: #fff;
}

.panel.is-danger .panel-tabs a.is-active {
  border-bottom-color: #f14668;
}

.panel.is-danger .panel-block.is-active .panel-icon {
  color: #f14668;
}

.panel-tabs:not(:last-child),
.panel-block:not(:last-child) {
  border-bottom: 1px solid #ededed;
}

.panel-heading {
  background-color: #ededed;
  border-radius: 6px 6px 0 0;
  color: #363636;
  font-size: 1.25em;
  font-weight: 700;
  line-height: 1.25;
  padding: 0.75em 1em;
}

.panel-tabs {
  align-items: flex-end;
  display: flex;
  font-size: 0.875em;
  justify-content: center;
}

.panel-tabs a {
  border-bottom: 1px solid #dbdbdb;
  margin-bottom: -1px;
  padding: 0.5em;
}

.panel-tabs a.is-active {
  border-bottom-color: #4a4a4a;
  color: #363636;
}

.panel-list a {
  color: #4a4a4a;
}

.panel-list a:hover {
  color: #3273dc;
}

.panel-block {
  align-items: center;
  color: #363636;
  display: flex;
  justify-content: flex-start;
  padding: 0.5em 0.75em;
}

.panel-block input[type="checkbox"] {
  margin-right: 0.75em;
}

.panel-block > .control {
  flex-grow: 1;
  flex-shrink: 1;
  width: 100%;
}

.panel-block.is-wrapped {
  flex-wrap: wrap;
}

.panel-block.is-active {
  border-left-color: #3273dc;
  color: #363636;
}

.panel-block.is-active .panel-icon {
  color: #3273dc;
}

.panel-block:last-child {
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}

a.panel-block,
label.panel-block {
  cursor: pointer;
}

a.panel-block:hover,
label.panel-block:hover {
  background-color: whitesmoke;
}

.panel-icon {
  display: inline-block;
  font-size: 14px;
  height: 1em;
  line-height: 1em;
  text-align: center;
  vertical-align: top;
  width: 1em;
  color: #7a7a7a;
  margin-right: 0.75em;
}

.panel-icon .fa {
  font-size: inherit;
  line-height: inherit;
}

.tabs {
  -webkit-overflow-scrolling: touch;
  align-items: stretch;
  display: flex;
  font-size: 1rem;
  justify-content: space-between;
  overflow: hidden;
  overflow-x: auto;
  white-space: nowrap;
}

.tabs a {
  align-items: center;
  border-bottom-color: #dbdbdb;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  color: #4a4a4a;
  display: flex;
  justify-content: center;
  margin-bottom: -1px;
  padding: 0.5em 1em;
  vertical-align: top;
}

.tabs a:hover {
  border-bottom-color: #363636;
  color: #363636;
}

.tabs li {
  display: block;
}

.tabs li.is-active a {
  border-bottom-color: #3273dc;
  color: #3273dc;
}

.tabs ul {
  align-items: center;
  border-bottom-color: #dbdbdb;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  display: flex;
  flex-grow: 1;
  flex-shrink: 0;
  justify-content: flex-start;
}

.tabs ul.is-left {
  padding-right: 0.75em;
}

.tabs ul.is-center {
  flex: none;
  justify-content: center;
  padding-left: 0.75em;
  padding-right: 0.75em;
}

.tabs ul.is-right {
  justify-content: flex-end;
  padding-left: 0.75em;
}

.tabs .icon:first-child {
  margin-right: 0.5em;
}

.tabs .icon:last-child {
  margin-left: 0.5em;
}

.tabs.is-centered ul {
  justify-content: center;
}

.tabs.is-right ul {
  justify-content: flex-end;
}

.tabs.is-boxed a {
  border: 1px solid transparent;
  border-radius: 4px 4px 0 0;
}

.tabs.is-boxed a:hover {
  background-color: whitesmoke;
  border-bottom-color: #dbdbdb;
}

.tabs.is-boxed li.is-active a {
  background-color: white;
  border-color: #dbdbdb;
  border-bottom-color: transparent !important;
}

.tabs.is-fullwidth li {
  flex-grow: 1;
  flex-shrink: 0;
}

.tabs.is-toggle a {
  border-color: #dbdbdb;
  border-style: solid;
  border-width: 1px;
  margin-bottom: 0;
  position: relative;
}

.tabs.is-toggle a:hover {
  background-color: whitesmoke;
  border-color: #b5b5b5;
  z-index: 2;
}

.tabs.is-toggle li + li {
  margin-left: -1px;
}

.tabs.is-toggle li:first-child a {
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}

.tabs.is-toggle li:last-child a {
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}

.tabs.is-toggle li.is-active a {
  background-color: #3273dc;
  border-color: #3273dc;
  color: #fff;
  z-index: 1;
}

.tabs.is-toggle ul {
  border-bottom: none;
}

.tabs.is-toggle.is-toggle-rounded li:first-child a {
  border-bottom-left-radius: 290486px;
  border-top-left-radius: 290486px;
  padding-left: 1.25em;
}

.tabs.is-toggle.is-toggle-rounded li:last-child a {
  border-bottom-right-radius: 290486px;
  border-top-right-radius: 290486px;
  padding-right: 1.25em;
}

.tabs.is-small {
  font-size: 0.75rem;
}

.tabs.is-medium {
  font-size: 1.25rem;
}

.tabs.is-large {
  font-size: 1.5rem;
}

/* Bulma Grid */
.column {
  display: block;
  flex-basis: 0;
  flex-grow: 1;
  flex-shrink: 1;
  padding: 0.75rem;
}

.columns.is-mobile > .column.is-narrow {
  flex: none;
  width: unset;
}

.columns.is-mobile > .column.is-full {
  flex: none;
  width: 100%;
}

.columns.is-mobile > .column.is-three-quarters {
  flex: none;
  width: 75%;
}

.columns.is-mobile > .column.is-two-thirds {
  flex: none;
  width: 66.6666%;
}

.columns.is-mobile > .column.is-half {
  flex: none;
  width: 50%;
}

.columns.is-mobile > .column.is-one-third {
  flex: none;
  width: 33.3333%;
}

.columns.is-mobile > .column.is-one-quarter {
  flex: none;
  width: 25%;
}

.columns.is-mobile > .column.is-one-fifth {
  flex: none;
  width: 20%;
}

.columns.is-mobile > .column.is-two-fifths {
  flex: none;
  width: 40%;
}

.columns.is-mobile > .column.is-three-fifths {
  flex: none;
  width: 60%;
}

.columns.is-mobile > .column.is-four-fifths {
  flex: none;
  width: 80%;
}

.columns.is-mobile > .column.is-offset-three-quarters {
  margin-left: 75%;
}

.columns.is-mobile > .column.is-offset-two-thirds {
  margin-left: 66.6666%;
}

.columns.is-mobile > .column.is-offset-half {
  margin-left: 50%;
}

.columns.is-mobile > .column.is-offset-one-third {
  margin-left: 33.3333%;
}

.columns.is-mobile > .column.is-offset-one-quarter {
  margin-left: 25%;
}

.columns.is-mobile > .column.is-offset-one-fifth {
  margin-left: 20%;
}

.columns.is-mobile > .column.is-offset-two-fifths {
  margin-left: 40%;
}

.columns.is-mobile > .column.is-offset-three-fifths {
  margin-left: 60%;
}

.columns.is-mobile > .column.is-offset-four-fifths {
  margin-left: 80%;
}

.columns.is-mobile > .column.is-0 {
  flex: none;
  width: 0%;
}

.columns.is-mobile > .column.is-offset-0 {
  margin-left: 0%;
}

.columns.is-mobile > .column.is-1 {
  flex: none;
  width: 8.33333%;
}

.columns.is-mobile > .column.is-offset-1 {
  margin-left: 8.33333%;
}

.columns.is-mobile > .column.is-2 {
  flex: none;
  width: 16.66667%;
}

.columns.is-mobile > .column.is-offset-2 {
  margin-left: 16.66667%;
}

.columns.is-mobile > .column.is-3 {
  flex: none;
  width: 25%;
}

.columns.is-mobile > .column.is-offset-3 {
  margin-left: 25%;
}

.columns.is-mobile > .column.is-4 {
  flex: none;
  width: 33.33333%;
}

.columns.is-mobile > .column.is-offset-4 {
  margin-left: 33.33333%;
}

.columns.is-mobile > .column.is-5 {
  flex: none;
  width: 41.66667%;
}

.columns.is-mobile > .column.is-offset-5 {
  margin-left: 41.66667%;
}

.columns.is-mobile > .column.is-6 {
  flex: none;
  width: 50%;
}

.columns.is-mobile > .column.is-offset-6 {
  margin-left: 50%;
}

.columns.is-mobile > .column.is-7 {
  flex: none;
  width: 58.33333%;
}

.columns.is-mobile > .column.is-offset-7 {
  margin-left: 58.33333%;
}

.columns.is-mobile > .column.is-8 {
  flex: none;
  width: 66.66667%;
}

.columns.is-mobile > .column.is-offset-8 {
  margin-left: 66.66667%;
}

.columns.is-mobile > .column.is-9 {
  flex: none;
  width: 75%;
}

.columns.is-mobile > .column.is-offset-9 {
  margin-left: 75%;
}

.columns.is-mobile > .column.is-10 {
  flex: none;
  width: 83.33333%;
}

.columns.is-mobile > .column.is-offset-10 {
  margin-left: 83.33333%;
}

.columns.is-mobile > .column.is-11 {
  flex: none;
  width: 91.66667%;
}

.columns.is-mobile > .column.is-offset-11 {
  margin-left: 91.66667%;
}

.columns.is-mobile > .column.is-12 {
  flex: none;
  width: 100%;
}

.columns.is-mobile > .column.is-offset-12 {
  margin-left: 100%;
}

@media screen and (max-width: 768px) {
  .column.is-narrow-mobile {
    flex: none;
    width: unset;
  }
  .column.is-full-mobile {
    flex: none;
    width: 100%;
  }
  .column.is-three-quarters-mobile {
    flex: none;
    width: 75%;
  }
  .column.is-two-thirds-mobile {
    flex: none;
    width: 66.6666%;
  }
  .column.is-half-mobile {
    flex: none;
    width: 50%;
  }
  .column.is-one-third-mobile {
    flex: none;
    width: 33.3333%;
  }
  .column.is-one-quarter-mobile {
    flex: none;
    width: 25%;
  }
  .column.is-one-fifth-mobile {
    flex: none;
    width: 20%;
  }
  .column.is-two-fifths-mobile {
    flex: none;
    width: 40%;
  }
  .column.is-three-fifths-mobile {
    flex: none;
    width: 60%;
  }
  .column.is-four-fifths-mobile {
    flex: none;
    width: 80%;
  }
  .column.is-offset-three-quarters-mobile {
    margin-left: 75%;
  }
  .column.is-offset-two-thirds-mobile {
    margin-left: 66.6666%;
  }
  .column.is-offset-half-mobile {
    margin-left: 50%;
  }
  .column.is-offset-one-third-mobile {
    margin-left: 33.3333%;
  }
  .column.is-offset-one-quarter-mobile {
    margin-left: 25%;
  }
  .column.is-offset-one-fifth-mobile {
    margin-left: 20%;
  }
  .column.is-offset-two-fifths-mobile {
    margin-left: 40%;
  }
  .column.is-offset-three-fifths-mobile {
    margin-left: 60%;
  }
  .column.is-offset-four-fifths-mobile {
    margin-left: 80%;
  }
  .column.is-0-mobile {
    flex: none;
    width: 0%;
  }
  .column.is-offset-0-mobile {
    margin-left: 0%;
  }
  .column.is-1-mobile {
    flex: none;
    width: 8.33333%;
  }
  .column.is-offset-1-mobile {
    margin-left: 8.33333%;
  }
  .column.is-2-mobile {
    flex: none;
    width: 16.66667%;
  }
  .column.is-offset-2-mobile {
    margin-left: 16.66667%;
  }
  .column.is-3-mobile {
    flex: none;
    width: 25%;
  }
  .column.is-offset-3-mobile {
    margin-left: 25%;
  }
  .column.is-4-mobile {
    flex: none;
    width: 33.33333%;
  }
  .column.is-offset-4-mobile {
    margin-left: 33.33333%;
  }
  .column.is-5-mobile {
    flex: none;
    width: 41.66667%;
  }
  .column.is-offset-5-mobile {
    margin-left: 41.66667%;
  }
  .column.is-6-mobile {
    flex: none;
    width: 50%;
  }
  .column.is-offset-6-mobile {
    margin-left: 50%;
  }
  .column.is-7-mobile {
    flex: none;
    width: 58.33333%;
  }
  .column.is-offset-7-mobile {
    margin-left: 58.33333%;
  }
  .column.is-8-mobile {
    flex: none;
    width: 66.66667%;
  }
  .column.is-offset-8-mobile {
    margin-left: 66.66667%;
  }
  .column.is-9-mobile {
    flex: none;
    width: 75%;
  }
  .column.is-offset-9-mobile {
    margin-left: 75%;
  }
  .column.is-10-mobile {
    flex: none;
    width: 83.33333%;
  }
  .column.is-offset-10-mobile {
    margin-left: 83.33333%;
  }
  .column.is-11-mobile {
    flex: none;
    width: 91.66667%;
  }
  .column.is-offset-11-mobile {
    margin-left: 91.66667%;
  }
  .column.is-12-mobile {
    flex: none;
    width: 100%;
  }
  .column.is-offset-12-mobile {
    margin-left: 100%;
  }
}

@media screen and (min-width: 769px), print {
  .column.is-narrow, .column.is-narrow-tablet {
    flex: none;
    width: unset;
  }
  .column.is-full, .column.is-full-tablet {
    flex: none;
    width: 100%;
  }
  .column.is-three-quarters, .column.is-three-quarters-tablet {
    flex: none;
    width: 75%;
  }
  .column.is-two-thirds, .column.is-two-thirds-tablet {
    flex: none;
    width: 66.6666%;
  }
  .column.is-half, .column.is-half-tablet {
    flex: none;
    width: 50%;
  }
  .column.is-one-third, .column.is-one-third-tablet {
    flex: none;
    width: 33.3333%;
  }
  .column.is-one-quarter, .column.is-one-quarter-tablet {
    flex: none;
    width: 25%;
  }
  .column.is-one-fifth, .column.is-one-fifth-tablet {
    flex: none;
    width: 20%;
  }
  .column.is-two-fifths, .column.is-two-fifths-tablet {
    flex: none;
    width: 40%;
  }
  .column.is-three-fifths, .column.is-three-fifths-tablet {
    flex: none;
    width: 60%;
  }
  .column.is-four-fifths, .column.is-four-fifths-tablet {
    flex: none;
    width: 80%;
  }
  .column.is-offset-three-quarters, .column.is-offset-three-quarters-tablet {
    margin-left: 75%;
  }
  .column.is-offset-two-thirds, .column.is-offset-two-thirds-tablet {
    margin-left: 66.6666%;
  }
  .column.is-offset-half, .column.is-offset-half-tablet {
    margin-left: 50%;
  }
  .column.is-offset-one-third, .column.is-offset-one-third-tablet {
    margin-left: 33.3333%;
  }
  .column.is-offset-one-quarter, .column.is-offset-one-quarter-tablet {
    margin-left: 25%;
  }
  .column.is-offset-one-fifth, .column.is-offset-one-fifth-tablet {
    margin-left: 20%;
  }
  .column.is-offset-two-fifths, .column.is-offset-two-fifths-tablet {
    margin-left: 40%;
  }
  .column.is-offset-three-fifths, .column.is-offset-three-fifths-tablet {
    margin-left: 60%;
  }
  .column.is-offset-four-fifths, .column.is-offset-four-fifths-tablet {
    margin-left: 80%;
  }
  .column.is-0, .column.is-0-tablet {
    flex: none;
    width: 0%;
  }
  .column.is-offset-0, .column.is-offset-0-tablet {
    margin-left: 0%;
  }
  .column.is-1, .column.is-1-tablet {
    flex: none;
    width: 8.33333%;
  }
  .column.is-offset-1, .column.is-offset-1-tablet {
    margin-left: 8.33333%;
  }
  .column.is-2, .column.is-2-tablet {
    flex: none;
    width: 16.66667%;
  }
  .column.is-offset-2, .column.is-offset-2-tablet {
    margin-left: 16.66667%;
  }
  .column.is-3, .column.is-3-tablet {
    flex: none;
    width: 25%;
  }
  .column.is-offset-3, .column.is-offset-3-tablet {
    margin-left: 25%;
  }
  .column.is-4, .column.is-4-tablet {
    flex: none;
    width: 33.33333%;
  }
  .column.is-offset-4, .column.is-offset-4-tablet {
    margin-left: 33.33333%;
  }
  .column.is-5, .column.is-5-tablet {
    flex: none;
    width: 41.66667%;
  }
  .column.is-offset-5, .column.is-offset-5-tablet {
    margin-left: 41.66667%;
  }
  .column.is-6, .column.is-6-tablet {
    flex: none;
    width: 50%;
  }
  .column.is-offset-6, .column.is-offset-6-tablet {
    margin-left: 50%;
  }
  .column.is-7, .column.is-7-tablet {
    flex: none;
    width: 58.33333%;
  }
  .column.is-offset-7, .column.is-offset-7-tablet {
    margin-left: 58.33333%;
  }
  .column.is-8, .column.is-8-tablet {
    flex: none;
    width: 66.66667%;
  }
  .column.is-offset-8, .column.is-offset-8-tablet {
    margin-left: 66.66667%;
  }
  .column.is-9, .column.is-9-tablet {
    flex: none;
    width: 75%;
  }
  .column.is-offset-9, .column.is-offset-9-tablet {
    margin-left: 75%;
  }
  .column.is-10, .column.is-10-tablet {
    flex: none;
    width: 83.33333%;
  }
  .column.is-offset-10, .column.is-offset-10-tablet {
    margin-left: 83.33333%;
  }
  .column.is-11, .column.is-11-tablet {
    flex: none;
    width: 91.66667%;
  }
  .column.is-offset-11, .column.is-offset-11-tablet {
    margin-left: 91.66667%;
  }
  .column.is-12, .column.is-12-tablet {
    flex: none;
    width: 100%;
  }
  .column.is-offset-12, .column.is-offset-12-tablet {
    margin-left: 100%;
  }
}

@media screen and (max-width: 1023px) {
  .column.is-narrow-touch {
    flex: none;
    width: unset;
  }
  .column.is-full-touch {
    flex: none;
    width: 100%;
  }
  .column.is-three-quarters-touch {
    flex: none;
    width: 75%;
  }
  .column.is-two-thirds-touch {
    flex: none;
    width: 66.6666%;
  }
  .column.is-half-touch {
    flex: none;
    width: 50%;
  }
  .column.is-one-third-touch {
    flex: none;
    width: 33.3333%;
  }
  .column.is-one-quarter-touch {
    flex: none;
    width: 25%;
  }
  .column.is-one-fifth-touch {
    flex: none;
    width: 20%;
  }
  .column.is-two-fifths-touch {
    flex: none;
    width: 40%;
  }
  .column.is-three-fifths-touch {
    flex: none;
    width: 60%;
  }
  .column.is-four-fifths-touch {
    flex: none;
    width: 80%;
  }
  .column.is-offset-three-quarters-touch {
    margin-left: 75%;
  }
  .column.is-offset-two-thirds-touch {
    margin-left: 66.6666%;
  }
  .column.is-offset-half-touch {
    margin-left: 50%;
  }
  .column.is-offset-one-third-touch {
    margin-left: 33.3333%;
  }
  .column.is-offset-one-quarter-touch {
    margin-left: 25%;
  }
  .column.is-offset-one-fifth-touch {
    margin-left: 20%;
  }
  .column.is-offset-two-fifths-touch {
    margin-left: 40%;
  }
  .column.is-offset-three-fifths-touch {
    margin-left: 60%;
  }
  .column.is-offset-four-fifths-touch {
    margin-left: 80%;
  }
  .column.is-0-touch {
    flex: none;
    width: 0%;
  }
  .column.is-offset-0-touch {
    margin-left: 0%;
  }
  .column.is-1-touch {
    flex: none;
    width: 8.33333%;
  }
  .column.is-offset-1-touch {
    margin-left: 8.33333%;
  }
  .column.is-2-touch {
    flex: none;
    width: 16.66667%;
  }
  .column.is-offset-2-touch {
    margin-left: 16.66667%;
  }
  .column.is-3-touch {
    flex: none;
    width: 25%;
  }
  .column.is-offset-3-touch {
    margin-left: 25%;
  }
  .column.is-4-touch {
    flex: none;
    width: 33.33333%;
  }
  .column.is-offset-4-touch {
    margin-left: 33.33333%;
  }
  .column.is-5-touch {
    flex: none;
    width: 41.66667%;
  }
  .column.is-offset-5-touch {
    margin-left: 41.66667%;
  }
  .column.is-6-touch {
    flex: none;
    width: 50%;
  }
  .column.is-offset-6-touch {
    margin-left: 50%;
  }
  .column.is-7-touch {
    flex: none;
    width: 58.33333%;
  }
  .column.is-offset-7-touch {
    margin-left: 58.33333%;
  }
  .column.is-8-touch {
    flex: none;
    width: 66.66667%;
  }
  .column.is-offset-8-touch {
    margin-left: 66.66667%;
  }
  .column.is-9-touch {
    flex: none;
    width: 75%;
  }
  .column.is-offset-9-touch {
    margin-left: 75%;
  }
  .column.is-10-touch {
    flex: none;
    width: 83.33333%;
  }
  .column.is-offset-10-touch {
    margin-left: 83.33333%;
  }
  .column.is-11-touch {
    flex: none;
    width: 91.66667%;
  }
  .column.is-offset-11-touch {
    margin-left: 91.66667%;
  }
  .column.is-12-touch {
    flex: none;
    width: 100%;
  }
  .column.is-offset-12-touch {
    margin-left: 100%;
  }
}

@media screen and (min-width: 1024px) {
  .column.is-narrow-desktop {
    flex: none;
    width: unset;
  }
  .column.is-full-desktop {
    flex: none;
    width: 100%;
  }
  .column.is-three-quarters-desktop {
    flex: none;
    width: 75%;
  }
  .column.is-two-thirds-desktop {
    flex: none;
    width: 66.6666%;
  }
  .column.is-half-desktop {
    flex: none;
    width: 50%;
  }
  .column.is-one-third-desktop {
    flex: none;
    width: 33.3333%;
  }
  .column.is-one-quarter-desktop {
    flex: none;
    width: 25%;
  }
  .column.is-one-fifth-desktop {
    flex: none;
    width: 20%;
  }
  .column.is-two-fifths-desktop {
    flex: none;
    width: 40%;
  }
  .column.is-three-fifths-desktop {
    flex: none;
    width: 60%;
  }
  .column.is-four-fifths-desktop {
    flex: none;
    width: 80%;
  }
  .column.is-offset-three-quarters-desktop {
    margin-left: 75%;
  }
  .column.is-offset-two-thirds-desktop {
    margin-left: 66.6666%;
  }
  .column.is-offset-half-desktop {
    margin-left: 50%;
  }
  .column.is-offset-one-third-desktop {
    margin-left: 33.3333%;
  }
  .column.is-offset-one-quarter-desktop {
    margin-left: 25%;
  }
  .column.is-offset-one-fifth-desktop {
    margin-left: 20%;
  }
  .column.is-offset-two-fifths-desktop {
    margin-left: 40%;
  }
  .column.is-offset-three-fifths-desktop {
    margin-left: 60%;
  }
  .column.is-offset-four-fifths-desktop {
    margin-left: 80%;
  }
  .column.is-0-desktop {
    flex: none;
    width: 0%;
  }
  .column.is-offset-0-desktop {
    margin-left: 0%;
  }
  .column.is-1-desktop {
    flex: none;
    width: 8.33333%;
  }
  .column.is-offset-1-desktop {
    margin-left: 8.33333%;
  }
  .column.is-2-desktop {
    flex: none;
    width: 16.66667%;
  }
  .column.is-offset-2-desktop {
    margin-left: 16.66667%;
  }
  .column.is-3-desktop {
    flex: none;
    width: 25%;
  }
  .column.is-offset-3-desktop {
    margin-left: 25%;
  }
  .column.is-4-desktop {
    flex: none;
    width: 33.33333%;
  }
  .column.is-offset-4-desktop {
    margin-left: 33.33333%;
  }
  .column.is-5-desktop {
    flex: none;
    width: 41.66667%;
  }
  .column.is-offset-5-desktop {
    margin-left: 41.66667%;
  }
  .column.is-6-desktop {
    flex: none;
    width: 50%;
  }
  .column.is-offset-6-desktop {
    margin-left: 50%;
  }
  .column.is-7-desktop {
    flex: none;
    width: 58.33333%;
  }
  .column.is-offset-7-desktop {
    margin-left: 58.33333%;
  }
  .column.is-8-desktop {
    flex: none;
    width: 66.66667%;
  }
  .column.is-offset-8-desktop {
    margin-left: 66.66667%;
  }
  .column.is-9-desktop {
    flex: none;
    width: 75%;
  }
  .column.is-offset-9-desktop {
    margin-left: 75%;
  }
  .column.is-10-desktop {
    flex: none;
    width: 83.33333%;
  }
  .column.is-offset-10-desktop {
    margin-left: 83.33333%;
  }
  .column.is-11-desktop {
    flex: none;
    width: 91.66667%;
  }
  .column.is-offset-11-desktop {
    margin-left: 91.66667%;
  }
  .column.is-12-desktop {
    flex: none;
    width: 100%;
  }
  .column.is-offset-12-desktop {
    margin-left: 100%;
  }
}

@media screen and (min-width: 1216px) {
  .column.is-narrow-widescreen {
    flex: none;
    width: unset;
  }
  .column.is-full-widescreen {
    flex: none;
    width: 100%;
  }
  .column.is-three-quarters-widescreen {
    flex: none;
    width: 75%;
  }
  .column.is-two-thirds-widescreen {
    flex: none;
    width: 66.6666%;
  }
  .column.is-half-widescreen {
    flex: none;
    width: 50%;
  }
  .column.is-one-third-widescreen {
    flex: none;
    width: 33.3333%;
  }
  .column.is-one-quarter-widescreen {
    flex: none;
    width: 25%;
  }
  .column.is-one-fifth-widescreen {
    flex: none;
    width: 20%;
  }
  .column.is-two-fifths-widescreen {
    flex: none;
    width: 40%;
  }
  .column.is-three-fifths-widescreen {
    flex: none;
    width: 60%;
  }
  .column.is-four-fifths-widescreen {
    flex: none;
    width: 80%;
  }
  .column.is-offset-three-quarters-widescreen {
    margin-left: 75%;
  }
  .column.is-offset-two-thirds-widescreen {
    margin-left: 66.6666%;
  }
  .column.is-offset-half-widescreen {
    margin-left: 50%;
  }
  .column.is-offset-one-third-widescreen {
    margin-left: 33.3333%;
  }
  .column.is-offset-one-quarter-widescreen {
    margin-left: 25%;
  }
  .column.is-offset-one-fifth-widescreen {
    margin-left: 20%;
  }
  .column.is-offset-two-fifths-widescreen {
    margin-left: 40%;
  }
  .column.is-offset-three-fifths-widescreen {
    margin-left: 60%;
  }
  .column.is-offset-four-fifths-widescreen {
    margin-left: 80%;
  }
  .column.is-0-widescreen {
    flex: none;
    width: 0%;
  }
  .column.is-offset-0-widescreen {
    margin-left: 0%;
  }
  .column.is-1-widescreen {
    flex: none;
    width: 8.33333%;
  }
  .column.is-offset-1-widescreen {
    margin-left: 8.33333%;
  }
  .column.is-2-widescreen {
    flex: none;
    width: 16.66667%;
  }
  .column.is-offset-2-widescreen {
    margin-left: 16.66667%;
  }
  .column.is-3-widescreen {
    flex: none;
    width: 25%;
  }
  .column.is-offset-3-widescreen {
    margin-left: 25%;
  }
  .column.is-4-widescreen {
    flex: none;
    width: 33.33333%;
  }
  .column.is-offset-4-widescreen {
    margin-left: 33.33333%;
  }
  .column.is-5-widescreen {
    flex: none;
    width: 41.66667%;
  }
  .column.is-offset-5-widescreen {
    margin-left: 41.66667%;
  }
  .column.is-6-widescreen {
    flex: none;
    width: 50%;
  }
  .column.is-offset-6-widescreen {
    margin-left: 50%;
  }
  .column.is-7-widescreen {
    flex: none;
    width: 58.33333%;
  }
  .column.is-offset-7-widescreen {
    margin-left: 58.33333%;
  }
  .column.is-8-widescreen {
    flex: none;
    width: 66.66667%;
  }
  .column.is-offset-8-widescreen {
    margin-left: 66.66667%;
  }
  .column.is-9-widescreen {
    flex: none;
    width: 75%;
  }
  .column.is-offset-9-widescreen {
    margin-left: 75%;
  }
  .column.is-10-widescreen {
    flex: none;
    width: 83.33333%;
  }
  .column.is-offset-10-widescreen {
    margin-left: 83.33333%;
  }
  .column.is-11-widescreen {
    flex: none;
    width: 91.66667%;
  }
  .column.is-offset-11-widescreen {
    margin-left: 91.66667%;
  }
  .column.is-12-widescreen {
    flex: none;
    width: 100%;
  }
  .column.is-offset-12-widescreen {
    margin-left: 100%;
  }
}

@media screen and (min-width: 1408px) {
  .column.is-narrow-fullhd {
    flex: none;
    width: unset;
  }
  .column.is-full-fullhd {
    flex: none;
    width: 100%;
  }
  .column.is-three-quarters-fullhd {
    flex: none;
    width: 75%;
  }
  .column.is-two-thirds-fullhd {
    flex: none;
    width: 66.6666%;
  }
  .column.is-half-fullhd {
    flex: none;
    width: 50%;
  }
  .column.is-one-third-fullhd {
    flex: none;
    width: 33.3333%;
  }
  .column.is-one-quarter-fullhd {
    flex: none;
    width: 25%;
  }
  .column.is-one-fifth-fullhd {
    flex: none;
    width: 20%;
  }
  .column.is-two-fifths-fullhd {
    flex: none;
    width: 40%;
  }
  .column.is-three-fifths-fullhd {
    flex: none;
    width: 60%;
  }
  .column.is-four-fifths-fullhd {
    flex: none;
    width: 80%;
  }
  .column.is-offset-three-quarters-fullhd {
    margin-left: 75%;
  }
  .column.is-offset-two-thirds-fullhd {
    margin-left: 66.6666%;
  }
  .column.is-offset-half-fullhd {
    margin-left: 50%;
  }
  .column.is-offset-one-third-fullhd {
    margin-left: 33.3333%;
  }
  .column.is-offset-one-quarter-fullhd {
    margin-left: 25%;
  }
  .column.is-offset-one-fifth-fullhd {
    margin-left: 20%;
  }
  .column.is-offset-two-fifths-fullhd {
    margin-left: 40%;
  }
  .column.is-offset-three-fifths-fullhd {
    margin-left: 60%;
  }
  .column.is-offset-four-fifths-fullhd {
    margin-left: 80%;
  }
  .column.is-0-fullhd {
    flex: none;
    width: 0%;
  }
  .column.is-offset-0-fullhd {
    margin-left: 0%;
  }
  .column.is-1-fullhd {
    flex: none;
    width: 8.33333%;
  }
  .column.is-offset-1-fullhd {
    margin-left: 8.33333%;
  }
  .column.is-2-fullhd {
    flex: none;
    width: 16.66667%;
  }
  .column.is-offset-2-fullhd {
    margin-left: 16.66667%;
  }
  .column.is-3-fullhd {
    flex: none;
    width: 25%;
  }
  .column.is-offset-3-fullhd {
    margin-left: 25%;
  }
  .column.is-4-fullhd {
    flex: none;
    width: 33.33333%;
  }
  .column.is-offset-4-fullhd {
    margin-left: 33.33333%;
  }
  .column.is-5-fullhd {
    flex: none;
    width: 41.66667%;
  }
  .column.is-offset-5-fullhd {
    margin-left: 41.66667%;
  }
  .column.is-6-fullhd {
    flex: none;
    width: 50%;
  }
  .column.is-offset-6-fullhd {
    margin-left: 50%;
  }
  .column.is-7-fullhd {
    flex: none;
    width: 58.33333%;
  }
  .column.is-offset-7-fullhd {
    margin-left: 58.33333%;
  }
  .column.is-8-fullhd {
    flex: none;
    width: 66.66667%;
  }
  .column.is-offset-8-fullhd {
    margin-left: 66.66667%;
  }
  .column.is-9-fullhd {
    flex: none;
    width: 75%;
  }
  .column.is-offset-9-fullhd {
    margin-left: 75%;
  }
  .column.is-10-fullhd {
    flex: none;
    width: 83.33333%;
  }
  .column.is-offset-10-fullhd {
    margin-left: 83.33333%;
  }
  .column.is-11-fullhd {
    flex: none;
    width: 91.66667%;
  }
  .column.is-offset-11-fullhd {
    margin-left: 91.66667%;
  }
  .column.is-12-fullhd {
    flex: none;
    width: 100%;
  }
  .column.is-offset-12-fullhd {
    margin-left: 100%;
  }
}

.columns {
  margin-left: -0.75rem;
  margin-right: -0.75rem;
  margin-top: -0.75rem;
}

.columns:last-child {
  margin-bottom: -0.75rem;
}

.columns:not(:last-child) {
  margin-bottom: calc(1.5rem - 0.75rem);
}

.columns.is-centered {
  justify-content: center;
}

.columns.is-gapless {
  margin-left: 0;
  margin-right: 0;
  margin-top: 0;
}

.columns.is-gapless > .column {
  margin: 0;
  padding: 0 !important;
}

.columns.is-gapless:not(:last-child) {
  margin-bottom: 1.5rem;
}

.columns.is-gapless:last-child {
  margin-bottom: 0;
}

.columns.is-mobile {
  display: flex;
}

.columns.is-multiline {
  flex-wrap: wrap;
}

.columns.is-vcentered {
  align-items: center;
}

@media screen and (min-width: 769px), print {
  .columns:not(.is-desktop) {
    display: flex;
  }
}

@media screen and (min-width: 1024px) {
  .columns.is-desktop {
    display: flex;
  }
}

.columns.is-variable {
  --columnGap: 0.75rem;
  margin-left: calc(-1 * var(--columnGap));
  margin-right: calc(-1 * var(--columnGap));
}

.columns.is-variable > .column {
  padding-left: var(--columnGap);
  padding-right: var(--columnGap);
}

.columns.is-variable.is-0 {
  --columnGap: 0rem;
}

@media screen and (max-width: 768px) {
  .columns.is-variable.is-0-mobile {
    --columnGap: 0rem;
  }
}

@media screen and (min-width: 769px), print {
  .columns.is-variable.is-0-tablet {
    --columnGap: 0rem;
  }
}

@media screen and (min-width: 769px) and (max-width: 1023px) {
  .columns.is-variable.is-0-tablet-only {
    --columnGap: 0rem;
  }
}

@media screen and (max-width: 1023px) {
  .columns.is-variable.is-0-touch {
    --columnGap: 0rem;
  }
}

@media screen and (min-width: 1024px) {
  .columns.is-variable.is-0-desktop {
    --columnGap: 0rem;
  }
}

@media screen and (min-width: 1024px) and (max-width: 1215px) {
  .columns.is-variable.is-0-desktop-only {
    --columnGap: 0rem;
  }
}

@media screen and (min-width: 1216px) {
  .columns.is-variable.is-0-widescreen {
    --columnGap: 0rem;
  }
}

@media screen and (min-width: 1216px) and (max-width: 1407px) {
  .columns.is-variable.is-0-widescreen-only {
    --columnGap: 0rem;
  }
}

@media screen and (min-width: 1408px) {
  .columns.is-variable.is-0-fullhd {
    --columnGap: 0rem;
  }
}

.columns.is-variable.is-1 {
  --columnGap: 0.25rem;
}

@media screen and (max-width: 768px) {
  .columns.is-variable.is-1-mobile {
    --columnGap: 0.25rem;
  }
}

@media screen and (min-width: 769px), print {
  .columns.is-variable.is-1-tablet {
    --columnGap: 0.25rem;
  }
}

@media screen and (min-width: 769px) and (max-width: 1023px) {
  .columns.is-variable.is-1-tablet-only {
    --columnGap: 0.25rem;
  }
}

@media screen and (max-width: 1023px) {
  .columns.is-variable.is-1-touch {
    --columnGap: 0.25rem;
  }
}

@media screen and (min-width: 1024px) {
  .columns.is-variable.is-1-desktop {
    --columnGap: 0.25rem;
  }
}

@media screen and (min-width: 1024px) and (max-width: 1215px) {
  .columns.is-variable.is-1-desktop-only {
    --columnGap: 0.25rem;
  }
}

@media screen and (min-width: 1216px) {
  .columns.is-variable.is-1-widescreen {
    --columnGap: 0.25rem;
  }
}

@media screen and (min-width: 1216px) and (max-width: 1407px) {
  .columns.is-variable.is-1-widescreen-only {
    --columnGap: 0.25rem;
  }
}

@media screen and (min-width: 1408px) {
  .columns.is-variable.is-1-fullhd {
    --columnGap: 0.25rem;
  }
}

.columns.is-variable.is-2 {
  --columnGap: 0.5rem;
}

@media screen and (max-width: 768px) {
  .columns.is-variable.is-2-mobile {
    --columnGap: 0.5rem;
  }
}

@media screen and (min-width: 769px), print {
  .columns.is-variable.is-2-tablet {
    --columnGap: 0.5rem;
  }
}

@media screen and (min-width: 769px) and (max-width: 1023px) {
  .columns.is-variable.is-2-tablet-only {
    --columnGap: 0.5rem;
  }
}

@media screen and (max-width: 1023px) {
  .columns.is-variable.is-2-touch {
    --columnGap: 0.5rem;
  }
}

@media screen and (min-width: 1024px) {
  .columns.is-variable.is-2-desktop {
    --columnGap: 0.5rem;
  }
}

@media screen and (min-width: 1024px) and (max-width: 1215px) {
  .columns.is-variable.is-2-desktop-only {
    --columnGap: 0.5rem;
  }
}

@media screen and (min-width: 1216px) {
  .columns.is-variable.is-2-widescreen {
    --columnGap: 0.5rem;
  }
}

@media screen and (min-width: 1216px) and (max-width: 1407px) {
  .columns.is-variable.is-2-widescreen-only {
    --columnGap: 0.5rem;
  }
}

@media screen and (min-width: 1408px) {
  .columns.is-variable.is-2-fullhd {
    --columnGap: 0.5rem;
  }
}

.columns.is-variable.is-3 {
  --columnGap: 0.75rem;
}

@media screen and (max-width: 768px) {
  .columns.is-variable.is-3-mobile {
    --columnGap: 0.75rem;
  }
}

@media screen and (min-width: 769px), print {
  .columns.is-variable.is-3-tablet {
    --columnGap: 0.75rem;
  }
}

@media screen and (min-width: 769px) and (max-width: 1023px) {
  .columns.is-variable.is-3-tablet-only {
    --columnGap: 0.75rem;
  }
}

@media screen and (max-width: 1023px) {
  .columns.is-variable.is-3-touch {
    --columnGap: 0.75rem;
  }
}

@media screen and (min-width: 1024px) {
  .columns.is-variable.is-3-desktop {
    --columnGap: 0.75rem;
  }
}

@media screen and (min-width: 1024px) and (max-width: 1215px) {
  .columns.is-variable.is-3-desktop-only {
    --columnGap: 0.75rem;
  }
}

@media screen and (min-width: 1216px) {
  .columns.is-variable.is-3-widescreen {
    --columnGap: 0.75rem;
  }
}

@media screen and (min-width: 1216px) and (max-width: 1407px) {
  .columns.is-variable.is-3-widescreen-only {
    --columnGap: 0.75rem;
  }
}

@media screen and (min-width: 1408px) {
  .columns.is-variable.is-3-fullhd {
    --columnGap: 0.75rem;
  }
}

.columns.is-variable.is-4 {
  --columnGap: 1rem;
}

@media screen and (max-width: 768px) {
  .columns.is-variable.is-4-mobile {
    --columnGap: 1rem;
  }
}

@media screen and (min-width: 769px), print {
  .columns.is-variable.is-4-tablet {
    --columnGap: 1rem;
  }
}

@media screen and (min-width: 769px) and (max-width: 1023px) {
  .columns.is-variable.is-4-tablet-only {
    --columnGap: 1rem;
  }
}

@media screen and (max-width: 1023px) {
  .columns.is-variable.is-4-touch {
    --columnGap: 1rem;
  }
}

@media screen and (min-width: 1024px) {
  .columns.is-variable.is-4-desktop {
    --columnGap: 1rem;
  }
}

@media screen and (min-width: 1024px) and (max-width: 1215px) {
  .columns.is-variable.is-4-desktop-only {
    --columnGap: 1rem;
  }
}

@media screen and (min-width: 1216px) {
  .columns.is-variable.is-4-widescreen {
    --columnGap: 1rem;
  }
}

@media screen and (min-width: 1216px) and (max-width: 1407px) {
  .columns.is-variable.is-4-widescreen-only {
    --columnGap: 1rem;
  }
}

@media screen and (min-width: 1408px) {
  .columns.is-variable.is-4-fullhd {
    --columnGap: 1rem;
  }
}

.columns.is-variable.is-5 {
  --columnGap: 1.25rem;
}

@media screen and (max-width: 768px) {
  .columns.is-variable.is-5-mobile {
    --columnGap: 1.25rem;
  }
}

@media screen and (min-width: 769px), print {
  .columns.is-variable.is-5-tablet {
    --columnGap: 1.25rem;
  }
}

@media screen and (min-width: 769px) and (max-width: 1023px) {
  .columns.is-variable.is-5-tablet-only {
    --columnGap: 1.25rem;
  }
}

@media screen and (max-width: 1023px) {
  .columns.is-variable.is-5-touch {
    --columnGap: 1.25rem;
  }
}

@media screen and (min-width: 1024px) {
  .columns.is-variable.is-5-desktop {
    --columnGap: 1.25rem;
  }
}

@media screen and (min-width: 1024px) and (max-width: 1215px) {
  .columns.is-variable.is-5-desktop-only {
    --columnGap: 1.25rem;
  }
}

@media screen and (min-width: 1216px) {
  .columns.is-variable.is-5-widescreen {
    --columnGap: 1.25rem;
  }
}

@media screen and (min-width: 1216px) and (max-width: 1407px) {
  .columns.is-variable.is-5-widescreen-only {
    --columnGap: 1.25rem;
  }
}

@media screen and (min-width: 1408px) {
  .columns.is-variable.is-5-fullhd {
    --columnGap: 1.25rem;
  }
}

.columns.is-variable.is-6 {
  --columnGap: 1.5rem;
}

@media screen and (max-width: 768px) {
  .columns.is-variable.is-6-mobile {
    --columnGap: 1.5rem;
  }
}

@media screen and (min-width: 769px), print {
  .columns.is-variable.is-6-tablet {
    --columnGap: 1.5rem;
  }
}

@media screen and (min-width: 769px) and (max-width: 1023px) {
  .columns.is-variable.is-6-tablet-only {
    --columnGap: 1.5rem;
  }
}

@media screen and (max-width: 1023px) {
  .columns.is-variable.is-6-touch {
    --columnGap: 1.5rem;
  }
}

@media screen and (min-width: 1024px) {
  .columns.is-variable.is-6-desktop {
    --columnGap: 1.5rem;
  }
}

@media screen and (min-width: 1024px) and (max-width: 1215px) {
  .columns.is-variable.is-6-desktop-only {
    --columnGap: 1.5rem;
  }
}

@media screen and (min-width: 1216px) {
  .columns.is-variable.is-6-widescreen {
    --columnGap: 1.5rem;
  }
}

@media screen and (min-width: 1216px) and (max-width: 1407px) {
  .columns.is-variable.is-6-widescreen-only {
    --columnGap: 1.5rem;
  }
}

@media screen and (min-width: 1408px) {
  .columns.is-variable.is-6-fullhd {
    --columnGap: 1.5rem;
  }
}

.columns.is-variable.is-7 {
  --columnGap: 1.75rem;
}

@media screen and (max-width: 768px) {
  .columns.is-variable.is-7-mobile {
    --columnGap: 1.75rem;
  }
}

@media screen and (min-width: 769px), print {
  .columns.is-variable.is-7-tablet {
    --columnGap: 1.75rem;
  }
}

@media screen and (min-width: 769px) and (max-width: 1023px) {
  .columns.is-variable.is-7-tablet-only {
    --columnGap: 1.75rem;
  }
}

@media screen and (max-width: 1023px) {
  .columns.is-variable.is-7-touch {
    --columnGap: 1.75rem;
  }
}

@media screen and (min-width: 1024px) {
  .columns.is-variable.is-7-desktop {
    --columnGap: 1.75rem;
  }
}

@media screen and (min-width: 1024px) and (max-width: 1215px) {
  .columns.is-variable.is-7-desktop-only {
    --columnGap: 1.75rem;
  }
}

@media screen and (min-width: 1216px) {
  .columns.is-variable.is-7-widescreen {
    --columnGap: 1.75rem;
  }
}

@media screen and (min-width: 1216px) and (max-width: 1407px) {
  .columns.is-variable.is-7-widescreen-only {
    --columnGap: 1.75rem;
  }
}

@media screen and (min-width: 1408px) {
  .columns.is-variable.is-7-fullhd {
    --columnGap: 1.75rem;
  }
}

.columns.is-variable.is-8 {
  --columnGap: 2rem;
}

@media screen and (max-width: 768px) {
  .columns.is-variable.is-8-mobile {
    --columnGap: 2rem;
  }
}

@media screen and (min-width: 769px), print {
  .columns.is-variable.is-8-tablet {
    --columnGap: 2rem;
  }
}

@media screen and (min-width: 769px) and (max-width: 1023px) {
  .columns.is-variable.is-8-tablet-only {
    --columnGap: 2rem;
  }
}

@media screen and (max-width: 1023px) {
  .columns.is-variable.is-8-touch {
    --columnGap: 2rem;
  }
}

@media screen and (min-width: 1024px) {
  .columns.is-variable.is-8-desktop {
    --columnGap: 2rem;
  }
}

@media screen and (min-width: 1024px) and (max-width: 1215px) {
  .columns.is-variable.is-8-desktop-only {
    --columnGap: 2rem;
  }
}

@media screen and (min-width: 1216px) {
  .columns.is-variable.is-8-widescreen {
    --columnGap: 2rem;
  }
}

@media screen and (min-width: 1216px) and (max-width: 1407px) {
  .columns.is-variable.is-8-widescreen-only {
    --columnGap: 2rem;
  }
}

@media screen and (min-width: 1408px) {
  .columns.is-variable.is-8-fullhd {
    --columnGap: 2rem;
  }
}

.tile {
  align-items: stretch;
  display: block;
  flex-basis: 0;
  flex-grow: 1;
  flex-shrink: 1;
  min-height: -webkit-min-content;
  min-height: -moz-min-content;
  min-height: min-content;
}

.tile.is-ancestor {
  margin-left: -0.75rem;
  margin-right: -0.75rem;
  margin-top: -0.75rem;
}

.tile.is-ancestor:last-child {
  margin-bottom: -0.75rem;
}

.tile.is-ancestor:not(:last-child) {
  margin-bottom: 0.75rem;
}

.tile.is-child {
  margin: 0 !important;
}

.tile.is-parent {
  padding: 0.75rem;
}

.tile.is-vertical {
  flex-direction: column;
}

.tile.is-vertical > .tile.is-child:not(:last-child) {
  margin-bottom: 1.5rem !important;
}

@media screen and (min-width: 769px), print {
  .tile:not(.is-child) {
    display: flex;
  }
  .tile.is-1 {
    flex: none;
    width: 8.33333%;
  }
  .tile.is-2 {
    flex: none;
    width: 16.66667%;
  }
  .tile.is-3 {
    flex: none;
    width: 25%;
  }
  .tile.is-4 {
    flex: none;
    width: 33.33333%;
  }
  .tile.is-5 {
    flex: none;
    width: 41.66667%;
  }
  .tile.is-6 {
    flex: none;
    width: 50%;
  }
  .tile.is-7 {
    flex: none;
    width: 58.33333%;
  }
  .tile.is-8 {
    flex: none;
    width: 66.66667%;
  }
  .tile.is-9 {
    flex: none;
    width: 75%;
  }
  .tile.is-10 {
    flex: none;
    width: 83.33333%;
  }
  .tile.is-11 {
    flex: none;
    width: 91.66667%;
  }
  .tile.is-12 {
    flex: none;
    width: 100%;
  }
}

/* Bulma Helpers */
.has-text-white {
  color: white !important;
}

a.has-text-white:hover, a.has-text-white:focus {
  color: #e6e6e6 !important;
}

.has-background-white {
  background-color: white !important;
}

.has-text-black {
  color: #0a0a0a !important;
}

a.has-text-black:hover, a.has-text-black:focus {
  color: black !important;
}

.has-background-black {
  background-color: #0a0a0a !important;
}

.has-text-light {
  color: whitesmoke !important;
}

a.has-text-light:hover, a.has-text-light:focus {
  color: #dbdbdb !important;
}

.has-background-light {
  background-color: whitesmoke !important;
}

.has-text-dark {
  color: #363636 !important;
}

a.has-text-dark:hover, a.has-text-dark:focus {
  color: #1c1c1c !important;
}

.has-background-dark {
  background-color: #363636 !important;
}

.has-text-primary {
  color: #00d1b2 !important;
}

a.has-text-primary:hover, a.has-text-primary:focus {
  color: #009e86 !important;
}

.has-background-primary {
  background-color: #00d1b2 !important;
}

.has-text-primary-light {
  color: #ebfffc !important;
}

a.has-text-primary-light:hover, a.has-text-primary-light:focus {
  color: #b8fff4 !important;
}

.has-background-primary-light {
  background-color: #ebfffc !important;
}

.has-text-primary-dark {
  color: #00947e !important;
}

a.has-text-primary-dark:hover, a.has-text-primary-dark:focus {
  color: #00c7a9 !important;
}

.has-background-primary-dark {
  background-color: #00947e !important;
}

.has-text-link {
  color: #3273dc !important;
}

a.has-text-link:hover, a.has-text-link:focus {
  color: #205bbc !important;
}

.has-background-link {
  background-color: #3273dc !important;
}

.has-text-link-light {
  color: #eef3fc !important;
}

a.has-text-link-light:hover, a.has-text-link-light:focus {
  color: #c2d5f5 !important;
}

.has-background-link-light {
  background-color: #eef3fc !important;
}

.has-text-link-dark {
  color: #2160c4 !important;
}

a.has-text-link-dark:hover, a.has-text-link-dark:focus {
  color: #3b79de !important;
}

.has-background-link-dark {
  background-color: #2160c4 !important;
}

.has-text-info {
  color: #3298dc !important;
}

a.has-text-info:hover, a.has-text-info:focus {
  color: #207dbc !important;
}

.has-background-info {
  background-color: #3298dc !important;
}

.has-text-info-light {
  color: #eef6fc !important;
}

a.has-text-info-light:hover, a.has-text-info-light:focus {
  color: #c2e0f5 !important;
}

.has-background-info-light {
  background-color: #eef6fc !important;
}

.has-text-info-dark {
  color: #1d72aa !important;
}

a.has-text-info-dark:hover, a.has-text-info-dark:focus {
  color: #248fd6 !important;
}

.has-background-info-dark {
  background-color: #1d72aa !important;
}

.has-text-success {
  color: #48c774 !important;
}

a.has-text-success:hover, a.has-text-success:focus {
  color: #34a85c !important;
}

.has-background-success {
  background-color: #48c774 !important;
}

.has-text-success-light {
  color: #effaf3 !important;
}

a.has-text-success-light:hover, a.has-text-success-light:focus {
  color: #c8eed6 !important;
}

.has-background-success-light {
  background-color: #effaf3 !important;
}

.has-text-success-dark {
  color: #257942 !important;
}

a.has-text-success-dark:hover, a.has-text-success-dark:focus {
  color: #31a058 !important;
}

.has-background-success-dark {
  background-color: #257942 !important;
}

.has-text-warning {
  color: #ffdd57 !important;
}

a.has-text-warning:hover, a.has-text-warning:focus {
  color: #ffd324 !important;
}

.has-background-warning {
  background-color: #ffdd57 !important;
}

.has-text-warning-light {
  color: #fffbeb !important;
}

a.has-text-warning-light:hover, a.has-text-warning-light:focus {
  color: #fff1b8 !important;
}

.has-background-warning-light {
  background-color: #fffbeb !important;
}

.has-text-warning-dark {
  color: #947600 !important;
}

a.has-text-warning-dark:hover, a.has-text-warning-dark:focus {
  color: #c79f00 !important;
}

.has-background-warning-dark {
  background-color: #947600 !important;
}

.has-text-danger {
  color: #f14668 !important;
}

a.has-text-danger:hover, a.has-text-danger:focus {
  color: #ee1742 !important;
}

.has-background-danger {
  background-color: #f14668 !important;
}

.has-text-danger-light {
  color: #feecf0 !important;
}

a.has-text-danger-light:hover, a.has-text-danger-light:focus {
  color: #fabdc9 !important;
}

.has-background-danger-light {
  background-color: #feecf0 !important;
}

.has-text-danger-dark {
  color: #cc0f35 !important;
}

a.has-text-danger-dark:hover, a.has-text-danger-dark:focus {
  color: #ee2049 !important;
}

.has-background-danger-dark {
  background-color: #cc0f35 !important;
}

.has-text-black-bis {
  color: #121212 !important;
}

.has-background-black-bis {
  background-color: #121212 !important;
}

.has-text-black-ter {
  color: #242424 !important;
}

.has-background-black-ter {
  background-color: #242424 !important;
}

.has-text-grey-darker {
  color: #363636 !important;
}

.has-background-grey-darker {
  background-color: #363636 !important;
}

.has-text-grey-dark {
  color: #4a4a4a !important;
}

.has-background-grey-dark {
  background-color: #4a4a4a !important;
}

.has-text-grey {
  color: #7a7a7a !important;
}

.has-background-grey {
  background-color: #7a7a7a !important;
}

.has-text-grey-light {
  color: #b5b5b5 !important;
}

.has-background-grey-light {
  background-color: #b5b5b5 !important;
}

.has-text-grey-lighter {
  color: #dbdbdb !important;
}

.has-background-grey-lighter {
  background-color: #dbdbdb !important;
}

.has-text-white-ter {
  color: whitesmoke !important;
}

.has-background-white-ter {
  background-color: whitesmoke !important;
}

.has-text-white-bis {
  color: #fafafa !important;
}

.has-background-white-bis {
  background-color: #fafafa !important;
}

.is-flex-direction-row {
  flex-direction: row !important;
}

.is-flex-direction-row-reverse {
  flex-direction: row-reverse !important;
}

.is-flex-direction-column {
  flex-direction: column !important;
}

.is-flex-direction-column-reverse {
  flex-direction: column-reverse !important;
}

.is-flex-wrap-nowrap {
  flex-wrap: nowrap !important;
}

.is-flex-wrap-wrap {
  flex-wrap: wrap !important;
}

.is-flex-wrap-wrap-reverse {
  flex-wrap: wrap-reverse !important;
}

.is-justify-content-flex-start {
  justify-content: flex-start !important;
}

.is-justify-content-flex-end {
  justify-content: flex-end !important;
}

.is-justify-content-center {
  justify-content: center !important;
}

.is-justify-content-space-between {
  justify-content: space-between !important;
}

.is-justify-content-space-around {
  justify-content: space-around !important;
}

.is-justify-content-space-evenly {
  justify-content: space-evenly !important;
}

.is-justify-content-start {
  justify-content: start !important;
}

.is-justify-content-end {
  justify-content: end !important;
}

.is-justify-content-left {
  justify-content: left !important;
}

.is-justify-content-right {
  justify-content: right !important;
}

.is-align-content-flex-start {
  align-content: flex-start !important;
}

.is-align-content-flex-end {
  align-content: flex-end !important;
}

.is-align-content-center {
  align-content: center !important;
}

.is-align-content-space-between {
  align-content: space-between !important;
}

.is-align-content-space-around {
  align-content: space-around !important;
}

.is-align-content-space-evenly {
  align-content: space-evenly !important;
}

.is-align-content-stretch {
  align-content: stretch !important;
}

.is-align-content-start {
  align-content: start !important;
}

.is-align-content-end {
  align-content: end !important;
}

.is-align-content-baseline {
  align-content: baseline !important;
}

.is-align-items-stretch {
  align-items: stretch !important;
}

.is-align-items-flex-start {
  align-items: flex-start !important;
}

.is-align-items-flex-end {
  align-items: flex-end !important;
}

.is-align-items-center {
  align-items: center !important;
}

.is-align-items-baseline {
  align-items: baseline !important;
}

.is-align-items-start {
  align-items: start !important;
}

.is-align-items-end {
  align-items: end !important;
}

.is-align-items-self-start {
  align-items: self-start !important;
}

.is-align-items-self-end {
  align-items: self-end !important;
}

.is-align-self-auto {
  align-self: auto !important;
}

.is-align-self-flex-start {
  align-self: flex-start !important;
}

.is-align-self-flex-end {
  align-self: flex-end !important;
}

.is-align-self-center {
  align-self: center !important;
}

.is-align-self-baseline {
  align-self: baseline !important;
}

.is-align-self-stretch {
  align-self: stretch !important;
}

.is-flex-grow-0 {
  flex-grow: 0 !important;
}

.is-flex-grow-1 {
  flex-grow: 1 !important;
}

.is-flex-grow-2 {
  flex-grow: 2 !important;
}

.is-flex-grow-3 {
  flex-grow: 3 !important;
}

.is-flex-grow-4 {
  flex-grow: 4 !important;
}

.is-flex-grow-5 {
  flex-grow: 5 !important;
}

.is-flex-shrink-0 {
  flex-shrink: 0 !important;
}

.is-flex-shrink-1 {
  flex-shrink: 1 !important;
}

.is-flex-shrink-2 {
  flex-shrink: 2 !important;
}

.is-flex-shrink-3 {
  flex-shrink: 3 !important;
}

.is-flex-shrink-4 {
  flex-shrink: 4 !important;
}

.is-flex-shrink-5 {
  flex-shrink: 5 !important;
}

.is-clearfix::after {
  clear: both;
  content: " ";
  display: table;
}

.is-pulled-left {
  float: left !important;
}

.is-pulled-right {
  float: right !important;
}

.is-radiusless {
  border-radius: 0 !important;
}

.is-shadowless {
  box-shadow: none !important;
}

.is-clickable {
  cursor: pointer !important;
  pointer-events: all !important;
}

.is-clipped {
  overflow: hidden !important;
}

.is-relative {
  position: relative !important;
}

.is-marginless {
  margin: 0 !important;
}

.is-paddingless {
  padding: 0 !important;
}

.m-0 {
  margin: 0 !important;
}

.mt-0 {
  margin-top: 0 !important;
}

.mr-0 {
  margin-right: 0 !important;
}

.mb-0 {
  margin-bottom: 0 !important;
}

.ml-0 {
  margin-left: 0 !important;
}

.mx-0 {
  margin-left: 0 !important;
  margin-right: 0 !important;
}

.my-0 {
  margin-top: 0 !important;
  margin-bottom: 0 !important;
}

.m-1 {
  margin: 0.25rem !important;
}

.mt-1 {
  margin-top: 0.25rem !important;
}

.mr-1 {
  margin-right: 0.25rem !important;
}

.mb-1 {
  margin-bottom: 0.25rem !important;
}

.ml-1 {
  margin-left: 0.25rem !important;
}

.mx-1 {
  margin-left: 0.25rem !important;
  margin-right: 0.25rem !important;
}

.my-1 {
  margin-top: 0.25rem !important;
  margin-bottom: 0.25rem !important;
}

.m-2 {
  margin: 0.5rem !important;
}

.mt-2 {
  margin-top: 0.5rem !important;
}

.mr-2 {
  margin-right: 0.5rem !important;
}

.mb-2 {
  margin-bottom: 0.5rem !important;
}

.ml-2 {
  margin-left: 0.5rem !important;
}

.mx-2 {
  margin-left: 0.5rem !important;
  margin-right: 0.5rem !important;
}

.my-2 {
  margin-top: 0.5rem !important;
  margin-bottom: 0.5rem !important;
}

.m-3 {
  margin: 0.75rem !important;
}

.mt-3 {
  margin-top: 0.75rem !important;
}

.mr-3 {
  margin-right: 0.75rem !important;
}

.mb-3 {
  margin-bottom: 0.75rem !important;
}

.ml-3 {
  margin-left: 0.75rem !important;
}

.mx-3 {
  margin-left: 0.75rem !important;
  margin-right: 0.75rem !important;
}

.my-3 {
  margin-top: 0.75rem !important;
  margin-bottom: 0.75rem !important;
}

.m-4 {
  margin: 1rem !important;
}

.mt-4 {
  margin-top: 1rem !important;
}

.mr-4 {
  margin-right: 1rem !important;
}

.mb-4 {
  margin-bottom: 1rem !important;
}

.ml-4 {
  margin-left: 1rem !important;
}

.mx-4 {
  margin-left: 1rem !important;
  margin-right: 1rem !important;
}

.my-4 {
  margin-top: 1rem !important;
  margin-bottom: 1rem !important;
}

.m-5 {
  margin: 1.5rem !important;
}

.mt-5 {
  margin-top: 1.5rem !important;
}

.mr-5 {
  margin-right: 1.5rem !important;
}

.mb-5 {
  margin-bottom: 1.5rem !important;
}

.ml-5 {
  margin-left: 1.5rem !important;
}

.mx-5 {
  margin-left: 1.5rem !important;
  margin-right: 1.5rem !important;
}

.my-5 {
  margin-top: 1.5rem !important;
  margin-bottom: 1.5rem !important;
}

.m-6 {
  margin: 3rem !important;
}

.mt-6 {
  margin-top: 3rem !important;
}

.mr-6 {
  margin-right: 3rem !important;
}

.mb-6 {
  margin-bottom: 3rem !important;
}

.ml-6 {
  margin-left: 3rem !important;
}

.mx-6 {
  margin-left: 3rem !important;
  margin-right: 3rem !important;
}

.my-6 {
  margin-top: 3rem !important;
  margin-bottom: 3rem !important;
}

.p-0 {
  padding: 0 !important;
}

.pt-0 {
  padding-top: 0 !important;
}

.pr-0 {
  padding-right: 0 !important;
}

.pb-0 {
  padding-bottom: 0 !important;
}

.pl-0 {
  padding-left: 0 !important;
}

.px-0 {
  padding-left: 0 !important;
  padding-right: 0 !important;
}

.py-0 {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}

.p-1 {
  padding: 0.25rem !important;
}

.pt-1 {
  padding-top: 0.25rem !important;
}

.pr-1 {
  padding-right: 0.25rem !important;
}

.pb-1 {
  padding-bottom: 0.25rem !important;
}

.pl-1 {
  padding-left: 0.25rem !important;
}

.px-1 {
  padding-left: 0.25rem !important;
  padding-right: 0.25rem !important;
}

.py-1 {
  padding-top: 0.25rem !important;
  padding-bottom: 0.25rem !important;
}

.p-2 {
  padding: 0.5rem !important;
}

.pt-2 {
  padding-top: 0.5rem !important;
}

.pr-2 {
  padding-right: 0.5rem !important;
}

.pb-2 {
  padding-bottom: 0.5rem !important;
}

.pl-2 {
  padding-left: 0.5rem !important;
}

.px-2 {
  padding-left: 0.5rem !important;
  padding-right: 0.5rem !important;
}

.py-2 {
  padding-top: 0.5rem !important;
  padding-bottom: 0.5rem !important;
}

.p-3 {
  padding: 0.75rem !important;
}

.pt-3 {
  padding-top: 0.75rem !important;
}

.pr-3 {
  padding-right: 0.75rem !important;
}

.pb-3 {
  padding-bottom: 0.75rem !important;
}

.pl-3 {
  padding-left: 0.75rem !important;
}

.px-3 {
  padding-left: 0.75rem !important;
  padding-right: 0.75rem !important;
}

.py-3 {
  padding-top: 0.75rem !important;
  padding-bottom: 0.75rem !important;
}

.p-4 {
  padding: 1rem !important;
}

.pt-4 {
  padding-top: 1rem !important;
}

.pr-4 {
  padding-right: 1rem !important;
}

.pb-4 {
  padding-bottom: 1rem !important;
}

.pl-4 {
  padding-left: 1rem !important;
}

.px-4 {
  padding-left: 1rem !important;
  padding-right: 1rem !important;
}

.py-4 {
  padding-top: 1rem !important;
  padding-bottom: 1rem !important;
}

.p-5 {
  padding: 1.5rem !important;
}

.pt-5 {
  padding-top: 1.5rem !important;
}

.pr-5 {
  padding-right: 1.5rem !important;
}

.pb-5 {
  padding-bottom: 1.5rem !important;
}

.pl-5 {
  padding-left: 1.5rem !important;
}

.px-5 {
  padding-left: 1.5rem !important;
  padding-right: 1.5rem !important;
}

.py-5 {
  padding-top: 1.5rem !important;
  padding-bottom: 1.5rem !important;
}

.p-6 {
  padding: 3rem !important;
}

.pt-6 {
  padding-top: 3rem !important;
}

.pr-6 {
  padding-right: 3rem !important;
}

.pb-6 {
  padding-bottom: 3rem !important;
}

.pl-6 {
  padding-left: 3rem !important;
}

.px-6 {
  padding-left: 3rem !important;
  padding-right: 3rem !important;
}

.py-6 {
  padding-top: 3rem !important;
  padding-bottom: 3rem !important;
}

.is-size-1 {
  font-size: 3rem !important;
}

.is-size-2 {
  font-size: 2.5rem !important;
}

.is-size-3 {
  font-size: 2rem !important;
}

.is-size-4 {
  font-size: 1.5rem !important;
}

.is-size-5 {
  font-size: 1.25rem !important;
}

.is-size-6 {
  font-size: 1rem !important;
}

.is-size-7 {
  font-size: 0.75rem !important;
}

@media screen and (max-width: 768px) {
  .is-size-1-mobile {
    font-size: 3rem !important;
  }
  .is-size-2-mobile {
    font-size: 2.5rem !important;
  }
  .is-size-3-mobile {
    font-size: 2rem !important;
  }
  .is-size-4-mobile {
    font-size: 1.5rem !important;
  }
  .is-size-5-mobile {
    font-size: 1.25rem !important;
  }
  .is-size-6-mobile {
    font-size: 1rem !important;
  }
  .is-size-7-mobile {
    font-size: 0.75rem !important;
  }
}

@media screen and (min-width: 769px), print {
  .is-size-1-tablet {
    font-size: 3rem !important;
  }
  .is-size-2-tablet {
    font-size: 2.5rem !important;
  }
  .is-size-3-tablet {
    font-size: 2rem !important;
  }
  .is-size-4-tablet {
    font-size: 1.5rem !important;
  }
  .is-size-5-tablet {
    font-size: 1.25rem !important;
  }
  .is-size-6-tablet {
    font-size: 1rem !important;
  }
  .is-size-7-tablet {
    font-size: 0.75rem !important;
  }
}

@media screen and (max-width: 1023px) {
  .is-size-1-touch {
    font-size: 3rem !important;
  }
  .is-size-2-touch {
    font-size: 2.5rem !important;
  }
  .is-size-3-touch {
    font-size: 2rem !important;
  }
  .is-size-4-touch {
    font-size: 1.5rem !important;
  }
  .is-size-5-touch {
    font-size: 1.25rem !important;
  }
  .is-size-6-touch {
    font-size: 1rem !important;
  }
  .is-size-7-touch {
    font-size: 0.75rem !important;
  }
}

@media screen and (min-width: 1024px) {
  .is-size-1-desktop {
    font-size: 3rem !important;
  }
  .is-size-2-desktop {
    font-size: 2.5rem !important;
  }
  .is-size-3-desktop {
    font-size: 2rem !important;
  }
  .is-size-4-desktop {
    font-size: 1.5rem !important;
  }
  .is-size-5-desktop {
    font-size: 1.25rem !important;
  }
  .is-size-6-desktop {
    font-size: 1rem !important;
  }
  .is-size-7-desktop {
    font-size: 0.75rem !important;
  }
}

@media screen and (min-width: 1216px) {
  .is-size-1-widescreen {
    font-size: 3rem !important;
  }
  .is-size-2-widescreen {
    font-size: 2.5rem !important;
  }
  .is-size-3-widescreen {
    font-size: 2rem !important;
  }
  .is-size-4-widescreen {
    font-size: 1.5rem !important;
  }
  .is-size-5-widescreen {
    font-size: 1.25rem !important;
  }
  .is-size-6-widescreen {
    font-size: 1rem !important;
  }
  .is-size-7-widescreen {
    font-size: 0.75rem !important;
  }
}

@media screen and (min-width: 1408px) {
  .is-size-1-fullhd {
    font-size: 3rem !important;
  }
  .is-size-2-fullhd {
    font-size: 2.5rem !important;
  }
  .is-size-3-fullhd {
    font-size: 2rem !important;
  }
  .is-size-4-fullhd {
    font-size: 1.5rem !important;
  }
  .is-size-5-fullhd {
    font-size: 1.25rem !important;
  }
  .is-size-6-fullhd {
    font-size: 1rem !important;
  }
  .is-size-7-fullhd {
    font-size: 0.75rem !important;
  }
}

.has-text-centered {
  text-align: center !important;
}

.has-text-justified {
  text-align: justify !important;
}

.has-text-left {
  text-align: left !important;
}

.has-text-right {
  text-align: right !important;
}

@media screen and (max-width: 768px) {
  .has-text-centered-mobile {
    text-align: center !important;
  }
}

@media screen and (min-width: 769px), print {
  .has-text-centered-tablet {
    text-align: center !important;
  }
}

@media screen and (min-width: 769px) and (max-width: 1023px) {
  .has-text-centered-tablet-only {
    text-align: center !important;
  }
}

@media screen and (max-width: 1023px) {
  .has-text-centered-touch {
    text-align: center !important;
  }
}

@media screen and (min-width: 1024px) {
  .has-text-centered-desktop {
    text-align: center !important;
  }
}

@media screen and (min-width: 1024px) and (max-width: 1215px) {
  .has-text-centered-desktop-only {
    text-align: center !important;
  }
}

@media screen and (min-width: 1216px) {
  .has-text-centered-widescreen {
    text-align: center !important;
  }
}

@media screen and (min-width: 1216px) and (max-width: 1407px) {
  .has-text-centered-widescreen-only {
    text-align: center !important;
  }
}

@media screen and (min-width: 1408px) {
  .has-text-centered-fullhd {
    text-align: center !important;
  }
}

@media screen and (max-width: 768px) {
  .has-text-justified-mobile {
    text-align: justify !important;
  }
}

@media screen and (min-width: 769px), print {
  .has-text-justified-tablet {
    text-align: justify !important;
  }
}

@media screen and (min-width: 769px) and (max-width: 1023px) {
  .has-text-justified-tablet-only {
    text-align: justify !important;
  }
}

@media screen and (max-width: 1023px) {
  .has-text-justified-touch {
    text-align: justify !important;
  }
}

@media screen and (min-width: 1024px) {
  .has-text-justified-desktop {
    text-align: justify !important;
  }
}

@media screen and (min-width: 1024px) and (max-width: 1215px) {
  .has-text-justified-desktop-only {
    text-align: justify !important;
  }
}

@media screen and (min-width: 1216px) {
  .has-text-justified-widescreen {
    text-align: justify !important;
  }
}

@media screen and (min-width: 1216px) and (max-width: 1407px) {
  .has-text-justified-widescreen-only {
    text-align: justify !important;
  }
}

@media screen and (min-width: 1408px) {
  .has-text-justified-fullhd {
    text-align: justify !important;
  }
}

@media screen and (max-width: 768px) {
  .has-text-left-mobile {
    text-align: left !important;
  }
}

@media screen and (min-width: 769px), print {
  .has-text-left-tablet {
    text-align: left !important;
  }
}

@media screen and (min-width: 769px) and (max-width: 1023px) {
  .has-text-left-tablet-only {
    text-align: left !important;
  }
}

@media screen and (max-width: 1023px) {
  .has-text-left-touch {
    text-align: left !important;
  }
}

@media screen and (min-width: 1024px) {
  .has-text-left-desktop {
    text-align: left !important;
  }
}

@media screen and (min-width: 1024px) and (max-width: 1215px) {
  .has-text-left-desktop-only {
    text-align: left !important;
  }
}

@media screen and (min-width: 1216px) {
  .has-text-left-widescreen {
    text-align: left !important;
  }
}

@media screen and (min-width: 1216px) and (max-width: 1407px) {
  .has-text-left-widescreen-only {
    text-align: left !important;
  }
}

@media screen and (min-width: 1408px) {
  .has-text-left-fullhd {
    text-align: left !important;
  }
}

@media screen and (max-width: 768px) {
  .has-text-right-mobile {
    text-align: right !important;
  }
}

@media screen and (min-width: 769px), print {
  .has-text-right-tablet {
    text-align: right !important;
  }
}

@media screen and (min-width: 769px) and (max-width: 1023px) {
  .has-text-right-tablet-only {
    text-align: right !important;
  }
}

@media screen and (max-width: 1023px) {
  .has-text-right-touch {
    text-align: right !important;
  }
}

@media screen and (min-width: 1024px) {
  .has-text-right-desktop {
    text-align: right !important;
  }
}

@media screen and (min-width: 1024px) and (max-width: 1215px) {
  .has-text-right-desktop-only {
    text-align: right !important;
  }
}

@media screen and (min-width: 1216px) {
  .has-text-right-widescreen {
    text-align: right !important;
  }
}

@media screen and (min-width: 1216px) and (max-width: 1407px) {
  .has-text-right-widescreen-only {
    text-align: right !important;
  }
}

@media screen and (min-width: 1408px) {
  .has-text-right-fullhd {
    text-align: right !important;
  }
}

.is-capitalized {
  text-transform: capitalize !important;
}

.is-lowercase {
  text-transform: lowercase !important;
}

.is-uppercase {
  text-transform: uppercase !important;
}

.is-italic {
  font-style: italic !important;
}

.has-text-weight-light {
  font-weight: 300 !important;
}

.has-text-weight-normal {
  font-weight: 400 !important;
}

.has-text-weight-medium {
  font-weight: 500 !important;
}

.has-text-weight-semibold {
  font-weight: 600 !important;
}

.has-text-weight-bold {
  font-weight: 700 !important;
}

.is-family-primary {
  font-family: BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif !important;
}

.is-family-secondary {
  font-family: BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif !important;
}

.is-family-sans-serif {
  font-family: BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif !important;
}

.is-family-monospace {
  font-family: monospace !important;
}

.is-family-code {
  font-family: monospace !important;
}

.is-block {
  display: block !important;
}

@media screen and (max-width: 768px) {
  .is-block-mobile {
    display: block !important;
  }
}

@media screen and (min-width: 769px), print {
  .is-block-tablet {
    display: block !important;
  }
}

@media screen and (min-width: 769px) and (max-width: 1023px) {
  .is-block-tablet-only {
    display: block !important;
  }
}

@media screen and (max-width: 1023px) {
  .is-block-touch {
    display: block !important;
  }
}

@media screen and (min-width: 1024px) {
  .is-block-desktop {
    display: block !important;
  }
}

@media screen and (min-width: 1024px) and (max-width: 1215px) {
  .is-block-desktop-only {
    display: block !important;
  }
}

@media screen and (min-width: 1216px) {
  .is-block-widescreen {
    display: block !important;
  }
}

@media screen and (min-width: 1216px) and (max-width: 1407px) {
  .is-block-widescreen-only {
    display: block !important;
  }
}

@media screen and (min-width: 1408px) {
  .is-block-fullhd {
    display: block !important;
  }
}

.is-flex {
  display: flex !important;
}

@media screen and (max-width: 768px) {
  .is-flex-mobile {
    display: flex !important;
  }
}

@media screen and (min-width: 769px), print {
  .is-flex-tablet {
    display: flex !important;
  }
}

@media screen and (min-width: 769px) and (max-width: 1023px) {
  .is-flex-tablet-only {
    display: flex !important;
  }
}

@media screen and (max-width: 1023px) {
  .is-flex-touch {
    display: flex !important;
  }
}

@media screen and (min-width: 1024px) {
  .is-flex-desktop {
    display: flex !important;
  }
}

@media screen and (min-width: 1024px) and (max-width: 1215px) {
  .is-flex-desktop-only {
    display: flex !important;
  }
}

@media screen and (min-width: 1216px) {
  .is-flex-widescreen {
    display: flex !important;
  }
}

@media screen and (min-width: 1216px) and (max-width: 1407px) {
  .is-flex-widescreen-only {
    display: flex !important;
  }
}

@media screen and (min-width: 1408px) {
  .is-flex-fullhd {
    display: flex !important;
  }
}

.is-inline {
  display: inline !important;
}

@media screen and (max-width: 768px) {
  .is-inline-mobile {
    display: inline !important;
  }
}

@media screen and (min-width: 769px), print {
  .is-inline-tablet {
    display: inline !important;
  }
}

@media screen and (min-width: 769px) and (max-width: 1023px) {
  .is-inline-tablet-only {
    display: inline !important;
  }
}

@media screen and (max-width: 1023px) {
  .is-inline-touch {
    display: inline !important;
  }
}

@media screen and (min-width: 1024px) {
  .is-inline-desktop {
    display: inline !important;
  }
}

@media screen and (min-width: 1024px) and (max-width: 1215px) {
  .is-inline-desktop-only {
    display: inline !important;
  }
}

@media screen and (min-width: 1216px) {
  .is-inline-widescreen {
    display: inline !important;
  }
}

@media screen and (min-width: 1216px) and (max-width: 1407px) {
  .is-inline-widescreen-only {
    display: inline !important;
  }
}

@media screen and (min-width: 1408px) {
  .is-inline-fullhd {
    display: inline !important;
  }
}

.is-inline-block {
  display: inline-block !important;
}

@media screen and (max-width: 768px) {
  .is-inline-block-mobile {
    display: inline-block !important;
  }
}

@media screen and (min-width: 769px), print {
  .is-inline-block-tablet {
    display: inline-block !important;
  }
}

@media screen and (min-width: 769px) and (max-width: 1023px) {
  .is-inline-block-tablet-only {
    display: inline-block !important;
  }
}

@media screen and (max-width: 1023px) {
  .is-inline-block-touch {
    display: inline-block !important;
  }
}

@media screen and (min-width: 1024px) {
  .is-inline-block-desktop {
    display: inline-block !important;
  }
}

@media screen and (min-width: 1024px) and (max-width: 1215px) {
  .is-inline-block-desktop-only {
    display: inline-block !important;
  }
}

@media screen and (min-width: 1216px) {
  .is-inline-block-widescreen {
    display: inline-block !important;
  }
}

@media screen and (min-width: 1216px) and (max-width: 1407px) {
  .is-inline-block-widescreen-only {
    display: inline-block !important;
  }
}

@media screen and (min-width: 1408px) {
  .is-inline-block-fullhd {
    display: inline-block !important;
  }
}

.is-inline-flex {
  display: inline-flex !important;
}

@media screen and (max-width: 768px) {
  .is-inline-flex-mobile {
    display: inline-flex !important;
  }
}

@media screen and (min-width: 769px), print {
  .is-inline-flex-tablet {
    display: inline-flex !important;
  }
}

@media screen and (min-width: 769px) and (max-width: 1023px) {
  .is-inline-flex-tablet-only {
    display: inline-flex !important;
  }
}

@media screen and (max-width: 1023px) {
  .is-inline-flex-touch {
    display: inline-flex !important;
  }
}

@media screen and (min-width: 1024px) {
  .is-inline-flex-desktop {
    display: inline-flex !important;
  }
}

@media screen and (min-width: 1024px) and (max-width: 1215px) {
  .is-inline-flex-desktop-only {
    display: inline-flex !important;
  }
}

@media screen and (min-width: 1216px) {
  .is-inline-flex-widescreen {
    display: inline-flex !important;
  }
}

@media screen and (min-width: 1216px) and (max-width: 1407px) {
  .is-inline-flex-widescreen-only {
    display: inline-flex !important;
  }
}

@media screen and (min-width: 1408px) {
  .is-inline-flex-fullhd {
    display: inline-flex !important;
  }
}

.is-hidden {
  display: none !important;
}

.is-sr-only {
  border: none !important;
  clip: rect(0, 0, 0, 0) !important;
  height: 0.01em !important;
  overflow: hidden !important;
  padding: 0 !important;
  position: absolute !important;
  white-space: nowrap !important;
  width: 0.01em !important;
}

@media screen and (max-width: 768px) {
  .is-hidden-mobile {
    display: none !important;
  }
}

@media screen and (min-width: 769px), print {
  .is-hidden-tablet {
    display: none !important;
  }
}

@media screen and (min-width: 769px) and (max-width: 1023px) {
  .is-hidden-tablet-only {
    display: none !important;
  }
}

@media screen and (max-width: 1023px) {
  .is-hidden-touch {
    display: none !important;
  }
}

@media screen and (min-width: 1024px) {
  .is-hidden-desktop {
    display: none !important;
  }
}

@media screen and (min-width: 1024px) and (max-width: 1215px) {
  .is-hidden-desktop-only {
    display: none !important;
  }
}

@media screen and (min-width: 1216px) {
  .is-hidden-widescreen {
    display: none !important;
  }
}

@media screen and (min-width: 1216px) and (max-width: 1407px) {
  .is-hidden-widescreen-only {
    display: none !important;
  }
}

@media screen and (min-width: 1408px) {
  .is-hidden-fullhd {
    display: none !important;
  }
}

.is-invisible {
  visibility: hidden !important;
}

@media screen and (max-width: 768px) {
  .is-invisible-mobile {
    visibility: hidden !important;
  }
}

@media screen and (min-width: 769px), print {
  .is-invisible-tablet {
    visibility: hidden !important;
  }
}

@media screen and (min-width: 769px) and (max-width: 1023px) {
  .is-invisible-tablet-only {
    visibility: hidden !important;
  }
}

@media screen and (max-width: 1023px) {
  .is-invisible-touch {
    visibility: hidden !important;
  }
}

@media screen and (min-width: 1024px) {
  .is-invisible-desktop {
    visibility: hidden !important;
  }
}

@media screen and (min-width: 1024px) and (max-width: 1215px) {
  .is-invisible-desktop-only {
    visibility: hidden !important;
  }
}

@media screen and (min-width: 1216px) {
  .is-invisible-widescreen {
    visibility: hidden !important;
  }
}

@media screen and (min-width: 1216px) and (max-width: 1407px) {
  .is-invisible-widescreen-only {
    visibility: hidden !important;
  }
}

@media screen and (min-width: 1408px) {
  .is-invisible-fullhd {
    visibility: hidden !important;
  }
}

/* Bulma Layout */
.hero {
  align-items: stretch;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.hero .navbar {
  background: none;
}

.hero .tabs ul {
  border-bottom: none;
}

.hero.is-white {
  background-color: white;
  color: #0a0a0a;
}

.hero.is-white a:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),
.hero.is-white strong {
  color: inherit;
}

.hero.is-white .title {
  color: #0a0a0a;
}

.hero.is-white .subtitle {
  color: rgba(10, 10, 10, 0.9);
}

.hero.is-white .subtitle a:not(.button),
.hero.is-white .subtitle strong {
  color: #0a0a0a;
}

@media screen and (max-width: 1023px) {
  .hero.is-white .navbar-menu {
    background-color: white;
  }
}

.hero.is-white .navbar-item,
.hero.is-white .navbar-link {
  color: rgba(10, 10, 10, 0.7);
}

.hero.is-white a.navbar-item:hover, .hero.is-white a.navbar-item.is-active,
.hero.is-white .navbar-link:hover,
.hero.is-white .navbar-link.is-active {
  background-color: #f2f2f2;
  color: #0a0a0a;
}

.hero.is-white .tabs a {
  color: #0a0a0a;
  opacity: 0.9;
}

.hero.is-white .tabs a:hover {
  opacity: 1;
}

.hero.is-white .tabs li.is-active a {
  opacity: 1;
}

.hero.is-white .tabs.is-boxed a, .hero.is-white .tabs.is-toggle a {
  color: #0a0a0a;
}

.hero.is-white .tabs.is-boxed a:hover, .hero.is-white .tabs.is-toggle a:hover {
  background-color: rgba(10, 10, 10, 0.1);
}

.hero.is-white .tabs.is-boxed li.is-active a, .hero.is-white .tabs.is-boxed li.is-active a:hover, .hero.is-white .tabs.is-toggle li.is-active a, .hero.is-white .tabs.is-toggle li.is-active a:hover {
  background-color: #0a0a0a;
  border-color: #0a0a0a;
  color: white;
}

.hero.is-white.is-bold {
  background-image: linear-gradient(141deg, #e6e6e6 0%, white 71%, white 100%);
}

@media screen and (max-width: 768px) {
  .hero.is-white.is-bold .navbar-menu {
    background-image: linear-gradient(141deg, #e6e6e6 0%, white 71%, white 100%);
  }
}

.hero.is-black {
  background-color: #0a0a0a;
  color: white;
}

.hero.is-black a:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),
.hero.is-black strong {
  color: inherit;
}

.hero.is-black .title {
  color: white;
}

.hero.is-black .subtitle {
  color: rgba(255, 255, 255, 0.9);
}

.hero.is-black .subtitle a:not(.button),
.hero.is-black .subtitle strong {
  color: white;
}

@media screen and (max-width: 1023px) {
  .hero.is-black .navbar-menu {
    background-color: #0a0a0a;
  }
}

.hero.is-black .navbar-item,
.hero.is-black .navbar-link {
  color: rgba(255, 255, 255, 0.7);
}

.hero.is-black a.navbar-item:hover, .hero.is-black a.navbar-item.is-active,
.hero.is-black .navbar-link:hover,
.hero.is-black .navbar-link.is-active {
  background-color: black;
  color: white;
}

.hero.is-black .tabs a {
  color: white;
  opacity: 0.9;
}

.hero.is-black .tabs a:hover {
  opacity: 1;
}

.hero.is-black .tabs li.is-active a {
  opacity: 1;
}

.hero.is-black .tabs.is-boxed a, .hero.is-black .tabs.is-toggle a {
  color: white;
}

.hero.is-black .tabs.is-boxed a:hover, .hero.is-black .tabs.is-toggle a:hover {
  background-color: rgba(10, 10, 10, 0.1);
}

.hero.is-black .tabs.is-boxed li.is-active a, .hero.is-black .tabs.is-boxed li.is-active a:hover, .hero.is-black .tabs.is-toggle li.is-active a, .hero.is-black .tabs.is-toggle li.is-active a:hover {
  background-color: white;
  border-color: white;
  color: #0a0a0a;
}

.hero.is-black.is-bold {
  background-image: linear-gradient(141deg, black 0%, #0a0a0a 71%, #181616 100%);
}

@media screen and (max-width: 768px) {
  .hero.is-black.is-bold .navbar-menu {
    background-image: linear-gradient(141deg, black 0%, #0a0a0a 71%, #181616 100%);
  }
}

.hero.is-light {
  background-color: whitesmoke;
  color: rgba(0, 0, 0, 0.7);
}

.hero.is-light a:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),
.hero.is-light strong {
  color: inherit;
}

.hero.is-light .title {
  color: rgba(0, 0, 0, 0.7);
}

.hero.is-light .subtitle {
  color: rgba(0, 0, 0, 0.9);
}

.hero.is-light .subtitle a:not(.button),
.hero.is-light .subtitle strong {
  color: rgba(0, 0, 0, 0.7);
}

@media screen and (max-width: 1023px) {
  .hero.is-light .navbar-menu {
    background-color: whitesmoke;
  }
}

.hero.is-light .navbar-item,
.hero.is-light .navbar-link {
  color: rgba(0, 0, 0, 0.7);
}

.hero.is-light a.navbar-item:hover, .hero.is-light a.navbar-item.is-active,
.hero.is-light .navbar-link:hover,
.hero.is-light .navbar-link.is-active {
  background-color: #e8e8e8;
  color: rgba(0, 0, 0, 0.7);
}

.hero.is-light .tabs a {
  color: rgba(0, 0, 0, 0.7);
  opacity: 0.9;
}

.hero.is-light .tabs a:hover {
  opacity: 1;
}

.hero.is-light .tabs li.is-active a {
  opacity: 1;
}

.hero.is-light .tabs.is-boxed a, .hero.is-light .tabs.is-toggle a {
  color: rgba(0, 0, 0, 0.7);
}

.hero.is-light .tabs.is-boxed a:hover, .hero.is-light .tabs.is-toggle a:hover {
  background-color: rgba(10, 10, 10, 0.1);
}

.hero.is-light .tabs.is-boxed li.is-active a, .hero.is-light .tabs.is-boxed li.is-active a:hover, .hero.is-light .tabs.is-toggle li.is-active a, .hero.is-light .tabs.is-toggle li.is-active a:hover {
  background-color: rgba(0, 0, 0, 0.7);
  border-color: rgba(0, 0, 0, 0.7);
  color: whitesmoke;
}

.hero.is-light.is-bold {
  background-image: linear-gradient(141deg, #dfd8d9 0%, whitesmoke 71%, white 100%);
}

@media screen and (max-width: 768px) {
  .hero.is-light.is-bold .navbar-menu {
    background-image: linear-gradient(141deg, #dfd8d9 0%, whitesmoke 71%, white 100%);
  }
}

.hero.is-dark {
  background-color: #363636;
  color: #fff;
}

.hero.is-dark a:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),
.hero.is-dark strong {
  color: inherit;
}

.hero.is-dark .title {
  color: #fff;
}

.hero.is-dark .subtitle {
  color: rgba(255, 255, 255, 0.9);
}

.hero.is-dark .subtitle a:not(.button),
.hero.is-dark .subtitle strong {
  color: #fff;
}

@media screen and (max-width: 1023px) {
  .hero.is-dark .navbar-menu {
    background-color: #363636;
  }
}

.hero.is-dark .navbar-item,
.hero.is-dark .navbar-link {
  color: rgba(255, 255, 255, 0.7);
}

.hero.is-dark a.navbar-item:hover, .hero.is-dark a.navbar-item.is-active,
.hero.is-dark .navbar-link:hover,
.hero.is-dark .navbar-link.is-active {
  background-color: #292929;
  color: #fff;
}

.hero.is-dark .tabs a {
  color: #fff;
  opacity: 0.9;
}

.hero.is-dark .tabs a:hover {
  opacity: 1;
}

.hero.is-dark .tabs li.is-active a {
  opacity: 1;
}

.hero.is-dark .tabs.is-boxed a, .hero.is-dark .tabs.is-toggle a {
  color: #fff;
}

.hero.is-dark .tabs.is-boxed a:hover, .hero.is-dark .tabs.is-toggle a:hover {
  background-color: rgba(10, 10, 10, 0.1);
}

.hero.is-dark .tabs.is-boxed li.is-active a, .hero.is-dark .tabs.is-boxed li.is-active a:hover, .hero.is-dark .tabs.is-toggle li.is-active a, .hero.is-dark .tabs.is-toggle li.is-active a:hover {
  background-color: #fff;
  border-color: #fff;
  color: #363636;
}

.hero.is-dark.is-bold {
  background-image: linear-gradient(141deg, #1f191a 0%, #363636 71%, #46403f 100%);
}

@media screen and (max-width: 768px) {
  .hero.is-dark.is-bold .navbar-menu {
    background-image: linear-gradient(141deg, #1f191a 0%, #363636 71%, #46403f 100%);
  }
}

.hero.is-primary {
  background-color: #00d1b2;
  color: #fff;
}

.hero.is-primary a:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),
.hero.is-primary strong {
  color: inherit;
}

.hero.is-primary .title {
  color: #fff;
}

.hero.is-primary .subtitle {
  color: rgba(255, 255, 255, 0.9);
}

.hero.is-primary .subtitle a:not(.button),
.hero.is-primary .subtitle strong {
  color: #fff;
}

@media screen and (max-width: 1023px) {
  .hero.is-primary .navbar-menu {
    background-color: #00d1b2;
  }
}

.hero.is-primary .navbar-item,
.hero.is-primary .navbar-link {
  color: rgba(255, 255, 255, 0.7);
}

.hero.is-primary a.navbar-item:hover, .hero.is-primary a.navbar-item.is-active,
.hero.is-primary .navbar-link:hover,
.hero.is-primary .navbar-link.is-active {
  background-color: #00b89c;
  color: #fff;
}

.hero.is-primary .tabs a {
  color: #fff;
  opacity: 0.9;
}

.hero.is-primary .tabs a:hover {
  opacity: 1;
}

.hero.is-primary .tabs li.is-active a {
  opacity: 1;
}

.hero.is-primary .tabs.is-boxed a, .hero.is-primary .tabs.is-toggle a {
  color: #fff;
}

.hero.is-primary .tabs.is-boxed a:hover, .hero.is-primary .tabs.is-toggle a:hover {
  background-color: rgba(10, 10, 10, 0.1);
}

.hero.is-primary .tabs.is-boxed li.is-active a, .hero.is-primary .tabs.is-boxed li.is-active a:hover, .hero.is-primary .tabs.is-toggle li.is-active a, .hero.is-primary .tabs.is-toggle li.is-active a:hover {
  background-color: #fff;
  border-color: #fff;
  color: #00d1b2;
}

.hero.is-primary.is-bold {
  background-image: linear-gradient(141deg, #009e6c 0%, #00d1b2 71%, #00e7eb 100%);
}

@media screen and (max-width: 768px) {
  .hero.is-primary.is-bold .navbar-menu {
    background-image: linear-gradient(141deg, #009e6c 0%, #00d1b2 71%, #00e7eb 100%);
  }
}

.hero.is-link {
  background-color: #3273dc;
  color: #fff;
}

.hero.is-link a:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),
.hero.is-link strong {
  color: inherit;
}

.hero.is-link .title {
  color: #fff;
}

.hero.is-link .subtitle {
  color: rgba(255, 255, 255, 0.9);
}

.hero.is-link .subtitle a:not(.button),
.hero.is-link .subtitle strong {
  color: #fff;
}

@media screen and (max-width: 1023px) {
  .hero.is-link .navbar-menu {
    background-color: #3273dc;
  }
}

.hero.is-link .navbar-item,
.hero.is-link .navbar-link {
  color: rgba(255, 255, 255, 0.7);
}

.hero.is-link a.navbar-item:hover, .hero.is-link a.navbar-item.is-active,
.hero.is-link .navbar-link:hover,
.hero.is-link .navbar-link.is-active {
  background-color: #2366d1;
  color: #fff;
}

.hero.is-link .tabs a {
  color: #fff;
  opacity: 0.9;
}

.hero.is-link .tabs a:hover {
  opacity: 1;
}

.hero.is-link .tabs li.is-active a {
  opacity: 1;
}

.hero.is-link .tabs.is-boxed a, .hero.is-link .tabs.is-toggle a {
  color: #fff;
}

.hero.is-link .tabs.is-boxed a:hover, .hero.is-link .tabs.is-toggle a:hover {
  background-color: rgba(10, 10, 10, 0.1);
}

.hero.is-link .tabs.is-boxed li.is-active a, .hero.is-link .tabs.is-boxed li.is-active a:hover, .hero.is-link .tabs.is-toggle li.is-active a, .hero.is-link .tabs.is-toggle li.is-active a:hover {
  background-color: #fff;
  border-color: #fff;
  color: #3273dc;
}

.hero.is-link.is-bold {
  background-image: linear-gradient(141deg, #1577c6 0%, #3273dc 71%, #4366e5 100%);
}

@media screen and (max-width: 768px) {
  .hero.is-link.is-bold .navbar-menu {
    background-image: linear-gradient(141deg, #1577c6 0%, #3273dc 71%, #4366e5 100%);
  }
}

.hero.is-info {
  background-color: #3298dc;
  color: #fff;
}

.hero.is-info a:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),
.hero.is-info strong {
  color: inherit;
}

.hero.is-info .title {
  color: #fff;
}

.hero.is-info .subtitle {
  color: rgba(255, 255, 255, 0.9);
}

.hero.is-info .subtitle a:not(.button),
.hero.is-info .subtitle strong {
  color: #fff;
}

@media screen and (max-width: 1023px) {
  .hero.is-info .navbar-menu {
    background-color: #3298dc;
  }
}

.hero.is-info .navbar-item,
.hero.is-info .navbar-link {
  color: rgba(255, 255, 255, 0.7);
}

.hero.is-info a.navbar-item:hover, .hero.is-info a.navbar-item.is-active,
.hero.is-info .navbar-link:hover,
.hero.is-info .navbar-link.is-active {
  background-color: #238cd1;
  color: #fff;
}

.hero.is-info .tabs a {
  color: #fff;
  opacity: 0.9;
}

.hero.is-info .tabs a:hover {
  opacity: 1;
}

.hero.is-info .tabs li.is-active a {
  opacity: 1;
}

.hero.is-info .tabs.is-boxed a, .hero.is-info .tabs.is-toggle a {
  color: #fff;
}

.hero.is-info .tabs.is-boxed a:hover, .hero.is-info .tabs.is-toggle a:hover {
  background-color: rgba(10, 10, 10, 0.1);
}

.hero.is-info .tabs.is-boxed li.is-active a, .hero.is-info .tabs.is-boxed li.is-active a:hover, .hero.is-info .tabs.is-toggle li.is-active a, .hero.is-info .tabs.is-toggle li.is-active a:hover {
  background-color: #fff;
  border-color: #fff;
  color: #3298dc;
}

.hero.is-info.is-bold {
  background-image: linear-gradient(141deg, #159dc6 0%, #3298dc 71%, #4389e5 100%);
}

@media screen and (max-width: 768px) {
  .hero.is-info.is-bold .navbar-menu {
    background-image: linear-gradient(141deg, #159dc6 0%, #3298dc 71%, #4389e5 100%);
  }
}

.hero.is-success {
  background-color: #48c774;
  color: #fff;
}

.hero.is-success a:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),
.hero.is-success strong {
  color: inherit;
}

.hero.is-success .title {
  color: #fff;
}

.hero.is-success .subtitle {
  color: rgba(255, 255, 255, 0.9);
}

.hero.is-success .subtitle a:not(.button),
.hero.is-success .subtitle strong {
  color: #fff;
}

@media screen and (max-width: 1023px) {
  .hero.is-success .navbar-menu {
    background-color: #48c774;
  }
}

.hero.is-success .navbar-item,
.hero.is-success .navbar-link {
  color: rgba(255, 255, 255, 0.7);
}

.hero.is-success a.navbar-item:hover, .hero.is-success a.navbar-item.is-active,
.hero.is-success .navbar-link:hover,
.hero.is-success .navbar-link.is-active {
  background-color: #3abb67;
  color: #fff;
}

.hero.is-success .tabs a {
  color: #fff;
  opacity: 0.9;
}

.hero.is-success .tabs a:hover {
  opacity: 1;
}

.hero.is-success .tabs li.is-active a {
  opacity: 1;
}

.hero.is-success .tabs.is-boxed a, .hero.is-success .tabs.is-toggle a {
  color: #fff;
}

.hero.is-success .tabs.is-boxed a:hover, .hero.is-success .tabs.is-toggle a:hover {
  background-color: rgba(10, 10, 10, 0.1);
}

.hero.is-success .tabs.is-boxed li.is-active a, .hero.is-success .tabs.is-boxed li.is-active a:hover, .hero.is-success .tabs.is-toggle li.is-active a, .hero.is-success .tabs.is-toggle li.is-active a:hover {
  background-color: #fff;
  border-color: #fff;
  color: #48c774;
}

.hero.is-success.is-bold {
  background-image: linear-gradient(141deg, #29b342 0%, #48c774 71%, #56d296 100%);
}

@media screen and (max-width: 768px) {
  .hero.is-success.is-bold .navbar-menu {
    background-image: linear-gradient(141deg, #29b342 0%, #48c774 71%, #56d296 100%);
  }
}

.hero.is-warning {
  background-color: #ffdd57;
  color: rgba(0, 0, 0, 0.7);
}

.hero.is-warning a:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),
.hero.is-warning strong {
  color: inherit;
}

.hero.is-warning .title {
  color: rgba(0, 0, 0, 0.7);
}

.hero.is-warning .subtitle {
  color: rgba(0, 0, 0, 0.9);
}

.hero.is-warning .subtitle a:not(.button),
.hero.is-warning .subtitle strong {
  color: rgba(0, 0, 0, 0.7);
}

@media screen and (max-width: 1023px) {
  .hero.is-warning .navbar-menu {
    background-color: #ffdd57;
  }
}

.hero.is-warning .navbar-item,
.hero.is-warning .navbar-link {
  color: rgba(0, 0, 0, 0.7);
}

.hero.is-warning a.navbar-item:hover, .hero.is-warning a.navbar-item.is-active,
.hero.is-warning .navbar-link:hover,
.hero.is-warning .navbar-link.is-active {
  background-color: #ffd83d;
  color: rgba(0, 0, 0, 0.7);
}

.hero.is-warning .tabs a {
  color: rgba(0, 0, 0, 0.7);
  opacity: 0.9;
}

.hero.is-warning .tabs a:hover {
  opacity: 1;
}

.hero.is-warning .tabs li.is-active a {
  opacity: 1;
}

.hero.is-warning .tabs.is-boxed a, .hero.is-warning .tabs.is-toggle a {
  color: rgba(0, 0, 0, 0.7);
}

.hero.is-warning .tabs.is-boxed a:hover, .hero.is-warning .tabs.is-toggle a:hover {
  background-color: rgba(10, 10, 10, 0.1);
}

.hero.is-warning .tabs.is-boxed li.is-active a, .hero.is-warning .tabs.is-boxed li.is-active a:hover, .hero.is-warning .tabs.is-toggle li.is-active a, .hero.is-warning .tabs.is-toggle li.is-active a:hover {
  background-color: rgba(0, 0, 0, 0.7);
  border-color: rgba(0, 0, 0, 0.7);
  color: #ffdd57;
}

.hero.is-warning.is-bold {
  background-image: linear-gradient(141deg, #ffaf24 0%, #ffdd57 71%, #fffa70 100%);
}

@media screen and (max-width: 768px) {
  .hero.is-warning.is-bold .navbar-menu {
    background-image: linear-gradient(141deg, #ffaf24 0%, #ffdd57 71%, #fffa70 100%);
  }
}

.hero.is-danger {
  background-color: #f14668;
  color: #fff;
}

.hero.is-danger a:not(.button):not(.dropdown-item):not(.tag):not(.pagination-link.is-current),
.hero.is-danger strong {
  color: inherit;
}

.hero.is-danger .title {
  color: #fff;
}

.hero.is-danger .subtitle {
  color: rgba(255, 255, 255, 0.9);
}

.hero.is-danger .subtitle a:not(.button),
.hero.is-danger .subtitle strong {
  color: #fff;
}

@media screen and (max-width: 1023px) {
  .hero.is-danger .navbar-menu {
    background-color: #f14668;
  }
}

.hero.is-danger .navbar-item,
.hero.is-danger .navbar-link {
  color: rgba(255, 255, 255, 0.7);
}

.hero.is-danger a.navbar-item:hover, .hero.is-danger a.navbar-item.is-active,
.hero.is-danger .navbar-link:hover,
.hero.is-danger .navbar-link.is-active {
  background-color: #ef2e55;
  color: #fff;
}

.hero.is-danger .tabs a {
  color: #fff;
  opacity: 0.9;
}

.hero.is-danger .tabs a:hover {
  opacity: 1;
}

.hero.is-danger .tabs li.is-active a {
  opacity: 1;
}

.hero.is-danger .tabs.is-boxed a, .hero.is-danger .tabs.is-toggle a {
  color: #fff;
}

.hero.is-danger .tabs.is-boxed a:hover, .hero.is-danger .tabs.is-toggle a:hover {
  background-color: rgba(10, 10, 10, 0.1);
}

.hero.is-danger .tabs.is-boxed li.is-active a, .hero.is-danger .tabs.is-boxed li.is-active a:hover, .hero.is-danger .tabs.is-toggle li.is-active a, .hero.is-danger .tabs.is-toggle li.is-active a:hover {
  background-color: #fff;
  border-color: #fff;
  color: #f14668;
}

.hero.is-danger.is-bold {
  background-image: linear-gradient(141deg, #fa0a62 0%, #f14668 71%, #f7595f 100%);
}

@media screen and (max-width: 768px) {
  .hero.is-danger.is-bold .navbar-menu {
    background-image: linear-gradient(141deg, #fa0a62 0%, #f14668 71%, #f7595f 100%);
  }
}

.hero.is-small .hero-body {
  padding: 1.5rem;
}

@media screen and (min-width: 769px), print {
  .hero.is-medium .hero-body {
    padding: 9rem 1.5rem;
  }
}

@media screen and (min-width: 769px), print {
  .hero.is-large .hero-body {
    padding: 18rem 1.5rem;
  }
}

.hero.is-halfheight .hero-body, .hero.is-fullheight .hero-body, .hero.is-fullheight-with-navbar .hero-body {
  align-items: center;
  display: flex;
}

.hero.is-halfheight .hero-body > .container, .hero.is-fullheight .hero-body > .container, .hero.is-fullheight-with-navbar .hero-body > .container {
  flex-grow: 1;
  flex-shrink: 1;
}

.hero.is-halfheight {
  min-height: 50vh;
}

.hero.is-fullheight {
  min-height: 100vh;
}

.hero-video {
  overflow: hidden;
}

.hero-video video {
  left: 50%;
  min-height: 100%;
  min-width: 100%;
  position: absolute;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
}

.hero-video.is-transparent {
  opacity: 0.3;
}

@media screen and (max-width: 768px) {
  .hero-video {
    display: none;
  }
}

.hero-buttons {
  margin-top: 1.5rem;
}

@media screen and (max-width: 768px) {
  .hero-buttons .button {
    display: flex;
  }
  .hero-buttons .button:not(:last-child) {
    margin-bottom: 0.75rem;
  }
}

@media screen and (min-width: 769px), print {
  .hero-buttons {
    display: flex;
    justify-content: center;
  }
  .hero-buttons .button:not(:last-child) {
    margin-right: 1.5rem;
  }
}

.hero-head,
.hero-foot {
  flex-grow: 0;
  flex-shrink: 0;
}

.hero-body {
  flex-grow: 1;
  flex-shrink: 0;
  padding: 3rem 1.5rem;
}

.section {
  padding: 3rem 1.5rem;
}

@media screen and (min-width: 1024px) {
  .section.is-medium {
    padding: 9rem 1.5rem;
  }
  .section.is-large {
    padding: 18rem 1.5rem;
  }
}

.footer {
  background-color: #fafafa;
  padding: 3rem 1.5rem 6rem;
}
/*# sourceMappingURL=bulma.css.map */
`;

class SkhemataBase extends ScopedElementsMixin(h$2) {
  constructor() {
    super(...arguments);
    /**
     * Skhemata API URL
     */

    this.api = {
      url: ''
    };
    /**
     * Translations directory
     */

    this.translationDir = '';
    /**
     * Language code (ISO)
     */

    this.translationLang = 'eng';
    /**
     * path to Configuration File
     */

    this.configSrc = '';
  }
  /* TODO: add validation and form error handling
  validateFormInputs(){
  }
     displayAPIFormErrors(){
  } */


  attributeChangedCallback(name, oldVal, newVal) {
    if (name === 'translation-lang') {
      this.translationSelected = this.translationData[this.translationLang];
    }

    super.attributeChangedCallback(name, oldVal, newVal);
  }
  /**
   * getStr
   * @param key key for translation
   * @returns translated string
   */


  getStr(key) {
    try {
      const value = key.split('.').reduce((o, i) => o[i], this.translationSelected);
      return typeof value === 'string' ? value : key;
    } catch (_a) {
      return key;
    }
  }

  async firstUpdated() {
    var _a; // init API


    if ((_a = this.api) === null || _a === void 0 ? void 0 : _a.url) {
      this.skhemata = new Skhemata(this.api.url);
      this.skhemata.init();
    }

    if (this.configSrc) {
      this.configData = await fetch(this.configSrc).then(res => res.json());
    } // Load translations


    if (this.translationDir || this.translationData) {
      if (this.translationDir) {
        fetch(`${this.translationDir}${this.translationLang}.json`).then(res => {
          this.translationSelected = res.json();
        });
      } else {
        this.translationSelected = this.translationData[this.translationLang];
      }
    }

    this.requestUpdate();
  }

}
SkhemataBase.styles = [Bulma];

__decorate([e$3({
  type: Object,
  attribute: 'api'
})], SkhemataBase.prototype, "api", void 0);

__decorate([e$3({
  type: String,
  attribute: 'translation-dir'
})], SkhemataBase.prototype, "translationDir", void 0);

__decorate([e$3({
  type: Object,
  attribute: 'translation-data'
})], SkhemataBase.prototype, "translationData", void 0);

__decorate([e$3({
  type: String,
  attribute: 'translation-lang'
})], SkhemataBase.prototype, "translationLang", void 0);

__decorate([e$3({
  type: Object,
  attribute: false
})], SkhemataBase.prototype, "translationSelected", void 0);

__decorate([e$3({
  type: Object,
  attribute: false
})], SkhemataBase.prototype, "skhemata", void 0);

__decorate([e$3({
  type: String,
  attribute: 'config-src'
})], SkhemataBase.prototype, "configSrc", void 0);

__decorate([e$3({
  type: Object,
  attribute: 'config-data'
})], SkhemataBase.prototype, "configData", void 0);

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2 = {
  ATTRIBUTE: 1,
  CHILD: 2,
  PROPERTY: 3,
  BOOLEAN_ATTRIBUTE: 4,
  EVENT: 5,
  ELEMENT: 6
},
      i$4 = t => (...i) => ({
  _$litDirective$: t,
  values: i
});

class s$4 {
  constructor(t) {}

  T(t, i, s) {
    this.Σdt = t, this.M = i, this.Σct = s;
  }

  S(t, i) {
    return this.update(t, i);
  }

  update(t, i) {
    return this.render(...i);
  }

}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

class n$4 extends s$4 {
  constructor(i) {
    if (super(i), this.vt = A, i.type !== t$2.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }

  render(r) {
    if (r === A) return this.Vt = void 0, this.vt = r;
    if (r === w) return r;
    if ("string" != typeof r) throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (r === this.vt) return this.Vt;
    this.vt = r;
    const s = [r];
    return s.raw = s, this.Vt = {
      _$litType$: this.constructor.resultType,
      strings: s,
      values: []
    };
  }

}

n$4.directiveName = "unsafeHTML", n$4.resultType = 1;
const o$4 = i$4(n$4);

var faAngleDown={prefix:'fas',iconName:'angle-down',icon:[320,512,[],"f107","M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"]};var faCalendarAlt={prefix:'fas',iconName:'calendar-alt',icon:[448,512,[],"f073","M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192H0v272zm320-196c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM192 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM64 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 112v48h448v-48c0-26.5-21.5-48-48-48z"]};var faExclamationTriangle={prefix:'fas',iconName:'exclamation-triangle',icon:[576,512,[],"f071","M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"]};var faFolder={prefix:'fas',iconName:'folder',icon:[512,512,[],"f07b","M464 128H272l-64-64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V176c0-26.51-21.49-48-48-48z"]};var faSearch={prefix:'fas',iconName:'search',icon:[512,512,[],"f002","M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"]};

/*!
 * Font Awesome Free 5.15.3 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 */

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

var noop = function noop() {};

var _WINDOW = {};
var _DOCUMENT = {};
var _MUTATION_OBSERVER = null;
var _PERFORMANCE = {
  mark: noop,
  measure: noop
};

try {
  if (typeof window !== 'undefined') _WINDOW = window;
  if (typeof document !== 'undefined') _DOCUMENT = document;
  if (typeof MutationObserver !== 'undefined') _MUTATION_OBSERVER = MutationObserver;
  if (typeof performance !== 'undefined') _PERFORMANCE = performance;
} catch (e) {}

var _ref = _WINDOW.navigator || {},
    _ref$userAgent = _ref.userAgent,
    userAgent = _ref$userAgent === void 0 ? '' : _ref$userAgent;

var WINDOW = _WINDOW;
var DOCUMENT = _DOCUMENT;
var PERFORMANCE = _PERFORMANCE;
var IS_BROWSER = !!WINDOW.document;
var IS_DOM = !!DOCUMENT.documentElement && !!DOCUMENT.head && typeof DOCUMENT.addEventListener === 'function' && typeof DOCUMENT.createElement === 'function';
var IS_IE = ~userAgent.indexOf('MSIE') || ~userAgent.indexOf('Trident/');
var NAMESPACE_IDENTIFIER = '___FONT_AWESOME___';
var UNITS_IN_GRID = 16;
var DEFAULT_FAMILY_PREFIX = 'fa';
var DEFAULT_REPLACEMENT_CLASS = 'svg-inline--fa';
var DATA_FA_I2SVG = 'data-fa-i2svg';

var PRODUCTION = function () {
  try {
    return process.env.NODE_ENV === 'production';
  } catch (e) {
    return false;
  }
}();
var DUOTONE_CLASSES = {
  GROUP: 'group',
  SWAP_OPACITY: 'swap-opacity',
  PRIMARY: 'primary',
  SECONDARY: 'secondary'
};
var initial = WINDOW.FontAwesomeConfig || {};

function getAttrConfig(attr) {
  var element = DOCUMENT.querySelector('script[' + attr + ']');

  if (element) {
    return element.getAttribute(attr);
  }
}

function coerce(val) {
  // Getting an empty string will occur if the attribute is set on the HTML tag but without a value
  // We'll assume that this is an indication that it should be toggled to true
  // For example <script data-search-pseudo-elements src="..."></script>
  if (val === '') return true;
  if (val === 'false') return false;
  if (val === 'true') return true;
  return val;
}

if (DOCUMENT && typeof DOCUMENT.querySelector === 'function') {
  var attrs = [['data-family-prefix', 'familyPrefix'], ['data-replacement-class', 'replacementClass'], ['data-auto-replace-svg', 'autoReplaceSvg'], ['data-auto-add-css', 'autoAddCss'], ['data-auto-a11y', 'autoA11y'], ['data-search-pseudo-elements', 'searchPseudoElements'], ['data-observe-mutations', 'observeMutations'], ['data-mutate-approach', 'mutateApproach'], ['data-keep-original-source', 'keepOriginalSource'], ['data-measure-performance', 'measurePerformance'], ['data-show-missing-icons', 'showMissingIcons']];
  attrs.forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        attr = _ref2[0],
        key = _ref2[1];

    var val = coerce(getAttrConfig(attr));

    if (val !== undefined && val !== null) {
      initial[key] = val;
    }
  });
}

var _default = {
  familyPrefix: DEFAULT_FAMILY_PREFIX,
  replacementClass: DEFAULT_REPLACEMENT_CLASS,
  autoReplaceSvg: true,
  autoAddCss: true,
  autoA11y: true,
  searchPseudoElements: false,
  observeMutations: true,
  mutateApproach: 'async',
  keepOriginalSource: true,
  measurePerformance: false,
  showMissingIcons: true
};

var _config = _objectSpread({}, _default, initial);

if (!_config.autoReplaceSvg) _config.observeMutations = false;

var config = _objectSpread({}, _config);

WINDOW.FontAwesomeConfig = config;
var w$1 = WINDOW || {};
if (!w$1[NAMESPACE_IDENTIFIER]) w$1[NAMESPACE_IDENTIFIER] = {};
if (!w$1[NAMESPACE_IDENTIFIER].styles) w$1[NAMESPACE_IDENTIFIER].styles = {};
if (!w$1[NAMESPACE_IDENTIFIER].hooks) w$1[NAMESPACE_IDENTIFIER].hooks = {};
if (!w$1[NAMESPACE_IDENTIFIER].shims) w$1[NAMESPACE_IDENTIFIER].shims = [];
var namespace = w$1[NAMESPACE_IDENTIFIER];
var functions = [];

var listener = function listener() {
  DOCUMENT.removeEventListener('DOMContentLoaded', listener);
  loaded = 1;
  functions.map(function (fn) {
    return fn();
  });
};

var loaded = false;

if (IS_DOM) {
  loaded = (DOCUMENT.documentElement.doScroll ? /^loaded|^c/ : /^loaded|^i|^c/).test(DOCUMENT.readyState);
  if (!loaded) DOCUMENT.addEventListener('DOMContentLoaded', listener);
}

var isNode = typeof global !== 'undefined' && typeof global.process !== 'undefined' && typeof global.process.emit === 'function';
var asyncSetTimer = typeof setImmediate === 'undefined' ? setTimeout : setImmediate;
var d$1 = UNITS_IN_GRID;
var meaninglessTransform = {
  size: 16,
  x: 0,
  y: 0,
  rotate: 0,
  flipX: false,
  flipY: false
};

function insertCss(css) {
  if (!css || !IS_DOM) {
    return;
  }

  var style = DOCUMENT.createElement('style');
  style.setAttribute('type', 'text/css');
  style.innerHTML = css;
  var headChildren = DOCUMENT.head.childNodes;
  var beforeChild = null;

  for (var i = headChildren.length - 1; i > -1; i--) {
    var child = headChildren[i];
    var tagName = (child.tagName || '').toUpperCase();

    if (['STYLE', 'LINK'].indexOf(tagName) > -1) {
      beforeChild = child;
    }
  }

  DOCUMENT.head.insertBefore(style, beforeChild);
  return css;
}

var idPool = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

function nextUniqueId() {
  var size = 12;
  var id = '';

  while (size-- > 0) {
    id += idPool[Math.random() * 62 | 0];
  }

  return id;
}

function htmlEscape(str) {
  return "".concat(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function joinAttributes(attributes) {
  return Object.keys(attributes || {}).reduce(function (acc, attributeName) {
    return acc + "".concat(attributeName, "=\"").concat(htmlEscape(attributes[attributeName]), "\" ");
  }, '').trim();
}

function joinStyles(styles) {
  return Object.keys(styles || {}).reduce(function (acc, styleName) {
    return acc + "".concat(styleName, ": ").concat(styles[styleName], ";");
  }, '');
}

function transformIsMeaningful(transform) {
  return transform.size !== meaninglessTransform.size || transform.x !== meaninglessTransform.x || transform.y !== meaninglessTransform.y || transform.rotate !== meaninglessTransform.rotate || transform.flipX || transform.flipY;
}

function transformForSvg(_ref) {
  var transform = _ref.transform,
      containerWidth = _ref.containerWidth,
      iconWidth = _ref.iconWidth;
  var outer = {
    transform: "translate(".concat(containerWidth / 2, " 256)")
  };
  var innerTranslate = "translate(".concat(transform.x * 32, ", ").concat(transform.y * 32, ") ");
  var innerScale = "scale(".concat(transform.size / 16 * (transform.flipX ? -1 : 1), ", ").concat(transform.size / 16 * (transform.flipY ? -1 : 1), ") ");
  var innerRotate = "rotate(".concat(transform.rotate, " 0 0)");
  var inner = {
    transform: "".concat(innerTranslate, " ").concat(innerScale, " ").concat(innerRotate)
  };
  var path = {
    transform: "translate(".concat(iconWidth / 2 * -1, " -256)")
  };
  return {
    outer: outer,
    inner: inner,
    path: path
  };
}

function transformForCss(_ref2) {
  var transform = _ref2.transform,
      _ref2$width = _ref2.width,
      width = _ref2$width === void 0 ? UNITS_IN_GRID : _ref2$width,
      _ref2$height = _ref2.height,
      height = _ref2$height === void 0 ? UNITS_IN_GRID : _ref2$height,
      _ref2$startCentered = _ref2.startCentered,
      startCentered = _ref2$startCentered === void 0 ? false : _ref2$startCentered;
  var val = '';

  if (startCentered && IS_IE) {
    val += "translate(".concat(transform.x / d$1 - width / 2, "em, ").concat(transform.y / d$1 - height / 2, "em) ");
  } else if (startCentered) {
    val += "translate(calc(-50% + ".concat(transform.x / d$1, "em), calc(-50% + ").concat(transform.y / d$1, "em)) ");
  } else {
    val += "translate(".concat(transform.x / d$1, "em, ").concat(transform.y / d$1, "em) ");
  }

  val += "scale(".concat(transform.size / d$1 * (transform.flipX ? -1 : 1), ", ").concat(transform.size / d$1 * (transform.flipY ? -1 : 1), ") ");
  val += "rotate(".concat(transform.rotate, "deg) ");
  return val;
}

var ALL_SPACE = {
  x: 0,
  y: 0,
  width: '100%',
  height: '100%'
};

function fillBlack(abstract) {
  var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  if (abstract.attributes && (abstract.attributes.fill || force)) {
    abstract.attributes.fill = 'black';
  }

  return abstract;
}

function deGroup(abstract) {
  if (abstract.tag === 'g') {
    return abstract.children;
  } else {
    return [abstract];
  }
}

function makeIconMasking(_ref) {
  var children = _ref.children,
      attributes = _ref.attributes,
      main = _ref.main,
      mask = _ref.mask,
      explicitMaskId = _ref.maskId,
      transform = _ref.transform;
  var mainWidth = main.width,
      mainPath = main.icon;
  var maskWidth = mask.width,
      maskPath = mask.icon;
  var trans = transformForSvg({
    transform: transform,
    containerWidth: maskWidth,
    iconWidth: mainWidth
  });
  var maskRect = {
    tag: 'rect',
    attributes: _objectSpread({}, ALL_SPACE, {
      fill: 'white'
    })
  };
  var maskInnerGroupChildrenMixin = mainPath.children ? {
    children: mainPath.children.map(fillBlack)
  } : {};
  var maskInnerGroup = {
    tag: 'g',
    attributes: _objectSpread({}, trans.inner),
    children: [fillBlack(_objectSpread({
      tag: mainPath.tag,
      attributes: _objectSpread({}, mainPath.attributes, trans.path)
    }, maskInnerGroupChildrenMixin))]
  };
  var maskOuterGroup = {
    tag: 'g',
    attributes: _objectSpread({}, trans.outer),
    children: [maskInnerGroup]
  };
  var maskId = "mask-".concat(explicitMaskId || nextUniqueId());
  var clipId = "clip-".concat(explicitMaskId || nextUniqueId());
  var maskTag = {
    tag: 'mask',
    attributes: _objectSpread({}, ALL_SPACE, {
      id: maskId,
      maskUnits: 'userSpaceOnUse',
      maskContentUnits: 'userSpaceOnUse'
    }),
    children: [maskRect, maskOuterGroup]
  };
  var defs = {
    tag: 'defs',
    children: [{
      tag: 'clipPath',
      attributes: {
        id: clipId
      },
      children: deGroup(maskPath)
    }, maskTag]
  };
  children.push(defs, {
    tag: 'rect',
    attributes: _objectSpread({
      fill: 'currentColor',
      'clip-path': "url(#".concat(clipId, ")"),
      mask: "url(#".concat(maskId, ")")
    }, ALL_SPACE)
  });
  return {
    children: children,
    attributes: attributes
  };
}

function makeIconStandard(_ref) {
  var children = _ref.children,
      attributes = _ref.attributes,
      main = _ref.main,
      transform = _ref.transform,
      styles = _ref.styles;
  var styleString = joinStyles(styles);

  if (styleString.length > 0) {
    attributes['style'] = styleString;
  }

  if (transformIsMeaningful(transform)) {
    var trans = transformForSvg({
      transform: transform,
      containerWidth: main.width,
      iconWidth: main.width
    });
    children.push({
      tag: 'g',
      attributes: _objectSpread({}, trans.outer),
      children: [{
        tag: 'g',
        attributes: _objectSpread({}, trans.inner),
        children: [{
          tag: main.icon.tag,
          children: main.icon.children,
          attributes: _objectSpread({}, main.icon.attributes, trans.path)
        }]
      }]
    });
  } else {
    children.push(main.icon);
  }

  return {
    children: children,
    attributes: attributes
  };
}

function asIcon(_ref) {
  var children = _ref.children,
      main = _ref.main,
      mask = _ref.mask,
      attributes = _ref.attributes,
      styles = _ref.styles,
      transform = _ref.transform;

  if (transformIsMeaningful(transform) && main.found && !mask.found) {
    var width = main.width,
        height = main.height;
    var offset = {
      x: width / height / 2,
      y: 0.5
    };
    attributes['style'] = joinStyles(_objectSpread({}, styles, {
      'transform-origin': "".concat(offset.x + transform.x / 16, "em ").concat(offset.y + transform.y / 16, "em")
    }));
  }

  return [{
    tag: 'svg',
    attributes: attributes,
    children: children
  }];
}

function asSymbol(_ref) {
  var prefix = _ref.prefix,
      iconName = _ref.iconName,
      children = _ref.children,
      attributes = _ref.attributes,
      symbol = _ref.symbol;
  var id = symbol === true ? "".concat(prefix, "-").concat(config.familyPrefix, "-").concat(iconName) : symbol;
  return [{
    tag: 'svg',
    attributes: {
      style: 'display: none;'
    },
    children: [{
      tag: 'symbol',
      attributes: _objectSpread({}, attributes, {
        id: id
      }),
      children: children
    }]
  }];
}

function makeInlineSvgAbstract(params) {
  var _params$icons = params.icons,
      main = _params$icons.main,
      mask = _params$icons.mask,
      prefix = params.prefix,
      iconName = params.iconName,
      transform = params.transform,
      symbol = params.symbol,
      title = params.title,
      maskId = params.maskId,
      titleId = params.titleId,
      extra = params.extra,
      _params$watchable = params.watchable,
      watchable = _params$watchable === void 0 ? false : _params$watchable;

  var _ref = mask.found ? mask : main,
      width = _ref.width,
      height = _ref.height;

  var isUploadedIcon = prefix === 'fak';
  var widthClass = isUploadedIcon ? '' : "fa-w-".concat(Math.ceil(width / height * 16));
  var attrClass = [config.replacementClass, iconName ? "".concat(config.familyPrefix, "-").concat(iconName) : '', widthClass].filter(function (c) {
    return extra.classes.indexOf(c) === -1;
  }).filter(function (c) {
    return c !== '' || !!c;
  }).concat(extra.classes).join(' ');
  var content = {
    children: [],
    attributes: _objectSpread({}, extra.attributes, {
      'data-prefix': prefix,
      'data-icon': iconName,
      'class': attrClass,
      'role': extra.attributes.role || 'img',
      'xmlns': 'http://www.w3.org/2000/svg',
      'viewBox': "0 0 ".concat(width, " ").concat(height)
    })
  };
  var uploadedIconWidthStyle = isUploadedIcon && !~extra.classes.indexOf('fa-fw') ? {
    width: "".concat(width / height * 16 * 0.0625, "em")
  } : {};

  if (watchable) {
    content.attributes[DATA_FA_I2SVG] = '';
  }

  if (title) content.children.push({
    tag: 'title',
    attributes: {
      id: content.attributes['aria-labelledby'] || "title-".concat(titleId || nextUniqueId())
    },
    children: [title]
  });

  var args = _objectSpread({}, content, {
    prefix: prefix,
    iconName: iconName,
    main: main,
    mask: mask,
    maskId: maskId,
    transform: transform,
    symbol: symbol,
    styles: _objectSpread({}, uploadedIconWidthStyle, extra.styles)
  });

  var _ref2 = mask.found && main.found ? makeIconMasking(args) : makeIconStandard(args),
      children = _ref2.children,
      attributes = _ref2.attributes;

  args.children = children;
  args.attributes = attributes;

  if (symbol) {
    return asSymbol(args);
  } else {
    return asIcon(args);
  }
}

function makeLayersTextAbstract(params) {
  var content = params.content,
      width = params.width,
      height = params.height,
      transform = params.transform,
      title = params.title,
      extra = params.extra,
      _params$watchable2 = params.watchable,
      watchable = _params$watchable2 === void 0 ? false : _params$watchable2;

  var attributes = _objectSpread({}, extra.attributes, title ? {
    'title': title
  } : {}, {
    'class': extra.classes.join(' ')
  });

  if (watchable) {
    attributes[DATA_FA_I2SVG] = '';
  }

  var styles = _objectSpread({}, extra.styles);

  if (transformIsMeaningful(transform)) {
    styles['transform'] = transformForCss({
      transform: transform,
      startCentered: true,
      width: width,
      height: height
    });
    styles['-webkit-transform'] = styles['transform'];
  }

  var styleString = joinStyles(styles);

  if (styleString.length > 0) {
    attributes['style'] = styleString;
  }

  var val = [];
  val.push({
    tag: 'span',
    attributes: attributes,
    children: [content]
  });

  if (title) {
    val.push({
      tag: 'span',
      attributes: {
        class: 'sr-only'
      },
      children: [title]
    });
  }

  return val;
}

var noop$1 = function noop() {};

var p$1 = config.measurePerformance && PERFORMANCE && PERFORMANCE.mark && PERFORMANCE.measure ? PERFORMANCE : {
  mark: noop$1,
  measure: noop$1
};
/**
 * Internal helper to bind a function known to have 4 arguments
 * to a given context.
 */

var bindInternal4 = function bindInternal4(func, thisContext) {
  return function (a, b, c, d) {
    return func.call(thisContext, a, b, c, d);
  };
};
/**
 * # Reduce
 *
 * A fast object `.reduce()` implementation.
 *
 * @param  {Object}   subject      The object to reduce over.
 * @param  {Function} fn           The reducer function.
 * @param  {mixed}    initialValue The initial value for the reducer, defaults to subject[0].
 * @param  {Object}   thisContext  The context for the reducer.
 * @return {mixed}                 The final result.
 */


var reduce = function fastReduceObject(subject, fn, initialValue, thisContext) {
  var keys = Object.keys(subject),
      length = keys.length,
      iterator = thisContext !== undefined ? bindInternal4(fn, thisContext) : fn,
      i,
      key,
      result;

  if (initialValue === undefined) {
    i = 1;
    result = subject[keys[0]];
  } else {
    i = 0;
    result = initialValue;
  }

  for (; i < length; i++) {
    key = keys[i];
    result = iterator(result, subject[key], key, subject);
  }

  return result;
};

function defineIcons(prefix, icons) {
  var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var _params$skipHooks = params.skipHooks,
      skipHooks = _params$skipHooks === void 0 ? false : _params$skipHooks;
  var normalized = Object.keys(icons).reduce(function (acc, iconName) {
    var icon = icons[iconName];
    var expanded = !!icon.icon;

    if (expanded) {
      acc[icon.iconName] = icon.icon;
    } else {
      acc[iconName] = icon;
    }

    return acc;
  }, {});

  if (typeof namespace.hooks.addPack === 'function' && !skipHooks) {
    namespace.hooks.addPack(prefix, normalized);
  } else {
    namespace.styles[prefix] = _objectSpread({}, namespace.styles[prefix] || {}, normalized);
  }
  /**
   * Font Awesome 4 used the prefix of `fa` for all icons. With the introduction
   * of new styles we needed to differentiate between them. Prefix `fa` is now an alias
   * for `fas` so we'll easy the upgrade process for our users by automatically defining
   * this as well.
   */


  if (prefix === 'fas') {
    defineIcons('fa', icons);
  }
}

var styles = namespace.styles,
    shims = namespace.shims;
var _byUnicode = {};
var _byLigature = {};
var _byOldName = {};

var build = function build() {
  var lookup = function lookup(reducer) {
    return reduce(styles, function (o, style, prefix) {
      o[prefix] = reduce(style, reducer, {});
      return o;
    }, {});
  };

  _byUnicode = lookup(function (acc, icon, iconName) {
    if (icon[3]) {
      acc[icon[3]] = iconName;
    }

    return acc;
  });
  _byLigature = lookup(function (acc, icon, iconName) {
    var ligatures = icon[2];
    acc[iconName] = iconName;
    ligatures.forEach(function (ligature) {
      acc[ligature] = iconName;
    });
    return acc;
  });
  var hasRegular = ('far' in styles);
  _byOldName = reduce(shims, function (acc, shim) {
    var oldName = shim[0];
    var prefix = shim[1];
    var iconName = shim[2];

    if (prefix === 'far' && !hasRegular) {
      prefix = 'fas';
    }

    acc[oldName] = {
      prefix: prefix,
      iconName: iconName
    };
    return acc;
  }, {});
};

build();

var styles$1 = namespace.styles;

function iconFromMapping(mapping, prefix, iconName) {
  if (mapping && mapping[prefix] && mapping[prefix][iconName]) {
    return {
      prefix: prefix,
      iconName: iconName,
      icon: mapping[prefix][iconName]
    };
  }
}

function toHtml(abstractNodes) {
  var tag = abstractNodes.tag,
      _abstractNodes$attrib = abstractNodes.attributes,
      attributes = _abstractNodes$attrib === void 0 ? {} : _abstractNodes$attrib,
      _abstractNodes$childr = abstractNodes.children,
      children = _abstractNodes$childr === void 0 ? [] : _abstractNodes$childr;

  if (typeof abstractNodes === 'string') {
    return htmlEscape(abstractNodes);
  } else {
    return "<".concat(tag, " ").concat(joinAttributes(attributes), ">").concat(children.map(toHtml).join(''), "</").concat(tag, ">");
  }
}

var parseTransformString = function parseTransformString(transformString) {
  var transform = {
    size: 16,
    x: 0,
    y: 0,
    flipX: false,
    flipY: false,
    rotate: 0
  };

  if (!transformString) {
    return transform;
  } else {
    return transformString.toLowerCase().split(' ').reduce(function (acc, n) {
      var parts = n.toLowerCase().split('-');
      var first = parts[0];
      var rest = parts.slice(1).join('-');

      if (first && rest === 'h') {
        acc.flipX = true;
        return acc;
      }

      if (first && rest === 'v') {
        acc.flipY = true;
        return acc;
      }

      rest = parseFloat(rest);

      if (isNaN(rest)) {
        return acc;
      }

      switch (first) {
        case 'grow':
          acc.size = acc.size + rest;
          break;

        case 'shrink':
          acc.size = acc.size - rest;
          break;

        case 'left':
          acc.x = acc.x - rest;
          break;

        case 'right':
          acc.x = acc.x + rest;
          break;

        case 'up':
          acc.y = acc.y - rest;
          break;

        case 'down':
          acc.y = acc.y + rest;
          break;

        case 'rotate':
          acc.rotate = acc.rotate + rest;
          break;
      }

      return acc;
    }, transform);
  }
};

function MissingIcon(error) {
  this.name = 'MissingIcon';
  this.message = error || 'Icon unavailable';
  this.stack = new Error().stack;
}

MissingIcon.prototype = Object.create(Error.prototype);
MissingIcon.prototype.constructor = MissingIcon;
var FILL = {
  fill: 'currentColor'
};
var ANIMATION_BASE = {
  attributeType: 'XML',
  repeatCount: 'indefinite',
  dur: '2s'
};
var RING = {
  tag: 'path',
  attributes: _objectSpread({}, FILL, {
    d: 'M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z'
  })
};

var OPACITY_ANIMATE = _objectSpread({}, ANIMATION_BASE, {
  attributeName: 'opacity'
});

var DOT = {
  tag: 'circle',
  attributes: _objectSpread({}, FILL, {
    cx: '256',
    cy: '364',
    r: '28'
  }),
  children: [{
    tag: 'animate',
    attributes: _objectSpread({}, ANIMATION_BASE, {
      attributeName: 'r',
      values: '28;14;28;28;14;28;'
    })
  }, {
    tag: 'animate',
    attributes: _objectSpread({}, OPACITY_ANIMATE, {
      values: '1;0;1;1;0;1;'
    })
  }]
};
var QUESTION = {
  tag: 'path',
  attributes: _objectSpread({}, FILL, {
    opacity: '1',
    d: 'M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z'
  }),
  children: [{
    tag: 'animate',
    attributes: _objectSpread({}, OPACITY_ANIMATE, {
      values: '1;0;0;0;0;1;'
    })
  }]
};
var EXCLAMATION = {
  tag: 'path',
  attributes: _objectSpread({}, FILL, {
    opacity: '0',
    d: 'M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z'
  }),
  children: [{
    tag: 'animate',
    attributes: _objectSpread({}, OPACITY_ANIMATE, {
      values: '0;0;1;1;0;0;'
    })
  }]
};
var styles$2 = namespace.styles;

function asFoundIcon(icon) {
  var width = icon[0];
  var height = icon[1];

  var _icon$slice = icon.slice(4),
      _icon$slice2 = _slicedToArray(_icon$slice, 1),
      vectorData = _icon$slice2[0];

  var element = null;

  if (Array.isArray(vectorData)) {
    element = {
      tag: 'g',
      attributes: {
        class: "".concat(config.familyPrefix, "-").concat(DUOTONE_CLASSES.GROUP)
      },
      children: [{
        tag: 'path',
        attributes: {
          class: "".concat(config.familyPrefix, "-").concat(DUOTONE_CLASSES.SECONDARY),
          fill: 'currentColor',
          d: vectorData[0]
        }
      }, {
        tag: 'path',
        attributes: {
          class: "".concat(config.familyPrefix, "-").concat(DUOTONE_CLASSES.PRIMARY),
          fill: 'currentColor',
          d: vectorData[1]
        }
      }]
    };
  } else {
    element = {
      tag: 'path',
      attributes: {
        fill: 'currentColor',
        d: vectorData
      }
    };
  }

  return {
    found: true,
    width: width,
    height: height,
    icon: element
  };
}

var styles$3 = namespace.styles;

var baseStyles = "svg:not(:root).svg-inline--fa {\n  overflow: visible;\n}\n\n.svg-inline--fa {\n  display: inline-block;\n  font-size: inherit;\n  height: 1em;\n  overflow: visible;\n  vertical-align: -0.125em;\n}\n.svg-inline--fa.fa-lg {\n  vertical-align: -0.225em;\n}\n.svg-inline--fa.fa-w-1 {\n  width: 0.0625em;\n}\n.svg-inline--fa.fa-w-2 {\n  width: 0.125em;\n}\n.svg-inline--fa.fa-w-3 {\n  width: 0.1875em;\n}\n.svg-inline--fa.fa-w-4 {\n  width: 0.25em;\n}\n.svg-inline--fa.fa-w-5 {\n  width: 0.3125em;\n}\n.svg-inline--fa.fa-w-6 {\n  width: 0.375em;\n}\n.svg-inline--fa.fa-w-7 {\n  width: 0.4375em;\n}\n.svg-inline--fa.fa-w-8 {\n  width: 0.5em;\n}\n.svg-inline--fa.fa-w-9 {\n  width: 0.5625em;\n}\n.svg-inline--fa.fa-w-10 {\n  width: 0.625em;\n}\n.svg-inline--fa.fa-w-11 {\n  width: 0.6875em;\n}\n.svg-inline--fa.fa-w-12 {\n  width: 0.75em;\n}\n.svg-inline--fa.fa-w-13 {\n  width: 0.8125em;\n}\n.svg-inline--fa.fa-w-14 {\n  width: 0.875em;\n}\n.svg-inline--fa.fa-w-15 {\n  width: 0.9375em;\n}\n.svg-inline--fa.fa-w-16 {\n  width: 1em;\n}\n.svg-inline--fa.fa-w-17 {\n  width: 1.0625em;\n}\n.svg-inline--fa.fa-w-18 {\n  width: 1.125em;\n}\n.svg-inline--fa.fa-w-19 {\n  width: 1.1875em;\n}\n.svg-inline--fa.fa-w-20 {\n  width: 1.25em;\n}\n.svg-inline--fa.fa-pull-left {\n  margin-right: 0.3em;\n  width: auto;\n}\n.svg-inline--fa.fa-pull-right {\n  margin-left: 0.3em;\n  width: auto;\n}\n.svg-inline--fa.fa-border {\n  height: 1.5em;\n}\n.svg-inline--fa.fa-li {\n  width: 2em;\n}\n.svg-inline--fa.fa-fw {\n  width: 1.25em;\n}\n\n.fa-layers svg.svg-inline--fa {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n\n.fa-layers {\n  display: inline-block;\n  height: 1em;\n  position: relative;\n  text-align: center;\n  vertical-align: -0.125em;\n  width: 1em;\n}\n.fa-layers svg.svg-inline--fa {\n  -webkit-transform-origin: center center;\n          transform-origin: center center;\n}\n\n.fa-layers-counter, .fa-layers-text {\n  display: inline-block;\n  position: absolute;\n  text-align: center;\n}\n\n.fa-layers-text {\n  left: 50%;\n  top: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  -webkit-transform-origin: center center;\n          transform-origin: center center;\n}\n\n.fa-layers-counter {\n  background-color: #ff253a;\n  border-radius: 1em;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  color: #fff;\n  height: 1.5em;\n  line-height: 1;\n  max-width: 5em;\n  min-width: 1.5em;\n  overflow: hidden;\n  padding: 0.25em;\n  right: 0;\n  text-overflow: ellipsis;\n  top: 0;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: top right;\n          transform-origin: top right;\n}\n\n.fa-layers-bottom-right {\n  bottom: 0;\n  right: 0;\n  top: auto;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: bottom right;\n          transform-origin: bottom right;\n}\n\n.fa-layers-bottom-left {\n  bottom: 0;\n  left: 0;\n  right: auto;\n  top: auto;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: bottom left;\n          transform-origin: bottom left;\n}\n\n.fa-layers-top-right {\n  right: 0;\n  top: 0;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: top right;\n          transform-origin: top right;\n}\n\n.fa-layers-top-left {\n  left: 0;\n  right: auto;\n  top: 0;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: top left;\n          transform-origin: top left;\n}\n\n.fa-lg {\n  font-size: 1.3333333333em;\n  line-height: 0.75em;\n  vertical-align: -0.0667em;\n}\n\n.fa-xs {\n  font-size: 0.75em;\n}\n\n.fa-sm {\n  font-size: 0.875em;\n}\n\n.fa-1x {\n  font-size: 1em;\n}\n\n.fa-2x {\n  font-size: 2em;\n}\n\n.fa-3x {\n  font-size: 3em;\n}\n\n.fa-4x {\n  font-size: 4em;\n}\n\n.fa-5x {\n  font-size: 5em;\n}\n\n.fa-6x {\n  font-size: 6em;\n}\n\n.fa-7x {\n  font-size: 7em;\n}\n\n.fa-8x {\n  font-size: 8em;\n}\n\n.fa-9x {\n  font-size: 9em;\n}\n\n.fa-10x {\n  font-size: 10em;\n}\n\n.fa-fw {\n  text-align: center;\n  width: 1.25em;\n}\n\n.fa-ul {\n  list-style-type: none;\n  margin-left: 2.5em;\n  padding-left: 0;\n}\n.fa-ul > li {\n  position: relative;\n}\n\n.fa-li {\n  left: -2em;\n  position: absolute;\n  text-align: center;\n  width: 2em;\n  line-height: inherit;\n}\n\n.fa-border {\n  border: solid 0.08em #eee;\n  border-radius: 0.1em;\n  padding: 0.2em 0.25em 0.15em;\n}\n\n.fa-pull-left {\n  float: left;\n}\n\n.fa-pull-right {\n  float: right;\n}\n\n.fa.fa-pull-left,\n.fas.fa-pull-left,\n.far.fa-pull-left,\n.fal.fa-pull-left,\n.fab.fa-pull-left {\n  margin-right: 0.3em;\n}\n.fa.fa-pull-right,\n.fas.fa-pull-right,\n.far.fa-pull-right,\n.fal.fa-pull-right,\n.fab.fa-pull-right {\n  margin-left: 0.3em;\n}\n\n.fa-spin {\n  -webkit-animation: fa-spin 2s infinite linear;\n          animation: fa-spin 2s infinite linear;\n}\n\n.fa-pulse {\n  -webkit-animation: fa-spin 1s infinite steps(8);\n          animation: fa-spin 1s infinite steps(8);\n}\n\n@-webkit-keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n\n@keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n.fa-rotate-90 {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.BasicImage(rotation=1)\";\n  -webkit-transform: rotate(90deg);\n          transform: rotate(90deg);\n}\n\n.fa-rotate-180 {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.BasicImage(rotation=2)\";\n  -webkit-transform: rotate(180deg);\n          transform: rotate(180deg);\n}\n\n.fa-rotate-270 {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.BasicImage(rotation=3)\";\n  -webkit-transform: rotate(270deg);\n          transform: rotate(270deg);\n}\n\n.fa-flip-horizontal {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.BasicImage(rotation=0, mirror=1)\";\n  -webkit-transform: scale(-1, 1);\n          transform: scale(-1, 1);\n}\n\n.fa-flip-vertical {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)\";\n  -webkit-transform: scale(1, -1);\n          transform: scale(1, -1);\n}\n\n.fa-flip-both, .fa-flip-horizontal.fa-flip-vertical {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)\";\n  -webkit-transform: scale(-1, -1);\n          transform: scale(-1, -1);\n}\n\n:root .fa-rotate-90,\n:root .fa-rotate-180,\n:root .fa-rotate-270,\n:root .fa-flip-horizontal,\n:root .fa-flip-vertical,\n:root .fa-flip-both {\n  -webkit-filter: none;\n          filter: none;\n}\n\n.fa-stack {\n  display: inline-block;\n  height: 2em;\n  position: relative;\n  width: 2.5em;\n}\n\n.fa-stack-1x,\n.fa-stack-2x {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n\n.svg-inline--fa.fa-stack-1x {\n  height: 1em;\n  width: 1.25em;\n}\n.svg-inline--fa.fa-stack-2x {\n  height: 2em;\n  width: 2.5em;\n}\n\n.fa-inverse {\n  color: #fff;\n}\n\n.sr-only {\n  border: 0;\n  clip: rect(0, 0, 0, 0);\n  height: 1px;\n  margin: -1px;\n  overflow: hidden;\n  padding: 0;\n  position: absolute;\n  width: 1px;\n}\n\n.sr-only-focusable:active, .sr-only-focusable:focus {\n  clip: auto;\n  height: auto;\n  margin: 0;\n  overflow: visible;\n  position: static;\n  width: auto;\n}\n\n.svg-inline--fa .fa-primary {\n  fill: var(--fa-primary-color, currentColor);\n  opacity: 1;\n  opacity: var(--fa-primary-opacity, 1);\n}\n\n.svg-inline--fa .fa-secondary {\n  fill: var(--fa-secondary-color, currentColor);\n  opacity: 0.4;\n  opacity: var(--fa-secondary-opacity, 0.4);\n}\n\n.svg-inline--fa.fa-swap-opacity .fa-primary {\n  opacity: 0.4;\n  opacity: var(--fa-secondary-opacity, 0.4);\n}\n\n.svg-inline--fa.fa-swap-opacity .fa-secondary {\n  opacity: 1;\n  opacity: var(--fa-primary-opacity, 1);\n}\n\n.svg-inline--fa mask .fa-primary,\n.svg-inline--fa mask .fa-secondary {\n  fill: black;\n}\n\n.fad.fa-inverse {\n  color: #fff;\n}";

function css() {
  var dfp = DEFAULT_FAMILY_PREFIX;
  var drc = DEFAULT_REPLACEMENT_CLASS;
  var fp = config.familyPrefix;
  var rc = config.replacementClass;
  var s = baseStyles;

  if (fp !== dfp || rc !== drc) {
    var dPatt = new RegExp("\\.".concat(dfp, "\\-"), 'g');
    var customPropPatt = new RegExp("\\--".concat(dfp, "\\-"), 'g');
    var rPatt = new RegExp("\\.".concat(drc), 'g');
    s = s.replace(dPatt, ".".concat(fp, "-")).replace(customPropPatt, "--".concat(fp, "-")).replace(rPatt, ".".concat(rc));
  }

  return s;
}

var Library = /*#__PURE__*/function () {
  function Library() {
    _classCallCheck(this, Library);

    this.definitions = {};
  }

  _createClass(Library, [{
    key: "add",
    value: function add() {
      var _this = this;

      for (var _len = arguments.length, definitions = new Array(_len), _key = 0; _key < _len; _key++) {
        definitions[_key] = arguments[_key];
      }

      var additions = definitions.reduce(this._pullDefinitions, {});
      Object.keys(additions).forEach(function (key) {
        _this.definitions[key] = _objectSpread({}, _this.definitions[key] || {}, additions[key]);
        defineIcons(key, additions[key]);
        build();
      });
    }
  }, {
    key: "reset",
    value: function reset() {
      this.definitions = {};
    }
  }, {
    key: "_pullDefinitions",
    value: function _pullDefinitions(additions, definition) {
      var normalized = definition.prefix && definition.iconName && definition.icon ? {
        0: definition
      } : definition;
      Object.keys(normalized).map(function (key) {
        var _normalized$key = normalized[key],
            prefix = _normalized$key.prefix,
            iconName = _normalized$key.iconName,
            icon = _normalized$key.icon;
        if (!additions[prefix]) additions[prefix] = {};
        additions[prefix][iconName] = icon;
      });
      return additions;
    }
  }]);

  return Library;
}();

function ensureCss() {
  if (config.autoAddCss && !_cssInserted) {
    insertCss(css());
    _cssInserted = true;
  }
}

function apiObject(val, abstractCreator) {
  Object.defineProperty(val, 'abstract', {
    get: abstractCreator
  });
  Object.defineProperty(val, 'html', {
    get: function get() {
      return val.abstract.map(function (a) {
        return toHtml(a);
      });
    }
  });
  Object.defineProperty(val, 'node', {
    get: function get() {
      if (!IS_DOM) return;
      var container = DOCUMENT.createElement('div');
      container.innerHTML = val.html;
      return container.children;
    }
  });
  return val;
}

function findIconDefinition(iconLookup) {
  var _iconLookup$prefix = iconLookup.prefix,
      prefix = _iconLookup$prefix === void 0 ? 'fa' : _iconLookup$prefix,
      iconName = iconLookup.iconName;
  if (!iconName) return;
  return iconFromMapping(library.definitions, prefix, iconName) || iconFromMapping(namespace.styles, prefix, iconName);
}

function resolveIcons(next) {
  return function (maybeIconDefinition) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var iconDefinition = (maybeIconDefinition || {}).icon ? maybeIconDefinition : findIconDefinition(maybeIconDefinition || {});
    var mask = params.mask;

    if (mask) {
      mask = (mask || {}).icon ? mask : findIconDefinition(mask || {});
    }

    return next(iconDefinition, _objectSpread({}, params, {
      mask: mask
    }));
  };
}

var library = new Library();

var _cssInserted = false;
var parse = {
  transform: function transform(transformString) {
    return parseTransformString(transformString);
  }
};
var icon = resolveIcons(function (iconDefinition) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _params$transform = params.transform,
      transform = _params$transform === void 0 ? meaninglessTransform : _params$transform,
      _params$symbol = params.symbol,
      symbol = _params$symbol === void 0 ? false : _params$symbol,
      _params$mask = params.mask,
      mask = _params$mask === void 0 ? null : _params$mask,
      _params$maskId = params.maskId,
      maskId = _params$maskId === void 0 ? null : _params$maskId,
      _params$title = params.title,
      title = _params$title === void 0 ? null : _params$title,
      _params$titleId = params.titleId,
      titleId = _params$titleId === void 0 ? null : _params$titleId,
      _params$classes = params.classes,
      classes = _params$classes === void 0 ? [] : _params$classes,
      _params$attributes = params.attributes,
      attributes = _params$attributes === void 0 ? {} : _params$attributes,
      _params$styles = params.styles,
      styles = _params$styles === void 0 ? {} : _params$styles;
  if (!iconDefinition) return;
  var prefix = iconDefinition.prefix,
      iconName = iconDefinition.iconName,
      icon = iconDefinition.icon;
  return apiObject(_objectSpread({
    type: 'icon'
  }, iconDefinition), function () {
    ensureCss();

    if (config.autoA11y) {
      if (title) {
        attributes['aria-labelledby'] = "".concat(config.replacementClass, "-title-").concat(titleId || nextUniqueId());
      } else {
        attributes['aria-hidden'] = 'true';
        attributes['focusable'] = 'false';
      }
    }

    return makeInlineSvgAbstract({
      icons: {
        main: asFoundIcon(icon),
        mask: mask ? asFoundIcon(mask.icon) : {
          found: false,
          width: null,
          height: null,
          icon: {}
        }
      },
      prefix: prefix,
      iconName: iconName,
      transform: _objectSpread({}, meaninglessTransform, transform),
      symbol: symbol,
      title: title,
      maskId: maskId,
      titleId: titleId,
      extra: {
        attributes: attributes,
        styles: styles,
        classes: classes
      }
    });
  });
});

var text = function text(content) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _params$transform2 = params.transform,
      transform = _params$transform2 === void 0 ? meaninglessTransform : _params$transform2,
      _params$title2 = params.title,
      title = _params$title2 === void 0 ? null : _params$title2,
      _params$classes2 = params.classes,
      classes = _params$classes2 === void 0 ? [] : _params$classes2,
      _params$attributes2 = params.attributes,
      attributes = _params$attributes2 === void 0 ? {} : _params$attributes2,
      _params$styles2 = params.styles,
      styles = _params$styles2 === void 0 ? {} : _params$styles2;
  return apiObject({
    type: 'text',
    content: content
  }, function () {
    ensureCss();
    return makeLayersTextAbstract({
      content: content,
      transform: _objectSpread({}, meaninglessTransform, transform),
      title: title,
      extra: {
        attributes: attributes,
        styles: styles,
        classes: ["".concat(config.familyPrefix, "-layers-text")].concat(_toConsumableArray(classes))
      }
    });
  });
};

const a$3 = '\nsvg:not(:root).svg-inline--fa {\n  overflow: visible; }\n\n.svg-inline--fa {\n  display: inline-block;\n  font-size: inherit;\n  height: 1em;\n  overflow: visible;\n  vertical-align: -.125em; }\n  .svg-inline--fa.fa-lg {\n    vertical-align: -.225em; }\n  .svg-inline--fa.fa-w-1 {\n    width: 0.0625em; }\n  .svg-inline--fa.fa-w-2 {\n    width: 0.125em; }\n  .svg-inline--fa.fa-w-3 {\n    width: 0.1875em; }\n  .svg-inline--fa.fa-w-4 {\n    width: 0.25em; }\n  .svg-inline--fa.fa-w-5 {\n    width: 0.3125em; }\n  .svg-inline--fa.fa-w-6 {\n    width: 0.375em; }\n  .svg-inline--fa.fa-w-7 {\n    width: 0.4375em; }\n  .svg-inline--fa.fa-w-8 {\n    width: 0.5em; }\n  .svg-inline--fa.fa-w-9 {\n    width: 0.5625em; }\n  .svg-inline--fa.fa-w-10 {\n    width: 0.625em; }\n  .svg-inline--fa.fa-w-11 {\n    width: 0.6875em; }\n  .svg-inline--fa.fa-w-12 {\n    width: 0.75em; }\n  .svg-inline--fa.fa-w-13 {\n    width: 0.8125em; }\n  .svg-inline--fa.fa-w-14 {\n    width: 0.875em; }\n  .svg-inline--fa.fa-w-15 {\n    width: 0.9375em; }\n  .svg-inline--fa.fa-w-16 {\n    width: 1em; }\n  .svg-inline--fa.fa-w-17 {\n    width: 1.0625em; }\n  .svg-inline--fa.fa-w-18 {\n    width: 1.125em; }\n  .svg-inline--fa.fa-w-19 {\n    width: 1.1875em; }\n  .svg-inline--fa.fa-w-20 {\n    width: 1.25em; }\n  .svg-inline--fa.fa-pull-left {\n    margin-right: .3em;\n    width: auto; }\n  .svg-inline--fa.fa-pull-right {\n    margin-left: .3em;\n    width: auto; }\n  .svg-inline--fa.fa-border {\n    height: 1.5em; }\n  .svg-inline--fa.fa-li {\n    width: 2em; }\n  .svg-inline--fa.fa-fw {\n    width: 1.25em; }\n\n.fa-layers svg.svg-inline--fa {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0; }\n\n.fa-layers {\n  display: inline-block;\n  height: 1em;\n  position: relative;\n  text-align: center;\n  vertical-align: -.125em;\n  width: 1em; }\n  .fa-layers svg.svg-inline--fa {\n    -webkit-transform-origin: center center;\n            transform-origin: center center; }\n\n.fa-layers-text, .fa-layers-counter {\n  display: inline-block;\n  position: absolute;\n  text-align: center; }\n\n.fa-layers-text {\n  left: 50%;\n  top: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  -webkit-transform-origin: center center;\n          transform-origin: center center; }\n\n.fa-layers-counter {\n  background-color: #ff253a;\n  border-radius: 1em;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  color: #fff;\n  height: 1.5em;\n  line-height: 1;\n  max-width: 5em;\n  min-width: 1.5em;\n  overflow: hidden;\n  padding: .25em;\n  right: 0;\n  text-overflow: ellipsis;\n  top: 0;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: top right;\n          transform-origin: top right; }\n\n.fa-layers-bottom-right {\n  bottom: 0;\n  right: 0;\n  top: auto;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: bottom right;\n          transform-origin: bottom right; }\n\n.fa-layers-bottom-left {\n  bottom: 0;\n  left: 0;\n  right: auto;\n  top: auto;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: bottom left;\n          transform-origin: bottom left; }\n\n.fa-layers-top-right {\n  right: 0;\n  top: 0;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: top right;\n          transform-origin: top right; }\n\n.fa-layers-top-left {\n  left: 0;\n  right: auto;\n  top: 0;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: top left;\n          transform-origin: top left; }\n\n.fa-lg {\n  font-size: 1.33333em;\n  line-height: 0.75em;\n  vertical-align: -.0667em; }\n\n.fa-xs {\n  font-size: .75em; }\n\n.fa-sm {\n  font-size: .875em; }\n\n.fa-1x {\n  font-size: 1em; }\n\n.fa-2x {\n  font-size: 2em; }\n\n.fa-3x {\n  font-size: 3em; }\n\n.fa-4x {\n  font-size: 4em; }\n\n.fa-5x {\n  font-size: 5em; }\n\n.fa-6x {\n  font-size: 6em; }\n\n.fa-7x {\n  font-size: 7em; }\n\n.fa-8x {\n  font-size: 8em; }\n\n.fa-9x {\n  font-size: 9em; }\n\n.fa-10x {\n  font-size: 10em; }\n\n.fa-fw {\n  text-align: center;\n  width: 1.25em; }\n\n.fa-ul {\n  list-style-type: none;\n  margin-left: 2.5em;\n  padding-left: 0; }\n  .fa-ul > li {\n    position: relative; }\n\n.fa-li {\n  left: -2em;\n  position: absolute;\n  text-align: center;\n  width: 2em;\n  line-height: inherit; }\n\n.fa-border {\n  border: solid 0.08em #eee;\n  border-radius: .1em;\n  padding: .2em .25em .15em; }\n\n.fa-pull-left {\n  float: left; }\n\n.fa-pull-right {\n  float: right; }\n\n.fa.fa-pull-left,\n.fas.fa-pull-left,\n.far.fa-pull-left,\n.fal.fa-pull-left,\n.fab.fa-pull-left {\n  margin-right: .3em; }\n\n.fa.fa-pull-right,\n.fas.fa-pull-right,\n.far.fa-pull-right,\n.fal.fa-pull-right,\n.fab.fa-pull-right {\n  margin-left: .3em; }\n\n.fa-spin {\n  -webkit-animation: fa-spin 2s infinite linear;\n          animation: fa-spin 2s infinite linear; }\n\n.fa-pulse {\n  -webkit-animation: fa-spin 1s infinite steps(8);\n          animation: fa-spin 1s infinite steps(8); }\n\n@-webkit-keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg); }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg); } }\n\n@keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg); }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg); } }\n\n.fa-rotate-90 {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=1)";\n  -webkit-transform: rotate(90deg);\n          transform: rotate(90deg); }\n\n.fa-rotate-180 {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=2)";\n  -webkit-transform: rotate(180deg);\n          transform: rotate(180deg); }\n\n.fa-rotate-270 {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=3)";\n  -webkit-transform: rotate(270deg);\n          transform: rotate(270deg); }\n\n.fa-flip-horizontal {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=0, mirror=1)";\n  -webkit-transform: scale(-1, 1);\n          transform: scale(-1, 1); }\n\n.fa-flip-vertical {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)";\n  -webkit-transform: scale(1, -1);\n          transform: scale(1, -1); }\n\n.fa-flip-both, .fa-flip-horizontal.fa-flip-vertical {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)";\n  -webkit-transform: scale(-1, -1);\n          transform: scale(-1, -1); }\n\n:root .fa-rotate-90,\n:root .fa-rotate-180,\n:root .fa-rotate-270,\n:root .fa-flip-horizontal,\n:root .fa-flip-vertical,\n:root .fa-flip-both {\n  -webkit-filter: none;\n          filter: none; }\n\n.fa-stack {\n  display: inline-block;\n  height: 2em;\n  position: relative;\n  width: 2.5em; }\n\n.fa-stack-1x,\n.fa-stack-2x {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0; }\n\n.svg-inline--fa.fa-stack-1x {\n  height: 1em;\n  width: 1.25em; }\n\n.svg-inline--fa.fa-stack-2x {\n  height: 2em;\n  width: 2.5em; }\n\n.fa-inverse {\n  color: #fff; }\n\n.sr-only {\n  border: 0;\n  clip: rect(0, 0, 0, 0);\n  height: 1px;\n  margin: -1px;\n  overflow: hidden;\n  padding: 0;\n  position: absolute;\n  width: 1px; }\n\n.sr-only-focusable:active, .sr-only-focusable:focus {\n  clip: auto;\n  height: auto;\n  margin: 0;\n  overflow: visible;\n  position: static;\n  width: auto; }\n\n.svg-inline--fa .fa-primary {\n  fill: var(--fa-primary-color, currentColor);\n  opacity: 1;\n  opacity: var(--fa-primary-opacity, 1); }\n\n.svg-inline--fa .fa-secondary {\n  fill: var(--fa-secondary-color, currentColor);\n  opacity: 0.4;\n  opacity: var(--fa-secondary-opacity, 0.4); }\n\n.svg-inline--fa.fa-swap-opacity .fa-primary {\n  opacity: 0.4;\n  opacity: var(--fa-secondary-opacity, 0.4); }\n\n.svg-inline--fa.fa-swap-opacity .fa-secondary {\n  opacity: 1;\n  opacity: var(--fa-primary-opacity, 1); }\n\n.svg-inline--fa mask .fa-primary,\n.svg-inline--fa mask .fa-secondary {\n  fill: black; }\n\n.fad.fa-inverse {\n  color: #fff; }\n\n';

function o$5({
  prototype: n
}, t) {
  for (const [e, i] of Object.entries(t)) r$3(n, e, i);

  n.connectedCallback = function () {
    for (const [n, {
      connect: e = () => {}
    }] of Object.entries(t)) e(this, n);
  };
}

function r$3(n, t, {
  get: e,
  set: i,
  observe: a = () => {},
  defaultValue: o
}) {
  const r = e || ((n, t) => t),
        s = i || ((n, t) => t),
        f = Symbol(`cached-${t}`);

  n[f] = o, Object.defineProperty(n, t, {
    get() {
      const n = this[f];
      return this[f] = r(this, this[f]), this[f] !== n && a(this, this[f], n), this[f];
    },

    set(n) {
      const t = this[f],
            e = s(this, n, this[f]);
      void 0 !== e && (this[f] = r(this, e), t !== this[f] && a(this, this[f], t));
    },

    enumerable: !0,
    configurable: !1
  });
}

function s$5({
  attribute: n,
  defaultValue: t,
  ...e
}) {
  return {
    connect: u$2(n, t),
    defaultValue: t,
    ...e
  };
}

function f$1({
  defaultValue: n = !1,
  set: t = (n, t) => t,
  ...e
}) {
  return s$5({
    defaultValue: n,
    set: (n, e) => t(n, Boolean(e)),
    ...e
  });
}

function l$3({
  defaultValue: n = "",
  set: t = (n, t) => t,
  ...e
}) {
  return s$5({
    defaultValue: n,
    set: (n, e) => t(n, m$1(e)),
    ...e
  });
}

function c$1({
  defaultValue: n = "",
  set: t = (n, t) => t,
  ...e
}) {
  return s$5({
    defaultValue: n,
    set: (n, e) => {
      const i = "object" == typeof e ? e : m$1(e);
      return t(n, i);
    },
    ...e
  });
}

function m$1(n) {
  return null == n ? "" : String(n);
}

function u$2(n, t) {
  const e = "boolean" == typeof t ? () => !0 : t => t.getAttribute(n);
  return (t, i) => {
    t.hasAttribute(n) && (t[i] = e(t));
  };
}

let g$1, d$2, p$2, h$3;

function b$1(n) {
  return g$1 ? "string" == typeof n ? g$1({
    iconName: n
  }) : n && 2 <= n.length ? g$1({
    prefix: n[0],
    iconName: n[1]
  }) : n : n;
}

function v$1(...n) {
  return d$2 ? x("html", d$2(...n)) : void 0;
}

function w$2(...n) {
  return p$2 ? x("html", p$2(...n)) : void 0;
}

function y$1(...n) {
  return h$3 ? h$3.transform(...n) : void 0;
}

function x(n, t) {
  if (t) return t[n];
}

function k$1(n, t) {
  if (void 0 === t) return t => k$1(n, t);

  const e = (n, t) => {
    return "function" == typeof n ? n((e = t) ? e.replace(/[^0-9a-zA-Z-_]/g, "") : "") : n;
    var e;
  };

  return (i, a, o) => {
    (o || a) && (i[n].classList.remove(e(t, o)), a && i[n].classList.add(e(t, a)));
  };
}

const A$1 = document.createElement("template");

function R$1({
  icon: n = []
} = {}) {
  const [t = 1, e = 1,,, i = ""] = n;
  return [`<svg\n\t\t\tclass="svg-inline--fa"\n\t\t\taria-hidden="true"\n\t\t\trole="img"\n\t\t\tfocusable="false"\n\t\t\txmlns="http://www.w3.org/2000/svg"\n\t\t\tviewBox="0 0 ${t} ${e}"\n\t\t>\n\t\t\t${Array.isArray(i) ? `<g class="fa-group">\n\t\t\t<path class="fa-secondary" fill="currentColor" d="${i[1]}" />\n\t\t\t<path class="fa-primary" fill="currentColor" d="${i[0]}" />\n\t\t</g>` : `<path fill="currentColor" d="${i}" />`}\n\t\t</svg>`];
}

A$1.innerHTML = `\n<style>\n\t:host {\n\t\tbox-sizing: border-box;\n\t\tdisplay: inline-block;\n\t\tline-height: 1; }\n\n\t\t:host([pull="left"]) {\n\t\t\tfloat: left;\n\t\t\tmargin-right: .3em; }\n\n\t\t:host([pull="right"]) {\n\t\t\tfloat: right;\n\t\t\tmargin-left: .3em; }\n\n\t${a$3}\n</style>\n${R$1({
  icon: []
})}\n`;

const E$1 = {
  SVG: Symbol("svg"),
  PATH_PRIMARY: Symbol("path-primary"),
  PATH_SECONDARY: Symbol("path-secondary"),
  NEEDS_REDRAW: Symbol("needs-complete-redraw-of-structure")
},
      T$1 = k$1(E$1.SVG),
      S$2 = n => T$1(t => n.concat(t)),
      N$1 = {
  icon: c$1({
    attribute: "icon",
    observe: _$1
  }),
  resolvedIcon: {
    get: ({
      icon: n,
      _resolve: t
    }) => t(n)
  },
  isDuotone: {
    get: z$1
  },
  transform: c$1({
    attribute: "transform",
    observe: _$1
  }),
  parsedTransform: {
    get: function ({
      _parseTransform: n,
      transform: t
    }) {
      return t && "string" == typeof t ? n(t) : t;
    }
  },
  size: l$3({
    attribute: "size",
    observe: S$2("fa-")
  }),
  rotation: l$3({
    attribute: "rotation",
    observe: S$2("fa-rotate-")
  }),
  flip: l$3({
    attribute: "flip",
    observe: S$2("fa-flip-")
  }),
  pull: l$3({
    attribute: "pull",
    observe: (I$1 = "pull", (n, t) => n.setAttribute(I$1, t))
  }),
  mask: c$1({
    attribute: "mask",
    observe: _$1
  }),
  resolvedMask: {
    get: ({
      mask: n,
      _resolve: t
    }) => t(n)
  },
  fixedWidth: f$1({
    attribute: "fixed-width",
    observe: T$1("fa-fw")
  }),
  spin: f$1({
    attribute: "spin",
    observe: T$1("fa-spin")
  }),
  pulse: f$1({
    attribute: "pulse",
    observe: T$1("fa-pulse")
  }),
  inverse: f$1({
    attribute: "inverse",
    observe: T$1("fa-inverse")
  }),
  swapOpacity: f$1({
    attribute: "swap-opacity",
    observe: T$1("fa-swap-opacity")
  })
};

var I$1;

class D extends HTMLElement {
  constructor() {
    super();
    const n = this.attachShadow({
      mode: "open"
    });
    n.appendChild(A$1.content.cloneNode(!0)), this[E$1.SVG] = n.querySelector("svg"), this[E$1.PATH_PRIMARY] = n.querySelector("path"), this[E$1.NEEDS_REDRAW] = n => n.isDuotone || n.transform || n.mask, this._toHtml = v$1, this._resolve = b$1, this._parseTransform = y$1, this.spin = !1;
  }

}

function z$1({
  resolvedIcon: n
}) {
  return n && n.icon && Array.isArray(n.icon[4]);
}

function _$1(n) {
  n[E$1.NEEDS_REDRAW](n) ? function (n) {
    const t = n[E$1.SVG].classList;
    n[E$1.SVG].remove();
    const e = {
      transform: n.parsedTransform,
      mask: n.resolvedMask
    },
          [i] = n._toHtml(n.resolvedIcon, e) || R$1(n.resolvedIcon);
    n.shadowRoot.innerHTML = n.shadowRoot.innerHTML.concat(i), n[E$1.SVG] = n.shadowRoot.querySelector("svg"), n[E$1.SVG].classList.add(...t);
    const a = n.shadowRoot.querySelectorAll("path");
    n[E$1.PATH_PRIMARY] = a[1] ? a[1] : a[0], n[E$1.PATH_SECONDARY] = a[1] ? a[0] : void 0;
    const {
      isDuotone: o
    } = n;

    n[E$1.NEEDS_REDRAW] = n => o !== n.isDuotone || n.transform || n.mask;
  }(n) : function (n) {
    const {
      resolvedIcon: t
    } = n;
    if (!t) return;
    n[E$1.SVG].setAttribute("viewBox", `0 0 ${t.icon[0]} ${t.icon[1]}`);
    (z$1(n) ? M$1 : C$1)(n, {
      vectorDefinition: t.icon[4]
    });
  }(n);
}

function C$1(n, {
  vectorDefinition: t
}) {
  n[E$1.PATH_PRIMARY].setAttribute("d", t);
}

function M$1(n, {
  vectorDefinition: t
}) {
  n[E$1.PATH_PRIMARY].setAttribute("d", t[0]), n[E$1.PATH_SECONDARY].setAttribute("d", t[1]);
}

o$5(D, N$1);
const H$1 = document.createElement("template");
H$1.innerHTML = `\n<style>\n\t:host {\n\t\tbox-sizing: border-box;\n\t\tdisplay: inline-block;\n\t\tline-height: 1; }\n\n\t\t:host([pull="left"]) {\n\t\t\tfloat: left;\n\t\t\tmargin-right: .3em; }\n\n\t\t:host([pull="right"]) {\n\t\t\tfloat: right;\n\t\t\tmargin-left: .3em; }\n\n\t::slotted(*) {\n\t\tbottom: 0;\n\t\tleft: 0;\n\t\tmargin: auto;\n\t\tposition: absolute;\n\t\tright: 0;\n\t\ttop: 0; }\n\n\t${a$3}\n</style>\n<span class="fa-layers">\n\t<slot></slot>\n</span>\n`;
const L$1 = {
  LAYERS: Symbol("layers")
},
      O = k$1(L$1.LAYERS),
      V$1 = {
  size: { ...N$1.size,
    observe: (P$1 = "fa-", O(n => P$1.concat(n)))
  },
  fixedWidth: { ...N$1.fixedWidth,
    observe: O("fa-fw")
  },
  pull: N$1.pull
};
var P$1;

class $$1 extends HTMLElement {
  constructor() {
    super();
    const n = this.attachShadow({
      mode: "open"
    });
    n.appendChild(H$1.content.cloneNode(!0)), this[L$1.LAYERS] = n.querySelector(".fa-layers");
  }

}

o$5($$1, V$1);
const W = document.createElement("template");
W.innerHTML = `\n<style>\n\t:host {\n\t\tbox-sizing: border-box;\n\t\tdisplay: inline-block;\n\t\tline-height: 1; }\n\n\t${a$3}\n\n\t.fa-layers-counter {\n\t\tbackground: var(--fa-layers-counter-background, #ff253a); }\n</style>\n<span class="fa-layers-text"></span>\n`;

const Y = {
  CONTAINER: Symbol("container"),
  NEEDS_REDRAW: Symbol("needs-complete-redraw-of-structure")
},
      B = k$1(Y.CONTAINER),
      G = n => B(t => n.concat(t)),
      q = {
  value: l$3({
    attribute: "value",
    observe: j
  }),
  transform: { ...N$1.transform,
    observe: j
  },
  parsedTransform: N$1.parsedTransform,
  size: l$3({
    attribute: "size",
    observe: G("fa-")
  }),
  position: l$3({
    attribute: "position",
    observe: G("fa-layers-")
  }),
  fixedWidth: f$1({
    attribute: "fixed-width",
    observe: B("fa-fw")
  }),
  inverse: f$1({
    attribute: "inverse",
    observe: B("fa-inverse")
  }),
  counter: f$1({
    attribute: "counter",
    observe: j
  })
};

class X extends HTMLElement {
  constructor() {
    super();
    const n = this.attachShadow({
      mode: "open"
    });
    n.appendChild(W.content.cloneNode(!0)), this[Y.CONTAINER] = n.querySelector(".fa-layers-text"), this[Y.NEEDS_REDRAW] = n => n.transform, this._toHtml = w$2, this._parseTransform = y$1;
  }

}

function j(n) {
  n[Y.NEEDS_REDRAW](n) && function (n) {
    const t = n[Y.CONTAINER].classList;
    n[Y.CONTAINER].remove();

    const e = {
      transform: n.parsedTransform
    },
          [i] = n._toHtml(String(n.value), e) || function (n = "") {
      const t = document.createElement("span");
      return t.className = "fa-layers-text", t.textContent = n, [t.outerHTML];
    }(n.value);

    n.shadowRoot.innerHTML = n.shadowRoot.innerHTML.concat(i), n[Y.CONTAINER] = n.shadowRoot.querySelector(".fa-layers-text"), n[Y.CONTAINER].classList.add(...t);
    const {
      transform: a
    } = n;

    n[Y.NEEDS_REDRAW] = n => a !== n.transform;
  }(n), function (n) {
    const t = n[Y.CONTAINER].classList,
          e = n.counter ? "fa-layers-counter" : "fa-layers-text";
    if (t.contains(e)) return;
    n[Y.CONTAINER].classList.remove("fa-layers-counter", "fa-layers-text"), n[Y.CONTAINER].classList.add(e);
  }(n), function (n, t = n.value) {
    const e = n.counter && !t ? 0 : t;
    n[Y.CONTAINER].textContent = e;
  }(n);
}

o$5(X, q), function ({
  findIconDefinition: n,
  icon: t,
  text: e,
  parse: i
}) {
  g$1 = n, d$2 = t, p$2 = e, h$3 = i;
}({
  findIconDefinition: findIconDefinition,
  icon: icon,
  text: text,
  parse: parse
});

function _defineProperty$1(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

class SkhemataForm extends SkhemataBase {
  constructor(...args) {
    super(...args);

    _defineProperty$1(this, "resetOnSubmit", false);

    _defineProperty$1(this, "columns", false);

    _defineProperty$1(this, "data", {});

    _defineProperty$1(this, "valid", true);

    _defineProperty$1(this, "horizontal", false);

    _defineProperty$1(this, "translations", '');

    _defineProperty$1(this, "validate", () => {
      for (const input of this.inputs) {
        if (input.name) {
          input.validate();
          this.valid = this.valid ? input.valid : this.valid;
        }
      }
    });
  }

  /**
   * getter for form elements (ie inputs and buttons)
   */
  get inputs() {
    const elements = [];
    let children = [];
    const slot = this.shadowRoot ? this.shadowRoot.querySelector('slot') : null;
    const childNodes = slot ? slot.assignedNodes({
      flatten: true
    }) : null;
    children = childNodes ? Array.prototype.filter.call(childNodes, node => node.nodeType === Node.ELEMENT_NODE) : [];

    const getChildren = element => {
      const elementChildren = element.childNodes ? Array.prototype.filter.call(element.childNodes, node => node.nodeType === Node.ELEMENT_NODE) : [];

      if (element.name || !element.name && elementChildren.length < 1) {
        if (element.tagName && element.tagName !== 'SLOT') {
          elements.push(element);
        }
      } else if (elementChildren.length > 0) {
        for (const child of element.childNodes) {
          getChildren(child);
        }
      }
    };

    for (const child of children) {
      getChildren(child);
    }

    return elements;
  }

  reset() {
    this.inputs.forEach(input => {
      input.reset();
    });
    this.valid = true;
  }

  handleSubmit() {
    this.validate();

    if (!this.valid) {
      return;
    }

    for (const input of this.inputs) {
      if (input.name) {
        this.data[input.name] = input.value;
      }
    }

    this.dispatchEvent(new CustomEvent('submit', {
      detail: {
        data: this.data
      },
      composed: true,
      bubbles: true
    }));

    if (this.resetOnSubmit) {
      this.reset();
    }
  }

  async firstUpdated() {
    await super.firstUpdated();

    for (const input of this.inputs) {
      input.horizontal = this.horizontal;
      input.translations = this.translations;
      input.addEventListener('submit', () => {
        this.handleSubmit();
      });
      input.addEventListener('change', e => {
        const {
          name,
          value
        } = e.detail;
        const oldValue = this.data;
        this.data[name] = value;
        this.valid = true;
        this.dispatchEvent(new CustomEvent('change', {
          detail: {
            data: this.data
          }
        }));
        this.requestUpdate('data', oldValue);
      });
    }
  }

  render() {
    return T`
      <div class="${this.columns ? 'columns' : ''}">
        <slot> </slot>
      </div>
    `;
  }

}

__decorate([e$3({
  type: Boolean
})], SkhemataForm.prototype, "resetOnSubmit", void 0);

__decorate([e$3({
  type: Boolean
})], SkhemataForm.prototype, "columns", void 0);

__decorate([e$3({
  type: Object
})], SkhemataForm.prototype, "data", void 0);

__decorate([e$3({
  type: Boolean
})], SkhemataForm.prototype, "valid", void 0);

__decorate([e$3({
  type: Boolean
})], SkhemataForm.prototype, "horizontal", void 0);

__decorate([e$3({
  type: String
})], SkhemataForm.prototype, "translations", void 0);

class SkhemataFormInput extends SkhemataBase {
  static get styles() {
    return [...super.styles, i`
        .field {
          margin-bottom: 1rem;
        },
      `];
  }

  get value() {
    return this._value;
  }

  set value(value) {
    const oldValue = this._value;
    this._value = value;
    this.dispatchEvent(new CustomEvent('change', {
      detail: {
        name: this.name,
        value
      }
    }));
    this.requestUpdate('value', oldValue);
  }

  constructor() {
    super();

    _defineProperty$1(this, "_value", null);

    _defineProperty$1(this, "faTriangle", o$4(icon(faExclamationTriangle, {
      transform: {
        size: 7
      }
    }).html[0]));

    _defineProperty$1(this, "label", '');

    _defineProperty$1(this, "horizontal", false);

    _defineProperty$1(this, "description", '');

    _defineProperty$1(this, "required", false);

    _defineProperty$1(this, "name", '');

    _defineProperty$1(this, "placeholder", '');

    _defineProperty$1(this, "errorMessage", '');

    _defineProperty$1(this, "valid", true);

    _defineProperty$1(this, "helpClass", '');

    _defineProperty$1(this, "translationData", {
      eng: {
        formErrorMinlength: 'Text must be longer',
        formErrorMaxlength: 'Text must be shorter',
        formErrorEmail: 'Not a valid email',
        formErrorRequired: 'This is required'
      }
    });

    this.addEventListener('validate', this.validate);
    this.addEventListener('reset', this.reset);
  }

  async firstUpdated() {
    super.firstUpdated();
  }

  reset() {
    this.clearError();
    this.setAttribute('value', '');
  }

  validate() {
    if (this.required && !this.value) {
      this.valid = false;
    }
  }

  clearError() {
    this.helpClass = '';
    this.valid = true;
  }

}

__decorate([e$3({
  type: Object
})], SkhemataFormInput.prototype, "faTriangle", void 0);

__decorate([e$3({
  type: String,
  reflect: true
}), e$3({
  type: File,
  reflect: true
}), e$3({
  type: Boolean,
  reflect: true
})], SkhemataFormInput.prototype, "value", null);

__decorate([e$3({
  type: String
})], SkhemataFormInput.prototype, "label", void 0);

__decorate([e$3({
  type: Boolean
})], SkhemataFormInput.prototype, "horizontal", void 0);

__decorate([e$3({
  type: String
})], SkhemataFormInput.prototype, "description", void 0);

__decorate([e$3({
  type: Boolean
})], SkhemataFormInput.prototype, "required", void 0);

__decorate([e$3({
  type: String
})], SkhemataFormInput.prototype, "name", void 0);

__decorate([e$3({
  type: String
})], SkhemataFormInput.prototype, "placeholder", void 0);

__decorate([e$3({
  type: String
})], SkhemataFormInput.prototype, "errorMessage", void 0);

__decorate([e$3({
  type: Boolean
})], SkhemataFormInput.prototype, "valid", void 0);

__decorate([e$3({
  type: String
})], SkhemataFormInput.prototype, "helpClass", void 0);

__decorate([e$3({
  type: Object
})], SkhemataFormInput.prototype, "translationData", void 0);

function assertString(input) {
  const isString = typeof input === 'string' || input instanceof String;

  if (!isString) {
    let invalidType;

    if (input === null) {
      invalidType = 'null';
    } else {
      invalidType = typeof input;

      if (invalidType === 'object' && input.constructor && input.constructor.hasOwnProperty('name')) {
        invalidType = input.constructor.name;
      } else {
        invalidType = `a ${invalidType}`;
      }
    }

    throw new TypeError(`Expected string but received ${invalidType}.`);
  }
}

function toDate(date) {
  assertString(date);
  date = Date.parse(date);
  return !isNaN(date) ? new Date(date) : null;
}

const alpha = {
  'en-US': /^[A-Z]+$/i,
  'az-AZ': /^[A-VXYZÇƏĞİıÖŞÜ]+$/i,
  'bg-BG': /^[А-Я]+$/i,
  'cs-CZ': /^[A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]+$/i,
  'da-DK': /^[A-ZÆØÅ]+$/i,
  'de-DE': /^[A-ZÄÖÜß]+$/i,
  'el-GR': /^[Α-ώ]+$/i,
  'es-ES': /^[A-ZÁÉÍÑÓÚÜ]+$/i,
  'fa-IR': /^[ابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی]+$/i,
  'fr-FR': /^[A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ]+$/i,
  'it-IT': /^[A-ZÀÉÈÌÎÓÒÙ]+$/i,
  'nb-NO': /^[A-ZÆØÅ]+$/i,
  'nl-NL': /^[A-ZÁÉËÏÓÖÜÚ]+$/i,
  'nn-NO': /^[A-ZÆØÅ]+$/i,
  'hu-HU': /^[A-ZÁÉÍÓÖŐÚÜŰ]+$/i,
  'pl-PL': /^[A-ZĄĆĘŚŁŃÓŻŹ]+$/i,
  'pt-PT': /^[A-ZÃÁÀÂÄÇÉÊËÍÏÕÓÔÖÚÜ]+$/i,
  'ru-RU': /^[А-ЯЁ]+$/i,
  'sl-SI': /^[A-ZČĆĐŠŽ]+$/i,
  'sk-SK': /^[A-ZÁČĎÉÍŇÓŠŤÚÝŽĹŔĽÄÔ]+$/i,
  'sr-RS@latin': /^[A-ZČĆŽŠĐ]+$/i,
  'sr-RS': /^[А-ЯЂЈЉЊЋЏ]+$/i,
  'sv-SE': /^[A-ZÅÄÖ]+$/i,
  'th-TH': /^[ก-๐\s]+$/i,
  'tr-TR': /^[A-ZÇĞİıÖŞÜ]+$/i,
  'uk-UA': /^[А-ЩЬЮЯЄIЇҐі]+$/i,
  'vi-VN': /^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴĐÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸ]+$/i,
  'ku-IQ': /^[ئابپتجچحخدرڕزژسشعغفڤقکگلڵمنوۆھەیێيطؤثآإأكضصةظذ]+$/i,
  ar: /^[ءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىيًٌٍَُِّْٰ]+$/,
  he: /^[א-ת]+$/,
  fa: /^['آاءأؤئبپتثجچحخدذرزژسشصضطظعغفقکگلمنوهةی']+$/i
};
const alphanumeric = {
  'en-US': /^[0-9A-Z]+$/i,
  'az-AZ': /^[0-9A-VXYZÇƏĞİıÖŞÜ]+$/i,
  'bg-BG': /^[0-9А-Я]+$/i,
  'cs-CZ': /^[0-9A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]+$/i,
  'da-DK': /^[0-9A-ZÆØÅ]+$/i,
  'de-DE': /^[0-9A-ZÄÖÜß]+$/i,
  'el-GR': /^[0-9Α-ω]+$/i,
  'es-ES': /^[0-9A-ZÁÉÍÑÓÚÜ]+$/i,
  'fr-FR': /^[0-9A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ]+$/i,
  'it-IT': /^[0-9A-ZÀÉÈÌÎÓÒÙ]+$/i,
  'hu-HU': /^[0-9A-ZÁÉÍÓÖŐÚÜŰ]+$/i,
  'nb-NO': /^[0-9A-ZÆØÅ]+$/i,
  'nl-NL': /^[0-9A-ZÁÉËÏÓÖÜÚ]+$/i,
  'nn-NO': /^[0-9A-ZÆØÅ]+$/i,
  'pl-PL': /^[0-9A-ZĄĆĘŚŁŃÓŻŹ]+$/i,
  'pt-PT': /^[0-9A-ZÃÁÀÂÄÇÉÊËÍÏÕÓÔÖÚÜ]+$/i,
  'ru-RU': /^[0-9А-ЯЁ]+$/i,
  'sl-SI': /^[0-9A-ZČĆĐŠŽ]+$/i,
  'sk-SK': /^[0-9A-ZÁČĎÉÍŇÓŠŤÚÝŽĹŔĽÄÔ]+$/i,
  'sr-RS@latin': /^[0-9A-ZČĆŽŠĐ]+$/i,
  'sr-RS': /^[0-9А-ЯЂЈЉЊЋЏ]+$/i,
  'sv-SE': /^[0-9A-ZÅÄÖ]+$/i,
  'th-TH': /^[ก-๙\s]+$/i,
  'tr-TR': /^[0-9A-ZÇĞİıÖŞÜ]+$/i,
  'uk-UA': /^[0-9А-ЩЬЮЯЄIЇҐі]+$/i,
  'ku-IQ': /^[٠١٢٣٤٥٦٧٨٩0-9ئابپتجچحخدرڕزژسشعغفڤقکگلڵمنوۆھەیێيطؤثآإأكضصةظذ]+$/i,
  'vi-VN': /^[0-9A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴĐÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸ]+$/i,
  ar: /^[٠١٢٣٤٥٦٧٨٩0-9ءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىيًٌٍَُِّْٰ]+$/,
  he: /^[0-9א-ת]+$/,
  fa: /^['0-9آاءأؤئبپتثجچحخدذرزژسشصضطظعغفقکگلمنوهةی۱۲۳۴۵۶۷۸۹۰']+$/i
};
const decimal = {
  'en-US': '.',
  ar: '٫',
  fa: '٫'
};
const englishLocales = ['AU', 'GB', 'HK', 'IN', 'NZ', 'ZA', 'ZM'];

for (let locale, i = 0; i < englishLocales.length; i++) {
  locale = `en-${englishLocales[i]}`;
  alpha[locale] = alpha['en-US'];
  alphanumeric[locale] = alphanumeric['en-US'];
  decimal[locale] = decimal['en-US'];
} // Source: http://www.localeplanet.com/java/


const arabicLocales = ['AE', 'BH', 'DZ', 'EG', 'IQ', 'JO', 'KW', 'LB', 'LY', 'MA', 'QM', 'QA', 'SA', 'SD', 'SY', 'TN', 'YE'];

for (let locale, i = 0; i < arabicLocales.length; i++) {
  locale = `ar-${arabicLocales[i]}`;
  alpha[locale] = alpha.ar;
  alphanumeric[locale] = alphanumeric.ar;
  decimal[locale] = decimal.ar;
}

const farsiLocales = ['IR', 'AF'];

for (let locale, i = 0; i < farsiLocales.length; i++) {
  locale = `fa-${farsiLocales[i]}`;
  alpha[locale] = alpha.fa;
  alphanumeric[locale] = alphanumeric.fa;
  decimal[locale] = decimal.fa;
} // Source: https://en.wikipedia.org/wiki/Decimal_mark


const dotDecimal = ['ar-EG', 'ar-LB', 'ar-LY'];
const commaDecimal = ['bg-BG', 'cs-CZ', 'da-DK', 'de-DE', 'el-GR', 'en-ZM', 'es-ES', 'fr-FR', 'it-IT', 'ku-IQ', 'hu-HU', 'nb-NO', 'nn-NO', 'nl-NL', 'pl-PL', 'pt-PT', 'ru-RU', 'sl-SI', 'sr-RS@latin', 'sr-RS', 'sv-SE', 'tr-TR', 'uk-UA', 'vi-VN'];

for (let i = 0; i < dotDecimal.length; i++) {
  decimal[dotDecimal[i]] = decimal['en-US'];
}

for (let i = 0; i < commaDecimal.length; i++) {
  decimal[commaDecimal[i]] = ',';
} // see #1455


alpha['fa-IR'] = alpha['fa-IR'];
alpha['pt-BR'] = alpha['pt-PT'];
alphanumeric['pt-BR'] = alphanumeric['pt-PT'];
decimal['pt-BR'] = decimal['pt-PT']; // see #862

alpha['pl-Pl'] = alpha['pl-PL'];
alphanumeric['pl-Pl'] = alphanumeric['pl-PL'];
decimal['pl-Pl'] = decimal['pl-PL'];

function isFloat(str, options) {
  assertString(str);
  options = options || {};
  const float = new RegExp(`^(?:[-+])?(?:[0-9]+)?(?:\\${options.locale ? decimal[options.locale] : '.'}[0-9]*)?(?:[eE][\\+\\-]?(?:[0-9]+))?$`);

  if (str === '' || str === '.' || str === '-' || str === '+') {
    return false;
  }

  const value = parseFloat(str.replace(',', '.'));
  return float.test(str) && (!options.hasOwnProperty('min') || value >= options.min) && (!options.hasOwnProperty('max') || value <= options.max) && (!options.hasOwnProperty('lt') || value < options.lt) && (!options.hasOwnProperty('gt') || value > options.gt);
}
const locales = Object.keys(decimal);

function toFloat(str) {
  if (!isFloat(str)) return NaN;
  return parseFloat(str);
}

function toInt(str, radix) {
  assertString(str);
  return parseInt(str, radix || 10);
}

function toBoolean(str, strict) {
  assertString(str);

  if (strict) {
    return str === '1' || /^true$/i.test(str);
  }

  return str !== '0' && !/^false$/i.test(str) && str !== '';
}

function equals(str, comparison) {
  assertString(str);
  return str === comparison;
}

function toString$1(input) {
  if (typeof input === 'object' && input !== null) {
    if (typeof input.toString === 'function') {
      input = input.toString();
    } else {
      input = '[object Object]';
    }
  } else if (input === null || typeof input === 'undefined' || isNaN(input) && !input.length) {
    input = '';
  }

  return String(input);
}

function merge(obj = {}, defaults) {
  for (const key in defaults) {
    if (typeof obj[key] === 'undefined') {
      obj[key] = defaults[key];
    }
  }

  return obj;
}

const defaulContainsOptions = {
  ignoreCase: false
};
function contains(str, elem, options) {
  assertString(str);
  options = merge(options, defaulContainsOptions);
  return options.ignoreCase ? str.toLowerCase().indexOf(toString$1(elem).toLowerCase()) >= 0 : str.indexOf(toString$1(elem)) >= 0;
}

function matches(str, pattern, modifiers) {
  assertString(str);

  if (Object.prototype.toString.call(pattern) !== '[object RegExp]') {
    pattern = new RegExp(pattern, modifiers);
  }

  return pattern.test(str);
}

/* eslint-disable prefer-rest-params */

function isByteLength(str, options) {
  assertString(str);
  let min;
  let max;

  if (typeof options === 'object') {
    min = options.min || 0;
    max = options.max;
  } else {
    // backwards compatibility: isByteLength(str, min [, max])
    min = arguments[1];
    max = arguments[2];
  }

  const len = encodeURI(str).split(/%..|./).length - 1;
  return len >= min && (typeof max === 'undefined' || len <= max);
}

const default_fqdn_options = {
  require_tld: true,
  allow_underscores: false,
  allow_trailing_dot: false
};
function isFQDN(str, options) {
  assertString(str);
  options = merge(options, default_fqdn_options);
  /* Remove the optional trailing dot before checking validity */

  if (options.allow_trailing_dot && str[str.length - 1] === '.') {
    str = str.substring(0, str.length - 1);
  }

  const parts = str.split('.');

  for (let i = 0; i < parts.length; i++) {
    if (parts[i].length > 63) {
      return false;
    }
  }

  if (options.require_tld) {
    const tld = parts.pop();

    if (!parts.length || !/^([a-z\u00a1-\uffff]{2,}|xn[a-z0-9-]{2,})$/i.test(tld)) {
      return false;
    } // disallow spaces && special characers


    if (/[\s\u2002-\u200B\u202F\u205F\u3000\uFEFF\uDB40\uDC20\u00A9\uFFFD]/.test(tld)) {
      return false;
    }
  }

  for (let part, i = 0; i < parts.length; i++) {
    part = parts[i];

    if (options.allow_underscores) {
      part = part.replace(/_/g, '');
    }

    if (!/^[a-z\u00a1-\uffff0-9-]+$/i.test(part)) {
      return false;
    } // disallow full-width chars


    if (/[\uff01-\uff5e]/.test(part)) {
      return false;
    }

    if (part[0] === '-' || part[part.length - 1] === '-') {
      return false;
    }
  }

  return true;
}

/**
11.3.  Examples

   The following addresses

             fe80::1234 (on the 1st link of the node)
             ff02::5678 (on the 5th link of the node)
             ff08::9abc (on the 10th organization of the node)

   would be represented as follows:

             fe80::1234%1
             ff02::5678%5
             ff08::9abc%10

   (Here we assume a natural translation from a zone index to the
   <zone_id> part, where the Nth zone of any scope is translated into
   "N".)

   If we use interface names as <zone_id>, those addresses could also be
   represented as follows:

            fe80::1234%ne0
            ff02::5678%pvc1.3
            ff08::9abc%interface10

   where the interface "ne0" belongs to the 1st link, "pvc1.3" belongs
   to the 5th link, and "interface10" belongs to the 10th organization.
 * * */

const ipv4Maybe = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
const ipv6Block = /^[0-9A-F]{1,4}$/i;
function isIP(str, version = '') {
  assertString(str);
  version = String(version);

  if (!version) {
    return isIP(str, 4) || isIP(str, 6);
  } else if (version === '4') {
    if (!ipv4Maybe.test(str)) {
      return false;
    }

    const parts = str.split('.').sort((a, b) => a - b);
    return parts[3] <= 255;
  } else if (version === '6') {
    let addressAndZone = [str]; // ipv6 addresses could have scoped architecture
    // according to https://tools.ietf.org/html/rfc4007#section-11

    if (str.includes('%')) {
      addressAndZone = str.split('%');

      if (addressAndZone.length !== 2) {
        // it must be just two parts
        return false;
      }

      if (!addressAndZone[0].includes(':')) {
        // the first part must be the address
        return false;
      }

      if (addressAndZone[1] === '') {
        // the second part must not be empty
        return false;
      }
    }

    const blocks = addressAndZone[0].split(':');
    let foundOmissionBlock = false; // marker to indicate ::
    // At least some OS accept the last 32 bits of an IPv6 address
    // (i.e. 2 of the blocks) in IPv4 notation, and RFC 3493 says
    // that '::ffff:a.b.c.d' is valid for IPv4-mapped IPv6 addresses,
    // and '::a.b.c.d' is deprecated, but also valid.

    const foundIPv4TransitionBlock = isIP(blocks[blocks.length - 1], 4);
    const expectedNumberOfBlocks = foundIPv4TransitionBlock ? 7 : 8;

    if (blocks.length > expectedNumberOfBlocks) {
      return false;
    } // initial or final ::


    if (str === '::') {
      return true;
    } else if (str.substr(0, 2) === '::') {
      blocks.shift();
      blocks.shift();
      foundOmissionBlock = true;
    } else if (str.substr(str.length - 2) === '::') {
      blocks.pop();
      blocks.pop();
      foundOmissionBlock = true;
    }

    for (let i = 0; i < blocks.length; ++i) {
      // test for a :: which can not be at the string start/end
      // since those cases have been handled above
      if (blocks[i] === '' && i > 0 && i < blocks.length - 1) {
        if (foundOmissionBlock) {
          return false; // multiple :: in address
        }

        foundOmissionBlock = true;
      } else if (foundIPv4TransitionBlock && i === blocks.length - 1) ; else if (!ipv6Block.test(blocks[i])) {
        return false;
      }
    }

    if (foundOmissionBlock) {
      return blocks.length >= 1;
    }

    return blocks.length === expectedNumberOfBlocks;
  }

  return false;
}

const default_email_options = {
  allow_display_name: false,
  require_display_name: false,
  allow_utf8_local_part: true,
  require_tld: true,
  ignoreMax_length: false
};
/* eslint-disable max-len */

/* eslint-disable no-control-regex */

const splitNameAddress = /^([^\x00-\x1F\x7F-\x9F\cX]+)<(.+)>$/i;
const emailUserPart = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~]+$/i;
const gmailUserPart = /^[a-z\d]+$/;
const quotedEmailUser = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f]))*$/i;
const emailUserUtf8Part = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+$/i;
const quotedEmailUserUtf8 = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*$/i;
const defaultMaxEmailLength = 254;
/* eslint-enable max-len */

/* eslint-enable no-control-regex */

/**
 * Validate display name according to the RFC2822: https://tools.ietf.org/html/rfc2822#appendix-A.1.2
 * @param {String} display_name
 */

function validateDisplayName(display_name) {
  const trim_quotes = display_name.match(/^"(.+)"$/i);
  const display_name_without_quotes = trim_quotes ? trim_quotes[1] : display_name; // display name with only spaces is not valid

  if (!display_name_without_quotes.trim()) {
    return false;
  } // check whether display name contains illegal character


  const contains_illegal = /[\.";<>]/.test(display_name_without_quotes);

  if (contains_illegal) {
    // if contains illegal characters,
    // must to be enclosed in double-quotes, otherwise it's not a valid display name
    if (!trim_quotes) {
      return false;
    } // the quotes in display name must start with character symbol \


    const all_start_with_back_slash = display_name_without_quotes.split('"').length === display_name_without_quotes.split('\\"').length;

    if (!all_start_with_back_slash) {
      return false;
    }
  }

  return true;
}

function isEmail(str, options) {
  assertString(str);
  options = merge(options, default_email_options);

  if (options.require_display_name || options.allow_display_name) {
    const display_email = str.match(splitNameAddress);

    if (display_email) {
      let display_name;
      [, display_name, str] = display_email; // sometimes need to trim the last space to get the display name
      // because there may be a space between display name and email address
      // eg. myname <address@gmail.com>
      // the display name is `myname` instead of `myname `, so need to trim the last space

      if (display_name.endsWith(' ')) {
        display_name = display_name.substr(0, display_name.length - 1);
      }

      if (!validateDisplayName(display_name)) {
        return false;
      }
    } else if (options.require_display_name) {
      return false;
    }
  }

  if (!options.ignoreMax_length && str.length > defaultMaxEmailLength) {
    return false;
  }

  const parts = str.split('@');
  const domain = parts.pop();
  let user = parts.join('@');
  const lower_domain = domain.toLowerCase();

  if (options.domain_specific_validation && (lower_domain === 'gmail.com' || lower_domain === 'googlemail.com')) {
    /*
      Previously we removed dots for gmail addresses before validating.
      This was removed because it allows `multiple..dots@gmail.com`
      to be reported as valid, but it is not.
      Gmail only normalizes single dots, removing them from here is pointless,
      should be done in normalizeEmail
    */
    user = user.toLowerCase(); // Removing sub-address from username before gmail validation

    const username = user.split('+')[0]; // Dots are not included in gmail length restriction

    if (!isByteLength(username.replace('.', ''), {
      min: 6,
      max: 30
    })) {
      return false;
    }

    const user_parts = username.split('.');

    for (let i = 0; i < user_parts.length; i++) {
      if (!gmailUserPart.test(user_parts[i])) {
        return false;
      }
    }
  }

  if (options.ignoreMax_length === false && (!isByteLength(user, {
    max: 64
  }) || !isByteLength(domain, {
    max: 254
  }))) {
    return false;
  }

  if (!isFQDN(domain, {
    require_tld: options.require_tld
  })) {
    if (!options.allow_ip_domain) {
      return false;
    }

    if (!isIP(domain)) {
      if (!domain.startsWith('[') || !domain.endsWith(']')) {
        return false;
      }

      let noBracketdomain = domain.substr(1, domain.length - 2);

      if (noBracketdomain.length === 0 || !isIP(noBracketdomain)) {
        return false;
      }
    }
  }

  if (user[0] === '"') {
    user = user.slice(1, user.length - 1);
    return options.allow_utf8_local_part ? quotedEmailUserUtf8.test(user) : quotedEmailUser.test(user);
  }

  const pattern = options.allow_utf8_local_part ? emailUserUtf8Part : emailUserPart;
  const user_parts = user.split('.');

  for (let i = 0; i < user_parts.length; i++) {
    if (!pattern.test(user_parts[i])) {
      return false;
    }
  }

  return true;
}

/*
options for isURL method

require_protocol - if set as true isURL will return false if protocol is not present in the URL
require_valid_protocol - isURL will check if the URL's protocol is present in the protocols option
protocols - valid protocols can be modified with this option
require_host - if set as false isURL will not check if host is present in the URL
require_port - if set as true isURL will check if port is present in the URL
allow_protocol_relative_urls - if set as true protocol relative URLs will be allowed
validate_length - if set as false isURL will skip string length validation (IE maximum is 2083)

*/

const default_url_options = {
  protocols: ['http', 'https', 'ftp'],
  require_tld: true,
  require_protocol: false,
  require_host: true,
  require_port: false,
  require_valid_protocol: true,
  allow_underscores: false,
  allow_trailing_dot: false,
  allow_protocol_relative_urls: false,
  validate_length: true
};
const wrapped_ipv6 = /^\[([^\]]+)\](?::([0-9]+))?$/;

function isRegExp(obj) {
  return Object.prototype.toString.call(obj) === '[object RegExp]';
}

function checkHost(host, matches) {
  for (let i = 0; i < matches.length; i++) {
    let match = matches[i];

    if (host === match || isRegExp(match) && match.test(host)) {
      return true;
    }
  }

  return false;
}

function isURL(url, options) {
  assertString(url);

  if (!url || /[\s<>]/.test(url)) {
    return false;
  }

  if (url.indexOf('mailto:') === 0) {
    return false;
  }

  options = merge(options, default_url_options);

  if (options.validate_length && url.length >= 2083) {
    return false;
  }

  let protocol, auth, host, hostname, port, port_str, split, ipv6;
  split = url.split('#');
  url = split.shift();
  split = url.split('?');
  url = split.shift();
  split = url.split('://');

  if (split.length > 1) {
    protocol = split.shift().toLowerCase();

    if (options.require_valid_protocol && options.protocols.indexOf(protocol) === -1) {
      return false;
    }
  } else if (options.require_protocol) {
    return false;
  } else if (url.substr(0, 2) === '//') {
    if (!options.allow_protocol_relative_urls) {
      return false;
    }

    split[0] = url.substr(2);
  }

  url = split.join('://');

  if (url === '') {
    return false;
  }

  split = url.split('/');
  url = split.shift();

  if (url === '' && !options.require_host) {
    return true;
  }

  split = url.split('@');

  if (split.length > 1) {
    if (options.disallow_auth) {
      return false;
    }

    auth = split.shift();

    if (auth.indexOf(':') === -1 || auth.indexOf(':') >= 0 && auth.split(':').length > 2) {
      return false;
    }
  }

  hostname = split.join('@');
  port_str = null;
  ipv6 = null;
  const ipv6_match = hostname.match(wrapped_ipv6);

  if (ipv6_match) {
    host = '';
    ipv6 = ipv6_match[1];
    port_str = ipv6_match[2] || null;
  } else {
    split = hostname.split(':');
    host = split.shift();

    if (split.length) {
      port_str = split.join(':');
    }
  }

  if (port_str !== null) {
    port = parseInt(port_str, 10);

    if (!/^[0-9]+$/.test(port_str) || port <= 0 || port > 65535) {
      return false;
    }
  } else if (options.require_port) {
    return false;
  }

  if (!isIP(host) && !isFQDN(host, options) && (!ipv6 || !isIP(ipv6, 6))) {
    return false;
  }

  host = host || ipv6;

  if (options.host_whitelist && !checkHost(host, options.host_whitelist)) {
    return false;
  }

  if (options.host_blacklist && checkHost(host, options.host_blacklist)) {
    return false;
  }

  return true;
}

const macAddress = /^([0-9a-fA-F][0-9a-fA-F]:){5}([0-9a-fA-F][0-9a-fA-F])$/;
const macAddressNoColons = /^([0-9a-fA-F]){12}$/;
const macAddressWithHyphen = /^([0-9a-fA-F][0-9a-fA-F]-){5}([0-9a-fA-F][0-9a-fA-F])$/;
const macAddressWithSpaces = /^([0-9a-fA-F][0-9a-fA-F]\s){5}([0-9a-fA-F][0-9a-fA-F])$/;
const macAddressWithDots = /^([0-9a-fA-F]{4}).([0-9a-fA-F]{4}).([0-9a-fA-F]{4})$/;
function isMACAddress(str, options) {
  assertString(str);

  if (options && options.no_colons) {
    return macAddressNoColons.test(str);
  }

  return macAddress.test(str) || macAddressWithHyphen.test(str) || macAddressWithSpaces.test(str) || macAddressWithDots.test(str);
}

const subnetMaybe = /^\d{1,2}$/;
function isIPRange(str) {
  assertString(str);
  const parts = str.split('/'); // parts[0] -> ip, parts[1] -> subnet

  if (parts.length !== 2) {
    return false;
  }

  if (!subnetMaybe.test(parts[1])) {
    return false;
  } // Disallow preceding 0 i.e. 01, 02, ...


  if (parts[1].length > 1 && parts[1].startsWith('0')) {
    return false;
  }

  return isIP(parts[0], 4) && parts[1] <= 32 && parts[1] >= 0;
}

const default_date_options = {
  format: 'YYYY/MM/DD',
  delimiters: ['/', '-'],
  strictMode: false
};

function isValidFormat(format) {
  return /(^(y{4}|y{2})[\/-](m{1,2})[\/-](d{1,2})$)|(^(m{1,2})[\/-](d{1,2})[\/-]((y{4}|y{2})$))|(^(d{1,2})[\/-](m{1,2})[\/-]((y{4}|y{2})$))/gi.test(format);
}

function zip(date, format) {
  const zippedArr = [],
        len = Math.min(date.length, format.length);

  for (let i = 0; i < len; i++) {
    zippedArr.push([date[i], format[i]]);
  }

  return zippedArr;
}

function isDate(input, options) {
  if (typeof options === 'string') {
    // Allow backward compatbility for old format isDate(input [, format])
    options = merge({
      format: options
    }, default_date_options);
  } else {
    options = merge(options, default_date_options);
  }

  if (typeof input === 'string' && isValidFormat(options.format)) {
    const formatDelimiter = options.delimiters.find(delimiter => options.format.indexOf(delimiter) !== -1);
    const dateDelimiter = options.strictMode ? formatDelimiter : options.delimiters.find(delimiter => input.indexOf(delimiter) !== -1);
    const dateAndFormat = zip(input.split(dateDelimiter), options.format.toLowerCase().split(formatDelimiter));
    const dateObj = {};

    for (const [dateWord, formatWord] of dateAndFormat) {
      if (dateWord.length !== formatWord.length) {
        return false;
      }

      dateObj[formatWord.charAt(0)] = dateWord;
    }

    return new Date(`${dateObj.m}/${dateObj.d}/${dateObj.y}`).getDate() === +dateObj.d;
  }

  if (!options.strictMode) {
    return Object.prototype.toString.call(input) === '[object Date]' && isFinite(input);
  }

  return false;
}

function isBoolean(str) {
  assertString(str);
  return ['true', 'false', '1', '0'].indexOf(str) >= 0;
}

const localeReg = /^[A-z]{2,4}([_-]([A-z]{4}|[\d]{3}))?([_-]([A-z]{2}|[\d]{3}))?$/;
function isLocale(str) {
  assertString(str);

  if (str === 'en_US_POSIX' || str === 'ca_ES_VALENCIA') {
    return true;
  }

  return localeReg.test(str);
}

function isAlpha(str, locale = 'en-US') {
  assertString(str);

  if (locale in alpha) {
    return alpha[locale].test(str);
  }

  throw new Error(`Invalid locale '${locale}'`);
}
const locales$1 = Object.keys(alpha);

function isAlphanumeric(str, locale = 'en-US') {
  assertString(str);

  if (locale in alphanumeric) {
    return alphanumeric[locale].test(str);
  }

  throw new Error(`Invalid locale '${locale}'`);
}
const locales$2 = Object.keys(alphanumeric);

const numericNoSymbols = /^[0-9]+$/;
function isNumeric(str, options) {
  assertString(str);

  if (options && options.no_symbols) {
    return numericNoSymbols.test(str);
  }

  return new RegExp(`^[+-]?([0-9]*[${(options || {}).locale ? decimal[options.locale] : '.'}])?[0-9]+$`).test(str);
}

/**
 * Reference:
 * https://en.wikipedia.org/ -- Wikipedia
 * https://docs.microsoft.com/en-us/microsoft-365/compliance/eu-passport-number -- EU Passport Number
 * https://countrycode.org/ -- Country Codes
 */

const passportRegexByCountryCode = {
  AM: /^[A-Z]{2}\d{7}$/,
  AR: /^[A-Z]{3}\d{6}$/,
  AT: /^[A-Z]\d{7}$/,
  AU: /^[A-Z]\d{7}$/,
  BE: /^[A-Z]{2}\d{6}$/,
  BG: /^\d{9}$/,
  BY: /^[A-Z]{2}\d{7}$/,
  CA: /^[A-Z]{2}\d{6}$/,
  CH: /^[A-Z]\d{7}$/,
  CN: /^[GE]\d{8}$/,
  CY: /^[A-Z](\d{6}|\d{8})$/,
  CZ: /^\d{8}$/,
  DE: /^[CFGHJKLMNPRTVWXYZ0-9]{9}$/,
  DK: /^\d{9}$/,
  DZ: /^\d{9}$/,
  EE: /^([A-Z]\d{7}|[A-Z]{2}\d{7})$/,
  ES: /^[A-Z0-9]{2}([A-Z0-9]?)\d{6}$/,
  FI: /^[A-Z]{2}\d{7}$/,
  FR: /^\d{2}[A-Z]{2}\d{5}$/,
  GB: /^\d{9}$/,
  GR: /^[A-Z]{2}\d{7}$/,
  HR: /^\d{9}$/,
  HU: /^[A-Z]{2}(\d{6}|\d{7})$/,
  IE: /^[A-Z0-9]{2}\d{7}$/,
  IN: /^[A-Z]{1}-?\d{7}$/,
  IS: /^(A)\d{7}$/,
  IT: /^[A-Z0-9]{2}\d{7}$/,
  JP: /^[A-Z]{2}\d{7}$/,
  KR: /^[MS]\d{8}$/,
  LT: /^[A-Z0-9]{8}$/,
  LU: /^[A-Z0-9]{8}$/,
  LV: /^[A-Z0-9]{2}\d{7}$/,
  MT: /^\d{7}$/,
  NL: /^[A-Z]{2}[A-Z0-9]{6}\d$/,
  PO: /^[A-Z]{2}\d{7}$/,
  PT: /^[A-Z]\d{6}$/,
  RO: /^\d{8,9}$/,
  RU: /^\d{2}\d{2}\d{6}$/,
  SE: /^\d{8}$/,
  SL: /^(P)[A-Z]\d{7}$/,
  SK: /^[0-9A-Z]\d{7}$/,
  TR: /^[A-Z]\d{8}$/,
  UA: /^[A-Z]{2}\d{6}$/,
  US: /^\d{9}$/ // UNITED STATES

};
/**
 * Check if str is a valid passport number
 * relative to provided ISO Country Code.
 *
 * @param {string} str
 * @param {string} countryCode
 * @return {boolean}
 */

function isPassportNumber(str, countryCode) {
  assertString(str);
  /** Remove All Whitespaces, Convert to UPPERCASE */

  const normalizedStr = str.replace(/\s/g, '').toUpperCase();
  return countryCode.toUpperCase() in passportRegexByCountryCode && passportRegexByCountryCode[countryCode].test(normalizedStr);
}

const int = /^(?:[-+]?(?:0|[1-9][0-9]*))$/;
const intLeadingZeroes = /^[-+]?[0-9]+$/;
function isInt(str, options) {
  assertString(str);
  options = options || {}; // Get the regex to use for testing, based on whether
  // leading zeroes are allowed or not.

  let regex = options.hasOwnProperty('allow_leading_zeroes') && !options.allow_leading_zeroes ? int : intLeadingZeroes; // Check min/max/lt/gt

  let minCheckPassed = !options.hasOwnProperty('min') || str >= options.min;
  let maxCheckPassed = !options.hasOwnProperty('max') || str <= options.max;
  let ltCheckPassed = !options.hasOwnProperty('lt') || str < options.lt;
  let gtCheckPassed = !options.hasOwnProperty('gt') || str > options.gt;
  return regex.test(str) && minCheckPassed && maxCheckPassed && ltCheckPassed && gtCheckPassed;
}

function isPort(str) {
  return isInt(str, {
    min: 0,
    max: 65535
  });
}

function isLowercase(str) {
  assertString(str);
  return str === str.toLowerCase();
}

function isUppercase(str) {
  assertString(str);
  return str === str.toUpperCase();
}

let imeiRegexWithoutHypens = /^[0-9]{15}$/;
let imeiRegexWithHypens = /^\d{2}-\d{6}-\d{6}-\d{1}$/;
function isIMEI(str, options) {
  assertString(str);
  options = options || {}; // default regex for checking imei is the one without hyphens

  let imeiRegex = imeiRegexWithoutHypens;

  if (options.allow_hyphens) {
    imeiRegex = imeiRegexWithHypens;
  }

  if (!imeiRegex.test(str)) {
    return false;
  }

  str = str.replace(/-/g, '');
  let sum = 0,
      mul = 2,
      l = 14;

  for (let i = 0; i < l; i++) {
    const digit = str.substring(l - i - 1, l - i);
    const tp = parseInt(digit, 10) * mul;

    if (tp >= 10) {
      sum += tp % 10 + 1;
    } else {
      sum += tp;
    }

    if (mul === 1) {
      mul += 1;
    } else {
      mul -= 1;
    }
  }

  const chk = (10 - sum % 10) % 10;

  if (chk !== parseInt(str.substring(14, 15), 10)) {
    return false;
  }

  return true;
}

/* eslint-disable no-control-regex */

const ascii = /^[\x00-\x7F]+$/;
/* eslint-enable no-control-regex */

function isAscii(str) {
  assertString(str);
  return ascii.test(str);
}

const fullWidth = /[^\u0020-\u007E\uFF61-\uFF9F\uFFA0-\uFFDC\uFFE8-\uFFEE0-9a-zA-Z]/;
function isFullWidth(str) {
  assertString(str);
  return fullWidth.test(str);
}

const halfWidth = /[\u0020-\u007E\uFF61-\uFF9F\uFFA0-\uFFDC\uFFE8-\uFFEE0-9a-zA-Z]/;
function isHalfWidth(str) {
  assertString(str);
  return halfWidth.test(str);
}

function isVariableWidth(str) {
  assertString(str);
  return fullWidth.test(str) && halfWidth.test(str);
}

/* eslint-disable no-control-regex */

const multibyte = /[^\x00-\x7F]/;
/* eslint-enable no-control-regex */

function isMultibyte(str) {
  assertString(str);
  return multibyte.test(str);
}

/**
 * Build RegExp object from an array
 * of multiple/multi-line regexp parts
 *
 * @param {string[]} parts
 * @param {string} flags
 * @return {object} - RegExp object
 */
function multilineRegexp(parts, flags) {
  const regexpAsStringLiteral = parts.join('');
  return new RegExp(regexpAsStringLiteral, flags);
}

/**
 * Regular Expression to match
 * semantic versioning (SemVer)
 * built from multi-line, multi-parts regexp
 * Reference: https://semver.org/
 */

const semanticVersioningRegex = multilineRegexp(['^(0|[1-9]\\d*)\\.(0|[1-9]\\d*)\\.(0|[1-9]\\d*)', '(?:-((?:0|[1-9]\\d*|\\d*[a-z-][0-9a-z-]*)(?:\\.(?:0|[1-9]\\d*|\\d*[a-z-][0-9a-z-]*))*))', '?(?:\\+([0-9a-z-]+(?:\\.[0-9a-z-]+)*))?$'], 'i');
function isSemVer(str) {
  assertString(str);
  return semanticVersioningRegex.test(str);
}

const surrogatePair = /[\uD800-\uDBFF][\uDC00-\uDFFF]/;
function isSurrogatePair(str) {
  assertString(str);
  return surrogatePair.test(str);
}

const includes = (arr, val) => arr.some(arrVal => val === arrVal);

function decimalRegExp(options) {
  const regExp = new RegExp(`^[-+]?([0-9]+)?(\\${decimal[options.locale]}[0-9]{${options.decimal_digits}})${options.force_decimal ? '' : '?'}$`);
  return regExp;
}

const default_decimal_options = {
  force_decimal: false,
  decimal_digits: '1,',
  locale: 'en-US'
};
const blacklist = ['', '-', '+'];
function isDecimal(str, options) {
  assertString(str);
  options = merge(options, default_decimal_options);

  if (options.locale in decimal) {
    return !includes(blacklist, str.replace(/ /g, '')) && decimalRegExp(options).test(str);
  }

  throw new Error(`Invalid locale '${options.locale}'`);
}

const hexadecimal = /^(0x|0h)?[0-9A-F]+$/i;
function isHexadecimal(str) {
  assertString(str);
  return hexadecimal.test(str);
}

const octal = /^(0o)?[0-7]+$/i;
function isOctal(str) {
  assertString(str);
  return octal.test(str);
}

function isDivisibleBy(str, num) {
  assertString(str);
  return toFloat(str) % parseInt(num, 10) === 0;
}

const hexcolor = /^#?([0-9A-F]{3}|[0-9A-F]{4}|[0-9A-F]{6}|[0-9A-F]{8})$/i;
function isHexColor(str) {
  assertString(str);
  return hexcolor.test(str);
}

const rgbColor = /^rgb\((([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]),){2}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\)$/;
const rgbaColor = /^rgba\((([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]),){3}(0?\.\d|1(\.0)?|0(\.0)?)\)$/;
const rgbColorPercent = /^rgb\((([0-9]%|[1-9][0-9]%|100%),){2}([0-9]%|[1-9][0-9]%|100%)\)/;
const rgbaColorPercent = /^rgba\((([0-9]%|[1-9][0-9]%|100%),){3}(0?\.\d|1(\.0)?|0(\.0)?)\)/;
function isRgbColor(str, includePercentValues = true) {
  assertString(str);

  if (!includePercentValues) {
    return rgbColor.test(str) || rgbaColor.test(str);
  }

  return rgbColor.test(str) || rgbaColor.test(str) || rgbColorPercent.test(str) || rgbaColorPercent.test(str);
}

const hslcomma = /^(hsl)a?\(\s*((\+|\-)?([0-9]+(\.[0-9]+)?(e(\+|\-)?[0-9]+)?|\.[0-9]+(e(\+|\-)?[0-9]+)?))(deg|grad|rad|turn|\s*)(\s*,\s*(\+|\-)?([0-9]+(\.[0-9]+)?(e(\+|\-)?[0-9]+)?|\.[0-9]+(e(\+|\-)?[0-9]+)?)%){2}\s*(,\s*((\+|\-)?([0-9]+(\.[0-9]+)?(e(\+|\-)?[0-9]+)?|\.[0-9]+(e(\+|\-)?[0-9]+)?)%?)\s*)?\)$/i;
const hslspace = /^(hsl)a?\(\s*((\+|\-)?([0-9]+(\.[0-9]+)?(e(\+|\-)?[0-9]+)?|\.[0-9]+(e(\+|\-)?[0-9]+)?))(deg|grad|rad|turn|\s)(\s*(\+|\-)?([0-9]+(\.[0-9]+)?(e(\+|\-)?[0-9]+)?|\.[0-9]+(e(\+|\-)?[0-9]+)?)%){2}\s*(\/\s*((\+|\-)?([0-9]+(\.[0-9]+)?(e(\+|\-)?[0-9]+)?|\.[0-9]+(e(\+|\-)?[0-9]+)?)%?)\s*)?\)$/i;
function isHSL(str) {
  assertString(str);
  return hslcomma.test(str) || hslspace.test(str);
}

const isrc = /^[A-Z]{2}[0-9A-Z]{3}\d{2}\d{5}$/;
function isISRC(str) {
  assertString(str);
  return isrc.test(str);
}

/**
 * List of country codes with
 * corresponding IBAN regular expression
 * Reference: https://en.wikipedia.org/wiki/International_Bank_Account_Number
 */

const ibanRegexThroughCountryCode = {
  AD: /^(AD[0-9]{2})\d{8}[A-Z0-9]{12}$/,
  AE: /^(AE[0-9]{2})\d{3}\d{16}$/,
  AL: /^(AL[0-9]{2})\d{8}[A-Z0-9]{16}$/,
  AT: /^(AT[0-9]{2})\d{16}$/,
  AZ: /^(AZ[0-9]{2})[A-Z0-9]{4}\d{20}$/,
  BA: /^(BA[0-9]{2})\d{16}$/,
  BE: /^(BE[0-9]{2})\d{12}$/,
  BG: /^(BG[0-9]{2})[A-Z]{4}\d{6}[A-Z0-9]{8}$/,
  BH: /^(BH[0-9]{2})[A-Z]{4}[A-Z0-9]{14}$/,
  BR: /^(BR[0-9]{2})\d{23}[A-Z]{1}[A-Z0-9]{1}$/,
  BY: /^(BY[0-9]{2})[A-Z0-9]{4}\d{20}$/,
  CH: /^(CH[0-9]{2})\d{5}[A-Z0-9]{12}$/,
  CR: /^(CR[0-9]{2})\d{18}$/,
  CY: /^(CY[0-9]{2})\d{8}[A-Z0-9]{16}$/,
  CZ: /^(CZ[0-9]{2})\d{20}$/,
  DE: /^(DE[0-9]{2})\d{18}$/,
  DK: /^(DK[0-9]{2})\d{14}$/,
  DO: /^(DO[0-9]{2})[A-Z]{4}\d{20}$/,
  EE: /^(EE[0-9]{2})\d{16}$/,
  EG: /^(EG[0-9]{2})\d{25}$/,
  ES: /^(ES[0-9]{2})\d{20}$/,
  FI: /^(FI[0-9]{2})\d{14}$/,
  FO: /^(FO[0-9]{2})\d{14}$/,
  FR: /^(FR[0-9]{2})\d{10}[A-Z0-9]{11}\d{2}$/,
  GB: /^(GB[0-9]{2})[A-Z]{4}\d{14}$/,
  GE: /^(GE[0-9]{2})[A-Z0-9]{2}\d{16}$/,
  GI: /^(GI[0-9]{2})[A-Z]{4}[A-Z0-9]{15}$/,
  GL: /^(GL[0-9]{2})\d{14}$/,
  GR: /^(GR[0-9]{2})\d{7}[A-Z0-9]{16}$/,
  GT: /^(GT[0-9]{2})[A-Z0-9]{4}[A-Z0-9]{20}$/,
  HR: /^(HR[0-9]{2})\d{17}$/,
  HU: /^(HU[0-9]{2})\d{24}$/,
  IE: /^(IE[0-9]{2})[A-Z0-9]{4}\d{14}$/,
  IL: /^(IL[0-9]{2})\d{19}$/,
  IQ: /^(IQ[0-9]{2})[A-Z]{4}\d{15}$/,
  IR: /^(IR[0-9]{2})0\d{2}0\d{18}$/,
  IS: /^(IS[0-9]{2})\d{22}$/,
  IT: /^(IT[0-9]{2})[A-Z]{1}\d{10}[A-Z0-9]{12}$/,
  JO: /^(JO[0-9]{2})[A-Z]{4}\d{22}$/,
  KW: /^(KW[0-9]{2})[A-Z]{4}[A-Z0-9]{22}$/,
  KZ: /^(KZ[0-9]{2})\d{3}[A-Z0-9]{13}$/,
  LB: /^(LB[0-9]{2})\d{4}[A-Z0-9]{20}$/,
  LC: /^(LC[0-9]{2})[A-Z]{4}[A-Z0-9]{24}$/,
  LI: /^(LI[0-9]{2})\d{5}[A-Z0-9]{12}$/,
  LT: /^(LT[0-9]{2})\d{16}$/,
  LU: /^(LU[0-9]{2})\d{3}[A-Z0-9]{13}$/,
  LV: /^(LV[0-9]{2})[A-Z]{4}[A-Z0-9]{13}$/,
  MC: /^(MC[0-9]{2})\d{10}[A-Z0-9]{11}\d{2}$/,
  MD: /^(MD[0-9]{2})[A-Z0-9]{20}$/,
  ME: /^(ME[0-9]{2})\d{18}$/,
  MK: /^(MK[0-9]{2})\d{3}[A-Z0-9]{10}\d{2}$/,
  MR: /^(MR[0-9]{2})\d{23}$/,
  MT: /^(MT[0-9]{2})[A-Z]{4}\d{5}[A-Z0-9]{18}$/,
  MU: /^(MU[0-9]{2})[A-Z]{4}\d{19}[A-Z]{3}$/,
  NL: /^(NL[0-9]{2})[A-Z]{4}\d{10}$/,
  NO: /^(NO[0-9]{2})\d{11}$/,
  PK: /^(PK[0-9]{2})[A-Z0-9]{4}\d{16}$/,
  PL: /^(PL[0-9]{2})\d{24}$/,
  PS: /^(PS[0-9]{2})[A-Z0-9]{4}\d{21}$/,
  PT: /^(PT[0-9]{2})\d{21}$/,
  QA: /^(QA[0-9]{2})[A-Z]{4}[A-Z0-9]{21}$/,
  RO: /^(RO[0-9]{2})[A-Z]{4}[A-Z0-9]{16}$/,
  RS: /^(RS[0-9]{2})\d{18}$/,
  SA: /^(SA[0-9]{2})\d{2}[A-Z0-9]{18}$/,
  SC: /^(SC[0-9]{2})[A-Z]{4}\d{20}[A-Z]{3}$/,
  SE: /^(SE[0-9]{2})\d{20}$/,
  SI: /^(SI[0-9]{2})\d{15}$/,
  SK: /^(SK[0-9]{2})\d{20}$/,
  SM: /^(SM[0-9]{2})[A-Z]{1}\d{10}[A-Z0-9]{12}$/,
  SV: /^(SV[0-9]{2})[A-Z0-9]{4}\d{20}$/,
  TL: /^(TL[0-9]{2})\d{19}$/,
  TN: /^(TN[0-9]{2})\d{20}$/,
  TR: /^(TR[0-9]{2})\d{5}[A-Z0-9]{17}$/,
  UA: /^(UA[0-9]{2})\d{6}[A-Z0-9]{19}$/,
  VA: /^(VA[0-9]{2})\d{18}$/,
  VG: /^(VG[0-9]{2})[A-Z0-9]{4}\d{16}$/,
  XK: /^(XK[0-9]{2})\d{16}$/
};
/**
 * Check whether string has correct universal IBAN format
 * The IBAN consists of up to 34 alphanumeric characters, as follows:
 * Country Code using ISO 3166-1 alpha-2, two letters
 * check digits, two digits and
 * Basic Bank Account Number (BBAN), up to 30 alphanumeric characters.
 * NOTE: Permitted IBAN characters are: digits [0-9] and the 26 latin alphabetic [A-Z]
 *
 * @param {string} str - string under validation
 * @return {boolean}
 */

function hasValidIbanFormat(str) {
  // Strip white spaces and hyphens
  const strippedStr = str.replace(/[\s\-]+/gi, '').toUpperCase();
  const isoCountryCode = strippedStr.slice(0, 2).toUpperCase();
  return isoCountryCode in ibanRegexThroughCountryCode && ibanRegexThroughCountryCode[isoCountryCode].test(strippedStr);
}
/**
   * Check whether string has valid IBAN Checksum
   * by performing basic mod-97 operation and
   * the remainder should equal 1
   * -- Start by rearranging the IBAN by moving the four initial characters to the end of the string
   * -- Replace each letter in the string with two digits, A -> 10, B = 11, Z = 35
   * -- Interpret the string as a decimal integer and
   * -- compute the remainder on division by 97 (mod 97)
   * Reference: https://en.wikipedia.org/wiki/International_Bank_Account_Number
   *
   * @param {string} str
   * @return {boolean}
   */


function hasValidIbanChecksum(str) {
  const strippedStr = str.replace(/[^A-Z0-9]+/gi, '').toUpperCase(); // Keep only digits and A-Z latin alphabetic

  const rearranged = strippedStr.slice(4) + strippedStr.slice(0, 4);
  const alphaCapsReplacedWithDigits = rearranged.replace(/[A-Z]/g, char => char.charCodeAt(0) - 55);
  const remainder = alphaCapsReplacedWithDigits.match(/\d{1,7}/g).reduce((acc, value) => Number(acc + value) % 97, '');
  return remainder === 1;
}

function isIBAN(str) {
  assertString(str);
  return hasValidIbanFormat(str) && hasValidIbanChecksum(str);
}

const isBICReg = /^[A-z]{4}[A-z]{2}\w{2}(\w{3})?$/;
function isBIC(str) {
  assertString(str);
  return isBICReg.test(str);
}

const md5 = /^[a-f0-9]{32}$/;
function isMD5(str) {
  assertString(str);
  return md5.test(str);
}

const lengths = {
  md5: 32,
  md4: 32,
  sha1: 40,
  sha256: 64,
  sha384: 96,
  sha512: 128,
  ripemd128: 32,
  ripemd160: 40,
  tiger128: 32,
  tiger160: 40,
  tiger192: 48,
  crc32: 8,
  crc32b: 8
};
function isHash(str, algorithm) {
  assertString(str);
  const hash = new RegExp(`^[a-fA-F0-9]{${lengths[algorithm]}}$`);
  return hash.test(str);
}

const notBase64 = /[^A-Z0-9+\/=]/i;
const urlSafeBase64 = /^[A-Z0-9_\-]*$/i;
const defaultBase64Options = {
  urlSafe: false
};
function isBase64(str, options) {
  assertString(str);
  options = merge(options, defaultBase64Options);
  const len = str.length;

  if (options.urlSafe) {
    return urlSafeBase64.test(str);
  }

  if (len % 4 !== 0 || notBase64.test(str)) {
    return false;
  }

  const firstPaddingChar = str.indexOf('=');
  return firstPaddingChar === -1 || firstPaddingChar === len - 1 || firstPaddingChar === len - 2 && str[len - 1] === '=';
}

function isJWT(str) {
  assertString(str);
  const dotSplit = str.split('.');
  const len = dotSplit.length;

  if (len > 3 || len < 2) {
    return false;
  }

  return dotSplit.reduce((acc, currElem) => acc && isBase64(currElem, {
    urlSafe: true
  }), true);
}

const default_json_options = {
  allow_primitives: false
};
function isJSON(str, options) {
  assertString(str);

  try {
    options = merge(options, default_json_options);
    let primitives = [];

    if (options.allow_primitives) {
      primitives = [null, false, true];
    }

    const obj = JSON.parse(str);
    return primitives.includes(obj) || !!obj && typeof obj === 'object';
  } catch (e) {
    /* ignore */
  }

  return false;
}

const default_is_empty_options = {
  ignore_whitespace: false
};
function isEmpty(str, options) {
  assertString(str);
  options = merge(options, default_is_empty_options);
  return (options.ignore_whitespace ? str.trim().length : str.length) === 0;
}

/* eslint-disable prefer-rest-params */

function isLength(str, options) {
  assertString(str);
  let min;
  let max;

  if (typeof options === 'object') {
    min = options.min || 0;
    max = options.max;
  } else {
    // backwards compatibility: isLength(str, min [, max])
    min = arguments[1] || 0;
    max = arguments[2];
  }

  const surrogatePairs = str.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g) || [];
  const len = str.length - surrogatePairs.length;
  return len >= min && (typeof max === 'undefined' || len <= max);
}

const uuid = {
  3: /^[0-9A-F]{8}-[0-9A-F]{4}-3[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
  4: /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
  5: /^[0-9A-F]{8}-[0-9A-F]{4}-5[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
  all: /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i
};
function isUUID(str, version = 'all') {
  assertString(str);
  const pattern = uuid[version];
  return pattern && pattern.test(str);
}

function isMongoId(str) {
  assertString(str);
  return isHexadecimal(str) && str.length === 24;
}

function isAfter(str, date = String(new Date())) {
  assertString(str);
  const comparison = toDate(date);
  const original = toDate(str);
  return !!(original && comparison && original > comparison);
}

function isBefore(str, date = String(new Date())) {
  assertString(str);
  const comparison = toDate(date);
  const original = toDate(str);
  return !!(original && comparison && original < comparison);
}

function isIn(str, options) {
  assertString(str);
  let i;

  if (Object.prototype.toString.call(options) === '[object Array]') {
    const array = [];

    for (i in options) {
      // https://github.com/gotwarlost/istanbul/blob/master/ignoring-code-for-coverage.md#ignoring-code-for-coverage-purposes
      // istanbul ignore else
      if ({}.hasOwnProperty.call(options, i)) {
        array[i] = toString$1(options[i]);
      }
    }

    return array.indexOf(str) >= 0;
  } else if (typeof options === 'object') {
    return options.hasOwnProperty(str);
  } else if (options && typeof options.indexOf === 'function') {
    return options.indexOf(str) >= 0;
  }

  return false;
}

/* eslint-disable max-len */

const creditCard = /^(?:4[0-9]{12}(?:[0-9]{3,6})?|5[1-5][0-9]{14}|(222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}|6(?:011|5[0-9][0-9])[0-9]{12,15}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11}|6[27][0-9]{14})$/;
/* eslint-enable max-len */

function isCreditCard(str) {
  assertString(str);
  const sanitized = str.replace(/[- ]+/g, '');

  if (!creditCard.test(sanitized)) {
    return false;
  }

  let sum = 0;
  let digit;
  let tmpNum;
  let shouldDouble;

  for (let i = sanitized.length - 1; i >= 0; i--) {
    digit = sanitized.substring(i, i + 1);
    tmpNum = parseInt(digit, 10);

    if (shouldDouble) {
      tmpNum *= 2;

      if (tmpNum >= 10) {
        sum += tmpNum % 10 + 1;
      } else {
        sum += tmpNum;
      }
    } else {
      sum += tmpNum;
    }

    shouldDouble = !shouldDouble;
  }

  return !!(sum % 10 === 0 ? sanitized : false);
}

const validators = {
  ES: str => {
    assertString(str);
    const DNI = /^[0-9X-Z][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKE]$/;
    const charsValue = {
      X: 0,
      Y: 1,
      Z: 2
    };
    const controlDigits = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E']; // sanitize user input

    const sanitized = str.trim().toUpperCase(); // validate the data structure

    if (!DNI.test(sanitized)) {
      return false;
    } // validate the control digit


    const number = sanitized.slice(0, -1).replace(/[X,Y,Z]/g, char => charsValue[char]);
    return sanitized.endsWith(controlDigits[number % 23]);
  },
  IN: str => {
    const DNI = /^[1-9]\d{3}\s?\d{4}\s?\d{4}$/; // multiplication table

    const d = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 0, 6, 7, 8, 9, 5], [2, 3, 4, 0, 1, 7, 8, 9, 5, 6], [3, 4, 0, 1, 2, 8, 9, 5, 6, 7], [4, 0, 1, 2, 3, 9, 5, 6, 7, 8], [5, 9, 8, 7, 6, 0, 4, 3, 2, 1], [6, 5, 9, 8, 7, 1, 0, 4, 3, 2], [7, 6, 5, 9, 8, 2, 1, 0, 4, 3], [8, 7, 6, 5, 9, 3, 2, 1, 0, 4], [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]]; // permutation table

    const p = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 5, 7, 6, 2, 8, 3, 0, 9, 4], [5, 8, 0, 3, 7, 9, 6, 1, 4, 2], [8, 9, 1, 6, 0, 4, 3, 5, 2, 7], [9, 4, 5, 3, 1, 2, 6, 8, 7, 0], [4, 2, 8, 6, 5, 7, 3, 9, 0, 1], [2, 7, 9, 3, 8, 0, 6, 4, 1, 5], [7, 0, 4, 6, 9, 1, 3, 2, 5, 8]]; // sanitize user input

    const sanitized = str.trim(); // validate the data structure

    if (!DNI.test(sanitized)) {
      return false;
    }

    let c = 0;
    let invertedArray = sanitized.replace(/\s/g, '').split('').map(Number).reverse();
    invertedArray.forEach((val, i) => {
      c = d[c][p[i % 8][val]];
    });
    return c === 0;
  },
  IT: function IT(str) {
    if (str.length !== 9) return false;
    if (str === 'CA00000AA') return false; // https://it.wikipedia.org/wiki/Carta_d%27identit%C3%A0_elettronica_italiana

    return str.search(/C[A-Z]\d{5}[A-Z]{2}/is) > -1;
  },
  NO: str => {
    const sanitized = str.trim();
    if (isNaN(Number(sanitized))) return false;
    if (sanitized.length !== 11) return false;
    if (sanitized === '00000000000') return false; // https://no.wikipedia.org/wiki/F%C3%B8dselsnummer

    const f = sanitized.split('').map(Number);
    let k1 = (11 - (3 * f[0] + 7 * f[1] + 6 * f[2] + 1 * f[3] + 8 * f[4] + 9 * f[5] + 4 * f[6] + 5 * f[7] + 2 * f[8]) % 11) % 11;
    let k2 = (11 - (5 * f[0] + 4 * f[1] + 3 * f[2] + 2 * f[3] + 7 * f[4] + 6 * f[5] + 5 * f[6] + 4 * f[7] + 3 * f[8] + 2 * k1) % 11) % 11;
    if (k1 !== f[9] || k2 !== f[10]) return false;
    return true;
  },
  'he-IL': str => {
    const DNI = /^\d{9}$/; // sanitize user input

    const sanitized = str.trim(); // validate the data structure

    if (!DNI.test(sanitized)) {
      return false;
    }

    const id = sanitized;
    let sum = 0,
        incNum;

    for (let i = 0; i < id.length; i++) {
      incNum = Number(id[i]) * (i % 2 + 1); // Multiply number by 1 or 2

      sum += incNum > 9 ? incNum - 9 : incNum; // Sum the digits up and add to total
    }

    return sum % 10 === 0;
  },
  'ar-TN': str => {
    const DNI = /^\d{8}$/; // sanitize user input

    const sanitized = str.trim(); // validate the data structure

    if (!DNI.test(sanitized)) {
      return false;
    }

    return true;
  },
  'zh-CN': str => {
    const provincesAndCities = ['11', '12', '13', '14', '15', '21', '22', '23', '31', '32', '33', '34', '35', '36', '37', '41', '42', '43', '44', '45', '46', '50', '51', '52', '53', '54', '61', '62', '63', '64', '65', '71', '81', '82', '91' // 国外
    ];
    const powers = ['7', '9', '10', '5', '8', '4', '2', '1', '6', '3', '7', '9', '10', '5', '8', '4', '2'];
    const parityBit = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];

    const checkAddressCode = addressCode => provincesAndCities.includes(addressCode);

    const checkBirthDayCode = birDayCode => {
      const yyyy = parseInt(birDayCode.substring(0, 4), 10);
      const mm = parseInt(birDayCode.substring(4, 6), 10);
      const dd = parseInt(birDayCode.substring(6), 10);
      const xdata = new Date(yyyy, mm - 1, dd);

      if (xdata > new Date()) {
        return false; // eslint-disable-next-line max-len
      } else if (xdata.getFullYear() === yyyy && xdata.getMonth() === mm - 1 && xdata.getDate() === dd) {
        return true;
      }

      return false;
    };

    const getParityBit = idCardNo => {
      let id17 = idCardNo.substring(0, 17);
      let power = 0;

      for (let i = 0; i < 17; i++) {
        power += parseInt(id17.charAt(i), 10) * parseInt(powers[i], 10);
      }

      let mod = power % 11;
      return parityBit[mod];
    };

    const checkParityBit = idCardNo => getParityBit(idCardNo) === idCardNo.charAt(17).toUpperCase();

    const check15IdCardNo = idCardNo => {
      let check = /^[1-9]\d{7}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}$/.test(idCardNo);
      if (!check) return false;
      let addressCode = idCardNo.substring(0, 2);
      check = checkAddressCode(addressCode);
      if (!check) return false;
      let birDayCode = `19${idCardNo.substring(6, 12)}`;
      check = checkBirthDayCode(birDayCode);
      if (!check) return false;
      return true;
    };

    const check18IdCardNo = idCardNo => {
      let check = /^[1-9]\d{5}[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}(\d|x|X)$/.test(idCardNo);
      if (!check) return false;
      let addressCode = idCardNo.substring(0, 2);
      check = checkAddressCode(addressCode);
      if (!check) return false;
      let birDayCode = idCardNo.substring(6, 14);
      check = checkBirthDayCode(birDayCode);
      if (!check) return false;
      return checkParityBit(idCardNo);
    };

    const checkIdCardNo = idCardNo => {
      let check = /^\d{15}|(\d{17}(\d|x|X))$/.test(idCardNo);
      if (!check) return false;

      if (idCardNo.length === 15) {
        return check15IdCardNo(idCardNo);
      }

      return check18IdCardNo(idCardNo);
    };

    return checkIdCardNo(str);
  },
  'zh-TW': str => {
    const ALPHABET_CODES = {
      A: 10,
      B: 11,
      C: 12,
      D: 13,
      E: 14,
      F: 15,
      G: 16,
      H: 17,
      I: 34,
      J: 18,
      K: 19,
      L: 20,
      M: 21,
      N: 22,
      O: 35,
      P: 23,
      Q: 24,
      R: 25,
      S: 26,
      T: 27,
      U: 28,
      V: 29,
      W: 32,
      X: 30,
      Y: 31,
      Z: 33
    };
    const sanitized = str.trim().toUpperCase();
    if (!/^[A-Z][0-9]{9}$/.test(sanitized)) return false;
    return Array.from(sanitized).reduce((sum, number, index) => {
      if (index === 0) {
        const code = ALPHABET_CODES[number];
        return code % 10 * 9 + Math.floor(code / 10);
      }

      if (index === 9) {
        return (10 - sum % 10 - Number(number)) % 10 === 0;
      }

      return sum + Number(number) * (9 - index);
    }, 0);
  }
};
function isIdentityCard(str, locale) {
  assertString(str);

  if (locale in validators) {
    return validators[locale](str);
  } else if (locale === 'any') {
    for (const key in validators) {
      // https://github.com/gotwarlost/istanbul/blob/master/ignoring-code-for-coverage.md#ignoring-code-for-coverage-purposes
      // istanbul ignore else
      if (validators.hasOwnProperty(key)) {
        const validator = validators[key];

        if (validator(str)) {
          return true;
        }
      }
    }

    return false;
  }

  throw new Error(`Invalid locale '${locale}'`);
}

/**
 * The most commonly used EAN standard is
 * the thirteen-digit EAN-13, while the
 * less commonly used 8-digit EAN-8 barcode was
 * introduced for use on small packages.
 * EAN consists of:
 * GS1 prefix, manufacturer code, product code and check digit
 * Reference: https://en.wikipedia.org/wiki/International_Article_Number
 */
/**
 * Define EAN Lenghts; 8 for EAN-8; 13 for EAN-13
 * and Regular Expression for valid EANs (EAN-8, EAN-13),
 * with exact numberic matching of 8 or 13 digits [0-9]
 */

const LENGTH_EAN_8 = 8;
const validEanRegex = /^(\d{8}|\d{13})$/;
/**
 * Get position weight given:
 * EAN length and digit index/position
 *
 * @param {number} length
 * @param {number} index
 * @return {number}
 */

function getPositionWeightThroughLengthAndIndex(length, index) {
  if (length === LENGTH_EAN_8) {
    return index % 2 === 0 ? 3 : 1;
  }

  return index % 2 === 0 ? 1 : 3;
}
/**
 * Calculate EAN Check Digit
 * Reference: https://en.wikipedia.org/wiki/International_Article_Number#Calculation_of_checksum_digit
 *
 * @param {string} ean
 * @return {number}
 */


function calculateCheckDigit(ean) {
  const checksum = ean.slice(0, -1).split('').map((char, index) => Number(char) * getPositionWeightThroughLengthAndIndex(ean.length, index)).reduce((acc, partialSum) => acc + partialSum, 0);
  const remainder = 10 - checksum % 10;
  return remainder < 10 ? remainder : 0;
}
/**
 * Check if string is valid EAN:
 * Matches EAN-8/EAN-13 regex
 * Has valid check digit.
 *
 * @param {string} str
 * @return {boolean}
 */


function isEAN(str) {
  assertString(str);
  const actualCheckDigit = Number(str.slice(-1));
  return validEanRegex.test(str) && actualCheckDigit === calculateCheckDigit(str);
}

const isin = /^[A-Z]{2}[0-9A-Z]{9}[0-9]$/;
function isISIN(str) {
  assertString(str);

  if (!isin.test(str)) {
    return false;
  }

  const checksumStr = str.replace(/[A-Z]/g, character => parseInt(character, 36));
  let sum = 0;
  let digit;
  let tmpNum;
  let shouldDouble = true;

  for (let i = checksumStr.length - 2; i >= 0; i--) {
    digit = checksumStr.substring(i, i + 1);
    tmpNum = parseInt(digit, 10);

    if (shouldDouble) {
      tmpNum *= 2;

      if (tmpNum >= 10) {
        sum += tmpNum + 1;
      } else {
        sum += tmpNum;
      }
    } else {
      sum += tmpNum;
    }

    shouldDouble = !shouldDouble;
  }

  return parseInt(str.substr(str.length - 1), 10) === (10000 - sum) % 10;
}

const isbn10Maybe = /^(?:[0-9]{9}X|[0-9]{10})$/;
const isbn13Maybe = /^(?:[0-9]{13})$/;
const factor = [1, 3];
function isISBN(str, version = '') {
  assertString(str);
  version = String(version);

  if (!version) {
    return isISBN(str, 10) || isISBN(str, 13);
  }

  const sanitized = str.replace(/[\s-]+/g, '');
  let checksum = 0;
  let i;

  if (version === '10') {
    if (!isbn10Maybe.test(sanitized)) {
      return false;
    }

    for (i = 0; i < 9; i++) {
      checksum += (i + 1) * sanitized.charAt(i);
    }

    if (sanitized.charAt(9) === 'X') {
      checksum += 10 * 10;
    } else {
      checksum += 10 * sanitized.charAt(9);
    }

    if (checksum % 11 === 0) {
      return !!sanitized;
    }
  } else if (version === '13') {
    if (!isbn13Maybe.test(sanitized)) {
      return false;
    }

    for (i = 0; i < 12; i++) {
      checksum += factor[i % 2] * sanitized.charAt(i);
    }

    if (sanitized.charAt(12) - (10 - checksum % 10) % 10 === 0) {
      return !!sanitized;
    }
  }

  return false;
}

const issn = '^\\d{4}-?\\d{3}[\\dX]$';
function isISSN(str, options = {}) {
  assertString(str);
  let testIssn = issn;
  testIssn = options.require_hyphen ? testIssn.replace('?', '') : testIssn;
  testIssn = options.case_sensitive ? new RegExp(testIssn) : new RegExp(testIssn, 'i');

  if (!testIssn.test(str)) {
    return false;
  }

  const digits = str.replace('-', '').toUpperCase();
  let checksum = 0;

  for (let i = 0; i < digits.length; i++) {
    const digit = digits[i];
    checksum += (digit === 'X' ? 10 : +digit) * (8 - i);
  }

  return checksum % 11 === 0;
}

/**
 * en-US TIN Validation
 *
 * An Employer Identification Number (EIN), also known as a Federal Tax Identification Number,
 *  is used to identify a business entity.
 *
 * NOTES:
 *  - Prefix 47 is being reserved for future use
 *  - Prefixes 26, 27, 45, 46 and 47 were previously assigned by the Philadelphia campus.
 *
 * See `http://www.irs.gov/Businesses/Small-Businesses-&-Self-Employed/How-EINs-are-Assigned-and-Valid-EIN-Prefixes`
 * for more information.
 */
// Valid US IRS campus prefixes

const enUsCampusPrefix = {
  andover: ['10', '12'],
  atlanta: ['60', '67'],
  austin: ['50', '53'],
  brookhaven: ['01', '02', '03', '04', '05', '06', '11', '13', '14', '16', '21', '22', '23', '25', '34', '51', '52', '54', '55', '56', '57', '58', '59', '65'],
  cincinnati: ['30', '32', '35', '36', '37', '38', '61'],
  fresno: ['15', '24'],
  internet: ['20', '26', '27', '45', '46', '47'],
  kansas: ['40', '44'],
  memphis: ['94', '95'],
  ogden: ['80', '90'],
  philadelphia: ['33', '39', '41', '42', '43', '46', '48', '62', '63', '64', '66', '68', '71', '72', '73', '74', '75', '76', '77', '81', '82', '83', '84', '85', '86', '87', '88', '91', '92', '93', '98', '99'],
  sba: ['31']
}; // Return an array of all US IRS campus prefixes

function enUsGetPrefixes() {
  const prefixes = [];

  for (const location in enUsCampusPrefix) {
    // https://github.com/gotwarlost/istanbul/blob/master/ignoring-code-for-coverage.md#ignoring-code-for-coverage-purposes
    // istanbul ignore else
    if (enUsCampusPrefix.hasOwnProperty(location)) {
      prefixes.push(...enUsCampusPrefix[location]);
    }
  }

  return prefixes;
}
/*
 * en-US validation function
 * Verify that the TIN starts with a valid IRS campus prefix
 */


function enUsCheck(tin) {
  return enUsGetPrefixes().indexOf(tin.substr(0, 2)) !== -1;
} // tax id regex formats for various locales


const taxIdFormat = {
  'en-US': /^\d{2}[- ]{0,1}\d{7}$/
}; // Algorithmic tax id check functions for various locales

const taxIdCheck = {
  'en-US': enUsCheck
};
/*
 * Validator function
 * Return true if the passed string is a valid tax identification number
 * for the specified locale.
 * Throw an error exception if the locale is not supported.
 */

function isTaxID(str, locale = 'en-US') {
  assertString(str);

  if (locale in taxIdFormat) {
    if (!taxIdFormat[locale].test(str)) {
      return false;
    }

    if (locale in taxIdCheck) {
      return taxIdCheck[locale](str);
    } // Fallthrough; not all locales have algorithmic checks


    return true;
  }

  throw new Error(`Invalid locale '${locale}'`);
}

/* eslint-disable max-len */

const phones = {
  'am-AM': /^(\+?374|0)((10|[9|7][0-9])\d{6}$|[2-4]\d{7}$)/,
  'ar-AE': /^((\+?971)|0)?5[024568]\d{7}$/,
  'ar-BH': /^(\+?973)?(3|6)\d{7}$/,
  'ar-DZ': /^(\+?213|0)(5|6|7)\d{8}$/,
  'ar-LB': /^(\+?961)?((3|81)\d{6}|7\d{7})$/,
  'ar-EG': /^((\+?20)|0)?1[0125]\d{8}$/,
  'ar-IQ': /^(\+?964|0)?7[0-9]\d{8}$/,
  'ar-JO': /^(\+?962|0)?7[789]\d{7}$/,
  'ar-KW': /^(\+?965)[569]\d{7}$/,
  'ar-LY': /^((\+?218)|0)?(9[1-6]\d{7}|[1-8]\d{7,9})$/,
  'ar-SA': /^(!?(\+?966)|0)?5\d{8}$/,
  'ar-SY': /^(!?(\+?963)|0)?9\d{8}$/,
  'ar-TN': /^(\+?216)?[2459]\d{7}$/,
  'az-AZ': /^(\+994|0)(5[015]|7[07]|99)\d{7}$/,
  'bs-BA': /^((((\+|00)3876)|06))((([0-3]|[5-6])\d{6})|(4\d{7}))$/,
  'be-BY': /^(\+?375)?(24|25|29|33|44)\d{7}$/,
  'bg-BG': /^(\+?359|0)?8[789]\d{7}$/,
  'bn-BD': /^(\+?880|0)1[13456789][0-9]{8}$/,
  'ca-AD': /^(\+376)?[346]\d{5}$/,
  'cs-CZ': /^(\+?420)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/,
  'da-DK': /^(\+?45)?\s?\d{2}\s?\d{2}\s?\d{2}\s?\d{2}$/,
  'de-DE': /^(\+49)?0?[1|3]([0|5][0-45-9]\d|6([23]|0\d?)|7([0-57-9]|6\d))\d{7}$/,
  'de-AT': /^(\+43|0)\d{1,4}\d{3,12}$/,
  'de-CH': /^(\+41|0)(7[5-9])\d{1,7}$/,
  'de-LU': /^(\+352)?((6\d1)\d{6})$/,
  'el-GR': /^(\+?30|0)?(69\d{8})$/,
  'en-AU': /^(\+?61|0)4\d{8}$/,
  'en-GB': /^(\+?44|0)7\d{9}$/,
  'en-GG': /^(\+?44|0)1481\d{6}$/,
  'en-GH': /^(\+233|0)(20|50|24|54|27|57|26|56|23|28)\d{7}$/,
  'en-HK': /^(\+?852[-\s]?)?[456789]\d{3}[-\s]?\d{4}$/,
  'en-MO': /^(\+?853[-\s]?)?[6]\d{3}[-\s]?\d{4}$/,
  'en-IE': /^(\+?353|0)8[356789]\d{7}$/,
  'en-IN': /^(\+?91|0)?[6789]\d{9}$/,
  'en-KE': /^(\+?254|0)(7|1)\d{8}$/,
  'en-MT': /^(\+?356|0)?(99|79|77|21|27|22|25)[0-9]{6}$/,
  'en-MU': /^(\+?230|0)?\d{8}$/,
  'en-NG': /^(\+?234|0)?[789]\d{9}$/,
  'en-NZ': /^(\+?64|0)[28]\d{7,9}$/,
  'en-PK': /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/,
  'en-PH': /^(09|\+639)\d{9}$/,
  'en-RW': /^(\+?250|0)?[7]\d{8}$/,
  'en-SG': /^(\+65)?[689]\d{7}$/,
  'en-SL': /^(?:0|94|\+94)?(7(0|1|2|5|6|7|8)( |-)?\d)\d{6}$/,
  'en-TZ': /^(\+?255|0)?[67]\d{8}$/,
  'en-UG': /^(\+?256|0)?[7]\d{8}$/,
  'en-US': /^((\+1|1)?( |-)?)?(\([2-9][0-9]{2}\)|[2-9][0-9]{2})( |-)?([2-9][0-9]{2}( |-)?[0-9]{4})$/,
  'en-ZA': /^(\+?27|0)\d{9}$/,
  'en-ZM': /^(\+?26)?09[567]\d{7}$/,
  'en-ZW': /^(\+263)[0-9]{9}$/,
  'es-AR': /^\+?549(11|[2368]\d)\d{8}$/,
  'es-BO': /^(\+?591)?(6|7)\d{7}$/,
  'es-CO': /^(\+?57)?([1-8]{1}|3[0-9]{2})?[2-9]{1}\d{6}$/,
  'es-CL': /^(\+?56|0)[2-9]\d{1}\d{7}$/,
  'es-CR': /^(\+506)?[2-8]\d{7}$/,
  'es-DO': /^(\+?1)?8[024]9\d{7}$/,
  'es-HN': /^(\+?504)?[9|8]\d{7}$/,
  'es-EC': /^(\+?593|0)([2-7]|9[2-9])\d{7}$/,
  'es-ES': /^(\+?34)?[6|7]\d{8}$/,
  'es-PE': /^(\+?51)?9\d{8}$/,
  'es-MX': /^(\+?52)?(1|01)?\d{10,11}$/,
  'es-PA': /^(\+?507)\d{7,8}$/,
  'es-PY': /^(\+?595|0)9[9876]\d{7}$/,
  'es-UY': /^(\+598|0)9[1-9][\d]{6}$/,
  'et-EE': /^(\+?372)?\s?(5|8[1-4])\s?([0-9]\s?){6,7}$/,
  'fa-IR': /^(\+?98[\-\s]?|0)9[0-39]\d[\-\s]?\d{3}[\-\s]?\d{4}$/,
  'fi-FI': /^(\+?358|0)\s?(4(0|1|2|4|5|6)?|50)\s?(\d\s?){4,8}\d$/,
  'fj-FJ': /^(\+?679)?\s?\d{3}\s?\d{4}$/,
  'fo-FO': /^(\+?298)?\s?\d{2}\s?\d{2}\s?\d{2}$/,
  'fr-FR': /^(\+?33|0)[67]\d{8}$/,
  'fr-GF': /^(\+?594|0|00594)[67]\d{8}$/,
  'fr-GP': /^(\+?590|0|00590)[67]\d{8}$/,
  'fr-MQ': /^(\+?596|0|00596)[67]\d{8}$/,
  'fr-RE': /^(\+?262|0|00262)[67]\d{8}$/,
  'he-IL': /^(\+972|0)([23489]|5[012345689]|77)[1-9]\d{6}$/,
  'hu-HU': /^(\+?36)(20|30|70)\d{7}$/,
  'id-ID': /^(\+?62|0)8(1[123456789]|2[1238]|3[1238]|5[12356789]|7[78]|9[56789]|8[123456789])([\s?|\d]{5,11})$/,
  'it-IT': /^(\+?39)?\s?3\d{2} ?\d{6,7}$/,
  'it-SM': /^((\+378)|(0549)|(\+390549)|(\+3780549))?6\d{5,9}$/,
  'ja-JP': /^(\+81[ \-]?(\(0\))?|0)[6789]0[ \-]?\d{4}[ \-]?\d{4}$/,
  'ka-GE': /^(\+?995)?(5|79)\d{7}$/,
  'kk-KZ': /^(\+?7|8)?7\d{9}$/,
  'kl-GL': /^(\+?299)?\s?\d{2}\s?\d{2}\s?\d{2}$/,
  'ko-KR': /^((\+?82)[ \-]?)?0?1([0|1|6|7|8|9]{1})[ \-]?\d{3,4}[ \-]?\d{4}$/,
  'lt-LT': /^(\+370|8)\d{8}$/,
  'ms-MY': /^(\+?6?01){1}(([0145]{1}(\-|\s)?\d{7,8})|([236789]{1}(\s|\-)?\d{7}))$/,
  'nb-NO': /^(\+?47)?[49]\d{7}$/,
  'ne-NP': /^(\+?977)?9[78]\d{8}$/,
  'nl-BE': /^(\+?32|0)4?\d{8}$/,
  'nl-NL': /^(((\+|00)?31\(0\))|((\+|00)?31)|0)6{1}\d{8}$/,
  'nn-NO': /^(\+?47)?[49]\d{7}$/,
  'pl-PL': /^(\+?48)? ?[5-8]\d ?\d{3} ?\d{2} ?\d{2}$/,
  'pt-BR': /^((\+?55\ ?[1-9]{2}\ ?)|(\+?55\ ?\([1-9]{2}\)\ ?)|(0[1-9]{2}\ ?)|(\([1-9]{2}\)\ ?)|([1-9]{2}\ ?))((\d{4}\-?\d{4})|(9[2-9]{1}\d{3}\-?\d{4}))$/,
  'pt-PT': /^(\+?351)?9[1236]\d{7}$/,
  'ro-RO': /^(\+?4?0)\s?7\d{2}(\/|\s|\.|\-)?\d{3}(\s|\.|\-)?\d{3}$/,
  'ru-RU': /^(\+?7|8)?9\d{9}$/,
  'sl-SI': /^(\+386\s?|0)(\d{1}\s?\d{3}\s?\d{2}\s?\d{2}|\d{2}\s?\d{3}\s?\d{3})$/,
  'sk-SK': /^(\+?421)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/,
  'sq-AL': /^(\+355|0)6[789]\d{6}$/,
  'sr-RS': /^(\+3816|06)[- \d]{5,9}$/,
  'sv-SE': /^(\+?46|0)[\s\-]?7[\s\-]?[02369]([\s\-]?\d){7}$/,
  'th-TH': /^(\+66|66|0)\d{9}$/,
  'tr-TR': /^(\+?90|0)?5\d{9}$/,
  'uk-UA': /^(\+?38|8)?0\d{9}$/,
  'uz-UZ': /^(\+?998)?(6[125-79]|7[1-69]|88|9\d)\d{7}$/,
  'vi-VN': /^(\+?84|0)((3([2-9]))|(5([2689]))|(7([0|6-9]))|(8([1-6|89]))|(9([0-9])))([0-9]{7})$/,
  'zh-CN': /^((\+|00)86)?1([3568][0-9]|4[579]|6[67]|7[01235678]|9[012356789])[0-9]{8}$/,
  'zh-TW': /^(\+?886\-?|0)?9\d{8}$/
};
/* eslint-enable max-len */
// aliases

phones['en-CA'] = phones['en-US'];
phones['fr-BE'] = phones['nl-BE'];
phones['zh-HK'] = phones['en-HK'];
phones['zh-MO'] = phones['en-MO'];
phones['ga-IE'] = phones['en-IE'];
function isMobilePhone(str, locale, options) {
  assertString(str);

  if (options && options.strictMode && !str.startsWith('+')) {
    return false;
  }

  if (Array.isArray(locale)) {
    return locale.some(key => {
      // https://github.com/gotwarlost/istanbul/blob/master/ignoring-code-for-coverage.md#ignoring-code-for-coverage-purposes
      // istanbul ignore else
      if (phones.hasOwnProperty(key)) {
        const phone = phones[key];

        if (phone.test(str)) {
          return true;
        }
      }

      return false;
    });
  } else if (locale in phones) {
    return phones[locale].test(str); // alias falsey locale as 'any'
  } else if (!locale || locale === 'any') {
    for (const key in phones) {
      // istanbul ignore else
      if (phones.hasOwnProperty(key)) {
        const phone = phones[key];

        if (phone.test(str)) {
          return true;
        }
      }
    }

    return false;
  }

  throw new Error(`Invalid locale '${locale}'`);
}
const locales$3 = Object.keys(phones);

const eth = /^(0x)[0-9a-f]{40}$/i;
function isEthereumAddress(str) {
  assertString(str);
  return eth.test(str);
}

function currencyRegex(options) {
  let decimal_digits = `\\d{${options.digits_after_decimal[0]}}`;
  options.digits_after_decimal.forEach((digit, index) => {
    if (index !== 0) decimal_digits = `${decimal_digits}|\\d{${digit}}`;
  });
  const symbol = `(${options.symbol.replace(/\W/, m => `\\${m}`)})${options.require_symbol ? '' : '?'}`,
        negative = '-?',
        whole_dollar_amount_without_sep = '[1-9]\\d*',
        whole_dollar_amount_with_sep = `[1-9]\\d{0,2}(\\${options.thousands_separator}\\d{3})*`,
        valid_whole_dollar_amounts = ['0', whole_dollar_amount_without_sep, whole_dollar_amount_with_sep],
        whole_dollar_amount = `(${valid_whole_dollar_amounts.join('|')})?`,
        decimal_amount = `(\\${options.decimal_separator}(${decimal_digits}))${options.require_decimal ? '' : '?'}`;
  let pattern = whole_dollar_amount + (options.allow_decimal || options.require_decimal ? decimal_amount : ''); // default is negative sign before symbol, but there are two other options (besides parens)

  if (options.allow_negatives && !options.parens_for_negatives) {
    if (options.negative_sign_after_digits) {
      pattern += negative;
    } else if (options.negative_sign_before_digits) {
      pattern = negative + pattern;
    }
  } // South African Rand, for example, uses R 123 (space) and R-123 (no space)


  if (options.allow_negative_sign_placeholder) {
    pattern = `( (?!\\-))?${pattern}`;
  } else if (options.allow_space_after_symbol) {
    pattern = ` ?${pattern}`;
  } else if (options.allow_space_after_digits) {
    pattern += '( (?!$))?';
  }

  if (options.symbol_after_digits) {
    pattern += symbol;
  } else {
    pattern = symbol + pattern;
  }

  if (options.allow_negatives) {
    if (options.parens_for_negatives) {
      pattern = `(\\(${pattern}\\)|${pattern})`;
    } else if (!(options.negative_sign_before_digits || options.negative_sign_after_digits)) {
      pattern = negative + pattern;
    }
  } // ensure there's a dollar and/or decimal amount, and that
  // it doesn't start with a space or a negative sign followed by a space


  return new RegExp(`^(?!-? )(?=.*\\d)${pattern}$`);
}

const default_currency_options = {
  symbol: '$',
  require_symbol: false,
  allow_space_after_symbol: false,
  symbol_after_digits: false,
  allow_negatives: true,
  parens_for_negatives: false,
  negative_sign_before_digits: false,
  negative_sign_after_digits: false,
  allow_negative_sign_placeholder: false,
  thousands_separator: ',',
  decimal_separator: '.',
  allow_decimal: true,
  require_decimal: false,
  digits_after_decimal: [2],
  allow_space_after_digits: false
};
function isCurrency(str, options) {
  assertString(str);
  options = merge(options, default_currency_options);
  return currencyRegex(options).test(str);
}

const btc = /^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}$/;
function isBtcAddress(str) {
  assertString(str);
  return btc.test(str);
}

/* eslint-disable max-len */
// from http://goo.gl/0ejHHW

const iso8601 = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-3])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;
/* eslint-enable max-len */

const isValidDate = str => {
  // str must have passed the ISO8601 check
  // this check is meant to catch invalid dates
  // like 2009-02-31
  // first check for ordinal dates
  const ordinalMatch = str.match(/^(\d{4})-?(\d{3})([ T]{1}\.*|$)/);

  if (ordinalMatch) {
    const oYear = Number(ordinalMatch[1]);
    const oDay = Number(ordinalMatch[2]); // if is leap year

    if (oYear % 4 === 0 && oYear % 100 !== 0 || oYear % 400 === 0) return oDay <= 366;
    return oDay <= 365;
  }

  const match = str.match(/(\d{4})-?(\d{0,2})-?(\d*)/).map(Number);
  const year = match[1];
  const month = match[2];
  const day = match[3];
  const monthString = month ? `0${month}`.slice(-2) : month;
  const dayString = day ? `0${day}`.slice(-2) : day; // create a date object and compare

  const d = new Date(`${year}-${monthString || '01'}-${dayString || '01'}`);

  if (month && day) {
    return d.getUTCFullYear() === year && d.getUTCMonth() + 1 === month && d.getUTCDate() === day;
  }

  return true;
};

function isISO8601(str, options) {
  assertString(str);
  const check = iso8601.test(str);
  if (!options) return check;
  if (check && options.strict) return isValidDate(str);
  return check;
}

/* Based on https://tools.ietf.org/html/rfc3339#section-5.6 */

const dateFullYear = /[0-9]{4}/;
const dateMonth = /(0[1-9]|1[0-2])/;
const dateMDay = /([12]\d|0[1-9]|3[01])/;
const timeHour = /([01][0-9]|2[0-3])/;
const timeMinute = /[0-5][0-9]/;
const timeSecond = /([0-5][0-9]|60)/;
const timeSecFrac = /(\.[0-9]+)?/;
const timeNumOffset = new RegExp(`[-+]${timeHour.source}:${timeMinute.source}`);
const timeOffset = new RegExp(`([zZ]|${timeNumOffset.source})`);
const partialTime = new RegExp(`${timeHour.source}:${timeMinute.source}:${timeSecond.source}${timeSecFrac.source}`);
const fullDate = new RegExp(`${dateFullYear.source}-${dateMonth.source}-${dateMDay.source}`);
const fullTime = new RegExp(`${partialTime.source}${timeOffset.source}`);
const rfc3339 = new RegExp(`${fullDate.source}[ tT]${fullTime.source}`);
function isRFC3339(str) {
  assertString(str);
  return rfc3339.test(str);
}

const validISO31661Alpha2CountriesCodes = ['AD', 'AE', 'AF', 'AG', 'AI', 'AL', 'AM', 'AO', 'AQ', 'AR', 'AS', 'AT', 'AU', 'AW', 'AX', 'AZ', 'BA', 'BB', 'BD', 'BE', 'BF', 'BG', 'BH', 'BI', 'BJ', 'BL', 'BM', 'BN', 'BO', 'BQ', 'BR', 'BS', 'BT', 'BV', 'BW', 'BY', 'BZ', 'CA', 'CC', 'CD', 'CF', 'CG', 'CH', 'CI', 'CK', 'CL', 'CM', 'CN', 'CO', 'CR', 'CU', 'CV', 'CW', 'CX', 'CY', 'CZ', 'DE', 'DJ', 'DK', 'DM', 'DO', 'DZ', 'EC', 'EE', 'EG', 'EH', 'ER', 'ES', 'ET', 'FI', 'FJ', 'FK', 'FM', 'FO', 'FR', 'GA', 'GB', 'GD', 'GE', 'GF', 'GG', 'GH', 'GI', 'GL', 'GM', 'GN', 'GP', 'GQ', 'GR', 'GS', 'GT', 'GU', 'GW', 'GY', 'HK', 'HM', 'HN', 'HR', 'HT', 'HU', 'ID', 'IE', 'IL', 'IM', 'IN', 'IO', 'IQ', 'IR', 'IS', 'IT', 'JE', 'JM', 'JO', 'JP', 'KE', 'KG', 'KH', 'KI', 'KM', 'KN', 'KP', 'KR', 'KW', 'KY', 'KZ', 'LA', 'LB', 'LC', 'LI', 'LK', 'LR', 'LS', 'LT', 'LU', 'LV', 'LY', 'MA', 'MC', 'MD', 'ME', 'MF', 'MG', 'MH', 'MK', 'ML', 'MM', 'MN', 'MO', 'MP', 'MQ', 'MR', 'MS', 'MT', 'MU', 'MV', 'MW', 'MX', 'MY', 'MZ', 'NA', 'NC', 'NE', 'NF', 'NG', 'NI', 'NL', 'NO', 'NP', 'NR', 'NU', 'NZ', 'OM', 'PA', 'PE', 'PF', 'PG', 'PH', 'PK', 'PL', 'PM', 'PN', 'PR', 'PS', 'PT', 'PW', 'PY', 'QA', 'RE', 'RO', 'RS', 'RU', 'RW', 'SA', 'SB', 'SC', 'SD', 'SE', 'SG', 'SH', 'SI', 'SJ', 'SK', 'SL', 'SM', 'SN', 'SO', 'SR', 'SS', 'ST', 'SV', 'SX', 'SY', 'SZ', 'TC', 'TD', 'TF', 'TG', 'TH', 'TJ', 'TK', 'TL', 'TM', 'TN', 'TO', 'TR', 'TT', 'TV', 'TW', 'TZ', 'UA', 'UG', 'UM', 'US', 'UY', 'UZ', 'VA', 'VC', 'VE', 'VG', 'VI', 'VN', 'VU', 'WF', 'WS', 'YE', 'YT', 'ZA', 'ZM', 'ZW'];
function isISO31661Alpha2(str) {
  assertString(str);
  return includes(validISO31661Alpha2CountriesCodes, str.toUpperCase());
}

const validISO31661Alpha3CountriesCodes = ['AFG', 'ALA', 'ALB', 'DZA', 'ASM', 'AND', 'AGO', 'AIA', 'ATA', 'ATG', 'ARG', 'ARM', 'ABW', 'AUS', 'AUT', 'AZE', 'BHS', 'BHR', 'BGD', 'BRB', 'BLR', 'BEL', 'BLZ', 'BEN', 'BMU', 'BTN', 'BOL', 'BES', 'BIH', 'BWA', 'BVT', 'BRA', 'IOT', 'BRN', 'BGR', 'BFA', 'BDI', 'KHM', 'CMR', 'CAN', 'CPV', 'CYM', 'CAF', 'TCD', 'CHL', 'CHN', 'CXR', 'CCK', 'COL', 'COM', 'COG', 'COD', 'COK', 'CRI', 'CIV', 'HRV', 'CUB', 'CUW', 'CYP', 'CZE', 'DNK', 'DJI', 'DMA', 'DOM', 'ECU', 'EGY', 'SLV', 'GNQ', 'ERI', 'EST', 'ETH', 'FLK', 'FRO', 'FJI', 'FIN', 'FRA', 'GUF', 'PYF', 'ATF', 'GAB', 'GMB', 'GEO', 'DEU', 'GHA', 'GIB', 'GRC', 'GRL', 'GRD', 'GLP', 'GUM', 'GTM', 'GGY', 'GIN', 'GNB', 'GUY', 'HTI', 'HMD', 'VAT', 'HND', 'HKG', 'HUN', 'ISL', 'IND', 'IDN', 'IRN', 'IRQ', 'IRL', 'IMN', 'ISR', 'ITA', 'JAM', 'JPN', 'JEY', 'JOR', 'KAZ', 'KEN', 'KIR', 'PRK', 'KOR', 'KWT', 'KGZ', 'LAO', 'LVA', 'LBN', 'LSO', 'LBR', 'LBY', 'LIE', 'LTU', 'LUX', 'MAC', 'MKD', 'MDG', 'MWI', 'MYS', 'MDV', 'MLI', 'MLT', 'MHL', 'MTQ', 'MRT', 'MUS', 'MYT', 'MEX', 'FSM', 'MDA', 'MCO', 'MNG', 'MNE', 'MSR', 'MAR', 'MOZ', 'MMR', 'NAM', 'NRU', 'NPL', 'NLD', 'NCL', 'NZL', 'NIC', 'NER', 'NGA', 'NIU', 'NFK', 'MNP', 'NOR', 'OMN', 'PAK', 'PLW', 'PSE', 'PAN', 'PNG', 'PRY', 'PER', 'PHL', 'PCN', 'POL', 'PRT', 'PRI', 'QAT', 'REU', 'ROU', 'RUS', 'RWA', 'BLM', 'SHN', 'KNA', 'LCA', 'MAF', 'SPM', 'VCT', 'WSM', 'SMR', 'STP', 'SAU', 'SEN', 'SRB', 'SYC', 'SLE', 'SGP', 'SXM', 'SVK', 'SVN', 'SLB', 'SOM', 'ZAF', 'SGS', 'SSD', 'ESP', 'LKA', 'SDN', 'SUR', 'SJM', 'SWZ', 'SWE', 'CHE', 'SYR', 'TWN', 'TJK', 'TZA', 'THA', 'TLS', 'TGO', 'TKL', 'TON', 'TTO', 'TUN', 'TUR', 'TKM', 'TCA', 'TUV', 'UGA', 'UKR', 'ARE', 'GBR', 'USA', 'UMI', 'URY', 'UZB', 'VUT', 'VEN', 'VNM', 'VGB', 'VIR', 'WLF', 'ESH', 'YEM', 'ZMB', 'ZWE'];
function isISO31661Alpha3(str) {
  assertString(str);
  return includes(validISO31661Alpha3CountriesCodes, str.toUpperCase());
}

const base32 = /^[A-Z2-7]+=*$/;
function isBase32(str) {
  assertString(str);
  const len = str.length;

  if (len % 8 === 0 && base32.test(str)) {
    return true;
  }

  return false;
}

const base58Reg = /^[A-HJ-NP-Za-km-z1-9]*$/;
function isBase58(str) {
  assertString(str);

  if (base58Reg.test(str)) {
    return true;
  }

  return false;
}

const validMediaType = /^[a-z]+\/[a-z0-9\-\+]+$/i;
const validAttribute = /^[a-z\-]+=[a-z0-9\-]+$/i;
const validData = /^[a-z0-9!\$&'\(\)\*\+,;=\-\._~:@\/\?%\s]*$/i;
function isDataURI(str) {
  assertString(str);
  let data = str.split(',');

  if (data.length < 2) {
    return false;
  }

  const attributes = data.shift().trim().split(';');
  const schemeAndMediaType = attributes.shift();

  if (schemeAndMediaType.substr(0, 5) !== 'data:') {
    return false;
  }

  const mediaType = schemeAndMediaType.substr(5);

  if (mediaType !== '' && !validMediaType.test(mediaType)) {
    return false;
  }

  for (let i = 0; i < attributes.length; i++) {
    if (i === attributes.length - 1 && attributes[i].toLowerCase() === 'base64') ; else if (!validAttribute.test(attributes[i])) {
      return false;
    }
  }

  for (let i = 0; i < data.length; i++) {
    if (!validData.test(data[i])) {
      return false;
    }
  }

  return true;
}

const magnetURI = /^magnet:\?xt=urn:[a-z0-9]+:[a-z0-9]{32,40}&dn=.+&tr=.+$/i;
function isMagnetURI(url) {
  assertString(url);
  return magnetURI.test(url.trim());
}

/*
  Checks if the provided string matches to a correct Media type format (MIME type)

  This function only checks is the string format follows the
  etablished rules by the according RFC specifications.
  This function supports 'charset' in textual media types
  (https://tools.ietf.org/html/rfc6657).

  This function does not check against all the media types listed
  by the IANA (https://www.iana.org/assignments/media-types/media-types.xhtml)
  because of lightness purposes : it would require to include
  all these MIME types in this librairy, which would weigh it
  significantly. This kind of effort maybe is not worth for the use that
  this function has in this entire librairy.

  More informations in the RFC specifications :
  - https://tools.ietf.org/html/rfc2045
  - https://tools.ietf.org/html/rfc2046
  - https://tools.ietf.org/html/rfc7231#section-3.1.1.1
  - https://tools.ietf.org/html/rfc7231#section-3.1.1.5
*/
// Match simple MIME types
// NB :
//   Subtype length must not exceed 100 characters.
//   This rule does not comply to the RFC specs (what is the max length ?).

const mimeTypeSimple = /^(application|audio|font|image|message|model|multipart|text|video)\/[a-zA-Z0-9\.\-\+]{1,100}$/i; // eslint-disable-line max-len
// Handle "charset" in "text/*"

const mimeTypeText = /^text\/[a-zA-Z0-9\.\-\+]{1,100};\s?charset=("[a-zA-Z0-9\.\-\+\s]{0,70}"|[a-zA-Z0-9\.\-\+]{0,70})(\s?\([a-zA-Z0-9\.\-\+\s]{1,20}\))?$/i; // eslint-disable-line max-len
// Handle "boundary" in "multipart/*"

const mimeTypeMultipart = /^multipart\/[a-zA-Z0-9\.\-\+]{1,100}(;\s?(boundary|charset)=("[a-zA-Z0-9\.\-\+\s]{0,70}"|[a-zA-Z0-9\.\-\+]{0,70})(\s?\([a-zA-Z0-9\.\-\+\s]{1,20}\))?){0,2}$/i; // eslint-disable-line max-len

function isMimeType(str) {
  assertString(str);
  return mimeTypeSimple.test(str) || mimeTypeText.test(str) || mimeTypeMultipart.test(str);
}

const lat = /^\(?[+-]?(90(\.0+)?|[1-8]?\d(\.\d+)?)$/;
const long = /^\s?[+-]?(180(\.0+)?|1[0-7]\d(\.\d+)?|\d{1,2}(\.\d+)?)\)?$/;
const latDMS = /^(([1-8]?\d)\D+([1-5]?\d|60)\D+([1-5]?\d|60)(\.\d+)?|90\D+0\D+0)\D+[NSns]?$/i;
const longDMS = /^\s*([1-7]?\d{1,2}\D+([1-5]?\d|60)\D+([1-5]?\d|60)(\.\d+)?|180\D+0\D+0)\D+[EWew]?$/i;
const defaultLatLongOptions = {
  checkDMS: false
};
function isLatLong(str, options) {
  assertString(str);
  options = merge(options, defaultLatLongOptions);
  if (!str.includes(',')) return false;
  const pair = str.split(',');
  if (pair[0].startsWith('(') && !pair[1].endsWith(')') || pair[1].endsWith(')') && !pair[0].startsWith('(')) return false;

  if (options.checkDMS) {
    return latDMS.test(pair[0]) && longDMS.test(pair[1]);
  }

  return lat.test(pair[0]) && long.test(pair[1]);
}

const threeDigit = /^\d{3}$/;
const fourDigit = /^\d{4}$/;
const fiveDigit = /^\d{5}$/;
const sixDigit = /^\d{6}$/;
const patterns = {
  AD: /^AD\d{3}$/,
  AT: fourDigit,
  AU: fourDigit,
  AZ: /^AZ\d{4}$/,
  BE: fourDigit,
  BG: fourDigit,
  BR: /^\d{5}-\d{3}$/,
  BY: /2[1-4]{1}\d{4}$/,
  CA: /^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][\s\-]?\d[ABCEGHJ-NPRSTV-Z]\d$/i,
  CH: fourDigit,
  CZ: /^\d{3}\s?\d{2}$/,
  DE: fiveDigit,
  DK: fourDigit,
  DO: fiveDigit,
  DZ: fiveDigit,
  EE: fiveDigit,
  ES: /^(5[0-2]{1}|[0-4]{1}\d{1})\d{3}$/,
  FI: fiveDigit,
  FR: /^\d{2}\s?\d{3}$/,
  GB: /^(gir\s?0aa|[a-z]{1,2}\d[\da-z]?\s?(\d[a-z]{2})?)$/i,
  GR: /^\d{3}\s?\d{2}$/,
  HR: /^([1-5]\d{4}$)/,
  HT: /^HT\d{4}$/,
  HU: fourDigit,
  ID: fiveDigit,
  IE: /^(?!.*(?:o))[A-z]\d[\dw]\s\w{4}$/i,
  IL: /^(\d{5}|\d{7})$/,
  IN: /^((?!10|29|35|54|55|65|66|86|87|88|89)[1-9][0-9]{5})$/,
  IS: threeDigit,
  IT: fiveDigit,
  JP: /^\d{3}\-\d{4}$/,
  KE: fiveDigit,
  LI: /^(948[5-9]|949[0-7])$/,
  LT: /^LT\-\d{5}$/,
  LU: fourDigit,
  LV: /^LV\-\d{4}$/,
  MX: fiveDigit,
  MT: /^[A-Za-z]{3}\s{0,1}\d{4}$/,
  NL: /^\d{4}\s?[a-z]{2}$/i,
  NO: fourDigit,
  NP: /^(10|21|22|32|33|34|44|45|56|57)\d{3}$|^(977)$/i,
  NZ: fourDigit,
  PL: /^\d{2}\-\d{3}$/,
  PR: /^00[679]\d{2}([ -]\d{4})?$/,
  PT: /^\d{4}\-\d{3}?$/,
  RO: sixDigit,
  RU: sixDigit,
  SA: fiveDigit,
  SE: /^[1-9]\d{2}\s?\d{2}$/,
  SI: fourDigit,
  SK: /^\d{3}\s?\d{2}$/,
  TH: fiveDigit,
  TN: fourDigit,
  TW: /^\d{3}(\d{2})?$/,
  UA: fiveDigit,
  US: /^\d{5}(-\d{4})?$/,
  ZA: fourDigit,
  ZM: fiveDigit
};
const locales$4 = Object.keys(patterns);
function isPostalCode(str, locale) {
  assertString(str);

  if (locale in patterns) {
    return patterns[locale].test(str);
  } else if (locale === 'any') {
    for (const key in patterns) {
      // https://github.com/gotwarlost/istanbul/blob/master/ignoring-code-for-coverage.md#ignoring-code-for-coverage-purposes
      // istanbul ignore else
      if (patterns.hasOwnProperty(key)) {
        const pattern = patterns[key];

        if (pattern.test(str)) {
          return true;
        }
      }
    }

    return false;
  }

  throw new Error(`Invalid locale '${locale}'`);
}

function ltrim(str, chars) {
  assertString(str); // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Escaping

  const pattern = chars ? new RegExp(`^[${chars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]+`, 'g') : /^\s+/g;
  return str.replace(pattern, '');
}

function rtrim(str, chars) {
  assertString(str); // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Escaping

  const pattern = chars ? new RegExp(`[${chars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]+$`, 'g') : /\s+$/g;
  return str.replace(pattern, '');
}

function trim(str, chars) {
  return rtrim(ltrim(str, chars), chars);
}

function escape(str) {
  assertString(str);
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\//g, '&#x2F;').replace(/\\/g, '&#x5C;').replace(/`/g, '&#96;');
}

function unescape(str) {
  assertString(str);
  return str.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#x2F;/g, '/').replace(/&#x5C;/g, '\\').replace(/&#96;/g, '`');
}

function blacklist$1(str, chars) {
  assertString(str);
  return str.replace(new RegExp(`[${chars}]+`, 'g'), '');
}

function stripLow(str, keep_new_lines) {
  assertString(str);
  const chars = keep_new_lines ? '\\x00-\\x09\\x0B\\x0C\\x0E-\\x1F\\x7F' : '\\x00-\\x1F\\x7F';
  return blacklist$1(str, chars);
}

function whitelist(str, chars) {
  assertString(str);
  return str.replace(new RegExp(`[^${chars}]+`, 'g'), '');
}

function isWhitelisted(str, chars) {
  assertString(str);

  for (let i = str.length - 1; i >= 0; i--) {
    if (chars.indexOf(str[i]) === -1) {
      return false;
    }
  }

  return true;
}

const default_normalize_email_options = {
  // The following options apply to all email addresses
  // Lowercases the local part of the email address.
  // Please note this may violate RFC 5321 as per http://stackoverflow.com/a/9808332/192024).
  // The domain is always lowercased, as per RFC 1035
  all_lowercase: true,
  // The following conversions are specific to GMail
  // Lowercases the local part of the GMail address (known to be case-insensitive)
  gmail_lowercase: true,
  // Removes dots from the local part of the email address, as that's ignored by GMail
  gmail_remove_dots: true,
  // Removes the subaddress (e.g. "+foo") from the email address
  gmail_remove_subaddress: true,
  // Conversts the googlemail.com domain to gmail.com
  gmail_convert_googlemaildotcom: true,
  // The following conversions are specific to Outlook.com / Windows Live / Hotmail
  // Lowercases the local part of the Outlook.com address (known to be case-insensitive)
  outlookdotcom_lowercase: true,
  // Removes the subaddress (e.g. "+foo") from the email address
  outlookdotcom_remove_subaddress: true,
  // The following conversions are specific to Yahoo
  // Lowercases the local part of the Yahoo address (known to be case-insensitive)
  yahoo_lowercase: true,
  // Removes the subaddress (e.g. "-foo") from the email address
  yahoo_remove_subaddress: true,
  // The following conversions are specific to Yandex
  // Lowercases the local part of the Yandex address (known to be case-insensitive)
  yandex_lowercase: true,
  // The following conversions are specific to iCloud
  // Lowercases the local part of the iCloud address (known to be case-insensitive)
  icloud_lowercase: true,
  // Removes the subaddress (e.g. "+foo") from the email address
  icloud_remove_subaddress: true
}; // List of domains used by iCloud

const icloud_domains = ['icloud.com', 'me.com']; // List of domains used by Outlook.com and its predecessors
// This list is likely incomplete.
// Partial reference:
// https://blogs.office.com/2013/04/17/outlook-com-gets-two-step-verification-sign-in-by-alias-and-new-international-domains/

const outlookdotcom_domains = ['hotmail.at', 'hotmail.be', 'hotmail.ca', 'hotmail.cl', 'hotmail.co.il', 'hotmail.co.nz', 'hotmail.co.th', 'hotmail.co.uk', 'hotmail.com', 'hotmail.com.ar', 'hotmail.com.au', 'hotmail.com.br', 'hotmail.com.gr', 'hotmail.com.mx', 'hotmail.com.pe', 'hotmail.com.tr', 'hotmail.com.vn', 'hotmail.cz', 'hotmail.de', 'hotmail.dk', 'hotmail.es', 'hotmail.fr', 'hotmail.hu', 'hotmail.id', 'hotmail.ie', 'hotmail.in', 'hotmail.it', 'hotmail.jp', 'hotmail.kr', 'hotmail.lv', 'hotmail.my', 'hotmail.ph', 'hotmail.pt', 'hotmail.sa', 'hotmail.sg', 'hotmail.sk', 'live.be', 'live.co.uk', 'live.com', 'live.com.ar', 'live.com.mx', 'live.de', 'live.es', 'live.eu', 'live.fr', 'live.it', 'live.nl', 'msn.com', 'outlook.at', 'outlook.be', 'outlook.cl', 'outlook.co.il', 'outlook.co.nz', 'outlook.co.th', 'outlook.com', 'outlook.com.ar', 'outlook.com.au', 'outlook.com.br', 'outlook.com.gr', 'outlook.com.pe', 'outlook.com.tr', 'outlook.com.vn', 'outlook.cz', 'outlook.de', 'outlook.dk', 'outlook.es', 'outlook.fr', 'outlook.hu', 'outlook.id', 'outlook.ie', 'outlook.in', 'outlook.it', 'outlook.jp', 'outlook.kr', 'outlook.lv', 'outlook.my', 'outlook.ph', 'outlook.pt', 'outlook.sa', 'outlook.sg', 'outlook.sk', 'passport.com']; // List of domains used by Yahoo Mail
// This list is likely incomplete

const yahoo_domains = ['rocketmail.com', 'yahoo.ca', 'yahoo.co.uk', 'yahoo.com', 'yahoo.de', 'yahoo.fr', 'yahoo.in', 'yahoo.it', 'ymail.com']; // List of domains used by yandex.ru

const yandex_domains = ['yandex.ru', 'yandex.ua', 'yandex.kz', 'yandex.com', 'yandex.by', 'ya.ru']; // replace single dots, but not multiple consecutive dots

function dotsReplacer(match) {
  if (match.length > 1) {
    return match;
  }

  return '';
}

function normalizeEmail(email, options) {
  options = merge(options, default_normalize_email_options);
  const raw_parts = email.split('@');
  const domain = raw_parts.pop();
  const user = raw_parts.join('@');
  const parts = [user, domain]; // The domain is always lowercased, as it's case-insensitive per RFC 1035

  parts[1] = parts[1].toLowerCase();

  if (parts[1] === 'gmail.com' || parts[1] === 'googlemail.com') {
    // Address is GMail
    if (options.gmail_remove_subaddress) {
      parts[0] = parts[0].split('+')[0];
    }

    if (options.gmail_remove_dots) {
      // this does not replace consecutive dots like example..email@gmail.com
      parts[0] = parts[0].replace(/\.+/g, dotsReplacer);
    }

    if (!parts[0].length) {
      return false;
    }

    if (options.all_lowercase || options.gmail_lowercase) {
      parts[0] = parts[0].toLowerCase();
    }

    parts[1] = options.gmail_convert_googlemaildotcom ? 'gmail.com' : parts[1];
  } else if (icloud_domains.indexOf(parts[1]) >= 0) {
    // Address is iCloud
    if (options.icloud_remove_subaddress) {
      parts[0] = parts[0].split('+')[0];
    }

    if (!parts[0].length) {
      return false;
    }

    if (options.all_lowercase || options.icloud_lowercase) {
      parts[0] = parts[0].toLowerCase();
    }
  } else if (outlookdotcom_domains.indexOf(parts[1]) >= 0) {
    // Address is Outlook.com
    if (options.outlookdotcom_remove_subaddress) {
      parts[0] = parts[0].split('+')[0];
    }

    if (!parts[0].length) {
      return false;
    }

    if (options.all_lowercase || options.outlookdotcom_lowercase) {
      parts[0] = parts[0].toLowerCase();
    }
  } else if (yahoo_domains.indexOf(parts[1]) >= 0) {
    // Address is Yahoo
    if (options.yahoo_remove_subaddress) {
      let components = parts[0].split('-');
      parts[0] = components.length > 1 ? components.slice(0, -1).join('-') : components[0];
    }

    if (!parts[0].length) {
      return false;
    }

    if (options.all_lowercase || options.yahoo_lowercase) {
      parts[0] = parts[0].toLowerCase();
    }
  } else if (yandex_domains.indexOf(parts[1]) >= 0) {
    if (options.all_lowercase || options.yandex_lowercase) {
      parts[0] = parts[0].toLowerCase();
    }

    parts[1] = 'yandex.ru'; // all yandex domains are equal, 1st preferred
  } else if (options.all_lowercase) {
    // Any other address
    parts[0] = parts[0].toLowerCase();
  }

  return parts.join('@');
}

let charsetRegex = /^[^\s-_](?!.*?[-_]{2,})([a-z0-9-\\]{1,})[^\s]*[^-_\s]$/;
function isSlug(str) {
  assertString(str);
  return charsetRegex.test(str);
}

const version = '13.1.17';
const validator = {
  version,
  toDate,
  toFloat,
  toInt,
  toBoolean,
  equals,
  contains,
  matches,
  isEmail,
  isURL,
  isMACAddress,
  isIP,
  isIPRange,
  isFQDN,
  isBoolean,
  isIBAN,
  isBIC,
  isAlpha,
  isAlphaLocales: locales$1,
  isAlphanumeric,
  isAlphanumericLocales: locales$2,
  isNumeric,
  isPassportNumber,
  isPort,
  isLowercase,
  isUppercase,
  isAscii,
  isFullWidth,
  isHalfWidth,
  isVariableWidth,
  isMultibyte,
  isSemVer,
  isSurrogatePair,
  isInt,
  isIMEI,
  isFloat,
  isFloatLocales: locales,
  isDecimal,
  isHexadecimal,
  isOctal,
  isDivisibleBy,
  isHexColor,
  isRgbColor,
  isHSL,
  isISRC,
  isMD5,
  isHash,
  isJWT,
  isJSON,
  isEmpty,
  isLength,
  isLocale,
  isByteLength,
  isUUID,
  isMongoId,
  isAfter,
  isBefore,
  isIn,
  isCreditCard,
  isIdentityCard,
  isEAN,
  isISIN,
  isISBN,
  isISSN,
  isMobilePhone,
  isMobilePhoneLocales: locales$3,
  isPostalCode,
  isPostalCodeLocales: locales$4,
  isEthereumAddress,
  isCurrency,
  isBtcAddress,
  isISO8601,
  isRFC3339,
  isISO31661Alpha2,
  isISO31661Alpha3,
  isBase32,
  isBase58,
  isBase64,
  isDataURI,
  isMagnetURI,
  isMimeType,
  isLatLong,
  ltrim,
  rtrim,
  trim,
  escape,
  unescape,
  stripLow,
  whitelist,
  blacklist: blacklist$1,
  isWhitelisted,
  normalizeEmail,
  toString,
  isSlug,
  isTaxID,
  isDate
};

class SkhemataFormTextbox extends SkhemataFormInput {
  static get scopedElements() {
    return {
      'fa-icon': D
    };
  }

  constructor() {
    super();

    _defineProperty$1(this, "minlength", -1);

    _defineProperty$1(this, "maxlength", -1);

    _defineProperty$1(this, "submitOnEnter", false);

    _defineProperty$1(this, "type", 'text');

    this.value = '';
  }

  validate() {
    this.helpClass = '';

    if (this.minlength !== -1 && this.value.length < this.minlength || this.maxlength !== -1 && this.value.length > this.maxlength || this.required && this.value.length < 1 || this.type === 'email' && !validator.isEmail(this.value)) {
      if (this.required && this.value.length < 1) {
        this.errorMessage = this.getStr('formErrorRequired');
      } else if (this.minlength !== -1 && this.value.length < this.minlength) {
        this.errorMessage = this.getStr('formErrorMinlength');
      } else if (this.maxlength !== -1 && this.value.length > this.maxlength) {
        this.errorMessage = this.getStr('formErrorMaxlength');
      } else if (this.type === 'email' && !validator.isEmail(this.value)) {
        this.errorMessage = this.getStr('formErrorEmail');
      }

      this.valid = false;
      this.helpClass = 'is-danger';
    }

    this.dispatchEvent(new CustomEvent('is-valid', {
      detail: {
        valid: this.valid
      },
      bubbles: true,
      composed: true
    }));
  }

  handleInput(event) {
    this.clearError();
    this.setAttribute('value', event.target.value);
  }

  handleKeydown(event) {
    this.clearError();

    if (event.keyCode === '13' && this.submitOnEnter) {
      this.validate();

      if (!this.valid) {
        return;
      }

      this.dispatchEvent(new CustomEvent('submit'));
      event.preventDefault();
    }
  }

  render() {
    const faTriangleIcon = T`
      <span class="icon is-small is-right">
        <fa-icon .icon=${faExclamationTriangle}></fa-icon>
      </span>
    `;
    const faSearchIcon = T`
      <span class="icon is-small is-right">
        <fa-icon .icon=${faSearch}></fa-icon>
      </span>
    `;
    let inputIcon = this.type === 'search' ? faSearchIcon : null;
    inputIcon = this.valid ? inputIcon : faTriangleIcon;
    const field = T`
      <div class="field">
        ${this.label && !this.horizontal ? T`<label class="label">${this.label}</label>` : null}
        <div
          class="control ${!this.valid || this.type === 'search' ? 'has-icons-right' : ''}"
        >
          ${this.description && !this.horizontal ? T`<p>${this.description}</p>` : null}
          <input
            class="input ${this.valid ? `` : `is-danger`}"
            name="${this.name}"
            type=${this.type === 'password' ? 'password' : 'text'}
            placeholder="${this.placeholder}"
            @keydown=${this.handleKeydown}
            @input=${this.handleInput}
            .value=${this.value}
          />
          ${inputIcon}
        </div>
        ${!this.valid ? T`<p class="help ${this.helpClass}">${this.errorMessage}</p>` : ``}
      </div>
    `;
    const horizontalFieldLabel = T`
      <div class="field-label column is-one-quarter" style="text-align: left">
        ${this.label ? T`<label class="label">${this.label}</label>` : null}
        ${this.description ? T`<p>${this.description}</p>` : null}
      </div>
    `;
    const horizontalField = T`
      <div class="field is-horizontal">
        ${this.label || this.description ? horizontalFieldLabel : null}
        <div class="field-body column">${field}</div>
      </div>
    `;
    return this.horizontal ? horizontalField : field;
  }

}

__decorate([e$3({
  type: Number
})], SkhemataFormTextbox.prototype, "minlength", void 0);

__decorate([e$3({
  type: Number
})], SkhemataFormTextbox.prototype, "maxlength", void 0);

__decorate([e$3({
  type: Boolean
})], SkhemataFormTextbox.prototype, "submitOnEnter", void 0);

__decorate([e$3({
  type: String
})], SkhemataFormTextbox.prototype, "type", void 0);

class SkhemataFormCheckbox extends SkhemataFormInput {
  constructor() {
    super();

    _defineProperty$1(this, "checked", false);

    this.value = false;
  }

  reset() {
    this.clearError();
    this.checked = false;
    this.value = false;
  }

  validate() {
    this.helpClass = '';

    if (this.required && this.checked === false) {
      this.valid = false;
      this.helpClass = 'is-danger';
      this.errorMessage = this.getStr('formErrorRequired');
    }

    this.dispatchEvent(new CustomEvent('is-valid', {
      detail: {
        valid: this.valid
      },
      bubbles: true,
      composed: true
    }));
  }

  handleClick(event) {
    this.clearError();
    this.checked = event.target.checked;
    this.value = event.target.checked;
  }

  render() {
    const field = T`
      <div class="field">
        ${this.label && !this.horizontal ? T`<label class="label">${this.label}</label>` : null}
          ${this.description && !this.horizontal ? T`<p>${this.description}</p>` : null}
          <input type="checkbox" @click=${this.handleClick} />
          <slot></slot>
        </label>
        ${!this.valid ? T`<p class="help ${this.helpClass}">${this.errorMessage}</p>` : ``}
      </div>
    `;
    const horizontalFieldLabel = T`
      <div class="field-label column is-one-quarter" style="text-align: left">
        ${this.label ? T`<label class="label">${this.label}</label>` : null}
        ${this.description ? T`<p>${this.description}</p>` : null}
      </div>
    `;
    const horizontalField = T`
      <div class="field is-horizontal">
        ${this.label || this.description ? horizontalFieldLabel : null}
        <div class="field-body column">${field}</div>
      </div>
    `;
    return this.horizontal ? horizontalField : field;
  }

}

__decorate([e$3({
  type: Boolean
})], SkhemataFormCheckbox.prototype, "checked", void 0);

class SkhemataFormTextarea extends SkhemataFormInput {
  constructor(...args) {
    super(...args);

    _defineProperty$1(this, "label", '');

    _defineProperty$1(this, "description", '');

    _defineProperty$1(this, "horizontal", false);

    _defineProperty$1(this, "rows", 4);

    _defineProperty$1(this, "minlength", -1);

    _defineProperty$1(this, "maxlength", -1);

    _defineProperty$1(this, "required", false);

    _defineProperty$1(this, "name", 'name');

    _defineProperty$1(this, "placeholder", '');

    _defineProperty$1(this, "errorMessage", 'Text is invalid');

    _defineProperty$1(this, "submitOnEnter", false);

    _defineProperty$1(this, "valid", true);

    _defineProperty$1(this, "helpClass", '');
  }

  static get styles() {
    return [...super.styles, i`
        .field {
          margin-bottom: 1rem;
        }
      `];
  }

  static get scopedElements() {
    return {
      'fa-icon': D
    };
  }

  reset() {
    this.clearError();
    this.setAttribute('value', '');
  }

  validate() {
    this.helpClass = '';

    if (this.minlength !== -1 && this.value.length < this.minlength || this.maxlength !== -1 && this.value.length > this.maxlength || this.required && this.value.length < 1) {
      this.valid = false;
      this.helpClass = 'is-danger';
      this.errorMessage = 'text is invalid';
    }

    this.dispatchEvent(new CustomEvent('is-valid', {
      detail: {
        valid: this.valid
      },
      bubbles: true,
      composed: true
    }));
  }

  clearError() {
    this.helpClass = '';
    this.errorMessage = '';
    this.valid = true;
  }

  handleInput(event) {
    this.clearError();
    this.setAttribute('value', event.target.value);
  }

  handleKeydown(event) {
    this.clearError();

    if (event.keyCode === '13' && this.submitOnEnter) {
      this.validate();

      if (!this.valid) {
        return;
      }

      this.dispatchEvent(new CustomEvent('submit'));
      event.preventDefault();
    }
  }

  render() {
    const field = T`
      <div class="field">
        ${this.label && !this.horizontal ? T`<label class="label">${this.label}</label>` : null}
        <div class="control ${this.valid ? '' : 'has-icons-right'}">
          ${this.description && !this.horizontal ? T`<p>${this.description}</p>` : null}
          <textarea
            class="textarea ${this.valid ? `` : `is-danger`}"
            name="${this.name}"
            rows="${this.rows}"
            placeholder="${this.placeholder}"
            @keydown=${this.handleKeydown}
            @input=${this.handleInput}
            .value=${this.value}
          ></textarea>
          ${!this.valid ? T` <span class="icon is-small is-right">
                <fa-icon .icon=${faExclamationTriangle}></fa-icon>
              </span>` : null}
        </div>
        ${!this.valid ? T`<p class="help ${this.helpClass}">${this.errorMessage}</p>` : ``}
      </div>
    `;
    const horizontalFieldLabel = T`
      <div class="field-label column is-one-quarter" style="text-align: left">
        ${this.label ? T`<label class="label">${this.label}</label>` : null}
        ${this.description ? T`<p>${this.description}</p>` : null}
      </div>
    `;
    const horizontalField = T`
      <div class="field is-horizontal">
        ${this.label || this.description ? horizontalFieldLabel : null}
        <div class="field-body column">${field}</div>
      </div>
    `;
    return this.horizontal ? horizontalField : field;
  }

}

__decorate([e$3({
  type: String
})], SkhemataFormTextarea.prototype, "label", void 0);

__decorate([e$3({
  type: String
})], SkhemataFormTextarea.prototype, "description", void 0);

__decorate([e$3({
  type: Boolean
})], SkhemataFormTextarea.prototype, "horizontal", void 0);

__decorate([e$3({
  type: Number
})], SkhemataFormTextarea.prototype, "rows", void 0);

__decorate([e$3({
  type: Number
})], SkhemataFormTextarea.prototype, "minlength", void 0);

__decorate([e$3({
  type: Number
})], SkhemataFormTextarea.prototype, "maxlength", void 0);

__decorate([e$3({
  type: Boolean
})], SkhemataFormTextarea.prototype, "required", void 0);

__decorate([e$3({
  type: String
})], SkhemataFormTextarea.prototype, "name", void 0);

__decorate([e$3({
  type: String
})], SkhemataFormTextarea.prototype, "placeholder", void 0);

__decorate([e$3({
  type: String
})], SkhemataFormTextarea.prototype, "errorMessage", void 0);

__decorate([e$3({
  type: Boolean
})], SkhemataFormTextarea.prototype, "submitOnEnter", void 0);

__decorate([e$3({
  type: Boolean
})], SkhemataFormTextarea.prototype, "valid", void 0);

__decorate([e$3({
  type: String
})], SkhemataFormTextarea.prototype, "helpClass", void 0);

class SkhemataFormDropdown extends SkhemataFormInput {
  constructor(...args) {
    super(...args);

    _defineProperty$1(this, "horizontal", false);

    _defineProperty$1(this, "description", '');

    _defineProperty$1(this, "selected", '');

    _defineProperty$1(this, "label", '');

    _defineProperty$1(this, "menuOpen", false);

    _defineProperty$1(this, "required", false);

    _defineProperty$1(this, "name", 'name');

    _defineProperty$1(this, "placeholder", 'Select One');

    _defineProperty$1(this, "errorMessage", 'Select one');

    _defineProperty$1(this, "submitOnSelect", false);

    _defineProperty$1(this, "valid", true);

    _defineProperty$1(this, "helpClass", '');
  }

  static get styles() {
    return [...super.styles, i`
        .field {
          margin-bottom: 1rem;
        }

        ::slotted(*),
        .placeholder {
          text-align: left;
          padding: 0.5rem 0rem 0.5rem 1rem;
          white-space: nowrap;
        }
        ::slotted(*:hover),
        .placeholder:hover {
          background-color: whitesmoke;
          color: rgb(10, 10, 10);
          cursor: pointer;
        }
        .dropdown,
        .dropdown-trigger,
        .dropdown button {
          width: 100%;
        }
        .dropdown button span {
          margin-right: auto;
        }
        .dropdown .button {
          color: #d0d0d0;
        }
      `];
  }

  static get scopedElements() {
    return {
      'fa-icon': D
    };
  }

  reset() {
    this.clearError();
    this.setDefaultValue();
  }

  validate() {
    this.helpClass = '';

    if (this.required && (!this.value || this.value.length < 1)) {
      this.valid = false;
      this.helpClass = 'is-danger';
    }

    this.dispatchEvent(new CustomEvent('is-valid', {
      detail: {
        valid: this.valid
      },
      bubbles: true,
      composed: true
    }));
  }

  clearError() {
    this.helpClass = '';
    this.valid = true;
  }

  setDefaultValue(value) {
    const slot = this.shadowRoot?.querySelector('slot:not([name="placeholder"])');
    const childNodes = slot?.assignedNodes({
      flatten: true
    });
    const children = childNodes ? Array.prototype.filter.call(childNodes, node => node.nodeType === Node.ELEMENT_NODE) : [];

    if (children && children.length > 0 && !this.placeholder) {
      this.placeholder = '';

      if (value) {
        const initialOption = children.filter(child => child.value === value)[0];
        this.value = initialOption?.value;
        this.selected = initialOption?.innerHTML;
      } else {
        this.selected = children[0].innerHTML;
        this.value = children[0].value;
      }
    } else if (value) {
      const initialOption = children.filter(child => child.value === value)[0];
      this.value = initialOption?.value;
      this.selected = initialOption?.innerHTML;
    } else {
      this.selected = this.placeholder || '';
      this.value = '';
    }

    this.requestUpdate();
  }

  async firstUpdated() {
    await super.firstUpdated();
    this.setDefaultValue(this.value);
  }

  handleKeydown(event) {
    if (event.keyCode === '13') {
      if (!event.target.value) {
        this.reset();
      } else {
        this.handleSelectValue(event);
      }
    }
  }

  handleSelectValue(event) {
    this.clearError();
    this.selected = event.target.innerHTML;
    this.value = event.target.value;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    this.requestUpdate();
  }

  render() {
    const field = T`
      <div class="field">
        ${this.label && !this.horizontal ? T`<label class="label">${this.label}</label>` : null}
        <div class="control ${this.valid ? '' : 'has-icons-right'}">
          ${this.description && !this.horizontal ? T`<p>${this.description}</p>` : null}
          <div
            class="dropdown ${this.menuOpen ? 'is-active' : ''}"
            @click=${this.toggleMenu}
            @keydown=${event => {
      if (event.keyCode === '13') this.toggleMenu();
    }}
          >
            <div class="dropdown-trigger">
              <button
                class="button"
                aria-haspopup="true"
                aria-controls="dropdown-menu"
              >
                <span>${this.selected}</span>
                <span class="icon is-small">
                  <fa-icon .icon=${faAngleDown}></fa-icon>
                </span>
              </button>
            </div>
            <div class="dropdown-menu" id="dropdown-menu" role="menu">
              <div class="dropdown-content">
                ${this.placeholder ? T`<option
                      class="placeholder"
                      @click=${this.reset}
                      @keydown=${this.handleKeydown}
                    >
                      ${this.placeholder}
                    </option>` : ``}
                <slot
                  @click=${this.handleSelectValue}
                  @keydown=${this.handleKeydown}
                ></slot>
              </div>
            </div>
          </div>
        </div>
        ${!this.valid ? T`<p class="help ${this.helpClass}">${this.errorMessage}</p>` : ``}
      </div>
    `;
    const horizontalFieldLabel = T`
      <div class="field-label column is-one-quarter" style="text-align: left">
        ${this.label ? T`<label class="label">${this.label}</label>` : null}
        ${this.description ? T`<p>${this.description}</p>` : null}
      </div>
    `;
    const horizontalField = T`
      <div class="field is-horizontal">
        ${this.label || this.description ? horizontalFieldLabel : null}
        <div class="field-body column">${field}</div>
      </div>
    `;
    return this.horizontal ? horizontalField : field;
  }

}

__decorate([e$3({
  type: Boolean
})], SkhemataFormDropdown.prototype, "horizontal", void 0);

__decorate([e$3({
  type: String
})], SkhemataFormDropdown.prototype, "description", void 0);

__decorate([e$3({
  type: String
})], SkhemataFormDropdown.prototype, "selected", void 0);

__decorate([e$3({
  type: String
})], SkhemataFormDropdown.prototype, "label", void 0);

__decorate([e$3({
  type: Boolean
})], SkhemataFormDropdown.prototype, "menuOpen", void 0);

__decorate([e$3({
  type: Boolean
})], SkhemataFormDropdown.prototype, "required", void 0);

__decorate([e$3({
  type: String
})], SkhemataFormDropdown.prototype, "name", void 0);

__decorate([e$3({
  type: String
})], SkhemataFormDropdown.prototype, "placeholder", void 0);

__decorate([e$3({
  type: String
})], SkhemataFormDropdown.prototype, "errorMessage", void 0);

__decorate([e$3({
  type: Boolean
})], SkhemataFormDropdown.prototype, "submitOnSelect", void 0);

__decorate([e$3({
  type: Boolean
})], SkhemataFormDropdown.prototype, "valid", void 0);

__decorate([e$3({
  type: String
})], SkhemataFormDropdown.prototype, "helpClass", void 0);

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * True if the custom elements polyfill is in use.
 */
const isCEPolyfill = typeof window !== 'undefined' && window.customElements != null && window.customElements.polyfillWrapFlushCallback !== undefined;
/**
 * Removes nodes, starting from `start` (inclusive) to `end` (exclusive), from
 * `container`.
 */

const removeNodes = (container, start, end = null) => {
  while (start !== end) {
    const n = start.nextSibling;
    container.removeChild(start);
    start = n;
  }
};

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * An expression marker with embedded unique key to avoid collision with
 * possible text in templates.
 */
const marker = `{{lit-${String(Math.random()).slice(2)}}}`;
/**
 * An expression marker used text-positions, multi-binding attributes, and
 * attributes with markup-like text values.
 */

const nodeMarker = `<!--${marker}-->`;
const markerRegex = new RegExp(`${marker}|${nodeMarker}`);
/**
 * Suffix appended to all bound attribute names.
 */

const boundAttributeSuffix = '$lit$';
/**
 * An updatable Template that tracks the location of dynamic parts.
 */

class Template {
  constructor(result, element) {
    this.parts = [];
    this.element = element;
    const nodesToRemove = [];
    const stack = []; // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be null

    const walker = document.createTreeWalker(element.content, 133
    /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */
    , null, false); // Keeps track of the last index associated with a part. We try to delete
    // unnecessary nodes, but we never want to associate two different parts
    // to the same index. They must have a constant node between.

    let lastPartIndex = 0;
    let index = -1;
    let partIndex = 0;
    const {
      strings,
      values: {
        length
      }
    } = result;

    while (partIndex < length) {
      const node = walker.nextNode();

      if (node === null) {
        // We've exhausted the content inside a nested template element.
        // Because we still have parts (the outer for-loop), we know:
        // - There is a template in the stack
        // - The walker will find a nextNode outside the template
        walker.currentNode = stack.pop();
        continue;
      }

      index++;

      if (node.nodeType === 1
      /* Node.ELEMENT_NODE */
      ) {
          if (node.hasAttributes()) {
            const attributes = node.attributes;
            const {
              length
            } = attributes; // Per
            // https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap,
            // attributes are not guaranteed to be returned in document order.
            // In particular, Edge/IE can return them out of order, so we cannot
            // assume a correspondence between part index and attribute index.

            let count = 0;

            for (let i = 0; i < length; i++) {
              if (endsWith(attributes[i].name, boundAttributeSuffix)) {
                count++;
              }
            }

            while (count-- > 0) {
              // Get the template literal section leading up to the first
              // expression in this attribute
              const stringForPart = strings[partIndex]; // Find the attribute name

              const name = lastAttributeNameRegex.exec(stringForPart)[2]; // Find the corresponding attribute
              // All bound attributes have had a suffix added in
              // TemplateResult#getHTML to opt out of special attribute
              // handling. To look up the attribute value we also need to add
              // the suffix.

              const attributeLookupName = name.toLowerCase() + boundAttributeSuffix;
              const attributeValue = node.getAttribute(attributeLookupName);
              node.removeAttribute(attributeLookupName);
              const statics = attributeValue.split(markerRegex);
              this.parts.push({
                type: 'attribute',
                index,
                name,
                strings: statics
              });
              partIndex += statics.length - 1;
            }
          }

          if (node.tagName === 'TEMPLATE') {
            stack.push(node);
            walker.currentNode = node.content;
          }
        } else if (node.nodeType === 3
      /* Node.TEXT_NODE */
      ) {
          const data = node.data;

          if (data.indexOf(marker) >= 0) {
            const parent = node.parentNode;
            const strings = data.split(markerRegex);
            const lastIndex = strings.length - 1; // Generate a new text node for each literal section
            // These nodes are also used as the markers for node parts

            for (let i = 0; i < lastIndex; i++) {
              let insert;
              let s = strings[i];

              if (s === '') {
                insert = createMarker();
              } else {
                const match = lastAttributeNameRegex.exec(s);

                if (match !== null && endsWith(match[2], boundAttributeSuffix)) {
                  s = s.slice(0, match.index) + match[1] + match[2].slice(0, -boundAttributeSuffix.length) + match[3];
                }

                insert = document.createTextNode(s);
              }

              parent.insertBefore(insert, node);
              this.parts.push({
                type: 'node',
                index: ++index
              });
            } // If there's no text, we must insert a comment to mark our place.
            // Else, we can trust it will stick around after cloning.


            if (strings[lastIndex] === '') {
              parent.insertBefore(createMarker(), node);
              nodesToRemove.push(node);
            } else {
              node.data = strings[lastIndex];
            } // We have a part for each match found


            partIndex += lastIndex;
          }
        } else if (node.nodeType === 8
      /* Node.COMMENT_NODE */
      ) {
          if (node.data === marker) {
            const parent = node.parentNode; // Add a new marker node to be the startNode of the Part if any of
            // the following are true:
            //  * We don't have a previousSibling
            //  * The previousSibling is already the start of a previous part

            if (node.previousSibling === null || index === lastPartIndex) {
              index++;
              parent.insertBefore(createMarker(), node);
            }

            lastPartIndex = index;
            this.parts.push({
              type: 'node',
              index
            }); // If we don't have a nextSibling, keep this node so we have an end.
            // Else, we can remove it to save future costs.

            if (node.nextSibling === null) {
              node.data = '';
            } else {
              nodesToRemove.push(node);
              index--;
            }

            partIndex++;
          } else {
            let i = -1;

            while ((i = node.data.indexOf(marker, i + 1)) !== -1) {
              // Comment node has a binding marker inside, make an inactive part
              // The binding won't work, but subsequent bindings will
              // TODO (justinfagnani): consider whether it's even worth it to
              // make bindings in comments work
              this.parts.push({
                type: 'node',
                index: -1
              });
              partIndex++;
            }
          }
        }
    } // Remove text binding nodes after the walk to not disturb the TreeWalker


    for (const n of nodesToRemove) {
      n.parentNode.removeChild(n);
    }
  }

}

const endsWith = (str, suffix) => {
  const index = str.length - suffix.length;
  return index >= 0 && str.slice(index) === suffix;
};

const isTemplatePartActive = part => part.index !== -1; // Allows `document.createComment('')` to be renamed for a
// small manual size-savings.

const createMarker = () => document.createComment('');
/**
 * This regex extracts the attribute name preceding an attribute-position
 * expression. It does this by matching the syntax allowed for attributes
 * against the string literal directly preceding the expression, assuming that
 * the expression is in an attribute-value position.
 *
 * See attributes in the HTML spec:
 * https://www.w3.org/TR/html5/syntax.html#elements-attributes
 *
 * " \x09\x0a\x0c\x0d" are HTML space characters:
 * https://www.w3.org/TR/html5/infrastructure.html#space-characters
 *
 * "\0-\x1F\x7F-\x9F" are Unicode control characters, which includes every
 * space character except " ".
 *
 * So an attribute is:
 *  * The name: any character except a control character, space character, ('),
 *    ("), ">", "=", or "/"
 *  * Followed by zero or more space characters
 *  * Followed by "="
 *  * Followed by zero or more space characters
 *  * Followed by:
 *    * Any character except space, ('), ("), "<", ">", "=", (`), or
 *    * (") then any non-("), or
 *    * (') then any non-(')
 */

const lastAttributeNameRegex = // eslint-disable-next-line no-control-regex
/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const walkerNodeFilter = 133
/* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */
;
/**
 * Removes the list of nodes from a Template safely. In addition to removing
 * nodes from the Template, the Template part indices are updated to match
 * the mutated Template DOM.
 *
 * As the template is walked the removal state is tracked and
 * part indices are adjusted as needed.
 *
 * div
 *   div#1 (remove) <-- start removing (removing node is div#1)
 *     div
 *       div#2 (remove)  <-- continue removing (removing node is still div#1)
 *         div
 * div <-- stop removing since previous sibling is the removing node (div#1,
 * removed 4 nodes)
 */

function removeNodesFromTemplate(template, nodesToRemove) {
  const {
    element: {
      content
    },
    parts
  } = template;
  const walker = document.createTreeWalker(content, walkerNodeFilter, null, false);
  let partIndex = nextActiveIndexInTemplateParts(parts);
  let part = parts[partIndex];
  let nodeIndex = -1;
  let removeCount = 0;
  const nodesToRemoveInTemplate = [];
  let currentRemovingNode = null;

  while (walker.nextNode()) {
    nodeIndex++;
    const node = walker.currentNode; // End removal if stepped past the removing node

    if (node.previousSibling === currentRemovingNode) {
      currentRemovingNode = null;
    } // A node to remove was found in the template


    if (nodesToRemove.has(node)) {
      nodesToRemoveInTemplate.push(node); // Track node we're removing

      if (currentRemovingNode === null) {
        currentRemovingNode = node;
      }
    } // When removing, increment count by which to adjust subsequent part indices


    if (currentRemovingNode !== null) {
      removeCount++;
    }

    while (part !== undefined && part.index === nodeIndex) {
      // If part is in a removed node deactivate it by setting index to -1 or
      // adjust the index as needed.
      part.index = currentRemovingNode !== null ? -1 : part.index - removeCount; // go to the next active part.

      partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
      part = parts[partIndex];
    }
  }

  nodesToRemoveInTemplate.forEach(n => n.parentNode.removeChild(n));
}

const countNodes = node => {
  let count = node.nodeType === 11
  /* Node.DOCUMENT_FRAGMENT_NODE */
  ? 0 : 1;
  const walker = document.createTreeWalker(node, walkerNodeFilter, null, false);

  while (walker.nextNode()) {
    count++;
  }

  return count;
};

const nextActiveIndexInTemplateParts = (parts, startIndex = -1) => {
  for (let i = startIndex + 1; i < parts.length; i++) {
    const part = parts[i];

    if (isTemplatePartActive(part)) {
      return i;
    }
  }

  return -1;
};
/**
 * Inserts the given node into the Template, optionally before the given
 * refNode. In addition to inserting the node into the Template, the Template
 * part indices are updated to match the mutated Template DOM.
 */


function insertNodeIntoTemplate(template, node, refNode = null) {
  const {
    element: {
      content
    },
    parts
  } = template; // If there's no refNode, then put node at end of template.
  // No part indices need to be shifted in this case.

  if (refNode === null || refNode === undefined) {
    content.appendChild(node);
    return;
  }

  const walker = document.createTreeWalker(content, walkerNodeFilter, null, false);
  let partIndex = nextActiveIndexInTemplateParts(parts);
  let insertCount = 0;
  let walkerIndex = -1;

  while (walker.nextNode()) {
    walkerIndex++;
    const walkerNode = walker.currentNode;

    if (walkerNode === refNode) {
      insertCount = countNodes(node);
      refNode.parentNode.insertBefore(node, refNode);
    }

    while (partIndex !== -1 && parts[partIndex].index === walkerIndex) {
      // If we've inserted the node, simply adjust all subsequent parts
      if (insertCount > 0) {
        while (partIndex !== -1) {
          parts[partIndex].index += insertCount;
          partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
        }

        return;
      }

      partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
    }
  }
}

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const directives = new WeakMap();
const isDirective = o => {
  return typeof o === 'function' && directives.has(o);
};

/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * A sentinel value that signals that a value was handled by a directive and
 * should not be written to the DOM.
 */
const noChange = {};
/**
 * A sentinel value that signals a NodePart to fully clear its content.
 */

const nothing = {};

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * An instance of a `Template` that can be attached to the DOM and updated
 * with new values.
 */

class TemplateInstance {
  constructor(template, processor, options) {
    this.__parts = [];
    this.template = template;
    this.processor = processor;
    this.options = options;
  }

  update(values) {
    let i = 0;

    for (const part of this.__parts) {
      if (part !== undefined) {
        part.setValue(values[i]);
      }

      i++;
    }

    for (const part of this.__parts) {
      if (part !== undefined) {
        part.commit();
      }
    }
  }

  _clone() {
    // There are a number of steps in the lifecycle of a template instance's
    // DOM fragment:
    //  1. Clone - create the instance fragment
    //  2. Adopt - adopt into the main document
    //  3. Process - find part markers and create parts
    //  4. Upgrade - upgrade custom elements
    //  5. Update - set node, attribute, property, etc., values
    //  6. Connect - connect to the document. Optional and outside of this
    //     method.
    //
    // We have a few constraints on the ordering of these steps:
    //  * We need to upgrade before updating, so that property values will pass
    //    through any property setters.
    //  * We would like to process before upgrading so that we're sure that the
    //    cloned fragment is inert and not disturbed by self-modifying DOM.
    //  * We want custom elements to upgrade even in disconnected fragments.
    //
    // Given these constraints, with full custom elements support we would
    // prefer the order: Clone, Process, Adopt, Upgrade, Update, Connect
    //
    // But Safari does not implement CustomElementRegistry#upgrade, so we
    // can not implement that order and still have upgrade-before-update and
    // upgrade disconnected fragments. So we instead sacrifice the
    // process-before-upgrade constraint, since in Custom Elements v1 elements
    // must not modify their light DOM in the constructor. We still have issues
    // when co-existing with CEv0 elements like Polymer 1, and with polyfills
    // that don't strictly adhere to the no-modification rule because shadow
    // DOM, which may be created in the constructor, is emulated by being placed
    // in the light DOM.
    //
    // The resulting order is on native is: Clone, Adopt, Upgrade, Process,
    // Update, Connect. document.importNode() performs Clone, Adopt, and Upgrade
    // in one step.
    //
    // The Custom Elements v1 polyfill supports upgrade(), so the order when
    // polyfilled is the more ideal: Clone, Process, Adopt, Upgrade, Update,
    // Connect.
    const fragment = isCEPolyfill ? this.template.element.content.cloneNode(true) : document.importNode(this.template.element.content, true);
    const stack = [];
    const parts = this.template.parts; // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be null

    const walker = document.createTreeWalker(fragment, 133
    /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */
    , null, false);
    let partIndex = 0;
    let nodeIndex = 0;
    let part;
    let node = walker.nextNode(); // Loop through all the nodes and parts of a template

    while (partIndex < parts.length) {
      part = parts[partIndex];

      if (!isTemplatePartActive(part)) {
        this.__parts.push(undefined);

        partIndex++;
        continue;
      } // Progress the tree walker until we find our next part's node.
      // Note that multiple parts may share the same node (attribute parts
      // on a single element), so this loop may not run at all.


      while (nodeIndex < part.index) {
        nodeIndex++;

        if (node.nodeName === 'TEMPLATE') {
          stack.push(node);
          walker.currentNode = node.content;
        }

        if ((node = walker.nextNode()) === null) {
          // We've exhausted the content inside a nested template element.
          // Because we still have parts (the outer for-loop), we know:
          // - There is a template in the stack
          // - The walker will find a nextNode outside the template
          walker.currentNode = stack.pop();
          node = walker.nextNode();
        }
      } // We've arrived at our part's node.


      if (part.type === 'node') {
        const part = this.processor.handleTextExpression(this.options);
        part.insertAfterNode(node.previousSibling);

        this.__parts.push(part);
      } else {
        this.__parts.push(...this.processor.handleAttributeExpressions(node, part.name, part.strings, this.options));
      }

      partIndex++;
    }

    if (isCEPolyfill) {
      document.adoptNode(fragment);
      customElements.upgrade(fragment);
    }

    return fragment;
  }

}

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * Our TrustedTypePolicy for HTML which is declared using the html template
 * tag function.
 *
 * That HTML is a developer-authored constant, and is parsed with innerHTML
 * before any untrusted expressions have been mixed in. Therefor it is
 * considered safe by construction.
 */

const policy = window.trustedTypes && trustedTypes.createPolicy('lit-html', {
  createHTML: s => s
});
const commentMarker = ` ${marker} `;
/**
 * The return type of `html`, which holds a Template and the values from
 * interpolated expressions.
 */

class TemplateResult {
  constructor(strings, values, type, processor) {
    this.strings = strings;
    this.values = values;
    this.type = type;
    this.processor = processor;
  }
  /**
   * Returns a string of HTML used to create a `<template>` element.
   */


  getHTML() {
    const l = this.strings.length - 1;
    let html = '';
    let isCommentBinding = false;

    for (let i = 0; i < l; i++) {
      const s = this.strings[i]; // For each binding we want to determine the kind of marker to insert
      // into the template source before it's parsed by the browser's HTML
      // parser. The marker type is based on whether the expression is in an
      // attribute, text, or comment position.
      //   * For node-position bindings we insert a comment with the marker
      //     sentinel as its text content, like <!--{{lit-guid}}-->.
      //   * For attribute bindings we insert just the marker sentinel for the
      //     first binding, so that we support unquoted attribute bindings.
      //     Subsequent bindings can use a comment marker because multi-binding
      //     attributes must be quoted.
      //   * For comment bindings we insert just the marker sentinel so we don't
      //     close the comment.
      //
      // The following code scans the template source, but is *not* an HTML
      // parser. We don't need to track the tree structure of the HTML, only
      // whether a binding is inside a comment, and if not, if it appears to be
      // the first binding in an attribute.

      const commentOpen = s.lastIndexOf('<!--'); // We're in comment position if we have a comment open with no following
      // comment close. Because <-- can appear in an attribute value there can
      // be false positives.

      isCommentBinding = (commentOpen > -1 || isCommentBinding) && s.indexOf('-->', commentOpen + 1) === -1; // Check to see if we have an attribute-like sequence preceding the
      // expression. This can match "name=value" like structures in text,
      // comments, and attribute values, so there can be false-positives.

      const attributeMatch = lastAttributeNameRegex.exec(s);

      if (attributeMatch === null) {
        // We're only in this branch if we don't have a attribute-like
        // preceding sequence. For comments, this guards against unusual
        // attribute values like <div foo="<!--${'bar'}">. Cases like
        // <!-- foo=${'bar'}--> are handled correctly in the attribute branch
        // below.
        html += s + (isCommentBinding ? commentMarker : nodeMarker);
      } else {
        // For attributes we use just a marker sentinel, and also append a
        // $lit$ suffix to the name to opt-out of attribute-specific parsing
        // that IE and Edge do for style and certain SVG attributes.
        html += s.substr(0, attributeMatch.index) + attributeMatch[1] + attributeMatch[2] + boundAttributeSuffix + attributeMatch[3] + marker;
      }
    }

    html += this.strings[l];
    return html;
  }

  getTemplateElement() {
    const template = document.createElement('template');
    let value = this.getHTML();

    if (policy !== undefined) {
      // this is secure because `this.strings` is a TemplateStringsArray.
      // TODO: validate this when
      // https://github.com/tc39/proposal-array-is-template-object is
      // implemented.
      value = policy.createHTML(value);
    }

    template.innerHTML = value;
    return template;
  }

}

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const isPrimitive = value => {
  return value === null || !(typeof value === 'object' || typeof value === 'function');
};
const isIterable = value => {
  return Array.isArray(value) || // eslint-disable-next-line @typescript-eslint/no-explicit-any
  !!(value && value[Symbol.iterator]);
};
/**
 * Writes attribute values to the DOM for a group of AttributeParts bound to a
 * single attribute. The value is only set once even if there are multiple parts
 * for an attribute.
 */

class AttributeCommitter {
  constructor(element, name, strings) {
    this.dirty = true;
    this.element = element;
    this.name = name;
    this.strings = strings;
    this.parts = [];

    for (let i = 0; i < strings.length - 1; i++) {
      this.parts[i] = this._createPart();
    }
  }
  /**
   * Creates a single part. Override this to create a differnt type of part.
   */


  _createPart() {
    return new AttributePart(this);
  }

  _getValue() {
    const strings = this.strings;
    const l = strings.length - 1;
    const parts = this.parts; // If we're assigning an attribute via syntax like:
    //    attr="${foo}"  or  attr=${foo}
    // but not
    //    attr="${foo} ${bar}" or attr="${foo} baz"
    // then we don't want to coerce the attribute value into one long
    // string. Instead we want to just return the value itself directly,
    // so that sanitizeDOMValue can get the actual value rather than
    // String(value)
    // The exception is if v is an array, in which case we do want to smash
    // it together into a string without calling String() on the array.
    //
    // This also allows trusted values (when using TrustedTypes) being
    // assigned to DOM sinks without being stringified in the process.

    if (l === 1 && strings[0] === '' && strings[1] === '') {
      const v = parts[0].value;

      if (typeof v === 'symbol') {
        return String(v);
      }

      if (typeof v === 'string' || !isIterable(v)) {
        return v;
      }
    }

    let text = '';

    for (let i = 0; i < l; i++) {
      text += strings[i];
      const part = parts[i];

      if (part !== undefined) {
        const v = part.value;

        if (isPrimitive(v) || !isIterable(v)) {
          text += typeof v === 'string' ? v : String(v);
        } else {
          for (const t of v) {
            text += typeof t === 'string' ? t : String(t);
          }
        }
      }
    }

    text += strings[l];
    return text;
  }

  commit() {
    if (this.dirty) {
      this.dirty = false;
      this.element.setAttribute(this.name, this._getValue());
    }
  }

}
/**
 * A Part that controls all or part of an attribute value.
 */

class AttributePart {
  constructor(committer) {
    this.value = undefined;
    this.committer = committer;
  }

  setValue(value) {
    if (value !== noChange && (!isPrimitive(value) || value !== this.value)) {
      this.value = value; // If the value is a not a directive, dirty the committer so that it'll
      // call setAttribute. If the value is a directive, it'll dirty the
      // committer if it calls setValue().

      if (!isDirective(value)) {
        this.committer.dirty = true;
      }
    }
  }

  commit() {
    while (isDirective(this.value)) {
      const directive = this.value;
      this.value = noChange;
      directive(this);
    }

    if (this.value === noChange) {
      return;
    }

    this.committer.commit();
  }

}
/**
 * A Part that controls a location within a Node tree. Like a Range, NodePart
 * has start and end locations and can set and update the Nodes between those
 * locations.
 *
 * NodeParts support several value types: primitives, Nodes, TemplateResults,
 * as well as arrays and iterables of those types.
 */

class NodePart {
  constructor(options) {
    this.value = undefined;
    this.__pendingValue = undefined;
    this.options = options;
  }
  /**
   * Appends this part into a container.
   *
   * This part must be empty, as its contents are not automatically moved.
   */


  appendInto(container) {
    this.startNode = container.appendChild(createMarker());
    this.endNode = container.appendChild(createMarker());
  }
  /**
   * Inserts this part after the `ref` node (between `ref` and `ref`'s next
   * sibling). Both `ref` and its next sibling must be static, unchanging nodes
   * such as those that appear in a literal section of a template.
   *
   * This part must be empty, as its contents are not automatically moved.
   */


  insertAfterNode(ref) {
    this.startNode = ref;
    this.endNode = ref.nextSibling;
  }
  /**
   * Appends this part into a parent part.
   *
   * This part must be empty, as its contents are not automatically moved.
   */


  appendIntoPart(part) {
    part.__insert(this.startNode = createMarker());

    part.__insert(this.endNode = createMarker());
  }
  /**
   * Inserts this part after the `ref` part.
   *
   * This part must be empty, as its contents are not automatically moved.
   */


  insertAfterPart(ref) {
    ref.__insert(this.startNode = createMarker());

    this.endNode = ref.endNode;
    ref.endNode = this.startNode;
  }

  setValue(value) {
    this.__pendingValue = value;
  }

  commit() {
    if (this.startNode.parentNode === null) {
      return;
    }

    while (isDirective(this.__pendingValue)) {
      const directive = this.__pendingValue;
      this.__pendingValue = noChange;
      directive(this);
    }

    const value = this.__pendingValue;

    if (value === noChange) {
      return;
    }

    if (isPrimitive(value)) {
      if (value !== this.value) {
        this.__commitText(value);
      }
    } else if (value instanceof TemplateResult) {
      this.__commitTemplateResult(value);
    } else if (value instanceof Node) {
      this.__commitNode(value);
    } else if (isIterable(value)) {
      this.__commitIterable(value);
    } else if (value === nothing) {
      this.value = nothing;
      this.clear();
    } else {
      // Fallback, will render the string representation
      this.__commitText(value);
    }
  }

  __insert(node) {
    this.endNode.parentNode.insertBefore(node, this.endNode);
  }

  __commitNode(value) {
    if (this.value === value) {
      return;
    }

    this.clear();

    this.__insert(value);

    this.value = value;
  }

  __commitText(value) {
    const node = this.startNode.nextSibling;
    value = value == null ? '' : value; // If `value` isn't already a string, we explicitly convert it here in case
    // it can't be implicitly converted - i.e. it's a symbol.

    const valueAsString = typeof value === 'string' ? value : String(value);

    if (node === this.endNode.previousSibling && node.nodeType === 3
    /* Node.TEXT_NODE */
    ) {
        // If we only have a single text node between the markers, we can just
        // set its value, rather than replacing it.
        // TODO(justinfagnani): Can we just check if this.value is primitive?
        node.data = valueAsString;
      } else {
      this.__commitNode(document.createTextNode(valueAsString));
    }

    this.value = value;
  }

  __commitTemplateResult(value) {
    const template = this.options.templateFactory(value);

    if (this.value instanceof TemplateInstance && this.value.template === template) {
      this.value.update(value.values);
    } else {
      // Make sure we propagate the template processor from the TemplateResult
      // so that we use its syntax extension, etc. The template factory comes
      // from the render function options so that it can control template
      // caching and preprocessing.
      const instance = new TemplateInstance(template, value.processor, this.options);

      const fragment = instance._clone();

      instance.update(value.values);

      this.__commitNode(fragment);

      this.value = instance;
    }
  }

  __commitIterable(value) {
    // For an Iterable, we create a new InstancePart per item, then set its
    // value to the item. This is a little bit of overhead for every item in
    // an Iterable, but it lets us recurse easily and efficiently update Arrays
    // of TemplateResults that will be commonly returned from expressions like:
    // array.map((i) => html`${i}`), by reusing existing TemplateInstances.
    // If _value is an array, then the previous render was of an
    // iterable and _value will contain the NodeParts from the previous
    // render. If _value is not an array, clear this part and make a new
    // array for NodeParts.
    if (!Array.isArray(this.value)) {
      this.value = [];
      this.clear();
    } // Lets us keep track of how many items we stamped so we can clear leftover
    // items from a previous render


    const itemParts = this.value;
    let partIndex = 0;
    let itemPart;

    for (const item of value) {
      // Try to reuse an existing part
      itemPart = itemParts[partIndex]; // If no existing part, create a new one

      if (itemPart === undefined) {
        itemPart = new NodePart(this.options);
        itemParts.push(itemPart);

        if (partIndex === 0) {
          itemPart.appendIntoPart(this);
        } else {
          itemPart.insertAfterPart(itemParts[partIndex - 1]);
        }
      }

      itemPart.setValue(item);
      itemPart.commit();
      partIndex++;
    }

    if (partIndex < itemParts.length) {
      // Truncate the parts array so _value reflects the current state
      itemParts.length = partIndex;
      this.clear(itemPart && itemPart.endNode);
    }
  }

  clear(startNode = this.startNode) {
    removeNodes(this.startNode.parentNode, startNode.nextSibling, this.endNode);
  }

}
/**
 * Implements a boolean attribute, roughly as defined in the HTML
 * specification.
 *
 * If the value is truthy, then the attribute is present with a value of
 * ''. If the value is falsey, the attribute is removed.
 */

class BooleanAttributePart {
  constructor(element, name, strings) {
    this.value = undefined;
    this.__pendingValue = undefined;

    if (strings.length !== 2 || strings[0] !== '' || strings[1] !== '') {
      throw new Error('Boolean attributes can only contain a single expression');
    }

    this.element = element;
    this.name = name;
    this.strings = strings;
  }

  setValue(value) {
    this.__pendingValue = value;
  }

  commit() {
    while (isDirective(this.__pendingValue)) {
      const directive = this.__pendingValue;
      this.__pendingValue = noChange;
      directive(this);
    }

    if (this.__pendingValue === noChange) {
      return;
    }

    const value = !!this.__pendingValue;

    if (this.value !== value) {
      if (value) {
        this.element.setAttribute(this.name, '');
      } else {
        this.element.removeAttribute(this.name);
      }

      this.value = value;
    }

    this.__pendingValue = noChange;
  }

}
/**
 * Sets attribute values for PropertyParts, so that the value is only set once
 * even if there are multiple parts for a property.
 *
 * If an expression controls the whole property value, then the value is simply
 * assigned to the property under control. If there are string literals or
 * multiple expressions, then the strings are expressions are interpolated into
 * a string first.
 */

class PropertyCommitter extends AttributeCommitter {
  constructor(element, name, strings) {
    super(element, name, strings);
    this.single = strings.length === 2 && strings[0] === '' && strings[1] === '';
  }

  _createPart() {
    return new PropertyPart(this);
  }

  _getValue() {
    if (this.single) {
      return this.parts[0].value;
    }

    return super._getValue();
  }

  commit() {
    if (this.dirty) {
      this.dirty = false; // eslint-disable-next-line @typescript-eslint/no-explicit-any

      this.element[this.name] = this._getValue();
    }
  }

}
class PropertyPart extends AttributePart {} // Detect event listener options support. If the `capture` property is read
// from the options object, then options are supported. If not, then the third
// argument to add/removeEventListener is interpreted as the boolean capture
// value so we should only pass the `capture` property.

let eventOptionsSupported = false; // Wrap into an IIFE because MS Edge <= v41 does not support having try/catch
// blocks right into the body of a module

(() => {
  try {
    const options = {
      get capture() {
        eventOptionsSupported = true;
        return false;
      }

    }; // eslint-disable-next-line @typescript-eslint/no-explicit-any

    window.addEventListener('test', options, options); // eslint-disable-next-line @typescript-eslint/no-explicit-any

    window.removeEventListener('test', options, options);
  } catch (_e) {// event options not supported
  }
})();

class EventPart {
  constructor(element, eventName, eventContext) {
    this.value = undefined;
    this.__pendingValue = undefined;
    this.element = element;
    this.eventName = eventName;
    this.eventContext = eventContext;

    this.__boundHandleEvent = e => this.handleEvent(e);
  }

  setValue(value) {
    this.__pendingValue = value;
  }

  commit() {
    while (isDirective(this.__pendingValue)) {
      const directive = this.__pendingValue;
      this.__pendingValue = noChange;
      directive(this);
    }

    if (this.__pendingValue === noChange) {
      return;
    }

    const newListener = this.__pendingValue;
    const oldListener = this.value;
    const shouldRemoveListener = newListener == null || oldListener != null && (newListener.capture !== oldListener.capture || newListener.once !== oldListener.once || newListener.passive !== oldListener.passive);
    const shouldAddListener = newListener != null && (oldListener == null || shouldRemoveListener);

    if (shouldRemoveListener) {
      this.element.removeEventListener(this.eventName, this.__boundHandleEvent, this.__options);
    }

    if (shouldAddListener) {
      this.__options = getOptions(newListener);
      this.element.addEventListener(this.eventName, this.__boundHandleEvent, this.__options);
    }

    this.value = newListener;
    this.__pendingValue = noChange;
  }

  handleEvent(event) {
    if (typeof this.value === 'function') {
      this.value.call(this.eventContext || this.element, event);
    } else {
      this.value.handleEvent(event);
    }
  }

} // We copy options because of the inconsistent behavior of browsers when reading
// the third argument of add/removeEventListener. IE11 doesn't support options
// at all. Chrome 41 only reads `capture` if the argument is an object.

const getOptions = o => o && (eventOptionsSupported ? {
  capture: o.capture,
  passive: o.passive,
  once: o.once
} : o.capture);

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * The default TemplateFactory which caches Templates keyed on
 * result.type and result.strings.
 */

function templateFactory(result) {
  let templateCache = templateCaches.get(result.type);

  if (templateCache === undefined) {
    templateCache = {
      stringsArray: new WeakMap(),
      keyString: new Map()
    };
    templateCaches.set(result.type, templateCache);
  }

  let template = templateCache.stringsArray.get(result.strings);

  if (template !== undefined) {
    return template;
  } // If the TemplateStringsArray is new, generate a key from the strings
  // This key is shared between all templates with identical content


  const key = result.strings.join(marker); // Check if we already have a Template for this key

  template = templateCache.keyString.get(key);

  if (template === undefined) {
    // If we have not seen this key before, create a new Template
    template = new Template(result, result.getTemplateElement()); // Cache the Template for this key

    templateCache.keyString.set(key, template);
  } // Cache all future queries for this TemplateStringsArray


  templateCache.stringsArray.set(result.strings, template);
  return template;
}
const templateCaches = new Map();

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const parts = new WeakMap();
/**
 * Renders a template result or other value to a container.
 *
 * To update a container with new values, reevaluate the template literal and
 * call `render` with the new result.
 *
 * @param result Any value renderable by NodePart - typically a TemplateResult
 *     created by evaluating a template tag like `html` or `svg`.
 * @param container A DOM parent to render to. The entire contents are either
 *     replaced, or efficiently updated if the same result type was previous
 *     rendered there.
 * @param options RenderOptions for the entire render tree rendered to this
 *     container. Render options must *not* change between renders to the same
 *     container, as those changes will not effect previously rendered DOM.
 */

const render = (result, container, options) => {
  let part = parts.get(container);

  if (part === undefined) {
    removeNodes(container, container.firstChild);
    parts.set(container, part = new NodePart(Object.assign({
      templateFactory
    }, options)));
    part.appendInto(container);
  }

  part.setValue(result);
  part.commit();
};

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * Creates Parts when a template is instantiated.
 */

class DefaultTemplateProcessor {
  /**
   * Create parts for an attribute-position binding, given the event, attribute
   * name, and string literals.
   *
   * @param element The element containing the binding
   * @param name  The attribute name
   * @param strings The string literals. There are always at least two strings,
   *   event for fully-controlled bindings with a single expression.
   */
  handleAttributeExpressions(element, name, strings, options) {
    const prefix = name[0];

    if (prefix === '.') {
      const committer = new PropertyCommitter(element, name.slice(1), strings);
      return committer.parts;
    }

    if (prefix === '@') {
      return [new EventPart(element, name.slice(1), options.eventContext)];
    }

    if (prefix === '?') {
      return [new BooleanAttributePart(element, name.slice(1), strings)];
    }

    const committer = new AttributeCommitter(element, name, strings);
    return committer.parts;
  }
  /**
   * Create parts for a text-position binding.
   * @param templateFactory
   */


  handleTextExpression(options) {
    return new NodePart(options);
  }

}
const defaultTemplateProcessor = new DefaultTemplateProcessor();

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
// This line will be used in regexes to search for lit-html usage.
// TODO(justinfagnani): inject version number at build time

if (typeof window !== 'undefined') {
  (window['litHtmlVersions'] || (window['litHtmlVersions'] = [])).push('1.4.1');
}
/**
 * Interprets a template literal as an HTML template that can efficiently
 * render to and update a container.
 */


const html = (strings, ...values) => new TemplateResult(strings, values, 'html', defaultTemplateProcessor);

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

const getTemplateCacheKey = (type, scopeName) => `${type}--${scopeName}`;

let compatibleShadyCSSVersion = true;

if (typeof window.ShadyCSS === 'undefined') {
  compatibleShadyCSSVersion = false;
} else if (typeof window.ShadyCSS.prepareTemplateDom === 'undefined') {
  console.warn(`Incompatible ShadyCSS version detected. ` + `Please update to at least @webcomponents/webcomponentsjs@2.0.2 and ` + `@webcomponents/shadycss@1.3.1.`);
  compatibleShadyCSSVersion = false;
}
/**
 * Template factory which scopes template DOM using ShadyCSS.
 * @param scopeName {string}
 */


const shadyTemplateFactory = scopeName => result => {
  const cacheKey = getTemplateCacheKey(result.type, scopeName);
  let templateCache = templateCaches.get(cacheKey);

  if (templateCache === undefined) {
    templateCache = {
      stringsArray: new WeakMap(),
      keyString: new Map()
    };
    templateCaches.set(cacheKey, templateCache);
  }

  let template = templateCache.stringsArray.get(result.strings);

  if (template !== undefined) {
    return template;
  }

  const key = result.strings.join(marker);
  template = templateCache.keyString.get(key);

  if (template === undefined) {
    const element = result.getTemplateElement();

    if (compatibleShadyCSSVersion) {
      window.ShadyCSS.prepareTemplateDom(element, scopeName);
    }

    template = new Template(result, element);
    templateCache.keyString.set(key, template);
  }

  templateCache.stringsArray.set(result.strings, template);
  return template;
};
const TEMPLATE_TYPES = ['html', 'svg'];
/**
 * Removes all style elements from Templates for the given scopeName.
 */

const removeStylesFromLitTemplates = scopeName => {
  TEMPLATE_TYPES.forEach(type => {
    const templates = templateCaches.get(getTemplateCacheKey(type, scopeName));

    if (templates !== undefined) {
      templates.keyString.forEach(template => {
        const {
          element: {
            content
          }
        } = template; // IE 11 doesn't support the iterable param Set constructor

        const styles = new Set();
        Array.from(content.querySelectorAll('style')).forEach(s => {
          styles.add(s);
        });
        removeNodesFromTemplate(template, styles);
      });
    }
  });
};

const shadyRenderSet = new Set();
/**
 * For the given scope name, ensures that ShadyCSS style scoping is performed.
 * This is done just once per scope name so the fragment and template cannot
 * be modified.
 * (1) extracts styles from the rendered fragment and hands them to ShadyCSS
 * to be scoped and appended to the document
 * (2) removes style elements from all lit-html Templates for this scope name.
 *
 * Note, <style> elements can only be placed into templates for the
 * initial rendering of the scope. If <style> elements are included in templates
 * dynamically rendered to the scope (after the first scope render), they will
 * not be scoped and the <style> will be left in the template and rendered
 * output.
 */

const prepareTemplateStyles = (scopeName, renderedDOM, template) => {
  shadyRenderSet.add(scopeName); // If `renderedDOM` is stamped from a Template, then we need to edit that
  // Template's underlying template element. Otherwise, we create one here
  // to give to ShadyCSS, which still requires one while scoping.

  const templateElement = !!template ? template.element : document.createElement('template'); // Move styles out of rendered DOM and store.

  const styles = renderedDOM.querySelectorAll('style');
  const {
    length
  } = styles; // If there are no styles, skip unnecessary work

  if (length === 0) {
    // Ensure prepareTemplateStyles is called to support adding
    // styles via `prepareAdoptedCssText` since that requires that
    // `prepareTemplateStyles` is called.
    //
    // ShadyCSS will only update styles containing @apply in the template
    // given to `prepareTemplateStyles`. If no lit Template was given,
    // ShadyCSS will not be able to update uses of @apply in any relevant
    // template. However, this is not a problem because we only create the
    // template for the purpose of supporting `prepareAdoptedCssText`,
    // which doesn't support @apply at all.
    window.ShadyCSS.prepareTemplateStyles(templateElement, scopeName);
    return;
  }

  const condensedStyle = document.createElement('style'); // Collect styles into a single style. This helps us make sure ShadyCSS
  // manipulations will not prevent us from being able to fix up template
  // part indices.
  // NOTE: collecting styles is inefficient for browsers but ShadyCSS
  // currently does this anyway. When it does not, this should be changed.

  for (let i = 0; i < length; i++) {
    const style = styles[i];
    style.parentNode.removeChild(style);
    condensedStyle.textContent += style.textContent;
  } // Remove styles from nested templates in this scope.


  removeStylesFromLitTemplates(scopeName); // And then put the condensed style into the "root" template passed in as
  // `template`.

  const content = templateElement.content;

  if (!!template) {
    insertNodeIntoTemplate(template, condensedStyle, content.firstChild);
  } else {
    content.insertBefore(condensedStyle, content.firstChild);
  } // Note, it's important that ShadyCSS gets the template that `lit-html`
  // will actually render so that it can update the style inside when
  // needed (e.g. @apply native Shadow DOM case).


  window.ShadyCSS.prepareTemplateStyles(templateElement, scopeName);
  const style = content.querySelector('style');

  if (window.ShadyCSS.nativeShadow && style !== null) {
    // When in native Shadow DOM, ensure the style created by ShadyCSS is
    // included in initially rendered output (`renderedDOM`).
    renderedDOM.insertBefore(style.cloneNode(true), renderedDOM.firstChild);
  } else if (!!template) {
    // When no style is left in the template, parts will be broken as a
    // result. To fix this, we put back the style node ShadyCSS removed
    // and then tell lit to remove that node from the template.
    // There can be no style in the template in 2 cases (1) when Shady DOM
    // is in use, ShadyCSS removes all styles, (2) when native Shadow DOM
    // is in use ShadyCSS removes the style if it contains no content.
    // NOTE, ShadyCSS creates its own style so we can safely add/remove
    // `condensedStyle` here.
    content.insertBefore(condensedStyle, content.firstChild);
    const removes = new Set();
    removes.add(condensedStyle);
    removeNodesFromTemplate(template, removes);
  }
};
/**
 * Extension to the standard `render` method which supports rendering
 * to ShadowRoots when the ShadyDOM (https://github.com/webcomponents/shadydom)
 * and ShadyCSS (https://github.com/webcomponents/shadycss) polyfills are used
 * or when the webcomponentsjs
 * (https://github.com/webcomponents/webcomponentsjs) polyfill is used.
 *
 * Adds a `scopeName` option which is used to scope element DOM and stylesheets
 * when native ShadowDOM is unavailable. The `scopeName` will be added to
 * the class attribute of all rendered DOM. In addition, any style elements will
 * be automatically re-written with this `scopeName` selector and moved out
 * of the rendered DOM and into the document `<head>`.
 *
 * It is common to use this render method in conjunction with a custom element
 * which renders a shadowRoot. When this is done, typically the element's
 * `localName` should be used as the `scopeName`.
 *
 * In addition to DOM scoping, ShadyCSS also supports a basic shim for css
 * custom properties (needed only on older browsers like IE11) and a shim for
 * a deprecated feature called `@apply` that supports applying a set of css
 * custom properties to a given location.
 *
 * Usage considerations:
 *
 * * Part values in `<style>` elements are only applied the first time a given
 * `scopeName` renders. Subsequent changes to parts in style elements will have
 * no effect. Because of this, parts in style elements should only be used for
 * values that will never change, for example parts that set scope-wide theme
 * values or parts which render shared style elements.
 *
 * * Note, due to a limitation of the ShadyDOM polyfill, rendering in a
 * custom element's `constructor` is not supported. Instead rendering should
 * either done asynchronously, for example at microtask timing (for example
 * `Promise.resolve()`), or be deferred until the first time the element's
 * `connectedCallback` runs.
 *
 * Usage considerations when using shimmed custom properties or `@apply`:
 *
 * * Whenever any dynamic changes are made which affect
 * css custom properties, `ShadyCSS.styleElement(element)` must be called
 * to update the element. There are two cases when this is needed:
 * (1) the element is connected to a new parent, (2) a class is added to the
 * element that causes it to match different custom properties.
 * To address the first case when rendering a custom element, `styleElement`
 * should be called in the element's `connectedCallback`.
 *
 * * Shimmed custom properties may only be defined either for an entire
 * shadowRoot (for example, in a `:host` rule) or via a rule that directly
 * matches an element with a shadowRoot. In other words, instead of flowing from
 * parent to child as do native css custom properties, shimmed custom properties
 * flow only from shadowRoots to nested shadowRoots.
 *
 * * When using `@apply` mixing css shorthand property names with
 * non-shorthand names (for example `border` and `border-width`) is not
 * supported.
 */


const render$1 = (result, container, options) => {
  if (!options || typeof options !== 'object' || !options.scopeName) {
    throw new Error('The `scopeName` option is required.');
  }

  const scopeName = options.scopeName;
  const hasRendered = parts.has(container);
  const needsScoping = compatibleShadyCSSVersion && container.nodeType === 11
  /* Node.DOCUMENT_FRAGMENT_NODE */
  && !!container.host; // Handle first render to a scope specially...

  const firstScopeRender = needsScoping && !shadyRenderSet.has(scopeName); // On first scope render, render into a fragment; this cannot be a single
  // fragment that is reused since nested renders can occur synchronously.

  const renderContainer = firstScopeRender ? document.createDocumentFragment() : container;
  render(result, renderContainer, Object.assign({
    templateFactory: shadyTemplateFactory(scopeName)
  }, options)); // When performing first scope render,
  // (1) We've rendered into a fragment so that there's a chance to
  // `prepareTemplateStyles` before sub-elements hit the DOM
  // (which might cause them to render based on a common pattern of
  // rendering in a custom element's `connectedCallback`);
  // (2) Scope the template with ShadyCSS one time only for this scope.
  // (3) Render the fragment into the container and make sure the
  // container knows its `part` is the one we just rendered. This ensures
  // DOM will be re-used on subsequent renders.

  if (firstScopeRender) {
    const part = parts.get(renderContainer);
    parts.delete(renderContainer); // ShadyCSS might have style sheets (e.g. from `prepareAdoptedCssText`)
    // that should apply to `renderContainer` even if the rendered value is
    // not a TemplateInstance. However, it will only insert scoped styles
    // into the document if `prepareTemplateStyles` has already been called
    // for the given scope name.

    const template = part.value instanceof TemplateInstance ? part.value.template : undefined;
    prepareTemplateStyles(scopeName, renderContainer, template);
    removeNodes(container, container.firstChild);
    container.appendChild(renderContainer);
    parts.set(container, part);
  } // After elements have hit the DOM, update styling if this is the
  // initial render to this container.
  // This is needed whenever dynamic changes are made so it would be
  // safest to do every render; however, this would regress performance
  // so we leave it up to the user to call `ShadyCSS.styleElement`
  // for dynamic changes.


  if (!hasRendered && needsScoping) {
    window.ShadyCSS.styleElement(container.host);
  }
};

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
var _a;
/**
 * Use this module if you want to create your own base class extending
 * [[UpdatingElement]].
 * @packageDocumentation
 */

/*
 * When using Closure Compiler, JSCompiler_renameProperty(property, object) is
 * replaced at compile time by the munged name for object[property]. We cannot
 * alias this function, so we have to use a small shim that has the same
 * behavior when not compiling.
 */


window.JSCompiler_renameProperty = (prop, _obj) => prop;

const defaultConverter = {
  toAttribute(value, type) {
    switch (type) {
      case Boolean:
        return value ? '' : null;

      case Object:
      case Array:
        // if the value is `null` or `undefined` pass this through
        // to allow removing/no change behavior.
        return value == null ? value : JSON.stringify(value);
    }

    return value;
  },

  fromAttribute(value, type) {
    switch (type) {
      case Boolean:
        return value !== null;

      case Number:
        return value === null ? null : Number(value);

      case Object:
      case Array:
        // Type assert to adhere to Bazel's "must type assert JSON parse" rule.
        return JSON.parse(value);
    }

    return value;
  }

};
/**
 * Change function that returns true if `value` is different from `oldValue`.
 * This method is used as the default for a property's `hasChanged` function.
 */

const notEqual = (value, old) => {
  // This ensures (old==NaN, value==NaN) always returns false
  return old !== value && (old === old || value === value);
};
const defaultPropertyDeclaration = {
  attribute: true,
  type: String,
  converter: defaultConverter,
  reflect: false,
  hasChanged: notEqual
};
const STATE_HAS_UPDATED = 1;
const STATE_UPDATE_REQUESTED = 1 << 2;
const STATE_IS_REFLECTING_TO_ATTRIBUTE = 1 << 3;
const STATE_IS_REFLECTING_TO_PROPERTY = 1 << 4;
/**
 * The Closure JS Compiler doesn't currently have good support for static
 * property semantics where "this" is dynamic (e.g.
 * https://github.com/google/closure-compiler/issues/3177 and others) so we use
 * this hack to bypass any rewriting by the compiler.
 */

const finalized = 'finalized';
/**
 * Base element class which manages element properties and attributes. When
 * properties change, the `update` method is asynchronously called. This method
 * should be supplied by subclassers to render updates as desired.
 * @noInheritDoc
 */

class UpdatingElement extends HTMLElement {
  constructor() {
    super();
    this.initialize();
  }
  /**
   * Returns a list of attributes corresponding to the registered properties.
   * @nocollapse
   */


  static get observedAttributes() {
    // note: piggy backing on this to ensure we're finalized.
    this.finalize();
    const attributes = []; // Use forEach so this works even if for/of loops are compiled to for loops
    // expecting arrays

    this._classProperties.forEach((v, p) => {
      const attr = this._attributeNameForProperty(p, v);

      if (attr !== undefined) {
        this._attributeToPropertyMap.set(attr, p);

        attributes.push(attr);
      }
    });

    return attributes;
  }
  /**
   * Ensures the private `_classProperties` property metadata is created.
   * In addition to `finalize` this is also called in `createProperty` to
   * ensure the `@property` decorator can add property metadata.
   */

  /** @nocollapse */


  static _ensureClassProperties() {
    // ensure private storage for property declarations.
    if (!this.hasOwnProperty(JSCompiler_renameProperty('_classProperties', this))) {
      this._classProperties = new Map(); // NOTE: Workaround IE11 not supporting Map constructor argument.

      const superProperties = Object.getPrototypeOf(this)._classProperties;

      if (superProperties !== undefined) {
        superProperties.forEach((v, k) => this._classProperties.set(k, v));
      }
    }
  }
  /**
   * Creates a property accessor on the element prototype if one does not exist
   * and stores a PropertyDeclaration for the property with the given options.
   * The property setter calls the property's `hasChanged` property option
   * or uses a strict identity check to determine whether or not to request
   * an update.
   *
   * This method may be overridden to customize properties; however,
   * when doing so, it's important to call `super.createProperty` to ensure
   * the property is setup correctly. This method calls
   * `getPropertyDescriptor` internally to get a descriptor to install.
   * To customize what properties do when they are get or set, override
   * `getPropertyDescriptor`. To customize the options for a property,
   * implement `createProperty` like this:
   *
   * static createProperty(name, options) {
   *   options = Object.assign(options, {myOption: true});
   *   super.createProperty(name, options);
   * }
   *
   * @nocollapse
   */


  static createProperty(name, options = defaultPropertyDeclaration) {
    // Note, since this can be called by the `@property` decorator which
    // is called before `finalize`, we ensure storage exists for property
    // metadata.
    this._ensureClassProperties();

    this._classProperties.set(name, options); // Do not generate an accessor if the prototype already has one, since
    // it would be lost otherwise and that would never be the user's intention;
    // Instead, we expect users to call `requestUpdate` themselves from
    // user-defined accessors. Note that if the super has an accessor we will
    // still overwrite it


    if (options.noAccessor || this.prototype.hasOwnProperty(name)) {
      return;
    }

    const key = typeof name === 'symbol' ? Symbol() : `__${name}`;
    const descriptor = this.getPropertyDescriptor(name, key, options);

    if (descriptor !== undefined) {
      Object.defineProperty(this.prototype, name, descriptor);
    }
  }
  /**
   * Returns a property descriptor to be defined on the given named property.
   * If no descriptor is returned, the property will not become an accessor.
   * For example,
   *
   *   class MyElement extends LitElement {
   *     static getPropertyDescriptor(name, key, options) {
   *       const defaultDescriptor =
   *           super.getPropertyDescriptor(name, key, options);
   *       const setter = defaultDescriptor.set;
   *       return {
   *         get: defaultDescriptor.get,
   *         set(value) {
   *           setter.call(this, value);
   *           // custom action.
   *         },
   *         configurable: true,
   *         enumerable: true
   *       }
   *     }
   *   }
   *
   * @nocollapse
   */


  static getPropertyDescriptor(name, key, options) {
    return {
      // tslint:disable-next-line:no-any no symbol in index
      get() {
        return this[key];
      },

      set(value) {
        const oldValue = this[name];
        this[key] = value;
        this.requestUpdateInternal(name, oldValue, options);
      },

      configurable: true,
      enumerable: true
    };
  }
  /**
   * Returns the property options associated with the given property.
   * These options are defined with a PropertyDeclaration via the `properties`
   * object or the `@property` decorator and are registered in
   * `createProperty(...)`.
   *
   * Note, this method should be considered "final" and not overridden. To
   * customize the options for a given property, override `createProperty`.
   *
   * @nocollapse
   * @final
   */


  static getPropertyOptions(name) {
    return this._classProperties && this._classProperties.get(name) || defaultPropertyDeclaration;
  }
  /**
   * Creates property accessors for registered properties and ensures
   * any superclasses are also finalized.
   * @nocollapse
   */


  static finalize() {
    // finalize any superclasses
    const superCtor = Object.getPrototypeOf(this);

    if (!superCtor.hasOwnProperty(finalized)) {
      superCtor.finalize();
    }

    this[finalized] = true;

    this._ensureClassProperties(); // initialize Map populated in observedAttributes


    this._attributeToPropertyMap = new Map(); // make any properties
    // Note, only process "own" properties since this element will inherit
    // any properties defined on the superClass, and finalization ensures
    // the entire prototype chain is finalized.

    if (this.hasOwnProperty(JSCompiler_renameProperty('properties', this))) {
      const props = this.properties; // support symbols in properties (IE11 does not support this)

      const propKeys = [...Object.getOwnPropertyNames(props), ...(typeof Object.getOwnPropertySymbols === 'function' ? Object.getOwnPropertySymbols(props) : [])]; // This for/of is ok because propKeys is an array

      for (const p of propKeys) {
        // note, use of `any` is due to TypeSript lack of support for symbol in
        // index types
        // tslint:disable-next-line:no-any no symbol in index
        this.createProperty(p, props[p]);
      }
    }
  }
  /**
   * Returns the property name for the given attribute `name`.
   * @nocollapse
   */


  static _attributeNameForProperty(name, options) {
    const attribute = options.attribute;
    return attribute === false ? undefined : typeof attribute === 'string' ? attribute : typeof name === 'string' ? name.toLowerCase() : undefined;
  }
  /**
   * Returns true if a property should request an update.
   * Called when a property value is set and uses the `hasChanged`
   * option for the property if present or a strict identity check.
   * @nocollapse
   */


  static _valueHasChanged(value, old, hasChanged = notEqual) {
    return hasChanged(value, old);
  }
  /**
   * Returns the property value for the given attribute value.
   * Called via the `attributeChangedCallback` and uses the property's
   * `converter` or `converter.fromAttribute` property option.
   * @nocollapse
   */


  static _propertyValueFromAttribute(value, options) {
    const type = options.type;
    const converter = options.converter || defaultConverter;
    const fromAttribute = typeof converter === 'function' ? converter : converter.fromAttribute;
    return fromAttribute ? fromAttribute(value, type) : value;
  }
  /**
   * Returns the attribute value for the given property value. If this
   * returns undefined, the property will *not* be reflected to an attribute.
   * If this returns null, the attribute will be removed, otherwise the
   * attribute will be set to the value.
   * This uses the property's `reflect` and `type.toAttribute` property options.
   * @nocollapse
   */


  static _propertyValueToAttribute(value, options) {
    if (options.reflect === undefined) {
      return;
    }

    const type = options.type;
    const converter = options.converter;
    const toAttribute = converter && converter.toAttribute || defaultConverter.toAttribute;
    return toAttribute(value, type);
  }
  /**
   * Performs element initialization. By default captures any pre-set values for
   * registered properties.
   */


  initialize() {
    this._updateState = 0;
    this._updatePromise = new Promise(res => this._enableUpdatingResolver = res);
    this._changedProperties = new Map();

    this._saveInstanceProperties(); // ensures first update will be caught by an early access of
    // `updateComplete`


    this.requestUpdateInternal();
  }
  /**
   * Fixes any properties set on the instance before upgrade time.
   * Otherwise these would shadow the accessor and break these properties.
   * The properties are stored in a Map which is played back after the
   * constructor runs. Note, on very old versions of Safari (<=9) or Chrome
   * (<=41), properties created for native platform properties like (`id` or
   * `name`) may not have default values set in the element constructor. On
   * these browsers native properties appear on instances and therefore their
   * default value will overwrite any element default (e.g. if the element sets
   * this.id = 'id' in the constructor, the 'id' will become '' since this is
   * the native platform default).
   */


  _saveInstanceProperties() {
    // Use forEach so this works even if for/of loops are compiled to for loops
    // expecting arrays
    this.constructor._classProperties.forEach((_v, p) => {
      if (this.hasOwnProperty(p)) {
        const value = this[p];
        delete this[p];

        if (!this._instanceProperties) {
          this._instanceProperties = new Map();
        }

        this._instanceProperties.set(p, value);
      }
    });
  }
  /**
   * Applies previously saved instance properties.
   */


  _applyInstanceProperties() {
    // Use forEach so this works even if for/of loops are compiled to for loops
    // expecting arrays
    // tslint:disable-next-line:no-any
    this._instanceProperties.forEach((v, p) => this[p] = v);

    this._instanceProperties = undefined;
  }

  connectedCallback() {
    // Ensure first connection completes an update. Updates cannot complete
    // before connection.
    this.enableUpdating();
  }

  enableUpdating() {
    if (this._enableUpdatingResolver !== undefined) {
      this._enableUpdatingResolver();

      this._enableUpdatingResolver = undefined;
    }
  }
  /**
   * Allows for `super.disconnectedCallback()` in extensions while
   * reserving the possibility of making non-breaking feature additions
   * when disconnecting at some point in the future.
   */


  disconnectedCallback() {}
  /**
   * Synchronizes property values when attributes change.
   */


  attributeChangedCallback(name, old, value) {
    if (old !== value) {
      this._attributeToProperty(name, value);
    }
  }

  _propertyToAttribute(name, value, options = defaultPropertyDeclaration) {
    const ctor = this.constructor;

    const attr = ctor._attributeNameForProperty(name, options);

    if (attr !== undefined) {
      const attrValue = ctor._propertyValueToAttribute(value, options); // an undefined value does not change the attribute.


      if (attrValue === undefined) {
        return;
      } // Track if the property is being reflected to avoid
      // setting the property again via `attributeChangedCallback`. Note:
      // 1. this takes advantage of the fact that the callback is synchronous.
      // 2. will behave incorrectly if multiple attributes are in the reaction
      // stack at time of calling. However, since we process attributes
      // in `update` this should not be possible (or an extreme corner case
      // that we'd like to discover).
      // mark state reflecting


      this._updateState = this._updateState | STATE_IS_REFLECTING_TO_ATTRIBUTE;

      if (attrValue == null) {
        this.removeAttribute(attr);
      } else {
        this.setAttribute(attr, attrValue);
      } // mark state not reflecting


      this._updateState = this._updateState & ~STATE_IS_REFLECTING_TO_ATTRIBUTE;
    }
  }

  _attributeToProperty(name, value) {
    // Use tracking info to avoid deserializing attribute value if it was
    // just set from a property setter.
    if (this._updateState & STATE_IS_REFLECTING_TO_ATTRIBUTE) {
      return;
    }

    const ctor = this.constructor; // Note, hint this as an `AttributeMap` so closure clearly understands
    // the type; it has issues with tracking types through statics
    // tslint:disable-next-line:no-unnecessary-type-assertion

    const propName = ctor._attributeToPropertyMap.get(name);

    if (propName !== undefined) {
      const options = ctor.getPropertyOptions(propName); // mark state reflecting

      this._updateState = this._updateState | STATE_IS_REFLECTING_TO_PROPERTY;
      this[propName] = // tslint:disable-next-line:no-any
      ctor._propertyValueFromAttribute(value, options); // mark state not reflecting

      this._updateState = this._updateState & ~STATE_IS_REFLECTING_TO_PROPERTY;
    }
  }
  /**
   * This protected version of `requestUpdate` does not access or return the
   * `updateComplete` promise. This promise can be overridden and is therefore
   * not free to access.
   */


  requestUpdateInternal(name, oldValue, options) {
    let shouldRequestUpdate = true; // If we have a property key, perform property update steps.

    if (name !== undefined) {
      const ctor = this.constructor;
      options = options || ctor.getPropertyOptions(name);

      if (ctor._valueHasChanged(this[name], oldValue, options.hasChanged)) {
        if (!this._changedProperties.has(name)) {
          this._changedProperties.set(name, oldValue);
        } // Add to reflecting properties set.
        // Note, it's important that every change has a chance to add the
        // property to `_reflectingProperties`. This ensures setting
        // attribute + property reflects correctly.


        if (options.reflect === true && !(this._updateState & STATE_IS_REFLECTING_TO_PROPERTY)) {
          if (this._reflectingProperties === undefined) {
            this._reflectingProperties = new Map();
          }

          this._reflectingProperties.set(name, options);
        }
      } else {
        // Abort the request if the property should not be considered changed.
        shouldRequestUpdate = false;
      }
    }

    if (!this._hasRequestedUpdate && shouldRequestUpdate) {
      this._updatePromise = this._enqueueUpdate();
    }
  }
  /**
   * Requests an update which is processed asynchronously. This should
   * be called when an element should update based on some state not triggered
   * by setting a property. In this case, pass no arguments. It should also be
   * called when manually implementing a property setter. In this case, pass the
   * property `name` and `oldValue` to ensure that any configured property
   * options are honored. Returns the `updateComplete` Promise which is resolved
   * when the update completes.
   *
   * @param name {PropertyKey} (optional) name of requesting property
   * @param oldValue {any} (optional) old value of requesting property
   * @returns {Promise} A Promise that is resolved when the update completes.
   */


  requestUpdate(name, oldValue) {
    this.requestUpdateInternal(name, oldValue);
    return this.updateComplete;
  }
  /**
   * Sets up the element to asynchronously update.
   */


  async _enqueueUpdate() {
    this._updateState = this._updateState | STATE_UPDATE_REQUESTED;

    try {
      // Ensure any previous update has resolved before updating.
      // This `await` also ensures that property changes are batched.
      await this._updatePromise;
    } catch (e) {// Ignore any previous errors. We only care that the previous cycle is
      // done. Any error should have been handled in the previous update.
    }

    const result = this.performUpdate(); // If `performUpdate` returns a Promise, we await it. This is done to
    // enable coordinating updates with a scheduler. Note, the result is
    // checked to avoid delaying an additional microtask unless we need to.

    if (result != null) {
      await result;
    }

    return !this._hasRequestedUpdate;
  }

  get _hasRequestedUpdate() {
    return this._updateState & STATE_UPDATE_REQUESTED;
  }

  get hasUpdated() {
    return this._updateState & STATE_HAS_UPDATED;
  }
  /**
   * Performs an element update. Note, if an exception is thrown during the
   * update, `firstUpdated` and `updated` will not be called.
   *
   * You can override this method to change the timing of updates. If this
   * method is overridden, `super.performUpdate()` must be called.
   *
   * For instance, to schedule updates to occur just before the next frame:
   *
   * ```
   * protected async performUpdate(): Promise<unknown> {
   *   await new Promise((resolve) => requestAnimationFrame(() => resolve()));
   *   super.performUpdate();
   * }
   * ```
   */


  performUpdate() {
    // Abort any update if one is not pending when this is called.
    // This can happen if `performUpdate` is called early to "flush"
    // the update.
    if (!this._hasRequestedUpdate) {
      return;
    } // Mixin instance properties once, if they exist.


    if (this._instanceProperties) {
      this._applyInstanceProperties();
    }

    let shouldUpdate = false;
    const changedProperties = this._changedProperties;

    try {
      shouldUpdate = this.shouldUpdate(changedProperties);

      if (shouldUpdate) {
        this.update(changedProperties);
      } else {
        this._markUpdated();
      }
    } catch (e) {
      // Prevent `firstUpdated` and `updated` from running when there's an
      // update exception.
      shouldUpdate = false; // Ensure element can accept additional updates after an exception.

      this._markUpdated();

      throw e;
    }

    if (shouldUpdate) {
      if (!(this._updateState & STATE_HAS_UPDATED)) {
        this._updateState = this._updateState | STATE_HAS_UPDATED;
        this.firstUpdated(changedProperties);
      }

      this.updated(changedProperties);
    }
  }

  _markUpdated() {
    this._changedProperties = new Map();
    this._updateState = this._updateState & ~STATE_UPDATE_REQUESTED;
  }
  /**
   * Returns a Promise that resolves when the element has completed updating.
   * The Promise value is a boolean that is `true` if the element completed the
   * update without triggering another update. The Promise result is `false` if
   * a property was set inside `updated()`. If the Promise is rejected, an
   * exception was thrown during the update.
   *
   * To await additional asynchronous work, override the `_getUpdateComplete`
   * method. For example, it is sometimes useful to await a rendered element
   * before fulfilling this Promise. To do this, first await
   * `super._getUpdateComplete()`, then any subsequent state.
   *
   * @returns {Promise} The Promise returns a boolean that indicates if the
   * update resolved without triggering another update.
   */


  get updateComplete() {
    return this._getUpdateComplete();
  }
  /**
   * Override point for the `updateComplete` promise.
   *
   * It is not safe to override the `updateComplete` getter directly due to a
   * limitation in TypeScript which means it is not possible to call a
   * superclass getter (e.g. `super.updateComplete.then(...)`) when the target
   * language is ES5 (https://github.com/microsoft/TypeScript/issues/338).
   * This method should be overridden instead. For example:
   *
   *   class MyElement extends LitElement {
   *     async _getUpdateComplete() {
   *       await super._getUpdateComplete();
   *       await this._myChild.updateComplete;
   *     }
   *   }
   * @deprecated Override `getUpdateComplete()` instead for forward
   *     compatibility with `lit-element` 3.0 / `@lit/reactive-element`.
   */


  _getUpdateComplete() {
    return this.getUpdateComplete();
  }
  /**
   * Override point for the `updateComplete` promise.
   *
   * It is not safe to override the `updateComplete` getter directly due to a
   * limitation in TypeScript which means it is not possible to call a
   * superclass getter (e.g. `super.updateComplete.then(...)`) when the target
   * language is ES5 (https://github.com/microsoft/TypeScript/issues/338).
   * This method should be overridden instead. For example:
   *
   *   class MyElement extends LitElement {
   *     async getUpdateComplete() {
   *       await super.getUpdateComplete();
   *       await this._myChild.updateComplete;
   *     }
   *   }
   */


  getUpdateComplete() {
    return this._updatePromise;
  }
  /**
   * Controls whether or not `update` should be called when the element requests
   * an update. By default, this method always returns `true`, but this can be
   * customized to control when to update.
   *
   * @param _changedProperties Map of changed properties with old values
   */


  shouldUpdate(_changedProperties) {
    return true;
  }
  /**
   * Updates the element. This method reflects property values to attributes.
   * It can be overridden to render and keep updated element DOM.
   * Setting properties inside this method will *not* trigger
   * another update.
   *
   * @param _changedProperties Map of changed properties with old values
   */


  update(_changedProperties) {
    if (this._reflectingProperties !== undefined && this._reflectingProperties.size > 0) {
      // Use forEach so this works even if for/of loops are compiled to for
      // loops expecting arrays
      this._reflectingProperties.forEach((v, k) => this._propertyToAttribute(k, this[k], v));

      this._reflectingProperties = undefined;
    }

    this._markUpdated();
  }
  /**
   * Invoked whenever the element is updated. Implement to perform
   * post-updating tasks via DOM APIs, for example, focusing an element.
   *
   * Setting properties inside this method will trigger the element to update
   * again after this update cycle completes.
   *
   * @param _changedProperties Map of changed properties with old values
   */


  updated(_changedProperties) {}
  /**
   * Invoked when the element is first updated. Implement to perform one time
   * work on the element after update.
   *
   * Setting properties inside this method will trigger the element to update
   * again after this update cycle completes.
   *
   * @param _changedProperties Map of changed properties with old values
   */


  firstUpdated(_changedProperties) {}

}
_a = finalized;
/**
 * Marks class as having finished creating properties.
 */

UpdatingElement[_a] = true;

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

const standardProperty = (options, element) => {
  // When decorating an accessor, pass it through and add property metadata.
  // Note, the `hasOwnProperty` check in `createProperty` ensures we don't
  // stomp over the user's accessor.
  if (element.kind === 'method' && element.descriptor && !('value' in element.descriptor)) {
    return Object.assign(Object.assign({}, element), {
      finisher(clazz) {
        clazz.createProperty(element.key, options);
      }

    });
  } else {
    // createProperty() takes care of defining the property, but we still
    // must return some kind of descriptor, so return a descriptor for an
    // unused prototype field. The finisher calls createProperty().
    return {
      kind: 'field',
      key: Symbol(),
      placement: 'own',
      descriptor: {},

      // When @babel/plugin-proposal-decorators implements initializers,
      // do this instead of the initializer below. See:
      // https://github.com/babel/babel/issues/9260 extras: [
      //   {
      //     kind: 'initializer',
      //     placement: 'own',
      //     initializer: descriptor.initializer,
      //   }
      // ],
      initializer() {
        if (typeof element.initializer === 'function') {
          this[element.key] = element.initializer.call(this);
        }
      },

      finisher(clazz) {
        clazz.createProperty(element.key, options);
      }

    };
  }
};

const legacyProperty = (options, proto, name) => {
  proto.constructor.createProperty(name, options);
};
/**
 * A property decorator which creates a LitElement property which reflects a
 * corresponding attribute value. A [[`PropertyDeclaration`]] may optionally be
 * supplied to configure property features.
 *
 * This decorator should only be used for public fields. Private or protected
 * fields should use the [[`internalProperty`]] decorator.
 *
 * @example
 * ```ts
 * class MyElement {
 *   @property({ type: Boolean })
 *   clicked = false;
 * }
 * ```
 * @category Decorator
 * @ExportDecoratedItems
 */


function property(options) {
  // tslint:disable-next-line:no-any decorator
  return (protoOrDescriptor, name) => name !== undefined ? legacyProperty(options, protoOrDescriptor, name) : standardProperty(options, protoOrDescriptor);
}

/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/

/**
 * Whether the current browser supports `adoptedStyleSheets`.
 */
const supportsAdoptingStyleSheets = window.ShadowRoot && (window.ShadyCSS === undefined || window.ShadyCSS.nativeShadow) && 'adoptedStyleSheets' in Document.prototype && 'replace' in CSSStyleSheet.prototype;
const constructionToken = Symbol();
class CSSResult {
  constructor(cssText, safeToken) {
    if (safeToken !== constructionToken) {
      throw new Error('CSSResult is not constructable. Use `unsafeCSS` or `css` instead.');
    }

    this.cssText = cssText;
  } // Note, this is a getter so that it's lazy. In practice, this means
  // stylesheets are not created until the first element instance is made.


  get styleSheet() {
    if (this._styleSheet === undefined) {
      // Note, if `supportsAdoptingStyleSheets` is true then we assume
      // CSSStyleSheet is constructable.
      if (supportsAdoptingStyleSheets) {
        this._styleSheet = new CSSStyleSheet();

        this._styleSheet.replaceSync(this.cssText);
      } else {
        this._styleSheet = null;
      }
    }

    return this._styleSheet;
  }

  toString() {
    return this.cssText;
  }

}
/**
 * Wrap a value for interpolation in a [[`css`]] tagged template literal.
 *
 * This is unsafe because untrusted CSS text can be used to phone home
 * or exfiltrate data to an attacker controlled site. Take care to only use
 * this with trusted input.
 */

const unsafeCSS = value => {
  return new CSSResult(String(value), constructionToken);
};

const textFromCSSResult = value => {
  if (value instanceof CSSResult) {
    return value.cssText;
  } else if (typeof value === 'number') {
    return value;
  } else {
    throw new Error(`Value passed to 'css' function must be a 'css' function result: ${value}. Use 'unsafeCSS' to pass non-literal values, but
            take care to ensure page security.`);
  }
};
/**
 * Template tag which which can be used with LitElement's [[LitElement.styles |
 * `styles`]] property to set element styles. For security reasons, only literal
 * string values may be used. To incorporate non-literal values [[`unsafeCSS`]]
 * may be used inside a template string part.
 */


const css$1 = (strings, ...values) => {
  const cssText = values.reduce((acc, v, idx) => acc + textFromCSSResult(v) + strings[idx + 1], strings[0]);
  return new CSSResult(cssText, constructionToken);
};

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
// This line will be used in regexes to search for LitElement usage.
// TODO(justinfagnani): inject version number at build time

(window['litElementVersions'] || (window['litElementVersions'] = [])).push('2.5.1');
/**
 * Sentinal value used to avoid calling lit-html's render function when
 * subclasses do not implement `render`
 */

const renderNotImplemented = {};
/**
 * Base element class that manages element properties and attributes, and
 * renders a lit-html template.
 *
 * To define a component, subclass `LitElement` and implement a
 * `render` method to provide the component's template. Define properties
 * using the [[`properties`]] property or the [[`property`]] decorator.
 */

class LitElement extends UpdatingElement {
  /**
   * Return the array of styles to apply to the element.
   * Override this method to integrate into a style management system.
   *
   * @nocollapse
   */
  static getStyles() {
    return this.styles;
  }
  /** @nocollapse */


  static _getUniqueStyles() {
    // Only gather styles once per class
    if (this.hasOwnProperty(JSCompiler_renameProperty('_styles', this))) {
      return;
    } // Take care not to call `this.getStyles()` multiple times since this
    // generates new CSSResults each time.
    // TODO(sorvell): Since we do not cache CSSResults by input, any
    // shared styles will generate new stylesheet objects, which is wasteful.
    // This should be addressed when a browser ships constructable
    // stylesheets.


    const userStyles = this.getStyles();

    if (Array.isArray(userStyles)) {
      // De-duplicate styles preserving the _last_ instance in the set.
      // This is a performance optimization to avoid duplicated styles that can
      // occur especially when composing via subclassing.
      // The last item is kept to try to preserve the cascade order with the
      // assumption that it's most important that last added styles override
      // previous styles.
      const addStyles = (styles, set) => styles.reduceRight((set, s) => // Note: On IE set.add() does not return the set
      Array.isArray(s) ? addStyles(s, set) : (set.add(s), set), set); // Array.from does not work on Set in IE, otherwise return
      // Array.from(addStyles(userStyles, new Set<CSSResult>())).reverse()


      const set = addStyles(userStyles, new Set());
      const styles = [];
      set.forEach(v => styles.unshift(v));
      this._styles = styles;
    } else {
      this._styles = userStyles === undefined ? [] : [userStyles];
    } // Ensure that there are no invalid CSSStyleSheet instances here. They are
    // invalid in two conditions.
    // (1) the sheet is non-constructible (`sheet` of a HTMLStyleElement), but
    //     this is impossible to check except via .replaceSync or use
    // (2) the ShadyCSS polyfill is enabled (:. supportsAdoptingStyleSheets is
    //     false)


    this._styles = this._styles.map(s => {
      if (s instanceof CSSStyleSheet && !supportsAdoptingStyleSheets) {
        // Flatten the cssText from the passed constructible stylesheet (or
        // undetectable non-constructible stylesheet). The user might have
        // expected to update their stylesheets over time, but the alternative
        // is a crash.
        const cssText = Array.prototype.slice.call(s.cssRules).reduce((css, rule) => css + rule.cssText, '');
        return unsafeCSS(cssText);
      }

      return s;
    });
  }
  /**
   * Performs element initialization. By default this calls
   * [[`createRenderRoot`]] to create the element [[`renderRoot`]] node and
   * captures any pre-set values for registered properties.
   */


  initialize() {
    super.initialize();

    this.constructor._getUniqueStyles();

    this.renderRoot = this.createRenderRoot(); // Note, if renderRoot is not a shadowRoot, styles would/could apply to the
    // element's getRootNode(). While this could be done, we're choosing not to
    // support this now since it would require different logic around de-duping.

    if (window.ShadowRoot && this.renderRoot instanceof window.ShadowRoot) {
      this.adoptStyles();
    }
  }
  /**
   * Returns the node into which the element should render and by default
   * creates and returns an open shadowRoot. Implement to customize where the
   * element's DOM is rendered. For example, to render into the element's
   * childNodes, return `this`.
   * @returns {Element|DocumentFragment} Returns a node into which to render.
   */


  createRenderRoot() {
    return this.attachShadow(this.constructor.shadowRootOptions);
  }
  /**
   * Applies styling to the element shadowRoot using the [[`styles`]]
   * property. Styling will apply using `shadowRoot.adoptedStyleSheets` where
   * available and will fallback otherwise. When Shadow DOM is polyfilled,
   * ShadyCSS scopes styles and adds them to the document. When Shadow DOM
   * is available but `adoptedStyleSheets` is not, styles are appended to the
   * end of the `shadowRoot` to [mimic spec
   * behavior](https://wicg.github.io/construct-stylesheets/#using-constructed-stylesheets).
   */


  adoptStyles() {
    const styles = this.constructor._styles;

    if (styles.length === 0) {
      return;
    } // There are three separate cases here based on Shadow DOM support.
    // (1) shadowRoot polyfilled: use ShadyCSS
    // (2) shadowRoot.adoptedStyleSheets available: use it
    // (3) shadowRoot.adoptedStyleSheets polyfilled: append styles after
    // rendering


    if (window.ShadyCSS !== undefined && !window.ShadyCSS.nativeShadow) {
      window.ShadyCSS.ScopingShim.prepareAdoptedCssText(styles.map(s => s.cssText), this.localName);
    } else if (supportsAdoptingStyleSheets) {
      this.renderRoot.adoptedStyleSheets = styles.map(s => s instanceof CSSStyleSheet ? s : s.styleSheet);
    } else {
      // This must be done after rendering so the actual style insertion is done
      // in `update`.
      this._needsShimAdoptedStyleSheets = true;
    }
  }

  connectedCallback() {
    super.connectedCallback(); // Note, first update/render handles styleElement so we only call this if
    // connected after first update.

    if (this.hasUpdated && window.ShadyCSS !== undefined) {
      window.ShadyCSS.styleElement(this);
    }
  }
  /**
   * Updates the element. This method reflects property values to attributes
   * and calls `render` to render DOM via lit-html. Setting properties inside
   * this method will *not* trigger another update.
   * @param _changedProperties Map of changed properties with old values
   */


  update(changedProperties) {
    // Setting properties in `render` should not trigger an update. Since
    // updates are allowed after super.update, it's important to call `render`
    // before that.
    const templateResult = this.render();
    super.update(changedProperties); // If render is not implemented by the component, don't call lit-html render

    if (templateResult !== renderNotImplemented) {
      this.constructor.render(templateResult, this.renderRoot, {
        scopeName: this.localName,
        eventContext: this
      });
    } // When native Shadow DOM is used but adoptedStyles are not supported,
    // insert styling after rendering to ensure adoptedStyles have highest
    // priority.


    if (this._needsShimAdoptedStyleSheets) {
      this._needsShimAdoptedStyleSheets = false;

      this.constructor._styles.forEach(s => {
        const style = document.createElement('style');
        style.textContent = s.cssText;
        this.renderRoot.appendChild(style);
      });
    }
  }
  /**
   * Invoked on each update to perform rendering tasks. This method may return
   * any value renderable by lit-html's `NodePart` - typically a
   * `TemplateResult`. Setting properties inside this method will *not* trigger
   * the element to update.
   */


  render() {
    return renderNotImplemented;
  }

}
/**
 * Ensure this class is marked as `finalized` as an optimization ensuring
 * it will not needlessly try to `finalize`.
 *
 * Note this property name is a string to prevent breaking Closure JS Compiler
 * optimizations. See updating-element.ts for more information.
 */

LitElement['finalized'] = true;
/**
 * Reference to the underlying library method used to render the element's
 * DOM. By default, points to the `render` method from lit-html's shady-render
 * module.
 *
 * **Most users will never need to touch this property.**
 *
 * This  property should not be confused with the `render` instance method,
 * which should be overridden to define a template for the element.
 *
 * Advanced users creating a new base class based on LitElement can override
 * this property to point to a custom render method with a signature that
 * matches [shady-render's `render`
 * method](https://lit-html.polymer-project.org/api/modules/shady_render.html#render).
 *
 * @nocollapse
 */

LitElement.render = render$1;
/** @nocollapse */

LitElement.shadowRootOptions = {
  mode: 'open'
};

/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
const observedForElements = new Set();

const updateRTL = () => {
  const dir = document.documentElement.dir === 'rtl' ? document.documentElement.dir : 'ltr';
  observedForElements.forEach(el => {
    el.setAttribute('dir', dir);
  });
};

const rtlObserver = new MutationObserver(updateRTL);
rtlObserver.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ['dir']
});

const canManageContentDirection = el => typeof el.startManagingContentDirection !== 'undefined' || el.tagName === 'SP-THEME';

function SpectrumMixin(constructor) {
  class SlotTextObservingElement extends constructor {
    constructor() {
      super(...arguments);
      /**
       * @private
       */

      this.dir = 'ltr';
    }
    /**
     * @private
     */


    get isLTR() {
      return this.dir === 'ltr';
    }

    connectedCallback() {
      if (!this.hasAttribute('dir')) {
        let dirParent = this.assignedSlot || this.parentNode;

        while (dirParent !== document.documentElement && !canManageContentDirection(dirParent)) {
          dirParent = dirParent.assignedSlot || // step into the shadow DOM of the parent of a slotted node
          dirParent.parentNode || // DOM Element detected
          dirParent.host;
        }

        this.dir = dirParent.dir === 'rtl' ? dirParent.dir : this.dir || 'ltr';

        if (dirParent === document.documentElement) {
          observedForElements.add(this);
        } else {
          const {
            localName
          } = dirParent;

          if (localName.search('-') > -1 && !customElements.get(localName)) {
            customElements.whenDefined(localName).then(() => {
              dirParent.startManagingContentDirection(this);
            });
          } else {
            dirParent.startManagingContentDirection(this);
          }
        }

        this._dirParent = dirParent;
      }

      super.connectedCallback();
    }

    disconnectedCallback() {
      super.disconnectedCallback();

      if (this._dirParent) {
        if (this._dirParent === document.documentElement) {
          observedForElements.delete(this);
        } else {
          this._dirParent.stopManagingContentDirection(this);
        }

        this.removeAttribute('dir');
      }
    }

  }

  __decorate([property({
    reflect: true
  })], SlotTextObservingElement.prototype, "dir", void 0);

  return SlotTextObservingElement;
}
class SpectrumElement extends SpectrumMixin(LitElement) {}

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * An expression marker with embedded unique key to avoid collision with
 * possible text in templates.
 */
const marker$1 = `{{lit-${String(Math.random()).slice(2)}}}`;

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * Our TrustedTypePolicy for HTML which is declared using the html template
 * tag function.
 *
 * That HTML is a developer-authored constant, and is parsed with innerHTML
 * before any untrusted expressions have been mixed in. Therefor it is
 * considered safe by construction.
 */

const policy$1 = window.trustedTypes && trustedTypes.createPolicy('lit-html', {
  createHTML: s => s
});

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
// from the options object, then options are supported. If not, then the third
// argument to add/removeEventListener is interpreted as the boolean capture
// value so we should only pass the `capture` property.

let eventOptionsSupported$1 = false; // Wrap into an IIFE because MS Edge <= v41 does not support having try/catch
// blocks right into the body of a module

(() => {
  try {
    const options = {
      get capture() {
        eventOptionsSupported$1 = true;
        return false;
      }

    }; // eslint-disable-next-line @typescript-eslint/no-explicit-any

    window.addEventListener('test', options, options); // eslint-disable-next-line @typescript-eslint/no-explicit-any

    window.removeEventListener('test', options, options);
  } catch (_e) {// event options not supported
  }
})();

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
// This line will be used in regexes to search for lit-html usage.
// TODO(justinfagnani): inject version number at build time

if (typeof window !== 'undefined') {
  (window['litHtmlVersions'] || (window['litHtmlVersions'] = [])).push('1.4.1');
}

/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
const styles$4 = css$1`
:host{text-align:center;border-width:var(--spectrum-dropzone-border-width,var(--spectrum-alias-border-size-thick));border-radius:var(--spectrum-dropzone-border-radius,var(--spectrum-alias-border-radius-regular));padding:var(--spectrum-dropzone-padding,var(--spectrum-global-dimension-size-900));border-style:dashed}:host([dragged]){border-style:solid}:host(:focus){outline:0;border-style:dashed}:host(:focus.focus-visible){border-style:solid}:host(:focus.focus-visible){border-style:solid}:host(:focus:focus-visible){border-style:solid}:host{border-color:var(--spectrum-dropzone-border-color,var(--spectrum-global-color-gray-300))}:host([dragged]){border-color:var(--spectrum-dropzone-border-color-selected-hover,var(--spectrum-global-color-blue-400));background-color:var(--spectrum-dropzone-background-color-selected-hover,var(--spectrum-alias-highlight-selected))}:host([dragged]) ::slotted(*){color:var(--spectrum-global-color-blue-400)}:host(:focus){border-color:var(--spectrum-dropzone-border-color,var(--spectrum-global-color-gray-300))}:host(:focus) ::slotted(*){color:var(--spectrum-global-color-static-gray-500,#bcbcbc)}:host(:focus.focus-visible){border-color:var(--spectrum-dropzone-border-color-selected-hover,var(--spectrum-global-color-blue-400))}:host(:focus.focus-visible){border-color:var(--spectrum-dropzone-border-color-selected-hover,var(--spectrum-global-color-blue-400))}:host(:focus:focus-visible){border-color:var(--spectrum-dropzone-border-color-selected-hover,var(--spectrum-global-color-blue-400))}:host(:focus[dragged].focus-visible) ::slotted(*){color:var(--spectrum-global-color-blue-400)}:host(:focus[dragged].focus-visible) ::slotted(*){color:var(--spectrum-global-color-blue-400)}:host(:focus[dragged]:focus-visible) ::slotted(*){color:var(--spectrum-global-color-blue-400)}:host{display:block;--spectrum-dropzone-illustration-color:var(--spectrum-global-color-static-blue-400)}::slotted(*){font-family:var(--spectrum-body-m-text-font-family,var(--spectrum-alias-body-text-font-family));font-size:var(--spectrum-body-s-text-size,var(--spectrum-alias-font-size-default));font-weight:var(--spectrum-body-s-text-font-weight,var(--spectrum-alias-body-text-font-weight));line-height:var(--spectrum-body-s-text-line-height,var(--spectrum-alias-body-text-line-height));font-style:var(--spectrum-body-s-text-font-style,var(--spectrum-global-font-style-regular));letter-spacing:var(--spectrum-body-s-text-letter-spacing,var(--spectrum-global-font-letter-spacing-none));text-transform:var(--spectrum-body-s-text-transform,none);margin-top:0;margin-bottom:0}:host([dragged]) ::slotted(*){--spectrum-global-color-gray-500:var(--spectrum-dropzone-illustration-color)}
`;

/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
/**
 * @slot - The default slot on an `sp-dropzone` is a great place to place upload instructions
 * built with an `sp-illustrated-message` or other information, possibly even built from data
 * provided by the upload, to support users successfully interacting with the drag and drop
 * based features of your application
 *
 * @fires sp-dropzone-should-accept - A cancellable event that confirms whether or not
 * a file dropped on the UI should be accepted.
 * @fires sp-dropzone-dragover - Announces when files have been dragged over the UI, but not yet dropped.
 * @fires sp-dropzone-dragleave - Announces when dragged files have been moved out of the UI without having been dropped.
 * @fires sp-dropzone-drop - Announces when dragged files have been dropped on the UI.
 */

class Dropzone extends SpectrumElement {
  constructor() {
    super(...arguments);
    this._dropEffect = 'copy';
    this.isDragged = false;
    this.debouncedDragLeave = null;
  }

  static get styles() {
    return [styles$4];
  }
  /**
   * Controls the feedback (typically visual) the user is given during a drag and drop operation
   * @attr
   * @type {'copy' | 'move' | 'link' | 'none'}
   */


  get dropEffect() {
    return this._dropEffect;
  }

  set dropEffect(value) {
    if (['copy', 'move', 'link', 'none'].includes(value)) {
      this._dropEffect = value;
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('drop', this.onDrop);
    this.addEventListener('dragover', this.onDragOver);
    this.addEventListener('dragleave', this.onDragLeave);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('drop', this.onDrop);
    this.removeEventListener('dragover', this.onDragOver);
    this.removeEventListener('dragleave', this.onDragLeave);
  }

  onDragOver(event) {
    const shouldAcceptEvent = new CustomEvent('sp-dropzone-should-accept', {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: event
    });
    const shouldAccept = this.dispatchEvent(shouldAcceptEvent);

    if (!event.dataTransfer) {
      return;
    }

    if (!shouldAccept) {
      event.dataTransfer.dropEffect = 'none';
      return;
    }

    event.preventDefault();
    this.clearDebouncedDragLeave();
    this.isDragged = true;
    event.dataTransfer.dropEffect = this.dropEffect;
    const dragOverEvent = new CustomEvent('sp-dropzone-dragover', {
      bubbles: true,
      composed: true,
      detail: event
    });
    this.dispatchEvent(dragOverEvent);
  }

  onDragLeave(event) {
    this.clearDebouncedDragLeave();
    this.debouncedDragLeave = window.setTimeout(() => {
      this.isDragged = false;
      const dragLeave = new CustomEvent('sp-dropzone-dragleave', {
        bubbles: true,
        composed: true,
        detail: event
      });
      this.dispatchEvent(dragLeave);
    }, 100);
  }

  onDrop(event) {
    event.preventDefault();
    this.clearDebouncedDragLeave();
    this.isDragged = false;
    const dropEvent = new CustomEvent('sp-dropzone-drop', {
      bubbles: true,
      composed: true,
      detail: event
    });
    this.dispatchEvent(dropEvent);
  }

  render() {
    return html`
            <slot></slot>
        `;
  }

  clearDebouncedDragLeave() {
    if (this.debouncedDragLeave) {
      clearTimeout(this.debouncedDragLeave);
      this.debouncedDragLeave = null;
    }
  }

}

__decorate([property({
  type: Boolean,
  reflect: true,
  attribute: 'dragged'
})], Dropzone.prototype, "isDragged", void 0);

/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
const styles$5 = css$1`
:host{--spectrum-illustrated-message-description-max-width:500px;--spectrum-illustrated-message-heading-max-width:500px;--spectrum-illustrated-message-illustration-margin-bottom:24px;--spectrum-illustrated-message-heading-margin:0;--spectrum-illustrated-message-description-margin:4px 0 0 0;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}#illustration{margin-bottom:var(--spectrum-illustrated-message-illustration-margin-bottom)}#heading{max-width:var(--spectrum-illustrated-message-heading-max-width);margin:var(--spectrum-illustrated-message-heading-margin)}#description{max-width:var(--spectrum-illustrated-message-description-max-width);margin:var(--spectrum-illustrated-message-description-margin);font-style:italic}:host([cta]) #description{font-style:normal}#illustration{color:var(--spectrum-global-color-gray-500);fill:currentColor;stroke:currentColor}::slotted(svg[viewBox]){width:100%}
`;

/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
const styles$6 = css$1`
.spectrum{font-family:var(--spectrum-alias-body-text-font-family,var(--spectrum-global-font-family-base));font-size:var(--spectrum-alias-font-size-default,var(--spectrum-global-dimension-font-size-100));color:var(--spectrum-body-m-text-color,var(--spectrum-alias-text-color))}
`;

/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
const styles$7 = css$1`
.spectrum:lang(ar){font-family:var(--spectrum-alias-font-family-ar,myriad-arabic,adobe-clean,"Source Sans Pro",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Ubuntu,"Trebuchet MS","Lucida Grande",sans-serif)}.spectrum:lang(he){font-family:var(--spectrum-alias-font-family-he,myriad-hebrew,adobe-clean,"Source Sans Pro",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Ubuntu,"Trebuchet MS","Lucida Grande",sans-serif)}.spectrum:lang(zh-Hans){font-family:var(--spectrum-alias-font-family-zhhans,adobe-clean-han-simplified-c,source-han-simplified-c,"SimSun","Heiti SC Light","sans-serif")}.spectrum:lang(zh-Hant){font-family:var(--spectrum-alias-font-family-zh,adobe-clean-han-traditional,source-han-traditional,"MingLiu","Heiti TC Light","sans-serif")}.spectrum:lang(zh){font-family:var(--spectrum-alias-font-family-zh,adobe-clean-han-traditional,source-han-traditional,"MingLiu","Heiti TC Light","sans-serif")}.spectrum:lang(ko){font-family:var(--spectrum-alias-font-family-ko,adobe-clean-han-korean,source-han-korean,"Malgun Gothic","Apple Gothic","sans-serif")}.spectrum:lang(ja){font-family:var(--spectrum-alias-font-family-ja,adobe-clean-han-japanese,source-han-japanese,"Yu Gothic","\30E1 \30A4 \30EA \30AA","\30D2 \30E9 \30AE \30CE \89D2 \30B4  Pro W3","Hiragino Kaku Gothic Pro W3","Osaka","\FF2D \FF33 \FF30 \30B4 \30B7 \30C3 \30AF","MS PGothic","sans-serif")}.spectrum:lang(ja) .spectrum-Heading--sizeXXXL,.spectrum:lang(ko) .spectrum-Heading--sizeXXXL,.spectrum:lang(zh) .spectrum-Heading--sizeXXXL{font-size:var(--spectrum-heading-han-xxxl-text-size,var(--spectrum-alias-heading-xxxl-text-size));font-weight:var(--spectrum-heading-han-xxxl-text-font-weight,var(--spectrum-alias-han-heading-text-font-weight-regular));line-height:var(--spectrum-heading-han-xxxl-text-line-height,var(--spectrum-alias-han-heading-text-line-height));font-style:var(--spectrum-heading-han-xxxl-text-font-style,var(--spectrum-global-font-style-regular));letter-spacing:var(--spectrum-heading-han-xxxl-text-letter-spacing,var(--spectrum-global-font-letter-spacing-han));text-transform:var(--spectrum-heading-han-xxxl-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Heading--sizeXXL,.spectrum:lang(ko) .spectrum-Heading--sizeXXL,.spectrum:lang(zh) .spectrum-Heading--sizeXXL{font-size:var(--spectrum-heading-han-xxl-text-size,var(--spectrum-alias-heading-han-xxl-text-size));font-weight:var(--spectrum-heading-han-xxl-text-font-weight,var(--spectrum-alias-han-heading-text-font-weight-regular));line-height:var(--spectrum-heading-han-xxl-text-line-height,var(--spectrum-alias-han-heading-text-line-height));font-style:var(--spectrum-heading-han-xxl-text-font-style,var(--spectrum-global-font-style-regular));letter-spacing:var(--spectrum-heading-han-xxl-text-letter-spacing,var(--spectrum-global-font-letter-spacing-han));text-transform:var(--spectrum-heading-han-xxl-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Heading--sizeXL,.spectrum:lang(ko) .spectrum-Heading--sizeXL,.spectrum:lang(zh) .spectrum-Heading--sizeXL{font-size:var(--spectrum-heading-han-xl-text-size,var(--spectrum-alias-heading-han-xl-text-size));font-weight:var(--spectrum-heading-han-xl-text-font-weight,var(--spectrum-alias-han-heading-text-font-weight-regular));line-height:var(--spectrum-heading-han-xl-text-line-height,var(--spectrum-alias-han-heading-text-line-height));font-style:var(--spectrum-heading-han-xl-text-font-style,var(--spectrum-global-font-style-regular));letter-spacing:var(--spectrum-heading-han-xl-text-letter-spacing,var(--spectrum-global-font-letter-spacing-han));text-transform:var(--spectrum-heading-han-xl-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Heading--sizeL,.spectrum:lang(ko) .spectrum-Heading--sizeL,.spectrum:lang(zh) .spectrum-Heading--sizeL{font-size:var(--spectrum-heading-han-l-text-size,var(--spectrum-alias-heading-han-l-text-size));font-weight:var(--spectrum-heading-han-l-text-font-weight,var(--spectrum-alias-han-heading-text-font-weight-regular));line-height:var(--spectrum-heading-han-l-text-line-height,var(--spectrum-alias-han-heading-text-line-height));font-style:var(--spectrum-heading-han-l-text-font-style,var(--spectrum-global-font-style-regular));letter-spacing:var(--spectrum-heading-han-l-text-letter-spacing,var(--spectrum-global-font-letter-spacing-han));text-transform:var(--spectrum-heading-han-l-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Heading--sizeM,.spectrum:lang(ko) .spectrum-Heading--sizeM,.spectrum:lang(zh) .spectrum-Heading--sizeM{font-size:var(--spectrum-heading-han-m-text-size,var(--spectrum-alias-heading-han-m-text-size));font-weight:var(--spectrum-heading-han-m-text-font-weight,var(--spectrum-alias-han-heading-text-font-weight-regular));line-height:var(--spectrum-heading-han-m-text-line-height,var(--spectrum-alias-han-heading-text-line-height));font-style:var(--spectrum-heading-han-m-text-font-style,var(--spectrum-global-font-style-regular));letter-spacing:var(--spectrum-heading-han-m-text-letter-spacing,var(--spectrum-global-font-letter-spacing-han));text-transform:var(--spectrum-heading-han-m-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Heading--sizeS,.spectrum:lang(ko) .spectrum-Heading--sizeS,.spectrum:lang(zh) .spectrum-Heading--sizeS{font-size:var(--spectrum-heading-han-s-text-size,var(--spectrum-alias-heading-s-text-size));font-weight:var(--spectrum-heading-han-s-text-font-weight,var(--spectrum-alias-han-heading-text-font-weight-regular));line-height:var(--spectrum-heading-han-s-text-line-height,var(--spectrum-alias-han-heading-text-line-height));font-style:var(--spectrum-heading-han-s-text-font-style,var(--spectrum-global-font-style-regular));letter-spacing:var(--spectrum-heading-han-s-text-letter-spacing,var(--spectrum-global-font-letter-spacing-han));text-transform:var(--spectrum-heading-han-s-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Heading--sizeXS,.spectrum:lang(ko) .spectrum-Heading--sizeXS,.spectrum:lang(zh) .spectrum-Heading--sizeXS{font-size:var(--spectrum-heading-han-xs-text-size,var(--spectrum-alias-heading-xs-text-size));font-weight:var(--spectrum-heading-han-xs-text-font-weight,var(--spectrum-alias-han-heading-text-font-weight-regular));line-height:var(--spectrum-heading-han-xs-text-line-height,var(--spectrum-alias-han-heading-text-line-height));font-style:var(--spectrum-heading-han-xs-text-font-style,var(--spectrum-global-font-style-regular));letter-spacing:var(--spectrum-heading-han-xs-text-letter-spacing,var(--spectrum-global-font-letter-spacing-han));text-transform:var(--spectrum-heading-han-xs-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Heading--sizeXXS,.spectrum:lang(ko) .spectrum-Heading--sizeXXS,.spectrum:lang(zh) .spectrum-Heading--sizeXXS{font-size:var(--spectrum-heading-han-xxs-text-size,var(--spectrum-alias-heading-xxs-text-size));font-weight:var(--spectrum-heading-han-xxs-text-font-weight,var(--spectrum-alias-han-heading-text-font-weight-regular));line-height:var(--spectrum-heading-han-xxs-text-line-height,var(--spectrum-alias-han-heading-text-line-height));font-style:var(--spectrum-heading-han-xxs-text-font-style,var(--spectrum-global-font-style-regular));letter-spacing:var(--spectrum-heading-han-xxs-text-letter-spacing,var(--spectrum-global-font-letter-spacing-han));text-transform:var(--spectrum-heading-han-xxs-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Heading--heavy,.spectrum:lang(ko) .spectrum-Heading--heavy,.spectrum:lang(zh) .spectrum-Heading--heavy{font-weight:var(--spectrum-heading-han-m-text-font-weight,var(--spectrum-alias-han-heading-text-font-weight-regular))}.spectrum:lang(ja) .spectrum-Heading--heavy .spectrum-Heading--emphasis,.spectrum:lang(ja) .spectrum-Heading--heavy em,.spectrum:lang(ko) .spectrum-Heading--heavy .spectrum-Heading--emphasis,.spectrum:lang(ko) .spectrum-Heading--heavy em,.spectrum:lang(zh) .spectrum-Heading--heavy .spectrum-Heading--emphasis,.spectrum:lang(zh) .spectrum-Heading--heavy em{font-style:var(--spectrum-heading-han-heavy-m-emphasis-text-font-style,var(--spectrum-global-font-style-regular));font-weight:var(--spectrum-heading-han-heavy-m-emphasis-text-font-weight,var(--spectrum-alias-han-heading-text-font-weight-heavy-emphasis))}.spectrum:lang(ja) .spectrum-Heading--heavy .spectrum-Heading--strong,.spectrum:lang(ja) .spectrum-Heading--heavy strong,.spectrum:lang(ko) .spectrum-Heading--heavy .spectrum-Heading--strong,.spectrum:lang(ko) .spectrum-Heading--heavy strong,.spectrum:lang(zh) .spectrum-Heading--heavy .spectrum-Heading--strong,.spectrum:lang(zh) .spectrum-Heading--heavy strong{font-style:var(--spectrum-heading-heavy-m-strong-text-font-style,var(--spectrum-global-font-style-regular));font-weight:var(--spectrum-heading-heavy-m-strong-text-font-weight,var(--spectrum-global-font-weight-black))}.spectrum:lang(ja) .spectrum-Heading--light,.spectrum:lang(ko) .spectrum-Heading--light,.spectrum:lang(zh) .spectrum-Heading--light{font-weight:var(--spectrum-heading-han-m-text-font-weight,var(--spectrum-alias-han-heading-text-font-weight-regular))}.spectrum:lang(ja) .spectrum-Heading--light .spectrum-Heading--emphasis,.spectrum:lang(ja) .spectrum-Heading--light em,.spectrum:lang(ko) .spectrum-Heading--light .spectrum-Heading--emphasis,.spectrum:lang(ko) .spectrum-Heading--light em,.spectrum:lang(zh) .spectrum-Heading--light .spectrum-Heading--emphasis,.spectrum:lang(zh) .spectrum-Heading--light em{font-style:var(--spectrum-heading-han-light-m-emphasis-text-font-style,var(--spectrum-global-font-style-regular));font-weight:var(--spectrum-heading-han-light-m-emphasis-text-font-weight,var(--spectrum-alias-han-heading-text-font-weight-light-emphasis))}.spectrum:lang(ja) .spectrum-Heading--light .spectrum-Heading--strong,.spectrum:lang(ja) .spectrum-Heading--light strong,.spectrum:lang(ko) .spectrum-Heading--light .spectrum-Heading--strong,.spectrum:lang(ko) .spectrum-Heading--light strong,.spectrum:lang(zh) .spectrum-Heading--light .spectrum-Heading--strong,.spectrum:lang(zh) .spectrum-Heading--light strong{font-style:var(--spectrum-heading-han-light-m-strong-text-font-style,var(--spectrum-global-font-style-regular));font-weight:var(--spectrum-heading-han-light-m-strong-text-font-weight,var(--spectrum-global-font-weight-bold))}.spectrum:lang(ja) .spectrum-Body--sizeXXXL,.spectrum:lang(ko) .spectrum-Body--sizeXXXL,.spectrum:lang(zh) .spectrum-Body--sizeXXXL{font-size:var(--spectrum-body-han-xxxl-text-size,var(--spectrum-global-dimension-font-size-600));font-weight:var(--spectrum-body-han-xxxl-text-font-weight,var(--spectrum-alias-han-body-text-font-weight-regular));line-height:var(--spectrum-body-han-xxxl-text-line-height,var(--spectrum-alias-han-body-text-line-height));font-style:var(--spectrum-body-han-xxxl-text-font-style,var(--spectrum-global-font-style-regular));letter-spacing:var(--spectrum-body-han-xxxl-text-letter-spacing,var(--spectrum-global-font-letter-spacing-han));text-transform:var(--spectrum-body-han-xxxl-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Body--sizeXXL,.spectrum:lang(ko) .spectrum-Body--sizeXXL,.spectrum:lang(zh) .spectrum-Body--sizeXXL{font-size:var(--spectrum-body-han-xxl-text-size,var(--spectrum-global-dimension-font-size-500));font-weight:var(--spectrum-body-han-xxl-text-font-weight,var(--spectrum-alias-han-body-text-font-weight-regular));line-height:var(--spectrum-body-han-xxl-text-line-height,var(--spectrum-alias-han-body-text-line-height));font-style:var(--spectrum-body-han-xxl-text-font-style,var(--spectrum-global-font-style-regular));letter-spacing:var(--spectrum-body-han-xxl-text-letter-spacing,var(--spectrum-global-font-letter-spacing-han));text-transform:var(--spectrum-body-han-xxl-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Body--sizeXL,.spectrum:lang(ko) .spectrum-Body--sizeXL,.spectrum:lang(zh) .spectrum-Body--sizeXL{font-size:var(--spectrum-body-han-xl-text-size,var(--spectrum-global-dimension-font-size-400));font-weight:var(--spectrum-body-han-xl-text-font-weight,var(--spectrum-alias-han-body-text-font-weight-regular));line-height:var(--spectrum-body-han-xl-text-line-height,var(--spectrum-alias-han-body-text-line-height));font-style:var(--spectrum-body-han-xl-text-font-style,var(--spectrum-global-font-style-regular));letter-spacing:var(--spectrum-body-han-xl-text-letter-spacing,var(--spectrum-global-font-letter-spacing-han));text-transform:var(--spectrum-body-han-xl-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Body--sizeL,.spectrum:lang(ko) .spectrum-Body--sizeL,.spectrum:lang(zh) .spectrum-Body--sizeL{font-size:var(--spectrum-body-han-l-text-size,var(--spectrum-global-dimension-font-size-300));font-weight:var(--spectrum-body-han-l-text-font-weight,var(--spectrum-alias-han-body-text-font-weight-regular));line-height:var(--spectrum-body-han-l-text-line-height,var(--spectrum-alias-han-body-text-line-height));font-style:var(--spectrum-body-han-l-text-font-style,var(--spectrum-global-font-style-regular));letter-spacing:var(--spectrum-body-han-l-text-letter-spacing,var(--spectrum-global-font-letter-spacing-han));text-transform:var(--spectrum-body-han-l-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Body--sizeM,.spectrum:lang(ko) .spectrum-Body--sizeM,.spectrum:lang(zh) .spectrum-Body--sizeM{font-size:var(--spectrum-body-han-m-text-size,var(--spectrum-global-dimension-font-size-200));font-weight:var(--spectrum-body-han-m-text-font-weight,var(--spectrum-alias-han-body-text-font-weight-regular));line-height:var(--spectrum-body-han-m-text-line-height,var(--spectrum-alias-han-body-text-line-height));font-style:var(--spectrum-body-han-m-text-font-style,var(--spectrum-global-font-style-regular));letter-spacing:var(--spectrum-body-han-m-text-letter-spacing,var(--spectrum-global-font-letter-spacing-han));text-transform:var(--spectrum-body-han-m-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Body--sizeS,.spectrum:lang(ko) .spectrum-Body--sizeS,.spectrum:lang(zh) .spectrum-Body--sizeS{font-size:var(--spectrum-body-han-s-text-size,var(--spectrum-alias-font-size-default));font-weight:var(--spectrum-body-han-s-text-font-weight,var(--spectrum-alias-han-body-text-font-weight-regular));line-height:var(--spectrum-body-han-s-text-line-height,var(--spectrum-alias-han-body-text-line-height));font-style:var(--spectrum-body-han-s-text-font-style,var(--spectrum-global-font-style-regular));letter-spacing:var(--spectrum-body-han-s-text-letter-spacing,var(--spectrum-global-font-letter-spacing-han));text-transform:var(--spectrum-body-han-s-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Body--sizeXS,.spectrum:lang(ko) .spectrum-Body--sizeXS,.spectrum:lang(zh) .spectrum-Body--sizeXS{font-size:var(--spectrum-body-han-xs-text-size,var(--spectrum-global-dimension-font-size-75));font-weight:var(--spectrum-body-han-xs-text-font-weight,var(--spectrum-alias-han-body-text-font-weight-regular));line-height:var(--spectrum-body-han-xs-text-line-height,var(--spectrum-alias-han-body-text-line-height));font-style:var(--spectrum-body-han-xs-text-font-style,var(--spectrum-global-font-style-regular));letter-spacing:var(--spectrum-body-han-xs-text-letter-spacing,var(--spectrum-global-font-letter-spacing-han));text-transform:var(--spectrum-body-han-xs-text-transform,none);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Detail--sizeXL,.spectrum:lang(ko) .spectrum-Detail--sizeXL,.spectrum:lang(zh) .spectrum-Detail--sizeXL{font-size:var(--spectrum-detail-han-xl-text-size,var(--spectrum-global-dimension-font-size-200));font-weight:var(--spectrum-detail-han-xl-text-font-weight,var(--spectrum-alias-detail-text-font-weight));line-height:var(--spectrum-detail-han-xl-text-line-height,var(--spectrum-alias-han-heading-text-line-height));font-style:var(--spectrum-detail-han-xl-text-font-style,var(--spectrum-global-font-style-regular));letter-spacing:var(--spectrum-detail-han-xl-text-letter-spacing,var(--spectrum-global-font-letter-spacing-han));text-transform:var(--spectrum-detail-han-xl-text-transform,uppercase);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Detail--sizeXL em,.spectrum:lang(ko) .spectrum-Detail--sizeXL em,.spectrum:lang(zh) .spectrum-Detail--sizeXL em{font-size:var(--spectrum-detail-han-xl-emphasis-text-size,var(--spectrum-global-dimension-font-size-200));font-weight:var(--spectrum-detail-han-xl-emphasis-text-font-weight,var(--spectrum-alias-han-heading-text-font-weight-regular-emphasis));line-height:var(--spectrum-detail-han-xl-emphasis-text-line-height,var(--spectrum-alias-han-heading-text-line-height));font-style:var(--spectrum-detail-han-xl-emphasis-text-font-style,var(--spectrum-global-font-style-regular));letter-spacing:var(--spectrum-detail-han-xl-emphasis-text-letter-spacing,var(--spectrum-global-font-letter-spacing-han));text-transform:var(--spectrum-detail-han-xl-emphasis-text-transform,uppercase);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Detail--sizeXL strong,.spectrum:lang(ko) .spectrum-Detail--sizeXL strong,.spectrum:lang(zh) .spectrum-Detail--sizeXL strong{font-size:var(--spectrum-detail-han-xl-strong-text-size,var(--spectrum-global-dimension-font-size-200));font-weight:var(--spectrum-detail-han-xl-strong-text-font-weight,var(--spectrum-global-font-weight-black));line-height:var(--spectrum-detail-han-xl-strong-text-line-height,var(--spectrum-alias-han-heading-text-line-height));font-style:var(--spectrum-detail-han-xl-strong-text-font-style,var(--spectrum-global-font-style-regular));letter-spacing:var(--spectrum-detail-han-xl-strong-text-letter-spacing,var(--spectrum-global-font-letter-spacing-han));text-transform:var(--spectrum-detail-han-xl-strong-text-transform,uppercase);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Detail--sizeL,.spectrum:lang(ko) .spectrum-Detail--sizeL,.spectrum:lang(zh) .spectrum-Detail--sizeL{font-size:var(--spectrum-detail-han-l-text-size,var(--spectrum-global-dimension-font-size-100));font-weight:var(--spectrum-detail-han-l-text-font-weight,var(--spectrum-alias-detail-text-font-weight));line-height:var(--spectrum-detail-han-l-text-line-height,var(--spectrum-alias-han-heading-text-line-height));font-style:var(--spectrum-detail-han-l-text-font-style,var(--spectrum-global-font-style-regular));letter-spacing:var(--spectrum-detail-han-l-text-letter-spacing,var(--spectrum-global-font-letter-spacing-han));text-transform:var(--spectrum-detail-han-l-text-transform,uppercase);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Detail--sizeL em,.spectrum:lang(ko) .spectrum-Detail--sizeL em,.spectrum:lang(zh) .spectrum-Detail--sizeL em{font-size:var(--spectrum-detail-han-l-emphasis-text-size,var(--spectrum-global-dimension-font-size-100));font-weight:var(--spectrum-detail-han-l-emphasis-text-font-weight,var(--spectrum-alias-han-heading-text-font-weight-regular-emphasis));line-height:var(--spectrum-detail-han-l-emphasis-text-line-height,var(--spectrum-alias-han-heading-text-line-height));font-style:var(--spectrum-detail-han-l-emphasis-text-font-style,var(--spectrum-global-font-style-regular));letter-spacing:var(--spectrum-detail-han-l-emphasis-text-letter-spacing,var(--spectrum-global-font-letter-spacing-han));text-transform:var(--spectrum-detail-han-l-emphasis-text-transform,uppercase);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Detail--sizeL strong,.spectrum:lang(ko) .spectrum-Detail--sizeL strong,.spectrum:lang(zh) .spectrum-Detail--sizeL strong{font-size:var(--spectrum-detail-han-l-strong-text-size,var(--spectrum-global-dimension-font-size-100));font-weight:var(--spectrum-detail-han-l-strong-text-font-weight,var(--spectrum-global-font-weight-black));line-height:var(--spectrum-detail-han-l-strong-text-line-height,var(--spectrum-alias-han-heading-text-line-height));font-style:var(--spectrum-detail-han-l-strong-text-font-style,var(--spectrum-global-font-style-regular));letter-spacing:var(--spectrum-detail-han-l-strong-text-letter-spacing,var(--spectrum-global-font-letter-spacing-han));text-transform:var(--spectrum-detail-han-l-strong-text-transform,uppercase);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Detail--sizeM,.spectrum:lang(ko) .spectrum-Detail--sizeM,.spectrum:lang(zh) .spectrum-Detail--sizeM{font-size:var(--spectrum-detail-han-m-text-size,var(--spectrum-global-dimension-font-size-75));font-weight:var(--spectrum-detail-han-m-text-font-weight,var(--spectrum-alias-detail-text-font-weight));line-height:var(--spectrum-detail-han-m-text-line-height,var(--spectrum-alias-han-heading-text-line-height));font-style:var(--spectrum-detail-han-m-text-font-style,var(--spectrum-global-font-style-regular));letter-spacing:var(--spectrum-detail-han-m-text-letter-spacing,var(--spectrum-global-font-letter-spacing-han));text-transform:var(--spectrum-detail-han-m-text-transform,uppercase);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Detail--sizeM em,.spectrum:lang(ko) .spectrum-Detail--sizeM em,.spectrum:lang(zh) .spectrum-Detail--sizeM em{font-size:var(--spectrum-detail-han-m-emphasis-text-size,var(--spectrum-global-dimension-font-size-75));font-weight:var(--spectrum-detail-han-m-emphasis-text-font-weight,var(--spectrum-alias-han-heading-text-font-weight-regular-emphasis));line-height:var(--spectrum-detail-han-m-emphasis-text-line-height,var(--spectrum-alias-han-heading-text-line-height));font-style:var(--spectrum-detail-han-m-emphasis-text-font-style,var(--spectrum-global-font-style-regular));letter-spacing:var(--spectrum-detail-han-m-emphasis-text-letter-spacing,var(--spectrum-global-font-letter-spacing-han));text-transform:var(--spectrum-detail-han-m-emphasis-text-transform,uppercase);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Detail--sizeM strong,.spectrum:lang(ko) .spectrum-Detail--sizeM strong,.spectrum:lang(zh) .spectrum-Detail--sizeM strong{font-size:var(--spectrum-detail-han-m-strong-text-size,var(--spectrum-global-dimension-font-size-75));font-weight:var(--spectrum-detail-han-m-strong-text-font-weight,var(--spectrum-global-font-weight-black));line-height:var(--spectrum-detail-han-m-strong-text-line-height,var(--spectrum-alias-han-heading-text-line-height));font-style:var(--spectrum-detail-han-m-strong-text-font-style,var(--spectrum-global-font-style-regular));letter-spacing:var(--spectrum-detail-han-m-strong-text-letter-spacing,var(--spectrum-global-font-letter-spacing-han));text-transform:var(--spectrum-detail-han-m-strong-text-transform,uppercase);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Detail--sizeS,.spectrum:lang(ko) .spectrum-Detail--sizeS,.spectrum:lang(zh) .spectrum-Detail--sizeS{font-size:var(--spectrum-detail-han-s-text-size,var(--spectrum-global-dimension-font-size-50));font-weight:var(--spectrum-detail-han-s-text-font-weight,var(--spectrum-alias-detail-text-font-weight));line-height:var(--spectrum-detail-han-s-text-line-height,var(--spectrum-alias-han-heading-text-line-height));font-style:var(--spectrum-detail-han-s-text-font-style,var(--spectrum-global-font-style-regular));letter-spacing:var(--spectrum-detail-han-s-text-letter-spacing,var(--spectrum-global-font-letter-spacing-han));text-transform:var(--spectrum-detail-han-s-text-transform,uppercase);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Detail--sizeS em,.spectrum:lang(ko) .spectrum-Detail--sizeS em,.spectrum:lang(zh) .spectrum-Detail--sizeS em{font-size:var(--spectrum-detail-han-s-emphasis-text-size,var(--spectrum-global-dimension-font-size-50));font-weight:var(--spectrum-detail-han-s-emphasis-text-font-weight,var(--spectrum-alias-han-heading-text-font-weight-regular-emphasis));line-height:var(--spectrum-detail-han-s-emphasis-text-line-height,var(--spectrum-alias-han-heading-text-line-height));font-style:var(--spectrum-detail-han-s-emphasis-text-font-style,var(--spectrum-global-font-style-regular));letter-spacing:var(--spectrum-detail-han-s-emphasis-text-letter-spacing,var(--spectrum-global-font-letter-spacing-han));text-transform:var(--spectrum-detail-han-s-emphasis-text-transform,uppercase);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Detail--sizeS strong,.spectrum:lang(ko) .spectrum-Detail--sizeS strong,.spectrum:lang(zh) .spectrum-Detail--sizeS strong{font-size:var(--spectrum-detail-han-s-strong-text-size,var(--spectrum-global-dimension-font-size-50));font-weight:var(--spectrum-detail-han-s-strong-text-font-weight,var(--spectrum-global-font-weight-black));line-height:var(--spectrum-detail-han-s-strong-text-line-height,var(--spectrum-alias-han-heading-text-line-height));font-style:var(--spectrum-detail-han-s-strong-text-font-style,var(--spectrum-global-font-style-regular));letter-spacing:var(--spectrum-detail-han-s-strong-text-letter-spacing,var(--spectrum-global-font-letter-spacing-han));text-transform:var(--spectrum-detail-han-s-strong-text-transform,uppercase);margin-top:0;margin-bottom:0}.spectrum:lang(ja) .spectrum-Detail--light,.spectrum:lang(ko) .spectrum-Detail--light,.spectrum:lang(zh) .spectrum-Detail--light{font-weight:var(--spectrum-detail-han-m-text-font-weight,var(--spectrum-alias-detail-text-font-weight))}.spectrum:lang(ja) .spectrum-Detail--light .spectrum-Detail--emphasis,.spectrum:lang(ja) .spectrum-Detail--light em,.spectrum:lang(ko) .spectrum-Detail--light .spectrum-Detail--emphasis,.spectrum:lang(ko) .spectrum-Detail--light em,.spectrum:lang(zh) .spectrum-Detail--light .spectrum-Detail--emphasis,.spectrum:lang(zh) .spectrum-Detail--light em{font-style:var(--spectrum-detail-han-light-m-emphasis-text-font-style,var(--spectrum-global-font-style-regular));font-weight:var(--spectrum-detail-han-light-m-emphasis-text-font-weight,var(--spectrum-alias-han-heading-text-font-weight-light-emphasis))}.spectrum:lang(ja) .spectrum-Detail--light .spectrum-Detail--strong,.spectrum:lang(ja) .spectrum-Detail--light strong,.spectrum:lang(ko) .spectrum-Detail--light .spectrum-Detail--strong,.spectrum:lang(ko) .spectrum-Detail--light strong,.spectrum:lang(zh) .spectrum-Detail--light .spectrum-Detail--strong,.spectrum:lang(zh) .spectrum-Detail--light strong{font-style:var(--spectrum-detail-han-light-m-strong-text-font-style,var(--spectrum-global-font-style-regular));font-weight:var(--spectrum-detail-han-light-m-strong-text-font-weight,var(--spectrum-alias-heading-text-font-weight-regular))}.spectrum:lang(ja) .spectrum-Code--sizeXL,.spectrum:lang(ko) .spectrum-Code--sizeXL,.spectrum:lang(zh) .spectrum-Code--sizeXL{font-size:var(--spectrum-code-han-xl-text-size,var(--spectrum-global-dimension-font-size-400));font-weight:var(--spectrum-code-han-xl-text-font-weight,var(--spectrum-alias-han-body-text-font-weight-regular));line-height:var(--spectrum-code-han-xl-text-line-height,var(--spectrum-alias-han-body-text-line-height));font-style:var(--spectrum-code-han-xl-text-font-style,var(--spectrum-global-font-style-regular));letter-spacing:var(--spectrum-code-han-xl-text-letter-spacing,var(--spectrum-global-font-letter-spacing-han));margin-top:0;margin-bottom:0;font-family:var(--spectrum-code-han-xl-text-font-family,var(--spectrum-alias-font-family-zh))}.spectrum:lang(ja) .spectrum-Code--sizeL,.spectrum:lang(ko) .spectrum-Code--sizeL,.spectrum:lang(zh) .spectrum-Code--sizeL{font-size:var(--spectrum-code-han-l-text-size,var(--spectrum-global-dimension-font-size-300));font-weight:var(--spectrum-code-han-l-text-font-weight,var(--spectrum-alias-han-body-text-font-weight-regular));line-height:var(--spectrum-code-han-l-text-line-height,var(--spectrum-alias-han-body-text-line-height));font-style:var(--spectrum-code-han-l-text-font-style,var(--spectrum-global-font-style-regular));letter-spacing:var(--spectrum-code-han-l-text-letter-spacing,var(--spectrum-global-font-letter-spacing-han));margin-top:0;margin-bottom:0;font-family:var(--spectrum-code-han-l-text-font-family,var(--spectrum-alias-font-family-zh))}.spectrum:lang(ja) .spectrum-Code--sizeM,.spectrum:lang(ko) .spectrum-Code--sizeM,.spectrum:lang(zh) .spectrum-Code--sizeM{font-size:var(--spectrum-code-han-m-text-size,var(--spectrum-global-dimension-font-size-200));font-weight:var(--spectrum-code-han-m-text-font-weight,var(--spectrum-alias-han-body-text-font-weight-regular));line-height:var(--spectrum-code-han-m-text-line-height,var(--spectrum-alias-han-body-text-line-height));font-style:var(--spectrum-code-han-m-text-font-style,var(--spectrum-global-font-style-regular));letter-spacing:var(--spectrum-code-han-m-text-letter-spacing,var(--spectrum-global-font-letter-spacing-han));margin-top:0;margin-bottom:0;font-family:var(--spectrum-code-han-m-text-font-family,var(--spectrum-alias-font-family-zh))}.spectrum:lang(ja) .spectrum-Code--sizeS,.spectrum:lang(ko) .spectrum-Code--sizeS,.spectrum:lang(zh) .spectrum-Code--sizeS{font-size:var(--spectrum-code-han-s-text-size,var(--spectrum-alias-font-size-default));font-weight:var(--spectrum-code-han-s-text-font-weight,var(--spectrum-alias-han-body-text-font-weight-regular));line-height:var(--spectrum-code-han-s-text-line-height,var(--spectrum-alias-han-body-text-line-height));font-style:var(--spectrum-code-han-s-text-font-style,var(--spectrum-global-font-style-regular));letter-spacing:var(--spectrum-code-han-s-text-letter-spacing,var(--spectrum-global-font-letter-spacing-han));margin-top:0;margin-bottom:0;font-family:var(--spectrum-code-han-s-text-font-family,var(--spectrum-alias-font-family-zh))}.spectrum:lang(ja) .spectrum-Code--sizeXS,.spectrum:lang(ko) .spectrum-Code--sizeXS,.spectrum:lang(zh) .spectrum-Code--sizeXS{font-size:var(--spectrum-code-han-xs-text-size,var(--spectrum-global-dimension-font-size-75));font-weight:var(--spectrum-code-han-xs-text-font-weight,var(--spectrum-alias-han-body-text-font-weight-regular));line-height:var(--spectrum-code-han-xs-text-line-height,var(--spectrum-alias-han-body-text-line-height));font-style:var(--spectrum-code-han-xs-text-font-style,var(--spectrum-global-font-style-regular));letter-spacing:var(--spectrum-code-han-xs-text-letter-spacing,var(--spectrum-global-font-letter-spacing-han));margin-top:0;margin-bottom:0;font-family:var(--spectrum-code-han-xs-text-font-family,var(--spectrum-alias-font-family-zh))}.spectrum:lang(ja) .spectrum-Body--sizeXXXL,.spectrum:lang(ko) .spectrum-Body--sizeXXXL,.spectrum:lang(zh) .spectrum-Body--sizeXXXL{color:var(--spectrum-body-han-xxxl-text-color,var(--spectrum-alias-text-color))}.spectrum:lang(ja) .spectrum-Body--sizeXXL,.spectrum:lang(ko) .spectrum-Body--sizeXXL,.spectrum:lang(zh) .spectrum-Body--sizeXXL{color:var(--spectrum-body-han-xxl-text-color,var(--spectrum-alias-text-color))}.spectrum:lang(ja) .spectrum-Body--sizeXL,.spectrum:lang(ko) .spectrum-Body--sizeXL,.spectrum:lang(zh) .spectrum-Body--sizeXL{color:var(--spectrum-body-han-xl-text-color,var(--spectrum-alias-text-color))}.spectrum:lang(ja) .spectrum-Body--sizeL,.spectrum:lang(ko) .spectrum-Body--sizeL,.spectrum:lang(zh) .spectrum-Body--sizeL{color:var(--spectrum-body-han-l-text-color,var(--spectrum-alias-text-color))}.spectrum:lang(ja) .spectrum-Body--sizeM,.spectrum:lang(ko) .spectrum-Body--sizeM,.spectrum:lang(zh) .spectrum-Body--sizeM{color:var(--spectrum-body-han-m-text-color,var(--spectrum-alias-text-color))}.spectrum:lang(ja) .spectrum-Body--sizeS,.spectrum:lang(ko) .spectrum-Body--sizeS,.spectrum:lang(zh) .spectrum-Body--sizeS{color:var(--spectrum-body-han-s-text-color,var(--spectrum-alias-text-color))}.spectrum:lang(ja) .spectrum-Body--sizeXS,.spectrum:lang(ko) .spectrum-Body--sizeXS,.spectrum:lang(zh) .spectrum-Body--sizeXS{color:var(--spectrum-body-han-xs-text-color,var(--spectrum-alias-text-color))}.spectrum:lang(ja) .spectrum-Heading--sizeXXXL,.spectrum:lang(ko) .spectrum-Heading--sizeXXXL,.spectrum:lang(zh) .spectrum-Heading--sizeXXXL{color:var(--spectrum-heading-xxxl-text-color,var(--spectrum-alias-heading-text-color))}.spectrum:lang(ja) .spectrum-Heading--sizeXXL,.spectrum:lang(ko) .spectrum-Heading--sizeXXL,.spectrum:lang(zh) .spectrum-Heading--sizeXXL{color:var(--spectrum-heading-xxl-text-color,var(--spectrum-alias-heading-text-color))}.spectrum:lang(ja) .spectrum-Heading--sizeXL,.spectrum:lang(ko) .spectrum-Heading--sizeXL,.spectrum:lang(zh) .spectrum-Heading--sizeXL{color:var(--spectrum-heading-xl-text-color,var(--spectrum-alias-heading-text-color))}.spectrum:lang(ja) .spectrum-Heading--sizeL,.spectrum:lang(ko) .spectrum-Heading--sizeL,.spectrum:lang(zh) .spectrum-Heading--sizeL{color:var(--spectrum-heading-l-text-color,var(--spectrum-alias-heading-text-color))}.spectrum:lang(ja) .spectrum-Heading--sizeM,.spectrum:lang(ko) .spectrum-Heading--sizeM,.spectrum:lang(zh) .spectrum-Heading--sizeM{color:var(--spectrum-heading-m-text-color,var(--spectrum-alias-heading-text-color))}.spectrum:lang(ja) .spectrum-Heading--sizeS,.spectrum:lang(ko) .spectrum-Heading--sizeS,.spectrum:lang(zh) .spectrum-Heading--sizeS{color:var(--spectrum-heading-s-text-color,var(--spectrum-alias-heading-text-color))}.spectrum:lang(ja) .spectrum-Heading--sizeXS,.spectrum:lang(ko) .spectrum-Heading--sizeXS,.spectrum:lang(zh) .spectrum-Heading--sizeXS{color:var(--spectrum-heading-xs-text-color,var(--spectrum-alias-heading-text-color))}.spectrum:lang(ja) .spectrum-Heading--sizeXXS,.spectrum:lang(ko) .spectrum-Heading--sizeXXS,.spectrum:lang(zh) .spectrum-Heading--sizeXXS{color:var(--spectrum-heading-xxs-text-color,var(--spectrum-alias-heading-text-color))}.spectrum:lang(ja) .spectrum-Heading-sizeXXXL--light,.spectrum:lang(ko) .spectrum-Heading-sizeXXXL--light,.spectrum:lang(zh) .spectrum-Heading-sizeXXXL--light{color:var(--spectrum-heading-light-xxxl-text-color,var(--spectrum-alias-heading-text-color))}.spectrum:lang(ja) .spectrum-Heading-sizeXXL--light,.spectrum:lang(ko) .spectrum-Heading-sizeXXL--light,.spectrum:lang(zh) .spectrum-Heading-sizeXXL--light{color:var(--spectrum-heading-light-xxl-text-color,var(--spectrum-alias-heading-text-color))}.spectrum:lang(ja) .spectrum-Heading-sizeXL--light,.spectrum:lang(ko) .spectrum-Heading-sizeXL--light,.spectrum:lang(zh) .spectrum-Heading-sizeXL--light{color:var(--spectrum-heading-light-xl-text-color,var(--spectrum-alias-heading-text-color))}.spectrum:lang(ja) .spectrum-Heading-sizeL--light,.spectrum:lang(ko) .spectrum-Heading-sizeL--light,.spectrum:lang(zh) .spectrum-Heading-sizeL--light{color:var(--spectrum-heading-light-l-text-color,var(--spectrum-alias-heading-text-color))}.spectrum:lang(ja) .spectrum-Heading-sizeXXXL--heavy,.spectrum:lang(ko) .spectrum-Heading-sizeXXXL--heavy,.spectrum:lang(zh) .spectrum-Heading-sizeXXXL--heavy{color:var(--spectrum-heading-heavy-xxxl-text-color,var(--spectrum-alias-heading-text-color))}.spectrum:lang(ja) .spectrum-Heading-sizeXXL--heavy,.spectrum:lang(ko) .spectrum-Heading-sizeXXL--heavy,.spectrum:lang(zh) .spectrum-Heading-sizeXXL--heavy{color:var(--spectrum-heading-heavy-xxl-text-color,var(--spectrum-alias-heading-text-color))}.spectrum:lang(ja) .spectrum-Heading-sizeXL--heavy,.spectrum:lang(ko) .spectrum-Heading-sizeXL--heavy,.spectrum:lang(zh) .spectrum-Heading-sizeXL--heavy{color:var(--spectrum-heading-heavy-xl-text-color,var(--spectrum-alias-heading-text-color))}.spectrum:lang(ja) .spectrum-Heading-sizeL--heavy,.spectrum:lang(ko) .spectrum-Heading-sizeL--heavy,.spectrum:lang(zh) .spectrum-Heading-sizeL--heavy{color:var(--spectrum-heading-heavy-l-text-color,var(--spectrum-alias-heading-text-color))}.spectrum:lang(ja) .spectrum-Heading-sizeXXXL--heading,.spectrum:lang(ko) .spectrum-Heading-sizeXXXL--heading,.spectrum:lang(zh) .spectrum-Heading-sizeXXXL--heading{color:var(--spectrum-heading-xxxl-text-color,var(--spectrum-alias-heading-text-color))}.spectrum:lang(ja) .spectrum-Heading-sizeXXL--heading,.spectrum:lang(ko) .spectrum-Heading-sizeXXL--heading,.spectrum:lang(zh) .spectrum-Heading-sizeXXL--heading{color:var(--spectrum-heading-xxl-text-color,var(--spectrum-alias-heading-text-color))}.spectrum:lang(ja) .spectrum-Heading-sizeXL--heading,.spectrum:lang(ko) .spectrum-Heading-sizeXL--heading,.spectrum:lang(zh) .spectrum-Heading-sizeXL--heading{color:var(--spectrum-heading-xl-text-color,var(--spectrum-alias-heading-text-color))}.spectrum:lang(ja) .spectrum-Heading-sizeL--heading,.spectrum:lang(ko) .spectrum-Heading-sizeL--heading,.spectrum:lang(zh) .spectrum-Heading-sizeL--heading{color:var(--spectrum-heading-l-text-color,var(--spectrum-alias-heading-text-color))}.spectrum:lang(ja) .spectrum-Detail--sizeXL,.spectrum:lang(ko) .spectrum-Detail--sizeXL,.spectrum:lang(zh) .spectrum-Detail--sizeXL{color:var(--spectrum-detail-xl-text-color,var(--spectrum-alias-heading-text-color))}.spectrum:lang(ja) .spectrum-Detail--sizeL,.spectrum:lang(ko) .spectrum-Detail--sizeL,.spectrum:lang(zh) .spectrum-Detail--sizeL{color:var(--spectrum-detail-l-text-color,var(--spectrum-alias-heading-text-color))}.spectrum:lang(ja) .spectrum-Detail--sizeM,.spectrum:lang(ko) .spectrum-Detail--sizeM,.spectrum:lang(zh) .spectrum-Detail--sizeM{color:var(--spectrum-detail-m-text-color,var(--spectrum-alias-heading-text-color))}.spectrum:lang(ja) .spectrum-Detail--sizeS,.spectrum:lang(ko) .spectrum-Detail--sizeS,.spectrum:lang(zh) .spectrum-Detail--sizeS{color:var(--spectrum-detail-s-text-color,var(--spectrum-alias-heading-text-color))}.spectrum:lang(ja) .spectrum-Code--sizeXL,.spectrum:lang(ko) .spectrum-Code--sizeXL,.spectrum:lang(zh) .spectrum-Code--sizeXL{color:var(--spectrum-code-xl-text-color,var(--spectrum-alias-text-color))}.spectrum:lang(ja) .spectrum-Code--sizeL,.spectrum:lang(ko) .spectrum-Code--sizeL,.spectrum:lang(zh) .spectrum-Code--sizeL{color:var(--spectrum-code-l-text-color,var(--spectrum-alias-text-color))}.spectrum:lang(ja) .spectrum-Code--sizeM,.spectrum:lang(ko) .spectrum-Code--sizeM,.spectrum:lang(zh) .spectrum-Code--sizeM{color:var(--spectrum-code-m-text-color,var(--spectrum-alias-text-color))}.spectrum:lang(ja) .spectrum-Code--sizeS,.spectrum:lang(ko) .spectrum-Code--sizeS,.spectrum:lang(zh) .spectrum-Code--sizeS{color:var(--spectrum-code-s-text-color,var(--spectrum-alias-text-color))}.spectrum:lang(ja) .spectrum-Code--sizeXS,.spectrum:lang(ko) .spectrum-Code--sizeXS,.spectrum:lang(zh) .spectrum-Code--sizeXS{color:var(--spectrum-code-xs-text-color,var(--spectrum-alias-text-color))}
`;

/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
const styles$8 = css$1`
.spectrum-Heading--sizeXXXL{font-size:var(--spectrum-heading-xxxl-text-size,var(--spectrum-alias-heading-xxxl-text-size));font-weight:var(--spectrum-heading-xxxl-text-font-weight,var(--spectrum-alias-heading-text-font-weight-regular));line-height:var(--spectrum-heading-xxxl-text-line-height,var(--spectrum-alias-heading-text-line-height));font-style:var(--spectrum-heading-xxxl-text-font-style,var(--spectrum-global-font-style-regular));letter-spacing:var(--spectrum-heading-xxxl-text-letter-spacing,var(--spectrum-global-font-letter-spacing-none));text-transform:var(--spectrum-heading-xxxl-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Heading--sizeXXL{font-size:var(--spectrum-heading-xxl-text-size,var(--spectrum-alias-heading-xxl-text-size));font-weight:var(--spectrum-heading-xxl-text-font-weight,var(--spectrum-alias-heading-text-font-weight-regular));line-height:var(--spectrum-heading-xxl-text-line-height,var(--spectrum-alias-heading-text-line-height));font-style:var(--spectrum-heading-xxl-text-font-style,var(--spectrum-global-font-style-regular));letter-spacing:var(--spectrum-heading-xxl-text-letter-spacing,var(--spectrum-global-font-letter-spacing-none));text-transform:var(--spectrum-heading-xxl-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Heading--sizeXL{font-size:var(--spectrum-heading-xl-text-size,var(--spectrum-alias-heading-xl-text-size));font-weight:var(--spectrum-heading-xl-text-font-weight,var(--spectrum-alias-heading-text-font-weight-regular));line-height:var(--spectrum-heading-xl-text-line-height,var(--spectrum-alias-heading-text-line-height));font-style:var(--spectrum-heading-xl-text-font-style,var(--spectrum-global-font-style-regular));letter-spacing:var(--spectrum-heading-xl-text-letter-spacing,var(--spectrum-global-font-letter-spacing-none));text-transform:var(--spectrum-heading-xl-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Heading--sizeL{font-size:var(--spectrum-heading-l-text-size,var(--spectrum-alias-heading-l-text-size));font-weight:var(--spectrum-heading-l-text-font-weight,var(--spectrum-alias-heading-text-font-weight-regular));line-height:var(--spectrum-heading-l-text-line-height,var(--spectrum-alias-heading-text-line-height));font-style:var(--spectrum-heading-l-text-font-style,var(--spectrum-global-font-style-regular));letter-spacing:var(--spectrum-heading-l-text-letter-spacing,var(--spectrum-global-font-letter-spacing-none));text-transform:var(--spectrum-heading-l-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Heading--sizeM{font-size:var(--spectrum-heading-m-text-size,var(--spectrum-alias-heading-m-text-size));font-weight:var(--spectrum-heading-m-text-font-weight,var(--spectrum-alias-heading-text-font-weight-regular));line-height:var(--spectrum-heading-m-text-line-height,var(--spectrum-alias-heading-text-line-height));font-style:var(--spectrum-heading-m-text-font-style,var(--spectrum-global-font-style-regular));letter-spacing:var(--spectrum-heading-m-text-letter-spacing,var(--spectrum-global-font-letter-spacing-none));text-transform:var(--spectrum-heading-m-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Heading--sizeS{font-size:var(--spectrum-heading-s-text-size,var(--spectrum-alias-heading-s-text-size));font-weight:var(--spectrum-heading-s-text-font-weight,var(--spectrum-alias-heading-text-font-weight-regular));line-height:var(--spectrum-heading-s-text-line-height,var(--spectrum-alias-heading-text-line-height));font-style:var(--spectrum-heading-s-text-font-style,var(--spectrum-global-font-style-regular));letter-spacing:var(--spectrum-heading-s-text-letter-spacing,var(--spectrum-global-font-letter-spacing-none));text-transform:var(--spectrum-heading-s-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Heading--sizeXS{font-size:var(--spectrum-heading-xs-text-size,var(--spectrum-alias-heading-xs-text-size));font-weight:var(--spectrum-heading-xs-text-font-weight,var(--spectrum-alias-heading-text-font-weight-regular));line-height:var(--spectrum-heading-xs-text-line-height,var(--spectrum-alias-heading-text-line-height));font-style:var(--spectrum-heading-xs-text-font-style,var(--spectrum-global-font-style-regular));letter-spacing:var(--spectrum-heading-xs-text-letter-spacing,var(--spectrum-global-font-letter-spacing-none));text-transform:var(--spectrum-heading-xs-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Heading--sizeXXS{font-size:var(--spectrum-heading-xxs-text-size,var(--spectrum-alias-heading-xxs-text-size));font-weight:var(--spectrum-heading-xxs-text-font-weight,var(--spectrum-alias-heading-text-font-weight-regular));line-height:var(--spectrum-heading-xxs-text-line-height,var(--spectrum-alias-heading-text-line-height));font-style:var(--spectrum-heading-xxs-text-font-style,var(--spectrum-global-font-style-regular));letter-spacing:var(--spectrum-heading-xxs-text-letter-spacing,var(--spectrum-global-font-letter-spacing-none));text-transform:var(--spectrum-heading-xxs-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Heading{font-family:var(--spectrum-heading-m-text-font-family,var(--spectrum-alias-body-text-font-family));font-weight:var(--spectrum-heading-m-text-font-weight,var(--spectrum-alias-heading-text-font-weight-regular))}.spectrum-Heading .spectrum-Heading-emphasis,.spectrum-Heading em{font-style:var(--spectrum-heading-m-emphasis-text-font-style,var(--spectrum-global-font-style-italic))}.spectrum-Heading .spectrum-Heading-strong,.spectrum-Heading strong{font-weight:var(--spectrum-heading-m-strong-text-font-weight,var(--spectrum-global-font-weight-black))}.spectrum-Heading--serif{font-family:var(--spectrum-body-serif-m-text-font-family,var(--spectrum-alias-serif-text-font-family))}.spectrum-Heading--heavy{font-weight:var(--spectrum-heading-heavy-m-text-font-weight,var(--spectrum-global-font-weight-black))}.spectrum-Heading--heavy .spectrum-Heading-emphasis,.spectrum-Heading--heavy em{font-style:var(--spectrum-heading-heavy-m-emphasis-text-font-style,var(--spectrum-global-font-style-italic))}.spectrum-Heading--heavy .spectrum-Heading-strong,.spectrum-Heading--heavy strong{font-weight:var(--spectrum-heading-heavy-m-strong-text-font-weight,var(--spectrum-global-font-weight-black))}.spectrum-Heading--light{font-weight:var(--spectrum-heading-light-m-emphasis-text-font-weight,var(--spectrum-global-font-weight-light))}.spectrum-Heading--light .spectrum-Heading-emphasis,.spectrum-Heading--light em{font-style:var(--spectrum-heading-light-m-emphasis-text-font-style,var(--spectrum-global-font-style-italic))}.spectrum-Heading--light .spectrum-Heading-strong,.spectrum-Heading--light strong{font-weight:var(--spectrum-heading-light-m-strong-text-font-weight,var(--spectrum-global-font-weight-bold))}.spectrum-Heading--sizeXXXL{color:var(--spectrum-heading-xxxl-text-color,var(--spectrum-alias-heading-text-color))}.spectrum-Heading--sizeXXL{color:var(--spectrum-heading-xxl-text-color,var(--spectrum-alias-heading-text-color))}.spectrum-Heading--sizeXL{color:var(--spectrum-heading-xl-text-color,var(--spectrum-alias-heading-text-color))}.spectrum-Heading--sizeL{color:var(--spectrum-heading-l-text-color,var(--spectrum-alias-heading-text-color))}.spectrum-Heading--sizeM{color:var(--spectrum-heading-m-text-color,var(--spectrum-alias-heading-text-color))}.spectrum-Heading--sizeS{color:var(--spectrum-heading-s-text-color,var(--spectrum-alias-heading-text-color))}.spectrum-Heading--sizeXS{color:var(--spectrum-heading-xs-text-color,var(--spectrum-alias-heading-text-color))}.spectrum-Heading--sizeXXS{color:var(--spectrum-heading-xxs-text-color,var(--spectrum-alias-heading-text-color))}.spectrum-Heading-sizeXXXL--light{color:var(--spectrum-heading-light-xxxl-text-color,var(--spectrum-alias-heading-text-color))}.spectrum-Heading-sizeXXL--light{color:var(--spectrum-heading-light-xxl-text-color,var(--spectrum-alias-heading-text-color))}.spectrum-Heading-sizeXL--light{color:var(--spectrum-heading-light-xl-text-color,var(--spectrum-alias-heading-text-color))}.spectrum-Heading-sizeL--light{color:var(--spectrum-heading-light-l-text-color,var(--spectrum-alias-heading-text-color))}.spectrum-Heading-sizeXXXL--heavy{color:var(--spectrum-heading-heavy-xxxl-text-color,var(--spectrum-alias-heading-text-color))}.spectrum-Heading-sizeXXL--heavy{color:var(--spectrum-heading-heavy-xxl-text-color,var(--spectrum-alias-heading-text-color))}.spectrum-Heading-sizeXL--heavy{color:var(--spectrum-heading-heavy-xl-text-color,var(--spectrum-alias-heading-text-color))}.spectrum-Heading-sizeL--heavy{color:var(--spectrum-heading-heavy-l-text-color,var(--spectrum-alias-heading-text-color))}.spectrum-Heading-sizeXXXL--heading{color:var(--spectrum-heading-xxxl-text-color,var(--spectrum-alias-heading-text-color))}.spectrum-Heading-sizeXXL--heading{color:var(--spectrum-heading-xxl-text-color,var(--spectrum-alias-heading-text-color))}.spectrum-Heading-sizeXL--heading{color:var(--spectrum-heading-xl-text-color,var(--spectrum-alias-heading-text-color))}.spectrum-Heading-sizeL--heading{color:var(--spectrum-heading-l-text-color,var(--spectrum-alias-heading-text-color))}
`;

/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var headingStyles = [styles$6, styles$7, styles$8];

/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
const styles$9 = css$1`
.spectrum-Body--sizeXXXL{font-size:var(--spectrum-body-xxxl-text-size,var(--spectrum-global-dimension-font-size-600));font-weight:var(--spectrum-body-xxxl-text-font-weight,var(--spectrum-alias-body-text-font-weight));line-height:var(--spectrum-body-xxxl-text-line-height,var(--spectrum-alias-body-text-line-height));font-style:var(--spectrum-body-xxxl-text-font-style,var(--spectrum-global-font-style-regular));letter-spacing:var(--spectrum-body-xxxl-text-letter-spacing,var(--spectrum-global-font-letter-spacing-none));text-transform:var(--spectrum-body-xxxl-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Body--sizeXXL{font-size:var(--spectrum-body-xxl-text-size,var(--spectrum-global-dimension-font-size-500));font-weight:var(--spectrum-body-xxl-text-font-weight,var(--spectrum-alias-body-text-font-weight));line-height:var(--spectrum-body-xxl-text-line-height,var(--spectrum-alias-body-text-line-height));font-style:var(--spectrum-body-xxl-text-font-style,var(--spectrum-global-font-style-regular));letter-spacing:var(--spectrum-body-xxl-text-letter-spacing,var(--spectrum-global-font-letter-spacing-none));text-transform:var(--spectrum-body-xxl-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Body--sizeXL{font-size:var(--spectrum-body-xl-text-size,var(--spectrum-global-dimension-font-size-400));font-weight:var(--spectrum-body-xl-text-font-weight,var(--spectrum-alias-body-text-font-weight));line-height:var(--spectrum-body-xl-text-line-height,var(--spectrum-alias-body-text-line-height));font-style:var(--spectrum-body-xl-text-font-style,var(--spectrum-global-font-style-regular));letter-spacing:var(--spectrum-body-xl-text-letter-spacing,var(--spectrum-global-font-letter-spacing-none));text-transform:var(--spectrum-body-xl-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Body--sizeL{font-size:var(--spectrum-body-l-text-size,var(--spectrum-global-dimension-font-size-300));font-weight:var(--spectrum-body-l-text-font-weight,var(--spectrum-alias-body-text-font-weight));line-height:var(--spectrum-body-l-text-line-height,var(--spectrum-alias-body-text-line-height));font-style:var(--spectrum-body-l-text-font-style,var(--spectrum-global-font-style-regular));letter-spacing:var(--spectrum-body-l-text-letter-spacing,var(--spectrum-global-font-letter-spacing-none));text-transform:var(--spectrum-body-l-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Body--sizeM{font-size:var(--spectrum-body-m-text-size,var(--spectrum-global-dimension-font-size-200));font-weight:var(--spectrum-body-m-text-font-weight,var(--spectrum-alias-body-text-font-weight));line-height:var(--spectrum-body-m-text-line-height,var(--spectrum-alias-body-text-line-height));font-style:var(--spectrum-body-m-text-font-style,var(--spectrum-global-font-style-regular));letter-spacing:var(--spectrum-body-m-text-letter-spacing,var(--spectrum-global-font-letter-spacing-none));text-transform:var(--spectrum-body-m-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Body--sizeS{font-size:var(--spectrum-body-s-text-size,var(--spectrum-alias-font-size-default));font-weight:var(--spectrum-body-s-text-font-weight,var(--spectrum-alias-body-text-font-weight));line-height:var(--spectrum-body-s-text-line-height,var(--spectrum-alias-body-text-line-height));font-style:var(--spectrum-body-s-text-font-style,var(--spectrum-global-font-style-regular));letter-spacing:var(--spectrum-body-s-text-letter-spacing,var(--spectrum-global-font-letter-spacing-none));text-transform:var(--spectrum-body-s-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Body--sizeXS{font-size:var(--spectrum-body-xs-text-size,var(--spectrum-global-dimension-font-size-75));font-weight:var(--spectrum-body-xs-text-font-weight,var(--spectrum-alias-body-text-font-weight));line-height:var(--spectrum-body-xs-text-line-height,var(--spectrum-alias-body-text-line-height));font-style:var(--spectrum-body-xs-text-font-style,var(--spectrum-global-font-style-regular));letter-spacing:var(--spectrum-body-xs-text-letter-spacing,var(--spectrum-global-font-letter-spacing-none));text-transform:var(--spectrum-body-xs-text-transform,none);margin-top:0;margin-bottom:0}.spectrum-Body{font-family:var(--spectrum-body-m-text-font-family,var(--spectrum-alias-body-text-font-family))}.spectrum-Body .spectrum-Body-strong,.spectrum-Body strong{font-weight:var(--spectrum-body-m-strong-text-font-weight,var(--spectrum-global-font-weight-bold))}.spectrum-Body .spectrum-Body-emphasis,.spectrum-Body em{font-style:var(--spectrum-body-m-emphasis-text-font-style,var(--spectrum-global-font-style-italic))}.spectrum-Body--serif{font-family:var(--spectrum-body-serif-m-text-font-family,var(--spectrum-alias-serif-text-font-family))}.spectrum-Body--sizeXXXL{color:var(--spectrum-body-xxxl-text-color,var(--spectrum-alias-text-color))}.spectrum-Body--sizeXXL{color:var(--spectrum-body-xxl-text-color,var(--spectrum-alias-text-color))}.spectrum-Body--sizeXL{color:var(--spectrum-body-xl-text-color,var(--spectrum-alias-text-color))}.spectrum-Body--sizeL{color:var(--spectrum-body-l-text-color,var(--spectrum-alias-text-color))}.spectrum-Body--sizeM{color:var(--spectrum-body-m-text-color,var(--spectrum-alias-text-color))}.spectrum-Body--sizeS{color:var(--spectrum-body-s-text-color,var(--spectrum-alias-text-color))}.spectrum-Body--sizeXS{color:var(--spectrum-body-xs-text-color,var(--spectrum-alias-text-color))}.spectrum-Body{color:var(--spectrum-body-m-text-color,var(--spectrum-alias-text-color))}
`;

/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
var bodyStyles = [styles$6, styles$7, styles$9];

/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
/**
 * @slot - The SVG that represents the illustration
 */

class IllustratedMessage extends SpectrumElement {
  constructor() {
    super(...arguments);
    this.heading = '';
    this.description = '';
  }

  static get styles() {
    return [headingStyles, bodyStyles, styles$5];
  }

  render() {
    return html`
            <div id="illustration"><slot></slot></div>
            <h2
                id="heading"
                class="spectrum-Heading spectrum-Heading--sizeL spectrum-Heading--light"
            >
                <slot name="heading">${this.heading}</slot>
            </h2>
            <div id="description" class="spectrum-Body spectrum-Body--sizeS">
                <slot name="description">${this.description}</slot>
            </div>
        `;
  }

}
IllustratedMessage.is = 'sp-illustrated-message';

__decorate([property()], IllustratedMessage.prototype, "heading", void 0);

__decorate([property()], IllustratedMessage.prototype, "description", void 0);

class SkhemataFormDropzone extends SkhemataFormInput {
  constructor(...args) {
    super(...args);

    _defineProperty$1(this, "dropzone", void 0);

    _defineProperty$1(this, "fileInput", void 0);

    _defineProperty$1(this, "helpMessage", 'Drag and Drop, or Click to Upload Your File');

    _defineProperty$1(this, "handleClick", () => {
      this.fileInput.click();
    });
  }

  static get scopedElements() {
    return {
      'sp-dropzone': Dropzone,
      'sp-message': IllustratedMessage
    };
  }

  static get styles() {
    return [...super.styles, i`
        button.dropzone {
          cursor: pointer;
          border: none;
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          border-radius: 4px;
          background: transparent;
        }
        .message {
          width: max-content;
        }
        #dropzone {
          border: none;
        }
        img {
          max-height: 15rem;
        }
        #sp-message {
          padding: 1rem;
        }
        .description {
          margin-bottom: 1rem;
        }
      `];
  }

  async firstUpdated() {
    this.fileInput = this.shadowRoot?.getElementById('file-input');
  }

  handleFileUpload(e) {
    if (e.detail?.dataTransfer?.files) {
      [this.value] = e.detail.dataTransfer.files;
    } else {
      [this.value] = this.fileInput.files;
    }
  }

  render() {
    const field = T`
      <div>
        ${this.label && !this.horizontal ? T`<label class="label">${this.label}</label>` : null}
        <div>
          ${this.description && !this.horizontal ? T`<p class="description">${this.description}</p>` : null}
          <div class="message">
            ${this.value ? T`
                  <div class="message-header">
                    ${this.value.name}
                    <button
                      class="delete"
                      @click=${() => {
      this.value = null;
    }}
                    ></button>
                  </div>
                ` : null}
            <button class="dropzone" @click=${this.handleClick}>
              <sp-dropzone
                id="dropzone"
                tabindex="0"
                @sp-dropzone-drop=${this.handleFileUpload}
              >
                ${this.value ? T`<img
                      src=${URL.createObjectURL(this.value)}
                      alt=${this.name}
                    />` : T`
                      <sp-message id="sp-message" heading=${this.helpMessage}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 150 103"
                          width="150"
                          height="103"
                        >
                          <path
                            d="M133.7,8.5h-118c-1.9,0-3.5,1.6-3.5,3.5v27c0,0.8,0.7,1.5,1.5,1.5s1.5-0.7,1.5-1.5V23.5h119V92c0,0.3-0.2,0.5-0.5,0.5h-118c-0.3,0-0.5-0.2-0.5-0.5V69c0-0.8-0.7-1.5-1.5-1.5s-1.5,0.7-1.5,1.5v23c0,1.9,1.6,3.5,3.5,3.5h118c1.9,0,3.5-1.6,3.5-3.5V12C137.2,10.1,135.6,8.5,133.7,8.5z M15.2,21.5V12c0-0.3,0.2-0.5,0.5-0.5h118c0.3,0,0.5,0.2,0.5,0.5v9.5H15.2z M32.6,16.5c0,0.6-0.4,1-1,1h-10c-0.6,0-1-0.4-1-1s0.4-1,1-1h10C32.2,15.5,32.6,15.9,32.6,16.5z M13.6,56.1l-8.6,8.5C4.8,65,4.4,65.1,4,65.1c-0.4,0-0.8-0.1-1.1-0.4c-0.6-0.6-0.6-1.5,0-2.1l8.6-8.5l-8.6-8.5c-0.6-0.6-0.6-1.5,0-2.1c0.6-0.6,1.5-0.6,2.1,0l8.6,8.5l8.6-8.5c0.6-0.6,1.5-0.6,2.1,0c0.6,0.6,0.6,1.5,0,2.1L15.8,54l8.6,8.5c0.6,0.6,0.6,1.5,0,2.1c-0.3,0.3-0.7,0.4-1.1,0.4c-0.4,0-0.8-0.1-1.1-0.4L13.6,56.1z"
                          ></path>
                        </svg>
                      </sp-message>
                    `}
                <input
                  type="file"
                  id="file-input"
                  style="display: none"
                  @change=${this.handleFileUpload}
                />
              </sp-dropzone>
            </button>
          </div>
        </div>
        ${!this.valid ? T`<p class="help ${this.helpClass}">${this.errorMessage}</p>` : ``}
      </div>
    `;
    const horizontalFieldLabel = T`
      <div class="field-label column is-one-quarter" style="text-align: left">
        ${this.label ? T`<label class="label">${this.label}</label>` : null}
        ${this.description ? T`<p>${this.description}</p>` : null}
      </div>
    `;
    const horizontalField = T`
      <div class="field is-horizontal">
        ${this.label || this.description ? horizontalFieldLabel : null}
        <div class="field-body column">${field}</div>
      </div>
    `;
    return this.horizontal ? horizontalField : field;
  }

}

__decorate([e$3({
  type: Object,
  attribute: false
})], SkhemataFormDropzone.prototype, "dropzone", void 0);

__decorate([e$3({
  type: HTMLElement
})], SkhemataFormDropzone.prototype, "fileInput", void 0);

__decorate([e$3({
  type: String
})], SkhemataFormDropzone.prototype, "helpMessage", void 0);

class SkhemataFormQuill extends SkhemataFormInput {
  constructor(...args) {
    super(...args);

    _defineProperty$1(this, "dropzone", void 0);

    _defineProperty$1(this, "editor", void 0);

    _defineProperty$1(this, "helpMessage", 'Drag and Drop, or Click to Upload Your File');
  }

  static get styles() {
    return [...super.styles, i`
        button.dropzone {
          cursor: pointer;
          border: none;
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          border-radius: 4px;
          background: transparent;
        }
        .message {
          width: max-content;
        }
        #dropzone {
          border: none;
        }
        img {
          max-height: 15rem;
        }
        #sp-message {
          padding: 1rem;
        }
        .description {
          margin-bottom: 1rem;
        }
      `];
  }

  static get scopedElements() {
    return {//  'sk-quill': SkhemataEditorQuill,
    };
  }

  async firstUpdated() {
    this.editor = this?.shadowRoot?.getElementById('editor');
    this.editor.updateComplete.then(() => {
      this.initQuill();
    });
  }

  initQuill() {
    const delta = JSON.parse(this.value)?.ops;
    this.editor.setContents(delta);
    this.editor.quill.on('text-change', () => {
      this.value = JSON.stringify(this.editor.quill.getContents());
    });
  }

  render() {
    const field = T`
      <div class="field">
        ${this.label && !this.horizontal ? T`<label class="label">${this.label}</label>` : null}
        <div class="control ${this.valid ? '' : 'has-icons-right'}">
          ${this.description && !this.horizontal ? T`<p>${this.description}</p>` : null}
          <sk-quill id="editor"></sk-quill>
          ${!this.valid ? T` <span class="icon is-small is-right">
                ${this.faTriangle}
              </span>` : null}
        </div>
        ${!this.valid ? T`<p class="help ${this.helpClass}">${this.errorMessage}</p>` : ``}
      </div>
    `;
    const horizontalFieldLabel = T`
      <div class="field-label column is-one-quarter" style="text-align: left">
        ${this.label ? T`<label class="label">${this.label}</label>` : null}
        ${this.description ? T`<p>${this.description}</p>` : null}
      </div>
    `;
    const horizontalField = T`
      <div class="field is-horizontal">
        ${this.label || this.description ? horizontalFieldLabel : null}
        <div class="field-body column">${field}</div>
      </div>
    `;
    return this.horizontal ? horizontalField : field;
  }

}

__decorate([e$3({
  type: Object,
  attribute: false
})], SkhemataFormQuill.prototype, "dropzone", void 0);

__decorate([e$3({
  type: HTMLElement
})], SkhemataFormQuill.prototype, "editor", void 0);

__decorate([e$3({
  type: String
})], SkhemataFormQuill.prototype, "helpMessage", void 0);

class SkhemataFormButton extends SkhemataBase {
  constructor(...args) {
    super(...args);

    _defineProperty$1(this, "title", '');

    _defineProperty$1(this, "color", '');

    _defineProperty$1(this, "type", '');

    _defineProperty$1(this, "valid", true);

    _defineProperty$1(this, "helpClass", '');
  }

  static get stlyes() {
    return [...super.styles, i`
        .field {
          margin-bottom: 1rem;
          display: block;
        },
      `];
  }

  handleClick() {
    if (this.type === 'submit') {
      this.dispatchEvent(new CustomEvent('submit'));
    } else {
      this.dispatchEvent(new Event('click'));
    }
  }

  render() {
    return T`
      <button
        class="button is-fullwidth is-primary"
        style=${this.color ? `background-color: ${this.color}` : ''}
        @click=${this.handleClick}
      >
        ${this.title}
      </button>
    `;
  }

}

__decorate([e$3({
  type: String
})], SkhemataFormButton.prototype, "title", void 0);

__decorate([e$3({
  type: String
})], SkhemataFormButton.prototype, "color", void 0);

__decorate([e$3({
  type: String
})], SkhemataFormButton.prototype, "type", void 0);

__decorate([e$3({
  type: Boolean
})], SkhemataFormButton.prototype, "valid", void 0);

__decorate([e$3({
  type: String
})], SkhemataFormButton.prototype, "helpClass", void 0);

class SkhemataFormAutocomplete extends SkhemataFormInput {
  constructor(...args) {
    super(...args);

    _defineProperty$1(this, "horizontal", false);

    _defineProperty$1(this, "description", '');

    _defineProperty$1(this, "selected", '');

    _defineProperty$1(this, "mapValue", '');

    _defineProperty$1(this, "mapLabel", '');

    _defineProperty$1(this, "search", '');

    _defineProperty$1(this, "results", []);

    _defineProperty$1(this, "label", '');

    _defineProperty$1(this, "menuOpen", false);

    _defineProperty$1(this, "required", false);

    _defineProperty$1(this, "name", 'name');

    _defineProperty$1(this, "placeholder", 'Select One');

    _defineProperty$1(this, "errorMessage", 'Select one');

    _defineProperty$1(this, "submitOnSelect", false);

    _defineProperty$1(this, "valid", true);

    _defineProperty$1(this, "helpClass", '');

    _defineProperty$1(this, "_active", 0);
  }

  static get styles() {
    return [...super.styles, i`
        .field {
          margin-bottom: 1rem;
        }
        option {
          text-align: left;
          padding: 0.5rem 0rem 0.5rem 1rem;
          white-space: nowrap;
        }
        option:hover {
          background-color: whitesmoke;
          color: rgb(10, 10, 10);
          cursor: pointer;
        }
        option.is-active {
          background-color: rgb(50, 115, 220);
          color: rgb(255, 255, 255);
        }
        .results.dropdown-content {
          max-height: 15em;
          overflow-y: auto;
        }
        .dropdown,
        .dropdown-trigger,
        .dropdown button {
          width: 100%;
        }
        .dropdown button span {
          margin-right: auto;
        }
        .dropdown .button {
          color: #d0d0d0;
        }
        #dropdown-menu {
          width: 100%;
          padding-top: 0px;
        }
        #dropdown-menu .dropdown-content {
          padding: 0;
        }
        #dropdown-menu .dropdown-content .dropdown-item {
          padding: 5px;
        }
      `];
  }

  static get scopedElements() {
    return {
      'fa-icon': D
    };
  }

  get active() {
    return this._active;
  }

  set active(value) {
    const oldValue = this._active;
    this._active = value;
    this.requestUpdate('active', oldValue);
    this.shadowRoot?.querySelector('.dropdown-item.is-active')?.scrollIntoView({
      block: 'center',
      behavior: 'smooth'
    });
  }

  reset() {
    this.clearError();
    this.value = '';
    this.selected = '';
    this.results = [];
  }

  validate() {
    this.helpClass = '';

    if (this.required && this.value.length < 1) {
      this.valid = false;
      this.helpClass = 'is-danger';
    }

    this.dispatchEvent(new CustomEvent('is-valid', {
      detail: {
        valid: this.valid
      },
      bubbles: true,
      composed: true
    }));
  }

  clearError() {
    this.helpClass = '';
    this.valid = true;
  }

  handleKeydown(event) {
    if (event.target.value.length < 2) {
      this.reset();
    } else {
      switch (event.keyCode) {
        case 13:
          this.value = this.results[this.active].value;
          this.selected = this.results[this.active].label;
          this.menuOpen = false;
          break;

        case 40:
          this.active = this.active < this.results.length - 1 ? this.active + 1 : this.active;
          break;

        case 38:
          this.active = this.active > 0 ? this.active - 1 : this.active;
          break;

        default:
          this.active = 0;
      }
    }
  }

  handleInput(event) {
    this.clearError();
    this.setAttribute('search', event.target.value);

    if (this.search.length > 2) {
      this.getResults();
    }
  }

  handleSelectValue(selected, value) {
    this.clearError();
    this.selected = selected;
    this.value = value;
    this.menuOpen = false;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    this.requestUpdate();
  }

  handleFocusOut() {
    this.toggleMenu();
    this.results = [];

    if (!this.selected) {
      this.search = '';
    }
  }

  getResults() {
    if (this.api?.url) {
      fetch(`${this.api.url}/locale/city/${this.search}`).then(data => data.json()).then(results => {
        const mapped = this.mapLabel && this.mapValue ? results.map(result => ({
          value: result[this.mapValue],
          label: result[this.mapLabel]
        })) : results;
        this.results = mapped;
        this.requestUpdate();
      });
    }
  }

  async firstUpdated() {// document.addEventListener('click', e=>this.clickOffDropdown(e));
  }

  render() {
    const field = T`
      <div class="field">
        ${this.label && !this.horizontal ? T`<label class="label">${this.label}</label>` : null}
        <div class="control ${this.valid ? '' : 'has-icons-right'}">
          ${this.description && !this.horizontal ? T`<p>${this.description}</p>` : null}
          <div class="dropdown ${this.menuOpen ? 'is-active' : ''}">
            <div class="dropdown-trigger">
              <button
                class="button"
                aria-haspopup="true"
                aria-controls="dropdown-menu"
                @click=${this.toggleMenu}
                @keydown=${event => {
      if (event.keyCode === '13') this.toggleMenu();
    }}
              >
                <span>${this.selected || this.placeholder}</span>
                <span class="icon is-small">
                  <fa-icon .icon=${faAngleDown}></fa-icon>
                </span>
              </button>
            </div>
            <div class="dropdown-menu" id="dropdown-menu" role="menu">
              <div class="dropdown-content">
                <div class="dropdown-item">
                  <div class="control has-icons-right">
                    <input
                      class="input ${this.valid ? `` : `is-danger`}"
                      name="${this.name}"
                      type="text"
                      placeholder=""
                      @input=${this.handleInput}
                      @keydown=${this.handleKeydown}
                      .value=${this.search}
                    />
                    <span class="icon is-small is-right">
                      <fa-icon .icon=${faSearch}></fa-icon>
                    </span>
                  </div>
                </div>
              </div>
              <div class="dropdown-content results">
                ${this.results.map((result, index) => T`
                      <option
                        class="dropdown-item ${index === this.active ? 'is-active' : ''}"
                        value=${result.value}
                        @click=${() => this.handleSelectValue(result.label, result.value)}
                        @keydown=${e => {
      if (e.keyCode === '13') this.handleSelectValue(result.label, result.value);
    }}
                      >
                        ${result.label}
                      </option>
                    `)}
              </div>
            </div>
          </div>
        </div>
        ${!this.valid ? T`<p class="help ${this.helpClass}">${this.errorMessage}</p>` : ``}
      </div>
    `;
    const horizontalFieldLabel = T`
      <div class="field-label column is-one-quarter" style="text-align: left">
        ${this.label ? T`<label class="label">${this.label}</label>` : null}
        ${this.description ? T`<p>${this.description}</p>` : null}
      </div>
    `;
    const horizontalField = T`
      <div class="field is-horizontal">
        ${this.label || this.description ? horizontalFieldLabel : null}
        <div class="field-body column">${field}</div>
      </div>
    `;
    return this.horizontal ? horizontalField : field;
  }

}

__decorate([e$3({
  type: Boolean
})], SkhemataFormAutocomplete.prototype, "horizontal", void 0);

__decorate([e$3({
  type: String
})], SkhemataFormAutocomplete.prototype, "description", void 0);

__decorate([e$3({
  type: String
})], SkhemataFormAutocomplete.prototype, "selected", void 0);

__decorate([e$3({
  type: String
})], SkhemataFormAutocomplete.prototype, "mapValue", void 0);

__decorate([e$3({
  type: String
})], SkhemataFormAutocomplete.prototype, "mapLabel", void 0);

__decorate([e$3({
  type: String
})], SkhemataFormAutocomplete.prototype, "search", void 0);

__decorate([e$3({
  type: Array
})], SkhemataFormAutocomplete.prototype, "results", void 0);

__decorate([e$3({
  type: String
})], SkhemataFormAutocomplete.prototype, "label", void 0);

__decorate([e$3({
  type: Boolean
})], SkhemataFormAutocomplete.prototype, "menuOpen", void 0);

__decorate([e$3({
  type: Boolean
})], SkhemataFormAutocomplete.prototype, "required", void 0);

__decorate([e$3({
  type: String
})], SkhemataFormAutocomplete.prototype, "name", void 0);

__decorate([e$3({
  type: String
})], SkhemataFormAutocomplete.prototype, "placeholder", void 0);

__decorate([e$3({
  type: String
})], SkhemataFormAutocomplete.prototype, "errorMessage", void 0);

__decorate([e$3({
  type: Boolean
})], SkhemataFormAutocomplete.prototype, "submitOnSelect", void 0);

__decorate([e$3({
  type: Boolean
})], SkhemataFormAutocomplete.prototype, "valid", void 0);

__decorate([e$3({
  type: String
})], SkhemataFormAutocomplete.prototype, "helpClass", void 0);

__decorate([e$3({
  type: Boolean,
  reflect: true
})], SkhemataFormAutocomplete.prototype, "active", null);

/**
 *
 * Lit Faq Post Styles
 *
 */
const SkhemataFaqSearchStyles = i`
  :host {
    --default-text-color: #5c6265;
    --light-grey-color: #969ea2;
    --lighter-grey-color: #dce3e6;
  }

  .search-control {
    position: relative;
  }

  fa-icon {
    width: 30px;
    display: inline-block;
    position: absolute;
    top: 15px;
    right: 20px;
    pointer-events: none;
  }

  fa-icon::slotted(*){
    color: rgba(10, 10, 10, 0.05);
  }

  #search-input {
    padding-right: 60px;
  }
`;

const translationEngDefault = {
  SkhemataFaqSearch: {
    "searchPlaceholder": "Enter Search Keyword..."
  }
};

/**
 *
 * Lit Faq Search Element
 *
 * */
class SkhemataFaqSearch extends SkhemataBase {
  constructor() {
    // Always call super() first
    super(); // Property decorator (requires TypeScript or Babel)
    // Attributes that can be passed into different elements

    this.faqSiteHost = '';
    this.faqPagePath = '';
    this.translationData = {
      eng: translationEngDefault
    };
    this.searchTerm = '';
    const params = new URLSearchParams(window.location.search);
    this.searchTerm = params.get('s');
    window.addEventListener('clearfaqsearch', () => {
      this.searchTerm = '';
      this.requestUpdate();
    });
  }

  static get scopedElements() {
    return {
      'sk-form-textbox': SkhemataFormTextbox
    };
  }

  static get styles() {
    return [...super.styles, SkhemataFaqSearchStyles];
  }
  /**
   * Implement `render` to define a template for your element.
   * Use JS template literals
   */


  render() {
    return T`
      <sk-form-textbox
        id="search-input"
        .value=${this.searchTerm || ''}
        type="search"
        placeholder="${this.getStr("SkhemataFaqSearch.searchPlaceholder")}"
        @keyup=${this.onSearch}
      ></sk-form-textbox>
    `;
  }
  /**
   *  Search posts when value is entered
   */


  onSearch(event) {
    const params = new URLSearchParams(window.location.search);
    params.set('s', event.target.value);
    this.searchTerm = event.target.value;
    window.history.pushState({}, '', `/${this.faqPagePath}?${params.toString()}`);
    window.dispatchEvent(new Event('popstate'));
  }

}

__decorate([e$3({
  type: String,
  attribute: 'faq-site-host'
})], SkhemataFaqSearch.prototype, "faqSiteHost", void 0);

__decorate([e$3({
  type: String,
  attribute: 'faq-page-path'
})], SkhemataFaqSearch.prototype, "faqPagePath", void 0);

__decorate([e$3({
  type: Object
})], SkhemataFaqSearch.prototype, "translationData", void 0);

__decorate([e$3({
  type: String
})], SkhemataFaqSearch.prototype, "searchTerm", void 0);

const decodeHtmlEntities = encodedString => {
  const translateRe = /&(nbsp|amp|quot|lt|gt);/g;
  const translate = {
    nbsp: ' ',
    amp: '&',
    quot: '"',
    lt: '<',
    gt: '>'
  };
  return encodedString.replace(translateRe, (_match, entity) => translate[entity]).replace(/&#(\d+);/gi, (_match, numStr) => {
    const num = parseInt(numStr, 10);
    return String.fromCharCode(num);
  });
};

const translationEngDefault$1 = {
  SkhemataFaqList: {
    "showMoreButton": "Show More..."
  }
};

/**
 *
 * Lit Faq List Styles
 *
 * */
const SkhemataFaqListStyles = i`
  :host {
    --default-text-color: #5c6265;
    --light-grey-color: #969ea2;
    --lighter-grey-color: #dce3e6;

    color: var(--default-text-color);
  }

  .faq-list button {
    padding: 1rem 1.3rem;
    height: auto;
    min-height: 2.5em;
    line-height: 1;
    text-align: left;
    justify-content: space-between;
  }

  .faq-entry {
    border-radius: 4px;
    border: 1px solid #dbdbdb;
    padding: 1rem 1rem 1rem 1rem;
    margin-bottom: 1rem;
    margin-top: 0;
    cursor: pointer;
  }

  .article-date {
    margin-bottom: 1rem;
    font-size: 14px;
  }

  .faq-list button span {
    white-space: normal;
  }

  button.faq-item {
    box-shadow: 0 0 0 1px var(--lighter-grey-color);
    margin-bottom: 50px;
    border-radius: 4px;
    width: 100%;
    padding: 2rem;
  }

  .faq-item .card-content {
    padding: 60px;
  }

  .faq-author-info {
    margin-top: -80px;
    margin-bottom: 30px;
  }

  button.faq-title.is-ghost {
    text-decoration: none;
    margin-bottom: 10px;
    border: none;
  }

  button.faq-title.is-ghost:active {
    border: none;
  }

  .faq-entry > a {
    color: var(--skhemata-faq-list-title-color, rgb(50, 149, 220));
  }

  .faq-entry > a:hover {
    color: var(--skhemata-faq-list-title-color, rgb(50, 149, 220));
    opacity: 60%;
  }

  .faq-title .title {
    transition: all 0.3s ease 0s;
    color: rgb(50, 149, 220);
  }

  .faq-title .title:hover {
    color: rgb(28, 119, 185);
  }

  .faq-author-info .image {
    display: inline-block;
  }

  .faq-post-date {
    margin: 6px 0;
  }

  .faq-excerpt {
    margin-top: 15px;
  }

  .load-more-button {
    text-align: center;
  }

  .load-more-button .button {
    padding: 8px 28px;
  }
`;

/**
 *
 * Lit Faq Post Styles
 *
 */
const SkhemataFaqSharedStyles = i`
  :host {
    display: block;

    --default-text-color: var(--skhemata-faq-text-color, #5c6365);
    --light-grey-color: #969ea2;
    --lighter-grey-color: #dce3e6;

    color: var(--default-text-color);
  }

  *,
  *::before,
  *::after {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  html,
  body,
  p,
  ol,
  ul,
  li,
  dl,
  dt,
  dd,
  blockquote,
  figure,
  fieldset,
  legend,
  textarea,
  pre,
  iframe,
  hr,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  strong,
  em {
    color: var(--default-text-color);
  }

  h3.title {
    color: var(--skhemata-faq-post-heading-color);
  }

  a {
    color: #3295dc;
    -webkit-transition: all 0.3s;
    -o-transition: all 0.3s;
    transition: all 0.3s;
  }

  a:hover {
    color: #1c77b9;
  }

  .card {
    color: var(--default-text-color);
  }

  .faq-category-item {
    display: inline;
    color: rgb(50, 149, 220);
    transition: all 0.3s ease 0s;
    cursor: pointer;
  }

  .faq-category-item:hover {
    color: rgb(28, 119, 185);
  }

  .faq-tags > a {
    color: var(--skhemata-faq-link-color, rgb(50, 149, 220));
  }

  p {
    margin: 0 0 1em;
  }

  pre {
    margin: 0 0 1em;
  }
`;

/**
 *
 * Lit Faq List Element
 *
 */
class SkhemataFaqList extends SkhemataBase {
  constructor() {
    // Always call super() first
    super();
    this.apiWordpress = {
      url: ''
    };
    this.postsPerPage = 20;
    this.pagerType = "infinite";
    this.currentPage = 1;
    this.faqPagePath = '';
    this.faqPosts = [];
    this.totalPages = 0;
    this.totalCount = 0;
    this.maxLoadCount = 0;
    this.count = 1;
    this.translationData = {
      eng: translationEngDefault$1
    };

    this.formatDate = date => {
      const dateObj = new Date(date);
      const month = new Intl.DateTimeFormat('en-US', {
        month: 'short'
      }).format(dateObj);
      return `${month} ${dateObj.getDate()} ${dateObj.getFullYear()}`;
    };

    window.addEventListener('popstate', () => {
      if (this.pagerType === "traditional") {
        this.loadPostPage();
      } else {
        this.getPosts();
      }
    }, false);
  }

  static get styles() {
    return [...super.styles, SkhemataFaqListStyles, SkhemataFaqSharedStyles, i`
        .traditional-pager {
          text-align: center;
        }
      `];
  }

  static get scopedElements() {
    return {
      'fa-icon': D
    };
  }

  willUpdate(changedProperties) {
    if (changedProperties.has('apiWordpress')) {
      this.getPosts();
    }

    if (changedProperties.has('postsPerPage')) {
      this.getPosts();
    }

    if (changedProperties.has('pagerType')) {
      this.getPosts();
    }

    super.willUpdate(changedProperties);
  }
  /**
   * Implement `render` to define a template for your element.
   * Use JS template literals
   */


  render() {
    let previous = T``;
    let next = T``;
    let previousPages = T``;
    let nextPages = T``;
    let count = 1;
    const params = new URLSearchParams(window.location.search);
    let page = 1;
    const leadingTrailingCount = 3;
    const pParam = params.get('p');
    const pageParam = parseInt(pParam, 10);

    if (pageParam != null && !Number.isNaN(pageParam)) {
      page = pageParam;
    }

    previous = T`<button @click="${() => this.setPageNumber(1)}" class="button" > First </button>
    <button @click="${() => this.setPageNumber(page - 1)}" class="button" > Previous </button>`;

    if (page <= 1) {
      previous = T``;
    }

    next = T`<button @click="${() => this.setPageNumber(page + 1)}" class="button" > Next </button>
    <button @click="${() => this.setPageNumber(this.totalPages)}" class="button" > Last </button>`;

    if (page >= this.totalPages) {
      next = T``;
    }

    for (let index = page; index > 1; index -= 1) {
      if (count > leadingTrailingCount) {
        break;
      }

      previousPages = T`<button @click="${event => this.goToButtonPage(event)}" page-value="${page - count}"  class="button" >${page - count}</button>${previousPages}`;
      count += 1;
    }

    count = 1;

    for (let index = page; index < this.totalPages; index += 1) {
      if (count > leadingTrailingCount) {
        break;
      }

      nextPages = T`${nextPages}<button @click="${event => this.goToButtonPage(event)}" page-value="${page + count}" class="button" >${page + count}</button>`;
      count += 1;
    }

    let pagination = T``;

    if (this.totalPages > 1) {
      pagination = T`
      <div class="traditional-pager">
        ${previous}${previousPages}<button @click="" class="button" ><b>${page}</b></button>${nextPages}${next}
      </div>`;
    }

    return T`
      <div class="faq-list block">
        ${this.faqPosts.map(faq => T`
            <div class="faq-entry"  @click=${() => {
      this.navigateToPost(faq.slug);
    }}>
                <div class="article-date">
                  <fa-icon .icon=${faCalendarAlt}></fa-icon> ${this.formatDate(faq.date)}
                </div>
                <a class="is-size-4 has-text-weight-bold" @click=${() => {
      this.navigateToPost(faq.slug);
    }}>
                  ${decodeHtmlEntities(faq.title.rendered)}
                </a>
            </div>
          `)}
      </div>

      ${this.pagerType === "traditional" ? pagination : T`<div class="load-more-button block">
        ${this.count < this.maxLoadCount ? T`<button @click="${this.loadMorePosts}" class="button">${this.getStr('SkhemataFaqList.showMoreButton')}</button>` : ``}
        </div>`}
    `;
  }

  navigateToPost(slug) {
    this.dispatchEvent(new CustomEvent('navigate', {
      detail: {
        slug
      },
      composed: true,
      bubbles: true
    }));
    window.dispatchEvent(new CustomEvent('clearfaqsearch'));
  }
  /**
   * Implement firstUpdated to perform one-time work after
   * the element’s template has been created.
   */


  async firstUpdated() {
    await super.firstUpdated();
    this.getPosts();
  }
  /**
   * Fetch Posts from WP REST API
   */


  getPosts() {
    // Use fetch method to make a request
    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    const params = new URLSearchParams(window.location.search);
    const search = params.get('s');
    const category = params.get('c');
    let searchParams = '';
    let categoryParams = '';
    const orderbyParam = `&orderby=relevance`;

    if (search && search.length > 3) {
      searchParams = `&search=${search}${orderbyParam}`;
    }

    if (category) {
      categoryParams = `&ufaq-category=${category}`;
    }

    fetch(`${this.apiWordpress.url}/ufaq?${searchParams}${categoryParams}&per_page=${this.postsPerPage}`).then(response => {
      this.totalPages = Number(response.headers.get('X-WP-TotalPages'));
      this.totalCount = Number(response.headers.get('X-WP-Total'));
      const contentType = response.headers.get('Content-Type');
      this.maxLoadCount = Math.ceil(this.totalCount / 10); // Check if response header content type is json

      if (contentType && contentType.includes('application/json')) {
        return response.json();
      } // Throw error if above condition isn't met


      throw new TypeError('The format is not JSON.');
    }).then(data => {
      if (typeof data !== 'undefined') {
        // Loop through data
        // data.forEach((element: any) => {
        //   // this.formatCategories(element);
        // });
        this.faqPosts = data;
      }
    });
  }
  /**
   * Load more posts event handler
   */


  loadMorePosts() {
    this.count += 1;
    const params = new URLSearchParams(window.location.search);
    const search = params.get('s');
    const category = params.get('c');
    let searchParams = '';
    let categoryParams = '';
    const orderbyParam = `&orderby=relevance`;

    if (search && search.length > 3) {
      searchParams = `&search=${search}${orderbyParam}`;
    }

    if (category) {
      categoryParams = `&ufaq-category=${category}`;
    }

    fetch(`${this.apiWordpress.url}/ufaq?page=${this.count}${searchParams}${categoryParams}&per_page=${this.postsPerPage}`).then(response => response.json()).then(posts => {
      for (const post of posts) {
        // this.formatCategories(posts[index]);
        // Use spread operator for dynamic re-rendering on template
        this.faqPosts = [...this.faqPosts, post];
      }
    });
  }

  goToButtonPage(event) {
    let page = 1;
    const buttonValue = event.target.attributes["page-value"].value;

    if (buttonValue != null) {
      page = parseInt(buttonValue, 10);
    }

    this.setPageNumber(page);
  }

  setPageNumber(page) {
    let setPage = page;

    if (setPage < 1) {
      setPage = 1;
    }

    if (setPage > this.totalPages) {
      setPage = this.totalPages;
    }

    const params = new URLSearchParams(window.location.search);
    params.set('p', setPage);
    this.currentPage = setPage;
    window.history.pushState({}, '', `/${this.faqPagePath}?${params.toString()}`);
    window.dispatchEvent(new Event('popstate'));
  }

  loadPostPage() {
    const params = new URLSearchParams(window.location.search);
    const page = params.get('p');
    const search = params.get('s');
    const category = params.get('c');
    let searchParams = '';
    let categoryParams = '';
    const orderbyParam = `&orderby=relevance`;

    if (search && search.length > 3) {
      searchParams = `&search=${search}${orderbyParam}`;
    }

    if (category) {
      categoryParams = `&ufaq-category=${category}`;
    }

    fetch(`${this.apiWordpress.url}/ufaq?page=${page}${searchParams}${categoryParams}&per_page=${this.postsPerPage}`).then(response => {
      if (response.status === 200) {
        this.totalPages = Number(response.headers.get('X-WP-TotalPages'));
        this.totalCount = Number(response.headers.get('X-WP-Total'));
        const contentType = response.headers.get('Content-Type');
        this.maxLoadCount = Math.ceil(this.totalCount / 10); // Check if response header content type is json

        if (contentType && contentType.includes('application/json')) {
          return response.json();
        } // Throw error if above condition isn't met


        throw new TypeError('The format is not JSON.');
      } else {
        return response.json();
      }
    }).then(response => {
      // Set page to 1 if invalid page number.
      if (response.code && response.code === "rest_post_invalid_page_number") {
        this.setPageNumber(1);
      } else if (!response.code && typeof response !== 'undefined') {
        this.faqPosts = response;
      }
    });
  }

}

__decorate([e$3({
  type: Object,
  attribute: 'api-wordpress'
})], SkhemataFaqList.prototype, "apiWordpress", void 0);

__decorate([e$3({
  type: Number,
  attribute: 'posts-per-page'
})], SkhemataFaqList.prototype, "postsPerPage", void 0);

__decorate([e$3({
  type: String,
  attribute: 'pager-type'
})], SkhemataFaqList.prototype, "pagerType", void 0);

__decorate([e$3({
  type: Number
})], SkhemataFaqList.prototype, "currentPage", void 0);

__decorate([e$3({
  type: String,
  attribute: 'faq-page-path'
})], SkhemataFaqList.prototype, "faqPagePath", void 0);

__decorate([e$3({
  type: Array
})], SkhemataFaqList.prototype, "faqPosts", void 0);

__decorate([e$3({
  type: Number
})], SkhemataFaqList.prototype, "totalPages", void 0);

__decorate([e$3({
  type: Number
})], SkhemataFaqList.prototype, "totalCount", void 0);

__decorate([e$3({
  type: Number
})], SkhemataFaqList.prototype, "maxLoadCount", void 0);

__decorate([e$3({
  type: Number
})], SkhemataFaqList.prototype, "count", void 0);

__decorate([e$3({
  type: Object
})], SkhemataFaqList.prototype, "translationData", void 0);

/**
 *
 * Lit Blog Post Styles
 *
 */
const SkhemataFaqPostStyles = i`
  :host {
    --default-text-color: #5c6265;
    --light-grey-color: #969ea2;
    --lighter-grey-color: #dce3e6;
    background-color: #ffffff;
    border: 1px solid var(--lighter-grey-color);
    border-radius: 4px;
    padding: 1rem 30px 30px 30px;
    margin-top: 3rem;
  }

  button.back-button.is-link.is-rounded {
    background-color: var(--skhemata-faq-post-back-button-background-color, rgb(50, 115, 220));
    color: var(--skhemata-faq-post-back-button-color, white);
  }


  .faq-info {
    margin-bottom: 2rem;
    margin-top: -3rem;
    text-align: left;
    font-size: 14px;
  }

  .faq-user {
    margin-bottom: 7px;
  }

  .faq-author-avatar {
    margin-bottom: 1.5rem;
  }

  .faq-tags {
    font-size: 14px;
  }
  .answer figure,
  .answer img {
    max-width: 95%;
  }


  .answer.content {
    overflow: hidden;
    word-wrap: break-word;
  }
  
  `;

/**
 *
 * Use createContextualFragment to return the string to html
 *
 */
const stringToHtml = string => {
  if (string) {
    const fragmentResult = document.createRange().createContextualFragment(`${string}`);
    return fragmentResult;
  }

  return true;
};

const translationEngDefault$2 = {
  SkhemataFaqPost: {
    "backToFaq": "Back to FAQ",
    "tags": "Tags",
    "categories": "Categories"
  }
};

/**
 *
 * Lit Faq Post Element
 *
 */
class SkhemataFaqPost extends SkhemataBase {
  constructor() {
    super();
    this.apiWordpress = {
      url: ''
    };
    this.faqPagePath = '';
    this.hasFeaturedImage = false; // Component specific properties

    this.slug = '';
    this.translationData = {
      eng: translationEngDefault$2
    };

    this.formatDate = date => {
      const dateObj = new Date(date);
      const month = new Intl.DateTimeFormat('en-US', {
        month: 'short'
      }).format(dateObj);
      return `${month} ${dateObj.getDate()} ${dateObj.getFullYear()}`;
    };

    window.onhashchange = () => {
      this.shadowRoot.getElementById(window.location.hash.slice(1)).scrollIntoView();
    };
  }

  static get styles() {
    return [...super.styles, SkhemataFaqPostStyles, SkhemataFaqSharedStyles];
  }

  static get scopedElements() {
    return {
      'fa-icon': D
    };
  }

  handleGoBack() {
    this.dispatchEvent(new CustomEvent('navigate', {
      detail: {
        slug: ''
      },
      composed: true,
      bubbles: true
    }));
  }
  /**
   * Implement `render` to define a template for your element.
   * Use JS template literals
   */


  render() {
    return this.faqPost ? T`
        <div class="faq-info">
          <figure class="faq-author-avatar image is-64x64">
            <img
              class="is-rounded"
              src="${this.faqPost.author.avatar_urls[96]}"
              alt="avatar"
            />
          </figure>
          <div class="faq-user">By ${this.faqPost.author.name}</div>
          <div><fa-icon .icon=${faCalendarAlt}></fa-icon> ${this.faqPost.date}</div>
        </div>
      <h3 class="title is-4">${decodeHtmlEntities(this.faqPost.title)}</h3>
      <div class="answer is-size-6 content">
        ${this.faqPost.content ? stringToHtml(this.faqPost.content) : null}
      </div>
      <div class="columns">
            <div class="column">
              <button
                class="button back-button is-link is-rounded"
                @click=${this.handleGoBack}
              >
                ${this.getStr('SkhemataFaqPost.backToFaq')}
              </button>
            </div>
          </div>
      <div class="columns">
      ${console.log(this.faqPost.tags)}
        <div class="column faq-tags">
        ${this.faqPost.tags ? T`<fa-icon .icon=${faFolder}></fa-icon> ${this.getStr('SkhemataFaqPost.categories')}: ${this.faqPost.tags[0].map((item, index, arr) => T`
                  <a
                    value=${item.id}
                    @click="${() => {
      this.filterPostsBy(item.id, 't');
    }}"
                    @keydown=${e => {
      if (e.keyCode === '13') this.filterPostsBy(item.id, 't');
    }}
                  >
                    ${item.name}</a>${arr.length > 1 && arr.length - 1 !== index ? T`, ` : T``}
                `)}` : ''}
        </div>
      </div>
    ` : T``;
  }
  /**
   * Implement firstUpdated to perform one-time work after
   * the element’s template has been created.
   */


  async firstUpdated() {
    await super.firstUpdated();
    this.getPost();
  }
  /**
   * Fetch a single post based on post id from WP REST API
   */


  getPost() {
    if (typeof this.slug !== 'undefined') {
      // Use fetch method to make a request
      // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
      fetch(`${this.apiWordpress.url}/ufaq?_embed&slug=${this.slug}`).then(response => {
        const contentType = response.headers.get('Content-Type'); // Check if response header content type is json

        if (contentType && contentType.includes('application/json')) {
          return response.json();
        } // Throw error if above condition isn't met


        throw new TypeError('The format is not JSON.');
      }).then(data => {
        const postData = data[0];

        if (postData && postData.status === 'publish') {
          // Pass data to Object to be used to bind data on the template
          this.faqPost = {
            id: postData.id,
            title: postData.title.rendered,
            content: postData.content.rendered.replaceAll('href="#', `href="${window.location.href}#`),
            excerpt: postData.excerpt.rendered,
            date: this.formatDate(postData.date),
            author: postData._embedded.author[0],
            tags: postData._embedded['wp:term']
          };
          console.log(this.faqPost);
          this.setMetaTags();
        }
      });
    }
  }
  /**
   * Sets the meta tags for the head
   */


  setMetaTags() {
    const metaDesc = document.querySelector("meta[name='description' i]");
    const excerpt = this.faqPost.excerpt.replace(/<[^>]*>?/gm, '');

    if (metaDesc) {
      metaDesc.setAttribute('content', excerpt);
    } else {
      const newMetaDesc = document.createElement('meta');
      newMetaDesc.name = 'description';
      newMetaDesc.content = excerpt;
      document.getElementsByTagName('head')[0].appendChild(newMetaDesc);
    }

    const title = document.querySelector("title");

    if (title) {
      title.innerHTML = this.faqPost.title;
    } else {
      const newTitle = document.createElement('title');
      newTitle.innerHTML = this.faqPost.title;
      document.getElementsByTagName('head')[0].appendChild(newTitle);
    }
  }

  filterPostsBy(id, queryId) {
    const params = new URLSearchParams(window.location.search);

    if (params.get(queryId) === id) {
      params.delete(queryId);
    } else {
      params.set(queryId, id);
    }

    window.history.pushState({}, '', decodeURIComponent(`${this.faqPagePath}?${params.toString()}`));
    window.scrollTo({
      top: 0
    });
    window.dispatchEvent(new Event('popstate'));
  }

}

__decorate([e$3({
  type: Object,
  attribute: 'api-wordpress'
})], SkhemataFaqPost.prototype, "apiWordpress", void 0);

__decorate([e$3({
  type: String,
  attribute: 'faq-page-path'
})], SkhemataFaqPost.prototype, "faqPagePath", void 0);

__decorate([e$3({
  type: Boolean,
  attribute: 'has-featured-image'
})], SkhemataFaqPost.prototype, "hasFeaturedImage", void 0);

__decorate([e$3({
  type: String
})], SkhemataFaqPost.prototype, "slug", void 0);

__decorate([e$3({
  type: Object
})], SkhemataFaqPost.prototype, "faqPost", void 0);

__decorate([e$3({
  type: Object
})], SkhemataFaqPost.prototype, "translationData", void 0);

/**
 *
 * Lit Faq Categories Styles
 *
 */
const SkhemataFaqCategoriesStyles = i`
  :host {
    --default-text-color: #5c6265;
    --light-grey-color: #969ea2;
    --lighter-grey-color: #dce3e6;
  }

  .category-item {
    margin-bottom: 10px;
    height: auto;
  }

  .category-item.active {
    background: lightgrey;
  }
  .category-item.active:hover {
    background: lightgrey;
  }

  .category-item:last-child {
    margin-bottom: 0;
  }

  button > span {
    text-overflow: ellipsis;
    overflow: hidden;
  }

  @media (min-width: 1024px) {
    button > span {
      max-width: 15em;
    }
  }

  .buttons {
    width: 100%;
  }

  .buttons > button.category-item.is-light {
    color: var(--skhemata-faq-categories-text-color, rgba(0, 0, 0, 0.74221));
    background-color: var(
      --skhemata-faq-categories-background-color,
      rgb(245, 245, 245)
    );
    margin-bottom: 10px;
    height: auto;
  }
`;

const translationEngDefault$3 = {
  SkhemataFaqCategories: {
    categoriesTitle: "Categories",
    allCategories: "All Categories"
  }
};

/**
 *
 * Lit Faq Search Element
 *
 */
class SkhemataFaqCategories extends SkhemataBase {
  constructor() {
    super();
    this.apiWordpress = {
      url: ''
    };
    this.faqPagePath = '';
    this.categories = [];
    this.translationData = {
      eng: translationEngDefault$3
    };
    let params = new URLSearchParams(window.location.search);
    let c = params.get('c') || '';

    if (c !== '') {
      this.currentCategory = parseInt(c, 10);
    }

    window.addEventListener('popstate', () => {
      params = new URLSearchParams(window.location.search);
      c = params.get('c') || '';

      if (c !== '') {
        this.currentCategory = parseInt(c, 10);
      } else {
        this.currentCategory = undefined;
      }
    });
  }

  static get styles() {
    return [...super.styles, SkhemataFaqCategoriesStyles];
  }
  /**
   * Implement `render` to define a template for your element.
   * Use JS template literals
   */


  render() {
    return T`
      <h3 class="title is-4 has-text-centered">${this.getStr('SkhemataFaqCategories.categoriesTitle')}</h3>
        <div class="buttons">
        <button
          class="category-item button is-light is-fullwidth"
          @click="${() => this.filterCategory(-1)}"
        >
        ${this.getStr('SkhemataFaqCategories.allCategories')}
        </button>
      ${this.categories.map(category => T`
          <button
            class="category-item button is-light is-fullwidth ${this.currentCategory === category.id ? 'active' : ''}"
            @click=${() => this.filterCategory(category.id)}
          >
            <span>${category.name}</span>
          </button>
          </div>
        `)}
    `;
  }

  async firstUpdated() {
    await super.firstUpdated();
    this.getCategories();
  }
  /**
   *  Get categories
   */


  async getCategories() {
    await fetch(`${this.apiWordpress.url}/ufaq-category?parent=0&per_page=100`).then(response => response.json()).then(async data => {
      this.categories = data;
    });
  }

  filterCategory(id) {
    const params = new URLSearchParams(window.location.search);

    if (parseInt(params.get('c') || '', 10) === id || id === -1) {
      this.currentCategory = undefined;
      params.delete('c');
    } else {
      this.currentCategory = id;
      params.set('c', id.toString());
    }

    window.history.pushState({}, '', decodeURIComponent(`/${this.faqPagePath}?${params.toString()}`));
    window.scrollTo({
      top: 0
    });
    window.dispatchEvent(new Event('popstate'));
  }

}

__decorate([e$3({
  type: Object,
  attribute: 'api-wordpress'
})], SkhemataFaqCategories.prototype, "apiWordpress", void 0);

__decorate([e$3({
  type: String,
  attribute: 'faq-page-path'
})], SkhemataFaqCategories.prototype, "faqPagePath", void 0);

__decorate([e$3({
  type: Array
})], SkhemataFaqCategories.prototype, "categories", void 0);

__decorate([e$3({
  type: Number
})], SkhemataFaqCategories.prototype, "currentCategory", void 0);

__decorate([e$3({
  type: Object
})], SkhemataFaqCategories.prototype, "translationData", void 0);

const translationEngDefault$4 = { ...translationEngDefault$3,
  ...translationEngDefault,
  ...translationEngDefault$1,
  ...translationEngDefault$2
};

/**
 * Use the customElement decorator to define your class as
 * a custom element. Registers <my-element> as an HTML tag.
 */

class SkhemataFaq extends SkhemataBase {
  constructor() {
    super();
    this.apiWordpress = {
      url: ''
    };
    this.faqPagePath = '';
    this.postsPerPage = 20;
    this.pagerType = "infinite";
    this.slug = '';
    this.translationData = {
      eng: translationEngDefault$4
    };

    if (window.history.scrollRestoration) {
      window.history.scrollRestoration = 'manual';
    }
  }

  static get scopedElements() {
    return {
      'skhemata-faq-list': SkhemataFaqList,
      'skhemata-faq-post': SkhemataFaqPost,
      'skhemata-faq-search': SkhemataFaqSearch,
      'skhemata-faq-categories': SkhemataFaqCategories
    };
  }

  static get styles() {
    return [...super.styles, i`
        :host {
          display: block;
          padding: 25px 0;
          color: var(--skhemata-faq-text-color);
        }

        @media screen and (max-width: 430px) {
          :host {
            padding: 25px 20px;
          }
        }

        .mr {
          margin-right: 1.5rem;
        }

        .my {
          margin-top: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .back-button {
          margin: 0 0 1em;
        }

        .columns {
          width: 100%;
          margin: 0px;
        }

        .columns.search,
        .columns.search .column {
          margin-top: 0px;
          margin-bottom: 0px;
          padding-top: 0px;
          padidng-bottom: 0px;
        }
      `];
  }

  handleNavigate(e) {
    this.slug = e.detail.slug || ''; // const search = <SkhemataFaqSearch> this.shadowRoot.getElementById('search');
    // search.searchTerm = '';
  }

  handleGoBack() {
    this.slug = '';
    this.dispatchEvent(new CustomEvent('navigate', {
      detail: {
        slug: ''
      }
    }));
  }

  render() {
    return T`
      <div class="columns search">
        <div class="column">
          <skhemata-faq-search
            id="search"
            .faqPagePath=${this.faqPagePath}
            .translationData=${this.translationData}
          ></skhemata-faq-search>
        </div>
      </div>
      <div class="columns is-desktop">
        <div class="column is-three-quarters-desktop">
          ${this.slug ? T`
                <skhemata-faq-post
                  .apiWordpress=${this.apiWordpress}
                  .faqPagePath=${this.faqPagePath}
                  slug=${this.slug}
                  @navigate=${this.handleNavigate}
                  .translationData=${this.translationData}
                ></skhemata-faq-post>
              ` : T`
                <skhemata-faq-list
                  .apiWordpress=${this.apiWordpress}
                  .faqPagePath=${this.faqPagePath}
                  .postsPerPage=${this.postsPerPage}
                  .pagerType=${this.pagerType}
                  @navigate=${this.handleNavigate}
                  .translationData=${this.translationData}
                ></skhemata-faq-list>
              `}
        </div>
        <skhemata-faq-categories
          class="column"
          .apiWordpress=${this.apiWordpress}
          .faqPagePath=${this.faqPagePath}
          .translationData=${this.translationData}
        ></skhemata-faq-categories>
      </div>
    `;
  }

}

__decorate([e$3({
  type: Object,
  attribute: 'api-wordpress'
})], SkhemataFaq.prototype, "apiWordpress", void 0);

__decorate([e$3({
  type: String,
  attribute: 'faq-page-path'
})], SkhemataFaq.prototype, "faqPagePath", void 0);

__decorate([e$3({
  type: Number,
  attribute: 'posts-per-page'
})], SkhemataFaq.prototype, "postsPerPage", void 0);

__decorate([e$3({
  type: String,
  attribute: 'pager-type'
})], SkhemataFaq.prototype, "pagerType", void 0);

__decorate([e$3({
  type: String
})], SkhemataFaq.prototype, "slug", void 0);

__decorate([e$3({
  type: Object
})], SkhemataFaq.prototype, "translationData", void 0);

window.customElements.define('skhemata-faq', SkhemataFaq);
window.customElements.define('skhemata-faq-post', SkhemataFaqPost);
window.customElements.define('skhemata-faq-search', SkhemataFaqSearch);
window.customElements.define('skhemata-faq-list', SkhemataFaqList);
window.customElements.define('skhemata-faq-categories', SkhemataFaqCategories);
//# sourceMappingURL=index.js.map
