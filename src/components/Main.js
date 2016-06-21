import React, { Component } from 'react';
import CharacterComponent from 'components/CharacterComponent';

require('styles/App.css');

class AppComponent extends Component {
  render() {
    const characters = require('sources/characters');
    return (
      <div className="index">
        <h1 className="headline">Characters</h1>
        { characters.map((character, index) => <CharacterComponent character={ character } fullBio={ false } key={ index } />) }
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
