import React, { Component } from 'react';
import CharacterListComponent from 'components/CharacterListComponent';

require('normalize.css/normalize.css');
require('styles/App.css');

class AppComponent extends Component {
  render() {
    const characters = require('sources/characters');
    return (
      <div className="index">
        <CharacterListComponent characters={ characters } />
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
