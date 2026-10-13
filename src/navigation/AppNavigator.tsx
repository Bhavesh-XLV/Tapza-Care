import React, { useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { ActivityIndicator, View } from 'react-native';

import { useConfigStore } from '../store/configStore';

import HomeScreen from '../screens/HomeScreen';
import DoctorSelectionScreen from '../screens/DoctorSelectionScreen';
import DateSelectionScreen from '../screens/DateSelectionScreen';

export type RootStackParamList = {
  Main: undefined;
  DoctorSelection: undefined;
  DateSelection: {
    doctorId: string;
  };
};

export type MainTabParamList = {
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Tab = createBottomTabNavigator<MainTabParamList>();

function MainTabs() {
  const config = useConfigStore(state => state.config);

  if (!config) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }

  const homeTab = config.tabs.find(tab => tab.screen === 'home');

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
          }}
        />
      ) : null}
    </Tab.Navigator>
  );
}

function AppNavigator() {
  const loadConfig = useConfigStore(state => state.loadConfig);

  const config = useConfigStore(state => state.config);

  useEffect(() => {
    loadConfig();
  }, [loadConfig]);

  if (!config) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ActivityIndicator />
      </View>
    );
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
