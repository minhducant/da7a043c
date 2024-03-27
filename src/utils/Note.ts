import Clipboard from '@react-native-clipboard/clipboard';

import {t} from '@i18n/index';
import {HomeApi} from '@api/HomeApi';
import {setIsLoading} from '@stores/action';
import {goBack} from '@navigation/RootNavigation';
import {showMessage, hasInternetConnection} from '@utils/index';

const copyToClipboard = async (id: any) => {
  if (id) {
    Clipboard.setString(id);
    showMessage.success(t('copied_spendsync_id'));
  }
};

const onAddExpense = async ({initData, formRef, dispatch}: any) => {
  const isConnected = await hasInternetConnection();
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
  if (!isConnected) {
    goBack();
    return;
  }
  if (isConnected) {
    dispatch(setIsLoading(true));
    const res: any = await HomeApi.addExpense(params);
    if (res.code === 200) {
      dispatch(setIsLoading(false));
      goBack();
    } else {
      dispatch(setIsLoading(false));
      showMessage.fail(t('error_occurred_try_again'));
    }
  } else {
  }
};

const onAddNote = async ({userInfo, formRef, dispatch}: any) => {
  const isConnected = await hasInternetConnection();
  const params = {
    status: 0,
    user_id: userInfo._id,
    title: formRef.current.title.getValue() || '',
    members: formRef.current.members.getValue() || [],
    desc: formRef.current.description.getValue() || '',
    color: formRef.current.color_currency.colors || '',
    currency: formRef.current.color_currency.currency || '',
  };
  if (!params.title) {
    showMessage.warning(t('please_enter_title'));
    return;
  }
  if (!isConnected || Object.keys(userInfo).length === 0) {
    goBack();
    return;
  }
  if (isConnected) {
    const res: any = HomeApi.createNote(params);
    if (res.code === 200) {
      dispatch(setIsLoading(false));
      goBack();
    } else {
      dispatch(setIsLoading(false));
      showMessage.fail(t('error_occurred_try_again'));
    }
  } else {
  }
};

export {copyToClipboard, onAddExpense, onAddNote};
