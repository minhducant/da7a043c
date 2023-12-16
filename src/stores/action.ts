import {setAccessToken, setRefreshToken} from './Authentication/store';
import {
  setNumNotify,
  setAppStatus,
  setFirebaseToken,
  setIsFirstUse,
  setUserInfo,
  setIsLoading,
} from './Config/store';
import {setData} from './Note/store';

export {
  //Authentication
  setAccessToken,
  setRefreshToken,
  //Config
  setNumNotify,
  setAppStatus,
  setFirebaseToken,
  setIsFirstUse,
  setUserInfo,
  setIsLoading,
  //Note
  setData,
};
