import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideNzI18n, vi_VN } from 'ng-zorro-antd/i18n';
import { provideHttpClient } from '@angular/common/http';

import { withInterceptors,withFetch  } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.interceptor';

import { NzIconModule } from 'ng-zorro-antd/icon';
import {
  DashboardOutline,
  UserOutline,
  TeamOutline,
  FileOutline,
  DownOutline,
  PlusOutline,
  UserAddOutline,
  SettingOutline,
  PlusSquareOutline
} from '@ant-design/icons-angular/icons';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideClientHydration(),
    provideAnimations(),
    provideNzI18n(vi_VN),
    importProvidersFrom(NzIconModule.forRoot([
      DashboardOutline,
      UserOutline,
      TeamOutline,
      FileOutline,
      DownOutline,
      PlusOutline,
      UserAddOutline,
      SettingOutline,
      PlusSquareOutline
    ])),
    provideHttpClient(
      withFetch(), 
      withInterceptors([authInterceptor])
    )
  ]
};
