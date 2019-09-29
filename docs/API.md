# Application Programming Interface

The ContextMenu API, simple and easy to adapt into any new or already existing app, defines methods with which it portrays it simplicity of flowing with your app.

## constructor

```ts
constructor(src: HTMLElement, dest: HTMLElement, windowSize: Size)
```
The constructor takes three arguments:

  1. `src`&mdash;an html element which serves as a context, from which the event is triggered.
  2. `dest`&mdash;an html element which serves as the menu to be shown oncontextmenu.
  3. `windowSize`&mdash;a type of the `Size` interface cantainig properties taht fully defines the size of the window or view of the menu
  ```ts
  interface Size {
    width: number;
    height: number;
  }
  ```

## setup

```ts
setup(setup: ContextMenuSetup = { timeout: 800, position: 'absolute' })
```

The `setup` method does some little preparations before activating the contextmenu activity. It takes one argument a type of the `ContextMenuSetup` interface, which defines bothe timeout and position of the contextmenu.

```ts
interface ContextMenuSetup {
  timeout: number;
  position: Positioning;
}
```

**timeout**  
This is the amount of time it takes im milliseconds to open a menu on long press on a mobile or touch device.

**position**  
This defines the position of the menu. Have a peek at [position.md](position.md) to understand the positioning system.

## on

```ts
on(event: ContextMenuEvent, handler: (position?: Path, viewportQuery?: ViewPortQuery) => void): this
```

The `on` method helps register event handlers. It accepts two arguments.

  1. `event`&mdash;a type of the `ContextMenuEvent` interface
  ```ts
  type ContextMenuEvent = 'validate' | 'failed' | 'clickaway'
  ```
  2. `handler` &mdash;a callback handler, for the event that got triggered, with one or two optional argument, a type of `Path` interface and `ViewPortQuery` interface respectively.
  ```ts
  interface Path {
    x: number;
    y: number;
  }
  ```
  The viewportQuery is just a set of collective booleans, assigned to four properties: top, left, right, bottom. Whichever one has its bit turned on signifies that the contextmenu size exceeds the viewport in the direction of that property. More than one may be turned on, but at most, two can be turned on, and from different axis. If left is on right can't be, similarly if bottom is turned on top can't be!
  ```ts
  interface ViewPortQuery {
    top: boolean;
    left: boolean;
    right: boolean;
    bottom: boolean;
  }
  ```

## activate

The `activate` method helps turn on the ContextMenu and makes it actively waiting for a contextmenu event, and other associated, registered events.

## deactivate

The `deactivate` method removes all events and respective handlers, and brings the ContextMenu into a passive non-working state.

## namespace

The `namespace` method helps "dump" the `ContextMenu` class from the global object (`window`) to another specified destination, yet on the global object, but namespaced.

```ts
static namespace(name: string)
```

It takes one argument, the name of the new object it should be "dumped" on. The object is created if it doesn't exist on the global object. Any previous object or class or variable occupying the former position of this namespaced property will be restored.
