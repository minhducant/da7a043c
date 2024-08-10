import React, { useEffect } from 'react';
import { Animated, Easing, TouchableOpacity } from 'react-native';
import { IconLibrary } from '@components/Base/index';

const EyeIcon = ({ showMoney, setShowMoney, size = 28 }: any) => {
  const rotationValue = new Animated.Value(showMoney ? 1 : 0);
  const scaleValue = new Animated.Value(1);

  const rotateInterpolation = rotationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const onPressIcon = () => {
    setShowMoney(!showMoney);
    Animated.timing(scaleValue, {
      toValue: 0.8,
      duration: 150,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 150,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    });
  };

  useEffect(() => {
    Animated.timing(rotationValue, {
      toValue: showMoney ? 1 : 0,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, [showMoney]);

  return (
    <TouchableOpacity onPress={onPressIcon}>
      <Animated.View style={{ transform: [{ rotate: rotateInterpolation }, { scale: scaleValue }] }}>
        <IconLibrary
          size={size}
          color="black"
          name={showMoney ? 'eye-off-outline' : 'eye-outline'}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

export default EyeIcon;
