import {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import {getUserInfo, setIsLoading} from '@stores/Config/store';

export const AsyncApp = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(setIsLoading(true));
        await dispatch(getUserInfo());
        dispatch(setIsLoading(false));
      } catch (error) {
        if (__DEV__) {
          console.log(error);
        }
      }
    };
    fetchData();
  }, [dispatch]);
  return null;
};
