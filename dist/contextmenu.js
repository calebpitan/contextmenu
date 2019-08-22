(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.ContextMenu = factory());
}(this, function () { 'use strict';

  function findPath(target, path) {
      if (path === void 0) { path = [target]; }
      var Target = target;
      if (Target.parentNode !== null)
          path.push(Target.parentNode);
      return Target.parentNode !== null ? findPath(Target.parentNode, path) : path;
  }

  function clickAway(src, handler, away) {
      if (away === void 0) { away = document; }
      var event = 'click';
      var listener = function (mouseEvent) {
          // @ts-ignore
          var path = mouseEvent.path ||
              (mouseEvent.composedPath && mouseEvent.composedPath()) || findPath(mouseEvent.target);
          if (!(path.find(function (target) { return target === src; })) && typeof handler === 'function') {
              handler();
          }
      };
      return {
          flip: function () { return away.addEventListener(event, listener); },
          flap: function () { return away.removeEventListener(event, listener); }
      };
  }

  var Position = /** @class */ (function () {
      function Position(box, elementBox) {
          this.box = box;
          this.elementBox = elementBox;
          this.positioning = 'absolute';
      }
      Object.defineProperty(Position.prototype, "type", {
          set: function (position) {
              this.positioning = position;
          },
          enumerable: true,
          configurable: true
      });
      Position.prototype.from = function (_a) {
          var x0 = _a.x, y0 = _a.y;
          var x = this.generateX(x0);
          var y = this.generateY(y0);
          return {
              x: x,
              y: y
          };
      };
      Position.prototype.viewportExcess = function (_a) {
          var x = _a.x, y = _a.y;
          var vpq = {
              top: false,
              left: false,
              right: false,
              bottom: false
          };
          vpq.right = this.elementBox.width + x > this.box.width;
          vpq.bottom = this.elementBox.height + y > this.box.height;
          return vpq;
      };
      Position.prototype.generateX = function (x) {
          if (this.positioning === 'relative') {
              return this.elementBox.width + x > this.box.width ? x - this.elementBox.width : x;
          }
          return this.getAbsoluteX(x);
      };
      Position.prototype.generateY = function (y) {
          if (this.positioning === 'relative') {
              return this.elementBox.height + y > this.box.height ? y - this.elementBox.height : y;
          }
          return this.getAbsoluteY(y);
      };
      Position.prototype.getAbsoluteX = function (x) {
          return this.elementBox.width + x > this.box.width ? this.box.width - x : x;
      };
      Position.prototype.getAbsoluteY = function (y) {
          return this.elementBox.height + y > this.box.height ? this.box.height - y : y;
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

  var Device = {
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

  var Path = /** @class */ (function () {
      function Path(x, y) {
          this.x = x;
          this.y = y;
      }
      return Path;
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
  var ContextMenu = /** @class */ (function () {
      function ContextMenu(src, dest, windowSize) {
          this.src = src;
          this.dest = dest;
          this.timeout = 800;
          this.positioning = 'absolute';
          this.handlers = {};
          var box = new Box2D(0, 0, windowSize.width, windowSize.height);
          var box2 = new Box2D(0, 0, this.dest.offsetWidth, this.dest.offsetHeight);
          this.ps = new Position(box, box2);
      }
      ContextMenu.prototype.setup = function (setup) {
          if (setup === void 0) { setup = { timeout: 800, position: 'absolute' }; }
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
              _this.src.removeEventListener(Events.TOUCHMOVE, move, true);
              _this.src.removeEventListener(Events.TOUCHEND, end, true);
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
              var response = _this.ps.from(signal);
              id = setTimeout(function () {
                  if (!touchMoved && typeof _this.handlers[VALIDATE] === 'function') {
                      _this.handlers[VALIDATE].call(_this, new Path(response.x, response.y), _this.ps.viewportExcess(signal));
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
              _this.handlers[VALIDATE].call(_this, new Path(response.x, response.y), _this.ps.viewportExcess(signal));
          };
          if (Device.isMobile || navigator.maxTouchPoints || navigator.msMaxTouchPoints) {
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

  return ContextMenu;

}));
