import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ManagerComponent } from './manager/manager.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ShopComponent } from './shop/shop.component';
import { CommodityDetailComponent } from './commodity-detail/commodity-detail.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from './auth.guard';

import { managerGuard } from './manager.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [authGuard],
  },
  { path: 'home', component: HomeComponent },
  {
    path: 'manager',
    component: ManagerComponent,
    canActivate: [managerGuard],
  },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [managerGuard],
  },
  { path: 'shop', component: ShopComponent },
  {
    path: 'commodity/:id',
    component: CommodityDetailComponent,
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  { path: '**', redirectTo: '/home' },
];
