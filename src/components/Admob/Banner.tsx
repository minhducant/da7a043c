import React from 'react';
import {
  TestIds,
  GAMBannerAd,
  BannerAdSize,
} from 'react-native-google-mobile-ads';

export default function Banner() {
  return (
    <GAMBannerAd
      unitId={TestIds.BANNER}
      sizes={[BannerAdSize.ANCHORED_ADAPTIVE_BANNER]}
      requestOptions={{
        keywords: ['sports', 'games'],
        requestAgent: 'react-native-app',
        requestNonPersonalizedAdsOnly: true,
      }}
    />
  );
}
