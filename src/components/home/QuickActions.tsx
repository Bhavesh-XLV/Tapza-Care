import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '../../navigation/AppNavigator';
import {
  LayoutSection,
  LocalizedText,
  SupportedLanguage,
} from '../../types/config';
import { AppTheme } from '../../theme/createTheme';

interface QuickActionItem {
  id: string;
  label: LocalizedText;
  icon: string;
}

interface QuickActionsProps {
  section: LayoutSection;
  theme: AppTheme;
  language: SupportedLanguage;
}

function QuickActions({ section, theme, language }: QuickActionsProps) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const items = section.items as QuickActionItem[];

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
        numColumns={4}
        scrollEnabled={false}
        keyExtractor={item => item.id}
        columnWrapperStyle={{
          gap: theme.spacing.sm,
        }}
        contentContainerStyle={{
          gap: theme.spacing.sm,
        }}
        renderItem={({ item }) => {
          const label = item.label[language];

          return (
            <TouchableOpacity
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel={label}
              onPress={() => {
                if (item.id === 'book') {
                  navigation.navigate('DoctorSelection');
                }
              }}
              style={[
                styles.action,
                {
                  backgroundColor: theme.colors.surface,
                  borderRadius: theme.radius.md,
                  padding: theme.spacing.sm,
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
                  style={[
                    styles.icon,
                    {
                      fontSize: theme.typography.heading,
                    },
                  ]}
                >
                  {item.icon}
                </Text>
              </View>

              <Text
                numberOfLines={2}
                style={[
                  styles.label,
                  {
                    color: theme.colors.textPrimary,
                    fontSize: theme.typography.caption,
                    marginTop: theme.spacing.xs,
                  },
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: '700',
  },

  action: {
    flex: 1,
    minHeight: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconContainer: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    textAlign: 'center',
  },

  label: {
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default QuickActions;
