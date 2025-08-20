import 'react-native-gesture-handler';
import React, { useState } from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  Theme,
  NavigationState,
} from '@react-navigation/native';
import {
  createStackNavigator,
  StackCardStyleInterpolator,
  TransitionSpecs,
} from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Animated, Easing } from 'react-native';

// Screens
import IntroPage from './src/screens/Intro';
import LoginScreen from './src/screens/Login';
import SignUpScreen from './src/screens/SignUp';
import IntroOnboarding from './src/screens/IntroOnboarding';
import Onboarding_FitnessGoal from './src/screens/onboarding/Onboarding_FitnessGoal';
import Onboarding_TypeofTraining from './src/screens/onboarding/Onboarding_TypeofTraining';
import Onboarding_Schedule from './src/screens/onboarding/Onboarding_Schedule';
import Onboarding_Equipment from './src/screens/onboarding/Onboarding_Equipment';
import Onboarding_FitnessLevel from './src/screens/onboarding/Onboarding_FitnessLevel';
import Onboarding_PersonalData from './src/screens/onboarding/Onboarding_PersonalData';
import SettingsScreen from './src/screens/Settings';
import DevScreen from './src/screens/DevScreen';

// Components
import NavigationProgress from './src/components/navigationprogress';
import ArrowLeft from './src/icons/arrowleft';

// Variables
import Colors from './src/variables/colors';

// ✅ Tipi delle screen
type RootStackParamList = {
  DevScreen: undefined;
  Intro: undefined;
  Login: undefined;
  SignUp: undefined;
  IntroOnboarding: undefined;
  Onboarding_FitnessGoal: undefined;
  Onboarding_TypeofTraining: undefined;
  Onboarding_Schedule: undefined;
  Onboarding_Equipment: undefined;
  Onboarding_FitnessLevel: undefined;
  Onboarding_PersonalData: undefined;
  Settings: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

// Array delle schermate onboarding
const onboardingScreens: (keyof RootStackParamList)[] = [
  'Onboarding_FitnessGoal',
  'Onboarding_TypeofTraining',
  'Onboarding_Schedule',
  'Onboarding_Equipment',
  'Onboarding_FitnessLevel',
  'Onboarding_PersonalData',
];

// Animazioni custom
const simpleSlideAndFade: StackCardStyleInterpolator = ({
  current,
  layouts,
}) => ({
  cardStyle: {
    opacity: Animated.multiply(current.progress, current.progress),
    transform: [
      {
        translateX: current.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [layouts.screen.width / 2, 0],
        }),
      },
    ],
  },
});

const simpleFade: StackCardStyleInterpolator = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

// Transizioni: uso TransitionSpecs + config custom
const customTransitionSpec = {
  animation: 'timing' as const,
  config: {
    duration: 150,
    easing: Easing.inOut(Easing.ease),
  },
};

const MyTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.white,
  },
};

export default function App(): React.JSX.Element {
  const [currentRoute, setCurrentRoute] =
    useState<keyof RootStackParamList>('Intro');

  const calculateProgress = (route: keyof RootStackParamList): number => {
    switch (route) {
      case 'Onboarding_FitnessGoal':
        return 0.1;
      case 'Onboarding_TypeofTraining':
        return 0.25;
      case 'Onboarding_Schedule':
        return 0.4;
      case 'Onboarding_Equipment':
        return 0.55;
      case 'Onboarding_FitnessLevel':
        return 0.7;
      case 'Onboarding_PersonalData':
        return 0.85;
      default:
        return 0;
    }
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer
        onStateChange={(state?: NavigationState) => {
          if (!state) return;
          const routeName = state.routes[state.index]
            ?.name as keyof RootStackParamList;
          setCurrentRoute(routeName);
        }}
        theme={MyTheme}
      >
        {onboardingScreens.includes(currentRoute) && (
          <NavigationProgress
            leftContent={<ArrowLeft style={{}} />}
            centerContent={null} // Aggiunto
            rightContent={null}
            progress={calculateProgress(currentRoute)}
            onLeftClick={() => {
              /* ... */
            }}
            onRightClick={() => {
              /* ... */
            }}
          />
        )}
        <Stack.Navigator
          initialRouteName="Settings"
          screenOptions={{
            gestureEnabled: true,
            cardStyleInterpolator: simpleFade,
            transitionSpec: {
              open: customTransitionSpec,
              close: customTransitionSpec,
            },
          }}
        >
          <Stack.Screen
            name="DevScreen"
            component={DevScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Intro"
            component={IntroPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="IntroOnboarding"
            component={IntroOnboarding}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Onboarding_FitnessGoal"
            component={Onboarding_FitnessGoal}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Onboarding_TypeofTraining"
            component={Onboarding_TypeofTraining}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Onboarding_Schedule"
            component={Onboarding_Schedule}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Onboarding_Equipment"
            component={Onboarding_Equipment}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Onboarding_FitnessLevel"
            component={Onboarding_FitnessLevel}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Onboarding_PersonalData"
            component={Onboarding_PersonalData}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
