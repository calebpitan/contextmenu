describe('Positioning', function() {

  var assert = chai.assert
  var src = document.body
  var dest = document.createElement('div')
  var ctxMenu = null

  beforeEach(function() {
    dest.className = 'contextmenu'
    dest.style.width = '250px'
    dest.style.height = '200px'
    dest.style.visibility = 'hidden'
    document.body.appendChild(dest)
    ctxMenu = new ContextMenu(src, dest, window)
  })

  afterEach(function() {
    document.body.removeChild(dest)
    ctxMenu.deactivate()
  })

  it('Absolute::should be positioned where the event was triggered', function(done) {
    var x = 70
    var y = 50
    ctxMenu.setup({
      timeout: 0,
      position: 'absolute'
    })
    ctxMenu.on('validate', function(position) {
      dest.style.left = position.x + 'px'
      dest.style.top = position.y + 'px'
    })
    ctxMenu.activate()

    if (navigator.maxTouchPoints) {
      testKit.sendTouchSignal(x, y, src, null, function() {
        assert.strictEqual(dest.style.left, x + 'px', 'x positioning is faulty')
        assert.strictEqual(dest.style.top, y + 'px', 'y positioning is faulty')
        testKit.sendTouchSignal(x, y, src, 'touchend') // end the touchevent started
        done()
      })
    } else {
      testKit.sendMouseSignal(x, y, src, null, null, function() {
        assert.strictEqual(dest.style.left, x + 'px', 'x positioning is faulty')
        assert.strictEqual(dest.style.top, y + 'px', 'y positioning is faulty')
        done()
      })
    }
  })

  it('Relative::should be positioned based on how menu overflows viewport', function(done) {
    var x = window.innerWidth - dest.offsetWidth / 2 // if viewport is window, innerWidth is implicitly used in lieu of outerWidth.
    var y = window.innerHeight - dest.offsetHeight / 2
    var G_viewportQuery = null
    function wrap_assertion() {
      if (G_viewportQuery.right && !G_viewportQuery.bottom) {
        assert.strictEqual(dest.style.top, y + 'px', 'top-right y positioning is faulty')
        assert.strictEqual(dest.style.right, dest.offsetWidth / 2 + 'px', 'top-right x positioning is faulty')
      }
      else if (G_viewportQuery.right && G_viewportQuery.bottom) {
        assert.strictEqual(dest.style.bottom, dest.offsetHeight / 2 + 'px', 'bottom-right y positioning is faulty')
        assert.strictEqual(dest.style.right, dest.offsetWidth / 2 + 'px', 'bottom-right x positioning is faulty')
      }
      else if (!G_viewportQuery.right && G_viewportQuery.bottom) {
        assert.strictEqual(dest.style.bottom, dest.offsetHeight / 2 + 'px', 'bottom-left y positioning is faulty')
        assert.strictEqual(dest.style.left, x + 'px', 'bottom-left x positioning is faulty')
      }
      else {
        assert.strictEqual(dest.style.top, y + 'px', 'top-left y positioning is faulty')
        assert.strictEqual(dest.style.left, x + 'px', 'top-left x positioning is faulty')
      }
    }
    ctxMenu.setup({
      timeout: 0,
      position: 'relative'
    })
    ctxMenu.on('validate', function(position, viewportQuery) {
      G_viewportQuery = viewportQuery
      if (viewportQuery.right && ! viewportQuery.bottom) {
        dest.style.top = position.y + 'px'
        dest.style.right = position.x + 'px'
      }
      else if (viewportQuery.right && viewportQuery.bottom) {
        dest.style.bottom = position.y + 'px'
        dest.style.right = position.x + 'px'
      }
      else if (!viewportQuery.right && viewportQuery.bottom) {
        dest.style.bottom = position.y + 'px'
        dest.style.left = position.x + 'px'
      }
      else {
        dest.style.top = position.y + 'px'
        dest.style.left = position.x + 'px'
      }
    })
    ctxMenu.activate()

    if (navigator.maxTouchPoints) {
      testKit.sendTouchSignal(x, y, src, null, function() {
        wrap_assertion()
        testKit.sendTouchSignal(x, y, src, 'touchend') // end the touchevent started
        done()
      })
    } else {
      testKit.sendMouseSignal(x, y, src, null, null, function() {
        wrap_assertion()
        done()
      })
    }
  })

  it('Static::should be unmodified and independent of any factor', function(done) {
    var x = window.outerWidth - dest.offsetWidth / 2
    var y = window.outerHeight - dest.offsetHeight / 2
    ctxMenu.setup({
      timeout: 0,
      position: 'static'
    })
    ctxMenu.on('validate', function(position) {
      dest.style.left = position.x + 'px'
      dest.style.top = position.y + 'px'
    })
    ctxMenu.activate()

    if (navigator.maxTouchPoints) {
      testKit.sendTouchSignal(x, y, src, null, function() {
        assert.strictEqual(dest.style.left, x + 'px', 'x positioning is faulty')
        assert.strictEqual(dest.style.top, y + 'px', 'y positioning is faulty')
        testKit.sendTouchSignal(x, y, src, 'touchend') // end the touchevent started
        done()
      })
    } else {
      testKit.sendMouseSignal(x, y, src, null, null, function() {
        assert.strictEqual(dest.style.left, x + 'px', 'x positioning is faulty')
        assert.strictEqual(dest.style.top, y + 'px', 'y positioning is faulty')
        done()
      })
    }
  })

  it('Fixed::should be centrally positioned at all times', function(done) {
    var x = 70
    var y = 80
    ctxMenu.setup({
      timeout: 0,
      position: 'fixed'
    })
    ctxMenu.on('validate', function(position) {
      dest.style.left = position.y + 'px'
      dest.style.top = position.y + 'px'
    })
    ctxMenu.activate()

    if (navigator.maxTouchPoints) {
      testKit.sendTouchSignal(x, y, src, null, function() {
        assert.notStrictEqual(dest.style.left, x + 'px', 'x positioning is faulty')
        assert.notStrictEqual(dest.style.top, y + 'px', 'y positioning is faulty')
        testKit.sendTouchSignal(x, y, src, 'touchend') // end the touchevent started
        done()
      })
    } else {
      testKit.sendMouseSignal(x, y, src, null, null, function() {
        assert.notStrictEqual(dest.style.left, x + 'px', 'x positioning is faulty')
        assert.notStrictEqual(dest.style.top, y + 'px', 'y positioning is faulty')
        done()
      })
    }
  })
})
