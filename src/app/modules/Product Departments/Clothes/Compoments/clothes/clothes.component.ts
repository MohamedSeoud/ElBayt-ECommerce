import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { Subscription } from 'rxjs';
import { AppConfig } from '../../../../../app.config';
import { EnumToastrStatus } from '../../../../Shared/Enums/EnumToastrStatus';
import { EnumResponseResult, service } from '../../../../Shared/Services/api-client.Service';
import { DataTableService } from '../../../../Shared/Services/DataTableService';
import { ToastrService } from '../../../../Shared/Services/ToastrService';
import { AmountInfoButtonViewComponent } from './table-buttons/amountInfobuttonview.component';
import { ImageButtonViewComponent } from './table-buttons/Imagebuttonview.component';

@Component({
  selector: 'ngx-clothes',
  templateUrl: './clothes.component.html',
})
export class ClothesComponent implements OnInit {

  TableColmuns = {
    Name: {
      title: 'Name',
      type: 'string',
    },
    Pictures: {
      title: 'Pics',
      type: 'custom',
      renderComponent: ImageButtonViewComponent,
      onComponentInitFunction(instance) {
        instance.save.subscribe(row => {
        });
      },
    },
    AmountInfo: {
      title: 'Amount Info',
      type: 'custom',
      renderComponent: AmountInfoButtonViewComponent,
      onComponentInitFunction(instance) {
        instance.save.subscribe(row => {
        });
      },
    },
  };

  settings: any;
  source = new LocalDataSource();
  getdata: Subscription;

  constructor(private _apiService: service, private toastrService: ToastrService
    , private router: Router, private dataTableService: DataTableService) {
    this.settings = this.dataTableService.getTable(AppConfig.settings.PageSize, this.TableColmuns);
    this._apiService.getClothes()
      .subscribe((Response) => {
        const Clothes = Response.Data;
        this.source.load(Clothes);
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
    this.router.navigate(['Clothes/Products/Add']);
  }


  onDelete(event): void {
    if (window.confirm('Are you sure you want to delete?')) {

      this._apiService.deleteCloth(event.data.Id).
        subscribe((Response) => {
          if (Response.Result === EnumResponseResult._0) {
            this.source.remove(event.data);
            this.toastrService.showToast(EnumToastrStatus.SUCCESS, 'Success', 'Product Deleted Successfully');
          } else {
            this.toastrService.showToast(EnumToastrStatus.DANGER, 'Failed', 'Cannot Delete This Product');
          }
        }, (error) => {
          this.toastrService.showToast(EnumToastrStatus.DANGER, 'Failed', 'Failed in Deleting Product');
        });
    } else {
    }
  }

  onEdit(event): void {
    this.router.navigate(['Clothes/Products/' + event.data.Id + '/Edit']);

  }

}
