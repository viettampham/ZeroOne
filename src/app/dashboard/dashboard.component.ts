import { Component } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FeatherService } from '../shared/feather.service';
import { IconsModule } from '../icons/icons.module';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { Router, RouterModule } from '@angular/router';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { UserOutline } from '@ant-design/icons-angular/icons';

const icons = [UserOutline];
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
    RouterModule
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

  constructor(private feather: FeatherService, private router: Router) {}

  ngAfterViewInit(): void {
    this.feather.replace();
  }

  navigateTo(page: string){
    switch(page){
      case 'QuanLyNhanVien':
        this.router.navigate(['/dashboard/quanlynhanvien']);
        break;
      default:
        break;
    }
  }
}
