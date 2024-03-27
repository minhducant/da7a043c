export const MAIN_DOMAIN = 'http://192.168.100.62:3343';

export const ApiUrl = {
  Auth: {
    get_user_info: '/api/v1/auth/current_user',
    login_google: '/api/v1/auth/login_google',
    login_facebook: '/api/v1/auth/login_facebook',
    refresh_access_token: '/api/v1/auth/refresh_access_token',
  },
  User: {},
  Friend: {
    friends: '/api/v1/friend',
  },
  Upload: {},
  Firebase: {},
  Invite: {},
  Note: {
    get_note: '/api/v1/note',
    get_users: '/api/v1/user',
    get_notes: '/api/v1/note',
    create_note: '/api/v1/note/create',
    update_note: '/api/v1/note/update',
    split_expense: '/api/v1/note/split',
    add_expense: '/api/v1/note/add_expense',
    change_member: '/api/v1/note/change-member',
    change_status: '/api/v1/note/change-status',
  },
};
