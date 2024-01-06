import React from 'react';
import {TransitionPresets} from '@react-navigation/stack';
import {createStackNavigator} from '@react-navigation/stack';

//Home
import NoteScreen from '@screens/Application/Home/NoteScreen';
import QrCodeScreen from '@screens/Application/Home/QrCodeScreen';
import DetailNoteScreen from '@screens/Application/Home/DetailNoteScreen';

//User
import SettingScreen from '@screens/Application/User/SettingScreen';
import ChatGPTScreen from '@screens/Application/User/ChatGPTScreen';
import FeedbackScreen from '@screens/Application/User/FeedbackScreen';
import UtilitiesScreen from '@screens/Application/User/UtilitiesScreen';
import ChangeLanguageScreen from '@screens/Application/User/ChangeLanguageScreen';
import TimerCountdownScreen from '@screens/Application/User/TimerCountdownScreen';

const Stack = createStackNavigator<any>();

const screenOptions = {
  headerShown: false,
  ...TransitionPresets.SlideFromRightIOS,
};

function NoFooter() {
  const screens = [
    //Home
    NoteScreen,
    QrCodeScreen,
    DetailNoteScreen,
    //User
    SettingScreen,
    ChatGPTScreen,
    FeedbackScreen,
    UtilitiesScreen,
    ChangeLanguageScreen,
    TimerCountdownScreen,
  ];
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      {screens.map((ScreenComponent, index) => (
        <Stack.Screen
          key={index}
          name={ScreenComponent.name}
          component={ScreenComponent}
        />
      ))}
    </Stack.Navigator>
  );
}

export default function NoFooterStack() {
  return <NoFooter />;
}
