import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ngx-brand-image',
  templateUrl: './brand-image.component.html',
  styleUrls: ['./brand-image.component.scss'],
})
export class BrandImageComponent implements OnInit {

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
