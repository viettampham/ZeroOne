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
import { ApiService } from '../services/api.service';
import { LoginResponse } from '../model/ResponseModel/LoginResponse';
import {provideHttpClient } from '@angular/common/http';

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

  constructor(
    private feather: FeatherService, 
    private formBuilder: FormBuilder, 
    private router: Router, 
    private fb: NonNullableFormBuilder, 
    private notification: NzNotificationService,
    private apiService: ApiService
  ) {
    this.LoginForm = this.formBuilder.group({
      code: [null, [Validators.required, Validators.minLength(1)]],
      password: [null, [Validators.required, Validators.minLength(1)]],
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
      this.apiService.Login(this.LoginForm.value).subscribe((res: any)=>{
        if(res.data){
          sessionStorage.setItem('token', res.data);
          this.router.navigate(['/dashboard']);
        }else{
          alert("Đăng nhập thất bại, vui lòng kiểm tra lại thông tin đăng nhập!");
        }
      });
      
    } else {
      this.notification.warning(
        'Thông báo',
        'Vui lòng nhập thông tin tên đăng nhập và mật khẩu!',
        { nzDuration: 3000 }
      );
    }
  }
}


