/* eslint-disable react-native/no-inline-styles */
import React, {useRef, Suspense} from 'react';
import {
  View,
  Animated,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import {t} from '@i18n/index';
import ButtonTabs from '@components/User/ButtonTabs';
import {userScreenStyle as styles} from '@styles/user.style';
import HeaderWithTitle from '@components/Header/HeaderWithTitle';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

export default function UtilitiesScreen() {
  const scrollRef = useRef<any>(null);
  const x = useRef(new Animated.Value(0)).current;

  const onScroll = Animated.event([{nativeEvent: {contentOffset: {x}}}], {
    useNativeDriver: false,
  });

  const onActionChangeTab = (activeTab: any) => {
    if (scrollRef?.current) {
      scrollRef.current.scrollTo({
        x: activeTab * SCREEN_WIDTH,
        y: 0,
        animate: true,
      });
    }
  };

  return (
    <View style={styles.container}>
      <HeaderWithTitle title={t('utilities')} />
      <ButtonTabs onPress={onActionChangeTab} x={x} />
      <AnimatedScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        onScroll={onScroll}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}>
        <Suspense fallback={<ActivityIndicator size="large" color="#0000ff" />}>
          <View style={{width: SCREEN_WIDTH, backgroundColor: 'red'}}>
            <></>
          </View>
          <View style={{width: SCREEN_WIDTH, backgroundColor: 'blue'}}>
            <></>
          </View>
        </Suspense>
      </AnimatedScrollView>
    </View>
  );
}
