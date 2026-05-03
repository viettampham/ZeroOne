import { Component, OnInit } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FeatherService } from '../shared/feather.service';
import { IconsModule } from '../icons/icons.module';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { Router, RouterModule } from '@angular/router';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { UserAddOutline } from '@ant-design/icons-angular/icons';
import { CommonModule } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { decode } from 'punycode';
import { UserService } from '../services/currentUser.service';
const icons = [UserAddOutline];

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NzLayoutModule,
    NzMenuModule,
    NzBreadCrumbModule,
    NzIconModule,
    IconsModule,
    NzDropDownModule,
    RouterModule,
    CommonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: [
    { provide: NZ_ICONS, useValue: icons }
  ]
})
export class DashboardComponent {
  isCollapsed = false;
  currentYear = new Date().getFullYear();
  currentUser: any = null;
  constructor(private feather: FeatherService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    console.log('DashboardComponent initialized');
    const token = sessionStorage.getItem('token');
    if (token) {
      const decoded: any = jwtDecode(token);
      this.currentUser = decoded;
      console.log(this.currentUser);
      this.userService.setUser(this.currentUser);
    }
  }

  ngAfterViewInit(): void {
    this.feather.replace();
  }

  breadcrumbs = ['Trang chủ'];

  // thay đổi giá trị
  changeBreadcrumb(x1: string, x2: string) {
    this.breadcrumbs = [x1, x2,];
  }

  navigateTo(page: string, x1: string, x2: string) {
    this.changeBreadcrumb(x1, x2);
    switch (page) {
      case 'QuanLyNhanVien':
        this.router.navigate(['/dashboard/quanlynhanvien']);
        break;
      case 'QuanLyModel':
        this.router.navigate(['/dashboard/quanlymodel']);
        break;
      default:
        break;
    }
  }
}
