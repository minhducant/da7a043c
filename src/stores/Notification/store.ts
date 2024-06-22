import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import {HomeApi} from '@api/HomeApi';

type props = {
  type: string;
  page: any;
  params: any;
  data: any;
  limit: any;
  time_click: any;
  loading: boolean;
  end_data: boolean;
  time_request: any;
  time_expired: any;
  loading_more: boolean;
};

const initialState: props = {
  type: '',
  page: 1,
  params: {},
  data: [],
  limit: 10,
  loading: false,
  end_data: false,
  time_request: 0,
  time_click: 1000,
  loading_more: false,
  time_expired: 10 * 60 * 1000,
};

const store = createSlice({
  name: 'Notifications',
  initialState,
  reducers: {
    setData(state, action) {
      state.data = action.payload;
      return state;
    },
    refreshState(state) {
      state = {...initialState};
      return state;
    },
    resetTime(state) {
      return state;
    },
    updateState(state, action) {
      state = {...state, ...action.payload};
      return state;
    },
    updateItem(state, action) {
      let {id} = action.payload;
      let index = state.data.findIndex((i: any) => i.id === id);
      if (index !== undefined) {
        state.data[index] = action.payload;
      }
      return state;
    },
    updateParams(state, action) {
      let params = action.payload ?? {};
      state.params = {...state.params, ...params};
      return state;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getNotifications.pending, state => {
        return state;
      })
      .addCase(
        getNotifications.fulfilled,
        (
          state,
          action: {
            payload: {data: any; status: any; page: number};
          },
        ) => {
          const {page, data} = action.payload;
          if (data?.lastPage <= page) {
            state.end_data = true;
          } else {
            state.end_data = false;
          }
          if (page === 1) {
            state.page = 1;
            state.data = data.result;
            return state;
          } else {
            state.data = state.data.concat(data.result);
            state.page = page;
            return state;
          }
        },
      );
  },
});

const getNotifications = createAsyncThunk(
  'getNotifications',
  async ({
    page,
    limit,
    title,
    status,
    ...rest
  }: {
    page: number;
    limit: number;
    title?: string;
    status?: number;
    rest?: any;
  }) => {
    const res = await HomeApi.getNotifications({
      page,
      limit,
      title,
      status,
      ...rest,
    });
    return {...res, page};
  },
);

export const {setData} = store.actions;

export const stores = {
  reducer: store.reducer,
  ...store.actions,
  getNotifications,
};
