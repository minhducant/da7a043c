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

import {t} from '@i18n/index';
import {copyToClipboard} from '@utils/index';
import {InputText} from '@components/Base/index';
import IconRandom from '@assets/icons/SvgIconReload';
import {utilitiesStyle as styles} from '@styles/utils.style';
import HeaderWithTitle from '@components/Header/HeaderWithTitle';

const RandomNumberScreen = () => {
  const [result, setResult] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
    const toNumberPromise = formRef.current.to.getValue();
    const fromNumberPromise = formRef.current.from.getValue();
    setIsLoading(true);
    try {
      const [toNumber, fromNumber] = await Promise.all([
        toNumberPromise,
        fromNumberPromise,
      ]);
      let resultFrom: any, resultTo: any;
      if (!fromNumber) {
        resultFrom = '1';
      } else {
        resultFrom = fromNumber;
      }
      if (!toNumber) {
        resultTo =
          Number(fromNumber) < 100
            ? '100'
            : (Number(fromNumber) + 1).toString();
      } else {
        resultTo = toNumber;
      }
      if (Number(resultFrom) > Number(resultTo)) {
        resultTo = (Number(resultFrom) + 1).toString();
      }
      await Promise.all([
        formRef.current.from.setValue(resultFrom),
        formRef.current.to.setValue(resultTo),
      ]);
      setTimeout(() => {
        setIsLoading(false);
        setResult(getRandomNumberInRange(resultFrom, resultTo));
      }, Math.round(Math.random() * (700 - 400) + 400));
    } catch (error) {
      setIsLoading(false);
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
        {isLoading ? (
          <ActivityIndicator
            size={'large'}
            color={'#EB5758'}
            style={styles.activityIndicator}
          />
        ) : result ? (
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => copyToClipboard(result)}>
            <Text style={styles.txtResultNumber}>{result}</Text>
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </ScrollView>
      <SafeAreaView>
        <TouchableOpacity
          activeOpacity={0.5}
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
