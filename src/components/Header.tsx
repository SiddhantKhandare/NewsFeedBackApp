import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import {COLORS} from '../theme/colors';
import {FONTS} from '../theme/fonts';

interface Props {
  title: string;
  subtitle?: string;
}

export default function Header({
  title,
  subtitle,
}: Props) {
  return (
    <View style={styles.wrap}>
      {subtitle ? (
        <Text
          style={
            styles.subtitle
          }>
          {subtitle}
        </Text>
      ) : null}

      <Text style={styles.title}>
        {title}
      </Text>
    </View>
  );
}

const styles =
  StyleSheet.create({
    wrap: {
      marginTop: 8,
      marginBottom: 18,
    },

    subtitle: {
      fontSize: 14,
      color:
        COLORS.subText,
      fontFamily:
        FONTS.regular,
    },

    title: {
      marginTop: 4,
      fontSize: 28,
      color:
        COLORS.text,
      fontFamily:
        FONTS.bold,
    },
  });