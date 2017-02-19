# babel-plugin-transform-xregexp

Use [XRegExp] syntax in your regular expressions. See the [tests] for a few
examples of supported syntax. Note that not all XRegExp syntax can be parsed by
Babel.

[XRegExp]: http://xregexp.com/
[tests]: test/fixtures/

## Installation

```sh
$ npm install babel-plugin-transform-xregexp
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-xregexp"]
}
```

### Via CLI

```sh
$ babel --plugins transform-xregexp script.js
```

### Via Node API

```javascript
require('babel').transform('code', {
  plugins: ['transform-xregexp']
});
```
