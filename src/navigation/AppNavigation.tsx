import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import notifee from '@notifee/react-native';
// import {Settings} from 'react-native-fbsdk-next';
// import RNBootSplash from 'react-native-bootsplash';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {
  getFcmToken,
  linkingNotification,
  notificationListener,
  requestUserPermission,
} from '@utils/Notification';
import {navigationRef} from '@navigation/RootNavigation';

import NoFooter from '@navigation/NoFooter';
import BottomTabs from '@navigation/BottomTabs';
import LoginScreen from '@screens/Authentication/LoginScreen';
import SpanishScreen from '@screens/Authentication/SpanishScreen';
import OnboardingScreen from '@screens/Authentication/OnboardingScreen';

const Stack = createStackNavigator();

const APP_STATUS = {SPANISH: 0, ONBOARDING: 1, AUTH: 2, APP: 3};

function ApplicationStack() {
  return (
    <Stack.Navigator
      initialRouteName="BottomTabs"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="BottomTabs" component={BottomTabs} />
      <Stack.Screen name="NoFooter" component={NoFooter} />
    </Stack.Navigator>
  );
}

export const AppNavigation = () => {
  const appStatus = useSelector((state: any) => state.Config.appStatus);

  useEffect(() => {
    requestUserPermission();
    notificationListener();
    getFcmToken();
    notifee.setBadgeCount(0);
    // Settings.setAdvertiserTrackingEnabled(true);
  }, []);

  return (
    <NavigationContainer
      independent={true}
      ref={navigationRef}
      linking={linkingNotification}
      // onReady={() => RNBootSplash.hide()}
    >
      <Stack.Navigator
        initialRouteName="SpanishScreen"
        screenOptions={{headerShown: false}}>
        {appStatus === APP_STATUS.SPANISH && (
          <Stack.Screen name="SpanishScreen" component={SpanishScreen} />
        )}
        {appStatus === APP_STATUS.ONBOARDING && (
          <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
        )}
        {appStatus === APP_STATUS.AUTH && (
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
        )}
        {appStatus === APP_STATUS.APP && (
          <Stack.Screen name="ApplicationStack" component={ApplicationStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
