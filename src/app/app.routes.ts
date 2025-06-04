import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ShopComponent } from './components/shop/shop.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { isConnectedGuard } from './guards/is-connected.guard';
import { notEmptyCartGuard } from './guards/not-empty-cart.guard';
import { getCartResolver } from './resolvers/get-cart.resolver';
import { timeoutResolver } from './resolvers/timeout.resolver';
// import { isConnectedGuard } from './guards/is-connected.guard';
// import { userResolver } from './services/user.resolver';

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
    path: 'shop',
    component: ShopComponent,
    title: 'Shop'
  },
  {
    canActivate: [isConnectedGuard/*, notEmptyCartGuard*/],
    path: 'cart',
    component: CartComponent,
    title: 'My Cart', 
    resolve: {
      cart: getCartResolver, 
      msg: timeoutResolver
    },
  },
  {
    path: 'product/:id',
    component: ProductDetailComponent,
    title: 'My Product'
  },
  // {
  //   path: 'profile',
  //   loadComponent: ():any=> import('./components/profile/profile.component').then(m=>m.ProfileComponent),
  //   title: 'User Profile',
  //   resolve: {
  //     user: userResolver
  //   },
  //   canActivate: [isConnectedGuard],
  // },
  // {
  //   path: 'login',
  //   loadComponent: ():any=> import('./components/login/login.component').then(m=>m.LoginComponent),
  //   title: 'Login'
  // },
];

export default routeConfig;
