if (function() {
        var t = this;
        (function() {
            (function() {
                this.Rails = {
                    linkClickSelector: "a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]",
                    buttonClickSelector: {
                        selector: "button[data-remote]:not([form]), button[data-confirm]:not([form])",
                        exclude: "form button"
                    },
                    inputChangeSelector: "select[data-remote], input[data-remote], textarea[data-remote]",
                    formSubmitSelector: "form",
                    formInputClickSelector: "form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])",
                    formDisableSelector: "input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled",
                    formEnableSelector: "input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled",
                    fileInputSelector: "input[name][type=file]:not([disabled])",
                    linkDisableSelector: "a[data-disable-with], a[data-disable]",
                    buttonDisableSelector: "button[data-remote][data-disable-with], button[data-remote][data-disable]"
                }
            }).call(this)
        }).call(t);
        var y = t.Rails;
        (function() {
            (function() {
                var e;
                e = null, y.loadCSPNonce = function() {
                    var t;
                    return e = null != (t = document.querySelector("meta[name=csp-nonce]")) ? t.content : void 0
                }, y.cspNonce = function() {
                    return null != e ? e : y.loadCSPNonce()
                }
            }).call(this),
                function() {
                    var n, i;
                    i = Element.prototype.matches || Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector, y.matches = function(t, e) {
                        return null != e.exclude ? i.call(t, e.selector) && !i.call(t, e.exclude) : i.call(t, e)
                    }, n = "_ujsData", y.getData = function(t, e) {
                        var i;
                        return null != (i = t[n]) ? i[e] : void 0
                    }, y.setData = function(t, e, i) {
                        return null == t[n] && (t[n] = {}), t[n][e] = i
                    }, y.$ = function(t) {
                        return Array.prototype.slice.call(document.querySelectorAll(t))
                    }
                }.call(this),
                function() {
                    var i, n, o;
                    i = y.$, o = y.csrfToken = function() {
                        var t;
                        return (t = document.querySelector("meta[name=csrf-token]")) && t.content
                    }, n = y.csrfParam = function() {
                        var t;
                        return (t = document.querySelector("meta[name=csrf-param]")) && t.content
                    }, y.CSRFProtection = function(t) {
                        var e;
                        if (null != (e = o())) return t.setRequestHeader("X-CSRF-Token", e)
                    }, y.refreshCSRFTokens = function() {
                        var t, e;
                        if (e = o(), t = n(), null != e && null != t) return i('form input[name="' + t + '"]').forEach(function(t) {
                            return t.value = e
                        })
                    }
                }.call(this),
                function() {
                    var o, e, r, i;
                    r = y.matches, "function" != typeof(o = window.CustomEvent) && ((o = function(t, e) {
                        var i;
                        return (i = document.createEvent("CustomEvent")).initCustomEvent(t, e.bubbles, e.cancelable, e.detail), i
                    }).prototype = window.Event.prototype, i = o.prototype.preventDefault, o.prototype.preventDefault = function() {
                        var t;
                        return t = i.call(this), this.cancelable && !this.defaultPrevented && Object.defineProperty(this, "defaultPrevented", {
                            get: function() {
                                return !0
                            }
                        }), t
                    }), e = y.fire = function(t, e, i) {
                        var n;
                        return n = new o(e, {
                            bubbles: !0,
                            cancelable: !0,
                            detail: i
                        }), t.dispatchEvent(n), !n.defaultPrevented
                    }, y.stopEverything = function(t) {
                        return e(t.target, "ujs:everythingStopped"), t.preventDefault(), t.stopPropagation(), t.stopImmediatePropagation()
                    }, y.delegate = function(t, i, e, n) {
                        return t.addEventListener(e, function(t) {
                            var e;
                            for (e = t.target; e instanceof Element && !r(e, i);) e = e.parentNode;
                            if (e instanceof Element && !1 === n.call(e, t)) return t.preventDefault(), t.stopPropagation()
                        })
                    }
                }.call(this),
                function() {
                    var e, n, t, r, o, s;
                    r = y.cspNonce, n = y.CSRFProtection, y.fire, e = {
                        "*": "*/*",
                        text: "text/plain",
                        html: "text/html",
                        xml: "application/xml, text/xml",
                        json: "application/json, text/javascript",
                        script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
                    }, y.ajax = function(i) {
                        var n;
                        return i = o(i), n = t(i, function() {
                            var t, e;
                            return e = s(null != (t = n.response) ? t : n.responseText, n.getResponseHeader("Content-Type")), 2 === Math.floor(n.status / 100) ? "function" == typeof i.success && i.success(e, n.statusText, n) : "function" == typeof i.error && i.error(e, n.statusText, n), "function" == typeof i.complete ? i.complete(n, n.statusText) : void 0
                        }), !(null != i.beforeSend && !i.beforeSend(n, i)) && (n.readyState === XMLHttpRequest.OPENED ? n.send(i.data) : void 0)
                    }, o = function(t) {
                        return t.url = t.url || location.href, t.type = t.type.toUpperCase(), "GET" === t.type && t.data && (t.url.indexOf("?") < 0 ? t.url += "?" + t.data : t.url += "&" + t.data), null == e[t.dataType] && (t.dataType = "*"), t.accept = e[t.dataType], "*" !== t.dataType && (t.accept += ", */*; q=0.01"), t
                    }, t = function(t, e) {
                        var i;
                        return (i = new XMLHttpRequest).open(t.type, t.url, !0), i.setRequestHeader("Accept", t.accept), "string" == typeof t.data && i.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8"), t.crossDomain || i.setRequestHeader("X-Requested-With", "XMLHttpRequest"), n(i), i.withCredentials = !!t.withCredentials, i.onreadystatechange = function() {
                            if (i.readyState === XMLHttpRequest.DONE) return e(i)
                        }, i
                    }, s = function(t, e) {
                        var i, n;
                        if ("string" == typeof t && "string" == typeof e)
                            if (e.match(/\bjson\b/)) try {
                                    t = JSON.parse(t)
                                } catch (o) {} else if (e.match(/\b(?:java|ecma)script\b/))(n = document.createElement("script")).setAttribute("nonce", r()), n.text = t, document.head.appendChild(n).parentNode.removeChild(n);
                                else if (e.match(/\b(xml|html|svg)\b/)) {
                            i = new DOMParser, e = e.replace(/;.+/, "");
                            try {
                                t = i.parseFromString(t, e)
                            } catch (o) {}
                        }
                        return t
                    }, y.href = function(t) {
                        return t.href
                    }, y.isCrossDomain = function(t) {
                        var e, i;
                        (e = document.createElement("a")).href = location.href, i = document.createElement("a");
                        try {
                            return i.href = t, !((!i.protocol || ":" === i.protocol) && !i.host || e.protocol + "//" + e.host == i.protocol + "//" + i.host)
                        } catch (n) {
                            return n, !0
                        }
                    }
                }.call(this),
                function() {
                    var o, r;
                    o = y.matches, r = function(t) {
                        return Array.prototype.slice.call(t)
                    }, y.serializeElement = function(t, e) {
                        var i, n;
                        return i = [t], o(t, "form") && (i = r(t.elements)), n = [], i.forEach(function(e) {
                            if (e.name && !e.disabled) return o(e, "select") ? r(e.options).forEach(function(t) {
                                if (t.selected) return n.push({
                                    name: e.name,
                                    value: t.value
                                })
                            }) : e.checked || -1 === ["radio", "checkbox", "submit"].indexOf(e.type) ? n.push({
                                name: e.name,
                                value: e.value
                            }) : void 0
                        }), e && n.push(e), n.map(function(t) {
                            return null != t.name ? encodeURIComponent(t.name) + "=" + encodeURIComponent(t.value) : t
                        }).join("&")
                    }, y.formElements = function(t, e) {
                        return o(t, "form") ? r(t.elements).filter(function(t) {
                            return o(t, e)
                        }) : r(t.querySelectorAll(e))
                    }
                }.call(this),
                function() {
                    var e, r, i;
                    r = y.fire, i = y.stopEverything, y.handleConfirm = function(t) {
                        if (!e(this)) return i(t)
                    }, e = function(t) {
                        var e, i, n;
                        if (!(n = t.getAttribute("data-confirm"))) return !0;
                        if (e = !1, r(t, "confirm")) {
                            try {
                                e = confirm(n)
                            } catch (o) {}
                            i = r(t, "confirm:complete", [e])
                        }
                        return e && i
                    }
                }.call(this),
                function() {
                    var i, n, o, r, s, a, e, l, h, c, u;
                    h = y.matches, l = y.getData, c = y.setData, u = y.stopEverything, e = y.formElements, y.handleDisabledElement = function(t) {
                        if (this.disabled) return u(t)
                    }, y.enableElement = function(t) {
                        var e;
                        return e = t instanceof Event ? t.target : t, h(e, y.linkDisableSelector) ? a(e) : h(e, y.buttonDisableSelector) || h(e, y.formEnableSelector) ? r(e) : h(e, y.formSubmitSelector) ? s(e) : void 0
                    }, y.disableElement = function(t) {
                        var e;
                        return e = t instanceof Event ? t.target : t, h(e, y.linkDisableSelector) ? o(e) : h(e, y.buttonDisableSelector) || h(e, y.formDisableSelector) ? i(e) : h(e, y.formSubmitSelector) ? n(e) : void 0
                    }, o = function(t) {
                        var e;
                        return null != (e = t.getAttribute("data-disable-with")) && (c(t, "ujs:enable-with", t.innerHTML), t.innerHTML = e), t.addEventListener("click", u), c(t, "ujs:disabled", !0)
                    }, a = function(t) {
                        var e;
                        return null != (e = l(t, "ujs:enable-with")) && (t.innerHTML = e, c(t, "ujs:enable-with", null)), t.removeEventListener("click", u), c(t, "ujs:disabled", null)
                    }, n = function(t) {
                        return e(t, y.formDisableSelector).forEach(i)
                    }, i = function(t) {
                        var e;
                        return null != (e = t.getAttribute("data-disable-with")) && (h(t, "button") ? (c(t, "ujs:enable-with", t.innerHTML), t.innerHTML = e) : (c(t, "ujs:enable-with", t.value), t.value = e)), t.disabled = !0, c(t, "ujs:disabled", !0)
                    }, s = function(t) {
                        return e(t, y.formEnableSelector).forEach(r)
                    }, r = function(t) {
                        var e;
                        return null != (e = l(t, "ujs:enable-with")) && (h(t, "button") ? t.innerHTML = e : t.value = e, c(t, "ujs:enable-with", null)), t.disabled = !1, c(t, "ujs:disabled", null)
                    }
                }.call(this),
                function() {
                    var l;
                    l = y.stopEverything, y.handleMethod = function(t) {
                        var e, i, n, o, r, s, a;
                        if (a = (s = this).getAttribute("data-method")) return r = y.href(s), i = y.csrfToken(), e = y.csrfParam(), n = document.createElement("form"), o = "<input name='_method' value='" + a + "' type='hidden' />", null == e || null == i || y.isCrossDomain(r) || (o += "<input name='" + e + "' value='" + i + "' type='hidden' />"), o += '<input type="submit" />', n.method = "post", n.action = r, n.target = s.target, n.innerHTML = o, n.style.display = "none", document.body.appendChild(n), n.querySelector('[type="submit"]').click(), l(t)
                    }
                }.call(this),
                function() {
                    var l, h, c, u, d, p, f, g, m, v = [].slice;
                    p = y.matches, c = y.getData, g = y.setData, h = y.fire, m = y.stopEverything, l = y.ajax, u = y.isCrossDomain, f = y.serializeElement, d = function(t) {
                        var e;
                        return null != (e = t.getAttribute("data-remote")) && "false" !== e
                    }, y.handleRemote = function(t) {
                        var e, i, n, o, r, s, a;
                        return !d(o = this) || (h(o, "ajax:before") ? (a = o.getAttribute("data-with-credentials"), n = o.getAttribute("data-type") || "script", p(o, y.formSubmitSelector) ? (e = c(o, "ujs:submit-button"), r = c(o, "ujs:submit-button-formmethod") || o.method, s = c(o, "ujs:submit-button-formaction") || o.getAttribute("action") || location.href, "GET" === r.toUpperCase() && (s = s.replace(/\?.*$/, "")), "multipart/form-data" === o.enctype ? (i = new FormData(o), null != e && i.append(e.name, e.value)) : i = f(o, e), g(o, "ujs:submit-button", null), g(o, "ujs:submit-button-formmethod", null), g(o, "ujs:submit-button-formaction", null)) : p(o, y.buttonClickSelector) || p(o, y.inputChangeSelector) ? (r = o.getAttribute("data-method"), s = o.getAttribute("data-url"), i = f(o, o.getAttribute("data-params"))) : (r = o.getAttribute("data-method"), s = y.href(o), i = o.getAttribute("data-params")), l({
                            type: r || "GET",
                            url: s,
                            data: i,
                            dataType: n,
                            beforeSend: function(t, e) {
                                return h(o, "ajax:beforeSend", [t, e]) ? h(o, "ajax:send", [t]) : (h(o, "ajax:stopped"), !1)
                            },
                            success: function() {
                                var t;
                                return t = 1 <= arguments.length ? v.call(arguments, 0) : [], h(o, "ajax:success", t)
                            },
                            error: function() {
                                var t;
                                return t = 1 <= arguments.length ? v.call(arguments, 0) : [], h(o, "ajax:error", t)
                            },
                            complete: function() {
                                var t;
                                return t = 1 <= arguments.length ? v.call(arguments, 0) : [], h(o, "ajax:complete", t)
                            },
                            crossDomain: u(s),
                            withCredentials: null != a && "false" !== a
                        }), m(t)) : (h(o, "ajax:stopped"), !1))
                    }, y.formSubmitButtonClick = function() {
                        var t, e;
                        if (e = (t = this).form) return t.name && g(e, "ujs:submit-button", {
                            name: t.name,
                            value: t.value
                        }), g(e, "ujs:formnovalidate-button", t.formNoValidate), g(e, "ujs:submit-button-formaction", t.getAttribute("formaction")), g(e, "ujs:submit-button-formmethod", t.getAttribute("formmethod"))
                    }, y.preventInsignificantClick = function(t) {
                        var e, i, n, o;
                        if (o = ((n = this).getAttribute("data-method") || "GET").toUpperCase(), e = n.getAttribute("data-params"), i = (t.metaKey || t.ctrlKey) && "GET" === o && !e, !(0 === t.button) || i) return t.stopImmediatePropagation()
                    }
                }.call(this),
                function() {
                    var t, n, e, i, o, r, s, a, l, h, c, u, d, p, f;
                    if (r = y.fire, e = y.delegate, a = y.getData, t = y.$, f = y.refreshCSRFTokens, n = y.CSRFProtection, d = y.loadCSPNonce, o = y.enableElement, i = y.disableElement, h = y.handleDisabledElement, l = y.handleConfirm, p = y.preventInsignificantClick, u = y.handleRemote, s = y.formSubmitButtonClick, c = y.handleMethod, "undefined" != typeof jQuery && null !== jQuery && null != jQuery.ajax) {
                        if (jQuery.rails) throw new Error("If you load both jquery_ujs and rails-ujs, use rails-ujs only.");
                        jQuery.rails = y, jQuery.ajaxPrefilter(function(t, e, i) {
                            if (!t.crossDomain) return n(i)
                        })
                    }
                    y.start = function() {
                        if (window._rails_loaded) throw new Error("rails-ujs has already been loaded!");
                        return window.addEventListener("pageshow", function() {
                            return t(y.formEnableSelector).forEach(function(t) {
                                if (a(t, "ujs:disabled")) return o(t)
                            }), t(y.linkDisableSelector).forEach(function(t) {
                                if (a(t, "ujs:disabled")) return o(t)
                            })
                        }), e(document, y.linkDisableSelector, "ajax:complete", o), e(document, y.linkDisableSelector, "ajax:stopped", o), e(document, y.buttonDisableSelector, "ajax:complete", o), e(document, y.buttonDisableSelector, "ajax:stopped", o), e(document, y.linkClickSelector, "click", p), e(document, y.linkClickSelector, "click", h), e(document, y.linkClickSelector, "click", l), e(document, y.linkClickSelector, "click", i), e(document, y.linkClickSelector, "click", u), e(document, y.linkClickSelector, "click", c), e(document, y.buttonClickSelector, "click", p), e(document, y.buttonClickSelector, "click", h), e(document, y.buttonClickSelector, "click", l), e(document, y.buttonClickSelector, "click", i), e(document, y.buttonClickSelector, "click", u), e(document, y.inputChangeSelector, "change", h), e(document, y.inputChangeSelector, "change", l), e(document, y.inputChangeSelector, "change", u), e(document, y.formSubmitSelector, "submit", h), e(document, y.formSubmitSelector, "submit", l), e(document, y.formSubmitSelector, "submit", u), e(document, y.formSubmitSelector, "submit", function(t) {
                            return setTimeout(function() {
                                return i(t)
                            }, 13)
                        }), e(document, y.formSubmitSelector, "ajax:send", i), e(document, y.formSubmitSelector, "ajax:complete", o), e(document, y.formInputClickSelector, "click", p), e(document, y.formInputClickSelector, "click", h), e(document, y.formInputClickSelector, "click", l), e(document, y.formInputClickSelector, "click", s), document.addEventListener("DOMContentLoaded", f), document.addEventListener("DOMContentLoaded", d), window._rails_loaded = !0
                    }, window.Rails === y && r(document, "rails:attachBindings") && y.start()
                }.call(this)
        }).call(this), "object" == typeof module && module.exports ? module.exports = y : "function" == typeof define && define.amd && define(y)
    }.call(this), function(t, e) {
        "object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define(["exports"], e) : e(t.ActiveStorage = {})
    }(this, function(t) {
        "use strict";

        function e(t, e) {
            return t(e = {
                exports: {}
            }, e.exports), e.exports
        }

        function s(t) {
            var e = n(document.head, 'meta[name="' + t + '"]');
            if (e) return e.getAttribute("content")
        }

        function o(t, e) {
            return "string" == typeof t && (e = t, t = document), r(t.querySelectorAll(e))
        }

        function n(t, e) {
            return "string" == typeof t && (e = t, t = document), t.querySelector(e)
        }

        function l(t, e, i) {
            var n = 2 < arguments.length && i !== undefined ? arguments[2] : {},
                o = t.disabled,
                r = n.bubbles,
                s = n.cancelable,
                a = n.detail,
                l = document.createEvent("Event");
            l.initEvent(e, r || !0, s || !0), l.detail = a || {};
            try {
                t.disabled = !1, t.dispatchEvent(l)
            } finally {
                t.disabled = o
            }
            return l
        }

        function r(t) {
            return Array.isArray(t) ? t : Array.from ? Array.from(t) : [].slice.call(t)
        }

        function a(t, e) {
            if (t && "function" == typeof t[e]) {
                for (var i = arguments.length, n = Array(2 < i ? i - 2 : 0), o = 2; o < i; o++) n[o - 2] = arguments[o];
                return t[e].apply(t, n)
            }
        }

        function i() {
            L || (L = !0, document.addEventListener("click", h, !0), document.addEventListener("submit", c), document.addEventListener("ajax:before", u))
        }

        function h(t) {
            var e = t.target;
            "INPUT" != e.tagName && "BUTTON" != e.tagName || "submit" != e.type || !e.form || O.set(e.form, e)
        }

        function c(t) {
            d(t)
        }

        function u(t) {
            "FORM" == t.target.tagName && d(t)
        }

        function d(t) {
            var e = t.target;
            if (e.hasAttribute(M)) t.preventDefault();
            else {
                var i = new _(e),
                    n = i.inputs;
                n.length && (t.preventDefault(), e.setAttribute(M, ""), n.forEach(f), i.start(function(t) {
                    e.removeAttribute(M), t ? n.forEach(g) : p(e)
                }))
            }
        }

        function p(t) {
            var e = O.get(t) || n(t, "input[type=submit], button[type=submit]");
            if (e) {
                var i = e.disabled;
                e.disabled = !1, e.focus(), e.click(), e.disabled = i
            } else(e = document.createElement("input")).type = "submit", e.style.display = "none", t.appendChild(e), e.click(), t.removeChild(e);
            O["delete"](t)
        }

        function f(t) {
            t.disabled = !0
        }

        function g(t) {
            t.disabled = !1
        }

        function m() {
            window.ActiveStorage && i()
        }
        var v = e(function(t) {
                var e;
                e = function(c) {
                    function h(t, e) {
                        var i = t[0],
                            n = t[1],
                            o = t[2],
                            r = t[3];
                        n = ((n += ((o = ((o += ((r = ((r += ((i = ((i += (n & o | ~n & r) + e[0] - 680876936 | 0) << 7 | i >>> 25) + n | 0) & n | ~i & o) + e[1] - 389564586 | 0) << 12 | r >>> 20) + i | 0) & i | ~r & n) + e[2] + 606105819 | 0) << 17 | o >>> 15) + r | 0) & r | ~o & i) + e[3] - 1044525330 | 0) << 22 | n >>> 10) + o | 0, n = ((n += ((o = ((o += ((r = ((r += ((i = ((i += (n & o | ~n & r) + e[4] - 176418897 | 0) << 7 | i >>> 25) + n | 0) & n | ~i & o) + e[5] + 1200080426 | 0) << 12 | r >>> 20) + i | 0) & i | ~r & n) + e[6] - 1473231341 | 0) << 17 | o >>> 15) + r | 0) & r | ~o & i) + e[7] - 45705983 | 0) << 22 | n >>> 10) + o | 0, n = ((n += ((o = ((o += ((r = ((r += ((i = ((i += (n & o | ~n & r) + e[8] + 1770035416 | 0) << 7 | i >>> 25) + n | 0) & n | ~i & o) + e[9] - 1958414417 | 0) << 12 | r >>> 20) + i | 0) & i | ~r & n) + e[10] - 42063 | 0) << 17 | o >>> 15) + r | 0) & r | ~o & i) + e[11] - 1990404162 | 0) << 22 | n >>> 10) + o | 0, n = ((n += ((o = ((o += ((r = ((r += ((i = ((i += (n & o | ~n & r) + e[12] + 1804603682 | 0) << 7 | i >>> 25) + n | 0) & n | ~i & o) + e[13] - 40341101 | 0) << 12 | r >>> 20) + i | 0) & i | ~r & n) + e[14] - 1502002290 | 0) << 17 | o >>> 15) + r | 0) & r | ~o & i) + e[15] + 1236535329 | 0) << 22 | n >>> 10) + o | 0, n = ((n += ((o = ((o += ((r = ((r += ((i = ((i += (n & r | o & ~r) + e[1] - 165796510 | 0) << 5 | i >>> 27) + n | 0) & o | n & ~o) + e[6] - 1069501632 | 0) << 9 | r >>> 23) + i | 0) & n | i & ~n) + e[11] + 643717713 | 0) << 14 | o >>> 18) + r | 0) & i | r & ~i) + e[0] - 373897302 | 0) << 20 | n >>> 12) + o | 0, n = ((n += ((o = ((o += ((r = ((r += ((i = ((i += (n & r | o & ~r) + e[5] - 701558691 | 0) << 5 | i >>> 27) + n | 0) & o | n & ~o) + e[10] + 38016083 | 0) << 9 | r >>> 23) + i | 0) & n | i & ~n) + e[15] - 660478335 | 0) << 14 | o >>> 18) + r | 0) & i | r & ~i) + e[4] - 405537848 | 0) << 20 | n >>> 12) + o | 0, n = ((n += ((o = ((o += ((r = ((r += ((i = ((i += (n & r | o & ~r) + e[9] + 568446438 | 0) << 5 | i >>> 27) + n | 0) & o | n & ~o) + e[14] - 1019803690 | 0) << 9 | r >>> 23) + i | 0) & n | i & ~n) + e[3] - 187363961 | 0) << 14 | o >>> 18) + r | 0) & i | r & ~i) + e[8] + 1163531501 | 0) << 20 | n >>> 12) + o | 0, n = ((n += ((o = ((o += ((r = ((r += ((i = ((i += (n & r | o & ~r) + e[13] - 1444681467 | 0) << 5 | i >>> 27) + n | 0) & o | n & ~o) + e[2] - 51403784 | 0) << 9 | r >>> 23) + i | 0) & n | i & ~n) + e[7] + 1735328473 | 0) << 14 | o >>> 18) + r | 0) & i | r & ~i) + e[12] - 1926607734 | 0) << 20 | n >>> 12) + o | 0, n = ((n += ((o = ((o += ((r = ((r += ((i = ((i += (n ^ o ^ r) + e[5] - 378558 | 0) << 4 | i >>> 28) + n | 0) ^ n ^ o) + e[8] - 2022574463 | 0) << 11 | r >>> 21) + i | 0) ^ i ^ n) + e[11] + 1839030562 | 0) << 16 | o >>> 16) + r | 0) ^ r ^ i) + e[14] - 35309556 | 0) << 23 | n >>> 9) + o | 0, n = ((n += ((o = ((o += ((r = ((r += ((i = ((i += (n ^ o ^ r) + e[1] - 1530992060 | 0) << 4 | i >>> 28) + n | 0) ^ n ^ o) + e[4] + 1272893353 | 0) << 11 | r >>> 21) + i | 0) ^ i ^ n) + e[7] - 155497632 | 0) << 16 | o >>> 16) + r | 0) ^ r ^ i) + e[10] - 1094730640 | 0) << 23 | n >>> 9) + o | 0, n = ((n += ((o = ((o += ((r = ((r += ((i = ((i += (n ^ o ^ r) + e[13] + 681279174 | 0) << 4 | i >>> 28) + n | 0) ^ n ^ o) + e[0] - 358537222 | 0) << 11 | r >>> 21) + i | 0) ^ i ^ n) + e[3] - 722521979 | 0) << 16 | o >>> 16) + r | 0) ^ r ^ i) + e[6] + 76029189 | 0) << 23 | n >>> 9) + o | 0, n = ((n += ((o = ((o += ((r = ((r += ((i = ((i += (n ^ o ^ r) + e[9] - 640364487 | 0) << 4 | i >>> 28) + n | 0) ^ n ^ o) + e[12] - 421815835 | 0) << 11 | r >>> 21) + i | 0) ^ i ^ n) + e[15] + 530742520 | 0) << 16 | o >>> 16) + r | 0) ^ r ^ i) + e[2] - 995338651 | 0) << 23 | n >>> 9) + o | 0, n = ((n += ((r = ((r += (n ^ ((i = ((i += (o ^ (n | ~r)) + e[0] - 198630844 | 0) << 6 | i >>> 26) + n | 0) | ~o)) + e[7] + 1126891415 | 0) << 10 | r >>> 22) + i | 0) ^ ((o = ((o += (i ^ (r | ~n)) + e[14] - 1416354905 | 0) << 15 | o >>> 17) + r | 0) | ~i)) + e[5] - 57434055 | 0) << 21 | n >>> 11) + o | 0, n = ((n += ((r = ((r += (n ^ ((i = ((i += (o ^ (n | ~r)) + e[12] + 1700485571 | 0) << 6 | i >>> 26) + n | 0) | ~o)) + e[3] - 1894986606 | 0) << 10 | r >>> 22) + i | 0) ^ ((o = ((o += (i ^ (r | ~n)) + e[10] - 1051523 | 0) << 15 | o >>> 17) + r | 0) | ~i)) + e[1] - 2054922799 | 0) << 21 | n >>> 11) + o | 0, n = ((n += ((r = ((r += (n ^ ((i = ((i += (o ^ (n | ~r)) + e[8] + 1873313359 | 0) << 6 | i >>> 26) + n | 0) | ~o)) + e[15] - 30611744 | 0) << 10 | r >>> 22) + i | 0) ^ ((o = ((o += (i ^ (r | ~n)) + e[6] - 1560198380 | 0) << 15 | o >>> 17) + r | 0) | ~i)) + e[13] + 1309151649 | 0) << 21 | n >>> 11) + o | 0, n = ((n += ((r = ((r += (n ^ ((i = ((i += (o ^ (n | ~r)) + e[4] - 145523070 | 0) << 6 | i >>> 26) + n | 0) | ~o)) + e[11] - 1120210379 | 0) << 10 | r >>> 22) + i | 0) ^ ((o = ((o += (i ^ (r | ~n)) + e[2] + 718787259 | 0) << 15 | o >>> 17) + r | 0) | ~i)) + e[9] - 343485551 | 0) << 21 | n >>> 11) + o | 0, t[0] = i + t[0] | 0, t[1] = n + t[1] | 0, t[2] = o + t[2] | 0, t[3] = r + t[3] | 0
                    }

                    function u(t) {
                        var e, i = [];
                        for (e = 0; e < 64; e += 4) i[e >> 2] = t.charCodeAt(e) + (t.charCodeAt(e + 1) << 8) + (t.charCodeAt(e + 2) << 16) + (t.charCodeAt(e + 3) << 24);
                        return i
                    }

                    function d(t) {
                        var e, i = [];
                        for (e = 0; e < 64; e += 4) i[e >> 2] = t[e] + (t[e + 1] << 8) + (t[e + 2] << 16) + (t[e + 3] << 24);
                        return i
                    }

                    function n(t) {
                        var e, i, n, o, r, s, a = t.length,
                            l = [1732584193, -271733879, -1732584194, 271733878];
                        for (e = 64; e <= a; e += 64) h(l, u(t.substring(e - 64, e)));
                        for (i = (t = t.substring(e - 64)).length, n = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], e = 0; e < i; e += 1) n[e >> 2] |= t.charCodeAt(e) << (e % 4 << 3);
                        if (n[e >> 2] |= 128 << (e % 4 << 3), 55 < e)
                            for (h(l, n), e = 0; e < 16; e += 1) n[e] = 0;
                        return o = (o = 8 * a).toString(16).match(/(.*?)(.{0,8})$/), r = parseInt(o[2], 16), s = parseInt(o[1], 16) || 0, n[14] = r, n[15] = s, h(l, n), l
                    }

                    function o(t) {
                        var e, i, n, o, r, s, a = t.length,
                            l = [1732584193, -271733879, -1732584194, 271733878];
                        for (e = 64; e <= a; e += 64) h(l, d(t.subarray(e - 64, e)));
                        for (i = (t = e - 64 < a ? t.subarray(e - 64) : new Uint8Array(0)).length, n = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], e = 0; e < i; e += 1) n[e >> 2] |= t[e] << (e % 4 << 3);
                        if (n[e >> 2] |= 128 << (e % 4 << 3), 55 < e)
                            for (h(l, n), e = 0; e < 16; e += 1) n[e] = 0;
                        return o = (o = 8 * a).toString(16).match(/(.*?)(.{0,8})$/), r = parseInt(o[2], 16), s = parseInt(o[1], 16) || 0, n[14] = r, n[15] = s, h(l, n), l
                    }

                    function i(t) {
                        var e, i = "";
                        for (e = 0; e < 4; e += 1) i += g[t >> 8 * e + 4 & 15] + g[t >> 8 * e & 15];
                        return i
                    }

                    function s(t) {
                        var e;
                        for (e = 0; e < t.length; e += 1) t[e] = i(t[e]);
                        return t.join("")
                    }

                    function r(t) {
                        return /[\u0080-\uFFFF]/.test(t) && (t = unescape(encodeURIComponent(t))), t
                    }

                    function e(t, e) {
                        var i, n = t.length,
                            o = new ArrayBuffer(n),
                            r = new Uint8Array(o);
                        for (i = 0; i < n; i += 1) r[i] = t.charCodeAt(i);
                        return e ? r : o
                    }

                    function a(t) {
                        return String.fromCharCode.apply(null, new Uint8Array(t))
                    }

                    function l(t, e, i) {
                        var n = new Uint8Array(t.byteLength + e.byteLength);
                        return n.set(new Uint8Array(t)), n.set(new Uint8Array(e), t.byteLength), i ? n : n.buffer
                    }

                    function p(t) {
                        var e, i = [],
                            n = t.length;
                        for (e = 0; e < n - 1; e += 2) i.push(parseInt(t.substr(e, 2), 16));
                        return String.fromCharCode.apply(String, i)
                    }

                    function f() {
                        this.reset()
                    }
                    var g = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
                    return s(n("hello")), "undefined" == typeof ArrayBuffer || ArrayBuffer.prototype.slice || function() {
                        function h(t, e) {
                            return (t = 0 | t || 0) < 0 ? Math.max(t + e, 0) : Math.min(t, e)
                        }
                        ArrayBuffer.prototype.slice = function(t, e) {
                            var i, n, o, r, s = this.byteLength,
                                a = h(t, s),
                                l = s;
                            return e !== c && (l = h(e, s)), l < a ? new ArrayBuffer(0) : (i = l - a, n = new ArrayBuffer(i), o = new Uint8Array(n), r = new Uint8Array(this, a, i), o.set(r), n)
                        }
                    }(), f.prototype.append = function(t) {
                        return this.appendBinary(r(t)), this
                    }, f.prototype.appendBinary = function(t) {
                        this._buff += t, this._length += t.length;
                        var e, i = this._buff.length;
                        for (e = 64; e <= i; e += 64) h(this._hash, u(this._buff.substring(e - 64, e)));
                        return this._buff = this._buff.substring(e - 64), this
                    }, f.prototype.end = function(t) {
                        var e, i, n = this._buff,
                            o = n.length,
                            r = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                        for (e = 0; e < o; e += 1) r[e >> 2] |= n.charCodeAt(e) << (e % 4 << 3);
                        return this._finish(r, o), i = s(this._hash), t && (i = p(i)), this.reset(), i
                    }, f.prototype.reset = function() {
                        return this._buff = "", this._length = 0, this._hash = [1732584193, -271733879, -1732584194, 271733878], this
                    }, f.prototype.getState = function() {
                        return {
                            buff: this._buff,
                            length: this._length,
                            hash: this._hash
                        }
                    }, f.prototype.setState = function(t) {
                        return this._buff = t.buff, this._length = t.length, this._hash = t.hash, this
                    }, f.prototype.destroy = function() {
                        delete this._hash, delete this._buff, delete this._length
                    }, f.prototype._finish = function(t, e) {
                        var i, n, o, r = e;
                        if (t[r >> 2] |= 128 << (r % 4 << 3), 55 < r)
                            for (h(this._hash, t), r = 0; r < 16; r += 1) t[r] = 0;
                        i = (i = 8 * this._length).toString(16).match(/(.*?)(.{0,8})$/), n = parseInt(i[2], 16), o = parseInt(i[1], 16) || 0, t[14] = n, t[15] = o, h(this._hash, t)
                    }, f.hash = function(t, e) {
                        return f.hashBinary(r(t), e)
                    }, f.hashBinary = function(t, e) {
                        var i = s(n(t));
                        return e ? p(i) : i
                    }, f.ArrayBuffer = function() {
                        this.reset()
                    }, f.ArrayBuffer.prototype.append = function(t) {
                        var e, i = l(this._buff.buffer, t, !0),
                            n = i.length;
                        for (this._length += t.byteLength, e = 64; e <= n; e += 64) h(this._hash, d(i.subarray(e - 64, e)));
                        return this._buff = e - 64 < n ? new Uint8Array(i.buffer.slice(e - 64)) : new Uint8Array(0), this
                    }, f.ArrayBuffer.prototype.end = function(t) {
                        var e, i, n = this._buff,
                            o = n.length,
                            r = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                        for (e = 0; e < o; e += 1) r[e >> 2] |= n[e] << (e % 4 << 3);
                        return this._finish(r, o), i = s(this._hash), t && (i = p(i)), this.reset(), i
                    }, f.ArrayBuffer.prototype.reset = function() {
                        return this._buff = new Uint8Array(0), this._length = 0, this._hash = [1732584193, -271733879, -1732584194, 271733878], this
                    }, f.ArrayBuffer.prototype.getState = function() {
                        var t = f.prototype.getState.call(this);
                        return t.buff = a(t.buff), t
                    }, f.ArrayBuffer.prototype.setState = function(t) {
                        return t.buff = e(t.buff, !0), f.prototype.setState.call(this, t)
                    }, f.ArrayBuffer.prototype.destroy = f.prototype.destroy, f.ArrayBuffer.prototype._finish = f.prototype._finish, f.ArrayBuffer.hash = function(t, e) {
                        var i = s(o(new Uint8Array(t)));
                        return e ? p(i) : i
                    }, f
                }, t.exports = e()
            }),
            y = function(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            },
            b = function() {
                function n(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var n = e[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                    }
                }
                return function(t, e, i) {
                    return e && n(t.prototype, e), i && n(t, i), t
                }
            }(),
            x = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice,
            w = function() {
                function i(t) {
                    y(this, i), this.file = t, this.chunkSize = 2097152, this.chunkCount = Math.ceil(this.file.size / this.chunkSize), this.chunkIndex = 0
                }
                return b(i, null, [{
                    key: "create",
                    value: function n(t, e) {
                        new i(t).create(e)
                    }
                }]), b(i, [{
                    key: "create",
                    value: function n(t) {
                        var e = this;
                        this.callback = t, this.md5Buffer = new v.ArrayBuffer, this.fileReader = new FileReader, this.fileReader.addEventListener("load", function(t) {
                            return e.fileReaderDidLoad(t)
                        }), this.fileReader.addEventListener("error", function(t) {
                            return e.fileReaderDidError(t)
                        }), this.readNextChunk()
                    }
                }, {
                    key: "fileReaderDidLoad",
                    value: function o(t) {
                        if (this.md5Buffer.append(t.target.result), !this.readNextChunk()) {
                            var e = this.md5Buffer.end(!0),
                                i = btoa(e);
                            this.callback(null, i)
                        }
                    }
                }, {
                    key: "fileReaderDidError",
                    value: function t() {
                        this.callback("Error reading " + this.file.name)
                    }
                }, {
                    key: "readNextChunk",
                    value: function r() {
                        if (this.chunkIndex < this.chunkCount || 0 == this.chunkIndex && 0 == this.chunkCount) {
                            var t = this.chunkIndex * this.chunkSize,
                                e = Math.min(t + this.chunkSize, this.file.size),
                                i = x.call(this.file, t, e);
                            return this.fileReader.readAsArrayBuffer(i), this.chunkIndex++, !0
                        }
                        return !1
                    }
                }]), i
            }(),
            T = function() {
                function o(t, e, i) {
                    var n = this;
                    y(this, o), this.file = t, this.attributes = {
                        filename: t.name,
                        content_type: t.type,
                        byte_size: t.size,
                        checksum: e
                    }, this.xhr = new XMLHttpRequest, this.xhr.open("POST", i, !0), this.xhr.responseType = "json", this.xhr.setRequestHeader("Content-Type", "application/json"), this.xhr.setRequestHeader("Accept", "application/json"), this.xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest"), this.xhr.setRequestHeader("X-CSRF-Token", s("csrf-token")), this.xhr.addEventListener("load", function(t) {
                        return n.requestDidLoad(t)
                    }), this.xhr.addEventListener("error", function(t) {
                        return n.requestDidError(t)
                    })
                }
                return b(o, [{
                    key: "create",
                    value: function e(t) {
                        this.callback = t, this.xhr.send(JSON.stringify({
                            blob: this.attributes
                        }))
                    }
                }, {
                    key: "requestDidLoad",
                    value: function n(t) {
                        if (200 <= this.status && this.status < 300) {
                            var e = this.response,
                                i = e.direct_upload;
                            delete e.direct_upload, this.attributes = e, this.directUploadData = i, this.callback(null, this.toJSON())
                        } else this.requestDidError(t)
                    }
                }, {
                    key: "requestDidError",
                    value: function t() {
                        this.callback('Error creating Blob for "' + this.file.name + '". Status: ' + this.status)
                    }
                }, {
                    key: "toJSON",
                    value: function i() {
                        var t = {};
                        for (var e in this.attributes) t[e] = this.attributes[e];
                        return t
                    }
                }, {
                    key: "status",
                    get: function r() {
                        return this.xhr.status
                    }
                }, {
                    key: "response",
                    get: function r() {
                        var t = this.xhr,
                            e = t.responseType,
                            i = t.response;
                        return "json" == e ? i : JSON.parse(i)
                    }
                }]), o
            }(),
            C = function() {
                function s(t) {
                    var e = this;
                    y(this, s), this.blob = t, this.file = t.file;
                    var i = t.directUploadData,
                        n = i.url,
                        o = i.headers;
                    for (var r in this.xhr = new XMLHttpRequest, this.xhr.open("PUT", n, !0), this.xhr.responseType = "text", o) this.xhr.setRequestHeader(r, o[r]);
                    this.xhr.addEventListener("load", function(t) {
                        return e.requestDidLoad(t)
                    }), this.xhr.addEventListener("error", function(t) {
                        return e.requestDidError(t)
                    })
                }
                return b(s, [{
                    key: "create",
                    value: function e(t) {
                        this.callback = t, this.xhr.send(this.file.slice())
                    }
                }, {
                    key: "requestDidLoad",
                    value: function o(t) {
                        var e = this.xhr,
                            i = e.status,
                            n = e.response;
                        200 <= i && i < 300 ? this.callback(null, n) : this.requestDidError(t)
                    }
                }, {
                    key: "requestDidError",
                    value: function t() {
                        this.callback('Error storing "' + this.file.name + '". Status: ' + this.xhr.status)
                    }
                }]), s
            }(),
            S = 0,
            E = function() {
                function n(t, e, i) {
                    y(this, n), this.id = ++S, this.file = t, this.url = e, this.delegate = i
                }
                return b(n, [{
                    key: "create",
                    value: function t(n) {
                        var o = this;
                        w.create(this.file, function(t, e) {
                            if (t) n(t);
                            else {
                                var i = new T(o.file, e, o.url);
                                a(o.delegate, "directUploadWillCreateBlobWithXHR", i.xhr), i.create(function(t) {
                                    if (t) n(t);
                                    else {
                                        var e = new C(i);
                                        a(o.delegate, "directUploadWillStoreFileWithXHR", e.xhr), e.create(function(t) {
                                            t ? n(t) : n(null, i.toJSON())
                                        })
                                    }
                                })
                            }
                        })
                    }
                }]), n
            }(),
            A = function() {
                function i(t, e) {
                    y(this, i), this.input = t, this.file = e, this.directUpload = new E(this.file, this.url, this), this.dispatch("initialize")
                }
                return b(i, [{
                    key: "start",
                    value: function t(i) {
                        var n = this,
                            o = document.createElement("input");
                        o.type = "hidden", o.name = this.input.name, this.input.insertAdjacentElement("beforebegin", o), this.dispatch("start"), this.directUpload.create(function(t, e) {
                            t ? (o.parentNode.removeChild(o), n.dispatchError(t)) : o.value = e.signed_id, n.dispatch("end"), i(t)
                        })
                    }
                }, {
                    key: "uploadRequestDidProgress",
                    value: function n(t) {
                        var e = t.loaded / t.total * 100;
                        e && this.dispatch("progress", {
                            progress: e
                        })
                    }
                }, {
                    key: "dispatch",
                    value: function o(t, e) {
                        var i = 1 < arguments.length && e !== undefined ? arguments[1] : {};
                        return i.file = this.file, i.id = this.directUpload.id, l(this.input, "direct-upload:" + t, {
                            detail: i
                        })
                    }
                }, {
                    key: "dispatchError",
                    value: function e(t) {
                        this.dispatch("error", {
                            error: t
                        }).defaultPrevented || alert(t)
                    }
                }, {
                    key: "directUploadWillCreateBlobWithXHR",
                    value: function r(t) {
                        this.dispatch("before-blob-request", {
                            xhr: t
                        })
                    }
                }, {
                    key: "directUploadWillStoreFileWithXHR",
                    value: function s(t) {
                        var e = this;
                        this.dispatch("before-storage-request", {
                            xhr: t
                        }), t.upload.addEventListener("progress", function(t) {
                            return e.uploadRequestDidProgress(t)
                        })
                    }
                }, {
                    key: "url",
                    get: function a() {
                        return this.input.getAttribute("data-direct-upload-url")
                    }
                }]), i
            }(),
            k = "input[type=file][data-direct-upload-url]:not([disabled])",
            _ = function() {
                function e(t) {
                    y(this, e), this.form = t, this.inputs = o(t, k).filter(function(t) {
                        return t.files.length
                    })
                }
                return b(e, [{
                    key: "start",
                    value: function t(e) {
                        var i = this,
                            n = this.createDirectUploadControllers(),
                            o = function o() {
                                var t = n.shift();
                                t ? t.start(function(t) {
                                    t ? (e(t), i.dispatch("end")) : o()
                                }) : (e(), i.dispatch("end"))
                            };
                        this.dispatch("start"), o()
                    }
                }, {
                    key: "createDirectUploadControllers",
                    value: function i() {
                        var n = [];
                        return this.inputs.forEach(function(i) {
                            r(i.files).forEach(function(t) {
                                var e = new A(i, t);
                                n.push(e)
                            })
                        }), n
                    }
                }, {
                    key: "dispatch",
                    value: function n(t, e) {
                        var i = 1 < arguments.length && e !== undefined ? arguments[1] : {};
                        return l(this.form, "direct-uploads:" + t, {
                            detail: i
                        })
                    }
                }]), e
            }(),
            M = "data-direct-uploads-processing",
            O = new WeakMap,
            L = !1;
        setTimeout(m, 1), t.start = i, t.DirectUpload = E, Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }), function() {
        var t = this;
        (function() {
            (function() {
                this.Turbolinks = {
                    supported: null != window.history.pushState && null != window.requestAnimationFrame && null != window.addEventListener,
                    visit: function(t, e) {
                        return c.controller.visit(t, e)
                    },
                    clearCache: function() {
                        return c.controller.clearCache()
                    },
                    setProgressBarDelay: function(t) {
                        return c.controller.setProgressBarDelay(t)
                    }
                }
            }).call(this)
        }).call(t);
        var c = t.Turbolinks;
        (function() {
            (function() {
                var i, n, l, t, e, o, r, s, a, h = [].slice;
                c.copyObject = function(t) {
                    var e, i, n;
                    for (e in i = {}, t) n = t[e], i[e] = n;
                    return i
                }, c.closest = function(t, e) {
                    return i.call(t, e)
                }, i = null != (a = document.documentElement.closest) ? a : function(t) {
                    var e;
                    for (e = this; e;) {
                        if (e.nodeType === Node.ELEMENT_NODE && n.call(e, t)) return e;
                        e = e.parentNode
                    }
                }, c.defer = function(t) {
                    return setTimeout(t, 1)
                }, c.throttle = function(i) {
                    var n;
                    return n = null,
                        function() {
                            var t, e;
                            return t = 1 <= arguments.length ? h.call(arguments, 0) : [], null != n ? n : n = requestAnimationFrame((e = this, function() {
                                return n = null, i.apply(e, t)
                            }))
                        }
                }, c.dispatch = function(t, e) {
                    var i, n, o, r, s, a;
                    return a = (s = null != e ? e : {}).target, i = s.cancelable, n = s.data, (o = document.createEvent("Events")).initEvent(t, !0, !0 === i), o.data = null != n ? n : {}, o.cancelable && !l && (r = o.preventDefault, o.preventDefault = function() {
                        return this.defaultPrevented || Object.defineProperty(this, "defaultPrevented", {
                            get: function() {
                                return !0
                            }
                        }), r.call(this)
                    }), (null != a ? a : document).dispatchEvent(o), o
                }, (s = document.createEvent("Events")).initEvent("test", !0, !0), s.preventDefault(), l = s.defaultPrevented, c.match = function(t, e) {
                    return n.call(t, e)
                }, n = null != (e = null != (o = null != (r = (t = document.documentElement).matchesSelector) ? r : t.webkitMatchesSelector) ? o : t.msMatchesSelector) ? e : t.mozMatchesSelector, c.uuid = function() {
                    var t, e, i;
                    for (i = "", t = e = 1; e <= 36; t = ++e) i += 9 === t || 14 === t || 19 === t || 24 === t ? "-" : 15 === t ? "4" : 20 === t ? (Math.floor(4 * Math.random()) + 8).toString(16) : Math.floor(15 * Math.random()).toString(16);
                    return i
                }
            }).call(this),
                function() {
                    c.Location = function() {
                        function t(t) {
                            var e, i;
                            null == t && (t = ""), (i = document.createElement("a")).href = t.toString(), this.absoluteURL = i.href, (e = i.hash.length) < 2 ? this.requestURL = this.absoluteURL : (this.requestURL = this.absoluteURL.slice(0, -e), this.anchor = i.hash.slice(1))
                        }
                        var e, i, n, o;
                        return t.wrap = function(t) {
                            return t instanceof this ? t : new this(t)
                        }, t.prototype.getOrigin = function() {
                            return this.absoluteURL.split("/", 3).join("/")
                        }, t.prototype.getPath = function() {
                            var t, e;
                            return null != (t = null != (e = this.requestURL.match(/\/\/[^\/]*(\/[^?;]*)/)) ? e[1] : void 0) ? t : "/"
                        }, t.prototype.getPathComponents = function() {
                            return this.getPath().split("/").slice(1)
                        }, t.prototype.getLastPathComponent = function() {
                            return this.getPathComponents().slice(-1)[0]
                        }, t.prototype.getExtension = function() {
                            var t, e;
                            return null != (t = null != (e = this.getLastPathComponent().match(/\.[^.]*$/)) ? e[0] : void 0) ? t : ""
                        }, t.prototype.isHTML = function() {
                            return this.getExtension().match(/^(?:|\.(?:htm|html|xhtml))$/)
                        }, t.prototype.isPrefixedBy = function(t) {
                            var e;
                            return e = i(t), this.isEqualTo(t) || o(this.absoluteURL, e)
                        }, t.prototype.isEqualTo = function(t) {
                            return this.absoluteURL === (null != t ? t.absoluteURL : void 0)
                        }, t.prototype.toCacheKey = function() {
                            return this.requestURL
                        }, t.prototype.toJSON = function() {
                            return this.absoluteURL
                        }, t.prototype.toString = function() {
                            return this.absoluteURL
                        }, t.prototype.valueOf = function() {
                            return this.absoluteURL
                        }, i = function(t) {
                            return e(t.getOrigin() + t.getPath())
                        }, e = function(t) {
                            return n(t, "/") ? t : t + "/"
                        }, o = function(t, e) {
                            return t.slice(0, e.length) === e
                        }, n = function(t, e) {
                            return t.slice(-e.length) === e
                        }, t
                    }()
                }.call(this),
                function() {
                    var n = function(t, e) {
                        return function() {
                            return t.apply(e, arguments)
                        }
                    };
                    c.HttpRequest = function() {
                        function t(t, e, i) {
                            this.delegate = t, this.requestCanceled = n(this.requestCanceled, this), this.requestTimedOut = n(this.requestTimedOut, this), this.requestFailed = n(this.requestFailed, this), this.requestLoaded = n(this.requestLoaded, this), this.requestProgressed = n(this.requestProgressed, this), this.url = c.Location.wrap(e).requestURL, this.referrer = c.Location.wrap(i).absoluteURL, this.createXHR()
                        }
                        return t.NETWORK_FAILURE = 0, t.TIMEOUT_FAILURE = -1, t.timeout = 60, t.prototype.send = function() {
                            var t;
                            return this.xhr && !this.sent ? (this.notifyApplicationBeforeRequestStart(), this.setProgress(0), this.xhr.send(), this.sent = !0, "function" == typeof(t = this.delegate).requestStarted ? t.requestStarted() : void 0) : void 0
                        }, t.prototype.cancel = function() {
                            return this.xhr && this.sent ? this.xhr.abort() : void 0
                        }, t.prototype.requestProgressed = function(t) {
                            return t.lengthComputable ? this.setProgress(t.loaded / t.total) : void 0
                        }, t.prototype.requestLoaded = function() {
                            return this.endRequest((e = this, function() {
                                var t;
                                return 200 <= (t = e.xhr.status) && t < 300 ? e.delegate.requestCompletedWithResponse(e.xhr.responseText, e.xhr.getResponseHeader("Turbolinks-Location")) : (e.failed = !0, e.delegate.requestFailedWithStatusCode(e.xhr.status, e.xhr.responseText))
                            }));
                            var e
                        }, t.prototype.requestFailed = function() {
                            return this.endRequest((t = this, function() {
                                return t.failed = !0, t.delegate.requestFailedWithStatusCode(t.constructor.NETWORK_FAILURE)
                            }));
                            var t
                        }, t.prototype.requestTimedOut = function() {
                            return this.endRequest((t = this, function() {
                                return t.failed = !0, t.delegate.requestFailedWithStatusCode(t.constructor.TIMEOUT_FAILURE)
                            }));
                            var t
                        }, t.prototype.requestCanceled = function() {
                            return this.endRequest()
                        }, t.prototype.notifyApplicationBeforeRequestStart = function() {
                            return c.dispatch("turbolinks:request-start", {
                                data: {
                                    url: this.url,
                                    xhr: this.xhr
                                }
                            })
                        }, t.prototype.notifyApplicationAfterRequestEnd = function() {
                            return c.dispatch("turbolinks:request-end", {
                                data: {
                                    url: this.url,
                                    xhr: this.xhr
                                }
                            })
                        }, t.prototype.createXHR = function() {
                            return this.xhr = new XMLHttpRequest, this.xhr.open("GET", this.url, !0), this.xhr.timeout = 1e3 * this.constructor.timeout, this.xhr.setRequestHeader("Accept", "text/html, application/xhtml+xml"), this.xhr.setRequestHeader("Turbolinks-Referrer", this.referrer), this.xhr.onprogress = this.requestProgressed, this.xhr.onload = this.requestLoaded, this.xhr.onerror = this.requestFailed, this.xhr.ontimeout = this.requestTimedOut, this.xhr.onabort = this.requestCanceled
                        }, t.prototype.endRequest = function(t) {
                            return this.xhr ? (this.notifyApplicationAfterRequestEnd(), null != t && t.call(this), this.destroy()) : void 0
                        }, t.prototype.setProgress = function(t) {
                            var e;
                            return this.progress = t, "function" == typeof(e = this.delegate).requestProgressed ? e.requestProgressed(this.progress) : void 0
                        }, t.prototype.destroy = function() {
                            var t;
                            return this.setProgress(1), "function" == typeof(t = this.delegate).requestFinished && t.requestFinished(), this.delegate = null, this.xhr = null
                        }, t
                    }()
                }.call(this),
                function() {
                    var i = function(t, e) {
                        return function() {
                            return t.apply(e, arguments)
                        }
                    };
                    c.ProgressBar = function() {
                        function t() {
                            this.trickle = i(this.trickle, this), this.stylesheetElement = this.createStylesheetElement(), this.progressElement = this.createProgressElement()
                        }
                        var e;
                        return e = 300, t.defaultCSS = ".turbolinks-progress-bar {\n  position: fixed;\n  display: block;\n  top: 0;\n  left: 0;\n  height: 3px;\n  background: #0076ff;\n  z-index: 9999;\n  transition: width " + e + "ms ease-out, opacity " + e / 2 + "ms " + e / 2 + "ms ease-in;\n  transform: translate3d(0, 0, 0);\n}", t.prototype.show = function() {
                            return this.visible ? void 0 : (this.visible = !0, this.installStylesheetElement(), this.installProgressElement(), this.startTrickling())
                        }, t.prototype.hide = function() {
                            return this.visible && !this.hiding ? (this.hiding = !0, this.fadeProgressElement((t = this, function() {
                                return t.uninstallProgressElement(), t.stopTrickling(), t.visible = !1, t.hiding = !1
                            }))) : void 0;
                            var t
                        }, t.prototype.setValue = function(t) {
                            return this.value = t, this.refresh()
                        }, t.prototype.installStylesheetElement = function() {
                            return document.head.insertBefore(this.stylesheetElement, document.head.firstChild)
                        }, t.prototype.installProgressElement = function() {
                            return this.progressElement.style.width = 0, this.progressElement.style.opacity = 1, document.documentElement.insertBefore(this.progressElement, document.body), this.refresh()
                        }, t.prototype.fadeProgressElement = function(t) {
                            return this.progressElement.style.opacity = 0, setTimeout(t, 1.5 * e)
                        }, t.prototype.uninstallProgressElement = function() {
                            return this.progressElement.parentNode ? document.documentElement.removeChild(this.progressElement) : void 0
                        }, t.prototype.startTrickling = function() {
                            return null != this.trickleInterval ? this.trickleInterval : this.trickleInterval = setInterval(this.trickle, e)
                        }, t.prototype.stopTrickling = function() {
                            return clearInterval(this.trickleInterval), this.trickleInterval = null
                        }, t.prototype.trickle = function() {
                            return this.setValue(this.value + Math.random() / 100)
                        }, t.prototype.refresh = function() {
                            return requestAnimationFrame((t = this, function() {
                                return t.progressElement.style.width = 10 + 90 * t.value + "%"
                            }));
                            var t
                        }, t.prototype.createStylesheetElement = function() {
                            var t;
                            return (t = document.createElement("style")).type = "text/css", t.textContent = this.constructor.defaultCSS, t
                        }, t.prototype.createProgressElement = function() {
                            var t;
                            return (t = document.createElement("div")).className = "turbolinks-progress-bar", t
                        }, t
                    }()
                }.call(this),
                function() {
                    var o = function(t, e) {
                        return function() {
                            return t.apply(e, arguments)
                        }
                    };
                    c.BrowserAdapter = function() {
                        function t(t) {
                            this.controller = t, this.showProgressBar = o(this.showProgressBar, this), this.progressBar = new c.ProgressBar
                        }
                        var i, n, e;
                        return e = c.HttpRequest, i = e.NETWORK_FAILURE, n = e.TIMEOUT_FAILURE, t.prototype.visitProposedToLocationWithAction = function(t, e) {
                            return this.controller.startVisitToLocationWithAction(t, e)
                        }, t.prototype.visitStarted = function(t) {
                            return t.issueRequest(), t.changeHistory(), t.loadCachedSnapshot()
                        }, t.prototype.visitRequestStarted = function(t) {
                            return this.progressBar.setValue(0), t.hasCachedSnapshot() || "restore" !== t.action ? this.showProgressBarAfterDelay() : this.showProgressBar()
                        }, t.prototype.visitRequestProgressed = function(t) {
                            return this.progressBar.setValue(t.progress)
                        }, t.prototype.visitRequestCompleted = function(t) {
                            return t.loadResponse()
                        }, t.prototype.visitRequestFailedWithStatusCode = function(t, e) {
                            switch (e) {
                                case i:
                                case n:
                                    return this.reload();
                                default:
                                    return t.loadResponse()
                            }
                        }, t.prototype.visitRequestFinished = function() {
                            return this.hideProgressBar()
                        }, t.prototype.visitCompleted = function(t) {
                            return t.followRedirect()
                        }, t.prototype.pageInvalidated = function() {
                            return this.reload()
                        }, t.prototype.showProgressBarAfterDelay = function() {
                            return this.progressBarTimeout = setTimeout(this.showProgressBar, this.controller.progressBarDelay)
                        }, t.prototype.showProgressBar = function() {
                            return this.progressBar.show()
                        }, t.prototype.hideProgressBar = function() {
                            return this.progressBar.hide(), clearTimeout(this.progressBarTimeout)
                        }, t.prototype.reload = function() {
                            return window.location.reload()
                        }, t
                    }()
                }.call(this),
                function() {
                    var e = function(t, e) {
                        return function() {
                            return t.apply(e, arguments)
                        }
                    };
                    c.History = function() {
                        function t(t) {
                            this.delegate = t, this.onPageLoad = e(this.onPageLoad, this), this.onPopState = e(this.onPopState, this)
                        }
                        return t.prototype.start = function() {
                            return this.started ? void 0 : (addEventListener("popstate", this.onPopState, !1), addEventListener("load", this.onPageLoad, !1), this.started = !0)
                        }, t.prototype.stop = function() {
                            return this.started ? (removeEventListener("popstate", this.onPopState, !1), removeEventListener("load", this.onPageLoad, !1), this.started = !1) : void 0
                        }, t.prototype.push = function(t, e) {
                            return t = c.Location.wrap(t), this.update("push", t, e)
                        }, t.prototype.replace = function(t, e) {
                            return t = c.Location.wrap(t), this.update("replace", t, e)
                        }, t.prototype.onPopState = function(t) {
                            var e, i, n, o;
                            return this.shouldHandlePopState() && (o = null != (i = t.state) ? i.turbolinks : void 0) ? (e = c.Location.wrap(window.location), n = o.restorationIdentifier, this.delegate.historyPoppedToLocationWithRestorationIdentifier(e, n)) : void 0
                        }, t.prototype.onPageLoad = function() {
                            return c.defer((t = this, function() {
                                return t.pageLoaded = !0
                            }));
                            var t
                        }, t.prototype.shouldHandlePopState = function() {
                            return this.pageIsLoaded()
                        }, t.prototype.pageIsLoaded = function() {
                            return this.pageLoaded || "complete" === document.readyState
                        }, t.prototype.update = function(t, e, i) {
                            var n;
                            return n = {
                                turbolinks: {
                                    restorationIdentifier: i
                                }
                            }, history[t + "State"](n, null, e)
                        }, t
                    }()
                }.call(this),
                function() {
                    c.HeadDetails = function() {
                        function t(t) {
                            var e, i, n, o, r;
                            for (this.elements = {}, i = 0, o = t.length; i < o; i++)(r = t[i]).nodeType === Node.ELEMENT_NODE && (n = r.outerHTML, (null != (e = this.elements)[n] ? e[n] : e[n] = {
                                type: a(r),
                                tracked: s(r),
                                elements: []
                            }).elements.push(r))
                        }
                        var r, e, i, s, a;
                        return t.fromHeadElement = function(t) {
                            var e;
                            return new this(null != (e = null != t ? t.childNodes : void 0) ? e : [])
                        }, t.prototype.hasElementWithKey = function(t) {
                            return t in this.elements
                        }, t.prototype.getTrackedElementSignature = function() {
                            var i;
                            return function() {
                                var t, e;
                                for (i in e = [], t = this.elements) t[i].tracked && e.push(i);
                                return e
                            }.call(this).join("")
                        }, t.prototype.getScriptElementsNotInDetails = function(t) {
                            return this.getElementsMatchingTypeNotInDetails("script", t)
                        }, t.prototype.getStylesheetElementsNotInDetails = function(t) {
                            return this.getElementsMatchingTypeNotInDetails("stylesheet", t)
                        }, t.prototype.getElementsMatchingTypeNotInDetails = function(t, e) {
                            var i, n, o, r, s, a;
                            for (n in s = [], o = this.elements) a = (r = o[n]).type, i = r.elements, a !== t || e.hasElementWithKey(n) || s.push(i[0]);
                            return s
                        }, t.prototype.getProvisionalElements = function() {
                            var t, e, i, n, o, r, s;
                            for (e in i = [], n = this.elements) s = (o = n[e]).type, r = o.tracked, t = o.elements, null != s || r ? 1 < t.length && i.push.apply(i, t.slice(1)) : i.push.apply(i, t);
                            return i
                        }, t.prototype.getMetaValue = function(t) {
                            var e;
                            return null != (e = this.findMetaElementByName(t)) ? e.getAttribute("content") : void 0
                        }, t.prototype.findMetaElementByName = function(t) {
                            var e, i, n, o;
                            for (n in e = void 0, o = this.elements) i = o[n].elements, r(i[0], t) && (e = i[0]);
                            return e
                        }, a = function(t) {
                            return e(t) ? "script" : i(t) ? "stylesheet" : void 0
                        }, s = function(t) {
                            return "reload" === t.getAttribute("data-turbolinks-track")
                        }, e = function(t) {
                            return "script" === t.tagName.toLowerCase()
                        }, i = function(t) {
                            var e;
                            return "style" === (e = t.tagName.toLowerCase()) || "link" === e && "stylesheet" === t.getAttribute("rel")
                        }, r = function(t, e) {
                            return "meta" === t.tagName.toLowerCase() && t.getAttribute("name") === e
                        }, t
                    }()
                }.call(this),
                function() {
                    c.Snapshot = function() {
                        function t(t, e) {
                            this.headDetails = t, this.bodyElement = e
                        }
                        return t.wrap = function(t) {
                            return t instanceof this ? t : "string" == typeof t ? this.fromHTMLString(t) : this.fromHTMLElement(t)
                        }, t.fromHTMLString = function(t) {
                            var e;
                            return (e = document.createElement("html")).innerHTML = t, this.fromHTMLElement(e)
                        }, t.fromHTMLElement = function(t) {
                            var e, i, n;
                            return i = t.querySelector("head"), e = null != (n = t.querySelector("body")) ? n : document.createElement("body"), new this(c.HeadDetails.fromHeadElement(i), e)
                        }, t.prototype.clone = function() {
                            return new this.constructor(this.headDetails, this.bodyElement.cloneNode(!0))
                        }, t.prototype.getRootLocation = function() {
                            var t, e;
                            return e = null != (t = this.getSetting("root")) ? t : "/", new c.Location(e)
                        }, t.prototype.getCacheControlValue = function() {
                            return this.getSetting("cache-control")
                        }, t.prototype.getElementForAnchor = function(t) {
                            try {
                                return this.bodyElement.querySelector("[id='" + t + "'], a[name='" + t + "']")
                            } catch (c) {}
                        }, t.prototype.getPermanentElements = function() {
                            return this.bodyElement.querySelectorAll("[id][data-turbolinks-permanent]")
                        }, t.prototype.getPermanentElementById = function(t) {
                            return this.bodyElement.querySelector("#" + t + "[data-turbolinks-permanent]")
                        }, t.prototype.getPermanentElementsPresentInSnapshot = function(t) {
                            var e, i, n, o, r;
                            for (r = [], i = 0, n = (o = this.getPermanentElements()).length; i < n; i++) e = o[i], t.getPermanentElementById(e.id) && r.push(e);
                            return r
                        }, t.prototype.findFirstAutofocusableElement = function() {
                            return this.bodyElement.querySelector("[autofocus]")
                        }, t.prototype.hasAnchor = function(t) {
                            return null != this.getElementForAnchor(t)
                        }, t.prototype.isPreviewable = function() {
                            return "no-preview" !== this.getCacheControlValue()
                        }, t.prototype.isCacheable = function() {
                            return "no-cache" !== this.getCacheControlValue()
                        }, t.prototype.isVisitable = function() {
                            return "reload" !== this.getSetting("visit-control")
                        }, t.prototype.getSetting = function(t) {
                            return this.headDetails.getMetaValue("turbolinks-" + t)
                        }, t
                    }()
                }.call(this),
                function() {
                    var r = [].slice;
                    c.Renderer = function() {
                        function t() {}
                        var i;
                        return t.render = function(t, e) {
                            var i, n, o;
                            return n = t, i = e, (o = function(t, e, i) {
                                i.prototype = t.prototype;
                                var n = new i,
                                    o = t.apply(n, e);
                                return Object(o) === o ? o : n
                            }(this, 3 <= arguments.length ? r.call(arguments, 2) : [], function() {})).delegate = n, o.render(i), o
                        }, t.prototype.renderView = function(t) {
                            return this.delegate.viewWillRender(this.newBody), t(), this.delegate.viewRendered(this.newBody)
                        }, t.prototype.invalidateView = function() {
                            return this.delegate.viewInvalidated()
                        }, t.prototype.createScriptElement = function(t) {
                            var e;
                            return "false" === t.getAttribute("data-turbolinks-eval") ? t : ((e = document.createElement("script")).textContent = t.textContent, e.async = !1, i(e, t), e)
                        }, i = function(t, e) {
                            var i, n, o, r, s, a, l;
                            for (a = [], i = 0, n = (r = e.attributes).length; i < n; i++) o = (s = r[i]).name, l = s.value, a.push(t.setAttribute(o, l));
                            return a
                        }, t
                    }()
                }.call(this),
                function() {
                    var a, l, i = function(t, e) {
                            function i() {
                                this.constructor = t
                            }
                            for (var n in e) o.call(e, n) && (t[n] = e[n]);
                            return i.prototype = e.prototype, t.prototype = new i, t.__super__ = e.prototype, t
                        },
                        o = {}.hasOwnProperty;
                    c.SnapshotRenderer = function(t) {
                        function e(t, e, i) {
                            this.currentSnapshot = t, this.newSnapshot = e, this.isPreview = i, this.currentHeadDetails = this.currentSnapshot.headDetails, this.newHeadDetails = this.newSnapshot.headDetails, this.currentBody = this.currentSnapshot.bodyElement, this.newBody = this.newSnapshot.bodyElement
                        }
                        return i(e, t), e.prototype.render = function(t) {
                            return this.shouldRender() ? (this.mergeHead(), this.renderView((e = this, function() {
                                return e.replaceBody(), e.isPreview || e.focusFirstAutofocusableElement(), t()
                            }))) : this.invalidateView();
                            var e
                        }, e.prototype.mergeHead = function() {
                            return this.copyNewHeadStylesheetElements(), this.copyNewHeadScriptElements(), this.removeCurrentHeadProvisionalElements(), this.copyNewHeadProvisionalElements()
                        }, e.prototype.replaceBody = function() {
                            var t;
                            return t = this.relocateCurrentBodyPermanentElements(), this.activateNewBodyScriptElements(), this.assignNewBody(), this.replacePlaceholderElementsWithClonedPermanentElements(t)
                        }, e.prototype.shouldRender = function() {
                            return this.newSnapshot.isVisitable() && this.trackedElementsAreIdentical()
                        }, e.prototype.trackedElementsAreIdentical = function() {
                            return this.currentHeadDetails.getTrackedElementSignature() === this.newHeadDetails.getTrackedElementSignature()
                        }, e.prototype.copyNewHeadStylesheetElements = function() {
                            var t, e, i, n, o;
                            for (o = [], e = 0, i = (n = this.getNewHeadStylesheetElements()).length; e < i; e++) t = n[e], o.push(document.head.appendChild(t));
                            return o
                        }, e.prototype.copyNewHeadScriptElements = function() {
                            var t, e, i, n, o;
                            for (o = [], e = 0, i = (n = this.getNewHeadScriptElements()).length; e < i; e++) t = n[e], o.push(document.head.appendChild(this.createScriptElement(t)));
                            return o
                        }, e.prototype.removeCurrentHeadProvisionalElements = function() {
                            var t, e, i, n, o;
                            for (o = [], e = 0, i = (n = this.getCurrentHeadProvisionalElements()).length; e < i; e++) t = n[e], o.push(document.head.removeChild(t));
                            return o
                        }, e.prototype.copyNewHeadProvisionalElements = function() {
                            var t, e, i, n, o;
                            for (o = [], e = 0, i = (n = this.getNewHeadProvisionalElements()).length; e < i; e++) t = n[e], o.push(document.head.appendChild(t));
                            return o
                        }, e.prototype.relocateCurrentBodyPermanentElements = function() {
                            var t, e, i, n, o, r, s;
                            for (s = [], t = 0, e = (r = this.getCurrentBodyPermanentElements()).length; t < e; t++) n = r[t], o = a(n), i = this.newSnapshot.getPermanentElementById(n.id), l(n, o.element), l(i, n), s.push(o);
                            return s
                        }, e.prototype.replacePlaceholderElementsWithClonedPermanentElements = function(t) {
                            var e, i, n, o, r, s;
                            for (s = [], n = 0, o = t.length; n < o; n++) i = (r = t[n]).element, e = r.permanentElement.cloneNode(!0), s.push(l(i, e));
                            return s
                        }, e.prototype.activateNewBodyScriptElements = function() {
                            var t, e, i, n, o, r;
                            for (r = [], e = 0, n = (o = this.getNewBodyScriptElements()).length; e < n; e++) i = o[e], t = this.createScriptElement(i), r.push(l(i, t));
                            return r
                        }, e.prototype.assignNewBody = function() {
                            return document.body = this.newBody
                        }, e.prototype.focusFirstAutofocusableElement = function() {
                            var t;
                            return null != (t = this.newSnapshot.findFirstAutofocusableElement()) ? t.focus() : void 0
                        }, e.prototype.getNewHeadStylesheetElements = function() {
                            return this.newHeadDetails.getStylesheetElementsNotInDetails(this.currentHeadDetails)
                        }, e.prototype.getNewHeadScriptElements = function() {
                            return this.newHeadDetails.getScriptElementsNotInDetails(this.currentHeadDetails)
                        }, e.prototype.getCurrentHeadProvisionalElements = function() {
                            return this.currentHeadDetails.getProvisionalElements()
                        }, e.prototype.getNewHeadProvisionalElements = function() {
                            return this.newHeadDetails.getProvisionalElements()
                        }, e.prototype.getCurrentBodyPermanentElements = function() {
                            return this.currentSnapshot.getPermanentElementsPresentInSnapshot(this.newSnapshot)
                        }, e.prototype.getNewBodyScriptElements = function() {
                            return this.newBody.querySelectorAll("script")
                        }, e
                    }(c.Renderer), a = function(t) {
                        var e;
                        return (e = document.createElement("meta")).setAttribute("name", "turbolinks-permanent-placeholder"), e.setAttribute("content", t.id), {
                            element: e,
                            permanentElement: t
                        }
                    }, l = function(t, e) {
                        var i;
                        return (i = t.parentNode) ? i.replaceChild(e, t) : void 0
                    }
                }.call(this),
                function() {
                    var i = function(t, e) {
                            function i() {
                                this.constructor = t
                            }
                            for (var n in e) o.call(e, n) && (t[n] = e[n]);
                            return i.prototype = e.prototype, t.prototype = new i, t.__super__ = e.prototype, t
                        },
                        o = {}.hasOwnProperty;
                    c.ErrorRenderer = function(t) {
                        function e(t) {
                            var e;
                            (e = document.createElement("html")).innerHTML = t, this.newHead = e.querySelector("head"), this.newBody = e.querySelector("body")
                        }
                        return i(e, t), e.prototype.render = function(t) {
                            return this.renderView((e = this, function() {
                                return e.replaceHeadAndBody(), e.activateBodyScriptElements(), t()
                            }));
                            var e
                        }, e.prototype.replaceHeadAndBody = function() {
                            var t, e;
                            return e = document.head, t = document.body, e.parentNode.replaceChild(this.newHead, e), t.parentNode.replaceChild(this.newBody, t)
                        }, e.prototype.activateBodyScriptElements = function() {
                            var t, e, i, n, o, r;
                            for (r = [], e = 0, i = (n = this.getScriptElements()).length; e < i; e++) o = n[e], t = this.createScriptElement(o), r.push(o.parentNode.replaceChild(t, o));
                            return r
                        }, e.prototype.getScriptElements = function() {
                            return document.documentElement.querySelectorAll("script")
                        }, e
                    }(c.Renderer)
                }.call(this),
                function() {
                    c.View = function() {
                        function t(t) {
                            this.delegate = t, this.htmlElement = document.documentElement
                        }
                        return t.prototype.getRootLocation = function() {
                            return this.getSnapshot().getRootLocation()
                        }, t.prototype.getElementForAnchor = function(t) {
                            return this.getSnapshot().getElementForAnchor(t)
                        }, t.prototype.getSnapshot = function() {
                            return c.Snapshot.fromHTMLElement(this.htmlElement)
                        }, t.prototype.render = function(t, e) {
                            var i, n, o;
                            return o = t.snapshot, i = t.error, n = t.isPreview, this.markAsPreview(n), null != o ? this.renderSnapshot(o, n, e) : this.renderError(i, e)
                        }, t.prototype.markAsPreview = function(t) {
                            return t ? this.htmlElement.setAttribute("data-turbolinks-preview", "") : this.htmlElement.removeAttribute("data-turbolinks-preview")
                        }, t.prototype.renderSnapshot = function(t, e, i) {
                            return c.SnapshotRenderer.render(this.delegate, i, this.getSnapshot(), c.Snapshot.wrap(t), e)
                        }, t.prototype.renderError = function(t, e) {
                            return c.ErrorRenderer.render(this.delegate, e, t)
                        }, t
                    }()
                }.call(this),
                function() {
                    var e = function(t, e) {
                        return function() {
                            return t.apply(e, arguments)
                        }
                    };
                    c.ScrollManager = function() {
                        function t(t) {
                            this.delegate = t, this.onScroll = e(this.onScroll, this), this.onScroll = c.throttle(this.onScroll)
                        }
                        return t.prototype.start = function() {
                            return this.started ? void 0 : (addEventListener("scroll", this.onScroll, !1), this.onScroll(), this.started = !0)
                        }, t.prototype.stop = function() {
                            return this.started ? (removeEventListener("scroll", this.onScroll, !1), this.started = !1) : void 0
                        }, t.prototype.scrollToElement = function(t) {
                            return t.scrollIntoView()
                        }, t.prototype.scrollToPosition = function(t) {
                            var e, i;
                            return e = t.x, i = t.y, window.scrollTo(e, i)
                        }, t.prototype.onScroll = function() {
                            return this.updatePosition({
                                x: window.pageXOffset,
                                y: window.pageYOffset
                            })
                        }, t.prototype.updatePosition = function(t) {
                            var e;
                            return this.position = t, null != (e = this.delegate) ? e.scrollPositionChanged(this.position) : void 0
                        }, t
                    }()
                }.call(this),
                function() {
                    c.SnapshotCache = function() {
                        function t(t) {
                            this.size = t, this.keys = [], this.snapshots = {}
                        }
                        var n;
                        return t.prototype.has = function(t) {
                            return n(t) in this.snapshots
                        }, t.prototype.get = function(t) {
                            var e;
                            if (this.has(t)) return e = this.read(t), this.touch(t), e
                        }, t.prototype.put = function(t, e) {
                            return this.write(t, e), this.touch(t), e
                        }, t.prototype.read = function(t) {
                            var e;
                            return e = n(t), this.snapshots[e]
                        }, t.prototype.write = function(t, e) {
                            var i;
                            return i = n(t), this.snapshots[i] = e
                        }, t.prototype.touch = function(t) {
                            var e, i;
                            return i = n(t), -1 < (e = this.keys.indexOf(i)) && this.keys.splice(e, 1), this.keys.unshift(i), this.trim()
                        }, t.prototype.trim = function() {
                            var t, e, i, n, o;
                            for (o = [], t = 0, i = (n = this.keys.splice(this.size)).length; t < i; t++) e = n[t], o.push(delete this.snapshots[e]);
                            return o
                        }, n = function(t) {
                            return c.Location.wrap(t).toCacheKey()
                        }, t
                    }()
                }.call(this),
                function() {
                    var n = function(t, e) {
                        return function() {
                            return t.apply(e, arguments)
                        }
                    };
                    c.Visit = function() {
                        function t(t, e, i) {
                            this.controller = t, this.action = i, this.performScroll = n(this.performScroll, this), this.identifier = c.uuid(), this.location = c.Location.wrap(e), this.adapter = this.controller.adapter, this.state = "initialized", this.timingMetrics = {}
                        }
                        var i;
                        return t.prototype.start = function() {
                            return "initialized" === this.state ? (this.recordTimingMetric("visitStart"), this.state = "started", this.adapter.visitStarted(this)) : void 0
                        }, t.prototype.cancel = function() {
                            var t;
                            return "started" === this.state ? (null != (t = this.request) && t.cancel(), this.cancelRender(), this.state = "canceled") : void 0
                        }, t.prototype.complete = function() {
                            var t;
                            return "started" === this.state ? (this.recordTimingMetric("visitEnd"), this.state = "completed", "function" == typeof(t = this.adapter).visitCompleted && t.visitCompleted(this), this.controller.visitCompleted(this)) : void 0
                        }, t.prototype.fail = function() {
                            var t;
                            return "started" === this.state ? (this.state = "failed", "function" == typeof(t = this.adapter).visitFailed ? t.visitFailed(this) : void 0) : void 0
                        }, t.prototype.changeHistory = function() {
                            var t, e;
                            return this.historyChanged ? void 0 : (t = this.location.isEqualTo(this.referrer) ? "replace" : this.action, e = i(t), this.controller[e](this.location, this.restorationIdentifier), this.historyChanged = !0)
                        }, t.prototype.issueRequest = function() {
                            return this.shouldIssueRequest() && null == this.request ? (this.progress = 0, this.request = new c.HttpRequest(this, this.location, this.referrer), this.request.send()) : void 0
                        }, t.prototype.getCachedSnapshot = function() {
                            var t;
                            return !(t = this.controller.getCachedSnapshotForLocation(this.location)) || null != this.location.anchor && !t.hasAnchor(this.location.anchor) || "restore" !== this.action && !t.isPreviewable() ? void 0 : t
                        }, t.prototype.hasCachedSnapshot = function() {
                            return null != this.getCachedSnapshot()
                        }, t.prototype.loadCachedSnapshot = function() {
                            var e, i;
                            return (i = this.getCachedSnapshot()) ? (e = this.shouldIssueRequest(), this.render(function() {
                                var t;
                                return this.cacheSnapshot(), this.controller.render({
                                    snapshot: i,
                                    isPreview: e
                                }, this.performScroll), "function" == typeof(t = this.adapter).visitRendered && t.visitRendered(this), e ? void 0 : this.complete()
                            })) : void 0
                        }, t.prototype.loadResponse = function() {
                            return null != this.response ? this.render(function() {
                                var t, e;
                                return this.cacheSnapshot(), this.request.failed ? (this.controller.render({
                                    error: this.response
                                }, this.performScroll), "function" == typeof(t = this.adapter).visitRendered && t.visitRendered(this), this.fail()) : (this.controller.render({
                                    snapshot: this.response
                                }, this.performScroll), "function" == typeof(e = this.adapter).visitRendered && e.visitRendered(this), this.complete())
                            }) : void 0
                        }, t.prototype.followRedirect = function() {
                            return this.redirectedToLocation && !this.followedRedirect ? (this.location = this.redirectedToLocation, this.controller.replaceHistoryWithLocationAndRestorationIdentifier(this.redirectedToLocation, this.restorationIdentifier), this.followedRedirect = !0) : void 0
                        }, t.prototype.requestStarted = function() {
                            var t;
                            return this.recordTimingMetric("requestStart"), "function" == typeof(t = this.adapter).visitRequestStarted ? t.visitRequestStarted(this) : void 0
                        }, t.prototype.requestProgressed = function(t) {
                            var e;
                            return this.progress = t, "function" == typeof(e = this.adapter).visitRequestProgressed ? e.visitRequestProgressed(this) : void 0
                        }, t.prototype.requestCompletedWithResponse = function(t, e) {
                            return this.response = t, null != e && (this.redirectedToLocation = c.Location.wrap(e)), this.adapter.visitRequestCompleted(this)
                        }, t.prototype.requestFailedWithStatusCode = function(t, e) {
                            return this.response = e, this.adapter.visitRequestFailedWithStatusCode(this, t)
                        }, t.prototype.requestFinished = function() {
                            var t;
                            return this.recordTimingMetric("requestEnd"), "function" == typeof(t = this.adapter).visitRequestFinished ? t.visitRequestFinished(this) : void 0
                        }, t.prototype.performScroll = function() {
                            return this.scrolled ? void 0 : ("restore" === this.action ? this.scrollToRestoredPosition() || this.scrollToTop() : this.scrollToAnchor() || this.scrollToTop(), this.scrolled = !0)
                        }, t.prototype.scrollToRestoredPosition = function() {
                            var t, e;
                            return null != (t = null != (e = this.restorationData) ? e.scrollPosition : void 0) ? (this.controller.scrollToPosition(t), !0) : void 0
                        }, t.prototype.scrollToAnchor = function() {
                            return null != this.location.anchor ? (this.controller.scrollToAnchor(this.location.anchor), !0) : void 0
                        }, t.prototype.scrollToTop = function() {
                            return this.controller.scrollToPosition({
                                x: 0,
                                y: 0
                            })
                        }, t.prototype.recordTimingMetric = function(t) {
                            var e;
                            return null != (e = this.timingMetrics)[t] ? e[t] : e[t] = (new Date).getTime()
                        }, t.prototype.getTimingMetrics = function() {
                            return c.copyObject(this.timingMetrics)
                        }, i = function(t) {
                            switch (t) {
                                case "replace":
                                    return "replaceHistoryWithLocationAndRestorationIdentifier";
                                case "advance":
                                case "restore":
                                    return "pushHistoryWithLocationAndRestorationIdentifier"
                            }
                        }, t.prototype.shouldIssueRequest = function() {
                            return "restore" !== this.action || !this.hasCachedSnapshot()
                        }, t.prototype.cacheSnapshot = function() {
                            return this.snapshotCached ? void 0 : (this.controller.cacheSnapshot(), this.snapshotCached = !0)
                        }, t.prototype.render = function(t) {
                            return this.cancelRender(), this.frame = requestAnimationFrame((e = this, function() {
                                return e.frame = null, t.call(e)
                            }));
                            var e
                        }, t.prototype.cancelRender = function() {
                            return this.frame ? cancelAnimationFrame(this.frame) : void 0
                        }, t
                    }()
                }.call(this),
                function() {
                    var e = function(t, e) {
                        return function() {
                            return t.apply(e, arguments)
                        }
                    };
                    c.Controller = function() {
                        function t() {
                            this.clickBubbled = e(this.clickBubbled, this), this.clickCaptured = e(this.clickCaptured, this), this.pageLoaded = e(this.pageLoaded, this), this.history = new c.History(this), this.view = new c.View(this), this.scrollManager = new c.ScrollManager(this), this.restorationData = {}, this.clearCache(), this.setProgressBarDelay(500)
                        }
                        return t.prototype.start = function() {
                            return c.supported && !this.started ? (addEventListener("click", this.clickCaptured, !0), addEventListener("DOMContentLoaded", this.pageLoaded, !1), this.scrollManager.start(), this.startHistory(), this.started = !0, this.enabled = !0) : void 0
                        }, t.prototype.disable = function() {
                            return this.enabled = !1
                        }, t.prototype.stop = function() {
                            return this.started ? (removeEventListener("click", this.clickCaptured, !0), removeEventListener("DOMContentLoaded", this.pageLoaded, !1), this.scrollManager.stop(), this.stopHistory(), this.started = !1) : void 0
                        }, t.prototype.clearCache = function() {
                            return this.cache = new c.SnapshotCache(10)
                        }, t.prototype.visit = function(t, e) {
                            var i, n;
                            return null == e && (e = {}), t = c.Location.wrap(t), this.applicationAllowsVisitingLocation(t) ? this.locationIsVisitable(t) ? (i = null != (n = e.action) ? n : "advance", this.adapter.visitProposedToLocationWithAction(t, i)) : window.location = t : void 0
                        }, t.prototype.startVisitToLocationWithAction = function(t, e, i) {
                            var n;
                            return c.supported ? (n = this.getRestorationDataForIdentifier(i), this.startVisit(t, e, {
                                restorationData: n
                            })) : window.location = t
                        }, t.prototype.setProgressBarDelay = function(t) {
                            return this.progressBarDelay = t
                        }, t.prototype.startHistory = function() {
                            return this.location = c.Location.wrap(window.location), this.restorationIdentifier = c.uuid(), this.history.start(), this.history.replace(this.location, this.restorationIdentifier)
                        }, t.prototype.stopHistory = function() {
                            return this.history.stop()
                        }, t.prototype.pushHistoryWithLocationAndRestorationIdentifier = function(t, e) {
                            return this.restorationIdentifier = e, this.location = c.Location.wrap(t), this.history.push(this.location, this.restorationIdentifier)
                        }, t.prototype.replaceHistoryWithLocationAndRestorationIdentifier = function(t, e) {
                            return this.restorationIdentifier = e, this.location = c.Location.wrap(t), this.history.replace(this.location, this.restorationIdentifier)
                        }, t.prototype.historyPoppedToLocationWithRestorationIdentifier = function(t, e) {
                            var i;
                            return this.restorationIdentifier = e, this.enabled ? (i = this.getRestorationDataForIdentifier(this.restorationIdentifier), this.startVisit(t, "restore", {
                                restorationIdentifier: this.restorationIdentifier,
                                restorationData: i,
                                historyChanged: !0
                            }), this.location = c.Location.wrap(t)) : this.adapter.pageInvalidated()
                        }, t.prototype.getCachedSnapshotForLocation = function(t) {
                            var e;
                            return null != (e = this.cache.get(t)) ? e.clone() : void 0
                        }, t.prototype.shouldCacheSnapshot = function() {
                            return this.view.getSnapshot().isCacheable()
                        }, t.prototype.cacheSnapshot = function() {
                            var t, e, i;
                            return this.shouldCacheSnapshot() ? (this.notifyApplicationBeforeCachingSnapshot(), e = this.view.getSnapshot(), t = this.lastRenderedLocation, c.defer((i = this, function() {
                                return i.cache.put(t, e.clone())
                            }))) : void 0
                        }, t.prototype.scrollToAnchor = function(t) {
                            var e;
                            return (e = this.view.getElementForAnchor(t)) ? this.scrollToElement(e) : this.scrollToPosition({
                                x: 0,
                                y: 0
                            })
                        }, t.prototype.scrollToElement = function(t) {
                            return this.scrollManager.scrollToElement(t)
                        }, t.prototype.scrollToPosition = function(t) {
                            return this.scrollManager.scrollToPosition(t)
                        }, t.prototype.scrollPositionChanged = function(t) {
                            return this.getCurrentRestorationData().scrollPosition = t
                        }, t.prototype.render = function(t, e) {
                            return this.view.render(t, e)
                        }, t.prototype.viewInvalidated = function() {
                            return this.adapter.pageInvalidated()
                        }, t.prototype.viewWillRender = function(t) {
                            return this.notifyApplicationBeforeRender(t)
                        }, t.prototype.viewRendered = function() {
                            return this.lastRenderedLocation = this.currentVisit.location, this.notifyApplicationAfterRender()
                        }, t.prototype.pageLoaded = function() {
                            return this.lastRenderedLocation = this.location, this.notifyApplicationAfterPageLoad()
                        }, t.prototype.clickCaptured = function() {
                            return removeEventListener("click", this.clickBubbled, !1), addEventListener("click", this.clickBubbled, !1)
                        }, t.prototype.clickBubbled = function(t) {
                            var e, i, n;
                            return this.enabled && this.clickEventIsSignificant(t) && (i = this.getVisitableLinkForNode(t.target)) && (n = this.getVisitableLocationForLink(i)) && this.applicationAllowsFollowingLinkToLocation(i, n) ? (t.preventDefault(), e = this.getActionForLink(i), this.visit(n, {
                                action: e
                            })) : void 0
                        }, t.prototype.applicationAllowsFollowingLinkToLocation = function(t, e) {
                            return !this.notifyApplicationAfterClickingLinkToLocation(t, e).defaultPrevented
                        }, t.prototype.applicationAllowsVisitingLocation = function(t) {
                            return !this.notifyApplicationBeforeVisitingLocation(t).defaultPrevented
                        }, t.prototype.notifyApplicationAfterClickingLinkToLocation = function(t, e) {
                            return c.dispatch("turbolinks:click", {
                                target: t,
                                data: {
                                    url: e.absoluteURL
                                },
                                cancelable: !0
                            })
                        }, t.prototype.notifyApplicationBeforeVisitingLocation = function(t) {
                            return c.dispatch("turbolinks:before-visit", {
                                data: {
                                    url: t.absoluteURL
                                },
                                cancelable: !0
                            })
                        }, t.prototype.notifyApplicationAfterVisitingLocation = function(t) {
                            return c.dispatch("turbolinks:visit", {
                                data: {
                                    url: t.absoluteURL
                                }
                            })
                        }, t.prototype.notifyApplicationBeforeCachingSnapshot = function() {
                            return c.dispatch("turbolinks:before-cache")
                        }, t.prototype.notifyApplicationBeforeRender = function(t) {
                            return c.dispatch("turbolinks:before-render", {
                                data: {
                                    newBody: t
                                }
                            })
                        }, t.prototype.notifyApplicationAfterRender = function() {
                            return c.dispatch("turbolinks:render")
                        }, t.prototype.notifyApplicationAfterPageLoad = function(t) {
                            return null == t && (t = {}), c.dispatch("turbolinks:load", {
                                data: {
                                    url: this.location.absoluteURL,
                                    timing: t
                                }
                            })
                        }, t.prototype.startVisit = function(t, e, i) {
                            var n;
                            return null != (n = this.currentVisit) && n.cancel(), this.currentVisit = this.createVisit(t, e, i), this.currentVisit.start(), this.notifyApplicationAfterVisitingLocation(t)
                        }, t.prototype.createVisit = function(t, e, i) {
                            var n, o, r, s, a;
                            return s = (o = null != i ? i : {}).restorationIdentifier, r = o.restorationData, n = o.historyChanged, (a = new c.Visit(this, t, e)).restorationIdentifier = null != s ? s : c.uuid(), a.restorationData = c.copyObject(r), a.historyChanged = n, a.referrer = this.location, a
                        }, t.prototype.visitCompleted = function(t) {
                            return this.notifyApplicationAfterPageLoad(t.getTimingMetrics())
                        }, t.prototype.clickEventIsSignificant = function(t) {
                            return !(t.defaultPrevented || t.target.isContentEditable || 1 < t.which || t.altKey || t.ctrlKey || t.metaKey || t.shiftKey)
                        }, t.prototype.getVisitableLinkForNode = function(t) {
                            return this.nodeIsVisitable(t) ? c.closest(t, "a[href]:not([target]):not([download])") : void 0
                        }, t.prototype.getVisitableLocationForLink = function(t) {
                            var e;
                            return e = new c.Location(t.getAttribute("href")), this.locationIsVisitable(e) ? e : void 0
                        }, t.prototype.getActionForLink = function(t) {
                            var e;
                            return null != (e = t.getAttribute("data-turbolinks-action")) ? e : "advance"
                        }, t.prototype.nodeIsVisitable = function(t) {
                            var e;
                            return !(e = c.closest(t, "[data-turbolinks]")) || "false" !== e.getAttribute("data-turbolinks")
                        }, t.prototype.locationIsVisitable = function(t) {
                            return t.isPrefixedBy(this.view.getRootLocation()) && t.isHTML()
                        }, t.prototype.getCurrentRestorationData = function() {
                            return this.getRestorationDataForIdentifier(this.restorationIdentifier)
                        }, t.prototype.getRestorationDataForIdentifier = function(t) {
                            var e;
                            return null != (e = this.restorationData)[t] ? e[t] : e[t] = {}
                        }, t
                    }()
                }.call(this),
                function() {
                    ! function() {
                        var t, e;
                        if ((t = e = document.currentScript) && !e.hasAttribute("data-turbolinks-suppress-warning"))
                            for (; t = t.parentNode;)
                                if (t === document.body) return console.warn("You are loading Turbolinks from a <script> element inside the <body> element. This is probably not what you meant to do!\n\nLoad your application\u2019s JavaScript bundle inside the <head> element instead. <script> elements in <body> are evaluated with each page change.\n\nFor more information, see: https://github.com/turbolinks/turbolinks#working-with-script-elements\n\n\u2014\u2014\nSuppress this warning by adding a `data-turbolinks-suppress-warning` attribute to: %s", e.outerHTML)
                    }()
                }.call(this),
                function() {
                    var t, e, i;
                    c.start = function() {
                        return e() ? (null == c.controller && (c.controller = t()), c.controller.start()) : void 0
                    }, e = function() {
                        return null == window.Turbolinks && (window.Turbolinks = c), i()
                    }, t = function() {
                        var t;
                        return (t = new c.Controller).adapter = new c.BrowserAdapter(t), t
                    }, (i = function() {
                        return window.Turbolinks === c
                    })() && c.start()
                }.call(this)
        }).call(this), "object" == typeof module && module.exports ? module.exports = c : "function" == typeof define && define.amd && define(c)
    }.call(this), function(t, e) {
        "use strict";
        "object" == typeof module && "object" == typeof module.exports ? module.exports = t.document ? e(t, !0) : function(t) {
            if (!t.document) throw new Error("jQuery requires a window with a document");
            return e(t)
        } : e(t)
    }("undefined" != typeof window ? window : this, function(C, t) {
        "use strict";

        function g(t, e, i) {
            var n, o = (e = e || st).createElement("script");
            if (o.text = t, i)
                for (n in xt) i[n] && (o[n] = i[n]);
            e.head.appendChild(o).parentNode.removeChild(o)
        }

        function m(t) {
            return null == t ? t + "" : "object" == typeof t || "function" == typeof t ? dt[pt.call(t)] || "object" : typeof t
        }

        function a(t) {
            var e = !!t && "length" in t && t.length,
                i = m(t);
            return !yt(t) && !bt(t) && ("array" === i || 0 === e || "number" == typeof e && 0 < e && e - 1 in t)
        }

        function h(t, e) {
            return t.nodeName && t.nodeName.toLowerCase() === e.toLowerCase()
        }

        function e(t, i, n) {
            return yt(i) ? wt.grep(t, function(t, e) {
                return !!i.call(t, e, t) !== n
            }) : i.nodeType ? wt.grep(t, function(t) {
                return t === i !== n
            }) : "string" != typeof i ? wt.grep(t, function(t) {
                return -1 < ut.call(i, t) !== n
            }) : wt.filter(i, t, n)
        }

        function i(t, e) {
            for (;
                (t = t[e]) && 1 !== t.nodeType;);
            return t
        }

        function c(t) {
            var i = {};
            return wt.each(t.match(Dt) || [], function(t, e) {
                i[e] = !0
            }), i
        }

        function u(t) {
            return t
        }

        function d(t) {
            throw t
        }

        function l(t, e, i, n) {
            var o;
            try {
                t && yt(o = t.promise) ? o.call(t).done(e).fail(i) : t && yt(o = t.then) ? o.call(t, e, i) : e.apply(void 0, [t].slice(n))
            } catch (t) {
                i.apply(void 0, [t])
            }
        }

        function n() {
            st.removeEventListener("DOMContentLoaded", n), C.removeEventListener("load", n), wt.ready()
        }

        function o(t, e) {
            return e.toUpperCase()
        }

        function p(t) {
            return t.replace(Rt, "ms-").replace(Ht, o)
        }

        function r() {
            this.expando = wt.expando + r.uid++
        }

        function s(t) {
            return "true" === t || "false" !== t && ("null" === t ? null : t === +t + "" ? +t : jt.test(t) ? JSON.parse(t) : t)
        }

        function f(t, e, i) {
            var n;
            if (void 0 === i && 1 === t.nodeType)
                if (n = "data-" + e.replace(Ft, "-$&").toLowerCase(), "string" == typeof(i = t.getAttribute(n))) {
                    try {
                        i = s(i)
                    } catch (t) {}
                    Wt.set(t, e, i)
                } else i = void 0;
            return i
        }

        function v(t, e, i, n) {
            var o, r, s = 20,
                a = n ? function() {
                    return n.cur()
                } : function() {
                    return wt.css(t, e, "")
                },
                l = a(),
                h = i && i[3] || (wt.cssNumber[e] ? "" : "px"),
                c = (wt.cssNumber[e] || "px" !== h && +l) && Gt.exec(wt.css(t, e));
            if (c && c[3] !== h) {
                for (l /= 2, h = h || c[3], c = +l || 1; s--;) wt.style(t, e, c + h), (1 - r) * (1 - (r = a() / l || .5)) <= 0 && (s = 0), c /= r;
                c *= 2, wt.style(t, e, c + h), i = i || []
            }
            return i && (c = +c || +l || 0, o = i[1] ? c + (i[1] + 1) * i[2] : +i[2], n && (n.unit = h, n.start = c, n.end = o)), o
        }

        function y(t) {
            var e, i = t.ownerDocument,
                n = t.nodeName,
                o = Yt[n];
            return o || (e = i.body.appendChild(i.createElement(n)), o = wt.css(e, "display"), e.parentNode.removeChild(e), "none" === o && (o = "block"), Yt[n] = o)
        }

        function b(t, e) {
            for (var i, n, o = [], r = 0, s = t.length; r < s; r++)(n = t[r]).style && (i = n.style.display, e ? ("none" === i && (o[r] = Bt.get(n, "display") || null, o[r] || (n.style.display = "")), "" === n.style.display && Vt(n) && (o[r] = y(n))) : "none" !== i && (o[r] = "none", Bt.set(n, "display", i)));
            for (r = 0; r < s; r++) null != o[r] && (t[r].style.display = o[r]);
            return t
        }

        function x(t, e) {
            var i;
            return i = "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e || "*") : "undefined" != typeof t.querySelectorAll ? t.querySelectorAll(e || "*") : [], void 0 === e || e && h(t, e) ? wt.merge([t], i) : i
        }

        function w(t, e) {
            for (var i = 0, n = t.length; i < n; i++) Bt.set(t[i], "globalEval", !e || Bt.get(e[i], "globalEval"))
        }

        function T(t, e, i, n, o) {
            for (var r, s, a, l, h, c, u = e.createDocumentFragment(), d = [], p = 0, f = t.length; p < f; p++)
                if ((r = t[p]) || 0 === r)
                    if ("object" === m(r)) wt.merge(d, r.nodeType ? [r] : r);
                    else if (ee.test(r)) {
                for (s = s || u.appendChild(e.createElement("div")), a = ($t.exec(r) || ["", ""])[1].toLowerCase(), l = Zt[a] || Zt._default, s.innerHTML = l[1] + wt.htmlPrefilter(r) + l[2], c = l[0]; c--;) s = s.lastChild;
                wt.merge(d, s.childNodes), (s = u.firstChild).textContent = ""
            } else d.push(e.createTextNode(r));
            for (u.textContent = "", p = 0; r = d[p++];)
                if (n && -1 < wt.inArray(r, n)) o && o.push(r);
                else if (h = wt.contains(r.ownerDocument, r), s = x(u.appendChild(r), "script"), h && w(s), i)
                for (c = 0; r = s[c++];) Qt.test(r.type || "") && i.push(r);
            return u
        }

        function S() {
            return !0
        }

        function E() {
            return !1
        }

        function A() {
            try {
                return st.activeElement
            } catch (C) {}
        }

        function k(t, e, i, n, o, r) {
            var s, a;
            if ("object" == typeof e) {
                for (a in "string" != typeof i && (n = n || i, i = void 0), e) k(t, a, i, n, e[a], r);
                return t
            }
            if (null == n && null == o ? (o = i, n = i = void 0) : null == o && ("string" == typeof i ? (o = n, n = void 0) : (o = n, n = i, i = void 0)), !1 === o) o = E;
            else if (!o) return t;
            return 1 === r && (s = o, (o = function(t) {
                return wt().off(t), s.apply(this, arguments)
            }).guid = s.guid || (s.guid = wt.guid++)), t.each(function() {
                wt.event.add(this, e, o, n, i)
            })
        }

        function _(t, e) {
            return h(t, "table") && h(11 !== e.nodeType ? e : e.firstChild, "tr") && wt(t).children("tbody")[0] || t
        }

        function M(t) {
            return t.type = (null !== t.getAttribute("type")) + "/" + t.type, t
        }

        function O(t) {
            return "true/" === (t.type || "").slice(0, 5) ? t.type = t.type.slice(5) : t.removeAttribute("type"), t
        }

        function L(t, e) {
            var i, n, o, r, s, a, l, h;
            if (1 === e.nodeType) {
                if (Bt.hasData(t) && (r = Bt.access(t), s = Bt.set(e, r), h = r.events))
                    for (o in delete s.handle, s.events = {}, h)
                        for (i = 0, n = h[o].length; i < n; i++) wt.event.add(e, o, h[o][i]);
                Wt.hasData(t) && (a = Wt.access(t), l = wt.extend({}, a), Wt.set(e, l))
            }
        }

        function D(t, e) {
            var i = e.nodeName.toLowerCase();
            "input" === i && Kt.test(t.type) ? e.checked = t.checked : "input" !== i && "textarea" !== i || (e.defaultValue = t.defaultValue)
        }

        function I(i, n, o, r) {
            n = ht.apply([], n);
            var t, e, s, a, l, h, c = 0,
                u = i.length,
                d = u - 1,
                p = n[0],
                f = yt(p);
            if (f || 1 < u && "string" == typeof p && !vt.checkClone && le.test(p)) return i.each(function(t) {
                var e = i.eq(t);
                f && (n[0] = p.call(this, t, e.html())), I(e, n, o, r)
            });
            if (u && (e = (t = T(n, i[0].ownerDocument, !1, i, r)).firstChild, 1 === t.childNodes.length && (t = e), e || r)) {
                for (a = (s = wt.map(x(t, "script"), M)).length; c < u; c++) l = t, c !== d && (l = wt.clone(l, !0, !0), a && wt.merge(s, x(l, "script"))), o.call(i[c], l, c);
                if (a)
                    for (h = s[s.length - 1].ownerDocument, wt.map(s, O), c = 0; c < a; c++) l = s[c], Qt.test(l.type || "") && !Bt.access(l, "globalEval") && wt.contains(h, l) && (l.src && "module" !== (l.type || "").toLowerCase() ? wt._evalUrl && wt._evalUrl(l.src) : g(l.textContent.replace(he, ""), h, l))
            }
            return i
        }

        function P(t, e, i) {
            for (var n, o = e ? wt.filter(e, t) : t, r = 0; null != (n = o[r]); r++) i || 1 !== n.nodeType || wt.cleanData(x(n)), n.parentNode && (i && wt.contains(n.ownerDocument, n) && w(x(n, "script")), n.parentNode.removeChild(n));
            return t
        }

        function N(t, e, i) {
            var n, o, r, s, a = t.style;
            return (i = i || ue(t)) && ("" !== (s = i.getPropertyValue(e) || i[e]) || wt.contains(t.ownerDocument, t) || (s = wt.style(t, e)), !vt.pixelBoxStyles() && ce.test(s) && de.test(e) && (n = a.width, o = a.minWidth, r = a.maxWidth, a.minWidth = a.maxWidth = a.width = s, s = i.width, a.width = n, a.minWidth = o, a.maxWidth = r)), void 0 !== s ? s + "" : s
        }

        function R(t, e) {
            return {
                get: function() {
                    if (!t()) return (this.get = e).apply(this, arguments);
                    delete this.get
                }
            }
        }

        function H(t) {
            if (t in ye) return t;
            for (var e = t[0].toUpperCase() + t.slice(1), i = ve.length; i--;)
                if ((t = ve[i] + e) in ye) return t
        }

        function z(t) {
            var e = wt.cssProps[t];
            return e || (e = wt.cssProps[t] = H(t) || t), e
        }

        function B(t, e, i) {
            var n = Gt.exec(e);
            return n ? Math.max(0, n[2] - (i || 0)) + (n[3] || "px") : e
        }

        function W(t, e, i, n, o, r) {
            var s = "width" === e ? 1 : 0,
                a = 0,
                l = 0;
            if (i === (n ? "border" : "content")) return 0;
            for (; s < 4; s += 2) "margin" === i && (l += wt.css(t, i + Ut[s], !0, o)), n ? ("content" === i && (l -= wt.css(t, "padding" + Ut[s], !0, o)), "margin" !== i && (l -= wt.css(t, "border" + Ut[s] + "Width", !0, o))) : (l += wt.css(t, "padding" + Ut[s], !0, o), "padding" !== i ? l += wt.css(t, "border" + Ut[s] + "Width", !0, o) : a += wt.css(t, "border" + Ut[s] + "Width", !0, o));
            return !n && 0 <= r && (l += Math.max(0, Math.ceil(t["offset" + e[0].toUpperCase() + e.slice(1)] - r - l - a - .5))), l
        }

        function j(t, e, i) {
            var n = ue(t),
                o = N(t, e, n),
                r = "border-box" === wt.css(t, "boxSizing", !1, n),
                s = r;
            if (ce.test(o)) {
                if (!i) return o;
                o = "auto"
            }
            return s = s && (vt.boxSizingReliable() || o === t.style[e]), ("auto" === o || !parseFloat(o) && "inline" === wt.css(t, "display", !1, n)) && (o = t["offset" + e[0].toUpperCase() + e.slice(1)], s = !0), (o = parseFloat(o) || 0) + W(t, e, i || (r ? "border" : "content"), s, n, o) + "px"
        }

        function F(t, e, i, n, o) {
            return new F.prototype.init(t, e, i, n, o)
        }

        function q() {
            xe && (!1 === st.hidden && C.requestAnimationFrame ? C.requestAnimationFrame(q) : C.setTimeout(q, wt.fx.interval), wt.fx.tick())
        }

        function G() {
            return C.setTimeout(function() {
                be = void 0
            }), be = Date.now()
        }

        function U(t, e) {
            var i, n = 0,
                o = {
                    height: t
                };
            for (e = e ? 1 : 0; n < 4; n += 2 - e) o["margin" + (i = Ut[n])] = o["padding" + i] = t;
            return e && (o.opacity = o.width = t), o
        }

        function V(t, e, i) {
            for (var n, o = (K.tweeners[e] || []).concat(K.tweeners["*"]), r = 0, s = o.length; r < s; r++)
                if (n = o[r].call(i, e, t)) return n
        }

        function X(t, e, i) {
            var n, o, r, s, a, l, h, c, u = "width" in e || "height" in e,
                d = this,
                p = {},
                f = t.style,
                g = t.nodeType && Vt(t),
                m = Bt.get(t, "fxshow");
            for (n in i.queue || (null == (s = wt._queueHooks(t, "fx")).unqueued && (s.unqueued = 0, a = s.empty.fire, s.empty.fire = function() {
                    s.unqueued || a()
                }), s.unqueued++, d.always(function() {
                    d.always(function() {
                        s.unqueued--, wt.queue(t, "fx").length || s.empty.fire()
                    })
                })), e)
                if (o = e[n], Ce.test(o)) {
                    if (delete e[n], r = r || "toggle" === o, o === (g ? "hide" : "show")) {
                        if ("show" !== o || !m || void 0 === m[n]) continue;
                        g = !0
                    }
                    p[n] = m && m[n] || wt.style(t, n)
                }
            if ((l = !wt.isEmptyObject(e)) || !wt.isEmptyObject(p))
                for (n in u && 1 === t.nodeType && (i.overflow = [f.overflow, f.overflowX, f.overflowY], null == (h = m && m.display) && (h = Bt.get(t, "display")), "none" === (c = wt.css(t, "display")) && (h ? c = h : (b([t], !0), h = t.style.display || h, c = wt.css(t, "display"), b([t]))), ("inline" === c || "inline-block" === c && null != h) && "none" === wt.css(t, "float") && (l || (d.done(function() {
                        f.display = h
                    }), null == h && (c = f.display, h = "none" === c ? "" : c)), f.display = "inline-block")), i.overflow && (f.overflow = "hidden", d.always(function() {
                        f.overflow = i.overflow[0], f.overflowX = i.overflow[1], f.overflowY = i.overflow[2]
                    })), l = !1, p) l || (m ? "hidden" in m && (g = m.hidden) : m = Bt.access(t, "fxshow", {
                    display: h
                }), r && (m.hidden = !g), g && b([t], !0), d.done(function() {
                    for (n in g || b([t]), Bt.remove(t, "fxshow"), p) wt.style(t, n, p[n])
                })), l = V(g ? m[n] : 0, n, d), n in m || (m[n] = l.start, g && (l.end = l.start, l.start = 0))
        }

        function Y(t, e) {
            var i, n, o, r, s;
            for (i in t)
                if (o = e[n = p(i)], r = t[i], Array.isArray(r) && (o = r[1], r = t[i] = r[0]), i !== n && (t[n] = r, delete t[i]), (s = wt.cssHooks[n]) && "expand" in s)
                    for (i in r = s.expand(r), delete t[n], r) i in t || (t[i] = r[i], e[i] = o);
                else e[n] = o
        }

        function K(r, t, e) {
            var i, s, n = 0,
                o = K.prefilters.length,
                a = wt.Deferred().always(function() {
                    delete l.elem
                }),
                l = function() {
                    if (s) return !1;
                    for (var t = be || G(), e = Math.max(0, h.startTime + h.duration - t), i = 1 - (e / h.duration || 0), n = 0, o = h.tweens.length; n < o; n++) h.tweens[n].run(i);
                    return a.notifyWith(r, [h, i, e]), i < 1 && o ? e : (o || a.notifyWith(r, [h, 1, 0]), a.resolveWith(r, [h]), !1)
                },
                h = a.promise({
                    elem: r,
                    props: wt.extend({}, t),
                    opts: wt.extend(!0, {
                        specialEasing: {},
                        easing: wt.easing._default
                    }, e),
                    originalProperties: t,
                    originalOptions: e,
                    startTime: be || G(),
                    duration: e.duration,
                    tweens: [],
                    createTween: function(t, e) {
                        var i = wt.Tween(r, h.opts, t, e, h.opts.specialEasing[t] || h.opts.easing);
                        return h.tweens.push(i), i
                    },
                    stop: function(t) {
                        var e = 0,
                            i = t ? h.tweens.length : 0;
                        if (s) return this;
                        for (s = !0; e < i; e++) h.tweens[e].run(1);
                        return t ? (a.notifyWith(r, [h, 1, 0]), a.resolveWith(r, [h, t])) : a.rejectWith(r, [h, t]), this
                    }
                }),
                c = h.props;
            for (Y(c, h.opts.specialEasing); n < o; n++)
                if (i = K.prefilters[n].call(h, r, c, h.opts)) return yt(i.stop) && (wt._queueHooks(h.elem, h.opts.queue).stop = i.stop.bind(i)), i;
            return wt.map(c, V, h), yt(h.opts.start) && h.opts.start.call(r, h), h.progress(h.opts.progress).done(h.opts.done, h.opts.complete).fail(h.opts.fail).always(h.opts.always), wt.fx.timer(wt.extend(l, {
                elem: r,
                anim: h,
                queue: h.opts.queue
            })), h
        }

        function $(t) {
            return (t.match(Dt) || []).join(" ")
        }

        function Q(t) {
            return t.getAttribute && t.getAttribute("class") || ""
        }

        function Z(t) {
            return Array.isArray(t) ? t : "string" == typeof t && t.match(Dt) || []
        }

        function J(i, t, n, o) {
            var e;
            if (Array.isArray(t)) wt.each(t, function(t, e) {
                n || Ne.test(i) ? o(i, e) : J(i + "[" + ("object" == typeof e && null != e ? t : "") + "]", e, n, o)
            });
            else if (n || "object" !== m(t)) o(i, t);
            else
                for (e in t) J(i + "[" + e + "]", t[e], n, o)
        }

        function tt(r) {
            return function(t, e) {
                "string" != typeof t && (e = t, t = "*");
                var i, n = 0,
                    o = t.toLowerCase().match(Dt) || [];
                if (yt(e))
                    for (; i = o[n++];) "+" === i[0] ? (i = i.slice(1) || "*", (r[i] = r[i] || []).unshift(e)) : (r[i] = r[i] || []).push(e)
            }
        }

        function et(e, o, r, s) {
            function a(t) {
                var n;
                return l[t] = !0, wt.each(e[t] || [], function(t, e) {
                    var i = e(o, r, s);
                    return "string" != typeof i || h || l[i] ? h ? !(n = i) : void 0 : (o.dataTypes.unshift(i), a(i), !1)
                }), n
            }
            var l = {},
                h = e === Xe;
            return a(o.dataTypes[0]) || !l["*"] && a("*")
        }

        function it(t, e) {
            var i, n, o = wt.ajaxSettings.flatOptions || {};
            for (i in e) void 0 !== e[i] && ((o[i] ? t : n || (n = {}))[i] = e[i]);
            return n && wt.extend(!0, t, n), t
        }

        function nt(t, e, i) {
            for (var n, o, r, s, a = t.contents, l = t.dataTypes;
                "*" === l[0];) l.shift(), void 0 === n && (n = t.mimeType || e.getResponseHeader("Content-Type"));
            if (n)
                for (o in a)
                    if (a[o] && a[o].test(n)) {
                        l.unshift(o);
                        break
                    }
            if (l[0] in i) r = l[0];
            else {
                for (o in i) {
                    if (!l[0] || t.converters[o + " " + l[0]]) {
                        r = o;
                        break
                    }
                    s || (s = o)
                }
                r = r || s
            }
            if (r) return r !== l[0] && l.unshift(r), i[r]
        }

        function ot(t, e, i, n) {
            var o, r, s, a, l, h = {},
                c = t.dataTypes.slice();
            if (c[1])
                for (s in t.converters) h[s.toLowerCase()] = t.converters[s];
            for (r = c.shift(); r;)
                if (t.responseFields[r] && (i[t.responseFields[r]] = e), !l && n && t.dataFilter && (e = t.dataFilter(e, t.dataType)), l = r, r = c.shift())
                    if ("*" === r) r = l;
                    else if ("*" !== l && l !== r) {
                if (!(s = h[l + " " + r] || h["* " + r]))
                    for (o in h)
                        if ((a = o.split(" "))[1] === r && (s = h[l + " " + a[0]] || h["* " + a[0]])) {
                            !0 === s ? s = h[o] : !0 !== h[o] && (r = a[0], c.unshift(a[1]));
                            break
                        }
                if (!0 !== s)
                    if (s && t["throws"]) e = s(e);
                    else try {
                        e = s(e)
                    } catch (t) {
                        return {
                            state: "parsererror",
                            error: s ? t : "No conversion from " + l + " to " + r
                        }
                    }
            }
            return {
                state: "success",
                data: e
            }
        }
        var rt = [],
            st = C.document,
            at = Object.getPrototypeOf,
            lt = rt.slice,
            ht = rt.concat,
            ct = rt.push,
            ut = rt.indexOf,
            dt = {},
            pt = dt.toString,
            ft = dt.hasOwnProperty,
            gt = ft.toString,
            mt = gt.call(Object),
            vt = {},
            yt = function C(t) {
                return "function" == typeof t && "number" != typeof t.nodeType
            },
            bt = function C(t) {
                return null != t && t === t.window
            },
            xt = {
                type: !0,
                src: !0,
                noModule: !0
            },
            wt = function(t, e) {
                return new wt.fn.init(t, e)
            },
            Tt = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
        wt.fn = wt.prototype = {
            jquery: "3.3.1",
            constructor: wt,
            length: 0,
            toArray: function() {
                return lt.call(this)
            },
            get: function(t) {
                return null == t ? lt.call(this) : t < 0 ? this[t + this.length] : this[t]
            },
            pushStack: function(t) {
                var e = wt.merge(this.constructor(), t);
                return e.prevObject = this, e
            },
            each: function(t) {
                return wt.each(this, t)
            },
            map: function(i) {
                return this.pushStack(wt.map(this, function(t, e) {
                    return i.call(t, e, t)
                }))
            },
            slice: function() {
                return this.pushStack(lt.apply(this, arguments))
            },
            first: function() {
                return this.eq(0)
            },
            last: function() {
                return this.eq(-1)
            },
            eq: function(t) {
                var e = this.length,
                    i = +t + (t < 0 ? e : 0);
                return this.pushStack(0 <= i && i < e ? [this[i]] : [])
            },
            end: function() {
                return this.prevObject || this.constructor()
            },
            push: ct,
            sort: rt.sort,
            splice: rt.splice
        }, wt.extend = wt.fn.extend = function(t) {
            var e, i, n, o, r, s, a = t || {},
                l = 1,
                h = arguments.length,
                c = !1;
            for ("boolean" == typeof a && (c = a, a = arguments[l] || {}, l++), "object" == typeof a || yt(a) || (a = {}), l === h && (a = this, l--); l < h; l++)
                if (null != (e = arguments[l]))
                    for (i in e) n = a[i], a !== (o = e[i]) && (c && o && (wt.isPlainObject(o) || (r = Array.isArray(o))) ? (r ? (r = !1, s = n && Array.isArray(n) ? n : []) : s = n && wt.isPlainObject(n) ? n : {}, a[i] = wt.extend(c, s, o)) : void 0 !== o && (a[i] = o));
            return a
        }, wt.extend({
            expando: "jQuery" + ("3.3.1" + Math.random()).replace(/\D/g, ""),
            isReady: !0,
            error: function(t) {
                throw new Error(t)
            },
            noop: function() {},
            isPlainObject: function(t) {
                var e, i;
                return !(!t || "[object Object]" !== pt.call(t) || (e = at(t)) && ("function" != typeof(i = ft.call(e, "constructor") && e.constructor) || gt.call(i) !== mt))
            },
            isEmptyObject: function(t) {
                var e;
                for (e in t) return !1;
                return !0
            },
            globalEval: function(t) {
                g(t)
            },
            each: function(t, e) {
                var i, n = 0;
                if (a(t))
                    for (i = t.length; n < i && !1 !== e.call(t[n], n, t[n]); n++);
                else
                    for (n in t)
                        if (!1 === e.call(t[n], n, t[n])) break; return t
            },
            trim: function(t) {
                return null == t ? "" : (t + "").replace(Tt, "")
            },
            makeArray: function(t, e) {
                var i = e || [];
                return null != t && (a(Object(t)) ? wt.merge(i, "string" == typeof t ? [t] : t) : ct.call(i, t)), i
            },
            inArray: function(t, e, i) {
                return null == e ? -1 : ut.call(e, t, i)
            },
            merge: function(t, e) {
                for (var i = +e.length, n = 0, o = t.length; n < i; n++) t[o++] = e[n];
                return t.length = o, t
            },
            grep: function(t, e, i) {
                for (var n = [], o = 0, r = t.length, s = !i; o < r; o++) !e(t[o], o) !== s && n.push(t[o]);
                return n
            },
            map: function(t, e, i) {
                var n, o, r = 0,
                    s = [];
                if (a(t))
                    for (n = t.length; r < n; r++) null != (o = e(t[r], r, i)) && s.push(o);
                else
                    for (r in t) null != (o = e(t[r], r, i)) && s.push(o);
                return ht.apply([], s)
            },
            guid: 1,
            support: vt
        }), "function" == typeof Symbol && (wt.fn[Symbol.iterator] = rt[Symbol.iterator]), wt.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(t, e) {
            dt["[object " + e + "]"] = e.toLowerCase()
        });
        var Ct = function(i) {
            function x(t, e, i, n) {
                var o, r, s, a, l, h, c, u = e && e.ownerDocument,
                    d = e ? e.nodeType : 9;
                if (i = i || [], "string" != typeof t || !t || 1 !== d && 9 !== d && 11 !== d) return i;
                if (!n && ((e ? e.ownerDocument || e : j) !== I && D(e), e = e || I, N)) {
                    if (11 !== d && (l = vt.exec(t)))
                        if (o = l[1]) {
                            if (9 === d) {
                                if (!(s = e.getElementById(o))) return i;
                                if (s.id === o) return i.push(s), i
                            } else if (u && (s = u.getElementById(o)) && B(e, s) && s.id === o) return i.push(s), i
                        } else {
                            if (l[2]) return Z.apply(i, e.getElementsByTagName(t)), i;
                            if ((o = l[3]) && T.getElementsByClassName && e.getElementsByClassName) return Z.apply(i, e.getElementsByClassName(o)), i
                        }
                    if (T.qsa && !V[t + " "] && (!R || !R.test(t))) {
                        if (1 !== d) u = e, c = t;
                        else if ("object" !== e.nodeName.toLowerCase()) {
                            for ((a = e.getAttribute("id")) ? a = a.replace(wt, Tt) : e.setAttribute("id", a = W), r = (h = A(t)).length; r--;) h[r] = "#" + a + " " + f(h[r]);
                            c = h.join(","), u = yt.test(t) && p(e.parentNode) || e
                        }
                        if (c) try {
                            return Z.apply(i, u.querySelectorAll(c)), i
                        } catch (t) {} finally {
                            a === W && e.removeAttribute("id")
                        }
                    }
                }
                return _(t.replace(at, "$1"), e, i, n)
            }

            function t() {
                function i(t, e) {
                    return n.push(t + " ") > C.cacheLength && delete i[n.shift()], i[t + " "] = e
                }
                var n = [];
                return i
            }

            function l(t) {
                return t[W] = !0, t
            }

            function o(t) {
                var e = I.createElement("fieldset");
                try {
                    return !!t(e)
                } catch (t) {
                    return !1
                } finally {
                    e.parentNode && e.parentNode.removeChild(e), e = null
                }
            }

            function e(t, e) {
                for (var i = t.split("|"), n = i.length; n--;) C.attrHandle[i[n]] = e
            }

            function h(t, e) {
                var i = e && t,
                    n = i && 1 === t.nodeType && 1 === e.nodeType && t.sourceIndex - e.sourceIndex;
                if (n) return n;
                if (i)
                    for (; i = i.nextSibling;)
                        if (i === e) return -1;
                return t ? 1 : -1
            }

            function n(e) {
                return function(t) {
                    return "input" === t.nodeName.toLowerCase() && t.type === e
                }
            }

            function r(i) {
                return function(t) {
                    var e = t.nodeName.toLowerCase();
                    return ("input" === e || "button" === e) && t.type === i
                }
            }

            function s(e) {
                return function(t) {
                    return "form" in t ? t.parentNode && !1 === t.disabled ? "label" in t ? "label" in t.parentNode ? t.parentNode.disabled === e : t.disabled === e : t.isDisabled === e || t.isDisabled !== !e && St(t) === e : t.disabled === e : "label" in t && t.disabled === e
                }
            }

            function a(s) {
                return l(function(r) {
                    return r = +r, l(function(t, e) {
                        for (var i, n = s([], t.length, r), o = n.length; o--;) t[i = n[o]] && (t[i] = !(e[i] = t[i]))
                    })
                })
            }

            function p(t) {
                return t && "undefined" != typeof t.getElementsByTagName && t
            }

            function c() {}

            function f(t) {
                for (var e = 0, i = t.length, n = ""; e < i; e++) n += t[e].value;
                return n
            }

            function u(a, t, e) {
                var l = t.dir,
                    h = t.next,
                    c = h || l,
                    u = e && "parentNode" === c,
                    d = q++;
                return t.first ? function(t, e, i) {
                    for (; t = t[l];)
                        if (1 === t.nodeType || u) return a(t, e, i);
                    return !1
                } : function(t, e, i) {
                    var n, o, r, s = [F, d];
                    if (i) {
                        for (; t = t[l];)
                            if ((1 === t.nodeType || u) && a(t, e, i)) return !0
                    } else
                        for (; t = t[l];)
                            if (1 === t.nodeType || u)
                                if (o = (r = t[W] || (t[W] = {}))[t.uniqueID] || (r[t.uniqueID] = {}), h && h === t.nodeName.toLowerCase()) t = t[l] || t;
                                else {
                                    if ((n = o[c]) && n[0] === F && n[1] === d) return s[2] = n[2];
                                    if ((o[c] = s)[2] = a(t, e, i)) return !0
                                } return !1
                }
            }

            function d(o) {
                return 1 < o.length ? function(t, e, i) {
                    for (var n = o.length; n--;)
                        if (!o[n](t, e, i)) return !1;
                    return !0
                } : o[0]
            }

            function y(t, e, i) {
                for (var n = 0, o = e.length; n < o; n++) x(t, e[n], i);
                return i
            }

            function w(t, e, i, n, o) {
                for (var r, s = [], a = 0, l = t.length, h = null != e; a < l; a++)(r = t[a]) && (i && !i(r, n, o) || (s.push(r), h && e.push(a)));
                return s
            }

            function b(p, f, g, m, v, t) {
                return m && !m[W] && (m = b(m)), v && !v[W] && (v = b(v, t)), l(function(t, e, i, n) {
                    var o, r, s, a = [],
                        l = [],
                        h = e.length,
                        c = t || y(f || "*", i.nodeType ? [i] : i, []),
                        u = !p || !t && f ? c : w(c, a, p, i, n),
                        d = g ? v || (t ? p : h || m) ? [] : e : u;
                    if (g && g(u, d, i, n), m)
                        for (o = w(d, l), m(o, [], i, n), r = o.length; r--;)(s = o[r]) && (d[l[r]] = !(u[l[r]] = s));
                    if (t) {
                        if (v || p) {
                            if (v) {
                                for (o = [], r = d.length; r--;)(s = d[r]) && o.push(u[r] = s);
                                v(null, d = [], o, n)
                            }
                            for (r = d.length; r--;)(s = d[r]) && -1 < (o = v ? tt(t, s) : a[r]) && (t[o] = !(e[o] = s))
                        }
                    } else d = w(d === e ? d.splice(h, d.length) : d), v ? v(null, e, d, n) : Z.apply(e, d)
                })
            }

            function g(t) {
                for (var o, e, i, n = t.length, r = C.relative[t[0].type], s = r || C.relative[" "], a = r ? 1 : 0, l = u(function(t) {
                        return t === o
                    }, s, !0), h = u(function(t) {
                        return -1 < tt(o, t)
                    }, s, !0), c = [function(t, e, i) {
                        var n = !r && (i || e !== M) || ((o = e).nodeType ? l(t, e, i) : h(t, e, i));
                        return o = null, n
                    }]; a < n; a++)
                    if (e = C.relative[t[a].type]) c = [u(d(c), e)];
                    else {
                        if ((e = C.filter[t[a].type].apply(null, t[a].matches))[W]) {
                            for (i = ++a; i < n && !C.relative[t[i].type]; i++);
                            return b(1 < a && d(c), 1 < a && f(t.slice(0, a - 1).concat({
                                value: " " === t[a - 2].type ? "*" : ""
                            })).replace(at, "$1"), e, a < i && g(t.slice(a, i)), i < n && g(t = t.slice(i)), i < n && f(t))
                        }
                        c.push(e)
                    }
                return d(c)
            }

            function m(m, v) {
                var y = 0 < v.length,
                    b = 0 < m.length,
                    t = function(t, e, i, n, o) {
                        var r, s, a, l = 0,
                            h = "0",
                            c = t && [],
                            u = [],
                            d = M,
                            p = t || b && C.find.TAG("*", o),
                            f = F += null == d ? 1 : Math.random() || .1,
                            g = p.length;
                        for (o && (M = e === I || e || o); h !== g && null != (r = p[h]); h++) {
                            if (b && r) {
                                for (s = 0, e || r.ownerDocument === I || (D(r), i = !N); a = m[s++];)
                                    if (a(r, e || I, i)) {
                                        n.push(r);
                                        break
                                    }
                                o && (F = f)
                            }
                            y && ((r = !a && r) && l--, t && c.push(r))
                        }
                        if (l += h, y && h !== l) {
                            for (s = 0; a = v[s++];) a(c, u, e, i);
                            if (t) {
                                if (0 < l)
                                    for (; h--;) c[h] || u[h] || (u[h] = $.call(n));
                                u = w(u)
                            }
                            Z.apply(n, u), o && !t && 0 < u.length && 1 < l + v.length && x.uniqueSort(n)
                        }
                        return o && (F = f, M = d), c
                    };
                return y ? l(t) : t
            }
            var v, T, C, S, E, A, k, _, M, O, L, D, I, P, N, R, H, z, B, W = "sizzle" + 1 * new Date,
                j = i.document,
                F = 0,
                q = 0,
                G = t(),
                U = t(),
                V = t(),
                X = function(t, e) {
                    return t === e && (L = !0), 0
                },
                Y = {}.hasOwnProperty,
                K = [],
                $ = K.pop,
                Q = K.push,
                Z = K.push,
                J = K.slice,
                tt = function(t, e) {
                    for (var i = 0, n = t.length; i < n; i++)
                        if (t[i] === e) return i;
                    return -1
                },
                et = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                it = "[\\x20\\t\\r\\n\\f]",
                nt = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
                ot = "\\[" + it + "*(" + nt + ")(?:" + it + "*([*^$|!~]?=)" + it + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + nt + "))|)" + it + "*\\]",
                rt = ":(" + nt + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + ot + ")*)|.*)\\)|)",
                st = new RegExp(it + "+", "g"),
                at = new RegExp("^" + it + "+|((?:^|[^\\\\])(?:\\\\.)*)" + it + "+$", "g"),
                lt = new RegExp("^" + it + "*," + it + "*"),
                ht = new RegExp("^" + it + "*([>+~]|" + it + ")" + it + "*"),
                ct = new RegExp("=" + it + "*([^\\]'\"]*?)" + it + "*\\]", "g"),
                ut = new RegExp(rt),
                dt = new RegExp("^" + nt + "$"),
                pt = {
                    ID: new RegExp("^#(" + nt + ")"),
                    CLASS: new RegExp("^\\.(" + nt + ")"),
                    TAG: new RegExp("^(" + nt + "|[*])"),
                    ATTR: new RegExp("^" + ot),
                    PSEUDO: new RegExp("^" + rt),
                    CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + it + "*(even|odd|(([+-]|)(\\d*)n|)" + it + "*(?:([+-]|)" + it + "*(\\d+)|))" + it + "*\\)|)", "i"),
                    bool: new RegExp("^(?:" + et + ")$", "i"),
                    needsContext: new RegExp("^" + it + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + it + "*((?:-\\d)?\\d*)" + it + "*\\)|)(?=[^-]|$)", "i")
                },
                ft = /^(?:input|select|textarea|button)$/i,
                gt = /^h\d$/i,
                mt = /^[^{]+\{\s*\[native \w/,
                vt = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                yt = /[+~]/,
                bt = new RegExp("\\\\([\\da-f]{1,6}" + it + "?|(" + it + ")|.)", "ig"),
                xt = function(t, e, i) {
                    var n = "0x" + e - 65536;
                    return n != n || i ? e : n < 0 ? String.fromCharCode(n + 65536) : String.fromCharCode(n >> 10 | 55296, 1023 & n | 56320)
                },
                wt = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
                Tt = function(t, e) {
                    return e ? "\0" === t ? "\ufffd" : t.slice(0, -1) + "\\" + t.charCodeAt(t.length - 1).toString(16) + " " : "\\" + t
                },
                Ct = function() {
                    D()
                },
                St = u(function(t) {
                    return !0 === t.disabled && ("form" in t || "label" in t)
                }, {
                    dir: "parentNode",
                    next: "legend"
                });
            try {
                Z.apply(K = J.call(j.childNodes), j.childNodes), K[j.childNodes.length].nodeType
            } catch (i) {
                Z = {
                    apply: K.length ? function(t, e) {
                        Q.apply(t, J.call(e))
                    } : function(t, e) {
                        for (var i = t.length, n = 0; t[i++] = e[n++];);
                        t.length = i - 1
                    }
                }
            }
            for (v in T = x.support = {}, E = x.isXML = function(t) {
                    var e = t && (t.ownerDocument || t).documentElement;
                    return !!e && "HTML" !== e.nodeName
                }, D = x.setDocument = function(t) {
                    var e, i, n = t ? t.ownerDocument || t : j;
                    return n !== I && 9 === n.nodeType && n.documentElement && (P = (I = n).documentElement, N = !E(I), j !== I && (i = I.defaultView) && i.top !== i && (i.addEventListener ? i.addEventListener("unload", Ct, !1) : i.attachEvent && i.attachEvent("onunload", Ct)), T.attributes = o(function(t) {
                        return t.className = "i", !t.getAttribute("className")
                    }), T.getElementsByTagName = o(function(t) {
                        return t.appendChild(I.createComment("")), !t.getElementsByTagName("*").length
                    }), T.getElementsByClassName = mt.test(I.getElementsByClassName), T.getById = o(function(t) {
                        return P.appendChild(t).id = W, !I.getElementsByName || !I.getElementsByName(W).length
                    }), T.getById ? (C.filter.ID = function(t) {
                        var e = t.replace(bt, xt);
                        return function(t) {
                            return t.getAttribute("id") === e
                        }
                    }, C.find.ID = function(t, e) {
                        if ("undefined" != typeof e.getElementById && N) {
                            var i = e.getElementById(t);
                            return i ? [i] : []
                        }
                    }) : (C.filter.ID = function(t) {
                        var i = t.replace(bt, xt);
                        return function(t) {
                            var e = "undefined" != typeof t.getAttributeNode && t.getAttributeNode("id");
                            return e && e.value === i
                        }
                    }, C.find.ID = function(t, e) {
                        if ("undefined" != typeof e.getElementById && N) {
                            var i, n, o, r = e.getElementById(t);
                            if (r) {
                                if ((i = r.getAttributeNode("id")) && i.value === t) return [r];
                                for (o = e.getElementsByName(t), n = 0; r = o[n++];)
                                    if ((i = r.getAttributeNode("id")) && i.value === t) return [r]
                            }
                            return []
                        }
                    }), C.find.TAG = T.getElementsByTagName ? function(t, e) {
                        return "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName(t) : T.qsa ? e.querySelectorAll(t) : void 0
                    } : function(t, e) {
                        var i, n = [],
                            o = 0,
                            r = e.getElementsByTagName(t);
                        if ("*" !== t) return r;
                        for (; i = r[o++];) 1 === i.nodeType && n.push(i);
                        return n
                    }, C.find.CLASS = T.getElementsByClassName && function(t, e) {
                        if ("undefined" != typeof e.getElementsByClassName && N) return e.getElementsByClassName(t)
                    }, H = [], R = [], (T.qsa = mt.test(I.querySelectorAll)) && (o(function(t) {
                        P.appendChild(t).innerHTML = "<a id='" + W + "'></a><select id='" + W + "-\r\\' msallowcapture=''><option selected=''></option></select>", t.querySelectorAll("[msallowcapture^='']").length && R.push("[*^$]=" + it + "*(?:''|\"\")"), t.querySelectorAll("[selected]").length || R.push("\\[" + it + "*(?:value|" + et + ")"), t.querySelectorAll("[id~=" + W + "-]").length || R.push("~="), t.querySelectorAll(":checked").length || R.push(":checked"), t.querySelectorAll("a#" + W + "+*").length || R.push(".#.+[+~]")
                    }), o(function(t) {
                        t.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                        var e = I.createElement("input");
                        e.setAttribute("type", "hidden"), t.appendChild(e).setAttribute("name", "D"), t.querySelectorAll("[name=d]").length && R.push("name" + it + "*[*^$|!~]?="), 2 !== t.querySelectorAll(":enabled").length && R.push(":enabled", ":disabled"), P.appendChild(t).disabled = !0, 2 !== t.querySelectorAll(":disabled").length && R.push(":enabled", ":disabled"), t.querySelectorAll("*,:x"), R.push(",.*:")
                    })), (T.matchesSelector = mt.test(z = P.matches || P.webkitMatchesSelector || P.mozMatchesSelector || P.oMatchesSelector || P.msMatchesSelector)) && o(function(t) {
                        T.disconnectedMatch = z.call(t, "*"), z.call(t, "[s!='']:x"), H.push("!=", rt)
                    }), R = R.length && new RegExp(R.join("|")), H = H.length && new RegExp(H.join("|")), e = mt.test(P.compareDocumentPosition), B = e || mt.test(P.contains) ? function(t, e) {
                        var i = 9 === t.nodeType ? t.documentElement : t,
                            n = e && e.parentNode;
                        return t === n || !(!n || 1 !== n.nodeType || !(i.contains ? i.contains(n) : t.compareDocumentPosition && 16 & t.compareDocumentPosition(n)))
                    } : function(t, e) {
                        if (e)
                            for (; e = e.parentNode;)
                                if (e === t) return !0;
                        return !1
                    }, X = e ? function(t, e) {
                        if (t === e) return L = !0, 0;
                        var i = !t.compareDocumentPosition - !e.compareDocumentPosition;
                        return i || (1 & (i = (t.ownerDocument || t) === (e.ownerDocument || e) ? t.compareDocumentPosition(e) : 1) || !T.sortDetached && e.compareDocumentPosition(t) === i ? t === I || t.ownerDocument === j && B(j, t) ? -1 : e === I || e.ownerDocument === j && B(j, e) ? 1 : O ? tt(O, t) - tt(O, e) : 0 : 4 & i ? -1 : 1)
                    } : function(t, e) {
                        if (t === e) return L = !0, 0;
                        var i, n = 0,
                            o = t.parentNode,
                            r = e.parentNode,
                            s = [t],
                            a = [e];
                        if (!o || !r) return t === I ? -1 : e === I ? 1 : o ? -1 : r ? 1 : O ? tt(O, t) - tt(O, e) : 0;
                        if (o === r) return h(t, e);
                        for (i = t; i = i.parentNode;) s.unshift(i);
                        for (i = e; i = i.parentNode;) a.unshift(i);
                        for (; s[n] === a[n];) n++;
                        return n ? h(s[n], a[n]) : s[n] === j ? -1 : a[n] === j ? 1 : 0
                    }), I
                }, x.matches = function(t, e) {
                    return x(t, null, null, e)
                }, x.matchesSelector = function(t, e) {
                    if ((t.ownerDocument || t) !== I && D(t), e = e.replace(ct, "='$1']"), T.matchesSelector && N && !V[e + " "] && (!H || !H.test(e)) && (!R || !R.test(e))) try {
                        var i = z.call(t, e);
                        if (i || T.disconnectedMatch || t.document && 11 !== t.document.nodeType) return i
                    } catch (t) {}
                    return 0 < x(e, I, null, [t]).length
                }, x.contains = function(t, e) {
                    return (t.ownerDocument || t) !== I && D(t), B(t, e)
                }, x.attr = function(t, e) {
                    (t.ownerDocument || t) !== I && D(t);
                    var i = C.attrHandle[e.toLowerCase()],
                        n = i && Y.call(C.attrHandle, e.toLowerCase()) ? i(t, e, !N) : void 0;
                    return void 0 !== n ? n : T.attributes || !N ? t.getAttribute(e) : (n = t.getAttributeNode(e)) && n.specified ? n.value : null
                }, x.escape = function(t) {
                    return (t + "").replace(wt, Tt)
                }, x.error = function(t) {
                    throw new Error("Syntax error, unrecognized expression: " + t)
                }, x.uniqueSort = function(t) {
                    var e, i = [],
                        n = 0,
                        o = 0;
                    if (L = !T.detectDuplicates, O = !T.sortStable && t.slice(0), t.sort(X), L) {
                        for (; e = t[o++];) e === t[o] && (n = i.push(o));
                        for (; n--;) t.splice(i[n], 1)
                    }
                    return O = null, t
                }, S = x.getText = function(t) {
                    var e, i = "",
                        n = 0,
                        o = t.nodeType;
                    if (o) {
                        if (1 === o || 9 === o || 11 === o) {
                            if ("string" == typeof t.textContent) return t.textContent;
                            for (t = t.firstChild; t; t = t.nextSibling) i += S(t)
                        } else if (3 === o || 4 === o) return t.nodeValue
                    } else
                        for (; e = t[n++];) i += S(e);
                    return i
                }, (C = x.selectors = {
                    cacheLength: 50,
                    createPseudo: l,
                    match: pt,
                    attrHandle: {},
                    find: {},
                    relative: {
                        ">": {
                            dir: "parentNode",
                            first: !0
                        },
                        " ": {
                            dir: "parentNode"
                        },
                        "+": {
                            dir: "previousSibling",
                            first: !0
                        },
                        "~": {
                            dir: "previousSibling"
                        }
                    },
                    preFilter: {
                        ATTR: function(t) {
                            return t[1] = t[1].replace(bt, xt), t[3] = (t[3] || t[4] || t[5] || "").replace(bt, xt), "~=" === t[2] && (t[3] = " " + t[3] + " "), t.slice(0, 4)
                        },
                        CHILD: function(t) {
                            return t[1] = t[1].toLowerCase(), "nth" === t[1].slice(0, 3) ? (t[3] || x.error(t[0]), t[4] = +(t[4] ? t[5] + (t[6] || 1) : 2 * ("even" === t[3] || "odd" === t[3])), t[5] = +(t[7] + t[8] || "odd" === t[3])) : t[3] && x.error(t[0]), t
                        },
                        PSEUDO: function(t) {
                            var e, i = !t[6] && t[2];
                            return pt.CHILD.test(t[0]) ? null : (t[3] ? t[2] = t[4] || t[5] || "" : i && ut.test(i) && (e = A(i, !0)) && (e = i.indexOf(")", i.length - e) - i.length) && (t[0] = t[0].slice(0, e), t[2] = i.slice(0, e)), t.slice(0, 3))
                        }
                    },
                    filter: {
                        TAG: function(t) {
                            var e = t.replace(bt, xt).toLowerCase();
                            return "*" === t ? function() {
                                return !0
                            } : function(t) {
                                return t.nodeName && t.nodeName.toLowerCase() === e
                            }
                        },
                        CLASS: function(t) {
                            var e = G[t + " "];
                            return e || (e = new RegExp("(^|" + it + ")" + t + "(" + it + "|$)")) && G(t, function(t) {
                                return e.test("string" == typeof t.className && t.className || "undefined" != typeof t.getAttribute && t.getAttribute("class") || "")
                            })
                        },
                        ATTR: function(i, n, o) {
                            return function(t) {
                                var e = x.attr(t, i);
                                return null == e ? "!=" === n : !n || (e += "", "=" === n ? e === o : "!=" === n ? e !== o : "^=" === n ? o && 0 === e.indexOf(o) : "*=" === n ? o && -1 < e.indexOf(o) : "$=" === n ? o && e.slice(-o.length) === o : "~=" === n ? -1 < (" " + e.replace(st, " ") + " ").indexOf(o) : "|=" === n && (e === o || e.slice(0, o.length + 1) === o + "-"))
                            }
                        },
                        CHILD: function(f, t, e, g, m) {
                            var v = "nth" !== f.slice(0, 3),
                                y = "last" !== f.slice(-4),
                                b = "of-type" === t;
                            return 1 === g && 0 === m ? function(t) {
                                return !!t.parentNode
                            } : function(t, e, i) {
                                var n, o, r, s, a, l, h = v !== y ? "nextSibling" : "previousSibling",
                                    c = t.parentNode,
                                    u = b && t.nodeName.toLowerCase(),
                                    d = !i && !b,
                                    p = !1;
                                if (c) {
                                    if (v) {
                                        for (; h;) {
                                            for (s = t; s = s[h];)
                                                if (b ? s.nodeName.toLowerCase() === u : 1 === s.nodeType) return !1;
                                            l = h = "only" === f && !l && "nextSibling"
                                        }
                                        return !0
                                    }
                                    if (l = [y ? c.firstChild : c.lastChild], y && d) {
                                        for (p = (a = (n = (o = (r = (s = c)[W] || (s[W] = {}))[s.uniqueID] || (r[s.uniqueID] = {}))[f] || [])[0] === F && n[1]) && n[2], s = a && c.childNodes[a]; s = ++a && s && s[h] || (p = a = 0) || l.pop();)
                                            if (1 === s.nodeType && ++p && s === t) {
                                                o[f] = [F, a, p];
                                                break
                                            }
                                    } else if (d && (p = a = (n = (o = (r = (s = t)[W] || (s[W] = {}))[s.uniqueID] || (r[s.uniqueID] = {}))[f] || [])[0] === F && n[1]), !1 === p)
                                        for (;
                                            (s = ++a && s && s[h] || (p = a = 0) || l.pop()) && ((b ? s.nodeName.toLowerCase() !== u : 1 !== s.nodeType) || !++p || (d && ((o = (r = s[W] || (s[W] = {}))[s.uniqueID] || (r[s.uniqueID] = {}))[f] = [F, p]), s !== t)););
                                    return (p -= m) === g || p % g == 0 && 0 <= p / g
                                }
                            }
                        },
                        PSEUDO: function(t, r) {
                            var e, s = C.pseudos[t] || C.setFilters[t.toLowerCase()] || x.error("unsupported pseudo: " + t);
                            return s[W] ? s(r) : 1 < s.length ? (e = [t, t, "", r], C.setFilters.hasOwnProperty(t.toLowerCase()) ? l(function(t, e) {
                                for (var i, n = s(t, r), o = n.length; o--;) t[i = tt(t, n[o])] = !(e[i] = n[o])
                            }) : function(t) {
                                return s(t, 0, e)
                            }) : s
                        }
                    },
                    pseudos: {
                        not: l(function(t) {
                            var n = [],
                                o = [],
                                a = k(t.replace(at, "$1"));
                            return a[W] ? l(function(t, e, i, n) {
                                for (var o, r = a(t, null, n, []), s = t.length; s--;)(o = r[s]) && (t[s] = !(e[s] = o))
                            }) : function(t, e, i) {
                                return n[0] = t, a(n, null, i, o), n[0] = null, !o.pop()
                            }
                        }),
                        has: l(function(e) {
                            return function(t) {
                                return 0 < x(e, t).length
                            }
                        }),
                        contains: l(function(e) {
                            return e = e.replace(bt, xt),
                                function(t) {
                                    return -1 < (t.textContent || t.innerText || S(t)).indexOf(e)
                                }
                        }),
                        lang: l(function(i) {
                            return dt.test(i || "") || x.error("unsupported lang: " + i), i = i.replace(bt, xt).toLowerCase(),
                                function(t) {
                                    var e;
                                    do {
                                        if (e = N ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return (e = e.toLowerCase()) === i || 0 === e.indexOf(i + "-")
                                    } while ((t = t.parentNode) && 1 === t.nodeType);
                                    return !1
                                }
                        }),
                        target: function(t) {
                            var e = i.location && i.location.hash;
                            return e && e.slice(1) === t.id
                        },
                        root: function(t) {
                            return t === P
                        },
                        focus: function(t) {
                            return t === I.activeElement && (!I.hasFocus || I.hasFocus()) && !!(t.type || t.href || ~t.tabIndex)
                        },
                        enabled: s(!1),
                        disabled: s(!0),
                        checked: function(t) {
                            var e = t.nodeName.toLowerCase();
                            return "input" === e && !!t.checked || "option" === e && !!t.selected
                        },
                        selected: function(t) {
                            return t.parentNode && t.parentNode.selectedIndex, !0 === t.selected
                        },
                        empty: function(t) {
                            for (t = t.firstChild; t; t = t.nextSibling)
                                if (t.nodeType < 6) return !1;
                            return !0
                        },
                        parent: function(t) {
                            return !C.pseudos.empty(t)
                        },
                        header: function(t) {
                            return gt.test(t.nodeName)
                        },
                        input: function(t) {
                            return ft.test(t.nodeName)
                        },
                        button: function(t) {
                            var e = t.nodeName.toLowerCase();
                            return "input" === e && "button" === t.type || "button" === e
                        },
                        text: function(t) {
                            var e;
                            return "input" === t.nodeName.toLowerCase() && "text" === t.type && (null == (e = t.getAttribute("type")) || "text" === e.toLowerCase())
                        },
                        first: a(function() {
                            return [0]
                        }),
                        last: a(function(t, e) {
                            return [e - 1]
                        }),
                        eq: a(function(t, e, i) {
                            return [i < 0 ? i + e : i]
                        }),
                        even: a(function(t, e) {
                            for (var i = 0; i < e; i += 2) t.push(i);
                            return t
                        }),
                        odd: a(function(t, e) {
                            for (var i = 1; i < e; i += 2) t.push(i);
                            return t
                        }),
                        lt: a(function(t, e, i) {
                            for (var n = i < 0 ? i + e : i; 0 <= --n;) t.push(n);
                            return t
                        }),
                        gt: a(function(t, e, i) {
                            for (var n = i < 0 ? i + e : i; ++n < e;) t.push(n);
                            return t
                        })
                    }
                }).pseudos.nth = C.pseudos.eq, {
                    radio: !0,
                    checkbox: !0,
                    file: !0,
                    password: !0,
                    image: !0
                }) C.pseudos[v] = n(v);
            for (v in {
                    submit: !0,
                    reset: !0
                }) C.pseudos[v] = r(v);
            return c.prototype = C.filters = C.pseudos, C.setFilters = new c, A = x.tokenize = function(t, e) {
                var i, n, o, r, s, a, l, h = U[t + " "];
                if (h) return e ? 0 : h.slice(0);
                for (s = t, a = [], l = C.preFilter; s;) {
                    for (r in i && !(n = lt.exec(s)) || (n && (s = s.slice(n[0].length) || s), a.push(o = [])), i = !1, (n = ht.exec(s)) && (i = n.shift(), o.push({
                            value: i,
                            type: n[0].replace(at, " ")
                        }), s = s.slice(i.length)), C.filter) !(n = pt[r].exec(s)) || l[r] && !(n = l[r](n)) || (i = n.shift(), o.push({
                        value: i,
                        type: r,
                        matches: n
                    }), s = s.slice(i.length));
                    if (!i) break
                }
                return e ? s.length : s ? x.error(t) : U(t, a).slice(0)
            }, k = x.compile = function(t, e) {
                var i, n = [],
                    o = [],
                    r = V[t + " "];
                if (!r) {
                    for (e || (e = A(t)), i = e.length; i--;)(r = g(e[i]))[W] ? n.push(r) : o.push(r);
                    (r = V(t, m(o, n))).selector = t
                }
                return r
            }, _ = x.select = function(t, e, i, n) {
                var o, r, s, a, l, h = "function" == typeof t && t,
                    c = !n && A(t = h.selector || t);
                if (i = i || [], 1 === c.length) {
                    if (2 < (r = c[0] = c[0].slice(0)).length && "ID" === (s = r[0]).type && 9 === e.nodeType && N && C.relative[r[1].type]) {
                        if (!(e = (C.find.ID(s.matches[0].replace(bt, xt), e) || [])[0])) return i;
                        h && (e = e.parentNode), t = t.slice(r.shift().value.length)
                    }
                    for (o = pt.needsContext.test(t) ? 0 : r.length; o-- && (s = r[o], !C.relative[a = s.type]);)
                        if ((l = C.find[a]) && (n = l(s.matches[0].replace(bt, xt), yt.test(r[0].type) && p(e.parentNode) || e))) {
                            if (r.splice(o, 1), !(t = n.length && f(r))) return Z.apply(i, n), i;
                            break
                        }
                }
                return (h || k(t, c))(n, e, !N, i, !e || yt.test(t) && p(e.parentNode) || e), i
            }, T.sortStable = W.split("").sort(X).join("") === W, T.detectDuplicates = !!L, D(), T.sortDetached = o(function(t) {
                return 1 & t.compareDocumentPosition(I.createElement("fieldset"))
            }), o(function(t) {
                return t.innerHTML = "<a href='#'></a>", "#" === t.firstChild.getAttribute("href")
            }) || e("type|href|height|width", function(t, e, i) {
                if (!i) return t.getAttribute(e, "type" === e.toLowerCase() ? 1 : 2)
            }), T.attributes && o(function(t) {
                return t.innerHTML = "<input/>", t.firstChild.setAttribute("value", ""), "" === t.firstChild.getAttribute("value")
            }) || e("value", function(t, e, i) {
                if (!i && "input" === t.nodeName.toLowerCase()) return t.defaultValue
            }), o(function(t) {
                return null == t.getAttribute("disabled")
            }) || e(et, function(t, e, i) {
                var n;
                if (!i) return !0 === t[e] ? e.toLowerCase() : (n = t.getAttributeNode(e)) && n.specified ? n.value : null
            }), x
        }(C);
        wt.find = Ct, wt.expr = Ct.selectors, wt.expr[":"] = wt.expr.pseudos, wt.uniqueSort = wt.unique = Ct.uniqueSort, wt.text = Ct.getText, wt.isXMLDoc = Ct.isXML, wt.contains = Ct.contains, wt.escapeSelector = Ct.escape;
        var St = function(t, e, i) {
                for (var n = [], o = void 0 !== i;
                    (t = t[e]) && 9 !== t.nodeType;)
                    if (1 === t.nodeType) {
                        if (o && wt(t).is(i)) break;
                        n.push(t)
                    }
                return n
            },
            Et = function(t, e) {
                for (var i = []; t; t = t.nextSibling) 1 === t.nodeType && t !== e && i.push(t);
                return i
            },
            At = wt.expr.match.needsContext,
            kt = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
        wt.filter = function(t, e, i) {
            var n = e[0];
            return i && (t = ":not(" + t + ")"), 1 === e.length && 1 === n.nodeType ? wt.find.matchesSelector(n, t) ? [n] : [] : wt.find.matches(t, wt.grep(e, function(t) {
                return 1 === t.nodeType
            }))
        }, wt.fn.extend({
            find: function(t) {
                var e, i, n = this.length,
                    o = this;
                if ("string" != typeof t) return this.pushStack(wt(t).filter(function() {
                    for (e = 0; e < n; e++)
                        if (wt.contains(o[e], this)) return !0
                }));
                for (i = this.pushStack([]), e = 0; e < n; e++) wt.find(t, o[e], i);
                return 1 < n ? wt.uniqueSort(i) : i
            },
            filter: function(t) {
                return this.pushStack(e(this, t || [], !1))
            },
            not: function(t) {
                return this.pushStack(e(this, t || [], !0))
            },
            is: function(t) {
                return !!e(this, "string" == typeof t && At.test(t) ? wt(t) : t || [], !1).length
            }
        });
        var _t, Mt = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
        (wt.fn.init = function(t, e, i) {
            var n, o;
            if (!t) return this;
            if (i = i || _t, "string" != typeof t) return t.nodeType ? (this[0] = t, this.length = 1, this) : yt(t) ? void 0 !== i.ready ? i.ready(t) : t(wt) : wt.makeArray(t, this);
            if (!(n = "<" === t[0] && ">" === t[t.length - 1] && 3 <= t.length ? [null, t, null] : Mt.exec(t)) || !n[1] && e) return !e || e.jquery ? (e || i).find(t) : this.constructor(e).find(t);
            if (n[1]) {
                if (e = e instanceof wt ? e[0] : e, wt.merge(this, wt.parseHTML(n[1], e && e.nodeType ? e.ownerDocument || e : st, !0)), kt.test(n[1]) && wt.isPlainObject(e))
                    for (n in e) yt(this[n]) ? this[n](e[n]) : this.attr(n, e[n]);
                return this
            }
            return (o = st.getElementById(n[2])) && (this[0] = o, this.length = 1), this
        }).prototype = wt.fn, _t = wt(st);
        var Ot = /^(?:parents|prev(?:Until|All))/,
            Lt = {
                children: !0,
                contents: !0,
                next: !0,
                prev: !0
            };
        wt.fn.extend({
            has: function(t) {
                var e = wt(t, this),
                    i = e.length;
                return this.filter(function() {
                    for (var t = 0; t < i; t++)
                        if (wt.contains(this, e[t])) return !0
                })
            },
            closest: function(t, e) {
                var i, n = 0,
                    o = this.length,
                    r = [],
                    s = "string" != typeof t && wt(t);
                if (!At.test(t))
                    for (; n < o; n++)
                        for (i = this[n]; i && i !== e; i = i.parentNode)
                            if (i.nodeType < 11 && (s ? -1 < s.index(i) : 1 === i.nodeType && wt.find.matchesSelector(i, t))) {
                                r.push(i);
                                break
                            }
                return this.pushStack(1 < r.length ? wt.uniqueSort(r) : r)
            },
            index: function(t) {
                return t ? "string" == typeof t ? ut.call(wt(t), this[0]) : ut.call(this, t.jquery ? t[0] : t) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
            },
            add: function(t, e) {
                return this.pushStack(wt.uniqueSort(wt.merge(this.get(), wt(t, e))))
            },
            addBack: function(t) {
                return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
            }
        }), wt.each({
            parent: function(t) {
                var e = t.parentNode;
                return e && 11 !== e.nodeType ? e : null
            },
            parents: function(t) {
                return St(t, "parentNode")
            },
            parentsUntil: function(t, e, i) {
                return St(t, "parentNode", i)
            },
            next: function(t) {
                return i(t, "nextSibling")
            },
            prev: function(t) {
                return i(t, "previousSibling")
            },
            nextAll: function(t) {
                return St(t, "nextSibling")
            },
            prevAll: function(t) {
                return St(t, "previousSibling")
            },
            nextUntil: function(t, e, i) {
                return St(t, "nextSibling", i)
            },
            prevUntil: function(t, e, i) {
                return St(t, "previousSibling", i)
            },
            siblings: function(t) {
                return Et((t.parentNode || {}).firstChild, t)
            },
            children: function(t) {
                return Et(t.firstChild)
            },
            contents: function(t) {
                return h(t, "iframe") ? t.contentDocument : (h(t, "template") && (t = t.content || t), wt.merge([], t.childNodes))
            }
        }, function(n, o) {
            wt.fn[n] = function(t, e) {
                var i = wt.map(this, o, t);
                return "Until" !== n.slice(-5) && (e = t), e && "string" == typeof e && (i = wt.filter(e, i)), 1 < this.length && (Lt[n] || wt.uniqueSort(i), Ot.test(n) && i.reverse()), this.pushStack(i)
            }
        });
        var Dt = /[^\x20\t\r\n\f]+/g;
        wt.Callbacks = function(n) {
            n = "string" == typeof n ? c(n) : wt.extend({}, n);
            var o, t, e, i, r = [],
                s = [],
                a = -1,
                l = function() {
                    for (i = i || n.once, e = o = !0; s.length; a = -1)
                        for (t = s.shift(); ++a < r.length;) !1 === r[a].apply(t[0], t[1]) && n.stopOnFalse && (a = r.length, t = !1);
                    n.memory || (t = !1), o = !1, i && (r = t ? [] : "")
                },
                h = {
                    add: function() {
                        return r && (t && !o && (a = r.length - 1, s.push(t)), function i(t) {
                            wt.each(t, function(t, e) {
                                yt(e) ? n.unique && h.has(e) || r.push(e) : e && e.length && "string" !== m(e) && i(e)
                            })
                        }(arguments), t && !o && l()), this
                    },
                    remove: function() {
                        return wt.each(arguments, function(t, e) {
                            for (var i; - 1 < (i = wt.inArray(e, r, i));) r.splice(i, 1), i <= a && a--
                        }), this
                    },
                    has: function(t) {
                        return t ? -1 < wt.inArray(t, r) : 0 < r.length
                    },
                    empty: function() {
                        return r && (r = []), this
                    },
                    disable: function() {
                        return i = s = [], r = t = "", this
                    },
                    disabled: function() {
                        return !r
                    },
                    lock: function() {
                        return i = s = [], t || o || (r = t = ""), this
                    },
                    locked: function() {
                        return !!i
                    },
                    fireWith: function(t, e) {
                        return i || (e = [t, (e = e || []).slice ? e.slice() : e], s.push(e), o || l()), this
                    },
                    fire: function() {
                        return h.fireWith(this, arguments), this
                    },
                    fired: function() {
                        return !!e
                    }
                };
            return h
        }, wt.extend({
            Deferred: function(t) {
                var r = [
                        ["notify", "progress", wt.Callbacks("memory"), wt.Callbacks("memory"), 2],
                        ["resolve", "done", wt.Callbacks("once memory"), wt.Callbacks("once memory"), 0, "resolved"],
                        ["reject", "fail", wt.Callbacks("once memory"), wt.Callbacks("once memory"), 1, "rejected"]
                    ],
                    o = "pending",
                    s = {
                        state: function() {
                            return o
                        },
                        always: function() {
                            return a.done(arguments).fail(arguments), this
                        },
                        "catch": function(t) {
                            return s.then(null, t)
                        },
                        pipe: function() {
                            var o = arguments;
                            return wt.Deferred(function(n) {
                                wt.each(r, function(t, e) {
                                    var i = yt(o[e[4]]) && o[e[4]];
                                    a[e[1]](function() {
                                        var t = i && i.apply(this, arguments);
                                        t && yt(t.promise) ? t.promise().progress(n.notify).done(n.resolve).fail(n.reject) : n[e[0] + "With"](this, i ? [t] : arguments)
                                    })
                                }), o = null
                            }).promise()
                        },
                        then: function(e, i, n) {
                            function l(o, r, s, a) {
                                return function() {
                                    var i = this,
                                        n = arguments,
                                        t = function() {
                                            var t, e;
                                            if (!(o < h)) {
                                                if ((t = s.apply(i, n)) === r.promise()) throw new TypeError("Thenable self-resolution");
                                                e = t && ("object" == typeof t || "function" == typeof t) && t.then, yt(e) ? a ? e.call(t, l(h, r, u, a), l(h, r, d, a)) : (h++, e.call(t, l(h, r, u, a), l(h, r, d, a), l(h, r, u, r.notifyWith))) : (s !== u && (i = void 0, n = [t]), (a || r.resolveWith)(i, n))
                                            }
                                        },
                                        e = a ? t : function() {
                                            try {
                                                t()
                                            } catch (C) {
                                                wt.Deferred.exceptionHook && wt.Deferred.exceptionHook(C, e.stackTrace), h <= o + 1 && (s !== d && (i = void 0, n = [C]), r.rejectWith(i, n))
                                            }
                                        };
                                    o ? e() : (wt.Deferred.getStackHook && (e.stackTrace = wt.Deferred.getStackHook()), C.setTimeout(e))
                                }
                            }
                            var h = 0;
                            return wt.Deferred(function(t) {
                                r[0][3].add(l(0, t, yt(n) ? n : u, t.notifyWith)), r[1][3].add(l(0, t, yt(e) ? e : u)), r[2][3].add(l(0, t, yt(i) ? i : d))
                            }).promise()
                        },
                        promise: function(t) {
                            return null != t ? wt.extend(t, s) : s
                        }
                    },
                    a = {};
                return wt.each(r, function(t, e) {
                    var i = e[2],
                        n = e[5];
                    s[e[1]] = i.add, n && i.add(function() {
                        o = n
                    }, r[3 - t][2].disable, r[3 - t][3].disable, r[0][2].lock, r[0][3].lock), i.add(e[3].fire), a[e[0]] = function() {
                        return a[e[0] + "With"](this === a ? void 0 : this, arguments), this
                    }, a[e[0] + "With"] = i.fireWith
                }), s.promise(a), t && t.call(a, a), a
            },
            when: function(t) {
                var i = arguments.length,
                    e = i,
                    n = Array(e),
                    o = lt.call(arguments),
                    r = wt.Deferred(),
                    s = function(e) {
                        return function(t) {
                            n[e] = this, o[e] = 1 < arguments.length ? lt.call(arguments) : t, --i || r.resolveWith(n, o)
                        }
                    };
                if (i <= 1 && (l(t, r.done(s(e)).resolve, r.reject, !i), "pending" === r.state() || yt(o[e] && o[e].then))) return r.then();
                for (; e--;) l(o[e], s(e), r.reject);
                return r.promise()
            }
        });
        var It = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
        wt.Deferred.exceptionHook = function(t, e) {
            C.console && C.console.warn && t && It.test(t.name) && C.console.warn("jQuery.Deferred exception: " + t.message, t.stack, e)
        }, wt.readyException = function(t) {
            C.setTimeout(function() {
                throw t
            })
        };
        var Pt = wt.Deferred();
        wt.fn.ready = function(t) {
            return Pt.then(t)["catch"](function(t) {
                wt.readyException(t)
            }), this
        }, wt.extend({
            isReady: !1,
            readyWait: 1,
            ready: function(t) {
                (!0 === t ? --wt.readyWait : wt.isReady) || ((wt.isReady = !0) !== t && 0 < --wt.readyWait || Pt.resolveWith(st, [wt]))
            }
        }), wt.ready.then = Pt.then, "complete" === st.readyState || "loading" !== st.readyState && !st.documentElement.doScroll ? C.setTimeout(wt.ready) : (st.addEventListener("DOMContentLoaded", n), C.addEventListener("load", n));
        var Nt = function(t, e, i, n, o, r, s) {
                var a = 0,
                    l = t.length,
                    h = null == i;
                if ("object" === m(i))
                    for (a in o = !0, i) Nt(t, e, a, i[a], !0, r, s);
                else if (void 0 !== n && (o = !0, yt(n) || (s = !0), h && (s ? (e.call(t, n), e = null) : (h = e, e = function(t, e, i) {
                        return h.call(wt(t), i)
                    })), e))
                    for (; a < l; a++) e(t[a], i, s ? n : n.call(t[a], a, e(t[a], i)));
                return o ? t : h ? e.call(t) : l ? e(t[0], i) : r
            },
            Rt = /^-ms-/,
            Ht = /-([a-z])/g,
            zt = function(t) {
                return 1 === t.nodeType || 9 === t.nodeType || !+t.nodeType
            };
        r.uid = 1, r.prototype = {
            cache: function(t) {
                var e = t[this.expando];
                return e || (e = {}, zt(t) && (t.nodeType ? t[this.expando] = e : Object.defineProperty(t, this.expando, {
                    value: e,
                    configurable: !0
                }))), e
            },
            set: function(t, e, i) {
                var n, o = this.cache(t);
                if ("string" == typeof e) o[p(e)] = i;
                else
                    for (n in e) o[p(n)] = e[n];
                return o
            },
            get: function(t, e) {
                return void 0 === e ? this.cache(t) : t[this.expando] && t[this.expando][p(e)]
            },
            access: function(t, e, i) {
                return void 0 === e || e && "string" == typeof e && void 0 === i ? this.get(t, e) : (this.set(t, e, i), void 0 !== i ? i : e)
            },
            remove: function(t, e) {
                var i, n = t[this.expando];
                if (void 0 !== n) {
                    if (void 0 !== e) {
                        i = (e = Array.isArray(e) ? e.map(p) : (e = p(e)) in n ? [e] : e.match(Dt) || []).length;
                        for (; i--;) delete n[e[i]]
                    }(void 0 === e || wt.isEmptyObject(n)) && (t.nodeType ? t[this.expando] = void 0 : delete t[this.expando])
                }
            },
            hasData: function(t) {
                var e = t[this.expando];
                return void 0 !== e && !wt.isEmptyObject(e)
            }
        };
        var Bt = new r,
            Wt = new r,
            jt = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
            Ft = /[A-Z]/g;
        wt.extend({
            hasData: function(t) {
                return Wt.hasData(t) || Bt.hasData(t)
            },
            data: function(t, e, i) {
                return Wt.access(t, e, i)
            },
            removeData: function(t, e) {
                Wt.remove(t, e)
            },
            _data: function(t, e, i) {
                return Bt.access(t, e, i)
            },
            _removeData: function(t, e) {
                Bt.remove(t, e)
            }
        }), wt.fn.extend({
            data: function(i, t) {
                var e, n, o, r = this[0],
                    s = r && r.attributes;
                if (void 0 !== i) return "object" == typeof i ? this.each(function() {
                    Wt.set(this, i)
                }) : Nt(this, function(t) {
                    var e;
                    if (r && void 0 === t) {
                        if (void 0 !== (e = Wt.get(r, i))) return e;
                        if (void 0 !== (e = f(r, i))) return e
                    } else this.each(function() {
                        Wt.set(this, i, t)
                    })
                }, null, t, 1 < arguments.length, null, !0);
                if (this.length && (o = Wt.get(r), 1 === r.nodeType && !Bt.get(r, "hasDataAttrs"))) {
                    for (e = s.length; e--;) s[e] && 0 === (n = s[e].name).indexOf("data-") && (n = p(n.slice(5)), f(r, n, o[n]));
                    Bt.set(r, "hasDataAttrs", !0)
                }
                return o
            },
            removeData: function(t) {
                return this.each(function() {
                    Wt.remove(this, t)
                })
            }
        }), wt.extend({
            queue: function(t, e, i) {
                var n;
                if (t) return e = (e || "fx") + "queue", n = Bt.get(t, e), i && (!n || Array.isArray(i) ? n = Bt.access(t, e, wt.makeArray(i)) : n.push(i)), n || []
            },
            dequeue: function(t, e) {
                e = e || "fx";
                var i = wt.queue(t, e),
                    n = i.length,
                    o = i.shift(),
                    r = wt._queueHooks(t, e),
                    s = function() {
                        wt.dequeue(t, e)
                    };
                "inprogress" === o && (o = i.shift(), n--), o && ("fx" === e && i.unshift("inprogress"), delete r.stop, o.call(t, s, r)), !n && r && r.empty.fire()
            },
            _queueHooks: function(t, e) {
                var i = e + "queueHooks";
                return Bt.get(t, i) || Bt.access(t, i, {
                    empty: wt.Callbacks("once memory").add(function() {
                        Bt.remove(t, [e + "queue", i])
                    })
                })
            }
        }), wt.fn.extend({
            queue: function(e, i) {
                var t = 2;
                return "string" != typeof e && (i = e, e = "fx", t--), arguments.length < t ? wt.queue(this[0], e) : void 0 === i ? this : this.each(function() {
                    var t = wt.queue(this, e, i);
                    wt._queueHooks(this, e), "fx" === e && "inprogress" !== t[0] && wt.dequeue(this, e)
                })
            },
            dequeue: function(t) {
                return this.each(function() {
                    wt.dequeue(this, t)
                })
            },
            clearQueue: function(t) {
                return this.queue(t || "fx", [])
            },
            promise: function(t, e) {
                var i, n = 1,
                    o = wt.Deferred(),
                    r = this,
                    s = this.length,
                    a = function() {
                        --n || o.resolveWith(r, [r])
                    };
                for ("string" != typeof t && (e = t, t = void 0), t = t || "fx"; s--;)(i = Bt.get(r[s], t + "queueHooks")) && i.empty && (n++, i.empty.add(a));
                return a(), o.promise(e)
            }
        });
        var qt = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
            Gt = new RegExp("^(?:([+-])=|)(" + qt + ")([a-z%]*)$", "i"),
            Ut = ["Top", "Right", "Bottom", "Left"],
            Vt = function(t, e) {
                return "none" === (t = e || t).style.display || "" === t.style.display && wt.contains(t.ownerDocument, t) && "none" === wt.css(t, "display")
            },
            Xt = function(t, e, i, n) {
                var o, r, s = {};
                for (r in e) s[r] = t.style[r], t.style[r] = e[r];
                for (r in o = i.apply(t, n || []), e) t.style[r] = s[r];
                return o
            },
            Yt = {};
        wt.fn.extend({
            show: function() {
                return b(this, !0)
            },
            hide: function() {
                return b(this)
            },
            toggle: function(t) {
                return "boolean" == typeof t ? t ? this.show() : this.hide() : this.each(function() {
                    Vt(this) ? wt(this).show() : wt(this).hide()
                })
            }
        });
        var Kt = /^(?:checkbox|radio)$/i,
            $t = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i,
            Qt = /^$|^module$|\/(?:java|ecma)script/i,
            Zt = {
                option: [1, "<select multiple='multiple'>", "</select>"],
                thead: [1, "<table>", "</table>"],
                col: [2, "<table><colgroup>", "</colgroup></table>"],
                tr: [2, "<table><tbody>", "</tbody></table>"],
                td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                _default: [0, "", ""]
            };
        Zt.optgroup = Zt.option, Zt.tbody = Zt.tfoot = Zt.colgroup = Zt.caption = Zt.thead, Zt.th = Zt.td;
        var Jt, te, ee = /<|&#?\w+;/;
        Jt = st.createDocumentFragment().appendChild(st.createElement("div")), (te = st.createElement("input")).setAttribute("type", "radio"), te.setAttribute("checked", "checked"), te.setAttribute("name", "t"), Jt.appendChild(te), vt.checkClone = Jt.cloneNode(!0).cloneNode(!0).lastChild.checked, Jt.innerHTML = "<textarea>x</textarea>", vt.noCloneChecked = !!Jt.cloneNode(!0).lastChild.defaultValue;
        var ie = st.documentElement,
            ne = /^key/,
            oe = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
            re = /^([^.]*)(?:\.(.+)|)/;
        wt.event = {
            global: {},
            add: function(e, t, i, n, o) {
                var r, s, a, l, h, c, u, d, p, f, g, m = Bt.get(e);
                if (m)
                    for (i.handler && (i = (r = i).handler, o = r.selector), o && wt.find.matchesSelector(ie, o), i.guid || (i.guid = wt.guid++), (l = m.events) || (l = m.events = {}), (s = m.handle) || (s = m.handle = function(t) {
                            return void 0 !== wt && wt.event.triggered !== t.type ? wt.event.dispatch.apply(e, arguments) : void 0
                        }), h = (t = (t || "").match(Dt) || [""]).length; h--;) p = g = (a = re.exec(t[h]) || [])[1], f = (a[2] || "").split(".").sort(), p && (u = wt.event.special[p] || {}, p = (o ? u.delegateType : u.bindType) || p, u = wt.event.special[p] || {}, c = wt.extend({
                        type: p,
                        origType: g,
                        data: n,
                        handler: i,
                        guid: i.guid,
                        selector: o,
                        needsContext: o && wt.expr.match.needsContext.test(o),
                        namespace: f.join(".")
                    }, r), (d = l[p]) || ((d = l[p] = []).delegateCount = 0, u.setup && !1 !== u.setup.call(e, n, f, s) || e.addEventListener && e.addEventListener(p, s)), u.add && (u.add.call(e, c), c.handler.guid || (c.handler.guid = i.guid)), o ? d.splice(d.delegateCount++, 0, c) : d.push(c), wt.event.global[p] = !0)
            },
            remove: function(t, e, i, n, o) {
                var r, s, a, l, h, c, u, d, p, f, g, m = Bt.hasData(t) && Bt.get(t);
                if (m && (l = m.events)) {
                    for (h = (e = (e || "").match(Dt) || [""]).length; h--;)
                        if (p = g = (a = re.exec(e[h]) || [])[1], f = (a[2] || "").split(".").sort(), p) {
                            for (u = wt.event.special[p] || {}, d = l[p = (n ? u.delegateType : u.bindType) || p] || [], a = a[2] && new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)"), s = r = d.length; r--;) c = d[r], !o && g !== c.origType || i && i.guid !== c.guid || a && !a.test(c.namespace) || n && n !== c.selector && ("**" !== n || !c.selector) || (d.splice(r, 1), c.selector && d.delegateCount--, u.remove && u.remove.call(t, c));
                            s && !d.length && (u.teardown && !1 !== u.teardown.call(t, f, m.handle) || wt.removeEvent(t, p, m.handle), delete l[p])
                        } else
                            for (p in l) wt.event.remove(t, p + e[h], i, n, !0);
                    wt.isEmptyObject(l) && Bt.remove(t, "handle events")
                }
            },
            dispatch: function(t) {
                var e, i, n, o, r, s, a = wt.event.fix(t),
                    l = new Array(arguments.length),
                    h = (Bt.get(this, "events") || {})[a.type] || [],
                    c = wt.event.special[a.type] || {};
                for (l[0] = a, e = 1; e < arguments.length; e++) l[e] = arguments[e];
                if (a.delegateTarget = this, !c.preDispatch || !1 !== c.preDispatch.call(this, a)) {
                    for (s = wt.event.handlers.call(this, a, h), e = 0;
                        (o = s[e++]) && !a.isPropagationStopped();)
                        for (a.currentTarget = o.elem, i = 0;
                            (r = o.handlers[i++]) && !a.isImmediatePropagationStopped();) a.rnamespace && !a.rnamespace.test(r.namespace) || (a.handleObj = r, a.data = r.data, void 0 !== (n = ((wt.event.special[r.origType] || {}).handle || r.handler).apply(o.elem, l)) && !1 === (a.result = n) && (a.preventDefault(), a.stopPropagation()));
                    return c.postDispatch && c.postDispatch.call(this, a), a.result
                }
            },
            handlers: function(t, e) {
                var i, n, o, r, s, a = [],
                    l = e.delegateCount,
                    h = t.target;
                if (l && h.nodeType && !("click" === t.type && 1 <= t.button))
                    for (; h !== this; h = h.parentNode || this)
                        if (1 === h.nodeType && ("click" !== t.type || !0 !== h.disabled)) {
                            for (r = [], s = {}, i = 0; i < l; i++) void 0 === s[o = (n = e[i]).selector + " "] && (s[o] = n.needsContext ? -1 < wt(o, this).index(h) : wt.find(o, this, null, [h]).length), s[o] && r.push(n);
                            r.length && a.push({
                                elem: h,
                                handlers: r
                            })
                        }
                return h = this, l < e.length && a.push({
                    elem: h,
                    handlers: e.slice(l)
                }), a
            },
            addProp: function(e, t) {
                Object.defineProperty(wt.Event.prototype, e, {
                    enumerable: !0,
                    configurable: !0,
                    get: yt(t) ? function() {
                        if (this.originalEvent) return t(this.originalEvent)
                    } : function() {
                        if (this.originalEvent) return this.originalEvent[e]
                    },
                    set: function(t) {
                        Object.defineProperty(this, e, {
                            enumerable: !0,
                            configurable: !0,
                            writable: !0,
                            value: t
                        })
                    }
                })
            },
            fix: function(t) {
                return t[wt.expando] ? t : new wt.Event(t)
            },
            special: {
                load: {
                    noBubble: !0
                },
                focus: {
                    trigger: function() {
                        if (this !== A() && this.focus) return this.focus(), !1
                    },
                    delegateType: "focusin"
                },
                blur: {
                    trigger: function() {
                        if (this === A() && this.blur) return this.blur(), !1
                    },
                    delegateType: "focusout"
                },
                click: {
                    trigger: function() {
                        if ("checkbox" === this.type && this.click && h(this, "input")) return this.click(), !1
                    },
                    _default: function(t) {
                        return h(t.target, "a")
                    }
                },
                beforeunload: {
                    postDispatch: function(t) {
                        void 0 !== t.result && t.originalEvent && (t.originalEvent.returnValue = t.result)
                    }
                }
            }
        }, wt.removeEvent = function(t, e, i) {
            t.removeEventListener && t.removeEventListener(e, i)
        }, wt.Event = function(t, e) {
            if (!(this instanceof wt.Event)) return new wt.Event(t, e);
            t && t.type ? (this.originalEvent = t, this.type = t.type, this.isDefaultPrevented = t.defaultPrevented || void 0 === t.defaultPrevented && !1 === t.returnValue ? S : E, this.target = t.target && 3 === t.target.nodeType ? t.target.parentNode : t.target, this.currentTarget = t.currentTarget, this.relatedTarget = t.relatedTarget) : this.type = t, e && wt.extend(this, e), this.timeStamp = t && t.timeStamp || Date.now(), this[wt.expando] = !0
        }, wt.Event.prototype = {
            constructor: wt.Event,
            isDefaultPrevented: E,
            isPropagationStopped: E,
            isImmediatePropagationStopped: E,
            isSimulated: !1,
            preventDefault: function() {
                var t = this.originalEvent;
                this.isDefaultPrevented = S, t && !this.isSimulated && t.preventDefault()
            },
            stopPropagation: function() {
                var t = this.originalEvent;
                this.isPropagationStopped = S, t && !this.isSimulated && t.stopPropagation()
            },
            stopImmediatePropagation: function() {
                var t = this.originalEvent;
                this.isImmediatePropagationStopped = S, t && !this.isSimulated && t.stopImmediatePropagation(), this.stopPropagation()
            }
        }, wt.each({
            altKey: !0,
            bubbles: !0,
            cancelable: !0,
            changedTouches: !0,
            ctrlKey: !0,
            detail: !0,
            eventPhase: !0,
            metaKey: !0,
            pageX: !0,
            pageY: !0,
            shiftKey: !0,
            view: !0,
            "char": !0,
            charCode: !0,
            key: !0,
            keyCode: !0,
            button: !0,
            buttons: !0,
            clientX: !0,
            clientY: !0,
            offsetX: !0,
            offsetY: !0,
            pointerId: !0,
            pointerType: !0,
            screenX: !0,
            screenY: !0,
            targetTouches: !0,
            toElement: !0,
            touches: !0,
            which: function(t) {
                var e = t.button;
                return null == t.which && ne.test(t.type) ? null != t.charCode ? t.charCode : t.keyCode : !t.which && void 0 !== e && oe.test(t.type) ? 1 & e ? 1 : 2 & e ? 3 : 4 & e ? 2 : 0 : t.which
            }
        }, wt.event.addProp), wt.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout",
            pointerenter: "pointerover",
            pointerleave: "pointerout"
        }, function(t, r) {
            wt.event.special[t] = {
                delegateType: r,
                bindType: r,
                handle: function(t) {
                    var e, i = this,
                        n = t.relatedTarget,
                        o = t.handleObj;
                    return n && (n === i || wt.contains(i, n)) || (t.type = o.origType, e = o.handler.apply(this, arguments), t.type = r), e
                }
            }
        }), wt.fn.extend({
            on: function(t, e, i, n) {
                return k(this, t, e, i, n)
            },
            one: function(t, e, i, n) {
                return k(this, t, e, i, n, 1)
            },
            off: function(t, e, i) {
                var n, o;
                if (t && t.preventDefault && t.handleObj) return n = t.handleObj, wt(t.delegateTarget).off(n.namespace ? n.origType + "." + n.namespace : n.origType, n.selector, n.handler), this;
                if ("object" != typeof t) return !1 !== e && "function" != typeof e || (i = e, e = void 0), !1 === i && (i = E), this.each(function() {
                    wt.event.remove(this, t, i, e)
                });
                for (o in t) this.off(o, e, t[o]);
                return this
            }
        });
        var se = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
            ae = /<script|<style|<link/i,
            le = /checked\s*(?:[^=]|=\s*.checked.)/i,
            he = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
        wt.extend({
            htmlPrefilter: function(t) {
                return t.replace(se, "<$1></$2>")
            },
            clone: function(t, e, i) {
                var n, o, r, s, a = t.cloneNode(!0),
                    l = wt.contains(t.ownerDocument, t);
                if (!(vt.noCloneChecked || 1 !== t.nodeType && 11 !== t.nodeType || wt.isXMLDoc(t)))
                    for (s = x(a), n = 0, o = (r = x(t)).length; n < o; n++) D(r[n], s[n]);
                if (e)
                    if (i)
                        for (r = r || x(t), s = s || x(a), n = 0, o = r.length; n < o; n++) L(r[n], s[n]);
                    else L(t, a);
                return 0 < (s = x(a, "script")).length && w(s, !l && x(t, "script")), a
            },
            cleanData: function(t) {
                for (var e, i, n, o = wt.event.special, r = 0; void 0 !== (i = t[r]); r++)
                    if (zt(i)) {
                        if (e = i[Bt.expando]) {
                            if (e.events)
                                for (n in e.events) o[n] ? wt.event.remove(i, n) : wt.removeEvent(i, n, e.handle);
                            i[Bt.expando] = void 0
                        }
                        i[Wt.expando] && (i[Wt.expando] = void 0)
                    }
            }
        }), wt.fn.extend({
            detach: function(t) {
                return P(this, t, !0)
            },
            remove: function(t) {
                return P(this, t)
            },
            text: function(t) {
                return Nt(this, function(t) {
                    return void 0 === t ? wt.text(this) : this.empty().each(function() {
                        1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = t)
                    })
                }, null, t, arguments.length)
            },
            append: function() {
                return I(this, arguments, function(t) {
                    1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || _(this, t).appendChild(t)
                })
            },
            prepend: function() {
                return I(this, arguments, function(t) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var e = _(this, t);
                        e.insertBefore(t, e.firstChild)
                    }
                })
            },
            before: function() {
                return I(this, arguments, function(t) {
                    this.parentNode && this.parentNode.insertBefore(t, this)
                })
            },
            after: function() {
                return I(this, arguments, function(t) {
                    this.parentNode && this.parentNode.insertBefore(t, this.nextSibling)
                })
            },
            empty: function() {
                for (var t, e = 0; null != (t = this[e]); e++) 1 === t.nodeType && (wt.cleanData(x(t, !1)), t.textContent = "");
                return this
            },
            clone: function(t, e) {
                return t = null != t && t, e = null == e ? t : e, this.map(function() {
                    return wt.clone(this, t, e)
                })
            },
            html: function(t) {
                return Nt(this, function(t) {
                    var e = this[0] || {},
                        i = 0,
                        n = this.length;
                    if (void 0 === t && 1 === e.nodeType) return e.innerHTML;
                    if ("string" == typeof t && !ae.test(t) && !Zt[($t.exec(t) || ["", ""])[1].toLowerCase()]) {
                        t = wt.htmlPrefilter(t);
                        try {
                            for (; i < n; i++) 1 === (e = this[i] || {}).nodeType && (wt.cleanData(x(e, !1)), e.innerHTML = t);
                            e = 0
                        } catch (t) {}
                    }
                    e && this.empty().append(t)
                }, null, t, arguments.length)
            },
            replaceWith: function() {
                var i = [];
                return I(this, arguments, function(t) {
                    var e = this.parentNode;
                    wt.inArray(this, i) < 0 && (wt.cleanData(x(this)), e && e.replaceChild(t, this))
                }, i)
            }
        }), wt.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        }, function(t, s) {
            wt.fn[t] = function(t) {
                for (var e, i = [], n = wt(t), o = n.length - 1, r = 0; r <= o; r++) e = r === o ? this : this.clone(!0), wt(n[r])[s](e), ct.apply(i, e.get());
                return this.pushStack(i)
            }
        });
        var ce = new RegExp("^(" + qt + ")(?!px)[a-z%]+$", "i"),
            ue = function(t) {
                var e = t.ownerDocument.defaultView;
                return e && e.opener || (e = C), e.getComputedStyle(t)
            },
            de = new RegExp(Ut.join("|"), "i");
        ! function() {
            function t() {
                if (l) {
                    a.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0", l.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%", ie.appendChild(a).appendChild(l);
                    var t = C.getComputedStyle(l);
                    i = "1%" !== t.top, s = 12 === e(t.marginLeft), l.style.right = "60%", r = 36 === e(t.right), n = 36 === e(t.width), l.style.position = "absolute", o = 36 === l.offsetWidth || "absolute", ie.removeChild(a), l = null
                }
            }

            function e(t) {
                return Math.round(parseFloat(t))
            }
            var i, n, o, r, s, a = st.createElement("div"),
                l = st.createElement("div");
            l.style && (l.style.backgroundClip = "content-box", l.cloneNode(!0).style.backgroundClip = "", vt.clearCloneStyle = "content-box" === l.style.backgroundClip, wt.extend(vt, {
                boxSizingReliable: function() {
                    return t(), n
                },
                pixelBoxStyles: function() {
                    return t(), r
                },
                pixelPosition: function() {
                    return t(), i
                },
                reliableMarginLeft: function() {
                    return t(), s
                },
                scrollboxSize: function() {
                    return t(), o
                }
            }))
        }();
        var pe = /^(none|table(?!-c[ea]).+)/,
            fe = /^--/,
            ge = {
                position: "absolute",
                visibility: "hidden",
                display: "block"
            },
            me = {
                letterSpacing: "0",
                fontWeight: "400"
            },
            ve = ["Webkit", "Moz", "ms"],
            ye = st.createElement("div").style;
        wt.extend({
            cssHooks: {
                opacity: {
                    get: function(t, e) {
                        if (e) {
                            var i = N(t, "opacity");
                            return "" === i ? "1" : i
                        }
                    }
                }
            },
            cssNumber: {
                animationIterationCount: !0,
                columnCount: !0,
                fillOpacity: !0,
                flexGrow: !0,
                flexShrink: !0,
                fontWeight: !0,
                lineHeight: !0,
                opacity: !0,
                order: !0,
                orphans: !0,
                widows: !0,
                zIndex: !0,
                zoom: !0
            },
            cssProps: {},
            style: function(t, e, i, n) {
                if (t && 3 !== t.nodeType && 8 !== t.nodeType && t.style) {
                    var o, r, s, a = p(e),
                        l = fe.test(e),
                        h = t.style;
                    if (l || (e = z(a)), s = wt.cssHooks[e] || wt.cssHooks[a], void 0 === i) return s && "get" in s && void 0 !== (o = s.get(t, !1, n)) ? o : h[e];
                    "string" == (r = typeof i) && (o = Gt.exec(i)) && o[1] && (i = v(t, e, o), r = "number"), null != i && i == i && ("number" === r && (i += o && o[3] || (wt.cssNumber[a] ? "" : "px")), vt.clearCloneStyle || "" !== i || 0 !== e.indexOf("background") || (h[e] = "inherit"), s && "set" in s && void 0 === (i = s.set(t, i, n)) || (l ? h.setProperty(e, i) : h[e] = i))
                }
            },
            css: function(t, e, i, n) {
                var o, r, s, a = p(e);
                return fe.test(e) || (e = z(a)), (s = wt.cssHooks[e] || wt.cssHooks[a]) && "get" in s && (o = s.get(t, !0, i)), void 0 === o && (o = N(t, e, n)), "normal" === o && e in me && (o = me[e]), "" === i || i ? (r = parseFloat(o), !0 === i || isFinite(r) ? r || 0 : o) : o
            }
        }), wt.each(["height", "width"], function(t, a) {
            wt.cssHooks[a] = {
                get: function(t, e, i) {
                    if (e) return !pe.test(wt.css(t, "display")) || t.getClientRects().length && t.getBoundingClientRect().width ? j(t, a, i) : Xt(t, ge, function() {
                        return j(t, a, i)
                    })
                },
                set: function(t, e, i) {
                    var n, o = ue(t),
                        r = "border-box" === wt.css(t, "boxSizing", !1, o),
                        s = i && W(t, a, i, r, o);
                    return r && vt.scrollboxSize() === o.position && (s -= Math.ceil(t["offset" + a[0].toUpperCase() + a.slice(1)] - parseFloat(o[a]) - W(t, a, "border", !1, o) - .5)), s && (n = Gt.exec(e)) && "px" !== (n[3] || "px") && (t.style[a] = e, e = wt.css(t, a)), B(t, e, s)
                }
            }
        }), wt.cssHooks.marginLeft = R(vt.reliableMarginLeft, function(t, e) {
            if (e) return (parseFloat(N(t, "marginLeft")) || t.getBoundingClientRect().left - Xt(t, {
                marginLeft: 0
            }, function() {
                return t.getBoundingClientRect().left
            })) + "px"
        }), wt.each({
            margin: "",
            padding: "",
            border: "Width"
        }, function(o, r) {
            wt.cssHooks[o + r] = {
                expand: function(t) {
                    for (var e = 0, i = {}, n = "string" == typeof t ? t.split(" ") : [t]; e < 4; e++) i[o + Ut[e] + r] = n[e] || n[e - 2] || n[0];
                    return i
                }
            }, "margin" !== o && (wt.cssHooks[o + r].set = B)
        }), wt.fn.extend({
            css: function(t, e) {
                return Nt(this, function(t, e, i) {
                    var n, o, r = {},
                        s = 0;
                    if (Array.isArray(e)) {
                        for (n = ue(t), o = e.length; s < o; s++) r[e[s]] = wt.css(t, e[s], !1, n);
                        return r
                    }
                    return void 0 !== i ? wt.style(t, e, i) : wt.css(t, e)
                }, t, e, 1 < arguments.length)
            }
        }), (wt.Tween = F).prototype = {
            constructor: F,
            init: function(t, e, i, n, o, r) {
                this.elem = t, this.prop = i, this.easing = o || wt.easing._default, this.options = e, this.start = this.now = this.cur(), this.end = n, this.unit = r || (wt.cssNumber[i] ? "" : "px")
            },
            cur: function() {
                var t = F.propHooks[this.prop];
                return t && t.get ? t.get(this) : F.propHooks._default.get(this)
            },
            run: function(t) {
                var e, i = F.propHooks[this.prop];
                return this.options.duration ? this.pos = e = wt.easing[this.easing](t, this.options.duration * t, 0, 1, this.options.duration) : this.pos = e = t, this.now = (this.end - this.start) * e + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), i && i.set ? i.set(this) : F.propHooks._default.set(this), this
            }
        }, F.prototype.init.prototype = F.prototype, F.propHooks = {
            _default: {
                get: function(t) {
                    var e;
                    return 1 !== t.elem.nodeType || null != t.elem[t.prop] && null == t.elem.style[t.prop] ? t.elem[t.prop] : (e = wt.css(t.elem, t.prop, "")) && "auto" !== e ? e : 0
                },
                set: function(t) {
                    wt.fx.step[t.prop] ? wt.fx.step[t.prop](t) : 1 !== t.elem.nodeType || null == t.elem.style[wt.cssProps[t.prop]] && !wt.cssHooks[t.prop] ? t.elem[t.prop] = t.now : wt.style(t.elem, t.prop, t.now + t.unit)
                }
            }
        }, F.propHooks.scrollTop = F.propHooks.scrollLeft = {
            set: function(t) {
                t.elem.nodeType && t.elem.parentNode && (t.elem[t.prop] = t.now)
            }
        }, wt.easing = {
            linear: function(t) {
                return t
            },
            swing: function(t) {
                return .5 - Math.cos(t * Math.PI) / 2
            },
            _default: "swing"
        }, wt.fx = F.prototype.init, wt.fx.step = {};
        var be, xe, we, Te, Ce = /^(?:toggle|show|hide)$/,
            Se = /queueHooks$/;
        wt.Animation = wt.extend(K, {
            tweeners: {
                "*": [function(t, e) {
                    var i = this.createTween(t, e);
                    return v(i.elem, t, Gt.exec(e), i), i
                }]
            },
            tweener: function(t, e) {
                yt(t) ? (e = t, t = ["*"]) : t = t.match(Dt);
                for (var i, n = 0, o = t.length; n < o; n++) i = t[n], K.tweeners[i] = K.tweeners[i] || [], K.tweeners[i].unshift(e)
            },
            prefilters: [X],
            prefilter: function(t, e) {
                e ? K.prefilters.unshift(t) : K.prefilters.push(t)
            }
        }), wt.speed = function(t, e, i) {
            var n = t && "object" == typeof t ? wt.extend({}, t) : {
                complete: i || !i && e || yt(t) && t,
                duration: t,
                easing: i && e || e && !yt(e) && e
            };
            return wt.fx.off ? n.duration = 0 : "number" != typeof n.duration && (n.duration in wt.fx.speeds ? n.duration = wt.fx.speeds[n.duration] : n.duration = wt.fx.speeds._default), null != n.queue && !0 !== n.queue || (n.queue = "fx"), n.old = n.complete, n.complete = function() {
                yt(n.old) && n.old.call(this), n.queue && wt.dequeue(this, n.queue)
            }, n
        }, wt.fn.extend({
            fadeTo: function(t, e, i, n) {
                return this.filter(Vt).css("opacity", 0).show().end().animate({
                    opacity: e
                }, t, i, n)
            },
            animate: function(e, t, i, n) {
                var o = wt.isEmptyObject(e),
                    r = wt.speed(t, i, n),
                    s = function() {
                        var t = K(this, wt.extend({}, e), r);
                        (o || Bt.get(this, "finish")) && t.stop(!0)
                    };
                return s.finish = s, o || !1 === r.queue ? this.each(s) : this.queue(r.queue, s)
            },
            stop: function(o, t, r) {
                var s = function(t) {
                    var e = t.stop;
                    delete t.stop, e(r)
                };
                return "string" != typeof o && (r = t, t = o, o = void 0), t && !1 !== o && this.queue(o || "fx", []), this.each(function() {
                    var t = !0,
                        e = null != o && o + "queueHooks",
                        i = wt.timers,
                        n = Bt.get(this);
                    if (e) n[e] && n[e].stop && s(n[e]);
                    else
                        for (e in n) n[e] && n[e].stop && Se.test(e) && s(n[e]);
                    for (e = i.length; e--;) i[e].elem !== this || null != o && i[e].queue !== o || (i[e].anim.stop(r), t = !1, i.splice(e, 1));
                    !t && r || wt.dequeue(this, o)
                })
            },
            finish: function(s) {
                return !1 !== s && (s = s || "fx"), this.each(function() {
                    var t, e = Bt.get(this),
                        i = e[s + "queue"],
                        n = e[s + "queueHooks"],
                        o = wt.timers,
                        r = i ? i.length : 0;
                    for (e.finish = !0, wt.queue(this, s, []), n && n.stop && n.stop.call(this, !0), t = o.length; t--;) o[t].elem === this && o[t].queue === s && (o[t].anim.stop(!0), o.splice(t, 1));
                    for (t = 0; t < r; t++) i[t] && i[t].finish && i[t].finish.call(this);
                    delete e.finish
                })
            }
        }), wt.each(["toggle", "show", "hide"], function(t, n) {
            var o = wt.fn[n];
            wt.fn[n] = function(t, e, i) {
                return null == t || "boolean" == typeof t ? o.apply(this, arguments) : this.animate(U(n, !0), t, e, i)
            }
        }), wt.each({
            slideDown: U("show"),
            slideUp: U("hide"),
            slideToggle: U("toggle"),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        }, function(t, n) {
            wt.fn[t] = function(t, e, i) {
                return this.animate(n, t, e, i)
            }
        }), wt.timers = [], wt.fx.tick = function() {
            var t, e = 0,
                i = wt.timers;
            for (be = Date.now(); e < i.length; e++)(t = i[e])() || i[e] !== t || i.splice(e--, 1);
            i.length || wt.fx.stop(), be = void 0
        }, wt.fx.timer = function(t) {
            wt.timers.push(t), wt.fx.start()
        }, wt.fx.interval = 13, wt.fx.start = function() {
            xe || (xe = !0, q())
        }, wt.fx.stop = function() {
            xe = null
        }, wt.fx.speeds = {
            slow: 600,
            fast: 200,
            _default: 400
        }, wt.fn.delay = function(n, t) {
            return n = wt.fx && wt.fx.speeds[n] || n, t = t || "fx", this.queue(t, function(t, e) {
                var i = C.setTimeout(t, n);
                e.stop = function() {
                    C.clearTimeout(i)
                }
            })
        }, we = st.createElement("input"), Te = st.createElement("select").appendChild(st.createElement("option")), we.type = "checkbox", vt.checkOn = "" !== we.value, vt.optSelected = Te.selected, (we = st.createElement("input")).value = "t", we.type = "radio", vt.radioValue = "t" === we.value;
        var Ee, Ae = wt.expr.attrHandle;
        wt.fn.extend({
            attr: function(t, e) {
                return Nt(this, wt.attr, t, e, 1 < arguments.length)
            },
            removeAttr: function(t) {
                return this.each(function() {
                    wt.removeAttr(this, t)
                })
            }
        }), wt.extend({
            attr: function(t, e, i) {
                var n, o, r = t.nodeType;
                if (3 !== r && 8 !== r && 2 !== r) return "undefined" == typeof t.getAttribute ? wt.prop(t, e, i) : (1 === r && wt.isXMLDoc(t) || (o = wt.attrHooks[e.toLowerCase()] || (wt.expr.match.bool.test(e) ? Ee : void 0)), void 0 !== i ? null === i ? void wt.removeAttr(t, e) : o && "set" in o && void 0 !== (n = o.set(t, i, e)) ? n : (t.setAttribute(e, i + ""), i) : o && "get" in o && null !== (n = o.get(t, e)) ? n : null == (n = wt.find.attr(t, e)) ? void 0 : n)
            },
            attrHooks: {
                type: {
                    set: function(t, e) {
                        if (!vt.radioValue && "radio" === e && h(t, "input")) {
                            var i = t.value;
                            return t.setAttribute("type", e), i && (t.value = i), e
                        }
                    }
                }
            },
            removeAttr: function(t, e) {
                var i, n = 0,
                    o = e && e.match(Dt);
                if (o && 1 === t.nodeType)
                    for (; i = o[n++];) t.removeAttribute(i)
            }
        }), Ee = {
            set: function(t, e, i) {
                return !1 === e ? wt.removeAttr(t, i) : t.setAttribute(i, i), i
            }
        }, wt.each(wt.expr.match.bool.source.match(/\w+/g), function(t, e) {
            var s = Ae[e] || wt.find.attr;
            Ae[e] = function(t, e, i) {
                var n, o, r = e.toLowerCase();
                return i || (o = Ae[r], Ae[r] = n, n = null != s(t, e, i) ? r : null, Ae[r] = o), n
            }
        });
        var ke = /^(?:input|select|textarea|button)$/i,
            _e = /^(?:a|area)$/i;
        wt.fn.extend({
            prop: function(t, e) {
                return Nt(this, wt.prop, t, e, 1 < arguments.length)
            },
            removeProp: function(t) {
                return this.each(function() {
                    delete this[wt.propFix[t] || t]
                })
            }
        }), wt.extend({
            prop: function(t, e, i) {
                var n, o, r = t.nodeType;
                if (3 !== r && 8 !== r && 2 !== r) return 1 === r && wt.isXMLDoc(t) || (e = wt.propFix[e] || e, o = wt.propHooks[e]), void 0 !== i ? o && "set" in o && void 0 !== (n = o.set(t, i, e)) ? n : t[e] = i : o && "get" in o && null !== (n = o.get(t, e)) ? n : t[e]
            },
            propHooks: {
                tabIndex: {
                    get: function(t) {
                        var e = wt.find.attr(t, "tabindex");
                        return e ? parseInt(e, 10) : ke.test(t.nodeName) || _e.test(t.nodeName) && t.href ? 0 : -1
                    }
                }
            },
            propFix: {
                "for": "htmlFor",
                "class": "className"
            }
        }), vt.optSelected || (wt.propHooks.selected = {
            get: function(t) {
                var e = t.parentNode;
                return e && e.parentNode && e.parentNode.selectedIndex, null
            },
            set: function(t) {
                var e = t.parentNode;
                e && (e.selectedIndex, e.parentNode && e.parentNode.selectedIndex)
            }
        }), wt.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
            wt.propFix[this.toLowerCase()] = this
        }), wt.fn.extend({
            addClass: function(e) {
                var t, i, n, o, r, s, a, l = 0;
                if (yt(e)) return this.each(function(t) {
                    wt(this).addClass(e.call(this, t, Q(this)))
                });
                if ((t = Z(e)).length)
                    for (; i = this[l++];)
                        if (o = Q(i), n = 1 === i.nodeType && " " + $(o) + " ") {
                            for (s = 0; r = t[s++];) n.indexOf(" " + r + " ") < 0 && (n += r + " ");
                            o !== (a = $(n)) && i.setAttribute("class", a)
                        }
                return this
            },
            removeClass: function(e) {
                var t, i, n, o, r, s, a, l = 0;
                if (yt(e)) return this.each(function(t) {
                    wt(this).removeClass(e.call(this, t, Q(this)))
                });
                if (!arguments.length) return this.attr("class", "");
                if ((t = Z(e)).length)
                    for (; i = this[l++];)
                        if (o = Q(i), n = 1 === i.nodeType && " " + $(o) + " ") {
                            for (s = 0; r = t[s++];)
                                for (; - 1 < n.indexOf(" " + r + " ");) n = n.replace(" " + r + " ", " ");
                            o !== (a = $(n)) && i.setAttribute("class", a)
                        }
                return this
            },
            toggleClass: function(o, e) {
                var r = typeof o,
                    s = "string" === r || Array.isArray(o);
                return "boolean" == typeof e && s ? e ? this.addClass(o) : this.removeClass(o) : yt(o) ? this.each(function(t) {
                    wt(this).toggleClass(o.call(this, t, Q(this), e), e)
                }) : this.each(function() {
                    var t, e, i, n;
                    if (s)
                        for (e = 0, i = wt(this), n = Z(o); t = n[e++];) i.hasClass(t) ? i.removeClass(t) : i.addClass(t);
                    else void 0 !== o && "boolean" !== r || ((t = Q(this)) && Bt.set(this, "__className__", t), this.setAttribute && this.setAttribute("class", t || !1 === o ? "" : Bt.get(this, "__className__") || ""))
                })
            },
            hasClass: function(t) {
                var e, i, n = 0;
                for (e = " " + t + " "; i = this[n++];)
                    if (1 === i.nodeType && -1 < (" " + $(Q(i)) + " ").indexOf(e)) return !0;
                return !1
            }
        });
        var Me = /\r/g;
        wt.fn.extend({
            val: function(i) {
                var n, t, o, e = this[0];
                return arguments.length ? (o = yt(i), this.each(function(t) {
                    var e;
                    1 === this.nodeType && (null == (e = o ? i.call(this, t, wt(this).val()) : i) ? e = "" : "number" == typeof e ? e += "" : Array.isArray(e) && (e = wt.map(e, function(t) {
                        return null == t ? "" : t + ""
                    })), (n = wt.valHooks[this.type] || wt.valHooks[this.nodeName.toLowerCase()]) && "set" in n && void 0 !== n.set(this, e, "value") || (this.value = e))
                })) : e ? (n = wt.valHooks[e.type] || wt.valHooks[e.nodeName.toLowerCase()]) && "get" in n && void 0 !== (t = n.get(e, "value")) ? t : "string" == typeof(t = e.value) ? t.replace(Me, "") : null == t ? "" : t : void 0
            }
        }), wt.extend({
            valHooks: {
                option: {
                    get: function(t) {
                        var e = wt.find.attr(t, "value");
                        return null != e ? e : $(wt.text(t))
                    }
                },
                select: {
                    get: function(t) {
                        var e, i, n, o = t.options,
                            r = t.selectedIndex,
                            s = "select-one" === t.type,
                            a = s ? null : [],
                            l = s ? r + 1 : o.length;
                        for (n = r < 0 ? l : s ? r : 0; n < l; n++)
                            if (((i = o[n]).selected || n === r) && !i.disabled && (!i.parentNode.disabled || !h(i.parentNode, "optgroup"))) {
                                if (e = wt(i).val(), s) return e;
                                a.push(e)
                            }
                        return a
                    },
                    set: function(t, e) {
                        for (var i, n, o = t.options, r = wt.makeArray(e), s = o.length; s--;)((n = o[s]).selected = -1 < wt.inArray(wt.valHooks.option.get(n), r)) && (i = !0);
                        return i || (t.selectedIndex = -1), r
                    }
                }
            }
        }), wt.each(["radio", "checkbox"], function() {
            wt.valHooks[this] = {
                set: function(t, e) {
                    if (Array.isArray(e)) return t.checked = -1 < wt.inArray(wt(t).val(), e)
                }
            }, vt.checkOn || (wt.valHooks[this].get = function(t) {
                return null === t.getAttribute("value") ? "on" : t.value
            })
        }), vt.focusin = "onfocusin" in C;
        var Oe = /^(?:focusinfocus|focusoutblur)$/,
            Le = function(t) {
                t.stopPropagation()
            };
        wt.extend(wt.event, {
            trigger: function(t, e, i, n) {
                var o, r, s, a, l, h, c, u, d = [i || st],
                    p = ft.call(t, "type") ? t.type : t,
                    f = ft.call(t, "namespace") ? t.namespace.split(".") : [];
                if (r = u = s = i = i || st, 3 !== i.nodeType && 8 !== i.nodeType && !Oe.test(p + wt.event.triggered) && (-1 < p.indexOf(".") && (p = (f = p.split(".")).shift(), f.sort()), l = p.indexOf(":") < 0 && "on" + p, (t = t[wt.expando] ? t : new wt.Event(p, "object" == typeof t && t)).isTrigger = n ? 2 : 3, t.namespace = f.join("."), t.rnamespace = t.namespace ? new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = i), e = null == e ? [t] : wt.makeArray(e, [t]), c = wt.event.special[p] || {}, n || !c.trigger || !1 !== c.trigger.apply(i, e))) {
                    if (!n && !c.noBubble && !bt(i)) {
                        for (a = c.delegateType || p, Oe.test(a + p) || (r = r.parentNode); r; r = r.parentNode) d.push(r), s = r;
                        s === (i.ownerDocument || st) && d.push(s.defaultView || s.parentWindow || C)
                    }
                    for (o = 0;
                        (r = d[o++]) && !t.isPropagationStopped();) u = r, t.type = 1 < o ? a : c.bindType || p, (h = (Bt.get(r, "events") || {})[t.type] && Bt.get(r, "handle")) && h.apply(r, e), (h = l && r[l]) && h.apply && zt(r) && (t.result = h.apply(r, e), !1 === t.result && t.preventDefault());
                    return t.type = p, n || t.isDefaultPrevented() || c._default && !1 !== c._default.apply(d.pop(), e) || !zt(i) || l && yt(i[p]) && !bt(i) && ((s = i[l]) && (i[l] = null), wt.event.triggered = p, t.isPropagationStopped() && u.addEventListener(p, Le), i[p](), t.isPropagationStopped() && u.removeEventListener(p, Le), wt.event.triggered = void 0, s && (i[l] = s)), t.result
                }
            },
            simulate: function(t, e, i) {
                var n = wt.extend(new wt.Event, i, {
                    type: t,
                    isSimulated: !0
                });
                wt.event.trigger(n, null, e)
            }
        }), wt.fn.extend({
            trigger: function(t, e) {
                return this.each(function() {
                    wt.event.trigger(t, e, this)
                })
            },
            triggerHandler: function(t, e) {
                var i = this[0];
                if (i) return wt.event.trigger(t, e, i, !0)
            }
        }), vt.focusin || wt.each({
            focus: "focusin",
            blur: "focusout"
        }, function(i, n) {
            var o = function(t) {
                wt.event.simulate(n, t.target, wt.event.fix(t))
            };
            wt.event.special[n] = {
                setup: function() {
                    var t = this.ownerDocument || this,
                        e = Bt.access(t, n);
                    e || t.addEventListener(i, o, !0), Bt.access(t, n, (e || 0) + 1)
                },
                teardown: function() {
                    var t = this.ownerDocument || this,
                        e = Bt.access(t, n) - 1;
                    e ? Bt.access(t, n, e) : (t.removeEventListener(i, o, !0), Bt.remove(t, n))
                }
            }
        });
        var De = C.location,
            Ie = Date.now(),
            Pe = /\?/;
        wt.parseXML = function(t) {
            var e;
            if (!t || "string" != typeof t) return null;
            try {
                e = (new C.DOMParser).parseFromString(t, "text/xml")
            } catch (C) {
                e = void 0
            }
            return e && !e.getElementsByTagName("parsererror").length || wt.error("Invalid XML: " + t), e
        };
        var Ne = /\[\]$/,
            Re = /\r?\n/g,
            He = /^(?:submit|button|image|reset|file)$/i,
            ze = /^(?:input|select|textarea|keygen)/i;
        wt.param = function(t, e) {
            var i, n = [],
                o = function(t, e) {
                    var i = yt(e) ? e() : e;
                    n[n.length] = encodeURIComponent(t) + "=" + encodeURIComponent(null == i ? "" : i)
                };
            if (Array.isArray(t) || t.jquery && !wt.isPlainObject(t)) wt.each(t, function() {
                o(this.name, this.value)
            });
            else
                for (i in t) J(i, t[i], e, o);
            return n.join("&")
        }, wt.fn.extend({
            serialize: function() {
                return wt.param(this.serializeArray())
            },
            serializeArray: function() {
                return this.map(function() {
                    var t = wt.prop(this, "elements");
                    return t ? wt.makeArray(t) : this
                }).filter(function() {
                    var t = this.type;
                    return this.name && !wt(this).is(":disabled") && ze.test(this.nodeName) && !He.test(t) && (this.checked || !Kt.test(t))
                }).map(function(t, e) {
                    var i = wt(this).val();
                    return null == i ? null : Array.isArray(i) ? wt.map(i, function(t) {
                        return {
                            name: e.name,
                            value: t.replace(Re, "\r\n")
                        }
                    }) : {
                        name: e.name,
                        value: i.replace(Re, "\r\n")
                    }
                }).get()
            }
        });
        var Be = /%20/g,
            We = /#.*$/,
            je = /([?&])_=[^&]*/,
            Fe = /^(.*?):[ \t]*([^\r\n]*)$/gm,
            qe = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
            Ge = /^(?:GET|HEAD)$/,
            Ue = /^\/\//,
            Ve = {},
            Xe = {},
            Ye = "*/".concat("*"),
            Ke = st.createElement("a");
        Ke.href = De.href, wt.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: {
                url: De.href,
                type: "GET",
                isLocal: qe.test(De.protocol),
                global: !0,
                processData: !0,
                async: !0,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                accepts: {
                    "*": Ye,
                    text: "text/plain",
                    html: "text/html",
                    xml: "application/xml, text/xml",
                    json: "application/json, text/javascript"
                },
                contents: {
                    xml: /\bxml\b/,
                    html: /\bhtml/,
                    json: /\bjson\b/
                },
                responseFields: {
                    xml: "responseXML",
                    text: "responseText",
                    json: "responseJSON"
                },
                converters: {
                    "* text": String,
                    "text html": !0,
                    "text json": JSON.parse,
                    "text xml": wt.parseXML
                },
                flatOptions: {
                    url: !0,
                    context: !0
                }
            },
            ajaxSetup: function(t, e) {
                return e ? it(it(t, wt.ajaxSettings), e) : it(wt.ajaxSettings, t)
            },
            ajaxPrefilter: tt(Ve),
            ajaxTransport: tt(Xe),
            ajax: function(t, e) {
                function i(t, e, i, n) {
                    var o, r, s, a, l, h = e;
                    f || (f = !0, p && C.clearTimeout(p), c = void 0, d = n || "", T.readyState = 0 < t ? 4 : 0, o = 200 <= t && t < 300 || 304 === t, i && (a = nt(m, T, i)), a = ot(m, a, T, o), o ? (m.ifModified && ((l = T.getResponseHeader("Last-Modified")) && (wt.lastModified[u] = l), (l = T.getResponseHeader("etag")) && (wt.etag[u] = l)), 204 === t || "HEAD" === m.type ? h = "nocontent" : 304 === t ? h = "notmodified" : (h = a.state, r = a.data, o = !(s = a.error))) : (s = h, !t && h || (h = "error", t < 0 && (t = 0))), T.status = t, T.statusText = (e || h) + "", o ? b.resolveWith(v, [r, h, T]) : b.rejectWith(v, [T, h, s]), T.statusCode(w), w = void 0, g && y.trigger(o ? "ajaxSuccess" : "ajaxError", [T, m, o ? r : s]), x.fireWith(v, [T, h]), g && (y.trigger("ajaxComplete", [T, m]), --wt.active || wt.event.trigger("ajaxStop")))
                }
                "object" == typeof t && (e = t, t = void 0), e = e || {};
                var c, u, d, n, p, o, f, g, r, s, m = wt.ajaxSetup({}, e),
                    v = m.context || m,
                    y = m.context && (v.nodeType || v.jquery) ? wt(v) : wt.event,
                    b = wt.Deferred(),
                    x = wt.Callbacks("once memory"),
                    w = m.statusCode || {},
                    a = {},
                    l = {},
                    h = "canceled",
                    T = {
                        readyState: 0,
                        getResponseHeader: function(t) {
                            var e;
                            if (f) {
                                if (!n)
                                    for (n = {}; e = Fe.exec(d);) n[e[1].toLowerCase()] = e[2];
                                e = n[t.toLowerCase()]
                            }
                            return null == e ? null : e
                        },
                        getAllResponseHeaders: function() {
                            return f ? d : null
                        },
                        setRequestHeader: function(t, e) {
                            return null == f && (t = l[t.toLowerCase()] = l[t.toLowerCase()] || t, a[t] = e), this
                        },
                        overrideMimeType: function(t) {
                            return null == f && (m.mimeType = t), this
                        },
                        statusCode: function(t) {
                            var e;
                            if (t)
                                if (f) T.always(t[T.status]);
                                else
                                    for (e in t) w[e] = [w[e], t[e]];
                            return this
                        },
                        abort: function(t) {
                            var e = t || h;
                            return c && c.abort(e), i(0, e), this
                        }
                    };
                if (b.promise(T), m.url = ((t || m.url || De.href) + "").replace(Ue, De.protocol + "//"), m.type = e.method || e.type || m.method || m.type, m.dataTypes = (m.dataType || "*").toLowerCase().match(Dt) || [""], null == m.crossDomain) {
                    o = st.createElement("a");
                    try {
                        o.href = m.url, o.href = o.href, m.crossDomain = Ke.protocol + "//" + Ke.host != o.protocol + "//" + o.host
                    } catch (C) {
                        m.crossDomain = !0
                    }
                }
                if (m.data && m.processData && "string" != typeof m.data && (m.data = wt.param(m.data, m.traditional)), et(Ve, m, e, T), f) return T;
                for (r in (g = wt.event && m.global) && 0 == wt.active++ && wt.event.trigger("ajaxStart"), m.type = m.type.toUpperCase(), m.hasContent = !Ge.test(m.type), u = m.url.replace(We, ""), m.hasContent ? m.data && m.processData && 0 === (m.contentType || "").indexOf("application/x-www-form-urlencoded") && (m.data = m.data.replace(Be, "+")) : (s = m.url.slice(u.length), m.data && (m.processData || "string" == typeof m.data) && (u += (Pe.test(u) ? "&" : "?") + m.data, delete m.data), !1 === m.cache && (u = u.replace(je, "$1"), s = (Pe.test(u) ? "&" : "?") + "_=" + Ie++ + s), m.url = u + s), m.ifModified && (wt.lastModified[u] && T.setRequestHeader("If-Modified-Since", wt.lastModified[u]), wt.etag[u] && T.setRequestHeader("If-None-Match", wt.etag[u])), (m.data && m.hasContent && !1 !== m.contentType || e.contentType) && T.setRequestHeader("Content-Type", m.contentType), T.setRequestHeader("Accept", m.dataTypes[0] && m.accepts[m.dataTypes[0]] ? m.accepts[m.dataTypes[0]] + ("*" !== m.dataTypes[0] ? ", " + Ye + "; q=0.01" : "") : m.accepts["*"]), m.headers) T.setRequestHeader(r, m.headers[r]);
                if (m.beforeSend && (!1 === m.beforeSend.call(v, T, m) || f)) return T.abort();
                if (h = "abort", x.add(m.complete), T.done(m.success), T.fail(m.error), c = et(Xe, m, e, T)) {
                    if (T.readyState = 1, g && y.trigger("ajaxSend", [T, m]), f) return T;
                    m.async && 0 < m.timeout && (p = C.setTimeout(function() {
                        T.abort("timeout")
                    }, m.timeout));
                    try {
                        f = !1, c.send(a, i)
                    } catch (C) {
                        if (f) throw C;
                        i(-1, C)
                    }
                } else i(-1, "No Transport");
                return T
            },
            getJSON: function(t, e, i) {
                return wt.get(t, e, i, "json")
            },
            getScript: function(t, e) {
                return wt.get(t, void 0, e, "script")
            }
        }), wt.each(["get", "post"], function(t, o) {
            wt[o] = function(t, e, i, n) {
                return yt(e) && (n = n || i, i = e, e = void 0), wt.ajax(wt.extend({
                    url: t,
                    type: o,
                    dataType: n,
                    data: e,
                    success: i
                }, wt.isPlainObject(t) && t))
            }
        }), wt._evalUrl = function(t) {
            return wt.ajax({
                url: t,
                type: "GET",
                dataType: "script",
                cache: !0,
                async: !1,
                global: !1,
                "throws": !0
            })
        }, wt.fn.extend({
            wrapAll: function(t) {
                var e;
                return this[0] && (yt(t) && (t = t.call(this[0])), e = wt(t, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && e.insertBefore(this[0]), e.map(function() {
                    for (var t = this; t.firstElementChild;) t = t.firstElementChild;
                    return t
                }).append(this)), this
            },
            wrapInner: function(i) {
                return yt(i) ? this.each(function(t) {
                    wt(this).wrapInner(i.call(this, t))
                }) : this.each(function() {
                    var t = wt(this),
                        e = t.contents();
                    e.length ? e.wrapAll(i) : t.append(i)
                })
            },
            wrap: function(e) {
                var i = yt(e);
                return this.each(function(t) {
                    wt(this).wrapAll(i ? e.call(this, t) : e)
                })
            },
            unwrap: function(t) {
                return this.parent(t).not("body").each(function() {
                    wt(this).replaceWith(this.childNodes)
                }), this
            }
        }), wt.expr.pseudos.hidden = function(t) {
            return !wt.expr.pseudos.visible(t)
        }, wt.expr.pseudos.visible = function(t) {
            return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length)
        }, wt.ajaxSettings.xhr = function() {
            try {
                return new C.XMLHttpRequest
            } catch (C) {}
        };
        var $e = {
                0: 200,
                1223: 204
            },
            Qe = wt.ajaxSettings.xhr();
        vt.cors = !!Qe && "withCredentials" in Qe, vt.ajax = Qe = !!Qe, wt.ajaxTransport(function(o) {
            var r, s;
            if (vt.cors || Qe && !o.crossDomain) return {
                send: function(t, e) {
                    var i, n = o.xhr();
                    if (n.open(o.type, o.url, o.async, o.username, o.password), o.xhrFields)
                        for (i in o.xhrFields) n[i] = o.xhrFields[i];
                    for (i in o.mimeType && n.overrideMimeType && n.overrideMimeType(o.mimeType), o.crossDomain || t["X-Requested-With"] || (t["X-Requested-With"] = "XMLHttpRequest"), t) n.setRequestHeader(i, t[i]);
                    r = function(t) {
                        return function() {
                            r && (r = s = n.onload = n.onerror = n.onabort = n.ontimeout = n.onreadystatechange = null, "abort" === t ? n.abort() : "error" === t ? "number" != typeof n.status ? e(0, "error") : e(n.status, n.statusText) : e($e[n.status] || n.status, n.statusText, "text" !== (n.responseType || "text") || "string" != typeof n.responseText ? {
                                binary: n.response
                            } : {
                                text: n.responseText
                            }, n.getAllResponseHeaders()))
                        }
                    }, n.onload = r(), s = n.onerror = n.ontimeout = r("error"), void 0 !== n.onabort ? n.onabort = s : n.onreadystatechange = function() {
                        4 === n.readyState && C.setTimeout(function() {
                            r && s()
                        })
                    }, r = r("abort");
                    try {
                        n.send(o.hasContent && o.data || null)
                    } catch (C) {
                        if (r) throw C
                    }
                },
                abort: function() {
                    r && r()
                }
            }
        }), wt.ajaxPrefilter(function(t) {
            t.crossDomain && (t.contents.script = !1)
        }), wt.ajaxSetup({
            accepts: {
                script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
            },
            contents: {
                script: /\b(?:java|ecma)script\b/
            },
            converters: {
                "text script": function(t) {
                    return wt.globalEval(t), t
                }
            }
        }), wt.ajaxPrefilter("script", function(t) {
            void 0 === t.cache && (t.cache = !1), t.crossDomain && (t.type = "GET")
        }), wt.ajaxTransport("script", function(i) {
            var n, o;
            if (i.crossDomain) return {
                send: function(t, e) {
                    n = wt("<script>").prop({
                        charset: i.scriptCharset,
                        src: i.url
                    }).on("load error", o = function(t) {
                        n.remove(), o = null, t && e("error" === t.type ? 404 : 200, t.type)
                    }), st.head.appendChild(n[0])
                },
                abort: function() {
                    o && o()
                }
            }
        });
        var Ze, Je = [],
            ti = /(=)\?(?=&|$)|\?\?/;
        wt.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function() {
                var t = Je.pop() || wt.expando + "_" + Ie++;
                return this[t] = !0, t
            }
        }), wt.ajaxPrefilter("json jsonp", function(t, e, i) {
            var n, o, r, s = !1 !== t.jsonp && (ti.test(t.url) ? "url" : "string" == typeof t.data && 0 === (t.contentType || "").indexOf("application/x-www-form-urlencoded") && ti.test(t.data) && "data");
            if (s || "jsonp" === t.dataTypes[0]) return n = t.jsonpCallback = yt(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, s ? t[s] = t[s].replace(ti, "$1" + n) : !1 !== t.jsonp && (t.url += (Pe.test(t.url) ? "&" : "?") + t.jsonp + "=" + n), t.converters["script json"] = function() {
                return r || wt.error(n + " was not called"), r[0]
            }, t.dataTypes[0] = "json", o = C[n], C[n] = function() {
                r = arguments
            }, i.always(function() {
                void 0 === o ? wt(C).removeProp(n) : C[n] = o, t[n] && (t.jsonpCallback = e.jsonpCallback, Je.push(n)), r && yt(o) && o(r[0]), r = o = void 0
            }), "script"
        }), vt.createHTMLDocument = ((Ze = st.implementation.createHTMLDocument("").body).innerHTML = "<form></form><form></form>", 2 === Ze.childNodes.length), wt.parseHTML = function(t, e, i) {
            return "string" != typeof t ? [] : ("boolean" == typeof e && (i = e, e = !1), e || (vt.createHTMLDocument ? ((n = (e = st.implementation.createHTMLDocument("")).createElement("base")).href = st.location.href, e.head.appendChild(n)) : e = st), r = !i && [], (o = kt.exec(t)) ? [e.createElement(o[1])] : (o = T([t], e, r), r && r.length && wt(r).remove(), wt.merge([], o.childNodes)));
            var n, o, r
        }, wt.fn.load = function(t, e, i) {
            var n, o, r, s = this,
                a = t.indexOf(" ");
            return -1 < a && (n = $(t.slice(a)), t = t.slice(0, a)), yt(e) ? (i = e, e = void 0) : e && "object" == typeof e && (o = "POST"), 0 < s.length && wt.ajax({
                url: t,
                type: o || "GET",
                dataType: "html",
                data: e
            }).done(function(t) {
                r = arguments, s.html(n ? wt("<div>").append(wt.parseHTML(t)).find(n) : t)
            }).always(i && function(t, e) {
                s.each(function() {
                    i.apply(this, r || [t.responseText, e, t])
                })
            }), this
        }, wt.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(t, e) {
            wt.fn[e] = function(t) {
                return this.on(e, t)
            }
        }), wt.expr.pseudos.animated = function(e) {
            return wt.grep(wt.timers, function(t) {
                return e === t.elem
            }).length
        }, wt.offset = {
            setOffset: function(t, e, i) {
                var n, o, r, s, a, l, h = wt.css(t, "position"),
                    c = wt(t),
                    u = {};
                "static" === h && (t.style.position = "relative"), a = c.offset(), r = wt.css(t, "top"), l = wt.css(t, "left"), ("absolute" === h || "fixed" === h) && -1 < (r + l).indexOf("auto") ? (s = (n = c.position()).top, o = n.left) : (s = parseFloat(r) || 0, o = parseFloat(l) || 0), yt(e) && (e = e.call(t, i, wt.extend({}, a))), null != e.top && (u.top = e.top - a.top + s), null != e.left && (u.left = e.left - a.left + o), "using" in e ? e.using.call(t, u) : c.css(u)
            }
        }, wt.fn.extend({
            offset: function(e) {
                if (arguments.length) return void 0 === e ? this : this.each(function(t) {
                    wt.offset.setOffset(this, e, t)
                });
                var t, i, n = this[0];
                return n ? n.getClientRects().length ? (t = n.getBoundingClientRect(), i = n.ownerDocument.defaultView, {
                    top: t.top + i.pageYOffset,
                    left: t.left + i.pageXOffset
                }) : {
                    top: 0,
                    left: 0
                } : void 0
            },
            position: function() {
                if (this[0]) {
                    var t, e, i, n = this[0],
                        o = {
                            top: 0,
                            left: 0
                        };
                    if ("fixed" === wt.css(n, "position")) e = n.getBoundingClientRect();
                    else {
                        for (e = this.offset(), i = n.ownerDocument, t = n.offsetParent || i.documentElement; t && (t === i.body || t === i.documentElement) && "static" === wt.css(t, "position");) t = t.parentNode;
                        t && t !== n && 1 === t.nodeType && ((o = wt(t).offset()).top += wt.css(t, "borderTopWidth", !0), o.left += wt.css(t, "borderLeftWidth", !0))
                    }
                    return {
                        top: e.top - o.top - wt.css(n, "marginTop", !0),
                        left: e.left - o.left - wt.css(n, "marginLeft", !0)
                    }
                }
            },
            offsetParent: function() {
                return this.map(function() {
                    for (var t = this.offsetParent; t && "static" === wt.css(t, "position");) t = t.offsetParent;
                    return t || ie
                })
            }
        }), wt.each({
            scrollLeft: "pageXOffset",
            scrollTop: "pageYOffset"
        }, function(e, o) {
            var r = "pageYOffset" === o;
            wt.fn[e] = function(t) {
                return Nt(this, function(t, e, i) {
                    var n;
                    if (bt(t) ? n = t : 9 === t.nodeType && (n = t.defaultView), void 0 === i) return n ? n[o] : t[e];
                    n ? n.scrollTo(r ? n.pageXOffset : i, r ? i : n.pageYOffset) : t[e] = i
                }, e, t, arguments.length)
            }
        }), wt.each(["top", "left"], function(t, i) {
            wt.cssHooks[i] = R(vt.pixelPosition, function(t, e) {
                if (e) return e = N(t, i), ce.test(e) ? wt(t).position()[i] + "px" : e
            })
        }), wt.each({
            Height: "height",
            Width: "width"
        }, function(s, a) {
            wt.each({
                padding: "inner" + s,
                content: a,
                "": "outer" + s
            }, function(n, r) {
                wt.fn[r] = function(t, e) {
                    var i = arguments.length && (n || "boolean" != typeof t),
                        o = n || (!0 === t || !0 === e ? "margin" : "border");
                    return Nt(this, function(t, e, i) {
                        var n;
                        return bt(t) ? 0 === r.indexOf("outer") ? t["inner" + s] : t.document.documentElement["client" + s] : 9 === t.nodeType ? (n = t.documentElement, Math.max(t.body["scroll" + s], n["scroll" + s], t.body["offset" + s], n["offset" + s], n["client" + s])) : void 0 === i ? wt.css(t, e, o) : wt.style(t, e, i, o)
                    }, a, i ? t : void 0, i)
                }
            })
        }), wt.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(t, i) {
            wt.fn[i] = function(t, e) {
                return 0 < arguments.length ? this.on(i, null, t, e) : this.trigger(i)
            }
        }), wt.fn.extend({
            hover: function(t, e) {
                return this.mouseenter(t).mouseleave(e || t)
            }
        }), wt.fn.extend({
            bind: function(t, e, i) {
                return this.on(t, null, e, i)
            },
            unbind: function(t, e) {
                return this.off(t, null, e)
            },
            delegate: function(t, e, i, n) {
                return this.on(e, t, i, n)
            },
            undelegate: function(t, e, i) {
                return 1 === arguments.length ? this.off(t, "**") : this.off(e, t || "**", i)
            }
        }), wt.proxy = function(t, e) {
            var i, n, o;
            if ("string" == typeof e && (i = t[e], e = t, t = i), yt(t)) return n = lt.call(arguments, 2), (o = function() {
                return t.apply(e || this, n.concat(lt.call(arguments)))
            }).guid = t.guid = t.guid || wt.guid++, o
        }, wt.holdReady = function(t) {
            t ? wt.readyWait++ : wt.ready(!0)
        }, wt.isArray = Array.isArray, wt.parseJSON = JSON.parse, wt.nodeName = h, wt.isFunction = yt, wt.isWindow = bt, wt.camelCase = p, wt.type = m, wt.now = Date.now, wt.isNumeric = function(t) {
            var e = wt.type(t);
            return ("number" === e || "string" === e) && !isNaN(t - parseFloat(t))
        }, "function" == typeof define && define.amd && define("jquery", [], function() {
            return wt
        });
        var ei = C.jQuery,
            ii = C.$;
        return wt.noConflict = function(t) {
            return C.$ === wt && (C.$ = ii), t && C.jQuery === wt && (C.jQuery = ei), wt
        }, t || (C.jQuery = C.$ = wt), wt
    }), ("function" == typeof define && define.amd ? define : function(t, e) {
        "undefined" != typeof module && module.exports ? module.exports = e(require("jquery")) : window.toastr = e(window.jQuery)
    })(["jquery"], function(N) {
        return function() {
            function t(t, e, i) {
                return u({
                    type: p.error,
                    iconClass: O().iconClasses.error,
                    message: t,
                    optionsOverride: i,
                    title: e
                })
            }

            function _(t, e) {
                return t || (t = O()), (D = N("#" + t.containerId)).length || e && (D = h(t)), D
            }

            function e(t, e, i) {
                return u({
                    type: p.info,
                    iconClass: O().iconClasses.info,
                    message: t,
                    optionsOverride: i,
                    title: e
                })
            }

            function i(t) {
                d = t
            }

            function n(t, e, i) {
                return u({
                    type: p.success,
                    iconClass: O().iconClasses.success,
                    message: t,
                    optionsOverride: i,
                    title: e
                })
            }

            function o(t, e, i) {
                return u({
                    type: p.warning,
                    iconClass: O().iconClasses.warning,
                    message: t,
                    optionsOverride: i,
                    title: e
                })
            }

            function r(t, e) {
                var i = O();
                D || _(i), l(t, i, e) || a(i)
            }

            function s(t) {
                var e = O();
                D || _(e), t && 0 === N(":focus", t).length ? L(t) : D.children().length && D.remove()
            }

            function a(t) {
                for (var e = D.children(), i = e.length - 1; 0 <= i; i--) l(N(e[i]), t)
            }

            function l(t, e, i) {
                var n = !(!i || !i.force) && i.force;
                return !(!t || !n && 0 !== N(":focus", t).length || (t[e.hideMethod]({
                    duration: e.hideDuration,
                    easing: e.hideEasing,
                    complete: function() {
                        L(t)
                    }
                }), 0))
            }

            function h(t) {
                return (D = N("<div/>").attr("id", t.containerId).addClass(t.positionClass)).appendTo(N(t.target)), D
            }

            function c() {
                return {
                    tapToDismiss: !0,
                    toastClass: "toast",
                    containerId: "toast-container",
                    debug: !1,
                    showMethod: "fadeIn",
                    showDuration: 300,
                    showEasing: "swing",
                    onShown: undefined,
                    hideMethod: "fadeOut",
                    hideDuration: 1e3,
                    hideEasing: "swing",
                    onHidden: undefined,
                    closeMethod: !1,
                    closeDuration: !1,
                    closeEasing: !1,
                    closeOnHover: !0,
                    extendedTimeOut: 1e3,
                    iconClasses: {
                        error: "toast-error",
                        info: "toast-info",
                        success: "toast-success",
                        warning: "toast-warning"
                    },
                    iconClass: "toast-info",
                    positionClass: "toast-top-center",
                    timeOut: 5e3,
                    titleClass: "toast-title",
                    messageClass: "toast-message",
                    escapeHtml: !1,
                    target: "body",
                    closeHtml: '<button type="button">&times;</button>',
                    closeClass: "toast-close-button",
                    newestOnTop: !0,
                    preventDuplicates: !1,
                    progressBar: !1,
                    progressClass: "toast-progress",
                    rtl: !1
                }
            }

            function M(t) {
                d && d(t)
            }

            function u(e) {
                function i(t) {
                    return null == t && (t = ""), t.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
                }

                function t() {
                    s(), l(), h(), c(), u(), d(), a(), n()
                }

                function n() {
                    var t = "";
                    switch (e.iconClass) {
                        case "toast-success":
                        case "toast-info":
                            t = "polite";
                            break;
                        default:
                            t = "assertive"
                    }
                    w.attr("aria-live", t)
                }

                function o() {
                    y.closeOnHover && w.hover(m, g), !y.onclick && y.tapToDismiss && w.click(f), y.closeButton && E && E.click(function(t) {
                        t.stopPropagation ? t.stopPropagation() : t.cancelBubble !== undefined && !0 !== t.cancelBubble && (t.cancelBubble = !0), y.onCloseClick && y.onCloseClick(t), f(!0)
                    }), y.onclick && w.click(function(t) {
                        y.onclick(t), f()
                    })
                }

                function r() {
                    w.hide(), w[y.showMethod]({
                        duration: y.showDuration,
                        easing: y.showEasing,
                        complete: y.onShown
                    }), 0 < y.timeOut && (x = setTimeout(f, y.timeOut), A.maxHideTime = parseFloat(y.timeOut), A.hideEta = (new Date).getTime() + A.maxHideTime, y.progressBar && (A.intervalId = setInterval(v, 10)))
                }

                function s() {
                    e.iconClass && w.addClass(y.toastClass).addClass(b)
                }

                function a() {
                    y.newestOnTop ? D.prepend(w) : D.append(w)
                }

                function l() {
                    if (e.title) {
                        var t = e.title;
                        y.escapeHtml && (t = i(e.title)), T.append(t).addClass(y.titleClass), w.append(T)
                    }
                }

                function h() {
                    if (e.message) {
                        var t = e.message;
                        y.escapeHtml && (t = i(e.message)), C.append(t).addClass(y.messageClass), w.append(C)
                    }
                }

                function c() {
                    y.closeButton && (E.addClass(y.closeClass).attr("role", "button"), w.prepend(E))
                }

                function u() {
                    y.progressBar && (S.addClass(y.progressClass), w.prepend(S))
                }

                function d() {
                    y.rtl && w.addClass("rtl")
                }

                function p(t, e) {
                    if (t.preventDuplicates) {
                        if (e.message === I) return !0;
                        I = e.message
                    }
                    return !1
                }

                function f(t) {
                    var e = t && !1 !== y.closeMethod ? y.closeMethod : y.hideMethod,
                        i = t && !1 !== y.closeDuration ? y.closeDuration : y.hideDuration,
                        n = t && !1 !== y.closeEasing ? y.closeEasing : y.hideEasing;
                    if (!N(":focus", w).length || t) return clearTimeout(A.intervalId), w[e]({
                        duration: i,
                        easing: n,
                        complete: function() {
                            L(w), clearTimeout(x), y.onHidden && "hidden" !== k.state && y.onHidden(), k.state = "hidden", k.endTime = new Date, M(k)
                        }
                    })
                }

                function g() {
                    (0 < y.timeOut || 0 < y.extendedTimeOut) && (x = setTimeout(f, y.extendedTimeOut), A.maxHideTime = parseFloat(y.extendedTimeOut), A.hideEta = (new Date).getTime() + A.maxHideTime)
                }

                function m() {
                    clearTimeout(x), A.hideEta = 0, w.stop(!0, !0)[y.showMethod]({
                        duration: y.showDuration,
                        easing: y.showEasing
                    })
                }

                function v() {
                    var t = (A.hideEta - (new Date).getTime()) / A.maxHideTime * 100;
                    S.width(t + "%")
                }
                var y = O(),
                    b = e.iconClass || y.iconClass;
                if ("undefined" != typeof e.optionsOverride && (y = N.extend(y, e.optionsOverride), b = e.optionsOverride.iconClass || b), !p(y, e)) {
                    P++, D = _(y, !0);
                    var x = null,
                        w = N("<div/>"),
                        T = N("<div/>"),
                        C = N("<div/>"),
                        S = N("<div/>"),
                        E = N(y.closeHtml),
                        A = {
                            intervalId: null,
                            hideEta: null,
                            maxHideTime: null
                        },
                        k = {
                            toastId: P,
                            state: "visible",
                            startTime: new Date,
                            options: y,
                            map: e
                        };
                    return t(), r(), o(), M(k), y.debug && console && console.log(k), w
                }
            }

            function O() {
                return N.extend({}, c(), f.options)
            }

            function L(t) {
                D || (D = _()), t.is(":visible") || (t.remove(), t = null, 0 === D.children().length && (D.remove(), I = undefined))
            }
            var D, d, I, P = 0,
                p = {
                    error: "error",
                    info: "info",
                    success: "success",
                    warning: "warning"
                },
                f = {
                    clear: r,
                    remove: s,
                    error: t,
                    getContainer: _,
                    info: e,
                    options: {},
                    subscribe: i,
                    success: n,
                    version: "2.1.3",
                    warning: o
                };
            return f
        }()
    }), function(t, e) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.Popper = e()
    }(this, function() {
        "use strict";

        function a(t) {
            return t && "[object Function]" === {}.toString.call(t)
        }

        function p(t, e) {
            if (1 !== t.nodeType) return [];
            var i = window.getComputedStyle(t, null);
            return e ? i[e] : i
        }

        function u(t) {
            return "HTML" === t.nodeName ? t : t.parentNode || t.host
        }

        function f(t) {
            if (!t || -1 !== ["HTML", "BODY", "#document"].indexOf(t.nodeName)) return window.document.body;
            var e = p(t),
                i = e.overflow,
                n = e.overflowX,
                o = e.overflowY;
            return /(auto|scroll)/.test(i + o + n) ? t : f(u(t))
        }

        function y(t) {
            var e = t && t.offsetParent,
                i = e && e.nodeName;
            return i && "BODY" !== i && "HTML" !== i ? -1 !== ["TD", "TABLE"].indexOf(e.nodeName) && "static" === p(e, "position") ? y(e) : e : window.document.documentElement
        }

        function l(t) {
            var e = t.nodeName;
            return "BODY" !== e && ("HTML" === e || y(t.firstElementChild) === t)
        }

        function h(t) {
            return null === t.parentNode ? t : h(t.parentNode)
        }

        function d(t, e) {
            if (!(t && t.nodeType && e && e.nodeType)) return window.document.documentElement;
            var i = t.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING,
                n = i ? t : e,
                o = i ? e : t,
                r = document.createRange();
            r.setStart(n, 0), r.setEnd(o, 0);
            var s = r.commonAncestorContainer;
            if (t !== s && e !== s || n.contains(o)) return l(s) ? s : y(s);
            var a = h(t);
            return a.host ? d(a.host, e) : d(t, h(e).host)
        }

        function g(t, e) {
            var i = "top" === (1 < arguments.length && void 0 !== e ? arguments[1] : "top") ? "scrollTop" : "scrollLeft",
                n = t.nodeName;
            if ("BODY" !== n && "HTML" !== n) return t[i];
            var o = window.document.documentElement;
            return (window.document.scrollingElement || o)[i]
        }

        function m(t, e, i) {
            var n = 2 < arguments.length && void 0 !== i && arguments[2],
                o = g(e, "top"),
                r = g(e, "left"),
                s = n ? -1 : 1;
            return t.top += o * s, t.bottom += o * s, t.left += r * s, t.right += r * s, t
        }

        function v(t, e) {
            var i = "x" === e ? "Left" : "Top",
                n = "Left" == i ? "Right" : "Bottom";
            return +t["border" + i + "Width"].split("px")[0] + +t["border" + n + "Width"].split("px")[0]
        }

        function n(t, e, i, n) {
            return X(e["offset" + t], i["client" + t], i["offset" + t], it() ? i["offset" + t] + n["margin" + ("Height" === t ? "Top" : "Left")] + n["margin" + ("Height" === t ? "Bottom" : "Right")] : 0)
        }

        function b() {
            var t = window.document.body,
                e = window.document.documentElement,
                i = it() && window.getComputedStyle(e);
            return {
                height: n("Height", t, e, i),
                width: n("Width", t, e, i)
            }
        }

        function x(t) {
            return st({}, t, {
                right: t.left + t.width,
                bottom: t.top + t.height
            })
        }

        function w(t) {
            var e = {};
            if (it()) try {
                e = t.getBoundingClientRect();
                var i = g(t, "top"),
                    n = g(t, "left");
                e.top += i, e.left += n, e.bottom += i, e.right += n
            } catch (t) {} else e = t.getBoundingClientRect();
            var o = {
                    left: e.left,
                    top: e.top,
                    width: e.right - e.left,
                    height: e.bottom - e.top
                },
                r = "HTML" === t.nodeName ? b() : {},
                s = r.width || t.clientWidth || o.right - o.left,
                a = r.height || t.clientHeight || o.bottom - o.top,
                l = t.offsetWidth - s,
                h = t.offsetHeight - a;
            if (l || h) {
                var c = p(t);
                l -= v(c, "x"), h -= v(c, "y"), o.width -= l, o.height -= h
            }
            return x(o)
        }

        function T(t, e) {
            var i = it(),
                n = "HTML" === e.nodeName,
                o = w(t),
                r = w(e),
                s = f(t),
                a = p(e),
                l = +a.borderTopWidth.split("px")[0],
                h = +a.borderLeftWidth.split("px")[0],
                c = x({
                    top: o.top - r.top - l,
                    left: o.left - r.left - h,
                    width: o.width,
                    height: o.height
                });
            if (c.marginTop = 0, c.marginLeft = 0, !i && n) {
                var u = +a.marginTop.split("px")[0],
                    d = +a.marginLeft.split("px")[0];
                c.top -= l - u, c.bottom -= l - u, c.left -= h - d, c.right -= h - d, c.marginTop = u, c.marginLeft = d
            }
            return (i ? e.contains(s) : e === s && "BODY" !== s.nodeName) && (c = m(c, e)), c
        }

        function C(t) {
            var e = window.document.documentElement,
                i = T(t, e),
                n = X(e.clientWidth, window.innerWidth || 0),
                o = X(e.clientHeight, window.innerHeight || 0),
                r = g(e),
                s = g(e, "left");
            return x({
                top: r - i.top + i.marginTop,
                left: s - i.left + i.marginLeft,
                width: n,
                height: o
            })
        }

        function S(t) {
            var e = t.nodeName;
            return "BODY" !== e && "HTML" !== e && ("fixed" === p(t, "position") || S(u(t)))
        }

        function E(t, e, i, n) {
            var o = {
                    top: 0,
                    left: 0
                },
                r = d(t, e);
            if ("viewport" === n) o = C(r);
            else {
                var s;
                "scrollParent" === n ? "BODY" === (s = f(u(t))).nodeName && (s = window.document.documentElement) : s = "window" === n ? window.document.documentElement : n;
                var a = T(s, r);
                if ("HTML" !== s.nodeName || S(r)) o = a;
                else {
                    var l = b(),
                        h = l.height,
                        c = l.width;
                    o.top += a.top - a.marginTop, o.bottom = h + a.top, o.left += a.left - a.marginLeft, o.right = c + a.left
                }
            }
            return o.left += i, o.top += i, o.right -= i, o.bottom -= i, o
        }

        function A(t) {
            return t.width * t.height
        }

        function c(t, e, n, i, o, r) {
            var s = 5 < arguments.length && void 0 !== r ? arguments[5] : 0;
            if (-1 === t.indexOf("auto")) return t;
            var a = E(n, i, s, o),
                l = {
                    top: {
                        width: a.width,
                        height: e.top - a.top
                    },
                    right: {
                        width: a.right - e.right,
                        height: a.height
                    },
                    bottom: {
                        width: a.width,
                        height: a.bottom - e.bottom
                    },
                    left: {
                        width: e.left - a.left,
                        height: a.height
                    }
                },
                h = Object.keys(l).map(function(t) {
                    return st({
                        key: t
                    }, l[t], {
                        area: A(l[t])
                    })
                }).sort(function(t, e) {
                    return e.area - t.area
                }),
                c = h.filter(function(t) {
                    var e = t.width,
                        i = t.height;
                    return e >= n.clientWidth && i >= n.clientHeight
                }),
                u = 0 < c.length ? c[0].key : h[0].key,
                d = t.split("-")[1];
            return u + (d ? "-" + d : "")
        }

        function k(t, e, i) {
            return T(i, d(e, i))
        }

        function _(t) {
            var e = window.getComputedStyle(t),
                i = parseFloat(e.marginTop) + parseFloat(e.marginBottom),
                n = parseFloat(e.marginLeft) + parseFloat(e.marginRight);
            return {
                width: t.offsetWidth + n,
                height: t.offsetHeight + i
            }
        }

        function M(t) {
            var e = {
                left: "right",
                right: "left",
                bottom: "top",
                top: "bottom"
            };
            return t.replace(/left|right|bottom|top/g, function(t) {
                return e[t]
            })
        }

        function O(t, e, i) {
            i = i.split("-")[0];
            var n = _(t),
                o = {
                    width: n.width,
                    height: n.height
                },
                r = -1 !== ["right", "left"].indexOf(i),
                s = r ? "top" : "left",
                a = r ? "left" : "top",
                l = r ? "height" : "width",
                h = r ? "width" : "height";
            return o[s] = e[s] + e[l] / 2 - n[l] / 2, o[a] = i === a ? e[a] - n[h] : e[M(a)], o
        }

        function L(t, e) {
            return Array.prototype.find ? t.find(e) : t.filter(e)[0]
        }

        function o(t, e, i) {
            if (Array.prototype.findIndex) return t.findIndex(function(t) {
                return t[e] === i
            });
            var n = L(t, function(t) {
                return t[e] === i
            });
            return t.indexOf(n)
        }

        function D(t, i, e) {
            return (void 0 === e ? t : t.slice(0, o(t, "name", e))).forEach(function(t) {
                t["function"] && console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
                var e = t["function"] || t.fn;
                t.enabled && a(e) && (i.offsets.popper = x(i.offsets.popper), i.offsets.reference = x(i.offsets.reference), i = e(i, t))
            }), i
        }

        function t() {
            if (!this.state.isDestroyed) {
                var t = {
                    instance: this,
                    styles: {},
                    attributes: {},
                    flipped: !1,
                    offsets: {}
                };
                t.offsets.reference = k(this.state, this.popper, this.reference), t.placement = c(this.options.placement, t.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding), t.originalPlacement = t.placement, t.offsets.popper = O(this.popper, t.offsets.reference, t.placement), t.offsets.popper.position = "absolute", t = D(this.modifiers, t), this.state.isCreated ? this.options.onUpdate(t) : (this.state.isCreated = !0, this.options.onCreate(t))
            }
        }

        function e(t, i) {
            return t.some(function(t) {
                var e = t.name;
                return t.enabled && e === i
            })
        }

        function I(t) {
            for (var e = [!1, "ms", "Webkit", "Moz", "O"], i = t.charAt(0).toUpperCase() + t.slice(1), n = 0; n < e.length - 1; n++) {
                var o = e[n],
                    r = o ? "" + o + i : t;
                if ("undefined" != typeof window.document.body.style[r]) return r
            }
            return null
        }

        function i() {
            return this.state.isDestroyed = !0, e(this.modifiers, "applyStyle") && (this.popper.removeAttribute("x-placement"), this.popper.style.left = "", this.popper.style.position = "", this.popper.style.top = "", this.popper.style[I("transform")] = ""), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), this
        }

        function s(t, e, i, n) {
            var o = "BODY" === t.nodeName,
                r = o ? window : t;
            r.addEventListener(e, i, {
                passive: !0
            }), o || s(f(r.parentNode), e, i, n), n.push(r)
        }

        function r(t, e, i, n) {
            i.updateBound = n, window.addEventListener("resize", i.updateBound, {
                passive: !0
            });
            var o = f(t);
            return s(o, "scroll", i.updateBound, i.scrollParents), i.scrollElement = o, i.eventsEnabled = !0, i
        }

        function P() {
            this.state.eventsEnabled || (this.state = r(this.reference, this.options, this.state, this.scheduleUpdate))
        }

        function N(t, e) {
            return window.removeEventListener("resize", e.updateBound), e.scrollParents.forEach(function(t) {
                t.removeEventListener("scroll", e.updateBound)
            }), e.updateBound = null, e.scrollParents = [], e.scrollElement = null, e.eventsEnabled = !1, e
        }

        function R() {
            this.state.eventsEnabled && (window.cancelAnimationFrame(this.scheduleUpdate), this.state = N(this.reference, this.state))
        }

        function H(t) {
            return "" !== t && !isNaN(parseFloat(t)) && isFinite(t)
        }

        function z(i, n) {
            Object.keys(n).forEach(function(t) {
                var e = ""; - 1 !== ["width", "height", "top", "right", "bottom", "left"].indexOf(t) && H(n[t]) && (e = "px"), i.style[t] = n[t] + e
            })
        }

        function B(e, i) {
            Object.keys(i).forEach(function(t) {
                !1 === i[t] ? e.removeAttribute(t) : e.setAttribute(t, i[t])
            })
        }

        function W(t, e, i) {
            var n = L(t, function(t) {
                    return t.name === e
                }),
                o = !!n && t.some(function(t) {
                    return t.name === i && t.enabled && t.order < n.order
                });
            if (!o) {
                var r = "`" + e + "`";
                console.warn("`" + i + "` modifier is required by " + r + " modifier in order to work, be sure to include it before " + r + "!")
            }
            return o
        }

        function j(t) {
            return "end" === t ? "start" : "start" === t ? "end" : t
        }

        function F(t, e) {
            var i = 1 < arguments.length && void 0 !== e && arguments[1],
                n = lt.indexOf(t),
                o = lt.slice(n + 1).concat(lt.slice(0, n));
            return i ? o.reverse() : o
        }

        function q(t, e, i, n) {
            var o, r = t.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
                s = +r[1],
                a = r[2];
            if (!s) return t;
            if (0 !== a.indexOf("%")) return "vh" !== a && "vw" !== a ? s : ("vh" === a ? X(document.documentElement.clientHeight, window.innerHeight || 0) : X(document.documentElement.clientWidth, window.innerWidth || 0)) / 100 * s;
            switch (a) {
                case "%p":
                    o = i;
                    break;
                case "%":
                case "%r":
                default:
                    o = n
            }
            return x(o)[e] / 100 * s
        }

        function G(t, o, r, e) {
            var s = [0, 0],
                a = -1 !== ["right", "left"].indexOf(e),
                i = t.split(/(\+|\-)/).map(function(t) {
                    return t.trim()
                }),
                n = i.indexOf(L(i, function(t) {
                    return -1 !== t.search(/,|\s/)
                }));
            i[n] && -1 === i[n].indexOf(",") && console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");
            var l = /\s*,\s*|\s+/,
                h = -1 === n ? [i] : [i.slice(0, n).concat([i[n].split(l)[0]]), [i[n].split(l)[1]].concat(i.slice(n + 1))];
            return (h = h.map(function(t, e) {
                var i = (1 === e ? !a : a) ? "height" : "width",
                    n = !1;
                return t.reduce(function(t, e) {
                    return "" === t[t.length - 1] && -1 !== ["+", "-"].indexOf(e) ? (t[t.length - 1] = e, n = !0, t) : n ? (t[t.length - 1] += e, n = !1, t) : t.concat(e)
                }, []).map(function(t) {
                    return q(t, i, o, r)
                })
            })).forEach(function(i, n) {
                i.forEach(function(t, e) {
                    H(t) && (s[n] += t * ("-" === i[e - 1] ? -1 : 1))
                })
            }), s
        }
        for (var U = Math.min, V = Math.floor, X = Math.max, Y = ["native code", "[object MutationObserverConstructor]"], K = function(e) {
                return Y.some(function(t) {
                    return -1 < (e || "").toString().indexOf(t)
                })
            }, $ = "undefined" != typeof window, Q = ["Edge", "Trident", "Firefox"], Z = 0, J = 0; J < Q.length; J += 1)
            if ($ && 0 <= navigator.userAgent.indexOf(Q[J])) {
                Z = 1;
                break
            }
        var tt, et = $ && K(window.MutationObserver) ? function(t) {
                var e = !1,
                    i = 0,
                    n = document.createElement("span");
                return new MutationObserver(function() {
                        t(), e = !1
                    }).observe(n, {
                        attributes: !0
                    }),
                    function() {
                        e || (e = !0, n.setAttribute("x-index", i), ++i)
                    }
            } : function(t) {
                var e = !1;
                return function() {
                    e || (e = !0, setTimeout(function() {
                        e = !1, t()
                    }, Z))
                }
            },
            it = function() {
                return null == tt && (tt = -1 !== navigator.appVersion.indexOf("MSIE 10")), tt
            },
            nt = function(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            },
            ot = function() {
                function n(t, e) {
                    for (var i, n = 0; n < e.length; n++)(i = e[n]).enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
                }
                return function(t, e, i) {
                    return e && n(t.prototype, e), i && n(t, i), t
                }
            }(),
            rt = function(t, e, i) {
                return e in t ? Object.defineProperty(t, e, {
                    value: i,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : t[e] = i, t
            },
            st = Object.assign || function(t) {
                for (var e, i = 1; i < arguments.length; i++)
                    for (var n in e = arguments[i]) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                return t
            },
            at = ["auto-start", "auto", "auto-end", "top-start", "top", "top-end", "right-start", "right", "right-end", "bottom-end", "bottom", "bottom-start", "left-end", "left", "left-start"],
            lt = at.slice(3),
            ht = {
                FLIP: "flip",
                CLOCKWISE: "clockwise",
                COUNTERCLOCKWISE: "counterclockwise"
            },
            ct = function() {
                function s(t, e, i) {
                    var n = this,
                        o = 2 < arguments.length && void 0 !== i ? arguments[2] : {};
                    nt(this, s), this.scheduleUpdate = function() {
                        return requestAnimationFrame(n.update)
                    }, this.update = et(this.update.bind(this)), this.options = st({}, s.Defaults, o), this.state = {
                        isDestroyed: !1,
                        isCreated: !1,
                        scrollParents: []
                    }, this.reference = t.jquery ? t[0] : t, this.popper = e.jquery ? e[0] : e, this.options.modifiers = {}, Object.keys(st({}, s.Defaults.modifiers, o.modifiers)).forEach(function(t) {
                        n.options.modifiers[t] = st({}, s.Defaults.modifiers[t] || {}, o.modifiers ? o.modifiers[t] : {})
                    }), this.modifiers = Object.keys(this.options.modifiers).map(function(t) {
                        return st({
                            name: t
                        }, n.options.modifiers[t])
                    }).sort(function(t, e) {
                        return t.order - e.order
                    }), this.modifiers.forEach(function(t) {
                        t.enabled && a(t.onLoad) && t.onLoad(n.reference, n.popper, n.options, t, n.state)
                    }), this.update();
                    var r = this.options.eventsEnabled;
                    r && this.enableEventListeners(), this.state.eventsEnabled = r
                }
                return ot(s, [{
                    key: "update",
                    value: function() {
                        return t.call(this)
                    }
                }, {
                    key: "destroy",
                    value: function() {
                        return i.call(this)
                    }
                }, {
                    key: "enableEventListeners",
                    value: function() {
                        return P.call(this)
                    }
                }, {
                    key: "disableEventListeners",
                    value: function() {
                        return R.call(this)
                    }
                }]), s
            }();
        return ct.Utils = ("undefined" == typeof window ? global : window).PopperUtils, ct.placements = at, ct.Defaults = {
            placement: "bottom",
            eventsEnabled: !0,
            removeOnDestroy: !1,
            onCreate: function() {},
            onUpdate: function() {},
            modifiers: {
                shift: {
                    order: 100,
                    enabled: !0,
                    fn: function(t) {
                        var e = t.placement,
                            i = e.split("-")[0],
                            n = e.split("-")[1];
                        if (n) {
                            var o = t.offsets,
                                r = o.reference,
                                s = o.popper,
                                a = -1 !== ["bottom", "top"].indexOf(i),
                                l = a ? "left" : "top",
                                h = a ? "width" : "height",
                                c = {
                                    start: rt({}, l, r[l]),
                                    end: rt({}, l, r[l] + r[h] - s[h])
                                };
                            t.offsets.popper = st({}, s, c[n])
                        }
                        return t
                    }
                },
                offset: {
                    order: 200,
                    enabled: !0,
                    fn: function(t, e) {
                        var i, n = e.offset,
                            o = t.placement,
                            r = t.offsets,
                            s = r.popper,
                            a = r.reference,
                            l = o.split("-")[0];
                        return i = H(+n) ? [+n, 0] : G(n, s, a, l), "left" === l ? (s.top += i[0], s.left -= i[1]) : "right" === l ? (s.top += i[0], s.left += i[1]) : "top" === l ? (s.left += i[0], s.top -= i[1]) : "bottom" === l && (s.left += i[0], s.top += i[1]), t.popper = s, t
                    },
                    offset: 0
                },
                preventOverflow: {
                    order: 300,
                    enabled: !0,
                    fn: function(t, n) {
                        var e = n.boundariesElement || y(t.instance.popper);
                        t.instance.reference === e && (e = y(e));
                        var o = E(t.instance.popper, t.instance.reference, n.padding, e);
                        n.boundaries = o;
                        var i = n.priority,
                            r = t.offsets.popper,
                            s = {
                                primary: function(t) {
                                    var e = r[t];
                                    return r[t] < o[t] && !n.escapeWithReference && (e = X(r[t], o[t])), rt({}, t, e)
                                },
                                secondary: function(t) {
                                    var e = "right" === t ? "left" : "top",
                                        i = r[e];
                                    return r[t] > o[t] && !n.escapeWithReference && (i = U(r[e], o[t] - ("right" === t ? r.width : r.height))), rt({}, e, i)
                                }
                            };
                        return i.forEach(function(t) {
                            var e = -1 === ["left", "top"].indexOf(t) ? "secondary" : "primary";
                            r = st({}, r, s[e](t))
                        }), t.offsets.popper = r, t
                    },
                    priority: ["left", "right", "top", "bottom"],
                    padding: 5,
                    boundariesElement: "scrollParent"
                },
                keepTogether: {
                    order: 400,
                    enabled: !0,
                    fn: function(t) {
                        var e = t.offsets,
                            i = e.popper,
                            n = e.reference,
                            o = t.placement.split("-")[0],
                            r = V,
                            s = -1 !== ["top", "bottom"].indexOf(o),
                            a = s ? "right" : "bottom",
                            l = s ? "left" : "top",
                            h = s ? "width" : "height";
                        return i[a] < r(n[l]) && (t.offsets.popper[l] = r(n[l]) - i[h]), i[l] > r(n[a]) && (t.offsets.popper[l] = r(n[a])), t
                    }
                },
                arrow: {
                    order: 500,
                    enabled: !0,
                    fn: function(t, e) {
                        if (!W(t.instance.modifiers, "arrow", "keepTogether")) return t;
                        var i = e.element;
                        if ("string" == typeof i) {
                            if (!(i = t.instance.popper.querySelector(i))) return t
                        } else if (!t.instance.popper.contains(i)) return console.warn("WARNING: `arrow.element` must be child of its popper element!"), t;
                        var n = t.placement.split("-")[0],
                            o = t.offsets,
                            r = o.popper,
                            s = o.reference,
                            a = -1 !== ["left", "right"].indexOf(n),
                            l = a ? "height" : "width",
                            h = a ? "top" : "left",
                            c = a ? "left" : "top",
                            u = a ? "bottom" : "right",
                            d = _(i)[l];
                        s[u] - d < r[h] && (t.offsets.popper[h] -= r[h] - (s[u] - d)), s[h] + d > r[u] && (t.offsets.popper[h] += s[h] + d - r[u]);
                        var p = s[h] + s[l] / 2 - d / 2 - x(t.offsets.popper)[h];
                        return p = X(U(r[l] - d, p), 0), t.arrowElement = i, t.offsets.arrow = {}, t.offsets.arrow[h] = Math.round(p), t.offsets.arrow[c] = "", t
                    },
                    element: "[x-arrow]"
                },
                flip: {
                    order: 600,
                    enabled: !0,
                    fn: function(p, f) {
                        if (e(p.instance.modifiers, "inner")) return p;
                        if (p.flipped && p.placement === p.originalPlacement) return p;
                        var g = E(p.instance.popper, p.instance.reference, f.padding, f.boundariesElement),
                            m = p.placement.split("-")[0],
                            v = M(m),
                            y = p.placement.split("-")[1] || "",
                            b = [];
                        switch (f.behavior) {
                            case ht.FLIP:
                                b = [m, v];
                                break;
                            case ht.CLOCKWISE:
                                b = F(m);
                                break;
                            case ht.COUNTERCLOCKWISE:
                                b = F(m, !0);
                                break;
                            default:
                                b = f.behavior
                        }
                        return b.forEach(function(t, e) {
                            if (m !== t || b.length === e + 1) return p;
                            m = p.placement.split("-")[0], v = M(m);
                            var i = p.offsets.popper,
                                n = p.offsets.reference,
                                o = V,
                                r = "left" === m && o(i.right) > o(n.left) || "right" === m && o(i.left) < o(n.right) || "top" === m && o(i.bottom) > o(n.top) || "bottom" === m && o(i.top) < o(n.bottom),
                                s = o(i.left) < o(g.left),
                                a = o(i.right) > o(g.right),
                                l = o(i.top) < o(g.top),
                                h = o(i.bottom) > o(g.bottom),
                                c = "left" === m && s || "right" === m && a || "top" === m && l || "bottom" === m && h,
                                u = -1 !== ["top", "bottom"].indexOf(m),
                                d = !!f.flipVariations && (u && "start" === y && s || u && "end" === y && a || !u && "start" === y && l || !u && "end" === y && h);
                            (r || c || d) && (p.flipped = !0, (r || c) && (m = b[e + 1]), d && (y = j(y)), p.placement = m + (y ? "-" + y : ""), p.offsets.popper = st({}, p.offsets.popper, O(p.instance.popper, p.offsets.reference, p.placement)), p = D(p.instance.modifiers, p, "flip"))
                        }), p
                    },
                    behavior: "flip",
                    padding: 5,
                    boundariesElement: "viewport"
                },
                inner: {
                    order: 700,
                    enabled: !1,
                    fn: function(t) {
                        var e = t.placement,
                            i = e.split("-")[0],
                            n = t.offsets,
                            o = n.popper,
                            r = n.reference,
                            s = -1 !== ["left", "right"].indexOf(i),
                            a = -1 === ["top", "left"].indexOf(i);
                        return o[s ? "left" : "top"] = r[e] - (a ? o[s ? "width" : "height"] : 0), t.placement = M(e), t.offsets.popper = x(o), t
                    }
                },
                hide: {
                    order: 800,
                    enabled: !0,
                    fn: function(t) {
                        if (!W(t.instance.modifiers, "hide", "preventOverflow")) return t;
                        var e = t.offsets.reference,
                            i = L(t.instance.modifiers, function(t) {
                                return "preventOverflow" === t.name
                            }).boundaries;
                        if (e.bottom < i.top || e.left > i.right || e.top > i.bottom || e.right < i.left) {
                            if (!0 === t.hide) return t;
                            t.hide = !0, t.attributes["x-out-of-boundaries"] = ""
                        } else {
                            if (!1 === t.hide) return t;
                            t.hide = !1, t.attributes["x-out-of-boundaries"] = !1
                        }
                        return t
                    }
                },
                computeStyle: {
                    order: 850,
                    enabled: !0,
                    fn: function(t, e) {
                        var i = e.x,
                            n = e.y,
                            o = t.offsets.popper,
                            r = L(t.instance.modifiers, function(t) {
                                return "applyStyle" === t.name
                            }).gpuAcceleration;
                        void 0 !== r && console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");
                        var s, a, l = void 0 === r ? e.gpuAcceleration : r,
                            h = w(y(t.instance.popper)),
                            c = {
                                position: o.position
                            },
                            u = {
                                left: V(o.left),
                                top: V(o.top),
                                bottom: V(o.bottom),
                                right: V(o.right)
                            },
                            d = "bottom" === i ? "top" : "bottom",
                            p = "right" === n ? "left" : "right",
                            f = I("transform");
                        if (a = "bottom" == d ? -h.height + u.bottom : u.top, s = "right" == p ? -h.width + u.right : u.left, l && f) c[f] = "translate3d(" + s + "px, " + a + "px, 0)", c[d] = 0, c[p] = 0, c.willChange = "transform";
                        else {
                            var g = "bottom" == d ? -1 : 1,
                                m = "right" == p ? -1 : 1;
                            c[d] = a * g, c[p] = s * m, c.willChange = d + ", " + p
                        }
                        var v = {
                            "x-placement": t.placement
                        };
                        return t.attributes = st({}, v, t.attributes), t.styles = st({}, c, t.styles), t
                    },
                    gpuAcceleration: !0,
                    x: "bottom",
                    y: "right"
                },
                applyStyle: {
                    order: 900,
                    enabled: !0,
                    fn: function(t) {
                        return z(t.instance.popper, t.styles), B(t.instance.popper, t.attributes), t.offsets.arrow && z(t.arrowElement, t.offsets.arrow), t
                    },
                    onLoad: function(t, e, i, n, o) {
                        var r = k(o, e, t),
                            s = c(i.placement, r, e, t, i.modifiers.flip.boundariesElement, i.modifiers.flip.padding);
                        return e.setAttribute("x-placement", s), z(e, {
                            position: "absolute"
                        }), i
                    },
                    gpuAcceleration: void 0
                }
            }
        }, ct
    }), "undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");
! function() {
    var t = jQuery.fn.jquery.split(" ")[0].split(".");
    if (t[0] < 2 && t[1] < 9 || 1 == t[0] && 9 == t[1] && t[2] < 1 || 4 <= t[0]) throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0")
}(),
function() {
    "use strict";

    function c(t, e) {
        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != typeof e && "function" != typeof e ? t : e
    }

    function u(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }

    function _(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }
    var d, t, p, f, e, i, n, g, o, m, v, r, s, a, l, h, y, b, x, w, T, C, S, E, A, k, M, O, L, D, I, P, N, R, H, z, B, W, j, F, q, G, U, V, X, Y, K, Q, Z, J, tt, et, it, nt, ot, rt, st, at, lt, ht, ct, ut, dt, pt, ft, gt, mt, vt, yt, bt, xt, wt, Tt, Ct, St, Et, At, kt, _t, Mt, Ot, Lt, Dt, It, Pt, Nt, Rt, Ht, zt, Bt, Wt, jt, Ft, qt, Gt, Ut, Vt, Xt, Yt, Kt, $t, Qt, Zt, Jt, te, ee, ie, ne, oe, re, se, ae, le, he, ce, ue, de, pe, fe, ge, me, ve, ye, be, xe, we, Te, Ce, Se, Ee, Ae, ke, _e, Me, Oe, Le, De, Ie, Pe, Ne, Re, He, ze, Be, We, je, Fe, qe, Ge, Ue, Ve, Xe, Ye, Ke, $e, Qe, Ze, Je, ti, ei, ii, ni, oi, ri, si, ai, li, hi, ci, ui, di, pi, fi, gi, mi, vi, yi, bi, xi, wi, Ti, Ci, Si, Ei, Ai, ki, _i, Mi, Oi, Li, Di, Ii, Pi, Ni = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        },
        Ri = Object.assign || function(t) {
            for (var e = 1; e < arguments.length; e++) {
                var i = arguments[e];
                for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (t[n] = i[n])
            }
            return t
        },
        Hi = function() {
            function n(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var n = e[i];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                }
            }
            return function(t, e, i) {
                return e && n(t.prototype, e), i && n(t, i), t
            }
        }(),
        zi = function(n) {
            function a(t) {
                return {}.toString.call(t).match(/\s([a-z]+)/i)[1].toLowerCase()
            }

            function t() {
                return {
                    bindType: r.end,
                    delegateType: r.end,
                    handle: function e(t) {
                        return n(t.target).is(this) ? t.handleObj.handler.apply(this, arguments) : undefined
                    }
                }
            }

            function e() {
                return ("undefined" == typeof window || !window.QUnit) && {
                    end: "transitionend"
                }
            }

            function i(t) {
                var e = this,
                    i = !1;
                return n(this).one(l.TRANSITION_END, function() {
                    i = !0
                }), setTimeout(function() {
                    i || l.triggerTransitionEnd(e)
                }, t), this
            }

            function o() {
                r = e(), n.fn.emulateTransitionEnd = i, l.supportsTransitionEnd() && (n.event.special[l.TRANSITION_END] = t())
            }
            var r = !1,
                s = 1e6,
                l = {
                    TRANSITION_END: "bsTransitionEnd",
                    getUID: function h(t) {
                        for (; t += ~~(Math.random() * s), document.getElementById(t););
                        return t
                    },
                    getSelectorFromElement: function c(t) {
                        var e = t.getAttribute("data-target");
                        e && "#" !== e || (e = t.getAttribute("href") || "");
                        try {
                            return 0 < n(document).find(e).length ? e : null
                        } catch (i) {
                            return null
                        }
                    },
                    reflow: function u(t) {
                        return t.offsetHeight
                    },
                    triggerTransitionEnd: function d(t) {
                        n(t).trigger(r.end)
                    },
                    supportsTransitionEnd: function p() {
                        return Boolean(r)
                    },
                    isElement: function f(t) {
                        return (t[0] || t).nodeType
                    },
                    typeCheckConfig: function g(t, e, i) {
                        for (var n in i)
                            if (Object.prototype.hasOwnProperty.call(i, n)) {
                                var o = i[n],
                                    r = e[n],
                                    s = r && l.isElement(r) ? "element" : a(r);
                                if (!new RegExp(o).test(s)) throw new Error(t.toUpperCase() + ': Option "' + n + '" provided type "' + s + '" but expected type "' + o + '".')
                            }
                    }
                };
            return o(), l
        }($),
        Bi = (d = $, t = "alert", p = "4.0.0", e = "." + (f = "bs.alert"), i = ".data-api", n = d.fn[t], g = 150, o = {
            DISMISS: '[data-dismiss="alert"]'
        }, m = {
            CLOSE: "close" + e,
            CLOSED: "closed" + e,
            CLICK_DATA_API: "click" + e + i
        }, v = {
            ALERT: "alert",
            FADE: "fade",
            SHOW: "show"
        }, r = function() {
            function n(t) {
                _(this, n), this._element = t
            }
            return n.prototype.close = function i(t) {
                t = t || this._element;
                var e = this._getRootElement(t);
                this._triggerCloseEvent(e).isDefaultPrevented() || this._removeElement(e)
            }, n.prototype.dispose = function t() {
                d.removeData(this._element, f), this._element = null
            }, n.prototype._getRootElement = function o(t) {
                var e = zi.getSelectorFromElement(t),
                    i = !1;
                return e && (i = d(e)[0]), i || (i = d(t).closest("." + v.ALERT)[0]), i
            }, n.prototype._triggerCloseEvent = function r(t) {
                var e = d.Event(m.CLOSE);
                return d(t).trigger(e), e
            }, n.prototype._removeElement = function s(e) {
                var i = this;
                d(e).removeClass(v.SHOW), zi.supportsTransitionEnd() && d(e).hasClass(v.FADE) ? d(e).one(zi.TRANSITION_END, function(t) {
                    return i._destroyElement(e, t)
                }).emulateTransitionEnd(g) : this._destroyElement(e)
            }, n.prototype._destroyElement = function e(t) {
                d(t).detach().trigger(m.CLOSED).remove()
            }, n._jQueryInterface = function a(i) {
                return this.each(function() {
                    var t = d(this),
                        e = t.data(f);
                    e || (e = new n(this), t.data(f, e)), "close" === i && e[i](this)
                })
            }, n._handleDismiss = function l(e) {
                return function(t) {
                    t && t.preventDefault(), e.close(this)
                }
            }, Hi(n, null, [{
                key: "VERSION",
                get: function h() {
                    return p
                }
            }]), n
        }(), d(document).on(m.CLICK_DATA_API, o.DISMISS, r._handleDismiss(new r)), d.fn[t] = r._jQueryInterface, d.fn[t].Constructor = r, d.fn[t].noConflict = function() {
            return d.fn[t] = n, r._jQueryInterface
        }, s = $, a = "button", l = "4.0.0", y = "." + (h = "bs.button"), b = ".data-api", x = s.fn[a], w = {
            ACTIVE: "active",
            BUTTON: "btn",
            FOCUS: "focus"
        }, T = {
            DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
            DATA_TOGGLE: '[data-toggle="buttons"]',
            INPUT: "input",
            ACTIVE: ".active",
            BUTTON: ".btn"
        }, C = {
            CLICK_DATA_API: "click" + y + b,
            FOCUS_BLUR_DATA_API: "focus" + y + b + " blur" + y + b
        }, S = function() {
            function i(t) {
                _(this, i), this._element = t
            }
            return i.prototype.toggle = function r() {
                var t = !0,
                    e = !0,
                    i = s(this._element).closest(T.DATA_TOGGLE)[0];
                if (i) {
                    var n = s(this._element).find(T.INPUT)[0];
                    if (n) {
                        if ("radio" === n.type)
                            if (n.checked && s(this._element).hasClass(w.ACTIVE)) t = !1;
                            else {
                                var o = s(i).find(T.ACTIVE)[0];
                                o && s(o).removeClass(w.ACTIVE)
                            }
                        if (t) {
                            if (n.hasAttribute("disabled") || i.hasAttribute("disabled") || n.classList.contains("disabled") || i.classList.contains("disabled")) return;
                            n.checked = !s(this._element).hasClass(w.ACTIVE), s(n).trigger("change")
                        }
                        n.focus(), e = !1
                    }
                }
                e && this._element.setAttribute("aria-pressed", !s(this._element).hasClass(w.ACTIVE)), t && s(this._element).toggleClass(w.ACTIVE)
            }, i.prototype.dispose = function t() {
                s.removeData(this._element, h), this._element = null
            }, i._jQueryInterface = function n(e) {
                return this.each(function() {
                    var t = s(this).data(h);
                    t || (t = new i(this), s(this).data(h, t)), "toggle" === e && t[e]()
                })
            }, Hi(i, null, [{
                key: "VERSION",
                get: function e() {
                    return l
                }
            }]), i
        }(), s(document).on(C.CLICK_DATA_API, T.DATA_TOGGLE_CARROT, function(t) {
            t.preventDefault();
            var e = t.target;
            s(e).hasClass(w.BUTTON) || (e = s(e).closest(T.BUTTON)), S._jQueryInterface.call(s(e), "toggle")
        }).on(C.FOCUS_BLUR_DATA_API, T.DATA_TOGGLE_CARROT, function(t) {
            var e = s(t.target).closest(T.BUTTON)[0];
            s(e).toggleClass(w.FOCUS, /^focus(in)?$/.test(t.type))
        }), s.fn[a] = S._jQueryInterface, s.fn[a].Constructor = S, s.fn[a].noConflict = function() {
            return s.fn[a] = x, S._jQueryInterface
        }, E = $, A = "carousel", k = "4.0.0", O = "." + (M = "bs.carousel"), L = ".data-api", D = E.fn[A], I = 600, P = 37, N = 39, H = {
            interval: 5e3,
            keyboard: !0,
            slide: !(R = 500),
            pause: "hover",
            wrap: !0
        }, z = {
            interval: "(number|boolean)",
            keyboard: "boolean",
            slide: "(boolean|string)",
            pause: "(string|boolean)",
            wrap: "boolean"
        }, B = {
            NEXT: "next",
            PREV: "prev",
            LEFT: "left",
            RIGHT: "right"
        }, W = {
            SLIDE: "slide" + O,
            SLID: "slid" + O,
            KEYDOWN: "keydown" + O,
            MOUSEENTER: "mouseenter" + O,
            MOUSELEAVE: "mouseleave" + O,
            TOUCHEND: "touchend" + O,
            LOAD_DATA_API: "load" + O + L,
            CLICK_DATA_API: "click" + O + L
        }, j = {
            CAROUSEL: "carousel",
            ACTIVE: "active",
            SLIDE: "slide",
            RIGHT: "carousel-item-right",
            LEFT: "carousel-item-left",
            NEXT: "carousel-item-next",
            PREV: "carousel-item-prev",
            ITEM: "carousel-item"
        }, F = {
            ACTIVE: ".active",
            ACTIVE_ITEM: ".active.carousel-item",
            ITEM: ".carousel-item",
            NEXT_PREV: ".carousel-item-next, .carousel-item-prev",
            INDICATORS: ".carousel-indicators",
            DATA_SLIDE: "[data-slide], [data-slide-to]",
            DATA_RIDE: '[data-ride="carousel"]'
        }, q = function() {
            function r(t, e) {
                _(this, r), this._items = null, this._interval = null, this._activeElement = null, this._isPaused = !1, this._isSliding = !1, this.touchTimeout = null, this._config = this._getConfig(e), this._element = E(t)[0], this._indicatorsElement = E(this._element).find(F.INDICATORS)[0], this._addEventListeners()
            }
            return r.prototype.next = function t() {
                this._isSliding || this._slide(B.NEXT)
            }, r.prototype.nextWhenVisible = function e() {
                !document.hidden && E(this._element).is(":visible") && "hidden" !== E(this._element).css("visibility") && this.next()
            }, r.prototype.prev = function i() {
                this._isSliding || this._slide(B.PREV)
            }, r.prototype.pause = function n(t) {
                t || (this._isPaused = !0), E(this._element).find(F.NEXT_PREV)[0] && zi.supportsTransitionEnd() && (zi.triggerTransitionEnd(this._element), this.cycle(!0)), clearInterval(this._interval), this._interval = null
            }, r.prototype.cycle = function o(t) {
                t || (this._isPaused = !1), this._interval && (clearInterval(this._interval), this._interval = null), this._config.interval && !this._isPaused && (this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval))
            }, r.prototype.to = function s(t) {
                var e = this;
                this._activeElement = E(this._element).find(F.ACTIVE_ITEM)[0];
                var i = this._getItemIndex(this._activeElement);
                if (!(t > this._items.length - 1 || t < 0))
                    if (this._isSliding) E(this._element).one(W.SLID, function() {
                        return e.to(t)
                    });
                    else {
                        if (i === t) return this.pause(), void this.cycle();
                        var n = i < t ? B.NEXT : B.PREV;
                        this._slide(n, this._items[t])
                    }
            }, r.prototype.dispose = function a() {
                E(this._element).off(O), E.removeData(this._element, M), this._items = null, this._config = null, this._element = null, this._interval = null, this._isPaused = null, this._isSliding = null, this._activeElement = null, this._indicatorsElement = null
            }, r.prototype._getConfig = function l(t) {
                return t = Ri({}, H, t), zi.typeCheckConfig(A, t, z), t
            }, r.prototype._addEventListeners = function h() {
                var e = this;
                this._config.keyboard && E(this._element).on(W.KEYDOWN, function(t) {
                    return e._keydown(t)
                }), "hover" === this._config.pause && (E(this._element).on(W.MOUSEENTER, function(t) {
                    return e.pause(t)
                }).on(W.MOUSELEAVE, function(t) {
                    return e.cycle(t)
                }), "ontouchstart" in document.documentElement && E(this._element).on(W.TOUCHEND, function() {
                    e.pause(), e.touchTimeout && clearTimeout(e.touchTimeout), e.touchTimeout = setTimeout(function(t) {
                        return e.cycle(t)
                    }, R + e._config.interval)
                }))
            }, r.prototype._keydown = function c(t) {
                if (!/input|textarea/i.test(t.target.tagName)) switch (t.which) {
                    case P:
                        t.preventDefault(), this.prev();
                        break;
                    case N:
                        t.preventDefault(), this.next()
                }
            }, r.prototype._getItemIndex = function u(t) {
                return this._items = E.makeArray(E(t).parent().find(F.ITEM)), this._items.indexOf(t)
            }, r.prototype._getItemByDirection = function d(t, e) {
                var i = t === B.NEXT,
                    n = t === B.PREV,
                    o = this._getItemIndex(e),
                    r = this._items.length - 1;
                if ((n && 0 === o || i && o === r) && !this._config.wrap) return e;
                var s = (o + (t === B.PREV ? -1 : 1)) % this._items.length;
                return -1 === s ? this._items[this._items.length - 1] : this._items[s]
            }, r.prototype._triggerSlideEvent = function p(t, e) {
                var i = this._getItemIndex(t),
                    n = this._getItemIndex(E(this._element).find(F.ACTIVE_ITEM)[0]),
                    o = E.Event(W.SLIDE, {
                        relatedTarget: t,
                        direction: e,
                        from: n,
                        to: i
                    });
                return E(this._element).trigger(o), o
            }, r.prototype._setActiveIndicatorElement = function f(t) {
                if (this._indicatorsElement) {
                    E(this._indicatorsElement).find(F.ACTIVE).removeClass(j.ACTIVE);
                    var e = this._indicatorsElement.children[this._getItemIndex(t)];
                    e && E(e).addClass(j.ACTIVE)
                }
            }, r.prototype._slide = function g(t, e) {
                var i = this,
                    n = E(this._element).find(F.ACTIVE_ITEM)[0],
                    o = this._getItemIndex(n),
                    r = e || n && this._getItemByDirection(t, n),
                    s = this._getItemIndex(r),
                    a = Boolean(this._interval),
                    l = void 0,
                    h = void 0,
                    c = void 0;
                if (t === B.NEXT ? (l = j.LEFT, h = j.NEXT, c = B.LEFT) : (l = j.RIGHT, h = j.PREV, c = B.RIGHT), r && E(r).hasClass(j.ACTIVE)) this._isSliding = !1;
                else if (!this._triggerSlideEvent(r, c).isDefaultPrevented() && n && r) {
                    this._isSliding = !0, a && this.pause(), this._setActiveIndicatorElement(r);
                    var u = E.Event(W.SLID, {
                        relatedTarget: r,
                        direction: c,
                        from: o,
                        to: s
                    });
                    zi.supportsTransitionEnd() && E(this._element).hasClass(j.SLIDE) ? (E(r).addClass(h), zi.reflow(r), E(n).addClass(l), E(r).addClass(l), E(n).one(zi.TRANSITION_END, function() {
                        E(r).removeClass(l + " " + h).addClass(j.ACTIVE), E(n).removeClass(j.ACTIVE + " " + h + " " + l), i._isSliding = !1, setTimeout(function() {
                            return E(i._element).trigger(u)
                        }, 0)
                    }).emulateTransitionEnd(I)) : (E(n).removeClass(j.ACTIVE), E(r).addClass(j.ACTIVE), this._isSliding = !1, E(this._element).trigger(u)), a && this.cycle()
                }
            }, r._jQueryInterface = function m(n) {
                return this.each(function() {
                    var t = E(this).data(M),
                        e = Ri({}, H, E(this).data());
                    "object" === (void 0 === n ? "undefined" : Ni(n)) && (e = Ri({}, e, n));
                    var i = "string" == typeof n ? n : e.slide;
                    if (t || (t = new r(this, e), E(this).data(M, t)), "number" == typeof n) t.to(n);
                    else if ("string" == typeof i) {
                        if ("undefined" == typeof t[i]) throw new TypeError('No method named "' + i + '"');
                        t[i]()
                    } else e.interval && (t.pause(), t.cycle())
                })
            }, r._dataApiClickHandler = function v(t) {
                var e = zi.getSelectorFromElement(this);
                if (e) {
                    var i = E(e)[0];
                    if (i && E(i).hasClass(j.CAROUSEL)) {
                        var n = Ri({}, E(i).data(), E(this).data()),
                            o = this.getAttribute("data-slide-to");
                        o && (n.interval = !1), r._jQueryInterface.call(E(i), n), o && E(i).data(M).to(o), t.preventDefault()
                    }
                }
            }, Hi(r, null, [{
                key: "VERSION",
                get: function y() {
                    return k
                }
            }, {
                key: "Default",
                get: function y() {
                    return H
                }
            }]), r
        }(), E(document).on(W.CLICK_DATA_API, F.DATA_SLIDE, q._dataApiClickHandler), E(window).on(W.LOAD_DATA_API, function() {
            E(F.DATA_RIDE).each(function() {
                var t = E(this);
                q._jQueryInterface.call(t, t.data())
            })
        }), E.fn[A] = q._jQueryInterface, E.fn[A].Constructor = q, E.fn[A].noConflict = function() {
            return E.fn[A] = D, q._jQueryInterface
        }, G = $, U = "collapse", V = "4.0.0", Y = "." + (X = "bs.collapse"), K = ".data-api", Q = G.fn[U], Z = 600, J = {
            toggle: !0,
            parent: ""
        }, tt = {
            toggle: "boolean",
            parent: "(string|element)"
        }, et = {
            SHOW: "show" + Y,
            SHOWN: "shown" + Y,
            HIDE: "hide" + Y,
            HIDDEN: "hidden" + Y,
            CLICK_DATA_API: "click" + Y + K
        }, it = {
            SHOW: "show",
            COLLAPSE: "collapse",
            COLLAPSING: "collapsing",
            COLLAPSED: "collapsed"
        }, nt = {
            WIDTH: "width",
            HEIGHT: "height"
        }, ot = {
            ACTIVES: ".show, .collapsing",
            DATA_TOGGLE: '[data-toggle="collapse"]'
        }, rt = function() {
            function a(t, e) {
                _(this, a), this._isTransitioning = !1, this._element = t, this._config = this._getConfig(e), this._triggerArray = G.makeArray(G('[data-toggle="collapse"][href="#' + t.id + '"],[data-toggle="collapse"][data-target="#' + t.id + '"]'));
                for (var i = G(ot.DATA_TOGGLE), n = 0; n < i.length; n++) {
                    var o = i[n],
                        r = zi.getSelectorFromElement(o);
                    null !== r && 0 < G(r).filter(t).length && (this._selector = r, this._triggerArray.push(o))
                }
                this._parent = this._config.parent ? this._getParent() : null, this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray), this._config.toggle && this.toggle()
            }
            return a.prototype.toggle = function t() {
                    G(this._element).hasClass(it.SHOW) ? this.hide() : this.show()
                }, a.prototype.show = function l() {
                    var t = this;
                    if (!this._isTransitioning && !G(this._element).hasClass(it.SHOW)) {
                        var e = void 0,
                            i = void 0;
                        if (this._parent && 0 === (e = G.makeArray(G(this._parent).find(ot.ACTIVES).filter('[data-parent="' + this._config.parent + '"]'))).length && (e = null), !(e && (i = G(e).not(this._selector).data(X)) && i._isTransitioning)) {
                            var n = G.Event(et.SHOW);
                            if (G(this._element).trigger(n), !n.isDefaultPrevented()) {
                                e && (a._jQueryInterface.call(G(e).not(this._selector), "hide"), i || G(e).data(X, null));
                                var o = this._getDimension();
                                G(this._element).removeClass(it.COLLAPSE).addClass(it.COLLAPSING), (this._element.style[o] = 0) < this._triggerArray.length && G(this._triggerArray).removeClass(it.COLLAPSED).attr("aria-expanded", !0), this.setTransitioning(!0);
                                var r = function r() {
                                    G(t._element).removeClass(it.COLLAPSING).addClass(it.COLLAPSE).addClass(it.SHOW), t._element.style[o] = "", t.setTransitioning(!1), G(t._element).trigger(et.SHOWN)
                                };
                                if (zi.supportsTransitionEnd()) {
                                    var s = "scroll" + (o[0].toUpperCase() + o.slice(1));
                                    G(this._element).one(zi.TRANSITION_END, r).emulateTransitionEnd(Z), this._element.style[o] = this._element[s] + "px"
                                } else r()
                            }
                        }
                    }
                }, a.prototype.hide = function h() {
                    var t = this;
                    if (!this._isTransitioning && G(this._element).hasClass(it.SHOW)) {
                        var e = G.Event(et.HIDE);
                        if (G(this._element).trigger(e), !e.isDefaultPrevented()) {
                            var i = this._getDimension();
                            if (this._element.style[i] = this._element.getBoundingClientRect()[i] + "px", zi.reflow(this._element), G(this._element).addClass(it.COLLAPSING).removeClass(it.COLLAPSE).removeClass(it.SHOW), 0 < this._triggerArray.length)
                                for (var n = 0; n < this._triggerArray.length; n++) {
                                    var o = this._triggerArray[n],
                                        r = zi.getSelectorFromElement(o);
                                    if (null !== r) G(r).hasClass(it.SHOW) || G(o).addClass(it.COLLAPSED).attr("aria-expanded", !1)
                                }
                            this.setTransitioning(!0);
                            var s = function s() {
                                t.setTransitioning(!1), G(t._element).removeClass(it.COLLAPSING).addClass(it.COLLAPSE).trigger(et.HIDDEN)
                            };
                            this._element.style[i] = "", zi.supportsTransitionEnd() ? G(this._element).one(zi.TRANSITION_END, s).emulateTransitionEnd(Z) : s()
                        }
                    }
                }, a.prototype.setTransitioning = function e(t) {
                    this._isTransitioning = t
                }, a.prototype.dispose = function i() {
                    G.removeData(this._element, X), this._config = null, this._parent = null, this._element = null, this._triggerArray = null, this._isTransitioning = null
                }, a.prototype._getConfig = function n(t) {
                    return (t = Ri({}, J, t)).toggle = Boolean(t.toggle), zi.typeCheckConfig(U, t, tt), t
                }, a.prototype._getDimension = function o() {
                    return G(this._element).hasClass(nt.WIDTH) ? nt.WIDTH : nt.HEIGHT
                }, a.prototype._getParent = function r() {
                    var i = this,
                        t = null;
                    zi.isElement(this._config.parent) ? (t = this._config.parent, "undefined" != typeof this._config.parent.jquery && (t = this._config.parent[0])) : t = G(this._config.parent)[0];
                    var e = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]';
                    return G(t).find(e).each(function(t, e) {
                        i._addAriaAndCollapsedClass(a._getTargetFromElement(e), [e])
                    }), t
                }, a.prototype._addAriaAndCollapsedClass = function s(t, e) {
                    if (t) {
                        var i = G(t).hasClass(it.SHOW);
                        0 < e.length && G(e).toggleClass(it.COLLAPSED, !i).attr("aria-expanded", i)
                    }
                },
                a._getTargetFromElement = function c(t) {
                    var e = zi.getSelectorFromElement(t);
                    return e ? G(e)[0] : null
                }, a._jQueryInterface = function u(n) {
                    return this.each(function() {
                        var t = G(this),
                            e = t.data(X),
                            i = Ri({}, J, t.data(), "object" === (void 0 === n ? "undefined" : Ni(n)) && n);
                        if (!e && i.toggle && /show|hide/.test(n) && (i.toggle = !1), e || (e = new a(this, i), t.data(X, e)), "string" == typeof n) {
                            if ("undefined" == typeof e[n]) throw new TypeError('No method named "' + n + '"');
                            e[n]()
                        }
                    })
                }, Hi(a, null, [{
                    key: "VERSION",
                    get: function d() {
                        return V
                    }
                }, {
                    key: "Default",
                    get: function d() {
                        return J
                    }
                }]), a
        }(), G(document).on(et.CLICK_DATA_API, ot.DATA_TOGGLE, function(t) {
            "A" === t.currentTarget.tagName && t.preventDefault();
            var i = G(this),
                e = zi.getSelectorFromElement(this);
            G(e).each(function() {
                var t = G(this),
                    e = t.data(X) ? "toggle" : i.data();
                rt._jQueryInterface.call(t, e)
            })
        }), G.fn[U] = rt._jQueryInterface, G.fn[U].Constructor = rt, G.fn[U].noConflict = function() {
            return G.fn[U] = Q, rt._jQueryInterface
        }, st = $, Popper, at = "dropdown", lt = "4.0.0", ct = "." + (ht = "bs.dropdown"), ut = ".data-api", dt = st.fn[at], pt = 27, ft = 32, gt = 9, mt = 38, vt = 40, yt = 3, bt = new RegExp(mt + "|" + vt + "|" + pt), xt = {
            HIDE: "hide" + ct,
            HIDDEN: "hidden" + ct,
            SHOW: "show" + ct,
            SHOWN: "shown" + ct,
            CLICK: "click" + ct,
            CLICK_DATA_API: "click" + ct + ut,
            KEYDOWN_DATA_API: "keydown" + ct + ut,
            KEYUP_DATA_API: "keyup" + ct + ut
        }, wt = {
            DISABLED: "disabled",
            SHOW: "show",
            DROPUP: "dropup",
            DROPRIGHT: "dropright",
            DROPLEFT: "dropleft",
            MENURIGHT: "dropdown-menu-right",
            MENULEFT: "dropdown-menu-left",
            POSITION_STATIC: "position-static"
        }, Tt = {
            DATA_TOGGLE: '[data-toggle="dropdown"]',
            FORM_CHILD: ".dropdown form",
            MENU: ".dropdown-menu",
            NAVBAR_NAV: ".navbar-nav",
            VISIBLE_ITEMS: ".dropdown-menu .dropdown-item:not(.disabled)"
        }, Ct = {
            TOP: "top-start",
            TOPEND: "top-end",
            BOTTOM: "bottom-start",
            BOTTOMEND: "bottom-end",
            RIGHT: "right-start",
            RIGHTEND: "right-end",
            LEFT: "left-start",
            LEFTEND: "left-end"
        }, St = {
            offset: 0,
            flip: !0,
            boundary: "scrollParent",
            reference: "toggle"
        }, Et = {
            offset: "(number|string|function)",
            flip: "boolean",
            boundary: "(string|element)",
            reference: "(string|element)"
        }, At = function() {
            function l(t, e) {
                _(this, l), this._element = t, this._popper = null, this._config = this._getConfig(e), this._menu = this._getMenuElement(), this._inNavbar = this._detectNavbar(), this._addEventListeners()
            }
            return l.prototype.toggle = function r() {
                if (!this._element.disabled && !st(this._element).hasClass(wt.DISABLED)) {
                    var t = l._getParentFromElement(this._element),
                        e = st(this._menu).hasClass(wt.SHOW);
                    if (l._clearMenus(), !e) {
                        var i = {
                                relatedTarget: this._element
                            },
                            n = st.Event(xt.SHOW, i);
                        if (st(t).trigger(n), !n.isDefaultPrevented()) {
                            if (!this._inNavbar) {
                                if ("undefined" == typeof Popper) throw new TypeError("Bootstrap dropdown require Popper.js (https://popper.js.org)");
                                var o = this._element;
                                "parent" === this._config.reference ? o = t : zi.isElement(this._config.reference) && (o = this._config.reference, "undefined" != typeof this._config.reference.jquery && (o = this._config.reference[0])), "scrollParent" !== this._config.boundary && st(t).addClass(wt.POSITION_STATIC), this._popper = new Popper(o, this._menu, this._getPopperConfig())
                            }
                            "ontouchstart" in document.documentElement && 0 === st(t).closest(Tt.NAVBAR_NAV).length && st("body").children().on("mouseover", null, st.noop), this._element.focus(), this._element.setAttribute("aria-expanded", !0), st(this._menu).toggleClass(wt.SHOW), st(t).toggleClass(wt.SHOW).trigger(st.Event(xt.SHOWN, i))
                        }
                    }
                }
            }, l.prototype.dispose = function t() {
                st.removeData(this._element, ht), st(this._element).off(ct), this._element = null, (this._menu = null) !== this._popper && (this._popper.destroy(), this._popper = null)
            }, l.prototype.update = function e() {
                this._inNavbar = this._detectNavbar(), null !== this._popper && this._popper.scheduleUpdate()
            }, l.prototype._addEventListeners = function i() {
                var e = this;
                st(this._element).on(xt.CLICK, function(t) {
                    t.preventDefault(), t.stopPropagation(), e.toggle()
                })
            }, l.prototype._getConfig = function n(t) {
                return t = Ri({}, this.constructor.Default, st(this._element).data(), t), zi.typeCheckConfig(at, t, this.constructor.DefaultType), t
            }, l.prototype._getMenuElement = function o() {
                if (!this._menu) {
                    var t = l._getParentFromElement(this._element);
                    this._menu = st(t).find(Tt.MENU)[0]
                }
                return this._menu
            }, l.prototype._getPlacement = function s() {
                var t = st(this._element).parent(),
                    e = Ct.BOTTOM;
                return t.hasClass(wt.DROPUP) ? (e = Ct.TOP, st(this._menu).hasClass(wt.MENURIGHT) && (e = Ct.TOPEND)) : t.hasClass(wt.DROPRIGHT) ? e = Ct.RIGHT : t.hasClass(wt.DROPLEFT) ? e = Ct.LEFT : st(this._menu).hasClass(wt.MENURIGHT) && (e = Ct.BOTTOMEND), e
            }, l.prototype._detectNavbar = function a() {
                return 0 < st(this._element).closest(".navbar").length
            }, l.prototype._getPopperConfig = function h() {
                var e = this,
                    t = {};
                return "function" == typeof this._config.offset ? t.fn = function(t) {
                    return t.offsets = Ri({}, t.offsets, e._config.offset(t.offsets) || {}), t
                } : t.offset = this._config.offset, {
                    placement: this._getPlacement(),
                    modifiers: {
                        offset: t,
                        flip: {
                            enabled: this._config.flip
                        },
                        preventOverflow: {
                            boundariesElement: this._config.boundary
                        }
                    }
                }
            }, l._jQueryInterface = function c(i) {
                return this.each(function() {
                    var t = st(this).data(ht),
                        e = "object" === (void 0 === i ? "undefined" : Ni(i)) ? i : null;
                    if (t || (t = new l(this, e), st(this).data(ht, t)), "string" == typeof i) {
                        if ("undefined" == typeof t[i]) throw new TypeError('No method named "' + i + '"');
                        t[i]()
                    }
                })
            }, l._clearMenus = function u(t) {
                if (!t || t.which !== yt && ("keyup" !== t.type || t.which === gt))
                    for (var e = st.makeArray(st(Tt.DATA_TOGGLE)), i = 0; i < e.length; i++) {
                        var n = l._getParentFromElement(e[i]),
                            o = st(e[i]).data(ht),
                            r = {
                                relatedTarget: e[i]
                            };
                        if (o) {
                            var s = o._menu;
                            if (st(n).hasClass(wt.SHOW) && !(t && ("click" === t.type && /input|textarea/i.test(t.target.tagName) || "keyup" === t.type && t.which === gt) && st.contains(n, t.target))) {
                                var a = st.Event(xt.HIDE, r);
                                st(n).trigger(a), a.isDefaultPrevented() || ("ontouchstart" in document.documentElement && st("body").children().off("mouseover", null, st.noop), e[i].setAttribute("aria-expanded", "false"), st(s).removeClass(wt.SHOW), st(n).removeClass(wt.SHOW).trigger(st.Event(xt.HIDDEN, r)))
                            }
                        }
                    }
            }, l._getParentFromElement = function d(t) {
                var e = void 0,
                    i = zi.getSelectorFromElement(t);
                return i && (e = st(i)[0]), e || t.parentNode
            }, l._dataApiKeydownHandler = function p(t) {
                if ((/input|textarea/i.test(t.target.tagName) ? !(t.which === ft || t.which !== pt && (t.which !== vt && t.which !== mt || st(t.target).closest(Tt.MENU).length)) : bt.test(t.which)) && (t.preventDefault(), t.stopPropagation(), !this.disabled && !st(this).hasClass(wt.DISABLED))) {
                    var e = l._getParentFromElement(this),
                        i = st(e).hasClass(wt.SHOW);
                    if ((i || t.which === pt && t.which === ft) && (!i || t.which !== pt && t.which !== ft)) {
                        var n = st(e).find(Tt.VISIBLE_ITEMS).get();
                        if (0 !== n.length) {
                            var o = n.indexOf(t.target);
                            t.which === mt && 0 < o && o--, t.which === vt && o < n.length - 1 && o++, o < 0 && (o = 0), n[o].focus()
                        }
                    } else {
                        if (t.which === pt) {
                            var r = st(e).find(Tt.DATA_TOGGLE)[0];
                            st(r).trigger("focus")
                        }
                        st(this).trigger("click")
                    }
                }
            }, Hi(l, null, [{
                key: "VERSION",
                get: function f() {
                    return lt
                }
            }, {
                key: "Default",
                get: function f() {
                    return St
                }
            }, {
                key: "DefaultType",
                get: function f() {
                    return Et
                }
            }]), l
        }(), st(document).on(xt.KEYDOWN_DATA_API, Tt.DATA_TOGGLE, At._dataApiKeydownHandler).on(xt.KEYDOWN_DATA_API, Tt.MENU, At._dataApiKeydownHandler).on(xt.CLICK_DATA_API + " " + xt.KEYUP_DATA_API, At._clearMenus).on(xt.CLICK_DATA_API, Tt.DATA_TOGGLE, function(t) {
            t.preventDefault(), t.stopPropagation(), At._jQueryInterface.call(st(this), "toggle")
        }).on(xt.CLICK_DATA_API, Tt.FORM_CHILD, function(t) {
            t.stopPropagation()
        }), st.fn[at] = At._jQueryInterface, st.fn[at].Constructor = At, st.fn[at].noConflict = function() {
            return st.fn[at] = dt, At._jQueryInterface
        }, kt = $, _t = "modal", Mt = "4.0.0", Lt = "." + (Ot = "bs.modal"), Dt = ".data-api", It = kt.fn[_t], Pt = 300, Nt = 150, Rt = 27, Ht = {
            backdrop: !0,
            keyboard: !0,
            focus: !0,
            show: !0
        }, zt = {
            backdrop: "(boolean|string)",
            keyboard: "boolean",
            focus: "boolean",
            show: "boolean"
        }, Bt = {
            HIDE: "hide" + Lt,
            HIDDEN: "hidden" + Lt,
            SHOW: "show" + Lt,
            SHOWN: "shown" + Lt,
            FOCUSIN: "focusin" + Lt,
            RESIZE: "resize" + Lt,
            CLICK_DISMISS: "click.dismiss" + Lt,
            KEYDOWN_DISMISS: "keydown.dismiss" + Lt,
            MOUSEUP_DISMISS: "mouseup.dismiss" + Lt,
            MOUSEDOWN_DISMISS: "mousedown.dismiss" + Lt,
            CLICK_DATA_API: "click" + Lt + Dt
        }, Wt = {
            SCROLLBAR_MEASURER: "modal-scrollbar-measure",
            BACKDROP: "modal-backdrop",
            OPEN: "modal-open",
            FADE: "fade",
            SHOW: "show"
        }, jt = {
            DIALOG: ".modal-dialog",
            DATA_TOGGLE: '[data-toggle="modal"]',
            DATA_DISMISS: '[data-dismiss="modal"]',
            FIXED_CONTENT: ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
            STICKY_CONTENT: ".sticky-top",
            NAVBAR_TOGGLER: ".navbar-toggler"
        }, Ft = function() {
            function o(t, e) {
                _(this, o), this._config = this._getConfig(e), this._element = t, this._dialog = kt(t).find(jt.DIALOG)[0], this._backdrop = null, this._isShown = !1, this._isBodyOverflowing = !1, this._ignoreBackdropClick = !1, this._originalBodyPadding = 0, this._scrollbarWidth = 0
            }
            return o.prototype.toggle = function e(t) {
                return this._isShown ? this.hide() : this.show(t)
            }, o.prototype.show = function n(t) {
                var e = this;
                if (!this._isTransitioning && !this._isShown) {
                    zi.supportsTransitionEnd() && kt(this._element).hasClass(Wt.FADE) && (this._isTransitioning = !0);
                    var i = kt.Event(Bt.SHOW, {
                        relatedTarget: t
                    });
                    kt(this._element).trigger(i), this._isShown || i.isDefaultPrevented() || (this._isShown = !0, this._checkScrollbar(), this._setScrollbar(), this._adjustDialog(), kt(document.body).addClass(Wt.OPEN), this._setEscapeEvent(), this._setResizeEvent(), kt(this._element).on(Bt.CLICK_DISMISS, jt.DATA_DISMISS, function(t) {
                        return e.hide(t)
                    }), kt(this._dialog).on(Bt.MOUSEDOWN_DISMISS, function() {
                        kt(e._element).one(Bt.MOUSEUP_DISMISS, function(t) {
                            kt(t.target).is(e._element) && (e._ignoreBackdropClick = !0)
                        })
                    }), this._showBackdrop(function() {
                        return e._showElement(t)
                    }))
                }
            }, o.prototype.hide = function r(t) {
                var e = this;
                if (t && t.preventDefault(), !this._isTransitioning && this._isShown) {
                    var i = kt.Event(Bt.HIDE);
                    if (kt(this._element).trigger(i), this._isShown && !i.isDefaultPrevented()) {
                        this._isShown = !1;
                        var n = zi.supportsTransitionEnd() && kt(this._element).hasClass(Wt.FADE);
                        n && (this._isTransitioning = !0), this._setEscapeEvent(), this._setResizeEvent(), kt(document).off(Bt.FOCUSIN), kt(this._element).removeClass(Wt.SHOW), kt(this._element).off(Bt.CLICK_DISMISS), kt(this._dialog).off(Bt.MOUSEDOWN_DISMISS), n ? kt(this._element).one(zi.TRANSITION_END, function(t) {
                            return e._hideModal(t)
                        }).emulateTransitionEnd(Pt) : this._hideModal()
                    }
                }
            }, o.prototype.dispose = function t() {
                kt.removeData(this._element, Ot), kt(window, document, this._element, this._backdrop).off(Lt), this._config = null, this._element = null, this._dialog = null, this._backdrop = null, this._isShown = null, this._isBodyOverflowing = null, this._ignoreBackdropClick = null, this._scrollbarWidth = null
            }, o.prototype.handleUpdate = function i() {
                this._adjustDialog()
            }, o.prototype._getConfig = function s(t) {
                return t = Ri({}, Ht, t), zi.typeCheckConfig(_t, t, zt), t
            }, o.prototype._showElement = function a(t) {
                var e = this,
                    i = zi.supportsTransitionEnd() && kt(this._element).hasClass(Wt.FADE);
                this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.appendChild(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.scrollTop = 0, i && zi.reflow(this._element), kt(this._element).addClass(Wt.SHOW), this._config.focus && this._enforceFocus();
                var n = kt.Event(Bt.SHOWN, {
                        relatedTarget: t
                    }),
                    o = function o() {
                        e._config.focus && e._element.focus(), e._isTransitioning = !1, kt(e._element).trigger(n)
                    };
                i ? kt(this._dialog).one(zi.TRANSITION_END, o).emulateTransitionEnd(Pt) : o()
            }, o.prototype._enforceFocus = function l() {
                var e = this;
                kt(document).off(Bt.FOCUSIN).on(Bt.FOCUSIN, function(t) {
                    document !== t.target && e._element !== t.target && 0 === kt(e._element).has(t.target).length && e._element.focus()
                })
            }, o.prototype._setEscapeEvent = function h() {
                var e = this;
                this._isShown && this._config.keyboard ? kt(this._element).on(Bt.KEYDOWN_DISMISS, function(t) {
                    t.which === Rt && (t.preventDefault(), e.hide())
                }) : this._isShown || kt(this._element).off(Bt.KEYDOWN_DISMISS)
            }, o.prototype._setResizeEvent = function c() {
                var e = this;
                this._isShown ? kt(window).on(Bt.RESIZE, function(t) {
                    return e.handleUpdate(t)
                }) : kt(window).off(Bt.RESIZE)
            }, o.prototype._hideModal = function u() {
                var t = this;
                this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._isTransitioning = !1, this._showBackdrop(function() {
                    kt(document.body).removeClass(Wt.OPEN), t._resetAdjustments(), t._resetScrollbar(), kt(t._element).trigger(Bt.HIDDEN)
                })
            }, o.prototype._removeBackdrop = function d() {
                this._backdrop && (kt(this._backdrop).remove(), this._backdrop = null)
            }, o.prototype._showBackdrop = function p(t) {
                var e = this,
                    i = kt(this._element).hasClass(Wt.FADE) ? Wt.FADE : "";
                if (this._isShown && this._config.backdrop) {
                    var n = zi.supportsTransitionEnd() && i;
                    if (this._backdrop = document.createElement("div"), this._backdrop.className = Wt.BACKDROP, i && kt(this._backdrop).addClass(i), kt(this._backdrop).appendTo(document.body), kt(this._element).on(Bt.CLICK_DISMISS, function(t) {
                            e._ignoreBackdropClick ? e._ignoreBackdropClick = !1 : t.target === t.currentTarget && ("static" === e._config.backdrop ? e._element.focus() : e.hide())
                        }), n && zi.reflow(this._backdrop), kt(this._backdrop).addClass(Wt.SHOW), !t) return;
                    if (!n) return void t();
                    kt(this._backdrop).one(zi.TRANSITION_END, t).emulateTransitionEnd(Nt)
                } else if (!this._isShown && this._backdrop) {
                    kt(this._backdrop).removeClass(Wt.SHOW);
                    var o = function o() {
                        e._removeBackdrop(), t && t()
                    };
                    zi.supportsTransitionEnd() && kt(this._element).hasClass(Wt.FADE) ? kt(this._backdrop).one(zi.TRANSITION_END, o).emulateTransitionEnd(Nt) : o()
                } else t && t()
            }, o.prototype._adjustDialog = function f() {
                var t = this._element.scrollHeight > document.documentElement.clientHeight;
                !this._isBodyOverflowing && t && (this._element.style.paddingLeft = this._scrollbarWidth + "px"), this._isBodyOverflowing && !t && (this._element.style.paddingRight = this._scrollbarWidth + "px")
            }, o.prototype._resetAdjustments = function g() {
                this._element.style.paddingLeft = "", this._element.style.paddingRight = ""
            }, o.prototype._checkScrollbar = function m() {
                var t = document.body.getBoundingClientRect();
                this._isBodyOverflowing = t.left + t.right < window.innerWidth, this._scrollbarWidth = this._getScrollbarWidth()
            }, o.prototype._setScrollbar = function v() {
                var o = this;
                if (this._isBodyOverflowing) {
                    kt(jt.FIXED_CONTENT).each(function(t, e) {
                        var i = kt(e)[0].style.paddingRight,
                            n = kt(e).css("padding-right");
                        kt(e).data("padding-right", i).css("padding-right", parseFloat(n) + o._scrollbarWidth + "px")
                    }), kt(jt.STICKY_CONTENT).each(function(t, e) {
                        var i = kt(e)[0].style.marginRight,
                            n = kt(e).css("margin-right");
                        kt(e).data("margin-right", i).css("margin-right", parseFloat(n) - o._scrollbarWidth + "px")
                    }), kt(jt.NAVBAR_TOGGLER).each(function(t, e) {
                        var i = kt(e)[0].style.marginRight,
                            n = kt(e).css("margin-right");
                        kt(e).data("margin-right", i).css("margin-right", parseFloat(n) + o._scrollbarWidth + "px")
                    });
                    var t = document.body.style.paddingRight,
                        e = kt("body").css("padding-right");
                    kt("body").data("padding-right", t).css("padding-right", parseFloat(e) + this._scrollbarWidth + "px")
                }
            }, o.prototype._resetScrollbar = function y() {
                kt(jt.FIXED_CONTENT).each(function(t, e) {
                    var i = kt(e).data("padding-right");
                    void 0 !== i && kt(e).css("padding-right", i).removeData("padding-right")
                }), kt(jt.STICKY_CONTENT + ", " + jt.NAVBAR_TOGGLER).each(function(t, e) {
                    var i = kt(e).data("margin-right");
                    void 0 !== i && kt(e).css("margin-right", i).removeData("margin-right")
                });
                var t = kt("body").data("padding-right");
                void 0 !== t && kt("body").css("padding-right", t).removeData("padding-right")
            }, o.prototype._getScrollbarWidth = function b() {
                var t = document.createElement("div");
                t.className = Wt.SCROLLBAR_MEASURER, document.body.appendChild(t);
                var e = t.getBoundingClientRect().width - t.clientWidth;
                return document.body.removeChild(t), e
            }, o._jQueryInterface = function x(i, n) {
                return this.each(function() {
                    var t = kt(this).data(Ot),
                        e = Ri({}, o.Default, kt(this).data(), "object" === (void 0 === i ? "undefined" : Ni(i)) && i);
                    if (t || (t = new o(this, e), kt(this).data(Ot, t)), "string" == typeof i) {
                        if ("undefined" == typeof t[i]) throw new TypeError('No method named "' + i + '"');
                        t[i](n)
                    } else e.show && t.show(n)
                })
            }, Hi(o, null, [{
                key: "VERSION",
                get: function w() {
                    return Mt
                }
            }, {
                key: "Default",
                get: function w() {
                    return Ht
                }
            }]), o
        }(), kt(document).on(Bt.CLICK_DATA_API, jt.DATA_TOGGLE, function(t) {
            var e = this,
                i = void 0,
                n = zi.getSelectorFromElement(this);
            n && (i = kt(n)[0]);
            var o = kt(i).data(Ot) ? "toggle" : Ri({}, kt(i).data(), kt(this).data());
            "A" !== this.tagName && "AREA" !== this.tagName || t.preventDefault();
            var r = kt(i).one(Bt.SHOW, function(t) {
                t.isDefaultPrevented() || r.one(Bt.HIDDEN, function() {
                    kt(e).is(":visible") && e.focus()
                })
            });
            Ft._jQueryInterface.call(kt(i), o, this)
        }), kt.fn[_t] = Ft._jQueryInterface, kt.fn[_t].Constructor = Ft, kt.fn[_t].noConflict = function() {
            return kt.fn[_t] = It, Ft._jQueryInterface
        }, qt = $, Popper, Gt = "tooltip", Ut = "4.0.0", Xt = "." + (Vt = "bs.tooltip"), Yt = qt.fn[Gt], Kt = 150, $t = "bs-tooltip", Qt = new RegExp("(^|\\s)" + $t + "\\S+", "g"), te = {
            animation: !0,
            template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
            trigger: "hover focus",
            title: "",
            delay: 0,
            html: !(Jt = {
                AUTO: "auto",
                TOP: "top",
                RIGHT: "right",
                BOTTOM: "bottom",
                LEFT: "left"
            }),
            selector: !(Zt = {
                animation: "boolean",
                template: "string",
                title: "(string|element|function)",
                trigger: "string",
                delay: "(number|object)",
                html: "boolean",
                selector: "(string|boolean)",
                placement: "(string|function)",
                offset: "(number|string)",
                container: "(string|element|boolean)",
                fallbackPlacement: "(string|array)",
                boundary: "(string|element)"
            }),
            placement: "top",
            offset: 0,
            container: !1,
            fallbackPlacement: "flip",
            boundary: "scrollParent"
        }, ee = {
            SHOW: "show",
            OUT: "out"
        }, ie = {
            HIDE: "hide" + Xt,
            HIDDEN: "hidden" + Xt,
            SHOW: "show" + Xt,
            SHOWN: "shown" + Xt,
            INSERTED: "inserted" + Xt,
            CLICK: "click" + Xt,
            FOCUSIN: "focusin" + Xt,
            FOCUSOUT: "focusout" + Xt,
            MOUSEENTER: "mouseenter" + Xt,
            MOUSELEAVE: "mouseleave" + Xt
        }, ne = {
            FADE: "fade",
            SHOW: "show"
        }, oe = {
            TOOLTIP: ".tooltip",
            TOOLTIP_INNER: ".tooltip-inner",
            ARROW: ".arrow"
        }, re = {
            HOVER: "hover",
            FOCUS: "focus",
            CLICK: "click",
            MANUAL: "manual"
        }, se = function() {
            function u(t, e) {
                if (_(this, u), "undefined" == typeof Popper) throw new TypeError("Bootstrap tooltips require Popper.js (https://popper.js.org)");
                this._isEnabled = !0, this._timeout = 0, this._hoverState = "", this._activeTrigger = {}, this._popper = null, this.element = t, this.config = this._getConfig(e), this.tip = null, this._setListeners()
            }
            return u.prototype.enable = function t() {
                this._isEnabled = !0
            }, u.prototype.disable = function e() {
                this._isEnabled = !1
            }, u.prototype.toggleEnabled = function i() {
                this._isEnabled = !this._isEnabled
            }, u.prototype.toggle = function n(t) {
                if (this._isEnabled)
                    if (t) {
                        var e = this.constructor.DATA_KEY,
                            i = qt(t.currentTarget).data(e);
                        i || (i = new this.constructor(t.currentTarget, this._getDelegateConfig()), qt(t.currentTarget).data(e, i)), i._activeTrigger.click = !i._activeTrigger.click, i._isWithActiveTrigger() ? i._enter(null, i) : i._leave(null, i)
                    } else {
                        if (qt(this.getTipElement()).hasClass(ne.SHOW)) return void this._leave(null, this);
                        this._enter(null, this)
                    }
            }, u.prototype.dispose = function o() {
                clearTimeout(this._timeout), qt.removeData(this.element, this.constructor.DATA_KEY), qt(this.element).off(this.constructor.EVENT_KEY), qt(this.element).closest(".modal").off("hide.bs.modal"), this.tip && qt(this.tip).remove(), this._isEnabled = null, this._timeout = null, this._hoverState = null, (this._activeTrigger = null) !== this._popper && this._popper.destroy(), this._popper = null, this.element = null, this.config = null, this.tip = null
            }, u.prototype.show = function d() {
                var e = this;
                if ("none" === qt(this.element).css("display")) throw new Error("Please use show on visible elements");
                var t = qt.Event(this.constructor.Event.SHOW);
                if (this.isWithContent() && this._isEnabled) {
                    qt(this.element).trigger(t);
                    var i = qt.contains(this.element.ownerDocument.documentElement, this.element);
                    if (t.isDefaultPrevented() || !i) return;
                    var n = this.getTipElement(),
                        o = zi.getUID(this.constructor.NAME);
                    n.setAttribute("id", o), this.element.setAttribute("aria-describedby", o), this.setContent(), this.config.animation && qt(n).addClass(ne.FADE);
                    var r = "function" == typeof this.config.placement ? this.config.placement.call(this, n, this.element) : this.config.placement,
                        s = this._getAttachment(r);
                    this.addAttachmentClass(s);
                    var a = !1 === this.config.container ? document.body : qt(this.config.container);
                    qt(n).data(this.constructor.DATA_KEY, this), qt.contains(this.element.ownerDocument.documentElement, this.tip) || qt(n).appendTo(a), qt(this.element).trigger(this.constructor.Event.INSERTED), this._popper = new Popper(this.element, n, {
                        placement: s,
                        modifiers: {
                            offset: {
                                offset: this.config.offset
                            },
                            flip: {
                                behavior: this.config.fallbackPlacement
                            },
                            arrow: {
                                element: oe.ARROW
                            },
                            preventOverflow: {
                                boundariesElement: this.config.boundary
                            }
                        },
                        onCreate: function h(t) {
                            t.originalPlacement !== t.placement && e._handlePopperPlacementChange(t)
                        },
                        onUpdate: function c(t) {
                            e._handlePopperPlacementChange(t)
                        }
                    }), qt(n).addClass(ne.SHOW), "ontouchstart" in document.documentElement && qt("body").children().on("mouseover", null, qt.noop);
                    var l = function l() {
                        e.config.animation && e._fixTransition();
                        var t = e._hoverState;
                        e._hoverState = null, qt(e.element).trigger(e.constructor.Event.SHOWN), t === ee.OUT && e._leave(null, e)
                    };
                    zi.supportsTransitionEnd() && qt(this.tip).hasClass(ne.FADE) ? qt(this.tip).one(zi.TRANSITION_END, l).emulateTransitionEnd(u._TRANSITION_DURATION) : l()
                }
            }, u.prototype.hide = function r(t) {
                var e = this,
                    i = this.getTipElement(),
                    n = qt.Event(this.constructor.Event.HIDE),
                    o = function o() {
                        e._hoverState !== ee.SHOW && i.parentNode && i.parentNode.removeChild(i), e._cleanTipClass(), e.element.removeAttribute("aria-describedby"), qt(e.element).trigger(e.constructor.Event.HIDDEN), null !== e._popper && e._popper.destroy(), t && t()
                    };
                qt(this.element).trigger(n), n.isDefaultPrevented() || (qt(i).removeClass(ne.SHOW), "ontouchstart" in document.documentElement && qt("body").children().off("mouseover", null, qt.noop), this._activeTrigger[re.CLICK] = !1, this._activeTrigger[re.FOCUS] = !1, this._activeTrigger[re.HOVER] = !1, zi.supportsTransitionEnd() && qt(this.tip).hasClass(ne.FADE) ? qt(i).one(zi.TRANSITION_END, o).emulateTransitionEnd(Kt) : o(), this._hoverState = "")
            }, u.prototype.update = function s() {
                null !== this._popper && this._popper.scheduleUpdate()
            }, u.prototype.isWithContent = function a() {
                return Boolean(this.getTitle())
            }, u.prototype.addAttachmentClass = function l(t) {
                qt(this.getTipElement()).addClass($t + "-" + t)
            }, u.prototype.getTipElement = function h() {
                return this.tip = this.tip || qt(this.config.template)[0], this.tip
            }, u.prototype.setContent = function c() {
                var t = qt(this.getTipElement());
                this.setElementContent(t.find(oe.TOOLTIP_INNER), this.getTitle()), t.removeClass(ne.FADE + " " + ne.SHOW)
            }, u.prototype.setElementContent = function p(t, e) {
                var i = this.config.html;
                "object" === (void 0 === e ? "undefined" : Ni(e)) && (e.nodeType || e.jquery) ? i ? qt(e).parent().is(t) || t.empty().append(e) : t.text(qt(e).text()): t[i ? "html" : "text"](e)
            }, u.prototype.getTitle = function f() {
                var t = this.element.getAttribute("data-original-title");
                return t || (t = "function" == typeof this.config.title ? this.config.title.call(this.element) : this.config.title), t
            }, u.prototype._getAttachment = function g(t) {
                return Jt[t.toUpperCase()]
            }, u.prototype._setListeners = function m() {
                var n = this;
                this.config.trigger.split(" ").forEach(function(t) {
                    if ("click" === t) qt(n.element).on(n.constructor.Event.CLICK, n.config.selector, function(t) {
                        return n.toggle(t)
                    });
                    else if (t !== re.MANUAL) {
                        var e = t === re.HOVER ? n.constructor.Event.MOUSEENTER : n.constructor.Event.FOCUSIN,
                            i = t === re.HOVER ? n.constructor.Event.MOUSELEAVE : n.constructor.Event.FOCUSOUT;
                        qt(n.element).on(e, n.config.selector, function(t) {
                            return n._enter(t)
                        }).on(i, n.config.selector, function(t) {
                            return n._leave(t)
                        })
                    }
                    qt(n.element).closest(".modal").on("hide.bs.modal", function() {
                        return n.hide()
                    })
                }), this.config.selector ? this.config = Ri({}, this.config, {
                    trigger: "manual",
                    selector: ""
                }) : this._fixTitle()
            }, u.prototype._fixTitle = function v() {
                var t = Ni(this.element.getAttribute("data-original-title"));
                (this.element.getAttribute("title") || "string" !== t) && (this.element.setAttribute("data-original-title", this.element.getAttribute("title") || ""), this.element.setAttribute("title", ""))
            }, u.prototype._enter = function y(t, e) {
                var i = this.constructor.DATA_KEY;
                (e = e || qt(t.currentTarget).data(i)) || (e = new this.constructor(t.currentTarget, this._getDelegateConfig()), qt(t.currentTarget).data(i, e)), t && (e._activeTrigger["focusin" === t.type ? re.FOCUS : re.HOVER] = !0), qt(e.getTipElement()).hasClass(ne.SHOW) || e._hoverState === ee.SHOW ? e._hoverState = ee.SHOW : (clearTimeout(e._timeout), e._hoverState = ee.SHOW, e.config.delay && e.config.delay.show ? e._timeout = setTimeout(function() {
                    e._hoverState === ee.SHOW && e.show()
                }, e.config.delay.show) : e.show())
            }, u.prototype._leave = function b(t, e) {
                var i = this.constructor.DATA_KEY;
                (e = e || qt(t.currentTarget).data(i)) || (e = new this.constructor(t.currentTarget, this._getDelegateConfig()), qt(t.currentTarget).data(i, e)), t && (e._activeTrigger["focusout" === t.type ? re.FOCUS : re.HOVER] = !1), e._isWithActiveTrigger() || (clearTimeout(e._timeout), e._hoverState = ee.OUT, e.config.delay && e.config.delay.hide ? e._timeout = setTimeout(function() {
                    e._hoverState === ee.OUT && e.hide()
                }, e.config.delay.hide) : e.hide())
            }, u.prototype._isWithActiveTrigger = function x() {
                for (var t in this._activeTrigger)
                    if (this._activeTrigger[t]) return !0;
                return !1
            }, u.prototype._getConfig = function w(t) {
                return "number" == typeof(t = Ri({}, this.constructor.Default, qt(this.element).data(), t)).delay && (t.delay = {
                    show: t.delay,
                    hide: t.delay
                }), "number" == typeof t.title && (t.title = t.title.toString()), "number" == typeof t.content && (t.content = t.content.toString()), zi.typeCheckConfig(Gt, t, this.constructor.DefaultType), t
            }, u.prototype._getDelegateConfig = function T() {
                var t = {};
                if (this.config)
                    for (var e in this.config) this.constructor.Default[e] !== this.config[e] && (t[e] = this.config[e]);
                return t
            }, u.prototype._cleanTipClass = function C() {
                var t = qt(this.getTipElement()),
                    e = t.attr("class").match(Qt);
                null !== e && 0 < e.length && t.removeClass(e.join(""))
            }, u.prototype._handlePopperPlacementChange = function S(t) {
                this._cleanTipClass(), this.addAttachmentClass(this._getAttachment(t.placement))
            }, u.prototype._fixTransition = function E() {
                var t = this.getTipElement(),
                    e = this.config.animation;
                null === t.getAttribute("x-placement") && (qt(t).removeClass(ne.FADE), this.config.animation = !1, this.hide(), this.show(), this.config.animation = e)
            }, u._jQueryInterface = function A(i) {
                return this.each(function() {
                    var t = qt(this).data(Vt),
                        e = "object" === (void 0 === i ? "undefined" : Ni(i)) && i;
                    if ((t || !/dispose|hide/.test(i)) && (t || (t = new u(this, e), qt(this).data(Vt, t)), "string" == typeof i)) {
                        if ("undefined" == typeof t[i]) throw new TypeError('No method named "' + i + '"');
                        t[i]()
                    }
                })
            }, Hi(u, null, [{
                key: "VERSION",
                get: function k() {
                    return Ut
                }
            }, {
                key: "Default",
                get: function k() {
                    return te
                }
            }, {
                key: "NAME",
                get: function k() {
                    return Gt
                }
            }, {
                key: "DATA_KEY",
                get: function k() {
                    return Vt
                }
            }, {
                key: "Event",
                get: function k() {
                    return ie
                }
            }, {
                key: "EVENT_KEY",
                get: function k() {
                    return Xt
                }
            }, {
                key: "DefaultType",
                get: function k() {
                    return Zt
                }
            }]), u
        }(), qt.fn[Gt] = se._jQueryInterface, qt.fn[Gt].Constructor = se, qt.fn[Gt].noConflict = function() {
            return qt.fn[Gt] = Yt, se._jQueryInterface
        }, se),
        Wi = (ae = $, le = "popover", he = "4.0.0", ue = "." + (ce = "bs.popover"), de = ae.fn[le], pe = "bs-popover", fe = new RegExp("(^|\\s)" + pe + "\\S+", "g"), ge = Ri({}, Bi.Default, {
            placement: "right",
            trigger: "click",
            content: "",
            template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
        }), me = Ri({}, Bi.DefaultType, {
            content: "(string|element|function)"
        }), ve = {
            FADE: "fade",
            SHOW: "show"
        }, ye = {
            TITLE: ".popover-header",
            CONTENT: ".popover-body"
        }, be = {
            HIDE: "hide" + ue,
            HIDDEN: "hidden" + ue,
            SHOW: "show" + ue,
            SHOWN: "shown" + ue,
            INSERTED: "inserted" + ue,
            CLICK: "click" + ue,
            FOCUSIN: "focusin" + ue,
            FOCUSOUT: "focusout" + ue,
            MOUSEENTER: "mouseenter" + ue,
            MOUSELEAVE: "mouseleave" + ue
        }, xe = function(t) {
            function n() {
                return _(this, n), c(this, t.apply(this, arguments))
            }
            return u(n, t), n.prototype.isWithContent = function e() {
                return this.getTitle() || this._getContent()
            }, n.prototype.addAttachmentClass = function i(t) {
                ae(this.getTipElement()).addClass(pe + "-" + t)
            }, n.prototype.getTipElement = function o() {
                return this.tip = this.tip || ae(this.config.template)[0], this.tip
            }, n.prototype.setContent = function r() {
                var t = ae(this.getTipElement());
                this.setElementContent(t.find(ye.TITLE), this.getTitle());
                var e = this._getContent();
                "function" == typeof e && (e = e.call(this.element)), this.setElementContent(t.find(ye.CONTENT), e), t.removeClass(ve.FADE + " " + ve.SHOW)
            }, n.prototype._getContent = function s() {
                return this.element.getAttribute("data-content") || this.config.content
            }, n.prototype._cleanTipClass = function a() {
                var t = ae(this.getTipElement()),
                    e = t.attr("class").match(fe);
                null !== e && 0 < e.length && t.removeClass(e.join(""))
            }, n._jQueryInterface = function l(i) {
                return this.each(function() {
                    var t = ae(this).data(ce),
                        e = "object" === (void 0 === i ? "undefined" : Ni(i)) ? i : null;
                    if ((t || !/destroy|hide/.test(i)) && (t || (t = new n(this, e), ae(this).data(ce, t)), "string" == typeof i)) {
                        if ("undefined" == typeof t[i]) throw new TypeError('No method named "' + i + '"');
                        t[i]()
                    }
                })
            }, Hi(n, null, [{
                key: "VERSION",
                get: function h() {
                    return he
                }
            }, {
                key: "Default",
                get: function h() {
                    return ge
                }
            }, {
                key: "NAME",
                get: function h() {
                    return le
                }
            }, {
                key: "DATA_KEY",
                get: function h() {
                    return ce
                }
            }, {
                key: "Event",
                get: function h() {
                    return be
                }
            }, {
                key: "EVENT_KEY",
                get: function h() {
                    return ue
                }
            }, {
                key: "DefaultType",
                get: function h() {
                    return me
                }
            }]), n
        }(Bi), ae.fn[le] = xe._jQueryInterface, ae.fn[le].Constructor = xe, ae.fn[le].noConflict = function() {
            return ae.fn[le] = de, xe._jQueryInterface
        }, we = $, Te = "scrollspy", Ce = "4.0.0", Ee = "." + (Se = "bs.scrollspy"), Ae = ".data-api", ke = we.fn[Te], _e = {
            offset: 10,
            method: "auto",
            target: ""
        }, Me = {
            offset: "number",
            method: "string",
            target: "(string|element)"
        }, Oe = {
            ACTIVATE: "activate" + Ee,
            SCROLL: "scroll" + Ee,
            LOAD_DATA_API: "load" + Ee + Ae
        }, Le = {
            DROPDOWN_ITEM: "dropdown-item",
            DROPDOWN_MENU: "dropdown-menu",
            ACTIVE: "active"
        }, De = {
            DATA_SPY: '[data-spy="scroll"]',
            ACTIVE: ".active",
            NAV_LIST_GROUP: ".nav, .list-group",
            NAV_LINKS: ".nav-link",
            NAV_ITEMS: ".nav-item",
            LIST_ITEMS: ".list-group-item",
            DROPDOWN: ".dropdown",
            DROPDOWN_ITEMS: ".dropdown-item",
            DROPDOWN_TOGGLE: ".dropdown-toggle"
        }, Ie = {
            OFFSET: "offset",
            POSITION: "position"
        }, Pe = function() {
            function n(t, e) {
                var i = this;
                _(this, n), this._element = t, this._scrollElement = "BODY" === t.tagName ? window : t, this._config = this._getConfig(e), this._selector = this._config.target + " " + De.NAV_LINKS + "," + this._config.target + " " + De.LIST_ITEMS + "," + this._config.target + " " + De.DROPDOWN_ITEMS, this._offsets = [], this._targets = [], this._activeTarget = null, this._scrollHeight = 0, we(this._scrollElement).on(Oe.SCROLL, function(t) {
                    return i._process(t)
                }), this.refresh(), this._process()
            }
            return n.prototype.refresh = function i() {
                var e = this,
                    t = this._scrollElement === this._scrollElement.window ? Ie.OFFSET : Ie.POSITION,
                    o = "auto" === this._config.method ? t : this._config.method,
                    r = o === Ie.POSITION ? this._getScrollTop() : 0;
                this._offsets = [], this._targets = [], this._scrollHeight = this._getScrollHeight(), we.makeArray(we(this._selector)).map(function(t) {
                    var e = void 0,
                        i = zi.getSelectorFromElement(t);
                    if (i && (e = we(i)[0]), e) {
                        var n = e.getBoundingClientRect();
                        if (n.width || n.height) return [we(e)[o]().top + r, i]
                    }
                    return null
                }).filter(function(t) {
                    return t
                }).sort(function(t, e) {
                    return t[0] - e[0]
                }).forEach(function(t) {
                    e._offsets.push(t[0]), e._targets.push(t[1])
                })
            }, n.prototype.dispose = function t() {
                we.removeData(this._element, Se), we(this._scrollElement).off(Ee), this._element = null, this._scrollElement = null, this._config = null, this._selector = null, this._offsets = null, this._targets = null, this._activeTarget = null, this._scrollHeight = null
            }, n.prototype._getConfig = function o(t) {
                if ("string" != typeof(t = Ri({}, _e, t)).target) {
                    var e = we(t.target).attr("id");
                    e || (e = zi.getUID(Te), we(t.target).attr("id", e)), t.target = "#" + e
                }
                return zi.typeCheckConfig(Te, t, Me), t
            }, n.prototype._getScrollTop = function e() {
                return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop
            }, n.prototype._getScrollHeight = function r() {
                return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
            }, n.prototype._getOffsetHeight = function s() {
                return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height
            }, n.prototype._process = function a() {
                var t = this._getScrollTop() + this._config.offset,
                    e = this._getScrollHeight(),
                    i = this._config.offset + e - this._getOffsetHeight();
                if (this._scrollHeight !== e && this.refresh(), i <= t) {
                    var n = this._targets[this._targets.length - 1];
                    this._activeTarget !== n && this._activate(n)
                } else {
                    if (this._activeTarget && t < this._offsets[0] && 0 < this._offsets[0]) return this._activeTarget = null, void this._clear();
                    for (var o = this._offsets.length; o--;) {
                        this._activeTarget !== this._targets[o] && t >= this._offsets[o] && ("undefined" == typeof this._offsets[o + 1] || t < this._offsets[o + 1]) && this._activate(this._targets[o])
                    }
                }
            }, n.prototype._activate = function l(e) {
                this._activeTarget = e, this._clear();
                var t = this._selector.split(",");
                t = t.map(function(t) {
                    return t + '[data-target="' + e + '"],' + t + '[href="' + e + '"]'
                });
                var i = we(t.join(","));
                i.hasClass(Le.DROPDOWN_ITEM) ? (i.closest(De.DROPDOWN).find(De.DROPDOWN_TOGGLE).addClass(Le.ACTIVE), i.addClass(Le.ACTIVE)) : (i.addClass(Le.ACTIVE), i.parents(De.NAV_LIST_GROUP).prev(De.NAV_LINKS + ", " + De.LIST_ITEMS).addClass(Le.ACTIVE), i.parents(De.NAV_LIST_GROUP).prev(De.NAV_ITEMS).children(De.NAV_LINKS).addClass(Le.ACTIVE)), we(this._scrollElement).trigger(Oe.ACTIVATE, {
                    relatedTarget: e
                })
            }, n.prototype._clear = function h() {
                we(this._selector).filter(De.ACTIVE).removeClass(Le.ACTIVE)
            }, n._jQueryInterface = function c(i) {
                return this.each(function() {
                    var t = we(this).data(Se),
                        e = "object" === (void 0 === i ? "undefined" : Ni(i)) && i;
                    if (t || (t = new n(this, e), we(this).data(Se, t)), "string" == typeof i) {
                        if ("undefined" == typeof t[i]) throw new TypeError(
                            'No method named "' + i + '"');
                        t[i]()
                    }
                })
            }, Hi(n, null, [{
                key: "VERSION",
                get: function u() {
                    return Ce
                }
            }, {
                key: "Default",
                get: function u() {
                    return _e
                }
            }]), n
        }(), we(window).on(Oe.LOAD_DATA_API, function() {
            for (var t = we.makeArray(we(De.DATA_SPY)), e = t.length; e--;) {
                var i = we(t[e]);
                Pe._jQueryInterface.call(i, i.data())
            }
        }), we.fn[Te] = Pe._jQueryInterface, we.fn[Te].Constructor = Pe, we.fn[Te].noConflict = function() {
            return we.fn[Te] = ke, Pe._jQueryInterface
        }, Ne = $, Re = "tab", He = "4.0.0", Be = "." + (ze = "bs.tab"), We = ".data-api", je = Ne.fn[Re], Fe = 150, qe = {
            HIDE: "hide" + Be,
            HIDDEN: "hidden" + Be,
            SHOW: "show" + Be,
            SHOWN: "shown" + Be,
            CLICK_DATA_API: "click" + Be + We
        }, Ge = {
            DROPDOWN_MENU: "dropdown-menu",
            ACTIVE: "active",
            DISABLED: "disabled",
            FADE: "fade",
            SHOW: "show"
        }, Ue = {
            DROPDOWN: ".dropdown",
            NAV_LIST_GROUP: ".nav, .list-group",
            ACTIVE: ".active",
            ACTIVE_UL: "> li > .active",
            DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
            DROPDOWN_TOGGLE: ".dropdown-toggle",
            DROPDOWN_ACTIVE_CHILD: "> .dropdown-menu .active"
        }, Ve = function() {
            function n(t) {
                _(this, n), this._element = t
            }
            return n.prototype.show = function h() {
                var i = this;
                if (!(this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && Ne(this._element).hasClass(Ge.ACTIVE) || Ne(this._element).hasClass(Ge.DISABLED))) {
                    var t = void 0,
                        n = void 0,
                        e = Ne(this._element).closest(Ue.NAV_LIST_GROUP)[0],
                        o = zi.getSelectorFromElement(this._element);
                    if (e) {
                        var r = "UL" === e.nodeName ? Ue.ACTIVE_UL : Ue.ACTIVE;
                        n = (n = Ne.makeArray(Ne(e).find(r)))[n.length - 1]
                    }
                    var s = Ne.Event(qe.HIDE, {
                            relatedTarget: this._element
                        }),
                        a = Ne.Event(qe.SHOW, {
                            relatedTarget: n
                        });
                    if (n && Ne(n).trigger(s), Ne(this._element).trigger(a), !a.isDefaultPrevented() && !s.isDefaultPrevented()) {
                        o && (t = Ne(o)[0]), this._activate(this._element, e);
                        var l = function l() {
                            var t = Ne.Event(qe.HIDDEN, {
                                    relatedTarget: i._element
                                }),
                                e = Ne.Event(qe.SHOWN, {
                                    relatedTarget: n
                                });
                            Ne(n).trigger(t), Ne(i._element).trigger(e)
                        };
                        t ? this._activate(t, t.parentNode, l) : l()
                    }
                }
            }, n.prototype.dispose = function t() {
                Ne.removeData(this._element, ze), this._element = null
            }, n.prototype._activate = function a(t, e, i) {
                var n = this,
                    o = ("UL" === e.nodeName ? Ne(e).find(Ue.ACTIVE_UL) : Ne(e).children(Ue.ACTIVE))[0],
                    r = i && zi.supportsTransitionEnd() && o && Ne(o).hasClass(Ge.FADE),
                    s = function s() {
                        return n._transitionComplete(t, o, i)
                    };
                o && r ? Ne(o).one(zi.TRANSITION_END, s).emulateTransitionEnd(Fe) : s()
            }, n.prototype._transitionComplete = function r(t, e, i) {
                if (e) {
                    Ne(e).removeClass(Ge.SHOW + " " + Ge.ACTIVE);
                    var n = Ne(e.parentNode).find(Ue.DROPDOWN_ACTIVE_CHILD)[0];
                    n && Ne(n).removeClass(Ge.ACTIVE), "tab" === e.getAttribute("role") && e.setAttribute("aria-selected", !1)
                }
                if (Ne(t).addClass(Ge.ACTIVE), "tab" === t.getAttribute("role") && t.setAttribute("aria-selected", !0), zi.reflow(t), Ne(t).addClass(Ge.SHOW), t.parentNode && Ne(t.parentNode).hasClass(Ge.DROPDOWN_MENU)) {
                    var o = Ne(t).closest(Ue.DROPDOWN)[0];
                    o && Ne(o).find(Ue.DROPDOWN_TOGGLE).addClass(Ge.ACTIVE), t.setAttribute("aria-expanded", !0)
                }
                i && i()
            }, n._jQueryInterface = function e(i) {
                return this.each(function() {
                    var t = Ne(this),
                        e = t.data(ze);
                    if (e || (e = new n(this), t.data(ze, e)), "string" == typeof i) {
                        if ("undefined" == typeof e[i]) throw new TypeError('No method named "' + i + '"');
                        e[i]()
                    }
                })
            }, Hi(n, null, [{
                key: "VERSION",
                get: function i() {
                    return He
                }
            }]), n
        }(), Ne(document).on(qe.CLICK_DATA_API, Ue.DATA_TOGGLE, function(t) {
            t.preventDefault(), Ve._jQueryInterface.call(Ne(this), "show")
        }), Ne.fn[Re] = Ve._jQueryInterface, Ne.fn[Re].Constructor = Ve, Ne.fn[Re].noConflict = function() {
            return Ne.fn[Re] = je, Ve._jQueryInterface
        }, function(l) {
            function i(n) {
                return this.each(function() {
                    var t = l(this),
                        e = t.data("bs.affix"),
                        i = "object" == (void 0 === n ? "undefined" : Ni(n)) && n;
                    e || t.data("bs.affix", e = new h(this, i)), "string" == typeof n && e[n]()
                })
            }
            var h = function h(t, e) {
                this.options = l.extend({}, h.DEFAULTS, e), this.$target = l(this.options.target).on("scroll.bs.affix.data-api", l.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", l.proxy(this.checkPositionWithEventLoop, this)), this.$element = l(t), this.affixed = null, this.unpin = null, this.pinnedOffset = null, this.checkPosition()
            };
            h.VERSION = "3.3.6", h.RESET = "affix affix-top affix-bottom", h.DEFAULTS = {
                offset: 0,
                target: window
            }, h.prototype.getState = function(t, e, i, n) {
                var o = this.$target.scrollTop(),
                    r = this.$element.offset(),
                    s = this.$target.height();
                if (null != i && "top" == this.affixed) return o < i && "top";
                if ("bottom" == this.affixed) return null != i ? !(o + this.unpin <= r.top) && "bottom" : !(o + s <= t - n) && "bottom";
                var a = null == this.affixed,
                    l = a ? o : r.top;
                return null != i && o <= i ? "top" : null != n && t - n <= l + (a ? s : e) && "bottom"
            }, h.prototype.getPinnedOffset = function() {
                if (this.pinnedOffset) return this.pinnedOffset;
                this.$element.removeClass(h.RESET).addClass("affix");
                var t = this.$target.scrollTop(),
                    e = this.$element.offset();
                return this.pinnedOffset = e.top - t
            }, h.prototype.checkPositionWithEventLoop = function() {
                setTimeout(l.proxy(this.checkPosition, this), 1)
            }, h.prototype.checkPosition = function() {
                if (this.$element.is(":visible")) {
                    var t = this.$element.height(),
                        e = this.options.offset,
                        i = e.top,
                        n = e.bottom,
                        o = Math.max(l(document).height(), l(document.body).height());
                    "object" != (void 0 === e ? "undefined" : Ni(e)) && (n = i = e), "function" == typeof i && (i = e.top(this.$element)), "function" == typeof n && (n = e.bottom(this.$element));
                    var r = this.getState(o, t, i, n);
                    if (this.affixed != r) {
                        null != this.unpin && this.$element.css("top", "");
                        var s = "affix" + (r ? "-" + r : ""),
                            a = l.Event(s + ".bs.affix");
                        if (this.$element.trigger(a), a.isDefaultPrevented()) return;
                        this.affixed = r, this.unpin = "bottom" == r ? this.getPinnedOffset() : null, this.$element.removeClass(h.RESET).addClass(s).trigger(s.replace("affix", "affixed") + ".bs.affix")
                    }
                    "bottom" == r && this.$element.offset({
                        top: o - t - n
                    })
                }
            };
            var t = l.fn.affix;
            l.fn.affix = i, l.fn.affix.Constructor = h, l.fn.affix.noConflict = function() {
                return l.fn.affix = t, this
            }, l(window).on("load", function() {
                l('[data-spy="affix"]').each(function() {
                    var t = l(this),
                        e = t.data();
                    e.offset = e.offset || {}, null != e.offsetBottom && (e.offset.bottom = e.offsetBottom), null != e.offsetTop && (e.offset.top = e.offsetTop), i.call(t, e)
                })
            })
        }(jQuery), Xe = jQuery, Ye = "enter", $e = "v4.0.0", Qe = '[data-transition="entrance"]', Ze = "." + (Ke = "bs.enter"), Je = Xe.fn[Ye], ti = {
            SCROLL: "scroll" + Ze,
            ENTER: "enter" + Ze
        }, ei = {
            easing: "cubic-bezier(.2,.7,.5,1)",
            duration: 1200,
            delay: 0
        }, ii = function() {
            function o(t, e) {
                _(this, o), zi.supportsTransitionEnd() && (this._element = t, this._config = e, this._handler = null, this._listener = null, this._addEventListeners())
            }
            return o.prototype.dispose = function t() {
                Xe(this._element).off(Ze), Xe.removeData(this._element, Ke), this._element = null, this._config = null, this._handler = null, this._listener = null
            }, o.prototype._addEventListeners = function e() {
                var t = Xe.proxy(this._checkForEnter, this);
                this._handler = function() {
                    window.requestAnimationFrame(t)
                }, this._listener = Xe(window).on(ti.SCROLL, this._handler), this._checkForEnter()
            }, o.prototype._removeEventListeners = function i() {
                Xe(window).off(ti.SCROLL, this._handler)
            }, o.prototype._checkForEnter = function n() {
                0 <= window.innerHeight - this._element.getBoundingClientRect().top && setTimeout(Xe.proxy(this._triggerEntrance, this), this._config.delay)
            }, o.prototype._triggerEntrance = function r() {
                this._removeEventListeners(), Xe(this._element).css({
                    "-webkit-transition": "-webkit-transform " + this._config.duration + "ms " + this._config.easing,
                    "-ms-transition": "-ms-transform " + this._config.duration + "ms " + this._config.easing,
                    transition: "transform " + this._config.duration + "ms " + this._config.easing
                }).css({
                    "-webkit-transform": "none",
                    "-ms-transform": "none",
                    transform: "none"
                }).trigger(ti.ENTER)
            }, o._jQueryInterface = function s(n) {
                return this.each(function() {
                    var t = Xe(this),
                        e = t.data(Ke),
                        i = Xe.extend({}, ei, t.data(), "object" == (void 0 === n ? "undefined" : Ni(n)) && n);
                    e || t.data(Ke, e = new o(this, i)), "string" == typeof n && e[n]()
                })
            }, Hi(o, null, [{
                key: "VERSION",
                get: function a() {
                    return $e
                }
            }, {
                key: "Default",
                get: function a() {
                    return ei
                }
            }]), o
        }(), Xe.fn[Ye] = ii._jQueryInterface, Xe.fn[Ye].Constructor = ii, Xe.fn[Ye].noConflict = function() {
            return Xe.fn[Ye] = Je, ii._jQueryInterface
        }, Xe(function() {
            Xe(Qe).enter()
        }), ii);
    ni = jQuery, oi = "imageGrid", si = '[data-grid="images"]', ai = "." + (ri = "bs.image-grid"), li = ni.fn[oi], hi = {
        padding: 10,
        targetHeight: 300,
        display: "inline-block"
    }, ci = {
        RESIZE: "resize" + ai
    }, ui = function() {
        function n(t, e) {
            _(this, n), this._cleanWhitespace(t), this._row = 0, this._rownum = 1, this._elements = [], this._element = t, this._albumWidth = ni(t).width(), this._images = ni(t).children(), this._config = ni.extend({}, hi, e), ni(window).on(ci.RESIZE, ni.proxy(this._handleResize, this)), this._processImages()
        }
        return n.prototype.dispose = function t() {
            ni(window).off(ai), ni.removeData(this._element, ri), this._row = null, this._rownum = null, this._elements = null, this._element = null, this._albumWidth = null, this._images = null, this._config = null
        }, n.prototype._handleResize = function e() {
            this._row = 0, this._rownum = 1, this._elements = [], this._albumWidth = ni(this._element).width(), this._images = ni(this._element).children(), this._processImages()
        }, n.prototype._processImages = function i() {
            var a = this;
            this._images.each(function(t) {
                var e = ni(this),
                    i = e.is("img") ? e : e.find("img"),
                    n = void 0 !== i.data("width") ? i.data("width") : i.width(),
                    o = void 0 !== i.data("height") ? i.data("height") : i.height();
                i.data("width", n), i.data("height", o);
                var r = Math.ceil(n / o * a._config.targetHeight),
                    s = Math.ceil(a._config.targetHeight);
                a._elements.push([this, r, s]), a._row += r + a._config.padding, a._row > a._albumWidth && a._elements.length && (a._resizeRow(a._row - a._config.padding), a._row = 0, a._elements = [], a._rownum += 1), a._images.length - 1 == t && a._elements.length && (a._resizeRow(a._row), a._row = 0, a._elements = [], a._rownum += 1)
            })
        }, n.prototype._resizeRow = function c(t) {
            for (var e = this._config.padding * (this._elements.length - 1), i = (this._albumWidth - e) / (t - e), n = e, o = (this._albumWidth, 0); o < this._elements.length; o++) {
                var r = ni(this._elements[o][0]),
                    s = Math.floor(this._elements[o][1] * i),
                    a = Math.floor(this._elements[o][2] * i),
                    l = o < this._elements.length - 1;
                n += s, !l && n < this._albumWidth && (s += this._albumWidth - n), s--;
                var h = r.is("img") ? r : r.find("img");
                h.width(s), h.height(a), this._applyModifications(r, l)
            }
        }, n.prototype._applyModifications = function o(t, e) {
            var i = {
                "margin-bottom": this._config.padding + "px",
                "margin-right": e ? this._config.padding + "px" : 0,
                display: this._config.display,
                "vertical-align": "bottom"
            };
            t.css(i)
        }, n.prototype._cleanWhitespace = function r(t) {
            ni(t).contents().filter(function() {
                return 3 == this.nodeType && !/\S/.test(this.nodeValue)
            }).remove()
        }, n._jQueryInterface = function s() {
            return this.each(function() {
                var t = ni(this),
                    e = t.data(ri),
                    i = ni.extend({}, hi, t.data(), "object" === (void 0 === i ? "undefined" : Ni(i)) && i);
                e || t.data(ri, e = new n(this, i)), "string" == typeof i && e[i].call(t)
            })
        }, n
    }(), ni.fn[oi] = ui._jQueryInterface, ni.fn[oi].Constructor = ui, ni.fn[oi].noConflict = function() {
        return ni.fn[oi] = li, Wi._jQueryInterface
    }, ni(function() {
        ni(si).imageGrid()
    }), di = jQuery, pi = "zoom", fi = "v4.0.0", gi = '[data-action="zoom"]', mi = "." + "bs.zoom", di.fn[pi], vi = 80, yi = {
        CLICK: "click" + mi,
        SCROLL: "scroll" + mi,
        KEYUP: "keyup" + mi,
        TOUCHSTART: "touchstart" + mi,
        TOUCHMOVE: "touchmove" + mi
    }, bi = {
        ZOOM_OVERLAY_OPEN: "zoom-overlay-open",
        ZOOM_OVERLAY_TRANSITIONING: "zoom-overlay-transitioning",
        ZOOM_OVERLAY: "zoom-overlay",
        ZOOM_IMG_WRAP: "zoom-img-wrap",
        ZOOM_IMG: "zoom-img"
    }, xi = {
        ZOOM: "zoom",
        ZOOM_OUT: "zoom-out"
    }, wi = function() {
        function t() {
            _(this, t), this._activeZoom = null, this._initialScrollPosition = null, this._initialTouchPosition = null, this._touchMoveListener = null, this._$document = di(document), this._$window = di(window), this._$body = di(document.body), this._boundClick = di.proxy(this._clickHandler, this)
        }
        return t.prototype._zoom = function i(t) {
            var e = t.target;
            if (e && "IMG" === e.tagName && !this._$body.hasClass(bi.ZOOM_OVERLAY_OPEN)) return t.metaKey || t.ctrlKey ? window.open(t.target.getAttribute("data-original") || t.target.src, "_blank") : void(e.width >= di(window).width() - vi || (this._activeZoomClose(!0), this._activeZoom = new Ti(e), this._activeZoom.zoomImage(), this._$window.on(yi.SCROLL, di.proxy(this._scrollHandler, this)), this._$document.on(yi.KEYUP, di.proxy(this._keyHandler, this)), this._$document.on(yi.TOUCHSTART, di.proxy(this._touchStart, this)), document.addEventListener ? document.addEventListener("click", this._boundClick, !0) : document.attachEvent("onclick", this._boundClick, !0), "bubbles" in t ? t.bubbles && t.stopPropagation() : t.cancelBubble = !0))
        }, t.prototype._activeZoomClose = function e(t) {
            this._activeZoom && (t ? this._activeZoom.dispose() : this._activeZoom.close(), this._$window.off(mi), this._$document.off(mi), document.removeEventListener("click", this._boundClick, !0), this._activeZoom = null)
        }, t.prototype._scrollHandler = function n() {
            null === this._initialScrollPosition && (this._initialScrollPosition = di(window).scrollTop());
            var t = this._initialScrollPosition - di(window).scrollTop();
            40 <= Math.abs(t) && this._activeZoomClose()
        }, t.prototype._keyHandler = function o(t) {
            27 === t.keyCode && this._activeZoomClose()
        }, t.prototype._clickHandler = function r(t) {
            t.preventDefault ? t.preventDefault() : event.returnValue = !1, "bubbles" in t ? t.bubbles && t.stopPropagation() : t.cancelBubble = !0, this._activeZoomClose()
        }, t.prototype._touchStart = function s(t) {
            this._initialTouchPosition = t.touches[0].pageY, di(t.target).on(yi.TOUCHMOVE, di.proxy(this._touchMove, this))
        }, t.prototype._touchMove = function a(t) {
            10 < Math.abs(t.touches[0].pageY - this._initialTouchPosition) && (this._activeZoomClose(), di(t.target).off(yi.TOUCHMOVE))
        }, t.prototype.listen = function l() {
            this._$body.on(yi.CLICK, gi, di.proxy(this._zoom, this))
        }, Hi(t, null, [{
            key: "VERSION",
            get: function h() {
                return fi
            }
        }, {
            key: "Default",
            get: function h() {
                return Default
            }
        }]), t
    }(), Ti = function() {
        function e(t) {
            _(this, e), this._fullHeight = null, this._fullWidth = null, this._overlay = null, this._targetImageWrap = null, this._targetImage = t, this._$body = di(document.body)
        }
        return e.prototype.zoomImage = function i() {
            var t = document.createElement("img");
            t.onload = di.proxy(function() {
                this._fullHeight = Number(t.height), this._fullWidth = Number(t.width), this._zoomOriginal()
            }, this), t.src = this._targetImage.src
        }, e.prototype._zoomOriginal = function t() {
            this._targetImageWrap = document.createElement("div"), this._targetImageWrap.className = bi.ZOOM_IMG_WRAP, this._targetImage.parentNode.insertBefore(this._targetImageWrap, this._targetImage), this._targetImageWrap.appendChild(this._targetImage), di(this._targetImage).addClass(bi.ZOOM_IMG).attr("data-action", xi.ZOOM_OUT), this._overlay = document.createElement("div"), this._overlay.className = bi.ZOOM_OVERLAY, document.body.appendChild(this._overlay), this._calculateZoom(), this._triggerAnimation()
        }, e.prototype._calculateZoom = function a() {
            this._targetImage.offsetWidth;
            var t = this._fullWidth,
                e = this._fullHeight,
                i = (di(window).scrollTop(), t / this._targetImage.width),
                n = di(window).height() - vi,
                o = di(window).width() - vi,
                r = t / e,
                s = o / n;
            this._imgScaleFactor = t < o && e < n ? i : r < s ? n / e * i : o / t * i
        }, e.prototype._triggerAnimation = function l() {
            this._targetImage.offsetWidth;
            var t = di(this._targetImage).offset(),
                e = di(window).scrollTop() + di(window).height() / 2,
                i = di(window).width() / 2,
                n = t.top + this._targetImage.height / 2,
                o = t.left + this._targetImage.width / 2;
            this._translateY = e - n, this._translateX = i - o;
            var r = "scale(" + this._imgScaleFactor + ")",
                s = "translate(" + this._translateX + "px, " + this._translateY + "px)";
            zi.supportsTransitionEnd() || (s += " translateZ(0)"), di(this._targetImage).css({
                "-webkit-transform": r,
                "-ms-transform": r,
                transform: r
            }), di(this._targetImageWrap).css({
                "-webkit-transform": s,
                "-ms-transform": s,
                transform: s
            }), this._$body.addClass(bi.ZOOM_OVERLAY_OPEN)
        }, e.prototype.close = function n() {
            if (this._$body.removeClass(bi.ZOOM_OVERLAY_OPEN).addClass(bi.ZOOM_OVERLAY_TRANSITIONING), di(this._targetImage).css({
                    "-webkit-transform": "",
                    "-ms-transform": "",
                    transform: ""
                }), di(this._targetImageWrap).css({
                    "-webkit-transform": "",
                    "-ms-transform": "",
                    transform: ""
                }), !zi.supportsTransitionEnd()) return this.dispose();
            di(this._targetImage).one(zi.TRANSITION_END, di.proxy(this.dispose, this)).emulateTransitionEnd(300)
        }, e.prototype.dispose = function o() {
            this._targetImageWrap && this._targetImageWrap.parentNode && (di(this._targetImage).removeClass(bi.ZOOM_IMG).attr("data-action", xi.ZOOM), this._targetImageWrap.parentNode.replaceChild(this._targetImage, this._targetImageWrap), this._overlay.parentNode.removeChild(this._overlay), this._$body.removeClass(bi.ZOOM_OVERLAY_TRANSITIONING))
        }, e
    }(), di(function() {
        (new wi).listen()
    }), Ci = jQuery, Si = "stage", Ai = "v4.0.0", ki = '[data-toggle="stage"]', _i = "." + (Ei = "bs.stage"), Mi = ".data-api", Oi = Ci.fn[Si], Li = {
        easing: "cubic-bezier(.2,.7,.5,1)",
        duration: 300,
        delay: 0,
        distance: 250,
        hiddenElements: "#sidebar"
    }, Di = {
        TOUCHMOVE: "touchmove" + _i,
        KEYDOWN: "keydown" + _i,
        OPEN: "open" + _i,
        OPENED: "opened" + _i,
        CLOSE: "close" + _i,
        CLOSED: "closed" + _i,
        CLICK: "click" + _i,
        CLICK_DATA_API: "click" + _i + Mi
    }, Ii = {
        STAGE_OPEN: "stage-open",
        HIDDEN: "hidden"
    }, Pi = function() {
        function o(t, e) {
            _(this, o), zi.supportsTransitionEnd() && (this._element = t, this._config = e)
        }
        return o.prototype._isOpen = function t() {
            return Ci(this._element).hasClass(Ii.STAGE_OPEN)
        }, o.prototype._complete = function e() {
            Ci(document.body).css("overflow", "auto"), "ontouchstart" in document.documentElement && Ci(document).off(Di.TOUCHMOVE), Ci(this._config.hiddenElements).addClass(Ii.HIDDEN), Ci(this._element).removeClass(Ii.STAGE_OPEN).css({
                "-webkit-transition": "",
                "-ms-transition": "",
                transition: ""
            }).css({
                "-webkit-transform": "",
                "-ms-transform": "",
                transform: ""
            }).trigger(Di.CLOSED)
        }, o.prototype.toggle = function i() {
            this._isOpen() ? this.close() : this.open()
        }, o.prototype.open = function n() {
            var t = this;
            Ci(document.body).css("overflow", "hidden"), "ontouchstart" in document.documentElement && Ci(document).on(Di.TOUCHMOVE, function(t) {
                t.preventDefault()
            }), Ci(this._config.hiddenElements).removeClass(Ii.HIDDEN), Ci(window).one(Di.KEYDOWN, Ci.proxy(function(t) {
                27 == t.which && this.close()
            }, this)), Ci(this._element).on(Di.CLICK, Ci.proxy(this.close, this)).trigger(Di.OPEN).addClass(Ii.STAGE_OPEN), zi.supportsTransitionEnd() ? (Ci(this._element).css({
                "-webkit-transition": "-webkit-transform " + this._config.duration + "ms " + this._config.easing,
                "-ms-transition": "-ms-transform " + this._config.duration + "ms " + this._config.easing,
                transition: "transform " + this._config.duration + "ms " + this._config.easing
            }), this._element.offsetWidth, Ci(this._element).css({
                "-webkit-transform": "translateX(" + this._config.distance + "px)",
                "-ms-transform": "translateX(" + this._config.distance + "px)",
                transform: "translateX(" + this._config.distance + "px)"
            }).one(zi.TRANSITION_END, function() {
                Ci(t._element).trigger(Di.OPENED)
            }).emulateTransitionEnd(this._config.duration)) : Ci(this._element).css({
                left: this._config.distance + "px",
                position: "relative"
            }).trigger(Di.OPENED)
        }, o.prototype.close = function r() {
            if (Ci(window).off(Di.KEYDOWN), !zi.supportsTransitionEnd()) return Ci(this._element).trigger(Di.CLOSE).css({
                left: "",
                position: ""
            }).off(Di.CLICK), this._complete();
            Ci(this._element).trigger(Di.CLOSE).off(Di.CLICK).css({
                "-webkit-transform": "none",
                "-ms-transform": "none",
                transform: "none"
            }).one(zi.TRANSITION_END, Ci.proxy(this._complete, this)).emulateTransitionEnd(this._config.duration)
        }, o._jQueryInterface = function s(n) {
            return this.each(function() {
                var t = Ci(this),
                    e = t.data(Ei),
                    i = Ci.extend({}, Li, t.data(), "object" === (void 0 === n ? "undefined" : Ni(n)) && n);
                e || t.data(Ei, e = new o(this, i)), "string" == typeof n && e[n]()
            })
        }, Hi(o, null, [{
            key: "VERSION",
            get: function a() {
                return Ai
            }
        }, {
            key: "Default",
            get: function a() {
                return Li
            }
        }]), o
    }(), Ci.fn[Si] = Pi._jQueryInterface, Ci.fn[Si].Constructor = Pi, Ci.fn[Si].noConflict = function() {
        return Ci.fn[Si] = Oi, Pi._jQueryInterface
    }, Ci(document).on(Di.CLICK_DATA_API, ki, function() {
        var t = Ci(this).data(),
            e = Ci(this.getAttribute("data-target"));
        e.data(Ei) || e.stage(t), e.stage("toggle")
    })
}(), $(function() {
        function t() {
            $(window).scrollTop() > $(window).height() ? $(".docs-top").fadeIn() : $(".docs-top").fadeOut()
        }

        function e() {
            768 < r.width() ? n() : i()
        }

        function i() {
            r.off("resize.theme.nav"), r.off("scroll.theme.nav"), o.css({
                position: "",
                left: "",
                top: ""
            })
        }

        function n() {
            function t() {
                i.containerTop = $(".docs-content").offset().top, i.containerRight = $(".docs-content").offset().left + $(".docs-content").width() + 40, e()
            }

            function e() {
                var t = r.scrollTop();
                if (!Math.max(t - i.containerTop, 0)) return $(o.find("li a")[1]).addClass("active"), o.css({
                    position: "",
                    left: "",
                    top: ""
                });
                o.css({
                    position: "fixed",
                    left: i.containerRight,
                    top: 0
                })
            }
            var i = {};
            t(), $(window).on("resize.theme.nav", t).on("scroll.theme.nav", e), $("body").scrollspy({
                target: "#markdown-toc",
                children: "li > a"
            }), setTimeout(function() {
                $("body").scrollspy("refresh")
            }, 1e3)
        }
        $(".docs-top").length && (t(), $(window).on("scroll", t));
        var o = $("#markdown-toc"),
            r = $(window);
        o[0] && ($("#markdown-toc li").addClass("nav-item"), $("#markdown-toc li > a").addClass("nav-link"), e(), r.on("resize", e))
    }),
    function(t, e) {
        "function" == typeof define && define.amd ? define(e) : "object" == typeof exports ? module.exports = e(require, exports, module) : t.Tether = e()
    }(this, function() {
        "use strict";

        function n(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function s(t) {
            var e = t.getBoundingClientRect(),
                i = {};
            for (var n in e) i[n] = e[n];
            if (t.ownerDocument !== document) {
                var o = t.ownerDocument.defaultView.frameElement;
                if (o) {
                    var r = s(o);
                    i.top += r.top, i.bottom += r.top, i.left += r.left, i.right += r.left
                }
            }
            return i
        }

        function h(t) {
            var e = (getComputedStyle(t) || {}).position,
                i = [];
            if ("fixed" === e) return [t];
            for (var n = t;
                (n = n.parentNode) && n && 1 === n.nodeType;) {
                var o = void 0;
                try {
                    o = getComputedStyle(n)
                } catch (c) {}
                if (null == o) return i.push(n), i;
                var r = o,
                    s = r.overflow,
                    a = r.overflowX,
                    l = r.overflowY;
                /(auto|scroll)/.test(s + l + a) && ("absolute" !== e || 0 <= ["relative", "absolute", "fixed"].indexOf(o.position)) && i.push(n)
            }
            return i.push(t.ownerDocument.body), t.ownerDocument !== document && i.push(t.ownerDocument.defaultView), i
        }

        function c() {
            p && document.body.removeChild(p), p = null
        }

        function S(t) {
            var e = void 0;
            t === document ? (e = document, t = document.documentElement) : e = t.ownerDocument;
            var i = e.documentElement,
                n = s(t),
                o = v();
            return n.top -= o.top, n.left -= o.left, "undefined" == typeof n.width && (n.width = document.body.scrollWidth - n.left - n.right), "undefined" == typeof n.height && (n.height = document.body.scrollHeight - n.top - n.bottom), n.top = n.top - i.clientTop, n.left = n.left - i.clientLeft, n.right = e.body.clientWidth - n.width - n.left, n.bottom = e.body.clientHeight - n.height - n.top, n
        }

        function T(t) {
            return t.offsetParent || document.documentElement
        }

        function C() {
            var t = document.createElement("div");
            t.style.width = "100%", t.style.height = "200px";
            var e = document.createElement("div");
            E(e.style, {
                position: "absolute",
                top: 0,
                left: 0,
                pointerEvents: "none",
                visibility: "hidden",
                width: "200px",
                height: "150px",
                overflow: "hidden"
            }), e.appendChild(t), document.body.appendChild(e);
            var i = t.offsetWidth;
            e.style.overflow = "scroll";
            var n = t.offsetWidth;
            i === n && (n = e.clientWidth), document.body.removeChild(e);
            var o = i - n;
            return {
                width: o,
                height: o
            }
        }

        function E(t) {
            var i = arguments.length <= 0 || void 0 === t ? {} : arguments[0],
                e = [];
            return Array.prototype.push.apply(e, arguments), e.slice(1).forEach(function(t) {
                if (t)
                    for (var e in t)({}).hasOwnProperty.call(t, e) && (i[e] = t[e])
            }), i
        }

        function o(e, t) {
            if ("undefined" != typeof e.classList) t.split(" ").forEach(function(t) {
                t.trim() && e.classList.remove(t)
            });
            else {
                var i = new RegExp("(^| )" + t.split(" ").join("|") + "( |$)", "gi"),
                    n = a(e).replace(i, " ");
                l(e, n)
            }
        }

        function u(e, t) {
            if ("undefined" != typeof e.classList) t.split(" ").forEach(function(t) {
                t.trim() && e.classList.add(t)
            });
            else {
                o(e, t);
                var i = a(e) + " " + t;
                l(e, i)
            }
        }

        function r(t, e) {
            if ("undefined" != typeof t.classList) return t.classList.contains(e);
            var i = a(t);
            return new RegExp("(^| )" + e + "( |$)", "gi").test(i)
        }

        function a(t) {
            return t.className instanceof t.ownerDocument.defaultView.SVGAnimatedString ? t.className.baseVal : t.className
        }

        function l(t, e) {
            t.setAttribute("class", e)
        }

        function A(e, i, t) {
            t.forEach(function(t) {
                -1 === i.indexOf(t) && r(e, t) && o(e, t)
            }), i.forEach(function(t) {
                r(e, t) || u(e, t)
            })
        }

        function n(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function t(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }

        function m(t, e, i) {
            var n = arguments.length <= 2 || void 0 === i ? 1 : arguments[2];
            return e <= t + n && t - n <= e
        }

        function e() {
            return "undefined" != typeof performance && "undefined" != typeof performance.now ? performance.now() : +new Date
        }

        function k() {
            for (var n = {
                    top: 0,
                    left: 0
                }, t = arguments.length, e = Array(t), i = 0; i < t; i++) e[i] = arguments[i];
            return e.forEach(function(t) {
                var e = t.top,
                    i = t.left;
                "string" == typeof e && (e = parseFloat(e, 10)), "string" == typeof i && (i = parseFloat(i, 10)), n.top += e, n.left += i
            }), n
        }

        function _(t, e) {
            return "string" == typeof t.left && -1 !== t.left.indexOf("%") && (t.left = parseFloat(t.left, 10) / 100 * e.width), "string" == typeof t.top && -1 !== t.top.indexOf("%") && (t.top = parseFloat(t.top, 10) / 100 * e.height), t
        }

        function M(t, r) {
            return "scrollParent" === r ? r = t.scrollParents[0] : "window" === r && (r = [pageXOffset, pageYOffset, innerWidth + pageXOffset, innerHeight + pageYOffset]), r === document && (r = r.documentElement), "undefined" != typeof r.nodeType && function() {
                var t = r,
                    e = S(r),
                    i = e,
                    n = getComputedStyle(r);
                if (r = [i.left, i.top, e.width + i.left, e.height + i.top], t.ownerDocument !== document) {
                    var o = t.ownerDocument.defaultView;
                    r[0] += o.pageXOffset, r[1] += o.pageYOffset, r[2] += o.pageXOffset, r[3] += o.pageYOffset
                }
                K.forEach(function(t, e) {
                    "Top" === (t = t[0].toUpperCase() + t.substr(1)) || "Left" === t ? r[e] += parseFloat(n["border" + t + "Width"]) : r[e] -= parseFloat(n["border" + t + "Width"])
                })
            }(), r
        }
        var d = function() {
                function n(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var n = e[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                    }
                }
                return function(t, e, i) {
                    return e && n(t.prototype, e), i && n(t, i), t
                }
            }(),
            O = void 0;
        void 0 === O && (O = {
            modules: []
        });
        var i, p = null,
            f = (i = 0, function() {
                return ++i
            }),
            g = {},
            v = function() {
                var t = p;
                t || ((t = document.createElement("div")).setAttribute("data-tether-id", f()), E(t.style, {
                    top: 0,
                    left: 0,
                    position: "absolute"
                }), document.body.appendChild(t), p = t);
                var e = t.getAttribute("data-tether-id");
                return "undefined" == typeof g[e] && (g[e] = s(t), L(function() {
                    delete g[e]
                })), g[e]
            },
            y = [],
            L = function(t) {
                y.push(t)
            },
            D = function() {
                for (var t = void 0; t = y.pop();) t()
            },
            b = function() {
                function t() {
                    n(this, t)
                }
                return d(t, [{
                    key: "on",
                    value: function(t, e, i, n) {
                        var o = !(arguments.length <= 3 || void 0 === n) && arguments[3];
                        "undefined" == typeof this.bindings && (this.bindings = {}), "undefined" == typeof this.bindings[t] && (this.bindings[t] = []), this.bindings[t].push({
                            handler: e,
                            ctx: i,
                            once: o
                        })
                    }
                }, {
                    key: "once",
                    value: function(t, e, i) {
                        this.on(t, e, i, !0)
                    }
                }, {
                    key: "off",
                    value: function(t, e) {
                        if ("undefined" != typeof this.bindings && "undefined" != typeof this.bindings[t])
                            if (void 0 === e) delete this.bindings[t];
                            else
                                for (var i = 0; i < this.bindings[t].length;) this.bindings[t][i].handler === e ? this.bindings[t].splice(i, 1) : ++i
                    }
                }, {
                    key: "trigger",
                    value: function(t) {
                        if ("undefined" != typeof this.bindings && this.bindings[t]) {
                            for (var e = 0, i = arguments.length, n = Array(1 < i ? i - 1 : 0), o = 1; o < i; o++) n[o - 1] = arguments[o];
                            for (; e < this.bindings[t].length;) {
                                var r = this.bindings[t][e],
                                    s = r.handler,
                                    a = r.ctx,
                                    l = r.once,
                                    h = a;
                                void 0 === h && (h = this), s.apply(h, n), l ? this.bindings[t].splice(e, 1) : ++e
                            }
                        }
                    }
                }]), t
            }();
        O.Utils = {
            getActualBoundingClientRect: s,
            getScrollParents: h,
            getBounds: S,
            getOffsetParent: T,
            extend: E,
            addClass: u,
            removeClass: o,
            hasClass: r,
            updateClasses: A,
            defer: L,
            flush: D,
            uniqueId: f,
            Evented: b,
            getScrollBarSize: C,
            removeUtilElements: c
        };
        var I = function() {
                function i(t, e) {
                    var i = [],
                        n = !0,
                        o = !1,
                        r = void 0;
                    try {
                        for (var s, a = t[Symbol.iterator](); !(n = (s = a.next()).done) && (i.push(s.value), !e || i.length !== e); n = !0);
                    } catch (T) {
                        o = !0, r = T
                    } finally {
                        try {
                            !n && a["return"] && a["return"]()
                        } finally {
                            if (o) throw r
                        }
                    }
                    return i
                }
                return function(t, e) {
                    if (Array.isArray(t)) return t;
                    if (Symbol.iterator in Object(t)) return i(t, e);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            x = (d = function() {
                function n(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var n = e[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                    }
                }
                return function(t, e, i) {
                    return e && n(t.prototype, e), i && n(t, i), t
                }
            }(), function(t, e, i) {
                for (var n = !0; n;) {
                    var o = t,
                        r = e,
                        s = i;
                    n = !1, null === o && (o = Function.prototype);
                    var a = Object.getOwnPropertyDescriptor(o, r);
                    if (void 0 !== a) {
                        if ("value" in a) return a.value;
                        var l = a.get;
                        if (void 0 === l) return;
                        return l.call(s)
                    }
                    var h = Object.getPrototypeOf(o);
                    if (null === h) return;
                    t = h, e = r, i = s, n = !0, a = h = void 0
                }
            });
        if (void 0 === O) throw new Error("You must include the utils.js file before tether.js");
        var w, P, N, R, h = ($ = O.Utils).getScrollParents,
            T = (S = $.getBounds, $.getOffsetParent),
            u = (E = $.extend, $.addClass),
            o = $.removeClass,
            C = (A = $.updateClasses, L = $.defer, D = $.flush, $.getScrollBarSize),
            c = $.removeUtilElements,
            H = function() {
                if ("undefined" == typeof document) return "";
                for (var t = document.createElement("div"), e = ["transform", "WebkitTransform", "OTransform", "MozTransform", "msTransform"], i = 0; i < e.length; ++i) {
                    var n = e[i];
                    if (void 0 !== t.style[n]) return n
                }
            }(),
            z = [],
            B = function() {
                z.forEach(function(t) {
                    t.position(!1)
                }), D()
            };
        N = P = w = null, R = function Q() {
            return void 0 !== P && 16 < P ? (P = Math.min(P - 16, 250), void(N = setTimeout(Q, 250))) : void(void 0 !== w && e() - w < 10 || (null != N && (clearTimeout(N), N = null), w = e(), B(), P = e() - w))
        }, "undefined" != typeof window && "undefined" != typeof window.addEventListener && ["resize", "scroll", "touchmove"].forEach(function(t) {
            window.addEventListener(t, R)
        });
        var W = {
                center: "center",
                left: "right",
                right: "left"
            },
            j = {
                middle: "middle",
                top: "bottom",
                bottom: "top"
            },
            F = {
                top: 0,
                left: 0,
                middle: "50%",
                center: "50%",
                bottom: "100%",
                right: "100%"
            },
            q = function(t, e) {
                var i = t.left,
                    n = t.top;
                return "auto" === i && (i = W[e.left]), "auto" === n && (n = j[e.top]), {
                    left: i,
                    top: n
                }
            },
            G = function(t) {
                var e = t.left,
                    i = t.top;
                return "undefined" != typeof F[t.left] && (e = F[t.left]), "undefined" != typeof F[t.top] && (i = F[t.top]), {
                    left: e,
                    top: i
                }
            },
            U = function(t) {
                var e = t.split(" "),
                    i = I(e, 2);
                return {
                    top: i[0],
                    left: i[1]
                }
            },
            V = U,
            X = function() {
                function i(t) {
                    var e = this;
                    n(this, i), x(Object.getPrototypeOf(i.prototype), "constructor", this).call(this), this.position = this.position.bind(this), z.push(this), this.history = [], this.setOptions(t, !1), O.modules.forEach(function(t) {
                        "undefined" != typeof t.initialize && t.initialize.call(e)
                    }), this.position()
                }
                return t(i, b), d(i, [{
                    key: "getClass",
                    value: function(t) {
                        var e = arguments.length <= 0 || void 0 === t ? "" : arguments[0],
                            i = this.options.classes;
                        return void 0 !== i && i[e] ? this.options.classes[e] : this.options.classPrefix ? this.options.classPrefix + "-" + e : e
                    }
                }, {
                    key: "setOptions",
                    value: function(t, e) {
                        var i = this,
                            n = arguments.length <= 1 || void 0 === e || arguments[1],
                            o = {
                                offset: "0 0",
                                targetOffset: "0 0",
                                targetAttachment: "auto auto",
                                classPrefix: "tether"
                            };
                        this.options = E(o, t);
                        var r = this.options,
                            s = r.element,
                            a = r.target,
                            l = r.targetModifier;
                        if (this.element = s, this.target = a, this.targetModifier = l, "viewport" === this.target ? (this.target = document.body, this.targetModifier = "visible") : "scroll-handle" === this.target && (this.target = document.body, this.targetModifier = "scroll-handle"), ["element", "target"].forEach(function(t) {
                                if ("undefined" == typeof i[t]) throw new Error("Tether Error: Both element and target must be defined");
                                "undefined" != typeof i[t].jquery ? i[t] = i[t][0] : "string" == typeof i[t] && (i[t] = document.querySelector(i[t]))
                            }), u(this.element, this.getClass("element")), !1 !== this.options.addTargetClasses && u(this.target, this.getClass("target")), !this.options.attachment) throw new Error("Tether Error: You must provide an attachment");
                        this.targetAttachment = V(this.options.targetAttachment), this.attachment = V(this.options.attachment), this.offset = U(this.options.offset), this.targetOffset = U(this.options.targetOffset), "undefined" != typeof this.scrollParents && this.disable(), "scroll-handle" === this.targetModifier ? this.scrollParents = [this.target] : this.scrollParents = h(this.target), !1 !== this.options.enabled && this.enable(n)
                    }
                }, {
                    key: "getTargetBounds",
                    value: function() {
                        if ("undefined" == typeof this.targetModifier) return S(this.target);
                        if ("visible" === this.targetModifier) return this.target === document.body ? {
                            top: pageYOffset,
                            left: pageXOffset,
                            height: innerHeight,
                            width: innerWidth
                        } : ((r = {
                            height: (t = S(this.target)).height,
                            width: t.width,
                            top: t.top,
                            left: t.left
                        }).height = Math.min(r.height, t.height - (pageYOffset - t.top)), r.height = Math.min(r.height, t.height - (t.top + t.height - (pageYOffset + innerHeight))), r.height = Math.min(innerHeight, r.height), r.height -= 2, r.width = Math.min(r.width, t.width - (pageXOffset - t.left)), r.width = Math.min(r.width, t.width - (t.left + t.width - (pageXOffset + innerWidth))), r.width = Math.min(innerWidth, r.width), r.width -= 2, r.top < pageYOffset && (r.top = pageYOffset), r.left < pageXOffset && (r.left = pageXOffset), r);
                        if ("scroll-handle" === this.targetModifier) {
                            var t = void 0,
                                e = this.target;
                            e === document.body ? (e = document.documentElement, t = {
                                left: pageXOffset,
                                top: pageYOffset,
                                height: innerHeight,
                                width: innerWidth
                            }) : t = S(e);
                            var i = getComputedStyle(e),
                                n = 0;
                            (e.scrollWidth > e.clientWidth || 0 <= [i.overflow, i.overflowX].indexOf("scroll") || this.target !== document.body) && (n = 15);
                            var o = t.height - parseFloat(i.borderTopWidth) - parseFloat(i.borderBottomWidth) - n,
                                r = {
                                    width: 15,
                                    height: .975 * o * (o / e.scrollHeight),
                                    left: t.left + t.width - parseFloat(i.borderLeftWidth) - 15
                                },
                                s = 0;
                            o < 408 && this.target === document.body && (s = -11e-5 * Math.pow(o, 2) - .00727 * o + 22.58), this.target !== document.body && (r.height = Math.max(r.height, 24));
                            var a = this.target.scrollTop / (e.scrollHeight - o);
                            return r.top = a * (o - r.height - s) + t.top + parseFloat(i.borderTopWidth), this.target === document.body && (r.height = Math.max(r.height, 24)), r
                        }
                    }
                }, {
                    key: "clearCache",
                    value: function() {
                        this._cache = {}
                    }
                }, {
                    key: "cache",
                    value: function(t, e) {
                        return "undefined" == typeof this._cache && (this._cache = {}), "undefined" == typeof this._cache[t] && (this._cache[t] = e.call(this)), this._cache[t]
                    }
                }, {
                    key: "enable",
                    value: function(t) {
                        var e = this,
                            i = arguments.length <= 0 || void 0 === t || arguments[0];
                        !1 !== this.options.addTargetClasses && u(this.target, this.getClass("enabled")), u(this.element, this.getClass("enabled")), this.enabled = !0, this.scrollParents.forEach(function(t) {
                            t !== e.target.ownerDocument && t.addEventListener("scroll", e.position)
                        }), i && this.position()
                    }
                }, {
                    key: "disable",
                    value: function() {
                        var e = this;
                        o(this.target, this.getClass("enabled")), o(this.element, this.getClass("enabled")), this.enabled = !1, "undefined" != typeof this.scrollParents && this.scrollParents.forEach(function(t) {
                            t.removeEventListener("scroll", e.position)
                        })
                    }
                }, {
                    key: "destroy",
                    value: function() {
                        var i = this;
                        this.disable(), z.forEach(function(t, e) {
                            t === i && z.splice(e, 1)
                        }), 0 === z.length && c()
                    }
                }, {
                    key: "updateAttachClasses",
                    value: function(t, e) {
                        var i = this;
                        t = t || this.attachment, e = e || this.targetAttachment;
                        var n = ["left", "top", "bottom", "right", "middle", "center"];
                        "undefined" != typeof this._addAttachClasses && this._addAttachClasses.length && this._addAttachClasses.splice(0, this._addAttachClasses.length), "undefined" == typeof this._addAttachClasses && (this._addAttachClasses = []);
                        var o = this._addAttachClasses;
                        t.top && o.push(this.getClass("element-attached") + "-" + t.top), t.left && o.push(this.getClass("element-attached") + "-" + t.left), e.top && o.push(this.getClass("target-attached") + "-" + e.top), e.left && o.push(this.getClass("target-attached") + "-" + e.left);
                        var r = [];
                        n.forEach(function(t) {
                            r.push(i.getClass("element-attached") + "-" + t), r.push(i.getClass("target-attached") + "-" + t)
                        }), L(function() {
                            "undefined" != typeof i._addAttachClasses && (A(i.element, i._addAttachClasses, r), !1 !== i.options.addTargetClasses && A(i.target, i._addAttachClasses, r), delete i._addAttachClasses)
                        })
                    }
                }, {
                    key: "position",
                    value: function(t) {
                        var a = this,
                            e = arguments.length <= 0 || void 0 === t || arguments[0];
                        if (this.enabled) {
                            this.clearCache();
                            var i = q(this.targetAttachment, this.attachment);
                            this.updateAttachClasses(this.attachment, i);
                            var n = this.cache("element-bounds", function() {
                                    return S(a.element)
                                }),
                                o = n.width,
                                r = n.height;
                            if (0 === o && 0 === r && "undefined" != typeof this.lastSize) {
                                var s = this.lastSize;
                                o = s.width, r = s.height
                            } else this.lastSize = {
                                width: o,
                                height: r
                            };
                            var l = this.cache("target-bounds", function() {
                                    return a.getTargetBounds()
                                }),
                                h = l,
                                c = _(G(this.attachment), {
                                    width: o,
                                    height: r
                                }),
                                u = _(G(i), h),
                                d = _(this.offset, {
                                    width: o,
                                    height: r
                                }),
                                p = _(this.targetOffset, h);
                            c = k(c, d), u = k(u, p);
                            for (var f = l.left + u.left - c.left, g = l.top + u.top - c.top, m = 0; m < O.modules.length; ++m) {
                                var v = O.modules[m].position.call(this, {
                                    left: f,
                                    top: g,
                                    targetAttachment: i,
                                    targetPos: l,
                                    elementPos: n,
                                    offset: c,
                                    targetOffset: u,
                                    manualOffset: d,
                                    manualTargetOffset: p,
                                    scrollbarSize: w,
                                    attachment: this.attachment
                                });
                                if (!1 === v) return !1;
                                void 0 !== v && "object" == typeof v && (g = v.top, f = v.left)
                            }
                            var y = {
                                    page: {
                                        top: g,
                                        left: f
                                    },
                                    viewport: {
                                        top: g - pageYOffset,
                                        bottom: pageYOffset - g - r + innerHeight,
                                        left: f - pageXOffset,
                                        right: pageXOffset - f - o + innerWidth
                                    }
                                },
                                b = this.target.ownerDocument,
                                x = b.defaultView,
                                w = void 0;
                            return b.body.scrollWidth > x.innerWidth && (w = this.cache("scrollbar-size", C), y.viewport.bottom -= w.height), b.body.scrollHeight > x.innerHeight && (w = this.cache("scrollbar-size", C), y.viewport.right -= w.width), (-1 === ["", "static"].indexOf(b.body.style.position) || -1 === ["", "static"].indexOf(b.body.parentElement.style.position)) && (y.page.bottom = b.body.scrollHeight - g - r, y.page.right = b.body.scrollWidth - f - o), "undefined" != typeof this.options.optimizations && !1 !== this.options.optimizations.moveElement && "undefined" == typeof this.targetModifier && function() {
                                var t = a.cache("target-offsetparent", function() {
                                        return T(a.target)
                                    }),
                                    e = a.cache("target-offsetparent-bounds", function() {
                                        return S(t)
                                    }),
                                    i = getComputedStyle(t),
                                    n = e,
                                    o = {};
                                if (["Top", "Left", "Bottom", "Right"].forEach(function(t) {
                                        o[t.toLowerCase()] = parseFloat(i["border" + t + "Width"])
                                    }), e.right = b.body.scrollWidth - e.left - n.width + o.right, e.bottom = b.body.scrollHeight - e.top - n.height + o.bottom, y.page.top >= e.top + o.top && y.page.bottom >= e.bottom && y.page.left >= e.left + o.left && y.page.right >= e.right) {
                                    var r = t.scrollTop,
                                        s = t.scrollLeft;
                                    y.offset = {
                                        top: y.page.top - e.top + r - o.top,
                                        left: y.page.left - e.left + s - o.left
                                    }
                                }
                            }(), this.move(y), this.history.unshift(y), 3 < this.history.length && this.history.pop(), e && D(), !0
                        }
                    }
                }, {
                    key: "move",
                    value: function(e) {
                        var o = this;
                        if ("undefined" != typeof this.element.parentNode) {
                            var i = {};
                            for (var t in e)
                                for (var n in i[t] = {}, e[t]) {
                                    for (var r = !1, s = 0; s < this.history.length; ++s) {
                                        var a = this.history[s];
                                        if ("undefined" != typeof a[t] && !m(a[t][n], e[t][n])) {
                                            r = !0;
                                            break
                                        }
                                    }
                                    r || (i[t][n] = !0)
                                }
                            var l = {
                                    top: "",
                                    left: "",
                                    right: "",
                                    bottom: ""
                                },
                                h = function(t, e) {
                                    if (!1 !== ("undefined" != typeof o.options.optimizations ? o.options.optimizations.gpu : null)) {
                                        var i = void 0,
                                            n = void 0;
                                        t.top ? (l.top = 0, i = e.top) : (l.bottom = 0, i = -e.bottom), t.left ? (l.left = 0, n = e.left) : (l.right = 0, n = -e.right), l[H] = "translateX(" + Math.round(n) + "px) translateY(" + Math.round(i) + "px)", "msTransform" !== H && (l[H] += " translateZ(0)")
                                    } else t.top ? l.top = e.top + "px" : l.bottom = e.bottom + "px", t.left ? l.left = e.left + "px" : l.right = e.right + "px"
                                },
                                c = !1;
                            if ((i.page.top || i.page.bottom) && (i.page.left || i.page.right) ? (l.position = "absolute", h(i.page, e.page)) : (i.viewport.top || i.viewport.bottom) && (i.viewport.left || i.viewport.right) ? (l.position = "fixed", h(i.viewport, e.viewport)) : "undefined" != typeof i.offset && i.offset.top && i.offset.left ? function() {
                                    l.position = "absolute";
                                    var t = o.cache("target-offsetparent", function() {
                                        return T(o.target)
                                    });
                                    T(o.element) !== t && L(function() {
                                        o.element.parentNode.removeChild(o.element), t.appendChild(o.element)
                                    }), h(i.offset, e.offset), c = !0
                                }() : (l.position = "absolute", h({
                                    top: !0,
                                    left: !0
                                }, e.page)), !c) {
                                for (var u = !0, d = this.element.parentNode; d && 1 === d.nodeType && "BODY" !== d.tagName;) {
                                    if ("static" !== getComputedStyle(d).position) {
                                        u = !1;
                                        break
                                    }
                                    d = d.parentNode
                                }
                                u || (this.element.parentNode.removeChild(this.element), this.element.ownerDocument.body.appendChild(this.element))
                            }
                            var p = {},
                                f = !1;
                            for (var n in l) {
                                var g = l[n];
                                this.element.style[n] !== g && (f = !0, p[n] = g)
                            }
                            f && L(function() {
                                E(o.element.style, p)
                            })
                        }
                    }
                }]), i
            }();
        X.modules = [], O.position = B;
        var Y = E(X, O),
            E = (I = function() {
                function i(t, e) {
                    var i = [],
                        n = !0,
                        o = !1,
                        r = void 0;
                    try {
                        for (var s, a = t[Symbol.iterator](); !(n = (s = a.next()).done) && (i.push(s.value), !e || i.length !== e); n = !0);
                    } catch (T) {
                        o = !0, r = T
                    } finally {
                        try {
                            !n && a["return"] && a["return"]()
                        } finally {
                            if (o) throw r
                        }
                    }
                    return i
                }
                return function(t, e) {
                    if (Array.isArray(t)) return t;
                    if (Symbol.iterator in Object(t)) return i(t, e);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(), S = ($ = O.Utils).getBounds, $.extend),
            K = (A = $.updateClasses, L = $.defer, ["left", "top", "right", "bottom"]);
        O.modules.push({
            position: function(t) {
                var p = this,
                    f = t.top,
                    g = t.left,
                    m = t.targetAttachment;
                if (!this.options.constraints) return !0;
                var e = this.cache("element-bounds", function() {
                        return S(p.element)
                    }),
                    v = e.height,
                    y = e.width;
                if (0 === y && 0 === v && "undefined" != typeof this.lastSize) {
                    var i = this.lastSize;
                    y = i.width, v = i.height
                }
                var n = this.cache("target-bounds", function() {
                        return p.getTargetBounds()
                    }),
                    b = n.height,
                    x = n.width,
                    o = [this.getClass("pinned"), this.getClass("out-of-bounds")];
                this.options.constraints.forEach(function(t) {
                    var e = t.outOfBoundsClass,
                        i = t.pinnedClass;
                    e && o.push(e), i && o.push(i)
                }), o.forEach(function(e) {
                    ["left", "top", "right", "bottom"].forEach(function(t) {
                        o.push(e + "-" + t)
                    })
                });
                var w = [],
                    T = E({}, m),
                    C = E({}, this.attachment);
                return this.options.constraints.forEach(function(t) {
                    var e = t.to,
                        i = t.attachment,
                        n = t.pin;
                    void 0 === i && (i = "");
                    var o = void 0,
                        r = void 0;
                    if (0 <= i.indexOf(" ")) {
                        var s = i.split(" "),
                            a = I(s, 2);
                        r = a[0], o = a[1]
                    } else o = r = i;
                    var l = M(p, e);
                    ("target" === r || "both" === r) && (f < l[1] && "top" === T.top && (f += b, T.top = "bottom"), f + v > l[3] && "bottom" === T.top && (f -= b, T.top = "top")), "together" === r && ("top" === T.top && ("bottom" === C.top && f < l[1] ? (f += b, T.top = "bottom", f += v, C.top = "top") : "top" === C.top && f + v > l[3] && f - (v - b) >= l[1] && (f -= v - b, T.top = "bottom", C.top = "bottom")), "bottom" === T.top && ("top" === C.top && f + v > l[3] ? (f -= b, T.top = "top", f -= v, C.top = "bottom") : "bottom" === C.top && f < l[1] && f + (2 * v - b) <= l[3] && (f += v - b, T.top = "top", C.top = "top")), "middle" === T.top && (f + v > l[3] && "top" === C.top ? (f -= v, C.top = "bottom") : f < l[1] && "bottom" === C.top && (f += v, C.top = "top"))), ("target" === o || "both" === o) && (g < l[0] && "left" === T.left && (g += x, T.left = "right"), g + y > l[2] && "right" === T.left && (g -= x, T.left = "left")), "together" === o && (g < l[0] && "left" === T.left ? "right" === C.left ? (g += x, T.left = "right", g += y, C.left = "left") : "left" === C.left && (g += x, T.left = "right", g -= y, C.left = "right") : g + y > l[2] && "right" === T.left ? "left" === C.left ? (g -= x, T.left = "left", g -= y, C.left = "right") : "right" === C.left && (g -= x, T.left = "left", g += y, C.left = "left") : "center" === T.left && (g + y > l[2] && "left" === C.left ? (g -= y, C.left = "right") : g < l[0] && "right" === C.left && (g += y, C.left = "left"))), ("element" === r || "both" === r) && (f < l[1] && "bottom" === C.top && (f += v, C.top = "top"), f + v > l[3] && "top" === C.top && (f -= v, C.top = "bottom")), ("element" === o || "both" === o) && (g < l[0] && ("right" === C.left ? (g += y, C.left = "left") : "center" === C.left && (g += y / 2, C.left = "left")), g + y > l[2] && ("left" === C.left ? (g -= y, C.left = "right") : "center" === C.left && (g -= y / 2, C.left = "right"))), "string" == typeof n ? n = n.split(",").map(function(t) {
                        return t.trim()
                    }) : !0 === n && (n = ["top", "left", "right", "bottom"]), n = n || [];
                    var h, c, u = [],
                        d = [];
                    f < l[1] && (0 <= n.indexOf("top") ? (f = l[1], u.push("top")) : d.push("top")), f + v > l[3] && (0 <= n.indexOf("bottom") ? (f = l[3] - v, u.push("bottom")) : d.push("bottom")), g < l[0] && (0 <= n.indexOf("left") ? (g = l[0], u.push("left")) : d.push("left")), g + y > l[2] && (0 <= n.indexOf("right") ? (g = l[2] - y, u.push("right")) : d.push("right")), u.length && (c = void 0, c = "undefined" != typeof p.options.pinnedClass ? p.options.pinnedClass : p.getClass("pinned"), w.push(c), u.forEach(function(t) {
                        w.push(c + "-" + t)
                    })), d.length && (h = void 0, h = "undefined" != typeof p.options.outOfBoundsClass ? p.options.outOfBoundsClass : p.getClass("out-of-bounds"), w.push(h), d.forEach(function(t) {
                        w.push(h + "-" + t)
                    })), (0 <= u.indexOf("left") || 0 <= u.indexOf("right")) && (C.left = T.left = !1), (0 <= u.indexOf("top") || 0 <= u.indexOf("bottom")) && (C.top = T.top = !1), (T.top !== m.top || T.left !== m.left || C.top !== p.attachment.top || C.left !== p.attachment.left) && (p.updateAttachClasses(C, T), p.trigger("update", {
                        attachment: C,
                        targetAttachment: T
                    }))
                }), L(function() {
                    !1 !== p.options.addTargetClasses && A(p.target, w, o), A(p.element, w, o)
                }), {
                    top: f,
                    left: g
                }
            }
        });
        var $, S = ($ = O.Utils).getBounds,
            A = $.updateClasses;
        L = $.defer;
        O.modules.push({
            position: function(t) {
                var e = this,
                    i = t.top,
                    n = t.left,
                    o = this.cache("element-bounds", function() {
                        return S(e.element)
                    }),
                    r = o.height,
                    s = o.width,
                    a = this.getTargetBounds(),
                    l = i + r,
                    h = n + s,
                    c = [];
                i <= a.bottom && l >= a.top && ["left", "right"].forEach(function(t) {
                    var e = a[t];
                    (e === n || e === h) && c.push(t)
                }), n <= a.right && h >= a.left && ["top", "bottom"].forEach(function(t) {
                    var e = a[t];
                    (e === i || e === l) && c.push(t)
                });
                var u = [],
                    d = [],
                    p = ["left", "top", "right", "bottom"];
                return u.push(this.getClass("abutted")), p.forEach(function(t) {
                    u.push(e.getClass("abutted") + "-" + t)
                }), c.length && d.push(this.getClass("abutted")), c.forEach(function(t) {
                    d.push(e.getClass("abutted") + "-" + t)
                }), L(function() {
                    !1 !== e.options.addTargetClasses && A(e.target, d, u), A(e.element, d, u)
                }), !0
            }
        });
        I = function() {
            function i(t, e) {
                var i = [],
                    n = !0,
                    o = !1,
                    r = void 0;
                try {
                    for (var s, a = t[Symbol.iterator](); !(n = (s = a.next()).done) && (i.push(s.value), !e || i.length !== e); n = !0);
                } catch (T) {
                    o = !0, r = T
                } finally {
                    try {
                        !n && a["return"] && a["return"]()
                    } finally {
                        if (o) throw r
                    }
                }
                return i
            }
            return function(t, e) {
                if (Array.isArray(t)) return t;
                if (Symbol.iterator in Object(t)) return i(t, e);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }();
        return O.modules.push({
            position: function(t) {
                var e = t.top,
                    i = t.left;
                if (this.options.shift) {
                    var n = this.options.shift;
                    "function" == typeof this.options.shift && (n = this.options.shift.call(this, {
                        top: e,
                        left: i
                    }));
                    var o = void 0,
                        r = void 0;
                    if ("string" == typeof n) {
                        (n = n.split(" "))[1] = n[1] || n[0];
                        var s = I(n, 2);
                        o = s[0], r = s[1], o = parseFloat(o, 10), r = parseFloat(r, 10)
                    } else o = n.top, r = n.left;
                    return {
                        top: e += o,
                        left: i += r
                    }
                }
            }
        }), Y
    }),
    function(t, e) {
        "object" == typeof module && module.exports ? module.exports = t.document ? e(t) : e : "function" == typeof define && define.amd ? define(function() {
            return e(t)
        }) : t.Highcharts = e(t)
    }("undefined" != typeof window ? window : this, function(t) {
        var e, i, n, o, r, s, a, l, h, c, u, d, p, f, D, I, g, m, v, E, y, b, A, x, P, w, T, k, N, R, C, _, S, M, O, L, H, z, B, W, j, F, q, G, U, V, X, Y, K, $, Q, Z, J, tt, et, it, nt, ot, rt, st, at, lt, ht, ct, ut, dt, pt, ft, gt, mt, vt, yt, bt, xt, wt, Tt, Ct, St, Et, At, kt, _t, Mt, Ot, Lt, Dt, It = (e = void 0 === t ? window : t, i = e.document, n = e.navigator && e.navigator.userAgent || "", o = i && i.createElementNS && !!i.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect, r = /(edge|msie|trident)/i.test(n) && !e.opera, s = -1 !== n.indexOf("Firefox"), a = -1 !== n.indexOf("Chrome"), l = s && parseInt(n.split("Firefox/")[1], 10) < 4, e.Highcharts ? e.Highcharts.error(16, !0) : {
            product: "Highcharts",
            version: "6.1.2",
            deg2rad: 2 * Math.PI / 360,
            doc: i,
            hasBidiBug: l,
            hasTouch: i && void 0 !== i.documentElement.ontouchstart,
            isMS: r,
            isWebKit: -1 !== n.indexOf("AppleWebKit"),
            isFirefox: s,
            isChrome: a,
            isSafari: !a && -1 !== n.indexOf("Safari"),
            isTouchDevice: /(Mobile|Android|Windows Phone)/.test(n),
            SVG_NS: "http://www.w3.org/2000/svg",
            chartCount: 0,
            seriesTypes: {},
            symbolSizes: {},
            svg: o,
            win: e,
            marginNames: ["plotTop", "marginRight", "marginBottom", "plotLeft"],
            noop: function() {},
            charts: []
        });
        ! function(v) {
            v.timers = [];
            var t, e, i = v.charts,
                h = v.doc,
                l = v.win;
            v.error = function(t, e) {
                if (t = v.isNumber(t) ? "Highcharts error #" + t + ": www.highcharts.com/errors/" + t : t, e) throw Error(t);
                l.console && console.log(t)
            }, v.Fx = function(t, e, i) {
                this.options = e, this.elem = t, this.prop = i
            }, v.Fx.prototype = {
                dSetter: function() {
                    var t, e = this.paths[0],
                        i = this.paths[1],
                        n = [],
                        o = this.now,
                        r = e.length;
                    if (1 === o) n = this.toD;
                    else if (r === i.length && o < 1)
                        for (; r--;) t = parseFloat(e[r]), n[r] = isNaN(t) ? i[r] : o * parseFloat(i[r] - t) + t;
                    else n = i;
                    this.elem.attr("d", n, null, !0)
                },
                update: function() {
                    var t = this.elem,
                        e = this.prop,
                        i = this.now,
                        n = this.options.step;
                    this[e + "Setter"] ? this[e + "Setter"]() : t.attr ? t.element && t.attr(e, i, null, !0) : t.style[e] = i + this.unit, n && n.call(t, i, this)
                },
                run: function(t, e, i) {
                    var n = this,
                        o = n.options,
                        r = function(t) {
                            return !r.stopped && n.step(t)
                        },
                        s = l.requestAnimationFrame || function(t) {
                            setTimeout(t, 13)
                        },
                        a = function() {
                            for (var t = 0; t < v.timers.length; t++) v.timers[t]() || v.timers.splice(t--, 1);
                            v.timers.length && s(a)
                        };
                    t !== e || this.elem["forceAnimate:" + this.prop] ? (this.startTime = +new Date, this.start = t, this.end = e, this.unit = i, this.now = this.start, this.pos = 0, r.elem = this.elem, r.prop = this.prop, r() && 1 === v.timers.push(r) && s(a)) : (delete o.curAnim[this.prop], o.complete && 0 === v.keys(o.curAnim).length && o.complete.call(this.elem))
                },
                step: function(t) {
                    var e, i = +new Date,
                        n = this.options,
                        o = this.elem,
                        r = n.complete,
                        s = n.duration,
                        a = n.curAnim;
                    return o.attr && !o.element ? t = !1 : t || i >= s + this.startTime ? (this.now = this.end, this.pos = 1, this.update(), e = a[this.prop] = !0, v.objectEach(a, function(t) {
                        !0 !== t && (e = !1)
                    }), e && r && r.call(o), t = !1) : (this.pos = n.easing((i - this.startTime) / s), this.now = this.start + (this.end - this.start) * this.pos, this.update(), t = !0), t
                },
                initPath: function(t, e, i) {
                    function n(t) {
                        var e, i;
                        for (h = t.length; h--;) e = "M" === t[h] || "L" === t[h], i = /[a-zA-Z]/.test(t[h + 3]), e && i && t.splice(h + 1, 0, t[h + 1], t[h + 2], t[h + 1], t[h + 2])
                    }

                    function o(t, e) {
                        for (; t.length < a;) {
                            t[0] = e[a - t.length];
                            var i = t.slice(0, p);
                            [].splice.apply(t, [0, 0].concat(i)), g && (i = t.slice(t.length - p), [].splice.apply(t, [t.length, 0].concat(i)), h--)
                        }
                        t[0] = "M"
                    }

                    function r(t, e) {
                        for (var i = (a - t.length) / p; 0 < i && i--;)(l = t.slice().splice(t.length / m - p, p * m))[0] = e[a - p - i * p], d && (l[p - 6] = l[p - 2], l[p - 5] = l[p - 1]), [].splice.apply(t, [t.length / m, 0].concat(l)), g && i--
                    }
                    e = e || "";
                    var s, a, l, h, c = t.startX,
                        u = t.endX,
                        d = -1 < e.indexOf("C"),
                        p = d ? 7 : 3;
                    e = e.split(" "), i = i.slice();
                    var f, g = t.isArea,
                        m = g ? 2 : 1;
                    if (d && (n(e), n(i)), c && u) {
                        for (h = 0; h < c.length; h++) {
                            if (c[h] === u[0]) {
                                s = h;
                                break
                            }
                            if (c[0] === u[u.length - c.length + h]) {
                                s = h, f = !0;
                                break
                            }
                        }
                        void 0 === s && (e = [])
                    }
                    return e.length && v.isNumber(s) && (a = i.length + s * m * p, f ? (o(e, i), r(i, e)) : (o(i, e), r(e, i))), [e, i]
                },
                fillSetter: function() {
                    v.Fx.prototype.strokeSetter.apply(this, arguments)
                },
                strokeSetter: function() {
                    this.elem.attr(this.prop, v.color(this.start).tweenTo(v.color(this.end), this.pos), null, !0)
                }
            }, v.merge = function() {
                var t, e, i = arguments,
                    n = {},
                    o = function(i, n) {
                        return "object" != typeof i && (i = {}), v.objectEach(n, function(t, e) {
                            !v.isObject(t, !0) || v.isClass(t) || v.isDOMElement(t) ? i[e] = n[e] : i[e] = o(i[e] || {}, t)
                        }), i
                    };
                for (!0 === i[0] && (n = i[1], i = Array.prototype.slice.call(i, 2)), e = i.length, t = 0; t < e; t++) n = o(n, i[t]);
                return n
            }, v.pInt = function(t, e) {
                return parseInt(t, e || 10)
            }, v.isString = function(t) {
                return "string" == typeof t
            }, v.isArray = function(t) {
                return "[object Array]" === (t = Object.prototype.toString.call(t)) || "[object Array Iterator]" === t
            }, v.isObject = function(t, e) {
                return !(!t || "object" != typeof t || e && v.isArray(t))
            }, v.isDOMElement = function(t) {
                return v.isObject(t) && "number" == typeof t.nodeType
            }, v.isClass = function(t) {
                var e = t && t.constructor;
                return !(!v.isObject(t, !0) || v.isDOMElement(t) || !e || !e.name || "Object" === e.name)
            }, v.isNumber = function(t) {
                return "number" == typeof t && !isNaN(t) && Infinity > t && -Infinity < t
            }, v.erase = function(t, e) {
                for (var i = t.length; i--;)
                    if (t[i] === e) {
                        t.splice(i, 1);
                        break
                    }
            }, v.defined = function(t) {
                return null != t
            }, v.attr = function(i, t, e) {
                var n;
                return v.isString(t) ? v.defined(e) ? i.setAttribute(t, e) : i && i.getAttribute && ((n = i.getAttribute(t)) || "class" !== t || (n = i.getAttribute(t + "Name"))) : v.defined(t) && v.isObject(t) && v.objectEach(t, function(t, e) {
                    i.setAttribute(e, t)
                }), n
            }, v.splat = function(t) {
                return v.isArray(t) ? t : [t]
            }, v.syncTimeout = function(t, e, i) {
                if (e) return setTimeout(t, e, i);
                t.call(0, i)
            }, v.clearTimeout = function(t) {
                v.defined(t) && clearTimeout(t)
            }, v.extend = function(t, e) {
                var i;
                for (i in t || (t = {}), e) t[i] = e[i];
                return t
            }, v.pick = function() {
                var t, e, i = arguments,
                    n = i.length;
                for (t = 0; t < n; t++)
                    if (null != (e = i[t])) return e
            }, v.css = function(t, e) {
                v.isMS && !v.svg && e && void 0 !== e.opacity && (e.filter = "alpha(opacity=" + 100 * e.opacity + ")"), v.extend(t.style, e)
            }, v.createElement = function(t, e, i, n, o) {
                t = h.createElement(t);
                var r = v.css;
                return e && v.extend(t, e), o && r(t, {
                    padding: 0,
                    border: "none",
                    margin: 0
                }), i && r(t, i), n && n.appendChild(t), t
            }, v.extendClass = function(t, e) {
                var i = function() {};
                return i.prototype = new t, v.extend(i.prototype, e), i
            }, v.pad = function(t, e, i) {
                return Array((e || 2) + 1 - String(t).replace("-", "").length).join(i || 0) + t
            }, v.relativeLength = function(t, e, i) {
                return /%$/.test(t) ? e * parseFloat(t) / 100 + (i || 0) : parseFloat(t)
            }, v.wrap = function(t, e, n) {
                var o = t[e];
                t[e] = function() {
                    var t = Array.prototype.slice.call(arguments),
                        e = arguments,
                        i = this;
                    return i.proceed = function() {
                        o.apply(i, arguments.length ? arguments : e)
                    }, t.unshift(o), t = n.apply(this, t), i.proceed = null, t
                }
            }, v.formatSingle = function(t, e, i) {
                var n = /\.([0-9])/,
                    o = v.defaultOptions.lang;
                return /f$/.test(t) ? (i = (i = t.match(n)) ? i[1] : -1, null !== e && (e = v.numberFormat(e, i, o.decimalPoint, -1 < t.indexOf(",") ? o.thousandsSep : ""))) : e = (i || v.time).dateFormat(t, e), e
            }, v.format = function(t, e, i) {
                for (var n, o, r, s, a, l = "{", h = !1, c = []; t && -1 !== (l = t.indexOf(l));) {
                    if (n = t.slice(0, l), h) {
                        for (s = (o = (n = n.split(":")).shift().split(".")).length, a = e, r = 0; r < s; r++) a && (a = a[o[r]]);
                        n.length && (a = v.formatSingle(n.join(":"), a, i)), c.push(a)
                    } else c.push(n);
                    t = t.slice(l + 1), l = (h = !h) ? "}" : "{"
                }
                return c.push(t), c.join("")
            }, v.getMagnitude = function(t) {
                return Math.pow(10, Math.floor(Math.log(t) / Math.LN10))
            }, v.normalizeTickInterval = function(t, e, i, n, o) {
                var r, s = t;
                for (r = t / (i = v.pick(i, 1)), e || (e = o ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10] : [1, 2, 2.5, 5, 10], !1 === n && (1 === i ? e = v.grep(e, function(t) {
                        return 0 == t % 1
                    }) : i <= .1 && (e = [1 / i]))), n = 0; n < e.length && (s = e[n], !(o && t <= s * i || !o && r <= (e[n] + (e[n + 1] || e[n])) / 2)); n++);
                return v.correctFloat(s * i, -Math.round(Math.log(.001) / Math.LN10))
            }, v.stableSort = function(t, i) {
                var n, e, o = t.length;
                for (e = 0; e < o; e++) t[e].safeI = e;
                for (t.sort(function(t, e) {
                        return 0 === (n = i(t, e)) ? t.safeI - e.safeI : n
                    }), e = 0; e < o; e++) delete t[e].safeI
            }, v.arrayMin = function(t) {
                for (var e = t.length, i = t[0]; e--;) t[e] < i && (i = t[e]);
                return i
            }, v.arrayMax = function(t) {
                for (var e = t.length, i = t[0]; e--;) t[e] > i && (i = t[e]);
                return i
            }, v.destroyObjectProperties = function(i, n) {
                v.objectEach(i, function(t, e) {
                    t && t !== n && t.destroy && t.destroy(), delete i[e]
                })
            }, v.discardElement = function(t) {
                var e = v.garbageBin;
                e || (e = v.createElement("div")), t && e.appendChild(t), e.innerHTML = ""
            }, v.correctFloat = function(t, e) {
                return parseFloat(t.toPrecision(e || 14))
            }, v.setAnimation = function(t, e) {
                e.renderer.globalAnimation = v.pick(t, e.options.chart.animation, !0)
            }, v.animObject = function(t) {
                return v.isObject(t) ? v.merge(t) : {
                    duration: t ? 500 : 0
                }
            }, v.timeUnits = {
                millisecond: 1,
                second: 1e3,
                minute: 6e4,
                hour: 36e5,
                day: 864e5,
                week: 6048e5,
                month: 24192e5,
                year: 314496e5
            }, v.numberFormat = function(t, e, i, n) {
                t = +t || 0, e = +e;
                var o, r, s = v.defaultOptions.lang,
                    a = (t.toString().split(".")[1] || "").split("e")[0].length,
                    l = t.toString().split("e");
                return -1 === e ? e = Math.min(a, 20) : v.isNumber(e) ? e && l[1] && l[1] < 0 && (0 <= (o = e + +l[1]) ? (l[0] = (+l[0]).toExponential(o).split("e")[0], e = o) : (l[0] = l[0].split(".")[0] || 0, t = e < 20 ? (l[0] * Math.pow(10, l[1])).toFixed(e) : 0, l[1] = 0)) : e = 2, r = (Math.abs(l[1] ? l[0] : t) + Math.pow(10, -Math.max(e, a) - 1)).toFixed(e), o = 3 < (a = String(v.pInt(r))).length ? a.length % 3 : 0, i = v.pick(i, s.decimalPoint), n = v.pick(n, s.thousandsSep), t = (t < 0 ? "-" : "") + (o ? a.substr(0, o) + n : ""), t += a.substr(o).replace(/(\d{3})(?=\d)/g, "$1" + n), e && (t += i + r.slice(-e)), l[1] && 0 != +t && (t += "e" + l[1]), t
            }, Math.easeInOutSine = function(t) {
                return -.5 * (Math.cos(Math.PI * t) - 1)
            }, v.getStyle = function(t, e, i) {
                return "width" === e ? Math.max(0, Math.min(t.offsetWidth, t.scrollWidth) - v.getStyle(t, "padding-left") - v.getStyle(t, "padding-right")) : "height" === e ? Math.max(0, Math.min(t.offsetHeight, t.scrollHeight) - v.getStyle(t, "padding-top") - v.getStyle(t, "padding-bottom")) : (l.getComputedStyle || v.error(27, !0), (t = l.getComputedStyle(t, void 0)) && (t = t.getPropertyValue(e), v.pick(i, "opacity" !== e) && (t = v.pInt(t))), t)
            }, v.inArray = function(t, e, i) {
                return (v.indexOfPolyfill || Array.prototype.indexOf).call(e, t, i)
            }, v.grep = function(t, e) {
                return (v.filterPolyfill || Array.prototype.filter).call(t, e)
            }, v.find = Array.prototype.find ? function(t, e) {
                return t.find(e)
            } : function(t, e) {
                var i, n = t.length;
                for (i = 0; i < n; i++)
                    if (e(t[i], i)) return t[i]
            }, v.some = function(t, e, i) {
                return (v.somePolyfill || Array.prototype.some).call(t, e, i)
            }, v.map = function(t, e) {
                for (var i = [], n = 0, o = t.length; n < o; n++) i[n] = e.call(t[n], t[n], n, t);
                return i
            }, v.keys = function(t) {
                return (v.keysPolyfill || Object.keys).call(void 0, t)
            }, v.reduce = function(t, e, i) {
                return (v.reducePolyfill || Array.prototype.reduce).apply(t, 2 < arguments.length ? [e, i] : [e])
            }, v.offset = function(t) {
                var e = h.documentElement;
                return {
                    top: (t = t.parentElement || t.parentNode ? t.getBoundingClientRect() : {
                        top: 0,
                        left: 0
                    }).top + (l.pageYOffset || e.scrollTop) - (e.clientTop || 0),
                    left: t.left + (l.pageXOffset || e.scrollLeft) - (e.clientLeft || 0)
                }
            }, v.stop = function(t, e) {
                for (var i = v.timers.length; i--;) v.timers[i].elem !== t || e && e !== v.timers[i].prop || (v.timers[i].stopped = !0)
            }, v.each = function(t, e, i) {
                return (v.forEachPolyfill || Array.prototype.forEach).call(t, e, i)
            }, v.objectEach = function(t, e, i) {
                for (var n in t) t.hasOwnProperty(n) && e.call(i || t[n], t[n], n, t)
            }, v.addEvent = function(t, e, i, n) {
                var o, r = t.addEventListener || v.addEventListenerPolyfill;
                return o = "function" == typeof t && t.prototype ? t.prototype.protoEvents = t.prototype.protoEvents || {} : t.hcEvents = t.hcEvents || {}, v.Point && t instanceof v.Point && t.series && t.series.chart && (t.series.chart.runTrackerClick = !0), r && r.call(t, e, i, !1), o[e] || (o[e] = []), o[e].push(i), n && v.isNumber(n.order) && (i.order = n.order, o[e].sort(function(t, e) {
                        return t.order - e.order
                    })),
                    function() {
                        v.removeEvent(t, e, i)
                    }
            }, v.removeEvent = function(o, r, i) {
                function s(t, e) {
                    var i = o.removeEventListener || v.removeEventListenerPolyfill;
                    i && i.call(o, t, e, !1)
                }

                function n(i) {
                    var t, n;
                    o.nodeName && (r ? (t = {})[r] = !0 : t = i, v.objectEach(t, function(t, e) {
                        if (i[e])
                            for (n = i[e].length; n--;) s(e, i[e][n])
                    }))
                }
                var a, l;
                v.each(["protoEvents", "hcEvents"], function(t) {
                    var e = o[t];
                    e && (r ? (a = e[r] || [], i ? (-1 < (l = v.inArray(i, a)) && (a.splice(l, 1), e[r] = a), s(r, i)) : (n(e), e[r] = [])) : (n(e), o[t] = {}))
                })
            }, v.fireEvent = function(e, i, n, t) {
                var o, r, s, a, l;
                n = n || {}, h.createEvent && (e.dispatchEvent || e.fireEvent) ? ((o = h.createEvent("Events")).initEvent(i, !0, !0), v.extend(o, n), e.dispatchEvent ? e.dispatchEvent(o) : e.fireEvent(i, o)) : v.each(["protoEvents", "hcEvents"], function(t) {
                    if (e[t])
                        for (r = e[t][i] || [], s = r.length, n.target || v.extend(n, {
                                preventDefault: function() {
                                    n.defaultPrevented = !0
                                },
                                target: e,
                                type: i
                            }), a = 0; a < s; a++)(l = r[a]) && !1 === l.call(e, n) && n.preventDefault()
                }), t && !n.defaultPrevented && t.call(e, n)
            }, v.animate = function(i, n, o) {
                var r, s, a, t, l = "";
                v.isObject(o) || (o = {
                    duration: (t = arguments)[2],
                    easing: t[3],
                    complete: t[4]
                }), v.isNumber(o.duration) || (o.duration = 400), o.easing = "function" == typeof o.easing ? o.easing : Math[o.easing] || Math.easeInOutSine, o.curAnim = v.merge(n), v.objectEach(n, function(t, e) {
                    v.stop(i, e), a = new v.Fx(i, o, e), s = null, "d" === e ? (a.paths = a.initPath(i, i.d, n.d), a.toD = n.d, r = 0, s = 1) : i.attr ? r = i.attr(e) : (r = parseFloat(v.getStyle(i, e)) || 0, "opacity" !== e && (l = "px")), s || (s = t), s && s.match && s.match("px") && (s = s.replace(/px/g, "")), a.run(r, s, l)
                })
            }, v.seriesType = function(t, e, i, n, o) {
                var r = v.getOptions(),
                    s = v.seriesTypes;
                return r.plotOptions[t] = v.merge(r.plotOptions[e], i), s[t] = v.extendClass(s[e] || function() {}, n), s[t].prototype.type = t, o && (s[t].prototype.pointClass = v.extendClass(v.Point, o)), s[t]
            }, v.uniqueKey = (t = Math.random().toString(36).substring(2, 9), e = 0, function() {
                return "highcharts-" + t + "-" + e++
            }), l.jQuery && (l.jQuery.fn.highcharts = function() {
                var t = [].slice.call(arguments);
                if (this[0]) return t[0] ? (new(v[v.isString(t[0]) ? t.shift() : "Chart"])(this[0], t[0], t[1]), this) : i[v.attr(this[0], "data-highcharts-chart")]
            })
        }(It), c = (h = It).each, u = h.isNumber, d = h.map, p = h.merge, f = h.pInt, h.Color = function(t) {
            if (!(this instanceof h.Color)) return new h.Color(t);
            this.init(t)
        }, h.Color.prototype = {
            parsers: [{
                regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
                parse: function(t) {
                    return [f(t[1]), f(t[2]), f(t[3]), parseFloat(t[4], 10)]
                }
            }, {
                regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
                parse: function(t) {
                    return [f(t[1]), f(t[2]), f(t[3]), 1]
                }
            }],
            names: {
                white: "#ffffff",
                black: "#000000"
            },
            init: function(t) {
                var e, i, n, o;
                if ((this.input = t = this.names[t && t.toLowerCase ? t.toLowerCase() : ""] || t) && t.stops) this.stops = d(t.stops, function(t) {
                    return new h.Color(t[1])
                });
                else if (t && t.charAt && "#" === t.charAt() && (e = t.length, t = parseInt(t.substr(1), 16), 7 === e ? i = [(16711680 & t) >> 16, (65280 & t) >> 8, 255 & t, 1] : 4 === e && (i = [(3840 & t) >> 4 | (3840 & t) >> 8, (240 & t) >> 4 | 240 & t, (15 & t) << 4 | 15 & t, 1])), !i)
                    for (n = this.parsers.length; n-- && !i;)(e = (o = this.parsers[n]).regex.exec(t)) && (i = o.parse(e));
                this.rgba = i || []
            },
            get: function(i) {
                var n, t = this.input,
                    e = this.rgba;
                return this.stops ? ((n = p(t)).stops = [].concat(n.stops), c(this.stops, function(t, e) {
                    n.stops[e] = [n.stops[e][0], t.get(i)]
                })) : n = e && u(e[0]) ? "rgb" === i || !i && 1 === e[3] ? "rgb(" + e[0] + "," + e[1] + "," + e[2] + ")" : "a" === i ? e[3] : "rgba(" + e.join(",") + ")" : t, n
            },
            brighten: function(e) {
                var t, i = this.rgba;
                if (this.stops) c(this.stops, function(t) {
                    t.brighten(e)
                });
                else if (u(e) && 0 !== e)
                    for (t = 0; t < 3; t++) i[t] += f(255 * e), i[t] < 0 && (i[t] = 0), 255 < i[t] && (i[t] = 255);
                return this
            },
            setOpacity: function(t) {
                return this.rgba[3] = t, this
            },
            tweenTo: function(t, e) {
                var i = this.rgba,
                    n = t.rgba;
                return e = n.length && i && i.length ? ((t = 1 !== n[3] || 1 !== i[3]) ? "rgba(" : "rgb(") + Math.round(n[0] + (i[0] - n[0]) * (1 - e)) + "," + Math.round(n[1] + (i[1] - n[1]) * (1 - e)) + "," + Math.round(n[2] + (i[2] - n[2]) * (1 - e)) + (t ? "," + (n[3] + (i[3] - n[3]) * (1 - e)) : "") + ")" : t.input || "none"
            }
        }, h.color = function(t) {
            return new h.Color(t)
        }, m = (D = It).addEvent, v = D.animate, E = D.attr, y = D.charts, b = D.color, A = D.css, x = D.createElement, P = D.defined, w = D.deg2rad, T = D.destroyObjectProperties, k = D.doc, N = D.each, R = D.extend, C = D.erase, _ = D.grep, S = D.hasTouch, M = D.inArray, O = D.isArray, L = D.isFirefox, H = D.isMS, z = D.isObject, B = D.isString, W = D.isWebKit, j = D.merge, F = D.noop, q = D.objectEach, G = D.pick, U = D.pInt, V = D.removeEvent, X = D.stop, Y = D.svg, K = D.SVG_NS, $ = D.symbolSizes, Q = D.win, I = D.SVGElement = function() {
            return this
        }, R(I.prototype, {
            opacity: 1,
            SVG_NS: K,
            textProps: "direction fontSize fontWeight fontFamily fontStyle color lineHeight width textAlign textDecoration textOverflow textOutline cursor".split(" "),
            init: function(t, e) {
                this.element = "span" === e ? x(e) : k.createElementNS(this.SVG_NS, e), this.renderer = t
            },
            animate: function(t, e, i) {
                return 0 !== (e = D.animObject(G(e, this.renderer.globalAnimation, !0))).duration ? (i && (e.complete = i), v(this, t, e)) : (this.attr(t, null, i), e.step && e.step.call(this)), this
            },
            complexColor: function(t, e, i) {
                var n, o, r, s, a, l, h, c, u, d, p, f, g = this.renderer,
                    m = [];
                D.fireEvent(this.renderer, "complexColor", {
                    args: arguments
                }, function() {
                    t.radialGradient ? o = "radialGradient" : t.linearGradient && (o = "linearGradient"), o && (r = t[o], a = g.gradients, h = t.stops, d = i.radialReference, O(r) && (t[o] = r = {
                        x1: r[0],
                        y1: r[1],
                        x2: r[2],
                        y2: r[3],
                        gradientUnits: "userSpaceOnUse"
                    }), "radialGradient" === o && d && !P(r.gradientUnits) && (r = j(s = r, g.getRadialAttr(d, s), {
                        gradientUnits: "userSpaceOnUse"
                    })), q(r, function(t, e) {
                        "id" !== e && m.push(e, t)
                    }), q(h, function(t) {
                        m.push(t)
                    }), m = m.join(","), a[m] ? p = a[m].attr("id") : (r.id = p = D.uniqueKey(), a[m] = l = g.createElement(o).attr(r).add(g.defs), l.radAttr = s, l.stops = [], N(h, function(t) {
                        0 === t[1].indexOf("rgba") ? (n = D.color(t[1]), c = n.get("rgb"), u = n.get("a")) : (c = t[1], u = 1), t = g.createElement("stop").attr({
                            offset: t[0],
                            "stop-color": c,
                            "stop-opacity": u
                        }).add(l), l.stops.push(t)
                    })), f = "url(" + g.url + "#" + p + ")", i.setAttribute(e, f), i.gradient = m, t.toString = function() {
                        return f
                    })
                })
            },
            applyTextOutline: function(t) {
                var e, i, n, o, r, s = this.element;
                if (-1 !== t.indexOf("contrast") && (t = t.replace(/contrast/g, this.renderer.getContrast(s.style.fill))), t = t.split(" "), i = t[t.length - 1], (n = t[0]) && "none" !== n && D.svg) {
                    for (this.fakeTS = !0, t = [].slice.call(s.getElementsByTagName("tspan")), this.ySetter = this.xSetter, n = n.replace(/(^[\d\.]+)(.*?)$/g, function(t, e, i) {
                            return 2 * e + i
                        }), r = t.length; r--;) "highcharts-text-outline" === (e = t[r]).getAttribute("class") && C(t, s.removeChild(e));
                    o = s.firstChild, N(t, function(t, e) {
                        0 === e && (t.setAttribute("x", s.getAttribute("x")), e = s.getAttribute("y"), t.setAttribute("y", e || 0), null === e && s.setAttribute("y", 0)), t = t.cloneNode(1), E(t, {
                            "class": "highcharts-text-outline",
                            fill: i,
                            stroke: i,
                            "stroke-width": n,
                            "stroke-linejoin": "round"
                        }), s.insertBefore(t, o)
                    })
                }
            },
            attr: function(i, t, e, n) {
                var o, r, s, a, l = this.element,
                    h = this;
                return "string" == typeof i && void 0 !== t && (o = i, (i = {})[o] = t), "string" == typeof i ? h = (this[i + "Getter"] || this._defaultGetter).call(this, i, l) : (q(i, function(t, e) {
                    s = !1, n || X(this, e), this.symbolName && /^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)$/.test(e) && (r || (this.symbolAttr(i), r = !0), s = !0), !this.rotation || "x" !== e && "y" !== e || (this.doTransform = !0), s || ((a = this[e + "Setter"] || this._defaultSetter).call(this, t, e, l), this.shadows && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(e) && this.updateShadows(e, t, a))
                }, this), this.afterSetters()), e && e.call(this), h
            },
            afterSetters: function() {
                this.doTransform && (this.updateTransform(), this.doTransform = !1)
            },
            updateShadows: function(t, e, i) {
                for (var n = this.shadows, o = n.length; o--;) i.call(n[o], "height" === t ? Math.max(e - (n[o].cutHeight || 0), 0) : "d" === t ? this.d : e, t, n[o])
            },
            addClass: function(t, e) {
                var i = this.attr("class") || "";
                return -1 === i.indexOf(t) && (e || (t = (i + (i ? " " : "") + t).replace("  ", " ")), this.attr("class", t)), this
            },
            hasClass: function(t) {
                return -1 !== M(t, (this.attr("class") || "").split(" "))
            },
            removeClass: function(t) {
                return this.attr("class", (this.attr("class") || "").replace(t, ""))
            },
            symbolAttr: function(e) {
                var i = this;
                N("x y r start end width height innerR anchorX anchorY".split(" "), function(t) {
                    i[t] = G(e[t], i[t])
                }), i.attr({
                    d: i.renderer.symbols[i.symbolName](i.x, i.y, i.width, i.height, i)
                })
            },
            clip: function(t) {
                return this.attr("clip-path", t ? "url(" + this.renderer.url + "#" + t.id + ")" : "none")
            },
            crisp: function(t, e) {
                var i;
                return e = e || t.strokeWidth || 0, i = Math.round(e) % 2 / 2, t.x = Math.floor(t.x || this.x || 0) + i, t.y = Math.floor(t.y || this.y || 0) + i, t.width = Math.floor((t.width || this.width || 0) - 2 * i), t.height = Math.floor((t.height || this.height || 0) - 2 * i), P(t.strokeWidth) && (t.strokeWidth = e), t
            },
            css: function(t) {
                var e, i, n = this.styles,
                    o = {},
                    r = this.element,
                    s = "",
                    a = !n,
                    l = ["textOutline", "textOverflow", "width"];
                return t && t.color && (t.fill = t.color), n && q(t, function(t, e) {
                    t !== n[e] && (o[e] = t, a = !0)
                }), a && (n && (t = R(n, o)), t && (null === t.width || "auto" === t.width ? delete this.textWidth : "text" === r.nodeName.toLowerCase() && t.width && (e = this.textWidth = U(t.width))), this.styles = t, e && !Y && this.renderer.forExport && delete t.width, r.namespaceURI === this.SVG_NS ? (i = function(t, e) {
                    return "-" + e.toLowerCase()
                }, q(t, function(t, e) {
                    -1 === M(e, l) && (s += e.replace(/([A-Z])/g, i) + ":" + t + ";")
                }), s && E(r, "style", s)) : A(r, t), this.added && ("text" === this.element.nodeName && this.renderer.buildText(this), t && t.textOutline && this.applyTextOutline(t.textOutline))), this
            },
            strokeWidth: function() {
                return this["stroke-width"] || 0
            },
            on: function(t, e) {
                var i = this,
                    n = i.element;
                return S && "click" === t ? (n.ontouchstart = function(t) {
                    i.touchEventFired = Date.now(), t.preventDefault(), e.call(n, t)
                }, n.onclick = function(t) {
                    (-1 === Q.navigator.userAgent.indexOf("Android") || 1100 < Date.now() - (i.touchEventFired || 0)) && e.call(n, t)
                }) : n["on" + t] = e, this
            },
            setRadialReference: function(t) {
                var e = this.renderer.gradients[this.element.gradient];
                return this.element.radialReference = t, e && e.radAttr && e.animate(this.renderer.getRadialAttr(t, e.radAttr)), this
            },
            translate: function(t, e) {
                return this.attr({
                    translateX: t,
                    translateY: e
                })
            },
            invert: function(t) {
                return this.inverted = t, this.updateTransform(), this
            },
            updateTransform: function() {
                var t = this.translateX || 0,
                    e = this.translateY || 0,
                    i = this.scaleX,
                    n = this.scaleY,
                    o = this.inverted,
                    r = this.rotation,
                    s = this.matrix,
                    a = this.element;
                o && (t += this.width, e += this.height), t = [
                    "translate(" + t + "," + e + ")"
                ], P(s) && t.push("matrix(" + s.join(",") + ")"), o ? t.push("rotate(90) scale(-1,1)") : r && t.push("rotate(" + r + " " + G(this.rotationOriginX, a.getAttribute("x"), 0) + " " + G(this.rotationOriginY, a.getAttribute("y") || 0) + ")"), (P(i) || P(n)) && t.push("scale(" + G(i, 1) + " " + G(n, 1) + ")"), t.length && a.setAttribute("transform", t.join(" "))
            },
            toFront: function() {
                var t = this.element;
                return t.parentNode.appendChild(t), this
            },
            align: function(t, e, i) {
                var n, o, r, s, a, l, h = {};
                return r = (o = this.renderer).alignedObjects, t ? (this.alignOptions = t, this.alignByTranslate = e, (!i || B(i)) && (this.alignTo = n = i || "renderer", C(r, this), r.push(this), i = null)) : (t = this.alignOptions, e = this.alignByTranslate, n = this.alignTo), i = G(i, o[n], o), n = t.align, o = t.verticalAlign, r = (i.x || 0) + (t.x || 0), s = (i.y || 0) + (t.y || 0), "right" === n ? a = 1 : "center" === n && (a = 2), a && (r += (i.width - (t.width || 0)) / a), h[e ? "translateX" : "x"] = Math.round(r), "bottom" === o ? l = 1 : "middle" === o && (l = 2), l && (s += (i.height - (t.height || 0)) / l), h[e ? "translateY" : "y"] = Math.round(s), this[this.placed ? "animate" : "attr"](h), this.placed = !0, this.alignAttr = h, this
            },
            getBBox: function(t, e) {
                var i, n, o, r, s, a = this.renderer,
                    l = this.element,
                    h = this.styles,
                    c = this.textStr,
                    u = a.cache,
                    d = a.cacheKeys;
                if (n = (e = G(e, this.rotation)) * w, o = h && h.fontSize, P(c) && (-1 === (s = c.toString()).indexOf("<") && (s = s.replace(/[0-9]/g, "0")), s += ["", e || 0, o, this.textWidth, h && h.textOverflow].join()), s && !t && (i = u[s]), !i) {
                    if (l.namespaceURI === this.SVG_NS || a.forExport) {
                        try {
                            (r = this.fakeTS && function(e) {
                                N(l.querySelectorAll(".highcharts-text-outline"), function(t) {
                                    t.style.display = e
                                })
                            }) && r("none"), i = l.getBBox ? R({}, l.getBBox()) : {
                                width: l.offsetWidth,
                                height: l.offsetHeight
                            }, r && r("")
                        } catch (p) {}(!i || i.width < 0) && (i = {
                            width: 0,
                            height: 0
                        })
                    } else i = this.htmlGetBBox();
                    if (a.isSVG && (t = i.width, a = i.height, h && "11px" === h.fontSize && 17 === Math.round(a) && (i.height = a = 14), e && (i.width = Math.abs(a * Math.sin(n)) + Math.abs(t * Math.cos(n)), i.height = Math.abs(a * Math.cos(n)) + Math.abs(t * Math.sin(n)))), s && 0 < i.height) {
                        for (; 250 < d.length;) delete u[d.shift()];
                        u[s] || d.push(s), u[s] = i
                    }
                }
                return i
            },
            show: function(t) {
                return this.attr({
                    visibility: t ? "inherit" : "visible"
                })
            },
            hide: function() {
                return this.attr({
                    visibility: "hidden"
                })
            },
            fadeOut: function(t) {
                var e = this;
                e.animate({
                    opacity: 0
                }, {
                    duration: t || 150,
                    complete: function() {
                        e.attr({
                            y: -9999
                        })
                    }
                })
            },
            add: function(t) {
                var e, i = this.renderer,
                    n = this.element;
                return t && (this.parentGroup = t), this.parentInverted = t && t.inverted, void 0 !== this.textStr && i.buildText(this), this.added = !0, (!t || t.handleZ || this.zIndex) && (e = this.zIndexSetter()), e || (t ? t.element : i.box).appendChild(n), this.onAdd && this.onAdd(), this
            },
            safeRemoveChild: function(t) {
                var e = t.parentNode;
                e && e.removeChild(t)
            },
            destroy: function() {
                var i = this,
                    t = i.element || {},
                    e = i.renderer.isSVG && "SPAN" === t.nodeName && i.parentGroup,
                    n = t.ownerSVGElement,
                    o = i.clipPath;
                if (t.onclick = t.onmouseout = t.onmouseover = t.onmousemove = t.point = null, X(i), o && n && (N(n.querySelectorAll("[clip-path],[CLIP-PATH]"), function(t) {
                        var e = t.getAttribute("clip-path"),
                            i = o.element.id;
                        (-1 < e.indexOf("(#" + i + ")") || -1 < e.indexOf('("#' + i + '")')) && t.removeAttribute("clip-path")
                    }), i.clipPath = o.destroy()), i.stops) {
                    for (n = 0; n < i.stops.length; n++) i.stops[n] = i.stops[n].destroy();
                    i.stops = null
                }
                for (i.safeRemoveChild(t), i.destroyShadows(); e && e.div && 0 === e.div.childNodes.length;) t = e.parentGroup, i.safeRemoveChild(e.div), delete e.div, e = t;
                return i.alignTo && C(i.renderer.alignedObjects, i), q(i, function(t, e) {
                    delete i[e]
                }), null
            },
            shadow: function(t, e, i) {
                var n, o, r, s, a, l, h = [],
                    c = this.element;
                if (t) {
                    if (!this.shadows) {
                        for (s = G(t.width, 3), a = (t.opacity || .15) / s, l = this.parentInverted ? "(-1,-1)" : "(" + G(t.offsetX, 1) + ", " + G(t.offsetY, 1) + ")", n = 1; n <= s; n++) o = c.cloneNode(0), r = 2 * s + 1 - 2 * n, E(o, {
                            isShadow: "true",
                            stroke: t.color || "#000000",
                            "stroke-opacity": a * n,
                            "stroke-width": r,
                            transform: "translate" + l,
                            fill: "none"
                        }), i && (E(o, "height", Math.max(E(o, "height") - r, 0)), o.cutHeight = r), e ? e.element.appendChild(o) : c.parentNode && c.parentNode.insertBefore(o, c), h.push(o);
                        this.shadows = h
                    }
                } else this.destroyShadows();
                return this
            },
            destroyShadows: function() {
                N(this.shadows || [], function(t) {
                    this.safeRemoveChild(t)
                }, this), this.shadows = void 0
            },
            xGetter: function(t) {
                return "circle" === this.element.nodeName && ("x" === t ? t = "cx" : "y" === t && (t = "cy")), this._defaultGetter(t)
            },
            _defaultGetter: function(t) {
                return t = G(this[t + "Value"], this[t], this.element ? this.element.getAttribute(t) : null, 0), /^[\-0-9\.]+$/.test(t) && (t = parseFloat(t)), t
            },
            dSetter: function(t, e, i) {
                t && t.join && (t = t.join(" ")), /(NaN| {2}|^$)/.test(t) && (t = "M 0 0"), this[e] !== t && (i.setAttribute(e, t), this[e] = t)
            },
            dashstyleSetter: function(t) {
                var e, i = this["stroke-width"];
                if ("inherit" === i && (i = 1), t = t && t.toLowerCase()) {
                    for (e = (t = t.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(",")).length; e--;) t[e] = U(t[e]) * i;
                    t = t.join(",").replace(/NaN/g, "none"), this.element.setAttribute("stroke-dasharray", t)
                }
            },
            alignSetter: function(t) {
                this.alignValue = t, this.element.setAttribute("text-anchor", {
                    left: "start",
                    center: "middle",
                    right: "end"
                }[t])
            },
            opacitySetter: function(t, e, i) {
                this[e] = t, i.setAttribute(e, t)
            },
            titleSetter: function(t) {
                var e = this.element.getElementsByTagName("title")[0];
                e || (e = k.createElementNS(this.SVG_NS, "title"), this.element.appendChild(e)), e.firstChild && e.removeChild(e.firstChild), e.appendChild(k.createTextNode(String(G(t), "").replace(/<[^>]*>/g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">")))
            },
            textSetter: function(t) {
                t !== this.textStr && (delete this.bBox, this.textStr = t, this.added && this.renderer.buildText(this))
            },
            fillSetter: function(t, e, i) {
                "string" == typeof t ? i.setAttribute(e, t) : t && this.complexColor(t, e, i)
            },
            visibilitySetter: function(t, e, i) {
                "inherit" === t ? i.removeAttribute(e) : this[e] !== t && i.setAttribute(e, t), this[e] = t
            },
            zIndexSetter: function(t, e) {
                var i, n, o, r, s = this.renderer,
                    a = this.parentGroup,
                    l = (a || s).element || s.box,
                    h = this.element;
                if (s = l === s.box, i = this.added, P(t) ? (h.setAttribute("data-z-index", t), t = +t, this[e] === t && (i = !1)) : P(this[e]) && h.removeAttribute("data-z-index"), this[e] = t, i) {
                    for ((t = this.zIndex) && a && (a.handleZ = !0), r = (e = l.childNodes).length - 1; 0 <= r && !n; r--) i = (a = e[r]).getAttribute("data-z-index"), o = !P(i), a !== h && (t < 0 && o && !s && !r ? (l.insertBefore(h, e[r]), n = !0) : (U(i) <= t || o && (!P(t) || 0 <= t)) && (l.insertBefore(h, e[r + 1] || null), n = !0));
                    n || (l.insertBefore(h, e[s ? 3 : 0] || null), n = !0)
                }
                return n
            },
            _defaultSetter: function(t, e, i) {
                i.setAttribute(e, t)
            }
        }), I.prototype.yGetter = I.prototype.xGetter, I.prototype.translateXSetter = I.prototype.translateYSetter = I.prototype.rotationSetter = I.prototype.verticalAlignSetter = I.prototype.rotationOriginXSetter = I.prototype.rotationOriginYSetter = I.prototype.scaleXSetter = I.prototype.scaleYSetter = I.prototype.matrixSetter = function(t, e) {
            this[e] = t, this.doTransform = !0
        }, I.prototype["stroke-widthSetter"] = I.prototype.strokeSetter = function(t, e, i) {
            this[e] = t, this.stroke && this["stroke-width"] ? (I.prototype.fillSetter.call(this, this.stroke, "stroke", i), i.setAttribute("stroke-width", this["stroke-width"]), this.hasStroke = !0) : "stroke-width" === e && 0 === t && this.hasStroke && (i.removeAttribute("stroke"), this.hasStroke = !1)
        }, g = D.SVGRenderer = function() {
            this.init.apply(this, arguments)
        }, R(g.prototype, {
            Element: I,
            SVG_NS: K,
            init: function(t, e, i, n, o, r) {
                var s, a;
                s = (n = this.createElement("svg").attr({
                    version: "1.1",
                    "class": "highcharts-root"
                }).css(this.getStyle(n))).element, t.appendChild(s), E(t, "dir", "ltr"), -1 === t.innerHTML.indexOf("xmlns") && E(s, "xmlns", this.SVG_NS), this.isSVG = !0, this.box = s, this.boxWrapper = n, this.alignedObjects = [], this.url = (L || W) && k.getElementsByTagName("base").length ? Q.location.href.split("#")[0].replace(/<[^>]*>/g, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20") : "", this.createElement("desc").add().element.appendChild(k.createTextNode("Created with Highcharts 6.1.2")), this.defs = this.createElement("defs").add(), this.allowHTML = r, this.forExport = o, this.gradients = {}, this.cache = {}, this.cacheKeys = [], this.imgCount = 0, this.setSize(e, i, !1), L && t.getBoundingClientRect && ((e = function() {
                    A(t, {
                        left: 0,
                        top: 0
                    }), a = t.getBoundingClientRect(), A(t, {
                        left: Math.ceil(a.left) - a.left + "px",
                        top: Math.ceil(a.top) - a.top + "px"
                    })
                })(), this.unSubPixelFix = m(Q, "resize", e))
            },
            getStyle: function(t) {
                return this.style = R({
                    fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
                    fontSize: "12px"
                }, t)
            },
            setStyle: function(t) {
                this.boxWrapper.css(this.getStyle(t))
            },
            isHidden: function() {
                return !this.boxWrapper.getBBox().width
            },
            destroy: function() {
                var t = this.defs;
                return this.box = null, this.boxWrapper = this.boxWrapper.destroy(), T(this.gradients || {}), this.gradients = null, t && (this.defs = t.destroy()), this.unSubPixelFix && this.unSubPixelFix(), this.alignedObjects = null
            },
            createElement: function(t) {
                var e = new this.Element;
                return e.init(this, t), e
            },
            draw: F,
            getRadialAttr: function(t, e) {
                return {
                    cx: t[0] - t[2] / 2 + e.cx * t[2],
                    cy: t[1] - t[2] / 2 + e.cy * t[2],
                    r: e.r * t[2]
                }
            },
            getSpanWidth: function(t) {
                return t.getBBox(!0).width
            },
            applyEllipsis: function(t, e, i, n) {
                var o, r, s = t.rotation,
                    a = i,
                    l = 0,
                    h = i.length,
                    c = function(t) {
                        e.removeChild(e.firstChild), t && e.appendChild(k.createTextNode(t))
                    };
                if (t.rotation = 0, r = n < (a = this.getSpanWidth(t, e))) {
                    for (; l <= h;) o = Math.ceil((l + h) / 2), c(a = i.substring(0, o) + "\u2026"), a = this.getSpanWidth(t, e), l === h ? l = h + 1 : n < a ? h = o - 1 : l = o;
                    0 === h && c("")
                }
                return t.rotation = s, r
            },
            escapes: {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                "'": "&#39;",
                '"': "&quot;"
            },
            buildText: function(d) {
                var p, t, f, g = d.element,
                    m = this,
                    v = m.forExport,
                    e = G(d.textStr, "").toString(),
                    i = -1 !== e.indexOf("<"),
                    n = g.childNodes,
                    y = E(g, "x"),
                    o = d.styles,
                    b = d.textWidth,
                    r = o && o.lineHeight,
                    s = o && o.textOutline,
                    x = o && "ellipsis" === o.textOverflow,
                    w = o && "nowrap" === o.whiteSpace,
                    a = o && o.fontSize,
                    l = n.length,
                    T = (o = b && !d.added && this.box, function(t) {
                        var e;
                        return e = /(px|em)$/.test(t && t.style.fontSize) ? t.style.fontSize : a || m.style.fontSize || 12, r ? U(r) : m.fontMetrics(e, t.getAttribute("style") ? t : g).h
                    }),
                    C = function(i, n) {
                        return q(m.escapes, function(t, e) {
                            n && -1 !== M(t, n) || (i = i.toString().replace(new RegExp(t, "g"), e))
                        }), i
                    },
                    S = function(t, e) {
                        var i;
                        if (i = t.indexOf("<"), -1 !== (i = (t = t.substring(i, t.indexOf(">") - i)).indexOf(e + "=")) && (i = i + e.length + 1, '"' === (e = t.charAt(i)) || "'" === e)) return (t = t.substring(i + 1)).substring(0, t.indexOf(e))
                    };
                if ((t = [e, x, w, r, s, a, b].join()) !== d.textCache) {
                    for (d.textCache = t; l--;) g.removeChild(n[l]);
                    i || s || x || b || -1 !== e.indexOf(" ") ? (o && o.appendChild(g), e = i ? e.replace(/<(b|strong)>/g, '<span style="font-weight:bold">').replace(/<(i|em)>/g, '<span style="font-style:italic">').replace(/<a/g, "<span").replace(/<\/(b|strong|i|em|a)>/g, "</span>").split(/<br.*?>/g) : [e], e = _(e, function(t) {
                        return "" !== t
                    }), N(e, function(t, h) {
                        var c, u = 0;
                        t = t.replace(/^\s+|\s+$/g, "").replace(/<span/g, "|||<span").replace(/<\/span>/g, "</span>|||"), c = t.split("|||"), N(c, function(t) {
                            if ("" !== t || 1 === c.length) {
                                var e, i, n = {},
                                    o = k.createElementNS(m.SVG_NS, "tspan");
                                if ((e = S(t, "class")) && E(o, "class", e), (e = S(t, "style")) && (e = e.replace(/(;| |^)color([ :])/, "$1fill$2"), E(o, "style", e)), (i = S(t, "href")) && !v && (E(o, "onclick", 'location.href="' + i + '"'), E(o, "class", "highcharts-anchor"), A(o, {
                                        cursor: "pointer"
                                    })), " " !== (t = C(t.replace(/<[a-zA-Z\/](.|\n)*?>/g, "") || " "))) {
                                    if (o.appendChild(k.createTextNode(t)), u ? n.dx = 0 : h && null !== y && (n.x = y), E(o, n), g.appendChild(o), !u && f && (!Y && v && A(o, {
                                            display: "block"
                                        }), E(o, "dy", T(o))), b) {
                                        n = t.replace(/([^\^])-/g, "$1- ").split(" "), i = 1 < c.length || h || 1 < n.length && !w;
                                        var r, s = [],
                                            a = T(o),
                                            l = d.rotation;
                                        for (x && (p = m.applyEllipsis(d, o, t, b)); !x && i && (n.length || s.length);) d.rotation = 0, r = m.getSpanWidth(d, o), t = b < r, void 0 === p && (p = t), t && 1 !== n.length ? (o.removeChild(o.firstChild), s.unshift(n.pop())) : (n = s, s = [], n.length && !w && (o = k.createElementNS(K, "tspan"), E(o, {
                                            dy: a,
                                            x: y
                                        }), e && E(o, "style", e), g.appendChild(o)), b < r && (b = r + 1)), n.length && o.appendChild(k.createTextNode(n.join(" ").replace(/- /g, "-")));
                                        d.rotation = l
                                    }
                                    u++
                                }
                            }
                        }), f = f || g.childNodes.length
                    }), x && p && d.attr("title", C(d.textStr, ["&lt;", "&gt;"])), o && o.removeChild(g), s && d.applyTextOutline && d.applyTextOutline(s)) : g.appendChild(k.createTextNode(C(e)))
                }
            },
            getContrast: function(t) {
                return (t = b(t).rgba)[0] *= 1, t[1] *= 1.2, t[2] *= .5, 459 < t[0] + t[1] + t[2] ? "#000000" : "#FFFFFF"
            },
            button: function(t, e, i, n, o, r, s, a, l) {
                var h, c, u, d, p = this.label(t, e, i, l, null, null, null, null, "button"),
                    f = 0;
                return p.attr(j({
                    padding: 8,
                    r: 2
                }, o)), o = j({
                    fill: "#f7f7f7",
                    stroke: "#cccccc",
                    "stroke-width": 1,
                    style: {
                        color: "#333333",
                        cursor: "pointer",
                        fontWeight: "normal"
                    }
                }, o), h = o.style, delete o.style, r = j(o, {
                    fill: "#e6e6e6"
                }, r), c = r.style, delete r.style, s = j(o, {
                    fill: "#e6ebf5",
                    style: {
                        color: "#000000",
                        fontWeight: "bold"
                    }
                }, s), u = s.style, delete s.style, a = j(o, {
                    style: {
                        color: "#cccccc"
                    }
                }, a), d = a.style, delete a.style, m(p.element, H ? "mouseover" : "mouseenter", function() {
                    3 !== f && p.setState(1)
                }), m(p.element, H ? "mouseout" : "mouseleave", function() {
                    3 !== f && p.setState(f)
                }), p.setState = function(t) {
                    1 !== t && (p.state = f = t), p.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-" + ["normal", "hover", "pressed", "disabled"][t || 0]), p.attr([o, r, s, a][t || 0]).css([h, c, u, d][t || 0])
                }, p.attr(o).css(R({
                    cursor: "default"
                }, h)), p.on("click", function(t) {
                    3 !== f && n.call(p, t)
                })
            },
            crispLine: function(t, e) {
                return t[1] === t[4] && (t[1] = t[4] = Math.round(t[1]) - e % 2 / 2), t[2] === t[5] && (t[2] = t[5] = Math.round(t[2]) + e % 2 / 2), t
            },
            path: function(t) {
                var e = {
                    fill: "none"
                };
                return O(t) ? e.d = t : z(t) && R(e, t), this.createElement("path").attr(e)
            },
            circle: function(t, e, i) {
                return t = z(t) ? t : {
                    x: t,
                    y: e,
                    r: i
                }, (e = this.createElement("circle")).xSetter = e.ySetter = function(t, e, i) {
                    i.setAttribute("c" + e, t)
                }, e.attr(t)
            },
            arc: function(t, e, i, n, o, r) {
                return z(t) ? (e = (n = t).y, i = n.r, t = n.x) : n = {
                    innerR: n,
                    start: o,
                    end: r
                }, (t = this.symbol("arc", t, e, i, i, n)).r = i, t
            },
            rect: function(t, e, i, n, o, r) {
                o = z(t) ? t.r : o;
                var s = this.createElement("rect");
                return t = z(t) ? t : void 0 === t ? {} : {
                    x: t,
                    y: e,
                    width: Math.max(i, 0),
                    height: Math.max(n, 0)
                }, void 0 !== r && (t.strokeWidth = r, t = s.crisp(t)), t.fill = "none", o && (t.r = o), s.rSetter = function(t, e, i) {
                    E(i, {
                        rx: t,
                        ry: t
                    })
                }, s.attr(t)
            },
            setSize: function(t, e, i) {
                var n = this.alignedObjects,
                    o = n.length;
                for (this.width = t, this.height = e, this.boxWrapper.animate({
                        width: t,
                        height: e
                    }, {
                        step: function() {
                            this.attr({
                                viewBox: "0 0 " + this.attr("width") + " " + this.attr("height")
                            })
                        },
                        duration: G(i, !0) ? void 0 : 0
                    }); o--;) n[o].align()
            },
            g: function(t) {
                var e = this.createElement("g");
                return t ? e.attr({
                    "class": "highcharts-" + t
                }) : e
            },
            image: function(e, t, i, n, o, r) {
                var s, a = {
                        preserveAspectRatio: "none"
                    },
                    l = function(t, e) {
                        t.setAttributeNS ? t.setAttributeNS("http://www.w3.org/1999/xlink", "href", e) : t.setAttribute("hc-svg-href", e)
                    },
                    h = function(t) {
                        l(s.element, e), r.call(s, t)
                    };
                return 1 < arguments.length && R(a, {
                    x: t,
                    y: i,
                    width: n,
                    height: o
                }), s = this.createElement("image").attr(a), r ? (l(s.element, "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="), a = new Q.Image, m(a, "load", h), a.src = e, a.complete && h({})) : l(s.element, e), s
            },
            symbol: function(t, e, i, n, o, r) {
                var s, a, l, h = this,
                    c = /^url\((.*?)\)$/,
                    u = c.test(t),
                    d = !u && (this.symbols[t] ? t : "circle"),
                    p = d && this.symbols[d],
                    f = P(e) && p && p.call(this.symbols, Math.round(e), Math.round(i), n, o, r);
                return p ? ((s = this.path(f)).attr("fill", "none"), R(s, {
                    symbolName: d,
                    x: e,
                    y: i,
                    width: n,
                    height: o
                }), r && R(s, r)) : u && (a = t.match(c)[1], (s = this.image(a)).imgwidth = G($[a] && $[a].width, r && r.width), s.imgheight = G($[a] && $[a].height, r && r.height), l = function() {
                    s.attr({
                        width: s.width,
                        height: s.height
                    })
                }, N(["width", "height"], function(t) {
                    s[t + "Setter"] = function(t, e) {
                        var i = {},
                            n = this["img" + e],
                            o = "width" === e ? "translateX" : "translateY";
                        this[e] = t, P(n) && (this.element && this.element.setAttribute(e, n), this.alignByTranslate || (i[o] = ((this[e] || 0) - n) / 2, this.attr(i)))
                    }
                }), P(e) && s.attr({
                    x: e,
                    y: i
                }), s.isImg = !0, P(s.imgwidth) && P(s.imgheight) ? l() : (s.attr({
                    width: 0,
                    height: 0
                }), x("img", {
                    onload: function() {
                        var t = y[h.chartIndex];
                        0 === this.width && (A(this, {
                            position: "absolute",
                            top: "-999em"
                        }), k.body.appendChild(this)), $[a] = {
                            width: this.width,
                            height: this.height
                        }, s.imgwidth = this.width, s.imgheight = this.height, s.element && l(), this.parentNode && this.parentNode.removeChild(this), h.imgCount--, !h.imgCount && t && t.onload && t.onload()
                    },
                    src: a
                }), this.imgCount++)), s
            },
            symbols: {
                circle: function(t, e, i, n) {
                    return this.arc(t + i / 2, e + n / 2, i / 2, n / 2, {
                        start: 0,
                        end: 2 * Math.PI,
                        open: !1
                    })
                },
                square: function(t, e, i, n) {
                    return ["M", t, e, "L", t + i, e, t + i, e + n, t, e + n, "Z"]
                },
                triangle: function(t, e, i, n) {
                    return ["M", t + i / 2, e, "L", t + i, e + n, t, e + n, "Z"]
                },
                "triangle-down": function(t, e, i, n) {
                    return ["M", t, e, "L", t + i, e, t + i / 2, e + n, "Z"]
                },
                diamond: function(t, e, i, n) {
                    return ["M", t + i / 2, e, "L", t + i, e + n / 2, t + i / 2, e + n, t, e + n / 2, "Z"]
                },
                arc: function(t, e, i, n, o) {
                    var r = o.start,
                        s = o.r || i,
                        a = o.r || n || i,
                        l = o.end - .001;
                    i = o.innerR, n = G(o.open, Math.abs(o.end - o.start - 2 * Math.PI) < .001);
                    var h = Math.cos(r),
                        c = Math.sin(r),
                        u = Math.cos(l);
                    return l = Math.sin(l), s = ["M", t + s * h, e + a * c, "A", s, a, 0, o = o.end - r - Math.PI < .001 ? 0 : 1, 1, t + s * u, e + a * l], P(i) && s.push(n ? "M" : "L", t + i * u, e + i * l, "A", i, i, 0, o, 0, t + i * h, e + i * c), s.push(n ? "" : "Z"), s
                },
                callout: function(t, e, i, n, o) {
                    var r, s = Math.min(o && o.r || 0, i, n),
                        a = s + 6,
                        l = o && o.anchorX;
                    return o = o && o.anchorY, r = ["M", t + s, e, "L", t + i - s, e, "C", t + i, e, t + i, e, t + i, e + s, "L", t + i, e + n - s, "C", t + i, e + n, t + i, e + n, t + i - s, e + n, "L", t + s, e + n, "C", t, e + n, t, e + n, t, e + n - s, "L", t, e + s, "C", t, e, t, e, t + s, e], l && i < l ? e + a < o && o < e + n - a ? r.splice(13, 3, "L", t + i, o - 6, t + i + 6, o, t + i, o + 6, t + i, e + n - s) : r.splice(13, 3, "L", t + i, n / 2, l, o, t + i, n / 2, t + i, e + n - s) : l && l < 0 ? e + a < o && o < e + n - a ? r.splice(33, 3, "L", t, o + 6, t - 6, o, t, o - 6, t, e + s) : r.splice(33, 3, "L", t, n / 2, l, o, t, n / 2, t, e + s) : o && n < o && t + a < l && l < t + i - a ? r.splice(23, 3, "L", l + 6, e + n, l, e + n + 6, l - 6, e + n, t + s, e + n) : o && o < 0 && t + a < l && l < t + i - a && r.splice(3, 3, "L", l - 6, e, l, e - 6, l + 6, e, i - s, e), r
                }
            },
            clipRect: function(t, e, i, n) {
                var o = D.uniqueKey(),
                    r = this.createElement("clipPath").attr({
                        id: o
                    }).add(this.defs);
                return (t = this.rect(t, e, i, n, 0).add(r)).id = o, t.clipPath = r, t.count = 0, t
            },
            text: function(t, e, i, n) {
                var o = {};
                return !n || !this.allowHTML && this.forExport ? (o.x = Math.round(e || 0), i && (o.y = Math.round(i)), (t || 0 === t) && (o.text = t), t = this.createElement("text").attr(o), n || (t.xSetter = function(t, e, i) {
                    var n, o, r = i.getElementsByTagName("tspan"),
                        s = i.getAttribute(e);
                    for (o = 0; o < r.length; o++)(n = r[o]).getAttribute(e) === s && n.setAttribute(e, t);
                    i.setAttribute(e, t)
                }), t) : this.html(t, e, i)
            },
            fontMetrics: function(t, e) {
                return t = t || e && e.style && e.style.fontSize || this.style && this.style.fontSize, {
                    h: e = (t = /px/.test(t) ? U(t) : /em/.test(t) ? parseFloat(t) * (e ? this.fontMetrics(null, e.parentNode).f : 16) : 12) < 24 ? t + 3 : Math.round(1.2 * t),
                    b: Math.round(.8 * e),
                    f: t
                }
            },
            rotCorr: function(t, e, i) {
                var n = t;
                return e && i && (n = Math.max(n * Math.cos(e * w), 4)), {
                    x: -t / 3 * Math.sin(e * w),
                    y: n
                }
            },
            label: function(t, e, i, n, o, r, s, a, l) {
                var h, c, u, d, p, f, g, m, v, y, b, x, w, T = this,
                    C = T.g("button" !== l && "label"),
                    S = C.text = T.text("", 0, 0, s).attr({
                        zIndex: 1
                    }),
                    E = 0,
                    A = 3,
                    k = 0,
                    _ = {},
                    M = /^url\((.*?)\)$/.test(n),
                    O = M;
                l && C.addClass("highcharts-" + l), O = M, y = function() {
                    return (m || 0) % 2 / 2
                }, b = function() {
                    var t = S.element.style,
                        e = {};
                    c = (void 0 === u || void 0 === d || g) && P(S.textStr) && S.getBBox(), C.width = (u || c.width || 0) + 2 * A + k, C.height = (d || c.height || 0) + 2 * A, v = A + T.fontMetrics(t && t.fontSize, S).b, O && (h || (C.box = h = T.symbols[n] || M ? T.symbol(n) : T.rect(), h.addClass(("button" === l ? "" : "highcharts-label-box") + (l ? " highcharts-" + l + "-box" : "")), h.add(C), t = y(), e.x = t, e.y = (a ? -v : 0) + t), e.width = Math.round(C.width), e.height = Math.round(C.height), h.attr(R(e, _)), _ = {})
                }, x = function() {
                    var t, e = k + A;
                    t = a ? 0 : v, P(u) && c && ("center" === g || "right" === g) && (e += {
                        center: .5,
                        right: 1
                    }[g] * (u - c.width)), e === S.x && t === S.y || (S.attr("x", e), S.hasBoxWidthChanged && (c = S.getBBox(!0), b()), void 0 !== t && S.attr("y", t)), S.x = e, S.y = t
                }, w = function(t, e) {
                    h ? h.attr(t, e) : _[t] = e
                }, C.onAdd = function() {
                    S.add(C), C.attr({
                        text: t || 0 === t ? t : "",
                        x: e,
                        y: i
                    }), h && P(o) && C.attr({
                        anchorX: o,
                        anchorY: r
                    })
                }, C.widthSetter = function(t) {
                    u = D.isNumber(t) ? t : null
                }, C.heightSetter = function(t) {
                    d = t
                }, C["text-alignSetter"] = function(t) {
                    g = t
                }, C.paddingSetter = function(t) {
                    P(t) && t !== A && (A = C.padding = t, x())
                }, C.paddingLeftSetter = function(t) {
                    P(t) && t !== k && (k = t, x())
                }, C.alignSetter = function(t) {
                    (t = {
                        left: 0,
                        center: .5,
                        right: 1
                    }[t]) !== E && (E = t, c && C.attr({
                        x: p
                    }))
                }, C.textSetter = function(t) {
                    void 0 !== t && S.textSetter(t), b(), x()
                }, C["stroke-widthSetter"] = function(t, e) {
                    t && (O = !0), m = this["stroke-width"] = t, w(e, t)
                }, C.strokeSetter = C.fillSetter = C.rSetter = function(t, e) {
                    "r" !== e && ("fill" === e && t && (O = !0), C[e] = t), w(e, t)
                }, C.anchorXSetter = function(t, e) {
                    o = C.anchorX = t, w(e, Math.round(t) - y() - p)
                }, C.anchorYSetter = function(t, e) {
                    r = C.anchorY = t, w(e, t - f)
                }, C.xSetter = function(t) {
                    C.x = t, E && (t -= E * ((u || c.width) + 2 * A), C["forceAnimate:x"] = !0), p = Math.round(t), C.attr("translateX", p)
                }, C.ySetter = function(t) {
                    f = C.y = Math.round(t), C.attr("translateY", f)
                };
                var L = C.css;
                return R(C, {
                    css: function(e) {
                        if (e) {
                            var i = {};
                            e = j(e), N(C.textProps, function(t) {
                                void 0 !== e[t] && (i[t] = e[t], delete e[t])
                            }), S.css(i), "width" in i && b()
                        }
                        return L.call(C, e)
                    },
                    getBBox: function() {
                        return {
                            width: c.width + 2 * A,
                            height: c.height + 2 * A,
                            x: c.x - A,
                            y: c.y - A
                        }
                    },
                    shadow: function(t) {
                        return t && (b(), h && h.shadow(t)), C
                    },
                    destroy: function() {
                        V(C.element, "mouseenter"), V(C.element, "mouseleave"), S && (S = S.destroy()), h && (h = h.destroy()), I.prototype.destroy.call(C), C = T = b = x = w = null
                    }
                })
            }
        }), D.Renderer = g, J = (Z = It).attr, tt = Z.createElement, et = Z.css, it = Z.defined, nt = Z.each, ot = Z.extend, rt = Z.isFirefox, st = Z.isMS, at = Z.isWebKit, lt = Z.pick, ht = Z.pInt, ct = Z.SVGRenderer, ut = Z.win, dt = Z.wrap, ot(Z.SVGElement.prototype, {
            htmlCss: function(t) {
                var e = this.element;
                return ((e = t && "SPAN" === e.tagName && t.width) || this.textWidth && !e) && (delete t.width, this.textWidth = e, this.htmlUpdateTransform()), t && "ellipsis" === t.textOverflow && (t.whiteSpace = "nowrap", t.overflow = "hidden"), this.styles = ot(this.styles, t), et(this.element, t), this
            },
            htmlGetBBox: function() {
                var t = this.element;
                return {
                    x: t.offsetLeft,
                    y: t.offsetTop,
                    width: t.offsetWidth,
                    height: t.offsetHeight
                }
            },
            htmlUpdateTransform: function() {
                if (this.added) {
                    var e = this.renderer,
                        i = this.element,
                        n = this.translateX || 0,
                        o = this.translateY || 0,
                        t = this.x || 0,
                        r = this.y || 0,
                        s = this.textAlign || "left",
                        a = {
                            left: 0,
                            center: .5,
                            right: 1
                        }[s],
                        l = (c = this.styles) && c.whiteSpace;
                    if (et(i, {
                            marginLeft: n,
                            marginTop: o
                        }), this.shadows && nt(this.shadows, function(t) {
                            et(t, {
                                marginLeft: n + 1,
                                marginTop: o + 1
                            })
                        }), this.inverted && nt(i.childNodes, function(t) {
                            e.invertChild(t, i)
                        }), "SPAN" === i.tagName) {
                        var h, c = this.rotation,
                            u = this.textWidth && ht(this.textWidth),
                            d = [c, s, i.innerHTML, this.textWidth, this.textAlign].join();
                        (h = u !== this.oldTextWidth) && !(h = u > this.oldTextWidth) && ((h = this.textPxLength) || (et(i, {
                            width: "",
                            whiteSpace: l || "nowrap"
                        }), h = i.offsetWidth), h = u < h), h && /[ \-]/.test(i.textContent || i.innerText) ? (et(i, {
                            width: u + "px",
                            display: "block",
                            whiteSpace: l || "normal"
                        }), this.oldTextWidth = u, this.hasBoxWidthChanged = !0) : this.hasBoxWidthChanged = !1, d !== this.cTT && (l = e.fontMetrics(i.style.fontSize).b, !it(c) || c === (this.oldRotation || 0) && s === this.oldAlign || this.setSpanRotation(c, a, l), this.getSpanCorrection(!it(c) && this.textPxLength || i.offsetWidth, l, a, c, s)), et(i, {
                            left: t + (this.xCorr || 0) + "px",
                            top: r + (this.yCorr || 0) + "px"
                        }), this.cTT = d, this.oldRotation = c, this.oldAlign = s
                    }
                } else this.alignOnAdd = !0
            },
            setSpanRotation: function(t, e, i) {
                var n = {},
                    o = this.renderer.getTransformKey();
                n[o] = n.transform = "rotate(" + t + "deg)", n[o + (rt ? "Origin" : "-origin")] = n.transformOrigin = 100 * e + "% " + i + "px", et(this.element, n)
            },
            getSpanCorrection: function(t, e, i) {
                this.xCorr = -t * i, this.yCorr = -e
            }
        }), ot(ct.prototype, {
            getTransformKey: function() {
                return st && !/Edge/.test(ut.navigator.userAgent) ? "-ms-transform" : at ? "-webkit-transform" : rt ? "MozTransform" : ut.opera ? "-o-transform" : ""
            },
            html: function(t, e, i) {
                var l = this.createElement("span"),
                    n = l.element,
                    o = l.renderer,
                    r = o.isSVG,
                    h = function(e, o) {
                        nt(["opacity", "visibility"], function(t) {
                            dt(e, t + "Setter", function(t, e, i, n) {
                                t.call(this, e, i, n), o[i] = e
                            })
                        }), e.addedSetters = !0
                    };
                return l.textSetter = function(t) {
                    t !== n.innerHTML && delete this.bBox, this.textStr = t, n.innerHTML = lt(t, ""), l.doTransform = !0
                }, r && h(l, l.element.style), l.xSetter = l.ySetter = l.alignSetter = l.rotationSetter = function(t, e) {
                    "align" === e && (e = "textAlign"), l[e] = t, l.doTransform = !0
                }, l.afterSetters = function() {
                    this.doTransform && (this.htmlUpdateTransform(), this.doTransform = !1)
                }, l.attr({
                    text: t,
                    x: Math.round(e),
                    y: Math.round(i)
                }).css({
                    fontFamily: this.style.fontFamily,
                    fontSize: this.style.fontSize,
                    position: "absolute"
                }), n.style.whiteSpace = "nowrap", l.css = l.htmlCss, r && (l.add = function(t) {
                    var r, s = o.box.parentNode,
                        a = [];
                    if (this.parentGroup = t) {
                        if (!(r = t.div)) {
                            for (; t;) a.push(t), t = t.parentGroup;
                            nt(a.reverse(), function(i) {
                                function t(t, e) {
                                    i[e] = t, "translateX" === e ? n.left = t + "px" : n.top = t + "px", i.doTransform = !0
                                }
                                var n, e, o = J(i.element, "class");
                                o && (o = {
                                    className: o
                                }), r = i.div = i.div || tt("div", o, {
                                    position: "absolute",
                                    left: (i.translateX || 0) + "px",
                                    top: (i.translateY || 0) + "px",
                                    display: i.display,
                                    opacity: i.opacity,
                                    pointerEvents: i.styles && i.styles.pointerEvents
                                }, r || s), n = r.style, ot(i, {
                                    classSetter: (e = r, function(t) {
                                        this.element.setAttribute("class", t), e.className = t
                                    }),
                                    on: function() {
                                        return a[0].div && l.on.apply({
                                            element: a[0].div
                                        }, arguments), i
                                    },
                                    translateXSetter: t,
                                    translateYSetter: t
                                }), i.addedSetters || h(i, n)
                            })
                        }
                    } else r = s;
                    return r.appendChild(n), l.added = !0, l.alignOnAdd && l.htmlUpdateTransform(), l
                }), l
            }
        }), ft = (pt = It).defined, gt = pt.each, mt = pt.extend, vt = pt.merge, yt = pt.pick, bt = pt.timeUnits, xt = pt.win, pt.Time = function(t) {
            this.update(t, !1)
        }, pt.Time.prototype = {
            defaultOptions: {},
            update: function(t) {
                var e = yt(t && t.useUTC, !0),
                    o = this;
                this.options = t = vt(!0, this.options || {}, t), this.Date = t.Date || xt.Date, this.timezoneOffset = (this.useUTC = e) && t.timezoneOffset, this.getTimezoneOffset = this.timezoneOffsetFunction(), (this.variableTimezone = !(e && !t.getTimezoneOffset && !t.timezone)) || this.timezoneOffset ? (this.get = function(t, e) {
                    var i = e.getTime(),
                        n = i - o.getTimezoneOffset(e);
                    return e.setTime(n), t = e["getUTC" + t](), e.setTime(i), t
                }, this.set = function(t, e, i) {
                    var n;
                    "Milliseconds" === t || "Seconds" === t || "Minutes" === t && 0 == e.getTimezoneOffset() % 60 ? e["set" + t](i) : (n = o.getTimezoneOffset(e), n = e.getTime() - n, e.setTime(n), e["setUTC" + t](i), t = o.getTimezoneOffset(e), n = e.getTime() + t, e.setTime(n))
                }) : e ? (this.get = function(t, e) {
                    return e["getUTC" + t]()
                }, this.set = function(t, e, i) {
                    return e["setUTC" + t](i)
                }) : (this.get = function(t, e) {
                    return e["get" + t]()
                }, this.set = function(t, e, i) {
                    return e["set" + t](i)
                })
            },
            makeTime: function(t, e, i, n, o, r) {
                var s, a, l;
                return this.useUTC ? (s = this.Date.UTC.apply(0, arguments), s += a = this.getTimezoneOffset(s), a !== (l = this.getTimezoneOffset(s)) ? s += l - a : a - 36e5 !== this.getTimezoneOffset(s - 36e5) || pt.isSafari || (s -= 36e5)) : s = new this.Date(t, e, yt(i, 1), yt(n, 0), yt(o, 0), yt(r, 0)).getTime(), s
            },
            timezoneOffsetFunction: function() {
                var t = this,
                    e = this.options,
                    i = xt.moment;
                if (!this.useUTC) return function(t) {
                    return 6e4 * new Date(t).getTimezoneOffset()
                };
                if (e.timezone) {
                    if (i) return function(t) {
                        return 6e4 * -i.tz(t, e.timezone).utcOffset()
                    };
                    pt.error(25)
                }
                return this.useUTC && e.getTimezoneOffset ? function(t) {
                    return 6e4 * e.getTimezoneOffset(t)
                } : function() {
                    return 6e4 * (t.timezoneOffset || 0)
                }
            },
            dateFormat: function(i, n, t) {
                if (!pt.defined(n) || isNaN(n)) return pt.defaultOptions.lang.invalidDate || "";
                i = pt.pick(i, "%Y-%m-%d %H:%M:%S");
                var o = this,
                    e = new this.Date(n),
                    r = this.get("Hours", e),
                    s = this.get("Day", e),
                    a = this.get("Date", e),
                    l = this.get("Month", e),
                    h = this.get("FullYear", e),
                    c = pt.defaultOptions.lang,
                    u = c.weekdays,
                    d = c.shortWeekdays,
                    p = pt.pad;
                return e = pt.extend({
                    a: d ? d[s] : u[s].substr(0, 3),
                    A: u[s],
                    d: p(a),
                    e: p(a, 2, " "),
                    w: s,
                    b: c.shortMonths[l],
                    B: c.months[l],
                    m: p(l + 1),
                    o: l + 1,
                    y: h.toString().substr(2, 2),
                    Y: h,
                    H: p(r),
                    k: r,
                    I: p(r % 12 || 12),
                    l: r % 12 || 12,
                    M: p(o.get("Minutes", e)),
                    p: r < 12 ? "AM" : "PM",
                    P: r < 12 ? "am" : "pm",
                    S: p(e.getSeconds()),
                    L: p(Math.round(n % 1e3), 3)
                }, pt.dateFormats), pt.objectEach(e, function(t, e) {
                    for (; - 1 !== i.indexOf("%" + e);) i = i.replace("%" + e, "function" == typeof t ? t.call(o, n) : t)
                }), t ? i.substr(0, 1).toUpperCase() + i.substr(1) : i
            },
            getTimeTicks: function(t, e, i, n) {
                var o, r, s = this,
                    a = [],
                    l = {},
                    h = new s.Date(e),
                    c = t.unitRange,
                    u = t.count || 1;
                if (ft(e)) {
                    s.set("Milliseconds", h, c >= bt.second ? 0 : u * Math.floor(s.get("Milliseconds", h) / u)), c >= bt.second && s.set("Seconds", h, c >= bt.minute ? 0 : u * Math.floor(s.get("Seconds", h) / u)), c >= bt.minute && s.set("Minutes", h, c >= bt.hour ? 0 : u * Math.floor(s.get("Minutes", h) / u)), c >= bt.hour && s.set("Hours", h, c >= bt.day ? 0 : u * Math.floor(s.get("Hours", h) / u)), c >= bt.day && s.set("Date", h, c >= bt.month ? 1 : u * Math.floor(s.get("Date", h) / u)), c >= bt.month && (s.set("Month", h, c >= bt.year ? 0 : u * Math.floor(s.get("Month", h) / u)), o = s.get("FullYear", h)), c >= bt.year && s.set("FullYear", h, o - o % u), c === bt.week && s.set("Date", h, s.get("Date", h) - s.get("Day", h) + yt(n, 1)), o = s.get("FullYear", h), n = s.get("Month", h);
                    var d = s.get("Date", h),
                        p = s.get("Hours", h);
                    for (e = h.getTime(), s.variableTimezone && (r = i - e > 4 * bt.month || s.getTimezoneOffset(e) !== s.getTimezoneOffset(i)), h = h.getTime(), e = 1; h < i;) a.push(h), h = c === bt.year ? s.makeTime(o + e * u, 0) : c === bt.month ? s.makeTime(o, n + e * u) : !r || c !== bt.day && c !== bt.week ? r && c === bt.hour && 1 < u ? s.makeTime(o, n, d, p + e * u) : h + c * u : s.makeTime(o, n, d + e * u * (c === bt.day ? 1 : 7)), e++;
                    a.push(h), c <= bt.hour && a.length < 1e4 && gt(a, function(t) {
                        0 == t % 18e5 && "000000000" === s.dateFormat("%H%M%S%L", t) && (l[t] = "day")
                    })
                }
                return a.info = mt(t, {
                    higherRanks: l,
                    totalRange: c * u
                }), a
            }
        }, Tt = (wt = It).color, Ct = wt.merge, wt.defaultOptions = {
            colors: "#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "),
            symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
            lang: {
                loading: "Loading...",
                months: "January February March April May June July August September October November December".split(" "),
                shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
                weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
                decimalPoint: ".",
                numericSymbols: "kMGTPE".split(""),
                resetZoom: "Reset zoom",
                resetZoomTitle: "Reset zoom level 1:1",
                thousandsSep: " "
            },
            global: {},
            time: wt.Time.prototype.defaultOptions,
            chart: {
                borderRadius: 0,
                defaultSeriesType: "line",
                ignoreHiddenSeries: !0,
                spacing: [10, 10, 15, 10],
                resetZoomButton: {
                    theme: {
                        zIndex: 6
                    },
                    position: {
                        align: "right",
                        x: -10,
                        y: 10
                    }
                },
                width: null,
                height: null,
                borderColor: "#335cad",
                backgroundColor: "#ffffff",
                plotBorderColor: "#cccccc"
            },
            title: {
                text: "Chart title",
                align: "center",
                margin: 15,
                widthAdjust: -44
            },
            subtitle: {
                text: "",
                align: "center",
                widthAdjust: -44
            },
            plotOptions: {},
            labels: {
                style: {
                    position: "absolute",
                    color: "#333333"
                }
            },
            legend: {
                enabled: !0,
                align: "center",
                alignColumns: !0,
                layout: "horizontal",
                labelFormatter: function() {
                    return this.name
                },
                borderColor: "#999999",
                borderRadius: 0,
                navigation: {
                    activeColor: "#003399",
                    inactiveColor: "#cccccc"
                },
                itemStyle: {
                    color: "#333333",
                    fontSize: "12px",
                    fontWeight: "bold",
                    textOverflow: "ellipsis"
                },
                itemHoverStyle: {
                    color: "#000000"
                },
                itemHiddenStyle: {
                    color: "#cccccc"
                },
                shadow: !1,
                itemCheckboxStyle: {
                    position: "absolute",
                    width: "13px",
                    height: "13px"
                },
                squareSymbol: !0,
                symbolPadding: 5,
                verticalAlign: "bottom",
                x: 0,
                y: 0,
                title: {
                    style: {
                        fontWeight: "bold"
                    }
                }
            },
            loading: {
                labelStyle: {
                    fontWeight: "bold",
                    position: "relative",
                    top: "45%"
                },
                style: {
                    position: "absolute",
                    backgroundColor: "#ffffff",
                    opacity: .5,
                    textAlign: "center"
                }
            },
            tooltip: {
                enabled: !0,
                animation: wt.svg,
                borderRadius: 3,
                dateTimeLabelFormats: {
                    millisecond: "%A, %b %e, %H:%M:%S.%L",
                    second: "%A, %b %e, %H:%M:%S",
                    minute: "%A, %b %e, %H:%M",
                    hour: "%A, %b %e, %H:%M",
                    day: "%A, %b %e, %Y",
                    week: "Week from %A, %b %e, %Y",
                    month: "%B %Y",
                    year: "%Y"
                },
                footerFormat: "",
                padding: 8,
                snap: wt.isTouchDevice ? 25 : 10,
                backgroundColor: Tt("#f7f7f7").setOpacity(.85).get(),
                borderWidth: 1,
                headerFormat: '<span style="font-size: 10px">{point.key}</span><br/>',
                pointFormat: '<span style="color:{point.color}">\u25cf</span> {series.name}: <b>{point.y}</b><br/>',
                shadow: !0,
                style: {
                    color: "#333333",
                    cursor: "default",
                    fontSize: "12px",
                    pointerEvents: "none",
                    whiteSpace: "nowrap"
                }
            },
            credits: {
                enabled: !0,
                href: "https://www.highcharts.com",
                position: {
                    align: "right",
                    x: -10,
                    verticalAlign: "bottom",
                    y: -5
                },
                style: {
                    cursor: "pointer",
                    color: "#999999",
                    fontSize: "9px"
                },
                text: "Highcharts.com"
            }
        }, wt.setOptions = function(t) {
            return wt.defaultOptions = Ct(!0, wt.defaultOptions, t), wt.time.update(Ct(wt.defaultOptions.global, wt.defaultOptions.time), !1), wt.defaultOptions
        }, wt.getOptions = function() {
            return wt.defaultOptions
        }, wt.defaultPlotOptions = wt.defaultOptions.plotOptions, wt.time = new wt.Time(Ct(wt.defaultOptions.global, wt.defaultOptions.time)), wt.dateFormat = function(t, e, i) {
            return wt.time.dateFormat(t, e, i)
        }, Et = (St = It).correctFloat, At = St.defined, kt = St.destroyObjectProperties, _t = St.fireEvent, Mt = St.isNumber, Ot = St.merge, Lt = St.pick, Dt = St.deg2rad, St.Tick = function(t, e, i, n) {
            this.axis = t, this.pos = e, this.type = i || "", this.isNewLabel = this.isNew = !0, i || n || this.addLabel()
        }, St.Tick.prototype = {
            addLabel: function() {
                var t, e = this.axis,
                    i = e.options,
                    n = e.chart,
                    o = e.categories,
                    r = e.names,
                    s = this.pos,
                    a = i.labels,
                    l = s === (c = e.tickPositions)[0],
                    h = s === c[c.length - 1],
                    c = (r = o ? Lt(o[s], r[s], s) : s, o = this.label, c.info);
                e.isDatetimeAxis && c && (t = i.dateTimeLabelFormats[c.higherRanks[s] || c.unitName]), i = {
                    axis: e,
                    chart: n,
                    isFirst: this.isFirst = l,
                    isLast: this.isLast = h,
                    dateTimeLabelFormat: t,
                    value: e.isLog ? Et(e.lin2log(r)) : r,
                    pos: s
                }, i = e.labelFormatter.call(i, i), At(o) ? o && o.attr({
                    text: i
                }) : ((this.label = o = At(i) && a.enabled ? n.renderer.text(i, 0, 0, a.useHTML).css(Ot(a.style)).add(e.labelGroup) : null) && (o.textPxLength = o.getBBox().width), this.rotation = 0)
            },
            getLabelSize: function() {
                return this.label ? this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0
            },
            handleOverflow: function(t) {
                var e, i = this.axis,
                    n = i.options.labels,
                    o = t.x,
                    r = i.chart.chartWidth,
                    s = i.chart.spacing,
                    a = Lt(i.labelLeft, Math.min(i.pos, s[3])),
                    l = (s = Lt(i.labelRight, Math.max(i.isRadial ? 0 : i.pos + i.len, r - s[1])), this.label),
                    h = this.rotation,
                    c = {
                        left: 0,
                        center: .5,
                        right: 1
                    }[i.labelAlign || l.attr("align")],
                    u = l.getBBox().width,
                    d = i.getSlotWidth(this),
                    p = d,
                    f = 1,
                    g = {};
                h || !1 === n.overflow ? h < 0 && o - c * u < a ? e = Math.round(o / Math.cos(h * Dt) - a) : 0 < h && s < o + c * u && (e = Math.round((r - o) / Math.cos(h * Dt))) : (r = o + (1 - c) * u, o - c * u < a ? p = t.x + p * (1 - c) - a : s < r && (p = s - t.x + p * c, f = -1), (p = Math.min(d, p)) < d && "center" === i.labelAlign && (t.x += f * (d - p - c * (d - Math.min(u,
                    p)))), (p < u || i.autoRotation && (l.styles || {}).width) && (e = p)), e && (g.width = e, (n.style || {}).textOverflow || (g.textOverflow = "ellipsis"), l.css(g))
            },
            getPosition: function(t, e, i, n) {
                var o = this.axis,
                    r = o.chart,
                    s = n && r.oldChartHeight || r.chartHeight;
                return t = {
                    x: t ? St.correctFloat(o.translate(e + i, null, null, n) + o.transB) : o.left + o.offset + (o.opposite ? (n && r.oldChartWidth || r.chartWidth) - o.right - o.left : 0),
                    y: t ? s - o.bottom + o.offset - (o.opposite ? o.height : 0) : St.correctFloat(s - o.translate(e + i, null, null, n) - o.transB)
                }, _t(this, "afterGetPosition", {
                    pos: t
                }), t
            },
            getLabelPosition: function(t, e, i, n, o, r, s, a) {
                var l = this.axis,
                    h = l.transA,
                    c = l.reversed,
                    u = l.staggerLines,
                    d = l.tickRotCorr || {
                        x: 0,
                        y: 0
                    },
                    p = o.y,
                    f = n || l.reserveSpaceDefault ? 0 : -l.labelOffset * ("center" === l.labelAlign ? .5 : 1),
                    g = {};
                return At(p) || (p = 0 === l.side ? i.rotation ? -8 : -i.getBBox().height : 2 === l.side ? d.y + 8 : Math.cos(i.rotation * Dt) * (d.y - i.getBBox(!1, 0).height / 2)), t = t + o.x + f + d.x - (r && n ? r * h * (c ? -1 : 1) : 0), e = e + p - (r && !n ? r * h * (c ? 1 : -1) : 0), u && (i = s / (a || 1) % u, l.opposite && (i = u - i - 1), e += l.labelOffset / u * i), g.x = t, g.y = Math.round(e), _t(this, "afterGetLabelPosition", {
                    pos: g
                }), g
            },
            getMarkPath: function(t, e, i, n, o, r) {
                return r.crispLine(["M", t, e, "L", t + (o ? 0 : -i), e + (o ? i : 0)], n)
            },
            renderGridLine: function(t, e, i) {
                var n = this.axis,
                    o = n.options,
                    r = this.gridLine,
                    s = {},
                    a = this.pos,
                    l = this.type,
                    h = n.tickmarkOffset,
                    c = n.chart.renderer,
                    u = l ? l + "Grid" : "grid",
                    d = o[u + "LineWidth"],
                    p = o[u + "LineColor"];
                o = o[u + "LineDashStyle"], r || (s.stroke = p, s["stroke-width"] = d, o && (s.dashstyle = o), l || (s.zIndex = 1), t && (s.opacity = 0), this.gridLine = r = c.path().attr(s).addClass("highcharts-" + (l ? l + "-" : "") + "grid-line").add(n.gridGroup)), !t && r && (t = n.getPlotLinePath(a + h, r.strokeWidth() * i, t, !0)) && r[this.isNew ? "attr" : "animate"]({
                    d: t,
                    opacity: e
                })
            },
            renderMark: function(t, e, i) {
                var n = this.axis,
                    o = n.options,
                    r = n.chart.renderer,
                    s = this.type,
                    a = s ? s + "Tick" : "tick",
                    l = n.tickSize(a),
                    h = this.mark,
                    c = !h,
                    u = t.x;
                t = t.y;
                var d = Lt(o[a + "Width"], !s && n.isXAxis ? 1 : 0);
                o = o[a + "Color"], l && (n.opposite && (l[0] = -l[0]), c && (this.mark = h = r.path().addClass("highcharts-" + (s ? s + "-" : "") + "tick").add(n.axisGroup), h.attr({
                    stroke: o,
                    "stroke-width": d
                })), h[c ? "attr" : "animate"]({
                    d: this.getMarkPath(u, t, l[0], h.strokeWidth() * i, n.horiz, r),
                    opacity: e
                }))
            },
            renderLabel: function(t, e, i, n) {
                var o = (h = this.axis).horiz,
                    r = h.options,
                    s = this.label,
                    a = r.labels,
                    l = a.step,
                    h = h.tickmarkOffset,
                    c = !0,
                    u = t.x;
                t = t.y, s && Mt(u) && (s.xy = t = this.getLabelPosition(u, t, s, o, a, h, n, l), this.isFirst && !this.isLast && !Lt(r.showFirstLabel, 1) || this.isLast && !this.isFirst && !Lt(r.showLastLabel, 1) ? c = !1 : !o || a.step || a.rotation || e || 0 === i || this.handleOverflow(t), l && n % l && (c = !1), c && Mt(t.y) ? (t.opacity = i, s[this.isNewLabel ? "attr" : "animate"](t), this.isNewLabel = !1) : (s.attr("y", -9999), this.isNewLabel = !0))
            },
            render: function(t, e, i) {
                var n = (a = this.axis).horiz,
                    o = this.getPosition(n, this.pos, a.tickmarkOffset, e),
                    r = o.x,
                    s = o.y,
                    a = n && r === a.pos + a.len || !n && s === a.pos ? -1 : 1;
                i = Lt(i, 1), this.isActive = !0, this.renderGridLine(e, i, a), this.renderMark(o, i, a), this.renderLabel(o, e, i, t), this.isNew = !1, St.fireEvent(this, "afterRender")
            },
            destroy: function() {
                kt(this, this.axis)
            }
        };
        var Pt, Nt, Rt, Ht, zt, Bt, Wt, jt, Ft, qt, Gt, Ut, Vt, Xt, Yt, Kt, $t, Qt, Zt, Jt, te, ee, ie, ne, oe, re, se, ae, le, he, ce, ue, de, pe, fe, ge, me, ve, ye, be, xe, we, Te, Ce, Se, Ee, Ae, ke, _e, Me, Oe, Le, De, Ie, Pe, Ne, Re, He, ze, Be, We, je, Fe, qe, Ge, Ue, Ve, Xe, Ye, Ke, $e, Qe, Ze, Je, ti, ei, ii, ni, oi, ri, si, ai, li, hi, ci, ui, di, pi, fi, gi, mi, vi, yi, bi, xi, wi, Ti, Ci, Si, Ei, Ai, ki, _i, Mi, Oi, Li, Di, Ii, Pi, Ni, Ri, Hi, zi, Bi, Wi, ji, Fi, qi, Gi, Ui, Vi, Xi, Yi, Ki, $i, Qi, Zi, Ji, tn, en, nn, on, rn, sn, an, ln, hn, cn, un, dn, pn, fn, gn, mn, vn, yn, bn, xn, wn, Tn, Cn, Sn, En, An, kn, _n, Mn, On, Ln, Dn, In, Pn, Nn, Rn, Hn, zn, Bn, Wn, jn, Fn, qn, Gn, Un, Vn, Xn, Yn, Kn, $n, Qn, Zn, Jn, to, eo, io, no, oo, ro, so, ao, lo, ho, co, uo, po, fo, go, mo, vo, yo, bo, xo, wo, To, Co, So, Eo, Ao, ko, _o, Mo, Oo, Lo, Do, Io, Po, No, Ro, Ho, zo, Bo, Wo, jo, Fo, qo, Go, Uo, Vo, Xo, Yo, Ko, $o, Qo, Zo, Jo, tr, er, ir, nr, or, rr, sr, ar, lr, hr, cr, ur, dr, pr, fr, gr, mr, vr, yr, br, xr, wr, Tr, Cr, Sr, Er, Ar, kr, _r, Mr, Or, Lr, Dr, Ir, Pr, Nr, Rr, Hr, zr, Br, Wr, jr, Fr, qr, Gr, Ur, Vr, Xr, Yr, Kr, $r, Qr, Zr, Jr, ts, es, is, ns, os, rs, ss, as, ls, hs, cs, us, ds, ps, fs = (Nt = (Pt = It).addEvent, Rt = Pt.animObject, Ht = Pt.arrayMax, zt = Pt.arrayMin, Bt = Pt.color, Wt = Pt.correctFloat, jt = Pt.defaultOptions, Ft = Pt.defined, qt = Pt.deg2rad, Gt = Pt.destroyObjectProperties, Ut = Pt.each, Vt = Pt.extend, Xt = Pt.fireEvent, Yt = Pt.format, Kt = Pt.getMagnitude, $t = Pt.grep, Qt = Pt.inArray, Zt = Pt.isArray, Jt = Pt.isNumber, te = Pt.isString, ee = Pt.merge, ie = Pt.normalizeTickInterval, ne = Pt.objectEach, oe = Pt.pick, re = Pt.removeEvent, se = Pt.splat, ae = Pt.syncTimeout, le = Pt.Tick, he = function() {
            this.init.apply(this, arguments)
        }, Pt.extend(he.prototype, {
            defaultOptions: {
                dateTimeLabelFormats: {
                    millisecond: "%H:%M:%S.%L",
                    second: "%H:%M:%S",
                    minute: "%H:%M",
                    hour: "%H:%M",
                    day: "%e. %b",
                    week: "%e. %b",
                    month: "%b '%y",
                    year: "%Y"
                },
                endOnTick: !1,
                labels: {
                    enabled: !0,
                    x: 0,
                    style: {
                        color: "#666666",
                        cursor: "default",
                        fontSize: "11px"
                    }
                },
                maxPadding: .01,
                minorTickLength: 2,
                minorTickPosition: "outside",
                minPadding: .01,
                startOfWeek: 1,
                startOnTick: !1,
                tickLength: 10,
                tickPixelInterval: 100,
                tickmarkPlacement: "between",
                tickPosition: "outside",
                title: {
                    align: "middle",
                    style: {
                        color: "#666666"
                    }
                },
                type: "linear",
                minorGridLineColor: "#f2f2f2",
                minorGridLineWidth: 1,
                minorTickColor: "#999999",
                lineColor: "#ccd6eb",
                lineWidth: 1,
                gridLineColor: "#e6e6e6",
                tickColor: "#ccd6eb"
            },
            defaultYAxisOptions: {
                endOnTick: !0,
                maxPadding: .05,
                minPadding: .05,
                tickPixelInterval: 72,
                showLastLabel: !0,
                labels: {
                    x: -8
                },
                startOnTick: !0,
                title: {
                    rotation: 270,
                    text: "Values"
                },
                stackLabels: {
                    allowOverlap: !1,
                    enabled: !1,
                    formatter: function() {
                        return Pt.numberFormat(this.total, -1)
                    },
                    style: {
                        fontSize: "11px",
                        fontWeight: "bold",
                        color: "#000000",
                        textOutline: "1px contrast"
                    }
                },
                gridLineWidth: 1,
                lineWidth: 0
            },
            defaultLeftAxisOptions: {
                labels: {
                    x: -15
                },
                title: {
                    rotation: 270
                }
            },
            defaultRightAxisOptions: {
                labels: {
                    x: 15
                },
                title: {
                    rotation: 90
                }
            },
            defaultBottomAxisOptions: {
                labels: {
                    autoRotation: [-45],
                    x: 0
                },
                title: {
                    rotation: 0
                }
            },
            defaultTopAxisOptions: {
                labels: {
                    autoRotation: [-45],
                    x: 0
                },
                title: {
                    rotation: 0
                }
            },
            init: function(t, e) {
                var i = e.isX,
                    n = this;
                n.chart = t, n.horiz = t.inverted && !n.isZAxis ? !i : i, n.isXAxis = i, n.coll = n.coll || (i ? "xAxis" : "yAxis"), Xt(this, "init", {
                    userOptions: e
                }), n.opposite = e.opposite, n.side = e.side || (n.horiz ? n.opposite ? 0 : 2 : n.opposite ? 1 : 3), n.setOptions(e);
                var o = this.options,
                    r = o.type;
                n.labelFormatter = o.labels.formatter || n.defaultLabelFormatter, n.userOptions = e, n.minPixelPadding = 0, n.reversed = o.reversed, n.visible = !1 !== o.visible, n.zoomEnabled = !1 !== o.zoomEnabled, n.hasNames = "category" === r || !0 === o.categories, n.categories = o.categories || n.hasNames, n.names || (n.names = [], n.names.keys = {}), n.plotLinesAndBandsGroups = {}, n.isLog = "logarithmic" === r, n.isDatetimeAxis = "datetime" === r, n.positiveValuesOnly = n.isLog && !n.allowNegativeLog, n.isLinked = Ft(o.linkedTo), n.ticks = {}, n.labelEdge = [], n.minorTicks = {}, n.plotLinesAndBands = [], n.alternateBands = {}, n.len = 0, n.minRange = n.userMinRange = o.minRange || o.maxZoom, n.range = o.range, n.offset = o.offset || 0, n.stacks = {}, n.oldStacks = {}, n.stacksTouched = 0, n.max = null, n.min = null, n.crosshair = oe(o.crosshair, se(t.options.tooltip.crosshairs)[i ? 0 : 1], !1), e = n.options.events, -1 === Qt(n, t.axes) && (i ? t.axes.splice(t.xAxis.length, 0, n) : t.axes.push(n), t[n.coll].push(n)), n.series = n.series || [], t.inverted && !n.isZAxis && i && void 0 === n.reversed && (n.reversed = !0), ne(e, function(t, e) {
                    Nt(n, e, t)
                }), n.lin2log = o.linearToLogConverter || n.lin2log, n.isLog && (n.val2lin = n.log2lin, n.lin2val = n.lin2log), Xt(this, "afterInit")
            },
            setOptions: function(t) {
                this.options = ee(this.defaultOptions, "yAxis" === this.coll && this.defaultYAxisOptions, [this.defaultTopAxisOptions, this.defaultRightAxisOptions, this.defaultBottomAxisOptions, this.defaultLeftAxisOptions][this.side], ee(jt[this.coll], t)), Xt(this, "afterSetOptions", {
                    userOptions: t
                })
            },
            defaultLabelFormatter: function() {
                var t, e = this.axis,
                    i = this.value,
                    n = e.chart.time,
                    o = e.categories,
                    r = this.dateTimeLabelFormat,
                    s = (a = jt.lang).numericSymbols,
                    a = a.numericSymbolMagnitude || 1e3,
                    l = s && s.length,
                    h = e.options.labels.format;
                if (e = e.isLog ? Math.abs(i) : e.tickInterval, h) t = Yt(h, this, n);
                else if (o) t = i;
                else if (r) t = n.dateFormat(r, i);
                else if (l && 1e3 <= e)
                    for (; l-- && void 0 === t;)(n = Math.pow(a, l + 1)) <= e && 0 == 10 * i % n && null !== s[l] && 0 !== i && (t = Pt.numberFormat(i / n, -1) + s[l]);
                return void 0 === t && (t = 1e4 <= Math.abs(i) ? Pt.numberFormat(i, -1) : Pt.numberFormat(i, -1, void 0, "")), t
            },
            getSeriesExtremes: function() {
                var o = this,
                    r = o.chart;
                Xt(this, "getSeriesExtremes", null, function() {
                    o.hasVisibleSeries = !1, o.dataMin = o.dataMax = o.threshold = null, o.softThreshold = !o.isXAxis, o.buildStacks && o.buildStacks(), Ut(o.series, function(t) {
                        if (t.visible || !r.options.chart.ignoreHiddenSeries) {
                            var e, i = t.options,
                                n = i.threshold;
                            o.hasVisibleSeries = !0, o.positiveValuesOnly && n <= 0 && (n = null), o.isXAxis ? (i = t.xData).length && (t = zt(i), e = Ht(i), Jt(t) || t instanceof Date || (i = $t(i, Jt), t = zt(i), e = Ht(i)), i.length && (o.dataMin = Math.min(oe(o.dataMin, i[0], t), t), o.dataMax = Math.max(oe(o.dataMax, i[0], e), e))) : (t.getExtremes(), e = t.dataMax, t = t.dataMin, Ft(t) && Ft(e) && (o.dataMin = Math.min(oe(o.dataMin, t), t), o.dataMax = Math.max(oe(o.dataMax, e), e)), Ft(n) && (o.threshold = n), (!i.softThreshold || o.positiveValuesOnly) && (o.softThreshold = !1))
                        }
                    })
                }), Xt(this, "afterGetSeriesExtremes")
            },
            translate: function(t, e, i, n, o, r) {
                var s = this.linkedParent || this,
                    a = 1,
                    l = 0,
                    h = n ? s.oldTransA : s.transA;
                n = n ? s.oldMin : s.min;
                var c = s.minPixelPadding;
                return o = (s.isOrdinal || s.isBroken || s.isLog && o) && s.lin2val, h || (h = s.transA), i && (a *= -1, l = s.len), s.reversed && (l -= (a *= -1) * (s.sector || s.len)), e ? (t = (t * a + l - c) / h + n, o && (t = s.lin2val(t))) : (o && (t = s.val2lin(t)), t = Jt(n) ? a * (t - n) * h + l + a * c + (Jt(r) ? h * r : 0) : void 0), t
            },
            toPixels: function(t, e) {
                return this.translate(t, !1, !this.horiz, null, !0) + (e ? 0 : this.pos)
            },
            toValue: function(t, e) {
                return this.translate(t - (e ? 0 : this.pos), !0, !this.horiz, null, !0)
            },
            getPlotLinePath: function(t, e, i, n, o) {
                var r, s, a, l = this.chart,
                    h = this.left,
                    c = this.top,
                    u = i && l.oldChartHeight || l.chartHeight,
                    d = i && l.oldChartWidth || l.chartWidth;
                r = this.transB;
                var p = function(t, e, i) {
                    return (t < e || i < t) && (n ? t = Math.min(Math.max(e, t), i) : a = !0), t
                };
                return o = oe(o, this.translate(t, null, null, i)), o = Math.min(Math.max(-1e5, o), 1e5), t = i = Math.round(o + r), r = s = Math.round(u - o - r), Jt(o) ? this.horiz ? (r = c, s = u - this.bottom, t = i = p(t, h, h + this.width)) : (t = h, i = d - this.right, r = s = p(r, c, c + this.height)) : n = !(a = !0), a && !n ? null : l.renderer.crispLine(["M", t, r, "L", i, s], e || 1)
            },
            getLinearTickPositions: function(t, e, i) {
                var n, o = Wt(Math.floor(e / t) * t);
                i = Wt(Math.ceil(i / t) * t);
                var r, s = [];
                if (Wt(o + t) === o && (r = 20), this.single) return [e];
                for (e = o; e <= i && (s.push(e), (e = Wt(e + t, r)) !== n);) n = e;
                return s
            },
            getMinorTickInterval: function() {
                var t = this.options;
                return !0 === t.minorTicks ? oe(t.minorTickInterval, "auto") : !1 === t.minorTicks ? null : t.minorTickInterval
            },
            getMinorTickPositions: function() {
                var n = this,
                    t = n.options,
                    e = n.tickPositions,
                    o = n.minorTickInterval,
                    r = [],
                    i = n.pointRangePadding || 0,
                    s = n.min - i,
                    a = (i = n.max + i) - s;
                if (a && a / o < n.len / 3)
                    if (n.isLog) Ut(this.paddedTicks, function(t, e, i) {
                        e && r.push.apply(r, n.getLogTickPositions(o, i[e - 1], i[e], !0))
                    });
                    else if (n.isDatetimeAxis && "auto" === this.getMinorTickInterval()) r = r.concat(n.getTimeTicks(n.normalizeTimeTickInterval(o), s, i, t.startOfWeek));
                else
                    for (t = s + (e[0] - s) % o; t <= i && t !== r[0]; t += o) r.push(t);
                return 0 !== r.length && n.trimTicks(r), r
            },
            adjustForMinRange: function() {
                var t, e, i, n, o, r, s, a = this.options,
                    l = this.min,
                    h = this.max;
                this.isXAxis && void 0 === this.minRange && !this.isLog && (Ft(a.min) || Ft(a.max) ? this.minRange = null : (Ut(this.series, function(t) {
                    for (r = t.xData, n = t.xIncrement ? 1 : r.length - 1; 0 < n; n--) o = r[n] - r[n - 1], (void 0 === i || o < i) && (i = o)
                }), this.minRange = Math.min(5 * i, this.dataMax - this.dataMin))), h - l < this.minRange && (e = this.dataMax - this.dataMin >= this.minRange, t = [l - (t = ((s = this.minRange) - h + l) / 2), oe(a.min, l - t)], e && (t[2] = this.isLog ? this.log2lin(this.dataMin) : this.dataMin), h = [(l = Ht(t)) + s, oe(a.max, l + s)], e && (h[2] = this.isLog ? this.log2lin(this.dataMax) : this.dataMax), (h = zt(h)) - l < s && (t[0] = h - s, t[1] = oe(a.min, h - s), l = Ht(t))), this.min = l, this.max = h
            },
            getClosest: function() {
                var n;
                return this.categories ? n = 1 : Ut(this.series, function(t) {
                    var e = t.closestPointRange,
                        i = t.visible || !t.chart.options.chart.ignoreHiddenSeries;
                    !t.noSharedTooltip && Ft(e) && i && (n = Ft(n) ? Math.min(n, e) : e)
                }), n
            },
            nameToX: function(t) {
                var e, i = Zt(this.categories),
                    n = i ? this.categories : this.names,
                    o = t.options.x;
                return t.series.requireSorting = !1, Ft(o) || (o = !1 === this.options.uniqueNames ? t.series.autoIncrement() : i ? Qt(t.name, n) : oe(n.keys[t.name], -1)), -1 === o ? i || (e = n.length) : e = o, void 0 !== e && (this.names[e] = t.name, this.names.keys[t.name] = e), e
            },
            updateNames: function() {
                var o = this,
                    e = this.names;
                0 < e.length && (Ut(Pt.keys(e.keys), function(t) {
                    delete e.keys[t]
                }), e.length = 0, this.minRange = this.userMinRange, Ut(this.series || [], function(n) {
                    n.xIncrement = null, n.points && !n.isDirtyData || (n.processData(), n.generatePoints()), Ut(n.points, function(t, e) {
                        var i;
                        t.options && void 0 !== (i = o.nameToX(t)) && i !== t.x && (t.x = i, n.xData[e] = i)
                    })
                }))
            },
            setAxisTranslation: function(t) {
                var i, n = this,
                    e = n.max - n.min,
                    o = n.axisPointRange || 0,
                    r = 0,
                    s = 0,
                    a = n.linkedParent,
                    l = !!n.categories,
                    h = n.transA,
                    c = n.isXAxis;
                (c || l || o) && (i = n.getClosest(), a ? (r = a.minPointOffset, s = a.pointRangePadding) : Ut(n.series, function(t) {
                    var e = l ? 1 : c ? oe(t.options.pointRange, i, 0) : n.axisPointRange || 0;
                    t = t.options.pointPlacement, o = Math.max(o, e), n.single || (r = Math.max(r, te(t) ? 0 : e / 2), s = Math.max(s, "on" === t ? 0 : e))
                }), a = n.ordinalSlope && i ? n.ordinalSlope / i : 1, n.minPointOffset = r *= a, n.pointRangePadding = s *= a, n.pointRange = Math.min(o, e), c && (n.closestPointRange = i)), t && (n.oldTransA = h), n.translationSlope = n.transA = h = n.options.staticScale || n.len / (e + s || 1), n.transB = n.horiz ? n.left : n.bottom, n.minPixelPadding = h * r, Xt(this, "afterSetAxisTranslation")
            },
            minFromRange: function() {
                return this.max - this.range
            },
            setTickInterval: function(t) {
                var e, i, n, o, r = this,
                    s = r.chart,
                    a = r.options,
                    l = r.isLog,
                    h = r.isDatetimeAxis,
                    c = r.isXAxis,
                    u = r.isLinked,
                    d = a.maxPadding,
                    p = a.minPadding,
                    f = a.tickInterval,
                    g = a.tickPixelInterval,
                    m = r.categories,
                    v = Jt(r.threshold) ? r.threshold : null,
                    y = r.softThreshold;
                h || m || u || this.getTickAmount(), n = oe(r.userMin, a.min), o = oe(r.userMax, a.max), u ? (r.linkedParent = s[r.coll][a.linkedTo], s = r.linkedParent.getExtremes(), r.min = oe(s.min, s.dataMin), r.max = oe(s.max, s.dataMax), a.type !== r.linkedParent.options.type && Pt.error(11, 1)) : (!y && Ft(v) && (r.dataMin >= v ? (e = v, p = 0) : r.dataMax <= v && (i = v, d = 0)), r.min = oe(n, e, r.dataMin), r.max = oe(o, i, r.dataMax)), l && (r.positiveValuesOnly && !t && Math.min(r.min, oe(r.dataMin, r.min)) <= 0 && Pt.error(10, 1), r.min = Wt(r.log2lin(r.min), 15), r.max = Wt(r.log2lin(r.max), 15)), r.range && Ft(r.max) && (r.userMin = r.min = n = Math.max(r.dataMin, r.minFromRange()), r.userMax = o = r.max, r.range = null), Xt(r, "foundExtremes"), r.beforePadding && r.beforePadding(), r.adjustForMinRange(), !(m || r.axisPointRange || r.usePercentage || u) && Ft(r.min) && Ft(r.max) && (s = r.max - r.min) && (!Ft(n) && p && (r.min -= s * p), !Ft(o) && d && (r.max += s * d)), Jt(a.softMin) && !Jt(r.userMin) && (r.min = Math.min(r.min, a.softMin)), Jt(a.softMax) && !Jt(r.userMax) && (r.max = Math.max(r.max, a.softMax)), Jt(a.floor) && (r.min = Math.max(r.min, a.floor)), Jt(a.ceiling) && (r.max = Math.min(r.max, a.ceiling)), y && Ft(r.dataMin) && (v = v || 0, !Ft(n) && r.min < v && r.dataMin >= v ? r.min = v : !Ft(o) && r.max > v && r.dataMax <= v && (r.max = v)), r.tickInterval = r.min === r.max || void 0 === r.min || void 0 === r.max ? 1 : u && !f && g === r.linkedParent.options.tickPixelInterval ? f = r.linkedParent.tickInterval : oe(f, this.tickAmount ? (r.max - r.min) / Math.max(this.tickAmount - 1, 1) : void 0, m ? 1 : (r.max - r.min) * g / Math.max(r.len, g)), c && !t && Ut(r.series, function(t) {
                    t.processData(r.min !== r.oldMin || r.max !== r.oldMax)
                }), r.setAxisTranslation(!0), r.beforeSetTickPositions && r.beforeSetTickPositions(), r.postProcessTickInterval && (r.tickInterval = r.postProcessTickInterval(r.tickInterval)), r.pointRange && !f && (r.tickInterval = Math.max(r.pointRange, r.tickInterval)), t = oe(a.minTickInterval, r.isDatetimeAxis && r.closestPointRange), !f && r.tickInterval < t && (r.tickInterval = t), h || l || f || (r.tickInterval = ie(r.tickInterval, null, Kt(r.tickInterval), oe(a.allowDecimals, !(.5 < r.tickInterval && r.tickInterval < 5 && 1e3 < r.max && r.max < 9999)), !!this.tickAmount)), this.tickAmount || (r.tickInterval = r.unsquish()), this.setTickPositions()
            },
            setTickPositions: function() {
                var t, e = this.options,
                    i = e.tickPositions;
                t = this.getMinorTickInterval();
                var n = e.tickPositioner,
                    o = e.startOnTick,
                    r = e.endOnTick;
                this.tickmarkOffset = this.categories && "between" === e.tickmarkPlacement && 1 === this.tickInterval ? .5 : 0, this.minorTickInterval = "auto" === t && this.tickInterval ? this.tickInterval / 5 : t, this.single = this.min === this.max && Ft(this.min) && !this.tickAmount && (parseInt(this.min, 10) === this.min || !1 !== e.allowDecimals), this.tickPositions = t = i && i.slice(), !t && ((t = this.isDatetimeAxis ? this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval, e.units), this.min, this.max, e.startOfWeek, this.ordinalPositions, this.closestPointRange, !0) : this.isLog ? this.getLogTickPositions(this.tickInterval, this.min, this.max) : this.getLinearTickPositions(this.tickInterval, this.min, this.max)).length > this.len && (t = [t[0], t.pop()])[0] === t[1] && (t.length = 1), this.tickPositions = t, n && (n = n.apply(this, [this.min, this.max]))) && (this.tickPositions = t = n), this.paddedTicks = t.slice(0), this.trimTicks(t, o, r), this.isLinked || (this.single && t.length < 2 && (this.min -= .5, this.max += .5), i || n || this.adjustTickAmount()), Xt(this, "afterSetTickPositions")
            },
            trimTicks: function(t, e, i) {
                var n = t[0],
                    o = t[t.length - 1],
                    r = this.minPointOffset || 0;
                if (!this.isLinked) {
                    if (e && -Infinity !== n) this.min = n;
                    else
                        for (; this.min - r > t[0];) t.shift();
                    if (i) this.max = o;
                    else
                        for (; this.max + r < t[t.length - 1];) t.pop();
                    0 === t.length && Ft(n) && !this.options.tickPositions && t.push((o + n) / 2)
                }
            },
            alignToOthers: function() {
                var i, n = {},
                    t = this.options;
                return !1 === this.chart.options.chart.alignTicks || !1 === t.alignTicks || !1 === t.startOnTick || !1 === t.endOnTick || this.isLog || Ut(this.chart[this.coll], function(t) {
                    var e = t.options;
                    e = [t.horiz ? e.left : e.top, e.width, e.height, e.pane].join(), t.series.length && (n[e] ? i = !0 : n[e] = 1)
                }), i
            },
            getTickAmount: function() {
                var t = this.options,
                    e = t.tickAmount,
                    i = t.tickPixelInterval;
                !Ft(t.tickInterval) && this.len < i && !this.isRadial && !this.isLog && t.startOnTick && t.endOnTick && (e = 2), !e && this.alignToOthers() && (e = Math.ceil(this.len / i) + 1), e < 4 && (this.finalTickAmt = e, e = 5), this.tickAmount = e
            },
            adjustTickAmount: function() {
                var t = this.tickInterval,
                    e = this.tickPositions,
                    i = this.tickAmount,
                    n = this.finalTickAmt,
                    o = e && e.length,
                    r = oe(this.threshold, this.softThreshold ? 0 : null);
                if (this.hasData()) {
                    if (o < i) {
                        for (; e.length < i;) e.length % 2 || this.min === r ? e.push(Wt(e[e.length - 1] + t)) : e.unshift(Wt(e[0] - t));
                        this.transA *= (o - 1) / (i - 1), this.min = e[0], this.max = e[e.length - 1]
                    } else i < o && (this.tickInterval *= 2, this.setTickPositions());
                    if (Ft(n)) {
                        for (t = i = e.length; t--;)(3 === n && 1 == t % 2 || n <= 2 && 0 < t && t < i - 1) && e.splice(t, 1);
                        this.finalTickAmt = void 0
                    }
                }
            },
            setScale: function() {
                var e, t;
                this.oldMin = this.min, this.oldMax = this.max, this.oldAxisLength = this.len, this.setAxisSize(), t = this.len !== this.oldAxisLength, Ut(this.series, function(t) {
                    (t.isDirtyData || t.isDirty || t.xAxis.isDirty) && (e = !0)
                }), t || e || this.isLinked || this.forceRedraw || this.userMin !== this.oldUserMin || this.userMax !== this.oldUserMax || this.alignToOthers() ? (this.resetStacks && this.resetStacks(), this.forceRedraw = !1, this.getSeriesExtremes(), this.setTickInterval(), this.oldUserMin = this.userMin, this.oldUserMax = this.userMax, this.isDirty || (this.isDirty = t || this.min !== this.oldMin || this.max !== this.oldMax)) : this.cleanStacks && this.cleanStacks(), Xt(this, "afterSetScale")
            },
            setExtremes: function(t, e, i, n, o) {
                var r = this,
                    s = r.chart;
                i = oe(i, !0), Ut(r.series, function(t) {
                    delete t.kdTree
                }), o = Vt(o, {
                    min: t,
                    max: e
                }), Xt(r, "setExtremes", o, function() {
                    r.userMin = t, r.userMax = e, r.eventArgs = o, i && s.redraw(n)
                })
            },
            zoom: function(t, e) {
                var i = this.dataMin,
                    n = this.dataMax,
                    o = this.options,
                    r = Math.min(i, oe(o.min, i));
                return o = Math.max(n, oe(o.max, n)), t === this.min && e === this.max || (this.allowZoomOutside || (Ft(i) && (t < r && (t = r), o < t && (t = o)), Ft(n) && (e < r && (e = r), o < e && (e = o))), this.displayBtn = void 0 !== t || void 0 !== e, this.setExtremes(t, e, !1, void 0, {
                    trigger: "zoom"
                })), !0
            },
            setAxisSize: function() {
                var t = this.chart,
                    e = (s = this.options).offsets || [0, 0, 0, 0],
                    i = this.horiz,
                    n = this.width = Math.round(Pt.relativeLength(oe(s.width, t.plotWidth - e[3] + e[1]), t.plotWidth)),
                    o = this.height = Math.round(Pt.relativeLength(oe(s.height, t.plotHeight - e[0] + e[2]), t.plotHeight)),
                    r = this.top = Math.round(Pt.relativeLength(oe(s.top, t.plotTop + e[0]), t.plotHeight, t.plotTop)),
                    s = this.left = Math.round(Pt.relativeLength(oe(s.left, t.plotLeft + e[3]), t.plotWidth, t.plotLeft));
                this.bottom = t.chartHeight - o - r, this.right = t.chartWidth - n - s, this.len = Math.max(i ? n : o, 0), this.pos = i ? s : r
            },
            getExtremes: function() {
                var t = this.isLog;
                return {
                    min: t ? Wt(this.lin2log(this.min)) : this.min,
                    max: t ? Wt(this.lin2log(this.max)) : this.max,
                    dataMin: this.dataMin,
                    dataMax: this.dataMax,
                    userMin: this.userMin,
                    userMax: this.userMax
                }
            },
            getThreshold: function(t) {
                var e = (i = this.isLog) ? this.lin2log(this.min) : this.min,
                    i = i ? this.lin2log(this.max) : this.max;
                return null === t || -Infinity === t ? t = e : Infinity === t ? t = i : t < e ? t = e : i < t && (t = i), this.translate(t, 0, 1, 0, 1)
            },
            autoLabelAlign: function(t) {
                return 15 < (t = (oe(t, 0) - 90 * this.side + 720) % 360) && t < 165 ? "right" : 195 < t && t < 345 ? "left" : "center"
            },
            tickSize: function(t) {
                var e = this.options,
                    i = e[t + "Length"],
                    n = oe(e[t + "Width"], "tick" === t && this.isXAxis ? 1 : 0);
                if (n && i) return "inside" === e[t + "Position"] && (i = -i), [i, n]
            },
            labelMetrics: function() {
                var t = this.tickPositions && this.tickPositions[0] || 0;
                return this.chart.renderer.fontMetrics(this.options.labels.style && this.options.labels.style.fontSize, this.ticks[t] && this.ticks[t].label)
            },
            unsquish: function() {
                var i, n, t, e = this.options.labels,
                    o = this.horiz,
                    r = this.tickInterval,
                    s = r,
                    a = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / r),
                    l = e.rotation,
                    h = this.labelMetrics(),
                    c = Number.MAX_VALUE,
                    u = function(t) {
                        return t = 1 < (t /= a || 1) ? Math.ceil(t) : 1, Wt(t * r)
                    };
                return o ? (t = !e.staggerLines && !e.step && (Ft(l) ? [l] : a < oe(e.autoRotationLimit, 80) && e.autoRotation)) && Ut(t, function(t) {
                    var e;
                    (t === l || t && -90 <= t && t <= 90) && (e = (n = u(Math.abs(h.h / Math.sin(qt * t)))) + Math.abs(t / 360)) < c && (c = e, i = t, s = n)
                }) : e.step || (s = u(h.h)), this.autoRotation = t, this.labelRotation = oe(i, l), s
            },
            getSlotWidth: function() {
                var t = this.chart,
                    e = this.horiz,
                    i = this.options.labels,
                    n = Math.max(this.tickPositions.length - (this.categories ? 0 : 1), 1),
                    o = t.margin[3];
                return e && (i.step || 0) < 2 && !i.rotation && (this.staggerLines || 1) * this.len / n || !e && (i.style && parseInt(i.style.width, 10) || o && o - t.spacing[3] || .33 * t.chartWidth)
            },
            renderUnsquish: function() {
                var o, r, t, e = this.chart,
                    i = e.renderer,
                    n = this.tickPositions,
                    s = this.ticks,
                    a = this.options.labels,
                    l = a && a.style || {},
                    h = this.horiz,
                    c = this.getSlotWidth(),
                    u = Math.max(1, Math.round(c - 2 * (a.padding || 5))),
                    d = {},
                    p = this.labelMetrics(),
                    f = a.style && a.style.textOverflow,
                    g = 0;
                if (te(a.rotation) || (d.rotation = a.rotation || 0), Ut(n, function(t) {
                        (t = s[t]) && t.label && t.label.textPxLength > g && (g = t.label.textPxLength)
                    }), this.maxLabelLength = g, this.autoRotation) u < g && g > p.h ? d.rotation = this.labelRotation : this.labelRotation = 0;
                else if (c && (o = u, !f))
                    for (r = "clip", u = n.length; !h && u--;) t = n[u], (t = s[t].label) && (t.styles && "ellipsis" === t.styles.textOverflow ? t.css({
                        textOverflow: "clip"
                    }) : t.textPxLength > c && t.css({
                        width: c + "px"
                    }), t.getBBox().height > this.len / n.length - (p.h - p.f) && (t.specificTextOverflow = "ellipsis"));
                d.rotation && (o = g > .5 * e.chartHeight ? .33 * e.chartHeight : g, f || (r = "ellipsis")), (this.labelAlign = a.align || this.autoLabelAlign(this.labelRotation)) && (d.align = this.labelAlign), Ut(n, function(t) {
                    var e = (t = s[t]) && t.label,
                        i = l.width,
                        n = {};
                    e && (e.attr(d), o && !i && "nowrap" !== l.whiteSpace && (o < e.textPxLength || "SPAN" === e.element.tagName) ? (n.width = o, f || (n.textOverflow = e.specificTextOverflow || r), e.css(n)) : e.styles && e.styles.width && !n.width && !i && e.css({
                        width: null
                    }), delete e.specificTextOverflow, t.rotation = d.rotation)
                }), this.tickRotCorr = i.rotCorr(p.b, this.labelRotation || 0, 0 !== this.side)
            },
            hasData: function() {
                return this.hasVisibleSeries || Ft(this.min) && Ft(this.max) && this.tickPositions && 0 < this.tickPositions.length
            },
            addTitle: function(t) {
                var e, i = this.chart.renderer,
                    n = this.horiz,
                    o = this.opposite,
                    r = this.options.title;
                this.axisTitle || ((e = r.textAlign) || (e = (n ? {
                    low: "left",
                    middle: "center",
                    high: "right"
                } : {
                    low: o ? "right" : "left",
                    middle: "center",
                    high: o ? "left" : "right"
                })[r.align]), this.axisTitle = i.text(r.text, 0, 0, r.useHTML).attr({
                    zIndex: 7,
                    rotation: r.rotation || 0,
                    align: e
                }).addClass("highcharts-axis-title").css(ee(r.style)).add(this.axisGroup), this.axisTitle.isNew = !0), r.style.width || this.isRadial || this.axisTitle.css({
                    width: this.len
                }), this.axisTitle[t ? "show" : "hide"](!0)
            },
            generateTick: function(t) {
                var e = this.ticks;
                e[t] ? e[t].addLabel() : e[t] = new le(this, t)
            },
            getOffset: function() {
                var t, e, i, n = this,
                    o = (v = n.chart).renderer,
                    r = n.options,
                    s = n.tickPositions,
                    a = n.ticks,
                    l = n.horiz,
                    h = n.side,
                    c = v.inverted && !n.isZAxis ? [1, 0, 3, 2][h] : h,
                    u = 0,
                    d = 0,
                    p = r.title,
                    f = r.labels,
                    g = 0,
                    m = v.axisOffset,
                    v = v.clipOffset,
                    y = [-1, 1, 1, -1][h],
                    b = r.className,
                    x = n.axisParent,
                    w = this.tickSize("tick");
                t = n.hasData(), n.showAxis = e = t || oe(r.showEmpty, !0), n.staggerLines = n.horiz && f.staggerLines, n.axisGroup || (n.gridGroup = o.g("grid").attr({
                    zIndex: r.gridZIndex || 1
                }).addClass("highcharts-" + this.coll.toLowerCase() + "-grid " + (b || "")).add(x), n.axisGroup = o.g("axis").attr({
                    zIndex: r.zIndex || 2
                }).addClass("highcharts-" + this.coll.toLowerCase() + " " + (b || "")).add(x), n.labelGroup = o.g("axis-labels").attr({
                    zIndex: f.zIndex || 7
                }).addClass("highcharts-" + n.coll.toLowerCase() + "-labels " + (b || "")).add(x)), t || n.isLinked ? (Ut(s, function(t, e) {
                    n.generateTick(t, e)
                }), n.renderUnsquish(), n.reserveSpaceDefault = 0 === h || 2 === h || {
                    1: "left",
                    3: "right"
                }[h] === n.labelAlign, oe(f.reserveSpace, "center" === n.labelAlign || null, n.reserveSpaceDefault) && Ut(s, function(t) {
                    g = Math.max(a[t].getLabelSize(), g)
                }), n.staggerLines && (g *= n.staggerLines), n.labelOffset = g * (n.opposite ? -1 : 1)) : ne(a, function(t, e) {
                    t.destroy(), delete a[e]
                }), p && p.text && !1 !== p.enabled && (n.addTitle(e), e && !1 !== p.reserveSpace && (n.titleOffset = u = n.axisTitle.getBBox()[l ? "height" : "width"], i = p.offset, d = Ft(i) ? 0 : oe(p.margin, l ? 5 : 10))), n.renderLine(), n.offset = y * oe(r.offset, m[h]), n.tickRotCorr = n.tickRotCorr || {
                    x: 0,
                    y: 0
                }, o = 0 === h ? -n.labelMetrics().h : 2 === h ? n.tickRotCorr.y : 0, d = Math.abs(g) + d, g && (d = d - o + y * (l ? oe(f.y, n.tickRotCorr.y + 8 * y) : f.x)), n.axisTitleMargin = oe(i, d), m[h] = Math.max(m[h], n.axisTitleMargin + u + y * n.offset, d, t && s.length && w ? w[0] + y * n.offset : 0), r = r.offset ? 0 : 2 * Math.floor(n.axisLine.strokeWidth() / 2), v[c] = Math.max(v[c], r), Xt(this, "afterGetOffset")
            },
            getLinePath: function(t) {
                var e = this.chart,
                    i = this.opposite,
                    n = this.offset,
                    o = this.horiz,
                    r = this.left + (i ? this.width : 0) + n;
                return n = e.chartHeight - this.bottom - (i ? this.height : 0) + n, i && (t *= -1), e.renderer.crispLine(["M", o ? this.left : r, o ? n : this.top, "L", o ? e.chartWidth - this.right : r, o ? n : e.chartHeight - this.bottom], t)
            },
            renderLine: function() {
                this.axisLine || (this.axisLine = this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup), this.axisLine.attr({
                    stroke: this.options.lineColor,
                    "stroke-width": this.options.lineWidth,
                    zIndex: 7
                }))
            },
            getTitlePosition: function() {
                var t = this.horiz,
                    e = this.left,
                    i = this.top,
                    n = this.len,
                    o = this.options.title,
                    r = t ? e : i,
                    s = this.opposite,
                    a = this.offset,
                    l = o.x || 0,
                    h = o.y || 0,
                    c = this.axisTitle,
                    u = this.chart.renderer.fontMetrics(o.style && o.style.fontSize, c);
                return c = Math.max(c.getBBox(null, 0).height - u.h - 1, 0), n = {
                    low: r + (t ? 0 : n),
                    middle: r + n / 2,
                    high: r + (t ? n : 0)
                }[o.align], e = (t ? i + this.height : e) + (t ? 1 : -1) * (s ? -1 : 1) * this.axisTitleMargin + [-c, c, u.f, -c][this.side], {
                    x: t ? n + l : e + (s ? this.width : 0) + a + l,
                    y: t ? e + h - (s ? this.height : 0) + a : n + h
                }
            },
            renderMinorTick: function(t) {
                var e = this.chart.hasRendered && Jt(this.oldMin),
                    i = this.minorTicks;
                i[t] || (i[t] = new le(this, t, "minor")), e && i[t].isNew && i[t].render(null, !0), i[t].render(null, !1, 1)
            },
            renderTick: function(t, e) {
                var i = this.isLinked,
                    n = this.ticks,
                    o = this.chart.hasRendered && Jt(this.oldMin);
                (!i || t >= this.min && t <= this.max) && (n[t] || (n[t] = new le(this, t)), o && n[t].isNew && n[t].render(e, !0, .1), n[t].render(e))
            },
            render: function() {
                var i, n, o = this,
                    r = o.chart,
                    t = o.options,
                    s = o.isLog,
                    e = o.isLinked,
                    a = o.tickPositions,
                    l = o.axisTitle,
                    h = o.ticks,
                    c = o.minorTicks,
                    u = o.alternateBands,
                    d = t.stackLabels,
                    p = t.alternateGridColor,
                    f = o.tickmarkOffset,
                    g = o.axisLine,
                    m = o.showAxis,
                    v = Rt(r.renderer.globalAnimation);
                o.labelEdge.length = 0, o.overlap = !1, Ut([h, c, u], function(t) {
                    ne(t, function(t) {
                        t.isActive = !1
                    })
                }), (o.hasData() || e) && (o.minorTickInterval && !o.categories && Ut(o.getMinorTickPositions(), function(t) {
                    o.renderMinorTick(t)
                }), a.length && (Ut(a, function(t, e) {
                    o.renderTick(t, e)
                }), f && (0 === o.min || o.single) && (h[-1] || (h[-1] = new le(o, -1, null, !0)), h[-1].render(-1))), p && Ut(a, function(t, e) {
                    n = void 0 !== a[e + 1] ? a[e + 1] + f : o.max - f, 0 == e % 2 && t < o.max && n <= o.max + (r.polar ? -f : f) && (u[t] || (u[t] = new Pt.PlotLineOrBand(o)), i = t + f, u[t].options = {
                        from: s ? o.lin2log(i) : i,
                        to: s ? o.lin2log(n) : n,
                        color: p
                    }, u[t].render(), u[t].isActive = !0)
                }), o._addedPlotLB || (Ut((t.plotLines || []).concat(t.plotBands || []), function(t) {
                    o.addPlotBandOrLine(t)
                }), o._addedPlotLB = !0)), Ut([h, c, u], function(t) {
                    var e, i = [],
                        n = v.duration;
                    ne(t, function(t, e) {
                        t.isActive || (t.render(e, !1, 0), t.isActive = !1, i.push(e))
                    }), ae(function() {
                        for (e = i.length; e--;) t[i[e]] && !t[i[e]].isActive && (t[i[e]].destroy(), delete t[i[e]])
                    }, t !== u && r.hasRendered && n ? n : 0)
                }), g && (g[g.isPlaced ? "animate" : "attr"]({
                    d: this.getLinePath(g.strokeWidth())
                }), g.isPlaced = !0, g[m ? "show" : "hide"](!0)), l && m && (t = o.getTitlePosition(), Jt(t.y) ? (l[l.isNew ? "attr" : "animate"](t), l.isNew = !1) : (l.attr("y", -9999), l.isNew = !0)), d && d.enabled && o.renderStackTotals(), o.isDirty = !1, Xt(this, "afterRender")
            },
            redraw: function() {
                this.visible && (this.render(), Ut(this.plotLinesAndBands, function(t) {
                    t.render()
                })), Ut(this.series, function(t) {
                    t.isDirty = !0
                })
            },
            keepProps: "extKey hcEvents names series userMax userMin".split(" "),
            destroy: function(t) {
                var e, i = this,
                    n = i.stacks,
                    o = i.plotLinesAndBands;
                if (Xt(this, "destroy", {
                        keepEvents: t
                    }), t || re(i), ne(n, function(t, e) {
                        Gt(t), n[e] = null
                    }), Ut([i.ticks, i.minorTicks, i.alternateBands], function(t) {
                        Gt(t)
                    }), o)
                    for (t = o.length; t--;) o[t].destroy();
                for (e in Ut("stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross scrollbar".split(" "), function(t) {
                        i[t] && (i[t] = i[t].destroy())
                    }), i.plotLinesAndBandsGroups) i.plotLinesAndBandsGroups[e] = i.plotLinesAndBandsGroups[e].destroy();
                ne(i, function(t, e) {
                    -1 === Qt(e, i.keepProps) && delete i[e]
                })
            },
            drawCrosshair: function(t, e) {
                var i, n, o = this.crosshair,
                    r = oe(o.snap, !0),
                    s = this.cross;
                if (Xt(this, "drawCrosshair", {
                        e: t,
                        point: e
                    }), t || (t = this.cross && this.cross.e), this.crosshair && !1 !== (Ft(e) || !r)) {
                    if (r ? Ft(e) && (n = oe(e.crosshairPos, this.isXAxis ? e.plotX : this.len - e.plotY)) : n = t && (this.horiz ? t.chartX - this.pos : this.len - t.chartY + this.pos), Ft(n) && (i = this.getPlotLinePath(e && (this.isXAxis ? e.x : oe(e.stackY, e.y)), null, null, null, n) || null), !Ft(i)) return void this.hideCrosshair();
                    r = this.categories && !this.isRadial, s || (this.cross = s = this.chart.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-" + (r ? "category " : "thin ") + o.className).attr({
                        zIndex: oe(o.zIndex, 2)
                    }).add(), s.attr({
                        stroke: o.color || (r ? Bt("#ccd6eb").setOpacity(.25).get() : "#cccccc"),
                        "stroke-width": oe(o.width, 1)
                    }).css({
                        "pointer-events": "none"
                    }), o.dashStyle && s.attr({
                        dashstyle: o.dashStyle
                    })), s.show().attr({
                        d: i
                    }), r && !o.width && s.attr({
                        "stroke-width": this.transA
                    }), this.cross.e = t
                } else this.hideCrosshair();
                Xt(this, "afterDrawCrosshair", {
                    e: t,
                    point: e
                })
            },
            hideCrosshair: function() {
                this.cross && this.cross.hide()
            }
        }), Pt.Axis = he);
        return ue = (ce = It).Axis, de = ce.getMagnitude, pe = ce.normalizeTickInterval, fe = ce.timeUnits, ue.prototype.getTimeTicks = function() {
                return this.chart.time.getTimeTicks.apply(this.chart.time, arguments)
            }, ue.prototype.normalizeTimeTickInterval = function(t, e) {
                var i = e || [
                    ["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
                    ["second", [1, 2, 5, 10, 15, 30]],
                    ["minute", [1, 2, 5, 10, 15, 30]],
                    ["hour", [1, 2, 3, 4, 6, 8, 12]],
                    ["day", [1, 2]],
                    ["week", [1, 2]],
                    ["month", [1, 2, 3, 4, 6]],
                    ["year", null]
                ];
                e = i[i.length - 1];
                var n, o = fe[e[0]],
                    r = e[1];
                for (n = 0; n < i.length && (e = i[n], o = fe[e[0]], r = e[1], !(i[n + 1] && t <= (o * r[r.length - 1] + fe[i[n + 1][0]]) / 2)); n++);
                return o === fe.year && t < 5 * o && (r = [1, 2, 5]), {
                    unitRange: o,
                    count: t = pe(t / o, r, "year" === e[0] ? Math.max(de(t / o), 1) : 1),
                    unitName: e[0]
                }
            }, me = (ge = It).Axis, ve = ge.getMagnitude, ye = ge.map, be = ge.normalizeTickInterval, xe = ge.pick, me.prototype.getLogTickPositions = function(t, e, i, n) {
                var o = this.options,
                    r = this.len,
                    s = [];
                if (n || (this._minorAutoInterval = null), .5 <= t) t = Math.round(t), s = this.getLinearTickPositions(t, e, i);
                else if (.08 <= t) {
                    var a, l, h, c, u;
                    for (r = Math.floor(e), o = .3 < t ? [1, 2, 4] : .15 < t ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; r < i + 1 && !u; r++)
                        for (l = o.length, a = 0; a < l && !u; a++) e < (h = this.log2lin(this.lin2log(r) * o[a])) && (!n || c <= i) && void 0 !== c && s.push(c), i < c && (u = !0), c = h
                } else e = this.lin2log(e), i = this.lin2log(i), t = n ? this.getMinorTickInterval() : o.tickInterval, t = xe("auto" === t ? null : t, this._minorAutoInterval, o.tickPixelInterval / (n ? 5 : 1) * (i - e) / ((n ? r / this.tickPositions.length : r) || 1)), t = be(t, null, ve(t)), s = ye(this.getLinearTickPositions(t, e, i), this.log2lin), n || (this._minorAutoInterval = t / 5);
                return n || (this.tickInterval = t), s
            }, me.prototype.log2lin = function(t) {
                return Math.log(t) / Math.LN10
            }, me.prototype.lin2log = function(t) {
                return Math.pow(10, t)
            }, Te = fs, Ce = (we = It).arrayMax, Se = we.arrayMin, Ee = we.defined, Ae = we.destroyObjectProperties, ke = we.each, _e = we.erase, Me = we.merge, Oe = we.pick, we.PlotLineOrBand = function(t, e) {
                this.axis = t, e && (this.options = e, this.id = e.id)
            }, we.PlotLineOrBand.prototype = {
                render: function() {
                    var i = this,
                        t = i.axis,
                        e = t.horiz,
                        n = i.options,
                        o = n.label,
                        r = i.label,
                        s = n.to,
                        a = n.from,
                        l = n.value,
                        h = Ee(a) && Ee(s),
                        c = Ee(l),
                        u = i.svgElem,
                        d = !u,
                        p = [],
                        f = n.color,
                        g = Oe(n.zIndex, 0),
                        m = n.events,
                        v = (p = {
                            "class": "highcharts-plot-" + (h ? "band " : "line ") + (n.className || "")
                        }, {}),
                        y = t.chart.renderer,
                        b = h ? "bands" : "lines";
                    if (t.isLog && (a = t.log2lin(a), s = t.log2lin(s), l = t.log2lin(l)), c ? (p.stroke = f, p["stroke-width"] = n.width, n.dashStyle && (p.dashstyle = n.dashStyle)) : h && (f && (p.fill = f), n.borderWidth && (p.stroke = n.borderColor, p["stroke-width"] = n.borderWidth)), b += "-" + (v.zIndex = g), (f = t.plotLinesAndBandsGroups[b]) || (
                            t.plotLinesAndBandsGroups[b] = f = y.g("plot-" + b).attr(v).add()), d && (i.svgElem = u = y.path().attr(p).add(f)), c) p = t.getPlotLinePath(l, u.strokeWidth());
                    else {
                        if (!h) return;
                        p = t.getPlotBandPath(a, s, n)
                    }
                    return d && p && p.length ? (u.attr({
                        d: p
                    }), m && we.objectEach(m, function(t, e) {
                        u.on(e, function(t) {
                            m[e].apply(i, [t])
                        })
                    })) : u && (p ? (u.show(), u.animate({
                        d: p
                    })) : (u.hide(), r && (i.label = r = r.destroy()))), o && Ee(o.text) && p && p.length && 0 < t.width && 0 < t.height && !p.isFlat ? (o = Me({
                        align: e && h && "center",
                        x: e ? !h && 4 : 10,
                        verticalAlign: !e && h && "middle",
                        y: e ? h ? 16 : 10 : h ? 6 : -4,
                        rotation: e && !h && 90
                    }, o), this.renderLabel(o, p, h, g)) : r && r.hide(), i
                },
                renderLabel: function(t, e, i, n) {
                    var o = this.label,
                        r = this.axis.chart.renderer;
                    o || ((o = {
                        align: t.textAlign || t.align,
                        rotation: t.rotation,
                        "class": "highcharts-plot-" + (i ? "band" : "line") + "-label " + (t.className || "")
                    }).zIndex = n, this.label = o = r.text(t.text, 0, 0, t.useHTML).attr(o).add(), o.css(t.style)), n = e.xBounds || [e[1], e[4], i ? e[6] : e[1]], e = e.yBounds || [e[2], e[5], i ? e[7] : e[2]], i = Se(n), r = Se(e), o.align(t, !1, {
                        x: i,
                        y: r,
                        width: Ce(n) - i,
                        height: Ce(e) - r
                    }), o.show()
                },
                destroy: function() {
                    _e(this.axis.plotLinesAndBands, this), delete this.axis, Ae(this)
                }
            }, we.extend(Te.prototype, {
                getPlotBandPath: function(t, e) {
                    var i, n = this.getPlotLinePath(e, null, null, !0),
                        o = this.getPlotLinePath(t, null, null, !0),
                        r = [],
                        s = this.horiz,
                        a = 1;
                    if (t = t < this.min && e < this.min || t > this.max && e > this.max, o && n)
                        for (t && (i = o.toString() === n.toString(), a = 0), t = 0; t < o.length; t += 6) s && n[t + 1] === o[t + 1] ? (n[t + 1] += a, n[t + 4] += a) : s || n[t + 2] !== o[t + 2] || (n[t + 2] += a, n[t + 5] += a), r.push("M", o[t + 1], o[t + 2], "L", o[t + 4], o[t + 5], n[t + 4], n[t + 5], n[t + 1], n[t + 2], "z"), r.isFlat = i;
                    return r
                },
                addPlotBand: function(t) {
                    return this.addPlotBandOrLine(t, "plotBands")
                },
                addPlotLine: function(t) {
                    return this.addPlotBandOrLine(t, "plotLines")
                },
                addPlotBandOrLine: function(t, e) {
                    var i = new we.PlotLineOrBand(this, t).render(),
                        n = this.userOptions;
                    return i && (e && (n[e] = n[e] || [], n[e].push(t)), this.plotLinesAndBands.push(i)), i
                },
                removePlotBandOrLine: function(e) {
                    for (var t = this.plotLinesAndBands, i = this.options, n = this.userOptions, o = t.length; o--;) t[o].id === e && t[o].destroy();
                    ke([i.plotLines || [], n.plotLines || [], i.plotBands || [], n.plotBands || []], function(t) {
                        for (o = t.length; o--;) t[o].id === e && _e(t, t[o])
                    })
                },
                removePlotBand: function(t) {
                    this.removePlotBandOrLine(t)
                },
                removePlotLine: function(t) {
                    this.removePlotBandOrLine(t)
                }
            }), De = (Le = It).doc, Ie = Le.each, Pe = Le.extend, Ne = Le.format, Re = Le.isNumber, He = Le.map, ze = Le.merge, Be = Le.pick, We = Le.splat, je = Le.syncTimeout, Fe = Le.timeUnits, Le.Tooltip = function() {
                this.init.apply(this, arguments)
            }, Le.Tooltip.prototype = {
                init: function(t, e) {
                    this.chart = t, this.options = e, this.crosshairs = [], this.now = {
                        x: 0,
                        y: 0
                    }, this.isHidden = !0, this.split = e.split && !t.inverted, this.shared = e.shared || this.split, this.outside = e.outside && !this.split
                },
                cleanSplit: function(i) {
                    Ie(this.chart.series, function(t) {
                        var e = t && t.tt;
                        e && (!e.isActive || i ? t.tt = e.destroy() : e.isActive = !1)
                    })
                },
                getLabel: function() {
                    var e, t = this.chart.renderer,
                        i = this.options;
                    return this.label || (this.outside && (this.container = e = Le.doc.createElement("div"), e.className = "highcharts-tooltip-container", Le.css(e, {
                        position: "absolute",
                        top: "1px",
                        pointerEvents: i.style && i.style.pointerEvents
                    }), Le.doc.body.appendChild(e), this.renderer = t = new Le.Renderer(e, 0, 0)), this.split ? this.label = t.g("tooltip") : (this.label = t.label("", 0, 0, i.shape || "callout", null, null, i.useHTML, null, "tooltip").attr({
                        padding: i.padding,
                        r: i.borderRadius
                    }), this.label.attr({
                        fill: i.backgroundColor,
                        "stroke-width": i.borderWidth
                    }).css(i.style).shadow(i.shadow)), this.outside && (this.label.attr({
                        x: this.distance,
                        y: this.distance
                    }), this.label.xSetter = function(t) {
                        e.style.left = t + "px"
                    }, this.label.ySetter = function(t) {
                        e.style.top = t + "px"
                    }), this.label.attr({
                        zIndex: 8
                    }).add()), this.label
                },
                update: function(t) {
                    this.destroy(), ze(!0, this.chart.options.tooltip.userOptions, t), this.init(this.chart, ze(!0, this.options, t))
                },
                destroy: function() {
                    this.label && (this.label = this.label.destroy()), this.split && this.tt && (this.cleanSplit(this.chart, !0), this.tt = this.tt.destroy()), this.renderer && (this.renderer = this.renderer.destroy(), Le.discardElement(this.container)), Le.clearTimeout(this.hideTimer), Le.clearTimeout(this.tooltipTimeout)
                },
                move: function(t, e, i, n) {
                    var o = this,
                        r = o.now,
                        s = !1 !== o.options.animation && !o.isHidden && (1 < Math.abs(t - r.x) || 1 < Math.abs(e - r.y)),
                        a = o.followPointer || 1 < o.len;
                    Pe(r, {
                        x: s ? (2 * r.x + t) / 3 : t,
                        y: s ? (r.y + e) / 2 : e,
                        anchorX: a ? void 0 : s ? (2 * r.anchorX + i) / 3 : i,
                        anchorY: a ? void 0 : s ? (r.anchorY + n) / 2 : n
                    }), o.getLabel().attr(r), s && (Le.clearTimeout(this.tooltipTimeout), this.tooltipTimeout = setTimeout(function() {
                        o && o.move(t, e, i, n)
                    }, 32))
                },
                hide: function(t) {
                    var e = this;
                    Le.clearTimeout(this.hideTimer), t = Be(t, this.options.hideDelay, 500), this.isHidden || (this.hideTimer = je(function() {
                        e.getLabel()[t ? "fadeOut" : "hide"](), e.isHidden = !0
                    }, t))
                },
                getAnchor: function(t, e) {
                    var i, n, o = this.chart,
                        r = o.pointer,
                        s = o.inverted,
                        a = o.plotTop,
                        l = o.plotLeft,
                        h = 0,
                        c = 0;
                    return t = We(t), this.followPointer && e || r.followTouchMove && e && "touchmove" === e.type ? (void 0 === e.chartX && (e = r.normalize(e)), t = [e.chartX - o.plotLeft, e.chartY - a]) : t[0].tooltipPos ? t = t[0].tooltipPos : (Ie(t, function(t) {
                        i = t.series.yAxis, n = t.series.xAxis, h += t.plotX + (!s && n ? n.left - l : 0), c += (t.plotLow ? (t.plotLow + t.plotHigh) / 2 : t.plotY) + (!s && i ? i.top - a : 0)
                    }), h /= t.length, c /= t.length, t = [s ? o.plotWidth - c : h, this.shared && !s && 1 < t.length && e ? e.chartY - a : s ? o.plotHeight - h : c]), He(t, Math.round)
                },
                getPosition: function(t, e, i) {
                    var n, o = this.chart,
                        h = this.distance,
                        c = {},
                        u = o.inverted && i.h || 0,
                        r = this.outside,
                        s = r ? De.documentElement.clientWidth - 2 * h : o.chartWidth,
                        a = r ? Math.max(De.body.scrollHeight, De.documentElement.scrollHeight, De.body.offsetHeight, De.documentElement.offsetHeight, De.documentElement.clientHeight) : o.chartHeight,
                        l = o.pointer.chartPosition,
                        d = ["y", a, e, (r ? l.top - h : 0) + i.plotY + o.plotTop, r ? 0 : o.plotTop, r ? a : o.plotTop + o.plotHeight],
                        p = ["x", s, t, (r ? l.left - h : 0) + i.plotX + o.plotLeft, r ? 0 : o.plotLeft, r ? s : o.plotLeft + o.plotWidth],
                        f = !this.followPointer && Be(i.ttBelow, !o.inverted == !!i.negative),
                        g = function(t, e, i, n, o, r) {
                            var s = i < n - h,
                                a = n + h + i < e,
                                l = n - h - i;
                            if (n += h, f && a) c[t] = n;
                            else if (!f && s) c[t] = l;
                            else if (s) c[t] = Math.min(r - i, l - u < 0 ? l : l - u);
                            else {
                                if (!a) return !1;
                                c[t] = Math.max(o, e < n + u + i ? n : n + u)
                            }
                        },
                        m = function(t, e, i, n) {
                            var o;
                            return n < h || e - h < n ? o = !1 : c[t] = n < i / 2 ? 1 : e - i / 2 < n ? e - i - 2 : n - i / 2, o
                        },
                        v = function(t) {
                            var e = d;
                            d = p, p = e, n = t
                        },
                        y = function() {
                            !1 !== g.apply(0, d) ? !1 !== m.apply(0, p) || n || (v(!0), y()) : n ? c.x = c.y = 0 : (v(!0), y())
                        };
                    return (o.inverted || 1 < this.len) && v(), y(), c
                },
                defaultFormatter: function(t) {
                    var e, i = this.points || We(this);
                    return (e = (e = [t.tooltipFooterHeaderFormatter(i[0])]).concat(t.bodyFormatter(i))).push(t.tooltipFooterHeaderFormatter(i[0], !0)), e
                },
                refresh: function(t, e) {
                    var i, n, o, r, s = this.options,
                        a = t,
                        l = {},
                        h = [];
                    i = s.formatter || this.defaultFormatter, l = this.shared, s.enabled && (Le.clearTimeout(this.hideTimer), this.followPointer = We(a)[0].series.tooltipOptions.followPointer, e = (o = this.getAnchor(a, e))[0], n = o[1], !l || a.series && a.series.noSharedTooltip ? l = a.getLabelConfig() : (Ie(a, function(t) {
                        t.setState("hover"), h.push(t.getLabelConfig())
                    }), (l = {
                        x: a[0].category,
                        y: a[0].y
                    }).points = h, a = a[0]), this.len = h.length, l = i.call(l, this), r = a.series, this.distance = Be(r.tooltipOptions.distance, 16), !1 === l ? this.hide() : (i = this.getLabel(), this.isHidden && i.attr({
                        opacity: 1
                    }).show(), this.split ? this.renderSplit(l, We(t)) : (s.style.width || i.css({
                        width: this.chart.spacingBox.width
                    }), i.attr({
                        text: l && l.join ? l.join("") : l
                    }), i.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-" + Be(a.colorIndex, r.colorIndex)), i.attr({
                        stroke: s.borderColor || a.color || r.color || "#666666"
                    }), this.updatePosition({
                        plotX: e,
                        plotY: n,
                        negative: a.negative,
                        ttBelow: a.ttBelow,
                        h: o[2] || 0
                    })), this.isHidden = !1))
                },
                renderSplit: function(t, s) {
                    var a = this,
                        l = [],
                        h = this.chart,
                        c = h.renderer,
                        u = !0,
                        d = this.options,
                        p = 0,
                        f = this.getLabel();
                    Le.isString(t) && (t = [!1, t]), Ie(t.slice(0, s.length + 1), function(t, e) {
                        if (!1 !== t) {
                            var i = (e = s[e - 1] || {
                                    isHeader: !0,
                                    plotX: s[0].plotX
                                }).series || a,
                                n = i.tt,
                                o = e.series || {},
                                r = "highcharts-color-" + Be(e.colorIndex, o.colorIndex, "none");
                            n || (i.tt = n = c.label(null, null, null, "callout", null, null, d.useHTML).addClass("highcharts-tooltip-box " + r).attr({
                                padding: d.padding,
                                r: d.borderRadius,
                                fill: d.backgroundColor,
                                stroke: d.borderColor || e.color || o.color || "#333333",
                                "stroke-width": d.borderWidth
                            }).add(f)), n.isActive = !0, n.attr({
                                text: t
                            }), n.css(d.style).shadow(d.shadow), o = (t = n.getBBox()).width + n.strokeWidth(), e.isHeader ? (p = t.height, o = Math.max(0, Math.min(e.plotX + h.plotLeft - o / 2, h.chartWidth - o))) : o = e.plotX + h.plotLeft - Be(d.distance, 16) - o, o < 0 && (u = !1), t = (e.series && e.series.yAxis && e.series.yAxis.pos) + (e.plotY || 0), t -= h.plotTop, l.push({
                                target: e.isHeader ? h.plotHeight + p : t,
                                rank: e.isHeader ? 1 : 0,
                                size: i.tt.getBBox().height + 1,
                                point: e,
                                x: o,
                                tt: n
                            })
                        }
                    }), this.cleanSplit(), Le.distribute(l, h.plotHeight + p), Ie(l, function(t) {
                        var e = t.point,
                            i = e.series;
                        t.tt.attr({
                            visibility: void 0 === t.pos ? "hidden" : "inherit",
                            x: u || e.isHeader ? t.x : e.plotX + h.plotLeft + Be(d.distance, 16),
                            y: t.pos + h.plotTop,
                            anchorX: e.isHeader ? e.plotX + h.plotLeft : e.plotX + i.xAxis.pos,
                            anchorY: e.isHeader ? t.pos + h.plotTop - 15 : e.plotY + i.yAxis.pos
                        })
                    })
                },
                updatePosition: function(t) {
                    var e, i = this.chart,
                        n = this.getLabel(),
                        o = (this.options.positioner || this.getPosition).call(this, n.width, n.height, t),
                        r = t.plotX + i.plotLeft;
                    t = t.plotY + i.plotTop, this.outside && (e = (this.options.borderWidth || 0) + 2 * this.distance, this.renderer.setSize(n.width + e, n.height + e, !1), r += i.pointer.chartPosition.left - o.x, t += i.pointer.chartPosition.top - o.y), this.move(Math.round(o.x), Math.round(o.y || 0), r, t)
                },
                getDateFormat: function(t, e, i, n) {
                    var o, r, s = this.chart.time,
                        a = s.dateFormat("%m-%d %H:%M:%S.%L", e),
                        l = {
                            millisecond: 15,
                            second: 12,
                            minute: 9,
                            hour: 6,
                            day: 3
                        },
                        h = "millisecond";
                    for (r in Fe) {
                        if (t === Fe.week && +s.dateFormat("%w", e) === i && "00:00:00.000" === a.substr(6)) {
                            r = "week";
                            break
                        }
                        if (Fe[r] > t) {
                            r = h;
                            break
                        }
                        if (l[r] && a.substr(l[r]) !== "01-01 00:00:00.000".substr(l[r])) break;
                        "week" !== r && (h = r)
                    }
                    return r && (o = n[r]), o
                },
                getXDateFormat: function(t, e, i) {
                    e = e.dateTimeLabelFormats;
                    var n = i && i.closestPointRange;
                    return (n ? this.getDateFormat(n, t.x, i.options.startOfWeek, e) : e.day) || e.year
                },
                tooltipFooterHeaderFormatter: function(t, e) {
                    e = e ? "footer" : "header";
                    var i = t.series,
                        n = i.tooltipOptions,
                        o = n.xDateFormat,
                        r = i.xAxis,
                        s = r && "datetime" === r.options.type && Re(t.key),
                        a = n[e + "Format"];
                    return s && !o && (o = this.getXDateFormat(t, n, r)), s && o && Ie(t.point && t.point.tooltipDateKeys || ["key"], function(t) {
                        a = a.replace("{point." + t + "}", "{point." + t + ":" + o + "}")
                    }), Ne(a, {
                        point: t,
                        series: i
                    }, this.chart.time)
                },
                bodyFormatter: function(t) {
                    return He(t, function(t) {
                        var e = t.series.tooltipOptions;
                        return (e[(t.point.formatPrefix || "point") + "Formatter"] || t.point.tooltipFormatter).call(t.point, e[(t.point.formatPrefix || "point") + "Format"])
                    })
                }
            }, Ge = (qe = It).addEvent, Ue = qe.attr, Ve = qe.charts, Xe = qe.color, Ye = qe.css, Ke = qe.defined, $e = qe.each, Qe = qe.extend, Ze = qe.find, Je = qe.fireEvent, ti = qe.isNumber, ei = qe.isObject, ii = qe.offset, ni = qe.pick, oi = qe.splat, ri = qe.Tooltip, qe.Pointer = function(t, e) {
                this.init(t, e)
            }, qe.Pointer.prototype = {
                init: function(t, e) {
                    this.options = e, this.chart = t, this.runChartClick = e.chart.events && !!e.chart.events.click, this.pinchDown = [], this.lastValidTouch = {}, ri && (t.tooltip = new ri(t, e.tooltip), this.followTouchMove = ni(e.tooltip.followTouchMove, !0)), this.setDOMEvents()
                },
                zoomOption: function(t) {
                    var e = (n = this.chart).options.chart,
                        i = e.zoomType || "",
                        n = n.inverted;
                    /touch/.test(t.type) && (i = ni(e.pinchType, i)), this.zoomX = t = /x/.test(i), this.zoomY = i = /y/.test(i), this.zoomHor = t && !n || i && n, this.zoomVert = i && !n || t && n, this.hasZoom = t || i
                },
                normalize: function(t, e) {
                    var i;
                    return i = t.touches ? t.touches.length ? t.touches.item(0) : t.changedTouches[0] : t, e || (this.chartPosition = e = ii(this.chart.container)), Qe(t, {
                        chartX: Math.round(i.pageX - e.left),
                        chartY: Math.round(i.pageY - e.top)
                    })
                },
                getCoordinates: function(e) {
                    var i = {
                        xAxis: [],
                        yAxis: []
                    };
                    return $e(this.chart.axes, function(t) {
                        i[t.isXAxis ? "xAxis" : "yAxis"].push({
                            axis: t,
                            value: t.toValue(e[t.horiz ? "chartX" : "chartY"])
                        })
                    }), i
                },
                findNearestKDPoint: function(t, o, r) {
                    var s;
                    return $e(t, function(t) {
                        var e = !(t.noSharedTooltip && o) && t.options.findNearestPointBy.indexOf("y") < 0;
                        if (t = t.searchPoint(r, e), (e = ei(t, !0)) && !(e = !ei(s, !0))) {
                            e = s.distX - t.distX;
                            var i = s.dist - t.dist,
                                n = (t.series.group && t.series.group.zIndex) - (s.series.group && s.series.group.zIndex);
                            e = 0 < (0 !== e && o ? e : 0 !== i ? i : 0 !== n ? n : s.series.index > t.series.index ? -1 : 1)
                        }
                        e && (s = t)
                    }), s
                },
                getPointFromEvent: function(t) {
                    t = t.target;
                    for (var e; t && !e;) e = t.point, t = t.parentNode;
                    return e
                },
                getChartCoordinatesFromPoint: function(t, e) {
                    var i = (n = t.series).xAxis,
                        n = n.yAxis,
                        o = ni(t.clientX, t.plotX),
                        r = t.shapeArgs;
                    return i && n ? e ? {
                        chartX: i.len + i.pos - o,
                        chartY: n.len + n.pos - t.plotY
                    } : {
                        chartX: o + i.pos,
                        chartY: t.plotY + n.pos
                    } : r && r.x && r.y ? {
                        chartX: r.x,
                        chartY: r.y
                    } : void 0
                },
                getHoverData: function(t, e, i, n, o, r, s) {
                    var a, l = [],
                        h = s && s.isBoosting;
                    return n = !(!n || !t), s = e && !e.stickyTracking ? [e] : qe.grep(i, function(t) {
                        return t.visible && !(!o && t.directTouch) && ni(t.options.enableMouseTracking, !0) && t.stickyTracking
                    }), e = (a = n ? t : this.findNearestKDPoint(s, o, r)) && a.series, a && (o && !e.noSharedTooltip ? (s = qe.grep(i, function(t) {
                        return t.visible && !(!o && t.directTouch) && ni(t.options.enableMouseTracking, !0) && !t.noSharedTooltip
                    }), $e(s, function(t) {
                        var e = Ze(t.points, function(t) {
                            return t.x === a.x && !t.isNull
                        });
                        ei(e) && (h && (e = t.getPoint(e)), l.push(e))
                    })) : l.push(a)), {
                        hoverPoint: a,
                        hoverSeries: e,
                        hoverPoints: l
                    }
                },
                runPointActions: function(n, t) {
                    var o, e = this.chart,
                        i = e.tooltip && e.tooltip.options.enabled ? e.tooltip : void 0,
                        r = !!i && i.shared,
                        s = (a = t || e.hoverPoint) && a.series || e.hoverSeries,
                        a = (s = this.getHoverData(a, s, e.series, !!t || s && s.directTouch && this.isDirectTouch, r, n, {
                            isBoosting: e.isBoosting
                        })).hoverPoint;
                    if (o = s.hoverPoints, s = s.hoverSeries, t = n && "touchmove" === n.type ? !0 === this.followTouchMove : s && s.tooltipOptions.followPointer, r = r && s && !s.noSharedTooltip, a && (a !== e.hoverPoint || i && i.isHidden)) {
                        if ($e(e.hoverPoints || [], function(t) {
                                -1 === qe.inArray(t, o) && t.setState()
                            }), $e(o || [], function(t) {
                                t.setState("hover")
                            }), e.hoverSeries !== s && s.onMouseOver(), e.hoverPoint && e.hoverPoint.firePointEvent("mouseOut"), !a.series) return;
                        a.firePointEvent("mouseOver"), e.hoverPoints = o, e.hoverPoint = a, i && i.refresh(r ? o : a, n)
                    } else t && i && !i.isHidden && (a = i.getAnchor([{}], n), i.updatePosition({
                        plotX: a[0],
                        plotY: a[1]
                    }));
                    this.unDocMouseMove || (this.unDocMouseMove = Ge(e.container.ownerDocument, "mousemove", function(t) {
                        var e = Ve[qe.hoverChartIndex];
                        e && e.pointer.onDocumentMouseMove(t)
                    })), $e(e.axes, function(e) {
                        var t = ni(e.crosshair.snap, !0),
                            i = t ? qe.find(o, function(t) {
                                return t.series[e.coll] === e
                            }) : void 0;
                        i || !t ? e.drawCrosshair(n, i) : e.hideCrosshair()
                    })
                },
                reset: function(e, t) {
                    var i = this.chart,
                        n = i.hoverSeries,
                        o = i.hoverPoint,
                        r = i.hoverPoints,
                        s = i.tooltip,
                        a = s && s.shared ? r : o;
                    e && a && $e(oi(a), function(t) {
                        t.series.isCartesian && void 0 === t.plotX && (e = !1)
                    }), e ? s && a && (s.refresh(a), s.shared && r ? $e(r, function(t) {
                        t.setState(t.state, !0), t.series.xAxis.crosshair && t.series.xAxis.drawCrosshair(null, t), t.series.yAxis.crosshair && t.series.yAxis.drawCrosshair(null, t)
                    }) : o && (o.setState(o.state, !0), $e(i.axes, function(t) {
                        t.crosshair && t.drawCrosshair(null, o)
                    }))) : (o && o.onMouseOut(), r && $e(r, function(t) {
                        t.setState()
                    }), n && n.onMouseOut(), s && s.hide(t), this.unDocMouseMove && (this.unDocMouseMove = this.unDocMouseMove()), $e(i.axes, function(t) {
                        t.hideCrosshair()
                    }), this.hoverX = i.hoverPoints = i.hoverPoint = null)
                },
                scaleGroups: function(e, i) {
                    var n, o = this.chart;
                    $e(o.series, function(t) {
                        n = e || t.getPlotBox(), t.xAxis && t.xAxis.zoomEnabled && t.group && (t.group.attr(n), t.markerGroup && (t.markerGroup.attr(n), t.markerGroup.clip(i ? o.clipRect : null)), t.dataLabelsGroup && t.dataLabelsGroup.attr(n))
                    }), o.clipRect.attr(i || o.clipBox)
                },
                dragStart: function(t) {
                    var e = this.chart;
                    e.mouseIsDown = t.type, e.cancelClick = !1, e.mouseDownX = this.mouseDownX = t.chartX, e.mouseDownY = this.mouseDownY = t.chartY
                },
                drag: function(t) {
                    var e, i = this.chart,
                        n = i.options.chart,
                        o = t.chartX,
                        r = t.chartY,
                        s = this.zoomHor,
                        a = this.zoomVert,
                        l = i.plotLeft,
                        h = i.plotTop,
                        c = i.plotWidth,
                        u = i.plotHeight,
                        d = this.selectionMarker,
                        p = this.mouseDownX,
                        f = this.mouseDownY,
                        g = n.panKey && t[n.panKey + "Key"];
                    d && d.touch || (o < l ? o = l : l + c < o && (o = l + c), r < h ? r = h : h + u < r && (r = h + u), this.hasDragged = Math.sqrt(Math.pow(p - o, 2) + Math.pow(f - r, 2)), 10 < this.hasDragged && (e = i.isInsidePlot(p - l, f - h), i.hasCartesianSeries && (this.zoomX || this.zoomY) && e && !g && !d && (this.selectionMarker = d = i.renderer.rect(l, h, s ? 1 : c, a ? 1 : u, 0).attr({
                        fill: n.selectionMarkerFill || Xe("#335cad").setOpacity(.25).get(),
                        "class": "highcharts-selection-marker",
                        zIndex: 7
                    }).add()), d && s && (o -= p, d.attr({
                        width: Math.abs(o),
                        x: (0 < o ? 0 : o) + p
                    })), d && a && (o = r - f, d.attr({
                        height: Math.abs(o),
                        y: (0 < o ? 0 : o) + f
                    })), e && !d && n.panning && i.pan(t, n.panning)))
                },
                drop: function(o) {
                    var r = this,
                        e = this.chart,
                        s = this.hasPinched;
                    if (this.selectionMarker) {
                        var a, l = {
                                originalEvent: o,
                                xAxis: [],
                                yAxis: []
                            },
                            t = this.selectionMarker,
                            h = t.attr ? t.attr("x") : t.x,
                            c = t.attr ? t.attr("y") : t.y,
                            u = t.attr ? t.attr("width") : t.width,
                            d = t.attr ? t.attr("height") : t.height;
                        (this.hasDragged || s) && ($e(e.axes, function(t) {
                            if (t.zoomEnabled && Ke(t.min) && (s || r[{
                                    xAxis: "zoomX",
                                    yAxis: "zoomY"
                                }[t.coll]])) {
                                var e = t.horiz,
                                    i = "touchend" === o.type ? t.minPixelPadding : 0,
                                    n = t.toValue((e ? h : c) + i);
                                e = t.toValue((e ? h + u : c + d) - i), l[t.coll].push({
                                    axis: t,
                                    min: Math.min(n, e),
                                    max: Math.max(n, e)
                                }), a = !0
                            }
                        }), a && Je(e, "selection", l, function(t) {
                            e.zoom(Qe(t, s ? {
                                animation: !1
                            } : null))
                        })), ti(e.index) && (this.selectionMarker = this.selectionMarker.destroy()), s && this.scaleGroups()
                    }
                    e && ti(e.index) && (Ye(e.container, {
                        cursor: e._cursor
                    }), e.cancelClick = 10 < this.hasDragged, e.mouseIsDown = this.hasDragged = this.hasPinched = !1, this.pinchDown = [])
                },
                onContainerMouseDown: function(t) {
                    2 !== (t = this.normalize(t)).button && (this.zoomOption(t), t.preventDefault && t.preventDefault(), this.dragStart(t))
                },
                onDocumentMouseUp: function(t) {
                    Ve[qe.hoverChartIndex] && Ve[qe.hoverChartIndex].pointer.drop(t)
                },
                onDocumentMouseMove: function(t) {
                    var e = this.chart,
                        i = this.chartPosition;
                    t = this.normalize(t, i), !i || this.inClass(t.target, "highcharts-tracker") || e.isInsidePlot(t.chartX - e.plotLeft, t.chartY - e.plotTop) || this.reset()
                },
                onContainerMouseLeave: function(t) {
                    var e = Ve[qe.hoverChartIndex];
                    e && (t.relatedTarget || t.toElement) && (e.pointer.reset(), e.pointer.chartPosition = null)
                },
                onContainerMouseMove: function(t) {
                    var e = this.chart;
                    Ke(qe.hoverChartIndex) && Ve[qe.hoverChartIndex] && Ve[qe.hoverChartIndex].mouseIsDown || (qe.hoverChartIndex = e.index), (t = this.normalize(t)).returnValue = !1, "mousedown" === e.mouseIsDown && this.drag(t), !this.inClass(t.target, "highcharts-tracker") && !e.isInsidePlot(t.chartX - e.plotLeft, t.chartY - e.plotTop) || e.openMenu || this.runPointActions(t)
                },
                inClass: function(t, e) {
                    for (var i; t;) {
                        if (i = Ue(t, "class")) {
                            if (-1 !== i.indexOf(e)) return !0;
                            if (-1 !== i.indexOf("highcharts-container")) return !1
                        }
                        t = t.parentNode
                    }
                },
                onTrackerMouseOut: function(t) {
                    var e = this.chart.hoverSeries;
                    t = t.relatedTarget || t.toElement, this.isDirectTouch = !1, !e || !t || e.stickyTracking || this.inClass(t, "highcharts-tooltip") || this.inClass(t, "highcharts-series-" + e.index) && this.inClass(t, "highcharts-tracker") || e.onMouseOut()
                },
                onContainerClick: function(t) {
                    var e = this.chart,
                        i = e.hoverPoint,
                        n = e.plotLeft,
                        o = e.plotTop;
                    t = this.normalize(t), e.cancelClick || (i && this.inClass(t.target, "highcharts-tracker") ? (Je(i.series, "click", Qe(t, {
                        point: i
                    })), e.hoverPoint && i.firePointEvent("click", t)) : (Qe(t, this.getCoordinates(t)), e.isInsidePlot(t.chartX - n, t.chartY - o) && Je(e, "click", t)))
                },
                setDOMEvents: function() {
                    var e = this,
                        t = e.chart.container,
                        i = t.ownerDocument;
                    t.onmousedown = function(t) {
                        e.onContainerMouseDown(t)
                    }, t.onmousemove = function(t) {
                        e.onContainerMouseMove(t)
                    }, t.onclick = function(t) {
                        e.onContainerClick(t)
                    }, this.unbindContainerMouseLeave = Ge(t, "mouseleave", e.onContainerMouseLeave), qe.unbindDocumentMouseUp || (qe.unbindDocumentMouseUp = Ge(i, "mouseup", e.onDocumentMouseUp)), qe.hasTouch && (t.ontouchstart = function(t) {
                        e.onContainerTouchStart(t)
                    }, t.ontouchmove = function(t) {
                        e.onContainerTouchMove(t)
                    }, qe.unbindDocumentTouchEnd || (qe.unbindDocumentTouchEnd = Ge(i, "touchend", e.onDocumentTouchEnd)))
                },
                destroy: function() {
                    var i = this;
                    i.unDocMouseMove && i.unDocMouseMove(), this.unbindContainerMouseLeave(), qe.chartCount || (qe.unbindDocumentMouseUp && (qe.unbindDocumentMouseUp = qe.unbindDocumentMouseUp()), qe.unbindDocumentTouchEnd && (qe.unbindDocumentTouchEnd = qe.unbindDocumentTouchEnd())), clearInterval(i.tooltipTimeout), qe.objectEach(i, function(t, e) {
                        i[e] = null
                    })
                }
            }, ai = (si = It).charts, li = si.each, hi = si.extend, ci = si.map, ui = si.noop, di = si.pick, hi(si.Pointer.prototype, {
                pinchTranslate: function(t, e, i, n, o, r) {
                    this.zoomHor && this.pinchTranslateDirection(!0, t, e, i, n, o, r), this.zoomVert && this.pinchTranslateDirection(!1, t, e, i, n, o, r)
                },
                pinchTranslateDirection: function(t, e, i, n, o, r, s, a) {
                    var l, h, c, u = this.chart,
                        d = t ? "x" : "y",
                        p = t ? "X" : "Y",
                        f = "chart" + p,
                        g = t ? "width" : "height",
                        m = u["plot" + (t ? "Left" : "Top")],
                        v = a || 1,
                        y = u.inverted,
                        b = u.bounds[t ? "h" : "v"],
                        x = 1 === e.length,
                        w = e[0][f],
                        T = i[0][f],
                        C = !x && e[1][f],
                        S = !x && i[1][f];
                    (i = function() {
                        !x && 20 < Math.abs(w - C) && (v = a || Math.abs(T - S) / Math.abs(w - C)), h = (m - T) / v + w, l = u["plot" + (t ? "Width" : "Height")] / v
                    })(), (e = h) < b.min ? (e = b.min, c = !0) : e + l > b.max && (e = b.max - l, c = !0), c ? (T -= .8 * (T - s[d][0]), x || (S -= .8 * (S - s[d][1])), i()) : s[d] = [T, S], y || (r[d] = h - m, r[g] = l), r = y ? 1 / v : v, o[g] = l, o[d] = e, n[y ? t ? "scaleY" : "scaleX" : "scale" + p] = v, n["translate" + p] = r * m + (T - r * w)
                },
                pinch: function(t) {
                    var e = this,
                        s = e.chart,
                        i = e.pinchDown,
                        n = t.touches,
                        o = n.length,
                        r = e.lastValidTouch,
                        a = e.hasZoom,
                        l = e.selectionMarker,
                        h = {},
                        c = 1 === o && (e.inClass(t.target, "highcharts-tracker") && s.runTrackerClick || e.runChartClick),
                        u = {};
                    1 < o && (e.initiated = !0), a && e.initiated && !c && t.preventDefault(), ci(n, function(t) {
                        return e.normalize(t)
                    }), "touchstart" === t.type ? (li(n, function(t, e) {
                        i[e] = {
                            chartX: t.chartX,
                            chartY: t.chartY
                        }
                    }), r.x = [i[0].chartX, i[1] && i[1].chartX], r.y = [i[0].chartY, i[1] && i[1].chartY], li(s.axes, function(t) {
                        if (t.zoomEnabled) {
                            var e = s.bounds[t.horiz ? "h" : "v"],
                                i = t.minPixelPadding,
                                n = t.toPixels(di(t.options.min, t.dataMin)),
                                o = t.toPixels(di(t.options.max, t.dataMax)),
                                r = Math.max(n, o);
                            e.min = Math.min(t.pos, Math.min(n, o) - i), e.max = Math.max(t.pos + t.len, r + i)
                        }
                    }), e.res = !0) : e.followTouchMove && 1 === o ? this.runPointActions(e.normalize(t)) : i.length && (l || (e.selectionMarker = l = hi({
                        destroy: ui,
                        touch: !0
                    }, s.plotBox)), e.pinchTranslate(i, n, h, l, u, r), e.hasPinched = a, e.scaleGroups(h, u), e.res && (e.res = !1, this.reset(!1, 0)))
                },
                touch: function(t, e) {
                    var i, n = this.chart;
                    n.index !== si.hoverChartIndex && this.onContainerMouseLeave({
                        relatedTarget: !0
                    }), si.hoverChartIndex = n.index, 1 === t.touches.length ? (t = this.normalize(t), n.isInsidePlot(t.chartX - n.plotLeft, t.chartY - n.plotTop) && !n.openMenu ? (e && this.runPointActions(t), "touchmove" === t.type && (i = !!(e = this.pinchDown)[0] && 4 <= Math.sqrt(Math.pow(e[0].chartX - t.chartX, 2) + Math.pow(e[0].chartY - t.chartY, 2))), di(i, !0) && this.pinch(t)) : e && this.reset()) : 2 === t.touches.length && this.pinch(t)
                },
                onContainerTouchStart: function(t) {
                    this.zoomOption(t), this.touch(t, !0)
                },
                onContainerTouchMove: function(t) {
                    this.touch(t)
                },
                onDocumentTouchEnd: function(t) {
                    ai[si.hoverChartIndex] && ai[si.hoverChartIndex].pointer.drop(t)
                }
            }),
            function(o) {
                var e = o.addEvent,
                    r = o.charts,
                    n = o.css,
                    i = o.doc,
                    t = o.extend,
                    s = o.noop,
                    a = o.Pointer,
                    l = o.removeEvent,
                    h = o.win,
                    c = o.wrap;
                if (!o.hasTouch && (h.PointerEvent || h.MSPointerEvent)) {
                    var u = {},
                        d = !!h.PointerEvent,
                        p = function() {
                            var e = [];
                            return e.item = function(t) {
                                return this[t]
                            }, o.objectEach(u, function(t) {
                                e.push({
                                    pageX: t.pageX,
                                    pageY: t.pageY,
                                    target: t.target
                                })
                            }), e
                        },
                        f = function(t, e, i, n) {
                            "touch" !== t.pointerType && t.pointerType !== t.MSPOINTER_TYPE_TOUCH || !r[o.hoverChartIndex] || (n(t), (n = r[o.hoverChartIndex].pointer)[e]({
                                type: i,
                                target: t.currentTarget,
                                preventDefault: s,
                                touches: p()
                            }))
                        };
                    t(a.prototype, {
                        onContainerPointerDown: function(t) {
                            f(t, "onContainerTouchStart", "touchstart", function(t) {
                                u[t.pointerId] = {
                                    pageX: t.pageX,
                                    pageY: t.pageY,
                                    target: t.currentTarget
                                }
                            })
                        },
                        onContainerPointerMove: function(t) {
                            f(t, "onContainerTouchMove", "touchmove", function(t) {
                                u[t.pointerId] = {
                                    pageX: t.pageX,
                                    pageY: t.pageY
                                }, u[t.pointerId].target || (u[t.pointerId].target = t.currentTarget)
                            })
                        },
                        onDocumentPointerUp: function(t) {
                            f(t, "onDocumentTouchEnd", "touchend", function(t) {
                                delete u[t.pointerId]
                            })
                        },
                        batchMSEvents: function(t) {
                            t(this.chart.container, d ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown), t(this.chart.container, d ? "pointermove" : "MSPointerMove", this.onContainerPointerMove), t(i, d ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp)
                        }
                    }), c(a.prototype, "init", function(t, e, i) {
                        t.call(this, e, i), this.hasZoom && n(e.container, {
                            "-ms-touch-action": "none",
                            "touch-action": "none"
                        })
                    }), c(a.prototype, "setDOMEvents", function(t) {
                        t.apply(this), (this.hasZoom || this.followTouchMove) && this.batchMSEvents(e)
                    }), c(a.prototype, "destroy", function(t) {
                        this.batchMSEvents(l), t.call(this)
                    })
                }
            }(It), fi = (pi = It).addEvent, gi = pi.css, mi = pi.discardElement, vi = pi.defined, yi = pi.each, bi = pi.fireEvent, xi = pi.isFirefox, wi = pi.marginNames, Ti = pi.merge, Ci = pi.pick, Si = pi.setAnimation, Ei = pi.stableSort, Ai = pi.win, ki = pi.wrap, pi.Legend = function(t, e) {
                this.init(t, e)
            }, pi.Legend.prototype = {
                init: function(t, e) {
                    this.chart = t, this.setOptions(e), e.enabled && (this.render(), fi(this.chart, "endResize", function() {
                        this.legend.positionCheckboxes()
                    }), this.proximate ? this.unchartrender = fi(this.chart, "render", function() {
                        this.legend.proximatePositions(), this.legend.positionItems()
                    }) : this.unchartrender && this.unchartrender())
                },
                setOptions: function(t) {
                    var e = Ci(t.padding, 8);
                    this.options = t, this.itemStyle = t.itemStyle, this.itemHiddenStyle = Ti(this.itemStyle, t.itemHiddenStyle), this.itemMarginTop = t.itemMarginTop || 0, this.padding = e, this.initialItemY = e - 5, this.symbolWidth = Ci(t.symbolWidth, 16), this.pages = [], this.proximate = "proximate" === t.layout && !this.chart.inverted
                },
                update: function(t, e) {
                    var i = this.chart;
                    this.setOptions(Ti(!0, this.options, t)), this.destroy(), i.isDirtyLegend = i.isDirtyBox = !0, Ci(e, !0) && i.redraw(), bi(this, "afterUpdate")
                },
                colorizeItem: function(t, e) {
                    t.legendGroup[e ? "removeClass" : "addClass"]("highcharts-legend-item-hidden");
                    var i = this.options,
                        n = t.legendItem,
                        o = t.legendLine,
                        r = t.legendSymbol,
                        s = this.itemHiddenStyle.color,
                        a = (i = e ? i.itemStyle.color : s, e && t.color || s),
                        l = t.options && t.options.marker,
                        h = {
                            fill: a
                        };
                    n && n.css({
                        fill: i,
                        color: i
                    }), o && o.attr({
                        stroke: a
                    }), r && (l && r.isMarker && (h = t.pointAttribs(), e || (h.stroke = h.fill = s)), r.attr(h)), bi(this, "afterColorizeItem", {
                        item: t,
                        visible: e
                    })
                },
                positionItems: function() {
                    yi(this.allItems, this.positionItem, this), this.chart.isResizing || this.positionCheckboxes()
                },
                positionItem: function(t) {
                    var e = (i = this.options).symbolPadding,
                        i = !i.rtl,
                        n = (o = t._legendItemPos)[0],
                        o = o[1],
                        r = t.checkbox;
                    (t = t.legendGroup) && t.element && t[vi(t.translateY) ? "animate" : "attr"]({
                        translateX: i ? n : this.legendWidth - n - 2 * e - 4,
                        translateY: o
                    }), r && (r.x = n, r.y = o)
                },
                destroyItem: function(e) {
                    var t = e.checkbox;
                    yi(["legendItem", "legendLine", "legendSymbol", "legendGroup"], function(t) {
                        e[t] && (e[t] = e[t].destroy())
                    }), t && mi(e.checkbox)
                },
                destroy: function() {
                    function e(t) {
                        this[t] && (this[t] = this[t].destroy())
                    }
                    yi(this.getAllItems(), function(t) {
                        yi(["legendItem", "legendGroup"], e, t)
                    }), yi("clipRect up down pager nav box title group".split(" "), e, this), this.display = null
                },
                positionCheckboxes: function() {
                    var n, o = this.group && this.group.alignAttr,
                        r = this.clipHeight || this.legendHeight,
                        s = this.titleHeight;
                    o && (n = o.translateY, yi(this.allItems, function(t) {
                        var e, i = t.checkbox;
                        i && (e = n + s + i.y + (this.scrollOffset || 0) + 3, gi(i, {
                            left: o.translateX + t.checkboxOffset + i.x - 20 + "px",
                            top: e + "px",
                            display: n - 6 < e && e < n + r - 6 ? "" : "none"
                        }))
                    }, this))
                },
                renderTitle: function() {
                    var t = this.options,
                        e = this.padding,
                        i = t.title,
                        n = 0;
                    i.text && (this.title || (this.title = this.chart.renderer.label(i.text, e - 3, e - 4, null, null, null, t.useHTML, null, "legend-title").attr({
                        zIndex: 1
                    }).css(i.style).add(this.group)), n = (t = this.title.getBBox()).height, this.offsetWidth = t.width, this.contentGroup.attr({
                        translateY: n
                    })), this.titleHeight = n
                },
                setText: function(t) {
                    var e = this.options;
                    t.legendItem.attr({
                        text: e.labelFormat ? pi.format(e.labelFormat, t, this.chart.time) : e.labelFormatter.call(t)
                    })
                },
                renderItem: function(t) {
                    var e = this.chart,
                        i = e.renderer,
                        n = this.options,
                        o = this.symbolWidth,
                        r = n.symbolPadding,
                        s = this.itemStyle,
                        a = this.itemHiddenStyle,
                        l = "horizontal" === n.layout ? Ci(n.itemDistance, 20) : 0,
                        h = !n.rtl,
                        c = t.legendItem,
                        u = !t.series,
                        d = !u && t.series.drawLegendSymbol ? t.series : t,
                        p = d.options,
                        f = (l = o + r + l + ((p = this.createCheckboxForItem && p && p.showCheckbox) ? 20 : 0), n.useHTML),
                        g = t.options.className;
                    c || (t.legendGroup = i.g("legend-item").addClass("highcharts-" + d.type + "-series highcharts-color-" + t.colorIndex + (g ? " " + g : "") + (u ? " highcharts-series-" + t.index : "")).attr({
                        zIndex: 1
                    }).add(this.scrollGroup), t.legendItem = c = i.text("", h ? o + r : -r, this.baseline || 0, f).css(Ti(t.visible ? s : a)).attr({
                        align: h ? "left" : "right",
                        zIndex: 2
                    }).add(t.legendGroup), this.baseline || (o = s.fontSize, this.fontMetrics = i.fontMetrics(o, c), this.baseline = this.fontMetrics.f + 3 + this.itemMarginTop, c.attr("y", this.baseline)), this.symbolHeight = n.symbolHeight || this.fontMetrics.f, d.drawLegendSymbol(this, t), this.setItemEvents && this.setItemEvents(t, c, f), p && this.createCheckboxForItem(t)), this.colorizeItem(t, t.visible), s.width || c.css({
                        width: (n.itemWidth || n.width || e.spacingBox.width) - l
                    }), this.setText(t), e = c.getBBox(), t.itemWidth = t.checkboxOffset = n.itemWidth || t.legendItemWidth || e.width + l, this.maxItemWidth = Math.max(this.maxItemWidth, t.itemWidth), this.totalItemWidth += t.itemWidth, this.itemHeight = t.itemHeight = Math.round(t.legendItemHeight || e.height || this.symbolHeight)
                },
                layoutItem: function(t) {
                    var e = this.options,
                        i = this.padding,
                        n = "horizontal" === e.layout,
                        o = t.itemHeight,
                        r = e.itemMarginBottom || 0,
                        s = this.itemMarginTop,
                        a = n ? Ci(e.itemDistance, 20) : 0,
                        l = e.width,
                        h = l || this.chart.spacingBox.width - 2 * i - e.x;
                    e = e.alignColumns && this.totalItemWidth > h ? this.maxItemWidth : t.itemWidth, n && this.itemX - i + e > h && (this.itemX = i, this.itemY += s + this.lastLineHeight + r, this.lastLineHeight = 0), this.lastItemY = s + this.itemY + r, this.lastLineHeight = Math.max(o, this.lastLineHeight), t._legendItemPos = [this.itemX, this.itemY], n ? this.itemX += e : (this.itemY += s + o + r, this.lastLineHeight = o), this.offsetWidth = l || Math.max((n ? this.itemX - i - (t.checkbox ? 0 : a) : e) + i, this.offsetWidth)
                },
                getAllItems: function() {
                    var i = [];
                    return yi(this.chart.series, function(t) {
                        var e = t && t.options;
                        t && Ci(e.showInLegend, !vi(e.linkedTo) && void 0, !0) && (i = i.concat(t.legendItems || ("point" === e.legendType ? t.data : t)))
                    }), bi(this, "afterGetAllItems", {
                        allItems: i
                    }), i
                },
                getAlignment: function() {
                    var t = this.options;
                    return this.proximate ? t.align.charAt(0) + "tv" : t.floating ? "" : t.align.charAt(0) + t.verticalAlign.charAt(0) + t.layout.charAt(0)
                },
                adjustMargins: function(i, n) {
                    var o = this.chart,
                        r = this.options,
                        s = this.getAlignment();
                    s && yi([/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/], function(t, e) {
                        t.test(s) && !vi(i[e]) && (o[wi[e]] = Math.max(o[wi[e]], o.legend[(e + 1) % 2 ? "legendHeight" : "legendWidth"] + [1, -1, -1, 1][e] * r[e % 2 ? "x" : "y"] + Ci(r.margin, 12) + n[e] + (0 === e && void 0 !== o.options.title.margin ? o.titleOffset + o.options.title.margin : 0)))
                    })
                },
                proximatePositions: function() {
                    var n = this.chart,
                        o = [],
                        r = "left" === this.options.align;
                    yi(this.allItems, function(t) {
                        var e, i;
                        e = r, t.xAxis && t.points && (t.xAxis.options.reversed && (e = !e), e = pi.find(e ? t.points : t.points.slice(0).reverse(), function(t) {
                            return pi.isNumber(t.plotY)
                        }), i = t.legendGroup.getBBox().height, o.push({
                            target: t.visible ? (e ? e.plotY : t.xAxis.height) - .3 * i : n.plotHeight,
                            size: i,
                            item: t
                        }))
                    }, this), pi.distribute(o, n.plotHeight), yi(o, function(t) {
                        t.item._legendItemPos[1] = n.plotTop - n.spacing[0] + t.pos
                    })
                },
                render: function() {
                    var t, e, i, n = this.chart,
                        o = n.renderer,
                        r = this.group,
                        s = this.box,
                        a = this.options,
                        l = this.padding;
                    this.itemX = l, this.itemY = this.initialItemY, this.lastItemY = this.offsetWidth = 0, r || (this.group = r = o.g("legend").attr({
                        zIndex: 7
                    }).add(), this.contentGroup = o.g().attr({
                        zIndex: 1
                    }).add(r), this.scrollGroup = o.g().add(this.contentGroup)), this.renderTitle(), t = this.getAllItems(), Ei(t, function(t, e) {
                        return (t.options && t.options.legendIndex || 0) - (e.options && e.options.legendIndex || 0)
                    }), a.reversed && t.reverse(), this.allItems = t, this.display = e = !!t.length, this.itemHeight = this.totalItemWidth = this.maxItemWidth = this.lastLineHeight = 0, yi(t, this.renderItem, this), yi(t, this.layoutItem, this), t = (a.width || this.offsetWidth) + l, i = this.lastItemY + this.lastLineHeight + this.titleHeight, i = this.handleOverflow(i), i += l, s || (this.box = s = o.rect().addClass("highcharts-legend-box").attr({
                        r: a.borderRadius
                    }).add(r), s.isNew = !0), s.attr({
                        stroke: a.borderColor,
                        "stroke-width": a.borderWidth || 0,
                        fill: a.backgroundColor || "none"
                    }).shadow(a.shadow), 0 < t && 0 < i && (s[s.isNew ? "attr" : "animate"](s.crisp.call({}, {
                        x: 0,
                        y: 0,
                        width: t,
                        height: i
                    }, s.strokeWidth())), s.isNew = !1), s[e ? "show" : "hide"](), this.legendWidth = t, this.legendHeight = i, e && (o = n.spacingBox, /(lth|ct|rth)/.test(this.getAlignment()) && (o = Ti(o, {
                        y: o.y + n.titleOffset + n.options.title.margin
                    })), r.align(Ti(a, {
                        width: t,
                        height: i,
                        verticalAlign: this.proximate ? "top" : a.verticalAlign
                    }), !0, o)), this.proximate || this.positionItems()
                },
                handleOverflow: function(t) {
                    var r, s, e = this,
                        i = (l = this.chart).renderer,
                        n = this.options,
                        o = n.y,
                        a = this.padding,
                        l = l.spacingBox.height + ("top" === n.verticalAlign ? -o : o) - a,
                        h = (o = n.maxHeight, this.clipRect),
                        c = n.navigation,
                        u = Ci(c.animation, !0),
                        d = c.arrowSize || 12,
                        p = this.nav,
                        f = this.pages,
                        g = this.allItems,
                        m = function(t) {
                            "number" == typeof t ? h.attr({
                                height: t
                            }) : h && (e.clipRect = h.destroy(), e.contentGroup.clip()), e.contentGroup.div && (e.contentGroup.div.style.clip = t ? "rect(" + a + "px,9999px," + (a + t) + "px,0)" : "auto")
                        };
                    return "horizontal" !== n.layout || "middle" === n.verticalAlign || n.floating || (l /= 2), o && (l = Math.min(l, o)), f.length = 0, l < t && !1 !== c.enabled ? (this.clipHeight = r = Math.max(l - 20 - this.titleHeight - a, 0), this.currentPage = Ci(this.currentPage, 1), this.fullHeight = t, yi(g, function(t, e) {
                        var i = t._legendItemPos[1],
                            n = Math.round(t.legendItem.getBBox().height),
                            o = f.length;
                        (!o || i - f[o - 1] > r && (s || i) !== f[o - 1]) && (f.push(s || i), o++), t.pageIx = o - 1, s && (
                            g[e - 1].pageIx = o - 1), e === g.length - 1 && i + n - f[o - 1] > r && (f.push(i), t.pageIx = o), i !== s && (s = i)
                    }), h || (h = e.clipRect = i.clipRect(0, a, 9999, 0), e.contentGroup.clip(h)), m(r), p || (this.nav = p = i.g().attr({
                        zIndex: 1
                    }).add(this.group), this.up = i.symbol("triangle", 0, 0, d, d).on("click", function() {
                        e.scroll(-1, u)
                    }).add(p), this.pager = i.text("", 15, 10).addClass("highcharts-legend-navigation").css(c.style).add(p), this.down = i.symbol("triangle-down", 0, 0, d, d).on("click", function() {
                        e.scroll(1, u)
                    }).add(p)), e.scroll(0), t = l) : p && (m(), this.nav = p.destroy(), this.scrollGroup.attr({
                        translateY: 1
                    }), this.clipHeight = 0), t
                },
                scroll: function(t, e) {
                    var i = this.pages,
                        n = i.length;
                    t = this.currentPage + t;
                    var o = this.clipHeight,
                        r = this.options.navigation,
                        s = this.pager,
                        a = this.padding;
                    n < t && (t = n), 0 < t && (void 0 !== e && Si(e, this.chart), this.nav.attr({
                        translateX: a,
                        translateY: o + this.padding + 7 + this.titleHeight,
                        visibility: "visible"
                    }), this.up.attr({
                        "class": 1 === t ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                    }), s.attr({
                        text: t + "/" + n
                    }), this.down.attr({
                        x: 18 + this.pager.getBBox().width,
                        "class": t === n ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                    }), this.up.attr({
                        fill: 1 === t ? r.inactiveColor : r.activeColor
                    }).css({
                        cursor: 1 === t ? "default" : "pointer"
                    }), this.down.attr({
                        fill: t === n ? r.inactiveColor : r.activeColor
                    }).css({
                        cursor: t === n ? "default" : "pointer"
                    }), this.scrollOffset = -i[t - 1] + this.initialItemY, this.scrollGroup.animate({
                        translateY: this.scrollOffset
                    }), this.currentPage = t, this.positionCheckboxes())
                }
            }, pi.LegendSymbolMixin = {
                drawRectangle: function(t, e) {
                    var i = t.symbolHeight,
                        n = t.options.squareSymbol;
                    e.legendSymbol = this.chart.renderer.rect(n ? (t.symbolWidth - i) / 2 : 0, t.baseline - i + 1, n ? i : t.symbolWidth, i, Ci(t.options.symbolRadius, i / 2)).addClass("highcharts-point").attr({
                        zIndex: 3
                    }).add(e.legendGroup)
                },
                drawLineMarker: function(t) {
                    var e, i = this.options,
                        n = i.marker,
                        o = t.symbolWidth,
                        r = t.symbolHeight,
                        s = r / 2,
                        a = this.chart.renderer,
                        l = this.legendGroup;
                    t = t.baseline - Math.round(.3 * t.fontMetrics.b), e = {
                        "stroke-width": i.lineWidth || 0
                    }, i.dashStyle && (e.dashstyle = i.dashStyle), this.legendLine = a.path(["M", 0, t, "L", o, t]).addClass("highcharts-graph").attr(e).add(l), n && !1 !== n.enabled && o && (i = Math.min(Ci(n.radius, s), s), 0 === this.symbol.indexOf("url") && (n = Ti(n, {
                        width: r,
                        height: r
                    }), i = 0), this.legendSymbol = n = a.symbol(this.symbol, o / 2 - i, t - i, 2 * i, 2 * i, n).addClass("highcharts-point").add(l), n.isMarker = !0)
                }
            }, (/Trident\/7\.0/.test(Ai.navigator.userAgent) || xi) && ki(pi.Legend.prototype, "positionItem", function(t, e) {
                var i = this,
                    n = function() {
                        e._legendItemPos && t.call(i, e)
                    };
                n(), setTimeout(n)
            }), Mi = (_i = It).addEvent, Oi = _i.animate, Li = _i.animObject, Di = _i.attr, Ii = _i.doc, Pi = _i.Axis, Ni = _i.createElement, Ri = _i.defaultOptions, Hi = _i.discardElement, zi = _i.charts, Bi = _i.css, Wi = _i.defined, ji = _i.each, Fi = _i.extend, qi = _i.find, Gi = _i.fireEvent, Ui = _i.grep, Vi = _i.isNumber, Xi = _i.isObject, Yi = _i.isString, Ki = _i.Legend, $i = _i.marginNames, Qi = _i.merge, Zi = _i.objectEach, Ji = _i.Pointer, tn = _i.pick, en = _i.pInt, nn = _i.removeEvent, on = _i.seriesTypes, rn = _i.splat, sn = _i.syncTimeout, an = _i.win, ln = _i.Chart = function() {
                this.getArgs.apply(this, arguments)
            }, _i.chart = function(t, e, i) {
                return new ln(t, e, i)
            }, Fi(ln.prototype, {
                callbacks: [],
                getArgs: function() {
                    var t = [].slice.call(arguments);
                    (Yi(t[0]) || t[0].nodeName) && (this.renderTo = t.shift()), this.init(t[0], t[1])
                },
                init: function(n, o) {
                    var r, s, a = n.series,
                        l = n.plotOptions || {};
                    Gi(this, "init", {
                        args: arguments
                    }, function() {
                        for (s in n.series = null, (r = Qi(Ri, n)).plotOptions) r.plotOptions[s].tooltip = l[s] && Qi(l[s].tooltip) || void 0;
                        r.tooltip.userOptions = n.chart && n.chart.forExport && n.tooltip.userOptions || n.tooltip, r.series = n.series = a, this.userOptions = n;
                        var t = r.chart,
                            e = t.events;
                        this.margin = [], this.spacing = [], this.bounds = {
                            h: {},
                            v: {}
                        }, this.labelCollectors = [], this.callback = o, this.isResizing = 0, this.options = r, this.axes = [], this.series = [], this.time = n.time && _i.keys(n.time).length ? new _i.Time(n.time) : _i.time, this.hasCartesianSeries = t.showAxes;
                        var i = this;
                        i.index = zi.length, zi.push(i), _i.chartCount++, e && Zi(e, function(t, e) {
                            Mi(i, e, t)
                        }), i.xAxis = [], i.yAxis = [], i.pointCount = i.colorCounter = i.symbolCounter = 0, Gi(i, "afterInit"), i.firstRender()
                    })
                },
                initSeries: function(t) {
                    var e = this.options.chart;
                    return (e = on[t.type || e.type || e.defaultSeriesType]) || _i.error(17, !0), (e = new e).init(this, t), e
                },
                orderSeries: function(t) {
                    var e = this.series;
                    for (t = t || 0; t < e.length; t++) e[t] && (e[t].index = t, e[t].name = e[t].getName())
                },
                isInsidePlot: function(t, e, i) {
                    var n = i ? e : t;
                    return t = i ? t : e, 0 <= n && n <= this.plotWidth && 0 <= t && t <= this.plotHeight
                },
                redraw: function(t) {
                    Gi(this, "beforeRedraw");
                    var i, e, n, o = this.axes,
                        r = this.series,
                        s = this.pointer,
                        a = this.legend,
                        l = this.isDirtyLegend,
                        h = this.hasCartesianSeries,
                        c = this.isDirtyBox,
                        u = this.renderer,
                        d = u.isHidden(),
                        p = [];
                    for (this.setResponsive && this.setResponsive(!1), _i.setAnimation(t, this), d && this.temporaryDisplay(), this.layOutTitles(), t = r.length; t--;)
                        if ((n = r[t]).options.stacking && (i = !0, n.isDirty)) {
                            e = !0;
                            break
                        }
                    if (e)
                        for (t = r.length; t--;)(n = r[t]).options.stacking && (n.isDirty = !0);
                    ji(r, function(t) {
                        t.isDirty && "point" === t.options.legendType && (t.updateTotals && t.updateTotals(), l = !0), t.isDirtyData && Gi(t, "updatedData")
                    }), l && a.options.enabled && (a.render(), this.isDirtyLegend = !1), i && this.getStacks(), h && ji(o, function(t) {
                        t.updateNames(), t.setScale()
                    }), this.getMargins(), h && (ji(o, function(t) {
                        t.isDirty && (c = !0)
                    }), ji(o, function(t) {
                        var e = t.min + "," + t.max;
                        t.extKey !== e && (t.extKey = e, p.push(function() {
                            Gi(t, "afterSetExtremes", Fi(t.eventArgs, t.getExtremes())), delete t.eventArgs
                        })), (c || i) && t.redraw()
                    })), c && this.drawChartBox(), Gi(this, "predraw"), ji(r, function(t) {
                        (c || t.isDirty) && t.visible && t.redraw(), t.isDirtyData = !1
                    }), s && s.reset(!0), u.draw(), Gi(this, "redraw"), Gi(this, "render"), d && this.temporaryDisplay(!0), ji(p, function(t) {
                        t.call()
                    })
                },
                get: function(e) {
                    function t(t) {
                        return t.id === e || t.options && t.options.id === e
                    }
                    var i, n, o = this.series;
                    for (i = qi(this.axes, t) || qi(this.series, t), n = 0; !i && n < o.length; n++) i = qi(o[n].points || [], t);
                    return i
                },
                getAxes: function() {
                    var e = this,
                        t = (i = this.options).xAxis = rn(i.xAxis || {}),
                        i = i.yAxis = rn(i.yAxis || {});
                    Gi(this, "getAxes"), ji(t, function(t, e) {
                        t.index = e, t.isX = !0
                    }), ji(i, function(t, e) {
                        t.index = e
                    }), t = t.concat(i), ji(t, function(t) {
                        new Pi(e, t)
                    }), Gi(this, "afterGetAxes")
                },
                getSelectedPoints: function() {
                    var e = [];
                    return ji(this.series, function(t) {
                        e = e.concat(Ui(t.data || [], function(t) {
                            return t.selected
                        }))
                    }), e
                },
                getSelectedSeries: function() {
                    return Ui(this.series, function(t) {
                        return t.selected
                    })
                },
                setTitle: function(t, e, i) {
                    var n, r = this,
                        o = r.options;
                    n = o.title = Qi({
                        style: {
                            color: "#333333",
                            fontSize: o.isStock ? "16px" : "18px"
                        }
                    }, o.title, t), o = o.subtitle = Qi({
                        style: {
                            color: "#666666"
                        }
                    }, o.subtitle, e), ji([
                        ["title", t, n],
                        ["subtitle", e, o]
                    ], function(t, e) {
                        var i = t[0],
                            n = r[i],
                            o = t[1];
                        t = t[2], n && o && (r[i] = n = n.destroy()), t && !n && (r[i] = r.renderer.text(t.text, 0, 0, t.useHTML).attr({
                            align: t.align,
                            "class": "highcharts-" + i,
                            zIndex: t.zIndex || 4
                        }).add(), r[i].update = function(t) {
                            r.setTitle(!e && t, e && t)
                        }, r[i].css(t.style))
                    }), r.layOutTitles(i)
                },
                layOutTitles: function(t) {
                    var e, o = 0,
                        r = this.renderer,
                        s = this.spacingBox;
                    ji(["title", "subtitle"], function(t) {
                        var e, i = this[t],
                            n = this.options[t];
                        t = "title" === t ? -3 : n.verticalAlign ? 0 : o + 2, i && (e = n.style.fontSize, e = r.fontMetrics(e, i).b, i.css({
                            width: (n.width || s.width + n.widthAdjust) + "px"
                        }).align(Fi({
                            y: t + e
                        }, n), !1, "spacingBox"), n.floating || n.verticalAlign || (o = Math.ceil(o + i.getBBox(n.useHTML).height)))
                    }, this), e = this.titleOffset !== o, this.titleOffset = o, !this.isDirtyBox && e && (this.isDirtyBox = this.isDirtyLegend = e, this.hasRendered && tn(t, !0) && this.isDirtyBox && this.redraw())
                },
                getChartSize: function() {
                    var t = (e = this.options.chart).width,
                        e = e.height,
                        i = this.renderTo;
                    Wi(t) || (this.containerWidth = _i.getStyle(i, "width")), Wi(e) || (this.containerHeight = _i.getStyle(i, "height")), this.chartWidth = Math.max(0, t || this.containerWidth || 600), this.chartHeight = Math.max(0, _i.relativeLength(e, this.chartWidth) || (1 < this.containerHeight ? this.containerHeight : 400))
                },
                temporaryDisplay: function(t) {
                    var e = this.renderTo;
                    if (t)
                        for (; e && e.style;) e.hcOrigStyle && (_i.css(e, e.hcOrigStyle), delete e.hcOrigStyle), e.hcOrigDetached && (Ii.body.removeChild(e), e.hcOrigDetached = !1), e = e.parentNode;
                    else
                        for (; e && e.style && (Ii.body.contains(e) || e.parentNode || (e.hcOrigDetached = !0, Ii.body.appendChild(e)), ("none" === _i.getStyle(e, "display", !1) || e.hcOricDetached) && (e.hcOrigStyle = {
                                display: e.style.display,
                                height: e.style.height,
                                overflow: e.style.overflow
                            }, t = {
                                display: "block",
                                overflow: "hidden"
                            }, e !== this.renderTo && (t.height = 0), _i.css(e, t), e.offsetWidth || e.style.setProperty("display", "block", "important")), (e = e.parentNode) !== Ii.body););
                },
                setClassName: function(t) {
                    this.container.className = "highcharts-container " + (t || "")
                },
                getContainer: function() {
                    var t, e, i, n = this.options,
                        o = n.chart;
                    t = this.renderTo;
                    var r, s = _i.uniqueKey();
                    t || (this.renderTo = t = o.renderTo), Yi(t) && (this.renderTo = t = Ii.getElementById(t)), t || _i.error(13, !0), e = en(Di(t, "data-highcharts-chart")), Vi(e) && zi[e] && zi[e].hasRendered && zi[e].destroy(), Di(t, "data-highcharts-chart", this.index), t.innerHTML = "", o.skipClone || t.offsetWidth || this.temporaryDisplay(), this.getChartSize(), e = this.chartWidth, i = this.chartHeight, r = Fi({
                        position: "relative",
                        overflow: "hidden",
                        width: e + "px",
                        height: i + "px",
                        textAlign: "left",
                        lineHeight: "normal",
                        zIndex: 0,
                        "-webkit-tap-highlight-color": "rgba(0,0,0,0)"
                    }, o.style), this.container = t = Ni("div", {
                        id: s
                    }, r, t), this._cursor = t.style.cursor, this.renderer = new(_i[o.renderer] || _i.Renderer)(t, e, i, null, o.forExport, n.exporting && n.exporting.allowHTML), this.setClassName(o.className), this.renderer.setStyle(o.style), this.renderer.chartIndex = this.index, Gi(this, "afterGetContainer")
                },
                getMargins: function(t) {
                    var e = this.spacing,
                        i = this.margin,
                        n = this.titleOffset;
                    this.resetMargins(), n && !Wi(i[0]) && (this.plotTop = Math.max(this.plotTop, n + this.options.title.margin + e[0])), this.legend && this.legend.display && this.legend.adjustMargins(i, e), Gi(this, "getMargins"), t || this.getAxisMargins()
                },
                getAxisMargins: function() {
                    var i = this,
                        n = i.axisOffset = [0, 0, 0, 0],
                        o = i.margin;
                    i.hasCartesianSeries && ji(i.axes, function(t) {
                        t.visible && t.getOffset()
                    }), ji($i, function(t, e) {
                        Wi(o[e]) || (i[t] += n[e])
                    }), i.setChartSize()
                },
                reflow: function(t) {
                    var e = this,
                        i = e.options.chart,
                        n = e.renderTo,
                        o = Wi(i.width) && Wi(i.height),
                        r = i.width || _i.getStyle(n, "width");
                    i = i.height || _i.getStyle(n, "height"), n = t ? t.target : an, o || e.isPrinting || !r || !i || n !== an && n !== Ii || (r === e.containerWidth && i === e.containerHeight || (_i.clearTimeout(e.reflowTimeout), e.reflowTimeout = sn(function() {
                        e.container && e.setSize(void 0, void 0, !1)
                    }, t ? 100 : 0)), e.containerWidth = r, e.containerHeight = i)
                },
                setReflow: function(t) {
                    var e = this;
                    !1 === t || this.unbindReflow ? !1 === t && this.unbindReflow && (this.unbindReflow = this.unbindReflow()) : (this.unbindReflow = Mi(an, "resize", function(t) {
                        e.reflow(t)
                    }), Mi(this, "destroy", this.unbindReflow))
                },
                setSize: function(t, e, i) {
                    var n = this,
                        o = n.renderer;
                    n.isResizing += 1, _i.setAnimation(i, n), n.oldChartHeight = n.chartHeight, n.oldChartWidth = n.chartWidth, void 0 !== t && (n.options.chart.width = t), void 0 !== e && (n.options.chart.height = e), n.getChartSize(), ((t = o.globalAnimation) ? Oi : Bi)(n.container, {
                        width: n.chartWidth + "px",
                        height: n.chartHeight + "px"
                    }, t), n.setChartSize(!0), o.setSize(n.chartWidth, n.chartHeight, i), ji(n.axes, function(t) {
                        t.isDirty = !0, t.setScale()
                    }), n.isDirtyLegend = !0, n.isDirtyBox = !0, n.layOutTitles(), n.getMargins(), n.redraw(i), n.oldChartHeight = null, Gi(n, "resize"), sn(function() {
                        n && Gi(n, "endResize", null, function() {
                            --n.isResizing
                        })
                    }, Li(t).duration)
                },
                setChartSize: function(t) {
                    var e, i, n, o, r = this.inverted,
                        s = this.renderer,
                        a = this.chartWidth,
                        l = this.chartHeight,
                        h = this.options.chart,
                        c = this.spacing,
                        u = this.clipOffset;
                    this.plotLeft = e = Math.round(this.plotLeft), this.plotTop = i = Math.round(this.plotTop), this.plotWidth = n = Math.max(0, Math.round(a - e - this.marginRight)), this.plotHeight = o = Math.max(0, Math.round(l - i - this.marginBottom)), this.plotSizeX = r ? o : n, this.plotSizeY = r ? n : o, this.plotBorderWidth = h.plotBorderWidth || 0, this.spacingBox = s.spacingBox = {
                        x: c[3],
                        y: c[0],
                        width: a - c[3] - c[1],
                        height: l - c[0] - c[2]
                    }, this.plotBox = s.plotBox = {
                        x: e,
                        y: i,
                        width: n,
                        height: o
                    }, a = 2 * Math.floor(this.plotBorderWidth / 2), r = Math.ceil(Math.max(a, u[3]) / 2), s = Math.ceil(Math.max(a, u[0]) / 2), this.clipBox = {
                        x: r,
                        y: s,
                        width: Math.floor(this.plotSizeX - Math.max(a, u[1]) / 2 - r),
                        height: Math.max(0, Math.floor(this.plotSizeY - Math.max(a, u[2]) / 2 - s))
                    }, t || ji(this.axes, function(t) {
                        t.setAxisSize(), t.setAxisTranslation()
                    }), Gi(this, "afterSetChartSize", {
                        skipAxes: t
                    })
                },
                resetMargins: function() {
                    var o = this,
                        r = o.options.chart;
                    ji(["margin", "spacing"], function(i) {
                        var t = r[i],
                            n = Xi(t) ? t : [t, t, t, t];
                        ji(["Top", "Right", "Bottom", "Left"], function(t, e) {
                            o[i][e] = tn(r[i + t], n[e])
                        })
                    }), ji($i, function(t, e) {
                        o[t] = tn(o.margin[e], o.spacing[e])
                    }), o.axisOffset = [0, 0, 0, 0], o.clipOffset = [0, 0, 0, 0]
                },
                drawChartBox: function() {
                    var t, e, i = this.options.chart,
                        n = this.renderer,
                        o = this.chartWidth,
                        r = this.chartHeight,
                        s = this.chartBackground,
                        a = this.plotBackground,
                        l = this.plotBorder,
                        h = this.plotBGImage,
                        c = i.backgroundColor,
                        u = i.plotBackgroundColor,
                        d = i.plotBackgroundImage,
                        p = this.plotLeft,
                        f = this.plotTop,
                        g = this.plotWidth,
                        m = this.plotHeight,
                        v = this.plotBox,
                        y = this.clipRect,
                        b = this.clipBox,
                        x = "animate";
                    s || (this.chartBackground = s = n.rect().addClass("highcharts-background").add(), x = "attr"), e = (t = i.borderWidth || 0) + (i.shadow ? 8 : 0), c = {
                        fill: c || "none"
                    }, (t || s["stroke-width"]) && (c.stroke = i.borderColor, c["stroke-width"] = t), s.attr(c).shadow(i.shadow), s[x]({
                        x: e / 2,
                        y: e / 2,
                        width: o - e - t % 2,
                        height: r - e - t % 2,
                        r: i.borderRadius
                    }), x = "animate", a || (x = "attr", this.plotBackground = a = n.rect().addClass("highcharts-plot-background").add()), a[x](v), a.attr({
                        fill: u || "none"
                    }).shadow(i.plotShadow), d && (h ? h.animate(v) : this.plotBGImage = n.image(d, p, f, g, m).add()), y ? y.animate({
                        width: b.width,
                        height: b.height
                    }) : this.clipRect = n.clipRect(b), x = "animate", l || (x = "attr", this.plotBorder = l = n.rect().addClass("highcharts-plot-border").attr({
                        zIndex: 1
                    }).add()), l.attr({
                        stroke: i.plotBorderColor,
                        "stroke-width": i.plotBorderWidth || 0,
                        fill: "none"
                    }), l[x](l.crisp({
                        x: p,
                        y: f,
                        width: g,
                        height: m
                    }, -l.strokeWidth())), this.isDirtyBox = !1, Gi(this, "afterDrawChartBox")
                },
                propFromSeries: function() {
                    var e, i, n, o = this,
                        r = o.options.chart,
                        s = o.options.series;
                    ji(["inverted", "angular", "polar"], function(t) {
                        for (e = on[r.type || r.defaultSeriesType], n = r[t] || e && e.prototype[t], i = s && s.length; !n && i--;)(e = on[s[i].type]) && e.prototype[t] && (n = !0);
                        o[t] = n
                    })
                },
                linkSeries: function() {
                    var i = this,
                        t = i.series;
                    ji(t, function(t) {
                        t.linkedSeries.length = 0
                    }), ji(t, function(t) {
                        var e = t.options.linkedTo;
                        Yi(e) && (e = ":previous" === e ? i.series[t.index - 1] : i.get(e)) && e.linkedParent !== t && (e.linkedSeries.push(t), t.linkedParent = e, t.visible = tn(t.options.visible, e.options.visible, t.visible))
                    }), Gi(this, "afterLinkSeries")
                },
                renderSeries: function() {
                    ji(this.series, function(t) {
                        t.translate(), t.render()
                    })
                },
                renderLabels: function() {
                    var o = this,
                        r = o.options.labels;
                    r.items && ji(r.items, function(t) {
                        var e = Fi(r.style, t.style),
                            i = en(e.left) + o.plotLeft,
                            n = en(e.top) + o.plotTop + 12;
                        delete e.left, delete e.top, o.renderer.text(t.html, i, n).attr({
                            zIndex: 2
                        }).css(e).add()
                    })
                },
                render: function() {
                    var t, e, i, n = this.axes,
                        o = this.renderer,
                        r = this.options;
                    this.setTitle(), this.legend = new Ki(this, r.legend), this.getStacks && this.getStacks(), this.getMargins(!0), this.setChartSize(), r = this.plotWidth, t = this.plotHeight = Math.max(this.plotHeight - 21, 0), ji(n, function(t) {
                        t.setScale()
                    }), this.getAxisMargins(), e = 1.1 < r / this.plotWidth, i = 1.05 < t / this.plotHeight, (e || i) && (ji(n, function(t) {
                        (t.horiz && e || !t.horiz && i) && t.setTickInterval(!0)
                    }), this.getMargins()), this.drawChartBox(), this.hasCartesianSeries && ji(n, function(t) {
                        t.visible && t.render()
                    }), this.seriesGroup || (this.seriesGroup = o.g("series-group").attr({
                        zIndex: 3
                    }).add()), this.renderSeries(), this.renderLabels(), this.addCredits(), this.setResponsive && this.setResponsive(), this.hasRendered = !0
                },
                addCredits: function(t) {
                    var e = this;
                    (t = Qi(!0, this.options.credits, t)).enabled && !this.credits && (this.credits = this.renderer.text(t.text + (this.mapCredits || ""), 0, 0).addClass("highcharts-credits").on("click", function() {
                        t.href && (an.location.href = t.href)
                    }).attr({
                        align: t.position.align,
                        zIndex: 8
                    }).css(t.style).add().align(t.position), this.credits.update = function(t) {
                        e.credits = e.credits.destroy(), e.addCredits(t)
                    })
                },
                destroy: function() {
                    var t, i = this,
                        e = i.axes,
                        n = i.series,
                        o = i.container,
                        r = o && o.parentNode;
                    for (Gi(i, "destroy"), i.renderer.forExport ? _i.erase(zi, i) : zi[i.index] = void 0, _i.chartCount--, i.renderTo.removeAttribute("data-highcharts-chart"), nn(i), t = e.length; t--;) e[t] = e[t].destroy();
                    for (this.scroller && this.scroller.destroy && this.scroller.destroy(), t = n.length; t--;) n[t] = n[t].destroy();
                    ji("title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" "), function(t) {
                        var e = i[t];
                        e && e.destroy && (i[t] = e.destroy())
                    }), o && (o.innerHTML = "", nn(o), r && Hi(o)), Zi(i, function(t, e) {
                        delete i[e]
                    })
                },
                firstRender: function() {
                    var e = this,
                        t = e.options;
                    e.isReadyToRender && !e.isReadyToRender() || (e.getContainer(), e.resetMargins(), e.setChartSize(), e.propFromSeries(), e.getAxes(), ji(t.series || [], function(t) {
                        e.initSeries(t)
                    }), e.linkSeries(), Gi(e, "beforeRender"), Ji && (e.pointer = new Ji(e, t)), e.render(), !e.renderer.imgCount && e.onload && e.onload(), e.temporaryDisplay(!0))
                },
                onload: function() {
                    ji([this.callback].concat(this.callbacks), function(t) {
                        t && void 0 !== this.index && t.apply(this, [this])
                    }, this), Gi(this, "load"), Gi(this, "render"), Wi(this.index) && this.setReflow(this.options.chart.reflow), this.onload = null
                }
            }), cn = (hn = It).addEvent, un = hn.Chart, dn = hn.each, cn(un, "afterSetChartSize", function(t) {
                var e = this.options.chart.scrollablePlotArea;
                (e = e && e.minWidth) && !this.renderer.forExport && (this.scrollablePixels = e = Math.max(0, e - this.chartWidth)) && (this.plotWidth += e, this.clipBox.width += e, t.skipAxes || dn(this.axes, function(i) {
                    1 === i.side ? i.getPlotLinePath = function() {
                        var t, e = this.right;
                        return this.right = e - i.chart.scrollablePixels, t = hn.Axis.prototype.getPlotLinePath.apply(this, arguments), this.right = e, t
                    } : (i.setAxisSize(), i.setAxisTranslation())
                }))
            }), cn(un, "render", function() {
                this.scrollablePixels ? (this.setUpScrolling && this.setUpScrolling(), this.applyFixed()) : this.fixedDiv && this.applyFixed()
            }), un.prototype.setUpScrolling = function() {
                this.scrollingContainer = hn.createElement("div", {
                    className: "highcharts-scrolling"
                }, {
                    overflowX: "auto",
                    WebkitOverflowScrolling: "touch"
                }, this.renderTo), this.innerContainer = hn.createElement("div", {
                    className: "highcharts-inner-container"
                }, null, this.scrollingContainer), this.innerContainer.appendChild(this.container), this.setUpScrolling = null
            }, un.prototype.applyFixed = function() {
                var e, t, i = this.container;
                (n = !this.fixedDiv) && (this.fixedDiv = hn.createElement("div", {
                    className: "highcharts-fixed"
                }, {
                    position: "absolute",
                    overflow: "hidden",
                    pointerEvents: "none",
                    zIndex: 2
                }, null, !0), this.renderTo.insertBefore(this.fixedDiv, this.renderTo.firstChild), this.fixedRenderer = e = new hn.Renderer(this.fixedDiv, 0, 0), this.scrollableMask = e.path().attr({
                    fill: hn.color(this.options.chart.backgroundColor || "#fff").setOpacity(.85).get(),
                    zIndex: -1
                }).addClass("highcharts-scrollable-mask").add(), hn.each([this.inverted ? ".highcharts-xaxis" : ".highcharts-yaxis", this.inverted ? ".highcharts-xaxis-labels" : ".highcharts-yaxis-labels", ".highcharts-contextbutton", ".highcharts-credits", ".highcharts-legend", ".highcharts-subtitle", ".highcharts-title", ".highcharts-legend-checkbox"], function(t) {
                    hn.each(i.querySelectorAll(t), function(t) {
                        (t.namespaceURI === e.SVG_NS ? e.box : e.box.parentNode).appendChild(t), t.style.pointerEvents = "auto"
                    })
                })), this.fixedRenderer.setSize(this.chartWidth, this.chartHeight), t = this.chartWidth + this.scrollablePixels, hn.stop(this.container), this.container.style.width = t + "px", this.renderer.boxWrapper.attr({
                    width: t,
                    height: this.chartHeight,
                    viewBox: [0, 0, t, this.chartHeight].join(" ")
                }), this.chartBackground.attr({
                    width: t
                }), n && (t = this.options.chart.scrollablePlotArea).scrollPositionX && (this.scrollingContainer.scrollLeft = this.scrollablePixels * t.scrollPositionX), n = this.axisOffset, t = this.plotTop - n[0] - 1;
                var n = this.plotTop + this.plotHeight + n[2],
                    o = this.plotLeft + this.plotWidth - this.scrollablePixels;
                this.scrollableMask.attr({
                    d: this.scrollablePixels ? ["M", 0, t, "L", this.plotLeft - 1, t, "L", this.plotLeft - 1, n, "L", 0, n, "Z", "M", o, t, "L", this.chartWidth, t, "L", this.chartWidth, n, "L", o, n, "Z"] : ["M", 0, 0]
                })
            }, gn = (pn = It).each, mn = pn.extend, vn = pn.erase, yn = pn.fireEvent, bn = pn.format, xn = pn.isArray, wn = pn.isNumber, Tn = pn.pick, Cn = pn.removeEvent, pn.Point = fn = function() {}, pn.Point.prototype = {
                init: function(t, e, i) {
                    return this.series = t, this.color = t.color, this.applyOptions(e, i), t.options.colorByPoint ? (e = t.options.colors || t.chart.options.colors, this.color = this.color || e[t.colorCounter], e = e.length, i = t.colorCounter, t.colorCounter++, t.colorCounter === e && (t.colorCounter = 0)) : i = t.colorIndex, this.colorIndex = Tn(this.colorIndex, i), t.chart.pointCount++, yn(this, "afterInit"), this
                },
                applyOptions: function(t, e) {
                    var i = this.series,
                        n = i.options.pointValKey || i.pointValKey;
                    return t = fn.prototype.optionsToObject.call(this, t), mn(this, t), this.options = this.options ? mn(this.options, t) : t, t.group && delete this.group, n && (this.y = this[n]), this.isNull = Tn(this.isValid && !this.isValid(), null === this.x || !wn(this.y, !0)), this.selected && (this.state = "select"), "name" in this && void 0 === e && i.xAxis && i.xAxis.hasNames && (this.x = i.xAxis.nameToX(this)), void 0 === this.x && i && (this.x = void 0 === e ? i.autoIncrement(this) : e), this
                },
                setNestedProperty: function(t, o, e) {
                    return e = e.split("."), pn.reduce(e, function(t, e, i, n) {
                        return t[e] = n.length - 1 === i ? o : pn.isObject(t[e], !0) ? t[e] : {}, t[e]
                    }, t), t
                },
                optionsToObject: function(t) {
                    var e = {},
                        i = this.series,
                        n = i.options.keys,
                        o = n || i.pointArrayMap || ["y"],
                        r = o.length,
                        s = 0,
                        a = 0;
                    if (wn(t) || null === t) e[o[0]] = t;
                    else if (xn(t))
                        for (!n && t.length > r && ("string" == (i = typeof t[0]) ? e.name = t[0] : "number" === i && (e.x = t[0]), s++); a < r;) n && void 0 === t[s] || (0 < o[a].indexOf(".") ? pn.Point.prototype.setNestedProperty(e, t[s], o[a]) : e[o[a]] = t[s]), s++, a++;
                    else "object" == typeof t && ((e = t).dataLabels && (i._hasPointLabels = !0), t.marker && (i._hasPointMarkers = !0));
                    return e
                },
                getClassName: function() {
                    return "highcharts-point" + (this.selected ? " highcharts-point-select" : "") + (this.negative ? " highcharts-negative" : "") + (this.isNull ? " highcharts-null-point" : "") + (void 0 !== this.colorIndex ? " highcharts-color-" + this.colorIndex : "") + (this.options.className ? " " + this.options.className : "") + (this.zone && this.zone.className ? " " + this.zone.className.replace("highcharts-negative", "") : "")
                },
                getZone: function() {
                    var t, e = (i = this.series).zones,
                        i = i.zoneAxis || "y",
                        n = 0;
                    for (t = e[n]; this[i] >= t.value;) t = e[++n];
                    return this.nonZonedColor || (this.nonZonedColor = this.color), this.color = t && t.color && !this.options.color ? t.color : this.nonZonedColor, t
                },
                destroy: function() {
                    var t, e = this.series.chart,
                        i = e.hoverPoints;
                    for (t in e.pointCount--, i && (this.setState(), vn(i, this), i.length || (e.hoverPoints = null)), this === e.hoverPoint && this.onMouseOut(), (this.graphic || this.dataLabel) && (Cn(this), this.destroyElements()), this.legendItem && e.legend.destroyItem(this), this) this[t] = null
                },
                destroyElements: function() {
                    for (var t, e = ["graphic", "dataLabel", "dataLabelUpper", "connector", "shadowGroup"], i = 6; i--;) this[t = e[i]] && (this[t] = this[t].destroy())
                },
                getLabelConfig: function() {
                    return {
                        x: this.category,
                        y: this.y,
                        color: this.color,
                        colorIndex: this.colorIndex,
                        key: this.name || this.category,
                        series: this.series,
                        point: this,
                        percentage: this.percentage,
                        total: this.total || this.stackTotal
                    }
                },
                tooltipFormatter: function(e) {
                    var t = this.series,
                        i = t.tooltipOptions,
                        n = Tn(i.valueDecimals, ""),
                        o = i.valuePrefix || "",
                        r = i.valueSuffix || "";
                    return gn(t.pointArrayMap || ["y"], function(t) {
                        t = "{point." + t, (o || r) && (e = e.replace(RegExp(t + "}", "g"), o + t + "}" + r)), e = e.replace(RegExp(t + "}", "g"), t + ":,." + n + "f}")
                    }), bn(e, {
                        point: this,
                        series: this.series
                    }, t.chart.time)
                },
                firePointEvent: function(t, e, i) {
                    var n = this,
                        o = this.series.options;
                    (o.point.events[t] || n.options && n.options.events && n.options.events[t]) && this.importEvents(), "click" === t && o.allowPointSelect && (i = function(t) {
                        n.select && n.select(null, t.ctrlKey || t.metaKey || t.shiftKey)
                    }), yn(this, t, e, i)
                },
                visible: !0
            }, En = (Sn = It).addEvent, An = Sn.animObject, kn = Sn.arrayMax, _n = Sn.arrayMin, Mn = Sn.correctFloat, On = Sn.defaultOptions, Ln = Sn.defaultPlotOptions, Dn = Sn.defined, In = Sn.each, Pn = Sn.erase, Nn = Sn.extend, Rn = Sn.fireEvent, Hn = Sn.grep, zn = Sn.isArray, Bn = Sn.isNumber, Wn = Sn.isString, jn = Sn.merge, Fn = Sn.objectEach, qn = Sn.pick, Gn = Sn.removeEvent, Un = Sn.splat, Vn = Sn.SVGElement, Xn = Sn.syncTimeout, Yn = Sn.win, Sn.Series = Sn.seriesType("line", null, {
                lineWidth: 2,
                allowPointSelect: !1,
                showCheckbox: !1,
                animation: {
                    duration: 1e3
                },
                events: {},
                marker: {
                    lineWidth: 0,
                    lineColor: "#ffffff",
                    enabledThreshold: 2,
                    radius: 4,
                    states: {
                        normal: {
                            animation: !0
                        },
                        hover: {
                            animation: {
                                duration: 50
                            },
                            enabled: !0,
                            radiusPlus: 2,
                            lineWidthPlus: 1
                        },
                        select: {
                            fillColor: "#cccccc",
                            lineColor: "#000000",
                            lineWidth: 2
                        }
                    }
                },
                point: {
                    events: {}
                },
                dataLabels: {
                    align: "center",
                    formatter: function() {
                        return null === this.y ? "" : Sn.numberFormat(this.y, -1)
                    },
                    style: {
                        fontSize: "11px",
                        fontWeight: "bold",
                        color: "contrast",
                        textOutline: "1px contrast"
                    },
                    verticalAlign: "bottom",
                    x: 0,
                    y: 0,
                    padding: 5
                },
                cropThreshold: 300,
                pointRange: 0,
                softThreshold: !0,
                states: {
                    normal: {
                        animation: !0
                    },
                    hover: {
                        animation: {
                            duration: 50
                        },
                        lineWidthPlus: 1,
                        marker: {},
                        halo: {
                            size: 10,
                            opacity: .25
                        }
                    },
                    select: {}
                },
                stickyTracking: !0,
                turboThreshold: 1e3,
                findNearestPointBy: "x"
            }, {
                isCartesian: !0,
                pointClass: Sn.Point,
                sorted: !0,
                requireSorting: !0,
                directTouch: !1,
                axisTypes: ["xAxis", "yAxis"],
                colorCounter: 0,
                parallelArrays: ["x", "y"],
                coll: "series",
                init: function(t, e) {
                    var i, n, o = this,
                        r = t.series;
                    o.chart = t, o.options = e = o.setOptions(e), o.linkedSeries = [], o.bindAxes(), Nn(o, {
                        name: e.name,
                        state: "",
                        visible: !1 !== e.visible,
                        selected: !0 === e.selected
                    }), i = e.events, Fn(i, function(t, e) {
                        En(o, e, t)
                    }), (i && i.click || e.point && e.point.events && e.point.events.click || e.allowPointSelect) && (t.runTrackerClick = !0), o.getColor(), o.getSymbol(), In(o.parallelArrays, function(t) {
                        o[t + "Data"] = []
                    }), o.setData(e.data, !1), o.isCartesian && (t.hasCartesianSeries = !0), r.length && (n = r[r.length - 1]), o._i = qn(n && n._i, -1) + 1, t.orderSeries(this.insert(r)), Rn(this, "afterInit")
                },
                insert: function(t) {
                    var e, i = this.options.index;
                    if (Bn(i)) {
                        for (e = t.length; e--;)
                            if (i >= qn(t[e].options.index, t[e]._i)) {
                                t.splice(e + 1, 0, this);
                                break
                            } - 1 === e && t.unshift(this), e += 1
                    } else t.push(this);
                    return qn(e, t.length - 1)
                },
                bindAxes: function() {
                    var i, n = this,
                        o = n.options,
                        t = n.chart;
                    In(n.axisTypes || [], function(e) {
                        In(t[e], function(t) {
                            i = t.options, (o[e] === i.index || void 0 !== o[e] && o[e] === i.id || void 0 === o[e] && 0 === i.index) && (n.insert(t.series), (n[e] = t).isDirty = !0)
                        }), n[e] || n.optionalAxis === e || Sn.error(18, !0)
                    })
                },
                updateParallelArrays: function(i, n) {
                    var o = i.series,
                        e = arguments,
                        t = Bn(n) ? function(t) {
                            var e = "y" === t && o.toYData ? o.toYData(i) : i[t];
                            o[t + "Data"][n] = e
                        } : function(t) {
                            Array.prototype[n].apply(o[t + "Data"], Array.prototype.slice.call(e, 2))
                        };
                    In(o.parallelArrays, t)
                },
                autoIncrement: function() {
                    var t, e = this.options,
                        i = this.xIncrement,
                        n = e.pointIntervalUnit,
                        o = this.chart.time;
                    return i = qn(i, e.pointStart, 0), this.pointInterval = t = qn(this.pointInterval, e.pointInterval, 1), n && (e = new o.Date(i), "day" === n ? o.set("Date", e, o.get("Date", e) + t) : "month" === n ? o.set("Month", e, o.get("Month", e) + t) : "year" === n && o.set("FullYear", e, o.get("FullYear", e) + t), t = e.getTime() - i), this.xIncrement = i + t, i
                },
                setOptions: function(t) {
                    var e = this.chart,
                        i = e.options,
                        n = i.plotOptions,
                        o = (e.userOptions || {}).plotOptions || {},
                        r = n[this.type];
                    return this.userOptions = t, e = jn(r, n.series, t), this.tooltipOptions = jn(On.tooltip, On.plotOptions.series && On.plotOptions.series.tooltip, On.plotOptions[this.type].tooltip, i.tooltip.userOptions, n.series && n.series.tooltip, n[this.type].tooltip, t.tooltip), this.stickyTracking = qn(t.stickyTracking, o[this.type] && o[this.type].stickyTracking, o.series && o.series.stickyTracking, !(!this.tooltipOptions.shared || this.noSharedTooltip) || e.stickyTracking), null === r.marker && delete e.marker, this.zoneAxis = e.zoneAxis, t = this.zones = (e.zones || []).slice(), !e.negativeColor && !e.negativeFillColor || e.zones || t.push({
                        value: e[this.zoneAxis + "Threshold"] || e.threshold || 0,
                        className: "highcharts-negative",
                        color: e.negativeColor,
                        fillColor: e.negativeFillColor
                    }), t.length && Dn(t[t.length - 1].value) && t.push({
                        color: this.color,
                        fillColor: this.fillColor
                    }), Rn(this, "afterSetOptions", {
                        options: e
                    }), e
                },
                getName: function() {
                    return this.name || "Series " + (this.index + 1)
                },
                getCyclic: function(t, e, i) {
                    var n, o = this.chart,
                        r = this.userOptions,
                        s = t + "Index",
                        a = t + "Counter",
                        l = i ? i.length : qn(o.options.chart[t + "Count"], o[t + "Count"]);
                    e || (n = qn(r[s], r["_" + s]), Dn(n) || (o.series.length || (o[a] = 0), r["_" + s] = n = o[a] % l, o[a] += 1), i && (e = i[n])), void 0 !== n && (this[s] = n), this[t] = e
                },
                getColor: function() {
                    this.options.colorByPoint ? this.options.color = null : this.getCyclic("color", this.options.color || Ln[this.type].color, this.chart.options.colors)
                },
                getSymbol: function() {
                    this.getCyclic("symbol", this.options.marker.symbol, this.chart.options.symbols)
                },
                drawLegendSymbol: Sn.LegendSymbolMixin.drawLineMarker,
                updateData: function(t) {
                    var i, e, n, o = this.options,
                        r = this.points,
                        s = [],
                        a = this.requireSorting;
                    if (In(t, function(t) {
                            var e;
                            e = Sn.defined(t) && this.pointClass.prototype.optionsToObject.call({
                                series: this
                            }, t).x, Bn(e) && (-1 === (e = Sn.inArray(e, this.xData, n)) ? s.push(t) : t !== o.data[e] ? (r[e].update(t, !1, null, !1), r[e].touched = !0, a && (n = e)) : r[e] && (r[e].touched = !0), i = !0)
                        }, this), i)
                        for (t = r.length; t--;)(e = r[t]).touched || e.remove(!1), e.touched = !1;
                    else {
                        if (t.length !== r.length) return !1;
                        In(t, function(t, e) {
                            r[e].update && t !== o.data[e] && r[e].update(t, !1, null, !1)
                        })
                    }
                    return In(s, function(t) {
                        this.addPoint(t, !1)
                    }, this), !0
                },
                setData: function(t, e, i, n) {
                    var o, r, s = this,
                        a = s.points,
                        l = a && a.length || 0,
                        h = s.options,
                        c = s.chart,
                        u = null,
                        d = s.xAxis,
                        p = h.turboThreshold,
                        f = this.xData,
                        g = this.yData,
                        m = (o = s.pointArrayMap) && o.length;
                    if (o = (t = t || []).length, e = qn(e, !0), !1 !== n && o && l && !s.cropped && !s.hasGroupedData && s.visible && !s.isSeriesBoosting && (r = this.updateData(t)), !r) {
                        if (s.xIncrement = null, s.colorCounter = 0, In(this.parallelArrays, function(t) {
                                s[t + "Data"].length = 0
                            }), p && p < o) {
                            for (i = 0; null === u && i < o;) u = t[i], i++;
                            if (Bn(u))
                                for (i = 0; i < o; i++) f[i] = this.autoIncrement(), g[i] = t[i];
                            else if (zn(u))
                                if (m)
                                    for (i = 0; i < o; i++) u = t[i], f[i] = u[0], g[i] = u.slice(1, m + 1);
                                else
                                    for (i = 0; i < o; i++) u = t[i], f[i] = u[0], g[i] = u[1];
                            else Sn.error(12)
                        } else
                            for (i = 0; i < o; i++) void 0 !== t[i] && (u = {
                                series: s
                            }, s.pointClass.prototype.applyOptions.apply(u, [t[i]]), s.updateParallelArrays(u, i));
                        for (g && Wn(g[0]) && Sn.error(14, !0), s.data = [], s.options.data = s.userOptions.data = t, i = l; i--;) a[i] && a[i].destroy && a[i].destroy();
                        d && (d.minRange = d.userMinRange), s.isDirty = c.isDirtyBox = !0, s.isDirtyData = !!a, i = !1
                    }
                    "point" === h.legendType && (this.processData(), this.generatePoints()), e && c.redraw(i)
                },
                processData: function(t) {
                    var e, i = this.xData,
                        n = this.yData,
                        o = i.length;
                    e = 0;
                    var r, s, a, l = this.xAxis;
                    a = (p = this.options).cropThreshold;
                    var h, c, u = this.getExtremesFromAll || p.getExtremesFromAll,
                        d = this.isCartesian,
                        p = l && l.val2lin,
                        f = l && l.isLog,
                        g = this.requireSorting;
                    if (d && !this.isDirty && !l.isDirty && !this.yAxis.isDirty && !t) return !1;
                    for (l && (h = (t = l.getExtremes()).min, c = t.max), d && this.sorted && !u && (!a || a < o || this.forceCrop) && (i[o - 1] < h || i[0] > c ? (i = [], n = []) : this.yData && (i[0] < h || i[o - 1] > c) && (i = (e = this.cropData(this.xData, this.yData, h, c)).xData, n = e.yData, e = e.start, r = !0)), a = i.length || 1; --a;) 0 < (o = f ? p(i[a]) - p(i[a - 1]) : i[a] - i[a - 1]) && (void 0 === s || o < s) ? s = o : o < 0 && g && (Sn.error(15), g = !1);
                    this.cropped = r, this.cropStart = e, this.processedXData = i, this.processedYData = n, this.closestPointRange = s
                },
                cropData: function(t, e, i, n, o) {
                    var r, s = t.length,
                        a = 0,
                        l = s;
                    for (o = qn(o, this.cropShoulder, 1), r = 0; r < s; r++)
                        if (t[r] >= i) {
                            a = Math.max(0, r - o);
                            break
                        }
                    for (i = r; i < s; i++)
                        if (t[i] > n) {
                            l = i + o;
                            break
                        }
                    return {
                        xData: t.slice(a, l),
                        yData: e.slice(a, l),
                        start: a,
                        end: l
                    }
                },
                generatePoints: function() {
                    var t, e, i, n, o = (d = this.options).data,
                        r = this.data,
                        s = this.processedXData,
                        a = this.processedYData,
                        l = this.pointClass,
                        h = s.length,
                        c = this.cropStart || 0,
                        u = this.hasGroupedData,
                        d = d.keys,
                        p = [];
                    for (r || u || ((r = []).length = o.length, r = this.data = r), d && u && (this.options.keys = !1), n = 0; n < h; n++) e = c + n, u ? (i = (new l).init(this, [s[n]].concat(Un(a[n])))).dataGroup = this.groupMap[n] : (i = r[e]) || void 0 === o[e] || (r[e] = i = (new l).init(this, o[e], s[n])), i && (i.index = e, p[n] = i);
                    if (this.options.keys = d, r && (h !== (t = r.length) || u))
                        for (n = 0; n < t; n++) n !== c || u || (n += h), r[n] && (r[n].destroyElements(), r[n].plotX = void 0);
                    this.data = r, this.points = p
                },
                getExtremes: function(t) {
                    var e, i, n, o, r, s = this.yAxis,
                        a = this.processedXData,
                        l = [],
                        h = 0,
                        c = (e = this.xAxis.getExtremes()).min,
                        u = e.max,
                        d = this.requireSorting ? 1 : 0;
                    for (e = (t = t || this.stackedYData || this.processedYData || []).length, r = 0; r < e; r++)
                        if (n = a[r], o = t[r], i = (Bn(o, !0) || zn(o)) && (!s.positiveValuesOnly || o.length || 0 < o), n = this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped || (a[r + d] || n) >= c && (a[r - d] || n) <= u, i && n)
                            if (i = o.length)
                                for (; i--;) "number" == typeof o[i] && (l[h++] = o[i]);
                            else l[h++] = o;
                    this.dataMin = _n(l), this.dataMax = kn(l)
                },
                translate: function() {
                    this.processedXData || this.processData(), this.generatePoints();
                    var t, e, i, n, o = this.options,
                        r = o.stacking,
                        s = this.xAxis,
                        a = s.categories,
                        l = this.yAxis,
                        h = this.points,
                        c = h.length,
                        u = !!this.modifyValue,
                        d = o.pointPlacement,
                        p = "between" === d || Bn(d),
                        f = o.threshold,
                        g = o.startFromThreshold ? f : 0,
                        m = Number.MAX_VALUE;
                    for ("between" === d && (d = .5), Bn(d) && (d *= qn(o.pointRange || s.pointRange)), o = 0; o < c; o++) {
                        var v = h[o],
                            y = v.x,
                            b = v.y;
                        e = v.low;
                        var x, w = r && l.stacks[(this.negStacks && b < (g ? 0 : f) ? "-" : "") + this.stackKey];
                        l.positiveValuesOnly && null !== b && b <= 0 && (v.isNull = !0), v.plotX = t = Mn(Math.min(Math.max(-1e5, s.translate(y, 0, 0, 0, 1, d, "flags" === this.type)), 1e5)), r && this.visible && !v.isNull && w && w[y] && (n = this.getStackIndicator(n, y, this.index), e = (b = (x = w[y]).points[n.key])[0], b = b[1], e === g && n.key === w[y].base && (e = qn(Bn(f) && f, l.min)),
                            l.positiveValuesOnly && e <= 0 && (e = null), v.total = v.stackTotal = x.total, v.percentage = x.total && v.y / x.total * 100, v.stackY = b, x.setOffset(this.pointXOffset || 0, this.barW || 0)), v.yBottom = Dn(e) ? Math.min(Math.max(-1e5, l.translate(e, 0, 1, 0, 1)), 1e5) : null, u && (b = this.modifyValue(b, v)), v.plotY = e = "number" == typeof b && Infinity !== b ? Math.min(Math.max(-1e5, l.translate(b, 0, 1, 0, 1)), 1e5) : void 0, v.isInside = void 0 !== e && 0 <= e && e <= l.len && 0 <= t && t <= s.len, v.clientX = p ? Mn(s.translate(y, 0, 0, 0, 1, d)) : t, v.negative = v.y < (f || 0), v.category = a && void 0 !== a[v.x] ? a[v.x] : v.x, v.isNull || (void 0 !== i && (m = Math.min(m, Math.abs(t - i))), i = t), v.zone = this.zones.length && v.getZone()
                    }
                    this.closestPointRangePx = m, Rn(this, "afterTranslate")
                },
                getValidPoints: function(t, e) {
                    var i = this.chart;
                    return Hn(t || this.points || [], function(t) {
                        return !(e && !i.isInsidePlot(t.plotX, t.plotY, i.inverted) || t.isNull)
                    })
                },
                setClip: function(t) {
                    var e = this.chart,
                        i = this.options,
                        n = e.renderer,
                        o = e.inverted,
                        r = this.clipBox,
                        s = r || e.clipBox,
                        a = this.sharedClipKey || ["_sharedClip", t && t.duration, t && t.easing, s.height, i.xAxis, i.yAxis].join(),
                        l = e[a],
                        h = e[a + "m"];
                    l || (t && (s.width = 0, o && (s.x = e.plotSizeX), e[a + "m"] = h = n.clipRect(o ? e.plotSizeX + 99 : -99, o ? -e.plotLeft : -e.plotTop, 99, o ? e.chartWidth : e.chartHeight)), e[a] = l = n.clipRect(s), l.count = {
                        length: 0
                    }), t && !l.count[this.index] && (l.count[this.index] = !0, l.count.length += 1), !1 !== i.clip && (this.group.clip(t || r ? l : e.clipRect), this.markerGroup.clip(h), this.sharedClipKey = a), t || (l.count[this.index] && (delete l.count[this.index], --l.count.length), 0 === l.count.length && a && e[a] && (r || (e[a] = e[a].destroy()), e[a + "m"] && (e[a + "m"] = e[a + "m"].destroy())))
                },
                animate: function(t) {
                    var e, i = this.chart,
                        n = An(this.options.animation);
                    t ? this.setClip(n) : ((t = i[e = this.sharedClipKey]) && t.animate({
                        width: i.plotSizeX,
                        x: 0
                    }, n), i[e + "m"] && i[e + "m"].animate({
                        width: i.plotSizeX + 99,
                        x: 0
                    }, n), this.animate = null)
                },
                afterAnimate: function() {
                    this.setClip(), Rn(this, "afterAnimate"), this.finishedAnimating = !0
                },
                drawPoints: function() {
                    var t, e, i, n, o, r, s, a, l = this.points,
                        h = this.chart,
                        c = this.options.marker,
                        u = this[this.specialGroup] || this.markerGroup,
                        d = qn(c.enabled, !!this.xAxis.isRadial || null, this.closestPointRangePx >= c.enabledThreshold * c.radius);
                    if (!1 !== c.enabled || this._hasPointMarkers)
                        for (t = 0; t < l.length; t++) n = (e = l[t]).graphic, o = e.marker || {}, r = !!e.marker, i = d && void 0 === o.enabled || o.enabled, s = e.isInside, i && !e.isNull ? (i = qn(o.symbol, this.symbol), a = this.markerAttribs(e, e.selected && "select"), n ? n[s ? "show" : "hide"](!0).animate(a) : s && (0 < a.width || e.hasImage) && (e.graphic = n = h.renderer.symbol(i, a.x, a.y, a.width, a.height, r ? o : c).add(u)), n && n.attr(this.pointAttribs(e, e.selected && "select")), n && n.addClass(e.getClassName(), !0)) : n && (e.graphic = n.destroy())
                },
                markerAttribs: function(t, e) {
                    var i = this.options.marker,
                        n = t.marker || {},
                        o = n.symbol || i.symbol,
                        r = qn(n.radius, i.radius);
                    return e && (i = i.states[e], e = n.states && n.states[e], r = qn(e && e.radius, i && i.radius, r + (i && i.radiusPlus || 0))), t.hasImage = o && 0 === o.indexOf("url"), t.hasImage && (r = 0), t = {
                        x: Math.floor(t.plotX) - r,
                        y: t.plotY - r
                    }, r && (t.width = t.height = 2 * r), t
                },
                pointAttribs: function(t, e) {
                    var i = this.options.marker,
                        n = (a = t && t.options) && a.marker || {},
                        o = this.color,
                        r = a && a.color,
                        s = t && t.color,
                        a = qn(n.lineWidth, i.lineWidth);
                    return t = t && t.zone && t.zone.color, o = r || t || s || o, t = n.fillColor || i.fillColor || o, o = n.lineColor || i.lineColor || o, e && (i = i.states[e], e = n.states && n.states[e] || {}, a = qn(e.lineWidth, i.lineWidth, a + qn(e.lineWidthPlus, i.lineWidthPlus, 0)), t = e.fillColor || i.fillColor || t, o = e.lineColor || i.lineColor || o), {
                        stroke: o,
                        "stroke-width": a,
                        fill: t
                    }
                },
                destroy: function() {
                    var t, e, i, n = this,
                        o = n.chart,
                        r = /AppleWebKit\/533/.test(Yn.navigator.userAgent),
                        s = n.data || [];
                    for (Rn(n, "destroy"), Gn(n), In(n.axisTypes || [], function(t) {
                            (i = n[t]) && i.series && (Pn(i.series, n), i.isDirty = i.forceRedraw = !0)
                        }), n.legendItem && n.chart.legend.destroyItem(n), t = s.length; t--;)(e = s[t]) && e.destroy && e.destroy();
                    n.points = null, Sn.clearTimeout(n.animationTimeout), Fn(n, function(t, e) {
                        t instanceof Vn && !t.survive && t[r && "group" === e ? "hide" : "destroy"]()
                    }), o.hoverSeries === n && (o.hoverSeries = null), Pn(o.series, n), o.orderSeries(), Fn(n, function(t, e) {
                        delete n[e]
                    })
                },
                getGraphPath: function(r, s, a) {
                    var t, l, h = this,
                        c = h.options,
                        u = c.step,
                        d = [],
                        p = [];
                    return (t = (r = r || h.points).reversed) && r.reverse(), (u = {
                        right: 1,
                        center: 2
                    }[u] || u && 3) && t && (u = 4 - u), !c.connectNulls || s || a || (r = this.getValidPoints(r)), In(r, function(t, e) {
                        var i = t.plotX,
                            n = t.plotY,
                            o = r[e - 1];
                        (t.leftCliff || o && o.rightCliff) && !a && (l = !0), t.isNull && !Dn(s) && 0 < e ? l = !c.connectNulls : t.isNull && !s ? l = !0 : (0 === e || l ? e = ["M", t.plotX, t.plotY] : h.getPointSpline ? e = h.getPointSpline(r, t, e) : u ? (e = 1 === u ? ["L", o.plotX, n] : 2 === u ? ["L", (o.plotX + i) / 2, o.plotY, "L", (o.plotX + i) / 2, n] : ["L", i, o.plotY]).push("L", i, n) : e = ["L", i, n], p.push(t.x), u && (p.push(t.x), 2 === u && p.push(t.x)), d.push.apply(d, e), l = !1)
                    }), d.xMap = p, h.graphPath = d
                },
                drawGraph: function() {
                    var o = this,
                        r = this.options,
                        s = (this.gappedPath || this.getGraphPath).call(this),
                        t = [
                            ["graph", "highcharts-graph", r.lineColor || this.color, r.dashStyle]
                        ];
                    t = o.getZonesGraphs(t), In(t, function(t, e) {
                        var i = t[0],
                            n = o[i];
                        n ? (n.endX = o.preventGraphAnimation ? null : s.xMap, n.animate({
                            d: s
                        })) : s.length && (o[i] = o.chart.renderer.path(s).addClass(t[1]).attr({
                            zIndex: 1
                        }).add(o.group), n = {
                            stroke: t[2],
                            "stroke-width": r.lineWidth,
                            fill: o.fillGraph && o.color || "none"
                        }, t[3] ? n.dashstyle = t[3] : "square" !== r.linecap && (n["stroke-linecap"] = n["stroke-linejoin"] = "round"), n = o[i].attr(n).shadow(e < 2 && r.shadow)), n && (n.startX = s.xMap, n.isArea = s.isArea)
                    })
                },
                getZonesGraphs: function(i) {
                    return In(this.zones, function(t, e) {
                        i.push(["zone-graph-" + e, "highcharts-graph highcharts-zone-graph-" + e + " " + (t.className || ""), t.color || this.color, t.dashStyle || this.options.dashStyle])
                    }, this), i
                },
                applyZones: function() {
                    var i, n, o, r, s, a, l, h, c, u = this,
                        d = this.chart,
                        p = d.renderer,
                        t = this.zones,
                        f = this.clips || [],
                        g = this.graph,
                        m = this.area,
                        v = Math.max(d.chartWidth, d.chartHeight),
                        y = this[(this.zoneAxis || "y") + "Axis"],
                        b = d.inverted,
                        x = !1;
                    t.length && (g || m) && y && void 0 !== y.min && (s = y.reversed, a = y.horiz, g && !this.showLine && g.hide(), m && m.hide(), r = y.getExtremes(), In(t, function(t, e) {
                        i = s ? a ? d.plotWidth : 0 : a ? 0 : y.toPixels(r.min), i = Math.min(Math.max(qn(n, i), 0), v), n = Math.min(Math.max(Math.round(y.toPixels(qn(t.value, r.max), !0)), 0), v), x && (i = n = y.toPixels(r.max)), l = Math.abs(i - n), h = Math.min(i, n), c = Math.max(i, n), y.isXAxis ? (o = {
                            x: b ? c : h,
                            y: 0,
                            width: l,
                            height: v
                        }, a || (o.x = d.plotHeight - o.x)) : (o = {
                            x: 0,
                            y: b ? c : h,
                            width: v,
                            height: l
                        }, a && (o.y = d.plotWidth - o.y)), b && p.isVML && (o = y.isXAxis ? {
                            x: 0,
                            y: s ? h : c,
                            height: o.width,
                            width: d.chartWidth
                        } : {
                            x: o.y - d.plotLeft - d.spacingBox.x,
                            y: 0,
                            width: o.height,
                            height: d.chartHeight
                        }), f[e] ? f[e].animate(o) : (f[e] = p.clipRect(o), g && u["zone-graph-" + e].clip(f[e]), m && u["zone-area-" + e].clip(f[e])), x = t.value > r.max, u.resetZones && 0 === n && (n = void 0)
                    }), this.clips = f)
                },
                invertGroups: function(e) {
                    function t() {
                        In(["group", "markerGroup"], function(t) {
                            n[t] && (o.renderer.isVML && n[t].attr({
                                width: n.yAxis.len,
                                height: n.xAxis.len
                            }), n[t].width = n.yAxis.len, n[t].height = n.xAxis.len, n[t].invert(e))
                        })
                    }
                    var i, n = this,
                        o = n.chart;
                    n.xAxis && (i = En(o, "resize", t), En(n, "destroy", i), t(e), n.invertGroups = t)
                },
                plotGroup: function(t, e, i, n, o) {
                    var r = this[t],
                        s = !r;
                    return s && (this[t] = r = this.chart.renderer.g().attr({
                        zIndex: n || .1
                    }).add(o)), r.addClass("highcharts-" + e + " highcharts-series-" + this.index + " highcharts-" + this.type + "-series " + (Dn(this.colorIndex) ? "highcharts-color-" + this.colorIndex + " " : "") + (this.options.className || "") + (r.hasClass("highcharts-tracker") ? " highcharts-tracker" : ""), !0), r.attr({
                        visibility: i
                    })[s ? "attr" : "animate"](this.getPlotBox()), r
                },
                getPlotBox: function() {
                    var t = this.chart,
                        e = this.xAxis,
                        i = this.yAxis;
                    return t.inverted && (e = i, i = this.xAxis), {
                        translateX: e ? e.left : t.plotLeft,
                        translateY: i ? i.top : t.plotTop,
                        scaleX: 1,
                        scaleY: 1
                    }
                },
                render: function() {
                    var t, e = this,
                        i = e.chart,
                        n = e.options,
                        o = !!e.animate && i.renderer.isSVG && An(n.animation).duration,
                        r = e.visible ? "inherit" : "hidden",
                        s = n.zIndex,
                        a = e.hasRendered,
                        l = i.seriesGroup,
                        h = i.inverted;
                    t = e.plotGroup("group", "series", r, s, l), e.markerGroup = e.plotGroup("markerGroup", "markers", r, s, l), o && e.animate(!0), t.inverted = !!e.isCartesian && h, e.drawGraph && (e.drawGraph(), e.applyZones()), e.drawDataLabels && e.drawDataLabels(), e.visible && e.drawPoints(), e.drawTracker && !1 !== e.options.enableMouseTracking && e.drawTracker(), e.invertGroups(h), !1 === n.clip || e.sharedClipKey || a || t.clip(i.clipRect), o && e.animate(), a || (e.animationTimeout = Xn(function() {
                        e.afterAnimate()
                    }, o)), e.isDirty = !1, e.hasRendered = !0, Rn(e, "afterRender")
                },
                redraw: function() {
                    var t = this.chart,
                        e = this.isDirty || this.isDirtyData,
                        i = this.group,
                        n = this.xAxis,
                        o = this.yAxis;
                    i && (t.inverted && i.attr({
                        width: t.plotWidth,
                        height: t.plotHeight
                    }), i.animate({
                        translateX: qn(n && n.left, t.plotLeft),
                        translateY: qn(o && o.top, t.plotTop)
                    })), this.translate(), this.render(), e && delete this.kdTree
                },
                kdAxisArray: ["clientX", "plotY"],
                searchPoint: function(t, e) {
                    var i = this.xAxis,
                        n = this.yAxis,
                        o = this.chart.inverted;
                    return this.searchKDTree({
                        clientX: o ? i.len - t.chartY + i.pos : t.chartX - i.pos,
                        plotY: o ? n.len - t.chartX + n.pos : t.chartY - n.pos
                    }, e)
                },
                buildKDTree: function() {
                    function r(t, e, i) {
                        var n, o;
                        if (o = t && t.length) return n = s.kdAxisArray[e % i], t.sort(function(t, e) {
                            return t[n] - e[n]
                        }), {
                            point: t[o = Math.floor(o / 2)],
                            left: r(t.slice(0, o), e + 1, i),
                            right: r(t.slice(o + 1), e + 1, i)
                        }
                    }
                    this.buildingKdTree = !0;
                    var s = this,
                        t = -1 < s.options.findNearestPointBy.indexOf("y") ? 2 : 1;
                    delete s.kdTree, Xn(function() {
                        s.kdTree = r(s.getValidPoints(null, !s.directTouch), t, t), s.buildingKdTree = !1
                    }, s.options.kdNow ? 0 : 1)
                },
                searchKDTree: function(t, e) {
                    function h(t, e, i, n) {
                        var o, r, s = e.point,
                            a = c.kdAxisArray[i % n],
                            l = s;
                        return o = ((r = Dn(t[u]) && Dn(s[u]) ? Math.pow(t[u] - s[u], 2) : null) || 0) + ((o = Dn(t[d]) && Dn(s[d]) ? Math.pow(t[d] - s[d], 2) : null) || 0), s.dist = Dn(o) ? Math.sqrt(o) : Number.MAX_VALUE, s.distX = Dn(r) ? Math.sqrt(r) : Number.MAX_VALUE, r = (a = t[a] - s[a]) < 0 ? "right" : "left", e[o = a < 0 ? "left" : "right"] && (l = (o = h(t, e[o], i + 1, n))[p] < l[p] ? o : s), e[r] && Math.sqrt(a * a) < l[p] && (l = (t = h(t, e[r], i + 1, n))[p] < l[p] ? t : l), l
                    }
                    var c = this,
                        u = this.kdAxisArray[0],
                        d = this.kdAxisArray[1],
                        p = e ? "distX" : "dist";
                    if (e = -1 < c.options.findNearestPointBy.indexOf("y") ? 2 : 1, this.kdTree || this.buildingKdTree || this.buildKDTree(), this.kdTree) return h(t, this.kdTree, e, e)
                }
            }), $n = (Kn = It).Axis, Qn = Kn.Chart, Zn = Kn.correctFloat, Jn = Kn.defined, to = Kn.destroyObjectProperties, eo = Kn.each, io = Kn.format, no = Kn.objectEach, oo = Kn.pick, ro = Kn.Series, Kn.StackItem = function(t, e, i, n, o) {
                var r = t.chart.inverted;
                this.axis = t, this.isNegative = i, this.options = e, this.x = n, this.total = null, this.points = {}, this.stack = o, this.rightCliff = this.leftCliff = 0, this.alignOptions = {
                    align: e.align || (r ? i ? "left" : "right" : "center"),
                    verticalAlign: e.verticalAlign || (r ? "middle" : i ? "bottom" : "top"),
                    y: oo(e.y, r ? 4 : i ? 14 : -6),
                    x: oo(e.x, r ? i ? -6 : 6 : 0)
                }, this.textAlign = e.textAlign || (r ? i ? "right" : "left" : "center")
            }, Kn.StackItem.prototype = {
                destroy: function() {
                    to(this, this.axis)
                },
                render: function(t) {
                    var e = this.axis.chart,
                        i = this.options,
                        n = (n = i.format) ? io(n, this, e.time) : i.formatter.call(this);
                    this.label ? this.label.attr({
                        text: n,
                        visibility: "hidden"
                    }) : this.label = e.renderer.text(n, null, null, i.useHTML).css(i.style).attr({
                        align: this.textAlign,
                        rotation: i.rotation,
                        visibility: "hidden"
                    }).add(t), this.label.labelrank = e.plotHeight
                },
                setOffset: function(t, e) {
                    var i = this.axis,
                        n = i.chart,
                        o = i.translate(i.usePercentage ? 100 : this.total, 0, 0, 0, 1),
                        r = i.translate(0);
                    r = Jn(o) && Math.abs(o - r), t = n.xAxis[0].translate(this.x) + t, i = Jn(o) && this.getStackBox(n, this, t, o, e, r, i), (e = this.label) && i && (e.align(this.alignOptions, null, i), i = e.alignAttr, e[!1 === this.options.crop || n.isInsidePlot(i.x, i.y) ? "show" : "hide"](!0))
                },
                getStackBox: function(t, e, i, n, o, r, s) {
                    var a = e.axis.reversed,
                        l = t.inverted;
                    return t = s.height + s.pos - (l ? t.plotLeft : t.plotTop), e = e.isNegative && !a || !e.isNegative && a, {
                        x: l ? e ? n : n - r : i,
                        y: l ? t - i - o : e ? t - n - r : t - n,
                        width: l ? r : o,
                        height: l ? o : r
                    }
                }
            }, Qn.prototype.getStacks = function() {
                var e = this;
                eo(e.yAxis, function(t) {
                    t.stacks && t.hasVisibleSeries && (t.oldStacks = t.stacks)
                }), eo(e.series, function(t) {
                    !t.options.stacking || !0 !== t.visible && !1 !== e.options.chart.ignoreHiddenSeries || (t.stackKey = t.type + oo(t.options.stack, ""))
                })
            }, $n.prototype.buildStacks = function() {
                var t, e = this.series,
                    i = oo(this.options.reversedStacks, !0),
                    n = e.length;
                if (!this.isXAxis) {
                    for (this.usePercentage = !1, t = n; t--;) e[i ? t : n - t - 1].setStackedPoints();
                    for (t = 0; t < n; t++) e[t].modifyStacks()
                }
            }, $n.prototype.renderStackTotals = function() {
                var t = this.chart,
                    e = t.renderer,
                    i = this.stacks,
                    n = this.stackTotalGroup;
                n || (this.stackTotalGroup = n = e.g("stack-labels").attr({
                    visibility: "visible",
                    zIndex: 6
                }).add()), n.translate(t.plotLeft, t.plotTop), no(i, function(t) {
                    no(t, function(t) {
                        t.render(n)
                    })
                })
            }, $n.prototype.resetStacks = function() {
                var n = this,
                    t = n.stacks;
                n.isXAxis || no(t, function(i) {
                    no(i, function(t, e) {
                        t.touched < n.stacksTouched ? (t.destroy(), delete i[e]) : (t.total = null, t.cumulative = null)
                    })
                })
            }, $n.prototype.cleanStacks = function() {
                var t;
                this.isXAxis || (this.oldStacks && (t = this.stacks = this.oldStacks), no(t, function(t) {
                    no(t, function(t) {
                        t.cumulative = t.total
                    })
                }))
            }, ro.prototype.setStackedPoints = function() {
                if (this.options.stacking && (!0 === this.visible || !1 === this.chart.options.chart.ignoreHiddenSeries)) {
                    var t, e, i, n, o, r, s, a = this.processedXData,
                        l = this.processedYData,
                        h = [],
                        c = l.length,
                        u = (f = this.options).threshold,
                        d = oo(f.startFromThreshold && u, 0),
                        p = f.stack,
                        f = f.stacking,
                        g = this.stackKey,
                        m = "-" + g,
                        v = this.negStacks,
                        y = this.yAxis,
                        b = y.stacks,
                        x = y.oldStacks;
                    for (y.stacksTouched += 1, o = 0; o < c; o++) r = a[o], s = l[o], n = (t = this.getStackIndicator(t, r, this.index)).key, b[i = (e = v && s < (d ? 0 : u)) ? m : g] || (b[i] = {}), b[i][r] || (x[i] && x[i][r] ? (b[i][r] = x[i][r], b[i][r].total = null) : b[i][r] = new Kn.StackItem(y, y.options.stackLabels, e, r, p)), i = b[i][r], null !== s ? (i.points[n] = i.points[this.index] = [oo(i.cumulative, d)], Jn(i.cumulative) || (i.base = n), i.touched = y.stacksTouched, 0 < t.index && !1 === this.singleStacks && (i.points[n][0] = i.points[this.index + "," + r + ",0"][0])) : i.points[n] = i.points[this.index] = null, "percent" === f ? (e = e ? g : m, v && b[e] && b[e][r] ? (e = b[e][r], i.total = e.total = Math.max(e.total, i.total) + Math.abs(s) || 0) : i.total = Zn(i.total + (Math.abs(s) || 0))) : i.total = Zn(i.total + (s || 0)), i.cumulative = oo(i.cumulative, d) + (s || 0), null !== s && (i.points[n].push(i.cumulative), h[o] = i.cumulative);
                    "percent" === f && (y.usePercentage = !0), this.stackedYData = h, y.oldStacks = {}
                }
            }, ro.prototype.modifyStacks = function() {
                var o, r = this,
                    t = r.stackKey,
                    s = r.yAxis.stacks,
                    a = r.processedXData,
                    l = r.options.stacking;
                r[l + "Stacker"] && eo([t, "-" + t], function(t) {
                    for (var e, i, n = a.length; n--;) e = a[n], o = r.getStackIndicator(o, e, r.index, t), (i = (e = s[t] && s[t][e]) && e.points[o.key]) && r[l + "Stacker"](i, e, n)
                })
            }, ro.prototype.percentStacker = function(t, e, i) {
                e = e.total ? 100 / e.total : 0, t[0] = Zn(t[0] * e), t[1] = Zn(t[1] * e), this.stackedYData[i] = t[1]
            }, ro.prototype.getStackIndicator = function(t, e, i, n) {
                return !Jn(t) || t.x !== e || n && t.key !== n ? t = {
                    x: e,
                    index: 0,
                    key: n
                } : t.index++, t.key = [i, e, t.index].join(), t
            }, ao = (so = It).addEvent, lo = so.animate, ho = so.Axis, co = so.createElement, uo = so.css, po = so.defined, fo = so.each, go = so.erase, mo = so.extend, vo = so.fireEvent, yo = so.inArray, bo = so.isNumber, xo = so.isObject, wo = so.isArray, To = so.merge, Co = so.objectEach, So = so.pick, Eo = so.Point, Ao = so.Series, ko = so.seriesTypes, _o = so.setAnimation, Mo = so.splat, mo(so.Chart.prototype, {
                addSeries: function(t, e, i) {
                    var n, o = this;
                    return t && (e = So(e, !0), vo(o, "addSeries", {
                        options: t
                    }, function() {
                        n = o.initSeries(t), o.isDirtyLegend = !0, o.linkSeries(), vo(o, "afterAddSeries"), e && o.redraw(i)
                    })), n
                },
                addAxis: function(t, e, i, n) {
                    var o = e ? "xAxis" : "yAxis",
                        r = this.options;
                    return t = To(t, {
                        index: this[o].length,
                        isX: e
                    }), e = new ho(this, t), r[o] = Mo(r[o] || {}), r[o].push(t), So(i, !0) && this.redraw(n), e
                },
                showLoading: function(t) {
                    var e = this,
                        i = e.options,
                        n = e.loadingDiv,
                        o = i.loading,
                        r = function() {
                            n && uo(n, {
                                left: e.plotLeft + "px",
                                top: e.plotTop + "px",
                                width: e.plotWidth + "px",
                                height: e.plotHeight + "px"
                            })
                        };
                    n || (e.loadingDiv = n = co("div", {
                        className: "highcharts-loading highcharts-loading-hidden"
                    }, null, e.container), e.loadingSpan = co("span", {
                        className: "highcharts-loading-inner"
                    }, null, n), ao(e, "redraw", r)), n.className = "highcharts-loading", e.loadingSpan.innerHTML = t || i.lang.loading, uo(n, mo(o.style, {
                        zIndex: 10
                    })), uo(e.loadingSpan, o.labelStyle), e.loadingShown || (uo(n, {
                        opacity: 0,
                        display: ""
                    }), lo(n, {
                        opacity: o.style.opacity || .5
                    }, {
                        duration: o.showDuration || 0
                    })), e.loadingShown = !0, r()
                },
                hideLoading: function() {
                    var t = this.options,
                        e = this.loadingDiv;
                    e && (e.className = "highcharts-loading highcharts-loading-hidden", lo(e, {
                        opacity: 0
                    }, {
                        duration: t.loading.hideDuration || 100,
                        complete: function() {
                            uo(e, {
                                display: "none"
                            })
                        }
                    })), this.loadingShown = !1
                },
                propsRequireDirtyBox: "backgroundColor borderColor borderWidth margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),
                propsRequireUpdateSeries: "chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions time tooltip".split(" "),
                update: function(t, e, o, i) {
                    var n, r, s = this,
                        a = {
                            credits: "addCredits",
                            title: "setTitle",
                            subtitle: "setSubtitle"
                        },
                        l = t.chart,
                        h = [];
                    vo(s, "update", {
                        options: t
                    }), l && (To(!0, s.options.chart, l), "className" in l && s.setClassName(l.className), "reflow" in l && s.setReflow(l.reflow), ("inverted" in l || "polar" in l || "type" in l) && (s.propFromSeries(), n = !0), "alignTicks" in l && (n = !0), Co(l, function(t, e) {
                        -1 !== yo("chart." + e, s.propsRequireUpdateSeries) && (r = !0), -1 !== yo(e, s.propsRequireDirtyBox) && (s.isDirtyBox = !0)
                    }), "style" in l && s.renderer.setStyle(l.style)), t.colors && (this.options.colors = t.colors), t.plotOptions && To(!0, this.options.plotOptions, t.plotOptions), Co(t, function(t, e) {
                        s[e] && "function" == typeof s[e].update ? s[e].update(t, !1) : "function" == typeof s[a[e]] && s[a[e]](t), "chart" !== e && -1 !== yo(e, s.propsRequireUpdateSeries) && (r = !0)
                    }), fo("xAxis yAxis zAxis series colorAxis pane".split(" "), function(i) {
                        var n;
                        t[i] && ("series" === i && (n = [], fo(s[i], function(t, e) {
                            t.options.isInternal || n.push(e)
                        })), fo(Mo(t[i]), function(t, e) {
                            (e = po(t.id) && s.get(t.id) || s[i][n ? n[e] : e]) && e.coll === i && (e.update(t, !1), o && (e.touched = !0)), !e && o && ("series" === i ? s.addSeries(t, !1).touched = !0 : "xAxis" !== i && "yAxis" !== i || (s.addAxis(t, "xAxis" === i, !1).touched = !0))
                        }), o && fo(s[i], function(t) {
                            t.touched || t.options.isInternal ? delete t.touched : h.push(t)
                        }))
                    }), fo(h, function(t) {
                        t.remove(!1)
                    }), n && fo(s.axes, function(t) {
                        t.update({}, !1)
                    }), r && fo(s.series, function(t) {
                        t.update({}, !1)
                    }), t.loading && To(!0, s.options.loading, t.loading), n = l && l.width, l = l && l.height, bo(n) && n !== s.chartWidth || bo(l) && l !== s.chartHeight ? s.setSize(n, l, i) : So(e, !0) && s.redraw(i), vo(s, "afterUpdate", {
                        options: t
                    })
                },
                setSubtitle: function(t) {
                    this.setTitle(void 0, t)
                }
            }), mo(Eo.prototype, {
                update: function(t, e, i, n) {
                    function o() {
                        s.applyOptions(t), null === s.y && l && (s.graphic = l.destroy()), xo(t, !0) && (l && l.element && t && t.marker && void 0 !== t.marker.symbol && (s.graphic = l.destroy()), t && t.dataLabels && s.dataLabel && (s.dataLabel = s.dataLabel.destroy()), s.connector && (s.connector = s.connector.destroy())), r = s.index, a.updateParallelArrays(s, r), c.data[r] = xo(c.data[r], !0) || xo(t, !0) ? s.options : So(t, c.data[r]), a.isDirty = a.isDirtyData = !0, !a.fixedBox && a.hasCartesianSeries && (h.isDirtyBox = !0), "point" === c.legendType && (h.isDirtyLegend = !0), e && h.redraw(i)
                    }
                    var r, s = this,
                        a = s.series,
                        l = s.graphic,
                        h = a.chart,
                        c = a.options;
                    e = So(e, !0), !1 === n ? o() : s.firePointEvent("update", {
                        options: t
                    }, o)
                },
                remove: function(t, e) {
                    this.series.removePoint(yo(this, this.series.data), t, e)
                }
            }), mo(Ao.prototype, {
                addPoint: function(t, e, i, n) {
                    var o, r, s, a, l = this.options,
                        h = this.data,
                        c = this.chart,
                        u = (u = this.xAxis) && u.hasNames && u.names,
                        d = l.data,
                        p = this.xData;
                    if (e = So(e, !0), o = {
                            series: this
                        }, this.pointClass.prototype.applyOptions.apply(o, [t]), a = o.x, s = p.length, this.requireSorting && a < p[s - 1])
                        for (r = !0; s && p[s - 1] > a;) s--;
                    this.updateParallelArrays(o, "splice", s, 0, 0), this.updateParallelArrays(o, s), u && o.name && (u[a] = o.name), d.splice(s, 0, t), r && (this.data.splice(s, 0, null), this.processData()), "point" === l.legendType && this.generatePoints(), i && (h[0] && h[0].remove ? h[0].remove(!1) : (h.shift(), this.updateParallelArrays(o, "shift"), d.shift())), this.isDirtyData = this.isDirty = !0, e && c.redraw(n)
                },
                removePoint: function(t, e, i) {
                    var n = this,
                        o = n.data,
                        r = o[t],
                        s = n.points,
                        a = n.chart,
                        l = function() {
                            s && s.length === o.length && s.splice(t, 1), o.splice(t, 1), n.options.data.splice(t, 1), n.updateParallelArrays(r || {
                                series: n
                            }, "splice", t, 1), r && r.destroy(), n.isDirty = !0, n.isDirtyData = !0, e && a.redraw()
                        };
                    _o(i, a), e = So(e, !0), r ? r.firePointEvent("remove", null, l) : l()
                },
                remove: function(t, e, i) {
                    function n() {
                        o.destroy(), r.isDirtyLegend = r.isDirtyBox = !0, r.linkSeries(), So(t, !0) && r.redraw(e)
                    }
                    var o = this,
                        r = o.chart;
                    !1 !== i ? vo(o, "remove", null, n) : n()
                },
                update: function(e, t) {
                    var i, n = this,
                        o = n.chart,
                        r = n.userOptions,
                        s = n.oldType || n.type,
                        a = e.type || r.type || o.options.chart.type,
                        l = ko[s].prototype,
                        h = ["group", "markerGroup", "dataLabelsGroup"],
                        c = ["navigatorSeries", "baseSeries"],
                        u = n.finishedAnimating && {
                            animation: !1
                        },
                        d = ["data", "name", "turboThreshold"],
                        p = so.keys(e),
                        f = 0 < p.length;
                    if (fo(p, function(t) {
                            -1 === yo(t, d) && (f = !1)
                        }), f) e.data && this.setData(e.data, !1), e.name && this.setName(e.name, !1);
                    else {
                        for (i in c = h.concat(c), fo(c, function(t) {
                                c[t] = n[t], delete n[t]
                            }), e = To(r, u, {
                                index: n.index,
                                pointStart: So(r.pointStart, n.xData[0])
                            }, {
                                data: n.options.data
                            }, e), n.remove(!1, null, !1), l) n[i] = void 0;
                        ko[a || s] ? mo(n, ko[a || s].prototype) : so.error(17, !0), fo(c, function(t) {
                            n[t] = c[t]
                        }), n.init(o, e), e.zIndex !== r.zIndex && fo(h, function(t) {
                            n[t] && n[t].attr({
                                zIndex: e.zIndex
                            })
                        }), n.oldType = s, o.linkSeries()
                    }
                    vo(this, "afterUpdate"), So(t, !0) && o.redraw(!1)
                },
                setName: function(t) {
                    this.name = this.options.name = this.userOptions.name = t, this.chart.isDirtyLegend = !0
                }
            }), mo(ho.prototype, {
                update: function(t, e) {
                    var i = this.chart,
                        n = t && t.events || {};
                    t = To(this.userOptions, t), i.options[this.coll].indexOf && (i.options[this.coll][i.options[this.coll].indexOf(this.userOptions)] = t), Co(i.options[this.coll].events, function(t, e) {
                        "undefined" == typeof n[e] && (n[e] = void 0)
                    }), this.destroy(!0), this.init(i, mo(t, {
                        events: n
                    })), i.isDirtyBox = !0, So(e, !0) && i.redraw()
                },
                remove: function(t) {
                    for (var e = this.chart, i = this.coll, n = this.series, o = n.length; o--;) n[o] && n[o].remove(!1);
                    go(e.axes, this), go(e[i], this), wo(e.options[i]) ? e.options[i].splice(this.options.index, 1) : delete e.options[i], fo(e[i], function(t, e) {
                        t.options.index = t.userOptions.index = e
                    }), this.destroy(), e.isDirtyBox = !0, So(t, !0) && e.redraw()
                },
                setTitle: function(t, e) {
                    this.update({
                        title: t
                    }, e)
                },
                setCategories: function(t, e) {
                    this.update({
                        categories: t
                    }, e)
                }
            }), Lo = (Oo = It).color, Do = Oo.each, Io = Oo.map, Po = Oo.pick, No = Oo.Series, (0, Oo.seriesType)("area", "line", {
                softThreshold: !1,
                threshold: 0
            }, {
                singleStacks: !1,
                getStackPoints: function(t) {
                    var l, h, e = [],
                        c = [],
                        i = this.xAxis,
                        n = this.yAxis,
                        u = n.stacks[this.stackKey],
                        d = {},
                        p = this.index,
                        o = n.series,
                        f = o.length,
                        g = Po(n.options.reversedStacks, !0) ? 1 : -1;
                    if (t = t || this.points, this.options.stacking) {
                        for (h = 0; h < t.length; h++) t[h].leftNull = t[h].rightNull = null, d[t[h].x] = t[h];
                        Oo.objectEach(u, function(t, e) {
                            null !== t.total && c.push(e)
                        }), c.sort(function(t, e) {
                            return t - e
                        }), l = Io(o, function() {
                            return this.visible
                        }), Do(c, function(o, r) {
                            var s, a, t = 0;
                            if (d[o] && !d[o].isNull) e.push(d[o]), Do([-1, 1], function(t) {
                                var e = 1 === t ? "rightNull" : "leftNull",
                                    i = 0,
                                    n = u[c[r + t]];
                                if (n)
                                    for (h = p; 0 <= h && h < f;)(s = n.points[h]) || (h === p ? d[o][e] = !0 : l[h] && (a = u[o].points[h]) && (i -= a[1] - a[0])), h += g;
                                d[o][1 === t ? "rightCliff" : "leftCliff"] = i
                            });
                            else {
                                for (h = p; 0 <= h && h < f;) {
                                    if (s = u[o].points[h]) {
                                        t = s[1];
                                        break
                                    }
                                    h += g
                                }
                                t = n.translate(t, 0, 1, 0, 1), e.push({
                                    isNull: !0,
                                    plotX: i.translate(o, 0, 0, 0, 1),
                                    x: o,
                                    plotY: t,
                                    yBottom: t
                                })
                            }
                        })
                    }
                    return e
                },
                getGraphPath: function(a) {
                    var t, e, l, i, n = No.prototype.getGraphPath,
                        h = (o = this.options).stacking,
                        c = this.yAxis,
                        u = [],
                        d = [],
                        p = this.index,
                        f = c.stacks[this.stackKey],
                        g = o.threshold,
                        m = c.getThreshold(o.threshold),
                        o = o.connectNulls || "percent" === h,
                        r = function(t, e, i) {
                            var n = a[t];
                            t = h && f[n.x].points[p];
                            var o, r, s = n[i + "Null"] || 0;
                            i = n[i + "Cliff"] || 0, n = !0, i || s ? (o = (s ? t[0] : t[1]) + i, r = t[0] + i, n = !!s) : !h && a[e] && a[e].isNull && (o = r = g), void 0 !== o && (d.push({
                                plotX: l,
                                plotY: null === o ? m : c.getThreshold(o),
                                isNull: n,
                                isCliff: !0
                            }), u.push({
                                plotX: l,
                                plotY: null === r ? m : c.getThreshold(r),
                                doCurve: !1
                            }))
                        };
                    for (a = a || this.points, h && (a = this.getStackPoints(a)), t = 0; t < a.length; t++) e = a[t].isNull, l = Po(a[t].rectPlotX, a[t].plotX), i = Po(a[t].yBottom, m), (!e || o) && (o || r(t, t - 1, "left"), e && !h && o || (d.push(a[t]), u.push({
                        x: t,
                        plotX: l,
                        plotY: i
                    })), o || r(t, t + 1, "right"));
                    return t = n.call(this, d, !0, !0), u.reversed = !0, (e = n.call(this, u, !0, !0)).length && (e[0] = "L"), e = t.concat(e), n = n.call(this, d, !1, o), e.xMap = t.xMap, this.areaPath = e, n
                },
                drawGraph: function() {
                    this.areaPath = [], No.prototype.drawGraph.apply(this);
                    var n = this,
                        o = this.areaPath,
                        r = this.options,
                        i = [
                            ["area", "highcharts-area", this.color, r.fillColor]
                        ];
                    Do(this.zones, function(t, e) {
                        i.push(["zone-area-" + e, "highcharts-area highcharts-zone-area-" + e + " " + t.className, t.color || n.color, t.fillColor || r.fillColor])
                    }), Do(i, function(t) {
                        var e = t[0],
                            i = n[e];
                        i ? (i.endX = n.preventGraphAnimation ? null : o.xMap, i.animate({
                            d: o
                        })) : (i = n[e] = n.chart.renderer.path(o).addClass(t[1]).attr({
                            fill: Po(t[3], Lo(t[2]).setOpacity(Po(r.fillOpacity, .75)).get()),
                            zIndex: 0
                        }).add(n.group)).isArea = !0, i.startX = o.xMap, i.shiftUnit = r.step ? 2 : 1
                    })
                },
                drawLegendSymbol: Oo.LegendSymbolMixin.drawRectangle
            }), Ho = (Ro = It).pick, (Ro = Ro.seriesType)("spline", "line", {}, {
                getPointSpline: function(t, e, i) {
                    var n, o, r, s, a = e.plotX,
                        l = e.plotY,
                        h = t[i - 1];
                    if (i = t[i + 1], h && !h.isNull && !1 !== h.doCurve && !e.isCliff && i && !i.isNull && !1 !== i.doCurve && !e.isCliff) {
                        t = h.plotY, r = i.plotX;
                        var c = 0;
                        o = (1.5 * l + t) / 2.5, s = (1.5 * l + (i = i.plotY)) / 2.5, (r = (1.5 * a + r) / 2.5) != (n = (1.5 * a + h.plotX) / 2.5) && (c = (s - o) * (r - a) / (r - n) + l - s), s += c, t < (o += c) && l < o ? s = 2 * l - (o = Math.max(t, l)) : o < t && o < l && (s = 2 * l - (o = Math.min(t, l))), i < s && l < s ? o = 2 * l - (s = Math.max(i, l)) : s < i && s < l && (o = 2 * l - (s = Math.min(i, l))), e.rightContX = r, e.rightContY = s
                    }
                    return e = ["C", Ho(h.rightContX, h.plotX), Ho(h.rightContY, h.plotY), Ho(n, a), Ho(o, l), a, l], h.rightContX = h.rightContY = null, e
                }
            }), Bo = (zo = It).seriesTypes.area.prototype, (0, zo.seriesType)("areaspline", "spline", zo.defaultPlotOptions.area, {
                getStackPoints: Bo.getStackPoints,
                getGraphPath: Bo.getGraphPath,
                drawGraph: Bo.drawGraph,
                drawLegendSymbol: zo.LegendSymbolMixin.drawRectangle
            }), jo = (Wo = It).animObject, Fo = Wo.color, qo = Wo.each, Go = Wo.extend, Uo = Wo.isNumber, Vo = Wo.merge, Xo = Wo.pick, Yo = Wo.Series, Ko = Wo.seriesType, $o = Wo.svg, Ko("column", "line", {
                borderRadius: 0,
                crisp: !0,
                groupPadding: .2,
                marker: null,
                pointPadding: .1,
                minPointLength: 0,
                cropThreshold: 50,
                pointRange: null,
                states: {
                    hover: {
                        halo: !1,
                        brightness: .1
                    },
                    select: {
                        color: "#cccccc",
                        borderColor: "#000000"
                    }
                },
                dataLabels: {
                    align: null,
                    verticalAlign: null,
                    y: null
                },
                softThreshold: !1,
                startFromThreshold: !0,
                stickyTracking: !1,
                tooltip: {
                    distance: 6
                },
                threshold: 0,
                borderColor: "#ffffff"
            }, {
                cropShoulder: 0,
                directTouch: !0,
                trackerGroups: ["group", "dataLabelsGroup"],
                negStacks: !0,
                init: function() {
                    Yo.prototype.init.apply(this, arguments);
                    var e = this,
                        t = e.chart;
                    t.hasRendered && qo(t.series, function(t) {
                        t.type === e.type && (t.isDirty = !0)
                    })
                },
                getColumnMetrics: function() {
                    var o, r = this,
                        t = r.options,
                        e = r.xAxis,
                        s = r.yAxis,
                        i = e.options.reversedStacks,
                        a = (i = e.reversed && !i || !e.reversed && i, {}),
                        l = 0;
                    !1 === t.grouping ? l = 1 : qo(r.chart.series, function(t) {
                        var e, i = t.options,
                            n = t.yAxis;
                        t.type !== r.type || !t.visible && r.chart.options.chart.ignoreHiddenSeries || s.len !== n.len || s.pos !== n.pos || (i.stacking ? (o = t.stackKey, void 0 === a[o] && (a[o] = l++), e = a[o]) : !1 !== i.grouping && (e = l++), t.columnIndex = e)
                    });
                    var n = Math.min(Math.abs(e.transA) * (e.ordinalSlope || t.pointRange || e.closestPointRange || e.tickInterval || 1), e.len),
                        h = n * t.groupPadding,
                        c = (n - 2 * h) / (l || 1);
                    return t = Math.min(t.maxPointWidth || e.len, Xo(t.pointWidth, c * (1 - 2 * t.pointPadding))), r.columnMetrics = {
                        width: t,
                        offset: (c - t) / 2 + (h + ((r.columnIndex || 0) + (i ? 1 : 0)) * c - n / 2) * (i ? -1 : 1)
                    }, r.columnMetrics
                },
                crispCol: function(t, e, i, n) {
                    var o = this.chart,
                        r = -((s = this.borderWidth) % 2 ? .5 : 0),
                        s = s % 2 ? .5 : 1;
                    return o.inverted && o.renderer.isVML && (s += 1), this.options.crisp && (i = Math.round(t + i) + r, i -= t = Math.round(t) + r), n = Math.round(e + n) + s, r = Math.abs(e) <= .5 && .5 < n, n -= e = Math.round(e) + s, r && n && (--e, n += 1), {
                        x: t,
                        y: e,
                        width: i,
                        height: n
                    }
                },
                translate: function() {
                    var l = this,
                        h = l.chart,
                        t = l.options,
                        e = l.dense = l.closestPointRange * l.xAxis.transA < 2,
                        c = (e = l.borderWidth = Xo(t.borderWidth, e ? 0 : 1), l.yAxis),
                        u = t.threshold,
                        d = l.translatedThreshold = c.getThreshold(u),
                        p = Xo(t.minPointLength, 5),
                        i = l.getColumnMetrics(),
                        f = i.width,
                        g = l.barW = Math.max(f, 1 + 2 * e),
                        m = l.pointXOffset = i.offset;
                    h.inverted && (d -= .5), t.pointPadding && (g = Math.ceil(g)), Yo.prototype.translate.apply(l), qo(l.points, function(t) {
                        var e, i = Xo(t.yBottom, d),
                            n = 999 + Math.abs(i),
                            o = (n = Math.min(Math.max(-n, t.plotY), c.len + n), t.plotX + m),
                            r = g,
                            s = Math.min(n, i),
                            a = Math.max(n, i) - s;
                        p && Math.abs(a) < p && (a = p, e = !c.reversed && !t.negative || c.reversed && t.negative, t.y === u && l.dataMax <= u && c.min < u && (e = !e), s = Math.abs(s - d) > p ? i - p : d - (e ? p : 0)), t.barX = o, t.pointWidth = f, t.tooltipPos = h.inverted ? [c.len + c.pos - h.plotLeft - n, l.xAxis.len - o - r / 2, a] : [o + r / 2, n + c.pos - h.plotTop, a], t.shapeType = "rect", t.shapeArgs = l.crispCol.apply(l, t.isNull ? [o, d, r, 0] : [o, s, r, a])
                    })
                },
                getSymbol: Wo.noop,
                drawLegendSymbol: Wo.LegendSymbolMixin.drawRectangle,
                drawGraph: function() {
                    this.group[this.dense ? "addClass" : "removeClass"]("highcharts-dense-data")
                },
                pointAttribs: function(t, e) {
                    var i, n = this.options;
                    i = (l = this.pointAttrToOptions || {}).stroke || "borderColor";
                    var o = l["stroke-width"] || "borderWidth",
                        r = t && t.color || this.color,
                        s = t && t[i] || n[i] || this.color || r,
                        a = t && t[o] || n[o] || this[o] || 0,
                        l = n.dashStyle;
                    return t && this.zones.length && (r = t.getZone(), r = t.options.color || r && r.color || this.color), e && (e = (t = Vo(n.states[e], t.options.states && t.options.states[e] || {})).brightness, r = t.color || void 0 !== e && Fo(r).brighten(t.brightness).get() || r, s = t[i] || s, a = t[o] || a, l = t.dashStyle || l), i = {
                        fill: r,
                        stroke: s,
                        "stroke-width": a
                    }, l && (i.dashstyle = l), i
                },
                drawPoints: function() {
                    var n, o = this,
                        r = this.chart,
                        s = o.options,
                        a = r.renderer,
                        l = s.animationLimit || 250;
                    qo(o.points, function(t) {
                        var e = t.graphic,
                            i = e && r.pointCount < l ? "animate" : "attr";
                        Uo(t.plotY) && null !== t.y ? (n = t.shapeArgs, e ? e[i](Vo(n)) : t.graphic = e = a[t.shapeType](n).add(t.group || o.group), s.borderRadius && e.attr({
                            r: s.borderRadius
                        }), e[i](o.pointAttribs(t, t.selected && "select")).shadow(s.shadow, null, s.stacking && !s.borderRadius), e.addClass(t.getClassName(), !0)) : e && (t.graphic = e.destroy())
                    })
                },
                animate: function(t) {
                    var i, n = this,
                        o = this.yAxis,
                        e = n.options,
                        r = this.chart.inverted,
                        s = {},
                        a = r ? "translateX" : "translateY";
                    $o && (t ? (s.scaleY = .001, t = Math.min(o.pos + o.len, Math.max(o.pos, o.toPixels(e.threshold))), r ? s.translateX = t - o.len : s.translateY = t, n.group.attr(s)) : (i = n.group.attr(a), n.group.animate({
                        scaleY: 1
                    }, Go(jo(n.options.animation), {
                        step: function(t, e) {
                            s[a] = i + e.pos * (o.pos - i), n.group.attr(s)
                        }
                    })), n.animate = null))
                },
                remove: function() {
                    var e = this,
                        t = e.chart;
                    t.hasRendered && qo(t.series, function(t) {
                        t.type === e.type && (t.isDirty = !0)
                    }), Yo.prototype.remove.apply(e, arguments)
                }
            }), (0, It.seriesType)("bar", "column", null, {
                inverted: !0
            }), Zo = (Qo = It).Series, (Qo = Qo.seriesType)("scatter", "line", {
                lineWidth: 0,
                findNearestPointBy: "xy",
                marker: {
                    enabled: !0
                },
                tooltip: {
                    headerFormat: '<span style="color:{point.color}">\u25cf</span> <span style="font-size: 0.85em"> {series.name}</span><br/>',
                    pointFormat: "x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>"
                }
            }, {
                sorted: !1,
                requireSorting: !1,
                noSharedTooltip: !0,
                trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
                takeOrdinalPosition: !1,
                drawGraph: function() {
                    this.options.lineWidth && Zo.prototype.drawGraph.call(this)
                }
            }), tr = (Jo = It).deg2rad, er = Jo.isNumber, ir = Jo.pick, nr = Jo.relativeLength, Jo.CenteredSeriesMixin = {
                getCenter: function() {
                    var t, e, i = this.options,
                        n = this.chart,
                        o = 2 * (i.slicedOffset || 0),
                        r = n.plotWidth - 2 * o,
                        s = (n = n.plotHeight - 2 * o, i.center),
                        a = (s = [ir(s[0], "50%"), ir(s[1], "50%"), i.size || "100%", i.innerSize || 0], Math.min(r, n));
                    for (t = 0; t < 4; ++t) e = s[t], i = t < 2 || 2 === t && /%$/.test(e), s[t] = nr(e, [r, n, a, s[2]][t]) + (i ? o : 0);
                    return s[3] > s[2] && (s[3] = s[2]), s
                },
                getStartAndEndRadians: function(t, e) {
                    return t = er(t) ? t : 0, e = er(e) && t < e && e - t < 360 ? e : t + 360, {
                        start: tr * (t + -90),
                        end: tr * (e + -90)
                    }
                }
            }, rr = (or = It).addEvent, sr = or.CenteredSeriesMixin, ar = or.defined, lr = or.each, hr = or.extend, cr = sr.getStartAndEndRadians, ur = or.inArray, dr = or.noop, pr = or.pick, fr = or.Point, gr = or.Series, mr = or.seriesType, vr = or.setAnimation, mr("pie", "line", {
                center: [null, null],
                clip: !1,
                colorByPoint: !0,
                dataLabels: {
                    allowOverlap: !0,
                    distance: 30,
                    enabled: !0,
                    formatter: function() {
                        return this.point.isNull ? void 0 : this.point.name
                    },
                    x: 0
                },
                ignoreHiddenPoint: !0,
                legendType: "point",
                marker: null,
                size: null,
                showInLegend: !1,
                slicedOffset: 10,
                stickyTracking: !1,
                tooltip: {
                    followPointer: !0
                },
                borderColor: "#ffffff",
                borderWidth: 1,
                states: {
                    hover: {
                        brightness: .1
                    }
                }
            }, {
                isCartesian: !1,
                requireSorting: !1,
                directTouch: !0,
                noSharedTooltip: !0,
                trackerGroups: ["group", "dataLabelsGroup"],
                axisTypes: [],
                pointAttribs: or.seriesTypes.column.prototype.pointAttribs,
                animate: function(t) {
                    var n = this,
                        e = n.points,
                        o = n.startAngleRad;
                    t || (lr(e, function(t) {
                        var e = t.graphic,
                            i = t.shapeArgs;
                        e && (e.attr({
                            r: t.startR || n.center[3] / 2,
                            start: o,
                            end: o
                        }), e.animate({
                            r: i.r,
                            start: i.start,
                            end: i.end
                        }, n.options.animation))
                    }), n.animate = null)
                },
                updateTotals: function() {
                    var t, e, i = 0,
                        n = this.points,
                        o = n.length,
                        r = this.options.ignoreHiddenPoint;
                    for (t = 0; t < o; t++) e = n[t], i += r && !e.visible ? 0 : e.isNull ? 0 : e.y;
                    for (this.total = i, t = 0; t < o; t++)(e = n[t]).percentage = 0 < i && (e.visible || !r) ? e.y / i * 100 : 0, e.total = i
                },
                generatePoints: function() {
                    gr.prototype.generatePoints.call(this), this.updateTotals()
                },
                translate: function(n) {
                    this.generatePoints();
                    var t, e, o, i, r, s, a = 0,
                        l = (f = this.options).slicedOffset,
                        h = l + (f.borderWidth || 0),
                        c = cr(f.startAngle, f.endAngle),
                        u = this.startAngleRad = c.start,
                        d = (c = (this.endAngleRad = c.end) - u, this.points),
                        p = f.dataLabels.distance,
                        f = f.ignoreHiddenPoint,
                        g = d.length;
                    for (n || (this.center = n = this.getCenter()), this.getX = function(t, e, i) {
                            return o = Math.asin(Math.min((t - n[1]) / (n[2] / 2 + i.labelDistance), 1)), n[0] + (e ? -1 : 1) * Math.cos(o) * (n[2] / 2 + i.labelDistance)
                        },
                        r = 0; r < g; r++)(s = d[r]).labelDistance = pr(s.options.dataLabels && s.options.dataLabels.distance, p), this.maxLabelDistance = Math.max(this.maxLabelDistance || 0, s.labelDistance), t = u + a * c, f && !s.visible || (a += s.percentage / 100), e = u + a * c, s.shapeType = "arc", s.shapeArgs = {
                        x: n[0],
                        y: n[1],
                        r: n[2] / 2,
                        innerR: n[3] / 2,
                        start: Math.round(1e3 * t) / 1e3,
                        end: Math.round(1e3 * e) / 1e3
                    }, (o = (e + t) / 2) > 1.5 * Math.PI ? o -= 2 * Math.PI : o < -Math.PI / 2 && (o += 2 * Math.PI), s.slicedTranslation = {
                        translateX: Math.round(Math.cos(o) * l),
                        translateY: Math.round(Math.sin(o) * l)
                    }, e = Math.cos(o) * n[2] / 2, i = Math.sin(o) * n[2] / 2, s.tooltipPos = [n[0] + .7 * e, n[1] + .7 * i], s.half = o < -Math.PI / 2 || o > Math.PI / 2 ? 1 : 0, s.angle = o, t = Math.min(h, s.labelDistance / 5), s.labelPos = [n[0] + e + Math.cos(o) * s.labelDistance, n[1] + i + Math.sin(o) * s.labelDistance, n[0] + e + Math.cos(o) * t, n[1] + i + Math.sin(o) * t, n[0] + e, n[1] + i, s.labelDistance < 0 ? "center" : s.half ? "right" : "left", o]
                },
                drawGraph: null,
                drawPoints: function() {
                    var i, n, o, r, s = this,
                        a = s.chart.renderer,
                        l = s.options.shadow;
                    l && !s.shadowGroup && (s.shadowGroup = a.g("shadow").add(s.group)), lr(s.points, function(t) {
                        if (n = t.graphic, t.isNull) n && (t.graphic = n.destroy());
                        else {
                            r = t.shapeArgs, i = t.getTranslate();
                            var e = t.shadowGroup;
                            l && !e && (e = t.shadowGroup = a.g("shadow").add(s.shadowGroup)), e && e.attr(i), o = s.pointAttribs(t, t.selected && "select"), n ? n.setRadialReference(s.center).attr(o).animate(hr(r, i)) : (t.graphic = n = a[t.shapeType](r).setRadialReference(s.center).attr(i).add(s.group), n.attr(o).attr({
                                "stroke-linejoin": "round"
                            }).shadow(l, e)), n.attr({
                                visibility: t.visible ? "inherit" : "hidden"
                            }), n.addClass(t.getClassName())
                        }
                    })
                },
                searchPoint: dr,
                sortByAngle: function(t, i) {
                    t.sort(function(t, e) {
                        return void 0 !== t.angle && (e.angle - t.angle) * i
                    })
                },
                drawLegendSymbol: or.LegendSymbolMixin.drawRectangle,
                getCenter: sr.getCenter,
                getSymbol: dr
            }, {
                init: function() {
                    fr.prototype.init.apply(this, arguments);
                    var t, e = this;
                    return e.name = pr(e.name, "Slice"), rr(e, "select", t = function(t) {
                        e.slice("select" === t.type)
                    }), rr(e, "unselect", t), e
                },
                isValid: function() {
                    return or.isNumber(this.y, !0) && 0 <= this.y
                },
                setVisible: function(e, t) {
                    var i = this,
                        n = i.series,
                        o = n.chart,
                        r = n.options.ignoreHiddenPoint;
                    t = pr(t, r), e !== i.visible && (i.visible = i.options.visible = e = void 0 === e ? !i.visible : e, n.options.data[ur(i, n.data)] = i.options, lr(["graphic", "dataLabel", "connector", "shadowGroup"], function(t) {
                        i[t] && i[t][e ? "show" : "hide"](!0)
                    }), i.legendItem && o.legend.colorizeItem(i, e), e || "hover" !== i.state || i.setState(""), r && (n.isDirty = !0), t && o.redraw())
                },
                slice: function(t, e, i) {
                    var n = this.series;
                    vr(i, n.chart), pr(e, !0), this.sliced = this.options.sliced = ar(t) ? t : !this.sliced, n.options.data[ur(this, n.data)] = this.options, this.graphic.animate(this.getTranslate()), this.shadowGroup && this.shadowGroup.animate(this.getTranslate())
                },
                getTranslate: function() {
                    return this.sliced ? this.slicedTranslation : {
                        translateX: 0,
                        translateY: 0
                    }
                },
                haloPath: function(t) {
                    var e = this.shapeArgs;
                    return this.sliced || !this.visible ? [] : this.series.chart.renderer.symbols.arc(e.x, e.y, e.r + t, e.r + t, {
                        innerR: this.shapeArgs.r - 1,
                        start: e.start,
                        end: e.end
                    })
                }
            }), br = (yr = It).addEvent, xr = yr.arrayMax, wr = yr.defined, Tr = yr.each, Cr = yr.extend, Sr = yr.format, Er = yr.map, Ar = yr.merge, kr = yr.noop, _r = yr.pick, Mr = yr.relativeLength, Or = yr.Series, Lr = yr.seriesTypes, Dr = yr.some, Ir = yr.stableSort, yr.distribute = function(t, i, n) {
                function e(t, e) {
                    return t.target - e.target
                }
                var o, r, s = !0,
                    a = t,
                    l = [];
                r = 0;
                var h = a.reducedLen || i;
                for (o = t.length; o--;) r += t[o].size;
                if (h < r) {
                    for (Ir(t, function(t, e) {
                            return (e.rank || 0) - (t.rank || 0)
                        }), r = o = 0; r <= h;) r += t[o].size, o++;
                    l = t.splice(o - 1, t.length)
                }
                for (Ir(t, e), t = Er(t, function(t) {
                        return {
                            size: t.size,
                            targets: [t.target],
                            align: _r(t.align, .5)
                        }
                    }); s;) {
                    for (o = t.length; o--;) s = t[o], r = (Math.min.apply(0, s.targets) + Math.max.apply(0, s.targets)) / 2, s.pos = Math.min(Math.max(0, r - s.size * s.align), i - s.size);
                    for (o = t.length, s = !1; o--;) 0 < o && t[o - 1].pos + t[o - 1].size > t[o].pos && (t[o - 1].size += t[o].size, t[o - 1].targets = t[o - 1].targets.concat(t[o].targets), t[o - 1].align = .5, t[o - 1].pos + t[o - 1].size > i && (t[o - 1].pos = i - t[o - 1].size), t.splice(o, 1), s = !0)
                }
                a.push.apply(a, l), o = 0, Dr(t, function(t) {
                    var e = 0;
                    if (Dr(t.targets, function() {
                            if (a[o].pos = t.pos + e, Math.abs(a[o].pos - a[o].target) > n) return Tr(a.slice(0, o + 1), function(t) {
                                delete t.pos
                            }), a.reducedLen = (a.reducedLen || i) - .1 * i, a.reducedLen > .1 * i && yr.distribute(a, i, n), !0;
                            e += a[o].size, o++
                        })) return !0
                }), Ir(a, e)
            }, Or.prototype.drawDataLabels = function() {
                function l(t, e) {
                    var i = e.filter;
                    return !i || (e = i.operator, t = t[i.property], i = i.value, ">" === e && i < t || "<" === e && t < i || ">=" === e && i <= t || "<=" === e && t <= i || "==" === e && t == i || "===" === e && t === i)
                }
                var h, c, u, d, p = this,
                    f = p.chart,
                    g = p.options,
                    m = g.dataLabels,
                    t = p.points,
                    e = p.hasRendered || 0,
                    i = _r(m.defer, !!g.animation),
                    v = f.renderer;
                (m.enabled || p._hasPointLabels) && (p.dlProcessOptions && p.dlProcessOptions(m), d = p.plotGroup("dataLabelsGroup", "data-labels", i && !e ? "hidden" : "visible", m.zIndex || 6), i && (d.attr({
                    opacity: +e
                }), e || br(p, "afterAnimate", function() {
                    p.visible && d.show(!0), d[g.animation ? "animate" : "attr"]({
                        opacity: 1
                    }, {
                        duration: 200
                    })
                })), c = m, Tr(t, function(t) {
                    var e, i, n, o, r = t.dataLabel,
                        s = t.connector,
                        a = !r;
                    h = t.dlOptions || t.options && t.options.dataLabels, (e = _r(h && h.enabled, c.enabled) && !t.isNull) && (e = !0 === l(t, h || m)), e && (m = Ar(c, h), i = t.getLabelConfig(), o = m[t.formatPrefix + "Format"] || m.format, u = wr(o) ? Sr(o, i, f.time) : (m[t.formatPrefix + "Formatter"] || m.formatter).call(i, m), o = m.style, i = m.rotation, o.color = _r(m.color, o.color, p.color, "#000000"), "contrast" === o.color && (t.contrastColor = v.getContrast(t.color || p.color), o.color = m.inside || _r(t.labelDistance, m.distance) < 0 || g.stacking ? t.contrastColor : "#000000"), g.cursor && (o.cursor = g.cursor), n = {
                        fill: m.backgroundColor,
                        stroke: m.borderColor,
                        "stroke-width": m.borderWidth,
                        r: m.borderRadius || 0,
                        rotation: i,
                        padding: m.padding,
                        zIndex: 1
                    }, yr.objectEach(n, function(t, e) {
                        void 0 === t && delete n[e]
                    })), !r || e && wr(u) ? e && wr(u) && (r ? n.text = u : (r = t.dataLabel = i ? v.text(u, 0, -9999, m.useHTML).addClass("highcharts-data-label") : v.label(u, 0, -9999, m.shape, null, null, m.useHTML, null, "data-label")).addClass(" highcharts-data-label-color-" + t.colorIndex + " " + (m.className || "") + (m.useHTML ? " highcharts-tracker" : "")), r.attr(n), r.css(o).shadow(m.shadow), r.added || r.add(d), p.alignDataLabel(t, r, m, null, a)) : (t.dataLabel = r = r.destroy(), s && (t.connector = s.destroy()))
                })), yr.fireEvent(this, "afterDrawDataLabels")
            }, Or.prototype.alignDataLabel = function(t, e, i, n, o) {
                var r, s = this.chart,
                    a = s.inverted,
                    l = _r(t.dlBox && t.dlBox.centerX, t.plotX, -9999),
                    h = _r(t.plotY, -9999),
                    c = e.getBBox(),
                    u = i.rotation,
                    d = i.align,
                    p = this.visible && (t.series.forceDL || s.isInsidePlot(l, Math.round(h), a) || n && s.isInsidePlot(l, a ? n.x + 1 : n.y + n.height - 1, a)),
                    f = "justify" === _r(i.overflow, "justify");
                p && (r = i.style.fontSize, r = s.renderer.fontMetrics(r, e).b, n = Cr({
                    x: a ? this.yAxis.len - h : l,
                    y: Math.round(a ? this.xAxis.len - l : h),
                    width: 0,
                    height: 0
                }, n), Cr(i, {
                    width: c.width,
                    height: c.height
                }), u ? (f = !1, l = s.renderer.rotCorr(r, u), l = {
                    x: n.x + i.x + n.width / 2 + l.x,
                    y: n.y + i.y + {
                        top: 0,
                        middle: .5,
                        bottom: 1
                    }[i.verticalAlign] * n.height
                }, e[o ? "attr" : "animate"](l).attr({
                    align: d
                }), h = 180 < (h = (u + 720) % 360) && h < 360, "left" === d ? l.y -= h ? c.height : 0 : "center" === d ? (l.x -= c.width / 2, l.y -= c.height / 2) : "right" === d && (l.x -= c.width, l.y -= h ? 0 : c.height), e.placed = !0, e.alignAttr = l) : (e.align(i, null, n), l = e.alignAttr), f && 0 <= n.height ? t.isLabelJustified = this.justifyDataLabel(e, i, l, c, n, o) : _r(i.crop, !0) && (p = s.isInsidePlot(l.x, l.y) && s.isInsidePlot(l.x + c.width, l.y + c.height)), i.shape && !u) && e[o ? "attr" : "animate"]({
                    anchorX: a ? s.plotWidth - t.plotY : t.plotX,
                    anchorY: a ? s.plotHeight - t.plotX : t.plotY
                }), p || (e.attr({
                    y: -9999
                }), e.placed = !1)
            }, Or.prototype.justifyDataLabel = function(t, e, i, n, o, r) {
                var s, a, l = this.chart,
                    h = e.align,
                    c = e.verticalAlign,
                    u = t.box ? 0 : t.padding || 0;
                return (s = i.x + u) < 0 && ("right" === h ? e.align = "left" : e.x = -s, a = !0), (s = i.x + n.width - u) > l.plotWidth && ("left" === h ? e.align = "right" : e.x = l.plotWidth - s, a = !0), (s = i.y + u) < 0 && ("bottom" === c ? e.verticalAlign = "top" : e.y = -s, a = !0), (s = i.y + n.height - u) > l.plotHeight && ("top" === c ? e.verticalAlign = "bottom" : e.y = l.plotHeight - s, a = !0), a && (t.placed = !r, t.align(e, null, o)), a
            }, Lr.pie && (Lr.pie.prototype.drawDataLabels = function() {
                var a, i, l, h, c, u, d, p, f, g, m = this,
                    t = m.data,
                    v = m.chart,
                    y = m.options.dataLabels,
                    b = _r(y.connectorPadding, 10),
                    n = _r(y.connectorWidth, 1),
                    x = v.plotWidth,
                    w = v.plotHeight,
                    e = Math.round(v.chartWidth / 3),
                    T = m.center,
                    C = T[2] / 2,
                    S = T[1],
                    o = [
                        [],
                        []
                    ],
                    E = [0, 0, 0, 0];
                m.visible && (y.enabled || m._hasPointLabels) && (Tr(t, function(t) {
                    t.dataLabel && t.visible && t.dataLabel.shortened && (t.dataLabel.attr({
                        width: "auto"
                    }).css({
                        width: "auto",
                        textOverflow: "clip"
                    }), t.dataLabel.shortened = !1)
                }), Or.prototype.drawDataLabels.apply(m), Tr(t, function(t) {
                    t.dataLabel && (t.visible ? (o[t.half].push(t), t.dataLabel._pos = null, !wr(y.style.width) && !wr(t.options.dataLabels && t.options.dataLabels.style && t.options.dataLabels.style.width) && t.dataLabel.getBBox().width > e && (t.dataLabel.css({
                        width: .7 * e
                    }), t.dataLabel.shortened = !0)) : t.dataLabel = t.dataLabel.destroy())
                }), Tr(o, function(t, e) {
                    var i, n, o, r = t.length,
                        s = [];
                    if (r)
                        for (m.sortByAngle(t, e - .5), 0 < m.maxLabelDistance && (i = Math.max(0, S - C - m.maxLabelDistance), n = Math.min(S + C + m.maxLabelDistance, v.plotHeight), Tr(t, function(t) {
                                0 < t.labelDistance && t.dataLabel && (t.top = Math.max(0, S - C - t.labelDistance), t.bottom = Math.min(S + C + t.labelDistance, v.plotHeight), o = t.dataLabel.getBBox().height || 21, t.distributeBox = {
                                    target: t.labelPos[1] - t.top + o / 2,
                                    size: o,
                                    rank: t.y
                                }, s.push(t.distributeBox))
                            }), i = n + o - i, yr.distribute(s, i, i / 5)), g = 0; g < r; g++) a = t[g], c = a.labelPos, l = a.dataLabel, f = !1 === a.visible ? "hidden" : "inherit", p = i = c[1], s && wr(a.distributeBox) && (void 0 === a.distributeBox.pos ? f = "hidden" : (u = a.distributeBox.size, p = a.top + a.distributeBox.pos)), delete a.positionIndex, d = y.justify ? T[0] + (e ? -1 : 1) * (C + a.labelDistance) : m.getX(p < a.top + 2 || p > a.bottom - 2 ? i : p, e, a), l._attr = {
                            visibility: f,
                            align: c[6]
                        }, l._pos = {
                            x: d + y.x + ({
                                left: b,
                                right: -b
                            }[c[6]] || 0),
                            y: p + y.y - 10
                        }, c.x = d, c.y = p, _r(y.crop, !0) && (h = l.getBBox().width, i = null, d - h < b && 1 === e ? (i = Math.round(h - d + b), E[3] = Math.max(i, E[3])) : x - b < d + h && 0 === e && (i = Math.round(d + h - x + b), E[1] = Math.max(i, E[1])), p - u / 2 < 0 ? E[0] = Math.max(Math.round(u / 2 - p), E[0]) : w < p + u / 2 && (E[2] = Math.max(Math.round(p + u / 2 - w), E[2])), l.sideOverflow = i)
                }), 0 === xr(E) || this.verifyDataLabelOverflow(E)) && (this.placeDataLabels(), n && Tr(this.points, function(t) {
                    var e;
                    i = t.connector, (l = t.dataLabel) && l._pos && t.visible && 0 < t.labelDistance ? (f = l._attr.visibility, (e = !i) && (t.connector = i = v.renderer.path().addClass("highcharts-data-label-connector  highcharts-color-" + t.colorIndex + (t.className ? " " + t.className : "")).add(m.dataLabelsGroup), i.attr({
                        "stroke-width": n,
                        stroke: y.connectorColor || t.color || "#666666"
                    })), i[e ? "attr" : "animate"]({
                        d: m.connectorPath(t.labelPos)
                    }), i.attr("visibility", f)) : i && (t.connector = i.destroy())
                }))
            }, Lr.pie.prototype.connectorPath = function(t) {
                var e = t.x,
                    i = t.y;
                return _r(this.options.dataLabels.softConnector, !0) ? ["M", e + ("left" === t[6] ? 5 : -5), i, "C", e, i, 2 * t[2] - t[4], 2 * t[3] - t[5], t[2], t[3], "L", t[4], t[5]] : ["M", e + ("left" === t[6] ? 5 : -5), i, "L", t[2], t[3], "L", t[4], t[5]]
            }, Lr.pie.prototype.placeDataLabels = function() {
                Tr(this.points, function(t) {
                    var e = t.dataLabel;
                    e && t.visible && ((t = e._pos) ? (e.sideOverflow && (e._attr.width = e.getBBox().width - e.sideOverflow, e.css({
                        width: e._attr.width + "px",
                        textOverflow: (this.options.dataLabels.style || {}).textOverflow || "ellipsis"
                    }), e.shortened = !0), e.attr(e._attr), e[e.moved ? "animate" : "attr"](t), e.moved = !0) : e && e.attr({
                        y: -9999
                    }))
                }, this)
            }, Lr.pie.prototype.alignDataLabel = kr, Lr.pie.prototype.verifyDataLabelOverflow = function(t) {
                var e, i = this.center,
                    n = this.options,
                    o = n.center,
                    r = n.minSize || 80,
                    s = null !== n.size;
                return s || (null !== o[0] ? e = Math.max(i[2] - Math.max(t[1], t[3]), r) : (e = Math.max(i[2] - t[1] - t[3], r), i[0] += (t[3] - t[1]) / 2), null !== o[1] ? e = Math.max(Math.min(e, i[2] - Math.max(t[0], t[2])), r) : (e = Math.max(Math.min(e, i[2] - t[0] - t[2]), r), i[1] += (t[0] - t[2]) / 2), e < i[2] ? (i[2] = e, i[3] = Math.min(Mr(n.innerSize || 0, e), e), this.translate(i), this.drawDataLabels && this.drawDataLabels()) : s = !0), s
            }), Lr.column && (Lr.column.prototype.alignDataLabel = function(t, e, i, n, o) {
                var r = this.chart.inverted,
                    s = t.series,
                    a = t.dlBox || t.shapeArgs,
                    l = _r(t.below, t.plotY > _r(this.translatedThreshold, s.yAxis.len)),
                    h = _r(i.inside, !!this.options.stacking);
                a && ((n = Ar(a)).y < 0 && (n.height += n.y, n.y = 0), 0 < (a = n.y + n.height - s.yAxis.len) && (n.height -= a), r && (n = {
                    x: s.yAxis.len - n.y - n.height,
                    y: s.xAxis.len - n.x - n.width,
                    width: n.height,
                    height: n.width
                }), h || (r ? (n.x += l ? 0 : n.width, n.width = 0) : (n.y += l ? n.height : 0, n.height = 0))), i.align = _r(i.align, !r || h ? "center" : l ? "right" : "left"), i.verticalAlign = _r(i.verticalAlign, r || h ? "middle" : l ? "top" : "bottom"), Or.prototype.alignDataLabel.call(this, t, e, i, n, o), t.isLabelJustified && t.contrastColor && t.dataLabel.css({
                    color: t.contrastColor
                })
            }), Nr = (Pr = It).Chart, Rr = Pr.each, Hr = Pr.objectEach, zr = Pr.pick, (Pr = Pr.addEvent)(Nr, "render", function() {
                var n = [];
                Rr(this.labelCollectors || [], function(t) {
                    n = n.concat(t())
                }), Rr(this.yAxis || [], function(t) {
                    t.options.stackLabels && !t.options.stackLabels.allowOverlap && Hr(t.stacks, function(t) {
                        Hr(t, function(t) {
                            n.push(t.label)
                        })
                    })
                }), Rr(this.series || [], function(t) {
                    var e = t.options.dataLabels,
                        i = t.dataLabelCollections || ["dataLabel"];
                    (e.enabled || t._hasPointLabels) && !e.allowOverlap && t.visible && Rr(i, function(e) {
                        Rr(t.points, function(t) {
                            t[e] && (t[e].labelrank = zr(t.labelrank, t.shapeArgs && t.shapeArgs.height), n.push(t[e]))
                        })
                    })
                }), this.hideOverlappingLabels(n)
            }), Nr.prototype.hideOverlappingLabels = function(t) {
                var e, i, n, o, r, s, a = t.length,
                    l = this.renderer,
                    h = function(t, e, i, n, o, r, s, a) {
                        return !(t + i < o || o + s < t || e + n < r || r + a < e)
                    };
                for (n = function(t) {
                        var e, i, n, o = 2 * (t.box ? 0 : t.padding || 0);
                        if (n = 0, t && (!t.alignAttr || t.placed)) return e = t.alignAttr || {
                            x: t.attr("x"),
                            y: t.attr("y")
                        }, i = t.parentGroup, t.width || (n = t.getBBox(), t.width = n.width, t.height = n.height, n = l.fontMetrics(null, t.element).h), {
                            x: e.x + (i.translateX || 0),
                            y: e.y + (i.translateY || 0) - n,
                            width: t.width - o,
                            height: t.height - o
                        }
                    }, i = 0; i < a; i++)(e = t[i]) && (e.oldOpacity = e.opacity, e.newOpacity = 1, e.absoluteBox = n(e));
                for (t.sort(function(t, e) {
                        return (e.labelrank || 0) - (t.labelrank || 0)
                    }), i = 0; i < a; i++)
                    for (s = (n = t[i]) && n.absoluteBox, e = i + 1; e < a; ++e) r = (o = t[e]) && o.absoluteBox, s && r && n !== o && 0 !== n.newOpacity && 0 !== o.newOpacity && (r = h(s.x, s.y, s.width, s.height, r.x, r.y, r.width, r.height)) && ((n.labelrank < o.labelrank ? n : o).newOpacity = 0);
                Rr(t, function(t) {
                    var e, i;
                    t && (i = t.newOpacity, t.oldOpacity !== i && (t.alignAttr && t.placed ? (i ? t.show(!0) : e = function() {
                        t.hide()
                    }, t.alignAttr.opacity = i, t[t.isOld ? "animate" : "attr"](t.alignAttr, null, e)) : t.attr({
                        opacity: i
                    })), t.isOld = !0)
                })
            }, jr = (Br = It).addEvent, Fr = Br.Chart, qr = Br.createElement, Gr = Br.css, Ur = Br.defaultOptions, Vr = Br.defaultPlotOptions, Xr = Br.each, Yr = Br.extend, Kr = Br.fireEvent, $r = Br.hasTouch, Qr = Br.inArray, Zr = Br.isObject, Jr = Br.Legend, ts = Br.merge, es = Br.pick, is = Br.Point, ns = Br.Series, os = Br.seriesTypes, rs = Br.svg, Wr = Br.TrackerMixin = {
                drawTrackerPoint: function() {
                    var e = this,
                        i = e.chart.pointer,
                        n = function(t) {
                            var e = i.getPointFromEvent(t);
                            void 0 !== e && (i.isDirectTouch = !0, e.onMouseOver(t))
                        };
                    Xr(e.points, function(t) {
                        t.graphic && (t.graphic.element.point = t), t.dataLabel && (t.dataLabel.div ? t.dataLabel.div.point = t : t.dataLabel.element.point = t)
                    }), e._hasTracking || (Xr(e.trackerGroups, function(t) {
                        e[t] && (e[t].addClass("highcharts-tracker").on("mouseover", n).on("mouseout", function(t) {
                            i.onTrackerMouseOut(t)
                        }), $r && e[t].on("touchstart", n), e.options.cursor && e[t].css(Gr).css({
                            cursor: e.options.cursor
                        }))
                    }), e._hasTracking = !0), Kr(this, "afterDrawTracker")
                },
                drawTrackerGraph: function() {
                    var t, e = this,
                        i = e.options,
                        n = i.trackByArea,
                        o = [].concat(n ? e.areaPath : e.graphPath),
                        r = o.length,
                        s = e.chart,
                        a = s.pointer,
                        l = s.renderer,
                        h = s.options.tooltip.snap,
                        c = e.tracker,
                        u = function() {
                            s.hoverSeries !== e && e.onMouseOver()
                        },
                        d = "rgba(192,192,192," + (rs ? 1e-4 : .002) + ")";
                    if (r && !n)
                        for (t = r + 1; t--;) "M" === o[t] && o.splice(t + 1, 0, o[t + 1] - h, o[t + 2], "L"), (t && "M" === o[t] || t === r) && o.splice(t, 0, "L", o[t - 2] + h, o[t - 1]);
                    c ? c.attr({
                        d: o
                    }) : e.graph && (e.tracker = l.path(o).attr({
                        "stroke-linejoin": "round",
                        visibility: e.visible ? "visible" : "hidden",
                        stroke: d,
                        fill: n ? d : "none",
                        "stroke-width": e.graph.strokeWidth() + (n ? 0 : 2 * h),
                        zIndex: 2
                    }).add(e.group), Xr([e.tracker, e.markerGroup], function(t) {
                        t.addClass("highcharts-tracker").on("mouseover", u).on("mouseout", function(t) {
                            a.onTrackerMouseOut(t)
                        }), i.cursor && t.css({
                            cursor: i.cursor
                        }), $r && t.on("touchstart", u)
                    })), Kr(this, "afterDrawTracker")
                }
            }, os.column && (os.column.prototype.drawTracker = Wr.drawTrackerPoint), os.pie && (os.pie.prototype.drawTracker = Wr.drawTrackerPoint), os.scatter && (os.scatter.prototype.drawTracker = Wr.drawTrackerPoint), Yr(Jr.prototype, {
                setItemEvents: function(i, t, e) {
                    var n = this,
                        o = n.chart.renderer.boxWrapper,
                        r = "highcharts-legend-" + (i instanceof is ? "point" : "series") + "-active";
                    (e ? t : i.legendGroup).on("mouseover", function() {
                        i.setState("hover"), o.addClass(r), t.css(n.options.itemHoverStyle)
                    }).on("mouseout", function() {
                        t.css(ts(i.visible ? n.itemStyle : n.itemHiddenStyle)), o.removeClass(r), i.setState()
                    }).on("click", function(t) {
                        var e = function() {
                            i.setVisible && i.setVisible()
                        };
                        o.removeClass(r), t = {
                            browserEvent: t
                        }, i.firePointEvent ? i.firePointEvent("legendItemClick", t, e) : Kr(i, "legendItemClick", t, e)
                    })
                },
                createCheckboxForItem: function(e) {
                    e.checkbox = qr("input", {
                        type: "checkbox",
                        className: "highcharts-legend-checkbox",
                        checked: e.selected,
                        defaultChecked: e.selected
                    }, this.options.itemCheckboxStyle, this.chart.container), jr(e.checkbox, "click", function(t) {
                        Kr(e.series || e, "checkboxClick", {
                            checked: t.target.checked,
                            item: e
                        }, function() {
                            e.select()
                        })
                    })
                }
            }), Ur.legend.itemStyle.cursor = "pointer", Yr(Fr.prototype, {
                showResetZoom: function() {
                    function t() {
                        e.zoomOut()
                    }
                    var e = this,
                        i = Ur.lang,
                        n = e.options.chart.resetZoomButton,
                        o = n.theme,
                        r = o.states,
                        s = "chart" === n.relativeTo ? null : "plotBox";
                    Kr(this, "beforeShowResetZoom", null, function() {
                        e.resetZoomButton = e.renderer.button(i.resetZoom, null, null, t, o, r && r.hover).attr({
                            align: n.position.align,
                            title: i.resetZoomTitle
                        }).addClass("highcharts-reset-zoom").add().align(n.position, !1, s)
                    })
                },
                zoomOut: function() {
                    Kr(this, "selection", {
                        resetSelection: !0
                    }, this.zoom)
                },
                zoom: function(t) {
                    var i, e, n = this.pointer,
                        o = !1;
                    !t || t.resetSelection ? (Xr(this.axes, function(t) {
                        i = t.zoom()
                    }), n.initiated = !1) : Xr(t.xAxis.concat(t.yAxis), function(t) {
                        var e = t.axis;
                        n[e.isXAxis ? "zoomX" : "zoomY"] && (i = e.zoom(t.min, t.max), e.displayBtn && (o = !0))
                    }), e = this.resetZoomButton, o && !e ? this.showResetZoom() : !o && Zr(e) && (this.resetZoomButton = e.destroy()), i && this.redraw(es(this.options.chart.animation, t && t.animation, this.pointCount < 100))
                },
                pan: function(h, t) {
                    var c, u = this,
                        e = u.hoverPoints;
                    e && Xr(e, function(t) {
                        t.setState()
                    }), Xr("xy" === t ? [1, 0] : [1], function(t) {
                        var e, i = (t = u[t ? "xAxis" : "yAxis"][0]).horiz,
                            n = h[i ? "chartX" : "chartY"],
                            o = u[i = i ? "mouseDownX" : "mouseDownY"],
                            r = (t.pointRange || 0) / 2,
                            s = t.reversed && !u.inverted || !t.reversed && u.inverted ? -1 : 1,
                            a = t.getExtremes(),
                            l = t.toValue(o - n, !0) + r * s;
                        o = (e = (s = t.toValue(o + t.len - n, !0) - r * s) < l) ? s : l, l = e ? l : s, 0 < (e = (s = Math.min(a.dataMin, r ? a.min : t.toValue(t.toPixels(a.min) - t.minPixelPadding))) - o) && (l += e, o = s), 0 < (e = l - (r = Math.max(a.dataMax, r ? a.max : t.toValue(t.toPixels(a.max) + t.minPixelPadding)))) && (l = r, o -= e), t.series.length && o !== a.min && l !== a.max && (t.setExtremes(o, l, !1, !1, {
                            trigger: "pan"
                        }), c = !0), u[i] = n
                    }), c && u.redraw(!1), Gr(u.container, {
                        cursor: "move"
                    })
                }
            }), Yr(is.prototype, {
                select: function(t, e) {
                    var i = this,
                        n = i.series,
                        o = n.chart;
                    t = es(t, !i.selected), i.firePointEvent(t ? "select" : "unselect", {
                        accumulate: e
                    }, function() {
                        i.selected = i.options.selected = t, n.options.data[Qr(i, n.data)] = i.options, i.setState(t && "select"), e || Xr(o.getSelectedPoints(), function(t) {
                            t.selected && t !== i && (t.selected = t.options.selected = !1, n.options.data[Qr(t, n.data)] = t.options, t.setState(""), t.firePointEvent("unselect"))
                        })
                    })
                },
                onMouseOver: function(t) {
                    var e = this.series.chart,
                        i = e.pointer;
                    t = t ? i.normalize(t) : i.getChartCoordinatesFromPoint(this, e.inverted), i.runPointActions(t, this)
                },
                onMouseOut: function() {
                    var t = this.series.chart;
                    this.firePointEvent("mouseOut"), Xr(t.hoverPoints || [], function(t) {
                        t.setState()
                    }), t.hoverPoints = t.hoverPoint = null
                },
                importEvents: function() {
                    if (!this.hasImportedEvents) {
                        var i = this,
                            t = ts(i.series.options.point, i.options).events;
                        i.events = t, Br.objectEach(t, function(t, e) {
                            jr(i, e, t)
                        }), this.hasImportedEvents = !0
                    }
                },
                setState: function(t, e) {
                    var i, n = Math.floor(this.plotX),
                        o = this.plotY,
                        r = this.series,
                        s = r.options.states[t || "normal"] || {},
                        a = Vr[r.type].marker && r.options.marker,
                        l = a && !1 === a.enabled,
                        h = a && a.states && a.states[t || "normal"] || {},
                        c = !1 === h.enabled,
                        u = r.stateMarkerGraphic,
                        d = this.marker || {},
                        p = r.chart,
                        f = r.halo,
                        g = a && r.markerAttribs;
                    (t = t || "") === this.state && !e || this.selected && "select" !== t || !1 === s.enabled || t && (c || l && !1 === h.enabled) || t && d.states && d.states[t] && !1 === d.states[t].enabled || (g && (i = r.markerAttribs(this, t)), this.graphic ? (this.state && this.graphic.removeClass("highcharts-point-" + this.state), t && this.graphic.addClass("highcharts-point-" + t), this.graphic.animate(r.pointAttribs(this, t), es(p.options.chart.animation, s.animation)), i && this.graphic.animate(i, es(p.options.chart.animation, h.animation, a.animation)), u && u.hide()) : (t && h && (a = d.symbol || r.symbol, u && u.currentSymbol !== a && (u = u.destroy()), u ? u[e ? "animate" : "attr"]({
                        x: i.x,
                        y: i.y
                    }) : a && (r.stateMarkerGraphic = u = p.renderer.symbol(a, i.x, i.y, i.width, i.height).add(r.markerGroup), u.currentSymbol = a), u && u.attr(r.pointAttribs(this, t))), u && (u[t && p.isInsidePlot(n, o, p.inverted) ? "show" : "hide"](), u.element.point = this)), (n = s.halo) && n.size ? (f || (r.halo = f = p.renderer.path().add((this.graphic || u).parentGroup)), f.show()[e ? "animate" : "attr"]({
                        d: this.haloPath(n.size)
                    }), f.attr({
                        "class": "highcharts-halo highcharts-color-" + es(this.colorIndex, r.colorIndex) + (this.className ? " " + this.className : ""),
                        zIndex: -1
                    }), f.point = this, f.attr(Yr({
                        fill: this.color || r.color,
                        "fill-opacity": n.opacity
                    }, n.attributes))) : f && f.point && f.point.haloPath && f.animate({
                        d: f.point.haloPath(0)
                    }, null, f.hide), this.state = t, Kr(this, "afterSetState"))
                },
                haloPath: function(t) {
                    return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX) - t, this.plotY - t, 2 * t, 2 * t)
                }
            }), Yr(ns.prototype, {
                onMouseOver: function() {
                    var t = this.chart,
                        e = t.hoverSeries;
                    e && e !== this && e.onMouseOut(), this.options.events.mouseOver && Kr(this, "mouseOver"), this.setState("hover"), t.hoverSeries = this
                },
                onMouseOut: function() {
                    var t = this.options,
                        e = this.chart,
                        i = e.tooltip,
                        n = e.hoverPoint;
                    e.hoverSeries = null, n && n.onMouseOut(), this && t.events.mouseOut && Kr(this, "mouseOut"), !i || this.stickyTracking || i.shared && !this.noSharedTooltip || i.hide(), this.setState()
                },
                setState: function(e) {
                    var i = this,
                        t = i.options,
                        n = i.graph,
                        o = t.states,
                        r = t.lineWidth;
                    if (t = 0, e = e || "", i.state !== e && (Xr([i.group, i.markerGroup, i.dataLabelsGroup], function(t) {
                            t && (i.state && t.removeClass("highcharts-series-" + i.state), e && t.addClass("highcharts-series-" + e))
                        }), !o[i.state = e] || !1 !== o[e].enabled) && (e && (r = o[e].lineWidth || r + (o[e].lineWidthPlus || 0)), n && !n.dashstyle))
                        for (r = {
                                "stroke-width": r
                            }, n.animate(r, es(o[e || "normal"] && o[e || "normal"].animation, i.chart.options.chart.animation)); i["zone-graph-" + t];) i["zone-graph-" + t].attr(r), t += 1
                },
                setVisible: function(e, t) {
                    var i, n = this,
                        o = n.chart,
                        r = n.legendItem,
                        s = o.options.chart.ignoreHiddenSeries,
                        a = n.visible;
                    i = (n.visible = e = n.options.visible = n.userOptions.visible = void 0 === e ? !a : e) ? "show" : "hide", Xr(["group", "dataLabelsGroup", "markerGroup", "tracker", "tt"], function(t) {
                        n[t] && n[t][i]()
                    }), o.hoverSeries !== n && (o.hoverPoint && o.hoverPoint.series) !== n || n.onMouseOut(), r && o.legend.colorizeItem(n, e), n.isDirty = !0, n.options.stacking && Xr(o.series, function(t) {
                        t.options.stacking && t.visible && (t.isDirty = !0)
                    }), Xr(n.linkedSeries, function(t) {
                        t.setVisible(e, !1)
                    }), s && (o.isDirtyBox = !0), Kr(n, i), !1 !== t && o.redraw()
                },
                show: function() {
                    this.setVisible(!0)
                },
                hide: function() {
                    this.setVisible(!1)
                },
                select: function(t) {
                    this.selected = t = void 0 === t ? !this.selected : t, this.checkbox && (this.checkbox.checked = t), Kr(this, t ? "select" : "unselect")
                },
                drawTracker: Wr.drawTrackerGraph
            }), as = (ss = It).Chart, ls = ss.each, hs = ss.inArray, cs = ss.isArray, us = ss.isObject, ds = ss.pick, ps = ss.splat, as.prototype.setResponsive = function(e) {
                var t = this.options.responsive,
                    i = [],
                    n = this.currentResponsive;
                t && t.rules && ls(t.rules, function(t) {
                    void 0 === t._id && (t._id = ss.uniqueKey()), this.matchResponsiveRule(t, i, e)
                }, this);
                var o = ss.merge.apply(0, ss.map(i, function(e) {
                    return ss.find(t.rules, function(t) {
                        return t._id === e
                    }).chartOptions
                }));
                (i = i.toString() || void 0) !== (n && n.ruleIds) && (n && this.update(n.undoOptions, e), i ? (this.currentResponsive = {
                    ruleIds: i,
                    mergedOptions: o,
                    undoOptions: this.currentOptions(o)
                }, this.update(o, e)) : this.currentResponsive = void 0)
            }, as.prototype.matchResponsiveRule = function(t, e) {
                var i = t.condition;
                (i.callback || function() {
                    return this.chartWidth <= ds(i.maxWidth, Number.MAX_VALUE) && this.chartHeight <= ds(i.maxHeight, Number.MAX_VALUE) && this.chartWidth >= ds(i.minWidth, 0) && this.chartHeight >= ds(i.minHeight, 0)
                }).call(this) && e.push(t._id)
            }, as.prototype.currentOptions = function(t) {
                function s(t, i, n, o) {
                    var r;
                    ss.objectEach(t, function(t, e) {
                        if (!o && -1 < hs(e, ["series", "xAxis", "yAxis"]))
                            for (t = ps(t), n[e] = [], r = 0; r < t.length; r++) i[e][r] && (n[e][r] = {}, s(t[r], i[e][r], n[e][r], o + 1));
                        else us(t) ? (n[e] = cs(t) ? [] : {}, s(t, i[e] || {}, n[e], o + 1)) : n[e] = i[e] || null
                    })
                }
                var e = {};
                return s(t, this.options, e, 0), e
            }, It
    }),
    function(t, e) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.Chartkick = e()
    }(this, function() {
        "use strict";

        function s(t) {
            return "[object Array]" === Object.prototype.toString.call(t)
        }

        function a(t) {
            return t instanceof Function
        }

        function n(t) {
            return !a(t) && t instanceof Object
        }

        function o(t, e) {
            var i;
            for (i in e) n(e[i]) || s(e[i]) ? (n(e[i]) && !n(t[i]) && (t[i] = {}), s(e[i]) && !s(t[i]) && (t[i] = []), o(t[i], e[i])) : e[i] !== undefined && (t[i] = e[i])
        }

        function F(t, e) {
            var i = {};
            return o(i, t), o(i, e), i
        }

        function r(t) {
            var e, i, n, o, r, s, a, l, h, c, u;
            return "[object Date]" === (c = Object.prototype.toString.call(t)) ? t : "[object String]" === c && (n = t.match(j)) ? (u = parseInt(n[1], 10), s = parseInt(n[3], 10) - 1, e = parseInt(n[5], 10), i = parseInt(n[7], 10), r = n[9] ? parseInt(n[9], 10) : 0, h = n[11] ? parseInt(n[11], 10) : 0, o = n[12] ? 1e3 * parseFloat(Z + n[12].slice(1)) : 0, l = Date.UTC(u, s, e, i, r, h, o), n[13] && n[14] && (a = 60 * n[15], n[17] && (a += parseInt(n[17], 10)), l -= 60 * (a *= "-" === n[14] ? -1 : 1) * 1e3), new Date(l)) : void 0
        }

        function p(t) {
            var e, i, n;
            for (e = 0; e < t.length; e++)
                for (n = t[e].data, i = 0; i < n.length; i++)
                    if (n[i][1] < 0) return !0;
            return !1
        }

        function f(t) {
            return "" + t
        }

        function q(t) {
            return parseFloat(t)
        }

        function l(t) {
            var e, i, n, o;
            if ("object" != typeof t)
                if ("number" == typeof t) t = new Date(1e3 * t);
                else {
                    if (e = (t = f(t)).match(W)) return i = parseInt(e[1], 10), n = parseInt(e[3], 10) - 1, o = parseInt(e[5], 10), new Date(i, n, o);
                    t = r(t.replace(/ /, "T").replace(" ", "").replace("UTC", "Z")) || new Date(t)
                }
            return t
        }

        function h(t) {
            if (!s(t)) {
                var e, i = [];
                for (e in t) t.hasOwnProperty(e) && i.push([e, t[e]]);
                t = i
            }
            return t
        }

        function c(r, s, a, l, h, c, u, d) {
            return function(t, e, i) {
                var n = t.data,
                    o = F({}, r);
                return o = F(o, i || {}), (t.hideLegend || "legend" in e) && s(o, e.legend, t.hideLegend), e.title && a(o, e.title), "min" in e ? l(o, e.min) : p(n) || l(o, 0), e.max && h(o, e.max), "stacked" in e && c(o, e.stacked), e.colors && (o.colors = e.colors), e.xtitle && u(o, e.xtitle), e.ytitle && d(o, e.ytitle), o = F(o, e.library || {})
            }
        }

        function g(t, e) {
            return t[0].getTime() - e[0].getTime()
        }

        function m(t, e) {
            return t[0] - e[0]
        }

        function G(t, e) {
            return t - e
        }

        function U(t) {
            return 0 === t.getMilliseconds() && 0 === t.getSeconds()
        }

        function V(t) {
            return U(t) && 0 === t.getMinutes()
        }

        function X(t) {
            return V(t) && 0 === t.getHours()
        }

        function Y(t, e) {
            return X(t) && t.getDay() === e
        }

        function K(t) {
            return X(t) && 1 === t.getDate()
        }

        function $(t) {
            return K(t) && 0 === t.getMonth()
        }

        function i(t) {
            return !isNaN(l(t)) && 6 <= f(t).length
        }

        function u(t) {
            return "number" == typeof t
        }

        function d(t, e, i) {
            if (t = t || "", i.prefix && (e < 0 && (e *= -1, t += "-"), t += i.prefix), i.thousands || i.decimal) {
                var n = (e = f(e)).split(".");
                e = n[0], i.thousands && (e = e.replace(/\B(?=(\d{3})+(?!\d))/g, i.thousands)), 1 < n.length && (e += (i.decimal || ".") + n[1])
            }
            return t + e + (i.suffix || "")
        }

        function Q(t, e, i) {
            return i in e ? e[i] : i in t.options ? t.options[i] : null
        }

        function v(t) {
            var e, i, n;
            for (e = 0; e < t.length; e++)
                for (n = t[e].data, i = 0; i < n.length; i++)
                    if (0 != n[i][1]) return !1;
            return !0
        }

        function y(t, e, i) {
            Rt.push([t, e, i]), b()
        }

        function b() {
            if (Ht < zt) {
                var t = Rt.shift();
                t && (Ht++, e(t[0], t[1], t[2]), b())
            }
        }

        function x() {
            Ht--, b()
        }

        function e(t, e, o) {
            w(t, e, function(t, e, i) {
                var n = "string" == typeof i ? i : i.message;
                o(n)
            })
        }

        function w(t, e, i) {
            var n = window.jQuery || window.Zepto || window.$;
            if (n) n.ajax({
                dataType: "json",
                url: t,
                success: e,
                error: i,
                complete: x
            });
            else {
                var o = new XMLHttpRequest;
                o.open("GET", t, !0), o.setRequestHeader("Content-Type", "application/json"), o.onload = function() {
                    x(), 200 === o.status ? e(JSON.parse(o.responseText), o.statusText, o) : i(o, "error", o.statusText)
                }, o.send()
            }
        }

        function T(t, e) {
            document.body.innerText ? t.innerText = e : t.textContent = e
        }

        function C(t, e) {
            T(t, "Error Loading Chart: " + e), t.style.color = "#ff0000"
        }

        function S(t) {
            try {
                t.__render()
            } catch (e) {
                throw C(t.element, e.message), e
            }
        }

        function E(e, t) {
            "string" == typeof t ? y(t, function(t) {
                e.rawData = t, S(e)
            }, function(t) {
                C(e.element, t)
            }) : (e.rawData = t, S(e))
        }

        function A(i) {
            var n = i.element,
                o = document.createElement("a"),
                r = i.options.download;
            !0 === r ? r = {} : "string" == typeof r && (r = {
                filename: r
            }), o.download = r.filename || "chart.png", o.style.position = "absolute", o.style.top = "20px", o.style.right = "20px", o.style.zIndex = 1e3, o.style.lineHeight = "20px", o.target = "_blank";
            var t = document.createElement("img");
            t.alt = "Download", t.style.border = "none", t.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAABCFBMVEUAAADMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMywEsqxAAAAV3RSTlMAAQIDBggJCgsMDQ4PERQaHB0eISIjJCouLzE0OTo/QUJHSUpLTU5PUllhYmltcHh5foWLjI+SlaCio6atr7S1t7m6vsHHyM7R2tze5Obo7fHz9ff5+/1hlxK2AAAA30lEQVQYGUXBhVYCQQBA0TdYWAt2d3d3YWAHyur7/z9xgD16Lw0DW+XKx+1GgX+FRzM3HWQWrHl5N/oapW5RPe0PkBu+UYeICvozTWZVK23Ao04B79oJrOsJDOoxkZoQPWgX29pHpCZEk7rEvQYiNSFq1UMqvlCjJkRBS1R8hb00Vb/TajtBL7nTHE1X1vyMQF732dQhyF2o6SAwrzP06iUQzvwsArlnzcOdrgBhJyHa1QOgO9U1GsKuvjUTjavliZYQ8nNPapG6sap/3nrIdJ6bOWzmX/fy0XVpfzZP3S8OJT3g9EEiJwAAAABJRU5ErkJggg==", o.appendChild(t), n.style.position = "relative", i.__downloadAttached = !0, i.__enterEvent = k(n, "mouseover", function(t) {
                var e = t.relatedTarget;
                e && (e === this || _(this, e)) || !i.options.download || (o.href = i.toImage(r), n.appendChild(o))
            }), i.__leaveEvent = k(n, "mouseout", function(t) {
                var e = t.relatedTarget;
                e && (e === this || _(this, e)) || o.parentNode && o.parentNode.removeChild(o)
            })
        }

        function k(t, e, i) {
            if (t.addEventListener) return t.addEventListener(e, i, !1), i;
            var n = function() {
                return i.call(t, window.event)
            };
            return t.attachEvent("on" + e, n), n
        }

        function t(t, e, i) {
            t.removeEventListener ? t.removeEventListener(e, i, !1) : t.detachEvent("on" + e, i)
        }

        function _(t, e) {
            if (t === e) return !1;
            for (; e && e !== t;) e = e.parentNode;
            return e === t
        }

        function M(t) {
            if (t) {
                if ("Highcharts" === t.product) return Tt;
                if (t.charts) return Nt;
                if (a(t)) return mt
            }
            throw new Error("Unknown adapter")
        }

        function O(t) {
            var e = new(M(t))(t); - 1 === Wt.indexOf(e) && Wt.push(e)
        }

        function L() {
            "Chart" in window && O(window.Chart), "Highcharts" in window && O(window.Highcharts), window.google && window.google.charts && O(window.google)
        }

        function D(t, e) {
            if ("PieChart" === e || "GeoChart" === e || "Timeline" === e) return 0 === t.length;
            for (var i = 0; i < t.length; i++)
                if (0 < t[i].data.length) return !1;
            return !0
        }

        function I(t, e) {
            e.options.messages && e.options.messages.empty && D(e.data, t) ? T(e.element, e.options.messages.empty) : (P(t, e), e.options.download && !e.__downloadAttached && "chartjs" === e.adapter && A(e))
        }

        function P(t, e) {
            var i, n, o, r;
            for (o = "render" + t, r = e.options.adapter, L(), i = 0; i < Wt.length; i++)
                if (n = Wt[i], (!r || r === n.name) && a(n[o])) return e.adapter = n.name, (e.__adapterObject = n)[o](e);
            throw 0 < Wt.length ? new Error("No charting library found for " + t) : new Error("No charting libraries found - be sure to include one before your charts")
        }

        function N(t, e) {
            return R(t, u) ? "number" : !e && R(t, i) ? "datetime" : "string"
        }

        function R(t, e) {
            var i, n, o;
            for (i = 0; i < t.length; i++)
                for (o = h(t[i].data), n = 0; n < o.length; n++)
                    if (!e(o[n][0])) return !1;
            return !0
        }

        function H(t) {
            var e, i, n = [];
            for (e = 0; e < t.length; e++) {
                var o = {};
                for (i in t[e]) t[e].hasOwnProperty(i) && (o[i] = t[e][i]);
                n.push(o)
            }
            return n
        }

        function z(t, e, i) {
            var n, o = t.options,
                r = t.rawData;
            for (!s(r) || "object" != typeof r[0] || s(r[0]) ? (r = [{
                    name: o.label,
                    data: r
                }], t.hideLegend = !0) : t.hideLegend = !1, t.xtype = e || (o.discrete ? "string" : N(r, i)), r = H(r), n = 0; n < r.length; n++) r[n].data = Ft(h(r[n].data), t.xtype);
            return r
        }

        function B(t) {
            var e, i = h(t.rawData);
            for (e = 0; e < i.length; e++) i[e] = [f(i[e][0]), q(i[e][1])];
            return i
        }
        var W = /^(\d\d\d\d)(-)?(\d\d)(-)?(\d\d)$/i,
            j = /(\d\d\d\d)(-)?(\d\d)(-)?(\d\d)(T)?(\d\d)(:)?(\d\d)?(:)?(\d\d)?([.,]\d+)?($|Z|([+-])(\d\d)(:)?(\d\d)?)/i,
            Z = String(1.5).charAt(1),
            J = {
                maintainAspectRatio: !1,
                animation: !1,
                tooltips: {
                    displayColors: !1,
                    callbacks: {}
                },
                legend: {},
                title: {
                    fontSize: 20,
                    fontColor: "#333"
                }
            },
            tt = {
                scales: {
                    yAxes: [{
                        ticks: {
                            maxTicksLimit: 4
                        },
                        scaleLabel: {
                            fontSize: 16,
                            fontColor: "#333"
                        }
                    }],
                    xAxes: [{
                        gridLines: {
                            drawOnChartArea: !1
                        },
                        scaleLabel: {
                            fontSize: 16,
                            fontColor: "#333"
                        },
                        time: {},
                        ticks: {}
                    }]
                }
            },
            et = ["#3366CC", "#DC3912", "#FF9900", "#109618", "#990099", "#3B3EAC", "#0099C6", "#DD4477", "#66AA00", "#B82E2E", "#316395", "#994499", "#22AA99", "#AAAA11", "#6633CC", "#E67300", "#8B0707", "#329262", "#5574A6", "#651067"],
            it = function(t, e, i) {
                e !== undefined ? (t.legend.display = !!e, e && !0 !== e && (t.legend.position = e)) : i && (t.legend.display = !1)
            },
            nt = function(t, e) {
                t.title.display = !0, t.title.text = e
            },
            ot = function(t, e) {
                null !== e && (t.scales.yAxes[0].ticks.min = q(e))
            },
            rt = function(t, e) {
                t.scales.yAxes[0].ticks.max = q(e)
            },
            st = function(t, e) {
                null !== e && (t.scales.xAxes[0].ticks.min = q(e))
            },
            at = function(t, e) {
                t.scales.xAxes[0].ticks.max = q(e)
            },
            lt = function(t, e) {
                t.scales.xAxes[0].stacked = !!e, t.scales.yAxes[0].stacked = !!e
            },
            ht = function(t, e) {
                t.scales.xAxes[0].scaleLabel.display = !0, t.scales.xAxes[0].scaleLabel.labelString = e
            },
            ct = function(t, e) {
                t.scales.yAxes[0].scaleLabel.display = !0, t.scales.yAxes[0].scaleLabel.labelString = e
            },
            ut = function(t, e) {
                var i = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);
                return i ? "rgba(" + parseInt(i[1], 16) + ", " + parseInt(i[2], 16) + ", " + parseInt(i[3], 16) + ", " + e + ")" : t
            },
            dt = function(t, e, i) {
                var n = Math.ceil(t.element.offsetWidth / 4 / e.labels.length);
                25 < n ? n = 25 : n < 10 && (n = 10), i.scales.xAxes[0].ticks.callback || (i.scales.xAxes[0].ticks.callback = function(t) {
                    return (t = f(t)).length > n ? t.substring(0, n - 2) + "..." : t
                })
            },
            pt = function(t, e, i) {
                var o = {
                    prefix: t.options.prefix,
                    suffix: t.options.suffix,
                    thousands: t.options.thousands,
                    decimal: t.options.decimal
                };
                if ("pie" !== i) {
                    var n = e.scales.yAxes;
                    "bar" === i && (n = e.scales.xAxes), n[0].ticks.callback || (n[0].ticks.callback = function(t) {
                        return d("", t, o)
                    })
                }
                if (!e.tooltips.callbacks.label)
                    if ("scatter" === i) e.tooltips.callbacks.label = function(t, e) {
                        var i = e.datasets[t.datasetIndex].label || "";
                        return i && (i += ": "), i + "(" + t.xLabel + ", " + t.yLabel + ")"
                    };
                    else if ("bubble" === i) e.tooltips.callbacks.label = function(t, e) {
                    var i = e.datasets[t.datasetIndex].label || "";
                    i && (i += ": ");
                    var n = e.datasets[t.datasetIndex].data[t.index];
                    return i + "(" + t.xLabel + ", " + t.yLabel + ", " + n.v + ")"
                };
                else if ("pie" === i) e.tooltips.callbacks.label = function(t, e) {
                    var i = e.labels[t.index],
                        n = ": ";
                    return s(i) ? (i = i.slice())[0] += n : i += n, d(i, e.datasets[t.datasetIndex].data[t.index], o)
                };
                else {
                    var r = "bar" === i ? "xLabel" : "yLabel";
                    e.tooltips.callbacks.label = function(t, e) {
                        var i = e.datasets[t.datasetIndex].label || "";
                        return i && (i += ": "), d(i, t[r], o)
                    }
                }
            },
            ft = c(F(J, tt), it, nt, ot, rt, lt, ht, ct),
            gt = function(t, e, i) {
                var n, o = [],
                    r = [],
                    s = t.options.colors || et,
                    a = !0,
                    l = !0,
                    h = !0,
                    c = !0,
                    u = !0,
                    d = !0,
                    p = t.data,
                    f = 0;
                if ("bubble" === i)
                    for (var g = 0; g < p.length; g++)
                        for (var m = p[g], v = 0; v < m.data.length; v++) m.data[v][2] > f && (f = m.data[v][2]);
                var y, b, x, w, T, C = [],
                    S = [];
                if ("bar" === i || "column" === i || "number" !== t.xtype && "bubble" !== t.xtype) {
                    var E, A, k = [];
                    for (y = 0; y < p.length; y++)
                        for (x = p[y], b = 0; b < x.data.length; b++) w = x.data[b], C[T = "datetime" == t.xtype ? w[0].getTime() : w[0]] || (C[T] = new Array(p.length)), C[T][y] = q(w[1]), -1 === k.indexOf(T) && k.push(T);
                    for ("datetime" !== t.xtype && "number" !== t.xtype || k.sort(G), b = 0; b < p.length; b++) S.push([]);
                    for (A = 0; A < k.length; A++)
                        for (y = k[A], "datetime" === t.xtype ? (E = new Date(q(y)), a = a && X(E), n || (n = E.getDay()), l = l && Y(E, n), h = h && K(E), c = c && $(E), u = u && V(E), d = d && U(E)) : E = y, r.push(E), b = 0; b < p.length; b++) S[b].push(C[y][b] === undefined ? null : C[y][b])
                } else
                    for (var _ = 0; _ < p.length; _++) {
                        for (var M = p[_], O = [], L = 0; L < M.data.length; L++) {
                            var D = {
                                x: q(M.data[L][0]),
                                y: q(M.data[L][1])
                            };
                            "bubble" === i && (D.r = 20 * q(M.data[L][2]) / f, D.v = M.data[L][2]), O.push(D)
                        }
                        S.push(O)
                    }
                for (y = 0; y < p.length; y++) {
                    var I = (x = p[y]).color || s[y],
                        P = "line" !== i ? ut(I, .5) : I,
                        N = {
                            label: x.name || "",
                            data: S[y],
                            fill: "area" === i,
                            borderColor: I,
                            backgroundColor: P,
                            pointBackgroundColor: I,
                            borderWidth: 2,
                            pointHoverBackgroundColor: I
                        };
                    x.stack && (N.stack = x.stack), !1 === Q(t, x, "curve") && (N.lineTension = 0), !1 === Q(t, x, "points") && (N.pointRadius = 0, N.pointHitRadius = 5), N = F(N = F(N = F(N, t.options.dataset || {}), x.library || {}), x.dataset || {}), o.push(N)
                }
                if ("datetime" === t.xtype && 0 < r.length) {
                    var R = r[0].getTime(),
                        H = r[0].getTime();
                    for (y = 1; y < r.length; y++) {
                        var z = r[y].getTime();
                        z < R && (R = z), H < z && (H = z)
                    }
                    var B, W = (H - R) / 864e5;
                    if (!e.scales.xAxes[0].time.unit)
                        if (c || 3650 < W ? (e.scales.xAxes[0].time.unit = "year", B = 365) : h || 300 < W ? (e.scales.xAxes[0].time.unit = "month", B = 30) : a || 10 < W ? (e.scales.xAxes[0].time.unit = "day", B = 1) : u || .5 < W ? (e.scales.xAxes[0].time.displayFormats = {
                                hour: "MMM D, h a"
                            }, e.scales.xAxes[0].time.unit = "hour", B = 1 / 24) : d && (e.scales.xAxes[0].time.displayFormats = {
                                minute: "h:mm a"
                            }, e.scales.xAxes[0].time.unit = "minute", B = 1 / 24 / 60), B && 0 < W) {
                            var j = Math.ceil(W / B / (t.element.offsetWidth / 100));
                            l && 1 === B && (j = 7 * Math.ceil(j / 7)), e.scales.xAxes[0].time.unitStepSize = j
                        }
                    e.scales.xAxes[0].time.tooltipFormat || (a ? e.scales.xAxes[0].time.tooltipFormat = "ll" : u ? e.scales.xAxes[0].time.tooltipFormat = "MMM D, h a" : d && (e.scales.xAxes[0].time.tooltipFormat = "h:mm a"))
                }
                return {
                    labels: r,
                    datasets: o
                }
            },
            mt = function mt(t) {
                this.name = "chartjs", this.library = t
            };
        mt.prototype.renderLineChart = function Ut(t, e) {
            var i = {};
            !t.options.max && v(t.data) && (i.max = 1);
            var n = ft(t, F(i, t.options));
            pt(t, n, e);
            var o = gt(t, n, e || "line");
            "number" === t.xtype ? (n.scales.xAxes[0].type = "linear", n.scales.xAxes[0].position = "bottom") : n.scales.xAxes[0].type = "string" === t.xtype ? "category" : "time", this.drawChart(t, "line", o, n)
        }, mt.prototype.renderPieChart = function Vt(t) {
            var e = F({}, J);
            t.options.donut && (e.cutoutPercentage = 50), "legend" in t.options && it(e, t.options.legend), t.options.title && nt(e, t.options.title), e = F(e, t.options.library || {}), pt(t, e, "pie");
            for (var i = [], n = [], o = 0; o < t.data.length; o++) {
                var r = t.data[o];
                i.push(r[0]), n.push(r[1])
            }
            var s = {
                    data: n,
                    backgroundColor: t.options.colors || et
                },
                a = {
                    labels: i,
                    datasets: [s = F(s, t.options.dataset || {})]
                };
            this.drawChart(t, "pie", a, e)
        }, mt.prototype.renderColumnChart = function Xt(t, e) {
            var i;
            i = "bar" === e ? c(F(J, tt), it, nt, st, at, lt, ht, ct)(t, t.options) : ft(t, t.options), pt(t, i, e);
            var n = gt(t, i, "column");
            "bar" !== e && dt(t, n, i), this.drawChart(t, "bar" === e ? "horizontalBar" : "bar", n, i)
        }, mt.prototype.renderAreaChart = function Yt(t) {
            this.renderLineChart(t, "area")
        }, mt.prototype.renderBarChart = function Kt(t) {
            this.renderColumnChart(t, "bar")
        }, mt.prototype.renderScatterChart = function $t(t, e) {
            e = e || "scatter";
            var i = ft(t, t.options);
            pt(t, i, e), "showLines" in i || (i.showLines = !1);
            var n = gt(t, i, e);
            i.scales.xAxes[0].type = "linear", i.scales.xAxes[0].position = "bottom", this.drawChart(t, e, n, i)
        }, mt.prototype.renderBubbleChart = function Qt(t) {
            this.renderScatterChart(t, "bubble")
        }, mt.prototype.destroy = function Zt(t) {
            t.chart && t.chart.destroy()
        };
        var vt = {
                chart: {},
                xAxis: {
                    title: {
                        text: null
                    },
                    labels: {
                        style: {
                            fontSize: "12px"
                        }
                    }
                },
                yAxis: {
                    title: {
                        text: null
                    },
                    labels: {
                        style: {
                            fontSize: "12px"
                        }
                    }
                },
                title: {
                    text: null
                },
                credits: {
                    enabled: !(mt.prototype.drawChart = function Jt(t, e, i, n) {
                        this.destroy(t);
                        var o = {
                            type: e,
                            data: i,
                            options: n
                        };
                        t.options.code && window.console.log("new Chart(ctx, " + JSON.stringify(o) + ");"), t.element.innerHTML = "<canvas></canvas>";
                        var r = t.element.getElementsByTagName("CANVAS")[0];
                        t.chart = new this.library(r, o)
                    })
                },
                legend: {
                    borderWidth: 0
                },
                tooltip: {
                    style: {
                        fontSize: "12px"
                    }
                },
                plotOptions: {
                    areaspline: {},
                    series: {
                        marker: {}
                    }
                }
            },
            yt = function(t, e, i) {
                e !== undefined ? (t.legend.enabled = !!e, e && !0 !== e && ("top" === e || "bottom" === e ? t.legend.verticalAlign = e : (t.legend.layout = "vertical", t.legend.verticalAlign = "middle", t.legend.align = e))) : i && (t.legend.enabled = !1)
            },
            bt = function(t, e) {
                t.title.text = e
            },
            xt = c(vt, yt, bt, function(t, e) {
                t.yAxis.min = e
            }, function(t, e) {
                t.yAxis.max = e
            }, function(t, e) {
                t.plotOptions.series.stacking = e ? !0 === e ? "normal" : e : null
            }, function(t, e) {
                t.xAxis.title.text = e
            }, function(t, e) {
                t.yAxis.title.text = e
            }),
            wt = function(t, e, i) {
                var n = {
                    prefix: t.options.prefix,
                    suffix: t.options.suffix,
                    thousands: t.options.thousands,
                    decimal: t.options.decimal
                };
                "pie" === i || e.yAxis.labels.formatter || (e.yAxis.labels.formatter = function() {
                    return d("", this.value, n)
                }), e.tooltip.pointFormatter || (e.tooltip.pointFormatter = function() {
                    return '<span style="color:' + this.color + ">\u25cf</span> " + d(this.series.name + ": <b>", this.y, n) + "</b><br/>"
                })
            },
            Tt = function mt(t) {
                this.name = "highcharts", this.library = t
            };
        Tt.prototype.renderLineChart = function Ut(t, e) {
            var i = {};
            "areaspline" === (e = e || "spline") && (i = {
                plotOptions: {
                    areaspline: {
                        stacking: "normal"
                    },
                    area: {
                        stacking: "normal"
                    },
                    series: {
                        marker: {
                            enabled: !1
                        }
                    }
                }
            }), !1 === t.options.curve && ("areaspline" === e ? e = "area" : "spline" === e && (e = "line"));
            var n, o, r, s = xt(t, t.options, i);
            s.xAxis.type = "string" === t.xtype ? "category" : "number" === t.xtype ? "linear" : "datetime", s.chart.type || (s.chart.type = e), wt(t, s, e);
            var a = t.data;
            for (o = 0; o < a.length; o++) {
                if (a[o].name = a[o].name || "Value", n = a[o].data, "datetime" === t.xtype)
                    for (r = 0; r < n.length; r++) n[r][0] = n[r][0].getTime();
                !(a[o].marker = {
                    symbol: "circle"
                }) === t.options.points && (a[o].marker.enabled = !1)
            }
            this.drawChart(t, a, s)
        }, Tt.prototype.renderScatterChart = function $t(t) {
            var e = xt(t, t.options, {});
            e.chart.type = "scatter", this.drawChart(t, t.data, e)
        }, Tt.prototype.renderPieChart = function Vt(t) {
            var e = F(vt, {});
            t.options.colors && (e.colors = t.options.colors), t.options.donut && (e.plotOptions = {
                pie: {
                    innerSize: "50%"
                }
            }), "legend" in t.options && yt(e, t.options.legend), t.options.title && bt(e, t.options.title);
            var i = F(e, t.options.library || {});
            wt(t, i, "pie");
            var n = [{
                type: "pie",
                name: t.options.label || "Value",
                data: t.data
            }];
            this.drawChart(t, n, i)
        }, Tt.prototype.renderColumnChart = function Xt(t, e) {
            e = e || "column";
            var i, n, o, r, s = t.data,
                a = xt(t, t.options),
                l = [],
                h = [];
            for (a.chart.type = e, wt(t, a, e), i = 0; i < s.length; i++)
                for (o = s[i], n = 0; n < o.data.length; n++) l[(r = o.data[n])[0]] || (l[r[0]] = new Array(s.length), h.push(r[0])), l[r[0]][i] = r[1];
            "number" === t.xtype && h.sort(G), a.xAxis.categories = h;
            var c, u = [];
            for (i = 0; i < s.length; i++) {
                for (r = [], n = 0; n < h.length; n++) r.push(l[h[n]][i] || 0);
                c = {
                    name: s[i].name || "Value",
                    data: r
                }, s[i].stack && (c.stack = s[i].stack), u.push(c)
            }
            this.drawChart(t, u, a)
        }, Tt.prototype.renderBarChart = function Kt(t) {
            this.renderColumnChart(t, "bar")
        }, Tt.prototype.renderAreaChart = function Yt(t) {
            this.renderLineChart(t, "areaspline")
        }, Tt.prototype.destroy = function Zt(t) {
            t.chart && t.chart.destroy()
        }, Tt.prototype.drawChart = function Jt(t, e, i) {
            this.destroy(t), i.chart.renderTo = t.element.id, i.series = e, t.options.code && window.console.log("new Highcharts.Chart(" + JSON.stringify(i) + ");"), t.chart = new this.library.Chart(i)
        };
        var Ct = {},
            St = [],
            Et = {
                chartArea: {},
                fontName: "'Lucida Grande', 'Lucida Sans Unicode', Verdana, Arial, Helvetica, sans-serif",
                pointSize: 6,
                legend: {
                    textStyle: {
                        fontSize: 12,
                        color: "#444"
                    },
                    alignment: "center",
                    position: "right"
                },
                curveType: "function",
                hAxis: {
                    textStyle: {
                        color: "#666",
                        fontSize: 12
                    },
                    titleTextStyle: {},
                    gridlines: {
                        color: "transparent"
                    },
                    baselineColor: "#ccc",
                    viewWindow: {}
                },
                vAxis: {
                    textStyle: {
                        color: "#666",
                        fontSize: 12
                    },
                    titleTextStyle: {},
                    baselineColor: "#ccc",
                    viewWindow: {}
                },
                tooltip: {
                    textStyle: {
                        color: "#666",
                        fontSize: 12
                    }
                }
            },
            At = function(t, e, i) {
                var n;
                e !== undefined ? (n = e ? !0 === e ? "right" : e : "none", t.legend.position = n) : i && (t.legend.position = "none")
            },
            kt = function(t, e) {
                t.title = e, t.titleTextStyle = {
                    color: "#333",
                    fontSize: "20px"
                }
            },
            _t = function(t, e) {
                t.hAxis.viewWindow.min = e
            },
            Mt = function(t, e) {
                t.hAxis.viewWindow.max = e
            },
            Ot = function(t, e) {
                t.isStacked = e || !1
            },
            Lt = function(t, e) {
                t.hAxis.title = e, t.hAxis.titleTextStyle.italic = !1
            },
            Dt = function(t, e) {
                t.vAxis.title = e, t.vAxis.titleTextStyle.italic = !1
            },
            It = c(Et, At, kt, function(t, e) {
                t.vAxis.viewWindow.min = e
            }, function(t, e) {
                t.vAxis.viewWindow.max = e
            }, Ot, Lt, Dt),
            Pt = function(t) {
                window.attachEvent ? window.attachEvent("onresize", t) : window.addEventListener && window.addEventListener("resize", t, !0), t()
            },
            Nt = function mt(t) {
                this.name = "google", this.library = t
            };
        Nt.prototype.renderLineChart = function Ut(n) {
            var o = this;
            this.waitForLoaded(n, function() {
                var t = {};
                !1 === n.options.curve && (t.curveType = "none"), !1 === n.options.points && (t.pointSize = 0);
                var e = It(n, n.options, t),
                    i = o.createDataTable(n.data, n.xtype);
                o.drawChart(n, "LineChart", i, e)
            })
        }, Nt.prototype.renderPieChart = function Vt(n) {
            var o = this;
            this.waitForLoaded(n, function() {
                var t = {
                    chartArea: {
                        top: "10%",
                        height: "80%"
                    },
                    legend: {}
                };
                n.options.colors && (t.colors = n.options.colors), n.options.donut && (t.pieHole = .5), "legend" in n.options && At(t, n.options.legend), n.options.title && kt(t, n.options.title);
                var e = F(F(Et, t), n.options.library || {}),
                    i = new o.library.visualization.DataTable;
                i.addColumn("string", ""), i.addColumn("number", "Value"), i.addRows(n.data), o.drawChart(n, "PieChart", i, e)
            })
        }, Nt.prototype.renderColumnChart = function Xt(i) {
            var n = this;
            this.waitForLoaded(i, function() {
                var t = It(i, i.options),
                    e = n.createDataTable(i.data, i.xtype);
                n.drawChart(i, "ColumnChart", e, t)
            })
        }, Nt.prototype.renderBarChart = function Kt(n) {
            var o = this;
            this.waitForLoaded(n, function() {
                var t = {
                        hAxis: {
                            gridlines: {
                                color: "#ccc"
                            }
                        }
                    },
                    e = c(Et, At, kt, _t, Mt, Ot, Lt, Dt)(n, n.options, t),
                    i = o.createDataTable(n.data, n.xtype);
                o.drawChart(n, "BarChart", i, e)
            })
        }, Nt.prototype.renderAreaChart = function Yt(n) {
            var o = this;
            this.waitForLoaded(n, function() {
                var t = {
                        isStacked: !0,
                        pointSize: 0,
                        areaOpacity: .5
                    },
                    e = It(n, n.options, t),
                    i = o.createDataTable(n.data, n.xtype);
                o.drawChart(n, "AreaChart", i, e)
            })
        }, Nt.prototype.renderGeoChart = function te(n) {
            var o = this;
            this.waitForLoaded(n, function() {
                var t = {
                        legend: "none",
                        colorAxis: {
                            colors: n.options.colors || ["#f6c7b6", "#ce502d"]
                        }
                    },
                    e = F(F(Et, t), n.options.library || {}),
                    i = new o.library.visualization.DataTable;
                i.addColumn("string", ""), i.addColumn("number", n.options.label || "Value"), i.addRows(n.data), o.drawChart(n, "GeoChart", i, e)
            })
        }, Nt.prototype.renderScatterChart = function $t(h) {
            var c = this;
            this.waitForLoaded(h, function() {
                var t, e, i, n, o = {},
                    r = It(h, h.options, o),
                    s = h.data,
                    a = [];
                for (t = 0; t < s.length; t++)
                    for (s[t].name = s[t].name || "Value", n = s[t].data, e = 0; e < n.length; e++) {
                        var l = new Array(s.length + 1);
                        l[0] = n[e][0], l[t + 1] = n[e][1], a.push(l)
                    }
                for ((i = new c.library.visualization.DataTable).addColumn("number", ""), t = 0; t < s.length; t++) i.addColumn("number", s[t].name);
                i.addRows(a), c.drawChart(h, "ScatterChart", i, r)
            })
        }, Nt.prototype.renderTimeline = function ee(n) {
            var o = this;
            this.waitForLoaded(n, "timeline", function() {
                var t = {
                    legend: "none"
                };
                n.options.colors && (t.colors = n.options.colors);
                var e = F(F(Et, t), n.options.library || {}),
                    i = new o.library.visualization.DataTable;
                i.addColumn({
                    type: "string",
                    id: "Name"
                }), i.addColumn({
                    type: "date",
                    id: "Start"
                }), i.addColumn({
                    type: "date",
                    id: "End"
                }), i.addRows(n.data), n.element.style.lineHeight = "normal", o.drawChart(n, "Timeline", i, e)
            })
        }, Nt.prototype.destroy = function Zt(t) {
            t.chart && t.chart.clearChart()
        }, Nt.prototype.drawChart = function Jt(t, e, i, n) {
            this.destroy(t), t.options.code && window.console.log("var data = new google.visualization.DataTable(" + i.toJSON() + ");\nvar chart = new google.visualization." + e + "(element);\nchart.draw(data, " + JSON.stringify(n) + ");"), t.chart = new this.library.visualization[e](t.element), Pt(function() {
                t.chart.draw(i, n)
            })
        }, Nt.prototype.waitForLoaded = function ie(t, e, i) {
            var n = this;
            if (i || (i = e, e = "corechart"), St.push({
                    pack: e,
                    callback: i
                }), Ct[e]) this.runCallbacks();
            else {
                Ct[e] = !0;
                var o = {
                        packages: [e],
                        callback: function() {
                            n.runCallbacks()
                        }
                    },
                    r = t.__config();
                r.language && (o.language = r.language), "corechart" === e && r.mapsApiKey && (o.mapsApiKey = r.mapsApiKey), this.library.charts.load("current", o)
            }
        }, Nt.prototype.runCallbacks = function ne() {
            for (var t, e = 0; e < St.length; e++) t = St[e], this.library.visualization && ("corechart" === t.pack && this.library.visualization.LineChart || "timeline" === t.pack && this.library.visualization.Timeline) && (t.callback(), St.splice(e, 1), e--)
        }, Nt.prototype.createDataTable = function gt(t, e) {
            var i, n, o, r, s, a = [],
                l = [];
            for (i = 0; i < t.length; i++)
                for (o = t[i], t[i].name = t[i].name || "Value", n = 0; n < o.data.length; n++) r = o.data[n], a[s = "datetime" === e ? r[0].getTime() : r[0]] || (a[s] = new Array(t.length), l.push(s)), a[s][i] = q(r[1]);
            var h, c = [],
                u = !0;
            for (n = 0; n < l.length; n++) i = l[n], "datetime" === e ? (h = new Date(q(i)), u = u && X(h)) : h = "number" === e ? q(i) : i, c.push([h].concat(a[i]));
            if ("datetime" === e) c.sort(g);
            else if ("number" === e) {
                for (c.sort(m), i = 0; i < c.length; i++) c[i][0] = f(c[i][0]);
                e = "string"
            }
            var d = new this.library.visualization.DataTable;
            for (e = "datetime" === e && u ? "date" : e, d.addColumn(e, ""), i = 0; i < t.length; i++) d.addColumn("number", t[i].name);
            return d.addRows(c), d
        };
        var Rt = [],
            Ht = 0,
            zt = 4,
            Bt = {},
            Wt = [],
            jt = function(t, e) {
                return t = "number" === e ? q(t) : "datetime" === e ? l(t) : f(t)
            },
            Ft = function(t, e) {
                var i, n, o = [];
                for (n = 0; n < t.length; n++) "bubble" === e ? o.push([q(t[n][0]), q(t[n][1]), q(t[n][2])]) : (i = jt(t[n][0], e), o.push([i, q(t[n][1])]));
                return "datetime" === e ? o.sort(g) : "number" === e && o.sort(m), o
            },
            qt = function qt(t, e, i) {
                var n;
                if ("string" == typeof t && (n = t, !(t = document.getElementById(t)))) throw new Error("No element with id " + n);
                this.element = t, this.options = F(Gt.options, i || {}), this.dataSource = e, E(Gt.charts[t.id] = this, e), this.options.refresh && this.startRefresh()
            };
        qt.prototype.getElement = function oe() {
            return this.element
        }, qt.prototype.getDataSource = function re() {
            return this.dataSource
        }, qt.prototype.getData = function se() {
            return this.data
        }, qt.prototype.getOptions = function ae() {
            return this.options
        }, qt.prototype.getChartObject = function le() {
            return this.chart
        }, qt.prototype.getAdapter = function he() {
            return this.adapter
        }, qt.prototype.updateData = function ce(t, e) {
            this.dataSource = t, e && this.__updateOptions(e), E(this, t)
        }, qt.prototype.setOptions = function ue(t) {
            this.__updateOptions(t), this.redraw()
        }, qt.prototype.redraw = function de() {
            E(this, this.rawData)
        }, qt.prototype.refreshData = function pe() {
            if ("string" == typeof this.dataSource) {
                var t = -1 === this.dataSource.indexOf("?") ? "?" : "&";
                E(this, this.dataSource + t + "_=" + (new Date).getTime())
            }
        }, qt.prototype.startRefresh = function fe() {
            var t = this,
                e = this.options.refresh;
            if (e && "string" != typeof this.dataSource) throw new Error("Data source must be a URL for refresh");
            if (!this.intervalId) {
                if (!e) throw new Error("No refresh interval");
                this.intervalId = setInterval(function() {
                    t.refreshData()
                }, 1e3 * e)
            }
        }, qt.prototype.stopRefresh = function ge() {
            this.intervalId && (clearInterval(this.intervalId), this.intervalId = null)
        }, qt.prototype.toImage = function me(t) {
            if ("chartjs" !== this.adapter) return null;
            if (t && t.background && "transparent" !== t.background) {
                var e = this.chart.chart.canvas,
                    i = this.chart.chart.ctx,
                    n = document.createElement("canvas"),
                    o = n.getContext("2d");
                return n.width = i.canvas.width, n.height = i.canvas.height, o.fillStyle = t.background, o.fillRect(0, 0, n.width, n.height), o.drawImage(e, 0, 0), n.toDataURL("image/png")
            }
            return this.chart.toBase64Image()
        }, qt.prototype.destroy = function Zt() {
            this.__adapterObject && this.__adapterObject.destroy(this), this.__enterEvent && t(this.element, "mouseover", this.__enterEvent), this.__leaveEvent && t(this.element, "mouseout", this.__leaveEvent)
        }, qt.prototype.__updateOptions = function ve(t) {
            var e = t.refresh && t.refresh !== this.options.refresh;
            this.options = F(Gt.options, t), e && (this.stopRefresh(), this.startRefresh())
        }, qt.prototype.__render = function ye() {
            this.data = this.__processData(), I(this.__chartName(), this)
        }, qt.prototype.__config = function be() {
            return Bt
        };
        var Gt = {
            LineChart: function(t) {
                function e() {
                    t.apply(this, arguments)
                }
                return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), (e.prototype.constructor = e).prototype.__processData = function i() {
                    return z(this)
                }, e.prototype.__chartName = function n() {
                    return "LineChart"
                }, e
            }(qt),
            PieChart: function(t) {
                function e() {
                    t.apply(this, arguments)
                }
                return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), (e.prototype.constructor = e).prototype.__processData = function i() {
                    return B(this)
                }, e.prototype.__chartName = function n() {
                    return "PieChart"
                }, e
            }(qt),
            ColumnChart: function(t) {
                function e() {
                    t.apply(this, arguments)
                }
                return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), (e.prototype.constructor = e).prototype.__processData = function i() {
                    return z(this, null, !0)
                }, e.prototype.__chartName = function n() {
                    return "ColumnChart"
                }, e
            }(qt),
            BarChart: function(t) {
                function e() {
                    t.apply(this, arguments)
                }
                return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), (e.prototype.constructor = e).prototype.__processData = function i() {
                    return z(this, null, !0)
                }, e.prototype.__chartName = function n() {
                    return "BarChart"
                }, e
            }(qt),
            AreaChart: function(t) {
                function e() {
                    t.apply(this, arguments)
                }
                return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), (e.prototype.constructor = e).prototype.__processData = function i() {
                    return z(this)
                }, e.prototype.__chartName = function n() {
                    return "AreaChart"
                }, e
            }(qt),
            GeoChart: function(t) {
                function e() {
                    t.apply(this, arguments)
                }
                return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), (e.prototype.constructor = e).prototype.__processData = function i() {
                    return B(this)
                }, e.prototype.__chartName = function n() {
                    return "GeoChart"
                }, e
            }(qt),
            ScatterChart: function(t) {
                function e() {
                    t.apply(this, arguments)
                }
                return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), (e.prototype.constructor = e).prototype.__processData = function i() {
                    return z(this, "number")
                }, e.prototype.__chartName = function n() {
                    return "ScatterChart"
                }, e
            }(qt),
            BubbleChart: function(t) {
                function e() {
                    t.apply(this, arguments)
                }
                return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), (e.prototype.constructor = e).prototype.__processData = function i() {
                    return z(this, "bubble")
                }, e.prototype.__chartName = function n() {
                    return "BubbleChart"
                }, e
            }(qt),
            Timeline: function(t) {
                function e() {
                    t.apply(this, arguments)
                }
                return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), (e.prototype.constructor = e).prototype.__processData = function i() {
                    var t, e = this.rawData;
                    for (t = 0; t < e.length; t++) e[t][1] = l(e[t][1]), e[t][2] = l(e[t][2]);
                    return e
                }, e.prototype.__chartName = function n() {
                    return "Timeline"
                }, e
            }(qt),
            charts: {},
            configure: function(t) {
                for (var e in t) t.hasOwnProperty(e) && (Bt[e] = t[e])
            },
            setDefaultOptions: function(t) {
                Gt.options = t
            },
            eachChart: function(t) {
                for (var e in Gt.charts) Gt.charts.hasOwnProperty(e) && t(Gt.charts[e])
            },
            config: Bt,
            options: {},
            adapters: Wt,
            addAdapter: O
        };
        return Gt
    }),
    function() {}.call(this),
    function() {}.call(this),
    function() {}.call(this),
    function() {}.call(this),
    function() {
        var t = this;
        (function() {
            (function() {
                var i = [].slice;
                this.ActionCable = {
                    INTERNAL: {
                        message_types: {
                            welcome: "welcome",
                            ping: "ping",
                            confirmation: "confirm_subscription",
                            rejection: "reject_subscription"
                        },
                        default_mount_path: "/cable",
                        protocols: ["actioncable-v1-json", "actioncable-unsupported"]
                    },
                    WebSocket: window.WebSocket,
                    logger: window.console,
                    createConsumer: function(t) {
                        var e;
                        return null == t && (t = null != (e = this.getConfig("url")) ? e : this.INTERNAL.default_mount_path), new l.Consumer(this.createWebSocketURL(t))
                    },
                    getConfig: function(t) {
                        var e;
                        return null != (e = document.head.querySelector("meta[name='action-cable-" + t + "']")) ? e.getAttribute("content") : void 0
                    },
                    createWebSocketURL: function(t) {
                        var e;
                        return t && !/^wss?:/i.test(t) ? ((e = document.createElement("a")).href = t, e.href = e.href, e.protocol = e.protocol.replace("http", "ws"), e.href) : t
                    },
                    startDebugging: function() {
                        return this.debugging = !0
                    },
                    stopDebugging: function() {
                        return this.debugging = null
                    },
                    log: function() {
                        var t, e;
                        if (t = 1 <= arguments.length ? i.call(arguments, 0) : [], this.debugging) return t.push(Date.now()), (e = this.logger).log.apply(e, ["[ActionCable]"].concat(i.call(t)))
                    }
                }
            }).call(this)
        }).call(t);
        var l = t.ActionCable;
        (function() {
            (function() {
                var n = function(t, e) {
                    return function() {
                        return t.apply(e, arguments)
                    }
                };
                l.ConnectionMonitor = function() {
                    function t(t) {
                        this.connection = t, this.visibilityDidChange = n(this.visibilityDidChange, this), this.reconnectAttempts = 0
                    }
                    var o, e, i;
                    return t.pollInterval = {
                        min: 3,
                        max: 30
                    }, t.staleThreshold = 6, t.prototype.start = function() {
                        if (!this.isRunning()) return this.startedAt = e(), delete this.stoppedAt, this.startPolling(), document.addEventListener("visibilitychange", this.visibilityDidChange), l.log("ConnectionMonitor started. pollInterval = " + this.getPollInterval() + " ms")
                    }, t.prototype.stop = function() {
                        if (this.isRunning()) return this.stoppedAt = e(), this.stopPolling(), document.removeEventListener("visibilitychange", this.visibilityDidChange), l.log("ConnectionMonitor stopped")
                    }, t.prototype.isRunning = function() {
                        return null != this.startedAt && null == this.stoppedAt
                    }, t.prototype.recordPing = function() {
                        return this.pingedAt = e()
                    }, t.prototype.recordConnect = function() {
                        return this.reconnectAttempts = 0, this.recordPing(), delete this.disconnectedAt, l.log("ConnectionMonitor recorded connect")
                    }, t.prototype.recordDisconnect = function() {
                        return this.disconnectedAt = e(), l.log("ConnectionMonitor recorded disconnect")
                    }, t.prototype.startPolling = function() {
                        return this.stopPolling(), this.poll()
                    }, t.prototype.stopPolling = function() {
                        return clearTimeout(this.pollTimeout)
                    }, t.prototype.poll = function() {
                        return this.pollTimeout = setTimeout((t = this, function() {
                            return t.reconnectIfStale(), t.poll()
                        }), this.getPollInterval());
                        var t
                    }, t.prototype.getPollInterval = function() {
                        var t, e, i, n;
                        return i = (n = this.constructor.pollInterval).min, e = n.max, t = 5 * Math.log(this.reconnectAttempts + 1), Math.round(1e3 * o(t, i, e))
                    }, t.prototype.reconnectIfStale = function() {
                        if (this.connectionIsStale()) return l.log("ConnectionMonitor detected stale connection. reconnectAttempts = " + this.reconnectAttempts + ", pollInterval = " + this.getPollInterval() + " ms, time disconnected = " + i(this.disconnectedAt) + " s, stale threshold = " + this.constructor.staleThreshold + " s"), this.reconnectAttempts++, this.disconnectedRecently() ? l.log("ConnectionMonitor skipping reopening recent disconnect") : (l.log("ConnectionMonitor reopening"), this.connection.reopen())
                    }, t.prototype.connectionIsStale = function() {
                        var t;
                        return i(null != (t = this.pingedAt) ? t : this.startedAt) > this.constructor.staleThreshold
                    }, t.prototype.disconnectedRecently = function() {
                        return this.disconnectedAt && i(this.disconnectedAt) < this.constructor.staleThreshold
                    }, t.prototype.visibilityDidChange = function() {
                        if ("visible" === document.visibilityState) return setTimeout((t = this, function() {
                            if (t.connectionIsStale() || !t.connection.isOpen()) return l.log("ConnectionMonitor reopening stale connection on visibilitychange. visbilityState = " + document.visibilityState), t.connection.reopen()
                        }), 200);
                        var t
                    }, e = function() {
                        return (new Date).getTime()
                    }, i = function(t) {
                        return (e() - t) / 1e3
                    }, o = function(t, e, i) {
                        return Math.max(e, Math.min(i, t))
                    }, t
                }()
            }).call(this),
                function() {
                    var t, o, e, i, n, r = [].slice,
                        s = function(t, e) {
                            return function() {
                                return t.apply(e, arguments)
                            }
                        },
                        a = [].indexOf || function(t) {
                            for (var e = 0, i = this.length; e < i; e++)
                                if (e in this && this[e] === t) return e;
                            return -1
                        };
                    i = l.INTERNAL, o = i.message_types, e = i.protocols, n = 2 <= e.length ? r.call(e, 0, t = e.length - 1) : (t = 0, []), e[t++], l.Connection = function() {
                        function t(t) {
                            this.consumer = t, this.open = s(this.open, this), this.subscriptions = this.consumer.subscriptions, this.monitor = new l.ConnectionMonitor(this), this.disconnected = !0
                        }
                        return t.reopenDelay = 500, t.prototype.send = function(t) {
                            return !!this.isOpen() && (this.webSocket.send(JSON.stringify(t)), !0)
                        }, t.prototype.open = function() {
                            return this.isActive() ? (l.log("Attempted to open WebSocket, but existing socket is " + this.getState()), !1) : (l.log("Opening WebSocket, current state is " + this.getState() + ", subprotocols: " + e), null != this.webSocket && this.uninstallEventHandlers(), this.webSocket = new l.WebSocket(this.consumer.url, e), this.installEventHandlers(), this.monitor.start(), !0)
                        }, t.prototype.close = function(t) {
                            var e;
                            if ((null != t ? t : {
                                    allowReconnect: !0
                                }).allowReconnect || this.monitor.stop(), this.isActive()) return null != (e = this.webSocket) ? e.close() : void 0
                        }, t.prototype.reopen = function() {
                            var t;
                            if (l.log("Reopening WebSocket, current state is " + this.getState()), !this.isActive()) return this.open();
                            try {
                                return this.close()
                            } catch (e) {
                                return t = e, l.log("Failed to reopen WebSocket", t)
                            } finally {
                                l.log("Reopening WebSocket in " + this.constructor.reopenDelay + "ms"), setTimeout(this.open, this.constructor.reopenDelay)
                            }
                        }, t.prototype.getProtocol = function() {
                            var t;
                            return null != (t = this.webSocket) ? t.protocol : void 0
                        }, t.prototype.isOpen = function() {
                            return this.isState("open")
                        }, t.prototype.isActive = function() {
                            return this.isState("open", "connecting")
                        }, t.prototype.isProtocolSupported = function() {
                            var t;
                            return t = this.getProtocol(), 0 <= a.call(n, t)
                        }, t.prototype.isState = function() {
                            var t, e;
                            return e = 1 <= arguments.length ? r.call(arguments, 0) : [], t = this.getState(), 0 <= a.call(e, t)
                        }, t.prototype.getState = function() {
                            var t, e;
                            for (e in WebSocket)
                                if (WebSocket[e] === (null != (t = this.webSocket) ? t.readyState : void 0)) return e.toLowerCase();
                            return null
                        }, t.prototype.installEventHandlers = function() {
                            var t, e;
                            for (t in this.events) e = this.events[t].bind(this), this.webSocket["on" + t] = e
                        }, t.prototype.uninstallEventHandlers = function() {
                            var t;
                            for (t in this.events) this.webSocket["on" + t] = function() {}
                        }, t.prototype.events = {
                            message: function(t) {
                                var e, i, n;
                                if (this.isProtocolSupported()) switch (e = (n = JSON.parse(t.data)).identifier, i = n.message, n.type) {
                                    case o.welcome:
                                        return this.monitor.recordConnect(), this.subscriptions.reload();
                                    case o.ping:
                                        return this.monitor.recordPing();
                                    case o.confirmation:
                                        return this.subscriptions.notify(e, "connected");
                                    case o.rejection:
                                        return this.subscriptions.reject(e);
                                    default:
                                        return this.subscriptions.notify(e, "received", i)
                                }
                            },
                            open: function() {
                                if (l.log("WebSocket onopen event, using '" + this.getProtocol() + "' subprotocol"), this.disconnected = !1, !this.isProtocolSupported()) return l.log("Protocol is unsupported. Stopping monitor and disconnecting."), this.close({
                                    allowReconnect: !1
                                })
                            },
                            close: function() {
                                if (l.log("WebSocket onclose event"), !this.disconnected) return this.disconnected = !0, this.monitor.recordDisconnect(), this.subscriptions.notifyAll("disconnected", {
                                    willAttemptReconnect: this.monitor.isRunning()
                                })
                            },
                            error: function() {
                                return l.log("WebSocket onerror event")
                            }
                        }, t
                    }()
                }.call(this),
                function() {
                    var h = [].slice;
                    l.Subscriptions = function() {
                        function t(t) {
                            this.consumer = t, this.subscriptions = []
                        }
                        return t.prototype.create = function(t, e) {
                            var i, n, o;
                            return n = "object" == typeof(i = t) ? i : {
                                channel: i
                            }, o = new l.Subscription(this.consumer, n, e), this.add(o)
                        }, t.prototype.add = function(t) {
                            return this.subscriptions.push(t), this.consumer.ensureActiveConnection(), this.notify(t, "initialized"), this.sendCommand(t, "subscribe"), t
                        }, t.prototype.remove = function(t) {
                            return this.forget(t), this.findAll(t.identifier).length || this.sendCommand(t, "unsubscribe"), t
                        }, t.prototype.reject = function(t) {
                            var e, i, n, o, r;
                            for (o = [], e = 0, i = (n = this.findAll(t)).length; e < i; e++) r = n[e], this.forget(r), this.notify(r, "rejected"), o.push(r);
                            return o
                        }, t.prototype.forget = function(o) {
                            var r;
                            return this.subscriptions = function() {
                                var t, e, i, n;
                                for (n = [], t = 0, e = (i = this.subscriptions).length; t < e; t++)(r = i[t]) !== o && n.push(r);
                                return n
                            }.call(this), o
                        }, t.prototype.findAll = function(t) {
                            var e, i, n, o, r;
                            for (o = [], e = 0, i = (n = this.subscriptions).length; e < i; e++)(r = n[e]).identifier === t && o.push(r);
                            return o
                        }, t.prototype.reload = function() {
                            var t, e, i, n, o;
                            for (n = [], t = 0, e = (i = this.subscriptions).length; t < e; t++) o = i[t], n.push(this.sendCommand(o, "subscribe"));
                            return n
                        }, t.prototype.notifyAll = function(t) {
                            var e, i, n, o, r, s, a;
                            for (i = t, e = 2 <= arguments.length ? h.call(arguments, 1) : [], s = [], n = 0, o = (r = this.subscriptions).length; n < o; n++) a = r[n], s.push(this.notify.apply(this, [a, i].concat(h.call(e))));
                            return s
                        }, t.prototype.notify = function(t, e) {
                            var i, n, o, r, s, a, l;
                            for (a = t, n = e, i = 3 <= arguments.length ? h.call(arguments, 2) : [], s = [], o = 0, r = (l = "string" == typeof a ? this.findAll(a) : [a]).length; o < r; o++) a = l[o], s.push("function" == typeof a[n] ? a[n].apply(a, i) : void 0);
                            return s
                        }, t.prototype.sendCommand = function(t, e) {
                            var i;
                            return i = t.identifier, this.consumer.send({
                                command: e,
                                identifier: i
                            })
                        }, t
                    }()
                }.call(this),
                function() {
                    l.Subscription = function() {
                        function t(t, e, i) {
                            this.consumer = t, null == e && (e = {}), this.identifier = JSON.stringify(e), n(this, i)
                        }
                        var n;
                        return t.prototype.perform = function(t, e) {
                            return null == e && (e = {}), e.action = t, this.send(e)
                        }, t.prototype.send = function(t) {
                            return this.consumer.send({
                                command: "message",
                                identifier: this.identifier,
                                data: JSON.stringify(t)
                            })
                        }, t.prototype.unsubscribe = function() {
                            return this.consumer.subscriptions.remove(this)
                        }, n = function(t, e) {
                            var i, n;
                            if (null != e)
                                for (i in e) n = e[i], t[i] = n;
                            return t
                        }, t
                    }()
                }.call(this),
                function() {
                    l.Consumer = function() {
                        function t(t) {
                            this.url = t, this.subscriptions = new l.Subscriptions(this), this.connection = new l.Connection(this)
                        }
                        return t.prototype.send = function(t) {
                            return this.connection.send(t)
                        }, t.prototype.connect = function() {
                            return this.connection.open()
                        }, t.prototype.disconnect = function() {
                            return this.connection.close({
                                allowReconnect: !1
                            })
                        }, t.prototype.ensureActiveConnection = function() {
                            if (!this.connection.isActive()) return this.connection.open()
                        }, t
                    }()
                }.call(this)
        }).call(this), "object" == typeof module && module.exports ? module.exports = l : "function" == typeof define && define.amd && define(l)
    }.call(this),
    function() {
        this.App || (this.App = {}), App.cable = ActionCable.createConsumer()
    }.call(this),
    function() {}.call(this),
    function() {}.call(this),
    function() {}.call(this),
    function() {}.call(this),
    function() {}.call(this),
    function() {}.call(this),
    function() {}.call(this),
    function() {}.call(this),
    function() {}.call(this),
    function() {}.call(this),
    function() {}.call(this), $(document).ready(function() {
        toastr.options = {
            closeButton: !1,
            debug: !1,
            positionClass: "toast-top-center",
            onclick: null,
            showDuration: "300",
            hideDuration: "1000",
            timeOut: "5000",
            extendedTimeOut: "1000",
            showEasing: "swing",
            hideEasing: "linear",
            showMethod: "fadeIn",
            hideMethod: "fadeOut"
        }
    });