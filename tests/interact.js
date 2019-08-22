describe('Functional Interaction', function() {
  var assert = chai.assert
  var src = document.body
  var dest = document.createElement('div')
  var ctxMenu = null

  function sendTouchSignal(x, y, element, eventType, callback) {
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

  function sendMouseSignal(x, y, element, eventType, callback) {
    if (eventType == void 0) eventType = 'contextmenu'
    var mouseEvent = new MouseEvent('contextmenu', {
      bubbles: true,
      cancelable: true,
      view: window,
      buttons: 2,
      clientX: x,
      clientY: y
    })
    element.dispatchEvent(mouseEvent)
    if (typeof callback === 'function') setTimeout(callback, 10)
  }

  beforeEach(function() {
    dest.className = 'contextmenu'
    dest.style.width = '250px'
    dest.style.height = '200px'
    dest.style.visibility = 'hidden'
    document.body.appendChild(dest)
    ctxMenu = new ContextMenu(src, dest, {
      width: window.outerWidth,
      height: window.outerHeight
    })
  })

  afterEach(function() {
    document.body.removeChild(dest)
    ctxMenu.deactivate()
  })

  it('dest should become visible', function(done) {
    ctxMenu.setup({
      timeout: 0,
      position: 'absolute'
    })
    ctxMenu.on('validate', function() {
      dest.style.visibility = 'visible'
    })
    ctxMenu.activate()
    if (navigator.maxTouchPoints) {
      sendTouchSignal(200, 180, src, null, function() {
        assert.strictEqual(dest.style.visibility, 'visible', 'contextmenu did not validate')
        sendTouchSignal(200, 180, src, 'touchend') // end the touchevent started
        done()
      })
    } else {
      sendMouseSignal(200, 180, src, null, function() {
        assert.strictEqual(dest.style.visibility, 'visible', 'contextmenu did not validate')
        sendTouchSignal(200, 180, src, 'touchend') // end the touchevent started
        done()
      })
    }

  })

  it('dest should become hidden on click-away', function() {
    ctxMenu.setup({
      timeout: 0,
      position: 'absolute'
    })
    ctxMenu.on('validate', function() {
      dest.style.visibility = 'visible'
    })
    ctxMenu.on('clickaway', function() {
      dest.style.visibility = 'hidden'
    })
    ctxMenu.activate()
    if (navigator.maxTouchPoints) {
      sendTouchSignal(200, 180, src)
      src.click()
      sendTouchSignal(200, 180, src, 'touchend') // end the touchevent started
      assert.strictEqual(dest.style.visibility, 'hidden', 'did not hide on click-away')
    } else {
      sendMouseSignal(200, 180, src)
      src.click()
      assert.strictEqual(dest.style.visibility, 'hidden', 'did not hide on click-away')
    }
  })

})
