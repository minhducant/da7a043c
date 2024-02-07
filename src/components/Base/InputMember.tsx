import React, {
  useState,
  forwardRef,
  useCallback,
  useImperativeHandle,
} from 'react';
import {
  View,
  Text,
  Platform,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import normalize from 'react-native-normalize';

import {t} from '@i18n/index';
import themeStyle from '@styles/theme.style';
import {IconLibrary} from '@components/Base/index';

export interface InputRef {}

export interface InputProps {
  data: any;
  title: string;
  memberSheetRef: any;
}

export const InputMember = forwardRef<InputRef, InputProps>(
  ({...props}, ref) => {
    const [data, setData] = useState(props.data || []);

    useImperativeHandle(ref, () => ({
      data,
      setData: (member: any) => {
        setData(member);
      },
    }));

    const onShowColorSheet = useCallback(() => {
      const isActive = props?.memberSheetRef?.current?.isActive();
      if (isActive) {
        props?.memberSheetRef?.current?.scrollTo(0);
      } else {
        props?.memberSheetRef?.current?.scrollTo(
          Platform.OS === 'android' ? -600 : -740,
        );
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const addButton = () => {
      return (
        <TouchableOpacity onPress={onShowColorSheet}>
          <View style={styles.addButton}>
            <IconLibrary
              size={20}
              library="Ionicons"
              name="person-add"
              color={'#6763FD'}
            />
          </View>
          <Text style={styles.txtAdd}>{t('add')}</Text>
        </TouchableOpacity>
      );
    };

    const renderMembers = ({item, index}: any) => {
      return (
        <View key={index}>
          <Text>{item}</Text>
        </View>
      );
    };

    return (
      <View>
        <Text style={styles.title}>{props.title} :</Text>
        <FlatList
          horizontal
          data={data}
          stickyHeaderIndices={[0]}
          renderItem={renderMembers}
          ListHeaderComponent={addButton}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => `${index}`}
          contentContainerStyle={styles.contentContainer}
        />
      </View>
    );
  },
);

const styles: any = StyleSheet.create({
  title: {
    fontSize: 18,
    marginLeft: normalize(30),
    marginVertical: normalize(16),
    fontFamily: themeStyle.FONT_FAMILY,
  },
  contentContainer: {
    marginHorizontal: normalize(24),
  },
  addButton: {
    height: normalize(45),
    width: normalize(45),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 999999999,
    borderColor: '#6763FD',
    borderCurve: 'continuous',
    borderStyle: 'dashed',
  },
  txtAdd: {
    color: '#6763FD',
    alignSelf: 'center',
    marginTop: normalize(5),
    fontFamily: themeStyle.FONT_FAMILY,
  },
});

export default InputMember;
