import {combineReducers} from '@reduxjs/toolkit';

import {stores as Note} from './Note/store';
import {stores as Config} from './Config/store';
import {stores as Setting} from './Setting/store';
import {stores as Notification} from './Notification/store';
import {stores as Authentication} from './Authentication/store';

const rootReducer = combineReducers({
  Note: Note.reducer,
  Config: Config.reducer,
  Setting: Setting.reducer,
  Notification: Notification.reducer,
  Authentication: Authentication.reducer,
});

export default rootReducer;
