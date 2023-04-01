import { describe, it, expect, vi, afterEach } from 'vitest'
import { ClickOrDrag } from '../index.js'

describe('ClickOrDrag', () => {
  afterEach(async () => {
    vi.restoreAllMocks()
  })

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

  describe('onClick and offClick listener', () => {
    it('the listener should be called', () => {
      const div = document.createElement('div')
      const listener = vi.fn()

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
      const simMouseupEvent = new MouseEvent('mouseup', {
        bubbles: true,
        cancelable: true,
        clientX: 15,
        clientY: 15
      })

      // Register the listener
      clickOrDrag.onClick(listener)
      div.dispatchEvent(simMousedownEvent)
      div.dispatchEvent(simMouseupEvent)

      // Unregister the listener
      clickOrDrag.offClick(listener)
      div.dispatchEvent(simMousedownEvent)
      div.dispatchEvent(simMouseupEvent)

      expect(clickOrDrag.isClick).toBeTruthy()
      expect(listener).toBeCalledTimes(1)
    })
  })

  describe('onDrag and offDrag listener', () => {
    it('the listener should be called', () => {
      const div = document.createElement('div')
      const listener = vi.fn()

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
      const simMouseupEvent = new MouseEvent('mouseup', {
        bubbles: true,
        cancelable: true,
        clientX: 30,
        clientY: 30
      })

      // Register the listener
      clickOrDrag.onDrag(listener)
      div.dispatchEvent(simMousedownEvent)
      div.dispatchEvent(simMouseupEvent)

      // Unregister the listener
      clickOrDrag.offDrag(listener)
      div.dispatchEvent(simMousedownEvent)
      div.dispatchEvent(simMouseupEvent)

      expect(clickOrDrag.isClick).toBeFalsy()
      expect(listener).toBeCalledTimes(1)
    })
  })
})
