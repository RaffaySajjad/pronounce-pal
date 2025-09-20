import React from 'react';
import { View, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BlurView } from '@react-native-community/blur';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import HapticFeedback from 'react-native-haptic-feedback';
import { RootStackParamList, TabParamList } from '../../types';
import { Caption1 } from '../../components/ui/Typography';
import { Icon, IconName } from '../../components/ui/Icon';
import { palette, spacing, radius, elevation } from '../../theme/colors';
import { gradients } from '../../lib/gradients';

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

// Premium Custom Tab Bar Component
interface CustomTabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

const CustomTabBar: React.FC<CustomTabBarProps> = ({ state, descriptors, navigation }) => {
  const tabData = [
    { name: 'HomeTab', icon: 'home' as IconName, label: 'Home' },
    { name: 'ScenariosTab', icon: 'users' as IconName, label: 'Scenarios' },
    { name: 'DrillsTab', icon: 'target' as IconName, label: 'Drills' },
    { name: 'ProfileTab', icon: 'user' as IconName, label: 'Profile' },
  ];

  return (
    <View style={styles.tabBarContainer}>
      {/* Blur Background */}
      <BlurView
        style={styles.tabBarBlur}
        blurType="light"
        blurAmount={20}
        reducedTransparencyFallbackColor={palette.cardLight}
      />

      {/* Gradient Overlay */}
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.95)']}
        style={styles.tabBarGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <View style={styles.tabBarContent}>
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;
          const tabInfo = tabData.find(tab => tab.name === route.name);

          if (!tabInfo) return null;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              HapticFeedback.trigger('impactLight');
              navigation.navigate(route.name);
            }
          };

          return (
            <TabBarItem
              key={route.name}
              icon={tabInfo.icon}
              label={tabInfo.label}
              isFocused={isFocused}
              onPress={onPress}
            />
          );
        })}
      </View>
    </View>
  );
};

// Individual Tab Bar Item with Premium Animation
interface TabBarItemProps {
  icon: IconName;
  label: string;
  isFocused: boolean;
  onPress: () => void;
}

const TabBarItem: React.FC<TabBarItemProps> = ({ icon, label, isFocused, onPress }) => {
  const scale = useSharedValue(1);
  const translateY = useSharedValue(0);

  React.useEffect(() => {
    scale.value = withSpring(isFocused ? 1.1 : 1, { damping: 20, stiffness: 300 });
    translateY.value = withSpring(isFocused ? -2 : 0, { damping: 20, stiffness: 300 });
  }, [isFocused]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateY: translateY.value }
    ],
  }));

  return (
    <TouchableOpacity
      style={styles.tabBarItem}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Animated.View style={[styles.tabBarItemContent, animatedStyle]}>
        {/* Active Background */}
        {isFocused && (
          <View style={styles.activeBackground}>
            <LinearGradient
              colors={gradients.primary}
              style={styles.activeGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            />
          </View>
        )}

        <Icon
          name={icon}
          size="md"
          color={isFocused ? palette.textOnPrimary : palette.textMuted}
        />
        <Caption1
          color={isFocused ? palette.textOnPrimary : palette.textMuted}
          weight={isFocused ? 'semibold' : 'regular'}
          style={styles.tabBarLabel}
        >
          {label}
        </Caption1>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // Tab Bar Container
  tabBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
  tabBarBlur: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  tabBarGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  tabBarContent: {
    flexDirection: 'row',
    paddingTop: spacing[3],
    paddingBottom: Platform.OS === 'ios' ? spacing[8] : spacing[4],
    paddingHorizontal: spacing[4],
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.05)',
    ...elevation.lg,
    shadowColor: palette.shadow,
  },

  // Tab Bar Items
  tabBarItem: {
    flex: 1,
    alignItems: 'center',
  },
  tabBarItemContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[3],
    borderRadius: radius.xl,
    minHeight: 48,
    position: 'relative',
  },
  activeBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: radius.xl,
    ...elevation.sm,
    shadowColor: palette.primary,
  },
  activeGradient: {
    flex: 1,
    borderRadius: radius.xl,
  },
  tabBarLabel: {
    marginTop: spacing[1],
    fontSize: 11,
  },
});

// Premium Tab Navigator with Custom Tab Bar
const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={(props: any) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={Home}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="ScenariosTab"
        component={ScenarioPicker}
        options={{
          tabBarLabel: 'Scenarios',
        }}
      />
      <Tab.Screen
        name="DrillsTab"
        component={Drill}
        options={{
          tabBarLabel: 'Drills',
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};

// Premium Stack Navigator with Smooth Transitions
const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Onboarding"
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          transitionSpec: {
            open: {
              animation: 'spring',
              config: {
                stiffness: 300,
                damping: 30,
                mass: 0.8,
              },
            },
            close: {
              animation: 'spring',
              config: {
                stiffness: 300,
                damping: 30,
                mass: 0.8,
              },
            },
          },
        }}
      >
        {/* Onboarding Flow */}
        <Stack.Screen
          name="Onboarding"
          component={OnboardingWelcome}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
          }}
        />

        {/* Main App */}
        <Stack.Screen
          name="Main"
          component={TabNavigator}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
          }}
        />

        {/* Modal Screens */}
        <Stack.Screen
          name="Session"
          component={Session}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
            gestureDirection: 'vertical',
          }}
        />

        <Stack.Screen
          name="Paywall"
          component={Paywall}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
            gestureDirection: 'vertical',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;