import React, {memo} from 'react';
import {
  View,
  Text,
  Animated,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useTranslation} from 'react-i18next';
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
    outputRange: [0, SCREEN_WIDTH - (SCREEN_WIDTH / 100) * 26],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.buttonTabsCon}>
      <TouchableOpacity onPress={onCustomerActiveTab} style={styles.buttonTab}>
        <Text style={styles.txtTab} numberOfLines={1}>
          {t('tools')}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onCheckOrderActiveTab}
        style={styles.buttonTab}>
        <Text style={styles.txtTab} numberOfLines={1}>
          {t('entertainment')}
        </Text>
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
    backgroundColor: '#FFFFFF',
    width: (SCREEN_WIDTH / 100) * 40,
    borderRadius: normalize(10),
    zIndex: -1,
    margin: normalize(5),
    ...StyleSheet.absoluteFillObject,
  },
  buttonTabsCon: {
    flexDirection: 'row',
    backgroundColor: Colors.IRON,
    width: (SCREEN_WIDTH / 100) * 80,
    marginTop: normalize(10),
    borderRadius: normalize(10),
    height: normalize(45),
    marginVertical: normalize(16),
    alignSelf: 'center',
  },
  buttonTab: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    width: (SCREEN_WIDTH / 100) * 39,
    overflow: 'hidden',
    borderRadius: normalize(10),
  },
  txtTab: {
    color: '#41194A',
    fontFamily: themeStyle.FONT_FAMILY,
    fontSize: 18,
  },
});
