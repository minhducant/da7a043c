import * as React from 'react';
import {
  PartialState,
  StackActions,
  NavigationState,
  createNavigationContainerRef,
} from '@react-navigation/native';

import DrawerRef from '@components/Base/DrawerLib';

export let TIMESTAMP_LAST_SCREEN_OPENING = 0;

export const isReadyRef = React.createRef();

export const navigationRef = createNavigationContainerRef();

export const goBack = () => {
  if (navigationRef.isReady()) {
    try {
      navigationRef.goBack();
    } catch (error) {}
  }
};

export const canGoBack = () => {
  return navigationRef.canGoBack();
};

export const reset = (
  params: PartialState<NavigationState> | NavigationState,
) => {
  if (navigationRef.isReady()) {
    navigationRef.reset(params);
  }
};

export const push = (screenName: string, params?: object) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.push(screenName, params));
  }
};

export const pop = (numOfStack: number = 1) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.pop(numOfStack));
  }
};

export const getActiveRouteName = (state: any): any => {
  const route = state?.routes?.[state.index];
  if (route?.state) {
    return getActiveRouteName(route.state);
  }
  return route?.name;
};

export const replace = (screenName: string, params?: object) => {
  if (navigationRef.isReady() && getRouteName() !== screenName) {
    navigationRef.dispatch(StackActions.replace(screenName, params));
  }
};

export const getRouteName = () => {
  if (navigationRef.isReady()) {
    return navigationRef.getCurrentRoute()?.name;
  }
  return '';
};

export function updateTimestampLastScreenOpening() {
  TIMESTAMP_LAST_SCREEN_OPENING = new Date().getTime();
}

export function getCurrentRoute() {
  return navigationRef.current?.getCurrentRoute();
}

export const drawerRef = React.createRef<DrawerRef>();

export function openDrawer() {
  drawerRef.current?.openDrawer();
}
export function closeDrawer() {
  drawerRef.current?.closeDrawer();
}

export function navigate(name: string, params?: any) {
  // @ts-ignore
  navigationRef.navigate(name, params); 
;
}
