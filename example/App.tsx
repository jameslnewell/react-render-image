/* eslint-disable jsx-a11y/no-autofocus */
import React from 'react';
import Image from '../src';

const defaultURL = 'https://i.pinimg.com/originals/2e/90/0a/2e900a74a9c7e7babe3343fa9dfd6a06.jpg';

const App: React.FC = () => {
  const input = React.useRef<HTMLInputElement>(null);
  const [url, setURL] = React.useState(defaultURL);

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    if (input.current){
      setURL(input.current.value);
    }
  };

  return (
    <div>
      <h1>react-render-image</h1>

      <br />
      <form onSubmit={handleSubmit}>
        <input
          ref={input}
          autoFocus
          defaultValue={defaultURL}
          style={{width: '340px'}}
        />
        <button>load..</button>
        <Image src={url} loading="🔄" loaded="✅" errored="❌" />
      </form>
      <br />

      <Image src={url}>
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

              {loaded && <img src={url} alt="" style={{maxWidth: '100%'}} />}
            </div>
          );
        }}
      </Image>
    </div>
  );
}

export default App;
