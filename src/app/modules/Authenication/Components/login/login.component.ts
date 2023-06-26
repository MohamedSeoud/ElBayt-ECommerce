import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EnumToastrStatus } from '../../../Shared/Enums/EnumToastrStatus';
import { ToastrService } from '../../../Shared/Services/ToastrService';
import { LoginUser } from '../../Models/LoginUser';
import { AuthenicationService } from '../../Services/Authenication.service';
import * as fromApp from '../../../../Store/app-reducers';
import * as AuthAction from '../../Store/auth-actions';
import { Store } from '@ngrx/store';
import { AppUserState } from '../../Models/UserState';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
 })
export class LoginComponent implements OnInit {
  DataForm: FormGroup;
  loadingLargeGroup = false;
  EnableSubmit = false;
  status: string;
  loginUser = new LoginUser();
  UserState = new AppUserState();


  constructor(private authenicationService: AuthenicationService, private toastrService: ToastrService
    , private router: Router, private store: Store<fromApp.AppState>) {
    this.DataForm = new FormGroup({
      'UserName': new FormControl(null, [Validators.required]),
      'Password': new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
  }

  ValidateInput(ControlName: string) {

    switch (ControlName) {
      case 'UserName':
        if (this.DataForm.get(ControlName).touched && !this.DataForm.get(ControlName).valid) {
          return 'danger';
        }
      case 'Password':
        if (this.DataForm.get(ControlName).touched && !this.DataForm.get(ControlName).valid) {
          return 'danger';
        }

    }

  }


  SubmitData() {
    this.loadingLargeGroup = true;
    this.EnableSubmit = true;
    this.DataForm.markAllAsTouched();

    if (this.DataForm.valid) {
      this.loginUser.UserName = this.DataForm.get('UserName').value;
      this.loginUser.Password = this.DataForm.get('Password').value;

      this.authenicationService.Login(this.loginUser).subscribe
        ((data) => {

          if (data.Data !== null) {
            this.loadingLargeGroup = false;
            this.EnableSubmit = false;

            this.store.dispatch(new AuthAction.Login());
            this.UserState.UserInfo = data.Data;
            this.UserState.IsAuthenicated = true;


            this.authenicationService.SetAuthData(data.Data);
            this.store.dispatch(new AuthAction.SetUserInfo(this.UserState.UserInfo));
            this.router.navigate(['']);
          }
          else {
            this.loadingLargeGroup = false;
            this.EnableSubmit = false;
            this.toastrService.showToast(EnumToastrStatus.DANGER, 'Failed', 'The UserName Or Password Is Incorrect...');
          }
        },
          (error) => {
            this.loadingLargeGroup = false;
            this.EnableSubmit = false;
            this.toastrService.showToast(EnumToastrStatus.DANGER, 'Failed', 'The UserName Or Password Is Incorrect...');
          });
    }
    else {
      this.loadingLargeGroup = false;
      this.status = 'danger';
      this.toastrService.showToast(EnumToastrStatus.WARNING, 'Validation', 'Please Fill The Fields Correctly');
    }

  }

}
