'use strict';

import React, { Component } from 'react';

require('styles/Character.scss');

class CharacterComponent extends Component {
  constructor(props) {
    super(props);
  }
  render () {
    const { character, bio } = this.props;
    character.hobbies = character.hobbies.join(', ');
    const allProps = bio === 'full' ?
      Object.getOwnPropertyNames(character).map(
        (val, index) =>
        <p key={ index }>
          { `${ val.charAt(0).toUpperCase() + val.slice(1) }: ${ character[val] }` }
        </p>
      ) : null;
    allProps.shift();
    allProps.pop();
    const stats =
      Object.getOwnPropertyNames(character.stats).map(
        (val, index) =>
        <p key={ index }>
          { `${ val.charAt(0).toUpperCase() + val.slice(1) }: ${ character.stats[val].attributes[character.stats[val].defaultIndex] }` }
        </p>
      );
    return (
      <div className="character">
        <h2>
          { character.name }
        </h2>
        { allProps }
        { stats }
      </div>
    )
  }
}

CharacterComponent.displayName = 'Character';

// Uncomment properties you need
// CharacterComponent.propTypes = {};
// CharacterComponent.defaultProps = {};

export default CharacterComponent;
