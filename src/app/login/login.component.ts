import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FeatherService } from '../shared/feather.service';
import { NgIf } from '@angular/common';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { IconsModule } from '../icons/icons.module';
import { FormControl, FormBuilder, FormGroup, Validators, NonNullableFormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,
    NzButtonModule,
    NzInputModule,
    NzIconModule,
    NgIf, IconsModule, NzAlertModule, ReactiveFormsModule, NzFormModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  typepwd: string = 'password';
  showpwd: boolean = false;
  LoginForm!: FormGroup;

  constructor(private feather: FeatherService, private formBuilder: FormBuilder, private router: Router, private fb: NonNullableFormBuilder, private notification: NzNotificationService) {
    this.LoginForm = this.formBuilder.group({
      username: [null, [Validators.required, Validators.minLength(3)]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.feather.replace();
  }

  OnChangeTypePassword() {
    this.typepwd = this.typepwd === 'password' ? 'text' : 'password';
    this.showpwd = !this.showpwd;
    console.log(this.showpwd);
    setTimeout(() => {
      this.feather.replace();
    });
  }



  HandleLogin() {

    if (this.LoginForm.valid) {
      this.router.navigate(['/dashboard']);
    } else {
      this.notification.warning(
        'Thông báo',
        'Vui lòng nhập thông tin tên đăng nhập và mật khẩu!',
        { nzDuration: 3000 }
      );
    }
  }
}


