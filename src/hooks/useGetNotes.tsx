import {useRef, useEffect} from 'react';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {useSelector, useDispatch} from 'react-redux';

import {stores} from '@stores/Note/store';
import {setIsLoading} from '@stores/action';

export const useGetNotes = (isFetching = true) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const {page, data, limit, params, loading, end_data, loading_more} =
    useSelector((state: any) => state.Note);
  const paramsRef = useRef<any>(params ?? {});

  const onRefresh = async () => {
    dispatch(setIsLoading(true));
    await dispatch(
      stores.getNotes({
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
      stores.getNotes({
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
      stores.getNotes({
        page: page + 1,
        limit,
        ...paramsRef.current,
      }),
    );
    dispatch(setIsLoading(false));
  };

  useEffect(() => {
    // dispatch(stores.updateState({data: []}));
    if (isFetching) {
      onRefresh();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
