import React, {useCallback, useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  Platform,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import {
//   launchImageLibrary,
//   ImageLibraryOptions,
// } from 'react-native-image-picker';
// import QRCodeScanner from 'react-native-qrcode-scanner';
import HeaderWithTitle from '@components/Header/HeaderWithTitle';

// const options: ImageLibraryOptions = {
//   mediaType: 'photo',
//   includeBase64: true,
//   maxHeight: 200,
//   maxWidth: 200,
// };

export default function QrCodeScreen() {
  const [isLoading, setIsLoading] = useState(false);

  const onSuccess = (e: any) => {};

  // const openGallery = () => {
  //   setIsLoading(true);
  //   launchImageLibrary(options, async (response: any) => {
  //     if (response.didCancel) {
  //       setIsLoading(false);
  //       console.log('User cancelled image picker');
  //     } else if (response.error) {
  //       setIsLoading(false);
  //       console.log('ImagePicker Error: ', response.error);
  //     } else if (response.customButton) {
  //       setIsLoading(false);
  //       console.log('User tapped custom button: ', response.customButton);
  //     } else {
  //       // const res = createImageData(
  //       //   response.assets[0].base64,
  //       //   response.assets[0].type,
  //       // );
  //       // console.log(JSON.stringify(res));
  //       // onSuccess(res);
  //     }
  //   });
  // };

  return (
    <View style={styles.container}>
      <HeaderWithTitle title={'Scan QR Code'} />
      <View>
        {isLoading ? (
          <ActivityIndicator
            size="large"
            color={'black'}
            animating={isLoading}
          />
        ) : (
          <>
            {/* <QRCodeScanner
              showMarker={true}
              topViewStyle={{flex: 0}}
              containerStyle={{flex: 1}}
              cameraStyle={{
                flex: Platform.OS === 'android' ? 0.8 : 1,
                height: hp('40%'),
                width: '100%',
                justifyContent: 'flex-start',
              }}
              bottomViewStyle={{flex: 1}}
              onRead={e => onSuccess(e)}
              bottomContent={
                <TouchableOpacity
                  onPress={openGallery}
                  style={styles.buttonTouchable}>
                  <Text style={styles.buttonTextStyle}>
                    Upload from gallery.
                  </Text>
                </TouchableOpacity>
              }
            /> */}
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
