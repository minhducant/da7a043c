/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef} from 'react';
import {
  Text,
  Keyboard,
  Platform,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import {useTranslation} from 'react-i18next';

import {InputText} from '@components/Base/index';
import IconRandom from '@assets/icons/SvgIconReload';
import {utilitiesStyle as styles} from '@styles/utils.style';
import HeaderWithTitle from '@components/Header/HeaderWithTitle';

const RandomNumberScreen = () => {
  const {t} = useTranslation();
  const [result, setResult] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const randomLabel = {
    from: {
      title: t('from'),
      valueInit: '1',
      required: true,
    },
    to: {
      title: t('to'),
      valueInit: '100',
      required: true,
    },
  };
  const formRef = useRef<any>({...randomLabel});

  const getRandomNumberInRange = (
    minString: string,
    maxString: string,
  ): number => {
    const min = parseFloat(minString);
    const max = parseFloat(maxString);
    const randomNumber = Math.round(Math.random() * (max - min) + min);
    return randomNumber;
  };

  const onGenerate = async () => {
    Keyboard.dismiss();
    const toNumber = await formRef.current.to.getValue();
    const fromNumber = await formRef.current.from.getValue();
    setIsLoading(true);
    if (!toNumber && !fromNumber) {
      await Promise.all([
        formRef.current.from.setValue('1'),
        formRef.current.to.setValue('100'),
      ]);
      setIsLoading(false);
      setResult(getRandomNumberInRange('1', '100'));
    } else if (!fromNumber) {
      await formRef.current.from.setValue('1');
      setResult(getRandomNumberInRange('1', toNumber));
    } else if (!toNumber) {
      const to_number =
        Number(fromNumber) < 100 ? '100' : (Number(fromNumber) + 1).toString();
      await formRef.current.to.setValue(to_number);
      setIsLoading(false);
      setResult(getRandomNumberInRange(fromNumber, to_number));
    } else if (Number(fromNumber) > Number(toNumber)) {
      await formRef.current.to.setValue((Number(fromNumber) + 1).toString());
      setIsLoading(false);
      setResult(
        getRandomNumberInRange(fromNumber, (Number(fromNumber) + 1).toString()),
      );
    } else {
      setIsLoading(false);
      setResult(getRandomNumberInRange(fromNumber, toNumber));
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <HeaderWithTitle title={t('random_number')} />
      <ScrollView
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollView}>
        <IconRandom />
        <Text style={styles.txtHeaderRadom}>{t('select_range')}</Text>
        <InputText
          {...randomLabel.from}
          keyboardType="numeric"
          ref={(ref: any) => (formRef.current.from = ref)}
        />
        <InputText
          {...randomLabel.to}
          keyboardType="numeric"
          ref={(ref: any) => (formRef.current.to = ref)}
        />
        <Text style={styles.txtResultRadom}>{t('result')}:</Text>
        {isLoading && (
          <ActivityIndicator size={'large'} style={styles.activityIndicator} />
        )}
        {result && <Text>{result}</Text>}
      </ScrollView>
      <SafeAreaView>
        <TouchableOpacity
          style={[
            styles.viewGenerate,
            {backgroundColor: isLoading ? 'gray' : '#EB5758'},
          ]}
          onPress={onGenerate}
          disabled={isLoading}>
          <Text style={styles.txtGenerate}>{t('generate')}</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default RandomNumberScreen;
