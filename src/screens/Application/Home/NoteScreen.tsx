import React, {useRef} from 'react';
import {
  Text,
  Platform,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';

import {t} from '@i18n/index';
import {
  InputText,
  BottomSheet,
  InputMember,
  // InputColorCurrency,
} from '@components/Base/index';
import {
  RenderColor,
  RenderMember,
  RenderCurrency,
} from '@components/Home/RenderItem';
import {getNoteLabel} from '@configs/AppData';
import {homeStyle as styles} from '@styles/home.style';
import HeaderWithTitle from '@components/Header/HeaderWithTitle';

export default function NoteScreen({navigation}: any) {
  const colorSheetRef = useRef<any>(null);
  const memberSheetRef = useRef<any>(null);
  const currencySheetRef = useRef<any>(null);
  const noteLabel = getNoteLabel(
    colorSheetRef,
    memberSheetRef,
    currencySheetRef,
  );
  const formRef = useRef<any>({...noteLabel});

  const onSelectColor = async (selectedColor: string) => {
    await formRef.current.color_currency.setColors(selectedColor);
  };

  const onSelectCurrency = async (selectedCurrency: number) => {
    await formRef.current.color_currency.setCurrency(selectedCurrency);
  };

  const onSelectMember = async (members: any) => {
    await formRef.current.members.setData(members);
  };

  const onAddNew = () => {
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={styles.containerNote}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <HeaderWithTitle title={t('create_new')} />
      <ScrollView
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollView}>
        <InputText
          {...noteLabel.title}
          ref={(ref: any) => (formRef.current.title = ref)}
        />
        {/* <InputColorCurrency
          {...noteLabel.color_currency}
          ref={(ref: any) => (formRef.current.color_currency = ref)}
        /> */}
        <InputText
          {...noteLabel.description}
          ref={(ref: any) => (formRef.current.description = ref)}
        />
        <InputMember
          {...noteLabel.members}
          ref={(ref: any) => (formRef.current.members = ref)}
        />
      </ScrollView>
      <SafeAreaView>
        <TouchableOpacity style={styles.addNew} onPress={onAddNew}>
          <Text style={styles.txtAdd}>{t('add')}</Text>
        </TouchableOpacity>
      </SafeAreaView>
      <BottomSheet ref={colorSheetRef}>
        {RenderColor(colorSheetRef, onSelectColor)}
      </BottomSheet>
      <BottomSheet ref={currencySheetRef}>
        {RenderCurrency(currencySheetRef, onSelectCurrency)}
      </BottomSheet>
      <BottomSheet ref={memberSheetRef}>
        {RenderMember(memberSheetRef, onSelectMember)}
      </BottomSheet>
    </KeyboardAvoidingView>
  );
}
