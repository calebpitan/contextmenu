(function() {
  var SHOW = 'on-context'
  var ctxSource = document.querySelector('body')
  var target = document.querySelector('.ctx-target')
  var animate = scale(target, 5, 5)
  var ctxMenu = new ContextMenu(ctxSource, target, {
    width: window.innerWidth,
    height: window.innerHeight
  })
  ctxMenu.setup({
    timeout: 800,
    position: 'relative'
  })

  function scale(el, x, y) {
    var startWidth = x + 'px'
    var startHeight = y + 'px'
    return {
      grow: function() {
        el.style.transition = ''
        el.style.width = 'auto'
        el.style.height = 'auto'
        var endWidth = getComputedStyle(el).width
        var endHeight = getComputedStyle(el).height
        el.style.width = startWidth
        el.style.height = startHeight
        el.offsetWidth
        el.offsetHeight
        el.style.transition = 'transform cubic-bezier(0.0,0.0,0.2,1) .3s, width cubic-bezier(0.0,0.0,0.2,1) .25s, height cubic-bezier(0.0,0.0,0.2,1) .25s'
        el.style.width = endWidth
        el.style.height = endHeight
      },
      shrink: function() {
        el.style.width = 'auto'
        el.style.height = 'auto'
      }
    }
  }

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
      console.log('a')
    }
    target.classList.add(SHOW)
    animate.grow()
  }).on('clickaway', function() {
    animate.shrink()
    target.classList.remove(SHOW);
    target.style.top = null
    target.style.left = null
    target.style.right = null
    target.style.bottom = null
  }).activate()
}());
