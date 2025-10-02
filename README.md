# posthtml-retinate

[![github actions build][img:gh-build]][url:gh-build]
[![code coverage][img:codecov]][url:codecov]

Create a srcset attribute for retina images with posthtml. Also see:
[gulp-retinate](https://github.com/bashaus/gulp-retinate).

## Installation

```
npm install posthtml posthtml-retinate
```

## Example

```javascript
const posthtml = require("posthtml");
const retinate = require("posthtml-retinate");

const inputHTML = '<img src="image@4x.png">'; // highest resolution image
const outputHTML = posthtml().use(retinate()).process(inputHTML, { sync: true }).html;

// <img src="image.png" srcset="image@2x.png 2x, image@4x.png 4x">
```

## Options

### inputFlags

A has of flags to identify the scale of the source asset.

- Since: `1.0.0`
- Property is `Optional`
- Default value: `{ 1: '@1x', 2: '@2x', 4: '@4x' }`

### inputPlace

Identifies where the input flag is located in the source filename.

- Since: `1.0.0`
- Property is `Optional`
- Default value: `endsWith`
- Validation:
  - Must be either `startsWith` or `endsWith`.

### outputFlags

A hash of flags to identify the destination scales.

- Since: `1.0.0`
- Property is `Optional`
- Default value: `{ 1: '', 2: '@2x', 4: '@4x' }`

### outputPlace

Identifies where the output flag is position in the destination filename.

- Since: `1.0.0`
- Property is `Optional`
- Default value: `append`
- Validation:
  - Must be either `prepend` or `append`.

### scaleUp

Whether or not images can be scaled up as well as down.

- Since: `1.0.0`
- Property is `Optional`
- Default value: `false`
- Validation:
  - Must be a valid `Boolean`.

For example, given `image@2x.jpg`:

When `false` (default):

```
<img src="image.jpg" srcset="image@2x.jpg 2x, image@4x.jpg 4x">
```

When `true`:

```
<img src="image.jpg" srcset="image@2x.jpg 2x">
```

[url:posthtml]: https://github.com/posthtml/posthtml
[img:codecov]: https://codecov.io/gh/bashaus/posthtml-retinate/graph/badge.svg?token=NBU47OW0JG
[url:codecov]: https://codecov.io/gh/bashaus/posthtml-retinate
[img:gh-build]: https://github.com/bashaus/posthtml-retinate/actions/workflows/build.yml/badge.svg
[url:gh-build]: https://github.com/bashaus/posthtml-retinate/actions/workflows/build.yml
