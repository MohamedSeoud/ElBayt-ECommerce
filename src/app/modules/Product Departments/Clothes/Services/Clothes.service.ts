import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '../../../../app.config';


@Injectable({
  providedIn: 'root',
})
export class ClothesService {
  private baseUrlElBayt = AppConfig.settings ? AppConfig.settings.baseAPIUrl : null;
  private endPointUrl = AppConfig.ApiServerLink ? AppConfig.ApiServerLink + 'Clothes/' : null;
  constructor(private httpClient: HttpClient) {
    this.endPointUrl = this.baseUrlElBayt + this.endPointUrl;
  }


}
