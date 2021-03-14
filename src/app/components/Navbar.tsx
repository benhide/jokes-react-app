import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Components.module.css';

export const Navbar = (): JSX.Element => {
  return (
    <nav className={styles.navbar}>
      <h1 className={styles.headerText}>PUNCH LINES! - THE JOKE SEARCH APP</h1>
      <section className={styles.navBarSection}>
        <Link className={styles.navButton} to='/'>
          Jokes
        </Link>
        <Link className={styles.navButton} to='/postJoke'>
          Post Joke
        </Link>
      </section>
    </nav>
  );
};
