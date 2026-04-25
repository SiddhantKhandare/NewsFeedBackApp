import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {store} from './src/store';
import MainNavigation from './src/navigation/MainNavigation';

import {
  setBookmarks,
} from './src/features/bookmarks/bookmarkSlice';

export default function App() {
  useEffect(() => {
    loadBookmarks();

    const unsubscribe =
      store.subscribe(saveBookmarks);

    return unsubscribe;
  }, []);

  const loadBookmarks = async () => {
    const data =
      await AsyncStorage.getItem(
        'BOOKMARKS',
      );

    if (data) {
      store.dispatch(
        setBookmarks(JSON.parse(data)),
      );
    }
  };

  const saveBookmarks = async () => {
    const state =
      store.getState().bookmarks.data;

    await AsyncStorage.setItem(
      'BOOKMARKS',
      JSON.stringify(state),
    );
  };

  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainNavigation />
      </NavigationContainer>
    </Provider>
  );
}