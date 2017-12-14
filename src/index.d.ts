declare module 'react-render-image' {
  import * as React from 'react';

  export interface ImageRendererProps {
    src: string;
    loading?: React.ReactNode;
    loaded?: React.ReactNode;
    errored?: React.ReactNode;
    children?: (
      status: {
        image?: HTMLImageElement;
        loaded: boolean;
        errored: boolean;
      }
    ) => React.ReactNode;
    onLoad?: () => void;
    onError?: () => void;
  }

  export default class ImageRenderer extends React.Component<
    ImageRendererProps,
    any
  > {}
}
