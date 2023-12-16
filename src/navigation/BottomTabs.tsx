import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {AsyncApp} from '@utils/index';
import TabBar from '@navigation/TabBar';
import {
  IconAdd,
  IconHome,
  IconPerson,
  IconTimeline,
  IconNotification,
} from '@assets/icons/index';

import UserScreen from '@screens/Application/User/UserScreen';
import HomeScreen from '@screens/Application/Home/HomeScreen';
import TimelineScreen from '@screens/Application/Timeline/TimelineScreen';
import NotificationScreen from '@screens/Application/Notification/NotificationScreen';

const Tab = createBottomTabNavigator();

const AddNote = () => {
  return null;
};

function BottomTabs() {
  AsyncApp();

  const tabScreens = [
    {
      name: 'HomeScreen',
      component: HomeScreen,
      icon: IconHome,
    },
    {
      name: 'TimelineScreen',
      component: TimelineScreen,
      icon: IconTimeline,
    },
    {
      name: 'AddNote',
      component: AddNote,
      icon: IconAdd,
    },
    {
      name: 'NotificationScreen',
      component: NotificationScreen,
      icon: IconNotification,
    },
    {
      name: 'UserScreen',
      component: UserScreen,
      icon: IconPerson,
    },
  ];

  const renderTab = (props: any) => {
    return <TabBar {...props} />;
  };

  return (
    <Tab.Navigator
      tabBar={renderTab}
      backBehavior="none"
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {backgroundColor: 'white'},
      }}>
      {tabScreens.map(tab => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          options={{
            tabBarIcon: tab.icon,
          }}
        />
      ))}
    </Tab.Navigator>
  );
}

export default function App() {
  return <BottomTabs />;
}
