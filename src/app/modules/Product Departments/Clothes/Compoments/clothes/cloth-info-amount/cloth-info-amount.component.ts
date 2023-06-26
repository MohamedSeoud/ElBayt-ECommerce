import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { AppConfig } from '../../../../../../app.config';
import { ColorViewComponent } from '../../../../../General/Components/color/table-buttons/colorview.component';
import { EnumToastrStatus } from '../../../../../Shared/Enums/EnumToastrStatus';
import { service } from '../../../../../Shared/Services/api-client.Service';
import { DataTableService } from '../../../../../Shared/Services/DataTableService';
import { ToastrService } from '../../../../../Shared/Services/ToastrService';

@Component({
  selector: 'ngx-cloth-info-amount',
  templateUrl: './cloth-info-amount.component.html'
})
export class ClothInfoAmountComponent implements OnInit {


  TableColmuns = {
    Size: {
      title: 'Size',
      type: 'string',
    },
    Color: {
      title: 'Color',
      type: 'custom',
      renderComponent: ColorViewComponent,
      onComponentInitFunction(instance) {
      },
    },
    Price: {
      title: 'Price',
      type: 'string',
    },
    PriceAfterDiscount: {
      title: 'Price After Discount',
      type: 'string',
    },
    Amount: {
      title: 'Amount',
      type: 'string',
    },
  };

  settings: any;
  source = new LocalDataSource();
  ClothId = null;

  constructor(private _apiService: service, private toastrService: ToastrService
    , private router: Router, private dataTableService: DataTableService, private route: ActivatedRoute) {
    this.settings = this.dataTableService.getTable(AppConfig.settings.PageSize, this.TableColmuns);

    this.route.params.
      subscribe((params: Params) => {
        this.ClothId = params['ClothId'];
      });

    this._apiService.getClothInfo(this.ClothId)
      .subscribe((Response) => {
        const Info = Response.Data;
        this.source.load(Info);
      }, (error) => {
      });

  }

  ngOnInit(): void {
  }


  onCreate(event): void {
    var link = 'Clothes/Product/' + this.ClothId + '/Info/Add';
    this.router.navigate([link]);
  }


  onDelete(event): void {
    if (window.confirm('Are you sure you want to delete?')) {

      this._apiService.deleteClothInfo(event.data.Id).
        subscribe((Response) => {
          const res = Response.Data;
          if (res === true) {
            this.source.remove(event.data);
            this.toastrService.showToast(EnumToastrStatus.SUCCESS, 'Success', 'Info Deleted Successfully');
          } else {
            this.toastrService.showToast(EnumToastrStatus.DANGER, 'Failed', 'Cannot Delete This Info');
          }
        }, (error) => {
          this.toastrService.showToast(EnumToastrStatus.DANGER, 'Failed', 'Failed in Deleting Info');
        });
    } else {
    }
  }

  onEdit(event): void {
    var link = 'Clothes/Product/' + this.ClothId + '/Info/Edit/'+ event.data.Id;
    this.router.navigate([link]);

  }


}
