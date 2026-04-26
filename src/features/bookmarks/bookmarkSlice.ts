import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

import {NewsItem} from '../../api/newsApi';

interface BookmarkState {
  data: NewsItem[];
}

const initialState: BookmarkState = {
  data: [],
};

const bookmarkSlice =
  createSlice({
    name: 'bookmarks',
    initialState,

    reducers: {
      setBookmarks: (
        state,
        action:
          PayloadAction<
            NewsItem[]
          >,
      ) => {
        state.data =
          action.payload;
      },

      toggleBookmark: (
        state,
        action:
          PayloadAction<NewsItem>,
      ) => {
        const item =
          action.payload;

        const exists =
          state.data.find(
            news =>
              news.id ===
              item.id,
          );

        if (exists) {
          state.data =
            state.data.filter(
              news =>
                news.id !==
                item.id,
            );
        } else {
          state.data.unshift(
            item,
          );
        }
      },

      removeBookmark: (
        state,
        action:
          PayloadAction<number>,
      ) => {
        state.data =
          state.data.filter(
            item =>
              item.id !==
              action.payload,
          );
      },

      clearBookmarks:
        state => {
          state.data = [];
        },
    },
  });

export const {
  setBookmarks,
  toggleBookmark,
  removeBookmark,
  clearBookmarks,
} =
  bookmarkSlice.actions;

export default
  bookmarkSlice.reducer;