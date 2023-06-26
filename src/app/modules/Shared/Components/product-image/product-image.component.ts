import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ngx-product-image',
  templateUrl: './product-image.component.html',
  styleUrls: ['./product-image.component.scss'],
})
export class ProductImageComponent implements OnInit {

  @Input() src;
  @Input() IsDeleted = true;
  @Output() ImageDeleted = new EventEmitter<{ src: string }>();

  constructor() {
    console.log('ProductImageComponent_constructor');
  }

  ngOnInit(): void {
    console.log('ProductImageComponent_ngOnInit');
  }

  DeleteImage() {
    this.ImageDeleted.emit({
      src: this.src
    });
  }

}
