import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../../scenes/Home';
import Music from '../../scenes/Music';
import ItemDetail from '../../scenes/Music/scenes/ItemDetail';
import TypeDetail from '../../scenes/Music/scenes/TypeDetail';
import Videos from '../../scenes/Videos';

const Main = () => (
  <main>
    <Switch>
      <Route path='/music/:type/:slug' component={ItemDetail} />
      <Route path='/music/:type' component={TypeDetail} />
      <Route path='/music' component={Music} />
      <Route path='/videos' component={Videos} />
      <Route path='/' component={Home} />
    </Switch>
  </main>
);

export default Main;
