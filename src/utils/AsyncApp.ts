import {useEffect} from 'react';

// import {AuthApi} from '@api/AuthApi';
// import {getFcmToken} from '@utils/Notification';
import store from '@stores/index';
import {getUserInfo, setIsLoading, getFriends} from '@stores/Config/store';

// export const registerNotification = async () => {
//   let notification_token = await getFcmToken();
//   if (notification_token) {
//     await AuthApi.registerNotification({notification_token});
//   }
// };

export const AsyncApp = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        store.dispatch(setIsLoading(true));
        await store.dispatch(getUserInfo());
        await store.dispatch(getFriends());
        store.dispatch(setIsLoading(false));
      } catch (error) {
        if (__DEV__) {
          console.log(error);
        }
      }
    };
    fetchData();
  }, []);
  return null;
};
