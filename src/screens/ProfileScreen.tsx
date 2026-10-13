import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ConfigMode, getConfigMode, setConfigMode } from '../api/configApi';
import { useConfigStore } from '../store/configStore';
import { createTheme } from '../theme/createTheme';

function ProfileScreen() {
  const config = useConfigStore(state => state.config);
  const loadConfig = useConfigStore(state => state.loadConfig);
  const updateConfig = useConfigStore(state => state.updateConfig);

  const insets = useSafeAreaInsets();

  if (config === null) {
    return null;
  }

  const theme = createTheme(config.theme);
  const currentMode = getConfigMode();

  function changeHeroBackground(
    kind: 'color' | 'gradient' | 'image',
    value: string,
  ): void {
    const updatedConfig = {
      ...config,
      sections:
        config &&
        config.sections.map(section => {
          if (section.type !== 'hero_banner' || section.id !== 'hero') {
            return section;
          }

          return {
            ...section,
            background: {
              kind,
              value,
            },
          };
        }),
    };

    updateConfig(updatedConfig);
  }

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
          paddingTop: insets.top + theme.spacing.md,
          paddingBottom: insets.bottom + theme.spacing.md,
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
          styles.card,
          {
            backgroundColor: theme.colors.surface,
            borderRadius: theme.radius.lg,
          },
        ]}
      >
        <Text
          style={[
            styles.cardTitle,
            {
              color: theme.colors.textPrimary,
              fontSize: theme.typography.body,
            },
          ]}
        >
          Remote Configuration
        </Text>

        <Text
          style={[
            styles.description,
            {
              color: theme.colors.textSecondary,
              fontSize: theme.typography.caption,
            },
          ]}
        >
          Change the app layout and theme without releasing a new app version.
        </Text>

        <View style={styles.switchRow}>
          <Pressable
            accessibilityRole="button"
            onPress={() => handleConfigSwitch('normal')}
            style={[
              styles.button,
              {
                backgroundColor:
                  currentMode === 'normal'
                    ? theme.colors.primary
                    : theme.colors.background,
                borderRadius: theme.radius.md,
              },
            ]}
          >
            <Text
              style={[
                styles.buttonText,
                {
                  color:
                    currentMode === 'normal'
                      ? theme.colors.surface
                      : theme.colors.textPrimary,
                },
              ]}
            >
              Normal
            </Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            onPress={() => handleConfigSwitch('diwali')}
            style={[
              styles.button,
              {
                backgroundColor:
                  currentMode === 'diwali'
                    ? theme.colors.primary
                    : theme.colors.background,
                borderRadius: theme.radius.md,
              },
            ]}
          >
            <Text
              style={[
                styles.buttonText,
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

      <View
        style={[
          styles.card,
          {
            backgroundColor: theme.colors.surface,
            borderRadius: theme.radius.lg,
          },
        ]}
      >
        <Text
          style={[
            styles.cardTitle,
            {
              color: theme.colors.textPrimary,
              fontSize: theme.typography.body,
            },
          ]}
        >
          Hero Banner Background
        </Text>

        <Text
          style={[
            styles.description,
            {
              color: theme.colors.textSecondary,
              fontSize: theme.typography.caption,
            },
          ]}
        >
          Change the Hero Banner configuration at runtime.
        </Text>

        <View style={styles.optionContainer}>
          <Pressable
            accessibilityRole="button"
            onPress={() => changeHeroBackground('color', '#DBEAFE')}
            style={[
              styles.optionButton,
              {
                backgroundColor: '#DBEAFE',
                borderRadius: theme.radius.md,
              },
            ]}
          >
            <Text
              style={[
                styles.optionText,
                {
                  color: theme.colors.textPrimary,
                },
              ]}
            >
              Color
            </Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            onPress={() =>
              changeHeroBackground('gradient', '#DBEAFE,#BFDBFE,#93C5FD')
            }
            style={[
              styles.optionButton,
              {
                backgroundColor: '#BFDBFE',
                borderRadius: theme.radius.md,
              },
            ]}
          >
            <Text
              style={[
                styles.optionText,
                {
                  color: theme.colors.textPrimary,
                },
              ]}
            >
              Gradient
            </Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            onPress={() =>
              changeHeroBackground(
                'image',
                'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
              )
            }
            style={[
              styles.optionButton,
              {
                backgroundColor: theme.colors.accent,
                borderRadius: theme.radius.md,
              },
            ]}
          >
            <Text
              style={[
                styles.optionText,
                {
                  color: theme.colors.textPrimary,
                },
              ]}
            >
              Image
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
    paddingHorizontal: 16,
  },
  title: {
    fontWeight: '700',
    marginBottom: 16,
  },
  card: {
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: {
    fontWeight: '700',
    marginBottom: 8,
  },
  description: {
    lineHeight: 18,
    marginBottom: 16,
  },
  switchRow: {
    flexDirection: 'row',
    gap: 6,
  },
  button: {
    minHeight: 44,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  buttonText: {
    fontWeight: '600',
  },
  optionContainer: {
    gap: 10,
  },
  optionButton: {
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  optionText: {
    fontWeight: '600',
  },
});

export default ProfileScreen;
