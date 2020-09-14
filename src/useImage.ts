import React from 'react';

export enum UseImageStatus {
  LOADING = 'loading',
  LOADED = 'loaded',
  ERRORED = 'errored',
}

export interface UseImageOptions {
  src: string;
  srcset?: HTMLImageElement['srcset'];
  sizes?: HTMLImageElement['sizes']; 
}

export interface UseImageResult {
  status: UseImageStatus;
  loaded: boolean;
  errored: boolean;
  image: HTMLImageElement | undefined;
}

const isBrowser = typeof window !== 'undefined';

export const useImage = ({src, srcset, sizes}: UseImageOptions): UseImageResult => {
  const [status, setStatus] = React.useState<UseImageStatus>(
    UseImageStatus.LOADING,
  );
  const image = React.useRef<HTMLImageElement | undefined>(undefined);

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
          setStatus(UseImageStatus.LOADED);
        };

        image.current.onerror = (): void => {
          unload();
          setStatus(UseImageStatus.ERRORED);
        };

        image.current.sizes = sizes || '';
        image.current.srcset = srcset || '';
        image.current.src = src;
      }
    }

    return () => {
      unload();
      setStatus(UseImageStatus.LOADING);
    };
  }, [src, srcset, sizes]);

  return {
    status,
    loaded: status === UseImageStatus.LOADED,
    errored: status === UseImageStatus.ERRORED,
    image: image.current
  };
}
