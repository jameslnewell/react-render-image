// @flow
import * as React from 'react';

declare class Image {
  constructor(): void;
  src: string;
  onload?: () => void;
  onerror?: () => void;
}

export type ImageRendererProps = {
  src: string,
  loading?: React.Node,
  loaded?: React.Node,
  errored?: React.Node,
  children?: ({
    image?: Image,
    loaded: boolean,
    errored: boolean
  }) => React.Node,
  onLoad?: () => void,
  onError?: () => void
};

export type ImageRendererState = {
  image?: Image,
  isLoaded: boolean,
  isErrored: boolean
};

export default class ImageRenderer extends React.Component<
  ImageRendererProps,
  ImageRendererState
> {
  state: ImageRendererState = {
    isLoaded: false,
    isErrored: false
  };

  handleLoad = () => {
    const {onLoad} = this.props;
    this.unload();
    this.setState({isLoaded: true}, () => {
      if (onLoad) {
        onLoad();
      }
    });
  };

  handleError = () => {
    const {onError} = this.props;
    this.unload();
    this.setState({isErrored: true}, () => {
      if (onError) {
        onError();
      }
    });
  };

  load() {
    const {src} = this.props;
    const image = new Image();
    this.setState(
      {
        image,
        isLoaded: false,
        isErrored: false
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

  componentDidUpdate(prevProps: ImageRendererProps) {
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
    const {loading, loaded, errored, children} = this.props;
    const {image, isLoaded, isErrored} = this.state;

    if (isLoaded && loaded) {
      return loaded;
    }

    if (isErrored && errored) {
      return errored;
    }

    if (!isLoaded && !isErrored && loading) {
      return loading;
    }

    if (children) {
      return children({
        image: isLoaded ? image : undefined,
        loaded: isLoaded,
        errored: isErrored
      });
    }

    return null;
  }
}
