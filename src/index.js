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

function loading(image: Image): $Shape<ImageRendererState> {
  return {
    image,
    isLoaded: false,
    isErrored: false
  };
}

function loaded(): $Shape<ImageRendererState> {
  return {
    isLoaded: true
  };
}

function errored(): $Shape<ImageRendererState> {
  return {
    isErrored: true
  };
}

function hasPropsChanged(
  prevProps: ImageRendererProps,
  nextProps: ImageRendererProps
): boolean {
  const {src: prevSrc} = prevProps;
  const {src: nextSrc} = nextProps;
  return prevSrc !== nextSrc;
}

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
    this.setState(loaded(), () => {
      if (onLoad) {
        onLoad();
      }
    });
  };

  handleError = () => {
    const {onError} = this.props;
    this.unload();
    this.setState(errored(), () => {
      if (onError) {
        onError();
      }
    });
  };

  load() {
    const {src} = this.props;
    const {image} = this.state;

    if (image) {
      image.onload = this.handleLoad;
      image.onerror = this.handleError;
      image.src = src;
    }
  }

  unload() {
    const {image} = this.state;
    if (image) {
      image.onload = undefined;
      image.onerror = undefined;
    }
  }

  componentWillMount() {
    if (typeof window === 'undefined') {
      return;
    }
    this.setState(loading(new Image()));
  }

  componentDidMount() {
    this.load();
  }

  componentWillReceiveProps(nextProps: ImageRendererProps) {
    if (hasPropsChanged(this.props, nextProps)) {
      this.setState(loading(new Image()));
    }
  }

  componentDidUpdate(prevProps: ImageRendererProps) {
    if (hasPropsChanged(prevProps, this.props)) {
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
