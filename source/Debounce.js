/** @flow */

export const DEFAULT_DEBOUNCE_DURATION = 500

/**
 * Decorates a class method so that it is debounced by the specified duration.
 */
export default function Debounce (duration = 500) {
  return function debouncedDecorator (target, key, descriptor) {
    const method = descriptor.value
    let setTimeoutId

    descriptor.value = function () {
      if (setTimeoutId) {
        clearTimeout(setTimeoutId)
      }

      setTimeoutId = setTimeout(() => {
        setTimeoutId = undefined
        method.apply(this, arguments)
      }, duration)
    }

    return descriptor
  }
}
