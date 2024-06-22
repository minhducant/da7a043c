import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type ThemeMode = 'light' | 'dark' | 'system';

export const initialState = {
  themeMode: 'system',
  language: 'locale',
  shouldShowHelp: true,
  shouldShowNewFeature: true,
};

const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    changeThemeMode: (state, action: PayloadAction<ThemeMode>) => {
      state.themeMode = action.payload;
    },
    stopShowHelp: state => {
      state.shouldShowHelp = false;
    },
  },
});

export const settingActions = settingSlice.actions;

export const selectThemeMode = (state: any) => state.setting.themeMode;
export const selectShouldShowHelp = (state: any) =>
  state.setting.shouldShowHelp;

export default settingSlice.reducer;

export const {changeThemeMode, stopShowHelp} = settingSlice.actions;

export const stores = {
  reducer: settingSlice.reducer,
  ...settingSlice.actions,
};
