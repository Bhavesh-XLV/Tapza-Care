import React from 'react';

import { FlatList, StyleSheet, Text, View } from 'react-native';

import { useConfigStore } from '../store/configStore';
import { useBookingStore } from '../store/bookingStore';
import { createTheme } from '../theme/createTheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function BookingsScreen() {
  const config = useConfigStore(state => state.config);
  const bookings = useBookingStore(state => state.bookings);
  const insets = useSafeAreaInsets();

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
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
      ]}
    >
      <Text
        style={[
          styles.title,
          {
            color: theme.colors.textPrimary,
            fontSize: theme.typography.title,
          },
        ]}
      >
        My Bookings
      </Text>

      {bookings.length === 0 ? (
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
      ) : (
        <FlatList
          data={bookings}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View
              style={[
                styles.bookingCard,
                {
                  backgroundColor: theme.colors.surface,
                  borderRadius: theme.radius.lg,
                },
              ]}
            >
              <View style={styles.bookingHeader}>
                <Text
                  style={[
                    styles.bookingTitle,
                    {
                      color: theme.colors.textPrimary,
                      fontSize: theme.typography.body,
                    },
                  ]}
                >
                  Appointment
                </Text>

                <View
                  style={[
                    styles.statusBadge,
                    {
                      backgroundColor: theme.colors.accent,
                      borderRadius: theme.radius.pill,
                    },
                  ]}
                >
                  <Text style={styles.statusText}>Confirmed</Text>
                </View>
              </View>

              <Text
                style={[
                  styles.bookingInfo,
                  {
                    color: theme.colors.textSecondary,
                    fontSize: theme.typography.caption,
                  },
                ]}
              >
                Doctor ID: {item.doctorId}
              </Text>

              <Text
                style={[
                  styles.bookingInfo,
                  {
                    color: theme.colors.textSecondary,
                    fontSize: theme.typography.caption,
                  },
                ]}
              >
                Slot ID: {item.slotId}
              </Text>

              <Text
                style={[
                  styles.bookingInfo,
                  {
                    color: theme.colors.textSecondary,
                    fontSize: theme.typography.caption,
                  },
                ]}
              >
                Booked on: {new Date(item.createdAt).toLocaleDateString()}
              </Text>
            </View>
          )}
        />
      )}
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

  list: {
    paddingBottom: 24,
  },

  bookingCard: {
    padding: 20,
    marginBottom: 12,
  },

  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  bookingTitle: {
    fontWeight: '700',
  },

  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },

  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },

  bookingInfo: {
    marginBottom: 6,
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
