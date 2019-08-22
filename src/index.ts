import { clickAway, ClickAwaySwitch } from './clickaway'
import Position, { ViewPortQuery } from './position'
import { ContextMenuEvent, Positioning } from './type'
import Box2D from './utility/box2d'
import { Device } from './utility/device'
import Path from './utility/path'
import { Size } from './utility/size'

const VALIDATE = 'validate'
const FAILED = 'failed'
const CLICK_AWAY = 'clickaway'
const Events = {
  TOUCHSTART: 'touchstart',
  TOUCHMOVE: 'touchmove',
  TOUCHEND: 'touchend',
  CTXMENU: 'contextmenu'
}
const EVENT_OPT = true

export interface Handler {
  [VALIDATE]: (position: Path, viewportQuery: ViewPortQuery) => void
  [FAILED]: () => void
  [CLICK_AWAY]: () => void
}

export interface ContextMenuSetup {
  timeout: number
  position: Positioning
}

export default class ContextMenu {
  readonly src: HTMLElement
  readonly dest: HTMLElement
  timeout: number
  positioning: Positioning
  private handlers: Handler
  private ps: Position
  private start!: (touchEvent: Event) => any
  private clickAway!: ClickAwaySwitch
  private ctxhandler!: (ctxEvent: Event) => any

  constructor(src: HTMLElement, dest: HTMLElement, windowSize: Size) {
    this.src = src
    this.dest = dest
    this.timeout = 800
    this.positioning = 'absolute'
    this.handlers = <Handler> {}
    const box = new Box2D(0, 0, windowSize.width, windowSize.height)
    const box2 = new Box2D(0, 0, this.dest.offsetWidth, this.dest.offsetHeight)
    this.ps = new Position(box, box2)
  }

  setup(setup: ContextMenuSetup = { timeout: 800, position: 'absolute' }) {
    this.timeout = setup.timeout
    this.positioning = setup.position
    this.ps.type = this.positioning
  }

  on(event: ContextMenuEvent, handler: (position?: Path) => void): this {
    this.handlers[event] = handler.bind(this)
    return this
  }

  activate() {
    const move: () => void = () => {
      touchMoved = true
    }
    const end: () => void = () => {
      this.src.removeEventListener(Events.TOUCHMOVE, move, true)
      this.src.removeEventListener(Events.TOUCHEND, end, true)
      clearTimeout(id)
    }
    let touchMoved: boolean = false
    let id: NodeJS.Timeout
    this.clickAway = clickAway(this.dest, this.handlers[CLICK_AWAY])
    // @start
    this.start = (touchEvent) => {
      touchEvent.stopPropagation()
      this.src.addEventListener(Events.TOUCHMOVE, move, EVENT_OPT)
      this.src.addEventListener(Events.TOUCHEND, end, EVENT_OPT)

      const signal = new Path((<TouchEvent> touchEvent).touches[0].clientX, (<TouchEvent> touchEvent).touches[0].clientY)
      const response = this.ps.from(signal)

      id = setTimeout(() => {
        if (!touchMoved && typeof this.handlers[VALIDATE] === 'function') {
          this.handlers[VALIDATE].call(this, response, this.ps.viewportExcess(signal))
        } else if (touchMoved && typeof this.handlers[FAILED] === 'function') {
          this.handlers[FAILED].call(this)
        }
      }, this.timeout)
      touchMoved = false
    }
    this.ctxhandler = (ctxEvent) => {
      ctxEvent.preventDefault()
      const signal = new Path((<MouseEvent> ctxEvent).clientX, (<MouseEvent> ctxEvent).clientY)
      const response = this.ps.from(signal)
      this.handlers[VALIDATE].call(this, response, this.ps.viewportExcess(signal))
    }

    if (Device.isMobile || navigator.maxTouchPoints || navigator.msMaxTouchPoints) {
      this.src.addEventListener(Events.TOUCHSTART, this.start, EVENT_OPT)
    } else {
      this.src.addEventListener(Events.CTXMENU, this.ctxhandler , EVENT_OPT)
    }
    this.clickAway.flip()
  }

  deactivate() {
    if (this.start) {
      this.src.removeEventListener(Events.TOUCHSTART, this.start, EVENT_OPT)
      this.src.removeEventListener(Events.CTXMENU, this.ctxhandler, EVENT_OPT)
      this.clickAway.flap()
    }
  }
}
