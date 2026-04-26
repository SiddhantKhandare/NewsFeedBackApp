import React, {useLayoutEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Share,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';

import {
  toggleBookmark,
} from '../features/bookmarks/bookmarkSlice';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import {COLORS} from '../theme/colors';
import {FONTS} from '../theme/fonts';

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
    (news: any) => news.id === item.id,
  );

  const shareNews = async () => {
    await Share.share({
      message: item.url,
    });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Article Detail',

      headerStyle: {
        backgroundColor:
          COLORS.white,
      },

      headerTitleStyle: {
        fontFamily:
          FONTS.bold,
        color: COLORS.text,
      },

      headerRight: () => (
        <View
          style={{
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            onPress={shareNews}
            style={{
              marginRight: 16,
            }}>
            <Text
              style={{
                color:
                  COLORS.primary,
                fontFamily:
                  FONTS.semibold,
              }}>
              Share
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              dispatch(
                toggleBookmark(
                  item,
                ),
              )
            }>
            <Text
              style={{
                color:
                  isSaved
                    ? COLORS.success
                    : COLORS.primary,
                fontFamily:
                  FONTS.semibold,
              }}>
              {isSaved
                ? 'Saved'
                : 'Save'}
            </Text>
          </TouchableOpacity>
        </View>
      ),
    });
  }, [isSaved]);

  return (
    <SafeAreaView
      style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={{
          paddingBottom: 40,
        }}>
        
        <View style={styles.scoreChip}>
          <Text
            style={
              styles.scoreText
            }>
            Score {item.score}
          </Text>
        </View>

        <Text style={styles.title}>
          {item.title}
        </Text>

        <View style={styles.infoCard}>
          <Text style={styles.label}>
            Author
          </Text>

          <Text style={styles.value}>
            {item.by}
          </Text>

          <Text
            style={[
              styles.label,
              {
                marginTop: 16,
              },
            ]}>
            Published
          </Text>

          <Text style={styles.value}>
            {dayjs
              .unix(
                item.time,
              )
              .fromNow()}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.9}
          onPress={() =>
            Linking.openURL(
              item.url,
            )
          }>
          <Text
            style={
              styles.buttonText
            }>
            Open Full Article
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={
            styles.outlineBtn
          }
          activeOpacity={0.9}
          onPress={
            shareNews
          }>
          <Text
            style={
              styles.outlineText
            }>
            Share Article
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        COLORS.background,
      padding: 16,
    },

    scoreChip: {
      backgroundColor:
        COLORS.primary,
      alignSelf:
        'flex-start',
      paddingHorizontal: 14,
      paddingVertical: 8,
      borderRadius: 30,
      marginTop: 10,
      marginBottom: 16,
    },

    scoreText: {
      color:
        COLORS.white,
      fontSize: 13,
      fontFamily:
        FONTS.bold,
    },

    title: {
      fontSize: 26,
      lineHeight: 36,
      color:
        COLORS.text,
      fontFamily:
        FONTS.bold,
    },

    infoCard: {
      backgroundColor:
        COLORS.white,
      marginTop: 20,
      borderRadius: 18,
      padding: 18,
      borderWidth: 1,
      borderColor:
        COLORS.border,
    },

    label: {
      fontSize: 13,
      color:
        COLORS.subText,
      fontFamily:
        FONTS.medium,
    },

    value: {
      fontSize: 17,
      marginTop: 6,
      color:
        COLORS.text,
      fontFamily:
        FONTS.semibold,
    },

    button: {
      backgroundColor:
        COLORS.primary,
      marginTop: 24,
      paddingVertical: 16,
      borderRadius: 14,
      alignItems:
        'center',
    },

    buttonText: {
      color:
        COLORS.white,
      fontSize: 15,
      fontFamily:
        FONTS.bold,
    },

    outlineBtn: {
      marginTop: 14,
      paddingVertical: 16,
      borderRadius: 14,
      alignItems:
        'center',
      borderWidth: 1.5,
      borderColor:
        COLORS.primary,
      backgroundColor:
        COLORS.white,
    },

    outlineText: {
      color:
        COLORS.primary,
      fontSize: 15,
      fontFamily:
        FONTS.semibold,
    },
  });