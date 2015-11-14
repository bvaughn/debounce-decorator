/** @flow */

/** Default debounce duration (in ms) */
export const DEFAULT_DEBOUNCE_DURATION = 500

/** Decorates a class method so that it is debounced by the specified duration */
export default function outerDecorator (duration) {
  return function innerDecorator (target, key, descriptor) {
    return {
      get: function getter () {
        if (this[name]) {
          return this[name]
        } else {
          const newDescriptor = { configurable: true }
          newDescriptor.value = debounce(descriptor.value, duration)

          // Attach this function to the instance (not the class)
          Object.defineProperty(this, name, newDescriptor)

          return newDescriptor.value
        }
      }
    }
  }
}

/** Debounces the specified function and returns a wrapper function */
export function debounce (method, duration = DEFAULT_DEBOUNCE_DURATION) {
  let timeoutId

  function debounceWrapper (...args) {
    debounceWrapper.clear()

    timeoutId = setTimeout(() => {
      timeoutId = null
      method.apply(this, args)
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
