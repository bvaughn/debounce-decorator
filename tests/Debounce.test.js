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

  class MyClass {
    constructor () {
      this._debouncedCount = 0
      this._debouncedCustomCount = 0
    }

    @Debounce()
    debounced (value) {
      this._debounced = value
      this._debouncedCount++
    }

    @Debounce(100)
    debouncedCustom (value) {
      this._debouncedCustom = value
      this._debouncedCustomCount++
    }
  }

  function assertDebounceState (instance, expectedValue, expectedCount = 0) {
    expect(instance._debounced).to.equal(expectedValue)
    expect(instance._debouncedCount).to.equal(expectedCount)
  }

  function assertDebounceCustomState (instance, expectedValue, expectedCount = 0) {
    expect(instance._debouncedCustom).to.equal(expectedValue)
    expect(instance._debouncedCustomCount).to.equal(expectedCount)
  }

  it('should use a default debounce duration if no override is specified', () => {
    const instance = new MyClass()
    instance.debounced('foo')
    assertDebounceState(instance)
    timers.runTimersToTime(DEFAULT_DEBOUNCE_DURATION - 1)
    assertDebounceState(instance)
    timers.runTimersToTime(1)
    assertDebounceState(instance, 'foo', 1)
  })

  it('should use a custom debounce duration if one is specified', () => {
    const instance = new MyClass()
    instance.debouncedCustom('foo')
    assertDebounceCustomState(instance)
    timers.runTimersToTime(99)
    assertDebounceCustomState(instance)
    timers.runTimersToTime(1)
    assertDebounceCustomState(instance, 'foo', 1)
  })

  it('should queue up debounced events', () => {
    const instance = new MyClass()
    instance.debounced('foo')
    instance.debounced('bar')
    assertDebounceState(instance)
    timers.runTimersToTime(DEFAULT_DEBOUNCE_DURATION)
    assertDebounceState(instance, 'bar', 1)
    instance.debounced('foo')
    instance.debounced('baz')
    timers.runTimersToTime(DEFAULT_DEBOUNCE_DURATION)
    assertDebounceState(instance, 'baz', 2)
  })

  it('should clear any pending debounced operations', () => {
    const instance = new MyClass()
    instance.debounced('foo')
    assertDebounceState(instance)
    instance.debounced.clear()
    timers.runTimersToTime(DEFAULT_DEBOUNCE_DURATION)
    assertDebounceState(instance)
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

  it('should debounce class instances separately', () => {
    const instance1 = new MyClass()
    const instance2 = new MyClass()
    instance1.debounced('foo-1-a')
    instance2.debounced('foo-2-a')
    assertDebounceState(instance1)
    assertDebounceState(instance2)
    timers.runTimersToTime(DEFAULT_DEBOUNCE_DURATION - 1)
    instance1.debounced('foo-1-b')
    timers.runTimersToTime(1)
    assertDebounceState(instance1)
    assertDebounceState(instance2, 'foo-2-a', 1)
    timers.runTimersToTime(DEFAULT_DEBOUNCE_DURATION - 1)
    assertDebounceState(instance1, 'foo-1-b', 1)
    assertDebounceState(instance2, 'foo-2-a', 1)
  })
})
