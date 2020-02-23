/*! Contextmenu v0.1.1
* Copyright (c) 2020 Caleb Pitan
* Licensed under the MIT License
* https://github.com/calebpitan/contextmenu/blob/master/LICENSE
* Build Date: 2020-02-23T23:47:40.315Z
*/
var Device = {
    isTouch: false,
    isMouse: false,
    isMobile: false,
    isDesktop: false
};
Object.defineProperty(Device, 'isMobile', {
    get: function () {
        var mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i;
        if (navigator.userAgent.match(mobile)) {
            return true;
        }
        return false;
    },
    enumerable: true,
    configurable: true
});
Object.defineProperty(Device, 'isDesktop', {
    get: function () { return !Device.isMobile; },
    enumerable: true,
    configurable: true
});
Object.defineProperty(Device, 'isTouch', {
    get: function () { return !!(navigator.maxTouchPoints || navigator.msMaxTouchPoints); },
    enumerable: true,
    configurable: true
});
Object.defineProperty(Device, 'isMouse', {
    get: function () { return !Device.isTouch; },
    enumerable: true,
    configurable: true
});

function findPath(target, path) {
    if (path === void 0) { path = [target]; }
    var Target = target;
    if (Target.parentNode !== null)
        path.push(Target.parentNode);
    return Target.parentNode !== null ? findPath(Target.parentNode, path) : path;
}

function clickAway(src, handler, away) {
    if (away === void 0) { away = document; }
    var event = Device.isMobile ? 'touchstart' : 'mousedown';
    var listener = function (mouseEvent) {
        // @ts-ignore
        var path = mouseEvent.path ||
            (mouseEvent.composedPath && mouseEvent.composedPath()) || findPath(mouseEvent.target);
        var style = getComputedStyle(src);
        if (!(path.find(function (target) { return target === src; })) && typeof handler === 'function' && (style.display !== 'none' && style.visibility !== 'hidden')) {
            handler();
        }
    };
    return {
        flip: function () { return away.addEventListener(event, listener, true); },
        flap: function () { return away.removeEventListener(event, listener, true); }
    };
}

var Path = /** @class */ (function () {
    function Path(x, y) {
        this.x = x;
        this.y = y;
    }
    return Path;
}());

