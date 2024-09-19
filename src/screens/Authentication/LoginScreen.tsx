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
import {login, Constants} from 'react-native-zalo-kit';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import {
  appleAuth,
  appleAuthAndroid,
} from '@invertase/react-native-apple-authentication';
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
import TemplateLogin from '@components/Auth/TemplateLogin';
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
      // dispatch(setIsLoading(true));
      const {accessToken} = await GoogleSignin.getTokens();
      // console.log(accessToken);
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
    // LoginManager.logOut();
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
    // dispatch(setIsLoading(true));
    console.log(accessToken);
    const dataLogin = await AuthApi.LoginFacebook({accessToken});
    await setStorage('accessToken', dataLogin.data.accessToken);
    await setStorage('refreshToken', dataLogin.data.refreshToken);
    dispatch(setIsLoading(false));
    dispatch(setAppStatus(3));
  };

  const onAppleButtonPress = async () => {};

  const onLoginZalo = async () => {
    try {
      const oauthCode: any = await login(Constants.AUTH_VIA_APP_OR_WEB);
      let accessToken: any = oauthCode.accessToken;
      dispatch(setIsLoading(true));
      console.log(accessToken);
      const dataLogin = await AuthApi.LoginZalo({accessToken});
      await setStorage('accessToken', dataLogin.data.accessToken);
      await setStorage('refreshToken', dataLogin.data.refreshToken);
      dispatch(setIsLoading(false));
      dispatch(setAppStatus(3));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TemplateLogin>
      <SafeAreaView style={styles.container}>
        <StatusBar />
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
          {/* {Platform.OS === 'ios' && ( */}
          <TouchableOpacity
            style={[styles.btnLogin]}
            onPress={onLoginZalo}
            activeOpacity={0.5}>
            <IconApple />
          </TouchableOpacity>
          {/* )} */}
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
