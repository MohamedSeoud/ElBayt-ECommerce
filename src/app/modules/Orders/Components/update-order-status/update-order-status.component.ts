import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { Subscription } from 'rxjs';
import { AppConfig } from '../../../../app.config';
import { EnumToastrStatus } from '../../../Shared/Enums/EnumToastrStatus';
import { AddOrderStatusDTO, OrderLookupStatusDTO, service } from '../../../Shared/Services/api-client.Service';
import { DataTableService } from '../../../Shared/Services/DataTableService';
import { ToastrService } from '../../../Shared/Services/ToastrService';

@Component({
  selector: 'ngx-update-order-status',
  templateUrl: './update-order-status.component.html'
})
export class UpdateOrderStatusComponent implements OnInit {

  TableColmuns = {
    StatusName: {
      title: 'Status',
      type: 'string',
    },
    CreatedDate: {
      title: 'Status Time',
      type: 'string',
    },
  };

  settings: any;
  source = new LocalDataSource();
  DataForm: FormGroup;
  loadingLargeGroup = false;
  EnableSubmit = false;
  adddata: Subscription;
  OrderStatus: AddOrderStatusDTO = { StatusId: 0 };
  Statuses: OrderLookupStatusDTO[];
  SelectedStatus: number;
  currentStatusId: number;


  constructor(private toastrService: ToastrService, private router: Router,
    private route: ActivatedRoute, private _apiService: service, private dataTableService: DataTableService) {
    this.settings = this.dataTableService.getTable(AppConfig.settings.PageSize, this.TableColmuns);

    let OrderId = null;
    this.route.params.
      subscribe((params: Params) => {
        OrderId = params['OrderId'];
      });

    if (OrderId !== undefined) {
      this._apiService.getOrderStatusDetails(OrderId)
        .subscribe((Response) => {
          const statues = Response.Data;
          this.source.load(statues.OrderStatuses.Statuses);
          this.Statuses = Response.Data.Statuses;
          this.SelectedStatus = statues.CurrentStatusId;
          this.currentStatusId = Response.Data.CurrentStatusId;
          this.OrderStatus.StatusId = this.currentStatusId;
        }, (error) => {
        });
    }
  }

  ngOnInit(): void {
    this.DataForm = new FormGroup({
      'Status': new FormControl(null, [Validators.required]),
    });

  }

  ngOnDestroy(): void {
    if (this.adddata !== null && this.adddata !== undefined)
      this.adddata.unsubscribe();
  }


  SubmitData() {
    debugger;
    this.loadingLargeGroup = true;
    this.EnableSubmit = true;
    this.DataForm.markAllAsTouched();

    let OrderId = null;
    this.route.params.
      subscribe((params: Params) => {
        OrderId = params['OrderId'];
      });
    if (this.DataForm.valid) {
      if (OrderId !== undefined) {
        if (this.currentStatusId !== this.OrderStatus.StatusId) {
          this.OrderStatus.OrderId = Number(OrderId);
          this.adddata = this._apiService.updateOrderStatus(this.OrderStatus).subscribe
            ((Response) => {
              this.loadingLargeGroup = false;
              this.EnableSubmit = false;
              if (Response.Result === 0) {
                this.toastrService.showToast(EnumToastrStatus.SUCCESS, 'Success', 'Status Updated Successfully');
                this.Statuses = Response.Data.Statuses;
                this.currentStatusId = Response.Data.CurrentStatusId;
                this.source.load(Response.Data.OrderStatuses.Statuses);
              }
              else {
                this.toastrService.showToast(EnumToastrStatus.DANGER, 'Failed', "Something Wrong!!");
              }
            },
              (error) => {
                this.loadingLargeGroup = false;
                this.EnableSubmit = false;
                this.toastrService.showToast(EnumToastrStatus.DANGER, 'Failed', 'Failed in Adding Status');
              });
        }
        else {
          this.toastrService.showToast(EnumToastrStatus.DANGER, 'Failed', "This Status Already Is Live Status");
        }
      }
    }
    this.loadingLargeGroup = false;
    this.EnableSubmit = false;
  }
}
