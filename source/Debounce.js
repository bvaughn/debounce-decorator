/** @flow */

/** Default debounce duration (in ms) */
export const DEFAULT_DEBOUNCE_DURATION = 500

/** Decorates a class method so that it is debounced by the specified duration */
export default function outerDecorator (duration) {
  return function innerDecorator (target, key, descriptor) {
    descriptor.value = debounce(descriptor.value, duration)

    return descriptor
  }
}

/** Debounces the specified function and returns a wrapper function */
export function debounce (method, duration = DEFAULT_DEBOUNCE_DURATION) {
  let timeoutId

  function debounceWrapper () {
    debounceWrapper.clear()

    timeoutId = setTimeout(() => {
      timeoutId = null
      method.apply(this, arguments)
    }, duration)
  }

  debounceWrapper.clear = function () {
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
  }

  return debounceWrapper
}
