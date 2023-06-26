import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { Subscription } from 'rxjs';
import { AppConfig } from '../../../../../app.config';
import { EnumToastrStatus } from '../../../../Shared/Enums/EnumToastrStatus';
import { EnumResponseResult, service } from '../../../../Shared/Services/api-client.Service';
import { DataTableService } from '../../../../Shared/Services/DataTableService';
import { ToastrService } from '../../../../Shared/Services/ToastrService';

@Component({
  selector: 'ngx-cloth-brands',
  templateUrl: './cloth-brands.component.html'
})
export class ClothBrandsComponent implements OnInit {

  TableColmuns = {
    Name: {
      title: 'Name',
      type: 'string',
    },
  };

  settings: any;
  source = new LocalDataSource();
  getdata: Subscription;

  constructor(private toastrService: ToastrService, private router: Router,
    private dataTableService: DataTableService, private _apiService: service) {
    this.settings = this.dataTableService.getTable(AppConfig.settings.PageSize, this.TableColmuns);
    this._apiService.getClothBrands()
      .subscribe((Response) => {
        const brands = Response.Data;
        this.source.load(brands);
      }, (error) => {
      });
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    if (this.getdata !== null && this.getdata !== undefined)
      this.getdata.unsubscribe();
  }

  onCreate(event): void {
    this.router.navigate(['Clothes/Brands/Add']);
  }

  onDelete(event): void {
    if (window.confirm('Are you sure you want to delete?')) {

      this._apiService.deleteClothBrand(event.data.Id).
        subscribe((Response) => {
          if (Response.Result === EnumResponseResult._0) {
            this.source.remove(event.data);
            this.toastrService.showToast(EnumToastrStatus.SUCCESS, 'Success', 'Brand Deleted Successfully');
          } else {
            this.toastrService.showToast(EnumToastrStatus.DANGER, 'Failed', 'Cannot Delete This Brand');
          }
        }, (error) => {
          this.toastrService.showToast(EnumToastrStatus.DANGER, 'Failed', 'Failed in Deleting Brand');
        });
    } else {
    }
  }

  onEdit(event): void {
    this.router.navigate(['Clothes/Brands/' + event.data.Id + '/Edit']);

  }

}
