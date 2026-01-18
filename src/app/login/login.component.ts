import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { FeatherService } from '../shared/feather.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,
     NzButtonModule,
      NzInputModule,
      NzIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  username?: string;
  password?: string;
  typepwd: string = 'password';
  iconpwd: string = 'eye';

  constructor(private feather: FeatherService) {}
  
  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.feather.replace();
  }
  
  OnChangeTypePassword() {
    this.typepwd = this.typepwd === 'password' ? 'text' : 'password';
    this.iconpwd = this.iconpwd === 'eye' ? 'eye-invisible' : 'eye';
  }
}


