import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';

import {RootState} from '../store';
import {
  toggleBookmark,
} from '../features/bookmarks/bookmarkSlice';

import {COLORS} from '../theme/colors';
import {FONTS} from '../theme/fonts';

export default function BookmarkScreen({
  navigation,
}: any) {
  const dispatch = useDispatch();

  const bookmarks = useSelector(
    (state: RootState) =>
      state.bookmarks.data,
  );

  const renderItem = ({item}: any) => (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.card}
      onPress={() =>
        navigation?.navigate?.(
          'Detail',
          {item},
        )
      }>
      
      <View style={styles.topRow}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            Saved
          </Text>
        </View>

        <TouchableOpacity
          onPress={() =>
            dispatch(
              toggleBookmark(
                item,
              ),
            )
          }>
          <Text
            style={
              styles.remove
            }>
            Remove
          </Text>
        </TouchableOpacity>
      </View>

      <Text
        numberOfLines={2}
        style={styles.title}>
        {item.title}
      </Text>

      <Text style={styles.meta}>
        {item.by} • Score {item.score}
      </Text>
    </TouchableOpacity>
  );

  const EmptyUI = () => (
    <View style={styles.emptyWrap}>
      <Text style={styles.icon}>
        🔖
      </Text>

      <Text style={styles.emptyTitle}>
        No Bookmarks Yet
      </Text>

      <Text style={styles.emptyDesc}>
        Save stories now and
        read them later.
      </Text>
    </View>
  );

  return (
    <SafeAreaView
      edges={['top']}
      style={styles.container}>
      
      <Text style={styles.heading}>
        Bookmarks
      </Text>

      <FlatList
        data={bookmarks}
        keyExtractor={item =>
          item.id.toString()
        }
        renderItem={renderItem}
        ListEmptyComponent={
          <EmptyUI />
        }
        contentContainerStyle={{
          paddingBottom: 100,
          flexGrow:
            bookmarks.length ===
            0
              ? 1
              : 0,
        }}
        showsVerticalScrollIndicator={
          false
        }
      />
    </SafeAreaView>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        COLORS.border,
      paddingHorizontal: 16,
    },

    heading: {
      fontSize: 28,
      marginTop: 8,
      marginBottom: 18,
      color:
        COLORS.text,
      fontFamily:
        FONTS.bold,
    },

    card: {
      backgroundColor:
        COLORS.white,
      borderRadius: 18,
      padding: 16,
      marginBottom: 14,
      elevation: 3,
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowRadius: 10,
    },

    topRow: {
      flexDirection: 'row',
      justifyContent:
        'space-between',
      alignItems:
        'center',
      marginBottom: 12,
    },

    badge: {
      backgroundColor:
        COLORS.success,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
    },

    badgeText: {
      color:
        COLORS.white,
      fontSize: 12,
      fontFamily:
        FONTS.bold,
    },

    remove: {
      color:
        COLORS.danger,
      fontFamily:
        FONTS.semibold,
      fontSize: 13,
    },

    title: {
      fontSize: 16,
      lineHeight: 24,
      color:
        COLORS.text,
      fontFamily:
        FONTS.semibold,
    },

    meta: {
      marginTop: 10,
      color:
        COLORS.subText,
      fontSize: 13,
      fontFamily:
        FONTS.regular,
    },

    emptyWrap: {
      flex: 1,
      justifyContent:
        'center',
      alignItems:
        'center',
      paddingHorizontal: 30,
    },

    icon: {
      fontSize: 56,
    },

    emptyTitle: {
      marginTop: 16,
      fontSize: 24,
      color:
        COLORS.text,
      fontFamily:
        FONTS.bold,
    },

    emptyDesc: {
      marginTop: 10,
      textAlign:
        'center',
      lineHeight: 24,
      color:
        COLORS.subText,
      fontSize: 15,
      fontFamily:
        FONTS.regular,
    },
  });