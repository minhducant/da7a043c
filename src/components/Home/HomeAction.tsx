import {useCallback} from 'react';
import {Platform} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';

// import {t} from '@i18n/index';
import {showMessage} from '@utils/index';

const copyToClipboard = (id: string) => {
  Clipboard.setString(id);
//   showMessage.success(t('copied_spendsync_id'));
};

const onAddNote = useCallback(
  (noteLineSheetRef: {
    current: {isActive: () => any; scrollTo: (arg0: number) => void};
  }) => {
    const isActive = noteLineSheetRef?.current?.isActive();
    if (isActive) {
      noteLineSheetRef?.current?.scrollTo(0);
    } else {
      noteLineSheetRef?.current?.scrollTo(
        Platform.OS === 'android' ? -350 : -400,
      );
    }
  },
  [],
);

export {copyToClipboard, onAddNote};
