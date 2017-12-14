// @flow
import React from 'react';
import {mount} from 'enzyme';
import ImageRender from '../src';

class MockImage {
  onload: Function;
  onerror: Function;
}

class MockImageLoading extends MockImage {
  set src(val: string) {}
}
class MockImageLoaded extends MockImage {
  set src(val: string) {
    this.onload();
  }
}

class MockImageErrored extends MockImage {
  set src(val: string) {
    this.onerror();
  }
}

class MockComponent1 extends React.Component<{}, {}> {
  render() {
    return null;
  }
}

class MockComponent2 extends React.Component<{}, {}> {
  render() {
    return null;
  }
}

class MockComponent3 extends React.Component<{}, {}> {
  render() {
    return null;
  }
}

describe('<ImageRender/>', () => {
  describe('loading:', () => {
    beforeEach(() => {
      global.Image = MockImageLoading;
    });

    it('should render the "loading" node when there is a "loading" node and a render function', () => {
      const render = jest.fn().mockReturnValue(null);
      const element = mount(
        <ImageRender
          src="https://example.com/example.jpg"
          loading={<MockComponent1 />}
          loaded={<MockComponent2 />}
          errored={<MockComponent3 />}
        >
          {render}
        </ImageRender>
      );
      expect(element.find(MockComponent1)).toHaveLength(1);
      expect(element.find(MockComponent2)).toHaveLength(0);
      expect(element.find(MockComponent3)).toHaveLength(0);
      expect(render).not.toBeCalled();
    });

    it('should render the render function when there is no "loading" node and a render function', () => {
      const render = jest.fn().mockReturnValue(null);
      const element = mount(
        <ImageRender
          src="https://example.com/example.jpg"
          loaded={<MockComponent2 />}
          errored={<MockComponent3 />}
        >
          {render}
        </ImageRender>
      );
      expect(element.find(MockComponent1)).toHaveLength(0);
      expect(element.find(MockComponent2)).toHaveLength(0);
      expect(element.find(MockComponent3)).toHaveLength(0);
      expect(render).toBeCalledWith({loaded: false, errored: false});
    });

    it('should render null when there is no "loading" node and no render function', () => {
      const element = mount(
        <ImageRender src="https://example.com/example.jpg" />
      );
      expect(element.children().exists()).toBeFalsy();
    });
  });

  describe('loaded:', () => {
    beforeEach(() => {
      global.Image = MockImageLoaded;
    });

    it('should render the "loaded" node when there is a "loaded" node and a render function', () => {
      const render = jest.fn().mockReturnValue(null);
      const element = mount(
        <ImageRender
          src="https://example.com/example.jpg"
          loading={<MockComponent1 />}
          loaded={<MockComponent2 />}
          errored={<MockComponent3 />}
        >
          {render}
        </ImageRender>
      );
      expect(element.find(MockComponent1)).toHaveLength(0);
      expect(element.find(MockComponent2)).toHaveLength(1);
      expect(element.find(MockComponent3)).toHaveLength(0);
      expect(render).not.toBeCalled();
    });

    it('should render the render function when there is no "loaded" node and a render function', () => {
      const render = jest.fn().mockReturnValue(null);
      const element = mount(
        <ImageRender
          src="https://example.com/example.jpg"
          loading={<MockComponent2 />}
          errored={<MockComponent3 />}
        >
          {render}
        </ImageRender>
      );
      expect(element.find(MockComponent1)).toHaveLength(0);
      expect(element.find(MockComponent2)).toHaveLength(0);
      expect(element.find(MockComponent3)).toHaveLength(0);
      expect(render).toBeCalledWith(
        expect.objectContaining({
          image: expect.objectContaining({}),
          loaded: true,
          errored: false
        })
      );
    });

    it('should render null when there is no "loaded" node and no render function', () => {
      const element = mount(
        <ImageRender src="https://example.com/example.jpg" />
      );
      expect(element.children().exists()).toBeFalsy();
    });

    it('should call onLoad', () => {
      const onLoad = jest.fn();
      const onError = jest.fn();
      const element = mount(
        <ImageRender
          src="https://example.com/example.jpg"
          onLoad={onLoad}
          onError={onError}
        />
      );
      expect(onLoad).toBeCalled();
      expect(onError).not.toBeCalled();
    });
  });

  describe('errored:', () => {
    beforeEach(() => {
      global.Image = MockImageErrored;
    });

    it('should render the "errored "node when there is an "errored" node and a render function', () => {
      const render = jest.fn().mockReturnValue(null);
      const element = mount(
        <ImageRender
          src="https://example.com/example.jpg"
          loading={<MockComponent1 />}
          loaded={<MockComponent2 />}
          errored={<MockComponent3 />}
        >
          {render}
        </ImageRender>
      );
      expect(element.find(MockComponent1)).toHaveLength(0);
      expect(element.find(MockComponent2)).toHaveLength(0);
      expect(element.find(MockComponent3)).toHaveLength(1);
      expect(render).not.toBeCalled();
    });

    it('should render the render function when there is no "errored" node and a render function', () => {
      const render = jest.fn().mockReturnValue(null);
      const element = mount(
        <ImageRender
          src="https://example.com/example.jpg"
          loading={<MockComponent1 />}
          loaded={<MockComponent2 />}
        >
          {render}
        </ImageRender>
      );
      expect(element.find(MockComponent1)).toHaveLength(0);
      expect(element.find(MockComponent2)).toHaveLength(0);
      expect(element.find(MockComponent3)).toHaveLength(0);
      expect(render).toBeCalledWith({loaded: false, errored: true});
    });

    it('should render null when there is no "errored" node and no render function', () => {
      const element = mount(
        <ImageRender src="https://example.com/example.jpg" />
      );
      expect(element.children().exists()).toBeFalsy();
    });

    it('should call onError', () => {
      const onLoad = jest.fn();
      const onError = jest.fn();
      const element = mount(
        <ImageRender
          src="https://example.com/example.jpg"
          onLoad={onLoad}
          onError={onError}
        />
      );
      expect(onLoad).not.toBeCalled();
      expect(onError).toBeCalled();
    });
  });

  it('should load a new image when a "src" is changed', () => {
    global.Image = MockImageErrored;
    const render = jest.fn().mockReturnValue(null);
    const element = mount(
      <ImageRender src="https://example.com/a.jpg">{render}</ImageRender>
    );
    expect(render).toBeCalledWith(
      expect.objectContaining({loaded: false, errored: true})
    );
    global.Image = MockImageLoaded;
    render.mockClear();
    element.setProps({src: 'https://example.com/b.jpg'});
    expect(render).toBeCalledWith(
      expect.objectContaining({loaded: true, errored: false})
    );
  });
});
