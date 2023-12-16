export const MAIN_DOMAIN = 'http://192.168.100.46:3343';

export const ApiUrl = {
  Auth: {
    get_user_info: '/api/v1/auth/user/current',
    login_google: '/api/v1/auth/user/google/login',
    login_facebook: '/api/v1/auth/user/facebook/login',
    refresh_access_token: '/api/v1/auth/user/facebook/login',
  },
  User: {},
  Friend: {},
  Upload: {},
  Firebase: {},
  Invite: {},
  Note: {
    get_note: '/api/v1/note',
    get_notes: '/api/v1/note',
    create_note: '/api/v1/note/create',
    update_note: '/api/v1/note/update',
    split_expense: '/api/v1/note/split',
    change_member: '/api/v1/note/change-member',
    change_status: '/api/v1/note/change-status',
  },
};
