import React, {useRef} from 'react';
import {
  View,
  Platform,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';

import {t} from '@i18n/index';
import {
  InputText,
  BottomSheet,
  InputColorCurrency,
} from '@components/BaseComponent/index';
import {getNoteLabel} from '@configs/AppData';
import {homeStyle as styles} from '@styles/home.style';
import HeaderWithTitle from '@components/Header/HeaderWithTitle';
import {RenderCurrency, RenderColor} from '@components/Home/RenderItem';

const WIDTH = Dimensions.get('screen').width;

export default function NoteScreen() {
  const colorSheetRef = useRef<any>(null);
  const currencySheetRef = useRef<any>(null);
  const noteLabel = getNoteLabel(colorSheetRef, currencySheetRef);
  const formRef = useRef<any>({...noteLabel});

  const onSelectColor = async (selectedColor: string) => {
    await formRef.current.color_currency.setColors(selectedColor);
  };

  const onSelectCurrency = async (selectedCurrency: number) => {
    await formRef.current.color_currency.setCurrency(selectedCurrency);
  };

  return (
    <KeyboardAvoidingView
      style={styles.containerNote}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <HeaderWithTitle title={t('create_new')} />
      <View style={{width: WIDTH}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.ScrollView}>
          <InputText
            {...noteLabel.title}
            ref={(ref: any) => (formRef.current.title = ref)}
          />
          <InputColorCurrency
            {...noteLabel.color_currency}
            ref={(ref: any) => (formRef.current.color_currency = ref)}
          />
          <InputText
            {...noteLabel.description}
            ref={(ref: any) => (formRef.current.description = ref)}
          />
        </ScrollView>
      </View>
      <BottomSheet ref={colorSheetRef}>
        {RenderColor(colorSheetRef, onSelectColor)}
      </BottomSheet>
      <BottomSheet ref={currencySheetRef}>
        {RenderCurrency(currencySheetRef, onSelectCurrency)}
      </BottomSheet>
    </KeyboardAvoidingView>
  );
}
