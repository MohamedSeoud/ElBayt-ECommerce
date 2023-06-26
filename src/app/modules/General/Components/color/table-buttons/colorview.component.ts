import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'ngx-color-view',
  template: `
 <input class="form-group" ejs-colorpicker id='color-picker' disabled type='color' [value]='value' />
  `,
})
export class ColorViewComponent implements ViewCell, OnInit {
  renderValue: string;

  @Input() value: string | number;
  @Input() rowData: any;

  constructor(private router: Router) {

  }
  ngOnInit() {
  }
}
