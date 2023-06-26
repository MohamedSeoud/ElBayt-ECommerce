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
import { ToastrService } from '../Shared/Services/ToastrService';
import { MainComponent } from './Components/main/main.component';
import { HomeRoutingModule } from './Home-routing.module';

@NgModule({
  imports: [
    HomeRoutingModule,
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
  declarations:  [
    MainComponent,
  ],
  providers: [ToastrService, DataTableService],
})

export class HomeModule {
  constructor() {
  }
}

