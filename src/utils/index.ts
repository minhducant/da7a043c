import {
  setStorage,
  getStorage,
  multiRemove,
  getLanguage,
  getAccessToken,
} from './Storage';
import {LogTelegram} from './LogTelegram';
import {AsyncApp} from './AsyncApp';
import {showMessage} from './Toast';
import {
  hasHomeButton,
  isAppInBackground,
  hasInternetConnection,
} from './DeviceInfo';
import {formatYen, formatVietnamDong, formatDollar, formatMoney} from './Money';
import {copyToClipboard, onAddExpense, onAddNote} from './Note';

export {
  getAccessToken,
  getLanguage,
  LogTelegram,
  setStorage,
  getStorage,
  multiRemove,
  AsyncApp,
  showMessage,
  hasHomeButton,
  isAppInBackground,
  hasInternetConnection,
  formatYen,
  formatDollar,
  formatVietnamDong,
  formatMoney,
  copyToClipboard,
  onAddExpense,
  onAddNote,
};
