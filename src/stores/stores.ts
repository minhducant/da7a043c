import {combineReducers} from '@reduxjs/toolkit';

import {stores as Note} from './Note/store';
import {stores as Config} from './Config/store';
import {stores as Authentication} from './Authentication/store';

const rootReducer = combineReducers({
  Note: Note.reducer,
  Config: Config.reducer,
  Authentication: Authentication.reducer,
});

export default rootReducer;
