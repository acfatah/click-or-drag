/**
 * @typedef Options
 * @property {number} threshold
 * @property {0|1|2} button
 */

/**
 * @typedef Position
 * @property {number} x
 * @property {number} y
 */

/**
 * @typedef Delta
 * @property {number} x
 * @property {number} y
 */

export class ClickOrDrag {
  /**
   * @param {HTMLElement} element
   * @param {Options} [options]
   */
  constructor (element, options = { threshold: 10, button: 0 }) {
    /** @type {HTMLElement} */
    this.element = element

    /** @type {Options} */
    this.options = options

    /** @type {Position} */
    this.startPosition = { x: 0, y: 0 }

    /** @type {Position} */
    this.endPosition = { x: 0, y: 0 }

    /** @type {Delta} */
    this.delta = { x: 0, y: 0 }

    /** @type {0|1|2} */
    this.button = 0

    /** @type {boolean} */
    this.isClick = false

    /** @type {Function[]} */
    this.clickListeners = []

    /** @type {Function[]} */
    this.dragListeners = []

    this.element.addEventListener('mousedown', this._mousedownListener.bind(this))
    this.element.addEventListener('mouseup', this._mouseupListener.bind(this))
  }

  /** @param {MouseEvent} event */
  _mousedownListener (event) {
    this.isClick = false
    this.startPosition.x = event.clientX
    this.startPosition.y = event.clientY
  }

  /** @param {MouseEvent} event */
  _mouseupListener (event) {
    this.delta.x = Math.abs(event.clientX - this.startPosition.x)
    this.delta.y = Math.abs(event.clientY - this.startPosition.y)

    this.isClick = this.options.button === this.button &&
      this.delta.x < this.options.threshold &&
      this.delta.y < this.options.threshold

    if (this.isClick) {
      this._triggerClickListeners(event)
    } else {
      this._triggerDragListeners(event)
    }
  }

  /** @param {Event} event */
  _triggerClickListeners (event) {
    for (const listener of this.clickListeners) {
      listener(event)
    }
  }

  /** @param {Event} event */
  _triggerDragListeners (event) {
    for (const listener of this.dragListeners) {
      listener(event)
    }
  }

  onClick (listener) {
    this.clickListeners.push(listener)
  }

  onDrag (listener) {
    this.dragListeners.push(listener)
  }

  offClick (listener) {
    this.clickListeners = this.clickListeners.filter(current => current !== listener)
  }

  offDrag (listener) {
    this.dragListeners = this.dragListeners.filter(current => current !== listener)
  }
}

ClickOrDrag.LEFT_CLICK = 0
ClickOrDrag.MIDDLE_CLICK = 1
ClickOrDrag.RIGHT_CLICK = 2
