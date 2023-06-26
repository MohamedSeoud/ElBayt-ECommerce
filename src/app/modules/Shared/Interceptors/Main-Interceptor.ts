import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable, throwError } from "rxjs";
import { catchError, finalize, switchMap, take, tap } from "rxjs/operators";
import * as AuthAction from '../../../modules/Authenication/Store/auth-actions';
import { EnumToastrStatus } from "../Enums/EnumToastrStatus";
import { ToastrService } from "../Services/ToastrService";
import * as fromApp from '../../../Store/app-reducers';
import { AuthenicationService } from "../../Authenication/Services/Authenication.service";
import { AppUserState } from "../../Authenication/Models/UserState";


@Injectable({
  providedIn: 'root'
})

export class MainInterceptor implements HttpInterceptor {

  constructor( private toastrService: ToastrService
    , private router: Router, private store: Store<fromApp.AppState>,
    private authenicationService: AuthenicationService,
  ) {
   }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //debugger;

    if (req.url.includes('/assets')) {
      return next.handle(req);
    }

    //console.log('intercept');

    //return this.store.select('auth').pipe(
    //  switchMap((authState: AppUserState) => {
    //    var copiedReq = req.clone({
    //      headers: req.headers.set('Authorization', 'Bearer ' + authState.UserInfo.token)
    //});
    //    next.handle(copiedReq).pipe(tap(event => {
    //}))
    //  .pipe(finalize(() => {
    //    // LoaderHelper.hideLoader();
    //  }))
    //  .pipe(catchError((err: HttpErrorResponse) => {
    //    if (!this.manageError(err)) {
    //      return throwError(err);
    //    }
    //  }))
    //  })
    //)

     var copiedReq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + this.authenicationService.GetToken())
     });
     return next.handle(copiedReq).pipe(tap(event => {
     }))
      .pipe(finalize(() => {
        // LoaderHelper.hideLoader();
      }))
      .pipe(catchError((err: HttpErrorResponse) => {
        if (!this.manageError(err)) {
          return throwError(err);
        }
      }));


  }

  manageError(err: HttpErrorResponse): boolean {
    debugger;
    console.log(err);
    let result = false;
    let message = null;
    let isLogout = false;
    let isNotify = false;
    let isReload = false;
    if (err) {
      switch (err.status) {
        case 0:
          message = 'CONNECTION_ERROR';
          break;
        case 500:
          message = 'INTERNAL_SERVER_ERROR';
          isNotify = true;
          break;
        case 401:
          message = 'SESSION_EXPIRED';
          isLogout = true;
          isReload = true;
          break;
      }

      if (message) {
        // result = true;
        // this.toastrService.error(this.translateService.instant(message));
        this.toastrService.showToast(EnumToastrStatus.DANGER, 'Failed', 'Some Thing Wrong Is happen ');
      }

      if (isLogout) {
        // this.authservice.clearData();
        this.toastrService.showToast(EnumToastrStatus.DANGER, 'Failed', 'Some Thing Wrong Is happen ');
      }

      if (isNotify) {
        // this.notificationService.error({ message, translate: true, homePageBtn: true });
        this.toastrService.showToast(EnumToastrStatus.DANGER, 'Failed', 'Some Thing Wrong Is happen ');

      }

      this.authenicationService.Logout();

      if (isReload) {
        setTimeout(() => {
          location.reload();
        }, 2000);
      }

      return result;
    }
  }
 }


