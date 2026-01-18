import { NgModule } from '@angular/core';

import { FeatherModule } from 'angular-feather';
import { Camera, Heart, Github, Eye, EyeOff } from 'angular-feather/icons';

const icons = {
  Camera,
  Heart,
  Github,
  Eye,
  EyeOff
};

@NgModule({
  imports: [
    FeatherModule.pick(icons)
  ],
  exports: [
    FeatherModule
  ]
})
export class IconsModule { }


