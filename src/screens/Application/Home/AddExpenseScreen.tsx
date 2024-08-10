import React, {useRef, useEffect} from 'react';
import {
  Text,
  Platform,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {useDispatch} from 'react-redux';
import ActionSheet from '@alessiocancian/react-native-actionsheet';

import {t} from '@i18n/index';
import {HomeApi} from '@api/HomeApi';
import {Base} from '@components/Base';
import {showMessage} from '@utils/index';
import {setIsLoading} from '@stores/action';
import {getExpenseLabel} from '@configs/AppData';
import {goBack} from '@navigation/RootNavigation';
import {homeStyle as styles} from '@styles/home.style';
import HeaderWithTitle from '@components/Header/HeaderWithTitle';

export default function AddExpenseScreen({route}: any) {
  const initData = route?.params;
  const dispatch = useDispatch();
  const inputMediaOptionRef = useRef<any>(null);
  const addExpenseLabel = getExpenseLabel(initData);
  const formRef = useRef<any>({...addExpenseLabel});
  const [splitEvenly, setSplitEvenly] = React.useState(true);

  useEffect(() => {
    formRef.current.cost.focus();
  }, []);

  const handlePress = React.useCallback((index: number) => {
    const methodMap: Record<number, string> = {0: 'onCamera', 1: 'onLibrary'};
    const selectedMethod = methodMap[index];
    if (selectedMethod) {
      formRef.current.image[selectedMethod]();
    }
  }, []);

  const handleSplitEvenlyChange = (value: boolean) => {
    setSplitEvenly(value);
  };

  const onAddExpense = async () => {
    const params = {
      _id: initData._id,
      expense: {
        expense: formRef.current.expense.value || '',
        buyer: formRef.current.paid_by.value || {},
        payment_date: formRef.current.time.value,
        image_bill: formRef.current.image.value || '',
        split_evenly: formRef.current.split_evenly.value || true,
        cost:
          parseFloat(
            formRef.current.cost.value.replace(/\./g, '').replace(',', '.'),
          ) || 0,
        shares: initData.members.map((member: any) => ({
          ...member,
          money: 0,
        })),
      },
    };
    if (
      !params.expense.expense ||
      !params.expense.cost ||
      Object.keys(params.expense.buyer).length === 0
    ) {
      showMessage.warning(t('fill_in_information'));
      return;
    }
    console.log(JSON.stringify(formRef.current.split_evenly.value, null, 2));
    // dispatch(setIsLoading(true));
    // const res: any = await HomeApi.addExpense(params);
    // if (res.code === 200) {
    //   dispatch(setIsLoading(false));
    //   goBack();
    // } else {
    //   dispatch(setIsLoading(false));
    //   showMessage.fail(t('error_occurred_try_again'));
    // }
  };

  return (
    <KeyboardAvoidingView
      style={styles.containerNote}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <HeaderWithTitle title={initData.title} />
      <ScrollView
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollView}>
        <Base.InputMoney
          {...addExpenseLabel.cost}
          currency={initData.currency}
          ref={(ref: any) => (formRef.current.cost = ref)}
        />
        <Base.InputText
          {...addExpenseLabel.expense}
          ref={(ref: any) => (formRef.current.expense = ref)}
        />
        <Base.InputSelect
          {...addExpenseLabel.paid_by}
          ref={(ref: any) => (formRef.current.paid_by = ref)}
        />
        <Base.InputDate
          {...addExpenseLabel.time}
          ref={(ref: any) => (formRef.current.time = ref)}
        />
        <Base.InputSwitch
          {...addExpenseLabel.split_evenly}
          formRef={formRef}
          handleChange={handleSplitEvenlyChange}
          ref={(ref: any) => (formRef.current.split_evenly = ref)}
        />
        {!splitEvenly && (
          <Base.TableSplit
            {...addExpenseLabel.sharers}
            formRef={formRef}
            splitEvenly={splitEvenly}
            setSplitEvenly={setSplitEvenly}
            ref={(ref: any) => (formRef.current.sharers = ref)}
          />
        )}
        <Base.InputMedia
          {...addExpenseLabel.image}
          inputMediaOptionRef={inputMediaOptionRef}
          ref={(ref: any) => (formRef.current.image = ref)}
        />
      </ScrollView>
      <SafeAreaView>
        <TouchableOpacity style={styles.addNew} onPress={onAddExpense}>
          <Text style={styles.txtAdd}>{t('add')}</Text>
        </TouchableOpacity>
      </SafeAreaView>
      <ActionSheet
        onPress={handlePress}
        cancelButtonIndex={3}
        ref={inputMediaOptionRef}
        destructiveButtonIndex={2}
        options={[t('camera'), t('library'), t('cancel')]}
      />
    </KeyboardAvoidingView>
  );
}
