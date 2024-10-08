import React from 'react';
import {AppState} from 'react-native';
import type {AppStateStatus} from 'react-native';

type AppStateType = {
  isForeground: boolean;
  isInactive: boolean;
  isBackground: boolean;
};

function useAppState() {
  const [appState, setAppState] = React.useState<AppStateType>({
    isForeground: AppState.currentState === 'active',
    isInactive: AppState.currentState === 'inactive',
    isBackground: AppState.currentState === 'background',
  });

  React.useEffect(() => {
    function handleAppStateChange(nextAppState: AppStateStatus) {
      setAppState({
        isForeground: nextAppState === 'active',
        isInactive: nextAppState === 'inactive',
        isBackground: nextAppState === 'background',
      });
    }
    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );
    return () => subscription.remove();
  }, []);

  return appState;
}

export default useAppState;
