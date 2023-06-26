import { ActionReducerMap } from '@ngrx/store';
import { AppUserState } from '../modules/Authenication/Models/UserState';
import * as fromAuth from '../modules/Authenication/Store/auth-reducers';



export interface AppState {
  auth: AppUserState;
}


export const reducers: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducers,
};
