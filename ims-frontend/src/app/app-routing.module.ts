import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './modules/products/components/add-product/add-product.component';
import { ProductsComponent } from './modules/products/components/products/products.component';

const routes: Routes = [
  {
    path: 'products',
    loadChildren: () =>
      import('./modules/products/products.module').then(
        (mod) => mod.ProductsModule
      ),
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
