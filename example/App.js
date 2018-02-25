import React from 'react';
import Image from 'react-render-image';

const defaultSrc =
  'https://funnygoblin.com/wp-content/uploads/2017/07/Meme-Flashback-These-Are-The-Best-Memes-From-The-Decade-2000-2010.jpg';

export default class App extends React.Component {
  state = {
    src: defaultSrc
  };

  handleEnterPress = event => {
    if (event.key === 'Enter') {
      event.target.select();
      this.setState({
        src: event.target.value
      });
    }
  };

  handleButtonClick = event => {
    this.setState({
      src: event.target.value
    });
  };

  render() {
    const {src} = this.state;
    return (
      <div>
        <h1>react-render-image</h1>

        <br />
        <input
          autoFocus
          onKeyPress={this.handleEnterPress}
          defaultValue={defaultSrc}
          style={{width: '340px'}}
        />
        <button onClick={this.handleButtonClick}>load..</button>
        <Image src={src} loading="🔄" loaded="✅" errored="❌" />
        <br />

        <Image src={src}>
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

                {loaded && <img src={src} style={{maxWidth: '100%'}} />}
              </div>
            );
          }}
        </Image>
      </div>
    );
  }
}
