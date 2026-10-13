import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { SupportedLanguage, LayoutSection } from '../../types/config';
import { AppTheme } from '../../theme/createTheme';

import SectionBackground from './SectionBackground';

interface HeroBannerProps {
  section: LayoutSection;
  theme: AppTheme;
  language: SupportedLanguage;
}

function HeroBanner({ section, theme, language }: HeroBannerProps) {
  const subtitle =
    language === 'te'
      ? 'సంప్రదింపులను బుక్ చేసుకోండి, ప్రిస్క్రిప్షన్‌లను నిర్వహించండి మరియు మీ ఆరోగ్యాన్ని మెరుగ్గా చూసుకోండి.'
      : 'Book consultations, manage prescriptions and stay on top of your health.';

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
          {section.title[language]}
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
          {subtitle}
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
