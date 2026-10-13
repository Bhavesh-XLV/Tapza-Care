import React, { useEffect, useState } from 'react';

import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '../navigation/AppNavigator';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { getPrescriptions } from '../api/prescriptionsApi';
import { useConfigStore } from '../store/configStore';
import { createTheme } from '../theme/createTheme';
import { Prescription } from '../types/prescription';

function PrescriptionsScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const insets = useSafeAreaInsets();

  const config = useConfigStore(state => state.config);

  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPrescriptions() {
      try {
        const response = await getPrescriptions();

        setPrescriptions(response);
      } catch {
        setError('Unable to load prescriptions');
      } finally {
        setIsLoading(false);
      }
    }

    loadPrescriptions();
  }, []);

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
          Loading prescriptions...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={[
          styles.center,
          {
            backgroundColor: theme.colors.background,
            paddingTop: insets.top,
            paddingHorizontal: theme.spacing.lg,
          },
        ]}
      >
        <Text
          style={{
            color: theme.colors.textPrimary,
            fontSize: theme.typography.body,
            textAlign: 'center',
          }}
        >
          {error}
        </Text>
      </View>
    );
  }

  if (prescriptions.length === 0) {
    return (
      <View
        style={[
          styles.center,
          {
            backgroundColor: theme.colors.background,
            paddingTop: insets.top,
            paddingHorizontal: theme.spacing.lg,
          },
        ]}
      >
        <Text
          style={{
            color: theme.colors.textSecondary,
            fontSize: theme.typography.body,
          }}
        >
          No prescriptions available
        </Text>
      </View>
    );
  }

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
        Prescriptions
      </Text>

      <Text
        style={{
          color: theme.colors.textSecondary,
          fontSize: theme.typography.body,
          marginTop: theme.spacing.xs,
          marginBottom: theme.spacing.lg,
        }}
      >
        Your medicines and dosage instructions
      </Text>

      <FlatList
        data={prescriptions}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: insets.bottom + theme.spacing.xl,
          gap: theme.spacing.md,
        }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(
                'PrescriptionDetail',

                {
                  prescriptionId: item.id,
                },
              );
            }}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel={`Prescription from ${item.doctorName}`}
            style={[
              styles.card,
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
                fontSize: theme.typography.heading,
                fontWeight: '700',
              }}
            >
              {item.doctorName}
            </Text>

            <Text
              style={{
                color: theme.colors.textSecondary,
                fontSize: theme.typography.caption,
                marginTop: theme.spacing.xs,
              }}
            >
              {item.clinicName}
            </Text>

            <Text
              style={{
                color: theme.colors.textSecondary,
                fontSize: theme.typography.caption,
                marginTop: theme.spacing.sm,
              }}
            >
              {item.medicines.length} medicines
            </Text>
          </TouchableOpacity>
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
  },

  title: {
    fontWeight: '700',
  },

  card: {
    minHeight: 120,
  },
});

export default PrescriptionsScreen;
