/* eslint-disable react-native/no-inline-styles */
import React, {useRef, Suspense} from 'react';
import {
  View,
  Text,
  Animated,
  FlatList,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import {t} from '@i18n/index';
import {showMessage} from '@utils/index';
import {listGame, listTool} from '@configs/AppData';
import ButtonTabs from '@components/User/ButtonTabs';
import {userScreenStyle as styles} from '@styles/user.style';
import HeaderWithTitle from '@components/Header/HeaderWithTitle';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

export default function UtilitiesScreen({navigation}: any) {
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

  const renderUtilities = ({item, index}: any) => {
    const Icon = item.icon;
    return (
      <TouchableOpacity
        key={index}
        style={styles.utility}
        onPress={() =>
          item.screen
            ? navigation.navigate(item.screen)
            : showMessage.help(t('function_under_development'))
        }>
        <View style={styles.itemUtilities}>
          <Icon />
        </View>
        <Text style={styles.titleItemUtilities}>{t(item.title)}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <HeaderWithTitle title={t('utilities')} />
      <ButtonTabs x={x} onPress={onActionChangeTab} />
      <AnimatedScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        onScroll={onScroll}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}>
        <Suspense fallback={<ActivityIndicator size="large" />}>
          <View style={{width: SCREEN_WIDTH}}>
            <FlatList
              numColumns={4}
              data={listTool}
              scrollEnabled={true}
              renderItem={renderUtilities}
              showsVerticalScrollIndicator={false}
            />
          </View>
          <View style={{width: SCREEN_WIDTH}}>
            <FlatList
              numColumns={4}
              data={listGame}
              scrollEnabled={true}
              renderItem={renderUtilities}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </Suspense>
      </AnimatedScrollView>
    </View>
  );
}
