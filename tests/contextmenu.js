//import mocha, { describe, it, beforeEach, afterEach } from 'mocha'
//import chai from 'chai'

describe('ContextMenu', function() {
  var assert = chai.assert

  it('should be available in the global scope', function() {
    assert.isDefined(window.ContextMenu, 'ContextMenu is not defined in the global scope')
  })

  it('should satisfy `ActivityInterface`', function() {
    assert.exists(ContextMenu.prototype.setup, '`setup` is not defined on `ContextMenu`')
    assert.isFunction(ContextMenu.prototype.setup, '`setup` method doesn\'t  exists')

    assert.exists(ContextMenu.prototype.on, '`on` is not defined on `ContextMenu`')
    assert.isFunction(ContextMenu.prototype.on, '`on` method doesn\'t  exists')

    assert.exists(ContextMenu.prototype.activate, '`activate` is not defined on `ContextMenu`')
    assert.isFunction(ContextMenu.prototype.activate, '`activate` method doesn\'t  exists')

    assert.exists(ContextMenu.prototype.deactivate, '`deactivate` is not defined on `ContextMenu`')
    assert.isFunction(ContextMenu.prototype.deactivate, '`deactivate` method doesn\'t  exists')
  })
})
