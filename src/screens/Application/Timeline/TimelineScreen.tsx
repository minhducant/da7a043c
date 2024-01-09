import React from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';

import HeaderWithTitle from '@components/Header/HeaderWithTitle';
import {timelineStyle as styles} from '@styles/timeline.style';

export default function TimelineScreen() {
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <HeaderWithTitle hasLeft={false} hasRight={false} title={t('')} />
    </View>
  );
}
