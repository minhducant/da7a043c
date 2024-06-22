import axios from 'axios';
import {Platform} from 'react-native';

import {onLogout} from '@utils/Logout';
import {getStorage} from '@utils/index';
import {MAIN_DOMAIN} from '@configs/ApiUrl';

type responseType = {mess: string; status: boolean; data: any};

export const app = axios.create({
  baseURL: MAIN_DOMAIN,
  timeout: 3000000,
  headers: {
    'x-device-type': Platform.OS,
  },
});

app.interceptors.request.use(
  async function (config) {
    const accessToken = await getStorage('accessToken');
    config.headers.Authorization = '';
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    console.log(error);
  },
);

app.interceptors.response.use(
  async function (response) {
    if (response.data?.code !== 200) {
      if (response.data?.info.message === 'Unauthorized') {
        onLogout();
        return {
          state: false,
          data: null,
          mess: '',
        };
      }
    }
    return {...response}.data;
  },
  async function (error) {
    if (
      error.code === 'ERR_BAD_REQUEST' &&
      error.config.url === '/api/v1/auth/client/current'
    ) {
      onLogout();
    }
    return {status: false, mess: error.message, data: []};
  },
);

export const client = {
  post: (url: string, ...rest: any) =>
    app.post<any, responseType>(url, ...rest),
  get: (url: string, ...rest: any) => app.get<any, responseType>(url, ...rest),
  put: (url: string, ...rest: any) => app.put<any, responseType>(url, ...rest),
  patch: (url: string, ...rest: any) =>
    app.patch<any, responseType>(url, ...rest),
  delete: (url: string, ...rest: any) =>
    app.delete<any, responseType>(url, ...rest),
};
