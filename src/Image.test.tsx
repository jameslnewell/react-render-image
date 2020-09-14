import 'raf/polyfill';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {render} from '@testing-library/react';
import { UseImageStatus, useImageMock, UseImageResult } from './useImage';
import { Image } from './Image';

declare module "./useImage" {
  export const useImageMock: jest.Mock<UseImageResult>;
}

jest.mock('./useImage', () => {
  const useImageModule = jest.requireActual('./useImage');
  const useImageMock = jest.spyOn(useImageModule, 'useImage');
  return {
    ...useImageModule,
    useImageMock 
  };
});

const src = "https://example.com/example.jpg";
const mockComponent1ID = 'component-1';
const mockComponent2ID = 'component-2';
const mockComponent3ID = 'component-3';

const MockComponent1: React.FC = () => {
  return <div data-testid={mockComponent1ID} />;
};

const MockComponent2: React.FC = () => {
  return <div data-testid={mockComponent2ID} />;
};

const MockComponent3: React.FC = () => {
  return <div data-testid={mockComponent3ID} />;
};

describe('<Image/>', () => {
  describe('loading', () => {
    beforeEach(() => {
      useImageMock.mockReturnValue({
        status: UseImageStatus.LOADING,
        loaded: false,
        errored: false,
        image: undefined
      });
    });

    test('should render the "loading" node when there is a "loading" node and a render function', () => {
      const fn = jest.fn().mockReturnValue(null);
      const {queryByTestId} = render(
        <Image
          src={src}
          loading={<MockComponent1 />}
          loaded={<MockComponent2 />}
          errored={<MockComponent3 />}
        >
          {fn}
        </Image>,
      );
      expect(queryByTestId(mockComponent1ID)).not.toBeNull();
      expect(queryByTestId(mockComponent2ID)).toBeNull();
      expect(queryByTestId(mockComponent3ID)).toBeNull();
      expect(fn).not.toBeCalled();
    });

    test('should render the render function when there is no "loading" node and a render function', () => {
      const fn = jest.fn().mockReturnValue(null);
      const {queryByTestId} = render(
        <Image
          src={src}
          loaded={<MockComponent2 />}
          errored={<MockComponent3 />}
        >
          {fn}
        </Image>,
      );
      expect(queryByTestId(mockComponent1ID)).toBeNull();
      expect(queryByTestId(mockComponent2ID)).toBeNull();
      expect(queryByTestId(mockComponent3ID)).toBeNull();
      expect(fn).toBeCalledWith({
        status: UseImageStatus.LOADING,
        loaded: false, 
        errored: false,
        image: undefined
      });
    });

    test('should render null when there is no "loading" node and no render function', () => {
      const {container} = render(
        <Image src={src} />,
      );
      expect(container.children).toHaveLength(0);
    });
  });

  describe('loaded', () => {
    beforeEach(() => {
      useImageMock.mockReturnValue({
        status: UseImageStatus.LOADED,
        loaded: true,
        errored: false,
        image: undefined
      });
    });

    test('should render the "loaded" node when there is a "loaded" node and a render function', async () => {
      const fn = jest.fn().mockReturnValue(null);
      const {queryByTestId} = render(
        <Image
          src={src}
          loading={<MockComponent1 />}
          loaded={<MockComponent2 />}
          errored={<MockComponent3 />}
        >
          {fn}
        </Image>,
      );
      expect(queryByTestId(mockComponent1ID)).toBeNull();
      expect(queryByTestId(mockComponent2ID)).not.toBeNull();
      expect(queryByTestId(mockComponent3ID)).toBeNull();
      expect(fn).not.toBeCalled();
    });

    test('should render the render function when there is no "loaded" node and a render function', () => {
      const fn = jest.fn().mockReturnValue(null);
      const {queryByTestId} = render(
        <Image
          src={src}
          loading={<MockComponent2 />}
          errored={<MockComponent3 />}
        >
          {fn}
        </Image>,
      );
      expect(queryByTestId(mockComponent1ID)).toBeNull();
      expect(queryByTestId(mockComponent2ID)).toBeNull();
      expect(queryByTestId(mockComponent3ID)).toBeNull();
      expect(fn).toBeCalledWith(
        expect.objectContaining({
          image: expect.objectContaining({}),
          loaded: true,
          errored: false,
        }),
      );
    });

    test('should render null when there is no "loaded" node and no render function', () => {
      const {container} = render(
        <Image src={src} />,
      );
      expect(container.children).toHaveLength(0);
    });

    test('should call onLoad', () => {
      const onLoad = jest.fn();
      const onError = jest.fn();
      render(
        <Image
          src={src}
          onLoad={onLoad}
          onError={onError}
        />,
      );
      expect(onLoad).toBeCalled();
      expect(onError).not.toBeCalled();
    });
  });

  describe('errored', () => {
    beforeEach(() => {
      useImageMock.mockReturnValue({
        status: UseImageStatus.ERRORED,
        loaded: false,
        errored: true,
        image: undefined
      });
    });

    test('should render the "errored "node when there is an "errored" node and a render function', () => {
      const fn = jest.fn().mockReturnValue(null);
      const {queryByTestId} = render(
        <Image
          src={src}
          loading={<MockComponent1 />}
          loaded={<MockComponent2 />}
          errored={<MockComponent3 />}
        >
          {fn}
        </Image>,
      );
      expect(queryByTestId(mockComponent1ID)).toBeNull();
      expect(queryByTestId(mockComponent2ID)).toBeNull();
      expect(queryByTestId(mockComponent3ID)).not.toBeNull();
      expect(fn).not.toBeCalled();
    });

    test('should render the render function when there is no "errored" node and a render function', () => {
      const fn = jest.fn().mockReturnValue(null);
      const {queryByTestId} = render(
        <Image
          src={src}
          loading={<MockComponent1 />}
          loaded={<MockComponent2 />}
        >
          {fn}
        </Image>,
      );
      expect(queryByTestId(mockComponent1ID)).toBeNull();
      expect(queryByTestId(mockComponent2ID)).toBeNull();
      expect(queryByTestId(mockComponent3ID)).toBeNull();
      expect(fn).toBeCalledWith({      
        status: UseImageStatus.ERRORED,
        loaded: false, 
        errored: true,
        image: undefined
      });
    });

    test('should render null when there is no "errored" node and no render function', () => {
      const {container} = render(
        <Image src={src} />,
      );
      expect(container.children).toHaveLength(0);
    });

    test('should call onError', () => {
      const onLoad = jest.fn();
      const onError = jest.fn();
      render(
        <Image
          src={src}
          onLoad={onLoad}
          onError={onError}
        />,
      );
      expect(onLoad).not.toBeCalled();
      expect(onError).toBeCalled();
    });
  });

  test('should load a new image when a "src" is changed', async () => {
    useImageMock.mockReturnValue({
      status: UseImageStatus.ERRORED,
      loaded: false,
      errored: true,
      image: undefined
    });
    const fn = jest.fn().mockReturnValue(null);
    const {rerender} = render(
      <Image src="https://example.com/a.jpg">{fn}</Image>,
    );
    expect(fn).toBeCalledWith(
      expect.objectContaining({loaded: false, errored: true}),
    );
    useImageMock.mockReturnValue({
      status: UseImageStatus.LOADED,
      loaded: true,
      errored: false,
      image: undefined
    });
    fn.mockClear();
    rerender(<Image src="https://example.com/b.jpg">{fn}</Image>);
    expect(fn).toBeCalledWith(
      expect.objectContaining({loaded: true, errored: false}),
    );
  });

  test('does not throw when SSR', () => {
    expect(() =>
      ReactDOMServer.renderToString(
        <Image src={src} />,
      ),
    ).not.toThrowError();
  });
});
