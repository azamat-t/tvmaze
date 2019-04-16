import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import Search from './Search'
import Show from './Show'
import Home from './Home'
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path='/' component={Search} />
        <Route path='/show' component={Show} />
        <Route exact path='/' component={Home} />
      </div>
    )
  }
}

export default App;
