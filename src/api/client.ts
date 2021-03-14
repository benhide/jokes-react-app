import axios, { CancelTokenSource } from 'axios';

import {
  DEFAULT_JOKE_ERROR,
  DEFAULT_SERVER_DATA_ERROR,
  GetResponseData,
  IJokesState,
  IServerData,
  IRequestParams,
} from 'api/index';
import { getFormattedURL, normaliseJokesData } from 'api/clientHelper';

export async function getJokesRequest(requestParams: IRequestParams, cancelToken: CancelTokenSource): Promise<IJokesState> {
  const url = getFormattedURL(requestParams);

  try {
    const response = await axios.get<GetResponseData>(url, { cancelToken: cancelToken.token });

    if (response.status === 200) {
      return normaliseJokesData(response.data);
    }

    return DEFAULT_JOKE_ERROR;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getServerDataRequest(requestParams: IRequestParams): Promise<IServerData> {
  const url = getFormattedURL(requestParams);

  try {
    const response = await axios.get<IServerData>(url);
    const data = response.data;

    if (response.status === 200) {
      return data as IServerData;
    }

    return DEFAULT_SERVER_DATA_ERROR;
  } catch (error) {
    throw new Error(error);
  }
}
