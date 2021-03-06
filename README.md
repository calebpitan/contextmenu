[![Build Status](https://www.travis-ci.org/calebpitan/contextmenu.svg?branch=master)](https://www.travis-ci.org/calebpitan/contextmenu)
[![GitHub license](https://img.shields.io/github/license/calebpitan/contextmenu?color=blue)](https://github.com/calebpitan/contextmenu/blob/master/LICENSE)
[![Current Version](https://img.shields.io/badge/npm-v0.1.1-blueviolet)](https://www.npmjs.com/package/@calebpitan/contextmenu)

# ContextMenu

ContextMenu is a simple and small typescript/javascript library used to create context-menu on both mobile and desktop devices.

ContextMenu could either be triggered by a long press, depending on a specific timeout, on a mobile or touch device, or by a right-click on a desktop or non-touch device.

It gives you more control over your context-menu. You designed it, you should control it! ContextMenu creates a more flexible context-menu by providing flexible functionalities.
I just think you should try it out!

# As simple as:

```js
const ctxSource = document.querySelector('body')
const target = document.querySelector('.contextmenu')
const ctxMenu = new ContextMenu(ctxSource, target, {
  width: window.innerWidth,
  height: window.innerHeight
})
ctxMenu.setup({
  timeout: 800,
  position: 'absolute'
})
ctxMenu.on('validate', function(position) {
  target.style.top = position.y + 'px'
  target.style.left = position.x + 'px'
  target.classList.add('visible')
})
```

# Support Service

<p style="text-align:center;">
  <a href="https://browserstack.com">
    <img src="https://p14.zdusercontent.com/attachment/1015988/RW6iglmeKjdn856mLzjd6uorO?token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..hjl1FY7qgeVCOLSe_QJdvQ._v2FG6qeo3J5zwiOmCPcJ8IUgRd0zD0hvV7jDbkySxGASjrue3M1KrAZVgtlRpKeXjyXxglzHXPQHL4xndb3ew8VqZwk1eUERgCG14uV6j1htixNCtuqScprVcr2eHbY3MTXG7Ee5jdkeKnN-mFStCkirACOteMeUTXak9ghX61n1rRk2jpcIv9y0BfTGwUR_zDDd8su4GwYDXJJTxN7Lv2K0HOtW4eTNbmHSjcvzxKVT2ZlHBQxOMbjzkuqycA2_nWuQ4ZFo6I0wZ6_--Cr_FQYfOqB-ucQUcIHdb759TY.5J6Iqbrb6_cEbRYPSt_L-w" alt="browserstack" width="200">
  </a>
</p>

[BrowserStack](https://browserstack.com) is a test platform that helps this open source project run automated and CI tests on real devices. We use BrowserStack, like every other open source projects, to test our code.
