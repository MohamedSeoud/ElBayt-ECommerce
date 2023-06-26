import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorPageComponent } from './Components/error-page/error-page.component';


const routes: Routes = [
  {
    path: 'ErrorPage',
    component: ErrorPageComponent,
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SharedRoutingModule { }

export const routedComponents = [
  ErrorPageComponent
];
