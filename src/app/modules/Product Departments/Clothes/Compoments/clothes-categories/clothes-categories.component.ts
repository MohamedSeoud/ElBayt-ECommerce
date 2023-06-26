import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { Subscription } from 'rxjs';
import { AppConfig } from '../../../../../app.config';
import { EnumToastrStatus } from '../../../../Shared/Enums/EnumToastrStatus';
import { EnumResponseResult, service } from '../../../../Shared/Services/api-client.Service';
import { DataTableService } from '../../../../Shared/Services/DataTableService';
import { ToastrService } from '../../../../Shared/Services/ToastrService';
import { BrandButtonViewComponent } from './table-buttons/brandbuttonview.component';
import { SizeButtonViewComponent } from './table-buttons/sizebuttonview.component';

@Component({
  selector: 'ngx-clothes-categories',
  templateUrl: './clothes-categories.component.html'
})
export class ClothesCategoriesComponent implements OnInit {


  TableColmuns = {
    Name: {
      title: 'Name',
      type: 'string',
    },
    Sizes: {
      title: 'Sizes',
      type: 'custom',
      renderComponent: SizeButtonViewComponent,
      onComponentInitFunction(instance) {
        instance.save.subscribe(row => {
        });
      },
    },
    Brands: {
      title: 'Brands',
      type: 'custom',
      renderComponent: BrandButtonViewComponent,
      onComponentInitFunction(instance) {
        instance.save.subscribe(row => {
        });
      },
    },
  };

  settings: any;
  source = new LocalDataSource();
  getdata: Subscription;

  constructor(private toastrService: ToastrService, private router: Router,
    private dataTableService: DataTableService, private _apiService: service) {
    this.settings = this.dataTableService.getTable(AppConfig.settings.PageSize, this.TableColmuns);
    this._apiService.getClothCategories()
      .subscribe((Response) => {
        const types = Response.Data;
        this.source.load(types);
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
    this.router.navigate(['Clothes/Categories/Add']);
  }

  onDelete(event): void {
    if (window.confirm('Are you sure you want to delete?')) {

      this._apiService.deleteClothCategory(event.data.Id).
        subscribe((Response) => {
          if (Response.Result === EnumResponseResult._0) {
            this.source.remove(event.data);
            this.toastrService.showToast(EnumToastrStatus.SUCCESS, 'Success', 'Category Deleted Successfully');
          } else {
            this.toastrService.showToast(EnumToastrStatus.DANGER, 'Failed', 'Cannot Delete This Category');
          }
        }, (error) => {
          this.toastrService.showToast(EnumToastrStatus.DANGER, 'Failed', 'Failed in Deleting Category');
        });
    } else {
    }
  }

  onEdit(event): void {
    this.router.navigate(['Clothes/Categories/' + event.data.Id + '/Edit']);

  }


}
