(function() {
  var SHOW = 'on-context'
  var ctxSource = document.querySelector('body')
  var target = document.querySelector('.ctx-target')
  var ctxMenu = new ContextMenu(ctxSource, target, {
    width: window.innerWidth,
    height: window.innerHeight
  })
  ctxMenu.setup({
    timeout: 800,
    position: 'relative'
  })

  // ctxMenu.on('validate', function(position) {
  //   target.style.top = position.y + 'px'
  //   target.style.left = position.x + 'px'
  //   target.classList.add(SHOW)
  // })

  ctxMenu.on('validate', function(position, viewportQuery) {
    if (viewportQuery.right && !viewportQuery.bottom) {
      target.style.top = position.y + 'px'
      target.style.right = position.x + 'px'
      target.style.transformOrigin = 'top right'
    }
    else if (viewportQuery.right && viewportQuery.bottom) {
      target.style.bottom = position.y + 'px'
      target.style.right = position.x + 'px'
      target.style.transformOrigin = 'bottom right'
    }
    else if (!viewportQuery.right && viewportQuery.bottom) {
      target.style.bottom = position.y + 'px'
      target.style.left = position.x + 'px'
      target.style.transformOrigin = 'bottom left'
    }
    else {
      target.style.top = position.y + 'px'
      target.style.left = position.x + 'px'
      target.style.transformOrigin = 'top left'
    }
    target.classList.add(SHOW)
  }).on('clickaway', function() {
    target.classList.remove(SHOW);
    target.style.top = null
    target.style.left = null
    target.style.right = null
    target.style.bottom = null
  }).activate()
}());
