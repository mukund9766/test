import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductMasterComponent } from './product-master/product-master.component';
import { CategoryMasterComponent } from './category-master/category-master.component';

const routes: Routes = [
  { path: 'product-master', component: ProductMasterComponent },
  { path: 'category-master', component: CategoryMasterComponent },
  { path: '', redirectTo: '/product-master', pathMatch: 'full' } // Redirect to product-master by default
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
