import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import {AuthApi} from '@api/AuthApi';

const initialState = {
  userInfo: {},
  numNotify: 0,
  appStatus: 0,
  isLoading: false,
  firebaseToken: '',
  isFirstUse: true,
};

const store = createSlice({
  name: 'Config',
  initialState,
  reducers: {
    setNumNotify(state, action) {
      state.numNotify = action.payload;
      return state;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
      return state;
    },
    setFirebaseToken(state, action) {
      state.firebaseToken = action.payload;
      return state;
    },
    setIsFirstUse(state, action) {
      state.isFirstUse = action.payload;
      return state;
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload;
      return state;
    },
    setAppStatus(state, action) {
      state.appStatus = action.payload;
      return state;
    },
  },
  extraReducers(builder) {
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userInfo = action.payload;
    });
  },
});

const getUserInfo: any = createAsyncThunk('getUserInfo', async () => {
  return await AuthApi.getUserInfo({});
});

export {getUserInfo};

export const {
  setNumNotify,
  setAppStatus,
  setFirebaseToken,
  setIsFirstUse,
  setUserInfo,
  setIsLoading,
} = store.actions;

export const stores = {
  reducer: store.reducer,
  ...store.actions,
};
