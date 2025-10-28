import { Routes } from '@angular/router';
import { ProductsComponent } from './page/products/products.component';
import { HomeComponent } from './page/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'produtos',
    component: ProductsComponent
  }
];
