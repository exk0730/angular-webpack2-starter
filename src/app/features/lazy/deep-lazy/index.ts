import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { routes } from './deep-lazy.routing';
import { DeepLazyComponent } from './deep-lazy.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    DeepLazyComponent
  ]
})

export class DeepLazyModule {}

