/* eslint-disable react-native/no-inline-styles */
import React, {Ref} from 'react';
import normalize from 'react-native-normalize';
import {
  View,
  Keyboard,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {t} from '@i18n/index';
import {IconQrcode} from '@assets/icons/index';
import COLORS from '@styles/color';
import theme from '@styles/theme.style';
import {IconLibrary} from '@components/BaseComponent/IconLibrary';

interface InputProps {
  onRefresh?: () => void;
  onFocus?: () => void;
  onPressIn?: () => void;
  onSubmitEditing?: any;
  ref: Ref<any>;
}

const SearchInput: React.FC<InputProps> = React.forwardRef(
  (
    {
      onFocus = () => {},
      onPressIn = () => {},
      onRefresh = () => {},
      onSubmitEditing,
    },
    ref,
  ) => {
    const textInputRef = React.useRef<any>(null);
    const [value, setValue] = React.useState('');

    React.useImperativeHandle(ref, () => ({
      focus: () => {
        textInputRef.current.focus();
      },
      clear: () => {
        textInputRef.current.clear();
      },
      value,
      clearValue,
    }));

    const clearValue = () => {
      setValue('');
    };

    const onDelete = () => {
      setValue('');
      onRefresh();
      Keyboard.dismiss();
    };

    const handleTextSubmit = () => {
      typeof onSubmitEditing === 'function' && onSubmitEditing(value);
    };

    return (
      <View style={style.search}>
        <View style={[style.inputContainer]}>
          <IconLibrary
            library="AntDesign"
            name="search1"
            size={22}
            color={COLORS.BLACK}
            style={{
              marginRight: 10,
            }}
          />
          <TextInput
            ref={textInputRef}
            value={value}
            autoCorrect={false}
            onChangeText={setValue}
            onPressIn={() => onPressIn()}
            onFocus={() => {
              onFocus();
            }}
            onSubmitEditing={handleTextSubmit}
            placeholder={`${t('search')}...`}
            returnKeyLabel="search"
            autoCapitalize="none"
            style={{
              // color: COLORS.darkBlue,
              flex: 1,
              fontSize: 17,
              fontFamily: theme.FONT_FAMILY,
            }}
          />
          {value && (
            <TouchableOpacity onPress={onDelete}>
              <IconLibrary
                library="AntDesign"
                name="close"
                size={22}
                color={COLORS.DUSTY_GRAY}
              />
            </TouchableOpacity>
          )}
        </View>
        {/* <TouchableOpacity style={style.qrcodeBtn}>
          <IconQrcode />
        </TouchableOpacity> */}
      </View>
    );
  },
);

const style = StyleSheet.create({
  label: {
    marginBottom: normalize(10),
    fontSize: 20,
    fontFamily: theme.FONT_FAMILY,
  },
  inputContainer: {
    height: normalize(48),
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderWidth: 0.5,
    borderRadius: normalize(16),
    alignSelf: 'center',
    borderColor: '#D1D5DB',
    alignItems: 'center',
    flex: 1,
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: normalize(16),
    // marginBottom: normalize(24),
  },
  qrcodeBtn: {
    borderWidth: 0.5,
    height: normalize(48),
    borderRadius: normalize(16),
    width: normalize(48),
    alignItems: 'center',
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    backgroundColor: '#D1D5DB',
    marginLeft: normalize(16),
  },
});

export default SearchInput;
