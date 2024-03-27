/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef, forwardRef, useImperativeHandle} from 'react';
import normalize from 'react-native-normalize';
import {Dropdown} from 'react-native-element-dropdown';
import {View, Text, StyleSheet, Platform} from 'react-native';

import color from '@styles/color';
import themeStyle from '@styles/theme.style';

export interface InputRef {
  getValue: () => any;
  setValue: (value: string) => any;
  focus: () => void;
  blur: () => void;
  clear: () => void;
}

export interface InputProps {
  search?: boolean;
  disable?: boolean;
  data: Array<any>;
  title?: string;
  required?: boolean;
  valueInit?: string;
  placeholder?: string;
  titleSelect?: string;
  onSelected?: (item: any) => void;
}

export const InputSelect = forwardRef<InputRef, InputProps>(
  ({...props}, ref) => {
    const inputRef = useRef<any>(null);
    const [isFocus, setIsFocus] = useState(false);
    const [value, setValue] = useState<any>(props.valueInit || null);

    useImperativeHandle(ref, () => ({
      ...inputRef.current,
      getValue: () => value,
      focus: () => inputRef.current?.focus(),
      blur: () => inputRef.current?.blur(),
      clear() {
        setValue('');
      },
      setValue(item: any) {
        setValue(item);
        setIsFocus(false);
        props.onSelected && props.onSelected(item);
      },
      value,
    }));

    return (
      <View style={styles.inputContainer}>
        <Text style={styles.title}>
          {props.title}
          {props.required && <Text style={{color: 'red'}}>{' *'}</Text>} :
        </Text>
        <Dropdown
          search={props.search}
          data={props.data || []}
          ref={inputRef}
          value={value}
          mode="auto"
          labelField="name"
          valueField="name"
          onChange={item => {
            setValue(item);
            setIsFocus(false);
            props.onSelected && props.onSelected(item);
          }}
          disable={props.disable}
          activeColor={color.SILVER}
          maxHeight={normalize(300)}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          itemTextStyle={styles.textStyle}
          selectedTextStyle={styles.textStyle}
          searchPlaceholder={props.titleSelect}
          containerStyle={styles.containerStyle}
          inputSearchStyle={styles.inputSearchStyle}
          placeholder={!isFocus ? props.placeholder : '...'}
          placeholderStyle={[styles.textStyle, {color: 'gray'}]}
          style={[styles.dropdown, isFocus && {borderColor: 'red'}]}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  inputContainer: {
    overflow: 'hidden',
  },
  title: {
    fontSize: 18,
    marginLeft: normalize(30),
    marginVertical: normalize(16),
    marginBottom: normalize(8),
    fontFamily: themeStyle.FONT_FAMILY,
  },
  dropdown: {
    minHeight: normalize(43),
    borderRadius: normalize(15),
    overflow: 'hidden',
    paddingHorizontal: normalize(10),
    marginHorizontal: normalize(16),
    borderColor: '#9398AA',
    borderWidth: Platform.OS === 'ios' ? normalize(1.32) : normalize(3.5),
  },
  textStyle: {
    fontSize: 18,
    fontFamily: themeStyle.FONT_FAMILY,
    margin: normalize(5),
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 18,
    fontFamily: themeStyle.FONT_FAMILY,
  },
  containerStyle: {},
});
