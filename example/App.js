import React from 'react';
import ImageLoader from 'react-image-render';

const defaultSrc = 'https://funnygoblin.com/wp-content/uploads/2017/07/Meme-Flashback-These-Are-The-Best-Memes-From-The-Decade-2000-2010.jpg';

export default class App extends React.Component {

  state = {
    src: defaultSrc
  };

  handleSubmit = (event) => {
    if (event.key === 'Enter') {
      event.target.select();
      this.setState({
        src: event.target.value
      });
    }
  }

  render() {
    const {src} = this.state;
    return (
      <div>
        <h1>react-image-render</h1>

        <br/>
        <input autoFocus onKeyPress={this.handleSubmit} defaultValue={defaultSrc} style={{width: '340px'}}/>
        <br/>

        <ImageLoader src={src}>
          {({image, loaded, errored}) => {
            return (
              <div>

                {!loaded && !errored && 'Loading...'}
                {loaded && 'Loaded ✅'}
                {errored && 'Errored ❌'}

                <br/>
                {image && `Width: ${image.width}`}
                <br/>
                {image && `Height: ${image.height}`}
                <br/>

                {loaded && <img src={src} style={{maxWidth: '100%'}}/>}

              </div>
            );
          }}
        </ImageLoader>

      </div>
    );
  }

}
