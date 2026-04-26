import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import {COLORS} from '../theme/colors';

export default function Loader() {
  return (
    <View style={styles.container}>
      
      {[1, 2, 3].map(
        item => (
          <View
            key={item}
            style={
              styles.card
            }>
            <View
              style={
                styles.badge
              }
            />

            <View
              style={
                styles.line1
              }
            />

            <View
              style={
                styles.line2
              }
            />
          </View>
        ),
      )}

    </View>
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

    card: {
      backgroundColor:
        COLORS.white,
      borderRadius: 18,
      padding: 16,
      marginBottom: 14,
    },

    badge: {
      width: 50,
      height: 24,
      borderRadius: 20,
      backgroundColor:
        '#E5E7EB',
      marginBottom: 12,
    },

    line1: {
      height: 16,
      width: '90%',
      borderRadius: 8,
      backgroundColor:
        '#E5E7EB',
    },

    line2: {
      height: 14,
      width: '50%',
      borderRadius: 8,
      backgroundColor:
        '#E5E7EB',
      marginTop: 12,
    },
  });