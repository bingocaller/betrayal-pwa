import { Component } from 'preact';
import classNames from 'classnames';

import SkullIcon from './skull-icon';

class Character extends Component {
  constructor(props) {
    super(props);
    const {
      speed,
      might,
      knowledge,
      sanity,
    } = this.props.character.stats;
    this.state = {
      expanded: props.fullBio,
      currentAttributes: {
        speed: speed.defaultIndex,
        might: might.defaultIndex,
        knowledge: knowledge.defaultIndex,
        sanity: sanity.defaultIndex,
      },
      characterIsDead: false,
    };
  }
  updateCurrentAttributeValue(attributeName, index) {
    const { currentAttributes } = this.state;
    currentAttributes[attributeName] = index;
    this.setState({
      currentAttributes,
      characterIsDead: index === 0,
    });
  }
  renderSlider(character, stat, charIdentifier) {
    return character.stats[stat].attributes.map((attribute, i) => (
      <button
        className={
          classNames(
            'attribute-value',
            {
              active: i === this.state.currentAttributes[stat],
              default: i === character.stats[stat].defaultIndex,
            },
          )
        }
        onClick={() => this.updateCurrentAttributeValue(stat, i)}
        // eslint-disable-next-line react/no-array-index-key
        key={`${charIdentifier}-${stat}-${i}`}
      >
        { attribute }
      </button>
    ));
  }
  render() {
    const { character, fullBio } = this.props;
    const characterClass = classNames(
      'character',
      {
        expanded: fullBio || this.state.expanded,
        dead: this.state.characterIsDead,
      }
    );
    const skull = this.state.characterIsDead ? <SkullIcon color="#901111" /> : null;
    const charIdentifier = character.name.toLowerCase().replace(' ', '');
    let remainingProps;
    let stats = null;
    if (fullBio || this.state.expanded) {
      character.hobbies = typeof character.hobbies === 'object' ? character.hobbies.join(', ') : character.hobbies;
      remainingProps =
        Object.getOwnPropertyNames(character).map((attribute) => (
          <p key={`${charIdentifier}-${attribute}`}>
            { `${attribute.charAt(0).toUpperCase() + attribute.slice(1)}: ${character[attribute]}` }
          </p>
        ));
      remainingProps.shift();
      remainingProps.shift();
      remainingProps.pop();
      stats =
        Object.getOwnPropertyNames(character.stats).map((stat) => (
          <div className="character-stats" key={`${charIdentifier}-${stat}-stats`}>
            <p>
              <strong>{ stat.charAt(0).toUpperCase() + stat.slice(1) }</strong>
            </p>
            <div className="slider">
              { this.renderSlider(character, stat, charIdentifier) }
            </div>
          </div>
        ));
    }
    return (
      <div className={characterClass}>
        <div className="character-content">
          <button
            className="character-portrait"
            onClick={() => this.setState({ expanded: !this.state.expanded })}
          >
            <img src={`../assets/images/${character.portrait}`} alt="" />
            { skull }
          </button>
          <h2>
            { character.name }
          </h2>
          { remainingProps }
          { stats }
        </div>
      </div>
    );
  }
}

Character.displayName = 'Character';

// Uncomment properties you need
// Character.propTypes = {};
// Character.defaultProps = {};

export default Character;
