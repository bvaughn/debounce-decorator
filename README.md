# Debounce decorator

Debouncing is a JavaScript pattern commonly used for rate limiting event handlers for keyboard or scroll events.
Check out [this article](https://davidwalsh.name/javascript-debounce-function) by David Walsh for more background information.
This library provides a decorator that you can use to debounce class methods.

# Installation

Install this component using NPM like so:
```bash
npm install debounce-decorator --save-dev
```

# Usage

Debounce class methods like so:

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

Debounced functions also define a `clear` property that can be used to cancel any pending, debounced updates.


```javascript
import Debounce from 'debounce-decorator'

class MyReactComponent extends Component {
  componentDidMount () {
    // Attach some global event handler to this.onGlobalEvent
  }

  componentWillUnmount () {
    // Remove the global event handler
    // And clear any pending, debounced updates
    this.onGlobalEvent.clear()
  }

  @Debounce()
  onGlobalEvent(event) {
    // This code will be debounced by 500ms (the default amount)
  }
}
```

You can  also decorate plan functions (not class methods) if you'd like.

```javascript
import { debounce } from 'debounce-decorator'

const debouncedFunction = debounce(
  function normalFunction (value) {
    // ...
  }
)
```

# License

*debounce-decorator* is available under the MIT License.
