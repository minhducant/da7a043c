import {Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import Animated, {
  Easing,
  withDelay,
  withSpring,
  withTiming,
  interpolate,
  Extrapolation,
  useSharedValue,
  useDerivedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import normalize from 'react-native-normalize';

import {t} from '@i18n/index';
import themeStyle from '@styles/theme.style';
import {IconLibrary} from '@components/Base/index';

const AnimationFAB = ({
  onAddExpense= () => {},
  onEditInfo = () => {},
  onAddMember = () => {},
}) => {
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
  const opacity = useSharedValue(0);
  const isOpen = useSharedValue(false);
  const firstValue = useSharedValue(30);
  const secondValue = useSharedValue(30);
  const thirdValue = useSharedValue(30);
  const firstWidth = useSharedValue(normalize(50));
  const secondWidth = useSharedValue(normalize(50));
  const thirdWidth = useSharedValue(normalize(50));

  const progress = useDerivedValue(() =>
    isOpen.value ? withTiming(1) : withTiming(0),
  );

  const handlePress = () => {
    const config = {
      easing: Easing.bezier(0.68, -0.6, 0.32, 1.6),
      duration: 500,
    };
    if (isOpen.value) {
      firstWidth.value = withTiming(normalize(50), {duration: 100}, finish => {
        if (finish) {
          firstValue.value = withTiming(30, config);
        }
      });
      secondWidth.value = withTiming(normalize(50), {duration: 100}, finish => {
        if (finish) {
          secondValue.value = withDelay(50, withTiming(30, config));
        }
      });
      thirdWidth.value = withTiming(normalize(50), {duration: 100}, finish => {
        if (finish) {
          thirdValue.value = withDelay(100, withTiming(30, config));
        }
      });
      opacity.value = withTiming(0, {duration: 100});
    } else {
      firstValue.value = withDelay(200, withSpring(170));
      secondValue.value = withDelay(100, withSpring(250));
      thirdValue.value = withSpring(330);
      firstWidth.value = withDelay(1200, withSpring(220));
      secondWidth.value = withDelay(1100, withSpring(220));
      thirdWidth.value = withDelay(1000, withSpring(220));
      opacity.value = withDelay(1200, withSpring(1));
    }
    isOpen.value = !isOpen.value;
  };

  const opacityText = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const firstWidthStyle = useAnimatedStyle(() => {
    return {
      width: firstWidth.value,
    };
  });
  const secondWidthStyle = useAnimatedStyle(() => {
    return {
      width: secondWidth.value,
    };
  });
  const thirdWidthStyle = useAnimatedStyle(() => {
    return {
      width: thirdWidth.value,
    };
  });

  const firstIcon = useAnimatedStyle(() => {
    const scale = interpolate(
      firstValue.value,
      [100, 170],
      [0, 1],
      Extrapolation.CLAMP,
    );
    return {
      bottom: firstValue.value,
      transform: [{scale: scale}],
    };
  });

  const secondIcon = useAnimatedStyle(() => {
    const scale = interpolate(
      secondValue.value,
      [100, 250],
      [0, 1],
      Extrapolation.CLAMP,
    );
    return {
      bottom: secondValue.value,
      transform: [{scale: scale}],
    };
  });

  const thirdIcon = useAnimatedStyle(() => {
    const scale = interpolate(
      thirdValue.value,
      [100, 330],
      [0, 1],
      Extrapolation.CLAMP,
    );
    return {
      bottom: thirdValue.value,
      transform: [{scale: scale}],
    };
  });

  const plusIcon = useAnimatedStyle(() => {
    return {
      transform: [{rotate: `${progress.value * 45}deg`}],
    };
  });

  return (
    <>
      <AnimatedPressable
        onPress={() => {
          onAddMember(), handlePress();
        }}
        style={[styles.contentContainer, thirdIcon, thirdWidthStyle]}>
        <View style={styles.iconContainer}>
          <IconLibrary
            size={30}
            color="white"
            name={'plus'}
            library="Feather"
          />
        </View>
        <Animated.Text style={[styles.text, opacityText]}>
          {t('add_member')}
        </Animated.Text>
      </AnimatedPressable>
      <AnimatedPressable
        onPress={() => {
          onEditInfo(), handlePress();
        }}
        style={[styles.contentContainer, secondIcon, secondWidthStyle]}>
        <View style={styles.iconContainer}>
          <IconLibrary
            size={30}
            color="white"
            name={'plus'}
            library="Feather"
          />
        </View>
        <Animated.Text style={[styles.text, opacityText]}>
          {t('edit_information')}
        </Animated.Text>
      </AnimatedPressable>
      <AnimatedPressable
        onPress={() => {
          onAddExpense(), handlePress();
        }}
        style={[styles.contentContainer, firstIcon, firstWidthStyle]}>
        <View style={styles.iconContainer}>
          <IconLibrary
            size={30}
            color="white"
            name={'plus'}
            library="Feather"
          />
        </View>
        <Animated.Text style={[styles.text, opacityText]}>
          {t('add_note')}
        </Animated.Text>
      </AnimatedPressable>
      <Pressable style={styles.contentContainer} onPress={onAddExpense}>
        <Animated.View style={[styles.iconContainer, plusIcon]}>
          <IconLibrary
            size={30}
            color="white"
            name={'plus'}
            library="Feather"
          />
        </Animated.View>
      </Pressable>
    </>
  );
};

export default AnimationFAB;

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: '#EB5758',
    position: 'absolute',
    bottom: 100,
    right: 30,
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  iconContainer: {
    width: normalize(50),
    height: normalize(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontFamily: themeStyle.FONT_FAMILY,
  },
});
