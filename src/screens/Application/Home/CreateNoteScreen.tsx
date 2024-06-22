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
import {HomeApi} from '@api/HomeApi';
import {showMessage} from '@utils/index';
import {setIsLoading} from '@stores/action';
import {getNoteLabel} from '@configs/AppData';
import {goBack} from '@navigation/RootNavigation';
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
  const {userInfo, friends} = useSelector((state: any) => state.Config);

  const onSelectColor = async (selectedColor: string) => {
    await formRef.current.color_currency.setColors(selectedColor);
  };

  const onSelectCurrency = async (selectedCurrency: number) => {
    await formRef.current.color_currency.setCurrency(selectedCurrency);
  };

  const onAddNote = async () => {
    const params = {
      status: 0,
      user_id: userInfo._id,
      title: formRef.current.title.getValue() || '',
      members: formRef.current.members.getValue() || [],
      desc: formRef.current.description.getValue() || '',
      color: formRef.current.color_currency.colors || '',
      currency: formRef.current.color_currency.currency || 0,
    };
    if (!params.title) {
      showMessage.warning(t('please_enter_title'));
      return;
    }
    await HomeApi.createNote(params)
      .then((res: any) => {
        console.log(res);
        if (res.code === 200) {
          dispatch(setIsLoading(false));
          goBack();
        } else {
          dispatch(setIsLoading(false));
          showMessage.fail(t('error_occurred_try_again'));
        }
      })
      .catch((error: any) => {
        console.log(error);
        dispatch(setIsLoading(false));
        showMessage.fail(t('error_occurred_try_again'));
      });
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
        <TouchableOpacity style={styles.addNew} onPress={onAddNote}>
          <Text style={styles.txtAdd}>{t('add')}</Text>
        </TouchableOpacity>
      </SafeAreaView>
      <Base.BottomSheet ref={colorSheetRef}>
        {RenderColor(colorSheetRef, onSelectColor)}
      </Base.BottomSheet>
      <Base.BottomSheet ref={currencySheetRef}>
        {RenderCurrency(currencySheetRef, onSelectCurrency)}
      </Base.BottomSheet>
      <Base.BottomSheet ref={memberSheetRef}>
        {RenderMember(memberSheetRef, userInfo, friends, formRef)}
      </Base.BottomSheet>
    </KeyboardAvoidingView>
  );
}
