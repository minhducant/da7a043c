import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {
  Text,
  View,
  // TextInput,
  Platform,
  FlatList,
  UIManager,
  StyleSheet,
  LayoutAnimation,
  TouchableOpacity,
} from 'react-native';
import normalize from 'react-native-normalize';

import color from '@styles/color';
import themeStyle from '@styles/theme.style';
import {IconLibrary} from '@components/Base';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export interface InputRef {
  clear: () => void;
  getValue: () => any;
  setValue: (value: any) => any;
}

export interface InputProps {
  data: any;
  formRef?: any;
  splitEvenly?: boolean;
  setSplitEvenly?: any;
}

export const TableSplit = forwardRef<InputRef, InputProps>(
  ({...props}, ref) => {
    const [value, setValue] = useState(props.data || []);

    useImperativeHandle(ref, () => ({
      getValue: () => value,
      clear() {
        setValue([]);
      },
      setValue(vl: any) {
        setValue(vl);
      },
      value,
    }));

    useEffect(() => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }, [props.splitEvenly]);

    const onDelete = (index: number) => {
      const updatedValue = [...value];
      updatedValue.splice(index, 1);
      if (updatedValue.length === 0) {
        props.setSplitEvenly(true);
        props.formRef.current.split_evenly.setValue(true);
      }
      setValue(updatedValue);
    };

    const renderItem = ({item, index}: any) => {
      return (
        <View key={index} style={styles.itemContainer}>
          <Text style={styles.indexText}>{index + 1}</Text>
          <Text style={styles.nameText}>{item.name}</Text>
          <View style={styles.inputMoney}></View>
          <TouchableOpacity
            style={styles.iconDelete}
            onPress={() => onDelete(index)}>
            <IconLibrary size={24} color="red" name={'close'} />
          </TouchableOpacity>
        </View>
      );
    };

    return (
      <View style={[styles.container, {minHeight: props.splitEvenly ? 0 : 40}]}>
        <FlatList
          data={value}
          scrollEnabled={false}
          renderItem={renderItem}
          keyExtractor={(_, index) => `${index}`}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  },
);

const styles: any = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: normalize(1),
    borderColor: '#E0E0E0',
    paddingVertical: normalize(16),
  },
  indexText: {
    flex: 0.8,
    fontSize: 16,
    textAlign: 'center',
    fontFamily: themeStyle.FONT_FAMILY,
  },
  nameText: {
    flex: 3,
    fontSize: 16,
    fontFamily: themeStyle.FONT_FAMILY,
  },
  inputMoney: {
    flex: 3,
  },
  iconDelete: {
    marginHorizontal: normalize(8),
  },
  container: {
    backgroundColor: color.WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: normalize(0),
    borderRadius: normalize(15),
    overflow: 'hidden',
    borderColor: '#9398AA',
    marginHorizontal: normalize(16),
    marginTop: normalize(16),
    borderWidth: Platform.OS === 'ios' ? normalize(1.32) : normalize(3.5),
  },
});
