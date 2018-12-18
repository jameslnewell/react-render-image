/**
 * @jest-environment node
 */
// @flow
import React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import ImageRender from '.';

describe('Server side rendering', () => {
  it('should not fail when rendered in SSR', () => {
    expect(() =>
      ReactDOMServer.renderToString(
        <ImageRender src="https://example.com/example.jpg" />
      )
    ).not.toThrowError();
  });
});
