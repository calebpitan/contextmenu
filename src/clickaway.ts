import { Device } from './utility/device'
import { findPath } from './utility/pathfinder'

export interface ClickAwaySwitch {
  flip: () => void
  flap: () => void
}

export function clickAway(src: HTMLElement, handler: () => any, away: Document | Element = document): ClickAwaySwitch {
  const event = Device.isMobile ? 'touchstart' : 'mousedown'
  const listener =  (mouseEvent: Event) => {
    // @ts-ignore
    if (mouseEvent.type === 'mousedown' && mouseEvent.buttons !== 1) {
      return
    }
    // @ts-ignore
    const path: EventTarget[] = <EventTarget[]> mouseEvent.path ||
      (mouseEvent.composedPath && mouseEvent.composedPath()) || findPath(<EventTarget> mouseEvent.target)
    if (!(path.find((target) => target === src)) && typeof handler === 'function') {
      handler()
    }
  }
  return {
    flip: () => away.addEventListener(event, listener, true),
    flap: () => away.removeEventListener(event, listener, true)
  }
}
