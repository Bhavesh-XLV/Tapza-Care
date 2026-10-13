import React from 'react';

import { StyleSheet, Text, View } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import { useConfigStore } from '../store/configStore';
import { createTheme } from '../theme/createTheme';

import SectionRenderer from '../components/home/SectionRenderer';
import { useLanguageStore } from '../store/languageStore';

function HomeScreen() {
  const insets = useSafeAreaInsets();
  const scrollY = useSharedValue(0);

  const { config, isLoading, error } = useConfigStore();
  const language = useLanguageStore(state => state.language);

  const animatedHeaderStyle = useAnimatedStyle(() => {
    const height = interpolate(
      scrollY.value,
      [0, 80],
      [70, 48],
      Extrapolation.CLAMP,
    );

    const opacity = interpolate(
      scrollY.value,
      [0, 60],
      [1, 0.7],
      Extrapolation.CLAMP,
    );

    return {
      height,
      opacity,
    };
  });

  const animatedGreetingStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [0, 80],
      [0, -10],
      Extrapolation.CLAMP,
    );

    const scale = interpolate(
      scrollY.value,
      [0, 80],
      [1, 0.9],
      Extrapolation.CLAMP,
    );

    return {
      transform: [{ translateY }, { scale }],
    };
  });

  if (isLoading) {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: '#F5F5F5',
            paddingTop: insets.top,
          },
        ]}
      >
        <View style={styles.skeletonHeader} />

        <View style={styles.skeletonSection}>
          <View style={styles.skeletonTitle} />
          <View style={styles.skeletonCard} />
        </View>

        <View style={styles.skeletonSection}>
          <View style={styles.skeletonTitle} />

          <View style={styles.skeletonRow}>
            <View style={styles.skeletonSmallCard} />
            <View style={styles.skeletonSmallCard} />
            <View style={styles.skeletonSmallCard} />
          </View>
        </View>

        <View style={styles.skeletonSection}>
          <View style={styles.skeletonTitle} />
          <View style={styles.skeletonCard} />
        </View>
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
      <Animated.View style={[styles.header, animatedHeaderStyle]}>
        <Animated.Text
          style={[
            styles.greeting,
            animatedGreetingStyle,
            {
              color: theme.colors.textPrimary,
              fontSize: theme.typography.body,
            },
          ]}
        >
          {config.theme.festival.greeting[language]}
        </Animated.Text>
      </Animated.View>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={event => {
          scrollY.value = event.nativeEvent.contentOffset.y;
        }}
        contentContainerStyle={{
          paddingBottom: insets.bottom + theme.spacing.xl,
        }}
      >
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
      </Animated.ScrollView>
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

  header: {
    justifyContent: 'center',
    overflow: 'hidden',
  },

  greeting: {
    fontWeight: '600',
  },

  skeletonHeader: {
    height: 24,
    width: '45%',
    borderRadius: 8,
    backgroundColor: '#E5E5E5',
    marginBottom: 24,
  },

  skeletonSection: {
    marginBottom: 24,
  },

  skeletonTitle: {
    height: 18,
    width: '35%',
    borderRadius: 6,
    backgroundColor: '#E5E5E5',
    marginBottom: 12,
  },

  skeletonCard: {
    height: 140,
    width: '100%',
    borderRadius: 16,
    backgroundColor: '#E5E5E5',
  },

  skeletonRow: {
    flexDirection: 'row',
    gap: 12,
  },

  skeletonSmallCard: {
    height: 90,
    flex: 1,
    borderRadius: 12,
    backgroundColor: '#E5E5E5',
  },
});

export default HomeScreen;
