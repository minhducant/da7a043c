import React from 'react';
import {Platform} from 'react-native';
import {TransitionPresets} from '@react-navigation/stack';
import {createStackNavigator} from '@react-navigation/stack';

import PolicyScreen from '@screens/Application//User/PolicyScreen';
import AddExpenseScreen from '@screens/Application/Home/AddExpenseScreen';

const Stack = createStackNavigator<any>();

const screenOptions = {
  headerShown: false,
  ...(Platform.OS === 'ios'
  ? TransitionPresets.ModalPresentationIOS
  : TransitionPresets.FadeFromBottomAndroid),
};

function ModalSlide() {
  const screens = [PolicyScreen, AddExpenseScreen];
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

export default function ModalSlideStack() {
  return <ModalSlide />;
}
