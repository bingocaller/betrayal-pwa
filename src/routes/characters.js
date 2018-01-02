import Character from '../components/character';

const characters = require('../data/characters');

const Characters = () => (
  <section className="content">
    <h1 className="headline">Characters</h1>
    { characters.map((character, index) => (
      <Character character={character} fullBio={false} key={index} />
    )) }
  </section>
);

export default Characters;
