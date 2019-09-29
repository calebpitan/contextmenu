var testKit = {}

testKit.sendTouchSignal = function sendTouchSignal(x, y, element, eventType, callback) {
  if (eventType == void 0) eventType = 'touchstart'
  var touchObj = new Touch({
    identifier: Date.now(),
    target: element,
    clientX: x,
    clientY: y,
    radiusX: 2.5,
    radiusY: 2.5,
    rotationAngle: 10,
    force: 0.5
  })
  var touchEvent = new TouchEvent(eventType, {
    cancelable: true,
    bubbles: true,
    touches: [touchObj],
    targetTouches: [],
    changedTouches: [touchObj],
    shiftKey: true
  })
  element.dispatchEvent(touchEvent)
  if (typeof callback === 'function') setTimeout(callback, 10)
}

testKit.sendMouseSignal = function sendMouseSignal(x, y, element, eventType, buttons, callback) {
  if (eventType == void 0) eventType = 'contextmenu'
  var mouseEvent = new MouseEvent(eventType, {
    bubbles: true,
    cancelable: true,
    view: window,
    buttons: buttons || 2,
    clientX: x,
    clientY: y
  })
  element.dispatchEvent(mouseEvent)
  if (typeof callback === 'function') setTimeout(callback, 10)
}
