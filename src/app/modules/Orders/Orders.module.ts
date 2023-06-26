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
import { OrdersComponent } from './Components/orders.component';
import { UpdateOrderStatusComponent } from './Components/update-order-status/update-order-status.component';
import { OrdersRoutingModule } from './Orders-routing.module';


@NgModule({
  imports: [
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
    OrdersRoutingModule
  ],
  declarations: [
    OrdersComponent,
    UpdateOrderStatusComponent
  ],
  providers: [ToastrService, DataTableService],
})

export class OrdersModule {
  constructor() {
  }
}

