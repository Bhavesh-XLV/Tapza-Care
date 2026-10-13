import React, { useEffect } from 'react';

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../navigation/AppNavigator';
import { useConfigStore } from '../store/configStore';
import { createTheme } from '../theme/createTheme';
import { useBookingStore } from '../store/bookingStore';

type Props = NativeStackScreenProps<RootStackParamList, 'BookingSuccess'>;

function BookingSuccessScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();

  const config = useConfigStore(state => state.config);

  const booking = useBookingStore(state => state.booking);

  const scale = useSharedValue(0.5);

  useEffect(() => {
    scale.value = withSpring(1);
  }, [scale]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: scale.value,
        },
      ],
    };
  });

  if (!config || !booking) {
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
      <Animated.View style={animatedStyle}>
        <View
          style={[
            styles.successCircle,
            {
              backgroundColor: theme.colors.accent,
            },
          ]}
        >
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 36,
              fontWeight: '700',
            }}
          >
            ✓
          </Text>
        </View>
      </Animated.View>

      <Text
        style={[
          styles.title,
          {
            color: theme.colors.textPrimary,
            fontSize: theme.typography.title,
            marginTop: theme.spacing.lg,
          },
        ]}
      >
        Appointment confirmed
      </Text>

      <Text
        style={{
          color: theme.colors.textSecondary,
          fontSize: theme.typography.body,
          textAlign: 'center',
          marginTop: theme.spacing.sm,
        }}
      >
        Your appointment has been booked successfully.
      </Text>

      <View
        style={[
          styles.bookingCard,
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
          Booking ID
        </Text>

        <Text
          style={{
            color: theme.colors.textPrimary,
            fontSize: theme.typography.body,
            fontWeight: '600',
            marginTop: theme.spacing.xs,
          }}
        >
          {booking.id}
        </Text>
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        accessibilityRole="button"
        accessibilityLabel="Back to home"
        onPress={() => {
          navigation.navigate('Main');
        }}
        style={[
          styles.button,
          {
            backgroundColor: theme.colors.primary,
            borderRadius: theme.radius.md,
            marginTop: theme.spacing.xl,
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
          Back to home
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  successCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontWeight: '700',
    textAlign: 'center',
  },

  bookingCard: {
    width: '100%',
  },

  button: {
    width: '100%',
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BookingSuccessScreen;
