/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee, {EventType} from '@notifee/react-native';

import App from './App';
import {name as appName} from './app.json';

var EventEmitter = require('eventemitter3');

export const eventEmitter = new EventEmitter();

const onMessageReceived = async message => {
  notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });
  const notification = JSON.parse(message.data.notifee);
  await notifee.displayNotification(notification);
};

messaging().setBackgroundMessageHandler(onMessageReceived);

messaging().onMessage(onMessageReceived);

notifee.onBackgroundEvent(async ({type, detail}) => {
  const {notification} = detail;
  if (type === EventType.PRESS) {
    eventEmitter.emit('notificationReceived', notification);
    await notifee.cancelNotification(notification.id);
  }
});

notifee.onForegroundEvent(async ({type, detail}) => {
  const {notification} = detail;
  if (type === EventType.PRESS) {
    eventEmitter.emit('notificationReceived', notification);
    await notifee.cancelNotification(notification.id);
  }
});

LogBox.ignoreAllLogs();

AppRegistry.registerComponent(appName, () => App);
