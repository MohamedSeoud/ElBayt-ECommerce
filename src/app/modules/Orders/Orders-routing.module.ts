import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersComponent } from './Components/orders.component';
import { UpdateOrderStatusComponent } from './Components/update-order-status/update-order-status.component';

const routes: Routes = [
  {
    path: '',
    component: OrdersComponent,
  },
  {
    path: 'UpdateOrderStatus/:OrderId',
    component: UpdateOrderStatusComponent,
  },
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule { }

export const routedComponents = [
  OrdersComponent,
  UpdateOrderStatusComponent
];
