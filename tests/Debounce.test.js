import expect from 'expect.js'
import Debounce, { debounce, DEFAULT_DEBOUNCE_DURATION } from '../source/Debounce'
import FakeTimers from '../vendor/fake-timers/FakeTimers'

describe('Debounce', () => {
  const timers = new FakeTimers(global)

  before(() => {
    timers.useFakeTimers()
  })
  beforeEach(() => {
    timers.reset()
  })
  after(() => {
    timers.useRealTimers()
  })

  class Foo {
    constructor () {
      this._debouncedByDefaultCount = 0
      this._debouncedBy100Count = 0
    }

    @Debounce()
    debouncedByDefault (value) {
      this._debouncedByDefault = value
      this._debouncedByDefaultCount++
    }

    @Debounce(100)
    debouncedBy100 (value) {
      this._debouncedBy100 = value
      this._debouncedBy100Count++
    }
  }

  it('should use a default debounce duration if no override is specified', () => {
    const foo = new Foo()
    foo.debouncedByDefault('foo')
    expect(foo._debouncedByDefault).to.equal(undefined)
    timers.runTimersToTime(DEFAULT_DEBOUNCE_DURATION - 1)
    expect(foo._debouncedByDefault).to.equal(undefined)
    timers.runTimersToTime(1)
    expect(foo._debouncedByDefault).to.equal('foo')
    expect(foo._debouncedByDefaultCount).to.equal(1)
  })

  it('should use a custom debounce duration if one is specified', () => {
    const foo = new Foo()
    foo.debouncedBy100('foo')
    expect(foo._debouncedBy100).to.equal(undefined)
    timers.runTimersToTime(99)
    expect(foo._debouncedBy100).to.equal(undefined)
    timers.runTimersToTime(1)
    expect(foo._debouncedBy100).to.equal('foo')
    expect(foo._debouncedBy100Count).to.equal(1)
  })

  it('should queue up debounced events', () => {
    const foo = new Foo()
    foo.debouncedByDefault('foo')
    foo.debouncedByDefault('bar')
    expect(foo._debouncedByDefault).to.equal(undefined)
    timers.runTimersToTime(DEFAULT_DEBOUNCE_DURATION)
    expect(foo._debouncedByDefault).to.equal('bar')
    expect(foo._debouncedByDefaultCount).to.equal(1)
    foo.debouncedByDefault('foo')
    foo.debouncedByDefault('baz')
    timers.runTimersToTime(DEFAULT_DEBOUNCE_DURATION)
    expect(foo._debouncedByDefault).to.equal('baz')
    expect(foo._debouncedByDefaultCount).to.equal(2)
  })

  it('should clear any pending debounced operations', () => {
    const foo = new Foo()
    foo.debouncedByDefault('foo')
    expect(foo._debouncedByDefault).to.equal(undefined)
    foo.debouncedByDefault.clear()
    timers.runTimersToTime(DEFAULT_DEBOUNCE_DURATION)
    expect(foo._debouncedByDefault).to.equal(undefined)
    expect(foo._debouncedByDefaultCount).to.equal(0)
  })

  it('should decorate a plain function (not a class method)', () => {
    let funcValue
    let funcCalls = 0

    const debouncedFunction = debounce(
      function func (value) {
        funcValue = value
        funcCalls++
      }
    )

    debouncedFunction('foo')
    debouncedFunction('bar')
    expect(funcValue).to.equal(undefined)
    expect(funcCalls).to.equal(0)
    timers.runTimersToTime(DEFAULT_DEBOUNCE_DURATION - 1)
    expect(funcValue).to.equal(undefined)
    expect(funcCalls).to.equal(0)
    timers.runTimersToTime(1)
    expect(funcValue).to.equal('bar')
    expect(funcCalls).to.equal(1)
  })
})
