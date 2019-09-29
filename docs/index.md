# ContextMenu

ContextMenu is a simple and small typescript/javascript library used to create context-menu on both mobile and desktop devices.

ContextMenu could either be triggered by a long press, depending on a specific timeout, on a mobile or touch device, or by a right-click on a desktop or non-touch device.

It gives you more control over your context-menu. You designed it, you should control it! ContextMenu creates a more flexible context-menu by providing flexible functionalities.
I just think you should try it out!

# Why use it?

On most desktop browsers the `contextmenu` event works pretty well with the `addEventListener` or `oncontextmenu` of the `DOM` interface. This doesn't apply to most mobile browsers, probably because the way context-menu is triggered on a mobile, a long press rather than a right click, is different from a desktop device. This small library bridges this gap of lack on most mobile browsers, by circumventing the so called `contextmeu` event, using alternative events pathway to achieve the same goal.

It also comes with something extra, that beats the argument of "why use it?" even in conditions where the `contextmenu` event works perfectly on your target browsers.

## Positioning

ContextMenu's great [positioning system](position.md) is not something you'd like to miss out on, as it can position your context-menu right where you want it to be, not overlapping window's layout, reforming position on such occurence.

## Event Handling

You get to handle events you cannot catch using native `contextmenu` events. Events like "failed" context, when an interrupt is detected right before your _(and that reminds me: you get to set the timeout when your context menu pops up)_ set is reached. Moreover, `clickaway` event handling, when a target outside your menu is touched within the window.

