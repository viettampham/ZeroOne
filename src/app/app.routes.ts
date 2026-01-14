import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    //{path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
    {path:'', component: LoginComponent}
];
