declare module 'react-image-render' {

  import * as React from 'react';

  export interface ImageRenderProps {
    src: string;
    onLoad?: () => void;
    onError?: () => void;
    children: (status: {
      image?: Image;
      loaded: boolean;
      errored: boolean;
    }) => React.ReactNode;
  }

  export default class ImageRender extends React.Component<ImageRenderProps, any> {
  }

}
