import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { EnumToastrStatus } from '../../../Shared/Enums/EnumToastrStatus';
import { ToastrService } from '../../../Shared/Services/ToastrService';
import { IdentityUser } from '../../Models/IdentityUser';
import { AuthenicationService } from '../../Services/Authenication.service';
import * as fromApp from '../../../../Store/app-reducers';
import * as AuthAction from '../../Store/auth-actions';

@Component({
  selector: 'ngx-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {

  DataForm: FormGroup;
  loadingLargeGroup = false;
  EnableSubmit = false;
  status: string;
  identityUser = new IdentityUser();

  constructor(private authenicationService: AuthenicationService, private toastrService: ToastrService
    , private router: Router, private route: ActivatedRoute, private store: Store<fromApp.AppState>) {
    this.DataForm = new FormGroup({
      'Name': new FormControl(null, [Validators.required]),
      'Email': new FormControl(null, [Validators.required, Validators.email]),
      'UserName': new FormControl(null, [Validators.required]),
      'PasswordHash': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'ConfirmPassword': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'PhoneNumber': new FormControl(null, [Validators.required]),
      'AccessFailedCount': new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
  }

  ValidateInput(ControlName: string) {

    switch (ControlName) {
      case 'Name':
        if (this.DataForm.get(ControlName).touched && !this.DataForm.get(ControlName).valid) {
          return 'danger';
        }
      case 'Email':
        if (this.DataForm.get(ControlName).touched && !this.DataForm.get(ControlName).valid) {
          return 'danger';
        }
      case 'UserName':
        if (this.DataForm.get(ControlName).touched && !this.DataForm.get(ControlName).valid) {
          return 'danger';
        }
      case 'Password':
        if (this.DataForm.get(ControlName).touched && !this.DataForm.get(ControlName).valid) {
          return 'danger';
        }
      case 'ConfirmPassword':
        if (this.DataForm.get(ControlName).touched && !this.DataForm.get(ControlName).valid) {
          return 'danger';
        }
      case 'PhoneNumber':
        if (this.DataForm.get(ControlName).touched && !this.DataForm.get(ControlName).valid) {
          return 'danger';
        }
      case 'AccessFailedCount':
        if (this.DataForm.get(ControlName).touched && !this.DataForm.get(ControlName).valid) {
          return 'danger';
        }

    }

  }


  SubmitData() {
    debugger;
    this.loadingLargeGroup = true;
    this.EnableSubmit = true;

    let UserId = null;
    this.route.params.
      subscribe((params: Params) => {
        UserId = params['Id'];
      });
    this.DataForm.markAllAsTouched();

    if (this.DataForm.valid) {

      const ConfirmPassword = this.DataForm.get('ConfirmPassword').value;
      const Password = this.DataForm.get('PasswordHash').value;

      if (ConfirmPassword === Password) {

        let UserId = null;
        this.route.params.
          subscribe((params: Params) => {
            UserId = params['Id'];
          });

        if (UserId !== undefined) {
          this.identityUser.Id = UserId;
          this.authenicationService.Register(this.identityUser).subscribe
            ((data) => {
              this.store.dispatch(new AuthAction.Register());
              this.loadingLargeGroup = false;
              this.EnableSubmit = false;
              this.toastrService.showToast(EnumToastrStatus.SUCCESS, 'Success', 'User Updated Successfully');
              this.router.navigate(['product/Categories']);
            },
              (error) => {
                this.loadingLargeGroup = false;
                this.EnableSubmit = false;
                this.toastrService.showToast(EnumToastrStatus.DANGER, 'Failed', 'Failed in Updating User');
              });
        } else {
          this.authenicationService.
            Register(this.identityUser).subscribe
            ((data) => {
              this.loadingLargeGroup = false;
              this.EnableSubmit = false;
              this.toastrService.showToast(EnumToastrStatus.SUCCESS, 'Success', 'User Added Successfully');
              this.router.navigate(['product/Categories']);
            },
              (error) => {
                this.loadingLargeGroup = false;
                this.EnableSubmit = false;
                this.toastrService.showToast(EnumToastrStatus.DANGER, 'Failed', 'Failed in Saving User');
              });
        }
      } else {
        this.loadingLargeGroup = false;
        this.status = 'danger';
        this.toastrService.showToast(EnumToastrStatus.WARNING, 'Validation', 'Password and Confirm Password Should be Identical..');
      }
    } else {
      this.loadingLargeGroup = false;
      this.status = 'danger';
      this.toastrService.showToast(EnumToastrStatus.WARNING, 'Validation', 'Please Fill The Fields Correctly');
    }

  }

}
