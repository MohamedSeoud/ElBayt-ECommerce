import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {  FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppConfig } from '../../../../../../app.config';
import { EnumToastrStatus } from '../../../../../Shared/Enums/EnumToastrStatus';
import { ClothCategoryBrandsDTO, SelectedCategoryBrandsDTO, service } from '../../../../../Shared/Services/api-client.Service';
import { ToastrService } from '../../../../../Shared/Services/ToastrService';

@Component({
  selector: 'ngx-clothes-categories-brands',
  templateUrl: './clothes-categories-brands.component.html'
})
export class ClothCategoriesBrandsComponent implements OnInit {

  DataForm: FormGroup;
  loadingLargeGroup = false;
  EnableSubmit = false;
  ExistBrandImage = false;
  brands = new Array<ClothCategoryBrandsDTO>();
  Selectedbrands: SelectedCategoryBrandsDTO = {};
  BrandPic: string;
  FilesUrl = AppConfig.settings.FilesUrl;
  @ViewChild('BrandList') Brands: ElementRef<HTMLInputElement>;

  constructor(private _apiService: service, private toastrService: ToastrService
    , private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.DataForm = new FormGroup({
    });

    let CategoryId = null;
    this.route.params.
      subscribe((params: Params) => {
        CategoryId = params['Id'];
      });

    this._apiService.getSelectedClothCategoryBrands(CategoryId).subscribe
        ((Brand) => {
          if (Brand.Data !== null && Brand.Data !== undefined) {
            this.brands = Brand.Data;
          }
          else {
            this.router.navigate(['ErrorPage']);
          }
        },
          (error) => {
            this.router.navigate(['ErrorPage']);
          });


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

    var CheckList = Array.from(this.Brands.nativeElement.children[0].children[1].children);
    var brands = new Array<number>();

    for (var i = 0; i < CheckList.length; i++) {
      var Item = CheckList[i].children[0];
      var classname = Item.children[0].children[1].className;

      var checked = classname.indexOf('checked');
      if (checked !== -1) {
        brands.push(Number(Item.id));
      }
    }

    this.loadingLargeGroup = true;
    this.EnableSubmit = true;
    this.DataForm.markAllAsTouched();

    let ProductId = null;
    this.route.params.
      subscribe((params: Params) => {
        ProductId = params['Id'];
      });


    if (ProductId !== undefined) {
      this.Selectedbrands.ClothCategoryId = Number(ProductId);
      this.Selectedbrands.Brands = brands;
      this._apiService.addClothCategoryBrands(this.Selectedbrands).subscribe
            ((data) => {
              this.loadingLargeGroup = false;
              this.EnableSubmit = false;
              if (data.Result === 0) {
                this.toastrService.showToast(EnumToastrStatus.SUCCESS, 'Success', 'Brands Updated Successfully');
                this.router.navigate(['Clothes/Categories']);
              }
              else {
                this.toastrService.showToast(EnumToastrStatus.DANGER, 'Failed', data.Errors[0]);
              }
            },
              (error) => {
                this.loadingLargeGroup = false;
                this.EnableSubmit = false;
                this.toastrService.showToast(EnumToastrStatus.DANGER, 'Failed', 'Failed in Updating Brands');
              });
        }
     }

}
