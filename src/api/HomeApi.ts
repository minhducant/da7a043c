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
  static async getDetailNote(props: any) {
    const response = await client.get(`${ApiUrl.Note.get_notes}/${props}`);
    return response;
  }
  static async getUsers(props: any) {
    const response = await client.get(
      ApiUrl.Note.get_users + extraParams(props),
    );
    return response;
  }
  static async getFriends(params: any) {
    const response = await client.get(
      ApiUrl.Friend.friends + extraParams(params),
    );
    return response.data;
  }
  static async createNote(params: any) {
    const response = await client.post(ApiUrl.Note.create_note, params);
    return response;
  }
  static async addExpense(params: any) {
    const response = await client.patch(ApiUrl.Note.add_expense, params);
    return response;
  }
  static async getNotifications(props: any) {
    const response = await client.get(
      ApiUrl.Notification.get_notification + extraParams(props),
    );
    return response;
  }
  static async registerNotification(params: any) {
    return await client.post(ApiUrl.Notification.register_notification, params);
  }
  static async readAllNotification() {
    const response = await client.post(
      ApiUrl.Notification.read_all_notification,
    );
    return response;
  }
  static async readNotification(params: any) {
    const response = await client.post(
      ApiUrl.Notification.read_notification,
      params,
    );
    return response;
  }
  static async changeStatus(params: any) {
    const response = await client.patch(ApiUrl.Note.change_status, params);
    return response;
  }
}
