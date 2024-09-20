import React, {useRef, useCallback} from 'react';
import FastImage from 'react-native-fast-image';
import {
  View,
  Text,
  SectionList,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics'

import {t} from '@i18n/index';
import {BottomSheet} from '@components/Base';
import themeStyle from '@styles/theme.style';
import useGetWallet from '@hooks/useGetWallet';
import {IconPayPal, IconAddWallet} from '@assets/icons';
import {userScreenStyle as styles} from '@styles/user.style';
import HeaderWithTitle from '@components/Header/HeaderWithTitle';

export default function WalletScreen() {
  const refreshControl = useRef(false);
  const addWalletRef = useRef<any>(null);
  const viewWalletRef = useRef<any>(null);
  const {wallet, fetchData} = useGetWallet();

  const renderHeader = ({section}: any) => {
    return <Text style={styles.headerText}>{t(section.title)}</Text>;
  };

  const onRefresh = async () => {
    await fetchData();
  };

  const onPressItem = useCallback((item: any) => {
    const isActive = viewWalletRef?.current?.isActive();
    if (isActive) {
      viewWalletRef?.current?.scrollTo(0);
    } else {
      viewWalletRef?.current?.scrollTo(-(themeStyle.height * 40) / 100);
    }
  }, []);

  const onAllWallet = useCallback(() => {
    const isActive = addWalletRef?.current?.isActive();
    if (isActive) {
      addWalletRef?.current?.scrollTo(0);
    } else {
      addWalletRef?.current?.scrollTo(-(themeStyle.height * 40) / 100);
    }
  }, []);

  function formatString(input: string): string {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(input)) {
      const emailParts = input.split('@');
      const username = emailParts[0];
      const domain = emailParts[1];
      if (username.length <= 3) {
        return `${username}@${domain}`;
      }
      const maskedUsername = `${username.substring(0, 3)}${'*'.repeat(
        username.length - 3,
      )}`;
      return `${maskedUsername}@${domain}`;
    } else {
      if (input.length <= 3) {
        return input;
      }
      const maskedAccountNumber = `*** *** *** *** ${input.slice(-3)}`;
      return maskedAccountNumber;
    }
  }

  const renderSectionFooter = () => {
    return (
      <TouchableOpacity
        style={styles.addWallet}
        activeOpacity={0.5}
        onPress={() => onAllWallet()}>
        <IconAddWallet />
        <Text style={styles.txtAddWallet}>{t('add_wallet')}</Text>
      </TouchableOpacity>
    );
  };

  const renderItem = ({item, index}: any) => {
    return (
      <TouchableOpacity
        key={index}
        activeOpacity={0.5}
        style={styles.itemWallet}
        onPress={() => onPressItem(item)}>
        <>
          {item.type === 'BANK_CARD' ? (
            <FastImage
              style={styles.imageResultUser}
              source={{
                uri: item.bank_logo,
                headers: {Authorization: 'someAuthToken'},
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
          ) : (
            <IconPayPal />
          )}
        </>
        <Text style={styles.txtWallet}>
          {item.type === 'BANK_CARD'
            ? formatString(item.account_no)
            : formatString(item.paypal_email)}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <HeaderWithTitle title={t('e_wallet')} />
      {wallet.length === 0 ? (
        <ActivityIndicator />
      ) : (
        <SectionList
          data={wallet}
          sections={wallet}
          renderItem={renderItem}
          style={styles.listWallet}
          stickySectionHeadersEnabled={false}
          renderSectionHeader={renderHeader}
          showsVerticalScrollIndicator={false}
          renderSectionFooter={renderSectionFooter}
          keyExtractor={(_, index) => `${index}`}
          refreshControl={
            <RefreshControl
              onRefresh={onRefresh}
              refreshing={refreshControl.current}
            />
          }
        />
      )}
      <BottomSheet ref={addWalletRef}></BottomSheet>
      <BottomSheet ref={viewWalletRef}></BottomSheet>
    </View>
  );
}
