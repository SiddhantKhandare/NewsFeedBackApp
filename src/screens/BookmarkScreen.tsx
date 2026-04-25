import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {
  toggleBookmark,
} from '../features/bookmarks/bookmarkSlice';

export default function BookmarkScreen() {
  const dispatch = useDispatch();

  const data = useSelector(
    (state: RootState) =>
      state.bookmarks.data,
  );

  const renderItem = ({item}: any) => (
    <View style={styles.card}>
      <Text style={styles.title}>
        {item.title}
      </Text>

      <TouchableOpacity
        onPress={() =>
          dispatch(toggleBookmark(item))
        }>
        <Text style={styles.remove}>
          Remove
        </Text>
      </TouchableOpacity>
    </View>
  );

  if (!data.length) {
    return (
      <View style={styles.center}>
        <Text>No Bookmarks Yet</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      keyExtractor={item =>
        item.id.toString()
      }
      renderItem={renderItem}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 15,
    borderRadius: 10,
    elevation: 2,
  },

  title: {
    fontSize: 16,
    fontWeight: '600',
  },

  remove: {
    marginTop: 10,
    color: 'red',
    fontWeight: '600',
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});