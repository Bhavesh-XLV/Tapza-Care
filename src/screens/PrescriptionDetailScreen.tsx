import React, { useEffect, useState } from 'react';

import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { useReminderStore } from '../store/reminderStore';
import { getPrescriptions } from '../api/prescriptionsApi';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useConfigStore } from '../store/configStore';
import { createTheme } from '../theme/createTheme';
import { Medicine, Prescription } from '../types/prescription';

type Props = NativeStackScreenProps<RootStackParamList, 'PrescriptionDetail'>;

function PrescriptionDetailScreen({ route }: Props) {
  const toggleDose = useReminderStore(state => state.toggleDose);

  const takenDoses = useReminderStore(state => state.takenDoses);

  const { prescriptionId } = route.params;

  const insets = useSafeAreaInsets();

  const config = useConfigStore(state => state.config);

  const [prescription, setPrescription] = useState<Prescription | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPrescription() {
      try {
        const response = await getPrescriptions();

        const result = response.find(item => item.id === prescriptionId);

        if (!result) {
          setError('Prescription not found');
          return;
        }

        setPrescription(result);
      } catch {
        setError('Unable to load prescription');
      } finally {
        setIsLoading(false);
      }
    }

    loadPrescription();
  }, [prescriptionId]);

  if (!config) {
    return null;
  }

  const theme = createTheme(config.theme);

  if (isLoading) {
    return (
      <View
        style={[
          styles.center,
          {
            backgroundColor: theme.colors.background,
            paddingTop: insets.top,
          },
        ]}
      >
        <ActivityIndicator />

        <Text
          style={{
            color: theme.colors.textSecondary,
            marginTop: theme.spacing.sm,
          }}
        >
          Loading prescription...
        </Text>
      </View>
    );
  }

  if (error || !prescription) {
    return (
      <View
        style={[
          styles.center,
          {
            backgroundColor: theme.colors.background,
            paddingTop: insets.top,
          },
        ]}
      >
        <Text
          style={{
            color: theme.colors.textPrimary,
            fontSize: theme.typography.body,
          }}
        >
          {error ?? 'Prescription not found'}
        </Text>
      </View>
    );
  }

  const issuedDate = new Date(prescription.issuedAt).toLocaleDateString(
    'en-IN',
    {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    },
  );

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
        Prescription
      </Text>

      <Text
        style={{
          color: theme.colors.textSecondary,
          fontSize: theme.typography.body,
          marginTop: theme.spacing.xs,
        }}
      >
        {prescription.doctorName}
      </Text>

      <Text
        style={{
          color: theme.colors.textSecondary,
          fontSize: theme.typography.caption,
          marginTop: theme.spacing.xs,
        }}
      >
        {prescription.clinicName} · {issuedDate}
      </Text>

      <Text
        style={[
          styles.medicineTitle,
          {
            color: theme.colors.textPrimary,
            fontSize: theme.typography.heading,
            marginTop: theme.spacing.xl,
            marginBottom: theme.spacing.md,
          },
        ]}
      >
        Medicines
      </Text>

      <FlatList
        data={prescription.medicines}
        keyExtractor={(item: Medicine) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: insets.bottom + theme.spacing.xl,
          gap: theme.spacing.md,
        }}
        renderItem={({ item }) => (
          <View
            style={[
              styles.medicineCard,
              {
                backgroundColor: theme.colors.surface,
                borderRadius: theme.radius.md,
                padding: theme.spacing.md,
              },
            ]}
          >
            <Text
              style={{
                color: theme.colors.textPrimary,
                fontSize: theme.typography.body,
                fontWeight: '700',
              }}
            >
              {item.name}
            </Text>

            <Text
              style={{
                color: theme.colors.textSecondary,
                fontSize: theme.typography.caption,
                marginTop: theme.spacing.xs,
              }}
            >
              {item.dose} · {item.days} days
            </Text>

            <View
              style={[
                styles.timingRow,
                {
                  marginTop: theme.spacing.md,
                },
              ]}
            >
              {item.timing.map(timing => {
                const doseKey = `${item.id}-${timing}`;

                const isTaken = Boolean(takenDoses[doseKey]);

                return (
                  <TouchableOpacity
                    key={timing}
                    activeOpacity={0.8}
                    accessibilityRole="button"
                    accessibilityLabel={
                      isTaken
                        ? `${timing} dose taken`
                        : `Mark ${timing} dose as taken`
                    }
                    onPress={() => {
                      toggleDose(item.id, timing);
                    }}
                    style={[
                      styles.timingBadge,
                      {
                        backgroundColor: isTaken
                          ? theme.colors.accent
                          : theme.colors.secondary,
                        borderRadius: theme.radius.pill,
                        marginRight: theme.spacing.xs,
                      },
                    ]}
                  >
                    <Text
                      style={{
                        color: theme.colors.textPrimary,
                        fontSize: theme.typography.caption,
                        fontWeight: '600',
                      }}
                    >
                      {isTaken ? `${timing} ✓` : `Mark ${timing}`}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },

  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  title: {
    fontWeight: '700',
  },

  medicineTitle: {
    fontWeight: '700',
  },

  medicineCard: {
    minHeight: 130,
  },

  timingRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  timingBadge: {
    minHeight: 32,
    justifyContent: 'center',
    paddingHorizontal: 12,
    marginBottom: 4,
  },
});

export default PrescriptionDetailScreen;
