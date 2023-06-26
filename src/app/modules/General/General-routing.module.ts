import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ColorsComponent } from './Components/color/colors.component';
import { NewColorComponent } from './Components/color/new-color/new-color.component';

const routes: Routes = [
  {
    path: 'Colors',
    component: ColorsComponent,
  },
  {
    path: 'Colors/Add',
    component: NewColorComponent,
  },
  {
    path: 'Colors/:Id/Edit',
    component: NewColorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SharedRoutingModule { }

export const routedComponents = [
  ColorsComponent,
  NewColorComponent
];
