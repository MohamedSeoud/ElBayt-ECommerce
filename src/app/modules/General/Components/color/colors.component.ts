import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { AppConfig } from '../../../../app.config';
import { EnumToastrStatus } from '../../../Shared/Enums/EnumToastrStatus';
import { EnumResponseResult, service } from '../../../Shared/Services/api-client.Service';
import { DataTableService } from '../../../Shared/Services/DataTableService';
import { ToastrService } from '../../../Shared/Services/ToastrService';
import { ColorViewComponent } from './table-buttons/colorview.component';

@Component({
  selector: 'ngx-colors',
  templateUrl: './colors.component.html'
})
export class ColorsComponent implements OnInit {

  TableColmuns = {
    Name: {
      title: 'Name',
      type: 'string',
    },
    Color: {
      title: 'Color',
      type: 'custom',
      renderComponent: ColorViewComponent,
      onComponentInitFunction(instance) {
      },
    },
  };

  settings: any;
  source = new LocalDataSource();

  constructor(private _apiService: service, private toastrService: ToastrService
    , private router: Router, private dataTableService: DataTableService) {
    this.settings = this.dataTableService.getTable(AppConfig.settings.PageSize, this.TableColmuns);
    this._apiService.getColors()
      .subscribe((Response) => {
        const colors = Response.Data;
        this.source.load(colors);
      }, (error) => {
      });
  }

  ngOnInit(): void {

  }

  onCreate(event): void {
    this.router.navigate(['General/Colors/Add']);
  }

  onDelete(event): void {
    if (window.confirm('Are you sure you want to delete?')) {

      this._apiService.deleteColor(event.data.Id).
        subscribe((Response) => {
          const res = Response.Data;
          if (Response.Result === EnumResponseResult._0) {
            this.source.remove(event.data);
            this.toastrService.showToast(EnumToastrStatus.SUCCESS, 'Success', 'Color Deleted Successfully');
          } else {
            this.toastrService.showToast(EnumToastrStatus.DANGER, 'Failed', 'Cannot Delete This Color');
          }
        }, (error) => {
          this.toastrService.showToast(EnumToastrStatus.DANGER, 'Failed', 'Failed in Deleting Color');
        });
    } else {
    }
  }

  onEdit(event): void {
    this.router.navigate(['General/Colors/' + event.data.Id + '/Edit']);

  }

}
