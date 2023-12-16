/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {View, Vibration} from 'react-native';
// import {Camera, CameraType} from 'react-native-camera-kit';

function ScanScreen() {
  const {t} = useTranslation();
  const cameraRef = useRef(null);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {/* <Camera
        ref={cameraRef}
        style={{flex: 1}}
        cameraType={CameraType.Back}
        flashMode="off"
        scanBarcode
        frameColor="white"
        laserColor="red"
        showFrame={true}
        onReadCode={(event: {nativeEvent: {codeStringValue: any}}) => {
          Vibration.vibrate(100);
          console.log('barcode', event.nativeEvent.codeStringValue);
        }}
      /> */}
    </View>
  );
}

export default ScanScreen;
