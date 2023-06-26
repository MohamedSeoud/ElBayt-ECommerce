import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ngx-department-image',
  templateUrl: './department-image.component.html',
  styleUrls: ['./department-image.component.scss'],
})
export class DepartmentImageComponent implements OnInit {

  @Input() src;
  @Input() IsDeleted = true;
  @Output() ImageDeleted = new EventEmitter<{ src: string }>();

  constructor() {
  }

  ngOnInit(): void {
  }

  DeleteImage() {
    this.ImageDeleted.emit({
      src: this.src
    });
  }

}
