import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EnumToastrStatus } from '../../../../../../Shared/Enums/EnumToastrStatus';
import { ClothInfoDTO, service } from '../../../../../../Shared/Services/api-client.Service';
import { ToastrService } from '../../../../../../Shared/Services/ToastrService';

@Component({
  selector: 'ngx-new-cloth-info-amount',
  templateUrl: './new-cloth-info-amount.component.html'
})
export class NewClothInfoAmountComponent implements OnInit {

  DataForm: FormGroup;
  loadingLargeGroup = false;
  EnableSubmit = false;
  clothinfo: ClothInfoDTO = {};
  Colors: any;
  Sizes: any;
  SelectedSize: number;
  SelectedColor: string;

  constructor(private _apiService: service, private toastrService: ToastrService
    , private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.DataForm = new FormGroup({
      'SizeId': new FormControl(null, [Validators.required]),
      'ColorId': new FormControl(null),
      'Price': new FormControl(null, [Validators.required]),
      'PriceAfterDiscount': new FormControl(null),
      'Amount': new FormControl(null, [Validators.required]),
    });


    let Id = null;
    this.route.params.
      subscribe((params: Params) => {
        Id = params['Id'];
      });

    if (Id !== undefined) {

      this._apiService.getInfo(Id).subscribe
        ((Info) => {
          if (Info.Data !== null && Info.Data !== undefined) {
            this.clothinfo = Info.Data;
          }
          else {
            this.router.navigate(['ErrorPage']);
          }
        },
          (error) => {
            this.router.navigate(['ErrorPage']);
          });

    }


    let ClothId = null;
    this.route.params.
      subscribe((params: Params) => {
        ClothId = params['ClothId'];
      });

    if (ClothId !== undefined) {
      this._apiService.getClothDBLInfo(ClothId).subscribe
        ((Info) => {
          this.Colors = Info.Data.Colors;
          this.Sizes = Info.Data.Sizes;
          this.SelectedSize = Info.Data.Sizes[0].Id;
          this.DataForm.controls['SizeId'].setValue(this.SelectedSize);
        },
          (error) => {
            this.router.navigate(['ErrorPage']);
          });

    }

  }

  ValidateInput(ControlName: string) {

    switch (ControlName) {
      case 'Price':
        if (this.DataForm.get(ControlName).touched && !this.DataForm.get(ControlName).valid) {
          return 'danger';
        }
      case 'Amount':
        if (this.DataForm.get(ControlName).touched && !this.DataForm.get(ControlName).valid) {
          return 'danger';
        }
    }
  }


  SubmitData() {
    this.loadingLargeGroup = true;
    this.EnableSubmit = true;
    this.DataForm.markAllAsTouched();

    let ClothId = null;
    this.route.params.
      subscribe((params: Params) => {
        ClothId = params['ClothId'];
      });

    if (this.DataForm.valid) {
      this.clothinfo.ClothId = Number(ClothId);

      if (Number(this.clothinfo.Price) < Number(this.clothinfo.PriceAfterDiscount)) {
        this.loadingLargeGroup = false;
        this.EnableSubmit = false;
        this.toastrService.showToast(EnumToastrStatus.WARNING, 'Warning', 'The PriceAfterDiscount Should Be Less Than Price !! ');
        return;
      }

      if (this.DataForm.get('ColorId').value !== undefined) {
        this.clothinfo.ColorId = Number(this.clothinfo.ColorId);
      }
      else {
        this.clothinfo.ColorId = null;
      }

      let Id = null;
      this.route.params.
        subscribe((params: Params) => {
          Id = params['Id'];
        });

      if (Id !== undefined) {
        this.clothinfo.Id = Number(Id);
      }

      this._apiService.addClothInfo(this.clothinfo).subscribe
        ((data) => {
          this.loadingLargeGroup = false;
          this.EnableSubmit = false;
          if (data.Result === 0) {
            this.toastrService.showToast(EnumToastrStatus.SUCCESS, 'Success', 'Info Updated Successfully');
            this.router.navigate(['Clothes/Product/' + ClothId+'/Info']);
          }
          else {
            this.toastrService.showToast(EnumToastrStatus.DANGER, 'Failed', data.Data);
          }
        },
          (error) => {
            this.loadingLargeGroup = false;
            this.EnableSubmit = false;
            this.toastrService.showToast(EnumToastrStatus.DANGER, 'Failed', 'Failed in Updating Info');
          });
    } else {
      this.loadingLargeGroup = false;
      this.EnableSubmit = false;
    }

  }


}
