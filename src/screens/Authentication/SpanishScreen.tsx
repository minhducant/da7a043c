import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {setAppStatus} from '@stores/action';
import TemplateLogin from '@components/Auth/TemplateLogin';
import {authenticationStyle as styles} from '@styles/authentication.style';

const SpanishScreen = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector(
    (state: any) => state.Authentication.accessToken,
  );
  const isFirstUse = useSelector((state: any) => state.Config.isFirstUse);

  React.useEffect(() => {
    accessToken
      ? dispatch(setAppStatus(3))
      : isFirstUse
      ? dispatch(setAppStatus(1))
      : dispatch(setAppStatus(2));
  });

  return (
    <TemplateLogin>
      <SafeAreaView style={styles.container}>
        <Text>Đức</Text>
      </SafeAreaView>
    </TemplateLogin>
  );
};

export default SpanishScreen;
