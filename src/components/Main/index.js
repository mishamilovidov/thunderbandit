import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../../scenes/Home';
import Music from '../../scenes/Music';

const Main = () => (
  <main>
    <Switch>
      <Route path='/music' component={Music} />
      <Route path='/' component={Home} />
    </Switch>
  </main>
)

export default Main;
