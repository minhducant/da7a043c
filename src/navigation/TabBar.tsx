/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useRef, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {
  View,
  Animated,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';

import color from '@styles/color';
import {navigationStyle as styles} from '@styles/navigation.style';

const TabBar = ({state, descriptors, navigation}: any) => {
  const scaleAnimate = useRef(new Animated.Value(0)).current;
  const {numNotify} = useSelector((st: any) => st.Config);

  const animateElement = () => {
    Animated.timing(scaleAnimate, {
      toValue: 200,
      duration: 2000,
      useNativeDriver: false,
    }).start();
  };

  const animationStyle = {
    width: scaleAnimate,
    height: scaleAnimate,
  };

  const tabBarIcon = (focused: boolean, IconComponent: any) => (
    <IconComponent fill={focused ? color.BLACK : color.GRAY} />
  );

  return (
    <SafeAreaView style={styles.containerTab}>
      <View style={styles.tabBar}>
        {state.routes.map(
          (route: {key: string | number; name: any}, index: any) => {
            const isFocused = state.index === index;
            const {options} = descriptors[route.key];
            const icon = options.tabBarIcon;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });
              if (!isFocused && !event.defaultPrevented) {
                route.name === 'AddNote'
                  ? navigation.navigate('NoFooter', {
                      screen: 'NoteScreen',
                      merge: true,
                    })
                  : navigation.navigate(route.name);
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };

            return (
              <TouchableWithoutFeedback
                onPress={onPress}
                style={styles.tabButton}
                onLongPress={onLongPress}
                accessibilityRole="button"
                testID={options.tabBarTestID}
                key={`${index}--${route.key}`}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                accessibilityState={isFocused ? {selected: true} : {}}>
                <View style={styles.innerView}>
                  {tabBarIcon(isFocused, icon)}
                  {route.name === 'NotificationScreen' && numNotify > 0 && (
                    <View style={styles.badgeStyle} />
                  )}
                  {isFocused && (
                    <Animated.View style={[styles.dot, {transform: []}]} />
                  )}
                </View>
              </TouchableWithoutFeedback>
            );
          },
        )}
      </View>
    </SafeAreaView>
  );
};

export default TabBar;
