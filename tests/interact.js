describe('Functional Interaction', function() {
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
    ctxMenu = new ContextMenu(src, dest, {
      width: window.outerWidth,
      height: window.outerHeight
    })
  })

  afterEach(function() {
    //document.body.removeChild(dest)
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
      testKit.sendTouchSignal(200, 180, src, null, function() {
        assert.strictEqual(dest.style.visibility, 'visible', 'contextmenu did not validate')
        testKit.sendTouchSignal(200, 180, src, 'touchend') // end the touchevent started
        done()
      })
    } else {
      testKit.sendMouseSignal(200, 180, src, null, null, function() {
        assert.strictEqual(dest.style.visibility, 'visible', 'contextmenu did not validate')
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
      testKit.sendTouchSignal(200, 180, src)
      src.click()
      testKit.sendTouchSignal(200, 180, src, 'touchend') // end the touchevent started
      assert.strictEqual(dest.style.visibility, 'hidden', 'did not hide on click-away')
    } else {
      testKit.sendMouseSignal(200, 180, src)
      testKit.sendMouseSignal(100, 80, src, 'mousedown', 1)
      assert.strictEqual(dest.style.visibility, 'hidden', 'did not hide on click-away')
    }
  })
})
