import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  RefreshControl,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {getNews} from '../features/news/newsSlice';
import {RootState} from '../store';

import {COLORS} from '../theme/colors';
import {FONTS} from '../theme/fonts';
import useDebounce from '../hooks/useDebounce';

export default function HomeScreen({navigation}: any) {
  const dispatch = useDispatch<any>();

  const {data, loading, error} = useSelector(
    (state: RootState) => state.news,
  );

  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('score');

  const debouncedSearch = useDebounce(search);
  const listRef = useRef<any>(null);
  const scrollY = useRef(0);

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
          .includes(debouncedSearch.toLowerCase()),
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
      activeOpacity={0.9}
      style={styles.card}
      onPress={() =>
        navigation.navigate('Detail', {item})
      }>
      
      <View style={styles.badge}>
        <Text style={styles.badgeText}>
          {item.score}
        </Text>
      </View>

      <Text
        style={styles.title}
        numberOfLines={2}>
        {item.title}
      </Text>

      <Text style={styles.meta}>
        {item.by} • Story
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator
          size="large"
          color={COLORS.primary}
        />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.errorText}>
          {error}
        </Text>
      </SafeAreaView>
    );
  }

  return (
   <SafeAreaView
  edges={['top']}
  style={styles.container}>
      
      <Text style={styles.greeting}>
        Good Morning 👋
      </Text>

      <Text style={styles.heading}>
        Top Stories
      </Text>

      <TextInput
        placeholder="Search articles..."
        placeholderTextColor={COLORS.subText}
        style={styles.search}
        value={search}
        onChangeText={setSearch}
      />

      <View style={styles.sortRow}>
        <TouchableOpacity
          style={[
            styles.sortBtn,
            sortBy === 'score' &&
              styles.activeBtn,
          ]}
          onPress={() =>
            setSortBy('score')
          }>
          <Text
            style={[
              styles.sortText,
              sortBy === 'score' &&
                styles.activeText,
            ]}>
            By Score
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.sortBtn,
            sortBy === 'time' &&
              styles.activeBtn,
          ]}
          onPress={() =>
            setSortBy('time')
          }>
          <Text
            style={[
              styles.sortText,
              sortBy === 'time' &&
                styles.activeText,
            ]}>
            By Time
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
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={COLORS.primary}
          />
        }
        onScroll={e => {
          scrollY.current =
            e.nativeEvent.contentOffset.y;
        }}
        onLayout={() => {
          listRef.current?.scrollToOffset({
            offset: scrollY.current,
            animated: false,
          });
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:
      COLORS.border,
    paddingHorizontal: 16,
  },

  greeting: {
    fontSize: 14,
    marginTop: 10,
    color: COLORS.subText,
    fontFamily:
      FONTS.regular,
  },

  heading: {
    fontSize: 28,
    marginTop: 4,
    marginBottom: 18,
    color: COLORS.text,
    fontFamily: FONTS.bold,
  },

  search: {
    backgroundColor:
      COLORS.white,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontFamily:
      FONTS.medium,
    fontSize: 15,
    borderWidth: 1,
    borderColor:
      COLORS.border,
    marginBottom: 16,
  },

  sortRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },

  sortBtn: {
    flex: 1,
    backgroundColor:
      COLORS.white,
    paddingVertical: 12,
    borderRadius: 12,
    marginRight: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor:
      COLORS.border,
  },

  activeBtn: {
    backgroundColor:
      COLORS.primary,
  },

  sortText: {
    fontFamily:
      FONTS.medium,
    color: COLORS.text,
  },

  activeText: {
    color: COLORS.white,
  },

  card: {
    backgroundColor:
      COLORS.card,
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },

  badge: {
    backgroundColor:
      COLORS.primary,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 12,
  },

  badgeText: {
    color: COLORS.white,
    fontSize: 12,
    fontFamily:
      FONTS.bold,
  },

  title: {
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.text,
    fontFamily:
      FONTS.semibold,
  },

  meta: {
    marginTop: 10,
    fontSize: 13,
    color: COLORS.subText,
    fontFamily:
      FONTS.regular,
  },

  center: {
    flex: 1,
    justifyContent:
      'center',
    alignItems: 'center',
    backgroundColor:
      COLORS.background,
  },

  errorText: {
    color: COLORS.danger,
    fontFamily:
      FONTS.medium,
  },
});