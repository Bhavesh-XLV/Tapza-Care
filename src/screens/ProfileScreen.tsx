import React from 'react';

import { Pressable, StyleSheet, Text, View } from 'react-native';

import { ConfigMode, getConfigMode, setConfigMode } from '../api/configApi';

import { useConfigStore } from '../store/configStore';
import { createTheme } from '../theme/createTheme';

function ProfileScreen() {
  const config = useConfigStore(state => state.config);
  const loadConfig = useConfigStore(state => state.loadConfig);

  if (!config) {
    return null;
  }

  const theme = createTheme(config.theme);
  const currentMode = getConfigMode();

  async function handleConfigSwitch(mode: ConfigMode): Promise<void> {
    if (mode === currentMode) {
      return;
    }

    setConfigMode(mode);
    await loadConfig();
  }

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
        Profile
      </Text>

      <View
        style={[
          styles.profileCard,
          {
            backgroundColor: theme.colors.surface,
            borderRadius: theme.radius.lg,
          },
        ]}
      >
        <View
          style={[
            styles.avatar,
            {
              backgroundColor: theme.colors.secondary,
            },
          ]}
        >
          <Text
            style={[
              styles.avatarText,
              {
                color: theme.colors.primary,
              },
            ]}
          >
            B
          </Text>
        </View>

        <Text
          style={[
            styles.name,
            {
              color: theme.colors.textPrimary,
              fontSize: theme.typography.body,
            },
          ]}
        >
          Tapza Care Patient
        </Text>

        <Text
          style={[
            styles.subtitle,
            {
              color: theme.colors.textSecondary,
              fontSize: theme.typography.caption,
            },
          ]}
        >
          Manage your profile and preferences
        </Text>
      </View>

      <View
        style={[
          styles.configCard,
          {
            backgroundColor: theme.colors.surface,
            borderRadius: theme.radius.lg,
          },
        ]}
      >
        <Text
          style={[
            styles.configTitle,
            {
              color: theme.colors.textPrimary,
              fontSize: theme.typography.body,
            },
          ]}
        >
          App Configuration
        </Text>

        <Text
          style={[
            styles.configSubtitle,
            {
              color: theme.colors.textSecondary,
              fontSize: theme.typography.caption,
            },
          ]}
        >
          Switch remote configuration at runtime
        </Text>

        <View style={styles.switchRow}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Use normal day configuration"
            onPress={() => {
              handleConfigSwitch('normal');
            }}
            style={[
              styles.switchButton,
              {
                backgroundColor:
                  currentMode === 'normal'
                    ? theme.colors.primary
                    : theme.colors.secondary,
                borderRadius: theme.radius.pill,
              },
            ]}
          >
            <Text
              style={[
                styles.switchText,
                {
                  color:
                    currentMode === 'normal'
                      ? theme.colors.surface
                      : theme.colors.textPrimary,
                },
              ]}
            >
              Normal Day
            </Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Use Diwali configuration"
            onPress={() => {
              handleConfigSwitch('diwali');
            }}
            style={[
              styles.switchButton,
              {
                backgroundColor:
                  currentMode === 'diwali'
                    ? theme.colors.primary
                    : theme.colors.secondary,
                borderRadius: theme.radius.pill,
              },
            ]}
          >
            <Text
              style={[
                styles.switchText,
                {
                  color:
                    currentMode === 'diwali'
                      ? theme.colors.surface
                      : theme.colors.textPrimary,
                },
              ]}
            >
              Diwali
            </Text>
          </Pressable>
        </View>
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

  profileCard: {
    alignItems: 'center',
    padding: 24,
  },

  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },

  avatarText: {
    fontSize: 28,
    fontWeight: '700',
  },

  name: {
    fontWeight: '600',
    marginBottom: 8,
  },

  subtitle: {
    textAlign: 'center',
  },

  configCard: {
    marginTop: 16,
    padding: 20,
  },

  configTitle: {
    fontWeight: '700',
    marginBottom: 6,
  },

  configSubtitle: {
    marginBottom: 16,
  },

  switchRow: {
    flexDirection: 'row',
    gap: 8,
  },

  switchButton: {
    flex: 1,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },

  switchText: {
    fontWeight: '600',
  },
});

export default ProfileScreen;
