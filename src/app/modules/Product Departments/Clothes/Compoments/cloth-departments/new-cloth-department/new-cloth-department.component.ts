import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppConfig } from '../../../../../../app.config';
import { EnumToastrStatus } from '../../../../../Shared/Enums/EnumToastrStatus';
import { ClothDepartmentDTO, service } from '../../../../../Shared/Services/api-client.Service';
import { ToastrService } from '../../../../../Shared/Services/ToastrService';

@Component({
  selector: 'ngx-new-cloth-department',
  templateUrl: './new-cloth-department.component.html'
})
export class NewClothDepartmentComponent implements OnInit {

  DataForm: FormGroup;
  loadingLargeGroup = false;
  EnableSubmit = false;
  ExistDepartmentImage = false;
  clothdepartment: ClothDepartmentDTO = {
    Name: null,
    DepartmentPic: null,
    Id: 0
  };
  DepartmentPic: string;
  FilesUrl = AppConfig.settings.FilesUrl;
  blob = new Blob([], { type: "application/pdf" });
  filedata: any;
  adddata: Subscription;


  constructor( private toastrService: ToastrService
 , private router: Router,
    private route: ActivatedRoute, private _apiService: service) {
  }

  ngOnInit(): void {
    this.DataForm = new FormGroup({
      'Name': new FormControl(null, [Validators.required]),
      'DepartmentPic': new FormControl(null),
    });

    let DepartmentId = null;
    this.route.params.
      subscribe((params: Params) => {
        DepartmentId = params['Id'];
      });

    if (DepartmentId !== undefined) {

      this.adddata = this._apiService.getClothDepartment(DepartmentId).subscribe
        ((department) => {
          if (department.Data !== null && department.Data !== undefined) {
            this.clothdepartment = department.Data;
            this.DepartmentPic = this.FilesUrl + this.clothdepartment.DepartmentPic;
            this.ExistDepartmentImage = true;
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

    let DepartmentId = null;
    this.route.params.
      subscribe((params: Params) => {
        DepartmentId = params['Id'];
      });

    if (this.DataForm.valid) {

      if (file.length === 0 && DepartmentId === undefined) {
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

        if (DepartmentId !== undefined) {
          this.clothdepartment.Id = DepartmentId;
          this.adddata = this._apiService.updateClothDepartment(this.clothdepartment.Name,
            this.clothdepartment.Name, this.clothdepartment.Id,
            this.filedata).subscribe
            ((data) => {
              this.loadingLargeGroup = false;
              this.EnableSubmit = false;
              if (data.Result === 0) {
                this.toastrService.showToast(EnumToastrStatus.SUCCESS, 'Success', 'Department Updated Successfully');
                this.router.navigate(['Clothes/Departments']);
              }
              else {
                this.toastrService.showToast(EnumToastrStatus.DANGER, 'Failed', data.Data);
              }
            },
              (error) => {
                this.loadingLargeGroup = false;
                this.EnableSubmit = false;
                this.toastrService.showToast(EnumToastrStatus.DANGER, 'Failed', 'Failed in Updating Department');
              });
        } else {
          this.adddata = this._apiService.
            addNewClothDepartment(this.clothdepartment.Name,
              this.clothdepartment.Name, this.clothdepartment.Id,
              this.filedata).subscribe
            ((data) => {
              this.loadingLargeGroup = false;
              this.EnableSubmit = false;
              if (data.Result === 0) {
                this.toastrService.showToast(EnumToastrStatus.SUCCESS, 'Success', 'Department Added Successfully');
                this.router.navigate(['Clothes/Departments']);
              } else {
                this.toastrService.showToast(EnumToastrStatus.DANGER, 'Failed', data.Data);
              }
            },
              (error) => {
                this.loadingLargeGroup = false;
                this.EnableSubmit = false;
                this.toastrService.showToast(EnumToastrStatus.DANGER, 'Failed', 'Failed in Saving Department');
              });
        }
      }
    } else {
      this.loadingLargeGroup = false;
      this.EnableSubmit = false;
    }
  }


}
