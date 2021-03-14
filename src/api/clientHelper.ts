import { IResponseError, BASE_URL, IRequestParams, IJoke, GetResponseData, IJokesState, RouteName } from 'api/index';

function isSingleJoke(response: GetResponseData): response is IJoke {
  return (response as IJoke).id !== undefined;
}

function isJokeArray(response: GetResponseData): response is IJokesState {
  const jokeState = response as IJokesState;
  return Array.isArray(jokeState.jokes) && jokeState.amount !== undefined;
}

function isSearchError(response: GetResponseData): response is IResponseError {
  return (response as IResponseError).message !== undefined;
}

export function normaliseJokesData(data: GetResponseData): IJokesState {
  const result: IJokesState = {
    jokes: [],
    amount: 0,
    error: false,
    errorMessage: '',
  };

  if (isJokeArray(data)) {
    result.jokes = data.jokes;
  } else if (isSingleJoke(data)) {
    result.jokes = [data];
  } else if (isSearchError(data)) {
    result.error = data.error;
    result.errorMessage = `${data.message}.  ${data.causedBy[0] ?? ''}`;
  }

  return result;
}

export function getFormattedURL(requestParams: IRequestParams): string {
  const { routeName, queryParams, category } = requestParams;

  let requestUrl = BASE_URL + routeName;
  requestUrl += routeName === RouteName.Joke && category ? `/${category}?safe-mode` : '';

  if (queryParams && Object.keys(queryParams).length !== 0) {
    const formattedQueryParams = Object.entries(queryParams)
      .map(([query, value]) => `${query}=${value}`)
      .join('&');

    requestUrl += `&${formattedQueryParams}`;
  }

  return requestUrl;
}
