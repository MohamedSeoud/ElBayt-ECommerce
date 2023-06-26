import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { Subscription } from 'rxjs';
import { AppConfig } from '../../../../../app.config';
import { EnumToastrStatus } from '../../../../Shared/Enums/EnumToastrStatus';
import { EnumResponseResult, service } from '../../../../Shared/Services/api-client.Service';
import { DataTableService } from '../../../../Shared/Services/DataTableService';
import { ToastrService } from '../../../../Shared/Services/ToastrService';


@Component({
  selector: 'ngx-cloth-sizes',
  templateUrl: './cloth-sizes.component.html'
})
export class ClothSizesComponent implements OnInit {


  TableColmuns = {
    Name: {
      title: 'Name',
      type: 'string',
    },
    Abbreviation: {
      title: 'Abbreviation',
      type: 'string',
    },
  };

  settings: any;
  source = new LocalDataSource();
  getdata: Subscription;


  constructor(private _apiService: service, private toastrService: ToastrService
    , private router: Router, private dataTableService: DataTableService, private route: ActivatedRoute) {
    this.settings = this.dataTableService.getTable(AppConfig.settings.PageSize, this.TableColmuns);


    this._apiService.getSizes()
      .subscribe((Response) => {
        const Sizes = Response.Data;
        this.source.load(Sizes);
      }, (error) => {
      });

  }

  ngOnInit(): void {
  }


  onCreate(event): void {
    this.router.navigate(['Clothes/Sizes/Add']);
  }

  ngOnDestroy(): void {
    if (this.getdata !== null && this.getdata !== undefined)
      this.getdata.unsubscribe();
  }

  onDelete(event): void {
    if (window.confirm('Are you sure you want to delete?')) {

      this._apiService.deleteClothSize(event.data.Id).
        subscribe((Response) => {
          const res = Response.Data;
          if (Response.Result === EnumResponseResult._0) {
            this.source.remove(event.data);
            this.toastrService.showToast(EnumToastrStatus.SUCCESS, 'Success', 'Size Deleted Successfully');
          } else {
            this.toastrService.showToast(EnumToastrStatus.DANGER, 'Failed', 'Cannot Delete This Size');
          }
        }, (error) => {
          this.toastrService.showToast(EnumToastrStatus.DANGER, 'Failed', 'Failed in Deleting Size');
        });
    } else {
    }
  }

  onEdit(event): void {
    this.router.navigate(['Clothes/Sizes/' + event.data.Id + '/Edit']);

  }


}
