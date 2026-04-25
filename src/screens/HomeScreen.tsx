import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  RefreshControl,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import {getNews} from '../features/news/newsSlice';
import {RootState} from '../store';

import useDebounce from '../hooks/useDebounce';

export default function HomeScreen({
  navigation,
}: any) {
  const dispatch = useDispatch<any>();

  const {data, loading, error} =
    useSelector(
      (state: RootState) => state.news,
    );

  const [refreshing, setRefreshing] =
    useState(false);

  const [search, setSearch] =
    useState('');

  const [sortBy, setSortBy] =
    useState('score');

  const listRef = useRef<any>(null);
  const scrollY = useRef(0);

  const debouncedSearch =
    useDebounce(search);

  useEffect(() => {
    dispatch(getNews());
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(getNews());
    setRefreshing(false);
  };

  const finalData = useMemo(() => {
    let temp = [...data];

    if (debouncedSearch) {
      temp = temp.filter(item =>
        item.title
          .toLowerCase()
          .includes(
            debouncedSearch.toLowerCase(),
          ),
      );
    }

    temp.sort((a, b) =>
      sortBy === 'score'
        ? b.score - a.score
        : b.time - a.time,
    );

    return temp;
  }, [data, debouncedSearch, sortBy]);

  const renderItem = ({item}: any) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate(
          'Detail',
          {item},
        )
      }>
      <Text style={styles.title}>
        {item.title}
      </Text>

      <Text style={styles.meta}>
        Score: {item.score}
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <TextInput
        placeholder="Search..."
        style={styles.input}
        value={search}
        onChangeText={setSearch}
      />

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.sortBtn}
          onPress={() =>
            setSortBy('score')
          }>
          <Text>
            Sort Score
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.sortBtn}
          onPress={() =>
            setSortBy('time')
          }>
          <Text>
            Sort Time
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        ref={listRef}
        data={finalData}
        keyExtractor={item =>
          item.id.toString()
        }
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        onScroll={e => {
          scrollY.current =
            e.nativeEvent.contentOffset.y;
        }}
        onLayout={() => {
          listRef.current?.scrollToOffset(
            {
              offset:
                scrollY.current,
              animated: false,
            },
          );
        }}
        getItemLayout={(_, index) => ({
          length: 90,
          offset: 90 * index,
          index,
        })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    margin: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 8,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },

  sortBtn: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 8,
  },

  card: {
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginVertical: 6,
    padding: 15,
    borderRadius: 10,
    elevation: 2,
  },

  title: {
    fontSize: 15,
    fontWeight: '600',
  },

  meta: {
    marginTop: 8,
    color: 'gray',
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});