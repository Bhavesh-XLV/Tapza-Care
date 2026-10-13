import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import {
  LayoutSection,
  LocalizedText,
  SupportedLanguage,
} from '../../types/config';
import { AppTheme } from '../../theme/createTheme';

interface ServiceItem {
  id: string;
  name: LocalizedText;
  icon: string;
  subtitle?: LocalizedText;
}

interface ServiceGridProps {
  section: LayoutSection;
  theme: AppTheme;
  language: SupportedLanguage;
}

function ServiceGrid({ section, theme, language }: ServiceGridProps) {
  const items = section.items as ServiceItem[];

  return (
    <View>
      <Text
        style={[
          styles.title,
          {
            color: theme.colors.textPrimary,
            fontSize: theme.typography.heading,
            marginBottom: theme.spacing.md,
          },
        ]}
      >
        {section.title[language]}
      </Text>

      <FlatList
        data={items}
        numColumns={2}
        scrollEnabled={false}
        keyExtractor={item => item.id}
        columnWrapperStyle={{
          gap: theme.spacing.sm,
        }}
        contentContainerStyle={{
          gap: theme.spacing.sm,
        }}
        renderItem={({ item }) => (
          <View
            style={[
              styles.card,
              {
                backgroundColor: theme.colors.surface,
                borderRadius: theme.radius.md,
                padding: theme.spacing.md,
              },
            ]}
          >
            <View
              style={[
                styles.iconContainer,
                {
                  backgroundColor: theme.colors.secondary,
                  borderRadius: theme.radius.md,
                },
              ]}
            >
              <Text
                style={{
                  fontSize: theme.typography.heading,
                }}
              >
                {item.icon}
              </Text>
            </View>

            <Text
              style={[
                styles.name,
                {
                  color: theme.colors.textPrimary,
                  fontSize: theme.typography.body,
                  marginTop: theme.spacing.sm,
                },
              ]}
            >
              {item.name[language]}
            </Text>

            {item.subtitle ? (
              <Text
                style={[
                  styles.subtitle,
                  {
                    color: theme.colors.textSecondary,
                    fontSize: theme.typography.caption,
                    marginTop: theme.spacing.xs,
                  },
                ]}
              >
                {item.subtitle[language]}
              </Text>
            ) : null}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: '700',
  },

  card: {
    flex: 1,
    minHeight: 130,
  },

  iconContainer: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },

  name: {
    fontWeight: '600',
  },

  subtitle: {
    lineHeight: 18,
  },
});

export default ServiceGrid;
