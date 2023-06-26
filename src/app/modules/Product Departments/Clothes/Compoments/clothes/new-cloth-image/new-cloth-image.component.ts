import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppConfig } from '../../../../../../app.config';
import { EnumToastrStatus } from '../../../../../Shared/Enums/EnumToastrStatus';
import { ClothImageDTO, EnumResponseResult, service } from '../../../../../Shared/Services/api-client.Service';
import { ToastrService } from '../../../../../Shared/Services/ToastrService';

@Component({
  selector: 'ngx-new-cloth-image',
  templateUrl: './new-cloth-image.component.html',
})
export class NewClothImageComponent implements OnInit {

  DataForm: FormGroup;
  status: string;
  Images: Array<ClothImageDTO>;
  loadingLargeGroup = false;
  EnableSubmit = false;
  FilesUrl = AppConfig.settings.FilesUrl;
  blob = new Blob([], { type: "application/pdf" });
  filedata: any;
  adddata: Subscription;


  constructor(private toastrService: ToastrService, private _apiService: service
    , private router: Router, private route: ActivatedRoute) {
    this.DataForm = new FormGroup({
      'URL': new FormControl(null, [Validators.required]),
    });

    let ClothId = null;
    this.route.params.
      subscribe((params: Params) => {
        ClothId = params['Id'];
      });

    if (ClothId !== undefined) {

      this._apiService.getClothImages(ClothId).subscribe
        ((Images) => {
          if (Images.Data !== null && Images.Data !== undefined) {
            this.Images = Images.Data;
            this.Images.forEach((image) => {
              image.URL = this.FilesUrl + image.URL;
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


  SubmitData(file) {
    this.loadingLargeGroup = true;
    this.EnableSubmit = true;
    if (this.Images.length > 1) {
      this.toastrService.showToast(EnumToastrStatus.WARNING, 'Failed', 'This Is A Maximum of Number You Can Upload !!');
    }
    else if (file.length === 0) {
      this.toastrService.showToast(EnumToastrStatus.WARNING, 'Failed', 'No Files Uploaded !!');
    }
    else if (file.length > 1) {
      this.toastrService.showToast(EnumToastrStatus.WARNING, 'Failed', 'Please Choose One File !! ');
    }
    else {
      if (this.DataForm.valid) {

        if (file.length > 0) {
          this.filedata = { data: file[0], fileName: file[0]?.name };
        } else {
          this.filedata = { data: this.blob, fileName: 'No File' };
        }

        let ClothId = null;

        this.route.params.
          subscribe((params: Params) => {
            ClothId = params['Id'];
          });

        if (ClothId !== null) {
          this._apiService.uploadClothImage(this.filedata, ClothId)
            .subscribe((res) => {
              if (res.Data !== undefined) {
                if (res.Result === 0) {
                  this.loadingLargeGroup = false;
                  this.EnableSubmit = false;
                  this.toastrService.showToast(EnumToastrStatus.SUCCESS, 'Success', 'Image Added Successfully');
                  var image = res.Data;
                  image.URL = this.FilesUrl + image.URL;
                  this.Images.push(image);
                }
                else {
                  this.loadingLargeGroup = false;
                  this.EnableSubmit = false;
                  this.toastrService.showToast(EnumToastrStatus.DANGER, 'Failed', 'Failed in Adding Image');
                }
              }
            },
              (error) => {
                this.loadingLargeGroup = false;
                this.EnableSubmit = false;
                this.toastrService.showToast(EnumToastrStatus.DANGER, 'Failed', 'Failed in Adding Image');
              });
        }
      }

    }

  }

  OnDeleteImage(ImageDeleted: { src: string }) {
    var ImageId = this.Images.find(c => c.URL === ImageDeleted.src).Id;
    this._apiService.deleteClothImage(ImageId)
      .subscribe((res) => {
      if (res.Data !== undefined) {
        if (res.Result === EnumResponseResult._0) {
          this.loadingLargeGroup = false;
          this.EnableSubmit = false;
          this.toastrService.showToast(EnumToastrStatus.SUCCESS, 'Success', 'Image Deleted Successfully');
          var Index = this.Images.findIndex(c => c.Id === ImageId);
          this.Images.splice(Index, 1);
        }
        else {
          this.loadingLargeGroup = false;
          this.EnableSubmit = false;
          this.toastrService.showToast(EnumToastrStatus.DANGER, 'Failed', 'Failed in Deleting Image');
        }
      }
    },
      (error) => {
        this.loadingLargeGroup = false;
        this.EnableSubmit = false;
        this.toastrService.showToast(EnumToastrStatus.DANGER, 'Failed', 'Failed in Adding Image');
      });

  }

}
