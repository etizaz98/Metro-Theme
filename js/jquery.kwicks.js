/*!
 Kwicks for jQuery Minified
 Copyright (c) 2008 Jeremy Martin
 http://www.jeremymartin.name/projects.php?project=kwicks
 
 Licensed under the MIT license:
 http://www.opensource.org/licenses/mit-license.php
 
 Any and all use of this script must be accompanied by this copyright/license notice in its present form.
 
 5/21/2012: version 2.1.3
 */
;
(function(f) {
    f.kwicks = function(g, k) {
        var c, a = this;
        a.$el = f(g).addClass("kwicks");
        a.el = g;
        a.$el.data("kwicks", a);
        a.init = function() {
            var b, d;
            a.options = c = f.extend({}, f.kwicks.defaultOptions, k);
            a.$kwicks = a.$el.children().addClass("kwick-panel");
            a.$el.addClass(c.isVertical ? "vertical" : "horizontal");
            a.size = a.$kwicks.size();
            c.defaultKwick = parseInt(c.defaultKwick, 10);
            c.defaultKwick > a.size - 1 && (c.defaultKwick = a.size - 1);
            c.showNext = parseInt(c.showNext, 10);
            a.playing = !1;
            a.lastActive = c.sticky ? c.defaultKwick : -1;
            a.active = a.lastActive;
            a.$active = a.$kwicks.eq(a.active);
            a.WoH = c.isVertical ? "height" : "width";
            a.LoT = c.isVertical ? "top" : "left";
            a.normWoH = parseInt(a.$kwicks.eq(0).css(a.WoH), 10);
            a.preCalcLoTs = [];
            a.aniObj = {};
            c.max ? c.min = (a.normWoH * a.size - c.max) / (a.size - 1) : c.max = a.normWoH * a.size - c.min * (a.size - 1);
            c.isVertical ? a.$el.css({width: a.$kwicks.eq(0).css("width"), height: a.normWoH * a.size + c.spacing * (a.size - 1)}) : a.$el.css({width: a.normWoH * a.size + c.spacing * (a.size - 1), height: a.$kwicks.eq(0).css("height")});
            for (b = 0; b < a.size; b++) {
                a.preCalcLoTs[b] = [];
                for (d = 1; d < a.size - 1; d++)
                    a.preCalcLoTs[b][d] = b === d ? d * c.min + d * c.spacing : (d <= b ? d * c.min : (d - 1) * c.min + c.max) + d * c.spacing
            }
            a.$el.bind("mouseenter.kwicksShow", function() {
                a.playing && a.pause(true)
            }).bind("mouseleave.kwicksShow", function() {
                a.playing && a.play()
            });
            a.$kwicks.each(function(b) {
                var d = f(this);
                f.data(this, "index", b);
                d.addClass("kwick" + (b + 1));
                b === 0 ? d.css(a.LoT, 0) : b === a.size - 1 ? d.css(c.isVertical ? "bottom" : "right", 0) : c.sticky ? d.css(a.LoT, Math.ceil(a.preCalcLoTs[c.defaultKwick][b])) : d.css(a.LoT, Math.ceil(b * a.normWoH + b * c.spacing));
                if (c.sticky)
                    if (c.defaultKwick === b) {
                        d.css(a.WoH, c.max);
                        d.addClass(c.activeClass)
                    } else
                        d.css(a.WoH, c.min)
            }).css({margin: 0, position: "absolute"}).bind(c.event + ".kwicks", function() {
                var c = f.data(this, "index");
                a.openKwick(c)
            }).bind(c.eventClose + ".kwicks", function() {
                var b = (new Date).getTime();
                if (!(b - a.lastEvent < 200 && c.event === c.eventClose)) {
                    a.lastEvent = b;
                    f(this).hasClass(c.activeClass) && a.closeKwick()
                }
            });
            a.triggerEvent("initialized")
        };
        a.openKwick = function(b, d, e) {
            if (/\d/.test(b) && !isNaN(b)) {
                var g, m, h, i = [], l = [], j = parseInt(f.trim(b), 10), b = a.$kwicks.eq(j);
                if (0 > j || j > a.size - 1 || b.hasClass(c.activeClass))
                    "function" === typeof e && e(a);
                else {
                    a.lastEvent = (new Date).getTime();
                    a.$kwicks.stop().removeClass(c.activeClass);
                    a.lastActive = a.active;
                    a.$active = b;
                    a.active = f.data(b[0], "index");
                    b.addClass(c.activeClass);
                    !0 !== d && a.pause();
                    a.triggerEvent("init");
                    for (d = 0; d < a.size; d++)
                        i[d] = parseInt(a.$kwicks.eq(d).css(a.WoH), 10), l[d] = parseInt(a.$kwicks.eq(d).css(a.LoT), 10);
                    a.aniObj[a.WoH] = c.max;
                    g = c.max - i[j];
                    m = i[j] / g;
                    a.triggerEvent("expanding");
                    b.animate(a.aniObj, {step: function(b) {
                            h = 0 !== g ? b / g - m : 1;
                            a.$kwicks.each(function(b) {
                                b !== j && a.$kwicks.eq(b).css(a.WoH, Math.ceil(i[b] - (i[b] - c.min) * h));
                                0 < b && b < a.size - 1 && a.$kwicks.eq(b).css(a.LoT, Math.ceil(l[b] - (l[b] - a.preCalcLoTs[j][b]) * h))
                            })
                        }, duration: c.duration, easing: c.easing, complete: function() {
                            a.triggerEvent("completed");
                            "function" === typeof e && e(a)
                        }})
                }
            } else
                "function" === typeof e && e(a)
        };
        a.closeKwick = function(b, d) {
            if (!c.sticky) {
                d || a.pause();
                a.triggerEvent("init");
                var e, f, g, h = [], i = [];
                for (e = 0; e < a.size; e++)
                    h[e] = parseInt(a.$kwicks.eq(e).css(a.WoH), 10), i[e] = parseInt(a.$kwicks.eq(e).css(a.LoT), 10);
                a.aniObj[a.WoH] = a.normWoH;
                f = a.normWoH - h[0];
                a.triggerEvent("collapsing");
                a.$kwicks.stop().removeClass(c.activeClass).eq(0).animate(a.aniObj, {step: function(b) {
                        g = 0 !== f ? (b - h[0]) / f : 1;
                        for (e = 1; e < a.size; e++)
                            a.$kwicks.eq(e).css(a.WoH, Math.ceil(h[e] - (h[e] - a.normWoH) * g)), e < a.size - 1 && a.$kwicks.eq(e).css(a.LoT, Math.ceil(i[e] - (i[e] - (e * a.normWoH + e * c.spacing)) * g))
                    }, duration: c.duration, easing: c.easing, complete: function() {
                        a.triggerEvent("completed")
                    }})
            }
        };
        a.play = function(b, d) {
            d || a.pause();
            a.playing || (a.triggerEvent("playing"), a.playing = !0);
            b = "undefined" === typeof b ? -1 < a.active ? a.active : 0 : b;
            if (0 === c.showNext) {
                for (b = a.active; b === a.active; )
                    b = Math.round(Math.random() * (a.size - 1));
                a.openKwick(b, !0)
            } else
                a[0 > b || b >= a.size ? "closeKwick" : "openKwick"](b, !0), b = b >= a.size ? -1 : 0 > b ? a.size : b, b += c.showNext;
            a.timer = setTimeout(function() {
                a.play(b, true)
            }, c.showDuration)
        };
        a.pause = function(b) {
            clearTimeout(a.timer);
            a.playing = b || !1;
            (a.playing || b) && a.triggerEvent("paused")
        };
        a.triggerEvent = function(b) {
            a.$el.trigger("kwicks-" + b, a);
            if (f.isFunction(c[b]))
                c[b](a)
        };
        a.isActive = function() {
            return a.$kwicks.hasClass(c.activeClass)
        };
        a.getActive = function() {
            return a.isActive() ? a.active : -1
        };
        a.init()
    };
    f.kwicks.defaultOptions = {max: null, min: null, spacing: 0, isVertical: !1, sticky: !1, defaultKwick: 0, activeClass: "active", event: "mouseenter", eventClose: "mouseleave", duration: 500, easing: "swing", showDuration: 2E3, showNext: 1};
    f.fn.getkwicks = function() {
        return this.data("kwicks")
    };
    f.fn.kwicks = function(g, k) {
        return this.each(function() {
            var c, a = f(this).data("kwicks");
            "object" === typeof g && !a ? new f.kwicks(this, g) : a && ("string" === typeof g && (c = g.toLowerCase(), c.match("play") ? a.play() : c.match("pause") && (a.playing && a.triggerEvent("paused"), a.pause())), (c = /\d/.test(g) && !isNaN(g)) && 0 > g ? a.closeKwick() : c && a.openKwick(g, !1, k))
        })
    }
})(jQuery);
