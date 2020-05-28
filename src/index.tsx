import * as React from 'react';

export interface ImageRendererProps {
  src: string;
  loading?: React.ReactNode;
  loaded?: React.ReactNode;
  errored?: React.ReactNode;
  children?: (status: {
    image?: HTMLImageElement;
    loaded: boolean;
    errored: boolean;
  }) => React.ReactNode;
  onLoad?: () => void;
  onError?: () => void;
}

export enum ImageRendererStatus {
  LOADING,
  LOADED,
  ERRORED,
}

const isBrowser = typeof window !== 'undefined';

const isLoaded = (status: ImageRendererStatus): boolean =>
  status === ImageRendererStatus.LOADED;

const isErrored = (status: ImageRendererStatus): boolean =>
  status === ImageRendererStatus.ERRORED;

const ImageRenderer: React.FC<ImageRendererProps> = ({
  src,
  onLoad,
  onError,
  loading: loadingView,
  loaded: loadedView,
  errored: erroredView,
  children,
}) => {
  const image = React.useRef<HTMLImageElement | undefined>(undefined);
  const [status, setStatus] = React.useState<ImageRendererStatus>(
    ImageRendererStatus.LOADING,
  );

  React.useEffect(() => {
    const unload = (): void => {
      if (image.current) {
        image.current.onload = null;
        image.current.onerror = null;
      }
    };

    if (isBrowser) {
      image.current = isBrowser ? new window.Image() : undefined;
      if (image.current) {
        image.current.onload = (): void => {
          unload();
          setStatus(ImageRendererStatus.LOADED);
        };

        image.current.onerror = (): void => {
          unload();
          setStatus(ImageRendererStatus.ERRORED);
        };

        image.current.src = src;
      }
    }

    return () => {
      unload();
      setStatus(ImageRendererStatus.LOADING);
    };
  }, [src]);

  React.useEffect(() => {
    if (isLoaded(status) && onLoad) {
      onLoad();
    }
    if (isErrored(status) && onError) {
      onError();
    }
  }, [status, onLoad, onError]);

  if (isLoaded(status) && loadedView) {
    // <>{x}</> is a hack to get around typings issue
    // @see https://github.com/DefinitelyTyped/DefinitelyTyped/pull/23422
    // @see https://github.com/microsoft/TypeScript/issues/21699
    return <>{loadedView}</>;
  }

  if (isErrored(status) && erroredView) {
    // <>{x}</> is a hack to get around typings issue
    // @see https://github.com/DefinitelyTyped/DefinitelyTyped/pull/23422
    // @see https://github.com/microsoft/TypeScript/issues/21699
    return <>{erroredView}</>;
  }

  if (!isLoaded(status) && !isErrored(status) && loadingView) {
    // <>{x}</> is a hack to get around typings issue
    // @see https://github.com/DefinitelyTyped/DefinitelyTyped/pull/23422
    // @see https://github.com/microsoft/TypeScript/issues/21699
    return <>{loadingView}</>;
  }

  if (children) {
    // <>{x}</> is a hack to get around typings issue
    // @see https://github.com/DefinitelyTyped/DefinitelyTyped/pull/23422
    // @see https://github.com/microsoft/TypeScript/issues/21699
    return (
      <>
        {children({
          image: isLoaded(status) ? image.current : undefined,
          loaded: isLoaded(status),
          errored: isErrored(status),
        })}
      </>
    );
  }

  return null;
};

export default ImageRenderer;
