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
import {useSelector} from 'react-redux';
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
    const userInfo = useSelector((state: any) => state.Config.userInfo);
    const [members, setMembers] = useState<any>(
      props?.data.length > 0
        ? props?.data
        : Object.keys(userInfo).length !== 0
        ? [
            {
              _id: userInfo._id,
              name: userInfo.name,
              image_url: userInfo?.image_url,
              user_id: userInfo.user_id,
              permission: 0,
            },
          ]
        : [],
    );

    useImperativeHandle(ref, () => ({
      members,
      getValue: () => members,
      setData: (member: any) => {
        setMembers(member);
      },
    }));

    const onShowMemberSheet = useCallback(() => {
      const isActive = props?.memberSheetRef?.current?.isActive();
      if (isActive) {
        props?.memberSheetRef?.current?.scrollTo(0);
      } else {
        props?.memberSheetRef?.current?.scrollTo(
          -(themeStyle.height * 80) / 100,
        );
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const addButton = () => {
      return (
        <TouchableOpacity onPress={onShowMemberSheet}>
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
        <View key={index} style={styles.viewMembers}>
          <View style={styles.avatarFrame}>
            <Text style={styles.txtAvatar}>{item.name.charAt(0)}</Text>
          </View>
          <Text style={styles.txtNameMember} numberOfLines={2}>
            {item.name}
          </Text>
          {userInfo._id !== item._id && (
            <TouchableOpacity
              activeOpacity={0.6}
              // onPress={() => removeItemByIndex(index)}
              style={styles.deleteMember}>
              <IconLibrary size={12} library="AntDesign" name="close" />
            </TouchableOpacity>
          )}
        </View>
      );
    };

    return (
      <View>
        <Text style={styles.title}>{props.title} :</Text>
        <FlatList
          horizontal
          data={members}
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
    // marginRight: normalize(10),
    marginBottom: normalize(10),
  },
  txtAdd: {
    color: '#6763FD',
    alignSelf: 'center',
    marginTop: normalize(5),
    fontFamily: themeStyle.FONT_FAMILY,
  },
  txtTitleMember: {
    fontSize: 16,
    fontFamily: themeStyle.FONT_BOLD,
  },
  avatarFrame: {
    height: normalize(50),
    width: normalize(50),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999999999,
    marginBottom: normalize(10),
    backgroundColor: '#6763FD',
  },
  txtNameMember: {
    fontSize: 16,
    textAlign: 'center',
    alignSelf: 'center',
    fontFamily: themeStyle.FONT_FAMILY,
  },
  viewMembers: {
    marginLeft: normalize(10),
    width: normalize(70),
    alignItems: 'center',
    height: normalize(110),
  },
  txtAvatar: {
    fontSize: 20,
    color: '#FFFFFF',
    textAlign: 'center',
    alignSelf: 'center',
    fontFamily: themeStyle.FONT_BOLD,
  },
  deleteMember: {
    position: 'absolute',
    height: normalize(20),
    width: normalize(20),
    borderRadius: 999999999,
    backgroundColor: 'white',
    right: normalize(10),
    top: normalize(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default InputMember;
