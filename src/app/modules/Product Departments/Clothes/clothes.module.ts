import { NgModule } from '@angular/core';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbIconModule,
  NbInputModule,
  NbListModule,
  NbRadioModule,
  NbSelectModule,
  NbSpinnerModule,
  NbUserModule} from '@nebular/theme';
import { ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../../@theme/theme.module';
import { ToastrService } from '../../Shared/Services/ToastrService';
import { DataTableService } from '../../Shared/Services/DataTableService';
import { ClothesRoutingModule } from './clothes-routing.module';
import { NewClothesTypesComponent } from './Compoments/clothes-types/new-clothes-types/new-clothes-types.component';
import { ClothesTypesComponent } from './Compoments/clothes-types/clothes-types.component';
import { ClothesCategoriesComponent } from './Compoments/clothes-categories/clothes-categories.component';
import { NewClothesCategoryComponent } from './Compoments/clothes-categories/new-clothes-category/new-clothes-category.component';
import { NewClothComponent } from './Compoments/clothes/new-cloth/new-cloth.component';
import { ClothDepartmentsComponent } from './Compoments/cloth-departments/cloth-departments.component';
import { NewClothDepartmentComponent } from './Compoments/cloth-departments/new-cloth-department/new-cloth-department.component';
import { DepartmentImageComponent } from './Compoments/cloth-departments/department-image/department-image.component';
import { ClothTypeImageComponent } from './Compoments/clothes-types/cloth-type-image/cloth-type-image.component';
import { ClothBrandsComponent } from './Compoments/cloth-brands/cloth-brands.component';
import { BrandImageComponent } from './Compoments/cloth-brands/brand-image/brand-image.component';
import { NewClothBrandComponent } from './Compoments/cloth-brands/new-cloth-brand/new-cloth-brand.component';
import { ClothesComponent } from './Compoments/clothes/clothes.component';
import { ClothImageComponent } from './Compoments/clothes/new-cloth-image/cloth-image/cloth-image.component';
import { NewClothImageComponent } from './Compoments/clothes/new-cloth-image/new-cloth-image.component';
import { ClothInfoAmountComponent } from './Compoments/clothes/cloth-info-amount/cloth-info-amount.component';
import { NewClothInfoAmountComponent } from './Compoments/clothes/cloth-info-amount/new-cloth-info-amount/new-cloth-info-amount.component';
import { ClothSizesComponent } from './Compoments/cloth-sizes/cloth-sizes.component';
import { NewClothSizeComponent } from './Compoments/cloth-sizes/new-cloth-size/new-cloth-size.component';
import { ClothCategoriesBrandsComponent } from './Compoments/clothes-categories/clothes-brands/clothes-categories-brands.component';
import { ClothCategoriesSizesComponent } from './Compoments/clothes-categories/clothes-sizes/clothes-categories-sizes.component';

@NgModule({
  imports: [
    ClothesRoutingModule,
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
    NbListModule,
  ],
  declarations: [
    ClothesComponent,
    NewClothComponent,
    NewClothesTypesComponent,
    ClothesTypesComponent,
    ClothesCategoriesComponent,
    NewClothesCategoryComponent,
    ClothDepartmentsComponent,
    NewClothDepartmentComponent,
    DepartmentImageComponent,
    ClothTypeImageComponent,
    NewClothBrandComponent,
    ClothBrandsComponent,
    BrandImageComponent,
    NewClothSizeComponent,
    ClothSizesComponent,
    ClothCategoriesSizesComponent,
    ClothImageComponent,
    NewClothImageComponent,
    ClothCategoriesBrandsComponent,
    ClothInfoAmountComponent,
    NewClothInfoAmountComponent
  ],
  providers: [ToastrService, DataTableService],
})

export class ClothesModule {
  constructor() {
  }
}

