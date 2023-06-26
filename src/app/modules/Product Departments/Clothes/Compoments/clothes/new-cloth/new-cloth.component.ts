import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppConfig } from '../../../../../../app.config';
import { EnumToastrStatus } from '../../../../../Shared/Enums/EnumToastrStatus';
import { EnumProductCategory, NumberClothDTO, service } from '../../../../../Shared/Services/api-client.Service';
import { ToastrService } from '../../../../../Shared/Services/ToastrService';

@Component({
  selector: 'ngx-new-cloth',
  templateUrl: './new-cloth.component.html',
})
export class NewClothComponent implements OnInit {

  DataForm: FormGroup;
  Categories: any;
  SelectedCategory = '1';
  status: string;
  loadingLargeGroup = false;
  EnableSubmit = false;
  cloth: NumberClothDTO = {};
  ExistProductImages = false;
  ProductImageURL1: string;
  ProductImageURL2: string;
  FilesUrl = AppConfig.settings.FilesUrl;
  IsImageDeleted = false;
  adddata: Subscription;
  blob = new Blob([], { type: "application/pdf" });
  filedata: any[] = [];
  SelectedBrand: string;
  Brands: any;

  constructor(private _apiService: service, private toastrService: ToastrService
    , private router: Router, private route: ActivatedRoute) {
    this.DataForm = new FormGroup({
      'Name': new FormControl(null, [Validators.required]),
      'Description': new FormControl(null, [Validators.required]),
      'short_desc': new FormControl(null),
      'ProductImageURL1': new FormControl(null),
      'ProductImageURL2': new FormControl(null),
      'ClothCategoryId': new FormControl(null, [Validators.required]),
      'BrandId': new FormControl(null),
    });

    let ClothId = null;
    this.route.params.
      subscribe((params: Params) => {
        ClothId = params['Id'];
      });

    if (ClothId !== undefined) {
      this.ExistProductImages = true;
      this._apiService.getCloth(ClothId).subscribe
        ((cloth) => {
          if (cloth.Data !== null && cloth.Data !== undefined) {
            this.cloth = cloth.Data;
            this.ProductImageURL1 = this.FilesUrl + this.cloth.ProductImageURL1;
            this.ProductImageURL2 = this.FilesUrl + this.cloth.ProductImageURL2;
            this._apiService.
              getClothCategoryBrands(this.cloth.ClothCategoryId).subscribe
              ((response) => {
                this.Brands = response.Data;
              },
                (error) => {
                });
          }
          else {
            this.router.navigate(['ErrorPage']);
          }
        },
          (error) => {
            this.router.navigate(['ErrorPage']);
          });

    }

    this._apiService.getClothCategories()
      .subscribe((Response) => {
        this.Categories = Response.Data;
        this.SelectedCategory = this.Categories[0]?.Id;
        this.DataForm.controls['ClothCategoryId'].setValue(this.SelectedCategory);
        if (ClothId === undefined) {
          this._apiService.
            getClothCategoryBrands(Number(this.SelectedCategory)).subscribe
            ((response) => {
              this.Brands = response.Data;
            },
              (error) => {
              });
        }
      }, (error) => {
      });
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
      case 'Price':
        if (this.DataForm.get(ControlName).touched && !this.DataForm.get(ControlName).valid) {
          return 'danger';
        }
      case 'Description':
        if (this.DataForm.get(ControlName).touched && !this.DataForm.get(ControlName).valid) {
          return 'danger';
        }
      case 'short_desc':
        if (this.DataForm.get(ControlName).touched && !this.DataForm.get(ControlName).valid) {
          return 'danger';
        }

    }
  }


  OnCategoryChange(CategoryId) {
    this._apiService.
      getClothCategoryBrands(CategoryId).subscribe
      ((response) => {
        this.Brands = response.Data;
        if (response.Data.length > 0) {
          this.cloth.BrandId = response.Data[0].Id;
        }
      },
        (error) => {
        });

  }

  private AddProduct(file1, file2) {

    if (file1.length > 0) {
      this.filedata.push({ data: file1[0], fileName: file1[0]?.name });
    } else {
      this.filedata.push({ data: this.blob, fileName: 'No File' });
    }
    if (file2.length > 0) {
      this.filedata.push({ data: file2[0], fileName: file2[0]?.name });
    } else {
      this.filedata.push({ data: this.blob, fileName: 'No File' });
    }

    this._apiService.
      addNewCloth(this.cloth.Name, this.cloth.Description, this.cloth.Name,
        this.cloth.Name, EnumProductCategory._0, this.cloth.ClothCategoryId,
        this.cloth.BrandId, this.cloth.short_desc, this.filedata).subscribe
      ((data) => {
        this.loadingLargeGroup = false;
        this.EnableSubmit = false;
        this.toastrService.showToast(EnumToastrStatus.SUCCESS, 'Success', 'Cloth Added Successfully');
        this.router.navigate(['Clothes/Products']);
      },
        (error) => {
          this.loadingLargeGroup = false;
          this.EnableSubmit = false;
          this.toastrService.showToast(EnumToastrStatus.DANGER, 'Failed', 'Failed in Saving Cloth');
        });
  }

  private UpdateCloth(file1, file2, CothId) {
    if (file1.length > 0) {
      this.filedata.push({ data: file1[0], fileName: file1[0]?.name });
    } else {
      this.filedata.push({ data: this.blob, fileName: 'No File' });
    }
    if (file2.length > 0) {
      this.filedata.push({ data: file2[0], fileName: file2[0]?.name });
    } else {
      this.filedata.push({ data: this.blob, fileName: 'No File' });
    }

    this._apiService.updateCloth(CothId, this.cloth.Name, this.cloth.Description, this.cloth.Name,
      this.cloth.Name, EnumProductCategory._0, this.cloth.ClothCategoryId,
      this.cloth.BrandId, this.cloth.short_desc, this.filedata).subscribe
      ((data) => {
        this.loadingLargeGroup = false;
        this.EnableSubmit = false;
        this.toastrService.showToast(EnumToastrStatus.SUCCESS, 'Success', 'Cloth Updated Successfully');
        this.router.navigate(['Clothes/Products']);
      },
        (error) => {
          this.loadingLargeGroup = false;
          this.EnableSubmit = false;
          this.toastrService.showToast(EnumToastrStatus.DANGER, 'Failed', 'Failed in Updating Cloth');
        });
  }

  SubmitData(file1, file2) {

    this.loadingLargeGroup = true;
    this.EnableSubmit = true;

    let CothId = null;
    this.route.params.
      subscribe((params: Params) => {
        CothId = params['Id'];
      });
    this.DataForm.markAllAsTouched();

    if (this.DataForm.valid) {
      if (file1.length === 0 && CothId === null) {
        this.loadingLargeGroup = false;
        this.EnableSubmit = false;
        this.toastrService.showToast(EnumToastrStatus.WARNING, 'Failed', 'No Files Uploaded !!');
      }
      else if (file1.length > 1 && CothId === null) {
        this.loadingLargeGroup = false;
        this.EnableSubmit = false;
        this.toastrService.showToast(EnumToastrStatus.WARNING, 'Failed', 'Please Choose One File !! ');
      }
      if (file1 === null || file1 === undefined || file1.length === 0 && CothId === null) {
        this.loadingLargeGroup = false;
        this.EnableSubmit = false;
        this.toastrService.showToast(EnumToastrStatus.WARNING, 'WARNING', 'Should Upload Cloth Image1 !!');
      }
      else {

        if (this.cloth.ProductImageURL1 === null || this.cloth.ProductImageURL1 === undefined)
          this.cloth.ProductImageURL1 = this.DataForm.get('ProductImageURL1').value;


        if (this.DataForm.get('ProductImageURL2').value !== undefined) {
          if (this.cloth.ProductImageURL2 === null || this.cloth.ProductImageURL2 === undefined) {
            this.cloth.ProductImageURL2 = this.DataForm.get('ProductImageURL2').value;
          }
        }

        if (CothId !== undefined) {
          if (this.cloth.ProductImageURL1 === undefined || this.cloth.ProductImageURL1 === null) {
            this.toastrService.showToast(EnumToastrStatus.WARNING, 'WARNING', 'Should Upload Cloth Image1 !!');
          }
          else {
            this.UpdateCloth(file1, file2, CothId);
          }
        } else {
          if (file1 === null || file1 === undefined || file1.length === 0) {
            this.toastrService.showToast(EnumToastrStatus.WARNING, 'WARNING', 'Should Upload Cloth Image1 !!');
          }
          else {
            this.AddProduct(file1, file2);
          }
        }
      }
    } else {
      this.loadingLargeGroup = false;
      this.EnableSubmit = false;
      this.status = 'danger';
    }
  }

}