var Position = /** @class */ (function () {
    function Position(box, elementBox, viewBox) {
        this.box = box;
        this.elementBox = elementBox;
        this.viewBox = viewBox;
        this.positioning = 'relative';
        this.vBoxClientRect = null;
    }
    Object.defineProperty(Position.prototype, "viewBoxIsWindow", {
        get: function () {
            return window && this.viewBox === window && Object.is(this.viewBox, window);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Position.prototype, "viewBoxBoundingClientRect", {
        // {DOMRect | null} actually not {any}
        get: function () {
            if (!this.viewBoxIsWindow) {
                // getBoundingClientRect is a expensive function, we shouldn't be calling it always.
                // @ts-ignore
                this.vBoxClientRect = this.vBoxClientRect === null ? this.viewBox.getBoundingClientRect() : this.vBoxClientRect;
                return this.vBoxClientRect;
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Position.prototype, "viewBoxIsGridLayout", {
        get: function () {
            return !this.viewBoxIsWindow && this.viewBox.offsetLeft !== this.viewBoxBoundingClientRect.left;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Position.prototype, "type", {
        set: function (position) {
            this.positioning = position;
        },
        enumerable: true,
        configurable: true
    });
    Position.prototype.from = function (signal) {
        var _a = this.transformPath(signal), x0 = _a.x, y0 = _a.y;
        var x = this.generateX(x0);
        var y = this.generateY(y0);
        return new Path(x, y);
    };
    Position.prototype.viewportExcess = function (path) {
        var _a = this.transformPath(path), x = _a.x, y = _a.y;
        var vpq = {
            top: false,
            left: false,
            right: false,
            bottom: false
        };
        if (this.positioning !== 'fixed') {
            vpq.right = this.elementBox.width + x > this.box.width;
            vpq.bottom = this.elementBox.height + y > this.box.height;
        }
        return vpq;
    };
    Position.prototype.generateX = function (x) {
        if (this.positioning === 'absolute') {
            return this.elementBox.width + x > this.box.width ? x - this.elementBox.width : x;
        }
        else if (this.positioning === 'static') {
            return x;
        }
        else if (this.positioning === 'fixed') {
            return (this.box.width - this.elementBox.width) / 2;
        }
        return this.getRelativeX(x);
    };
    Position.prototype.generateY = function (y) {
        if (this.positioning === 'absolute') {
            return this.elementBox.height + y > this.box.height ? y - this.elementBox.height : y;
        }
        else if (this.positioning === 'static') {
            return y;
        }
        else if (this.positioning === 'fixed') {
            return (this.box.height - this.elementBox.height) / 2;
        }
        return this.getRelativeY(y);
    };
    Position.prototype.getRelativeX = function (x) {
        return this.elementBox.width + x > this.box.width ? this.box.width - x : x;
    };
    Position.prototype.getRelativeY = function (y) {
        return this.elementBox.height + y > this.box.height ? this.box.height - y : y;
    };
    Position.prototype.transformPath = function (path) {
        if (this.viewBoxIsGridLayout && this.viewBoxBoundingClientRect !== null) {
            return new Path(path.x - this.viewBoxBoundingClientRect.left, path.y - this.viewBoxBoundingClientRect.top);
        }
        return path;
    };
    return Position;
}());

var Box2D = /** @class */ (function () {
    function Box2D(x1, y1, x2, y2) {
        this.x1 = x1;
        this.x2 = x2;
        this.y1 = y1;
        this.y2 = y2;
    }
    Object.defineProperty(Box2D.prototype, "width", {
        get: function () {
            return this.x2 - this.x1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Box2D.prototype, "height", {
        get: function () {
            return this.y2 - this.y1;
        },
        enumerable: true,
        configurable: true
    });
    return Box2D;
}());

var VALIDATE = 'validate';
var FAILED = 'failed';
var CLICK_AWAY = 'clickaway';
var Events = {
    TOUCHSTART: 'touchstart',
    TOUCHMOVE: 'touchmove',
    TOUCHEND: 'touchend',
    CTXMENU: 'contextmenu'
};
var EVENT_OPT = true;
var NAME = 'ContextMenu';
// @ts-ignore
var DUMP = window[NAME];
var ContextMenu = /** @class */ (function () {
    function ContextMenu(src, dest, viewBox) {
        this.src = src;
        this.dest = dest;
        this.viewBox = viewBox;
        this.timeout = 800;
        this.positioning = 'relative';
        this.handlers = {};
        var box = new Box2D(0, 0, this.windowSize.width, this.windowSize.height);
        var box2 = new Box2D(0, 0, this.dest.offsetWidth, this.dest.offsetHeight);
        this.ps = new Position(box, box2, this.viewBox);
    }
    Object.defineProperty(ContextMenu.prototype, "viewBoxIsWindow", {
        get: function () {
            return window && this.viewBox === window && Object.is(this.viewBox, window);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContextMenu.prototype, "windowSize", {
        get: function () {
            if (this.viewBoxIsWindow) {
                return {
                    width: this.viewBox.innerWidth,
                    height: this.viewBox.innerHeight
                };
            }
            return {
                width: this.viewBox.offsetWidth,
                height: this.viewBox.offsetHeight
            };
        },
        enumerable: true,
        configurable: true
    });
    // tslint:disable-next-line:member-ordering
    ContextMenu.namespace = function (name) {
        // @ts-ignore
        window[name] = window[name] || {};
        // @ts-ignore
        window[name][NAME] = ContextMenu;
        // @ts-ignore
        window[NAME] = DUMP;
    };
    ContextMenu.prototype.setup = function (setup) {
        if (setup === void 0) { setup = { timeout: 800, position: 'relative' }; }
        this.timeout = setup.timeout;
        this.positioning = setup.position;
        this.ps.type = this.positioning;
    };
    ContextMenu.prototype.on = function (event, handler) {
        this.handlers[event] = handler.bind(this);
        return this;
    };
    ContextMenu.prototype.activate = function () {
        var _this = this;
        var move = function () {
            touchMoved = true;
        };
        var end = function () {
            _this.src.removeEventListener(Events.TOUCHMOVE, move, EVENT_OPT);
            _this.src.removeEventListener(Events.TOUCHEND, end, EVENT_OPT);
            clearTimeout(id);
        };
        var touchMoved = false;
        var id;
        this.clickAway = clickAway(this.dest, this.handlers[CLICK_AWAY]);
        // @start
        this.start = function (touchEvent) {
            touchEvent.stopPropagation();
            _this.src.addEventListener(Events.TOUCHMOVE, move, EVENT_OPT);
            _this.src.addEventListener(Events.TOUCHEND, end, EVENT_OPT);
            var signal = new Path(touchEvent.touches[0].clientX, touchEvent.touches[0].clientY);
            var coords = _this.ps.from(signal);
            id = setTimeout(function () {
                if (!touchMoved && typeof _this.handlers[VALIDATE] === 'function') {
                    _this.handlers[VALIDATE].call(_this, coords, _this.ps.viewportExcess(signal));
                }
                else if (touchMoved && typeof _this.handlers[FAILED] === 'function') {
                    _this.handlers[FAILED].call(_this);
                }
            }, _this.timeout);
            touchMoved = false;
        };
        this.ctxhandler = function (ctxEvent) {
            ctxEvent.preventDefault();
            var signal = new Path(ctxEvent.clientX, ctxEvent.clientY);
            var response = _this.ps.from(signal);
            _this.handlers[VALIDATE].call(_this, response, _this.ps.viewportExcess(signal));
        };
        if (Device.isTouch) {
            this.src.addEventListener(Events.TOUCHSTART, this.start, EVENT_OPT);
        }
        else {
            this.src.addEventListener(Events.CTXMENU, this.ctxhandler, EVENT_OPT);
        }
        this.clickAway.flip();
    };
    ContextMenu.prototype.deactivate = function () {
        if (this.start) {
            this.src.removeEventListener(Events.TOUCHSTART, this.start, EVENT_OPT);
            this.src.removeEventListener(Events.CTXMENU, this.ctxhandler, EVENT_OPT);
            this.clickAway.flap();
        }
    };
    return ContextMenu;
}());

export default ContextMenu;
