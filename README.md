# Debounce decorator

Debouncing is a common JavaScript pattern when listening to events like "keyup" or "keydown". This library provides a decorator that you can use to debounce class methods. For example:

```javascript
import Debounce from 'debounce-decorator'

class MyComponent {
  constructor() {
    document.addEventListener('keyup', this.onKeyUp)
  }

  @Debounce(250)
  onKeyUp(event) {
    // This code will be debounced by 250ms
  }
}
```

# Installation

Install this component using NPM like so:
```bash
npm install debounce-decorator --save-dev
```

# License

*react-component-boilerplate* is available under the MIT License.

