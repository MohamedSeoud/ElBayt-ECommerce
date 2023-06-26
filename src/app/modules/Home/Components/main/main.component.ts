import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
@Component({
  selector: 'ngx-main',
  templateUrl: './main.component.html'
})
export class MainComponent implements OnInit {

  TableColmuns = {
    Name: {
      title: 'Name',
      type: 'string',
    },
  };

  settings: any;
  source = new LocalDataSource();

  constructor() {

  }

  ngOnInit(): void {

  }

}
