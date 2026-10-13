import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import {
  LayoutSection,
  LocalizedText,
  SupportedLanguage,
} from '../../types/config';
import { AppTheme } from '../../theme/createTheme';

interface CategoryItem {
  id: string;
  label: LocalizedText;
}

interface CategoryChipsProps {
  section: LayoutSection;
  theme: AppTheme;
  language: SupportedLanguage;
}

function CategoryChips({ section, theme, language }: CategoryChipsProps) {
  const items = section.items as CategoryItem[];

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
        {section.title[language]}
      </Text>

      <FlatList
        data={items}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        contentContainerStyle={{
          gap: theme.spacing.sm,
        }}
        renderItem={({ item }) => (
          <View
            style={[
              styles.chip,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.secondary,
                borderRadius: theme.radius.pill,
                paddingHorizontal: theme.spacing.md,
                paddingVertical: theme.spacing.sm,
              },
            ]}
          >
            <Text
              style={{
                color: theme.colors.textPrimary,
                fontSize: theme.typography.body,
              }}
            >
              {item.label[language]}
            </Text>
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

  chip: {
    borderWidth: 1,
  },
});

export default CategoryChips;
