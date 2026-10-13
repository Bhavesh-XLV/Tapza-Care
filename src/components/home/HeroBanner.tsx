import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { LayoutSection } from '../../types/config';
import { AppTheme } from '../../theme/createTheme';

import SectionBackground from './SectionBackground';

interface HeroBannerProps {
  section: LayoutSection;
  theme: AppTheme;
}

function HeroBanner({ section, theme }: HeroBannerProps) {
  return (
    <SectionBackground background={section.background} theme={theme}>
      <View
        style={[
          styles.container,
          {
            padding: theme.spacing.lg,
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
          {section.title}
        </Text>

        <Text
          style={[
            styles.subtitle,
            {
              color: theme.colors.textSecondary,
              fontSize: theme.typography.body,
              marginTop: theme.spacing.sm,
            },
          ]}
        >
          Book consultations, manage prescriptions and stay on top of your
          health.
        </Text>
      </View>
    </SectionBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 180,
    justifyContent: 'center',
  },

  title: {
    fontWeight: '700',
  },

  subtitle: {
    lineHeight: 24,
  },
});

export default HeroBanner;
