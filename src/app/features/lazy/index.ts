import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './lazy.routing';

import { LazyComponent } from './lazy.component';
import { LazyActions, LazyEffects, LazyService } from './lazy.ngrx';
import { EffectsModule } from '@ngrx/effects';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    EffectsModule.run(LazyEffects)
  ],
  declarations: [
    LazyComponent
  ],
  providers: [
    LazyActions,
    LazyService
  ]
})

export class LazyModule {}

