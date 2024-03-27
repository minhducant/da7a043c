/* eslint-disable react-native/no-inline-styles */
import React, {Ref} from 'react';
import {useTranslation} from 'react-i18next';
import normalize from 'react-native-normalize';
import {
  View,
  Text,
  Keyboard,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import COLORS from '@styles/color';
import theme from '@styles/theme.style';
import {IconLibrary} from '@components/Base/IconLibrary';

interface InputProps {
  onRefresh?: () => void;
  onFocus?: () => void;
  onPressIn?: () => void;
  onChange?: any;
  onSubmitEditing?: any;
  ref: Ref<any>;
  onAddNew?: any;
}

const SearchMember: React.FC<InputProps> = React.forwardRef(
  (
    {
      onFocus = () => {},
      onPressIn = () => {},
      onRefresh = () => {},
      onAddNew = () => {},
      onChange = () => {},
      onSubmitEditing,
    },
    ref,
  ) => {
    const {t} = useTranslation();
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

    const onChangeText = (text: React.SetStateAction<string>) => {
      setValue(text);
      typeof onChange === 'function' && onChange(text);
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
            onChangeText={onChangeText}
            onPressIn={() => onPressIn()}
            onFocus={() => {
              onFocus();
            }}
            onSubmitEditing={handleTextSubmit}
            placeholder={`${t('who_sharing_the_bill')}...`}
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
        <TouchableOpacity
          onPress={() => {
            onAddNew(value);
            setValue('');
          }}>
          <Text style={style.txtAdd}>{t('add')}</Text>
        </TouchableOpacity>
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
    height: normalize(40),
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderWidth: 0.5,
    borderRadius: normalize(13),
    alignSelf: 'center',
    borderColor: '#D1D5DB',
    alignItems: 'center',
    flex: 1,
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: normalize(16),
    // marginTop: 0,
    marginBottom: normalize(16),
    marginVertical: normalize(10),
  },
  txtAdd: {
    fontSize: 15,
    color: '#6763FD',
    fontFamily: theme.FONT_BOLD,
    marginLeft: normalize(16),
  },
});

export default SearchMember;
