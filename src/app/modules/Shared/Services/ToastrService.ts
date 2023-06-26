import { Injectable } from '@angular/core';
import {
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrConfig,
  NbToastrService} from '@nebular/theme';
import { EnumToastrStatus } from '../Enums/EnumToastrStatus';

@Injectable({
  providedIn: 'root'})

export class ToastrService {

  config: NbToastrConfig;

  index = 1;
  destroyByClick = true;
  duration = 4000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;


  constructor(private toastrService: NbToastrService) {
  }


  public showToast(ToastrStatus: EnumToastrStatus, title: string, body: string) {
    const config = {
      status: ToastrStatus,
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
    };
    const titleContent = title ? `${title}` : '';

    this.index += 1;
    this.toastrService.show(
      body,
      `${titleContent}`,
      config);
  }
}
