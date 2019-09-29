describe('Namespace', function() {
  var assert = chai.assert
  it('should reinstate `Dump` and get `Dumped` else where when namespaced', function() {
    assert.exists(window.ContextMenu, 'ContextMenu was never defined')
    ContextMenu.namespace('CalebPitan')
    assert.notExists(window.ContextMenu, '`window.ContextMenu` should have been dereferenced')
    assert.exists(window.CalebPitan.ContextMenu, 'ContextMenu doesn\'t exist in this scope')
  })
})
