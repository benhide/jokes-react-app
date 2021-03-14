import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootState } from 'redux/store';
import { getServerDataRequest } from 'api/client';
import { IServerData, IRequestParams, DEFAULT_ERROR_MESSAGE, DEFAULT_SERVER_DATA_URL_PARAMS } from 'api';

const initialState: IServerData = {
  jokes: {
    totalCount: 0,
    categories: [],
  },
  error: false,
  errorMessage: '',
};

export const fetchServerData = createAsyncThunk('serverData/fetchServerData', async (args: IRequestParams = DEFAULT_SERVER_DATA_URL_PARAMS) => {
  return (await getServerDataRequest(args)) as IServerData;
});

export const serverDataSlice = createSlice({
  name: 'serverData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchServerData.fulfilled, (state, { payload }) => {
      state.jokes = payload.jokes;
    });
    builder.addCase(fetchServerData.rejected, (state) => {
      state.error = true;
      state.errorMessage = DEFAULT_ERROR_MESSAGE;
    });
  },
});

export const selectJokeCategories = (state: RootState): string[] => state.serverData.jokes.categories;
export const selectJokeCount = (state: RootState): number => state.serverData.jokes.totalCount;

export default serverDataSlice.reducer;
