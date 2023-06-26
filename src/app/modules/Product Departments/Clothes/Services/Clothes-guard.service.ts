import { HttpClient,  HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppConfig } from '../../../../app.config';
import { AuthenicationService } from '../../../Authenication/Services/Authenication.service';
import * as fromApp from '../../../../Store/app-reducers';
import { Store } from '@ngrx/store';
import { AppUserState } from '../../../Authenication/Models/UserState';
import { map } from 'rxjs/operators';
import { debug } from 'console';


@Injectable({
  providedIn: 'root',
})
export class ClothesGuardService implements CanActivate {
  private baseUrlElBayt = AppConfig.settings ? AppConfig.settings.baseAPIUrl : null;
  private endPointUrl = AppConfig.ApiServerLink ? AppConfig.ApiServerLink + 'Clothes/' : null;
  constructor(private httpClient: HttpClient, private authService: AuthenicationService,
    private store: Store<fromApp.AppState>, private router: Router) {
    this.endPointUrl = this.baseUrlElBayt + this.endPointUrl;
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    //console.log('canActivate');
    return this.store.select('auth').pipe(map((authState: AppUserState) => {
      if (!authState.IsAuthenicated) {
        this.authService.Logout();
      }
      return authState.IsAuthenicated;
    }));
  }


}
