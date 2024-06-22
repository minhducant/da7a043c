import React, {useRef, useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  Animated,
  FlatList,
  ScrollView,
  ToastAndroid,
  NativeModules,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import Share from 'react-native-share';
import ActionSheet from '@alessiocancian/react-native-actionsheet';
import SharedGroupPreferences from 'react-native-shared-group-preferences';

import {t} from '@i18n/index';
import {Card1} from '@assets/icons';
import {HomeApi} from '@api/HomeApi';
import {changeStatus} from '@utils/Note';
import {homeStyle as styles} from '@styles/home.style';
import {NoteAction, EmptyData, EyeIcon} from '@components/Home';
import HeaderWithTitle from '@components/Header/HeaderWithTitle';
import {Accordion, IconLibrary, AnimationFAB} from '@components/Base';
import {formatMoney, showMessage, copyToClipboard} from '@utils/index';

const group = 'group.streak';

const SharedStorage = NativeModules.SharedStorage;

export default function DetailNoteScreen({navigation, route}: any) {
  const actionSheetRef = useRef<any>();
  const refreshControl = useRef<boolean>(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [showMoney, setShowMoney] = useState(true);
  const [data, setData] = useState<any>(route?.params);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = useCallback(async () => {
    const res: any = await HomeApi.getDetailNote(data._id);
    if (res.code === 200) {
      setData(res?.data);
    } else {
      showMessage.fail(t('error_occurred_try_again'));
    }
  }, []);

  const showActionSheet = () => {
    actionSheetRef.current.show();
  };

  const handlePress = useCallback((index: number) => {
    if (index === 0) {
      Share.open({url: '', message: ''})
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          err && console.log(err);
        });
    }
    if (index === 3 || index === 4) {
      changeStatus(data._id, index);
    }
    if (index === 6) {
      handleSubmit();
    }
  }, []);

  const handleSubmit = async () => {
    const widgetData = {
      text: data.title,
    };
    try {
      // iOS
      await SharedGroupPreferences.setItem('widgetKey', widgetData, group);
    } catch (error) {
      console.log({error});
    }
    // Android
    SharedStorage.set(JSON.stringify(widgetData));
    ToastAndroid.show('Change value successfully!', ToastAndroid.SHORT);
  };

  return (
    <View style={styles.containerNote}>
      <HeaderWithTitle title={data.title} />
      <ScrollView
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}
        refreshControl={
          <RefreshControl
            colors={['#ED2127']}
            onRefresh={fetchData}
            refreshing={refreshControl.current}
          />
        }
        scrollEventThrottle={16}
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}>
        <Animated.View style={styles.viewTotalContainer}>
          <Card1 />
          <View style={styles.viewInfoNote}>
            <Text style={styles.txtTotalSpending}>
              {t('total_group_spending')}
            </Text>
            <View style={styles.viewTotalMoney}>
              <Text numberOfLines={1} style={styles.txtTotalMoney}>
                {showMoney
                  ? formatMoney(data.total_money, data?.currency)
                  : '**********'}
              </Text>
              <EyeIcon showMoney={showMoney} setShowMoney={setShowMoney} />
            </View>
            <View style={styles.dashLine} />
            <TouchableOpacity
              style={styles.viewId}
              activeOpacity={0.5}
              onPress={() => copyToClipboard(data._id)}>
              <Text style={styles.txtId} numberOfLines={1}>
                {data._id || 'XXXXXXXXXXXXXXX'}
              </Text>
              <IconLibrary size={18} name="copy" color={'white'} />
            </TouchableOpacity>
          </View>
        </Animated.View>
        <View style={styles.viewAction}>
          <NoteAction title="split_bill" />
          <NoteAction title="member" />
          <NoteAction title="statistics" />
          <NoteAction title="more" action={showActionSheet} />
        </View>
        <View style={styles.viewTitleDetail}>
          <Text style={styles.txtTransaction}>{t('transaction')}</Text>
          <TouchableOpacity>
            <Text style={styles.txtViewAll}>{t('view_all')}</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={data?.note_line}
          scrollEnabled={false}
          scrollEventThrottle={16}
          ListEmptyComponent={EmptyData}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => `${index}`}
          renderItem={({index, item}) => (
            <Accordion value={item} index={index} type={data?.currency} />
          )}
        />
      </ScrollView>
      <AnimationFAB
        onAddExpense={() => {
          navigation.navigate('ModalSlide', {
            screen: 'AddExpenseScreen',
            params: data,
          });
        }}
      />
      <ActionSheet
        ref={actionSheetRef}
        options={[
          t('share'),
          t('information'),
          t('discussion'),
          t('archive_group'),
          t('delete_group'),
          t('cancel'),
          t('add_to_wallpaper'),
        ]}
        onPress={handlePress}
        cancelButtonIndex={5}
        destructiveButtonIndex={4}
      />
    </View>
  );
}
