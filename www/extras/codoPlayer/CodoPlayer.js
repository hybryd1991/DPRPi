/*
    Codo Player Free 2.1
    codoplayer.com

    Codo Player Free is free software: you can redistribute it and/or modify it
    under the terms of the GNU General Public License as published by the Free Software Foundation,
    either version 3 of the License, or (at your option) any later version.
    You should have received a copy of the GNU General Public License along with Codo Player.
    If not, see <http://www.codoplayer.com/policy/license/free>.

    Date: 04 03 2015

    Copyright (C) Donato Software House
*/
window.Codo = function(a) {
    "use strict";
    var b = [];
    return a && ("string" == typeof a ? b = document.querySelectorAll(a) : b.push(a)), {
        get: function() {
            return b
        },
        domReady: function(a) {
            a && (document.addEventListener ? document.addEventListener("DOMContentLoaded", a) : document.attachEvent("onreadystatechange", function() {
                "interactive" === document.readyState && a()
            }))
        },
        script: function(a, b, c) {
            var d = document.createElement("script");
            d.type = "text/javascript", d.async = !0, d.onreadystatechange = function(a) {
                "complete" != this.readyState && "loaded" != this.readyState || a || (b && b(!0, c), a = !0)
            }, d.onload = function() {
                b && b(!0, c)
            }, d.onerror = function() {
                b && b(!1, c)
            }, d.src = a, document.getElementsByTagName("head")[0].appendChild(d)
        },
        link: function(a) {
            var b = document.createElement("link");
            b.rel = "stylesheet", b.type = "text/css", b.href = a, document.getElementsByTagName("head")[0].appendChild(b)
        },
        load: function(a, c, d) {
            var e = new XMLHttpRequest;
            e.open(a.action || "GET", a.url, !0), e.onreadystatechange = function() {
                if (4 === this.readyState)
                    if (this.status >= 200 && this.status < 400) {
                        if (!b[0]) return c(this.responseText, d), this.responseText;
                        b[0].innerHTML = this.responseText
                    } else c("error", d)
            }, a.contentType && e.setRequestHeader("Content-Type", a.contentType), e.send()
        },
        on: function(a, c, d) {
            if (b[0]) {
                for (var e = 0; e < b.length; e++) b[e].addEventListener ? b[e].addEventListener(a, c, d || !1) : b[e].attachEvent("on" + a, c);
                return b
            }
        },
        off: function(a, c) {
            if (b[0]) {
                for (var d = 0; d < b.length; d++) b[d].removeEventListener ? b[d].removeEventListener(a, c) : b[d].detachEvent("on" + a, c);
                return b
            }
        },
        add: function(a) {
            if (b[0]) {
                for (var c = 0; c < b.length; c++) {
                    var d = document.createElement(a.el);
                    for (var e in a) "el" != e && (d.key ? d.key = a[e] : "className" == e ? d.className = a[e] : "style" == e ? d.style.cssText = a[e] : "innerHTML" == e ? d.innerHTML = a[e] : d.setAttribute(e, a[e]));
                    b[c] && b[c].appendChild(d)
                }
                return d
            }
        },
        remove: function() {
            if (b[0])
                for (var a = 0; a < b.length; a++) b[a].parentNode.removeChild(b[a]), b[a] = void 0
        },
        addClass: function(a) {
            if (b[0])
                for (var c = 0; c < b.length; c++) b[c].classList ? b[c].classList.add(a) : b[c].className += " " + a
        },
        removeClass: function(a) {
            if (b[0])
                for (var c = 0; c < b.length; c++) b[c].classList ? b[c].classList.remove(a) : b[c].className = b[c].className.replace(new RegExp("(^|\\b)" + a.split(" ").join("|") + "(\\b|$)", "gi"), " ")
        },
        toggle: function() {
            b[0] && (b[0].style.display = "block" == b[0].style.display ? "none" : "block")
        },
        getTop: function() {
            return b[0] ? b[0].getBoundingClientRect().top : void 0
        },
        getLeft: function() {
            return b[0] ? b[0].getBoundingClientRect().left : void 0
        },
        getWidth: function() {
            return b[0] ? b[0].clientWidth || b[0].offsetWidth : void 0
        },
        getHeight: function() {
            return b[0] ? b[0].clientHeight || b[0].offsetHeight : void 0
        },
        screen: function() {
            var a = {};
            return a.width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0), a.height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0), a
        },
        scrollX: function() {
            return void 0 !== window.pageXOffset ? window.pageXOffset : (document.documentElement || document.parentNode || document).scrollLeft
        },
        scrollY: function() {
            return void 0 !== window.pageYOffset ? window.pageYOffset : (document.documentElement || document.parentNode || document).scrollTop
        },
        mouse: function(a) {
            a = a || window.event;
            var b = a.pageX,
                c = a.pageY;
            void 0 === b && (b = a.clientX + document.body.scrollLeft + document.documentElement.scrollLeft, c = a.clientY + document.body.scrollTop + document.documentElement.scrollTop);
            var d = {};
            return d.x = b, d.y = c, d
        },
        fadeIn: function(a, c) {
            if (b[0]) {
                var d = 0;
                a = a || 2, c = c || 100, b[0].style.display = "block", b[0].style.visibility = "visible";
                var e = function() {
                    d += a, b[0].style.opacity = d / 100, b[0].style.filter = "alpha(opacity=" + d + ")", c > d && (window.requestAnimationFrame && requestAnimationFrame(e) || setTimeout(e, 16))
                };
                e()
            }
        },
        fadeOut: function(a, c) {
            if (b[0]) {
                var d = 100;
                a = a || 2, c = c || 0;
                var e = function() {
                    d -= a, b[0].style.opacity = d / 100, b[0].style.filter = "alpha(opacity=" + d + ")", d > c ? window.requestAnimationFrame && requestAnimationFrame(e) || setTimeout(e, 16) : b[0].style.display = "none"
                };
                e()
            }
        },
        log: function(a) {
            window.console && console.log(a)
        },
        isTouch: function() {
            return !!("ontouchstart" in window)
        },
        isMobile: function() {
            return /webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? !0 : void 0
        },
        isIphone: function() {
            return navigator.userAgent.match(/iPhone|iPod/i)
        },
        isFlash: function() {
            var a = !1;
            if ("ActiveXObject" in window) try {
                a = !!new ActiveXObject("ShockwaveFlash.ShockwaveFlash")
            } catch (b) {
                a = !1
            } else a = !!navigator.mimeTypes["application/x-shockwave-flash"];
            return a
        },
        p: function() {
            return location.protocol
        },
        h: function() {
            return location.hostname
        },
        getScriptTag: function(a) {
            for (var b = document.scripts, c = 0; c < b.length; c++)
                if (b[c].attributes.src && b[c].attributes.src.value.search(a) > -1) return b[c]
        },
        getVideoHeight: function(a, b, c) {
            return a / (b / c)
        },
        secsToTime: function(a) {
            var b = ":",
                c = ":",
                d = Math.floor(a / 3600);
            10 > d && (d = "0" + d), "00" === d && (d = "", b = "");
            var e = a % 3600,
                f = Math.floor(e / 60);
            10 > f && (f = "0" + f);
            var g = e % 60,
                h = Math.round(g);
            return 10 > h && (h = "0" + h), d + b + f + c + h
        }
    }
}, document.querySelectorAll || function(a, b) {
    a = document, b = a.createStyleSheet(), a.querySelectorAll = function(c, d, e, f, g) {
        for (g = a.all, d = [], c = c.replace(/\[for\b/gi, "[htmlFor").split(","), e = c.length; e--;) {
            for (b.addRule(c[e], "k:v"), f = g.length; f--;) g[f].currentStyle.k && d.push(g[f]);
            b.removeRule(0)
        }
        return d
    }
}(), window.CodoPlayerAPI = [], window.CodoPlayer = function(a, b, c) {
    "use strict";

    function d() {
        a || (a = {}), b || (b = {}), b.controls || (b.controls = {});
        var d = Codo().isTouch() ? "touchstart" : "click",
            e = !1,
            f = "data:image/gif;base64,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",
            g = function(a) {
                var b, c = "codo-player";
                b = a.id ? a.id : "codo-player-" + CodoPlayerAPI.length;
                var d = Codo().getScriptTag("CodoPlayer.js").src.replace("CodoPlayer.js", ""),
                    e = {
                        instance: CodoPlayerAPI.length,
                        id: b,
                        className: c,
                        DOM: {
                            parent: document.getElementById('#videoPlayerSurface'),
                            container: void 0,
                            containerScreen: void 0,
                            containerScreenCanvas: void 0,
                            overlay: void 0,
                            controls: void 0
                        },
                        settings: {
                            responsive: function() {
                                return a.width ? !1 : !0
                            }(),
                            style: a.style || "standard",
                            ratio: a.ratio || [16, 9],
                            width: a.width,
                            height: a.height,
                            currentWidth: void 0,
                            currentHeight: void 0,
                            mediaWidth: void 0,
                            mediaHeight: void 0,
                            autoplay: a.autoplay,
                            poster: a.poster,
                            volume: function() {
                                return 0 === a.volume ? 0 : function() {
                                    return a.volume ? a.volume : 80
                                }()
                            }(),
                            loop: a.loop,
                            preload: function() {
                                return Codo().isTouch() ? !0 : a.preload === !1 ? !1 : !0
                            }(),
                            engine: a.engine || "auto",
                            loader: a.loader || d + "loader.gif",
                            logo: a.logo,
                            cuepoints: a.cuepoints,
                            playlist: a.playlist,
                            priority: a.priority || "src"
                        },
                        playlist: {},
                        about: {
                            product: "Codo Player Free 2.1"
                        },
                        media: {},
                        system: {
                            initClickMade: !1,
                            firstClipOver: !1,
                            initPlayMade: !1,
                            isFullScreen: !1,
                            rootPath: d
                        },
                        plugins: a.plugins || {},
                        play: function(a, b) {
                            a ? e.playlist.set(a, b) : e.settings.preload ? e.media.toggle() : (e.system.initClickMade ? e.media.toggle() : (e.media.toggle(), Codo().isTouch() && e.media.getParent().play()), e.system.initClickMade = !0)
                        },
                        pause: function() {
                            e.media.pause()
                        },
                        resize: function(a, b) {
                            a && b ? (e.settings.width = e.settings.currentWidth = a, e.settings.height = e.settings.currentHeight = b) : e.settings.mediaWidth && e.settings.mediaHeight && (e.settings.width = e.settings.currentWidth = Codo(e.DOM.parent.parentNode).getWidth(), e.settings.height = e.settings.currentHeight = Codo().getVideoHeight(e.settings.width, e.settings.mediaWidth, e.settings.mediaHeight)), e.media.getPoster || e.media.getParent ? e.settings.mediaWidth && e.settings.mediaHeight && (N.resize(e.media.getPoster(), e.settings.mediaWidth, e.settings.mediaHeight), N.resize(e.media.getParent(), e.settings.mediaWidth, e.settings.mediaHeight)) : N.resize(null, e.settings.currentWidth, e.settings.currentHeight)
                        },
                        destroy: function() {
                            e.media.destroy(), Codo(P).remove();
                            for (var a = 0; a < CodoPlayerAPI.length; a++) CodoPlayerAPI[a].instance === e.instance && CodoPlayerAPI.splice(e.instance, 1)
                        },
                        onReady: a.onReady
                    };
                return e.settings.controls = {
                    hideDelay: a.controls.hideDelay || 5,
                    fadeDelay: a.controls.fadeDelay || 20,
                    show: function() {
                        var b = a.controls.show || "auto";
                        return Codo().isTouch() && (b = "never"), Codo().isMobile() && (b = "never"), Codo().isTouch() && !Codo().isMobile() && (b = "always"), b
                    }(),
                    all: function() {
                        return a.controls.all === !1 ? !1 : !0
                    }(),
                    play: function() {
                        return a.controls.play === !1 ? !1 : !0
                    }(),
                    seek: function() {
                        return a.controls.seek === !1 ? !1 : !0
                    }(),
                    seeking: function() {
                        return a.controls.seeking === !1 ? !1 : !0
                    }(),
                    volume: function() {
                        return Codo().isTouch() ? void 0 : a.controls.volume ? a.controls.volume : a.controls.volume !== !1 ? "horizontal" : void 0
                    }(),
                    fullscreen: function() {
                        return a.controls.fullscreen === !1 || Codo().isMobile() ? !1 : !0
                    }(),
                    title: function() {
                        return a.controls.title === !1 ? !1 : !0
                    }(),
                    time: function() {
                        return a.controls.time === !1 ? !1 : !0
                    }(),
                    hd: function() {
                        return a.controls.hd === !1 ? !1 : !0
                    }(),
                    playBtn: function() {
                        return Codo().isMobile() ? !1 : a.controls.playBtn === !1 ? !1 : !0
                    }(),
                    loadingText: a.controls.loadingText || "Loading...",
                    foreColor: a.controls.foreColor || "white",
                    backColor: a.controls.backColor || "#454545",
                    bufferColor: a.controls.bufferColor || "#666666",
                    progressColor: a.controls.progressColor || "#ff0000"
                }, e
            },
            h = [],
            i = [],
            j = [],
            k = [],
            l = [],
            m = [],
            n = [],
            o = [],
            p = [],
            q = [],
            r = [],
            s = [],
            t = [],
            u = [],
            v = [],
            w = [],
            x = [],
            y = [],
            z = [],
            A = [],
            B = function() {
                function a(a, b, c) {
                    if (a) {
                        if (c = c || a.priority, W && W.off(), V && (V.reset(), V.pause(), V.title(M.settings.controls.loadingText), V.setVolume(M.settings.volume), M.settings.controls.hd && (a.src && a.srcHD ? a.src && a.srcHD && (V.hd.show(), "srcHD" === c ? V.hd.on() : V.hd.off()) : (c = "src", V.hd.off(), V.hd.hide())), V.on()), S && S.on(), a && (a.engine = a.engine || "auto", a[c] && a[c].length > 0))
                            for (var d = 0; d < a[c].length; d++) {
                                var e = a[c][d];
                                if ("youtube" == a.engine) return a.activeUrl = e, a.platformName = "YOUTUBE", a.mediaType = "video", void(a.platformName != M.media.platformName ? (M.media.destroy && M.media.destroy(), M.media = new L(a, a.mediaType, b, c)) : M.media.play(a, b, c));
                                if (a.rtmp) return a.engine = "flash", a.activeUrl = e, a.platformName = "videoSWF", a.mediaType = "video", void(a.platformName != M.media.platformName ? (M.media.destroy && M.media.destroy(), M.media = new K(a, a.mediaType, b, c)) : M.media.play(a, b, c));
                                var f = document.createElement("video"),
                                    g = document.createElement("audio"),
                                    h = e.match(/\.[0-9a-z]+$/i);
                                if (h = h ? h[0].replace(".", "") : "mp4", f.canPlayType)
                                    if (f.canPlayType("video/" + h).length > 0 || "m3u8" == h) {
                                        if ("html5" == a.engine || "auto" == a.engine) return a.activeUrl = e, a.platformName = "videoHTML5", a.mediaType = "video", "m3u8" == h && (a.m3u8 = !0), void(a.platformName != M.media.platformName ? (M.media.destroy && M.media.destroy(), M.media = new J(a, a.mediaType, b, c)) : M.media.play(a, b, c))
                                    } else if (g.canPlayType("audio/" + h).length > 0 && ("html5" == a.engine || "auto" == a.engine)) return a.activeUrl = e, a.platformName = "audioHTML5", a.mediaType = "audio", void(a.platformName != M.media.platformName ? (M.media.destroy && M.media.destroy(), M.media = new J(a, a.mediaType, b, c)) : M.media.play(a, b, c));
                                if ("mp4" == h || "flv" == h) {
                                    if ("flash" == a.engine || "auto" == a.engine) return a.activeUrl = e, a.platformName = "videoSWF", a.mediaType = "video", void(M.media = new K(a, a.mediaType, b, c))
                                } else if (!("mp3" != h && "wav" != h || "flash" != a.engine && "auto" != a.engine)) return a.activeUrl = e, a.platformName = "audioSWF", a.mediaType = "audio", void(a.platformName != M.media.platformName ? (M.media.destroy && M.media.destroy(), M.media = new K(a, a.mediaType, b, c)) : M.media.play(a, b, c))
                            }
                        W.on("source not recognized");
                        for (var d = 0; d < u.length; d++) u[d] && u[d]()
                    }
                }
                return {
                    set: function(b, c, d) {
                        a(b, c, d)
                    }
                }
            },
            C = function(a) {
                function b(b) {
                    if (b) {
                        var c = [];
                        if ("string" == typeof b) c.push({
                            src: [b]
                        });
                        else if ("object" == typeof b)
                            if (b[0])
                                for (var d = 0; d < b.length; d++) "string" == typeof b[d] ? c.push(b[d]) : "object" == typeof b[d] && b[d].src && ("string" == typeof b[d].src ? (c.push(b[d]), c[c.length - 1].src = [b[d].src]) : b[d].src[0] && c.push(b[d]));
                            else b.src && ("string" == typeof b.src ? (c.push(b), c[c.length - 1].src = [b.src]) : b.src[0] && c.push(b));
                        for (d = 0; d < c.length; d++) c[d].id = d, c[d].hasPrevious = 0 !== d ? !0 : !1, c[d].hasNext = d < c.length - 1 ? !0 : !1, c[d].poster = c[d].poster || a.settings.poster, c[d].engine = c[d].engine || a.settings.engine, c[d].rtmp = c[d].rtmp || a.settings.rtmp, c[d].cuepoints = c[d].cuepoints || a.settings.cuepoints, c[d].priority = c[d].priority || a.settings.priority;
                        return c
                    }
                }

                function c(a) {
                    if (a) {
                        var b, c = [];
                        if ("string" == typeof a) c.push(a);
                        else if ("object" == typeof a)
                            if (a[0])
                                for (b = 0; b < a.length; b++) "string" == typeof a[b] ? c.push(a[b]) : "object" == typeof a[b] && a[b].src && ("string" == typeof a[b].src ? (c.push(a[b]), c[c.length - 1].src = [a[b].src]) : a[b].src[0] && c.push(a[b]));
                            else a.src && ("string" == typeof a.src ? (c.push(a), c[c.length - 1].src = [a.src]) : a.src[0] && c.push(a));
                        return c
                    }
                    return !1
                }

                function f() {
                    g && Codo(g).remove(), g = Codo(a.DOM.parent).add({
                        el: "div",
                        className: a.className + "-playlist-wrap"
                    });
                    for (var b = Codo(g).add({
                            el: "ul",
                            className: a.className + "-playlist-ul",
                            style: "position: relative; width: 100%;"
                        }), c = 0; c < h.clips.length; c++) {
                        var e = Codo(b).add({
                                el: "li",
                                style: "cursor: pointer; overflow: auto;"
                            }),
                            f = Codo(e).add({
                                el: "span",
                                className: a.className + "-playlist-ul-id",
                                style: "float: left;",
                                innerHTML: h.clips[c].id + 1
                            }),
                            i = Codo(e).add({
                                el: "span",
                                className: a.className + "-playlist-ul-title",
                                style: "float: left;",
                                innerHTML: h.clips[c].title || ""
                            });
                        e.setAttribute("data-row", c), f.setAttribute("data-row", c), i.setAttribute("data-row", c), Codo(e).on(d, function(b) {
                            b.stopPropagation && b.preventDefault && (b.stopPropagation(), b.preventDefault()), b = b || window.event;
                            var c = b.target || b.srcElement;
                            a.plugins && a.plugins.advertising && a.plugins.advertising.isAd || (a.system.initClickMade = !0, a.playlist.next(c.getAttribute("data-row"), "autoplay"), Codo().isTouch() && a.media.play())
                        })
                    }
                    for (var j = b.getElementsByTagName("li"), c = 0; c < j.length; c++) Codo(j[c]).removeClass(a.className + "-playlist-currentClip"), j[c].getAttribute("data-row") == h.currentIndex && Codo(j[c]).addClass(a.className + "-playlist-currentClip")
                }
                var g, h = {
                    breakTime: "0",
                    currentIndex: "0",
                    set: function(a, d, e) {
                        this.currentIndex = e ? e : "0", this.clips = b(a);
                        for (var f = 0; f < this.clips.length; f++) this.clips[f].srcHD && (this.clips[f].srcHD = c(this.clips[f].srcHD));
                        this.next(this.currentIndex, d)
                    },
                    next: function(b, c) {
                        return this.breakTime = "0", !e && S && 4670 != S.getImage().src.length ? void W.on() : (b && b >= 0 && b < this.clips.length ? this.currentIndex = b : this.currentIndex < this.clips.length - 1 ? this.currentIndex++ : this.currentIndex = "0", a.settings.playlist && f(), void U.set(this.clips[this.currentIndex], c))
                    },
                    same: function(b) {
                        this.breakTime = a.media.getCurrentTime ? a.media.getCurrentTime() : "0", U.set(this.clips[this.currentIndex], "autoplay", b)
                    },
                    getCurrentClip: function() {
                        return this.clips[this.currentIndex]
                    }
                };
                return h
            },
            D = function(a) {
                function b() {
                    x ? (e(), x = !1) : (c(), x = !0)
                }

                function c() {
                    y = a.media.getVolume(), a.media.setVolume("0")
                }

                function e() {
                    a.media.setVolume(y)
                }

                function f(b) {
                    var c, d;
                    if ("horizontal" == a.settings.controls.volume) var e = Codo().mouse(b).x,
                        f = Codo(u).getLeft(),
                        g = Codo(u).getWidth(),
                        c = Math.round(e - f);
                    else if ("vertical" == a.settings.controls.volume) var e = Codo().mouse(b).y,
                        f = Codo(u).getTop(),
                        g = Codo(u).getHeight(),
                        c = Math.round(f - e + g);
                    c >= 0 && g >= c && (d = Math.round(100 * c / g), a.media.setVolume && a.media.setVolume(d))
                }

                function g(b) {
                    if (a.media.isMetaDataLoaded && a.media.isMetaDataLoaded()) {
                        if (a.settings.controls.volume && !Codo().isTouch()) {
                            if ("horizontal" == a.settings.controls.volume) var c = Codo(u).getWidth();
                            else if ("vertical" == a.settings.controls.volume) var c = Codo(u).getHeight();
                            if (b >= 0 && 100 >= b) {
                                var d = Math.round(c * b / 100);
                                "horizontal" == a.settings.controls.volume ? v.style.width = d + "px" : "vertical" == a.settings.controls.volume && (v.style.marginTop = c - d + "px", v.style.height = d + "px")
                            }
                        }
                    } else "horizontal" == a.settings.controls.volume ? v.style.width = b + "%" : "vertical" == a.settings.controls.volume && (v.style.marginTop = c - b + "%", v.style.height = b + "%")
                }

                function h() {
                    a.settings.controls.time && (a.playlist.getCurrentClip() && a.playlist.getCurrentClip().rtmp || a.playlist.getCurrentClip() && a.playlist.getCurrentClip().m3u8 ? A.innerHTML = "LIVE" : a.media.getCurrentTime() && a.media.getDuration() && (A.innerHTML = Codo().secsToTime(a.media.getCurrentTime()) + " / " + Codo().secsToTime(a.media.getDuration())))
                }
                var i, j, k = !1,
                    l = !1,
                    m = 100,
                    n = function(b) {
                        switch (b) {
                            case "in":
                                clearTimeout(i), clearTimeout(j), m = 100, o.style.opacity = m / 100, o.style.filter = "alpha(opacity=" + m + ")";
                                break;
                            case "out":
                                j = setTimeout(function() {
                                    i = setInterval(function() {
                                        m >= 0 && 0 == k ? (o.style.opacity = m / 100, o.style.filter = "alpha(opacity=" + m + ")", m -= 10) : (clearInterval(i), clearTimeout(j))
                                    }, 20)
                                }, 1e3 * a.settings.controls.hideDelay)
                        }
                    },
                    o = a.DOM.controls = Codo(a.DOM.container).add({
                        el: "div",
                        className: a.className + "-controls-wrap",
                        style: "display: none;"
                    });
                "never" != a.settings.controls.show && (o.style.display = "block"), Codo(o).on("mouseover", function() {
                    l = !0
                }), Codo(o).on("mouseout", function() {
                    l = !1
                });
                var p = (Codo(o).add({
                    el: "div",
                    id: a.id + "-controls-shade",
                    className: a.className + "-controls-shade"
                }), Codo(o).add({
                    el: "div",
                    id: a.id + "-controls",
                    className: a.className + "-controls"
                }));
                if (a.settings.controls.play) {
                    var q = Codo(p).add({
                        el: "div",
                        className: a.className + "-controls-play-button"
                    });
                    Codo(q).on(d, function(b) {
                        b.stopPropagation && b.preventDefault && (b.stopPropagation(), b.preventDefault()), a.media.toggle && (a.settings.preload ? a.media.toggle() : (a.system.initClickMade ? a.media.toggle() : (a.media.toggle(), Codo().isTouch() && a.media.getParent().play()), a.system.initClickMade = !0))
                    })
                }
                if (a.settings.controls.title) var r = Codo(p).add({
                    el: "div",
                    id: a.id + "-controls-title-text",
                    className: a.className + "-controls-title-text"
                });
                if (a.settings.controls.fullscreen) {
                    var s = Codo(p).add({
                        el: "div",
                        className: a.className + "-controls-fullscreen-off-button"
                    });
                    Codo(s).on(d, function(b) {
                        b.stopPropagation && b.preventDefault && (b.stopPropagation(), b.preventDefault()), a.media.toggleFullScreen && a.media.toggleFullScreen(b)
                    })
                }
                var t = !1;
                if (a.settings.controls.volume) {
                    var u = Codo(p).add({
                            el: "div",
                            className: a.className + "-controls-volume-" + a.settings.controls.volume
                        }),
                        v = Codo(u).add({
                            el: "div",
                            className: a.className + "-controls-volume-" + a.settings.controls.volume + "-bar"
                        }),
                        w = Codo(v).add({
                            el: "div",
                            className: a.className + "-controls-volume-handle"
                        });
                    Codo(u).on("mousedown", function(a) {
                        t = !0, f(a)
                    }), Codo(w).on("dblclick", function() {
                        b()
                    })
                }
                var x, y;
                if (a.settings.controls.hd) var z = function() {
                    function b(b) {
                        b ? (Codo(e).addClass("active"), a.playlist.getCurrentClip().priority = "srcHD", a.playlist.same("srcHD"), c = b) : (Codo(e).removeClass("active"), a.playlist.getCurrentClip().priority = "src", a.playlist.same("src"), c = b)
                    }
                    var c = "srcHD" === a.settings.priority ? !0 : !1,
                        e = Codo(p).add({
                            el: "div",
                            className: a.className + "-controls-hd-text",
                            innerHTML: "HD",
                            style: "display: none;"
                        });
                    return Codo(e).on(d, function(a) {
                        a.stopPropagation && a.preventDefault && (a.stopPropagation(), a.preventDefault()), c ? (b(!1), c = !1) : (b(!0), c = !0)
                    }), {
                        on: function() {
                            c = !0, Codo(e).addClass("active")
                        },
                        off: function() {
                            c = !1, Codo(e).removeClass("active")
                        },
                        show: function() {
                            e.style.display = "block"
                        },
                        hide: function() {
                            e.style.display = "none"
                        },
                        setHD: function(a) {
                            b(a)
                        }
                    }
                }();
                if (a.settings.controls.time) var A = Codo(p).add({
                    el: "div",
                    className: a.className + "-controls-time-text",
                    innerHTML: Codo().secsToTime(0) + " / " + Codo().secsToTime(0)
                });
                var B = !1;
                if (a.settings.controls.seek) {
                    {
                        var C = Codo(p).add({
                                el: "div",
                                className: a.className + "-controls-seek"
                            }),
                            D = Codo(C).add({
                                el: "div",
                                className: a.className + "-controls-seek-buffer-bar",
                                style: "width: 0px;"
                            }),
                            E = Codo(C).add({
                                el: "div",
                                className: a.className + "-controls-seek-progress-bar",
                                style: "width: 0px;"
                            });
                        Codo(E).add({
                            el: "div",
                            className: a.className + "-controls-seek-handle"
                        })
                    }
                    Codo(C).on("mousedown", function(b) {
                        a.media.isMetaDataLoaded && a.media.isMetaDataLoaded() && a.settings.controls.seeking && (B = !0, a.media.setCurrentTime && a.media.setCurrentTime(V.seek(b)))
                    })
                }
                Codo(document).on("mouseup", function(b) {
                    t = !1, B && a.settings.controls.seeking && (a.media.setCurrentTime && a.media.setCurrentTime(V.seek(b)), B = !1)
                });
                var F;
                return Codo(document).on("mousemove", function(b) {
                    B && V.seek(b), t && f(b);
                    var c, d, e, g, h = Codo().mouse(b).x - Codo().scrollX(),
                        i = Codo().mouse(b).y - Codo().scrollY();
                    X.getState() ? (c = 0, d = 0, e = Codo().screen().width, g = Codo().screen().height) : (c = Codo(a.DOM.container).getTop(), d = Codo(a.DOM.container).getLeft(), e = d + a.settings.currentWidth, g = c + a.settings.currentHeight), h >= d && e >= h && i >= c && g >= i ? (a.settings.controls.seek && Codo(C).addClass("hover"), !k && a.system.initClickMade && (k = !0, n("in")), clearTimeout(F), "always" != a.settings.controls.show && !l && X.getState() && (F = setTimeout(function() {
                        k = !1, n("out")
                    }, 500))) : (a.settings.controls.seek && Codo(C).removeClass("hover"), k && !l && a.system.initClickMade && a.playlist.getCurrentClip() && "always" != a.settings.controls.show && "audio" != a.playlist.getCurrentClip().mediaType && (k = !1, clearTimeout(F), n("out")))
                }), {
                    reset: function() {
                        E && (E.style.width = 0), D && (D.style.width = 0)
                    },
                    on: function() {
                        "never" != a.settings.controls.show && (n("in"), "always" != a.settings.controls.show && a.system.initClickMade && n("out"))
                    },
                    off: function(a) {
                        "nofade" != a ? n("out") : o.style.display = "none"
                    },
                    play: function() {
                        a.settings.controls.play && Codo(q).addClass(a.className + "-controls-pause-button")
                    },
                    pause: function() {
                        a.settings.controls.play && Codo(q).removeClass(a.className + "-controls-pause-button")
                    },
                    title: function(b) {
                        if (a.settings.controls.title && r) {
                            if (!b) return r.innerHTML;
                            r.innerHTML = b
                        }
                    },
                    time: function() {
                        h()
                    },
                    hd: a.settings.controls.hd ? z : void 0,
                    progress: function(b) {
                        if (a.settings.controls.seek && !B) {
                            var c = b ? a.media.getDuration() : .1;
                            if (E && c && a.playlist.getCurrentClip()) {
                                var d = a.playlist.getCurrentClip().rtmp ? 0 : Codo(C).getWidth() * (b || 0) / c;
                                E.style.width = d + "px"
                            }
                            h()
                        }
                    },
                    buffer: function(b) {
                        if (a.settings.controls.seek) {
                            var c = b ? a.media.getDuration() : .1;
                            D && c && (D.style.width = Codo(C).getWidth() * (b || 0) / c + "px")
                        }
                    },
                    seek: function(b) {
                        if (a.settings.controls.seek && !a.playlist.getCurrentClip().rtmp) {
                            var c;
                            if (a.media.getDuration) {
                                var d = Codo().mouse(b).x - Codo(C).getLeft();
                                c = a.media.getDuration() * d / Codo(C).getWidth(), d >= 0 && d <= C.offsetWidth && (E.style.width = d + "px", a.settings.controls.time && c && a.media.getDuration() && (A.innerHTML = Codo().secsToTime(c) + " / " + Codo().secsToTime(a.media.getDuration())))
                            }
                            return c
                        }
                    },
                    setVolume: function(b) {
                        a.settings.controls.volume && g(b || "0")
                    },
                    showFullScreen: function() {
                        a.settings.controls.fullscreen && Codo(s).addClass(a.className + "-controls-fullscreen-on-button")
                    },
                    hideFullScreen: function() {
                        a.settings.controls.fullscreen && Codo(s).removeClass(a.className + "-controls-fullscreen-on-button")
                    }
                }
            },
            E = function() {
                var a, b, c, d = 0,
                    g = 10,
                    h = !1,
                    i = Codo(M.DOM.container).add({
                        el: "div",
                        id: M.id + "-loading-wrap",
                        className: M.className + "-loading-wrap",
                        style: "position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: #000; opacity: 0; filter: alpha(opacity=0); visibility: hidden;"
                    }),
                    j = new Image;
                j.src = e ? M.settings.loader : f, j.onload = function() {
                    a = j.width, b = j.height, c = Codo(i).add({
                        el: "img",
                        src: j.src,
                        style: "position: absolute; top: " + (M.settings.currentHeight / 2 - b / 2) + "px; left: " + (M.settings.currentWidth / 2 - a / 2) + "px;"
                    })
                }, j.onerror = function() {
                    h = !0, j = null, c = Codo(c).remove()
                };
                var k;
                return {
                    getImage: function() {
                        return j
                    },
                    resize: function(d, e) {
                        c && (c.style.top = e / 2 - b / 2 + "px", c.style.left = d / 2 - a / 2 + "px")
                    },
                    on: function() {
                        clearInterval(k), T && T.getState() && T.off();
                        var a = 80;
                        i.style.opacity = d / 100, i.style.filter = "alpha(opacity=" + d + ")", i.style.visibility = "visible", k = setInterval(function() {
                            a > d ? (d += g, i.style.opacity = d / 100, i.style.filter = "alpha(opacity=" + d + ")") : (i.style.opacity = a / 100, i.style.filter = "alpha(opacity=" + a + ")", clearInterval(k))
                        }, 20)
                    },
                    off: function(a) {
                        clearInterval(k), "cover" == a && T && !T.getState() && T.on();
                        var b = 0;
                        i.style.opacity = d / 100, i.style.filter = "alpha(opacity=" + d + ")", k = setInterval(function() {
                            d > b ? (d -= g, i.style.opacity = d / 100, i.style.filter = "alpha(opacity=" + d + ")") : (i.style.opacity = b / 100, i.style.filter = "alpha(opacity=" + b + ")", i.style.visibility = "hidden", clearInterval(k))
                        }, 20)
                    }
                }
            },
            F = function() {
                function a() {
                    M.media.toggle && (M.settings.preload ? M.media.toggle() : (M.system.initClickMade ? M.media.toggle() : (M.media.toggle(), T.off(), S && S.on(), Codo().isTouch() && M.media.getParent().play()), M.system.initClickMade = !0))
                }
                var b, c, e, g, h = !1,
                    i = 0,
                    j = 25,
                    k = M.DOM.overlay = Codo(M.DOM.container).add({
                        el: "div",
                        className: M.className + "-overlay-wrap",
                        style: "position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
                    });
                Codo(k).on(d, function(b) {
                    b.stopPropagation && b.preventDefault && (b.stopPropagation(), b.preventDefault()), a()
                });
                var l = Codo(k).add({
                    el: "div",
                    className: M.className + "-overlay-wrap-bg",
                    style: "position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity:0; filter: alpha(opacity=0); visibility: hidden; cursor: pointer;"
                });
                if (M.settings.controls.playBtn) {
                    var m = Codo(l).add({
                            el: "div",
                            className: M.className + "-overlay-play-button",
                            style: "cursor: pointer;"
                        }),
                        n = Codo(M.DOM.container).add({
                            el: "div",
                            className: M.className + "-overlay-menu",
                            style: "position: absolute; min-width: 200px; max-width: 80%; max-height: 60%; vertical-align: middle; font-size: 20px; text-shadow: 0px 0px 1px #000; background: black; background: rgba(0,0,0,.8); visibility: hidden; text-align: center;"
                        }),
                        o = Codo(n).add({
                            el: "div",
                            className: M.className + "-overlay--menu-title",
                            style: "line-height: 20px; padding: 0 2px; background: #454545; text-align: right; cursor: pointer;",
                            innerHTML: "&#10006;"
                        });
                    Codo(o).on(d, function(a) {
                        a.stopPropagation && a.preventDefault && (a.stopPropagation(), a.preventDefault()), Codo(n).fadeOut(20)
                    });
                    var p = (Codo(n).add({
                        el: "a",
                        href: "http://codoplayer.com/?ref=" + location.href,
                        target: "_blank",
                        style: "position: relative; width: 100%; color: white; background: url(" + f + ") no-repeat center 20px; margin: 0; padding: 50px 0 20px; text-decoration: none; display: block;",
                        innerHTML: "2.1 Free"
                    }), setInterval(function() {
                        b = Codo(m).getWidth(), c = Codo(m).getHeight(), e = Codo(n).getWidth(), g = Codo(n).getHeight(), b > 0 && c > 0 && (m.style.top = (M.settings.currentHeight - c) / 2 + "px", m.style.left = (M.settings.currentWidth - b) / 2 + "px", n.style.top = (M.settings.currentHeight - g) / 2 + "px", n.style.left = (M.settings.currentWidth - e) / 2 + "px", clearInterval(p))
                    }, 20));
                    setTimeout(function() {
                        clearInterval(p)
                    }, 3e4)
                }
                var q;
                return {
                    resize: function(a, d) {
                        m && b && c && (m.style.top = (d - c) / 2 + "px", m.style.left = (a - b) / 2 + "px", n.style.top = (d - g) / 2 + "px", n.style.left = (a - e) / 2 + "px")
                    },
                    menu: function() {
                        Codo(n).fadeIn(20)
                    },
                    on: function() {
                        clearInterval(q), h = !0;
                        var a = 100;
                        l.style.opacity = i / 100, l.style.filter = "alpha(opacity=" + i + ")", l.style.visibility = "visible", q = setInterval(function() {
                            a > i ? (i += j, l.style.opacity = i / 100, l.style.filter = "alpha(opacity=" + i + ")") : (l.style.opacity = a / 100, l.style.filter = "alpha(opacity=" + a + ")", clearInterval(q))
                        }, 20)
                    },
                    off: function() {
                        clearInterval(q), h = !1;
                        var a = 0;
                        l.style.opacity = i / 100, l.style.filter = "alpha(opacity=" + i + ")", q = setInterval(function() {
                            i > a ? (i -= j, l.style.opacity = i / 100, l.style.filter = "alpha(opacity=" + i + ")") : (l.style.opacity = a / 100, l.style.filter = "alpha(opacity=" + a + ")", l.style.visibility = "hidden", clearInterval(q))
                        }, 20)
                    },
                    getState: function() {
                        return h
                    }
                }
            },
            G = function(a) {
                Codo(a.DOM.container).add({
                    el: "div",
                    id: a.id + "-error-wrap",
                    className: a.className + "-error-wrap",
                    style: "position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: none;"
                });
                return {
                    on: function(b) {
                        b = b || "", Codo().log("Error: " + b), V.title("Error: " + b), e && S && S.off();
                        var c = a.playlist.getCurrentClip();
                        if (c && c.hasNext && !a.system.initPlayMade) var d = setTimeout(function() {
                            c.id == a.playlist.getCurrentClip().id && (a.system.firstClipOver = !0, a.playlist.next(), clearTimeout(d))
                        }, 3e3)
                    },
                    off: function() {}
                }
            },
            H = function() {
                return {
                    resize: function(a, b, c, d) {
                        var e = b / c,
                            f = M.settings.currentWidth / M.settings.currentHeight,
                            g = M.settings.mediaWidth = f > e ? M.settings.currentHeight * e : M.settings.currentWidth,
                            h = M.settings.mediaHeight = f > e ? M.settings.currentHeight : M.settings.currentWidth / e;
                        d || X.getState() || (M.DOM.parent.style.width = M.DOM.container.style.width = M.settings.currentWidth + "px", M.DOM.parent.style.minHeight = M.DOM.container.style.height = M.settings.currentHeight + "px"), a && (a.width = g, a.height = h, a.style.width = g + "px", a.style.height = h + "px", a.style.top = M.settings.currentHeight / 2 - h / 2 + "px", a.style.left = M.settings.currentWidth / 2 - g / 2 + "px", a.resize && a.resize(g, h)), S && S.resize(M.settings.currentWidth, M.settings.currentHeight), T && T.resize(M.settings.currentWidth, M.settings.currentHeight)
                    }
                }
            },
            I = function(a) {
                function b(b, e) {
                    b ? (d = !0, a.DOM.container.requestFullScreen ? a.DOM.container.requestFullScreen() : a.DOM.container.mozRequestFullScreen ? a.DOM.container.mozRequestFullScreen() : a.DOM.container.webkitRequestFullScreen && a.DOM.container.webkitRequestFullScreen(), c && e ? (a.settings.currentWidth = screen.width, a.settings.currentHeight = screen.height) : (a.settings.currentWidth = Codo().screen().width, a.settings.currentHeight = Codo().screen().height), a.DOM.container.style.position = "fixed", a.DOM.container.style.top = "0px", a.DOM.container.style.left = "0px", a.DOM.container.style.width = "100%", a.DOM.container.style.height = "100%", a.DOM.container.style.zIndex = 999999999, V && V.showFullScreen()) : (d = !1, document.cancelFullScreen ? document.cancelFullScreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitCancelFullScreen && document.webkitCancelFullScreen(), a.settings.currentWidth = a.settings.width, a.settings.currentHeight = a.settings.height, a.DOM.container.style.position = "relative", a.DOM.container.style.width = a.settings.currentWidth + "px", a.DOM.container.style.height = a.settings.currentHeight + "px", a.DOM.container.style.zIndex = 0, V && V.hideFullScreen()), !a.settings.preload && !a.system.initPlayMade || "audio" == a.playlist.getCurrentClip().mediaType ? N.resize(a.media.getPoster(), a.settings.mediaWidth, a.settings.mediaHeight, "fullscreen") : "video" == a.playlist.getCurrentClip().mediaType && N.resize(a.media.getParent(), a.settings.mediaWidth, a.settings.mediaHeight, "fullscreen"), a.system.isFullScreen = d
                }
                var c, d = !1;
                return a.DOM.container.requestFullScreen ? c = "f" : a.DOM.container.mozRequestFullScreen ? c = "moz" : a.DOM.container.webkitRequestFullScreen && (c = "webkit"), c && Codo(document).on(c + "fullscreenchange", function() {
                    var b = !1;
                    document.fullscreenElement ? b = !0 : document.mozFullScreenElement ? b = !0 : document.webkitFullscreenElement && (b = !0), b || a.media.fullScreenExit()
                }), {
                    on: function(a) {
                        b(!0, a)
                    },
                    off: function(a) {
                        b(!1, a)
                    },
                    getState: function() {
                        return d
                    }
                }
            },
            J = function(a, b, c) {
                function d() {
                    K(), mb = !1, pb = !1, qb = !1, rb = !1, S && S.on(), V.title(M.settings.controls.loadingText), V.setVolume(M.settings.volume || "0"), setTimeout(function() {
                        jb.src = a.activeUrl.search("relative://") > -1 ? M.system.rootPath + a.activeUrl.replace("relative://", "") : a.activeUrl, jb.load(), L(), Codo().isTouch() && ab()
                    }, 500)
                }

                function e() {
                    lb ? g() : f()
                }

                function f() {
                    mb ? (M.system.initClickMade = M.system.initPlayMade = lb = !0, jb.play(), V.play()) : M.settings.preload || d(M.playlist.getCurrentClip())
                }

                function g() {
                    mb && (lb = !1, jb.pause(), V.pause())
                }

                function B(a) {
                    mb ? jb.volume = a / 100 : (M.settings.volume = a, V.setVolume(a || "0"))
                }

                function C() {
                    return mb ? Math.round(100 * jb.volume) : void 0
                }

                function D() {
                    return mb ? jb.duration : void 0
                }

                function E(a) {
                    mb && (jb.currentTime = a)
                }

                function F() {
                    return jb.currentTime || "0"
                }

                function G(a) {
                    X.getState() ? I(a) : H(a)
                }

                function H(a) {
                    X.on(a), ub.once(), bb()
                }

                function I(a) {
                    X.off(a), ub.once(), cb()
                }

                function J() {
                    ub.end(), M.media = {}, Codo(jb).off("loadedmetadata", ab), Codo(jb).off("play", O), Codo(jb).off("pause", P), Codo(jb).off("ended", Q), Codo(jb).off("progress", U), Codo(jb).off("seeking", Z), Codo(jb).off("seeked", $), Codo(jb).off("volumechange", R), Codo(jb).off("error", _), kb && Codo(kb).remove(), jb && Codo(jb).remove()
                }

                function K() {
                    for (var a = 0; a < h.length; a++) h[a] && h[a]()
                }

                function L() {
                    for (var a = 0; a < i.length; a++) i[a] && i[a](M)
                }

                function O() {
                    if (mb) {
                        lb = !0, T && T.off(), ob || V.play(), ub.start(), pb || (pb = !0, db());
                        for (var a = 0; a < k.length; a++) k[a] && k[a](jb.currentTime)
                    }
                }

                function P() {
                    if (mb && nb.duration - jb.currentTime > .1) {
                        lb = !1, ob || (T && T.on(), V.pause());
                        for (var a = 0; a < l.length; a++) l[a] && l[a](jb.currentTime)
                    }
                }

                function Q() {
                    lb = !1, M.system.firstClipOver = !0, V.pause(), ub.end(), S && S.on(), hb(), M.playlist.next();
                    for (var a = 0; a < m.length; a++) m[a] && m[a]()
                }

                function R() {
                    M.settings.volume = C(), V.setVolume(M.settings.volume || "0");
                    for (var a = 0; a < r.length; a++) r[a] && r[a](M.settings.volume)
                }

                function U() {
                    if (mb) try {
                        V.buffer(jb.buffered.end(0));
                        for (var a = 0; a < o.length; a++) o[a] && o[a](jb.buffered.end(0))
                    } catch (b) {}
                }

                function Y() {
                    if (jb.currentTime) {
                        V.progress(jb.currentTime);
                        for (var a = 0; a < n.length; a++) n[a] && n[a](jb.currentTime)
                    }
                }

                function Z() {
                    ub.end();
                    for (var a = 0; a < p.length; a++) p[a] && p[a](jb.currentTime)
                }

                function $() {
                    ub.start();
                    for (var a = 0; a < q.length; a++) q[a] && q[a](jb.currentTime)
                }

                function _() {
                    lb = !1, ub.end();
                    var a = b + " not found";
                    W.on(a);
                    for (var c = 0; c < u.length; c++) u[c] && u[c](a)
                }

                function ab() {
                    if (mb = !0, "video" == b) nb.width = jb.videoWidth || M.settings.currentWidth, nb.height = jb.videoHeight || M.settings.currentHeight, nb.duration = jb.duration, kb && (kb = Codo(kb).remove()), N.resize(jb, nb.width, nb.height);
                    else if ("audio" == b && (nb.duration = jb.duration, a.poster)) {
                        var d = new Image;
                        d.src = a.poster, d.onload = function() {
                            nb.width = d.width, nb.height = d.height, kb && (kb = Codo(kb).remove()), kb = Codo(sb).add({
                                el: "img",
                                src: d.src,
                                style: "position: absolute; top: 0; left: 0;"
                            }), N.resize(kb, d.width, d.height)
                        }
                    }
                    "0" !== M.playlist.breakTime && E(M.playlist.breakTime), c ? f() : M.system.firstClipOver ? (a.hasPrevious || M.settings.loop) && f() : (!M.settings.preload || M.settings.autoplay) && f(), lb ? S && S.off() : S && S.off("cover"), V.title(a.title || " "), V.time(), jb.volume = M.settings.volume / 100, ub.once();
                    for (var e = 0; e < j.length; e++) j[e] && j[e](nb)
                }

                function bb() {
                    for (var a = 0; a < s.length; a++) s[a] && s[a]()
                }

                function cb() {
                    for (var a = 0; a < t.length; a++) t[a] && t[a]()
                }

                function db() {
                    for (var a = 0; a < v.length; a++) v[a] && v[a]()
                }

                function eb() {
                    for (var a = 0; a < w.length; a++) w[a] && w[a]()
                }

                function fb() {
                    for (var a = 0; a < x.length; a++) x[a] && x[a]()
                }

                function gb() {
                    for (var a = 0; a < y.length; a++) y[a] && y[a]()
                }

                function hb() {
                    for (var a = 0; a < z.length; a++) z[a] && z[a]()
                }

                function ib() {
                    for (var a = 0; a < A.length; a++) A[a] && A[a]()
                }
                var jb, kb, lb = !1,
                    mb = !1,
                    nb = {},
                    ob = !1,
                    pb = !1,
                    qb = !1,
                    rb = !1,
                    sb = M.DOM.containerScreenCanvas;
                if (sb.innerHTML = "", jb = Codo(sb).add({
                        el: b,
                        style: "position: absolute; top: 0; left: 0;"
                    }), Codo(sb).add({
                        el: "div",
                        style: "position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
                    }), M.settings.preload || M.system.initClickMade) d();
                else {
                    if (a.poster) {
                        var tb = new Image;
                        tb.src = a.poster, tb.onload = function() {
                            kb = Codo(sb).add({
                                el: "img",
                                src: tb.src,
                                style: "position: absolute; top: 0; left: 0;"
                            }), N.resize(kb, tb.width, tb.height), M.settings.responsive && M.resize()
                        }
                    }
                    V.title(a.title || " "), S && S.off("cover")
                }
                var ub = function() {
                    var b;
                    return {
                        start: function() {
                            clearInterval(b);
                            var c, d;
                            b = setInterval(function() {
                                U(), Y();
                                var b = Math.round(jb.duration),
                                    e = Math.round(jb.currentTime),
                                    f = Math.round(b / 4),
                                    g = Math.round(b / 2),
                                    h = Math.round(b - b / 4);
                                switch (qb && e > (c || f) && (qb = !1), rb && e > d && (rb = !1), e) {
                                    case Math.round(b / 4):
                                        qb || (qb = !0, c = f, eb());
                                        break;
                                    case Math.round(b / 2):
                                        qb || (qb = !0, c = g, fb());
                                        break;
                                    case Math.round(b - b / 4):
                                        qb || (qb = !0, c = h, gb())
                                }
                                a.cuepoints && !rb && -1 != a.cuepoints.indexOf(e) && (rb = !0, d = a.cuepoints[a.cuepoints.indexOf(e)], ib())
                            }, 20)
                        },
                        end: function() {
                            clearInterval(b)
                        },
                        once: function() {
                            U(), Y()
                        }
                    }
                }();
                return Codo(jb).on("loadedmetadata", ab), Codo(jb).on("play", O), Codo(jb).on("pause", P), Codo(jb).on("ended", Q), Codo(jb).on("progress", U), Codo(jb).on("seeking", Z), Codo(jb).on("seeked", $), Codo(jb).on("volumechange", R), Codo(jb).on("error", _), {
                    platformName: "video" == b ? "videoHTML5" : "audioHTML5",
                    isPlaying: function() {
                        return lb
                    },
                    isMetaDataLoaded: function() {
                        return mb
                    },
                    onBeforeLoad: function(a) {
                        a && h.push(a)
                    },
                    onLoad: function(a) {
                        a && i.push(a)
                    },
                    onMetaData: function(a) {
                        a && j.push(a)
                    },
                    onPlay: function(a) {
                        a && k.push(a)
                    },
                    onPause: function(a) {
                        a && l.push(a)
                    },
                    onEnd: function(a) {
                        a && m.push(a)
                    },
                    onBuffer: function(a) {
                        a && o.push(a)
                    },
                    onProgress: function(a) {
                        a && n.push(a)
                    },
                    onSeekStart: function(a) {
                        a && p.push(a)
                    },
                    onSeekEnd: function(a) {
                        a && q.push(a)
                    },
                    onVolumeChange: function(a) {
                        a && r.push(a)
                    },
                    onFullScreenEnter: function(a) {
                        a && s.push(a)
                    },
                    onFullScreenExit: function(a) {
                        a && t.push(a)
                    },
                    onError: function(a) {
                        a && u.push(a)
                    },
                    getParent: function() {
                        return jb
                    },
                    getPoster: function() {
                        return kb
                    },
                    toggle: function() {
                        e()
                    },
                    play: function(b, e) {
                        b ? (a = b, c = e, d()) : f()
                    },
                    pause: function() {
                        g()
                    },
                    setVolume: function(a) {
                        B(a)
                    },
                    getVolume: function() {
                        return C()
                    },
                    getDuration: function() {
                        return D()
                    },
                    setCurrentTime: function(a) {
                        E(a)
                    },
                    getCurrentTime: function() {
                        return F()
                    },
                    toggleFullScreen: function(a) {
                        G(a)
                    },
                    fullScreenEnter: function() {
                        H()
                    },
                    fullScreenExit: function() {
                        I()
                    },
                    destroy: function() {
                        J()
                    },
                    onClipBegin: function(a) {
                        a && v.push(a)
                    },
                    onClipFirstQuarter: function(a) {
                        a && w.push(a)
                    },
                    onClipSecondQuarter: function(a) {
                        a && x.push(a)
                    },
                    onClipThirdQuarter: function(a) {
                        a && y.push(a)
                    },
                    onClipEnd: function(a) {
                        a && z.push(a)
                    },
                    onCuepoint: function(a) {
                        a && A.push(a)
                    }
                }
            },
            K = function(a, b, c) {
                function d() {
                    mb.initClip(M.settings, M.playlist.getCurrentClip()), a.rtmp || f()
                }

                function e() {
                    f()
                }

                function f() {
                    if (M.settings.preload || M.system.initClickMade) g();
                    else {
                        if (a.poster) {
                            var b = new Image;
                            b.src = a.poster, b.onload = function() {
                                nb = Codo(vb).add({
                                    el: "img",
                                    src: b.src,
                                    style: "position: absolute; top: 0; left: 0;"
                                }), N.resize(nb, b.width, b.height), M.settings.responsive && M.resize()
                            }
                        }
                        V.title(a.title || " "), S && S.off("cover")
                    }
                }

                function g() {
                    P(), pb = !1, sb = !1, tb = !1, ub = !1, S && S.on(), V.title(M.settings.controls.loadingText), V.setVolume(M.settings.volume || "0"), mb.setSrc(a.activeUrl.search("relative://") > -1 ? M.system.rootPath + a.activeUrl.replace("relative://", "") : a.activeUrl), Q(), Codo().isTouch() && db()
                }

                function B() {
                    ob ? D() : C()
                }

                function C() {
                    pb ? (M.system.initClickMade = M.system.initPlayMade = ob = !0, mb.playClip(), a.rtmp && R(), V.play()) : M.settings.preload || g(M.playlist.getCurrentClip())
                }

                function D() {
                    pb && (ob = !1, mb.pauseClip(), a.rtmp && U(), V.pause())
                }

                function E(a) {
                    pb ? mb.setVolume(a / 100 || "0") : (M.settings.volume = a, V.setVolume(a || "0")), bb(a)
                }

                function F() {
                    return pb ? Math.round(100 * mb.getVolume()) : void 0
                }

                function G() {
                    return pb && mb.getDuration ? mb.getDuration() : void 0
                }

                function H(a) {
                    pb && mb.setCurrentTime(a)
                }

                function I() {
                    return mb.getCurrentTime ? mb.getCurrentTime() || "0" : void 0
                }

                function J(a) {
                    X.getState() ? L(a) : K(a)
                }

                function K(a) {
                    X.on(a), wb.once(), eb()
                }

                function L(a) {
                    X.off(a), wb.once(), fb()
                }

                function O() {
                    wb.end(), M.API = {}, nb && Codo(nb).remove(), mb && Codo(mb).remove()
                }

                function P() {
                    for (var a = 0; a < h.length; a++) h[a] && h[a]()
                }

                function Q() {
                    for (var a = 0; a < i.length; a++) i[a] && i[a]()
                }

                function R() {
                    if (pb) {
                        ob = !0, T && T.off(), rb || V.play(), wb.start(), sb || (sb = !0, gb());
                        for (var a = 0; a < k.length; a++) k[a] && k[a](mb.getCurrentTime())
                    }
                }

                function U() {
                    if (pb) {
                        ob = !1, rb || (T && T.on(), V.pause());
                        for (var a = 0; a < l.length; a++) l[a] && l[a](mb.getCurrentTime())
                    }
                }

                function Y() {
                    ob = !1, M.system.firstClipOver = !0, V.pause(), wb.end(), S && S.on(), kb(), M.playlist.next();
                    for (var a = 0; a < m.length; a++) m[a] && m[a]()
                }

                function Z(a) {
                    if (pb) {
                        V.buffer(a);
                        for (var b = 0; b < o.length; b++) o[b] && o[b](a)
                    }
                }

                function $() {
                    if (mb.getCurrentTime && mb.getCurrentTime()) {
                        V.progress(mb.getCurrentTime());
                        for (var a = 0; a < n.length; a++) n[a] && mb.getCurrentTime && n[a](mb.getCurrentTime())
                    }
                }

                function _() {
                    wb.end();
                    for (var a = 0; a < p.length; a++) p[a] && p[a](mb.getCurrentTime())
                }

                function ab() {
                    wb.start();
                    for (var a = 0; a < q.length; a++) q[a] && q[a](mb.getCurrentTime())
                }

                function bb(a) {
                    M.settings.volume = a, V.setVolume(a || "0");
                    for (var b = 0; b < r.length; b++) r[b] && r[b](M.settings.volume)
                }

                function cb() {
                    ob = !1, wb.end();
                    var a = b + " not found";
                    W.on(a);
                    for (var c = 0; c < u.length; c++) u[c] && u[c](a)
                }

                function db(d) {
                    if (pb = !0, "video" == b) qb = d, nb && (nb = Codo(nb).remove()), N.resize(mb, qb.width, qb.height);
                    else if ("audio" == b && a.poster) {
                        var e = new Image;
                        e.src = a.poster, e.onload = function() {
                            qb.width = e.width, qb.height = e.height, nb && (nb = Codo(nb).remove()), nb = Codo(vb).add({
                                el: "img",
                                src: e.src,
                                style: "position: absolute; top: 0; left: 0;"
                            }), N.resize(nb, e.width, e.height)
                        }
                    }
                    "0" !== M.playlist.breakTime && H(M.playlist.breakTime), c ? C() : M.system.firstClipOver ? (a.hasPrevious || M.settings.loop) && C() : (!M.settings.preload || M.settings.autoplay) && C(), ob ? S && S.off() : S && S.off("cover"), V.title(a.title || " "), V.time(), mb.setVolume(M.settings.volume / 100 || "0"), wb.once();
                    for (var f = 0; f < j.length; f++) j[f] && j[f](qb)
                }

                function eb() {
                    for (var a = 0; a < s.length; a++) s[a] && s[a]()
                }

                function fb() {
                    for (var a = 0; a < t.length; a++) t[a] && t[a]()
                }

                function gb() {
                    for (var a = 0; a < v.length; a++) v[a] && v[a]()
                }

                function hb() {
                    for (var a = 0; a < w.length; a++) w[a] && w[a]()
                }

                function ib() {
                    for (var a = 0; a < x.length; a++) x[a] && x[a]()
                }

                function jb() {
                    for (var a = 0; a < y.length; a++) y[a] && y[a]()
                }

                function kb() {
                    for (var a = 0; a < z.length; a++) z[a] && z[a]()
                }

                function lb() {
                    for (var a = 0; a < A.length; a++) A[a] && A[a]()
                }
                var mb, nb, ob = !1,
                    pb = !1,
                    qb = {},
                    rb = !1,
                    sb = !1,
                    tb = !1,
                    ub = !1,
                    vb = M.DOM.containerScreenCanvas;
                vb.innerHTML = "", Codo().isFlash() || W.on("Flash plugin not found"), vb.innerHTML = "<object id='" + M.id + "-" + b + "-swf' name='" + M.id + "-" + b + "-swf' width='" + M.settings.currentWidth + "' height='" + M.settings.currentHeight + "' type='application/x-shockwave-flash' data='" + M.system.rootPath + "module.swf' style='position: absolute; top: 0; left: 0;'><param name='movie' value='" + M.system.rootPath + "module.swf'><param name='quality' value='high'><param name='allowScriptAccess' value='always'><param name='swliveconnect' value='true'><param name='wmode' value='transparent'><param name='flashVars' value='instance=" + M.instance + "&mediaType=" + b + "'></object>", mb = Codo("#" + M.id + "-" + b + "-swf").get()[0], Codo(vb).add({
                    el: "div",
                    style: "position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: black; opacity: 0; filter: alpha(opacity=0);"
                });
                var wb = function() {
                    var b;
                    return {
                        start: function() {
                            clearInterval(b);
                            var c, d;
                            b = setInterval(function() {
                                if (mb.getDuration) {
                                    var b = Math.round(mb.getDuration());
                                    if (mb.getCurrentTime) {
                                        var e = Math.round(mb.getCurrentTime());
                                        $();
                                        var f = Math.round(b / 4),
                                            g = Math.round(b / 2),
                                            h = Math.round(b - b / 4);
                                        switch (tb && e > (c || f) && (tb = !1), ub && e > d && (ub = !1), e) {
                                            case Math.round(b / 4):
                                                tb || (tb = !0, c = f, hb());
                                                break;
                                            case Math.round(b / 2):
                                                tb || (tb = !0, c = g, ib());
                                                break;
                                            case Math.round(b - b / 4):
                                                tb || (tb = !0, c = h, jb())
                                        }
                                        a.cuepoints && !ub && -1 != a.cuepoints.indexOf(e) && (ub = !0, d = a.cuepoints[a.cuepoints.indexOf(e)], lb())
                                    }
                                }
                            }, 100)
                        },
                        end: function() {
                            clearInterval(b)
                        },
                        once: function() {
                            $()
                        }
                    }
                }();
                return {
                    platformName: "video" == b ? "videoSWF" : "audioSWF",
                    isPlaying: function() {
                        return ob
                    },
                    isMetaDataLoaded: function() {
                        return pb
                    },
                    onBeforeLoad: function(a) {
                        a && h.push(a)
                    },
                    onLoad: function(a) {
                        a && i.push(a)
                    },
                    onMetaData: function(a) {
                        a && j.push(a)
                    },
                    onPlay: function(a) {
                        a && k.push(a)
                    },
                    onPause: function(a) {
                        a && l.push(a)
                    },
                    onEnd: function(a) {
                        a && m.push(a)
                    },
                    onBuffer: function(a) {
                        a && o.push(a)
                    },
                    onProgress: function(a) {
                        a && n.push(a)
                    },
                    onSeekStart: function(a) {
                        a && p.push(a)
                    },
                    onSeekEnd: function(a) {
                        a && q.push(a)
                    },
                    onVolumeChange: function(a) {
                        a && r.push(a)
                    },
                    onFullScreenEnter: function(a) {
                        a && s.push(a)
                    },
                    onFullScreenExit: function(a) {
                        a && t.push(a)
                    },
                    onError: function(a) {
                        a && u.push(a)
                    },
                    system: {
                        onSwfLoaded: function() {
                            d()
                        },
                        onRtmpLoaded: function() {
                            e()
                        },
                        onPlay: function() {
                            R()
                        },
                        onPause: function() {
                            U()
                        },
                        onEnd: function() {
                            Y()
                        },
                        onWaiting: function() {
                            OnWaiting()
                        },
                        onSeekStart: function() {
                            _()
                        },
                        onSeekEnd: function() {
                            ab()
                        },
                        onBuffer: function(a) {
                            Z(a)
                        },
                        onMetaData: function(a) {
                            db(a)
                        },
                        onError: function() {
                            cb()
                        }
                    },
                    getParent: function() {
                        return mb
                    },
                    getPoster: function() {
                        return nb
                    },
                    toggle: function() {
                        B()
                    },
                    play: function(b, d) {
                        b ? (a = b, c = d, g()) : C()
                    },
                    pause: function() {
                        D()
                    },
                    setVolume: function(a) {
                        E(a)
                    },
                    getVolume: function() {
                        return F()
                    },
                    getDuration: function() {
                        return G()
                    },
                    setCurrentTime: function(a) {
                        H(a)
                    },
                    getCurrentTime: function() {
                        return I()
                    },
                    toggleFullScreen: function(a) {
                        J(a)
                    },
                    fullScreenEnter: function(a) {
                        K(a)
                    },
                    fullScreenExit: function(a) {
                        L(a)
                    },
                    destroy: function() {
                        O()
                    },
                    onClipBegin: function(a) {
                        a && v.push(a)
                    },
                    onClipFirstQuarter: function(a) {
                        a && w.push(a)
                    },
                    onClipSecondQuarter: function(a) {
                        a && x.push(a)
                    },
                    onClipThirdQuarter: function(a) {
                        a && y.push(a)
                    },
                    onClipEnd: function(a) {
                        a && z.push(a)
                    },
                    onCuepoint: function(a) {
                        a && A.push(a)
                    }
                }
            },
            L = function(a, b, c) {
                function d() {
                    sb && (K(), lb = !1, rb = !1, ob = !1, pb = !1, qb = !1, S && S.on(), V.title(M.settings.controls.loadingText), V.setVolume(M.settings.volume || "0"), setTimeout(function() {
                        hb.loadVideoById(a.activeUrl), L(), Codo().isTouch() && $()
                    }, 500))
                }

                function e() {
                    kb ? g() : f()
                }

                function f() {
                    lb ? (M.system.initClickMade = M.system.initPlayMade = kb = !0, hb.playVideo(), V.play()) : M.settings.preload || d(M.playlist.getCurrentClip())
                }

                function g() {
                    lb && (kb = !1, hb.pauseVideo(), V.pause())
                }

                function B(a) {
                    lb ? hb.setVolume(a) : (M.settings.volume = a, V.setVolume(a || "0")), R(a)
                }

                function C() {
                    return lb ? hb.getVolume() : void 0
                }

                function D() {
                    return lb ? hb.getDuration() : void 0
                }

                function E(a) {
                    lb && hb.seekTo(a)
                }

                function F() {
                    return hb.getCurrentTime() || "0"
                }

                function G(a) {
                    X.getState() ? I(a) : H(a)
                }

                function H(a) {
                    X.on(a), vb.once(), _()
                }

                function I(a) {
                    X.off(a), vb.once(), ab()
                }

                function J() {
                    vb.end(), M.API = {}, ib && Codo(ib).remove(), jb && Codo(jb).remove()
                }

                function K() {
                    for (var a = 0; a < h.length; a++) h[a] && h[a]()
                }

                function L() {
                    for (var a = 0; a < i.length; a++) i[a] && i[a]()
                }

                function O() {
                    if (lb) {
                        kb = !0, T && T.off(), nb || V.play(), vb.start(), ob || (ob = !0, bb());
                        for (var a = 0; a < k.length; a++) k[a] && k[a](hb.getCurrentTime())
                    }
                }

                function P() {
                    if (lb && hb.getDuration() - hb.getCurrentTime() > .1) {
                        kb = !1, nb || (T && T.on(), V.pause());
                        for (var a = 0; a < l.length; a++) l[a] && l[a](hb.getCurrentTime())
                    }
                }

                function Q() {
                    kb = !1, M.system.firstClipOver = !0, V.pause(), vb.end(), Loading.on(), fb(), M.playlist.next();
                    for (var a = 0; a < m.length; a++) m[a] && m[a]()
                }

                function R(a) {
                    M.settings.volume = a, V.setVolume(a || "0");
                    for (var b = 0; b < r.length; b++) r[b] && r[b](M.settings.volume)
                }

                function U() {
                    if (lb) {
                        V.buffer(100 * hb.getVideoLoadedFraction() * hb.getDuration() / 100);
                        for (var a = 0; a < o.length; a++) o[a] && o[a](100 * hb.getVideoLoadedFraction() * hb.getDuration() / 100)
                    }
                }

                function Y() {
                    if (hb.getCurrentTime && hb.getCurrentTime()) {
                        V.progress(hb.getCurrentTime());
                        for (var a = 0; a < n.length; a++) n[a] && n[a](hb.getCurrentTime())
                    }
                }

                function Z() {
                    kb = !1, vb.end();
                    var a = b + " not found";
                    W.on(a);
                    for (var c = 0; c < u.length; c++) u[c] && u[c](a)
                }

                function $() {
                    lb = !0, mb.width = M.settings.currentWidth, mb.height = M.settings.currentHeight, mb.duration = hb.getDuration(), ib && (ib = Codo(ib).remove()), N.resize(jb, mb.width, mb.height), hb.pauseVideo(), "0" !== M.playlist.breakTime && E(M.playlist.breakTime), c ? f() : M.system.firstClipOver ? (a.hasPrevious || M.settings.loop) && f() : (!M.settings.preload || M.settings.autoplay) && f(), kb ? S && S.off() : S && S.off("cover"), V.title(a.title || " "), V.time(), hb.setVolume(M.settings.volume), vb.once();
                    for (var b = 0; b < j.length; b++) j[b] && j[b](mb)
                }

                function _() {
                    for (var a = 0; a < s.length; a++) s[a] && s[a]()
                }

                function ab() {
                    for (var a = 0; a < t.length; a++) t[a] && t[a]()
                }

                function bb() {
                    for (var a = 0; a < v.length; a++) v[a] && v[a]()
                }

                function cb() {
                    for (var a = 0; a < w.length; a++) w[a] && w[a]()
                }

                function db() {
                    for (var a = 0; a < x.length; a++) x[a] && x[a]()
                }

                function eb() {
                    for (var a = 0; a < y.length; a++) y[a] && y[a]()
                }

                function fb() {
                    for (var a = 0; a < z.length; a++) z[a] && z[a]()
                }

                function gb() {
                    for (var a = 0; a < A.length; a++) A[a] && A[a]()
                }
                var hb, ib, jb, kb = !1,
                    lb = !1,
                    mb = {},
                    nb = !1,
                    ob = !1,
                    pb = !1,
                    qb = !1,
                    rb = !1,
                    sb = !1,
                    tb = M.DOM.containerScreenCanvas;
                tb.innerHTML = "", Codo(tb).add({
                    el: "div",
                    id: M.id + "-youtube-iframe",
                    style: "position: absolute; top: 0; left: 0;"
                }), Codo().script("//www.youtube.com/iframe_api");
                var ub = setInterval(function() {
                        YTiframeReady && (hb = new YT.Player(M.id + "-youtube-iframe", {
                            width: M.settings.currentWidth,
                            height: M.settings.currentHeight,
                            playerVars: {
                                controls: 0,
                                showinfo: 0
                            },
                            events: {
                                onReady: function() {
                                    if (sb = !0, jb = Codo("#" + M.id + "-youtube-iframe").get()[0], M.settings.preload || M.system.initClickMade) d();
                                    else {
                                        if (a.poster) {
                                            var b = new Image;
                                            b.src = a.poster, b.onload = function() {
                                                ib = Codo(tb).add({
                                                    el: "img",
                                                    src: b.src,
                                                    style: "position: absolute; top: 0; left: 0;"
                                                }), N.resize(ib, b.width, b.height), M.settings.responsive && M.resize()
                                            }
                                        }
                                        V.title(a.title || " "), S && S.off("cover")
                                    }
                                },
                                onStateChange: function(a) {
                                    switch (a.data) {
                                        case YT.PlayerState.PLAYING:
                                            lb ? O() : $();
                                            break;
                                        case YT.PlayerState.PAUSED:
                                            rb ? P() : rb = !0;
                                            break;
                                        case YT.PlayerState.ENDED:
                                            Q()
                                    }
                                },
                                onError: function(a) {
                                    Z(a)
                                }
                            }
                        }), clearInterval(ub))
                    }, 100),
                    vb = function() {
                        var b;
                        return {
                            start: function() {
                                clearInterval(b);
                                var c, d;
                                b = setInterval(function() {
                                    U(), Y();
                                    var b = Math.round(hb.getDuration()),
                                        e = Math.round(hb.getCurrentTime()),
                                        f = Math.round(b / 4),
                                        g = Math.round(b / 2),
                                        h = Math.round(b - b / 4);
                                    switch (pb && e > (c || f) && (pb = !1), qb && e > d && (qb = !1), e) {
                                        case Math.round(b / 4):
                                            pb || (pb = !0, c = f, cb());
                                            break;
                                        case Math.round(b / 2):
                                            pb || (pb = !0, c = g, db());
                                            break;
                                        case Math.round(b - b / 4):
                                            pb || (pb = !0, c = h, eb())
                                    }
                                    a.cuepoints && !qb && -1 != a.cuepoints.indexOf(e) && (qb = !0, d = a.cuepoints[a.cuepoints.indexOf(e)], gb())
                                }, 100)
                            },
                            end: function() {
                                clearInterval(b)
                            },
                            once: function() {
                                U(), Y()
                            }
                        }
                    }();
                return {
                    platformName: "YOUTUBE",
                    isPlaying: function() {
                        return kb
                    },
                    isMetaDataLoaded: function() {
                        return lb
                    },
                    onBeforeLoad: function(a) {
                        a && h.push(a)
                    },
                    onLoad: function(a) {
                        a && i.push(a)
                    },
                    onMetaData: function(a) {
                        a && j.push(a)
                    },
                    onPlay: function(a) {
                        a && k.push(a)
                    },
                    onPause: function(a) {
                        a && l.push(a)
                    },
                    onEnd: function(a) {
                        a && m.push(a)
                    },
                    onBuffer: function(a) {
                        a && o.push(a)
                    },
                    onProgress: function(a) {
                        a && n.push(a)
                    },
                    onSeekStart: function(a) {
                        a && p.push(a)
                    },
                    onSeekEnd: function(a) {
                        a && q.push(a)
                    },
                    onVolumeChange: function(a) {
                        a && r.push(a)
                    },
                    onFullScreenEnter: function(a) {
                        a && s.push(a)
                    },
                    onFullScreenExit: function(a) {
                        a && t.push(a)
                    },
                    onError: function(a) {
                        a && u.push(a)
                    },
                    getParent: function() {
                        return jb
                    },
                    getPoster: function() {
                        return ib
                    },
                    toggle: function() {
                        e()
                    },
                    play: function(b, e) {
                        b ? (a = b, c = e, d()) : f()
                    },
                    pause: function() {
                        g()
                    },
                    setVolume: function(a) {
                        B(a)
                    },
                    getVolume: function() {
                        return C()
                    },
                    getDuration: function() {
                        return D()
                    },
                    setCurrentTime: function(a) {
                        E(a)
                    },
                    getCurrentTime: function() {
                        return F()
                    },
                    toggleFullScreen: function(a) {
                        G(a)
                    },
                    fullScreenEnter: function(a) {
                        H(a)
                    },
                    fullScreenExit: function(a) {
                        I(a)
                    },
                    destroy: function() {
                        J()
                    },
                    onClipBegin: function(a) {
                        a && v.push(a)
                    },
                    onClipFirstQuarter: function(a) {
                        a && w.push(a)
                    },
                    onClipSecondQuarter: function(a) {
                        a && x.push(a)
                    },
                    onClipThirdQuarter: function(a) {
                        a && y.push(a)
                    },
                    onClipEnd: function(a) {
                        a && z.push(a)
                    },
                    onCuepoint: function(a) {
                        a && A.push(a)
                    }
                }
            },
            M = new g(b),
            N = new H(M);
        M.playlist = new C(M), Codo().link(M.system.rootPath + "styles/" + M.settings.style + "/style.css");
        var O = "position: relative; width: 100%; height: 100%; cursor: default; -webkit-touch-callout: none; -webkit-user-select: none; -khtml-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -webkit-font-smoothing: antialiased; visibility: hidden; overflow: hidden;";
        if (c) {
            if (!Codo(c).get()[0]) return;
            Codo(c).add({
                el: "div",
                id: M.id,
                className: M.className,
                style: O
            })
        } else document.write("<div id='" + M.id + "' class='" + M.className + "' style='" + O + "'></div>");
        var P = M.DOM.parent = document.getElementById(M.id);
        M.settings.width = M.settings.currentWidth = M.settings.width || Codo(P).getWidth(), M.settings.height = M.settings.currentHeight = M.settings.height || Codo().getVideoHeight(M.settings.width, M.settings.ratio[0], M.settings.ratio[1]), P.style.width = M.settings.width + "px", P.style.minHeight = M.settings.height + "px";
        var Q = Codo(P).add({
            el: "div",
            className: M.className + "-container",
            style: "position: relative; margin: 0; padding: 0; width: " + M.settings.width + "px; height: " + M.settings.height + "px;"
        });
        M.DOM.container = Q;
        var R = Codo(Q).add({
            el: "div",
            className: M.className + "-container-screen",
            style: "position: absolute; top: 0; left: 0; width: 100%; height: 100%; margin: 0; padding: 0; overflow: hidden;"
        });
        M.DOM.containerScreen = R, M.DOM.containerScreenCanvas = Codo(R).add({
            el: "div",
            className: M.className + "-container-screen-canvas",
            style: "position: absolute; top: 0; left: 0; width: 100%; height: 100%; margin: 0; padding: 0;"
        }), e && M.settings.logo && Codo(Q).add({
            el: "img",
            src: M.settings.logo,
            className: M.className + "-container-logo",
            style: "position: absolute; top: 20px; right: 20px;"
        });
        var S = !0,
            T = !0;
        S && (S = new E(M)), T && (T = new F(M)), !S && T && T.on();
        var U = new B(M),
            V = new D(M),
            W = new G(M),
            X = new I(M);
        Codo(M.DOM.parent).on("contextmenu", function(a) {
            a.preventDefault ? a.preventDefault() : a.returnValue, T && T.menu()
        }), M.plugins.advertising || M.playlist.set(a, M.settings.autoplay);
        var Y = 0,
            Z = 0;
        for (var $ in M.plugins) Y++;
        for (var $ in M.plugins) M.plugins[$] && Codo().script(M.system.rootPath + "plugins/" + $ + "/codo-player-" + $ + ".js", function(b, c) {
            "advertising" == c && (b ? (M.plugins[c].initCover = Codo(M.DOM.container).add({
                el: "div",
                className: M.className + "-advertising-init-cover",
                style: "position: absolute; top: 0; left: 0; width: 100%; height: 100%; visibility: visible; cursor: pointer; opacity: 0; filter: alpha(opacity=0);"
            }), M.plugins[c].autoplay = M.settings.autoplay, M.settings.preload = M.settings.autoplay = !1, M.playlist.set(a, M.settings.autoplay), M.plugins[c].system && M.plugins[c].system.init(M)) : M.plugins[c].fallback ? M.plugins[c].fallback(M) : M.playlist.set(a, M.settings.autoplay)), Z++, Y == Z && M.onReady && M.onReady(M)
        }, $);
        return Y || M.onReady && M.onReady(M), M
    }
    if (!CodoPlayerAPI.length) {
        var e = e || function(a) {
            if (1 === CodoPlayerAPI.length) {
                if ("INPUT" == a.target.nodeName || "TEXTAREA" == a.target.nodeName) return;
                a = a || window.event;
                var b = CodoPlayerAPI[0],
                    c = b.media.getVolume(),
                    d = b.media.getCurrentTime();
                switch (a.keyCode) {
                    case 70:
                        a.preventDefault(), b.media.toggleFullScreen(a);
                        break;
                    case 32:
                        a.preventDefault(), b.media.toggle();
                        break;
                    case 38:
                        a.preventDefault(), 100 >= c && (c += 10, c > 100 && (c = 100), b.media.setVolume(c));
                        break;
                    case 40:
                        a.preventDefault(), c >= 0 && (c -= 10, 0 > c && (c = 0), b.media.setVolume(c));
                        break;
                    case 39:
                        a.preventDefault(), b.settings.controls.seeking && d <= b.media.getDuration() && (d += 5, b.media.setCurrentTime(d));
                        break;
                    case 37:
                        a.preventDefault(), b.settings.controls.seeking && d >= 0 && (d -= 5, b.media.setCurrentTime(d))
                }
            }
        };
        Codo(document).off("keydown", e), Codo(document).on("keydown", e)
    }
    Codo(window).on("resize", function() {
        for (var a = 0; a < CodoPlayerAPI.length; a++) {
            var b = CodoPlayerAPI[a];
            !b.system.isFullScreen && b.settings.responsive && b.resize()
        }
    });
    var f = new d(a, b, c);
    return CodoPlayerAPI.push(f), f
}, window.YTiframeReady = !1, window.onYouTubeIframeAPIReady = function() {
    YTiframeReady = !0
};