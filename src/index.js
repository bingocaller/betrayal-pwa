import Helmet from 'preact-helmet';
import 'normalize.css';

import Characters from './routes/characters';
// import Characters from 'async!./home';

import './style/main.scss';

const App = () => (
  <div id="app" className="app">
    <Helmet
      meta={[
        { name: 'description', content: 'A PWA for keeping track of character stats in Betrayal at House on the Hill' },
        { property: 'og:type', content: 'website' },
      ]}
    />
    <Characters path="/" />
  </div>
);

export default App;
