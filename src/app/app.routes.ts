import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    //{path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
    {path:'', component: LoginComponent},
    {path:'dashboard', component: DashboardComponent}
];
