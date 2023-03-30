import { describe, it, expect } from 'vitest'
import { ClickOrDrag } from '../index.js'

describe('ClickOrDrag', () => {
  describe('clicking', () => {
    it('isClick should return true', () => {
      const div = document.createElement('div')

      div.innerHTML = `
          <div>
            <label for="username">Username</label>
            <input id="username" />
            <button>Print Username</button>
          </div>
        `
      const clickOrDrag = new ClickOrDrag(div)
      const simMousedownEvent = new MouseEvent('mousedown', {
        bubbles: true,
        cancelable: true,
        clientX: 10,
        clientY: 10
      })
      div.dispatchEvent(simMousedownEvent)

      const simMouseupEvent = new MouseEvent('mouseup', {
        bubbles: true,
        cancelable: true,
        clientX: 15,
        clientY: 15
      })
      div.dispatchEvent(simMouseupEvent)

      expect(clickOrDrag.isClick).toBeTruthy()
    })
  })

  describe('dragging', () => {
    it('isClick should return false', () => {
      const div = document.createElement('div')

      div.innerHTML = `
          <div>
            <label for="username">Username</label>
            <input id="username" />
            <button>Print Username</button>
          </div>
        `
      const clickOrDrag = new ClickOrDrag(div)
      const simMousedownEvent = new MouseEvent('mousedown', {
        bubbles: true,
        cancelable: true,
        clientX: 10,
        clientY: 10
      })
      div.dispatchEvent(simMousedownEvent)

      const simMouseupEvent = new MouseEvent('mouseup', {
        bubbles: true,
        cancelable: true,
        clientX: 30,
        clientY: 30
      })
      div.dispatchEvent(simMouseupEvent)

      expect(clickOrDrag.isClick).toBeFalsy()
    })
  })
})
