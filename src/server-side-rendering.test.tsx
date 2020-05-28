/**
 * @jest-environment node
 */
import React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import ImageRenderer from '.';

describe('Server side rendering', () => {
  it('should not fail when rendered in SSR', () => {
    expect(() =>
      ReactDOMServer.renderToString(
        <ImageRenderer src="https://example.com/example.jpg" />,
      ),
    ).not.toThrowError();
  });
});
