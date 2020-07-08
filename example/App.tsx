/* eslint-disable jsx-a11y/no-autofocus */
import React from 'react';
import Image, {ImageRendererProps} from '../src';

const defaultURL = 'https://i.pinimg.com/originals/2e/90/0a/2e900a74a9c7e7babe3343fa9dfd6a06.jpg';

const App: React.FC = () => {
  const srcInput = React.useRef<HTMLInputElement>(null);
  const srcsetInput = React.useRef<HTMLTextAreaElement>(null);
  const sizesInput = React.useRef<HTMLTextAreaElement>(null);
  const [props, setProps] = React.useState<Pick<ImageRendererProps, 'src' | 'srcset' | 'sizes'>>({src: defaultURL});

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    setProps({
      src: srcInput.current?.value || '',
      srcset: srcsetInput.current?.value,
      sizes: sizesInput.current?.value,
    });
  };

  return (
    <div>
      <h1>react-render-image</h1>

      <br />
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="src">src</label>
          <input
            id="src"
            ref={srcInput}
            autoFocus
            defaultValue={defaultURL}
            style={{width: '340px'}}
          />
        </div>
        <div>
          <label htmlFor="srcset">srcset</label>
          <textarea
            id="srcset"
            ref={srcsetInput}
            style={{width: '340px'}}
          />
        </div>
        <div>
          <label htmlFor="sizes">sizes</label>
          <textarea
            id="sizes"
            ref={sizesInput}
            autoFocus
            style={{width: '340px'}}
          />
        </div>
        <button>load...</button>
        <Image {...props} loading="🔄" loaded="✅" errored="❌" />
      </form>
      <br />

      <Image {...props}>
        {({image, loaded, errored}) => {
          return (
            <div>
              {!loaded && !errored && 'Loading 🔄'}
              {loaded && 'Loaded ✅'}
              {errored && 'Errored ❌'}

              <br />
              {image && `Width: ${image.width}`}
              <br />
              {image && `Height: ${image.height}`}
              <br />

              {loaded && <img src={image?.currentSrc} alt="" style={{maxWidth: '100%'}} />}
            </div>
          );
        }}
      </Image>
    </div>
  );
}

export default App;
