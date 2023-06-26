import { AppUserState } from "../Models/UserState";
import * as AuthActions  from "./auth-actions";

const Initialstate: AppUserState = {
  UserInfo: null,
  IsAuthenicated: false
};

export function authReducers(state = Initialstate, action: AuthActions.AuthActions) {
  switch (action.type) {
    case (AuthActions.REGISTER):
    case (AuthActions.LOGIN):
      return {
        ...state,
        IsAuthenicated: true,
     };
    case (AuthActions.LOGOUT):
      return {
        ...state,
        IsAuthenicated: false,
        UserInfo: null
      };
    case (AuthActions.SET_USERINFO):
      return {
        ...state,
        IsAuthenicated: true,
        UserInfo: action.payload
      };

    default:
      return state;

  }

}


