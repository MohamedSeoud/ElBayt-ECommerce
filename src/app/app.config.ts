import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAppConfig } from './app-config.model';
import { environment } from '../environments/environment';
import { ApplicationSettings } from './Modules/Shared/Models/application-settings';
/*import { environment } from '../environments/environment.prod';*/

@Injectable({
  providedIn: 'root'
})
export class AppConfig {

  static settings: IAppConfig;
  static ApiServerLink = 'api/v1.0/ElBayt/';
  static currentLanguage: 'ar' | 'en' = 'ar';
  private static appSettings: ApplicationSettings[] = [];
  private jsonFile = '';
  constructor(
    private http: HttpClient,
  ) {
  }


  static addAllAppSettings(data: ApplicationSettings[]): void {
    this.appSettings = [...data];
  }

  static addAppSetting(data: ApplicationSettings): void {
    this.appSettings.push({ ...data });
  }

  static getAppSettings(): ApplicationSettings[] {
    return [...this.appSettings];
  }

  static getAppSettingsByModule(moduleName: string): ApplicationSettings[] {
    return [...this.appSettings.filter(c => c.module === moduleName)];
  }

  static getAppValueByKey(moduleName: string, key: string, defaultValue: any = null): string {
    const item = this.appSettings.find(c => c.module === moduleName && c.key === key);
    return item ? item.value : defaultValue;
  }

  load() {
    if (environment.name === 'local') {
      this.jsonFile = `/assets/config/config.${environment.name}.json`;
    } else {
      this.jsonFile = `assets/config/config.${environment.name}.json`;
    }
    return new Promise<void>((resolve, reject) => {
      this.http
        .get(this.jsonFile)
        .toPromise()
        .then((response: any) => {
          AppConfig.settings = response as IAppConfig;
          resolve();
        })
        .catch((response: any) => {
          console.log(response);
          reject(`Could not load file '${this.jsonFile}': ${JSON.stringify(response)}`);
          location.reload();
        });
    });
  }

}
