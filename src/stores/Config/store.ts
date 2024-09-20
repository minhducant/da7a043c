import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import {AuthApi} from '@api/AuthApi';
import {HomeApi} from '@api/HomeApi';

const initialState = {
  userInfo: {},
  numNotify: 0,
  appStatus: 0,
  isLoading: false,
  firebaseToken: '',
  isFirstUse: true,
  friends: [],
  darkMode: false,
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
    setFriends(state, action) {
      state.friends = action.payload;
      return state;
    },
    setDarkModes(state, action) {
      state.darkMode = action.payload;
      return state;
    },
  },
  extraReducers(builder) {
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userInfo = action.payload;
    });
    builder.addCase(getFriends.fulfilled, (state, action) => {
      state.isLoading = false;
      state.friends = action.payload;
    });
  },
});

const getUserInfo: any = createAsyncThunk('getUserInfo', async () => {
  return await AuthApi.getUserInfo({});
});

const getFriends: any = createAsyncThunk('getFriends', async () => {
  return await HomeApi.getFriends({});
});

export {getUserInfo, getFriends};

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
