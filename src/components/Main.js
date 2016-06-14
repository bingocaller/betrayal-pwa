require('normalize.css/normalize.css');
require('styles/App.css');

import React, { Component } from 'react';


class AppComponent extends Component {
  render() {
    const yeomanImage = require('../images/yeoman.png');
    return (
      <div className="index">
        <img src={yeomanImage} alt="Yeoman Generator" />
        <div className="notice">Please edit <code>src/components/Main.js</code> to get started!</div>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
