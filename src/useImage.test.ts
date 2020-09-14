import {renderHook} from '@testing-library/react-hooks';
import {useImage, UseImageStatus} from './useImage';

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

const src = "https://example.com/example.jpg";

describe('useImage()', () => {

  test('should be loading when the image is loading', () => {
    (globalThis as any).Image = MockImageLoading;
    const {result} = renderHook(() => useImage({src: src}));
    const {status, image} = result.current;
    expect(status).toEqual(UseImageStatus.LOADING);
    expect(image).toBeUndefined();
  });

  test('should be loaded when the image is loaded', () => {
    (globalThis as any).Image = MockImageLoaded;
    const {result} = renderHook(() => useImage({src: src}));
    const {status, image} = result.current;
    expect(status).toEqual(UseImageStatus.LOADED);
    expect(image).not.toBeUndefined();
  });

  test('should be errored when the image is errored', () => {
    (globalThis as any).Image = MockImageErrored;
    const {result} = renderHook(() => useImage({src: src}));
    const {status, image} = result.current;
    expect(status).toEqual(UseImageStatus.ERRORED);
    expect(image).not.toBeUndefined();
  });

});
