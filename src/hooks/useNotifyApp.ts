import React, {useRef, useEffect, useState} from 'react';
import {AppState} from 'react-native';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {useSelector, useDispatch} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';

import {setIsLoading} from '@stores/action';
import {stores} from '@stores/Notification/store';

export const useNotifyApp = (isFetching = true) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const {page, data, limit, params, loading, end_data, loading_more} =
    useSelector((state: any) => state.Notification);
  const paramsRef = useRef<any>(params ?? {});
  const [appState, setAppState] = useState(AppState.currentState);

  const onRefresh = async () => {
    dispatch(setIsLoading(true));
    await dispatch(
      stores.getNotifications({
        page: 1,
        limit,
      }),
    );
    dispatch(setIsLoading(false));
  };

  const updateParamsRef = async (e = {}) => {
    dispatch(setIsLoading(true));
    paramsRef.current = {...paramsRef.current, ...e};
    dispatch(stores.updateParams({...paramsRef.current, ...e}));
    await dispatch(
      stores.getNotifications({
        page: page,
        limit,
        ...paramsRef.current,
      }),
    );
    dispatch(setIsLoading(false));
  };

  const onLoadMore = async () => {
    if (loading_more || end_data) {
      return;
    }
    dispatch(setIsLoading(true));
    await dispatch(
      stores.getNotifications({
        page: page + 1,
        limit,
        ...paramsRef.current,
      }),
    );
    dispatch(setIsLoading(false));
  };

  useFocusEffect(
    React.useCallback(() => {
      onRefresh();
    }, []),
  );

  useEffect(() => {
    const appStateListener = AppState.addEventListener(
      'change',
      nextAppState => {
        if (
          appState.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
          onRefresh();
        }
        setAppState(nextAppState);
      },
    );
    return () => {
      appStateListener?.remove();
    };
  }, [appState, page, dispatch]);

  return {
    data,
    params,
    loading,
    end_data,
    onRefresh,
    onLoadMore,
    loading_more,
    updateParamsRef,
  };
};
