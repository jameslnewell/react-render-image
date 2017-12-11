declare module 'react-render-image' {

  import * as React from 'react';

  export interface ImageProps {
    src: string;
    onLoad?: () => void;
    onError?: () => void;
    children: (status: {
      image?: HTMLImageElement;
      loaded: boolean;
      errored: boolean;
    }) => React.ReactNode;
  }

  export default class Image extends React.Component<ImageProps, any> {
  }

}
