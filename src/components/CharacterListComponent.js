'use strict';

import React from 'react';
import CharacterComponent from 'components/CharacterComponent';

require('styles/CharacterList.scss');

let CharacterListComponent = (props) => (
  <div className="character-list">
    <h1>Characters</h1>
    { props.characters.map((character, index) => <CharacterComponent character={ character } bio="full" key={ index } />) }
  </div>
);

CharacterListComponent.displayName = 'CharacterListComponent';

// Uncomment properties you need
// CharacterListComponent.propTypes = {};
// CharacterListComponent.defaultProps = {};

export default CharacterListComponent;
