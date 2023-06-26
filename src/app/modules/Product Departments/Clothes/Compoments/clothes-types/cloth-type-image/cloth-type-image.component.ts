import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ngx-cloth-type-image',
  templateUrl: './cloth-type-image.component.html',
  styleUrls: ['./cloth-type-image.component.scss'],
})
export class ClothTypeImageComponent implements OnInit {

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
