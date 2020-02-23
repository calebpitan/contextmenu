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
    this.positioning = 'relative'
  }

  private get viewBoxIsGridLayout(): boolean {
    return !this.viewBoxIsWindow && (<HTMLElement> this.viewBox).offsetLeft !== this.viewBoxBoundingClientRect.left
  }

  set type(position: Positioning) {
    this.positioning = position
  }

  from({ x: x0, y: y0 }: Path) {
    const x = this.generateX(x0)
    const y = this.generateY(y0)
    return new Path(x, y)
  }

  viewportExcess(path: Path): ViewPortQuery {
    const { x, y } = this.transformPath(path)
    const vpq: ViewPortQuery = {
      top: false,
      left: false,
      right: false,
      bottom: false
    }
    if (this.positioning !== 'fixed') {
      vpq.right = this.elementBox.width + x > this.box.width
      vpq.bottom = this.elementBox.height + y > this.box.height
    }
    return vpq
  }

  private generateX(x: number): number {
    if (this.positioning === 'absolute') {
      return this.elementBox.width + x > this.box.width ? x - this.elementBox.width : x
    } else if (this.positioning === 'static') {
      return x
    } else if (this.positioning === 'fixed') {
      return (this.box.width - this.elementBox.width) / 2
    }
    return this.getRelativeX(x)
  }

  private generateY(y: number): number {
    if (this.positioning === 'absolute') {
      return this.elementBox.height + y > this.box.height ? y - this.elementBox.height : y
    } else if (this.positioning === 'static') {
      return y
    } else if (this.positioning === 'fixed') {
      return (this.box.height - this.elementBox.height) / 2
    }
    return this.getRelativeY(y)
  }

  private getRelativeX(x: number): number {
    return this.elementBox.width + x > this.box.width ? this.box.width - x : x
  }

  private getRelativeY(y: number): number {
    return this.elementBox.height + y > this.box.height ? this.box.height - y : y
  }

  private transformPath(path: Path): Path {
    if (this.viewBoxIsGridLayout && this.viewBoxBoundingClientRect !== null) {
      return new Path(
        path.x - this.viewBoxBoundingClientRect.left,
        path.y - this.viewBoxBoundingClientRect.top
      )
    }
    return path
  }
}
