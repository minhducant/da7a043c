/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef, forwardRef, useImperativeHandle} from 'react';
import {
  View,
  Text,
  TextStyle,
  TextInput,
  StyleSheet,
  StyleProp,
  TextInputProps,
} from 'react-native';
import normalize from 'react-native-normalize';

import color from '@styles/color';
import {Currency} from '@configs/AppUnum';
import themeStyle from '@styles/theme.style';

export interface InputRef {
  getValue: () => any;
  setValue: (value: string) => any;
  focus: () => void;
  blur: () => void;
  clear: () => void;
}

export interface InputProps extends TextInputProps {
  title: string;
  required?: boolean;
  valueInit?: string;
  placeholder?: string;
  disable?: boolean;
  multiline?: boolean;
  currency?: number;
  style?: StyleProp<TextStyle>;
}

export const InputMoney = forwardRef<InputRef, InputProps>(
  ({style, ...props}, ref) => {
    const inputRef = useRef<TextInput>(null);
    const [value, setValue] = useState(props.valueInit || '');

    useImperativeHandle(ref, () => ({
      ...inputRef.current,
      getValue: () => value,
      focus: () => inputRef.current?.focus(),
      blur: () => inputRef.current?.blur(),
      clear() {
        setValue('');
      },
      setValue(vl: string) {
        setValue(vl);
      },
      value,
    }));

    const formatNumber = (numberString: string): string => {
      const parts = numberString.split(',');
      const integerPart = parts[0].replace(/\./g, '');
      const formattedInteger = integerPart
        .split('')
        .reverse()
        .reduce((acc, digit, index) => {
          if (index > 0 && index % 3 === 0) {
            acc.push('.');
          }
          acc.push(digit);
          return acc;
        }, [] as string[])
        .reverse()
        .join('');
      let formattedDecimal = '';
      if (parts.length > 1) {
        formattedDecimal = `,${parts[1].replace(/,.*/, '')}`;
      }
      return formattedInteger + formattedDecimal;
    };

    return (
      <View style={styles.inputButton}>
        <TextInput
          multiline={props.multiline}
          editable={!props.disable}
          ref={inputRef}
          // value={value}
          value={formatNumber(value)}
          keyboardType={'decimal-pad'}
          textAlignVertical="top"
          textAlign="center"
          onChangeText={setValue}
          contextMenuHidden
          placeholder={props.placeholder}
          enterKeyHint="next"
          style={[
            styles.input,
            {
              minHeight: props.multiline ? normalize(130) : normalize(40),
            },
          ]}
          {...props}
        />
        {/* <Text style={styles.currency}>VNĐ</Text> */}
      </View>
    );
  },
);

const styles: any = StyleSheet.create({
  input: {
    color: color.BLACK,
    fontSize: 34,
    margin: normalize(5),
    flex: 1,
    fontFamily: themeStyle.FONT_FAMILY,
  },
  inputButton: {
    overflow: 'hidden',
    paddingHorizontal: normalize(10),
    borderColor: '#9398AA',
    marginHorizontal: normalize(16),
    justifyContent: 'center',
    marginTop: normalize(16),
    flexDirection: 'row',
  },
  title: {
    fontSize: 18,
    marginLeft: normalize(30),
    marginVertical: normalize(16),
    fontFamily: themeStyle.FONT_FAMILY,
  },
  currency: {
    fontSize: 14,
    // marginLeft: normalize(16),
    fontFamily: themeStyle.FONT_FAMILY,
  },
});
