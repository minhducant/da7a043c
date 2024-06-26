import {useSelector} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import rootReducer from './stores';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export {store, persistor};

export default store;

export type StoreType = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useStoreApp = (st: (state: StoreType) => any) => useSelector(st);
