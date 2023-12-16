import React from 'react';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {SafeAreaView, Text, TouchableOpacity} from 'react-native';
// import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

import {AuthApi} from '@api/AuthApi';
import {setStorage, LogTelegram} from '@utils/index';
import {setAppStatus, setIsLoading} from '@stores/action';
import {IconFacebook, IconGoogle} from '@assets/icons/index';
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
      LogTelegram(accessToken);
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
    // const result = await LoginManager.logInWithPermissions([
    //   'public_profile',
    //   'email',
    // ]);
    // if (result.isCancelled) {
    //   return;
    // }
    // const data = await AccessToken.getCurrentAccessToken();
    // if (!data) {
    //   return;
    // }
    // let accessToken: any = data.accessToken;
    // LogTelegram(accessToken);
    // dispatch(setIsLoading(true));
    // const dataLogin = await AuthApi.LoginFacebook({accessToken});
    // await setStorage('accessToken', dataLogin.data.accessToken);
    // await setStorage('refreshToken', dataLogin.data.refreshToken);
    // dispatch(setIsLoading(false));
    // dispatch(setAppStatus(3));
  };

  return (
    <TemplateLogin>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          style={styles.btnLogin}
          onPress={onLoginFacebook}
          activeOpacity={0.5}>
          <IconFacebook />
          <Text style={styles.txtLogin}>{t('login_with_facebook')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btnLogin]}
          onPress={onLoginGoogle}
          activeOpacity={0.5}>
          <IconGoogle />
          <Text style={styles.txtLogin}>{t('login_with_google')}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => dispatch(setAppStatus(3))}>
          <Text style={styles.txtLogin}>Để sau</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </TemplateLogin>
  );
};

export default LoginScreen;
