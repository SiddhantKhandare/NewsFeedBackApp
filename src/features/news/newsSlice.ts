import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
} from '@reduxjs/toolkit';

import {
  fetchTopStories,
  NewsItem,
} from '../../api/newsApi';

interface NewsState {
  data: NewsItem[];
  loading: boolean;
  refreshing: boolean;
  error: string | null;
}

const initialState: NewsState = {
  data: [],
  loading: false,
  refreshing: false,
  error: null,
};

export const getNews =
  createAsyncThunk<
    NewsItem[]
  >(
    'news/getNews',
    async (_, thunkAPI) => {
      try {
        const response =
          await fetchTopStories();

        return response;
      } catch (error) {
        return thunkAPI.rejectWithValue(
          'Failed to fetch news',
        ) as any;
      }
    },
  );

const newsSlice =
  createSlice({
    name: 'news',
    initialState,

    reducers: {
      clearNews: state => {
        state.data = [];
      },
    },

    extraReducers: builder => {
      builder

        .addCase(
          getNews.pending,
          state => {
            state.loading =
              state.data
                .length ===
              0;

            state.refreshing =
              state.data
                .length >
              0;

            state.error =
              null;
          },
        )

        .addCase(
          getNews.fulfilled,
          (
            state,
            action:
              PayloadAction<NewsItem[]>,
          ) => {
            state.loading =
              false;

            state.refreshing =
              false;

            state.data =
              action.payload;
          },
        )

        .addCase(
          getNews.rejected,
          (
            state,
            action,
          ) => {
            state.loading =
              false;

            state.refreshing =
              false;

            state.error =
              action.payload as string;
          },
        );
    },
  });

export const {
  clearNews,
} = newsSlice.actions;

export default newsSlice.reducer;