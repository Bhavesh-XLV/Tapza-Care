import React, { useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useConfigStore } from '../store/configStore';

import HomeScreen from '../screens/HomeScreen';
import DoctorSelectionScreen from '../screens/DoctorSelectionScreen';
import DateSelectionScreen from '../screens/DateSelectionScreen';
import BookingConfirmationScreen from '../screens/BookingConfirmationScreen';
import BookingSuccessScreen from '../screens/BookingSuccessScreen';
import PrescriptionsScreen from '../screens/PrescriptionsScreen';
import PrescriptionDetailScreen from '../screens/PrescriptionDetailScreen';

import { Slot } from '../types/booking';
import BookingsScreen from '../screens/BookingsScreen';
import ProfileScreen from '../screens/ProfileScreen';

export type RootStackParamList = {
  Main: undefined;
  DoctorSelection: undefined;
  DateSelection: {
    doctorId: string;
  };
  BookingConfirmation: {
    doctorId: string;
    slot: Slot;
  };
  BookingSuccess: undefined;
  PrescriptionDetail: {
    prescriptionId: string;
  };
};

export type MainTabParamList = {
  Home: undefined;
  Bookings: undefined;
  Prescriptions: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Tab = createBottomTabNavigator<MainTabParamList>();

function MainTabs() {
  const config = useConfigStore(state => state.config);

  if (!config) {
    return null;
  }

  const homeTab = config.tabs.find(tab => tab.screen === 'home');

  const bookingsTab = config.tabs.find(tab => tab.screen === 'bookings');

  const prescriptionsTab = config.tabs.find(
    tab => tab.screen === 'prescriptions',
  );

  const profileTab = config.tabs.find(tab => tab.screen === 'profile');

  function getTabIcon(icon: string): string {
    switch (icon) {
      case 'home':
        return '⌂';

      case 'calendar':
        return '▣';

      case 'file':
        return '▤';

      case 'user':
        return '●';

      default:
        return '•';
    }
  }

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {homeTab ? (
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: homeTab.label,
            tabBarIcon: () => (
              <Text style={{ fontSize: 22 }}>{getTabIcon(homeTab.icon)}</Text>
            ),
          }}
        />
      ) : null}
      {bookingsTab ? (
        <Tab.Screen
          name="Bookings"
          component={BookingsScreen}
          options={{
            tabBarLabel: bookingsTab.label,

            tabBarIcon: () => (
              <Text style={{ fontSize: 22 }}>
                {getTabIcon(bookingsTab.icon)}
              </Text>
            ),
          }}
        />
      ) : null}
      {prescriptionsTab ? (
        <Tab.Screen
          name="Prescriptions"
          component={PrescriptionsScreen}
          options={{
            tabBarLabel: prescriptionsTab.label,

            tabBarIcon: () => (
              <Text style={{ fontSize: 22 }}>
                {getTabIcon(prescriptionsTab.icon)}
              </Text>
            ),
          }}
        />
      ) : null}
      {profileTab ? (
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: profileTab.label,

            tabBarIcon: () => (
              <Text style={{ fontSize: 22 }}>
                {getTabIcon(profileTab.icon)}
              </Text>
            ),
          }}
        />
      ) : null}
    </Tab.Navigator>
  );
}

function ConfigSkeleton() {
  return (
    <View style={styles.container}>
      <View style={styles.headerSkeleton} />

      <View style={styles.section}>
        <View style={styles.titleSkeleton} />
        <View style={styles.cardSkeleton} />
      </View>

      <View style={styles.section}>
        <View style={styles.titleSkeleton} />

        <View style={styles.row}>
          <View style={styles.smallCardSkeleton} />
          <View style={styles.smallCardSkeleton} />
          <View style={styles.smallCardSkeleton} />
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.titleSkeleton} />
        <View style={styles.cardSkeleton} />
      </View>
    </View>
  );
}

function ConfigError({
  message,
  onRetry,
  isLoading,
}: {
  message: string;
  onRetry: () => void;
  isLoading: boolean;
}) {
  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorTitle}>Unable to load Tapza Care</Text>

      <Text style={styles.errorMessage}>{message}</Text>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Retry loading configuration"
        disabled={isLoading}
        onPress={onRetry}
        style={styles.retryButton}
      >
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <Text style={styles.retryText}>Retry</Text>
        )}
      </Pressable>
    </View>
  );
}

function AppNavigator() {
  const loadConfig = useConfigStore(state => state.loadConfig);
  const config = useConfigStore(state => state.config);
  const isLoading = useConfigStore(state => state.isLoading);
  const error = useConfigStore(state => state.error);

  useEffect(() => {
    loadConfig();
  }, [loadConfig]);

  if (!config && isLoading) {
    return <ConfigSkeleton />;
  }

  if (!config && error) {
    return (
      <ConfigError message={error} onRetry={loadConfig} isLoading={isLoading} />
    );
  }

  if (!config) {
    return <ConfigSkeleton />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Main" component={MainTabs} />

        <Stack.Screen
          name="DoctorSelection"
          component={DoctorSelectionScreen}
        />

        <Stack.Screen name="DateSelection" component={DateSelectionScreen} />

        <Stack.Screen
          name="BookingConfirmation"
          component={BookingConfirmationScreen}
        />

        <Stack.Screen name="BookingSuccess" component={BookingSuccessScreen} />

        <Stack.Screen
          name="PrescriptionDetail"
          component={PrescriptionDetailScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },

  headerSkeleton: {
    height: 28,
    width: '45%',
    borderRadius: 8,
    backgroundColor: '#E5E5E5',
    marginBottom: 28,
  },

  section: {
    marginBottom: 28,
  },

  titleSkeleton: {
    height: 18,
    width: '35%',
    borderRadius: 6,
    backgroundColor: '#E5E5E5',
    marginBottom: 12,
  },

  cardSkeleton: {
    height: 140,
    width: '100%',
    borderRadius: 16,
    backgroundColor: '#E5E5E5',
  },

  row: {
    flexDirection: 'row',
    gap: 12,
  },

  smallCardSkeleton: {
    flex: 1,
    height: 90,
    borderRadius: 12,
    backgroundColor: '#E5E5E5',
  },

  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },

  errorTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },

  errorMessage: {
    textAlign: 'center',
    marginBottom: 20,
  },

  retryButton: {
    minWidth: 120,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: '#000000',
    paddingHorizontal: 24,
  },

  retryText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default AppNavigator;
