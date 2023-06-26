import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'ngx-size-button-view',
  template: `
 <button nbButton status="danger" class="appearance-outline size-medium shape-rectangle status-primary ng-star-inserted nb-transition" (click)="onClick()"  outline>
Amount Info</button>
  `,
})
export class AmountInfoButtonViewComponent implements ViewCell, OnInit {
  renderValue: string;

  @Input() value: string | number;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();


  constructor(private router: Router) {

  }
  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
  }

  onClick() {

    this.router.navigate(['Clothes/Product/' + this.rowData.Id + '/Info']);
    this.save.emit(this.rowData);
  }
}
