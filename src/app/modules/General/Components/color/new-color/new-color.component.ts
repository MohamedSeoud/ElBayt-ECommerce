import { Component, OnInit } from '@angular/core';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EnumToastrStatus } from '../../../../Shared/Enums/EnumToastrStatus';
import { ColorDTO, service } from '../../../../Shared/Services/api-client.Service';
import { ToastrService } from '../../../../Shared/Services/ToastrService';

@Component({
  selector: 'ngx-new-color',
  templateUrl: './new-color.component.html'
})
export class NewColorComponent implements OnInit {

  DataForm: FormGroup;
  loadingLargeGroup = false;
  EnableSubmit = false;
  color: ColorDTO = {};
  DepartmentPic: string;




  constructor(private _apiService: service, private toastrService: ToastrService
    , private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.DataForm = new FormGroup({
      'Name': new FormControl(null, [Validators.required]),
      'Color': new FormControl(null, [Validators.required])
    });

    let ColorId = null;
    this.route.params.
      subscribe((params: Params) => {
        ColorId = params['Id'];
      });

    if (ColorId !== undefined) {

      this._apiService.getColor(ColorId).subscribe
        ((color) => {
          if (color.Data !== null && color.Data !== undefined) {
            this.color = color.Data;
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

  ValidateInput(ControlName: string) {

    switch (ControlName) {
      case 'Name':
        if (this.DataForm.get(ControlName).touched && !this.DataForm.get(ControlName).valid) {
          return 'danger';
        }
      case 'Color':
        if (this.DataForm.get(ControlName).touched && !this.DataForm.get(ControlName).valid) {
          return 'danger';
        }
    }
  }


  SubmitData() {

    this.loadingLargeGroup = true;
    this.EnableSubmit = true;
    this.DataForm.markAllAsTouched();

    let ColorId = null;
    this.route.params.
      subscribe((params: Params) => {
        ColorId = params['Id'];
      });

    if (this.DataForm.valid) {

      if (ColorId !== undefined) {
        this.color.Id = Number(ColorId);
        this._apiService.updateColor(this.color).subscribe
          ((data) => {
            this.loadingLargeGroup = false;
            this.EnableSubmit = false;
            if (data.Result === 0) {
              this.toastrService.showToast(EnumToastrStatus.SUCCESS, 'Success', 'Color Updated Successfully');
              this.router.navigate(['General/Colors']);
            }
            else {
              this.toastrService.showToast(EnumToastrStatus.DANGER, 'Failed', data.Data);
            }
          },
            (error) => {
              this.loadingLargeGroup = false;
              this.EnableSubmit = false;
              this.toastrService.showToast(EnumToastrStatus.DANGER, 'Failed', 'Failed in Updating Color');
            });
      }
      else {
        this._apiService.
          addNewColor(this.color).subscribe
          ((data) => {
            this.loadingLargeGroup = false;
            this.EnableSubmit = false;
            if (data.Result === 0) {
              this.toastrService.showToast(EnumToastrStatus.SUCCESS, 'Success', 'Color Added Successfully');
              this.router.navigate(['General/Colors']);
            } else {
              this.toastrService.showToast(EnumToastrStatus.DANGER, 'Failed', data.Data);
            }
          },
            (error) => {
              this.loadingLargeGroup = false;
              this.EnableSubmit = false;
              this.toastrService.showToast(EnumToastrStatus.DANGER, 'Failed', 'Failed in Saving Color');
            });
      }
    }
    else {
      this.loadingLargeGroup = false;
      this.EnableSubmit = false;
    }
  }

  OnChange($event) {
    this.color.Color = $event.target.value;
  }
}
