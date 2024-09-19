import React, {useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';
import notifee from '@notifee/react-native';
import {Settings} from 'react-native-fbsdk-next';
import RNBootSplash from 'react-native-bootsplash';
import mobileAds from 'react-native-google-mobile-ads';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  getFcmToken,
  linkingNotification,
  notificationListener,
  requestUserPermission,
} from '@utils/Notification';
import {
  navigationRef,
  updateTimestampLastScreenOpening,
} from '@navigation/RootNavigation';

import BottomTabs from '@navigation/BottomTabs';
import LoginScreen from '@screens/Authentication/LoginScreen';
import SpanishScreen from '@screens/Authentication/SpanishScreen';
import OnboardingScreen from '@screens/Authentication/OnboardingScreen';

//Home
import QrCodeScreen from '@screens/Application/Home/QrCodeScreen';
import PolicyScreen from '@screens/Application//User/PolicyScreen';
import AddExpenseScreen from '@screens/Application/Home/AddExpenseScreen';
import CreateNoteScreen from '@screens/Application/Home/CreateNoteScreen';
import DetailNoteScreen from '@screens/Application/Home/DetailNoteScreen';

//User
import WalletScreen from '@screens/Application/User/WalletScreen';
import SettingScreen from '@screens/Application/User/SettingScreen';
import ChatGPTScreen from '@screens/Application/User/ChatGPTScreen';
import FeedbackScreen from '@screens/Application/User/FeedbackScreen';
import UtilitiesScreen from '@screens/Application/User/UtilitiesScreen';
import ChangeLanguageScreen from '@screens/Application/User/ChangeLanguageScreen';

//Utilities
import SnakeScreen from '@screens/Application/Utilities/SnakeScreen';
import PingPongScreen from '@screens/Application/Utilities/PingPongScreen';
import RollDiceScreen from '@screens/Application/Utilities/RollDiceScreen';
import CoinFlipScreen from '@screens/Application/Utilities/CoinFlipScreen';
import TicTacToeScreen from '@screens/Application/Utilities/TicTacToeScreen';
import CalculatorScreen from '@screens/Application/Utilities/CalculatorScreen';
import MinesweeperScreen from '@screens/Application/Utilities/MinesweeperScreen';
import RandomNumberScreen from '@screens/Application/Utilities/RandomNumberScreen';
import TimerCountdownScreen from '@screens/Application/Utilities/TimerCountdownScreen';

const Stack = createStackNavigator();
const NativeStack = createNativeStackNavigator();

const APP_STATUS = {SPANISH: 0, ONBOARDING: 1, AUTH: 2, APP: 3};

const screens = [
  //Home
  QrCodeScreen,
  CreateNoteScreen,
  DetailNoteScreen,
  AddExpenseScreen,
  //User
  WalletScreen,
  SettingScreen,
  ChatGPTScreen,
  FeedbackScreen,
  UtilitiesScreen,
  ChangeLanguageScreen,
  //Utilities
  SnakeScreen,
  PolicyScreen,
  PingPongScreen,
  RollDiceScreen,
  CoinFlipScreen,
  TicTacToeScreen,
  CalculatorScreen,
  MinesweeperScreen,
  RandomNumberScreen,
  TimerCountdownScreen,
];

function ApplicationStack() {
  return (
    <Stack.Navigator
      initialRouteName="BottomTabs"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="BottomTabs" component={BottomTabs} />
      {screens.map((ScreenComponent, index) => (
        <Stack.Screen
          options={{gestureEnabled: true}}
          key={ScreenComponent.name}
          name={ScreenComponent.name}
          component={ScreenComponent}
        />
      ))}
    </Stack.Navigator>
  );
}

export const AppNavigation = () => {
  const routeNameRef = useRef('');
  const appStatus = useSelector((state: any) => state.Config.appStatus);

  useEffect(() => {
    requestUserPermission();
    notificationListener();
    getFcmToken();
    notifee.setBadgeCount(0);
    Settings.setAdvertiserTrackingEnabled(true);
    mobileAds()
      .initialize()
      .then(adapterStatuses => {});
  }, []);

  return (
    <NavigationContainer
      independent={true}
      ref={navigationRef}
      linking={linkingNotification}
      onReady={() => RNBootSplash.hide()}
      onStateChange={async () => {
        updateTimestampLastScreenOpening();
        const previousRouteName = routeNameRef.current;
        const currentRouteName =
          navigationRef.current?.getCurrentRoute()?.name || '';
        if (previousRouteName !== currentRouteName) {
        }
        routeNameRef.current = currentRouteName;
      }}>
      <NativeStack.Navigator
        screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
        {appStatus === APP_STATUS.AUTH && (
          <NativeStack.Screen name="LoginScreen" component={LoginScreen} />
        )}
        {appStatus === APP_STATUS.SPANISH && (
          <NativeStack.Screen name="SpanishScreen" component={SpanishScreen} />
        )}
        {appStatus === APP_STATUS.APP && (
          <NativeStack.Screen
            name="ApplicationStack"
            component={ApplicationStack}
          />
        )}
        {appStatus === APP_STATUS.ONBOARDING && (
          <NativeStack.Screen
            name="OnboardingScreen"
            component={OnboardingScreen}
          />
        )}
      </NativeStack.Navigator>
    </NavigationContainer>
  );
};
