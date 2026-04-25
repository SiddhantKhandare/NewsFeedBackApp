import {configureStore} from '@reduxjs/toolkit';
import newsReducer from '../features/news/newsSlice';
import bookmarkReducer from '../features/bookmarks/bookmarkSlice';

export const store = configureStore({
  reducer: {
    news: newsReducer,
    bookmarks: bookmarkReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;