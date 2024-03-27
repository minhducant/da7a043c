import React, {useRef} from 'react';
import {
  Text,
  Platform,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import normalize from 'react-native-normalize';
import {useSelector, useDispatch} from 'react-redux';

import {t} from '@i18n/index';
import {Base} from '@components/Base';
import {
  RenderColor,
  RenderMember,
  RenderCurrency,
} from '@components/Home/RenderItem';
import {onAddNote} from '@utils/index';
import {getNoteLabel} from '@configs/AppData';
import {homeStyle as styles} from '@styles/home.style';
import HeaderWithTitle from '@components/Header/HeaderWithTitle';

export default function CreateNoteScreen({}: any) {
  const dispatch = useDispatch();
  const colorSheetRef = useRef<any>(null);
  const memberSheetRef = useRef<any>(null);
  const currencySheetRef = useRef<any>(null);
  const noteLabel = getNoteLabel(
    colorSheetRef,
    memberSheetRef,
    currencySheetRef,
  );
  const formRef = useRef<any>({...noteLabel});
  const userInfo = useSelector((state: any) => state.Config.userInfo);

  const onSelectMember = async (members: any) => {
    await formRef.current.members.setData(members);
  };

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
      <ScrollView
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollView}>
        <Base.InputText
          {...noteLabel.title}
          style={{marginTop: normalize(6)}}
          ref={(ref: any) => (formRef.current.title = ref)}
        />
        <Base.InputText
          {...noteLabel.description}
          ref={(ref: any) => (formRef.current.description = ref)}
        />
        <Base.InputColorCurrency
          {...noteLabel.color_currency}
          ref={(ref: any) => (formRef.current.color_currency = ref)}
        />
        <Base.InputMember
          {...noteLabel.members}
          ref={(ref: any) => (formRef.current.members = ref)}
        />
      </ScrollView>
      <SafeAreaView>
        <TouchableOpacity
          style={styles.addNew}
          onPress={() => onAddNote({userInfo, formRef, dispatch})}>
          <Text style={styles.txtAdd}>{t('add')}</Text>
        </TouchableOpacity>
      </SafeAreaView>
      <Base.BottomSheet ref={colorSheetRef}>
        {RenderColor(colorSheetRef, onSelectColor)}
      </Base.BottomSheet>
      <Base.BottomSheet ref={memberSheetRef}>
        {RenderMember(memberSheetRef, onSelectMember)}
      </Base.BottomSheet>
      <Base.BottomSheet ref={currencySheetRef}>
        {RenderCurrency(currencySheetRef, onSelectCurrency)}
      </Base.BottomSheet>
    </KeyboardAvoidingView>
  );
}
