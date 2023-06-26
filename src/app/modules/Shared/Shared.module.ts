import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbSpinnerModule,
  NbUserModule} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { DataTableService } from '../Shared/Services/DataTableService';
import { ErrorPageComponent } from './Components/error-page/error-page.component';
import { ProductImageComponent } from './Components/product-image/product-image.component';
import { ToastrService } from './Services/ToastrService';
import { SharedRoutingModule } from './Shared-routing.module';

@NgModule({
  imports: [
    SharedRoutingModule,
    NbInputModule,
    NbCardModule,
    ThemeModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    NbSelectModule,
    NbIconModule,
    ReactiveFormsModule,
    NbSpinnerModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ErrorPageComponent,
    ProductImageComponent
  ],
  providers: [ToastrService, DataTableService],
})

export class SharedModule {
  constructor() {
  }
}

