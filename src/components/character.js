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
    this.setState({ currentAttributes });
    if (index === 0) {
      this.setState({ characterIsDead: true });
    } else {
      this.setState({ characterIsDead: false });
    }
  }
  renderSlider(character, val) {
    character.stats[val].attributes.map((attribute, i) => (
      <button
        className={
          classNames(
            'attribute-value',
            {
              active: i === this.state.currentAttributes[val],
              default: i === character.stats[val].defaultIndex,
            },
          )
        }
        onClick={() => this.updateCurrentAttributeValue(val, i)}
        key={i}
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
    let remainingProps;
    let stats = null;
    if (fullBio || this.state.expanded) {
      character.hobbies = typeof character.hobbies === 'object' ? character.hobbies.join(', ') : character.hobbies;
      remainingProps =
        Object.getOwnPropertyNames(character).map((val, index) => (
          <p key={index}>
            { `${val.charAt(0).toUpperCase() + val.slice(1)}: ${character[val]}` }
          </p>
        ));
      remainingProps.shift();
      remainingProps.shift();
      remainingProps.pop();
      stats =
        Object.getOwnPropertyNames(character.stats).map((val, index) => (
          <div className="character-stats" key={index}>
            <p>
              <strong>{ val.charAt(0).toUpperCase() + val.slice(1) }</strong>
            </p>
            <div className="slider">
              { this.renderSlider(character, val) }
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
