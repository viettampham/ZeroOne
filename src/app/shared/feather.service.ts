import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import feather from 'feather-icons';

@Injectable({ providedIn: 'root' })
export class FeatherService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  replace() {
    if (isPlatformBrowser(this.platformId)) {
      feather.replace();
    }
  }
}
