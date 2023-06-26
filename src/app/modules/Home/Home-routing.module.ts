import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClothesGuardService } from '../Product Departments/Clothes/Services/Clothes-guard.service';
import { MainComponent } from './Components/main/main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [ClothesGuardService]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }

export const routedComponents = [
  MainComponent
];
