import React from 'react';

import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useConfigStore } from '../store/configStore';
import { createTheme } from '../theme/createTheme';

import SectionRenderer from '../components/home/SectionRenderer';

function HomeScreen() {
  const insets = useSafeAreaInsets();

  const { config, isLoading, error } = useConfigStore();

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
      </View>
    );
  }

  if (error || !config) {
    return (
      <View style={styles.center}>
        <Text>{error ?? 'Something went wrong'}</Text>
      </View>
    );
  }

  const theme = createTheme(config.theme);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background,
          paddingTop: insets.top,
        },
      ]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: insets.bottom + theme.spacing.xl,
        }}
      >
        <Text
          style={[
            styles.greeting,
            {
              color: theme.colors.textPrimary,
              fontSize: theme.typography.body,
            },
          ]}
        >
          {config.theme.festival.greeting}
        </Text>

        {config.sections.map(section => (
          <View
            key={section.id}
            style={{
              marginTop: theme.spacing.md,
            }}
          >
            <SectionRenderer section={section} theme={theme} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },

  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  greeting: {
    fontWeight: '600',
  },
});

export default HomeScreen;
