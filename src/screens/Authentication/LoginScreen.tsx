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
import auth from '@react-native-firebase/auth';
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

  const onAppleButtonPress = async () => {
    if (Platform.OS === 'android') {
      // Generate secure, random values for state and nonce
      // const rawNonce = uuid()
      // const state = uuid()
      // Configure the request
      appleAuthAndroid.configure({
        // The Service ID you registered with Apple
        clientId: 'com.ethora.service',
        // Return URL added to your Apple dev console. We intercept this redirect, but it must still match
        // the URL you provided to Apple. It can be an empty route on your backend as it's never called.
        redirectUri: 'https://ethora-668e9.firebaseapp.com/__/auth/handler',
        // The type of response requested - code, id_token, or both.
        responseType: appleAuthAndroid.ResponseType.ALL,
        // The amount of user information requested from Apple.
        scope: appleAuthAndroid.Scope.ALL,
        // Random nonce value that will be SHA256 hashed before sending to Apple.
        // nonce: rawNonce,
        // Unique state value used to prevent CSRF attacks. A UUID will be generated if nothing is provided.
        // state,
      });
      // console.log(appleAuthAndroid.isSupported)
      // Open the browser window for user sign in
      const responseFromApple = await appleAuthAndroid.signIn();
      const {id_token, nonce} = responseFromApple;
      // const appleCredentialAndroid = auth.AppleAuthProvider.credential(
      //   // id_token,
      //   nonce
      // )
      // const data = await auth().signInWithCredential(appleCredentialAndroid)
      // const hashUID = await sha256(data.user.uid)
      const user = {
        loginType: 'apple',
        authToken: id_token,
        displayName: '',
        // uid: hashUID,
        // email: data.additionalUserInfo.profile.email,
        // firstName: data.user.displayName,
        // lastName: data.user.displayName,
      };
      return user;
      // Send the authorization code to your backend for verification
    } else {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });
      // Ensure Apple returned a user identityToken
      if (!appleAuthRequestResponse.identityToken) {
        throw 'Apple Sign-In failed - no identify token returned';
      }
      // Create a Firebase credential from the response
      const {identityToken, nonce} = appleAuthRequestResponse;
      const appleCredential = auth.AppleAuthProvider.credential(
        identityToken,
        nonce,
      );
      const data = await auth().signInWithCredential(appleCredential);
      // const hashUID = await sha256(data.user.uid)
      const user = {
        loginType: 'apple',
        authToken: identityToken,
        displayName: '',
        // uid: hashUID,
        // email: data.additionalUserInfo.profile.email,
        firstName: data.user.displayName,
        lastName: data.user.displayName,
      };
      return user;
    }
  };

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
