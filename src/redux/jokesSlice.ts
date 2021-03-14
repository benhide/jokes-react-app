import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { RootState } from 'redux/store';
import { getJokesRequest } from 'api/client';
import { DEFAULT_ERROR_MESSAGE, IJokesState, IRequestParams } from 'api/index';

const initialState: IJokesState = {
  jokes: [],
  error: undefined,
  amount: 0,
  errorMessage: undefined,
};

export const fetchJokes = createAsyncThunk('jokes/fetchJokes', async (args: IRequestParams, { signal }) => {
  const source = axios.CancelToken.source();
  signal.addEventListener('abort', () => {
    source.cancel();
  });

  const data = await getJokesRequest(args, source);

  return data;
});

export const jokesSlice = createSlice({
  name: 'jokes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchJokes.fulfilled, (state, { payload }) => {
      state.jokes = payload.jokes;
      state.error = payload.error;
      state.amount = payload.amount;
      state.errorMessage = payload.errorMessage;
    });
    builder.addCase(fetchJokes.rejected, (state) => {
      state.error = true;
      state.errorMessage = DEFAULT_ERROR_MESSAGE;
    });
  },
});

export const selectJokesState = (state: RootState): IJokesState => state.jokes;

export default jokesSlice.reducer;
