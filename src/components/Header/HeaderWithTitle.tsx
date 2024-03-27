import React from 'react';
import {
  View,
  Text,
  Platform,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import normalize from 'react-native-normalize';
import {useNavigation} from '@react-navigation/native';

import Colors from '@styles/color';
import theme from '@styles/theme.style';
import {IconHome} from '@assets/icons/index';
import {hasHomeButton} from '@utils/DeviceInfo';
import {IconLibrary} from '@components/Base/IconLibrary';

interface HeaderProps {
  title?: string;
  hasLeft?: boolean;
  hasRight?: boolean;
}

interface NavigationProps {
  navigate: (route: string, params?: {screen: string; params: any}) => void;
  canGoBack(): () => void;
  goBack: () => void;
}

const statusBarHeight = StatusBar.currentHeight;
const UPPER_HEADER_HEIGHT = 32;
const UPPER_HEADER_PADDING_TOP =
  Platform.OS === 'android'
    ? statusBarHeight !== undefined
      ? statusBarHeight + normalize(10)
      : 0
    : normalize(10);

export default function HeaderWithTitle({
  title = '',
  hasLeft = true,
  hasRight = true,
}: HeaderProps) {
  const navigation: NavigationProps = useNavigation();

  const _onGoBack = () => {
    navigation.canGoBack() ? navigation.goBack() : null;
  };

  const onGoHome = () => {
    navigation.navigate('HomeScreen');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.upperHeaderPlaceholder} />
      </SafeAreaView>
      <SafeAreaView style={styles.header}>
        <View style={styles.upperHeader}>
          <View style={styles.viewIcon}>
            {hasLeft && (
              <TouchableOpacity onPress={() => _onGoBack()}>
                <IconLibrary
                  library="Ionicons"
                  name="chevron-back"
                  size={25}
                  color={'#757575'}
                />
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <View style={styles.viewIcon}>
            {hasRight && (
              <TouchableOpacity onPress={onGoHome} activeOpacity={0.7}>
                <IconHome
                  fill="#757575"
                  width={normalize(21)}
                  height={normalize(21)}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingBottom: Platform.OS === 'android' ? normalize(10) : 0,
    // marginTop: Platform.OS === 'android' ? normalize(10) : 0,
  },
  upperHeaderPlaceholder: {
    height: UPPER_HEADER_HEIGHT + UPPER_HEADER_PADDING_TOP,
    paddingTop: UPPER_HEADER_PADDING_TOP,
  },
  header: {
    position: 'absolute',
    width: '100%',
    backgroundColor: Colors.WHITE,
  },
  upperHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: normalize(16),
    height: UPPER_HEADER_HEIGHT + UPPER_HEADER_PADDING_TOP,
    paddingTop: UPPER_HEADER_PADDING_TOP,
    borderColor: Colors.DUSTY_GRAY,
  },
  viewIcon: {
    width: normalize(28, 'height'),
    height: normalize(28, 'height'),
    marginBottom:
      Platform.OS === 'android' || hasHomeButton() ? 0 : normalize(12),
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: Platform.OS === 'android' ? 0 : normalize(2),
    borderRadius: normalize(10),
    borderColor: '#F3F4F6',
  },
  viewRight: {
    width: '20%',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  viewTitle: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontFamily: theme.FONT_BOLD,
    height: normalize(25, 'height'),
    textAlignVertical: 'center',
    textAlign: 'center',
    color: Colors.BLACK,
  },
  homeIcon: {
    width: normalize(28, 'height'),
    alignItems: 'center',
    justifyContent: 'center',
    height: normalize(45),
    // marginBottom: Platform.OS === 'android' ? 0 : normalize(15),
  },
});
