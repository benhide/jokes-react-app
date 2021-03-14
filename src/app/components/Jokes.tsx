import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import styles from './Components.module.css';

import { store } from 'redux/store';
import { IJoke, JokeType, RouteName } from 'api';
import { SearchBar } from 'app/components/SearchBar';
import { JokeCategory } from 'app/components/JokeCategory';
import { fetchJokes, selectJokesState } from 'redux/jokesSlice';
import { selectJokeCategories, selectJokeCount } from 'redux/serverDataSlice';

const JOKE_AMOUNT_TO_SHOW = 10 as const;

interface IJokeProps {
  joke: IJoke;
}

interface IJokeWrapperProps {
  error?: boolean;
  errorMessage?: string;
  jokes: IJoke[];
}

export const Jokes = (): JSX.Element => {
  const { jokes, error, errorMessage } = useSelector(selectJokesState);
  const categories = useSelector(selectJokeCategories);
  const totalCount = useSelector(selectJokeCount);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setJokeCategory] = useState('Any');

    React.useEffect(() => {
      const promise = store.dispatch(
        fetchJokes({
          category: selectedCategory,
          routeName: RouteName.Joke,
          queryParams: { amount: JOKE_AMOUNT_TO_SHOW, contains: searchTerm },
        }),
      );
      return () => {
        promise.abort();
      };
    }, [searchTerm]);

  const onCategorySelect = (category: string): void => {
    setJokeCategory(category);
    setSearchTerm('');
    store.dispatch(fetchJokes({ category, routeName: RouteName.Joke, queryParams: { amount: JOKE_AMOUNT_TO_SHOW } }));
  };

  const onSearchTermSet = (searchTerm: string): void => {
    setSearchTerm(searchTerm);
  };

  return (
    <>
      <JokeCategory categories={categories} selectedCategory={selectedCategory} onCategorySelect={onCategorySelect} />
      <SearchBar searchTerm={searchTerm} setSearchTerm={onSearchTermSet} />
      <section className={styles.section}>
        <h1 className={styles.headerText}>Jokes</h1>
        <p className={styles.infoText}>Total joke count: {totalCount ? totalCount : ''}</p>
        {jokes.length < JOKE_AMOUNT_TO_SHOW ? (
          <p className={styles.infoText}>Number of jokes available: {jokes.length}</p>
        ) : (
          <p className={styles.infoText}>Number of jokes shown: {jokes.length}</p>
        )}
        <JokeWrapper error={error} errorMessage={errorMessage} jokes={jokes} />
      </section>
    </>
  );
};

const JokeWrapper = (props: IJokeWrapperProps): JSX.Element => {
  const { error, errorMessage, jokes } = props;

  let jokeContent = <p>No jokes to see</p>;

  if (error && errorMessage) {
    jokeContent = <p>{errorMessage} Try changing your search or category params...</p>;
  }

  if (jokes.length > 0) {
    jokeContent = (
      <>
        {jokes.map((joke) => {
          return <Joke key={joke.id} joke={joke} />;
        })}
      </>
    );
  }

  return jokeContent;
};

const Joke = (props: IJokeProps): JSX.Element => {
  const {
    joke: { id, setup, delivery, type, category, joke },
  } = props;

  return (
    <article className={styles.article} key={id}>
      <section className={styles.section}>
        <p className={styles.subHeaderText}>Category: {category} | Type: {type === JokeType.TwoPart ? 'two part' : type}</p>
      </section>
      {type === JokeType.TwoPart ? (
        <>
          <p className={styles.infoText}>{setup}</p>
          <p className={styles.infoText}>{delivery}</p>
        </>
      ) : (
        <p className={styles.infoText}>{joke}</p>
      )}
    </article>
  );
};
