import {createSlice} from '@reduxjs/toolkit';

interface BookmarkState {
  data: any[];
}

const initialState: BookmarkState = {
  data: [],
};

const bookmarkSlice = createSlice({
  name: 'bookmarks',
  initialState,

  reducers: {
    setBookmarks(state, action) {
      state.data = action.payload;
    },

    toggleBookmark(state, action) {
      const item = action.payload;

      const exists = state.data.find(
        news => news.id === item.id,
      );

      if (exists) {
        state.data = state.data.filter(
          news => news.id !== item.id,
        );
      } else {
        state.data.push(item);
      }
    },
  },
});

export const {
  toggleBookmark,
  setBookmarks,
} = bookmarkSlice.actions;

export default bookmarkSlice.reducer;