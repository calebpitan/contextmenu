import { Positioning } from './type'
import Box2D from './utility/box2d'
import Path from './utility/path'

export interface ViewPortQuery {
  top: boolean,
  left: boolean,
  right: boolean,
  bottom: boolean
}
export default class Position {
  box: Box2D
  elementBox: Box2D
  private positioning: Positioning
  constructor(box: Box2D, elementBox: Box2D) {
    this.box = box
    this.elementBox = elementBox
    this.positioning = 'absolute'
  }

  set type(position: Positioning) {
    this.positioning = position
  }

  from({ x: x0, y: y0 }: Path) {
    const x = this.generateX(x0)
    const y = this.generateY(y0)
    return new Path(x, y)
  }

  viewportExcess({ x, y }: Path): ViewPortQuery {
    const vpq: ViewPortQuery = {
      top: false,
      left: false,
      right: false,
      bottom: false
    }
    vpq.right = this.elementBox.width + x > this.box.width
    vpq.bottom = this.elementBox.height + y > this.box.height
    return vpq
  }

  private generateX(x: number): number {
    if (this.positioning === 'relative') {
      return this.elementBox.width + x > this.box.width ? x - this.elementBox.width : x
    }
    return this.getAbsoluteX(x)
  }

  private generateY(y: number): number {
    if (this.positioning === 'relative') {
      return this.elementBox.height + y > this.box.height ? y - this.elementBox.height : y
    }
    return this.getAbsoluteY(y)
  }

  private getAbsoluteX(x: number): number {
    return this.elementBox.width + x > this.box.width ? this.box.width - x : x
  }

  private getAbsoluteY(y: number): number {
    return this.elementBox.height + y > this.box.height ? this.box.height - y : y
  }
}
