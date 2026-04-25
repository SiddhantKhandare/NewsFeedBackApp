import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {fetchTopStories} from '../../api/newsApi';

export const getNews = createAsyncThunk(
  'news/getNews',
  async () => {
    return await fetchTopStories();
  }
);

interface NewsState {
  data: any[];
  loading: boolean;
  error: string | null;
}

const initialState: NewsState = {
  data: [],
  loading: false,
  error: null,
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(getNews.pending, state => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getNews.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })

      .addCase(getNews.rejected, state => {
        state.loading = false;
        state.error = 'Failed to load news';
      });
  },
});

export default newsSlice.reducer;