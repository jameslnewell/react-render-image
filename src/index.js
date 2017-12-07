// @flow
import * as React from 'react';

declare class Image {
  constructor(): void;
  src: string;
  onload?: () => void;
  onerror?: () => void;
};

export type ImageRenderProps = {
  src: string;
  onLoad?: () => void;
  onError?: () => void;
  children: ({
    image?: Image;
    loaded: boolean;
    errored: boolean;
  }) => React.Node;
};

export type ImageRenderState = {
  image?: Image;
  loaded: boolean;
  errored: boolean;
};

export default class ImageRender extends React.Component<ImageRenderProps, ImageRenderState> {

  state: ImageRenderState = {
    loaded: false,
    errored: false
  };

  handleLoad = () => {
    const {onLoad} = this.props;
    this.unload();
    this.setState(
      {loaded: true},
      () => {
        if (onLoad) {
          onLoad();
        }
      }
    );
  }

  handleError = () => {
    const {onError} = this.props;
    this.unload();
    this.setState(
      {errored: true},
      () => {
        if (onError) {
          onError();
        }
      }
    );
  }

  load() {
    const {src} = this.props;
    const image = new Image();
    this.setState(
      {
        image,
        loaded: false,
        errored: false
      },
      () => {
        image.onload = this.handleLoad;
        image.onerror = this.handleError;
        image.src = src;
      }
    );
  }

  unload() {
    const {image} = this.state;
    if (image) {
      image.onload = undefined;
      image.onerror = undefined;
    }
  }

  componentDidMount() {
    this.load();
  }

  componentDidUpdate(prevProps: ImageRenderProps) {
    const {src: prevSrc} = prevProps;
    const {src: nextSrc} = this.props;
    if (prevSrc !== nextSrc) {
      this.unload();
      this.load();
    }
  }

  componentWillUnmount() {
    this.unload();
  }

  render() {
    const {children} = this.props;
    const {image, loaded, errored} = this.state;
    return children({
      image: loaded ? image : undefined,
      loaded,
      errored
    });
  }

}

