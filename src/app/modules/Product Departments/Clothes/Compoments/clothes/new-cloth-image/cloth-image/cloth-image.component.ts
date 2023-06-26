import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ngx-cloth-image',
  templateUrl: './cloth-image.component.html',
  styleUrls: ['./cloth-image.component.scss'],
})

export class ClothImageComponent implements OnInit {

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
