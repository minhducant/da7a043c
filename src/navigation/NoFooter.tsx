import React from 'react';
import {Platform} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//Home
import QrCodeScreen from '@screens/Application/Home/QrCodeScreen';
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

const StackNavigator = createNativeStackNavigator();

const screenOptions = {
  headerShown: false,
};

function NoFooter() {
  const screens = [
    //Home
    QrCodeScreen,
    CreateNoteScreen,
    DetailNoteScreen,
    //User
    WalletScreen,
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
    <StackNavigator.Navigator screenOptions={screenOptions}>
      {screens.map((ScreenComponent, index) => (
        <StackNavigator.Screen
          options={{gestureEnabled: true}}
          key={ScreenComponent.name}
          name={ScreenComponent.name}
          component={ScreenComponent}
        />
      ))}
    </StackNavigator.Navigator>
  );
}

export default function NoFooterStack() {
  return <NoFooter />;
}
