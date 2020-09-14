import React from 'react';
import {UseImageOptions, useImage, UseImageResult} from './useImage';

export interface ImageProps extends UseImageOptions {

  loading?: React.ReactNode;
  loaded?: React.ReactNode;
  errored?: React.ReactNode;

  children?: (options: UseImageResult) => React.ReactNode;

  onLoad?: () => void;
  onError?: () => void;

}

export const Image: React.FC<ImageProps> = ({
  src,
  srcset,
  sizes,
  onLoad,
  onError,
  loading: loadingView,
  loaded: loadedView,
  errored: erroredView,
  children,
}) => {
  const {status, loaded, errored, image} = useImage({src, srcset, sizes});
  
  React.useEffect(() => {
    if (loaded && onLoad) {
      onLoad();
    }
    if (errored && onError) {
      onError();
    }
  }, [loaded, errored, onLoad, onError]);

  if (loaded && loadedView) {
    // <>{x}</> is a hack to get around typings issue
    // @see https://github.com/DefinitelyTyped/DefinitelyTyped/pull/23422
    // @see https://github.com/microsoft/TypeScript/issues/21699
    return <>{loadedView}</>;
  }

  if (errored && erroredView) {
    // <>{x}</> is a hack to get around typings issue
    // @see https://github.com/DefinitelyTyped/DefinitelyTyped/pull/23422
    // @see https://github.com/microsoft/TypeScript/issues/21699
    return <>{erroredView}</>;
  }

  if (!loaded && !errored && loadingView) {
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
          image,
          status,
          loaded,
          errored,
        })}
      </>
    );
  }

  return null;
};
