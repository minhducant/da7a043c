import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {CardStyleInterpolators} from '@react-navigation/stack';

import NoteScreen from '@screens/Application/Home/NoteScreen';
import QrCodeScreen from '@screens/Application/Home/QrCodeScreen';
import DetailNoteScreen from '@screens/Application/Home/DetailNoteScreen';

const Stack = createStackNavigator();

const screenOptions = {
  headerShown: false,
  cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
};

function NoFooter() {
  const screens = [QrCodeScreen, NoteScreen, DetailNoteScreen];
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
