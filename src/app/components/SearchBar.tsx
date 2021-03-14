import React from 'react';

import styles from './Components.module.css';

interface ISearchBarProps {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
}

export const SearchBar = (props: ISearchBarProps): JSX.Element => {
  return (
    <section className={styles.section}>
      <p className={styles.infoText}>Enter a search term for a live api search</p>

      <input
        className={styles.textbox}
        value={props.searchTerm}
        placeholder={'search for a joke...'}
        onChange={(event) => props.setSearchTerm(event.target.value)}
      />
    </section>
  );
};
