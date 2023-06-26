import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { debug } from 'console';
import { Subscription } from 'rxjs';
import { EnumToastrStatus } from '../../../../../Shared/Enums/EnumToastrStatus';
import {  ClothSizeDTO, service } from '../../../../../Shared/Services/api-client.Service';
import { ToastrService } from '../../../../../Shared/Services/ToastrService';

@Component({
  selector: 'ngx-new-cloth-size',
  templateUrl: './new-cloth-size.component.html'
})
export class NewClothSizeComponent implements OnInit {

  DataForm: FormGroup;
  Types: any;
  SelectedType = '1';
  status: string;
  loadingLargeGroup = false;
  EnableSubmit = false;
  clothSize: ClothSizeDTO = {
    Name: null,
  };
 adddata: Subscription;

  constructor(private _apiService: service, private toastrService: ToastrService
    , private router: Router, private route: ActivatedRoute) {
    this.DataForm = new FormGroup({
      'Name': new FormControl(null, [Validators.required]),
      'Width': new FormControl(null),
      'Height': new FormControl(null),
      'Abbreviation': new FormControl(null),
    });

    let SizeId = null;
    this.route.params.
      subscribe((params: Params) => {
        SizeId = params['Id'];
      });

    if (SizeId !== undefined) {

      this._apiService.getClothSize(SizeId).subscribe
        ((Size) => {
          if (Size.Data !== null && Size.Data !== undefined) {
            this.clothSize = Size.Data;
          }
          else {
            this.router.navigate(['ErrorPage']);
          }
        },
          (error) => {
            this.router.navigate(['ErrorPage']);
          });

    }

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.adddata !== null && this.adddata !== undefined)
      this.adddata.unsubscribe();
  }

  ValidateInput(ControlName: string) {

    switch (ControlName) {
      case 'Name':
        if (this.DataForm.get(ControlName).touched && !this.DataForm.get(ControlName).valid) {
          return 'danger';
        }
    }
  }

  SubmitData() {
    debugger;
    this.loadingLargeGroup = true;
    this.EnableSubmit = true;
    this.DataForm.markAllAsTouched();

    if (this.DataForm.valid) {

      let SizeId = null;
      this.route.params.
        subscribe((params: Params) => {
          SizeId = params['Id'];
        });
      this.clothSize.Height = this.clothSize.Height !== undefined && this.clothSize.Height !== null
        ? Number(this.clothSize.Height) : undefined;
      this.clothSize.Width = this.clothSize.Width !== undefined && this.clothSize.Width !== null
        ? Number(this.clothSize.Width) : undefined;

      if (SizeId !== undefined) {
        this.clothSize.Id = Number(SizeId);
        this._apiService.updateClothSize(this.clothSize).subscribe
          ((data) => {
            this.loadingLargeGroup = false;
            this.EnableSubmit = false;
            if (data.Result === 0) {
              this.toastrService.showToast(EnumToastrStatus.SUCCESS, 'Success', 'Size Updated Successfully');
              this.router.navigate(['Clothes/Sizes']);
            }
            else {
              this.toastrService.showToast(EnumToastrStatus.DANGER, 'Failed', data.Data);
            }
          },
            (error) => {
              this.loadingLargeGroup = false;
              this.EnableSubmit = false;
              this.toastrService.showToast(EnumToastrStatus.DANGER, 'Failed', 'Failed in Updating Size');
            });
      } else {
        this._apiService.
          addNewClothSize(this.clothSize).subscribe
          ((data) => {
            this.loadingLargeGroup = false;
            this.EnableSubmit = false;
            if (data.Result === 0) {
              this.toastrService.showToast(EnumToastrStatus.SUCCESS, 'Success', 'Size Added Successfully');
              this.router.navigate(['Clothes/Sizes']);
            }
            else {
              this.toastrService.showToast(EnumToastrStatus.DANGER, 'Failed', data.Data);
            }
          },
            (error) => {
              this.loadingLargeGroup = false;
              this.EnableSubmit = false;
              this.toastrService.showToast(EnumToastrStatus.DANGER, 'Failed', 'Failed in Saving Size');
            });
      }
    } else {
      this.loadingLargeGroup = false;
      this.EnableSubmit = false;
    }

  }
}
