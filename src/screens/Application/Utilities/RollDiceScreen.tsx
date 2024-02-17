import React, {useState, useRef} from 'react';
import {
  Text,
  View,
  Easing,
  Animated,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useTranslation} from 'react-i18next';

import {utilitiesStyle as styles} from '@styles/utils.style';
import HeaderWithTitle from '@components/Header/HeaderWithTitle';

export default function RollDiceScreen() {
  const {t} = useTranslation();
  const [diceValue, setDiceValue] = useState<number>(
    Math.floor(Math.random() * 6) + 1,
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const shakeInterpolate = shakeAnim.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: ['0deg', '-10deg', '10deg', '-10deg', '0deg'],
  });

  const scaleInterpolate = scaleAnim.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: [1, 0.95, 1.05, 0.95, 1],
  });

  const animatedStyle = {
    transform: [{rotate: shakeInterpolate}, {scale: scaleInterpolate}],
  };

  const onRollDice = async () => {
    if (!isLoading) {
      setIsLoading(true);
      const result = Math.floor(Math.random() * 6) + 1;
      setDiceValue(result);
      Animated.sequence([
        Animated.timing(shakeAnim, {
          toValue: 1,
          duration: 250,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.9,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 0,
          duration: 250,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ]).start(() => setIsLoading(false));
    }
  };

  const renderDiceDots = () => {
    const dots = [];
    switch (diceValue) {
      case 1:
        dots.push(<View key={1} style={styles.dot} />);
        break;
      case 2:
        dots.push(
          <View key={1} style={[styles.dot, styles.dotTopRight]} />,
          <View key={2} style={[styles.dot, styles.dotBottomLeft]} />,
        );
        break;
      case 3:
        dots.push(
          <View key={1} style={[styles.dot, styles.dotTopRight]} />,
          <View key={2} style={[styles.dot, styles.dotCenter]} />,
          <View key={3} style={[styles.dot, styles.dotBottomLeft]} />,
        );
        break;
      case 4:
        dots.push(
          <View key={1} style={[styles.dot, styles.dotTopLeft]} />,
          <View key={2} style={[styles.dot, styles.dotTopRight]} />,
          <View key={3} style={[styles.dot, styles.dotBottomLeft]} />,
          <View key={4} style={[styles.dot, styles.dotBottomRight]} />,
        );
        break;
      case 5:
        dots.push(
          <View key={1} style={[styles.dot, styles.dotTopLeft]} />,
          <View key={2} style={[styles.dot, styles.dotTopRight]} />,
          <View key={3} style={[styles.dot, styles.dotCenter]} />,
          <View key={4} style={[styles.dot, styles.dotBottomLeft]} />,
          <View key={5} style={[styles.dot, styles.dotBottomRight]} />,
        );
        break;
      case 6:
        dots.push(
          <View key={1} style={[styles.dot, styles.dotTopLeft]} />,
          <View key={2} style={[styles.dot, styles.dotTopCenter]} />,
          <View key={3} style={[styles.dot, styles.dotTopRight]} />,
          <View key={4} style={[styles.dot, styles.dotBottomLeft]} />,
          <View key={5} style={[styles.dot, styles.dotBottomCenter]} />,
          <View key={6} style={[styles.dot, styles.dotBottomRight]} />,
        );
        break;
      default:
        break;
    }
    return dots;
  };

  return (
    <View style={styles.container}>
      <HeaderWithTitle title={t('roll_dice')} />
      <ScrollView
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewCoin}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={onRollDice}
          disabled={isLoading}>
          <Animated.View style={[styles.dice, animatedStyle]}>
            {isLoading ? (
              <ActivityIndicator size={'large'} />
            ) : (
              renderDiceDots()
            )}
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
          onPress={onRollDice}
          disabled={isLoading}>
          <Text style={styles.txtGenerate}>{t('toss')}</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}
