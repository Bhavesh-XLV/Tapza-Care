import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { SectionBackground as SectionBackgroundConfig } from '../../types/config';
import { AppTheme } from '../../theme/createTheme';

interface SectionBackgroundProps {
  background: SectionBackgroundConfig;
  theme: AppTheme;
  children: React.ReactNode;
}

function SectionBackground({
  background,
  theme,
  children,
}: SectionBackgroundProps) {
  if (background.kind === 'image') {
    return (
      <ImageBackground
        source={{ uri: background.value }}
        style={[
          styles.container,
          {
            borderRadius: theme.radius.lg,
          },
        ]}
        imageStyle={{
          borderRadius: theme.radius.lg,
        }}
      >
        {children}
      </ImageBackground>
    );
  }

  if (background.kind === 'gradient') {
    const colors = background.value.split(',').map(color => color.trim());

    return (
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.container,
          {
            borderRadius: theme.radius.lg,
          },
        ]}
      >
        {children}
      </LinearGradient>
    );
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: background.value,
          borderRadius: theme.radius.lg,
        },
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
});

export default SectionBackground;
