import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { LayoutSection } from '../../types/config';
import { AppTheme } from '../../theme/createTheme';

interface OfferItem {
  id: string;
  title: string;
  subtitle: string;
}

interface OfferStripProps {
  section: LayoutSection;
  theme: AppTheme;
}

function OfferStrip({ section, theme }: OfferStripProps) {
  const items = section.items as OfferItem[];

  return (
    <View>
      <Text
        style={[
          styles.title,
          {
            color: theme.colors.textPrimary,
            fontSize: theme.typography.heading,
            marginBottom: theme.spacing.sm,
          },
        ]}
      >
        {section.title}
      </Text>

      {items.map(item => (
        <View
          key={item.id}
          style={[
            styles.offer,
            {
              backgroundColor: theme.colors.primary,
              borderRadius: theme.radius.lg,
              padding: theme.spacing.md,
              marginBottom: theme.spacing.sm,
            },
          ]}
        >
          <Text
            style={[
              styles.offerTitle,
              {
                color: theme.colors.surface,
                fontSize: theme.typography.body,
              },
            ]}
          >
            {item.title}
          </Text>

          <Text
            style={[
              styles.subtitle,
              {
                color: theme.colors.surface,
                fontSize: theme.typography.caption,
                marginTop: theme.spacing.xs,
              },
            ]}
          >
            {item.subtitle}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: '700',
  },

  offer: {
    minHeight: 80,
    justifyContent: 'center',
  },

  offerTitle: {
    fontWeight: '700',
  },

  subtitle: {
    opacity: 0.9,
  },
});

export default OfferStrip;
