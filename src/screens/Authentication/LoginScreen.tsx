/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {
  View,
  Text,
  Platform,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

import {
  IconApple,
  IconGoogle,
  IconForward,
  IconFacebook,
} from '@assets/icons/index';
import {AuthApi} from '@api/AuthApi';
import {setStorage, LogTelegram} from '@utils/index';
import {setAppStatus, setIsLoading} from '@stores/action';
import TemplateLogin from '@components/Authentication/TemplateLogin';
import {authenticationStyle as styles} from '@styles/authentication.style';

const LoginScreen = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const onLoginGoogle = async () => {
    GoogleSignin.configure({
      webClientId:
        '659931035615-kkk2nmiie2ustb7jviph6dtallb25f63.apps.googleusercontent.com',
      offlineAccess: true,
    });
    GoogleSignin.hasPlayServices();
    try {
      const data = await GoogleSignin.signIn();
      if (!data) {
        console.log('Đăng nhập thất bại, vui lòng thử lại!');
        return;
      }
      dispatch(setIsLoading(true));
      const {accessToken} = await GoogleSignin.getTokens();
      const dataLogin = await AuthApi.LoginGoogle({accessToken});
      await setStorage('accessToken', dataLogin?.data?.accessToken);
      await setStorage('refreshToken', dataLogin?.data?.refreshToken);
      dispatch(setIsLoading(false));
      dispatch(setAppStatus(3));
    } catch (error) {
      if (__DEV__) {
        console.log('[App] Google Login: ', error);
      }
      return;
    }
  };

  const onLoginFacebook = async () => {
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);
    if (result.isCancelled) {
      return;
    }
    const data = await AccessToken.getCurrentAccessToken();
    if (!data) {
      return;
    }
    let accessToken: any = data.accessToken;
    dispatch(setIsLoading(true));
    const dataLogin = await AuthApi.LoginFacebook({accessToken});
    await setStorage('accessToken', dataLogin.data.accessToken);
    await setStorage('refreshToken', dataLogin.data.refreshToken);
    dispatch(setIsLoading(false));
    dispatch(setAppStatus(3));
  };

  const onAppleButtonPress = async () => {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });
    if (!appleAuthRequestResponse.identityToken) {
      throw new Error('Apple Sign-In failed - no identify token returned');
    }
    const {identityToken, nonce} = appleAuthRequestResponse;
    LogTelegram(identityToken);
  };

  return (
    <TemplateLogin>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.txtAppName}>SpendSync</Text>
        <Text style={styles.txtSlogan}>
          Don't Let Money Mix-ups Cost You Friendships, Choose SpendSync.
        </Text>
        <View style={styles.viewBtn}>
          <TouchableOpacity
            style={styles.btnLogin}
            onPress={onLoginFacebook}
            activeOpacity={0.5}>
            <IconFacebook />
          </TouchableOpacity>
          {Platform.OS === 'ios' && (
            <TouchableOpacity
              style={[styles.btnLogin]}
              onPress={onAppleButtonPress}
              activeOpacity={0.5}>
              <IconApple />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={[styles.btnLogin]}
            onPress={onLoginGoogle}
            activeOpacity={0.5}>
            <IconGoogle />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btnLogin]}
            onPress={() => dispatch(setAppStatus(3))}
            activeOpacity={0.5}>
            <IconForward />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TemplateLogin>
  );
};

export default LoginScreen;
