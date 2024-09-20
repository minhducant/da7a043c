import React, {useState} from 'react';
import {Text, View, SafeAreaView, TouchableOpacity} from 'react-native';

import {t} from '@i18n/index';
import {utilitiesStyle as styles} from '@styles/utils.style';
import HeaderWithTitle from '@components/Header/HeaderWithTitle';

interface ButtonProps {
  onPress: () => void;
  title: string;
  isBlue?: boolean;
  isGray?: boolean;
}

export default function CalculatorScreen() {
  const [theme, setTheme] = useState('light');
  const [operation, setOperation] = useState('');
  const [firstNumber, setFirstNumber] = useState('');
  const [secondNumber, setSecondNumber] = useState('');
  const [result, setResult] = useState<Number | null>(null);

  function Button({title, onPress, isBlue, isGray}: ButtonProps) {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={
          isBlue
            ? styles.btnBlueCalculator
            : isGray
            ? styles.btnGrayCalculator
            : theme === 'light'
            ? styles.btnLightCalculator
            : styles.btnDarkCalculator
        }
        onPress={onPress}>
        <Text
          style={
            isBlue || isGray
              ? styles.smallTextLightCalculator
              : theme === 'dark'
              ? styles.smallTextLightCalculator
              : styles.smallTextDarkCalculator
          }>
          {title}
        </Text>
      </TouchableOpacity>
    );
  }

  const handleNumberPress = (buttonValue: string) => {
    if (firstNumber.length < 10) {
      setFirstNumber(firstNumber + buttonValue);
    }
  };

  const handleOperationPress = (buttonValue: string) => {
    setOperation(buttonValue);
    setSecondNumber(firstNumber);
    setFirstNumber('');
  };

  const clear = () => {
    setFirstNumber('');
    setSecondNumber('');
    setOperation('');
    setResult(null);
  };

  const firstNumberDisplay = () => {
    if (result !== null) {
      return (
        <Text
          style={
            result.valueOf() < 99999
              ? [styles.screenFirstNumberCalculator, {color: '#46D5B2'}]
              : [
                  styles.screenFirstNumberCalculator,
                  {fontSize: 50, color: '#46D5B2'},
                ]
          }>
          {result?.toString()}
        </Text>
      );
    }
    if (firstNumber && firstNumber.length < 6) {
      return (
        <Text style={styles.screenFirstNumberCalculator}>{firstNumber}</Text>
      );
    }
    if (firstNumber === '') {
      return <Text style={styles.screenFirstNumberCalculator}>{'0'}</Text>;
    }
    if (firstNumber.length > 5 && firstNumber.length < 8) {
      return (
        <Text style={[styles.screenFirstNumberCalculator, {fontSize: 70}]}>
          {firstNumber}
        </Text>
      );
    }
    if (firstNumber.length > 7) {
      return (
        <Text style={[styles.screenFirstNumberCalculator, {fontSize: 50}]}>
          {firstNumber}
        </Text>
      );
    }
  };

  const getResult = () => {
    switch (operation) {
      case '+':
        clear();
        setResult(parseInt(secondNumber) + parseInt(firstNumber));
        break;
      case '-':
        clear();
        setResult(parseInt(secondNumber) - parseInt(firstNumber));
        break;
      case '*':
        clear();
        setResult(parseInt(secondNumber) * parseInt(firstNumber));
        break;
      case '/':
        clear();
        setResult(parseInt(secondNumber) / parseInt(firstNumber));
        break;
      default:
        clear();
        setResult(0);
        break;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderWithTitle title={t('calculator')} />
      <View style={styles.viewBottomCalculator}>
        <View
          style={{
            height: 120,
            width: '100%',
            alignSelf: 'center',
            paddingHorizontal: 20,
            justifyContent: 'flex-end',
          }}>
          <Text style={styles.screenSecondNumberCalculator}>
            {secondNumber}
            <Text style={{color: 'purple', fontSize: 50, fontWeight: '500'}}>
              {operation}
            </Text>
          </Text>
          {firstNumberDisplay()}
        </View>
        <View style={styles.rowCalculator}>
          <Button title="C" isGray onPress={clear} />
          <Button
            title="+/-"
            isGray
            onPress={() => handleOperationPress('+/-')}
          />
          <Button
            title="％"
            isGray
            onPress={() => handleOperationPress('％')}
          />
          <Button title="÷" isBlue onPress={() => handleOperationPress('/')} />
        </View>
        <View style={styles.rowCalculator}>
          <Button title="7" onPress={() => handleNumberPress('7')} />
          <Button title="8" onPress={() => handleNumberPress('8')} />
          <Button title="9" onPress={() => handleNumberPress('9')} />
          <Button title="×" isBlue onPress={() => handleOperationPress('*')} />
        </View>
        <View style={styles.rowCalculator}>
          <Button title="4" onPress={() => handleNumberPress('4')} />
          <Button title="5" onPress={() => handleNumberPress('5')} />
          <Button title="6" onPress={() => handleNumberPress('6')} />
          <Button title="-" isBlue onPress={() => handleOperationPress('-')} />
        </View>
        <View style={styles.rowCalculator}>
          <Button title="1" onPress={() => handleNumberPress('1')} />
          <Button title="2" onPress={() => handleNumberPress('2')} />
          <Button title="3" onPress={() => handleNumberPress('3')} />
          <Button title="+" isBlue onPress={() => handleOperationPress('+')} />
        </View>
        <View style={styles.rowCalculator}>
          <Button title="." onPress={() => handleNumberPress('.')} />
          <Button title="0" onPress={() => handleNumberPress('0')} />
          <Button
            title="⌫"
            onPress={() => setFirstNumber(firstNumber.slice(0, -1))}
          />
          <Button title="=" isBlue onPress={() => getResult()} />
        </View>
      </View>
    </SafeAreaView>
  );
}
