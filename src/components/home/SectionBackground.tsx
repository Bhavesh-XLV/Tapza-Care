import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';

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
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors[0],
            borderRadius: theme.radius.lg,
          },
        ]}
      >
        <View
          style={[
            styles.gradientMiddle,
            {
              backgroundColor: colors[1] ?? colors[0],
            },
          ]}
        >
          <View
            style={[
              styles.gradientBottom,
              {
                backgroundColor: colors[2] ?? colors[1] ?? colors[0],
              },
            ]}
          >
            {children}
          </View>
        </View>
      </View>
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

  gradientMiddle: {
    flex: 1,
  },

  gradientBottom: {
    flex: 1,
  },
});

export default SectionBackground;
