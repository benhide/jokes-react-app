import React from 'react';
import { Switch, Route } from 'react-router-dom';

import styles from './App.module.css';

import { Navbar } from 'app/components/Navbar';
import { Jokes } from 'app/components/Jokes';
import { Error } from 'app/components/Error';
import { PostJoke } from 'app/components/PostJoke';

export default function App(): JSX.Element {
  return (
    <div className={styles.app}>
      <Navbar />
      <main>
        <Switch>
          <Route path='/' component={Jokes} exact />
          <Route path='/postJoke' component={PostJoke} />
          <Route component={Error} />
        </Switch>
      </main>
    </div>
  );
}
