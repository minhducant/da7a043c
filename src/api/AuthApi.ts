import {ApiUrl} from '@configs/ApiUrl';
import {client} from '@configs/AxiosConfig';
import {extraParams} from '@utils/ApiResponse';
import {AppApiTypeRequest} from '@api/TypeRequest';

export class AuthApi {
  static async getUserInfo(params: any) {
    const response: any = await client.get(
      ApiUrl.Auth.get_user_info + extraParams(params),
    );
    return response?.code === 200 ? response.data : {};
  }
  static async LoginFacebook(params: AppApiTypeRequest.LoginFacebook) {
    const response = await client.post(ApiUrl.Auth.login_facebook, params);
    return response;
  }
  static async LoginGoogle(params: AppApiTypeRequest.LoginGoogle) {
    const response = await client.post(ApiUrl.Auth.login_google, params);
    return response;
  }
}
