import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import './index.css';

import App from 'App';
import { store } from 'redux/store';
import { fetchJokes } from 'redux/jokesSlice';
import { DEFAULT_JOKE_URL_PARAMS } from 'api/index';
import { fetchServerData } from 'redux/serverDataSlice';

store.dispatch(fetchJokes(DEFAULT_JOKE_URL_PARAMS));
store.dispatch(fetchServerData());

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);

