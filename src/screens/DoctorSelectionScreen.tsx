import React, { useEffect, useState } from 'react';

import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { getDoctors } from '../api/doctorsApi';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useConfigStore } from '../store/configStore';
import { createTheme } from '../theme/createTheme';
import { Doctor } from '../types/doctor';

function DoctorSelectionScreen() {
  const insets = useSafeAreaInsets();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const config = useConfigStore(state => state.config);

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadDoctors() {
      try {
        const response = await getDoctors();

        setDoctors(response);
      } catch {
        setError('Unable to load doctors');
      } finally {
        setIsLoading(false);
      }
    }

    loadDoctors();
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
          Loading doctors...
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
          },
        ]}
      >
        <Text
          style={{
            color: theme.colors.textPrimary,
            fontSize: theme.typography.body,
          }}
        >
          {error}
        </Text>
      </View>
    );
  }

  if (doctors.length === 0) {
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
            color: theme.colors.textSecondary,
            fontSize: theme.typography.body,
          }}
        >
          No doctors available
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
        Choose a doctor
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
        Select a doctor for your consultation
      </Text>

      <FlatList
        data={doctors}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: insets.bottom + theme.spacing.xl,
          gap: theme.spacing.sm,
        }}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel={`Select ${item.name}`}
            onPress={() => {
              navigation.navigate('DateSelection', {
                doctorId: item.id,
              });
            }}
            style={[
              styles.card,
              {
                backgroundColor: theme.colors.surface,
                borderRadius: theme.radius.md,
                padding: theme.spacing.md,
              },
            ]}
          >
            <Image
              source={{ uri: item.photoUrl }}
              style={[
                styles.photo,
                {
                  borderRadius: theme.radius.pill,
                },
              ]}
            />

            <View style={styles.details}>
              <Text
                style={[
                  styles.name,
                  {
                    color: theme.colors.textPrimary,
                    fontSize: theme.typography.body,
                  },
                ]}
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
                {item.specialty}
              </Text>

              <Text
                style={{
                  color: theme.colors.primary,
                  fontSize: theme.typography.caption,
                  fontWeight: '600',
                  marginTop: theme.spacing.xs,
                }}
              >
                ₹{item.feeInr} consultation
              </Text>
            </View>
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
    paddingHorizontal: 20,
  },

  title: {
    fontWeight: '700',
  },

  subtitle: {
    lineHeight: 22,
  },

  card: {
    minHeight: 96,
    flexDirection: 'row',
    alignItems: 'center',
  },

  photo: {
    width: 68,
    height: 68,
  },

  details: {
    flex: 1,
    marginLeft: 16,
  },

  name: {
    fontWeight: '600',
  },
});

export default DoctorSelectionScreen;
