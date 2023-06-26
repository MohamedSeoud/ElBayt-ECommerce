import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { AppConfig } from '../../../app.config';
import {  service } from '../../Shared/Services/api-client.Service';
import { DataTableService } from '../../Shared/Services/DataTableService';
import { ToastrService } from '../../Shared/Services/ToastrService';
import { UpdateButtonViewComponent } from './table-buttons/updatebuttonview.component';
@Component({
  selector: 'ngx-orders',
  templateUrl: './orders.component.html'
})
export class OrdersComponent implements OnInit {

  TableColmuns = {
    ClientName: {
      title: 'Client Name',
      type: 'string',
    },
    OrderStatus: {
      title: 'Order Status',
      type: 'string',
    },
    OrderTime: {
      title: 'Order Time',
      type: 'string',
    },
    Statuses: {
      title: 'Statuses',
      type: 'custom',
      renderComponent: UpdateButtonViewComponent,
      onComponentInitFunction(instance) {
        instance.save.subscribe(row => {
        });
      },
    },
  };

  settings: any;
  source = new LocalDataSource();

  constructor(private _apiService: service, private toastrService: ToastrService
    , private router: Router, private dataTableService: DataTableService) {
    this.settings = this.dataTableService.getTable(AppConfig.settings.PageSize, this.TableColmuns);
    this._apiService.getOrders()
      .subscribe((Response) => {
        const orders = Response.Data;
        this.source.load(orders);
      }, (error) => {
      });
  }

  ngOnInit(): void {

  }

  onCreate(event): void {
    this.router.navigate(['General/Colors/Add']);
  }


  onEdit(event): void {
    this.router.navigate(['General/Colors/' + event.data.Id + '/Edit']);

  }

}
