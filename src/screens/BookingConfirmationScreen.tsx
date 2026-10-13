import React, { useEffect } from 'react';

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../navigation/AppNavigator';
import { useConfigStore } from '../store/configStore';
import { createTheme } from '../theme/createTheme';
import { useBookingStore } from '../store/bookingStore';

type Props = NativeStackScreenProps<RootStackParamList, 'BookingConfirmation'>;

function BookingConfirmationScreen({ route, navigation }: Props) {
  const { doctorId, slot } = route.params;

  const insets = useSafeAreaInsets();

  const config = useConfigStore(state => state.config);

  if (!config) {
    return null;
  }

  const theme = createTheme(config.theme);

  const appointmentDate = new Date(slot.startsAt).toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  const appointmentTime = new Date(slot.startsAt).toLocaleTimeString('en-IN', {
    hour: 'numeric',
    minute: '2-digit',
  });

  const submitBooking = useBookingStore(state => state.submitBooking);

  const bookingStatus = useBookingStore(state => state.status);

  const bookingError = useBookingStore(state => state.error);

  useEffect(() => {
    if (bookingStatus === 'confirmed') {
      navigation.replace('BookingSuccess');
    }
  }, [bookingStatus, navigation]);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background,
          paddingTop: insets.top + theme.spacing.lg,
          paddingBottom: insets.bottom + theme.spacing.lg,
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
        Confirm appointment
      </Text>

      <Text
        style={{
          color: theme.colors.textSecondary,
          fontSize: theme.typography.body,
          marginTop: theme.spacing.xs,
        }}
      >
        Please review your appointment details.
      </Text>

      <View
        style={[
          styles.card,
          {
            backgroundColor: theme.colors.surface,
            borderRadius: theme.radius.lg,
            marginTop: theme.spacing.xl,
            padding: theme.spacing.lg,
          },
        ]}
      >
        <Text
          style={{
            color: theme.colors.textSecondary,
            fontSize: theme.typography.caption,
          }}
        >
          Doctor
        </Text>

        <Text
          style={[
            styles.value,
            {
              color: theme.colors.textPrimary,
              fontSize: theme.typography.heading,
              marginTop: theme.spacing.xs,
            },
          ]}
        >
          {doctorId}
        </Text>

        <View
          style={{
            marginTop: theme.spacing.lg,
          }}
        >
          <Text
            style={{
              color: theme.colors.textSecondary,
              fontSize: theme.typography.caption,
            }}
          >
            Date
          </Text>

          <Text
            style={[
              styles.value,
              {
                color: theme.colors.textPrimary,
                fontSize: theme.typography.body,
                marginTop: theme.spacing.xs,
              },
            ]}
          >
            {appointmentDate}
          </Text>
        </View>

        <View
          style={{
            marginTop: theme.spacing.lg,
          }}
        >
          <Text
            style={{
              color: theme.colors.textSecondary,
              fontSize: theme.typography.caption,
            }}
          >
            Time
          </Text>

          <Text
            style={[
              styles.value,
              {
                color: theme.colors.textPrimary,
                fontSize: theme.typography.heading,
                marginTop: theme.spacing.xs,
              },
            ]}
          >
            {appointmentTime}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        accessibilityRole="button"
        accessibilityLabel="Confirm appointment"
        disabled={bookingStatus === 'pending'}
        onPress={() => {
          submitBooking(doctorId, slot);
        }}
        style={[
          styles.button,

          {
            backgroundColor: theme.colors.primary,

            borderRadius: theme.radius.md,

            marginTop: theme.spacing.xl,

            opacity: bookingStatus === 'pending' ? 0.6 : 1,
          },
        ]}
      >
        <Text
          style={{
            color: '#FFFFFF',

            fontSize: theme.typography.body,

            fontWeight: '700',
          }}
        >
          {bookingStatus === 'pending'
            ? 'Confirming...'
            : 'Confirm appointment'}
        </Text>
      </TouchableOpacity>
      {bookingStatus === 'conflict' || bookingStatus === 'error' ? (
        <Text
          style={{
            color: theme.colors.textSecondary,

            fontSize: theme.typography.caption,

            textAlign: 'center',

            marginTop: theme.spacing.sm,
          }}
        >
          {bookingError}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },

  title: {
    fontWeight: '700',
  },

  card: {
    minHeight: 250,
  },

  value: {
    fontWeight: '600',
  },

  button: {
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BookingConfirmationScreen;
