# react-render-image

[![Build Status](https://travis-ci.org/jameslnewell/react-render-image.svg?branch=master)](https://travis-ci.org/jameslnewell/react-render-image)

Render an image in React.

## Installation

```bash
npm install --save react-render-image
// OR
yarn add react-render-image
```

## Usage

[Example](https://jameslnewell.github.io/react-render-image/) ([source](https://github.com/jameslnewell/react-render-image/blob/master/example/App.js))

```js
import React from 'react';
import {Image, useImage} from 'react-render-image';

const {image, loaded, errored} = useImage({src});

<Image src={src} loading="🔄" loaded="✅" errored="❌"/>

<Image src={src} loading="🔄" errored="❌">
  {({image, loaded, errored}) => {
    return <img src={image.src} width={image.width} height={image.height}/>;
  }}
</Image>
```

## API

### &lt;Image/&gt;

#### Props

##### src (required)

> `string`

The image URI.

##### srcset

> `string`

The image URIs to use given various conditions. See the [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/srcset) for further detail.

##### sizes

> `string`

The width of the image given various conditions. See the [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/sizes) for further detail.

##### loading

> React.Node

Rendered when the image is `loading`.

##### loaded

> React.Node

Rendered when the image is `loaded`.

##### errored

> React.Node

Rendered when the image is `errored`.

##### children

> `({ image?: Image; status: enum, loaded: boolean; errored: boolean; }) => React.Node`

Called to render something when the image is `loading`, `loaded` or `errored`.

**Parameters:**

* `status` - An enum indicating whether the image is loading, loaded or errored.
* `loaded` - A `boolean` indicating whether the image has loaded.
* `errored` - A `boolean` indicating whether the image has errored.
* `image` - The `Image` object. This can be used to inspect the `width` and `height` of the image, or it can be drawn onto a canvas using `ctx.drawImage()`.

**Returns:**

> `RectNode`

##### onLoad

> `() => void`

Called when the image has been loaded.

##### onError

> `() => void`

Called when the image cannot be loaded.

### useImage(options)

> `useImage({ src?: string; srcset: string[]; sizes: string[]; }) => {status, image?: Image}`

**Parameters:**

* `src` - An enum indicating whether the image is loading, loaded or errored.
* `srcset` - The image URIs to use given various conditions. See the [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/srcset) for further detail.
* `sizes` - The image URIs to use given various conditions. See the [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/sizes) for further detail.

**Returns:**

> * `status` - An enum indicating whether the image is loading, loaded or errored.
> * `loaded` - A `boolean` indicating whether the image has loaded.
> * `errored` - A `boolean` indicating whether the image has errored
> * `image` - The `Image` object. This can be used to inspect the `width` and `height` of the image, or it can be drawn onto a canvas using `ctx.drawImage()`.

