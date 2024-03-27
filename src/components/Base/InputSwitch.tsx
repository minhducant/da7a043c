/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef, forwardRef, useImperativeHandle} from 'react';
import {
  Text,
  View,
  TextStyle,
  TextInput,
  StyleSheet,
  StyleProp,
  TextInputProps,
} from 'react-native';
import normalize from 'react-native-normalize';

import {t} from '@i18n/index';
import color from '@styles/color';
import {showMessage} from '@utils/Toast';
import themeStyle from '@styles/theme.style';
import {CustomSwitch} from '@components/Base';

export interface InputRef {
  getValue: () => any;
  setValue: (value: any) => any;
  focus: () => void;
  blur: () => void;
  clear: () => void;
}

export interface InputProps extends TextInputProps {
  title: string;
  required?: boolean;
  valueInit?: string;
  disable?: boolean;
  handleChange?: any;
  formRef?: any;
}

export const InputSwitch = forwardRef<InputRef, InputProps>(
  ({...props}, ref) => {
    const inputRef = useRef<TextInput>(null);
    const [value, setValue] = useState(props.valueInit || true);

    useImperativeHandle(ref, () => ({
      ...inputRef.current,
      getValue: () => value,
      focus: () => inputRef.current?.focus(),
      blur: () => inputRef.current?.blur(),
      clear() {
        setValue(true);
      },
      setValue(vl: any) {
        setValue(vl);
      },
      value,
    }));

    const handleSWitch = async (vl: boolean) => {
      const cost = props.formRef.current.cost.value;
      if (!cost) {
        showMessage.warning(t("enter_amount"));
      } else {
        await props.handleChange(vl);
        setValue(vl);
      }
    };

    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          {props.title}
          {props.required && <Text style={{color: 'red'}}>{' *'}</Text>} :
        </Text>
        <CustomSwitch
          value={value}
          activeColor={color.MAIN}
          inActiveColor={'#F2F5F7'}
          setValue={handleSWitch}
        />
      </View>
    );
  },
);

const styles: any = StyleSheet.create({
  title: {
    fontSize: 18,
    fontFamily: themeStyle.FONT_FAMILY,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: normalize(16),
    marginHorizontal: normalize(30),
  },
});
