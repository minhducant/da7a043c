// export const MAIN_DOMAIN = 'http://chiti.love';
// export const MAIN_DOMAIN = 'http://103.20.96.99:80';
export const MAIN_DOMAIN = 'http://192.168.1.6:3343';

export const ApiUrl = {
  Auth: {
    get_user_info: '/api/v1/auth/current-user',
    login_zalo: '/api/v1/auth/login-zalo',
    login_google: '/api/v1/auth/login-google',
    login_facebook: '/api/v1/auth/login-facebook',
    refresh_access_token: '/api/v1/auth/refresh-access-token',
  },
  User: {
    user: '/api/v1/user',
    vn_bank: '/api/v1/payment/vn/banks',
    wallet: '/api/v1/payment/wallet/get',
    generate_link: '/api/v1/payment/vn/generate-link',
  },
  Friend: {
    friends: '/api/v1/friend',
  },
  Upload: {},
  Firebase: {},
  Invite: {},
  Notification: {
    get_notification: '/api/v1/notification',
    push_notification: '/api/v1/notification/push',
    read_notification: '/api/v1/notification/read',
    register_notification: '/api/v1/notification/register',
    read_all_notification: '/api/v1/notification/read-all',
  },
  Note: {
    get_note: '/api/v1/note',
    get_users: '/api/v1/user',
    get_notes: '/api/v1/note',
    create_note: '/api/v1/note/create',
    update_note: '/api/v1/note/update',
    split_expense: '/api/v1/note/split',
    add_expense: '/api/v1/note/add-expense',
    change_member: '/api/v1/note/change-member',
    change_status: '/api/v1/note/change-status',
  },
};
