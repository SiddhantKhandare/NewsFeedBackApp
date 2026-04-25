import React, {useLayoutEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Share,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';

import {
  toggleBookmark,
} from '../features/bookmarks/bookmarkSlice';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export default function DetailScreen({
  route,
  navigation,
}: any) {
  const {item} = route.params;

  const dispatch = useDispatch();

  const bookmarks = useSelector(
    (state: RootState) =>
      state.bookmarks.data,
  );

  const isSaved = bookmarks.find(
    news => news.id === item.id,
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={shareNews}
            style={{marginRight: 15}}>
            <Text>Share</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              dispatch(toggleBookmark(item))
            }>
            <Text>
              {isSaved ? 'Saved' : 'Save'}
            </Text>
          </TouchableOpacity>
        </View>
      ),
    });
  }, [isSaved]);

  const shareNews = async () => {
    await Share.share({
      message: item.url,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {item.title}
      </Text>

      <Text style={styles.meta}>
        By: {item.by}
      </Text>

      <Text style={styles.meta}>
        Score: {item.score}
      </Text>

      <Text style={styles.meta}>
        {dayjs.unix(item.time).fromNow()}
      </Text>

      <TouchableOpacity
        style={styles.linkBtn}
        onPress={() =>
          Linking.openURL(item.url)
        }>
        <Text style={styles.linkText}>
          Open Full Article
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
  },

  meta: {
    marginTop: 10,
    color: 'gray',
    fontSize: 15,
  },

  linkBtn: {
    marginTop: 30,
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
  },

  linkText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
});