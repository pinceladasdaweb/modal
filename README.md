# modal
An extremely simple modal plugin developed with Vanilla JS

## Demo

View [demo here](https://pinceladasdaweb.github.io/modal/example/)

## Download

You can download the latest version or checkout all the releases [here](https://github.com/pinceladasdaweb/modal/releases).

## How to use?

Require the package or use the global `Modal` namespace:

### AMD
```html
<script>
require(["path/to/modal.js"], function(Modal) {
    // Code here
});
</script>
```

### commonJS
```js
var Modal = require('modal');
```

### ES6
```js
import Modal from 'modal';
```

### Browser
```html
<script src="path/to/modal.js"></script>
```

## Basic Usage

Open modal with custom content or html:

```js
<script>
    new Modal({
        content: '<div class="my-class">Content of my modal here</div>'
    });
</script>
```

Open modal indicating an element in the HTML:

```html
<div class="mdl-content" style="display: none">
    <h2>Modal content here</h2>
</div>

<script>
    var mdl = document.querySelector('.mdl-content');

    new Modal({
        content: mdl
    });
</script>
```

## Options

The script expect the following options:

| Value                              | Description                                                                  |
| ---------------------------------- |:----------------------------------------------------------------------------:|
| **content**                        | String/DOM node. Required. The content of your modal.                        |
| **minHeight**                      | Integer/String. Optional. The min-height of modal. Default is 250px.         |
| **maxWidth**                       | Integer/String. Optional. The min-height of modal. Default is 600px.         |
| **onOpen**                         | Optional. Function to run after modal is open.                               |
| **onClose**                        | Optional. Function to run after modal is closed.                             |

## Browser Support

![IE](https://raw.githubusercontent.com/alrra/browser-logos/master/internet-explorer/internet-explorer_48x48.png) | ![Chrome](https://raw.githubusercontent.com/alrra/browser-logos/master/chrome/chrome_48x48.png) | ![Firefox](https://raw.githubusercontent.com/alrra/browser-logos/master/firefox/firefox_48x48.png) | ![Opera](https://raw.githubusercontent.com/alrra/browser-logos/master/opera/opera_48x48.png) | ![Safari](https://raw.githubusercontent.com/alrra/browser-logos/master/safari/safari_48x48.png)
--- | --- | --- | --- | --- |
IE 10+ ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ |

## Contributing

Check [CONTRIBUTING.md](CONTRIBUTING.md) for more information.

## History

Check [Releases](https://github.com/pinceladasdaweb/modal/releases) for detailed changelog.

## License
[MIT](LICENSE)