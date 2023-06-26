import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppUserState } from '../../../modules/Authenication/Models/UserState';
import { AuthenicationService } from '../../../modules/Authenication/Services/Authenication.service';
import { ToastrService } from '../../../modules/Shared/Services/ToastrService';
import * as fromApp from '../../../Store/app-reducers';

@Component({
  selector: 'ngx-one-column-layout',
  styleUrls: ['./one-column.layout.scss'],
  templateUrl: './one-column.layout.html'
})
export class OneColumnLayoutComponent implements OnInit {
  authState: Observable<AppUserState>;

  constructor(private authenicationService: AuthenicationService, private toastrService: ToastrService
    , private router: Router,
    private store: Store<fromApp.AppState>) {

  }

  ngOnInit(): void {
    this.authState = this.store.select('auth');
  }
}



