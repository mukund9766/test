import { Routes } from '@angular/router';
import { CategoryMasterComponent } from './category-master/category-master.component';
import { ProductMasterComponent } from './product-master/product-master.component';

export const routes: Routes = [
   { path: 'categories', component: CategoryMasterComponent },
  { path: 'products', component: ProductMasterComponent },
  { path: '', redirectTo: '/categories', pathMatch: 'full' } 
];
