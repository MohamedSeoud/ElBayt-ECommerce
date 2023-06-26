import { Action } from "@ngrx/store";
import { AppUserData } from "../Models/AppUserData";

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const REGISTER = 'REGISTER';
export const SET_TOKEN = 'SET_TOKEN';
export const SET_USERINFO = 'SET_USERINFO';


export class Login implements Action {
  readonly type= LOGIN;
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class Register implements Action {
  readonly type = REGISTER;
}

export class SetToken implements Action {
  readonly type = SET_TOKEN;
  constructor(public payload: string) {
  }
}

export class SetUserInfo implements Action {
  readonly type = SET_USERINFO;
  constructor(public payload: AppUserData) {
  }
}


export type AuthActions = Login | Logout | Register | SetToken | SetUserInfo;


