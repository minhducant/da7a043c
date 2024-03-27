/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef, forwardRef, useImperativeHandle} from 'react';
import {
  View,
  Text,
  Platform,
  TextStyle,
  TextInput,
  StyleSheet,
  StyleProp,
  TextInputProps,
} from 'react-native';
import normalize from 'react-native-normalize';

import color from '@styles/color';
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
  style?: StyleProp<TextStyle>;
}

export const InputText = forwardRef<InputRef, InputProps>(
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

    return (
      <View>
        <Text style={[styles.title, style]}>
          {props.title}
          {props.required && <Text style={{color: 'red'}}>{' *'}</Text>} :
        </Text>
        <View style={styles.inputButton}>
          <TextInput
            multiline={props.multiline}
            editable={!props.disable}
            ref={inputRef}
            value={value}
            keyboardType={props.keyboardType || 'default'}
            textAlignVertical="top"
            onChangeText={setValue}
            enterKeyHint="done"
            placeholder={props.placeholder}
            style={[
              styles.input,
              {
                minHeight: props.multiline ? normalize(130) : normalize(30),
              },
            ]}
            {...props}
          />
        </View>
      </View>
    );
  },
);

const styles: any = StyleSheet.create({
  input: {
    color: color.BLACK,
    fontSize: 18,
    margin: normalize(5),
    fontFamily: themeStyle.FONT_FAMILY,
  },
  inputButton: {
    minHeight: normalize(40),
    borderRadius: normalize(15),
    overflow: 'hidden',
    paddingHorizontal: normalize(10),
    borderColor: '#9398AA',
    marginHorizontal: normalize(16),
    borderWidth: Platform.OS === 'ios' ? normalize(1.32) : normalize(3.5),
  },
  title: {
    fontSize: 18,
    marginLeft: normalize(30),
    marginBottom: normalize(8),
    marginVertical: normalize(16),
    fontFamily: themeStyle.FONT_FAMILY,
  },
});
