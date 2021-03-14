export const DEFAULT_ERROR_MESSAGE = 'Oops something went wrong' as const;
export const BASE_URL = 'https://v2.jokeapi.dev/' as const;
export const DEFAULT_JOKE_CATEGORY = 'Any' as const;

export enum JokeType {
  Single = 'single',
  TwoPart = 'twopart',
}

export enum RouteName {
  Joke = 'joke',
  Info = 'info',
}

export const DEFAULT_JOKE_URL_PARAMS: IRequestParams = {
  routeName: RouteName.Joke,
  queryParams: {
    amount: 10,
  },
  category: DEFAULT_JOKE_CATEGORY,
} as const;

export const DEFAULT_SERVER_DATA_URL_PARAMS: IRequestParams = {
  routeName: RouteName.Info,
};

export const DEFAULT_JOKE_ERROR = {
  jokes: [],
  error: true,
  amount: 0,
  errorMessage: DEFAULT_ERROR_MESSAGE,
} as IJokesState;

export const DEFAULT_SERVER_DATA_ERROR = {
  jokes: {
    totalCount: 0,
    categories: [],
  },
  error: true,
  errorMessage: DEFAULT_ERROR_MESSAGE,
} as IServerData;



export type GetResponseData = IJokesState | IJoke | IResponseError;

export interface IResponseError {
  error: true;
  internalError: boolean;
  message: string;
  code: number;
  causedBy: string[];
  additionalInfo: string;
  timestamp: number;
}

interface IServerJokesData {
  totalCount: number;
  categories: string[];
}

export interface IServerData {
  jokes: IServerJokesData;
  error?: boolean;
  errorMessage?: string;
}

export interface IJokesState {
  jokes: IJoke[];
  amount: number;
  error?: boolean;
  errorMessage?: string;
}

interface IQueryParams {
  amount?: number;
  contains?: string;
}

export interface IRequestParams {
  queryParams?: IQueryParams;
  category?: string;
  routeName: string;
}

export interface IJoke {
  error: boolean;
  category: string;
  type: JokeType;
  setup?: string;
  delivery?: string;
  joke?: string;
  flags: {
    nsfw: boolean;
    religious: boolean;
    political: boolean;
    racist: boolean;
    sexist: boolean;
    explicit: boolean;
  };
  safe: boolean;
  id: number;
  lang: string;
}
