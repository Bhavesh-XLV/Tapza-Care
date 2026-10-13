import React from 'react';

import { StyleSheet, Text, View } from 'react-native';

import { useConfigStore } from '../store/configStore';
import { createTheme } from '../theme/createTheme';

function BookingsScreen() {
  const config = useConfigStore(state => state.config);

  if (!config) {
    return null;
  }

  const theme = createTheme(config.theme);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background,
        },
      ]}
    >
      <Text
        style={[
          styles.title,
          {
            color: theme.colors.textPrimary,
            fontSize: theme.typography.heading,
          },
        ]}
      >
        My Bookings
      </Text>

      <View
        style={[
          styles.emptyCard,
          {
            backgroundColor: theme.colors.surface,
            borderRadius: theme.radius.lg,
          },
        ]}
      >
        <Text
          style={[
            styles.emptyTitle,
            {
              color: theme.colors.textPrimary,
              fontSize: theme.typography.body,
            },
          ]}
        >
          No bookings yet
        </Text>

        <Text
          style={[
            styles.emptyText,
            {
              color: theme.colors.textSecondary,
              fontSize: theme.typography.caption,
            },
          ]}
        >
          Your upcoming appointments will appear here.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  title: {
    fontWeight: '700',
    marginBottom: 20,
  },

  emptyCard: {
    padding: 24,
    alignItems: 'center',
  },

  emptyTitle: {
    fontWeight: '600',
    marginBottom: 8,
  },

  emptyText: {
    textAlign: 'center',
  },
});

export default BookingsScreen;
