import React, {useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {View, FlatList, RefreshControl} from 'react-native';

import {HomeApi} from '@api/HomeApi';
import {IconRead} from '@assets/icons';
import {showMessage} from '@utils/index';
import {useNotifyApp} from '@hooks/useNotifyApp';
import HeaderWithTitle from '@components/Header/HeaderWithTitle';
import {notificationStyle as styles} from '@styles/notification.style';
import {
  renderFooter,
  EmptyNotification,
  renderNotification,
} from '@components/Home/RenderItem';

export default function NotificationScreen() {
  const {t} = useTranslation();
  const refreshControl = useRef<boolean>(false);
  const {data, updateParamsRef, loading_more, onRefresh} = useNotifyApp();

  const onEndReached = async () => {};

  const onReadAll = async () => {
    const res: any = await HomeApi.readAllNotification();
    if (res.code === 200) {
      onRefresh();
    } else {
      showMessage.fail(t('error_occurred_try_again'));
    }
  };

  return (
    <View style={styles.container}>
      <HeaderWithTitle
        hasLeft={false}
        hasRight={true}
        actionRight={onReadAll}
        title={t('notifications')}
        renderRight={() => <IconRead />}
      />
      <FlatList
        data={data}
        scrollEventThrottle={16}
        onEndReachedThreshold={0.7}
        onEndReached={onEndReached}
        renderItem={renderNotification}
        contentContainerStyle={styles.list}
        ListEmptyComponent={EmptyNotification}
        ListFooterComponent={renderFooter(loading_more)}
        keyExtractor={(_, index) => index.toString()}
        refreshControl={
          <RefreshControl
            colors={['red']}
            onRefresh={onRefresh}
            refreshing={refreshControl.current}
          />
        }
        getItemLayout={(_: any, index: number) => ({
          index,
          length: 180,
          offset: 180 * index,
        })}
      />
    </View>
  );
}
