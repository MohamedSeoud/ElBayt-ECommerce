import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClothBrandsComponent } from './Compoments/cloth-brands/cloth-brands.component';
import { NewClothBrandComponent } from './Compoments/cloth-brands/new-cloth-brand/new-cloth-brand.component';
import { ClothDepartmentsComponent } from './Compoments/cloth-departments/cloth-departments.component';
import { NewClothDepartmentComponent } from './Compoments/cloth-departments/new-cloth-department/new-cloth-department.component';
import { ClothSizesComponent } from './Compoments/cloth-sizes/cloth-sizes.component';
import { NewClothSizeComponent } from './Compoments/cloth-sizes/new-cloth-size/new-cloth-size.component';
import { ClothCategoriesBrandsComponent } from './Compoments/clothes-categories/clothes-brands/clothes-categories-brands.component';
import { ClothesCategoriesComponent } from './Compoments/clothes-categories/clothes-categories.component';
import { ClothCategoriesSizesComponent } from './Compoments/clothes-categories/clothes-sizes/clothes-categories-sizes.component';
import { NewClothesCategoryComponent } from './Compoments/clothes-categories/new-clothes-category/new-clothes-category.component';
import { ClothesTypesComponent } from './Compoments/clothes-types/clothes-types.component';
import { NewClothesTypesComponent } from './Compoments/clothes-types/new-clothes-types/new-clothes-types.component';
import { ClothInfoAmountComponent } from './Compoments/clothes/cloth-info-amount/cloth-info-amount.component';
import { NewClothInfoAmountComponent } from './Compoments/clothes/cloth-info-amount/new-cloth-info-amount/new-cloth-info-amount.component';
import { ClothesComponent } from './Compoments/clothes/clothes.component';
import { NewClothImageComponent } from './Compoments/clothes/new-cloth-image/new-cloth-image.component';
import { NewClothComponent } from './Compoments/clothes/new-cloth/new-cloth.component';
import { ClothesGuardService } from './Services/Clothes-guard.service';



const routes: Routes = [
  {
    path: 'Departments',
    component: ClothDepartmentsComponent,
    canActivate: [ClothesGuardService]
  },
  {
    path: 'Departments/Add',
    component: NewClothDepartmentComponent,
    canActivate: [ClothesGuardService]
  },
  {
    path: 'Departments/:Id/Edit',
    component: NewClothDepartmentComponent,
    canActivate: [ClothesGuardService]
  },
  {
    path: 'Brands',
    component: ClothBrandsComponent,
    canActivate: [ClothesGuardService]
  },
  {
    path: 'Brands/Add',
    component: NewClothBrandComponent,
    canActivate: [ClothesGuardService]
  },
  {
    path: 'Brands/:Id/Edit',
    component: NewClothBrandComponent,
    canActivate: [ClothesGuardService]
  },
  {
    path: 'Types',
    component: ClothesTypesComponent,
    canActivate: [ClothesGuardService]
  },
  {
    path: 'Types/Add',
    component: NewClothesTypesComponent,
    canActivate: [ClothesGuardService]
  },
  {
    path: 'Types/:Id/Edit',
    component: NewClothesTypesComponent,
    canActivate: [ClothesGuardService]
  },
  {
    path: 'Categories',
    component: ClothesCategoriesComponent,
    canActivate: [ClothesGuardService]
  },
  {
    path: 'Categories/Add',
    component: NewClothesCategoryComponent,
    canActivate: [ClothesGuardService]
  },
  {
    path: 'Categories/:Id/Edit',
    component: NewClothesCategoryComponent,
    canActivate: [ClothesGuardService]
  },
  {
    path: 'Products',
    component: ClothesComponent,
    canActivate: [ClothesGuardService]
  },
  {
    path: 'Products/Add',
    component: NewClothComponent,
    canActivate: [ClothesGuardService]
  },
  {
    path: 'Products/:Id/Edit',
    component: NewClothComponent,
    canActivate: [ClothesGuardService]
  },
  {
    path: 'Products/Images/:Id/Edit',
    component: NewClothImageComponent,
    canActivate: [ClothesGuardService]
  } ,
  {
    path: 'Categories/:Id/Brands',
    component: ClothCategoriesBrandsComponent,
    canActivate: [ClothesGuardService]
  },
  {
    path: 'Categories/:Id/Sizes',
    component: ClothCategoriesSizesComponent,
    canActivate: [ClothesGuardService]
  },
  {
    path: 'Sizes',
    component: ClothSizesComponent,
    canActivate: [ClothesGuardService]
  },
  {
    path: 'Sizes/Add',
    component: NewClothSizeComponent,
    canActivate: [ClothesGuardService]
  },
  {
    path: 'Sizes/:Id/Edit',
    component: NewClothSizeComponent,
    canActivate: [ClothesGuardService]
  },
  {
    path: 'Product/:ClothId/Info',
    component: ClothInfoAmountComponent,
    canActivate: [ClothesGuardService]
  },
  {
    path: 'Product/:ClothId/Info/Add',
    component: NewClothInfoAmountComponent,
    canActivate: [ClothesGuardService]
  },
  {
    path: 'Product/:ClothId/Info/Edit/:Id',
    component: NewClothInfoAmountComponent,
    canActivate: [ClothesGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClothesRoutingModule { }

export const routedComponents = [
  ClothesTypesComponent,
  NewClothesTypesComponent,
  ClothesCategoriesComponent,
  NewClothesCategoryComponent,
  ClothesComponent,
  NewClothComponent,
  ClothDepartmentsComponent,
  NewClothDepartmentComponent,
  ClothSizesComponent,
  NewClothSizeComponent,
  ClothCategoriesBrandsComponent,
  ClothInfoAmountComponent,
  NewClothInfoAmountComponent
];
