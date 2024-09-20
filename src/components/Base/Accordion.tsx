import React from 'react';
import moment from 'moment';
import Animated, {
  runOnUI,
  measure,
  withTiming,
  useAnimatedRef,
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';
import normalize from 'react-native-normalize';
import {Pressable, StyleSheet, Text, View} from 'react-native';

import color from '@styles/color';
import {formatMoney} from '@utils/index';
import themeStyle from '@styles/theme.style';
import {IconLibrary} from '@components/Base';

type Props = {
  value: any;
  index: number;
  type: number;
  length?: number;
};

export type NestedItem = {
  title: string;
  content: string[];
};

const Chevron = ({progress}: any) => {
  const iconStyle = useAnimatedStyle(() => ({
    transform: [{rotate: `${progress.value * -180}deg`}],
  }));
  return (
    <Animated.View style={iconStyle}>
      <IconLibrary size={30} color="#edb9be" name={'caret-down-circle'} />
    </Animated.View>
  );
};

const Accordion = ({value, index, type, length}: Props) => {
  const listRef = useAnimatedRef();
  const heightValue = useSharedValue(0);
  const open = useSharedValue(false);
  const progress = useDerivedValue(() =>
    open.value ? withTiming(1) : withTiming(0),
  );

  const heightAnimationStyle = useAnimatedStyle(() => ({
    height: heightValue.value,
  }));

  return (
    <View
      style={[
        styles.container,
        {borderBottomWidth: index + 1 === length ? 0 : 1},
      ]}
      key={index}>
      <Pressable
        onPress={() => {
          if (heightValue.value === 0) {
            runOnUI(() => {
              'worklet';
              heightValue.value = withTiming(measure(listRef)!.height);
            })();
          } else {
            heightValue.value = withTiming(0);
          }
          open.value = !open.value;
        }}
        style={styles.titleContainer}>
        <View>
          <Text style={styles.textTitle}>{value.expense}</Text>
          <Text style={styles.textTime}>
            {moment(value?.payment_date).format('DD/MM/YYYY')}
          </Text>
        </View>
        <Text numberOfLines={1} style={styles.textTitle}>
          {formatMoney(value.cost, type)}
        </Text>
        <Chevron progress={progress} />
      </Pressable>
      <Animated.View style={heightAnimationStyle}>
        <Animated.View style={styles.contentContainer} ref={listRef}>
          <View style={styles.content} />
        </Animated.View>
      </Animated.View>
    </View>
  );
};

export default Accordion;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: normalize(16),
    // marginTop: normalize(8),
    borderColor: color.SILVER,
    overflow: 'hidden',
  },
  textTitle: {
    fontSize: 18,
    color: 'black',
    fontFamily: themeStyle.FONT_FAMILY,
  },
  titleContainer: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentContainer: {
    position: 'absolute',
    width: '100%',
    top: 0,
  },
  content: {
    padding: 20,
    // backgroundColor: '#D6E1F0',
  },
  textTime: {
    fontSize: 14,
    color: 'gray',
    marginTop: normalize(8),
    fontFamily: themeStyle.FONT_FAMILY,
  },
});
