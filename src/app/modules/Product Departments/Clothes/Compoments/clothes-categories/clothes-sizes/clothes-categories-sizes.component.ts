import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {  FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppConfig } from '../../../../../../app.config';
import { EnumToastrStatus } from '../../../../../Shared/Enums/EnumToastrStatus';
import {  ClothCategorySizesDTO, SelectedCategorySizesDTO, service } from '../../../../../Shared/Services/api-client.Service';
import { ToastrService } from '../../../../../Shared/Services/ToastrService';

@Component({
  selector: 'ngx-cloth-categories-sizes',
  templateUrl: './clothes-categories-sizes.component.html'
})
export class ClothCategoriesSizesComponent implements OnInit {

  DataForm: FormGroup;
  loadingLargeGroup = false;
  EnableSubmit = false;
  ExistBrandImage = false;
  sizes = new Array<ClothCategorySizesDTO>();
  Selectedsizes: SelectedCategorySizesDTO = {};
  BrandPic: string;
  FilesUrl = AppConfig.settings.FilesUrl;
  @ViewChild('SizeList') Sizes: ElementRef<HTMLInputElement>;

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

    this._apiService.getSelectedClothCategorySizes(CategoryId).subscribe
        ((Size) => {
          if (Size.Data !== null && Size.Data !== undefined) {
            this.sizes = Size.Data;
          }
          else {
            this.router.navigate(['ErrorPage']);
          }
        },
          (error) => {
            this.router.navigate(['ErrorPage']);
          });


  }


  SubmitData() {

    var CheckList = Array.from(this.Sizes.nativeElement.children[0].children[1].children);
    var sizes = new Array<number>();

    for (var i = 0; i < CheckList.length; i++) {
      var Item = CheckList[i].children[0];
      var classname = Item.children[0].children[1].className;

      var checked = classname.indexOf('checked');
      if (checked !== -1) {
        sizes.push(Number(Item.id));
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
      this.Selectedsizes.ClothCategoryId = Number(ProductId);
      this.Selectedsizes.Sizes = sizes;
      this._apiService.addClothCategorySizes(this.Selectedsizes).subscribe
            ((data) => {
              this.loadingLargeGroup = false;
              this.EnableSubmit = false;
              if (data.Result === 0) {
                this.toastrService.showToast(EnumToastrStatus.SUCCESS, 'Success', 'Sizes Updated Successfully');
                this.router.navigate(['Clothes/Categories']);
              }
              else {
                this.toastrService.showToast(EnumToastrStatus.DANGER, 'Failed', data.Errors[0]);
              }
            },
              (error) => {
                this.loadingLargeGroup = false;
                this.EnableSubmit = false;
                this.toastrService.showToast(EnumToastrStatus.DANGER, 'Failed', 'Failed in Updating Sizes');
              });
        }
     }

}
