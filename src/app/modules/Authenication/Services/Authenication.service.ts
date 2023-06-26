import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppConfig } from '../../../app.config';
import { ElBaytResponse } from '../../Shared/Models/ElBaytResponse';
import { AppUserData } from '../Models/AppUserData';
import { IdentityUser } from '../Models/IdentityUser';
import { LoginUser } from '../Models/LoginUser';

import * as fromApp from '../../../Store/app-reducers';
import * as AuthAction from '../../Authenication/Store/auth-actions';
import { AppUserState } from '../Models/UserState';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthenicationService {
  private baseUrlElBayt = AppConfig.settings ? AppConfig.settings.baseAPIUrl : null;
  private endPointUrl = AppConfig.ApiServerLink ? AppConfig.ApiServerLink + 'Identity/' : null;
  UserState = new AppUserState();

  constructor(private httpClient: HttpClient, private store: Store<fromApp.AppState>, private router: Router) {
    this.endPointUrl = this.baseUrlElBayt + this.endPointUrl;

    var token = this.GetToken();
    if (token !== null && token !== undefined) {
      var UserName = localStorage.getItem('ElBaytUserName');
      var Email = localStorage.getItem('ElBaytEmail');
      var Name = localStorage.getItem('ElBaytName');
      this.UserState.UserInfo = new AppUserData();

      if (UserName !== null || UserName !== undefined) {
        this.UserState.UserInfo.UserName = UserName;
      }
      if (Email !== null || Email !== undefined) {
        this.UserState.UserInfo.Email = Email;
      }
      if (Name !== null || Name !== undefined) {
        this.UserState.UserInfo.Name = Name;
      }
      this.UserState.UserInfo.token = localStorage.getItem('ElBaytUserToken');
      this.store.dispatch(new AuthAction.Login());
      this.store.dispatch(new AuthAction.SetUserInfo(this.UserState.UserInfo));
    }
  }

  Register(user: IdentityUser): Observable<ElBaytResponse<string>> {
    const endPointUrlEdit = this.endPointUrl + 'Register';
    return this.httpClient.post<ElBaytResponse<string>>(endPointUrlEdit, user);
  }

  Login(user: LoginUser): Observable<ElBaytResponse<AppUserData>> {
    const endPointUrlEdit = this.endPointUrl + 'Login';
    return this.httpClient.post<ElBaytResponse<AppUserData>>(endPointUrlEdit, user);
  }

  Logout() {
    localStorage.removeItem('ElBaytUserToken');
    localStorage.removeItem('ElBaytUserName');
    localStorage.removeItem('ElBaytEmail');
    localStorage.removeItem('ElBaytName');
    this.store.dispatch(new AuthAction.Logout());
    if (this.router.url !== 'Admin/Login')
      this.router.navigate(['Admin/Login']);
  }

  SetAuthData(Data: AppUserData) {
    localStorage.setItem('ElBaytUserToken', Data.token);
    localStorage.setItem('ElBaytUserName', Data.UserName);
    localStorage.setItem('ElBaytEmail', Data.Email);
    localStorage.setItem('ElBaytName', Data.Name);
  }

  GetToken() {
    var token = localStorage.getItem('ElBaytUserToken');
    return token;
  }


  IsAuthenicated() {
   var token = this.GetToken();
    if (token !== null || token !== undefined) {
      return true;
    }
    else {
      return true;
    }
  }

}
