import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppConfig } from '../../../../../../app.config';
import { EnumToastrStatus } from '../../../../../Shared/Enums/EnumToastrStatus';
import { ClothBrandDTO, service } from '../../../../../Shared/Services/api-client.Service';
import { ToastrService } from '../../../../../Shared/Services/ToastrService';

@Component({
  selector: 'ngx-new-cloth-brand',
  templateUrl: './new-cloth-brand.component.html'
})
export class NewClothBrandComponent implements OnInit {

  DataForm: FormGroup;
  loadingLargeGroup = false;
  EnableSubmit = false;
  ExistBrandImage = false;
  clothbrand: ClothBrandDTO = {};
  BrandPic: string;
  FilesUrl = AppConfig.settings.FilesUrl;
  blob = new Blob([], { type: "application/pdf" });
  filedata: any;
  adddata: Subscription;

  constructor(private toastrService: ToastrService, private router: Router,
    private route: ActivatedRoute, private _apiService: service) {
  }

  ngOnInit(): void {
    this.DataForm = new FormGroup({
      'Name': new FormControl(null, [Validators.required]),
      'BrandPic': new FormControl(null),
    });

    let BrandId = null;
    this.route.params.
      subscribe((params: Params) => {
        BrandId = params['Id'];
      });

    if (BrandId !== undefined) {

      this._apiService.getClothBrand(BrandId).subscribe
        ((Brand) => {
          if (Brand.Data !== null && Brand.Data !== undefined) {
            this.clothbrand = Brand.Data;
            this.BrandPic = this.FilesUrl + this.clothbrand.BrandPic;
            this.ExistBrandImage = true;
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

  SubmitData(file) {

    this.loadingLargeGroup = true;
    this.EnableSubmit = true;
    this.DataForm.markAllAsTouched();

    let BrandId = null;
    this.route.params.
      subscribe((params: Params) => {
        BrandId = params['Id'];
      });

    if (this.DataForm.valid) {

      if (file.length === 0 && BrandId === undefined) {
        this.toastrService.showToast(EnumToastrStatus.WARNING, 'Failed', 'No Files Uploaded !!');
        this.loadingLargeGroup = false;
        this.EnableSubmit = false;
      }
      else {
        if (file.length > 0) {
          this.filedata = { data: file[0], fileName: file[0]?.name };
        } else {
          this.filedata = { data: this.blob, fileName: 'No File' };
        }

        if (BrandId !== undefined) {
          this.clothbrand.Id = BrandId;
          this.adddata = this._apiService.updateClothBrand(this.clothbrand.Name, this.clothbrand.Name,
            this.clothbrand.Id, this.filedata).subscribe
            ((data) => {
              this.loadingLargeGroup = false;
              this.EnableSubmit = false;
              if (data.Result === 0) {
                this.toastrService.showToast(EnumToastrStatus.SUCCESS, 'Success', 'Brand Updated Successfully');
                this.router.navigate(['Clothes/Brands']);
              }
              else {
                this.toastrService.showToast(EnumToastrStatus.DANGER, 'Failed', data.Data);
              }
            },
              (error) => {
                this.loadingLargeGroup = false;
                this.EnableSubmit = false;
                this.toastrService.showToast(EnumToastrStatus.DANGER, 'Failed', 'Failed in Updating Brand');
              });
        } else {
         this.adddata= this._apiService.
           addNewClothBrand(this.clothbrand.Name, this.clothbrand.Name,
             0, this.filedata).subscribe
            ((data) => {
              this.loadingLargeGroup = false;
              this.EnableSubmit = false;
              if (data.Result === 0) {
                this.toastrService.showToast(EnumToastrStatus.SUCCESS, 'Success', 'Brand Added Successfully');
                this.router.navigate(['Clothes/Brands']);
              } else {
                this.toastrService.showToast(EnumToastrStatus.DANGER, 'Failed', data.Data);
              }
            },
              (error) => {
                this.loadingLargeGroup = false;
                this.EnableSubmit = false;
                this.toastrService.showToast(EnumToastrStatus.DANGER, 'Failed', 'Failed in Saving Brand');
              });
        }
      }
    } else {
      this.loadingLargeGroup = false;
      this.EnableSubmit = false;
    }
  }


}
