import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from 'react-native';

import {COLORS} from '../theme/colors';
import {FONTS} from '../theme/fonts';
import {getRelativeTime} from '../utils/time';

interface Props {
  item: any;
  onPress: () => void;
}

export default function NewsCard({
  item,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.card}
      onPress={onPress}>
      
      <View style={styles.badge}>
        <Text style={styles.badgeText}>
          {item.score}
        </Text>
      </View>

      <Text
        numberOfLines={2}
        style={styles.title}>
        {item.title}
      </Text>

      <Text style={styles.meta}>
        {item.by} •{' '}
        {getRelativeTime(
          item.time,
        )}
      </Text>
    </TouchableOpacity>
  );
}

const styles =
  StyleSheet.create({
    card: {
      backgroundColor:
        COLORS.card,
      borderRadius: 18,
      padding: 16,
      marginBottom: 14,
      elevation: 3,
      shadowColor:
        '#000',
      shadowOpacity: 0.05,
      shadowRadius: 10,
    },

    badge: {
      backgroundColor:
        COLORS.primary,
      alignSelf:
        'flex-start',
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 20,
      marginBottom: 12,
    },

    badgeText: {
      color:
        COLORS.white,
      fontSize: 12,
      fontFamily:
        FONTS.bold,
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
      fontSize: 13,
      color:
        COLORS.subText,
      fontFamily:
        FONTS.regular,
    },
  });