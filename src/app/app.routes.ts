import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuanLyNhanVienComponent } from './quan-ly-nhan-vien/quan-ly-nhan-vien.component';
import { QuanlymodelComponent } from './quanlymodel/quanlymodel.component';

export const routes: Routes = [
    //{path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
    {path:'', component: LoginComponent},
    {
        path: 'dashboard',
        component: DashboardComponent,  
        children: [
            { path: 'quanlynhanvien', component: QuanLyNhanVienComponent },
            { path: 'quanlymodel', component: QuanlymodelComponent },
        ],
    },
];
