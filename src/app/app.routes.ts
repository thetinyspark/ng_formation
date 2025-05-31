import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { isConnectedGuard } from './guards/is-connected.guard';

const routeConfig: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home page'
  },
  {
    path: 'login',
    loadComponent: ():any=> import('./components/login/login.component').then(m=>m.LoginComponent),
    title: 'Login',
    canActivate: [isConnectedGuard],
  },
];

export default routeConfig;
