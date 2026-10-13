import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';

import {
  LayoutSection,
  LocalizedText,
  SupportedLanguage,
} from '../../types/config';
import { AppTheme } from '../../theme/createTheme';

interface DoctorItem {
  id: string;
  name: LocalizedText;
  specialty: LocalizedText;
  photoUrl: string;
  feeInr: number;
}

interface DoctorCarouselProps {
  section: LayoutSection;
  theme: AppTheme;
  language: SupportedLanguage;
}

function DoctorCarousel({ section, theme, language }: DoctorCarouselProps) {
  const items = section.items as DoctorItem[];

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
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        contentContainerStyle={{
          gap: theme.spacing.sm,
        }}
        renderItem={({ item }) => (
          <View
            style={[
              styles.card,
              {
                backgroundColor: theme.colors.surface,
                borderRadius: theme.radius.lg,
                padding: theme.spacing.md,
              },
            ]}
          >
            <Image
              source={{ uri: item.photoUrl }}
              style={[
                styles.photo,
                {
                  borderRadius: theme.radius.lg,
                },
              ]}
              accessibilityRole="image"
              accessibilityLabel={item.name[language]}
            />

            <Text
              numberOfLines={1}
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

            <Text
              numberOfLines={1}
              style={[
                styles.specialty,
                {
                  color: theme.colors.textSecondary,
                  fontSize: theme.typography.caption,
                  marginTop: theme.spacing.xs,
                },
              ]}
            >
              {item.specialty[language]}
            </Text>

            <Text
              style={[
                styles.fee,
                {
                  color: theme.colors.accent,
                  fontSize: theme.typography.caption,
                  marginTop: theme.spacing.xs,
                },
              ]}
            >
              ₹{item.feeInr}
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

  card: {
    width: 180,
  },

  photo: {
    width: '100%',
    height: 150,
  },

  name: {
    fontWeight: '600',
  },

  specialty: {
    lineHeight: 18,
  },

  fee: {
    fontWeight: '600',
  },
});

export default DoctorCarousel;
