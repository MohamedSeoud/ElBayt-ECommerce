import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppConfig } from '../../../../../../app.config';
import { EnumToastrStatus } from '../../../../../Shared/Enums/EnumToastrStatus';
import { ClothTypeDTO, service } from '../../../../../Shared/Services/api-client.Service';
import { ToastrService } from '../../../../../Shared/Services/ToastrService';

@Component({
  selector: 'ngx-new-clothes-types',
  templateUrl: './new-clothes-types.component.html'
})
export class NewClothesTypesComponent implements OnInit {

  DataForm: FormGroup;
  loadingLargeGroup = false;
  EnableSubmit = false;
  ExistTypeImage = false;
  clothtype: ClothTypeDTO = {};
  TypePic: string;
  Departments: any;
  FilesUrl = AppConfig.settings.FilesUrl;
  SelectedDepartment: any;
  blob = new Blob([], { type: "application/pdf" });
  filedata: any;
  adddata: Subscription;

  constructor(private toastrService: ToastrService
    , private router: Router, private route: ActivatedRoute, private _apiService: service) {
  }

  ngOnInit(): void {
    this.DataForm = new FormGroup({
      'Name': new FormControl(null, [Validators.required]),
      'TypePic': new FormControl(null),
      'ClothDepartmentId': new FormControl(null, [Validators.required]),
    });

    let TypeId = null;
    this.route.params.
      subscribe((params: Params) => {
        TypeId = params['Id'];
      });

    if (TypeId !== undefined) {

      this._apiService.getClothType(TypeId).subscribe
        ((Type) => {
          if (Type.Data !== null && Type.Data !== undefined) {
            this.clothtype = Type.Data;
            this.TypePic = this.FilesUrl + this.clothtype.TypePic;
            this.ExistTypeImage = true;
          }
          else {
            this.router.navigate(['ErrorPage']);
          }
        },
          (error) => {
            this.router.navigate(['ErrorPage']);
          });

    }

    this._apiService.getClothDepartments()
      .subscribe((Departments) => {
        this.Departments = Departments.Data;
        this.SelectedDepartment = this.Departments[0].Id;
        this.DataForm.controls['ClothDepartmentId'].setValue(this.SelectedDepartment);
      }, (error) => {
      });

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

    let TypeId = null;
    this.route.params.
      subscribe((params: Params) => {
        TypeId = params['Id'];
      });

    if (this.DataForm.valid) {

      if (file.length === 0 && TypeId === undefined) {
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

        if (TypeId !== undefined) {
          this.clothtype.Id = TypeId;
          this.adddata = this._apiService.updateClothType(this.clothtype.ClothDepartmentId,
            this.clothtype.Name, this.filedata, this.clothtype.Id,
            this.filedata).subscribe
            ((data) => {
              this.loadingLargeGroup = false;
              this.EnableSubmit = false;
              if (data.Result === 0) {
                this.toastrService.showToast(EnumToastrStatus.SUCCESS, 'Success', 'Type Updated Successfully');
                this.router.navigate(['Clothes/Types']);
              }
              else {
                this.toastrService.showToast(EnumToastrStatus.DANGER, 'Failed', data.Data);
              }
            },
              (error) => {
                this.loadingLargeGroup = false;
                this.EnableSubmit = false;
                this.toastrService.showToast(EnumToastrStatus.DANGER, 'Failed', 'Failed in Updating Type');
              });
        }
        else {
          this.adddata =  this._apiService.
            addNewClothType(this.clothtype.ClothDepartmentId, this.clothtype.Name,
              this.clothtype.Name, 0, this.filedata).subscribe
            ((data) => {
              this.loadingLargeGroup = false;
              this.EnableSubmit = false;
              if (data.Result === 0) {
                this.toastrService.showToast(EnumToastrStatus.SUCCESS, 'Success', 'Type Added Successfully');
                this.router.navigate(['Clothes/Types']);
              } else {
                this.toastrService.showToast(EnumToastrStatus.DANGER, 'Failed', data.Data);
              }
            },
              (error) => {
                this.loadingLargeGroup = false;
                this.EnableSubmit = false;
                this.toastrService.showToast(EnumToastrStatus.DANGER, 'Failed', 'Failed in Saving Type');
              });
        }
      }
    } else {
      this.loadingLargeGroup = false;
      this.EnableSubmit = false;
    }
  }

}
