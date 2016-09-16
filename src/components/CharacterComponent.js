'use strict';

import React, { Component } from 'react';
import classNames from 'classnames';
import SkullIconComponent from './SkullIconComponent';

require('styles/Character.scss');

class CharacterComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: props.fullBio,
      currentAttributes: {
        speed: this.props.character.stats.speed.defaultIndex,
        might: this.props.character.stats.might.defaultIndex,
        knowledge: this.props.character.stats.knowledge.defaultIndex,
        sanity: this.props.character.stats.sanity.defaultIndex
      },
      characterIsDead: false
    }
  }
  updateCurrentAttributeValue(attributeName, index) {
    let currentAttributes = this.state.currentAttributes;
    currentAttributes[attributeName] = index;
    this.setState({ currentAttributes: currentAttributes });
    if (index === 0) {
      this.setState({ characterIsDead: true });
    } else {
      this.setState({ characterIsDead: false });
    }
  }
  render () {
    const { character, fullBio } = this.props;
    const characterClass = classNames(
      'character',
      {
        'expanded': fullBio || this.state.expanded,
        'dead': this.state.characterIsDead
      }
    );
    const skull = this.state.characterIsDead ? <SkullIconComponent color="#901111"/> : null;
    let remainingProps, stats = null;
    if (fullBio || this.state.expanded) {
      character.hobbies = typeof character.hobbies === 'object' ? character.hobbies.join(', ') : character.hobbies;
      remainingProps =
        Object.getOwnPropertyNames(character).map(
          (val, index) =>
          <p key={ index }>
            { `${ val.charAt(0).toUpperCase() + val.slice(1) }: ${ character[val] }` }
          </p>
        );
      remainingProps.shift();
      remainingProps.shift();
      remainingProps.pop();
      stats =
        Object.getOwnPropertyNames(character.stats).map(
          (val, index) =>
          <div className="character-stats" key={ index }>
            <p>
              <strong>{ val.charAt(0).toUpperCase() + val.slice(1) }</strong>
            </p>
            <div className="slider">
              {
                character.stats[val].attributes.map(
                  (attribute, i) => {
                    return <span
                      className={
                        classNames(
                          'attribute-value',
                          {
                            'active': i === this.state.currentAttributes[val],
                            'default': i === character.stats[val].defaultIndex
                          }
                        )
                      }
                      onClick={ () => this.updateCurrentAttributeValue(val, i) }
                      key={ i }>
                      { attribute }
                    </span>
                  }
                )
              }
            </div>
          </div>
        );
    }
    return (
      <div
        className={ characterClass }
      >
        <div className="character-content">
          <div
            className="character-portrait"
            onClick={ () => this.setState({ expanded: !this.state.expanded }) }>
            <img src={ `images/${ character.portrait }` } alt="" />
            { skull }
          </div>
          <h2>
            { character.name }
          </h2>
          { remainingProps }
          { stats }
        </div>
      </div>
    )
  }
}

CharacterComponent.displayName = 'Character';

// Uncomment properties you need
// CharacterComponent.propTypes = {};
// CharacterComponent.defaultProps = {};

export default CharacterComponent;
