# posthtml-retinate

[![npm version][img:npm]][url:npm]
[![build status][img:build-status]][url:build-status]

> Create a srcset attribute for retina images with posthtml

Also see: [gulp-retinate](https://github.com/bashaus/gulp-retinate)

&nbsp;

## Installation

```
npm install posthtml posthtml-retinate
```

&nbsp;

## Example

```javascript
const posthtml = require('posthtml');
const retinate = require('posthtml-retinate');

const inputHTML = '<img src="image@4x.png">'; // highest resolution image
const outputHTML = posthtml()
  .use(retinate())
  .process(inputHTML, { sync: true })
  .html;

// <img src="image.png" srcset="image@2x.png 2x, image@4x.png 4x">
```

&nbsp;

## Options

### inputFlags

A has of flags to identify the scale of the source asset.

* Since: `1.0.0`
* Property is `Optional`
* Default value: `{ 1: '@1x', 2: '@2x', 4: '@4x' }`

&nbsp;

### inputPlace

Identifies where the input flag is located in the source filename.

* Since: `1.0.0`
* Property is `Optional`
* Default value: `endsWith`
* Validation:
  * Must be either `startsWith` or `endsWith`.

&nbsp;

### outputFlags

A hash of flags to identify the destination scales.

* Since: `1.0.0`
* Property is `Optional`
* Default value: `{ 1: '', 2: '@2x', 4: '@4x' }`

&nbsp;

### outputPlace

Identifies where the output flag is position in the destination filename.

* Since: `1.0.0`
* Property is `Optional`
* Default value: `append`
* Validation:
  * Must be either `prepend` or `append`.

&nbsp;

### scaleUp

Whether or not images can be scaled up as well as down.

* Since: `1.0.0`
* Property is `Optional`
* Default value: `false`
* Validation:
  * Must be a valid `Boolean`.

For example, given `image@2x.jpg`:

When `false` (default):

```
<img src="image.jpg" srcset="image@2x.jpg 2x, image@4x.jpg 4x">
```

When `true`:

```
<img src="image.jpg" srcset="image@2x.jpg 2x">
```

&nbsp;

[url:posthtml]: https://github.com/posthtml/posthtml

[img:build-status]: https://travis-ci.org/bashaus/posthtml-retinate.svg
[url:build-status]: https://travis-ci.org/bashaus/posthtml-retinate

[img:npm]: https://img.shields.io/npm/v/posthtml-retinate.svg
[url:npm]: https://www.npmjs.com/package/posthtml-retinate
