import {Platform, AppState} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import NetInfo from '@react-native-community/netinfo';

function hasHomeButton() {
  const isIOS = Platform.OS === 'ios';
  const hasHomeButtonDevices = [
    'iPhone 8',
    'iPhone 8 Plus',
    'iPhone 7',
    'iPhone 7 Plus',
    'iPhone 6s',
    'iPhone 6s Plus',
    'iPhone 6',
    'iPhone 6 Plus',
    'iPhone 5s',
    'iPhone 5c',
    'iPhone 5',
    'iPhone SE',
  ];
  if (isIOS) {
    const deviceModel = DeviceInfo.getModel();
    return hasHomeButtonDevices.includes(deviceModel);
  }
  return false;
}

async function hasInternetConnection() {
  const state = await NetInfo.fetch();
  return state.isConnected;
}

function isAppInBackground() {
  return AppState.currentState === 'background';
}

export {hasHomeButton, isAppInBackground, hasInternetConnection};
