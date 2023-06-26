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
import { ColorsComponent } from './Components/color/colors.component';
import { NewColorComponent } from './Components/color/new-color/new-color.component';
import { SharedRoutingModule } from './General-routing.module';


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
  declarations:  [
    ColorsComponent,
    NewColorComponent
  ],
  providers: [ToastrService, DataTableService],
})

export class GeneralModule {
  constructor() {
  }
}

