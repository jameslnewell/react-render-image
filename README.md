# react-image-render

Load and render an image with react.

## Installation

```
npm install --save react-image-render
```

## Usage

[Example](https://jameslnewell.github.io/react-image-render/) ([source](https://github.com/jameslnewell/react-image-render/blob/master/example/App.js#L8))

```js
import React from 'react';
import ImageLoader from 'react-image-render';

<ImageLoader src={src}>
  {({image, loaded, errored}) => {

    if (loaded) {
      return (
        <img src={src} width={image.width} height={image.height}/>;
    }

    if (errored) {
      return <span>❌</span>;
    }

    return <span>Loading...</span>;
  }}
</ImageLoader>
```

## API

### Props

#### src

A `string`. The image URL.

#### onLoad

A `function` called when the image is loaded.

#### onLoad

A `function` called when the image cannot be loaded.

#### children

The `function` called to render something when the image is loading, loaded or errored.

**Parameters:**

- `status` - An `object` containing:
  - `loaded` - A `boolean` indicating whether the image has loaded.
  - `errored` - A `boolean`indicating whether the image has errored.
  - `image` - The `Image` object which can be inspected to determine the `width` and `height` of the image, or drawn onto a canvas with `ctx.drawImage()`.

**Returns:**

A `RectNode`.