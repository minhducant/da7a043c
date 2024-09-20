import {store} from '@stores/index';
import {multiRemove} from '@utils/Storage';
import {setData, setAppStatus} from '@stores/action';

export const onLogout = async () => {
  store.dispatch(setData([]));
  await multiRemove(['accessToken', 'refreshToken']);
  store.dispatch(setAppStatus(2));
};
