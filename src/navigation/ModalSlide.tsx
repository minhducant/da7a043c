import React from 'react';
import {TransitionPresets} from '@react-navigation/stack';
import {createStackNavigator} from '@react-navigation/stack';

import PolicyScreen from '@screens/Application//User/PolicyScreen';

const Stack = createStackNavigator<any>();

const screenOptions = {
  headerShown: false,
  ...TransitionPresets.ModalPresentationIOS,
};

function ModalSlide() {
  const screens = [PolicyScreen];
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
