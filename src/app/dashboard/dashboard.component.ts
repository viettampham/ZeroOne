import { Component } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FeatherService } from '../shared/feather.service';
import { IconsModule } from '../icons/icons.module';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NzLayoutModule,NzBreadCrumbModule,NzIconModule,IconsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  isCollapsed = false;
  constructor(private feather: FeatherService) {

  }

  ngAfterViewInit() {
    this.feather.replace();
  }
  
}
