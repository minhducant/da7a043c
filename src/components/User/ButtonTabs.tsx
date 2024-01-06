import React, {memo} from 'react';
import {useTranslation} from 'react-i18next';
import {
  View,
  Text,
  Animated,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import normalize from 'react-native-normalize';

import Colors from '@styles/color';
import themeStyle from '@styles/theme.style';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const AnimatedView = Animated.createAnimatedComponent(View);

const ButtonTabs = ({onPress, x}: any) => {
  const {t} = useTranslation();

  const onCustomerActiveTab = () => {
    onPress(0);
  };

  const onCheckOrderActiveTab = () => {
    onPress(1);
  };

  const translateX = x.interpolate({
    inputRange: [0, SCREEN_WIDTH * 2],
    outputRange: [0, SCREEN_WIDTH / 3.5],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.buttonTabsCon}>
      <TouchableOpacity onPress={onCustomerActiveTab} style={styles.buttonTab}>
        <Text style={styles.txtTab}>{t('entertainment')}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onCheckOrderActiveTab}
        style={styles.buttonTab}>
        <Text style={styles.txtTab}>{t('tools')}</Text>
      </TouchableOpacity>
      <AnimatedView
        style={{
          ...styles.indicator,
          transform: [{translateX}],
        }}
      />
    </View>
  );
};
export default memo(ButtonTabs);

const styles = StyleSheet.create({
  indicator: {
    backgroundColor: Colors.FUN_BLUE,
    width: (SCREEN_WIDTH - 32) / 2,
    zIndex: -1,
    ...StyleSheet.absoluteFillObject,
  },
  buttonTabsCon: {
    flexDirection: 'row',
    backgroundColor: Colors.IRON,
    paddingVertical: normalize(8),
    margin: normalize(16),
    borderRadius: normalize(16),
  },
  buttonTab: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    width: (SCREEN_WIDTH - 32) / 2,
    flex: 1,
    overflow: 'hidden',
    borderRadius: normalize(16),
  },
  txtTab: {
    color: 'white',
    fontFamily: themeStyle.FONT_FAMILY,
    fontSize: 18,
  },
});
