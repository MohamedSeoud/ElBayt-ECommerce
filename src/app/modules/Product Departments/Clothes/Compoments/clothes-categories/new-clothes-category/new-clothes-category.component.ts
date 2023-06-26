import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EnumToastrStatus } from '../../../../../Shared/Enums/EnumToastrStatus';
import { ClothCategoryDTO, service } from '../../../../../Shared/Services/api-client.Service';
import { ToastrService } from '../../../../../Shared/Services/ToastrService';
@Component({
  selector: 'ngx-new-clothes-category',
  templateUrl: './new-clothes-category.component.html',
})
export class NewClothesCategoryComponent implements OnInit {

  DataForm: FormGroup;
  Types: any;
  SelectedType: any;
  status: string;
  loadingLargeGroup = false;
  EnableSubmit = false;
  clothcategory: ClothCategoryDTO = {};
  adddata: Subscription;

  constructor(private toastrService: ToastrService, private router: Router,
    private route: ActivatedRoute, private _apiService: service) {
    this.DataForm = new FormGroup({
      'Name': new FormControl(null, [Validators.required]),
      'ClothTypeId': new FormControl(null, [Validators.required]),
    });

    let categoryId = null;
    this.route.params.
      subscribe((params: Params) => {
        categoryId = params['Id'];
      });

    if (categoryId !== undefined) {

      this._apiService.getClothCategory(categoryId).subscribe
        ((category) => {
          if (category.Data !== null && category.Data !== undefined) {
            this.clothcategory = category.Data;
          }
          else {
            this.router.navigate(['ErrorPage']);
          }
        },
          (error) => {
            this.router.navigate(['ErrorPage']);
          });

    }


    this._apiService.getClothTypes()
      .subscribe((Response) => {
        this.Types = Response.Data;
        this.SelectedType = this.Types[0].Id;
        this.DataForm.controls['ClothTypeId'].setValue(this.SelectedType);
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
    }
  }

  SubmitData() {

    this.loadingLargeGroup = true;
    this.EnableSubmit = true;
    this.DataForm.markAllAsTouched();

    if (this.DataForm.valid) {
      debugger;
      let CategoryId = null;
      this.route.params.
        subscribe((params: Params) => {
          CategoryId = params['Id'];
        });

      if (CategoryId !== undefined) {
        this.clothcategory.Id = Number(CategoryId);
        this._apiService.updateClothCategory(this.clothcategory).subscribe
          ((data) => {
            this.loadingLargeGroup = false;
            this.EnableSubmit = false;
            if (data.Result === 0) {
              this.toastrService.showToast(EnumToastrStatus.SUCCESS, 'Success', 'Category Updated Successfully');
              this.router.navigate(['Clothes/Categories']);
            }
            else {
              this.toastrService.showToast(EnumToastrStatus.DANGER, 'Failed', data.Data);
            }
          },
            (error) => {
              this.loadingLargeGroup = false;
              this.EnableSubmit = false;
              this.toastrService.showToast(EnumToastrStatus.DANGER, 'Failed', 'Failed in Updating Category');
            });
      } else {
        this._apiService.
          addNewClothCategory(this.clothcategory).subscribe
          ((data) => {
            this.loadingLargeGroup = false;
            this.EnableSubmit = false;
            if (data.Result === 0) {
              this.toastrService.showToast(EnumToastrStatus.SUCCESS, 'Success', 'Category Added Successfully');
              this.router.navigate(['Clothes/Categories']);
            }
            else {
              this.toastrService.showToast(EnumToastrStatus.DANGER, 'Failed', data.Data);
            }
          },
            (error) => {
              this.loadingLargeGroup = false;
              this.EnableSubmit = false;
              this.toastrService.showToast(EnumToastrStatus.DANGER, 'Failed', 'Failed in Saving Category');
            });
      }
    } else {
      this.loadingLargeGroup = false;
      this.EnableSubmit = false;
    }
  }

}
