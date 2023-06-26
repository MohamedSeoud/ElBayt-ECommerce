import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})

export class DataTableService {

  settings = null;

  constructor() {
  }


  public getTable(PageSize, Columns) {
    const pager = {
      display: true,
      perPage: PageSize,
    };

    const columns = Columns;

    this.settings = {
      hideSubHeader: false,
      pager: pager,
      mode: 'external',
      add: {
        addButtonContent: '<i  class="nb-plus"></i>',
        createButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
      },
      edit: {
        editButtonContent: '<i class="nb-edit"></i>',
        saveButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
        confirmSave: true,
      },
      delete: {
        deleteButtonContent: '<i class="nb-trash"></i>',
        confirmDelete: true,
      },
      columns: columns,
    };

    return this.settings;
  }

}
