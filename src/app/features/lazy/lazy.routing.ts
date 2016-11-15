/* tslint:disable: variable-name */
import { Routes } from '@angular/router';
import { LazyComponent } from './lazy.component';

export const routes: Routes = [
  {
    path: '',
    component: LazyComponent
  },
  {
    path: 'deep-lazy',
    loadChildren: './deep-lazy/index#DeepLazyModule'
  }
];
