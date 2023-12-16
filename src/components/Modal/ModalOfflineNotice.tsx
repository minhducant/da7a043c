import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useNetInfo} from '@react-native-community/netinfo';

const OfflineNotice = () => {
  const netInfo = useNetInfo();
  if (netInfo.type !== 'unknown' && netInfo.isInternetReachable === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No Internet Connection</Text>
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    zIndex: 1,
  },
  image: {
    height: 500,
    width: 500,
  },
  text: {
    fontSize: 25,
  },
});

export default OfflineNotice;
