import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

import { provideAnimations } from '@angular/platform-browser/animations';

import { provideNzI18n, vi_VN } from 'ng-zorro-antd/i18n';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(),provideAnimations(),provideNzI18n(vi_VN)]
};
