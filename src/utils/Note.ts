import {Alert} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';

import {t} from '@i18n/index';
import store from '@stores/index';
import {HomeApi} from '@api/HomeApi';
import {setIsLoading} from '@stores/action';
import {goBack} from '@navigation/RootNavigation';
import {showMessage, hasInternetConnection} from '@utils/index';
import {MutableRefObject} from 'react';

const copyToClipboard = async (id: any) => {
  if (id) {
    Clipboard.setString(id);
    showMessage.success(t('copied_spendsync_id'));
  }
};

const onAddExpense = async (
  initData: {_id: any; members: any[]},
  formRef: MutableRefObject<any>,
) => {
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
  // store.dispatch(setIsLoading(true));
  const res: any = await HomeApi.addExpense(params);
  if (res.code === 200) {
    // store.dispatch(setIsLoading(false));
    goBack();
  } else {
    // store.dispatch(setIsLoading(false));
    showMessage.fail(t('error_occurred_try_again'));
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
    currency: formRef.current.color_currency.currency || 1,
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
    HomeApi.createNote(params)
      .then((res: any) => {
        if (res.code === 200) {
          dispatch(setIsLoading(false));
          goBack();
        } else {
          dispatch(setIsLoading(false));
          showMessage.fail(t('error_occurred_try_again'));
        }
      })
      .catch((error: any) => {
        dispatch(setIsLoading(false));
        showMessage.fail(t('error_occurred_try_again'));
      });
  } else {
  }
};

const apiChangeStatus = (_id: string, status: Number) => {
  store.dispatch(setIsLoading(true));
  HomeApi.changeStatus({_id, status: status === 3 ? 6 : 7})
    .then((res: any) => {
      if (res.code === 200) {
        goBack();
        store.dispatch(setIsLoading(false));
      } else {
        store.dispatch(setIsLoading(false));
        showMessage.fail(t('error_occurred_try_again'));
      }
    })
    .catch((error: any) => {
      showMessage.fail(t('error_occurred_try_again'));
      store.dispatch(setIsLoading(false));
    });
};

const changeStatus = (_id: string, status: Number) => {
  if (status === 3) {
    apiChangeStatus(_id, status);
  } else {
    Alert.alert(
      t('move_to_trash'),
      t('items_in_trash_deleted_after_30_days'),
      [
        {
          text: t('move'),
          onPress: () => apiChangeStatus(_id, status),
          style: 'destructive',
        },
        {
          text: t('cancel'),
          onPress: () => {},
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  }
};

export {copyToClipboard, onAddExpense, onAddNote, changeStatus};
