# react-render-image

[![Build Status](https://travis-ci.org/jameslnewell/react-render-image.svg?branch=master)](https://travis-ci.org/jameslnewell/react-render-image)

Render an image in React.

## Installation

```
npm install --save react-render-image
```

## Usage

[Example](https://jameslnewell.github.io/react-render-image/) ([source](https://github.com/jameslnewell/react-render-image/blob/master/example/App.js))

```js
import React from 'react';
import Image from 'react-render-image';

<Image src={src} loading="🔄" loaded="✅" errored="❌"/>

<Image src={src} loading="🔄" errored="❌">
  {({image, loaded, errored}) => {
    return <img src={image.src} width={image.width} height={image.height}/>;
  }}
</Image>
```

## API

### Props

#### src (required)

> `string`

The image URI.

#### loading

> React.Node

Rendered when the image is `loading`.

#### loaded

> React.Node

Rendered when the image is `loaded`.

#### errored

> React.Node

Rendered when the image is `errored`.

#### children

> `({ image?: Image; loaded: boolean; errored: boolean; }) => React.Node`

Called to render something when the image is `loading`, `loaded` or `errored`.

**Parameters:**

* `image` - The `Image` object. This can be used to inspect the `width` and `height` of the image, or it can be drawn onto a canvas using `ctx.drawImage()`.
* `loaded` - A `boolean` indicating whether the image has loaded.
* `errored` - A `boolean` indicating whether the image has errored.

**Returns:**

> `RectNode`

#### onLoad

> `() => void`

Called when the image has been loaded.

#### onError

> `() => void`

Called when the image cannot be loaded.
