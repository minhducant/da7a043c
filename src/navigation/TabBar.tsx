/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useRef, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {
  View,
  Animated,
  Platform,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';

import color from '@styles/color';
import {navigationStyle as styles} from '@styles/navigation.style';

const TabBar = ({state, descriptors, navigation}: any) => {
  const {numNotify} = useSelector((st: any) => st.Config);

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
            const scaleAnimate = useRef(
              new Animated.Value(isFocused ? 1 : 0),
            ).current;

            useEffect(() => {
              if (isFocused) {
                Animated.timing(scaleAnimate, {
                  toValue: Platform.OS === 'android' ? 1.2 : 1.3,
                  duration: 300,
                  useNativeDriver: true,
                }).start();
              } else {
                Animated.timing(scaleAnimate, {
                  toValue: 0,
                  duration: 200,
                  useNativeDriver: true,
                }).start();
              }
            }, [isFocused, scaleAnimate]);

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });
              if (!isFocused && !event.defaultPrevented) {
                route.name === 'AddNote'
                  ? // ? navigation.navigate('NoFooter', {
                    //     screen: 'CreateNoteScreen',
                    //   })
                    navigation.navigate('CreateNoteScreen')
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
                    <Animated.View
                      style={[
                        styles.dot,
                        {
                          transform: [{scale: scaleAnimate}],
                        },
                      ]}
                    />
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
