import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import PolicyScreen from '@screens/Application//User/PolicyScreen';
import AddExpenseScreen from '@screens/Application/Home/AddExpenseScreen';

const StackNavigator = createNativeStackNavigator();

const screenOptions = {
  headerShown: false,
};

function ModalSlide() {
  const screens = [PolicyScreen, AddExpenseScreen];
  return (
    <StackNavigator.Navigator screenOptions={screenOptions}>
      {screens.map((ScreenComponent, index) => (
        <StackNavigator.Screen
          key={index}
          name={ScreenComponent.name}
          component={ScreenComponent}
        />
      ))}
    </StackNavigator.Navigator>
  );
}

export default function ModalSlideStack() {
  return <ModalSlide />;
}
