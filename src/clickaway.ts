export interface ClickAwaySwitch {
  flip: () => void
  flap: () => void
}
export function clickAway(src: HTMLElement, handler: () => any, away: Document | Element = document): ClickAwaySwitch {
  const event = 'click'
  const listener =  (mouseEvent: Event) => {
    // @ts-ignore
    const path = <EventTarget[]> mouseEvent.path || (mouseEvent.composedPath && mouseEvent.composedPath())
    if (!(path.find((target) => target === src)) && typeof handler === 'function') {
      handler()
    }
  }
  return {
    flip: () => away.addEventListener(event, listener),
    flap: () => away.removeEventListener(event, listener)
  }
}
