'use strict';

import React, { Component } from 'react';

require('styles/Character.scss');

class CharacterComponent extends Component {
  constructor(props) {
    super(props);
  }
  createRemainingProps(character) {
    let remainingProps = [];
    // Possibilities: for…in, _.each(), Object.keys()
    console.log(Object.keys(character));
    remainingProps.push(
      <p>
        { Object.keys(character) }
      </p>
    );
    console.log(remainingProps);
    return remainingProps.shift();
  }
  render () {
    const { character } = this.props;
    const remainingProps = () => this.createRemainingProps(character);
    return (
      <div className="character">
        <h2>
          { character.name }
        </h2>
        { remainingProps }
        <p>
          Age: { character.age }
        </p>
        <p>
          Height: { character.height }
        </p>
        <p>
          Weight: { character.weight }
        </p>
        <p>
          Birthday: { character.birthday }
        </p>
        <p>
          Hobbies: { character.hobbies.join(', ') }
        </p>
      </div>
    )
  }
}

CharacterComponent.displayName = 'Character';

// Uncomment properties you need
// CharacterComponent.propTypes = {};
// CharacterComponent.defaultProps = {};

export default CharacterComponent;
