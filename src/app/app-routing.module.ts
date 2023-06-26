import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';


export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../app/modules/Home/Home.module')
      .then(m => m.HomeModule),
  },
  {
    path: 'Clothes',
    loadChildren: () => import('../app/modules/Product Departments/Clothes/clothes.module')
      .then(m => m.ClothesModule),
  },
  {
    path: 'General',
    loadChildren: () => import('../app/modules/General/General.module')
      .then(m => m.GeneralModule),
  },
  {
    path: 'Admin',
    loadChildren: () => import('../app/modules/Authenication/Authenication.module')
      .then(m => m.AuthenicationModule),
  },
  {
    path: 'Orders',
    loadChildren: () => import('../app/modules/Orders/Orders.module')
      .then(m => m.OrdersModule),
  },

  // { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
