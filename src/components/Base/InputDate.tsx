/* eslint-disable react-native/no-inline-styles */
import React, {useState, forwardRef, useRef, useImperativeHandle} from 'react';
import {useTranslation} from 'react-i18next';
import normalize from 'react-native-normalize';
import DatePicker from 'react-native-date-picker';
import {Text, Platform, StyleSheet, TouchableOpacity} from 'react-native';

import color from '@styles/color';
import themeStyle from '@styles/theme.style';
import {IconLibrary} from '@components/Base/IconLibrary';

export interface InputRef {
  getValue: () => any;
  setValue: (value: any) => any;
  clear: () => void;
}

export interface InputProps {
  title: string;
  required?: boolean;
  valueInit?: string;
  placeholder?: string;
  disable?: boolean;
}

export const InputDate = forwardRef<InputRef, InputProps>(({...props}, ref) => {
  const {t, i18n} = useTranslation();
  const inputRef = useRef(null);
  const [value, setValue] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  useImperativeHandle(ref, () => ({
    getValue: () => value,
    clear() {
      setValue(new Date());
    },
    setValue(vl: any) {
      setValue(vl);
    },
    value,
  }));

  return (
    <>
      <Text style={styles.title}>
        {props.title}
        {props.required && <Text style={{color: 'red'}}>{' *'}</Text>} :
      </Text>
      <TouchableOpacity
        style={styles.inputButton}
        onPress={() => setShowDatePicker(true)}>
        {value ? (
          <Text style={styles.timeValue}>{formatDateToDDMMYYYY(value)}</Text>
        ) : (
          <Text style={styles.placeholder}>{props.placeholder}</Text>
        )}
        <IconLibrary
          size={18}
          color="gray"
          name="calendar"
          library="FontAwesome"
        />
      </TouchableOpacity>
      <DatePicker
        modal
        mode="date"
        date={value}
        title={props.title}
        open={showDatePicker}
        onConfirm={(day: Date) => {
          setValue(day);
          setShowDatePicker(false);
        }}
        onCancel={() => {
          setShowDatePicker(false);
        }}
        cancelText={t('cancel')}
        confirmText={t('confirm')}
        maximumDate={new Date()}
        minimumDate={new Date(2000, 0, 1)}
        locale={
          i18n.language === 'vi'
            ? 'vi'
            : i18n.language === 'en'
            ? 'en'
            : i18n.language === 'ja'
            ? 'ja'
            : i18n.language === 'ko'
            ? 'ko'
            : i18n.language === 'th'
            ? 'th'
            : i18n.language === 'id'
            ? 'id'
            : i18n.language === 'hi'
            ? 'hi'
            : i18n.language === 'ar'
            ? 'ar'
            : 'en'
        }
      />
    </>
  );
});

function formatDateToDDMMYYYY(date: any) {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

const styles: any = StyleSheet.create({
  inputButton: {
    backgroundColor: color.WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: Platform.OS === 'ios' ? normalize(40) : normalize(50),
    borderRadius: normalize(15),
    overflow: 'hidden',
    paddingHorizontal: normalize(16),
    borderColor: '#9398AA',
    marginHorizontal: normalize(16),
    borderWidth: Platform.OS === 'ios' ? normalize(1.32) : normalize(3.5),
  },
  title: {
    fontSize: 18,
    marginLeft: normalize(30),
    marginVertical: normalize(16),
    marginBottom: normalize(8),
    fontFamily: themeStyle.FONT_FAMILY,
  },
  timeValue: {
    fontSize: 18,
    // marginVertical: normalize(10),
    fontFamily: themeStyle.FONT_FAMILY,
  },
  placeholder: {
    fontSize: 15,
    color: 'gray',
    fontFamily: themeStyle.FONT_FAMILY,
  },
});
