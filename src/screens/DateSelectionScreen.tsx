import React, { useEffect, useMemo, useRef, useState } from 'react';

import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { getSlots } from '../api/slotsApi';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useConfigStore } from '../store/configStore';
import { createTheme } from '../theme/createTheme';
import { Slot } from '../types/booking';

type Props = NativeStackScreenProps<RootStackParamList, 'DateSelection'>;

interface DateItem {
  date: Date;
  label: string;
  value: string;
}

function DateSelectionScreen({ route }: Props) {
  const { doctorId } = route.params;

  const insets = useSafeAreaInsets();

  const config = useConfigStore(state => state.config);

  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const [slots, setSlots] = useState<Slot[]>([]);

  const [isLoadingSlots, setIsLoadingSlots] = useState(false);

  const [slotsError, setSlotsError] = useState<string | null>(null);

  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ['35%', '70%'], []);

  const theme = config ? createTheme(config.theme) : null;

  const dates = useMemo<DateItem[]>(() => {
    const result: DateItem[] = [];

    for (let index = 0; index < 7; index += 1) {
      const date = new Date();

      date.setDate(date.getDate() + index);

      result.push({
        date,
        label:
          index === 0
            ? 'Today'
            : index === 1
            ? 'Tomorrow'
            : date.toLocaleDateString('en-IN', {
                weekday: 'short',
              }),
        value: date.toISOString().split('T')[0],
      });
    }

    return result;
  }, []);

  useEffect(() => {
    if (!selectedDate) {
      return;
    }

    async function loadSlots() {
      setIsLoadingSlots(true);
      setSlotsError(null);
      setSlots([]);
      setSelectedSlot(null);

      try {
        const response = await getSlots(doctorId, selectedDate);

        setSlots(response);
      } catch {
        setSlotsError('Unable to load available slots');
      } finally {
        setIsLoadingSlots(false);
      }
    }

    loadSlots();
  }, [doctorId, selectedDate]);

  if (!theme) {
    return null;
  }

  const availableSlots = slots.filter(slot => slot.available);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background,
          paddingTop: insets.top + theme.spacing.md,
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
        Select date
      </Text>

      <Text
        style={[
          styles.subtitle,
          {
            color: theme.colors.textSecondary,
            fontSize: theme.typography.body,
            marginTop: theme.spacing.xs,
            marginBottom: theme.spacing.lg,
          },
        ]}
      >
        Choose a date for your appointment
      </Text>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={dates}
        keyExtractor={item => item.value}
        contentContainerStyle={{
          gap: theme.spacing.sm,
        }}
        style={{
          flexGrow: 0,
        }}
        renderItem={({ item }) => {
          const isSelected = selectedDate === item.value;

          return (
            <TouchableOpacity
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel={`Select ${item.label}`}
              onPress={() => {
                setSelectedDate(item.value);
              }}
              style={[
                styles.dateCard,
                {
                  backgroundColor: isSelected
                    ? theme.colors.primary
                    : theme.colors.surface,
                  borderRadius: theme.radius.md,
                  padding: theme.spacing.md,
                },
              ]}
            >
              <Text
                style={{
                  color: isSelected ? '#FFFFFF' : theme.colors.textSecondary,
                  fontSize: theme.typography.caption,
                }}
              >
                {item.label}
              </Text>

              <Text
                style={[
                  styles.day,
                  {
                    color: isSelected ? '#FFFFFF' : theme.colors.textPrimary,
                    fontSize: theme.typography.heading,
                  },
                ]}
              >
                {item.date.getDate()}
              </Text>

              <Text
                style={{
                  color: isSelected ? '#FFFFFF' : theme.colors.textSecondary,
                  fontSize: theme.typography.caption,
                }}
              >
                {item.date.toLocaleDateString('en-IN', {
                  month: 'short',
                })}
              </Text>
            </TouchableOpacity>
          );
        }}
      />

      <Text
        style={[
          styles.slotTitle,
          {
            color: theme.colors.textPrimary,
            fontSize: theme.typography.heading,
            marginTop: theme.spacing.xl,
            marginBottom: theme.spacing.md,
          },
        ]}
      >
        Appointment time
      </Text>

      {!selectedDate ? (
        <Text
          style={{
            color: theme.colors.textSecondary,
          }}
        >
          Select a date to view available slots.
        </Text>
      ) : null}

      {isLoadingSlots ? (
        <View style={styles.center}>
          <ActivityIndicator />

          <Text
            style={{
              color: theme.colors.textSecondary,
              marginTop: theme.spacing.sm,
            }}
          >
            Loading slots...
          </Text>
        </View>
      ) : null}

      {slotsError ? (
        <Text
          style={{
            color: theme.colors.textSecondary,
          }}
        >
          {slotsError}
        </Text>
      ) : null}

      {!isLoadingSlots &&
      !slotsError &&
      selectedDate &&
      availableSlots.length === 0 ? (
        <Text
          style={{
            color: theme.colors.textSecondary,
          }}
        >
          No slots available for this date.
        </Text>
      ) : null}

      {!isLoadingSlots && !slotsError && availableSlots.length > 0 ? (
        <TouchableOpacity
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel="View available appointment slots"
          onPress={() => {
            bottomSheetRef.current?.snapToIndex(0);
          }}
          style={[
            styles.slotButton,
            {
              backgroundColor: theme.colors.primary,
              borderRadius: theme.radius.md,
              marginTop: theme.spacing.md,
            },
          ]}
        >
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: theme.typography.body,
              fontWeight: '600',
            }}
          >
            {selectedSlot ? 'Change appointment time' : 'View available slots'}
          </Text>
        </TouchableOpacity>
      ) : null}

      {selectedSlot ? (
        <View
          style={[
            styles.selectedSlotCard,
            {
              backgroundColor: theme.colors.surface,
              borderRadius: theme.radius.md,
              marginTop: theme.spacing.md,
              padding: theme.spacing.md,
            },
          ]}
        >
          <Text
            style={{
              color: theme.colors.textSecondary,
              fontSize: theme.typography.caption,
            }}
          >
            Selected time
          </Text>

          <Text
            style={{
              color: theme.colors.textPrimary,
              fontSize: theme.typography.heading,
              fontWeight: '700',
              marginTop: theme.spacing.xs,
            }}
          >
            {new Date(selectedSlot.startsAt).toLocaleTimeString('en-IN', {
              hour: 'numeric',
              minute: '2-digit',
            })}
          </Text>
        </View>
      ) : null}

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        backgroundStyle={{
          backgroundColor: theme.colors.surface,
        }}
        handleIndicatorStyle={{
          backgroundColor: theme.colors.textSecondary,
        }}
      >
        <View
          style={{
            paddingHorizontal: theme.spacing.md,
          }}
        >
          <Text
            style={{
              color: theme.colors.textPrimary,
              fontSize: theme.typography.heading,
              fontWeight: '700',
              marginBottom: theme.spacing.md,
            }}
          >
            Choose a time
          </Text>
        </View>

        <BottomSheetFlatList
          data={availableSlots}
          keyExtractor={item => item.id}
          contentContainerStyle={{
            paddingHorizontal: theme.spacing.md,
            paddingBottom: insets.bottom + theme.spacing.xl,
            gap: theme.spacing.sm,
          }}
          renderItem={({ item }) => {
            const startTime = new Date(item.startsAt).toLocaleTimeString(
              'en-IN',
              {
                hour: 'numeric',
                minute: '2-digit',
              },
            );

            const isSelected = selectedSlot?.id === item.id;

            return (
              <TouchableOpacity
                activeOpacity={0.8}
                accessibilityRole="button"
                accessibilityLabel={`Select ${startTime}`}
                onPress={() => {
                  setSelectedSlot(item);

                  bottomSheetRef.current?.close();
                }}
                style={[
                  styles.sheetSlot,
                  {
                    backgroundColor: isSelected
                      ? theme.colors.secondary
                      : theme.colors.background,
                    borderRadius: theme.radius.md,
                    padding: theme.spacing.md,
                  },
                ]}
              >
                <Text
                  style={{
                    color: theme.colors.textPrimary,
                    fontSize: theme.typography.body,
                    fontWeight: '600',
                  }}
                >
                  {startTime}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },

  center: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },

  title: {
    fontWeight: '700',
  },

  subtitle: {
    lineHeight: 22,
  },

  dateCard: {
    width: 90,
    minHeight: 110,
    alignItems: 'center',
    justifyContent: 'center',
  },

  day: {
    fontWeight: '700',
    marginVertical: 4,
  },

  slotTitle: {
    fontWeight: '700',
  },

  slotButton: {
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },

  selectedSlotCard: {
    minHeight: 80,
  },

  sheetSlot: {
    minHeight: 52,
    justifyContent: 'center',
  },
});

export default DateSelectionScreen;
