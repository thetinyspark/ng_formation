import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ShopComponent } from './components/shop/shop.component';
import { CartComponent } from './components/cart/cart.component';

const routeConfig: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home page'
  },
  {
    path: 'home',
    component: HomeComponent,
    title: 'Home page'
  },
  {
    path: 'catalog',
    component: ShopComponent,
    title: 'Shop'
  },
  {
    path: 'cart',
    component: CartComponent,
    title: 'My Cart'
  }
];

export default routeConfig;
