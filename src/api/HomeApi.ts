import {ApiUrl} from '@configs/ApiUrl';
import {client} from '@configs/AxiosConfig';
import {extraParams} from '@utils/ApiResponse';

export class HomeApi {
  static async getNotes(props: any) {
    const response = await client.get(
      ApiUrl.Note.get_notes + extraParams(props),
    );
    return response;
  }
  static async getFriends(params: any) {
    const response = await client.get(
      ApiUrl.Friend.friends + extraParams(params),
    );
    return response.data;
  }
}
