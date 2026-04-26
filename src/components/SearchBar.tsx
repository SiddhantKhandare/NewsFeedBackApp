import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
} from 'react-native';

import {COLORS} from '../theme/colors';
import {FONTS} from '../theme/fonts';

interface Props {
  value: string;
  onChangeText: (
    text: string,
  ) => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChangeText,
  placeholder = 'Search...',
}: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.icon}>
        🔍
      </Text>

      <TextInput
        value={value}
        onChangeText={
          onChangeText
        }
        placeholder={
          placeholder
        }
        placeholderTextColor={
          COLORS.subText
        }
        style={styles.input}
      />
    </View>
  );
}

const styles =
  StyleSheet.create({
    wrap: {
      flexDirection:
        'row',
      alignItems:
        'center',
      backgroundColor:
        COLORS.white,
      borderRadius: 14,
      borderWidth: 1,
      borderColor:
        COLORS.border,
      paddingHorizontal: 14,
      height: 54,
      marginBottom: 16,
    },

    icon: {
      fontSize: 18,
      marginRight: 8,
    },

    input: {
      flex: 1,
      color:
        COLORS.text,
      fontSize: 15,
      fontFamily:
        FONTS.medium,
    },
  });