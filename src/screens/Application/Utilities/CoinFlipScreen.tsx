import React, {useRef, useState} from 'react';
import {
  Text,
  View,
  Easing,
  Animated,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {useTranslation} from 'react-i18next';

import {utilitiesStyle as styles} from '@styles/utils.style';
import HeaderWithTitle from '@components/Header/HeaderWithTitle';

export default function CoinFlipScreen() {
  const {t} = useTranslation();
  const [coinSide, setCoinSide] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const rotateYAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(0)).current;
  const coinColor = coinSide === 'head' ? '#EB5758' : '#59569D';

  const rotateInterpolate = rotateYAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const animatedStyle = {
    transform: [
      {perspective: 1000},
      {translateY: translateYAnim},
      {rotateY: rotateInterpolate},
    ],
  };

  const onFlip = () => {
    if (!isLoading) {
      setIsLoading(true);
      const result = Math.random() < 0.5 ? 'head' : 'tail';
      setCoinSide(result);
      Animated.sequence([
        Animated.parallel([
          Animated.timing(rotateYAnim, {
            toValue: 1,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(translateYAnim, {
            toValue: -250,
            duration: 1000,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
        ]),
        Animated.timing(translateYAnim, {
          toValue: 0,
          duration: 1000,
          easing: Easing.in(Easing.quad),
          useNativeDriver: true,
        }),
      ]).start(() => {
        setIsLoading(false);
        rotateYAnim.setValue(0);
      });
    }
  };

  return (
    <View style={styles.container}>
      <HeaderWithTitle title={t('coin_flip')} />
      <ScrollView
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewCoin}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={onFlip}
          disabled={isLoading}>
          <Animated.View
            style={[
              styles.coin,
              {backgroundColor: isLoading ? 'gray' : coinColor},
              animatedStyle,
            ]}>
            <View style={styles.borderCoin}>
              <Text style={[styles.coinText, {color: 'white'}]}>
                {isLoading ? null : t(coinSide)}
              </Text>
            </View>
          </Animated.View>
        </TouchableOpacity>
      </ScrollView>
      <SafeAreaView>
        <TouchableOpacity
          activeOpacity={0.5}
          style={[
            styles.viewGenerate,
            {backgroundColor: isLoading ? 'gray' : '#EB5758'},
          ]}
          onPress={onFlip}
          disabled={isLoading}>
          <Text style={styles.txtGenerate}>{t('toss')}</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}
