import React from 'react';
import 'raf/polyfill';
import {render} from '@testing-library/react';
import ImageRender from '.';

class MockImageLoading {
  set src(_: string) {
    /* do nothing */
  }
  onload = null;
  onerror = null;
}

class MockImageLoaded {
  set src(_: string) {
    if (this.onload) {
      this.onload({} as any);
    }
  }
  onload?: Function = undefined;
  onerror?: Function = undefined;
}

class MockImageErrored {
  set src(_: string) {
    if (this.onerror) {
      this.onerror({} as any);
    }
  }
  onload?: Function = undefined;
  onerror?: Function = undefined;
}

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

describe('<ImageRenderer/>', () => {
  describe('loading:', () => {
    beforeEach(() => {
      (globalThis as any).Image = MockImageLoading;
    });

    test('should render the "loading" node when there is a "loading" node and a render function', () => {
      const fn = jest.fn().mockReturnValue(null);
      const {queryByTestId} = render(
        <ImageRender
          src="https://example.com/example.jpg"
          loading={<MockComponent1 />}
          loaded={<MockComponent2 />}
          errored={<MockComponent3 />}
        >
          {fn}
        </ImageRender>,
      );
      expect(queryByTestId(mockComponent1ID)).not.toBeNull();
      expect(queryByTestId(mockComponent2ID)).toBeNull();
      expect(queryByTestId(mockComponent3ID)).toBeNull();
      expect(fn).not.toBeCalled();
    });

    test('should render the render function when there is no "loading" node and a render function', () => {
      const fn = jest.fn().mockReturnValue(null);
      const {queryByTestId} = render(
        <ImageRender
          src="https://example.com/example.jpg"
          loaded={<MockComponent2 />}
          errored={<MockComponent3 />}
        >
          {fn}
        </ImageRender>,
      );
      expect(queryByTestId(mockComponent1ID)).toBeNull();
      expect(queryByTestId(mockComponent2ID)).toBeNull();
      expect(queryByTestId(mockComponent3ID)).toBeNull();
      expect(fn).toBeCalledWith({loaded: false, errored: false});
    });

    test('should render null when there is no "loading" node and no render function', () => {
      const {container} = render(
        <ImageRender src="https://example.com/example.jpg" />,
      );
      expect(container.children).toHaveLength(0);
    });
  });

  describe('loaded:', () => {
    beforeEach(() => {
      (globalThis as any).Image = MockImageLoaded;
    });

    test('should render the "loaded" node when there is a "loaded" node and a render function', async () => {
      const fn = jest.fn().mockReturnValue(null);
      const {queryByTestId} = render(
        <ImageRender
          src="https://example.com/example.jpg"
          loading={<MockComponent1 />}
          loaded={<MockComponent2 />}
          errored={<MockComponent3 />}
        >
          {fn}
        </ImageRender>,
      );
      expect(queryByTestId(mockComponent1ID)).toBeNull();
      expect(queryByTestId(mockComponent2ID)).not.toBeNull();
      expect(queryByTestId(mockComponent3ID)).toBeNull();
      expect(fn).not.toBeCalled();
    });

    test('should render the render function when there is no "loaded" node and a render function', () => {
      const fn = jest.fn().mockReturnValue(null);
      const {queryByTestId} = render(
        <ImageRender
          src="https://example.com/example.jpg"
          loading={<MockComponent2 />}
          errored={<MockComponent3 />}
        >
          {fn}
        </ImageRender>,
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
        <ImageRender src="https://example.com/example.jpg" />,
      );
      expect(container.children).toHaveLength(0);
    });

    test('should call onLoad', () => {
      const onLoad = jest.fn();
      const onError = jest.fn();
      render(
        <ImageRender
          src="https://example.com/example.jpg"
          onLoad={onLoad}
          onError={onError}
        />,
      );
      expect(onLoad).toBeCalled();
      expect(onError).not.toBeCalled();
    });
  });

  describe('errored:', () => {
    beforeEach(() => {
      (globalThis as any).Image = MockImageErrored;
    });

    test('should render the "errored "node when there is an "errored" node and a render function', () => {
      const fn = jest.fn().mockReturnValue(null);
      const {queryByTestId} = render(
        <ImageRender
          src="https://example.com/example.jpg"
          loading={<MockComponent1 />}
          loaded={<MockComponent2 />}
          errored={<MockComponent3 />}
        >
          {fn}
        </ImageRender>,
      );
      expect(queryByTestId(mockComponent1ID)).toBeNull();
      expect(queryByTestId(mockComponent2ID)).toBeNull();
      expect(queryByTestId(mockComponent3ID)).not.toBeNull();
      expect(fn).not.toBeCalled();
    });

    test('should render the render function when there is no "errored" node and a render function', () => {
      const fn = jest.fn().mockReturnValue(null);
      const {queryByTestId} = render(
        <ImageRender
          src="https://example.com/example.jpg"
          loading={<MockComponent1 />}
          loaded={<MockComponent2 />}
        >
          {fn}
        </ImageRender>,
      );
      expect(queryByTestId(mockComponent1ID)).toBeNull();
      expect(queryByTestId(mockComponent2ID)).toBeNull();
      expect(queryByTestId(mockComponent3ID)).toBeNull();
      expect(fn).toBeCalledWith({loaded: false, errored: true});
    });

    test('should render null when there is no "errored" node and no render function', () => {
      const {container} = render(
        <ImageRender src="https://example.com/example.jpg" />,
      );
      expect(container.children).toHaveLength(0);
    });

    test('should call onError', () => {
      const onLoad = jest.fn();
      const onError = jest.fn();
      render(
        <ImageRender
          src="https://example.com/example.jpg"
          onLoad={onLoad}
          onError={onError}
        />,
      );
      expect(onLoad).not.toBeCalled();
      expect(onError).toBeCalled();
    });
  });

  test('should load a new image when a "src" is changed', async () => {
    (globalThis as any).Image = MockImageErrored;
    const fn = jest.fn().mockReturnValue(null);
    const {rerender} = render(
      <ImageRender src="https://example.com/a.jpg">{fn}</ImageRender>,
    );
    expect(fn).toBeCalledWith(
      expect.objectContaining({loaded: false, errored: true}),
    );
    (globalThis as any).Image = MockImageLoaded;
    fn.mockClear();
    rerender(<ImageRender src="https://example.com/b.jpg">{fn}</ImageRender>);
    expect(fn).toBeCalledWith(
      expect.objectContaining({loaded: true, errored: false}),
    );
  });
});
