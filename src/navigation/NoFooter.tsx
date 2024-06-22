import React from 'react';
import {Platform} from 'react-native';
import {TransitionPresets} from '@react-navigation/stack';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

//Home
import QrCodeScreen from '@screens/Application/Home/QrCodeScreen';
import CreateNoteScreen from '@screens/Application/Home/CreateNoteScreen';
import DetailNoteScreen from '@screens/Application/Home/DetailNoteScreen';

//User
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

const Stack = createStackNavigator<any>();

const screenOptions = {
  headerShown: false,
  ...(Platform.OS === 'ios'
    ? TransitionPresets.SlideFromRightIOS
    : TransitionPresets.FadeFromBottomAndroid),
};

function NoFooter() {
  const screens = [
    //Home
    QrCodeScreen,
    CreateNoteScreen,
    DetailNoteScreen,
    //User
    SettingScreen,
    ChatGPTScreen,
    FeedbackScreen,
    UtilitiesScreen,
    ChangeLanguageScreen,
    //Utilities
    SnakeScreen,
    PingPongScreen,
    RollDiceScreen,
    CoinFlipScreen,
    TicTacToeScreen,
    CalculatorScreen,
    MinesweeperScreen,
    RandomNumberScreen,
    TimerCountdownScreen,
  ];
  return (
    <Stack.Navigator screenOptions={screenOptions}>
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

export default function NoFooterStack() {
  return <NoFooter />;
}
