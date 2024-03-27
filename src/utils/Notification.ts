import {Linking} from 'react-native';
import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

import {setStorage} from '@utils/Storage';

export const notificationListener = async () => {
  await messaging().registerDeviceForRemoteMessages();
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log('Notification background', remoteMessage.notification);
    notifee.incrementBadgeCount();
  });
  messaging().onMessage(async (message: any) => {
    console.log('NotificationListener', message?.data);
    console.log('NotificationListener', message?.data?.id_sender);
    notifee.incrementBadgeCount();
  });
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log('notification', remoteMessage.notification);
      }
    });
};

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
  }
}

export const getFcmToken = async () => {
  try {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      await setStorage('FCMToken', fcmToken);
    }
    return null;
  } catch (error) {
    return null;
  }
};

export const deleteToken = async () => {
  try {
    await messaging().deleteToken();
  } catch (error) {}
};

const config = {
  screens: {},
};

export const linkingNotification = {
  config,
  prefixes: ['', ''],
  subscribe(listener: any) {
    const onReceiveURL = ({url}: any) => listener(url);
    Linking.addEventListener('url', onReceiveURL);
    const HandleLink = (data: any) => {
      if (data) {
      }
    };
    const unsubscribe = messaging().onMessage(async message => {
      const data = message?.data;
      if (data) {
      }
    });
    const unsubscribeNotification = messaging().onNotificationOpenedApp(
      message => {
        HandleLink(message?.data);
      },
    );
    messaging()
      .getInitialNotification()
      .then(message => {
        const data = message?.data;
        if (data) {
        }
      });
    return () => {
      unsubscribeNotification();
      unsubscribe();
    };
  },
};
