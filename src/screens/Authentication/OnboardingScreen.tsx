import React from 'react';
import {
  Image,
  View,
  Text,
  FlatList,
  StatusBar,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';

import color from '@styles/color';
import themeStyle from '@styles/theme.style';
import {setIsFirstUse, setAppStatus} from '@stores/action';

function OnboardingScreen() {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const onGetStarted = () => {
    dispatch(setIsFirstUse(false));
    dispatch(setAppStatus(2));
  };

  return (
    <SafeAreaView
      style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <StatusBar backgroundColor={'white'} />
      <TouchableOpacity activeOpacity={0.8} onPress={onGetStarted}>
        <Text>{t('next')}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
export default OnboardingScreen;
