import {ApiUrl} from '@configs/ApiUrl';
import {client} from '@configs/AxiosConfig';
import {extraParams} from '@utils/ApiResponse';
import {AppApiTypeRequest} from '@api/TypeRequest';

export class ToolApi {
  static async getListWallet() {
    const response: any = await client.get(ApiUrl.User.wallet);
    return response;
  }
}
