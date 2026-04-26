import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import {COLORS} from '../theme/colors';
import {FONTS} from '../theme/fonts';

interface Props {
  icon?: string;
  title: string;
  description?: string;
}

export default function EmptyState({
  icon = '📭',
  title,
  description = '',
}: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.icon}>
        {icon}
      </Text>

      <Text style={styles.title}>
        {title}
      </Text>

      {description ? (
        <Text
          style={
            styles.desc
          }>
          {
            description
          }
        </Text>
      ) : null}
    </View>
  );
}

const styles =
  StyleSheet.create({
    wrap: {
      flex: 1,
      justifyContent:
        'center',
      alignItems:
        'center',
      paddingHorizontal: 30,
    },

    icon: {
      fontSize: 54,
    },

    title: {
      marginTop: 16,
      fontSize: 24,
      color:
        COLORS.text,
      textAlign:
        'center',
      fontFamily:
        FONTS.bold,
    },

    desc: {
      marginTop: 10,
      fontSize: 15,
      lineHeight: 24,
      color:
        COLORS.subText,
      textAlign:
        'center',
      fontFamily:
        FONTS.regular,
    },
  });