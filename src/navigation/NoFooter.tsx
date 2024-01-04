import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {TransitionPresets} from '@react-navigation/stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//Home
import NoteScreen from '@screens/Application/Home/NoteScreen';
import QrCodeScreen from '@screens/Application/Home/QrCodeScreen';
import DetailNoteScreen from '@screens/Application/Home/DetailNoteScreen';

//User
import SettingScreen from '@screens/Application/User/SettingScreen';
import ChatGPTScreen from '@screens/Application/User/ChatGPTScreen';
import UtilitiesScreen from '@screens/Application/User/UtilitiesScreen';

const Stack = createStackNavigator<any>();
const ModalStack = createNativeStackNavigator<any>();

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
    // UtilitiesScreen,
  ];
  const modal = [UtilitiesScreen];
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      {screens.map((ScreenComponent, index) => (
        <Stack.Screen
          key={index}
          name={ScreenComponent.name}
          component={ScreenComponent}
        />
      ))}
      {modal.map((ScreenComponent, index) => (
        <ModalStack.Screen
          key={index}
          name={ScreenComponent.name}
          component={ScreenComponent}
          options={{
            headerShown: false,
            presentation: 'modal',
            animation: 'fade_from_bottom',
            // ...TransitionPresets.ModalPresentationIOS,
          }}
        />
      ))}
    </Stack.Navigator>
  );
}

export default function NoFooterStack() {
  return <NoFooter />;
}
