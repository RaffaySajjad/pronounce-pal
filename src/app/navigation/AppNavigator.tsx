import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RootStackParamList, TabParamList } from '../../types';

// Screen imports
import OnboardingWelcome from '../screens/OnboardingWelcome';
import Home from '../screens/Home';
import ScenarioPicker from '../screens/ScenarioPicker';
import Session from '../screens/Session';
import Drill from '../screens/Drill';
import Paywall from '../screens/Paywall';
import Profile from '../screens/Profile';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E5E7EB',
          paddingBottom: 8,
          paddingTop: 8,
          height: 88,
        },
        tabBarActiveTintColor: '#4F46E5',
        tabBarInactiveTintColor: '#9CA3AF',
      }}
    >
      <Tab.Screen name="HomeTab" component={Home} />
      <Tab.Screen name="ScenariosTab" component={ScenarioPicker} />
      <Tab.Screen name="DrillsTab" component={Drill} />
      <Tab.Screen name="ProfileTab" component={Profile} />
    </Tab.Navigator>
  );
};

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Onboarding"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Onboarding" component={OnboardingWelcome} />
        <Stack.Screen name="Main" component={TabNavigator} />
        <Stack.Screen name="Session" component={Session} />
        <Stack.Screen name="Paywall" component={Paywall} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
